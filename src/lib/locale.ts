export type Lang = "ar" | "en";

export function isEnglishPath(pathname: string): boolean {
  return pathname === "/en" || pathname.startsWith("/en/");
}

export function stripLocalePrefix(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const stripped = normalized.replace(/^\/en(?=\/|$)/, "");
  return stripped || "/";
}

export function getLocalizedPath(lang: Lang, pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (lang === "ar") {
    return stripLocalePrefix(normalized);
  }

  const basePath = stripLocalePrefix(normalized);
  return basePath === "/" ? "/en" : `/en${basePath}`;
}

export function getBlogIndexPath(lang: Lang, page: number): string {
  const blogRoot = getLocalizedPath(lang, "/blog");
  return page <= 1 ? blogRoot : `${blogRoot}?page=${page}`;
}
