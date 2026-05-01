import ContactPage from "@/app/(en)/contact-us/ContactPageClient";
import { getPageMetadata } from "@/lib/metadata";

const pageMetadata = {
  title: "اتصل بنا",
  description:
    "تواصل مع فريق مجتمع أسس للاستفسارات العامة، الشراكات، فرص الرعاية، وروابط المجتمع المختلفة.",
};

export const metadata = getPageMetadata("ar", "/ar/contact-us", pageMetadata);

export default function ArContactPage() {
  return <ContactPage lang="ar" />;
}
