import { MetadataRoute } from "next";
import { getPublishedArticles, scheduledArticles } from "@/data/scheduled-articles";
import { getAllArticles } from "@/lib/articles";
import { locales, localeHreflang, getLocalePath } from "@/i18n/config";
import { isPrunedBlogSlug } from "@/data/pruned-blog-slugs";

const baseUrl = "https://www.hello-stay.com";

const LAST_MODIFIED_MAP: Record<string, string> = {
    "": "2026-05-19",
    "/hellohouse": "2026-04-18",
    "/godin": "2026-04-18",
    "/dazhi": "2026-05-19",
    "/book": "2026-03-15",
    "/traffic": "2026-03-24",
    "/agreement": "2026-03-24",
    "/explore": "2026-03-24",
    "/packages": "2026-03-24",
    "/reviews": "2026-03-24",
    "/kaohsiung-whole-house": "2026-03-25",
    "/compare": "2026-03-25",
    "/blog": "2026-05-19",
    "/about": "2026-05-20",
    "/guide": "2026-05-20",
};

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
        { url: `${baseUrl}/dazhi`, lastModified: getLastModified("/dazhi"), changeFrequency: "weekly", priority: 0.8, alternates: buildAlternates("/dazhi") },
        { url: `${baseUrl}/book`, lastModified: getLastModified("/book"), changeFrequency: "daily", priority: 0.9, alternates: buildAlternates("/book") },
        { url: `${baseUrl}/traffic`, lastModified: getLastModified("/traffic"), changeFrequency: "monthly", priority: 0.7, alternates: buildAlternates("/traffic") },
        { url: `${baseUrl}/agreement`, lastModified: getLastModified("/agreement"), changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/explore`, lastModified: getLastModified("/explore"), changeFrequency: "weekly", priority: 0.8 },
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

    return [...entries, ...articleEntries.values()];
}
