import WritingContestPage from "@/app/(en)/writing-contest/WritingContestPageClient";
import { getPostsByCategory } from "@/lib/markdown";
import { getPageMetadata } from "@/lib/metadata";

const pageMetadata = {
  title: "Writing contest",
  description:
    "A monthly Aosus contest that rewards strong Arabic writing about free and open-source software and publishes winner announcements.",
};

export const metadata = getPageMetadata(
  "en",
  "/en/writing-contest",
  pageMetadata,
  {
    includeLanguageAlternates: true,
  },
);

export default function EnWritingContestPage() {
  const posts = getPostsByCategory("en", "writing-contest");

  return <WritingContestPage lang="en" posts={posts} />;
}
