import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/markdown";
import { getPostPath } from "@/lib/locale";
import { SITE_URL } from "@/lib/rss";

export const dynamic = "force-static";

const STATIC_PAGES = [
  "/",
  "/blog",
  "/services",
  "/writing-contest",
  "/support-us",
  "/contact-us",
  "/en",
  "/en/blog",
  "/en/services",
  "/en/writing-contest",
  "/en/support-us",
  "/en/contact-us",
] as const;

function toAbsoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

function getLanguageAlternates(pathname: string) {
  const basePath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";

  return {
    ar: toAbsoluteUrl(basePath),
    en: toAbsoluteUrl(basePath === "/" ? "/en" : `/en${basePath}`),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((pathname) => ({
    url: toAbsoluteUrl(pathname),
    lastModified: new Date(),
    alternates: {
      languages: getLanguageAlternates(pathname),
    },
  }));

  const postEntries: MetadataRoute.Sitemap = [
    ...getAllPosts("ar"),
    ...getAllPosts("en"),
  ].map((post) => ({
    url: toAbsoluteUrl(
      getPostPath(
        post.lang,
        post.slug,
        post.wpType === "post" && post.wpId === post.slug,
      ),
    ),
    lastModified: post.date,
  }));

  return [...staticEntries, ...postEntries];
}
