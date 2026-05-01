import WritingContestPage from "@/app/(en)/writing-contest/WritingContestPageClient";
import { getPostsByCategory } from "@/lib/markdown";
import { getPageMetadata } from "@/lib/metadata";

const pageMetadata = {
  title: "جائزة الكتابة",
  description:
    "جائزة شهرية من مجتمع أسس لتحفيز كتابة محتوى عربي عن البرمجيات الحرة والمفتوحة مع جوائز مالية وإعلانات دورية للفائزين.",
};

export const metadata = getPageMetadata(
  "ar",
  "/ar/writing-contest",
  pageMetadata,
);

export default function ArWritingContestPage() {
  const posts = getPostsByCategory("ar", "writing-contest");

  return <WritingContestPage lang="ar" posts={posts} />;
}
