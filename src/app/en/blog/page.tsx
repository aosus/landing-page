import { getRegularPosts } from "@/lib/markdown";
import { getBlogIndexMetadata } from "@/lib/metadata";
import BlogPageClient from "../../(en)/blog/BlogPageClient";

export const metadata = getBlogIndexMetadata("en", "/en/blog");

export default function EnBlogPage() {
  const posts = getRegularPosts("en");

  return <BlogPageClient posts={posts} lang="en" />;
}
