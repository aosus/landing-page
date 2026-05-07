import type { Metadata } from "next";
import type { PostFrontMatter } from "@/lib/markdown";
import type { Lang } from "@/lib/locale";
import { getLocalizedPath, stripLocalePrefix } from "@/lib/locale";
import { SITE_URL, getRssFeedPath } from "@/lib/rss";

const DEFAULT_OG_IMAGE = "/opengraph.jpg";

const SITE_COPY = {
  ar: {
    homeTitle: "أكبر مجتمع عربي للبرمجيات الحرة والمفتوحة",
    description:
      "مجتمع أسس هو أكبر مجتمع عربي مختص بإثراء المحتوى العربي في عدة مجالات أهمها البرمجيات الحرة والمفتوحة المصدر و الذكاء الاصطناعي.",
    blogTitle: "المدونة",
    blogDescription: "أخبار ومقالات وتحديثات من مجتمع أسس.",
    siteName: "مجتمع أسس",
    titleSuffix: "مجتمع أسس",
    locale: "ar",
  },
  en: {
    homeTitle: "Largest Arabic Community for Free and Open Source Software",
    description:
      "Aosus is the largest Arabic community dedicated to enriching Arabic content across several fields, most notably free and open source software and artificial intelligence.",
    blogTitle: "Blog",
    blogDescription: "News, articles, and updates from the Aosus community.",
    siteName: "Aosus",
    titleSuffix: "Aosus community",
    locale: "en",
  },
} as const;

type OpenGraphPageType =
  | "article"
  | "book"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "profile"
  | "website"
  | "video.tv_show"
  | "video.other"
  | "video.movie"
  | "video.episode";

type PageMetadataInput = {
  title?: string;
  description?: string;
  thumbnail?: string;
  type?: OpenGraphPageType;
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
};

type MetadataOptions = {
  includeLanguageAlternates?: boolean;
};

function getLocalizedUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

function getLanguageAlternates(pathname: string) {
  const basePath = stripLocalePrefix(pathname);

  return {
    ar: getLocalizedPath("ar", basePath),
    en: getLocalizedPath("en", basePath),
  };
}

function getFullTitle(lang: Lang, title?: string): string {
  const copy = SITE_COPY[lang];
  const resolvedTitle = title || copy.homeTitle;
  return `${resolvedTitle} | ${copy.titleSuffix}`;
}

function getSiteImage(thumbnail?: string): string {
  return thumbnail || DEFAULT_OG_IMAGE;
}

function getResolvedPageMetadata(lang: Lang, metadata: PageMetadataInput = {}) {
  const copy = SITE_COPY[lang];

  return {
    title: getFullTitle(lang, metadata.title),
    description: metadata.description || copy.description,
    image: getSiteImage(metadata.thumbnail),
    type: metadata.type || "website",
  };
}

export function getBaseLocaleMetadata(lang: Lang): Metadata {
  const copy = SITE_COPY[lang];
  const resolved = getResolvedPageMetadata(lang);

  return {
    title: {
      default: resolved.title,
      template: "%s",
    },
    description: resolved.description,
    openGraph: {
      title: resolved.title,
      description: resolved.description,
      siteName: copy.siteName,
      type: resolved.type,
      locale: copy.locale,
      images: [resolved.image],
    },
    twitter: {
      card: "summary_large_image",
      title: resolved.title,
      description: resolved.description,
      images: [resolved.image],
    },
  };
}

export function getPageMetadata(
  lang: Lang,
  pathname: string,
  metadata: PageMetadataInput = {},
  options: MetadataOptions = {},
): Metadata {
  const copy = SITE_COPY[lang];
  const url = getLocalizedUrl(pathname);
  const resolved = getResolvedPageMetadata(lang, metadata);

  return {
    title: resolved.title,
    description: resolved.description,
    alternates: {
      canonical: pathname,
      ...(options.includeLanguageAlternates
        ? { languages: getLanguageAlternates(pathname) }
        : {}),
      types: {
        "application/rss+xml": getRssFeedPath(lang),
      },
    },
    openGraph: {
      title: resolved.title,
      description: resolved.description,
      url,
      siteName: copy.siteName,
      type: resolved.type,
      locale: copy.locale,
      images: [resolved.image],
      publishedTime: metadata.publishedTime,
      authors: metadata.authors,
      tags: metadata.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: resolved.title,
      description: resolved.description,
      images: [resolved.image],
    },
  };
}

export function getSiteMetadata(lang: Lang, pathname: string): Metadata {
  const copy = SITE_COPY[lang];

  return getPageMetadata(lang, pathname, {
    title: copy.homeTitle,
    description: copy.description,
  }, {
    includeLanguageAlternates: true,
  });
}

export function getBlogIndexMetadata(lang: Lang, pathname: string): Metadata {
  const copy = SITE_COPY[lang];

  return getPageMetadata(lang, pathname, {
    title: copy.blogTitle,
    description: copy.blogDescription,
  }, {
    includeLanguageAlternates: true,
  });
}

export function getBlogPostMetadata(
  lang: Lang,
  pathname: string,
  post: Pick<
    PostFrontMatter,
    | "title"
    | "excerpt"
    | "thumbnail"
    | "image"
    | "ogImage"
    | "date"
    | "author"
    | "tags"
  >,
): Metadata {
  return getPageMetadata(lang, pathname, {
    title: post.title,
    description: post.excerpt,
    thumbnail: post.thumbnail || post.ogImage || post.image,
    type: "article",
    publishedTime: post.date,
    authors: [post.author],
    tags: post.tags,
  });
}
