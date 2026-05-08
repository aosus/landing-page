import HomePageClient from "@/app/(en)/HomePageClient";
import { getLatestPosts } from "@/lib/markdown";
import { getSiteMetadata } from "@/lib/metadata";

export const metadata = getSiteMetadata("en", "/en");

export default function EnHomePage() {
  const enPosts = getLatestPosts("en");
  const arPosts = getLatestPosts("ar");

  return (
    <HomePageClient lang="en" latestPosts={{ en: enPosts, ar: arPosts }} />
  );
}
