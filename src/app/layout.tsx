import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";
import { getBaseLocaleMetadata } from "@/lib/metadata";

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
  ...getBaseLocaleMetadata("ar"),
  icons: {
    icon: [
      {
        url: "/brand/logo-symbol.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/brand/logo-symbol-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
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
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
