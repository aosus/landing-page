import WritingContestPage from "../../(en)/writing-contest/WritingContestPageClient";
import { getPostsByCategory } from "@/lib/markdown";

export default function ArWritingContestPage() {
  const posts = getPostsByCategory("ar", "writing-contest");

  return <WritingContestPage lang="ar" posts={posts} />;
}
