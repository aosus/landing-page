import { getRegularPosts } from "@/lib/markdown";
import { getBlogIndexMetadata } from "@/lib/metadata";
import BlogPageClient from "@/app/(en)/blog/BlogPageClient";
import { getLocalizedPath } from "@/lib/locale";

export const metadata = getBlogIndexMetadata("en", "/en/blog");

export default function EnBlogPage() {
  const posts = getRegularPosts("en");

  return (
    <BlogPageClient
      posts={posts}
      lang="en"
      untranslatedNotice={{
        title: "Arabic-only posts stay on the Arabic blog",
        description:
          "Only translated posts appear here. Browse the Arabic blog for the full archive and latest announcements.",
        href: getLocalizedPath("ar", "/blog"),
        cta: "Open Arabic Blog",
      }}
    />
  );
}
