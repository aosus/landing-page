import ServicesPage from "../(en)/services/ServicesPageClient";
import { pageMetadata } from "@/lib/siteMetadata";

export const metadata = pageMetadata("ar", "services");

export default function ServicesPageRoute() {
  return <ServicesPage lang="ar" />;
}
