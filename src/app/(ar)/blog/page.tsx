import { getRegularPosts } from "@/lib/markdown";
import { getBlogIndexMetadata } from "@/lib/metadata";
import BlogPageClient from "@/app/(en)/blog/BlogPageClient";

export const metadata = getBlogIndexMetadata("ar", "/blog");

export default function BlogPage() {
  const posts = getRegularPosts("ar");

  return <BlogPageClient posts={posts} lang="ar" />;
}
