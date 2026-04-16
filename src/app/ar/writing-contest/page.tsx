import WritingContestPage from "../../(en)/writing-contest/WritingContestPageClient";
import { getPostsByCategory } from "@/lib/markdown";
import { writingContestMetadata } from "@/lib/siteMetadata";

export const metadata = writingContestMetadata("ar");

export default function ArWritingContestPage() {
  const posts = getPostsByCategory("ar", "writing-contest");

  return <WritingContestPage lang="ar" posts={posts} />;
}
