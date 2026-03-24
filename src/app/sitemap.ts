import { MetadataRoute } from "next";
import { getPublishedArticles, scheduledArticles } from "@/data/scheduled-articles";

const i18nLocales = ["en", "ja", "ko", "vi"];
const i18nPages = ["", "/hellohouse", "/godin", "/dazhi", "/traffic", "/book"];

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.hello-stay.com";
    // 核心頁面的「真正最後更新日」— 只在內容有實質變更時才改日期
    const coreUpdated = "2026-03-14";
    const blogUpdated = "2026-03-08";

    const entries: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: coreUpdated, changeFrequency: "weekly", priority: 1.0 },
        { url: `${baseUrl}/hellohouse`, lastModified: coreUpdated, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/godin`, lastModified: coreUpdated, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/dazhi`, lastModified: coreUpdated, changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/book`, lastModified: coreUpdated, changeFrequency: "daily", priority: 0.9 },
        { url: `${baseUrl}/agreement`, lastModified: coreUpdated, changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/traffic`, lastModified: coreUpdated, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/explore`, lastModified: coreUpdated, changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/packages`, lastModified: coreUpdated, changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/reviews`, lastModified: coreUpdated, changeFrequency: "monthly", priority: 0.7 },
        // Capacity landing pages
        { url: `${baseUrl}/capacity/10`, lastModified: coreUpdated, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/capacity/20`, lastModified: coreUpdated, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/capacity/30`, lastModified: coreUpdated, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/capacity/40`, lastModified: coreUpdated, changeFrequency: "monthly", priority: 0.7 },
        // Blog index
        { url: `${baseUrl}/blog`, lastModified: blogUpdated, changeFrequency: "weekly", priority: 0.7 },
    ];

    // === 多語系頁面 (EN, JA, KO, VI) ===
    for (const locale of i18nLocales) {
        for (const page of i18nPages) {
            entries.push({
                url: `${baseUrl}/${locale}${page}`,
                lastModified: coreUpdated,
                changeFrequency: "weekly",
                priority: page === "" ? 0.8 : 0.7,
            });
        }
    }

    // 動態加入已發布的部落格文章
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
