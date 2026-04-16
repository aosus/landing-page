import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";
import { brandAssets } from "@/lib/brandAssets";

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
  title: "أكبر مجتمع عربي للبرمجيات الحرة والمفتوحة | مجتمع أسس",
  description:
    "مجتمع أسس هو أكبر مجتمع عربي مختص بإثراء المحتوى العربي في عدة مجالات أهمها البرمجيات الحرة والمفتوحة المصدر، مع عدة مبادرات كالمعجم التقني ومسابقة أسس لكتابة المحتوى.",
  icons: {
    icon: [{ url: brandAssets.logo, type: "image/svg+xml" }],
  },
  openGraph: {
    title: "أكبر مجتمع عربي للبرمجيات الحرة والمفتوحة | مجتمع أسس",
    description:
      "مجتمع أسس هو أكبر مجتمع عربي مختص بإثراء المحتوى العربي في عدة مجالات أهمها البرمجيات الحرة والمفتوحة المصدر، مع عدة مبادرات كالمعجم التقني ومسابقة أسس لكتابة المحتوى.",
    images: [brandAssets.defaultPreview],
    type: "website",
    siteName: "مجتمع أسس",
  },
  twitter: {
    card: "summary_large_image",
    title: "أكبر مجتمع عربي للبرمجيات الحرة والمفتوحة | مجتمع أسس",
    description:
      "مجتمع أسس هو أكبر مجتمع عربي مختص بإثراء المحتوى العربي في عدة مجالات أهمها البرمجيات الحرة والمفتوحة المصدر، مع عدة مبادرات كالمعجم التقني ومسابقة أسس لكتابة المحتوى.",
    images: [brandAssets.defaultPreview],
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
