import { getRegularPosts } from "@/lib/markdown";
import BlogPageClient from "../../(en)/blog/BlogPageClient";
import { blogIndexMetadata } from "@/lib/siteMetadata";

export const metadata = blogIndexMetadata("ar");

export default function ArBlogPage() {
  const posts = getRegularPosts("ar");
  return <BlogPageClient posts={posts} lang="ar" />;
}
