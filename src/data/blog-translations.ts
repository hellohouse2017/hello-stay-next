/**
 * Maps a Chinese blog article slug to its available translated landing pages.
 * Used to emit reciprocal hreflang alternates from both the original
 * zh article and the translated page.
 */
export interface BlogTranslation {
    locale: "en" | "ja";
    path: string;
}

export const BLOG_TRANSLATIONS: Record<string, BlogTranslation[]> = {
    "kaohsiung-mahjong-stay": [{ locale: "en", path: "/en/blog/kaohsiung-mahjong-stay" }],
    "pier2-accommodation": [
        { locale: "en", path: "/en/blog/pier2-accommodation" },
        { locale: "ja", path: "/ja/blog/pier2-accommodation" },
    ],
};

export function getBlogTranslationLanguages(slug: string, canonical: string): Record<string, string> | undefined {
    const translations = BLOG_TRANSLATIONS[slug];
    if (!translations || translations.length === 0) return undefined;

    const languages: Record<string, string> = { "zh-Hant": canonical, "x-default": canonical };
    for (const translation of translations) {
        languages[translation.locale] = `https://www.hello-stay.com${translation.path}`;
    }
    return languages;
}

/**
 * Reverse lookup: given a translated (e.g. English) blog slug, return the
 * zh-Hant canonical URL so the translated page can emit reciprocal hreflang.
 */
export function getZhCanonicalForTranslatedSlug(slug: string): string | undefined {
    const hasTranslation = Object.prototype.hasOwnProperty.call(BLOG_TRANSLATIONS, slug);
    if (!hasTranslation) return undefined;
    return `https://www.hello-stay.com/blog/${slug}`;
}
