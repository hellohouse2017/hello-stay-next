export type Locale = "zh" | "en" | "ja" | "ko" | "vi";

export const locales: Locale[] = ["zh", "en", "ja", "ko", "vi"];

export const localeNames: Record<Locale, string> = {
  zh: "繁中",
  en: "EN",
  ja: "日本語",
  ko: "한국어",
  vi: "Tiếng Việt",
};

export const localeHreflang: Record<Locale, string> = {
  zh: "zh-Hant",
  en: "en",
  ja: "ja",
  ko: "ko",
  vi: "vi",
};

export const localizedPublicPaths = new Set(["", "/hellohouse", "/godin", "/dazhi", "/book", "/guide", "/traffic"]);

export function getLocalePath(locale: Locale, path: string = ""): string {
  if (locale === "zh") return path || "/";
  return `/${locale}${path}`;
}

export function getLocaleSwitchPath(locale: Locale, path: string = "") {
  const normalizedPath = path === "/" ? "" : path;
  return getLocalePath(locale, localizedPublicPaths.has(normalizedPath) ? normalizedPath : "");
}

export function getAlternateLinks(path: string = "") {
  return locales.map((locale) => ({
    hreflang: localeHreflang[locale],
    href: `https://www.hello-stay.com${getLocalePath(locale, path)}`,
  }));
}

export function getAlternateLanguageMap(path: string = "") {
  return {
    ...Object.fromEntries(getAlternateLinks(path).map((link) => [link.hreflang, link.href])),
    "x-default": `https://www.hello-stay.com${path || ""}`,
  };
}

// For pages that only exist in a subset of locales (e.g. /agreement in zh/ja/ko).
// Emitting hreflang for non-existent locale pages would be a broken signal.
export function getAlternateLanguageMapFor(path: string, availableLocales: Locale[]) {
  const entries = availableLocales.map((locale) => [
    localeHreflang[locale],
    `https://www.hello-stay.com${getLocalePath(locale, path)}`,
  ]);
  return {
    ...Object.fromEntries(entries),
    "x-default": `https://www.hello-stay.com${path || "/"}`,
  };
}
