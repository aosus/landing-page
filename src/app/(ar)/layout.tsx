import "../globals.css";
import {
  getRootMetadata,
  RootDocument,
  rootViewport,
} from "@/lib/root-layout";

export const metadata = getRootMetadata("ar");
export const viewport = rootViewport;

export default function ArabicRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootDocument locale="ar">{children}</RootDocument>;
}
