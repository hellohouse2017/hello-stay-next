import zh from "./zh.json";
import en from "./en.json";
import ja from "./ja.json";
import ko from "./ko.json";
import vi from "./vi.json";
import type { Locale } from "./config";

const dictionaries: Record<Locale, typeof zh> = { zh, en, ja, ko, vi };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
