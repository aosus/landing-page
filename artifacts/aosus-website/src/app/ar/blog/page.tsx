import { getAllPosts } from "@/lib/markdown";
import BlogPageClient from "../../(en)/blog/BlogPageClient";

export const metadata = {
  title: "المدونة - أسس",
  description: "أخبار ومقالات وتحديثات من مجتمع أسس.",
};

export default function ArBlogPage() {
  const posts = getAllPosts("ar");
  return <BlogPageClient posts={posts} lang="ar" />;
}
