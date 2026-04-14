import fs from "fs";
import path from "path";
import dns from "node:dns/promises";
import net from "node:net";
import { createHash } from "node:crypto";
import ogs from "open-graph-scraper";
import pLimit from "p-limit";
import {
  isPreviewableUrl,
  normalizePreviewUrl,
} from "../src/lib/linkPreviewUtils";
import type {
  LinkPreviewEntry,
  LinkPreviewManifest,
} from "../src/lib/remarkLinkPreviews";

const root = process.cwd();
const blogRoot = path.join(root, "content", "blog");
const previewsRoot = path.join(root, "public", "link-previews");
const faviconsRoot = path.join(previewsRoot, "favicons");
const manifestPath = path.join(previewsRoot, "manifest.json");
const defaultFaviconPath = "/link-previews/favicons/default.svg";
const defaultFaviconAbsolutePath = path.join(faviconsRoot, "default.svg");

const CACHE_TTL_DAYS = 30;
const MAX_DESCRIPTION_LENGTH = 220;
const MAX_TITLE_LENGTH = 120;
const FETCH_CONCURRENCY = 5;
const REQUEST_TIMEOUT_MS = 8_000;

const USER_AGENT =
  "Mozilla/5.0 (compatible; AosusLinkPreviewBot/1.0; +https://aosus.org)";

const hostnameSafetyCache = new Map<string, boolean>();

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function truncate(value: string, maxLength: number): string {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1)}…`;
}

function stripFrontmatter(markdown: string): string {
  if (!markdown.startsWith("---\n")) {
    return markdown;
  }

  const endIndex = markdown.indexOf("\n---\n", 4);

  if (endIndex === -1) {
    return markdown;
  }

  return markdown.slice(endIndex + 5);
}

function trimTrailingPunctuation(rawUrl: string): string {
  // Strip trailing punctuation and markdown formatting chars (bold **, etc.)
  let url = rawUrl.replace(/[.,!?;:*]+$/g, "");

  // Strip unbalanced trailing parentheses — handles markdown [text](url)
  // leaking the closing ) into the extracted URL, while preserving balanced
  // parens in valid URLs like Wikipedia's /wiki/Matrix_(protocol).
  while (url.endsWith(")")) {
    const openCount = (url.match(/\(/g) || []).length;
    const closeCount = (url.match(/\)/g) || []).length;

    if (closeCount > openCount) {
      url = url.slice(0, -1);
    } else {
      break;
    }
  }

  return url;
}

function extractLinksFromMarkdown(markdown: string): string[] {
  const body = stripFrontmatter(markdown);
  const urls = new Set<string>();
  const regex = /https?:\/\/[^\s<>"]+/gi;
  let match = regex.exec(body);

  while (match) {
    const candidate = trimTrailingPunctuation(match[0]);
    const normalized = normalizePreviewUrl(candidate);

    if (normalized && isPreviewableUrl(normalized)) {
      urls.add(normalized);
    }

    match = regex.exec(body);
  }

  return [...urls];
}

function getAllMarkdownFiles(dir: string, files: string[] = []): string[] {
  if (!fs.existsSync(dir)) {
    return files;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_")) {
      continue;
    }

    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      getAllMarkdownFiles(entryPath, files);
      continue;
    }

    if (entry.isFile() && entry.name.startsWith("index.") && entry.name.endsWith(".md")) {
      files.push(entryPath);
    }
  }

  return files;
}

function loadManifest(): LinkPreviewManifest {
  if (!fs.existsSync(manifestPath)) {
    return {};
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as LinkPreviewManifest;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function extensionFromContentType(contentType: string | null): string | null {
  const normalized = contentType?.split(";")[0].trim().toLowerCase();

  switch (normalized) {
    case "image/png":
      return "png";
    case "image/jpeg":
      return "jpg";
    case "image/webp":
      return "webp";
    case "image/svg+xml":
      return "svg";
    case "image/x-icon":
    case "image/vnd.microsoft.icon":
      return "ico";
    default:
      return null;
  }
}

function extensionFromPath(url: string): string | null {
  try {
    const ext = path.extname(new URL(url).pathname).replace(/[^a-z0-9]/gi, "").toLowerCase();

    if (["png", "jpg", "jpeg", "webp", "svg", "ico"].includes(ext)) {
      return ext === "jpeg" ? "jpg" : ext;
    }

    return null;
  } catch {
    return null;
  }
}

function isPrivateIpv4(address: string): boolean {
  const parts = address.split(".").map((segment) => Number(segment));

  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) {
    return true;
  }

  const [a, b] = parts;

  if (a === 10 || a === 127 || a === 0) {
    return true;
  }

  if (a === 169 && b === 254) {
    return true;
  }

  if (a === 172 && b >= 16 && b <= 31) {
    return true;
  }

  if (a === 192 && b === 168) {
    return true;
  }

  if (a === 100 && b >= 64 && b <= 127) {
    return true;
  }

  return false;
}

function isPrivateIpv6(address: string): boolean {
  const normalized = address.toLowerCase();

  if (normalized === "::1") {
    return true;
  }

  if (normalized.startsWith("::ffff:")) {
    const ipv4 = normalized.slice("::ffff:".length);
    return isPrivateIpv4(ipv4);
  }

  if (normalized.startsWith("fc") || normalized.startsWith("fd")) {
    return true;
  }

  if (normalized.startsWith("fe8") || normalized.startsWith("fe9") || normalized.startsWith("fea") || normalized.startsWith("feb")) {
    return true;
  }

  return false;
}

function isPrivateAddress(address: string): boolean {
  const version = net.isIP(address);

  if (version === 4) {
    return isPrivateIpv4(address);
  }

  if (version === 6) {
    return isPrivateIpv6(address);
  }

  return true;
}

async function isSafeHostname(hostname: string): Promise<boolean> {
  const cached = hostnameSafetyCache.get(hostname);

  if (typeof cached === "boolean") {
    return cached;
  }

  const normalized = hostname.toLowerCase();

  if (normalized === "localhost" || normalized.endsWith(".local")) {
    hostnameSafetyCache.set(hostname, false);
    return false;
  }

  if (net.isIP(normalized) > 0) {
    const safe = !isPrivateAddress(normalized);
    hostnameSafetyCache.set(hostname, safe);
    return safe;
  }

  try {
    const records = await dns.lookup(normalized, { all: true, verbatim: true });

    if (records.length === 0) {
      hostnameSafetyCache.set(hostname, false);
      return false;
    }

    const safe = records.every((record) => !isPrivateAddress(record.address));
    hostnameSafetyCache.set(hostname, safe);
    return safe;
  } catch {
    hostnameSafetyCache.set(hostname, false);
    return false;
  }
}

function extensionFromImageBuffer(buffer: Buffer): string | null {
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "png";
  }

  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "jpg";
  }

  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "webp";
  }

  if (
    buffer.length >= 4 &&
    buffer[0] === 0x00 &&
    buffer[1] === 0x00 &&
    (buffer[2] === 0x01 || buffer[2] === 0x02) &&
    buffer[3] === 0x00
  ) {
    return "ico";
  }

  const leadingText = buffer.toString("utf8", 0, Math.min(buffer.length, 2048)).trimStart();

  if (leadingText.startsWith("<svg") || (leadingText.startsWith("<?xml") && leadingText.includes("<svg"))) {
    return "svg";
  }

  return null;
}

function isValidCachedFavicon(iconPath: string): boolean {
  try {
    const stats = fs.statSync(iconPath);

    if (!stats.isFile() || stats.size <= 0 || stats.size > 512_000) {
      return false;
    }

    const buffer = fs.readFileSync(iconPath);
    return extensionFromImageBuffer(buffer) !== null;
  } catch {
    return false;
  }
}

async function downloadFavicon(faviconUrl: string): Promise<string | null> {
  try {
    const parsed = new URL(faviconUrl);

    if (!(await isSafeHostname(parsed.hostname))) {
      return null;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const response = await fetch(parsed.toString(), {
      redirect: "follow",
      headers: {
        "user-agent": USER_AGENT,
        accept: "image/*",
      },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get("content-type")?.split(";")[0].trim().toLowerCase() ?? "";

    if (!contentType.startsWith("image/")) {
      return null;
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    if (buffer.length === 0 || buffer.length > 512_000) {
      return null;
    }

    const sniffedExt = extensionFromImageBuffer(buffer);

    if (!sniffedExt) {
      return null;
    }

    const ext =
      extensionFromContentType(response.headers.get("content-type")) ??
      extensionFromPath(parsed.toString()) ??
      sniffedExt;
    const fileName = `${createHash("sha1").update(parsed.toString()).digest("hex")}.${ext}`;
    const outputPath = path.join(faviconsRoot, fileName);

    fs.writeFileSync(outputPath, buffer);

    return `/link-previews/favicons/${fileName}`;
  } catch {
    return null;
  }
}

function ensureDefaultFavicon() {
  ensureDir(faviconsRoot);

  if (fs.existsSync(defaultFaviconAbsolutePath)) {
    return;
  }

  fs.writeFileSync(
    defaultFaviconAbsolutePath,
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="14" fill="#052e16"/><path d="M14 43.5V20.5H24.5C27.5 20.5 30.1 21 32.2 22C34.3 23 35.4 24.9 35.4 27.6C35.4 30 34.2 31.8 31.8 33C34.8 34 36.4 36.1 36.4 39.1C36.4 42 35.2 44.1 33 45.2C30.8 46.3 28 46.9 24.5 46.9H14V43.5ZM18.3 30.9H24.3C26.8 30.9 28.1 29.9 28.1 27.8C28.1 25.7 26.7 24.8 24.2 24.8H18.3V30.9ZM18.3 42.6H24.7C27.3 42.6 28.9 41.6 28.9 39.2C28.9 36.8 27.3 35.8 24.7 35.8H18.3V42.6Z" fill="#22c55e"/><rect x="40" y="19" width="10" height="26" rx="5" stroke="#22c55e" stroke-width="3"/></svg>`,
    "utf8",
  );
}

function entryIsFresh(entry: LinkPreviewEntry): boolean {
  if (!entry.expiresAt || !entry.localFavicon) {
    return false;
  }

  const expiresAt = Date.parse(entry.expiresAt);

  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    return false;
  }

  if (!entry.localFavicon.startsWith("/")) {
    return false;
  }

  const iconPath = path.join(root, "public", entry.localFavicon.replace(/^\//, ""));
  return isValidCachedFavicon(iconPath);
}

function makeFallbackEntry(url: string, now: Date): LinkPreviewEntry {
  const hostname = new URL(url).hostname;
  const expiresAt = new Date(now.getTime() + CACHE_TTL_DAYS * 24 * 60 * 60 * 1000);

  return {
    title: hostname,
    description: "",
    siteName: hostname,
    hostname,
    localFavicon: defaultFaviconPath,
    fetchedAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    error: true,
  };
}

async function fetchPreview(url: string, now: Date): Promise<LinkPreviewEntry> {
  const parsed = new URL(url);

  if (!(await isSafeHostname(parsed.hostname))) {
    return makeFallbackEntry(url, now);
  }

  try {
    const { result, error } = await ogs({
      url,
      timeout: Math.ceil(REQUEST_TIMEOUT_MS / 1_000),
      fetchOptions: {
        headers: {
          "user-agent": USER_AGENT,
          "accept-language": "en-US,en;q=0.8",
        },
      },
    });

    if (error || !result) {
      return makeFallbackEntry(url, now);
    }

    const requestUrl =
      typeof result.requestUrl === "string" && normalizePreviewUrl(result.requestUrl)
        ? normalizePreviewUrl(result.requestUrl)!
        : url;
    const hostname = new URL(requestUrl).hostname;
    const title = truncate(
      typeof result.ogTitle === "string" ? result.ogTitle : hostname,
      MAX_TITLE_LENGTH,
    );
    const description = truncate(
      typeof result.ogDescription === "string" ? result.ogDescription : "",
      MAX_DESCRIPTION_LENGTH,
    );
    const siteName = truncate(
      typeof result.ogSiteName === "string" && result.ogSiteName
        ? result.ogSiteName
        : hostname,
      60,
    );

    let localFavicon = defaultFaviconPath;

    if (typeof result.favicon === "string" && result.favicon) {
      const faviconUrl = new URL(result.favicon, requestUrl).toString();
      const downloaded = await downloadFavicon(faviconUrl);

      if (downloaded) {
        localFavicon = downloaded;
      }
    } else {
      const fallbackFaviconUrl = `${parsed.protocol}//${parsed.host}/favicon.ico`;
      const downloaded = await downloadFavicon(fallbackFaviconUrl);

      if (downloaded) {
        localFavicon = downloaded;
      }
    }

    const expiresAt = new Date(now.getTime() + CACHE_TTL_DAYS * 24 * 60 * 60 * 1000);

    return {
      title,
      description,
      siteName,
      hostname,
      localFavicon,
      fetchedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      error: false,
    };
  } catch {
    return makeFallbackEntry(url, now);
  }
}

function collectAllExternalUrls(): string[] {
  const files = getAllMarkdownFiles(blogRoot);
  const urls = new Set<string>();

  for (const filePath of files) {
    const markdown = fs.readFileSync(filePath, "utf8");

    for (const url of extractLinksFromMarkdown(markdown)) {
      urls.add(url);
    }
  }

  return [...urls].sort((left, right) => left.localeCompare(right));
}

function cleanupUnusedFavicons(usedPaths: Set<string>) {
  const files = fs.existsSync(faviconsRoot) ? fs.readdirSync(faviconsRoot) : [];

  for (const file of files) {
    const webPath = `/link-previews/favicons/${file}`;

    if (!usedPaths.has(webPath)) {
      fs.rmSync(path.join(faviconsRoot, file), { force: true });
    }
  }
}

async function main() {
  ensureDir(previewsRoot);
  ensureDir(faviconsRoot);
  ensureDefaultFavicon();

  const existingManifest = loadManifest();
  const urls = collectAllExternalUrls();
  const nextManifest: LinkPreviewManifest = {};
  const usedIconPaths = new Set<string>([defaultFaviconPath]);
  const limit = pLimit(FETCH_CONCURRENCY);

  await Promise.all(
    urls.map((url) =>
      limit(async () => {
        const cached = existingManifest[url];

        if (cached && entryIsFresh(cached)) {
          nextManifest[url] = cached;

          if (cached.localFavicon) {
            usedIconPaths.add(cached.localFavicon);
          }

          return;
        }

        const now = new Date();
        const refreshed = await fetchPreview(url, now);
        nextManifest[url] = refreshed;

        if (refreshed.localFavicon) {
          usedIconPaths.add(refreshed.localFavicon);
        }
      }),
    ),
  );

  fs.writeFileSync(manifestPath, JSON.stringify(nextManifest, null, 2));
  cleanupUnusedFavicons(usedIconPaths);
  console.log(`Link previews synced: ${Object.keys(nextManifest).length} URLs`);
}

main().catch((error) => {
  console.error("Failed to build link previews", error);
  process.exitCode = 1;
});
