import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import TurndownService from "turndown";

type Lang = "ar" | "en";

type WPText = { rendered: string };

type WPPost = {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: WPText;
  content: WPText;
  excerpt: WPText;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  type: string;
  status: string;
};

type WPLangPost = WPPost & {
  lang?: string;
};

type WPMedia = {
  id: number;
  date: string;
  slug: string;
  source_url: string;
  title: WPText;
  caption: WPText;
  description: WPText;
  alt_text: string;
  parent: number;
  media_type: string;
  mime_type: string;
};

type WPTerm = {
  id: number;
  name: string;
};

type WPUser = {
  id: number;
  name: string;
};

const apiBase = "https://aosus.org/wp-json/wp/v2";
const root = process.cwd();
const blogRoot = path.join(root, "content", "blog");

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
  strongDelimiter: "**",
});

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function makeWordPressSlug(id: number, slug: string): string {
  const cleanSlug = decodeSlug(slug)
    .trim()
    .replaceAll(/\s+/g, "-")
    .replaceAll(/[^\p{L}\p{N}-]+/gu, "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/^-|-$/g, "");

  return `${id}-${cleanSlug || "item"}`;
}

function sanitizeFileName(fileName: string): string {
  return fileName.replaceAll(/[\\/:*?"<>|]/g, "-");
}

function uniqueFileName(dir: string, url: string, fileNames: Map<string, string>): string {
  const existing = fileNames.get(url);
  if (existing) {
    return existing;
  }

  const parsed = new URL(url);
  const base = decodeURIComponent(path.basename(parsed.pathname) || "asset");
  const safeBase = sanitizeFileName(base);
  const ext = path.extname(safeBase);
  const stem = ext ? safeBase.slice(0, -ext.length) : safeBase;
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 8);

  let candidate = `${stem}-${hash}${ext}`;
  let attempt = 1;

  while (fs.existsSync(path.join(dir, candidate))) {
    candidate = `${stem}-${hash}-${attempt}${ext}`;
    attempt += 1;
  }

  fileNames.set(url, candidate);
  return candidate;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

async function fetchCollection<T>(endpoint: string): Promise<T[]> {
  const items: T[] = [];
  const url = new URL(`${apiBase}/${endpoint}`);
  url.searchParams.set("per_page", "100");

  let page = 1;

  while (true) {
    url.searchParams.set("page", String(page));
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url.toString()}: ${response.status} ${response.statusText}`);
    }

    const batch = (await response.json()) as T[];
    items.push(...batch);

    const totalPages = Number(response.headers.get("x-wp-totalpages") ?? "1");

    if (page >= totalPages) {
      break;
    }

    page += 1;
  }

  return items;
}

async function downloadFile(url: string, filePath: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
}

function rewriteMarkdownAssets(markdown: string, assetMap: Map<string, string>): string {
  return markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, rawUrl) => {
    const url = rawUrl.trim();
    const localPath = assetMap.get(url);

    if (!localPath) {
      return match;
    }

    return `![${alt}](${localPath})`;
  });
}

function scriptCounts(text: string): { arabic: number; latin: number } {
  return {
    arabic: (text.match(/\p{Script=Arabic}/gu) ?? []).length,
    latin: (text.match(/\p{Script=Latin}/gu) ?? []).length,
  };
}

function detectContentLang(title: string, excerpt: string, body: string): Lang {
  const normalizedBody = body
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .slice(0, 1200);

  const titleCounts = scriptCounts(stripHtml(title));
  const excerptCounts = scriptCounts(stripHtml(excerpt));
  const bodyCounts = scriptCounts(normalizedBody);

  const arabic = titleCounts.arabic * 4 + excerptCounts.arabic * 2 + bodyCounts.arabic;
  const latin = titleCounts.latin * 4 + excerptCounts.latin * 2 + bodyCounts.latin;

  return latin > arabic * 1.2 ? "en" : "ar";
}

function toMarkdown(html: string): string {
  return turndown.turndown(html).trim();
}

function toExcerpt(excerptHtml: string): string {
  return stripHtml(excerptHtml);
}

function parseImageUrls(html: string): string[] {
  const urls = new Set<string>();
  const imageRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  const sourceRegex = /<source[^>]+src=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;

  while ((match = imageRegex.exec(html))) {
    urls.add(match[1]);
  }

  while ((match = sourceRegex.exec(html))) {
    urls.add(match[1]);
  }

  return [...urls].filter((url) => !url.startsWith("data:"));
}

function isLocalWordPressUpload(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === "aosus.org" && parsed.pathname.startsWith("/wp-content/uploads/");
  } catch {
    return url.startsWith("/wp-content/uploads/");
  }
}

function writeSingleLocalePost(
  postDir: string,
  frontMatter: Record<string, unknown>,
  body: string,
  lang: Lang,
) {
  const otherLang: Lang = lang === "ar" ? "en" : "ar";
  const otherFilePath = path.join(postDir, `index.${otherLang}.md`);

  if (fs.existsSync(otherFilePath)) {
    fs.unlinkSync(otherFilePath);
  }

  writeMarkdownFile(path.join(postDir, `index.${lang}.md`), { ...frontMatter, lang }, body);
}

function writeMarkdownFile(filePath: string, frontMatter: Record<string, unknown>, body: string) {
  const lines = ["---"];

  for (const [key, value] of Object.entries(frontMatter)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map((item) => JSON.stringify(item)).join(", ")}]`);
      continue;
    }

    lines.push(`${key}: ${JSON.stringify(value)}`);
  }

  lines.push("---", "", body.trim(), "");
  fs.writeFileSync(filePath, lines.join("\n"));
}

async function main() {
  ensureDir(blogRoot);

  const [posts, media, categories, tags, users] = await Promise.all([
    fetchCollection<WPPost>("posts?status=publish"),
    fetchCollection<WPMedia>("media"),
    fetchCollection<WPTerm>("categories"),
    fetchCollection<WPTerm>("tags"),
    fetchCollection<WPUser>("users"),
  ]);

  const categoryNames = new Map(categories.map((term) => [term.id, term.name]));
  const tagNames = new Map(tags.map((term) => [term.id, term.name]));
  const userNames = new Map(users.map((user) => [user.id, user.name]));

  let writtenPosts = 0;

  for (const post of posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())) {
    const directorySlug = decodeSlug(post.slug);
    const slug = String(post.id);
    const postDir = path.join(blogRoot, directorySlug);

    ensureDir(postDir);

    const html = post.content.rendered || "";
    const assetUrls = [...new Set(parseImageUrls(html).filter(isLocalWordPressUpload))];

    const assetMap = new Map<string, string>();
    for (const url of assetUrls) {
      const fileName = uniqueFileName(postDir, url, assetMap);
      assetMap.set(url, fileName);
      const filePath = path.join(postDir, fileName);

      if (!fs.existsSync(filePath)) {
        await downloadFile(url, filePath);
      }
    }

    const featuredMedia = post.featured_media
      ? media.find((item) => item.id === post.featured_media)
      : null;

    if (featuredMedia && !assetMap.has(featuredMedia.source_url)) {
      const fileName = uniqueFileName(postDir, featuredMedia.source_url, assetMap);
      assetMap.set(featuredMedia.source_url, fileName);
      const filePath = path.join(postDir, fileName);

      if (!fs.existsSync(filePath)) {
        await downloadFile(featuredMedia.source_url, filePath);
      }
    }

    const markdown = rewriteMarkdownAssets(toMarkdown(html), assetMap);
    const imagePath = featuredMedia ? assetMap.get(featuredMedia.source_url) ?? "" : "";
    const categoriesForPost = post.categories.map((id) => categoryNames.get(id)).filter(Boolean) as string[];
    const tagsForPost = post.tags.map((id) => tagNames.get(id)).filter(Boolean) as string[];
    const postLang = detectContentLang(
      post.title.rendered,
      post.excerpt.rendered,
      markdown,
    );

    writeSingleLocalePost(postDir, {
      title: post.title.rendered,
      date: post.date.slice(0, 10),
      author: userNames.get(post.author) ?? "Aosus",
      tags: tagsForPost,
      categories: categoriesForPost.length > 0 ? categoriesForPost : ["general"],
      image: imagePath || "",
      thumbnail: imagePath || "",
      ogImage: imagePath || "",
      excerpt: toExcerpt(post.excerpt.rendered),
      slug,
      wpId: post.id,
      wpType: post.type,
      sourceUrl: post.link,
    }, markdown, postLang);

    writtenPosts += 1;
  }

  for (const item of media.sort((a, b) => b.id - a.id)) {
    const mediaSlug = makeWordPressSlug(item.id, item.slug);
    const mediaDir = path.join(blogRoot, mediaSlug);
    ensureDir(mediaDir);

    const assetMap = new Map<string, string>();
    const fileName = uniqueFileName(mediaDir, item.source_url, assetMap);
    const filePath = path.join(mediaDir, fileName);

    if (!fs.existsSync(filePath)) {
      await downloadFile(item.source_url, filePath);
    }
  }

  console.log(`Wrote ${writtenPosts} posts and ${media.length} media items.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
