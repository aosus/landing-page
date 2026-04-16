import ContactPage from "../(en)/contact-us/ContactPageClient";
import { pageMetadata } from "@/lib/siteMetadata";

export const metadata = pageMetadata("ar", "contact-us");

export default function ContactPageRoute() {
  return <ContactPage lang="ar" />;
}
