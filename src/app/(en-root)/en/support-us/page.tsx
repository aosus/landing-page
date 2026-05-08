import SupportPage from "@/app/(en)/support-us/SupportPageClient";
import { getPageMetadata } from "@/lib/metadata";

const pageMetadata = {
  title: "Support us",
  description:
    "Help Aosus keep community services online, sponsor events, and fund open-source initiatives across the Arabic FOSS community.",
};

export const metadata = getPageMetadata("en", "/en/support-us", pageMetadata, {
  includeLanguageAlternates: true,
});

export default function EnSupportPage() {
  return <SupportPage lang="en" />;
}
