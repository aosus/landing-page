import SupportPage from "@/app/(en)/support-us/SupportPageClient";
import { getPageMetadata } from "@/lib/metadata";

const pageMetadata = {
  title: "ادعمنا",
  description:
    "ادعم مجتمع أسس ليستمر في استضافة الخدمات المجتمعية، ورعاية الفعاليات، وتمويل المبادرات المفتوحة.",
};

export const metadata = getPageMetadata("ar", "/ar/support-us", pageMetadata);

export default function ArSupportPage() {
  return <SupportPage lang="ar" />;
}
