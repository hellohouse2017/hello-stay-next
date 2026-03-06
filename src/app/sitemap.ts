import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.hello-stay.com";
    const now = new Date().toISOString();

    return [
        { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
        { url: `${baseUrl}/hellohouse`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/godin`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/dazhi`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/book`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${baseUrl}/agreement`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/traffic`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/explore`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/packages`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/reviews`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        // Capacity landing pages
        { url: `${baseUrl}/capacity/10`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/capacity/20`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/capacity/30`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        // Blog
        { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        { url: `${baseUrl}/blog/kaohsiung-group-stay-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/blog/yancheng-food-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/blog/kaohsiung-group-trip`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/blog/kaohsiung-wedding-venue`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/blog/kaohsiung-offsite-teambuilding`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/blog/kaohsiung-graduation-trip`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/blog/pier2-accommodation`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/blog/kaohsiung-nye-stay`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/blog/kaohsiung-mahjong-stay`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/blog/kaohsiung-kitchen-bnb`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/blog/kaohsiung-family-reunion`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/blog/kaohsiung-sports-team`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ];
}
