import Link from "next/link";
import Reveal from "@/components/Reveal";
import LineFloatingCTA from "@/components/LineFloatingCTA";
import { hellohouse, godin } from "@/data/properties";

/* ── Types ── */
interface PropertyCard {
    name: string;
    slug: string;
    capacity: string;
    price: string;
    highlight: string;
    features: string[];
    image: string;
    lineUrl: string;
}

interface FAQ {
    q: string;
    a: string;
}

interface MoneyPageProps {
    title: string;
    subtitle: string;
    heroImage: string;
    intro: string;
    properties: PropertyCard[];
    faqs: FAQ[];
    relatedLinks: { href: string; emoji: string; title: string; desc: string }[];
    lineUrl: string;
    ctaText: string;
}

export default function MoneyPageTemplate({
    title, subtitle, heroImage, intro, properties, faqs, relatedLinks, lineUrl, ctaText,
}: MoneyPageProps) {
    return (
        <>
            {/* ── Hero: Full-width immersive ── */}
            <section style={{
                position: "relative", height: "70vh", minHeight: "450px",
                background: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%), url(${heroImage}) center/cover no-repeat`,
                display: "flex", alignItems: "center", justifyContent: "center",
                textAlign: "center", color: "#fff",
            }}>
                <div style={{ padding: "0 28px", maxWidth: "700px" }}>
                    <Reveal>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.7, marginBottom: "16px" }}>Hello Stay</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "0.08em", lineHeight: 1.4, marginBottom: "16px" }}>
                            {title}
                        </h1>
                        <p style={{ fontSize: "0.95rem", opacity: 0.85, lineHeight: 1.8, marginBottom: "28px" }}>
                            {subtitle}
                        </p>
                        <a href={lineUrl} target="_blank" rel="noopener noreferrer" style={{
                            display: "inline-block", padding: "14px 40px",
                            background: "#06C755", color: "#fff", border: "none",
                            borderRadius: "6px", fontSize: "0.9rem", fontWeight: 600,
                            letterSpacing: "0.08em", textDecoration: "none",
                            boxShadow: "0 4px 20px rgba(6,199,85,0.3)",
                        }}>
                            💬 LINE 立即詢問
                        </a>
                    </Reveal>
                </div>
            </section>

            {/* ── Intro paragraph (SEO text) ── */}
            <section style={{ background: "var(--bg)", padding: "60px 28px" }}>
                <div className="w" style={{ maxWidth: "760px" }}>
                    <Reveal>
                        <p style={{ fontSize: "0.95rem", color: "#555", lineHeight: 2.2, textAlign: "justify" }}>
                            {intro}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ── Property Comparison Cards ── */}
            <section style={{ padding: "clamp(60px,10vw,100px) 28px", background: "#fff" }}>
                <div className="w">
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: "48px" }}>
                            <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "8px", fontWeight: 600 }}>Compare</div>
                            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.2rem,3vw,1.6rem)", color: "var(--text)", letterSpacing: "0.08em", fontWeight: 400 }}>
                                推薦民宿比較
                            </h2>
                        </div>
                    </Reveal>

                    <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                        {properties.map(p => (
                            <Reveal key={p.slug}>
                                <div style={{
                                    borderRadius: "4px", overflow: "hidden",
                                    border: "1px solid var(--line)",
                                    background: "var(--surface)", transition: "transform 0.3s",
                                }}>
                                    <div style={{
                                        height: "200px",
                                        background: `url(${p.image}) center/cover no-repeat`,
                                    }} />
                                    <div style={{ padding: "24px" }}>
                                        <h3 style={{ fontSize: "1.1rem", color: "#2a2a2a", marginBottom: "8px", fontFamily: "var(--serif)" }}>{p.name}</h3>
                                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                                            <span style={{ fontSize: "0.72rem", padding: "4px 10px", background: "#F5F0E8", borderRadius: "20px", color: "#8B7355" }}>{p.capacity}</span>
                                            <span style={{ fontSize: "0.72rem", padding: "4px 10px", background: "#E8F5E9", borderRadius: "20px", color: "#2E7D32" }}>{p.price}</span>
                                        </div>
                                        <p style={{ fontSize: "0.82rem", color: "var(--pri)", marginBottom: "12px", fontWeight: 500 }}>✨ {p.highlight}</p>
                                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                            {p.features.map(f => (
                                                <li key={f} style={{ fontSize: "0.78rem", color: "#888", padding: "3px 0" }}>✓ {f}</li>
                                            ))}
                                        </ul>
                                        <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                                            <a href={p.lineUrl} target="_blank" rel="noopener noreferrer" style={{
                                                flex: 1, textAlign: "center", padding: "10px",
                                                background: "#06C755", color: "#fff", borderRadius: "8px",
                                                fontSize: "0.78rem", textDecoration: "none", fontWeight: 600,
                                            }}>LINE 詢問</a>
                                            <Link href={`/${p.slug}`} style={{
                                                flex: 1, textAlign: "center", padding: "10px",
                                                border: "1px solid #ddd", color: "#666", borderRadius: "8px",
                                                fontSize: "0.78rem", textDecoration: "none",
                                            }}>了解更多</Link>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ Section (SEO + AEO) ── */}
            <section style={{ padding: "60px 28px", background: "var(--bg)" }}>
                <div className="w" style={{ maxWidth: "760px" }}>
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: "36px" }}>
                            <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "8px", fontWeight: 600 }}>FAQ</div>
                            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.1rem,2.5vw,1.4rem)", color: "var(--text)", fontWeight: 400 }}>常見問題</h2>
                        </div>
                    </Reveal>
                    {faqs.map((faq, i) => (
                        <Reveal key={i}>
                            <details style={{
                                borderBottom: "1px solid #E8E0D4", padding: "20px 0",
                            }}>
                                <summary style={{
                                    cursor: "pointer", fontSize: "0.92rem", color: "#3D3830",
                                    fontWeight: 500, listStyle: "none",
                                }}>
                                    💬 {faq.q}
                                </summary>
                                <p style={{ fontSize: "0.85rem", color: "#777", lineHeight: 1.9, marginTop: "12px", paddingLeft: "28px" }}>
                                    {faq.a}
                                </p>
                            </details>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ padding: "80px 28px", background: "#fff", textAlign: "center" }}>
                <Reveal>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.2rem,3vw,1.6rem)", color: "#2a2a2a", marginBottom: "12px", letterSpacing: "0.06em" }}>
                        {ctaText}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#999", marginBottom: "28px" }}>
                        30 秒查空房・免費報價・無綁約
                    </p>
                    <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                        <a href={lineUrl} target="_blank" rel="noopener noreferrer" style={{
                            padding: "14px 44px", background: "#06C755", color: "#fff",
                            borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600,
                            textDecoration: "none", letterSpacing: "0.08em",
                        }}>💬 LINE 立即詢問</a>
                        <Link href="/book" style={{
                            padding: "14px 44px", border: "1px solid #2a2a2a", color: "#2a2a2a",
                            fontSize: "0.85rem", textDecoration: "none", letterSpacing: "0.08em",
                        }}>自助查空房</Link>
                    </div>
                </Reveal>
            </section>

            {/* ── Related Articles ── */}
            <section style={{ padding: "48px 28px", background: "var(--bg)" }}>
                <div className="w" style={{ maxWidth: "700px" }}>
                    <Reveal>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1rem", color: "#3D3830", textAlign: "center", marginBottom: "20px" }}>相關攻略</h3>
                        <div style={{ display: "grid", gap: "8px" }}>
                            {relatedLinks.map(a => (
                                <Link key={a.href} href={a.href} style={{
                                    textDecoration: "none", display: "flex", alignItems: "center",
                                    gap: "12px", padding: "12px 16px", borderRadius: "10px",
                                    background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                                }}>
                                    <span style={{ fontSize: "1.2rem" }}>{a.emoji}</span>
                                    <div>
                                        <div style={{ fontSize: "0.82rem", color: "#3D3830", fontWeight: 500 }}>{a.title}</div>
                                        <div style={{ fontSize: "0.7rem", color: "#999" }}>{a.desc}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            <LineFloatingCTA lineUrl={lineUrl} message="幫你查空房 💬" />
        </>
    );
}
