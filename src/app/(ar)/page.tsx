import HomePageClient from "@/app/(en)/HomePageClient";
import { getLatestPosts } from "@/lib/markdown";
import { getSiteMetadata } from "@/lib/metadata";

export const metadata = getSiteMetadata("ar", "/");

export default function HomePage() {
  const enPosts = getLatestPosts("en");
  const arPosts = getLatestPosts("ar");

  return (
    <HomePageClient lang="ar" latestPosts={{ en: enPosts, ar: arPosts }} />
  );
}
