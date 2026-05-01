import { getPageMetadata } from "@/lib/metadata";
import { permanentRedirect } from "next/navigation";

const pageMetadata = {
  title: "اتصل بنا",
  description:
    "تواصل مع فريق مجتمع أسس للاستفسارات العامة، الشراكات، فرص الرعاية، وروابط المجتمع المختلفة.",
};

export const metadata = getPageMetadata("ar", "/contact-us", pageMetadata);

export default function ArContactPage() {
  permanentRedirect("/contact-us");
}
