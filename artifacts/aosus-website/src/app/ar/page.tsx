import HomePageClient from "../(en)/HomePageClient";
import { getAllPosts } from "@/lib/markdown";

export default function ArHomePage() {
  const enPosts = getAllPosts("en");
  const arPosts = getAllPosts("ar");
  return <HomePageClient lang="ar" latestPosts={{ en: enPosts, ar: arPosts }} />;
}
