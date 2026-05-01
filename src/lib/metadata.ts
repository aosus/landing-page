import type { Metadata } from "next";
import type { PostFrontMatter } from "@/lib/markdown";
import type { Lang } from "@/lib/locale";

const SITE_URL = "https://aosus.org";
const DEFAULT_OG_IMAGE = "/opengraph.jpg";

const SITE_COPY = {
  ar: {
    title: "أكبر مجتمع عربي للبرمجيات الحرة والمفتوحة | مجتمع أسس",
    description:
      "مجتمع أسس هو أكبر مجتمع عربي مختص بإثراء المحتوى العربي في عدة مجالات أهمها البرمجيات الحرة والمفتوحة المصدر و الذكاء الاصطناعي.",
    blogTitle: "المدونة | مجتمع أسس",
    blogDescription: "أخبار ومقالات وتحديثات من مجتمع أسس.",
    siteName: "مجتمع أسس",
    locale: "ar",
  },
  en: {
    title: "Largest Arabic Community for Free and Open Source Software | Aosus",
    description:
      "Aosus is the largest Arabic community dedicated to enriching Arabic content across several fields, most notably free and open source software and artificial intelligence.",
    blogTitle: "Blog | Aosus",
    blogDescription: "News, articles, and updates from the Aosus community.",
    siteName: "Aosus",
    locale: "en",
  },
} as const;

function getLocalizedUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

function getSiteImage(post?: Pick<PostFrontMatter, "thumbnail">): string {
  return post?.thumbnail || DEFAULT_OG_IMAGE;
}

export function getBaseLocaleMetadata(lang: Lang): Metadata {
  const copy = SITE_COPY[lang];
  const image = getSiteImage();

  return {
    title: {
      default: copy.title,
      template: "%s",
    },
    description: copy.description,
    openGraph: {
      title: copy.title,
      description: copy.description,
      siteName: copy.siteName,
      type: "website",
      locale: copy.locale,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [image],
    },
  };
}

export function getSiteMetadata(lang: Lang, pathname: string): Metadata {
  const copy = SITE_COPY[lang];
  const url = getLocalizedUrl(pathname);
  const image = getSiteImage();

  return {
    ...getBaseLocaleMetadata(lang),
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url,
      siteName: copy.siteName,
      type: "website",
      locale: copy.locale,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [image],
    },
  };
}

export function getBlogIndexMetadata(lang: Lang, pathname: string): Metadata {
  const copy = SITE_COPY[lang];
  const url = getLocalizedUrl(pathname);
  const image = getSiteImage();

  return {
    title: copy.blogTitle,
    description: copy.blogDescription,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: copy.blogTitle,
      description: copy.blogDescription,
      url,
      siteName: copy.siteName,
      type: "website",
      locale: copy.locale,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.blogTitle,
      description: copy.blogDescription,
      images: [image],
    },
  };
}

export function getBlogPostMetadata(
  lang: Lang,
  pathname: string,
  post: Pick<
    PostFrontMatter,
    "title" | "excerpt" | "thumbnail" | "date" | "author" | "tags"
  >,
): Metadata {
  const copy = SITE_COPY[lang];
  const url = getLocalizedUrl(pathname);
  const image = getSiteImage(post);

  return {
    title: `${post.title} | ${copy.siteName}`,
    description: post.excerpt,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: copy.siteName,
      type: "article",
      locale: copy.locale,
      images: [image],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}
