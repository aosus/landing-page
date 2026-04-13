import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
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
}

export const POSTS_PER_PAGE = 9;

export interface Post extends PostFrontMatter {
  content: string;
}

const contentRoot = path.join(process.cwd(), "content");
const blogRoot = path.join(contentRoot, "blog");

function getPostDir(slug: string): string {
  return path.join(blogRoot, slug);
}

function getPostFilePath(slug: string, lang: Lang): string {
  return path.join(getPostDir(slug), `index.${lang}.md`);
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

  return `/content/${relativePath}`;
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

function getAllPostDirectories(): string[] {
  if (!fs.existsSync(blogRoot)) {
    return [];
  }

  return fs
    .readdirSync(blogRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function parsePostFrontMatter(filePath: string, slug: string, lang: Lang) {
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

  return {
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
    } as PostFrontMatter,
    content,
  };
}

export function getAllPosts(lang: Lang): PostFrontMatter[] {
  const posts = getAllPostDirectories()
    .map((slug) => {
      const filePath = getPostFilePath(slug, lang);

      if (!fs.existsSync(filePath)) {
        return null;
      }

      return parsePostFrontMatter(filePath, slug, lang).frontMatter;
    })
    .filter((post): post is PostFrontMatter => post !== null);

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getRegularPosts(lang: Lang): PostFrontMatter[] {
  return getAllPosts(lang).filter((post) => !post.categories.includes("writing-contest"));
}

export function getLatestPosts(lang: Lang, count = 3): PostFrontMatter[] {
  return getRegularPosts(lang).slice(0, count);
}

export function getPostsByCategory(lang: Lang, category: string): PostFrontMatter[] {
  return getAllPosts(lang).filter((post) => post.categories.includes(category));
}

export function getArticleFilePath(slug: string, lang: Lang): string | null {
  const filePath = getPostFilePath(slug, lang);

  return fs.existsSync(filePath) ? filePath : null;
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
  const filePath = getPostFilePath(slug, lang);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { frontMatter, content: rawContent } = parsePostFrontMatter(
    filePath,
    slug,
    lang,
  );

  const processedContent = await remark().use(html).process(
    rewriteMarkdownImages(filePath, rawContent),
  );

  return {
    ...frontMatter,
    content: processedContent.toString(),
  };
}

export function getAllSlugs(lang: Lang): string[] {
  return getAllPostDirectories().filter((slug) =>
    fs.existsSync(getPostFilePath(slug, lang)),
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
