import { getPageMetadata } from "@/lib/metadata";
import { permanentRedirect } from "next/navigation";

const pageMetadata = {
  title: "ادعمنا",
  description:
    "ادعم مجتمع أسس ليستمر في استضافة الخدمات المجتمعية، ورعاية الفعاليات، وتمويل المبادرات المفتوحة.",
};

export const metadata = getPageMetadata("ar", "/support-us", pageMetadata);

export default function ArSupportPage() {
  permanentRedirect("/support-us");
}
