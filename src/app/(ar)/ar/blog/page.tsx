import { getRegularPosts } from "@/lib/markdown";
import { getBlogIndexMetadata } from "@/lib/metadata";
import BlogPageClient from "@/app/(en)/blog/BlogPageClient";

export const metadata = getBlogIndexMetadata("ar", "/ar/blog");

export default function ArBlogPage() {
  const posts = getRegularPosts("ar");
  return <BlogPageClient posts={posts} lang="ar" />;
}
