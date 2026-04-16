import ContactPage from "../../(en)/contact-us/ContactPageClient";
import { pageMetadata } from "@/lib/siteMetadata";

export const metadata = pageMetadata("en", "contact-us");

export default function EnContactPage() {
  return <ContactPage lang="en" />;
}
