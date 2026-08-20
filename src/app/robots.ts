import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/_next/image"],
                disallow: ["/api/", "/admin/", "/go/", "/.well-known/"],
            },
            // Explicitly allow all modern AI search, retrieval & LLM agents
            ...[
                // OpenAI (ChatGPT Search, GPT-4o, Operator)
                "GPTBot",
                "ChatGPT-User",
                "OAI-SearchBot",
                // Anthropic (Claude 3.5/3.7 Sonnet & Opus)
                "ClaudeBot",
                "Claude-Web",
                "anthropic-ai",
                // Perplexity AI (Conversational Search Engine)
                "PerplexityBot",
                "Perplexity-User",
                // Google (Gemini, AI Overviews, Deep Research)
                "GoogleOther",
                "GoogleOther-Image",
                "GoogleOther-Video",
                "Google-Extended",
                // Apple (Apple Intelligence, Siri Web Answers)
                "Applebot",
                "Applebot-Extended",
                // Meta (Meta AI, Llama Web Search)
                "meta-externalagent",
                "Meta-ExternalFetcher",
                "FacebookBot",
                // xAI (Grok 2 / Grok 3 Realtime Search)
                "GrokBot",
                "xAI-Bot",
                // Mistral AI (Le Chat / Mistral Large)
                "MistralBot",
                "mistral-ai",
                // Amazon (Rufus / Bedrock AI Agent)
                "Amazonbot",
                // ByteDance (Doubao / TikTok Search)
                "Bytespider",
                // Cohere (Enterprise Search & RAG)
                "cohere-ai",
                "cohere-training-data-crawler",
                // Other Leading AI Engines
                "YouBot",
                "DuckAssistBot",
                "Diffbot",
                "CCBot",
            ].map((userAgent) => ({
                userAgent,
                allow: "/",
                disallow: ["/api/", "/admin/", "/go/", "/.well-known/"],
            })),
        ],
        sitemap: "https://www.hello-stay.com/sitemap.xml",
    };
}
