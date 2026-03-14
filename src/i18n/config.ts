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

export function getLocalePath(locale: Locale, path: string = ""): string {
  if (locale === "zh") return path || "/";
  return `/${locale}${path}`;
}

export function getAlternateLinks(path: string = "") {
  return locales.map((locale) => ({
    hreflang: localeHreflang[locale],
    href: `https://www.hello-stay.com${getLocalePath(locale, path)}`,
  }));
}
