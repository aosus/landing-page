import ServicesPage from "@/app/(en)/services/ServicesPageClient";
import { getPageMetadata } from "@/lib/metadata";

const pageMetadata = {
  title: "Privacy frontends",
  description:
    "Privacy-respecting frontends for popular platforms, without ads, tracking, or unnecessary scripts.",
  thumbnail: "/og/privacy-frontends-link-preview.jpg",
};

export const metadata = getPageMetadata("en", "/en/services", pageMetadata, {
  includeLanguageAlternates: true,
});

export default function EnServicesPage() {
  return <ServicesPage lang="en" />;
}
