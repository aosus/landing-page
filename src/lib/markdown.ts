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
  image: string;
  thumbnail: string;
  ogImage: string;
  excerpt: string;
  slug: string;
  lang: Lang;
}

export const POSTS_PER_PAGE = 9;

function getImageBaseName(sourceImage: string): string {
  return sourceImage.replace(/^\/images\//, "").replace(/\.[^.]+$/, "");
}

function deriveOptimizedImage(sourceImage: string): string {
  return `/images/processed/${getImageBaseName(sourceImage)}.webp`;
}

function deriveThumbnail(sourceImage: string): string {
  return `/images/thumbs/${getImageBaseName(sourceImage)}.webp`;
}

function deriveOgImage(sourceImage: string): string {
  return `/og/${getImageBaseName(sourceImage)}.jpg`;
}

export interface Post extends PostFrontMatter {
  content: string;
}

const contentDir = path.join(process.cwd(), "content", "blog");

function getPostDir(slug: string): string {
  return path.join(contentDir, slug);
}

function getPostFilePath(slug: string, lang: Lang): string {
  return path.join(getPostDir(slug), `index.${lang}.md`);
}

function getAllPostDirectories(): string[] {
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  return fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function parsePostFrontMatter(filePath: string, slug: string, lang: Lang) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const sourceImage = data.image || data.thumbnail || "/images/hero-1.png";

  return {
    frontMatter: {
      title: data.title || "",
      date: data.date || "",
      author: data.author || "",
      tags: data.tags || [],
      image: deriveOptimizedImage(sourceImage),
      thumbnail: deriveThumbnail(sourceImage),
      ogImage: deriveOgImage(sourceImage),
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

  posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return posts;
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

  const processedContent = await remark().use(html).process(rawContent);
  const content = processedContent.toString();

  return {
    ...frontMatter,
    content,
  };
}

export function getAllSlugs(lang: Lang): string[] {
  return getAllPostDirectories().filter((slug) =>
    fs.existsSync(getPostFilePath(slug, lang)),
  );
}

export function getTotalPostPages(lang: Lang): number {
  const totalPosts = getAllPosts(lang).length;
  return Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
}

export function getPostsPage(lang: Lang, page: number) {
  const allPosts = getAllPosts(lang);
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
