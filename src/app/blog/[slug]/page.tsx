import { scheduledArticles, getPublishedArticles, getArticleDescription } from "@/data/scheduled-articles";
import { getArticleBySlug, getAllArticleSlugs, hasArticleSourceFile } from "@/lib/articles";
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import PropertyLinksBlock from "@/components/PropertyLinksBlock";
import HomepageIntentBlock from "@/components/HomepageIntentBlock";
import { notFound, permanentRedirect } from "next/navigation";
import { getPrunedBlogRedirect, isPrunedBlogSlug } from "@/data/pruned-blog-slugs";
import { getBlogTranslationLanguages } from "@/data/blog-translations";
import { DEFAULT_SEO_IMAGE } from "@/lib/seo-metadata";

type Props = { params: Promise<{ slug: string }> };
type ArticleFaq = { q: string; a: string };

const DEFAULT_ARTICLE_IMAGE = "https://www.hello-stay.com/images/cover-bg.webp";

function getArticleSection(tags?: string[]) {
    return tags?.[0];
}

function estimateWordCount(text: string) {
    const plainText = text.replace(/\s+/g, " ").trim();
    if (!plainText) {
        return 0;
    }

    const cjkCount = (plainText.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu) || []).length;
    const latinWordCount = plainText
        .replace(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu, " ")
        .split(/\s+/)
        .filter(Boolean)
        .length;

    return cjkCount + latinWordCount;
}

function getScheduledArticleWordCount(article: { sections: Array<{ content: string }> }) {
    return estimateWordCount(article.sections.map((section) => section.content).join(" "));
}

function buildFaqSchema(faq?: ArticleFaq[]) {
    if (!faq || faq.length === 0) {
        return [];
    }

    return [{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    }];
}

function FaqSection({ faq }: { faq: ArticleFaq[] }) {
    return (
        <Reveal>
            <section style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px", letterSpacing: "0.04em" }}>常見問答</h2>
                {faq.map((item, index) => (
                    <div key={`${item.q}-${index}`} style={{ marginBottom: index < faq.length - 1 ? "20px" : 0 }}>
                        <h3 style={{ fontSize: "0.92rem", color: "#3D3830", marginBottom: "8px", fontWeight: 500 }}>Q: {item.q}</h3>
                        <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 2 }}>A: {item.a}</p>
                    </div>
                ))}
            </section>
        </Reveal>
    );
}

// Generate static pages for both scheduled articles and MDX articles
export async function generateStaticParams() {
    const scheduledSlugs = getPublishedArticles(scheduledArticles)
        .filter(article => !isPrunedBlogSlug(article.slug))
        .map(a => a.slug);
    const mdxSlugs = getAllArticleSlugs()
        .filter(slug => !isPrunedBlogSlug(slug))
    return Array.from(new Set([...scheduledSlugs, ...mdxSlugs])).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    if (!slug) return {};

    // Try MDX first
    const mdxArticle = hasArticleSourceFile(slug) ? await getArticleBySlug(slug) : null;
    if (mdxArticle) {
        return {
            title: mdxArticle.title,
            description: mdxArticle.description,
            alternates: {
                canonical: mdxArticle.canonical,
                languages: getBlogTranslationLanguages(slug, mdxArticle.canonical),
            },
            openGraph: {
                title: mdxArticle.title,
                description: mdxArticle.description,
                url: mdxArticle.canonical,
                type: "article",
                images: [DEFAULT_SEO_IMAGE],
            },
        };
    }

    // Fallback to scheduled articles
    const article = scheduledArticles.find(a => a?.slug === slug);
    if (!article) return {};
    return {
        title: article.title,
        description: getArticleDescription(article),
        alternates: { canonical: `https://www.hello-stay.com/blog/${slug}` },
        openGraph: {
            title: article.title,
            description: getArticleDescription(article),
            url: `https://www.hello-stay.com/blog/${slug}`,
            type: "article",
            images: [DEFAULT_SEO_IMAGE],
        },
    };
}

export default async function ScheduledArticlePage({ params }: Props) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    if (!slug) notFound();
    if (isPrunedBlogSlug(slug)) {
        permanentRedirect(getPrunedBlogRedirect(slug));
    }

    // Try MDX first
    const mdxArticle = hasArticleSourceFile(slug) ? await getArticleBySlug(slug) : null;
    if (mdxArticle) {
        return (
            <div className="legacy-article-page" style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
                <JsonLd data={[
                    {
                        "@context": "https://schema.org", "@type": "Article",
                        headline: mdxArticle.title,
                        description: mdxArticle.description,
                        image: [DEFAULT_ARTICLE_IMAGE],
                        author: { "@type": "Organization", name: "Hello Stay 你好哇寓所", url: "https://www.hello-stay.com" },
                        publisher: {
                            "@type": "Organization",
                            name: "Hello Stay",
                            url: "https://www.hello-stay.com",
                            logo: { "@type": "ImageObject", url: DEFAULT_ARTICLE_IMAGE },
                        },
                        datePublished: mdxArticle.date,
                        dateModified: mdxArticle.dateModified || mdxArticle.date,
                        inLanguage: "zh-Hant",
                        keywords: (mdxArticle.tags || []).join(", "),
                        articleSection: getArticleSection(mdxArticle.tags),
                        wordCount: mdxArticle.wordCount,
                        mainEntityOfPage: mdxArticle.canonical,
                    },
                    {
                        "@context": "https://schema.org", "@type": "BreadcrumbList",
                        itemListElement: [
                            { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.hello-stay.com" },
                            { "@type": "ListItem", position: 2, name: "旅宿攻略", item: "https://www.hello-stay.com/blog" },
                            { "@type": "ListItem", position: 3, name: mdxArticle.title.split("｜")[0] || mdxArticle.title, item: mdxArticle.canonical },
                        ],
                    },
                    ...buildFaqSchema(mdxArticle.faq),
                ]} />
                <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                    <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: mdxArticle.title.split("｜")[0] || mdxArticle.title, href: `/blog/${slug}` }]} />

                    <Reveal>
                        <div style={{ marginBottom: "40px" }}>
                            <div style={{ fontFamily: "var(--sans)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--pri)", marginBottom: "12px" }}>{mdxArticle.date}</div>
                            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>
                                {mdxArticle.title}
                            </h1>
                            <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px 0" }} />
                            <p style={{ fontSize: "0.85rem", color: "#999", lineHeight: 1.9 }}>{mdxArticle.description}</p>
                        </div>
                    </Reveal>

                    <Reveal>
                        <article style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                            <div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2.2 }} className="mdx-content">
                                {mdxArticle.content}
                            </div>
                        </article>
                    </Reveal>

                    {mdxArticle.faq && mdxArticle.faq.length > 0 ? <FaqSection faq={mdxArticle.faq} /> : null}

                    <Reveal>
                        <HomepageIntentBlock
                            eyebrow="Article To Home"
                            title="如果這篇剛好解到你的問題，下一步就是回首頁比館別"
                            actions={[
                                { href: "/", label: "高雄包棟民宿推薦首頁" },
                                { href: "/compare", label: "高雄包棟推薦比較" },
                                { href: "/book", label: "查詢空房與報價", solid: true },
                            ]}
                        >
                            很多人是先從攻略文章找到我們，再回到{" "}
                            <Link href="/" style={{ color: "var(--pri)", textDecoration: "underline" }}>
                                高雄包棟民宿推薦 Hello Stay
                            </Link>
                            {" "}看三館差異。如果你已經知道自己的重點是人數、廚房、麻將或鹽埕地點，現在就可以直接進首頁或比較頁。
                        </HomepageIntentBlock>
                    </Reveal>

                    <PropertyLinksBlock />

                    <RelatedArticles current={slug} currentTags={mdxArticle.tags} />

                    <Reveal>
                        <div style={{ textAlign: "center", marginTop: "20px" }}>
                            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                                <Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link>
                                <Link href="/blog" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>更多攻略</Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        );
    }

    // Fallback to scheduled articles
    const article = scheduledArticles.find(a => a?.slug === slug);
    if (!article) notFound();

    // Check publish date
    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Taipei",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());
    if (article.publishDate > today) notFound();

    return (
        <div className="legacy-article-page" style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                {
                    "@context": "https://schema.org", "@type": "Article",
                    headline: article.title,
                    description: getArticleDescription(article),
                    image: [DEFAULT_ARTICLE_IMAGE],
                    author: { "@type": "Organization", name: "Hello Stay 你好哇寓所", url: "https://www.hello-stay.com" },
                    publisher: {
                        "@type": "Organization",
                        name: "Hello Stay",
                        url: "https://www.hello-stay.com",
                        logo: { "@type": "ImageObject", url: DEFAULT_ARTICLE_IMAGE },
                    },
                    datePublished: article.publishDate,
                    dateModified: article.dateModified || article.publishDate,
                    inLanguage: "zh-Hant",
                    keywords: (article.tags || []).join(", "),
                    articleSection: getArticleSection(article.tags),
                    wordCount: getScheduledArticleWordCount(article),
                    mainEntityOfPage: `https://www.hello-stay.com/blog/${slug}`,
                },
                {
                    "@context": "https://schema.org", "@type": "BreadcrumbList",
                    itemListElement: [
                        { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.hello-stay.com" },
                        { "@type": "ListItem", position: 2, name: "旅宿攻略", item: "https://www.hello-stay.com/blog" },
                        { "@type": "ListItem", position: 3, name: article.title.split("：")[0] || article.title, item: `https://www.hello-stay.com/blog/${slug}` },
                    ],
                },
                ...buildFaqSchema(article.faq),
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: article.title.split("：")[0] || article.title, href: `/blog/${slug}` }]} />

                <Reveal>
                    <div style={{ marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--sans)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--pri)", marginBottom: "12px" }}>{article.publishDate}</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>
                            {article.title}
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px 0" }} />
                        <p style={{ fontSize: "0.85rem", color: "#999", lineHeight: 1.9 }}>{getArticleDescription(article)}</p>
                    </div>
                </Reveal>

                {article.sections.map(sec => (
                    <Reveal key={sec.id}>
                        <section id={sec.id} style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px", letterSpacing: "0.04em" }}>
                                {sec.title}
                            </h2>
                            <div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2.2, whiteSpace: "pre-line" }}>
                                {sec.content}
                            </div>
                        </section>
                    </Reveal>
                ))}

                {article.faq && article.faq.length > 0 ? <FaqSection faq={article.faq} /> : null}

                <Reveal>
                    <HomepageIntentBlock
                        eyebrow="Article To Home"
                        title="看完攻略後，直接回首頁挑館別最快"
                        actions={[
                            { href: "/", label: "高雄包棟推薦首頁" },
                            { href: "/kaohsiung-whole-house", label: "依需求看包棟方案" },
                            { href: "/book", label: "查詢空房與報價", solid: true },
                        ]}
                    >
                        如果你是從這篇內容頁一路看下來，通常已經知道自己在找什麼了。這時候直接回{" "}
                        <Link href="/" style={{ color: "var(--pri)", textDecoration: "underline" }}>
                            高雄包棟民宿推薦
                        </Link>
                        {" "}首頁，比一直在文章裡跳來跳去更快進入訂房判斷。
                    </HomepageIntentBlock>
                </Reveal>

                <PropertyLinksBlock />

                <RelatedArticles current={slug} currentTags={article.tags} />

                <Reveal>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link>
                            <Link href="/blog" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>更多攻略</Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
