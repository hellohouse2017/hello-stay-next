import { MetadataRoute } from "next";
import { getPublishedArticles, scheduledArticles } from "@/data/scheduled-articles";
import { getAllArticles } from "@/lib/articles";
import { locales, localeHreflang, getLocalePath } from "@/i18n/config";
import { isPrunedBlogSlug } from "@/data/pruned-blog-slugs";
import { BLOG_TRANSLATIONS } from "@/data/blog-translations";

const baseUrl = "https://www.hello-stay.com";

const LAST_MODIFIED_MAP: Record<string, string> = {
    "": "2026-08-16",
    "/hellohouse": "2026-07-12",
    "/godin": "2026-07-27",
    "/dazhi": "2026-05-19",
    "/book": "2026-03-15",
    "/traffic": "2026-03-24",
    "/agreement": "2026-07-22",
    "/faq": "2026-08-25",
    "/explore": "2026-08-16",
    "/explore/food": "2026-08-16",
    "/explore/spots": "2026-08-16",
    "/packages": "2026-07-27",
    "/reviews": "2026-07-09",
    "/kaohsiung-whole-house": "2026-08-16",
    "/compare": "2026-08-16",
    "/blog": "2026-07-14",
    "/about": "2026-08-23",
    "/guide": "2026-05-20",
};

function buildPartialAlternates(path: string, availableLocales: (typeof locales)[number][]) {
    const languages: Record<string, string> = {};
    for (const locale of availableLocales) {
        languages[localeHreflang[locale]] = `${baseUrl}${getLocalePath(locale, path)}`;
    }
    languages["x-default"] = `${baseUrl}${path || "/"}`;
    return { languages };
}

function buildAlternates(path: string) {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
        languages[localeHreflang[locale]] = `${baseUrl}${getLocalePath(locale, path)}`;
    }
    languages["x-default"] = `${baseUrl}${path || "/"}`;
    return { languages };
}

function getLastModified(path: string) {
    return LAST_MODIFIED_MAP[path] || "2026-03-24";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const entries: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: getLastModified(""), changeFrequency: "weekly", priority: 1.0, alternates: buildAlternates("") },
        { url: `${baseUrl}/hellohouse`, lastModified: getLastModified("/hellohouse"), changeFrequency: "weekly", priority: 0.9, alternates: buildAlternates("/hellohouse") },
        { url: `${baseUrl}/godin`, lastModified: getLastModified("/godin"), changeFrequency: "weekly", priority: 0.9, alternates: buildAlternates("/godin") },
        { url: `${baseUrl}/dazhi`, lastModified: getLastModified("/dazhi"), changeFrequency: "monthly", priority: 0.5, alternates: buildAlternates("/dazhi") },
        { url: `${baseUrl}/book`, lastModified: getLastModified("/book"), changeFrequency: "daily", priority: 0.9, alternates: buildAlternates("/book") },
        { url: `${baseUrl}/traffic`, lastModified: getLastModified("/traffic"), changeFrequency: "monthly", priority: 0.7, alternates: buildAlternates("/traffic") },
        { url: `${baseUrl}/agreement`, lastModified: getLastModified("/agreement"), changeFrequency: "monthly", priority: 0.6, alternates: buildPartialAlternates("/agreement", ["zh", "ja", "ko"]) },
        { url: `${baseUrl}/faq`, lastModified: getLastModified("/faq"), changeFrequency: "weekly", priority: 0.8, alternates: buildAlternates("/faq") },
        { url: `${baseUrl}/ja/agreement`, lastModified: "2026-07-27", changeFrequency: "monthly", priority: 0.55, alternates: buildPartialAlternates("/agreement", ["zh", "ja", "ko"]) },
        { url: `${baseUrl}/ko/agreement`, lastModified: "2026-07-27", changeFrequency: "monthly", priority: 0.55, alternates: buildPartialAlternates("/agreement", ["zh", "ja", "ko"]) },
        { url: `${baseUrl}/explore`, lastModified: getLastModified("/explore"), changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/explore/food`, lastModified: getLastModified("/explore/food"), changeFrequency: "monthly", priority: 0.75 },
        { url: `${baseUrl}/explore/spots`, lastModified: getLastModified("/explore/spots"), changeFrequency: "monthly", priority: 0.75 },
        { url: `${baseUrl}/packages`, lastModified: getLastModified("/packages"), changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/reviews`, lastModified: getLastModified("/reviews"), changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/kaohsiung-whole-house`, lastModified: getLastModified("/kaohsiung-whole-house"), changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/compare`, lastModified: getLastModified("/compare"), changeFrequency: "weekly", priority: 0.85 },
        { url: `${baseUrl}/blog`, lastModified: getLastModified("/blog"), changeFrequency: "weekly", priority: 0.7 },
        { url: `${baseUrl}/about`, lastModified: getLastModified("/about"), changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/guide`, lastModified: getLastModified("/guide"), changeFrequency: "weekly", priority: 0.8, alternates: buildAlternates("/guide") },
    ];

    const articleEntries = new Map<string, MetadataRoute.Sitemap[number]>();

    for (const article of await getAllArticles()) {
        if (isPrunedBlogSlug(article.slug)) continue;
        articleEntries.set(article.slug, {
            url: `${baseUrl}/blog/${article.slug}`,
            lastModified: article.dateModified || article.date,
            changeFrequency: "monthly",
            priority: 0.7,
        });
    }

    for (const article of getPublishedArticles(scheduledArticles)) {
        if (isPrunedBlogSlug(article.slug)) continue;
        if (articleEntries.has(article.slug)) continue;
        articleEntries.set(article.slug, {
            url: `${baseUrl}/blog/${article.slug}`,
            lastModified: article.dateModified || article.publishDate,
            changeFrequency: "monthly",
            priority: 0.7,
        });
    }

    const translatedBlogEntries: MetadataRoute.Sitemap = Object.entries(BLOG_TRANSLATIONS).flatMap(
        ([slug, translations]) => {
            const zhUrl = `${baseUrl}/blog/${slug}`;
            return translations.map((translation) => ({
                url: `${baseUrl}${translation.path}`,
                lastModified: articleEntries.get(slug)?.lastModified || "2026-07-08",
                changeFrequency: "monthly" as const,
                priority: 0.6,
                alternates: {
                    languages: {
                        "zh-Hant": zhUrl,
                        ...Object.fromEntries(
                            translations.map((sibling) => [sibling.locale, `${baseUrl}${sibling.path}`]),
                        ),
                        "x-default": zhUrl,
                    },
                },
            }));
        }
    );

    const localizedCorePaths = ["", "/hellohouse", "/godin", "/dazhi", "/book", "/traffic", "/guide"];
    const translatedCoreEntries: MetadataRoute.Sitemap = locales
        .filter((locale) => locale !== "zh")
        .flatMap((locale) => localizedCorePaths.map((path) => ({
            url: `${baseUrl}${getLocalePath(locale, path)}`,
            lastModified: getLastModified(path),
            changeFrequency: path === "/book" ? "daily" as const : "weekly" as const,
            priority: path === "/book" || path === "/hellohouse" || path === "/godin" ? 0.8 : 0.6,
            alternates: buildAlternates(path),
        })));

    return [...entries, ...translatedCoreEntries, ...articleEntries.values(), ...translatedBlogEntries];
}
