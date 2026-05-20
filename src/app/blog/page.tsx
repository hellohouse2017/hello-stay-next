import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { getAllArticles } from "@/lib/articles";
import { scheduledArticles, getPublishedArticles } from "@/data/scheduled-articles";
import { isPrunedBlogSlug } from "@/data/pruned-blog-slugs";

export const metadata: Metadata = {
    title: "旅宿攻略 | 高雄包棟・鹽埕美食・行程推薦 | Hello Stay",
    description: "高雄包棟推薦、鹽埕區美食地圖、團體旅遊行程推薦。在地經營8年的民宿主人，分享最道地的高雄旅遊情報。",
    alternates: { canonical: "https://www.hello-stay.com/blog" },
    openGraph: {
        title: "旅宿攻略 | 高雄包棟・鹽埕美食・行程推薦",
        description: "在地經營8年，最道地的高雄旅遊情報。包棟攻略、美食地圖、行程推薦。",
        url: "https://www.hello-stay.com/blog",
        images: [{ url: "https://www.hello-stay.com/images/cover-bg.webp", width: 1200, height: 630, alt: "Hello Stay 旅宿攻略" }],
    },
};

export default async function BlogIndex() {
    const articleMap = new Map(
        (await getAllArticles())
            .filter(article => !isPrunedBlogSlug(article.slug))
            .map(article => [
            article.slug,
            {
                slug: article.slug,
                title: article.title,
                excerpt: article.excerpt,
                date: article.date,
                emoji: article.emoji,
                tags: article.tags,
            },
        ]),
    );

    for (const article of getPublishedArticles(scheduledArticles)) {
        if (isPrunedBlogSlug(article.slug)) continue;
        if (articleMap.has(article.slug)) continue;
        articleMap.set(article.slug, {
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            date: article.publishDate,
            emoji: article.emoji,
            tags: article.tags,
        });
    }

    const articles = Array.from(articleMap.values()).sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Hello Stay 旅宿攻略", description: "高雄包棟民宿攻略、鹽埕美食地圖、團體旅遊行程推薦", url: "https://www.hello-stay.com/blog", mainEntity: { "@type": "ItemList", itemListElement: articles.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: `https://www.hello-stay.com/blog/${a.slug}`, name: a.title })) } }} />
            <div className="w" style={{ maxWidth: "780px", padding: "0 28px 80px" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "50px" }}>
                        <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px", fontWeight: 600 }}>Local Insights</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.08em", color: "var(--text)" }}>旅宿攻略</h1>
                        <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px auto" }} />
                        <p style={{ fontSize: "0.85rem", color: "#999", lineHeight: 1.9 }}>在地經營 8 年，最道地的高雄旅遊情報</p>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gap: "16px" }}>
                    {articles.map(a => (
                        <Reveal key={a.slug}>
                            <Link href={`/blog/${a.slug}`} style={{ textDecoration: "none", display: "block" }}>
                                <article style={{ background: "var(--surface)", borderRadius: "4px", padding: "28px 24px", border: "1px solid var(--line)", transition: "all 0.3s" }}>
                                    <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                                        <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{a.emoji}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--pri)", marginBottom: "6px" }}>{a.date}</div>
                                            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1rem", color: "var(--text)", marginBottom: "8px", letterSpacing: "0.06em" }}>{a.title}</h2>
                                            <p style={{ fontSize: "0.78rem", color: "#999", lineHeight: 1.8, marginBottom: "10px" }}>{a.excerpt}</p>
                                            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                                                {a.tags.map(t => (<span key={t} style={{ padding: "3px 10px", borderRadius: "4px", fontSize: "0.65rem", background: "var(--bg)", color: "var(--muted)" }}>{t}</span>))}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
}
