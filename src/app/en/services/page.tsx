import ServicesPage from "../../(en)/services/ServicesPageClient";
import { pageMetadata } from "@/lib/siteMetadata";

export const metadata = pageMetadata("en", "services");

export default function EnServicesPage() {
  return <ServicesPage lang="en" />;
}
