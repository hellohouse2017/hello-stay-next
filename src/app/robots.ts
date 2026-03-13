import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/"],
            },
            // Explicitly allow AI crawlers
            { userAgent: "GPTBot", allow: "/" },
            { userAgent: "ChatGPT-User", allow: "/" },
            { userAgent: "ClaudeBot", allow: "/" },
            { userAgent: "Claude-Web", allow: "/" },
            { userAgent: "PerplexityBot", allow: "/" },
            { userAgent: "Bytespider", allow: "/" },
            { userAgent: "GoogleOther", allow: "/" },
            { userAgent: "Google-Extended", allow: "/" },
            { userAgent: "cohere-ai", allow: "/" },
            { userAgent: "Applebot-Extended", allow: "/" },
        ],
        sitemap: "https://www.hello-stay.com/sitemap.xml",
    };
}
