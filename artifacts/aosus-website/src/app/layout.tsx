import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aosus.org"),
  title: "Aosus - The Largest Arabic Open-Source Community",
  description:
    "Aosus is a non-profit community established by Arab technologists. We focus on empowering and spreading awareness of Free and Open Source Software in Arabic.",
  openGraph: {
    title: "Aosus - The Largest Arabic Open-Source Community",
    description:
      "Where Arab technologists build the future of open source.",
    images: ["/images/hero-1.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aosus - The Largest Arabic Open-Source Community",
    description:
      "Where Arab technologists build the future of open source.",
    images: ["/images/hero-1.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
