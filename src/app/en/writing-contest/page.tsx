import WritingContestPage from "../../(en)/writing-contest/WritingContestPageClient";
import { getPostsByCategory } from "@/lib/markdown";

export default function EnWritingContestPage() {
  const posts = getPostsByCategory("en", "writing-contest");

  return <WritingContestPage lang="en" posts={posts} />;
}
