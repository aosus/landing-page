import {
  getBlogRouteSlugs,
  getPostBySlug,
  getRegularPosts,
} from "@/lib/markdown";
import ArticlePageClient from "../../../(en)/blog/[slug]/ArticlePageClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPostMetadata } from "@/lib/metadata";

export const dynamicParams = false;
const placeholderSlug = "__blog_placeholder__";

export async function generateStaticParams() {
  const slugs = getBlogRouteSlugs("en");
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: placeholderSlug }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, "en");
  if (!post || (post.wpType === "post" && post.wpId === post.slug)) return {};

  return getBlogPostMetadata("en", `/en/blog/${encodeURIComponent(slug)}`, post);
}

export default async function EnArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, "en");

  if (!post || (post.wpType === "post" && post.wpId === post.slug)) {
    notFound();
  }

  const allPosts = getRegularPosts("en");
  const currentIndex = allPosts.findIndex((item) => item.slug === slug);
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return <ArticlePageClient post={post} prevPost={prevPost} lang="en" />;
}
