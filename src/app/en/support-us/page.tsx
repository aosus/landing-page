import SupportPage from "../../(en)/support-us/SupportPageClient";
import { pageMetadata } from "@/lib/siteMetadata";

export const metadata = pageMetadata("en", "support-us");

export default function EnSupportPage() {
  return <SupportPage lang="en" />;
}
