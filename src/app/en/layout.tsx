import type { Metadata } from "next";
import { getBaseLocaleMetadata } from "@/lib/metadata";

export const metadata: Metadata = getBaseLocaleMetadata("en");

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
