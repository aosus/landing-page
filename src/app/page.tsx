import HomePageClient from "./(en)/HomePageClient";
import { getLatestPosts } from "@/lib/markdown";
import { homeMetadata } from "@/lib/siteMetadata";

export const metadata = homeMetadata("ar");

export default function HomePage() {
  const enPosts = getLatestPosts("en");
  const arPosts = getLatestPosts("ar");

  return (
    <HomePageClient lang="ar" latestPosts={{ en: enPosts, ar: arPosts }} />
  );
}
