import { MetadataRoute } from "next";
import { getPublishedArticles, scheduledArticles } from "@/data/scheduled-articles";
import { locales, localeHreflang, getLocalePath } from "@/i18n/config";

const i18nPages = ["", "/hellohouse", "/godin", "/dazhi", "/traffic", "/book"];

function buildAlternates(path: string) {
    const baseUrl = "https://www.hello-stay.com";
    const languages: Record<string, string> = {};
    for (const locale of locales) {
        languages[localeHreflang[locale]] = `${baseUrl}${getLocalePath(locale, path)}`;
    }
    languages["x-default"] = `${baseUrl}${path || "/"}`;
    return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.hello-stay.com";
    const now = new Date();

    const entries: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0, alternates: buildAlternates("") },
        { url: `${baseUrl}/hellohouse`, lastModified: now, changeFrequency: "weekly", priority: 0.9, alternates: buildAlternates("/hellohouse") },
        { url: `${baseUrl}/godin`, lastModified: now, changeFrequency: "weekly", priority: 0.9, alternates: buildAlternates("/godin") },
        { url: `${baseUrl}/dazhi`, lastModified: now, changeFrequency: "weekly", priority: 0.8, alternates: buildAlternates("/dazhi") },
        { url: `${baseUrl}/book`, lastModified: now, changeFrequency: "daily", priority: 0.9, alternates: buildAlternates("/book") },
        { url: `${baseUrl}/traffic`, lastModified: now, changeFrequency: "monthly", priority: 0.7, alternates: buildAlternates("/traffic") },
        { url: `${baseUrl}/agreement`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/explore`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/packages`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/reviews`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/capacity/10`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/capacity/20`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/capacity/30`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/capacity/40`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/kaohsiung-whole-house`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
        { url: `${baseUrl}/compare/hellohouse-vs-godin`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/compare/hellohouse-vs-dazhi`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/compare/godin-vs-dazhi`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/features/kitchen`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/features/parking`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/occasion/family-trip`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/occasion/friends-gathering`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/occasion/company-retreat`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ];

    const articles = getPublishedArticles(scheduledArticles);
    for (const article of articles) {
        entries.push({
            url: `${baseUrl}/blog/${article.slug}`,
            lastModified: article.publishDate,
            changeFrequency: "monthly",
            priority: 0.7,
        });
    }

    return entries;
}
