import ServicesPage from "@/app/(en)/services/ServicesPageClient";
import { getPageMetadata } from "@/lib/metadata";

const pageMetadata = {
  title: "Privacy frontends",
  description:
    "Privacy-respecting frontends for popular platforms, without ads, tracking, or unnecessary scripts.",
};

export const metadata = getPageMetadata("en", "/en/services", pageMetadata);

export default function EnServicesPage() {
  return <ServicesPage lang="en" />;
}
