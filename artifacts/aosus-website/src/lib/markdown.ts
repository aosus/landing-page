import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface PostFrontMatter {
  title: string;
  date: string;
  author: string;
  tags: string[];
  thumbnail: string;
  excerpt: string;
  slug: string;
  lang: "en" | "ar";
}

export interface Post extends PostFrontMatter {
  content: string;
}

const contentDir = path.join(process.cwd(), "content", "blog");

export function getAllPosts(lang: "en" | "ar"): PostFrontMatter[] {
  const langDir = path.join(contentDir, lang);

  if (!fs.existsSync(langDir)) {
    return [];
  }

  const files = fs.readdirSync(langDir).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const filePath = path.join(langDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.md$/, "");

    return {
      title: data.title || "",
      date: data.date || "",
      author: data.author || "",
      tags: data.tags || [],
      thumbnail: data.thumbnail || "/images/hero-1.png",
      excerpt: data.excerpt || "",
      slug,
      lang,
    } as PostFrontMatter;
  });

  posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return posts;
}

export async function getPostBySlug(
  slug: string,
  lang: "en" | "ar"
): Promise<Post | null> {
  const filePath = path.join(contentDir, lang, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content: rawContent } = matter(fileContents);

  const processedContent = await remark().use(html).process(rawContent);
  const content = processedContent.toString();

  return {
    title: data.title || "",
    date: data.date || "",
    author: data.author || "",
    tags: data.tags || [],
    thumbnail: data.thumbnail || "/images/hero-1.png",
    excerpt: data.excerpt || "",
    slug,
    lang,
    content,
  };
}

export function getAllSlugs(lang: "en" | "ar"): string[] {
  const langDir = path.join(contentDir, lang);

  if (!fs.existsSync(langDir)) {
    return [];
  }

  return fs
    .readdirSync(langDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
