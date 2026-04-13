import { getRegularPosts } from "@/lib/markdown";
import BlogPageClient from "../../(en)/blog/BlogPageClient";

export const metadata = {
  title: "Blog - Aosus",
  description: "News, tutorials, and updates from the Aosus community.",
};

export default function EnBlogPage() {
  const posts = getRegularPosts("en");

  return <BlogPageClient posts={posts} lang="en" />;
}
