import { scheduledArticles, getPublishedArticles } from "@/data/scheduled-articles";
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

// Generate static pages only for published articles
export async function generateStaticParams() {
    return getPublishedArticles(scheduledArticles).map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const article = scheduledArticles.find(a => a.slug === slug);
    if (!article) return {};
    return {
        title: article.title,
        description: article.description,
        alternates: { canonical: `https://www.hello-stay.com/blog/${slug}` },
        openGraph: {
            title: article.title,
            description: article.description,
            url: `https://www.hello-stay.com/blog/${slug}`,
            type: "article",
        },
    };
}

export default async function ScheduledArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = scheduledArticles.find(a => a.slug === slug);
    if (!article) notFound();

    // Check publish date
    const today = new Date().toISOString().slice(0, 10);
    if (article.publishDate > today) notFound();

    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "#FAF8F5", minHeight: "100vh" }}>
            <JsonLd data={[
                {
                    "@context": "https://schema.org", "@type": "Article",
                    headline: article.title,
                    description: article.description,
                    author: { "@type": "Organization", name: "Hello Stay 你好哇寓所", url: "https://www.hello-stay.com" },
                    publisher: { "@type": "Organization", name: "Hello Stay", url: "https://www.hello-stay.com" },
                    datePublished: article.publishDate,
                    mainEntityOfPage: `https://www.hello-stay.com/blog/${slug}`,
                },
                ...(article.faq ? [{
                    "@context": "https://schema.org", "@type": "FAQPage",
                    mainEntity: article.faq.map(f => ({
                        "@type": "Question", name: f.q,
                        acceptedAnswer: { "@type": "Answer", text: f.a },
                    })),
                }] : []),
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: article.title.split("：")[0] || article.title, href: `/blog/${slug}` }]} />

                <Reveal>
                    <div style={{ marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#C8AD7F", marginBottom: "12px" }}>{article.publishDate}</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>
                            {article.title}
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "#C8AD7F", margin: "20px 0" }} />
                        <p style={{ fontSize: "0.85rem", color: "#999", lineHeight: 1.9 }}>{article.description}</p>
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

                {article.faq && article.faq.length > 0 && (
                    <Reveal>
                        <section style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px", letterSpacing: "0.04em" }}>常見問答</h2>
                            {article.faq.map((f, i) => (
                                <div key={i} style={{ marginBottom: i < article.faq!.length - 1 ? "20px" : 0 }}>
                                    <h3 style={{ fontSize: "0.92rem", color: "#3D3830", marginBottom: "8px", fontWeight: 500 }}>Q: {f.q}</h3>
                                    <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 2 }}>A: {f.a}</p>
                                </div>
                            ))}
                        </section>
                    </Reveal>
                )}

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
