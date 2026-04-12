import HomePageClient from "../(en)/HomePageClient";
import { getAllPosts } from "@/lib/markdown";

export default function EnHomePage() {
  const enPosts = getAllPosts("en");
  const arPosts = getAllPosts("ar");

  return (
    <HomePageClient lang="en" latestPosts={{ en: enPosts, ar: arPosts }} />
  );
}
