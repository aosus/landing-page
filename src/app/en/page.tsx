import HomePageClient from "../(en)/HomePageClient";
import { getLatestPosts } from "@/lib/markdown";

export default function EnHomePage() {
  const enPosts = getLatestPosts("en");
  const arPosts = getLatestPosts("ar");

  return (
    <HomePageClient lang="en" latestPosts={{ en: enPosts, ar: arPosts }} />
  );
}
