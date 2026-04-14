import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";

const bootstrapScript = `
(() => {
  const root = document.documentElement;
  const isEnglish = window.location.pathname === "/en" || window.location.pathname.startsWith("/en/");
  root.lang = isEnglish ? "en" : "ar";
  root.dir = isEnglish ? "ltr" : "rtl";

  const storedTheme = window.localStorage.getItem("aosus-theme");
  const resolvedTheme = storedTheme === "light" || storedTheme === "dark"
    ? storedTheme
    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  root.classList.toggle("dark", resolvedTheme === "dark");
  root.style.colorScheme = resolvedTheme;
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://aosus.org"),
  title: "Aosus - The Largest Arabic Open-Source Community",
  description:
    "Aosus is a non-profit community established by Arab technologists. We focus on empowering and spreading awareness of Free and Open Source Software in Arabic.",
  openGraph: {
    title: "Aosus - The Largest Arabic Open-Source Community",
    description: "Where Arab technologists build the future of open source.",
    images: ["/opengraph.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aosus - The Largest Arabic Open-Source Community",
    description: "Where Arab technologists build the future of open source.",
    images: ["/opengraph.jpg"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
