import "../globals.css";
import {
  getRootMetadata,
  RootDocument,
  rootViewport,
} from "@/lib/root-layout";

export const metadata = getRootMetadata("en");
export const viewport = rootViewport;

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
