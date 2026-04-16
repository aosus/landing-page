import { getRegularPosts } from "@/lib/markdown";
import BlogPageClient from "../../(en)/blog/BlogPageClient";
import { blogIndexMetadata } from "@/lib/siteMetadata";

export const metadata = blogIndexMetadata("en");

export default function EnBlogPage() {
  const posts = getRegularPosts("en");

  return <BlogPageClient posts={posts} lang="en" />;
}
