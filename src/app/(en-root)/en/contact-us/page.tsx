import ContactPage from "@/app/(en)/contact-us/ContactPageClient";
import { getPageMetadata } from "@/lib/metadata";

const pageMetadata = {
  title: "Contact",
  description:
    "Contact the Aosus team for general inquiries, partnerships, sponsorships, and links to the wider community.",
};

export const metadata = getPageMetadata("en", "/en/contact-us", pageMetadata);

export default function EnContactPage() {
  return <ContactPage lang="en" />;
}
