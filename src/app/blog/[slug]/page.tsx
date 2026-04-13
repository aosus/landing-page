import { getPostBySlug, getAllSlugs } from "@/lib/markdown";
import { getRegularPosts } from "@/lib/markdown";
import ArticlePageClient from "../../(en)/blog/[slug]/ArticlePageClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getAllSlugs("ar");
  return Array.from(
    new Set(
      slugs.flatMap((slug) => [slug, encodeURIComponent(slug)]),
    ),
  ).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, "ar");
  if (!post) return {};

  return {
    title: `${post.title} - أسس`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPostBySlug(decodedSlug, "ar");

  if (!post) {
    notFound();
  }

  const allPosts = getRegularPosts("ar");
  const currentIndex = allPosts.findIndex((item) => item.slug === decodedSlug);
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return <ArticlePageClient post={post} prevPost={prevPost} lang="ar" />;
}
