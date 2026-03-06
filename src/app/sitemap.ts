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
        // Blog
        { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        { url: `${baseUrl}/blog/kaohsiung-group-stay-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/blog/yancheng-food-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/blog/kaohsiung-group-trip`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ];
}
