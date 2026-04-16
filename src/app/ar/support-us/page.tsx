import SupportPage from "../../(en)/support-us/SupportPageClient";
import { pageMetadata } from "@/lib/siteMetadata";

export const metadata = pageMetadata("ar", "support-us");

export default function ArSupportPage() {
  return <SupportPage lang="ar" />;
}
