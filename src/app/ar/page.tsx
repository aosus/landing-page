import HomePageClient from "../(en)/HomePageClient";
import { getLatestPosts } from "@/lib/markdown";

export default function ArHomePage() {
  const enPosts = getLatestPosts("en");
  const arPosts = getLatestPosts("ar");
  return <HomePageClient lang="ar" latestPosts={{ en: enPosts, ar: arPosts }} />;
}
