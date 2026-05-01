import HomePageClient from "../(en)/HomePageClient";
import { getLatestPosts } from "@/lib/markdown";
import { getSiteMetadata } from "@/lib/metadata";

export const metadata = getSiteMetadata("ar", "/ar");

export default function ArHomePage() {
  const enPosts = getLatestPosts("en");
  const arPosts = getLatestPosts("ar");
  return <HomePageClient lang="ar" latestPosts={{ en: enPosts, ar: arPosts }} />;
}
