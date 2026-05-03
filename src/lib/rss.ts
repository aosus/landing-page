import type { Post, PostFrontMatter } from "@/lib/markdown";
import type { Lang } from "@/lib/locale";
import { getLocalizedPath, getPostPath } from "@/lib/locale";

export const SITE_URL = "https://aosus.org";

const RSS_COPY = {
  ar: {
    title: "مدونة مجتمع أسس",
    description: "أخبار ومقالات وتحديثات من مجتمع أسس.",
    language: "ar",
    feedPath: "/rss.xml",
  },
  en: {
    title: "Aosus Blog",
    description: "News, articles, and updates from the Aosus community.",
    language: "en",
    feedPath: "/en/rss.xml",
  },
} as const;

const IMAGE_CONTENT_TYPES: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function getAbsoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

function formatRfc822Date(value: string): string | null {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toUTCString();
}

function stripHtml(value: string): string {
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeCdata(value: string): string {
  return value.replaceAll("]]>", "]]]]><![CDATA[>");
}

function absolutizeHtmlUrls(value: string): string {
  return value.replace(
    /\b(href|src)=(["'])(\/[^"']*)\2/g,
    (_match, attribute: string, quote: string, pathname: string) =>
      `${attribute}=${quote}${getAbsoluteUrl(pathname)}${quote}`,
  );
}

function getImageContentType(imageUrl: string): string | null {
  try {
    const pathname = new URL(getAbsoluteUrl(imageUrl)).pathname.toLowerCase();

    for (const [extension, contentType] of Object.entries(IMAGE_CONTENT_TYPES)) {
      if (pathname.endsWith(extension)) {
        return contentType;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function getPostUrl(post: Pick<PostFrontMatter, "lang" | "slug" | "wpType" | "wpId">): string {
  return getAbsoluteUrl(
    getPostPath(post.lang, post.slug, post.wpType === "post" && post.wpId === post.slug),
  );
}

export function getRssFeedPath(lang: Lang): string {
  return RSS_COPY[lang].feedPath;
}

export function getRssFeedUrl(lang: Lang): string {
  return getAbsoluteUrl(getRssFeedPath(lang));
}

export function buildRssXml(lang: Lang, posts: Post[]): string {
  const copy = RSS_COPY[lang];
  const siteUrl = getAbsoluteUrl(getLocalizedPath(lang, "/"));
  const blogUrl = getAbsoluteUrl(getLocalizedPath(lang, "/blog"));
  const feedUrl = getRssFeedUrl(lang);
  const lastBuildDate = posts
    .map((post) => formatRfc822Date(post.date))
    .find((value): value is string => Boolean(value)) ?? new Date().toUTCString();

  const items = posts
    .map((post) => {
      const link = getPostUrl(post);
      const pubDate = formatRfc822Date(post.date);
      const description = post.excerpt || stripHtml(post.content);
      const htmlContent = absolutizeHtmlUrls(post.content.trim());
      const imageContentType = post.image ? getImageContentType(post.image) : null;

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink=\"true\">${escapeXml(link)}</guid>`,
        `      <description>${escapeXml(description)}</description>`,
        ...(pubDate ? [`      <pubDate>${pubDate}</pubDate>`] : []),
        ...(post.author ? [`      <dc:creator><![CDATA[${escapeCdata(post.author)}]]></dc:creator>`] : []),
        ...post.categories.map((category) => `      <category>${escapeXml(category)}</category>`),
        ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
        ...(post.image && imageContentType
          ? [
              `      <enclosure url=\"${escapeXml(getAbsoluteUrl(post.image))}\" type=\"${imageContentType}\" />`,
            ]
          : []),
        ...(htmlContent
          ? [
              `      <content:encoded><![CDATA[${escapeCdata(htmlContent)}]]></content:encoded>`,
            ]
          : []),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "  <channel>",
    `    <title>${escapeXml(copy.title)}</title>`,
    `    <link>${escapeXml(blogUrl)}</link>`,
    `    <description>${escapeXml(copy.description)}</description>`,
    `    <language>${copy.language}</language>`,
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `    <atom:link href=\"${escapeXml(feedUrl)}\" rel=\"self\" type=\"application/rss+xml\" />`,
    `    <image><url>${escapeXml(getAbsoluteUrl("/favicon.ico"))}</url><title>${escapeXml(copy.title)}</title><link>${escapeXml(siteUrl)}</link></image>`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
