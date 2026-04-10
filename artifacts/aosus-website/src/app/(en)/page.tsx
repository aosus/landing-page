import HomePageClient from "./HomePageClient";
import { getAllPosts } from "@/lib/markdown";

export default function HomePage() {
  const enPosts = getAllPosts("en");
  const arPosts = getAllPosts("ar");
  return <HomePageClient latestPosts={{ en: enPosts, ar: arPosts }} />;
}
