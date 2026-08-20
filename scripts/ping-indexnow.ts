import fs from "node:fs";
import path from "node:path";
import { getPublishedArticles, scheduledArticles } from "../src/data/scheduled-articles";
import { isPrunedBlogSlug } from "../src/data/pruned-blog-slugs";
import { BLOG_TRANSLATIONS } from "../src/data/blog-translations";
import { locales, getLocalePath } from "../src/i18n/config";

const INDEXNOW_KEY = "3f2ee42d161f4223b12db715cc59bf14";
const HOST = "www.hello-stay.com";
const baseUrl = `https://${HOST}`;

const root = process.cwd();
const articleDirectory = path.join(root, "src/content/articles");

async function main() {
    console.log("📡 正在彙整全站最新 URL 清單...");

    const corePaths = [
        "", "/hellohouse", "/godin", "/dazhi", "/book", "/traffic",
        "/agreement", "/explore", "/explore/food", "/explore/spots",
        "/packages", "/reviews", "/kaohsiung-whole-house", "/compare",
        "/blog", "/about", "/guide"
    ];

    const urls = new Set<string>();

    // 1. 中文核心頁面
    for (const p of corePaths) {
        urls.add(`${baseUrl}${p}`);
    }

    // 2. 多語系核心頁面
    const localizedCorePaths = ["", "/hellohouse", "/godin", "/dazhi", "/book", "/traffic", "/guide"];
    for (const locale of locales) {
        if (locale === "zh") continue;
        for (const p of localizedCorePaths) {
            urls.add(`${baseUrl}${getLocalePath(locale, p)}`);
        }
    }

    // 3. MDX 文章
    if (fs.existsSync(articleDirectory)) {
        const mdxFiles = fs.readdirSync(articleDirectory).filter((f) => f.endsWith(".mdx"));
        for (const file of mdxFiles) {
            const slug = file.replace(/\.mdx$/, "");
            if (!isPrunedBlogSlug(slug)) {
                urls.add(`${baseUrl}/blog/${slug}`);
            }
        }
    }

    // 4. 已發布排程文章
    for (const article of getPublishedArticles(scheduledArticles)) {
        if (!isPrunedBlogSlug(article.slug)) {
            urls.add(`${baseUrl}/blog/${article.slug}`);
        }
    }

    // 5. 翻譯文章
    for (const [, translations] of Object.entries(BLOG_TRANSLATIONS)) {
        for (const t of translations) {
            urls.add(`${baseUrl}${t.path}`);
        }
    }

    const urlList = Array.from(urls);
    console.log(`📋 共彙整 ${urlList.length} 個即時 URL。`);
    console.log("🚀 正在向 IndexNow 廣播（通知 Bing, Copilot, Perplexity, Yandex）...");

    try {
        const response = await fetch("https://api.indexnow.org/indexnow", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                host: HOST,
                key: INDEXNOW_KEY,
                keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`,
                urlList,
            }),
        });

        console.log(`✅ IndexNow 回應狀態碼: ${response.status} (${response.statusText || "OK"})`);
        console.log(`🎉 成功主動推播 ${urlList.length} 個網址至全球 AI 搜尋引擎！`);
    } catch (error) {
        console.error("❌ IndexNow 推播異常:", error);
    }
}

main().catch(console.error);
