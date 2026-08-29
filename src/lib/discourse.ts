import { getPostPath, type Lang } from "@/lib/locale";
import { SITE_URL } from "@/lib/rss";

export const DISCOURSE_URL = "https://discourse.aosus.org/";

const DISCUSSION_LINK_PATTERNS = [
  /<a[^>]*class=(['"])[^'"]*\bbutton\b[^'"]*\1[^>]*href=(['"])([^'"]+)\2/iu,
  /<a[^>]*class=(['"])[^'"]*\bpost-date\b[^'"]*\1[^>]*href=(['"])([^'"]+)\2/iu,
];

export function getAbsolutePostUrl(lang: Lang, slug: string, isWordPressPost = false): string {
  return new URL(getPostPath(lang, slug, isWordPressPost), SITE_URL).toString();
}

export function extractDiscourseDiscussionUrl(html: string): string | null {
  for (const pattern of DISCUSSION_LINK_PATTERNS) {
    const match = html.match(pattern);
    const href = match?.[3]?.trim();

    if (!href) {
      continue;
    }

    try {
      return new URL(href, DISCOURSE_URL).toString();
    } catch {
      continue;
    }
  }

  return null;
}
