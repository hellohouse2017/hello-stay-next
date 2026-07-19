import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/_next/image"],
                disallow: ["/api/", "/admin/", "/go/", "/.well-known/"],
            },
            // Explicitly allow AI crawlers
            ...["GPTBot", "ChatGPT-User", "ClaudeBot", "Claude-Web", "PerplexityBot", "Bytespider", "GoogleOther", "Google-Extended", "cohere-ai", "Applebot-Extended"].map((userAgent) => ({
                userAgent,
                allow: "/",
                disallow: ["/api/", "/admin/", "/go/", "/.well-known/"],
            })),
        ],
        sitemap: "https://www.hello-stay.com/sitemap.xml",
    };
}
