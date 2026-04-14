import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkLinkPreviews from "./remarkLinkPreviews";
import type { Lang } from "@/lib/locale";

export interface PostFrontMatter {
  title: string;
  date: string;
  author: string;
  tags: string[];
  categories: string[];
  image: string;
  thumbnail: string;
  ogImage: string;
  excerpt: string;
  slug: string;
  lang: Lang;
  wpId?: string;
  wpType?: string;
  sourceUrl?: string;
}

export const POSTS_PER_PAGE = 9;

export interface Post extends PostFrontMatter {
  content: string;
}

const contentRoot = path.join(process.cwd(), "content");
const blogRoot = path.join(contentRoot, "blog");

interface ParsedPostFile {
  filePath: string;
  content: string;
  frontMatter: PostFrontMatter;
}

function getPostDir(directorySlug: string): string {
  return path.join(blogRoot, directorySlug);
}

function getMarkdownFilePath(directorySlug: string, lang: Lang): string {
  return path.join(getPostDir(directorySlug), `index.${lang}.md`);
}

function isRemoteAsset(assetPath: string): boolean {
  return /^(?:https?:)?\/\//i.test(assetPath) || assetPath.startsWith("data:");
}

function resolvePostAssetUrl(filePath: string, assetPath: string): string {
  if (isRemoteAsset(assetPath)) {
    return assetPath;
  }

  const absolutePath = path.resolve(path.dirname(filePath), assetPath);
  const relativePath = path.relative(contentRoot, absolutePath).replaceAll(path.sep, "/");
  const encodedRelativePath = relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `/content/${encodedRelativePath}`;
}

function rewriteMarkdownImages(filePath: string, markdown: string): string {
  return markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt: string, rawUrl: string) => {
    const url = rawUrl.trim();

    if (isRemoteAsset(url) || url.startsWith("/")) {
      return `![${alt}](${url})`;
    }

    const resolvedUrl = resolvePostAssetUrl(filePath, url);
    return `![${alt}](${resolvedUrl})`;
  });
}

function normalizeString(value: unknown): string | undefined {
  if (typeof value === "string") {
    const normalized = value.trim();
    return normalized ? normalized : undefined;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return undefined;
}

function resolvePublicSlug(data: Record<string, unknown>, directorySlug: string): string {
  const wpType = normalizeString(data.wpType);

  if (wpType === "post") {
    return normalizeString(data.wpId) ?? normalizeString(data.slug) ?? directorySlug;
  }

  return normalizeString(data.slug) ?? directorySlug;
}

function getAllPostDirectories(): string[] {
  if (!fs.existsSync(blogRoot)) {
    return [];
  }

  function walk(dir: string, relativeDir = ""): string[] {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .flatMap((entry) => {
        if (!entry.isDirectory() || entry.name.startsWith("_")) {
          return [];
        }

        const nextRelativeDir = path.join(relativeDir, entry.name);
        const nextDir = path.join(dir, entry.name);
        const hasIndexFile = ["index.ar.md", "index.en.md"].some((fileName) =>
          fs.existsSync(path.join(nextDir, fileName)),
        );

        return [
          ...(hasIndexFile ? [nextRelativeDir] : []),
          ...walk(nextDir, nextRelativeDir),
        ];
      });
  }

  return walk(blogRoot);
}

function parsePostFile(filePath: string, directorySlug: string, lang: Lang): ParsedPostFile {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const imageSource = data.image || "cover.png";
  const thumbnailSource = data.thumbnail || imageSource;
  const ogImageSource = data.ogImage || imageSource;
  const categories = Array.isArray(data.categories)
    ? data.categories
    : data.categories
      ? [data.categories]
      : [];
  const tags = Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [];
  const wpId = normalizeString(data.wpId);
  const wpType = normalizeString(data.wpType);
  const sourceUrl = normalizeString(data.sourceUrl);
  const slug = resolvePublicSlug(data, directorySlug);

  return {
    filePath,
    frontMatter: {
      title: data.title || "",
      date: data.date || "",
      author: data.author || "",
      tags,
      categories,
      image: resolvePostAssetUrl(filePath, imageSource),
      thumbnail: resolvePostAssetUrl(filePath, thumbnailSource),
      ogImage: resolvePostAssetUrl(filePath, ogImageSource),
      excerpt: data.excerpt || "",
      slug,
      lang,
      wpId,
      wpType,
      sourceUrl,
    } as PostFrontMatter,
    content,
  };
}

function getParsedPosts(lang: Lang): ParsedPostFile[] {
  return getAllPostDirectories()
    .flatMap((directorySlug) => {
      const filePath = getMarkdownFilePath(directorySlug, lang);

      if (!fs.existsSync(filePath)) {
        return [];
      }

      return [parsePostFile(filePath, directorySlug, lang)];
    });
}

function findPostBySlug(slug: string, lang: Lang): ParsedPostFile | null {
  return getParsedPosts(lang).find((post) => post.frontMatter.slug === slug) ?? null;
}

export function getAllPosts(lang: Lang): PostFrontMatter[] {
  const posts = getParsedPosts(lang).map((post) => post.frontMatter);

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getRegularPosts(lang: Lang): PostFrontMatter[] {
  return getAllPosts(lang).filter(
    (post) => !post.categories.includes("writing-contest") && !post.categories.includes("media"),
  );
}

export function getLatestPosts(lang: Lang, count = 3): PostFrontMatter[] {
  return getRegularPosts(lang).slice(0, count);
}

export function getPostsByCategory(lang: Lang, category: string): PostFrontMatter[] {
  return getAllPosts(lang).filter((post) => post.categories.includes(category));
}

export function getArticleFilePath(slug: string, lang: Lang): string | null {
  return findPostBySlug(slug, lang)?.filePath ?? null;
}

export function getPostAssetPath(slug: string, lang: Lang, assetPath: string): string {
  const filePath = getArticleFilePath(slug, lang);

  if (!filePath) {
    return assetPath;
  }

  return resolvePostAssetUrl(filePath, assetPath);
}

export async function getPostBySlug(
  slug: string,
  lang: Lang,
): Promise<Post | null> {
  const post = findPostBySlug(slug, lang);

  if (!post) {
    return null;
  }

  const processedContent = await remark()
    .use(remarkLinkPreviews)
    .use(html, { sanitize: false })
    .process(rewriteMarkdownImages(post.filePath, post.content));

  return {
    ...post.frontMatter,
    content: processedContent.toString(),
  };
}

export function getAllSlugs(lang: Lang): string[] {
  return Array.from(new Set(getParsedPosts(lang).map((post) => post.frontMatter.slug)));
}

export function getWordPressPostSlugs(lang: Lang): string[] {
  return Array.from(
    new Set(
      getParsedPosts(lang)
        .filter((post) => post.frontMatter.wpId && post.frontMatter.wpType === "post")
        .map((post) => post.frontMatter.slug),
    ),
  );
}

export function getBlogRouteSlugs(lang: Lang): string[] {
  return Array.from(
    new Set(
      getParsedPosts(lang)
        .filter((post) => !(post.frontMatter.wpType === "post" && post.frontMatter.wpId))
        .map((post) => post.frontMatter.slug),
    ),
  );
}

export function getTotalPostPages(lang: Lang): number {
  return Math.max(1, Math.ceil(getRegularPosts(lang).length / POSTS_PER_PAGE));
}

export function getPostsPage(lang: Lang, page: number) {
  const allPosts = getRegularPosts(lang);
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));

  if (page < 1 || page > totalPages) {
    return null;
  }

  const startIndex = (page - 1) * POSTS_PER_PAGE;

  return {
    currentPage: page,
    totalPages,
    posts: allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE),
  };
}
