import fs from "fs";
import path from "path";
import { visit } from "unist-util-visit";
import {
  isPreviewableExternalUrl,
  normalizeComparableUrl,
  normalizePreviewUrl,
} from "@/lib/linkPreviewUtils";

const manifestPath = path.join(process.cwd(), "public", "link-previews", "manifest.json");

export interface LinkPreviewEntry {
  title?: string;
  description?: string;
  siteName?: string;
  hostname?: string;
  localFavicon?: string;
  fetchedAt?: string;
  expiresAt?: string;
  error?: boolean;
}

export type LinkPreviewManifest = Record<string, LinkPreviewEntry>;

function loadManifestFromDisk(): LinkPreviewManifest {
  try {
    if (!fs.existsSync(manifestPath)) {
      return {};
    }

    const contents = fs.readFileSync(manifestPath, "utf8");
    const parsed = JSON.parse(contents) as LinkPreviewManifest;

    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return parsed;
  } catch {
    return {};
  }
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toPlainText(node: any): string {
  if (!node) {
    return "";
  }

  if (node.type === "text" && typeof node.value === "string") {
    return node.value;
  }

  if (!Array.isArray(node.children)) {
    return "";
  }

  return node.children.map((child: any) => toPlainText(child)).join("");
}

function resolvePreview(url: string, manifest: LinkPreviewManifest): LinkPreviewEntry | null {
  const normalized = normalizePreviewUrl(url);

  if (!normalized) {
    return null;
  }

  const withoutTrailingSlash = normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
  const withTrailingSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;

  const candidate =
    manifest[normalized] ??
    manifest[withoutTrailingSlash] ??
    manifest[withTrailingSlash] ??
    manifest[url];

  if (!candidate || candidate.error) {
    return null;
  }

  return candidate;
}

function buildInlineMarkup(url: string, label: string, preview: LinkPreviewEntry): string {
  const safeUrl = escapeHtml(url);
  const safeLabel = escapeHtml(label);
  const site = escapeHtml(preview.siteName || preview.hostname || new URL(url).hostname);
  const title = escapeHtml(preview.title || label || url);
  const description = preview.description ? escapeHtml(preview.description) : "";
  const favicon = escapeHtml(preview.localFavicon || "/link-previews/favicons/default.svg");

  return `
<span class="aosus-link-preview-inline">
  <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="aosus-link-preview-link">${safeLabel}</a>
  <span aria-hidden="true" class="aosus-link-preview-hover">
    <span class="aosus-link-preview-hover__head">
      <img src="${favicon}" alt="" class="aosus-link-preview-hover__favicon" loading="lazy" decoding="async" />
      <span class="aosus-link-preview-hover__site">${site}</span>
    </span>
    <span class="aosus-link-preview-hover__title">${title}</span>
    ${description ? `<span class="aosus-link-preview-hover__description">${description}</span>` : ""}
  </span>
</span>`;
}

function buildStandaloneMarkup(url: string, preview: LinkPreviewEntry): string {
  const safeUrl = escapeHtml(url);
  const site = escapeHtml(preview.siteName || preview.hostname || new URL(url).hostname);
  const title = escapeHtml(preview.title || url);
  const description = preview.description ? escapeHtml(preview.description) : "";
  const favicon = escapeHtml(preview.localFavicon || "/link-previews/favicons/default.svg");

  return `
<aside class="aosus-link-preview-card not-prose">
  <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="aosus-link-preview-card__link">
    <span class="aosus-link-preview-card__icon-wrap">
      <img src="${favicon}" alt="" class="aosus-link-preview-card__icon" loading="lazy" decoding="async" />
    </span>
    <span class="aosus-link-preview-card__body">
      <span class="aosus-link-preview-card__site">${site}</span>
      <span class="aosus-link-preview-card__title">${title}</span>
      ${description ? `<span class="aosus-link-preview-card__description">${description}</span>` : ""}
    </span>
  </a>
</aside>`;
}

function isStandaloneRawUrl(linkNode: any): boolean {
  if (!Array.isArray(linkNode.children) || linkNode.children.length !== 1) {
    return false;
  }

  const child = linkNode.children[0];

  if (!child || child.type !== "text" || typeof child.value !== "string") {
    return false;
  }

  const textUrl = normalizeComparableUrl(child.value.trim());
  const hrefUrl = normalizeComparableUrl(linkNode.url || "");

  return Boolean(textUrl && hrefUrl && textUrl === hrefUrl);
}

function isRawHttpUrl(value: string): boolean {
  return /^https?:\/\/\S+$/i.test(value.trim());
}

export function createRemarkLinkPreviews(options?: { manifest?: LinkPreviewManifest }) {
  const manifest = options?.manifest ?? loadManifestFromDisk();

  return () => (tree: any) => {
    visit(tree, "paragraph", (node: any, index: number | undefined, parent: any) => {
      if (!parent || typeof index !== "number") {
        return;
      }

      if (!Array.isArray(node.children) || node.children.length !== 1) {
        return;
      }

      const child = node.children[0];
      let standaloneUrl: string | null = null;

      if (child.type === "link" && typeof child.url === "string" && isStandaloneRawUrl(child)) {
        standaloneUrl = child.url;
      }

      if (child.type === "text" && typeof child.value === "string" && isRawHttpUrl(child.value)) {
        standaloneUrl = child.value.trim();
      }

      if (!standaloneUrl || !isPreviewableExternalUrl(standaloneUrl)) {
        return;
      }

      const preview = resolvePreview(standaloneUrl, manifest);

      if (!preview) {
        return;
      }

      parent.children[index] = {
        type: "html",
        value: buildStandaloneMarkup(standaloneUrl, preview),
      };
    });

    visit(tree, "link", (node: any, index: number | undefined, parent: any) => {
      if (!parent || typeof index !== "number") {
        return;
      }

      if (parent.type === "paragraph" && Array.isArray(parent.children) && parent.children.length === 1) {
        return;
      }

      if (typeof node.url !== "string" || !isPreviewableExternalUrl(node.url)) {
        return;
      }

      const preview = resolvePreview(node.url, manifest);

      if (!preview) {
        return;
      }

      const label = toPlainText(node).trim() || node.url;

      parent.children[index] = {
        type: "html",
        value: buildInlineMarkup(node.url, label, preview),
      };
    });
  };
}

export default createRemarkLinkPreviews();
