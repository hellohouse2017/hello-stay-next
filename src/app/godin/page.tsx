import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
    title: "溝頂民宿 | 高雄鹽埕區精緻小包棟 | 10-12人家庭出遊推薦",
    description: "溝頂民宿位於高雄鹽埕區，提供10至12人精緻獨棟包棟，五層樓空間規劃，溫馨家庭風格。交通便利近駁二藝術特區。",
    alternates: { canonical: "https://www.hello-stay.com/godin" },
};

const features = [
    { icon: "fa-solid fa-house-chimney", title: "五層獨棟空間", desc: "整棟獨立使用，完整隱私。從 1F 到 5F 每層都有不同功能空間規劃。" },
    { icon: "fa-solid fa-users", title: "10-12人舒適入住", desc: "3-4 房靈活配置，每房獨立衛浴。適合家族旅遊、小型團體包棟。" },
    { icon: "fa-solid fa-tag", title: "高 CP 值定價", desc: "平日 10,000 元起即可全棟包下，是小團體包棟的超值首選。" },
    { icon: "fa-solid fa-location-dot", title: "鹽埕核心位置", desc: "步行即可抵達駁二、大港橋。鄰近捷運鹽埕埔站，交通便利。" },
];

const floors = [
    { title: "1F", sub: "玄關 + 公共空間", detail: "電子鎖入口、鞋櫃、公共區域" },
    { title: "2F", sub: "四人房", detail: "寬敞四人空間，獨立衛浴" },
    { title: "3F", sub: "四人房", detail: "明亮四人空間，獨立衛浴" },
    { title: "4F", sub: "雙人房 + 客廳", detail: "溫馨雙人房，開放式客廳" },
    { title: "5F", sub: "雙人房", detail: "頂樓雙人房，採光充足" },
];

export default function GodinPage() {
    return (
        <>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LodgingBusiness",
                        name: "溝頂民宿",
                        url: "https://www.hello-stay.com/godin",
                        telephone: "0932828922",
                        description: "高雄鹽埕精緻小包棟，10-12人家庭出遊推薦。",
                        address: { "@type": "PostalAddress", addressLocality: "高雄市", addressRegion: "鹽埕區" },
                    }),
                }}
            />

            {/* Hero */}
            <section
                style={{
                    position: "relative",
                    height: "75vh",
                    minHeight: "550px",
                    display: "flex",
                    alignItems: "flex-end",
                    overflow: "hidden",
                    background: "#0a0a0a",
                }}
            >
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/godin/cover-1.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.55, animation: "zoomSlow 25s infinite alternate" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)" }} />
                <div style={{ position: "relative", zIndex: 2, padding: "60px 0", width: "100%" }}>
                    <div className="container">
                        <div style={{ fontFamily: "var(--font-en)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--c-gold-light)", marginBottom: "16px", opacity: 0, animation: "fadeInUp 0.8s ease 0.2s forwards" }}>
                            Godin House · 溝頂民宿
                        </div>
                        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white", fontWeight: 600, letterSpacing: "0.06em", lineHeight: 1.3, marginBottom: "24px", opacity: 0, animation: "fadeInUp 0.8s ease 0.4s forwards" }}>
                            溝頂民宿
                        </h1>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", opacity: 0, animation: "fadeInUp 0.8s ease 0.6s forwards" }}>
                            {["10-12人精緻包棟", "五層獨棟空間", "高CP值"].map(t => (
                                <span key={t} className="badge" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.15)" }}>{t}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section className="section" style={{ background: "white" }}>
                <div className="container" style={{ maxWidth: "750px", textAlign: "center" }}>
                    <Reveal>
                        <span className="section-label" style={{ justifyContent: "center" }}>About Godin</span>
                        <p style={{ fontSize: "1.15rem", lineHeight: 2.2, color: "var(--c-text-soft)" }}>
                            <strong style={{ color: "var(--c-text)" }}>溝頂民宿</strong>是你好哇系列的精緻二館，
                            整棟五層樓獨立空間，<strong style={{ color: "var(--c-text)" }}>10 至 12 人</strong>小團體的完美選擇。
                            隱身在鹽埕靜謐巷弄中，卻擁有前往駁二、大港橋的絕佳位置。
                            以溫馨家庭風格呈現，讓每一次入住都像回家。
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Gallery */}
            <section style={{ padding: "0 0 var(--space-2xl)" }}>
                <div className="container">
                    <Reveal>
                        <div className="gallery-grid">
                            {[
                                { src: "/images/godin/cover-1.jpg", alt: "溝頂民宿外觀" },
                                { src: "/images/godin/cover-2.jpg", alt: "溝頂民宿客廳" },
                                { src: "/images/godin/cover-3.jpg", alt: "溝頂民宿臥室" },
                            ].map(img => (
                                <div key={img.src} className="gallery-img">
                                    <Image src={img.src} alt={img.alt} width={800} height={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Features */}
            <section className="section" style={{ background: "var(--c-warm-white)" }}>
                <div className="container">
                    <Reveal>
                        <span className="section-label">Highlights</span>
                        <h2 className="section-heading">溝頂四大特色</h2>
                    </Reveal>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginTop: "50px" }}>
                        {features.map((f, i) => (
                            <Reveal key={f.title} delay={i + 1}>
                                <div className="feature-card">
                                    <div className="feature-icon"><i className={f.icon} /></div>
                                    <h3 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>{f.title}</h3>
                                    <p style={{ color: "var(--c-text-soft)", fontSize: "0.9rem", lineHeight: 1.8 }}>{f.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Floor Plan */}
            <section className="section">
                <div className="container" style={{ maxWidth: "750px" }}>
                    <Reveal>
                        <span className="section-label">Floor Plan</span>
                        <h2 className="section-heading">樓層空間配置</h2>
                    </Reveal>
                    <div style={{ marginTop: "50px" }}>
                        {floors.map((f, i) => (
                            <Reveal key={f.title} delay={i}>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "24px",
                                    padding: "24px 0",
                                    borderBottom: "1px solid var(--c-border)",
                                }}>
                                    <div style={{
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "16px",
                                        background: "var(--c-gold-glow)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontFamily: "var(--font-en)",
                                        fontWeight: 700,
                                        fontSize: "1.1rem",
                                        color: "var(--c-gold-dark)",
                                        flexShrink: 0,
                                    }}>
                                        {f.title}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "4px" }}>{f.sub}</div>
                                        <div style={{ fontSize: "0.88rem", color: "var(--c-text-soft)" }}>{f.detail}</div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section" style={{ background: "var(--c-cream)" }}>
                <div className="container">
                    <Reveal>
                        <div className="cta-block">
                            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "white", marginBottom: "16px" }}>
                                小團體的完美包棟體驗
                            </h3>
                            <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "36px", lineHeight: 2 }}>
                                平日 $10,000 起，12 人以內的聚會首選。
                            </p>
                            <Link href="/book" className="btn btn-gold" style={{ padding: "16px 48px" }}>
                                立即查詢空房
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
