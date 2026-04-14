function normalizePort(url: URL) {
  if ((url.protocol === "https:" && url.port === "443") || (url.protocol === "http:" && url.port === "80")) {
    url.port = "";
  }
}

export function normalizePreviewUrl(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();

  if (!trimmed) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }

    parsed.hash = "";
    normalizePort(parsed);

    if (parsed.pathname !== "/") {
      parsed.pathname = parsed.pathname.replace(/\/+$/g, "") || "/";
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

export function isPreviewableUrl(rawUrl: string): boolean {
  return Boolean(normalizePreviewUrl(rawUrl));
}

export function normalizeComparableUrl(rawUrl: string): string | null {
  const normalized = normalizePreviewUrl(rawUrl);

  if (!normalized) {
    return null;
  }

  const parsed = new URL(normalized);

  if (parsed.pathname === "/" && !parsed.search) {
    return `${parsed.protocol}//${parsed.host}`;
  }

  return normalized;
}
