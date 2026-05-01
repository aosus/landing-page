import HomePageClient from "../(en)/HomePageClient";
import { getLatestPosts, getLatestPostsWithFallback } from "@/lib/markdown";

export default function EnHomePage() {
  const enPosts = getLatestPostsWithFallback("en", "ar");
  const arPosts = getLatestPosts("ar");

  return (
    <HomePageClient lang="en" latestPosts={{ en: enPosts, ar: arPosts }} />
  );
}
