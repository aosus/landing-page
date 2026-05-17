import type { Post } from "@/lib/markdown";
import type { Lang } from "@/lib/locale";
import { getAbsolutePostUrl } from "@/lib/discourse";
import discussionMap from "@/generated/discourse-discussions.json";

export function getDiscussionUrl(articleUrl: string, map: Record<string, string> = discussionMap): string | null {
  return map[articleUrl] ?? null;
}

export async function getArticleDiscussionUrl(post: Post, lang: Lang): Promise<string | null> {
  if (!post.commentsEnabled) {
    return null;
  }

  const articleUrl = getAbsolutePostUrl(
    lang,
    post.slug,
    post.wpType === "post" && post.wpId === post.slug,
  );

  return getDiscussionUrl(articleUrl);
}
