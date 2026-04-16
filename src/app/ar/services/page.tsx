import ServicesPage from "../../(en)/services/ServicesPageClient";
import { pageMetadata } from "@/lib/siteMetadata";

export const metadata = pageMetadata("ar", "services");

export default function ArServicesPage() {
  return <ServicesPage lang="ar" />;
}
