import HomePageClient from "../(en)/HomePageClient";
import { getLatestPosts, getLatestPostsWithFallback } from "@/lib/markdown";
import { getSiteMetadata } from "@/lib/metadata";

export const metadata = getSiteMetadata("en", "/en");

export default function EnHomePage() {
  const enPosts = getLatestPostsWithFallback("en", "ar");
  const arPosts = getLatestPosts("ar");

  return (
    <HomePageClient lang="en" latestPosts={{ en: enPosts, ar: arPosts }} />
  );
}
