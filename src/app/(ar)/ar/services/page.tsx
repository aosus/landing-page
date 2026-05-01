import ServicesPage from "@/app/(en)/services/ServicesPageClient";
import { getPageMetadata } from "@/lib/metadata";

const pageMetadata = {
  title: "خدمات",
  description: "واجهات عامة تحترم الخصوصية للمنصات الشائعة، بدون إعلانات أو تتبع.",
};

export const metadata = getPageMetadata("ar", "/ar/services", pageMetadata);

export default function ArServicesPage() {
  return <ServicesPage lang="ar" />;
}
