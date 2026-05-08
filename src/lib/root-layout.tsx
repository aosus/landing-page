import type { Metadata, Viewport } from "next";
import { getBaseLocaleMetadata } from "@/lib/metadata";

type Locale = "ar" | "en";

const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

const RYBBIT_SCRIPT_SRC = "https://ry.aosus.org/api/script.js";
const RYBBIT_SITE_ID = "ac3689413d93";

function getThemeBootstrapScript(locale: Locale) {
  const dir = localeDirection[locale];

  return `(() => {
  const root = document.documentElement;
  root.lang = "${locale}";
  root.dir = "${dir}";

  const storedTheme = window.localStorage.getItem("aosus-theme");
  const resolvedTheme = storedTheme === "light" || storedTheme === "dark"
    ? storedTheme
    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  root.classList.toggle("dark", resolvedTheme === "dark");
  root.style.colorScheme = resolvedTheme;
})();`;
}

export function getRootMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL("https://aosus.org"),
    ...getBaseLocaleMetadata(locale),
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
}

export const rootViewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export function RootDocument({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const dir = localeDirection[locale];

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: getThemeBootstrapScript(locale),
          }}
        />
        <script
          src={RYBBIT_SCRIPT_SRC}
          data-site-id={RYBBIT_SITE_ID}
          defer
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
