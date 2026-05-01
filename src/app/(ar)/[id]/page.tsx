import {
  getPostBySlug,
  getRegularPosts,
  getWordPressPostSlugs,
} from "@/lib/markdown";
import ArticlePageClient from "@/app/(en)/blog/[slug]/ArticlePageClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPostMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getWordPressPostSlugs("ar").map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostBySlug(id, "ar");

  if (!post) return {};

  return getBlogPostMetadata("ar", `/${encodeURIComponent(id)}`, post);
}

export default async function RootWordPressArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostBySlug(id, "ar");

  if (!post || post.wpType !== "post" || post.wpId !== id) {
    notFound();
  }

  const allPosts = getRegularPosts("ar");
  const currentIndex = allPosts.findIndex((item) => item.slug === id);
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return <ArticlePageClient post={post} prevPost={prevPost} lang="ar" />;
}
