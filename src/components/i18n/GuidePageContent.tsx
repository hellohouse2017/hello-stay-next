import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export default function GuidePageContent({ locale }: { locale: Locale }) {
    const t = getDictionary(locale);
    const prefix = locale === "zh" ? "" : `/${locale}`;

    return (
        <>
            {locale !== "zh" && <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                name: t.guide.meta_title,
                description: t.guide.meta_desc,
                url: `https://www.hello-stay.com${prefix}/guide`,
                inLanguage: locale,
            }} />}

            <div className="legacy-editorial-page legacy-guide-page">
            {/* Hero Section */}
            <section className="hero-d" style={{ height: "60vh", minHeight: "450px" }}>
                <div className="bg" style={{ backgroundImage: "url('/images/cover-bg.jpg')", opacity: 0.4 }} />
                <div className="overlay" />
                <div className="content" style={{ padding: "0 28px" }}>
                    <div className="tagline" style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.3s forwards", textTransform: "uppercase" }}>
                        {locale === "zh" ? "Kaohsiung Travel & Villa Guide" : "Kaohsiung Travel & Private Villa Guide"}
                    </div>
                    <h1 style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.5s forwards", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", lineHeight: 1.4 }}>
                        {t.guide.hero_title}
                    </h1>
                    <p className="sub" style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.7s forwards", fontSize: "clamp(0.85rem, 2vw, 1.05rem)", color: "rgba(255,255,255,0.85)" }}>
                        {t.guide.hero_sub}
                    </p>
                </div>
            </section>

            {/* Section 1: Private Villa Experience */}
            <section className="sec-cream" style={{ padding: "80px 0 40px" }}>
                <div className="w">
                    <Reveal>
                        <div className="grid-asym" style={{ alignItems: "center", marginBottom: "60px" }}>
                            <div className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                <Image 
                                    src="/images/hellohouse/cover.jpg" 
                                    alt={locale === "zh" ? "Hello Stay 豪華中島廚房與手動麻將空間" : "Hello Stay Premium Private Villa Common Area with Island Kitchen"} 
                                    width={700} 
                                    height={525} 
                                    sizes="(max-width: 768px) 100vw, 50vw" 
                                    priority 
                                    className="img-cover" 
                                />
                            </div>
                            <div>
                                <div className="label-d" style={{ color: "var(--pri)", fontSize: "0.75rem", letterSpacing: "0.2em" }}>VILLA PRIVACY</div>
                                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#3D3830", marginBottom: "20px", fontWeight: 400 }}>
                                    {t.guide.section1_title}
                                </h2>
                                <div className="gold-line" style={{ marginBottom: "24px" }} />
                                <p style={{ fontSize: "0.92rem", color: "#8A8279", lineHeight: 2.2 }}>
                                    {t.guide.section1_desc}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Section 2: Seamless Travel & Access */}
            <section style={{ background: "#fff", padding: "60px 0" }}>
                <div className="w">
                    <Reveal>
                        <div className="grid-asym grid-asym-r" style={{ alignItems: "center", marginBottom: "60px" }}>
                            <div>
                                <div className="label-d" style={{ color: "#8A8279", fontSize: "0.75rem", letterSpacing: "0.2em" }}>交通便利</div>
                                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#3D3830", marginBottom: "20px", fontWeight: 400 }}>
                                    {t.guide.section2_title}
                                </h2>
                                <div className="gold-line" style={{ background: "#D4CBC0", marginBottom: "24px" }} />
                                <p style={{ fontSize: "0.92rem", color: "#8A8279", lineHeight: 2.2, marginBottom: "24px" }}>
                                    {t.guide.section2_desc}
                                </p>
                                <Link 
                                    href={`${prefix}/traffic`} 
                                    style={{ 
                                        fontFamily: "var(--serif)", 
                                        fontSize: "0.85rem", 
                                        color: "var(--pri)", 
                                        letterSpacing: "0.1em", 
                                        borderBottom: "1px solid rgba(200,173,127,0.4)", 
                                        paddingBottom: "4px" 
                                    }}
                                >
                                    {locale === "zh" ? "交通詳情與地圖 →" : (locale === "ja" ? "交通アクセス詳細 →" : (locale === "ko" ? "오시는 길 상세 정보 →" : "Directions & Map →"))}
                                </Link>
                            </div>
                            <div className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                <Image 
                                    src="/images/godin/cover-1.jpg" 
                                    alt={locale === "zh" ? "溝頂民宿外觀與便利交通位置" : "Godin House Villa Exterior and Location Guide"} 
                                    width={700} 
                                    height={525} 
                                    sizes="(max-width: 768px) 100vw, 50vw" 
                                    className="img-cover" 
                                />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Section 3: Exploring Pier-2 & Food */}
            <section className="sec-cream" style={{ padding: "60px 0" }}>
                <div className="w">
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: "50px" }}>
                            <div className="label-d" style={{ color: "#BEB5A8", fontSize: "0.75rem", letterSpacing: "0.2em" }}>NEIGHBORHOOD</div>
                            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 3vw, 2.2rem)", color: "#3D3830", fontWeight: 400 }}>
                                {t.guide.section3_title}
                            </h2>
                            <div className="gold-line" style={{ margin: "20px auto" }} />
                        </div>
                        
                        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 16px" }}>
                            <p style={{ fontSize: "0.95rem", color: "#8A8279", lineHeight: 2.2, textAlign: "center", marginBottom: "40px" }}>
                                {t.guide.section3_desc}
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Section 4: FAQ */}
            <section style={{ background: "#fff", padding: "80px 0" }}>
                <div className="w" style={{ maxWidth: "760px", padding: "0 24px" }}>
                    <Reveal>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#3D3830", textAlign: "center", marginBottom: "40px", fontWeight: 400 }}>
                            {t.guide.section4_title}
                        </h2>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                            <div style={{ padding: "24px", background: "var(--bg)", borderRadius: "12px" }}>
                                <h3 style={{ fontSize: "0.98rem", color: "#3D3830", fontWeight: 500, marginBottom: "12px", display: "flex", gap: "8px" }}>
                                    <span style={{ color: "var(--pri)" }}>Q:</span> {t.guide.faq_q1}
                                </h3>
                                <p style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2, paddingLeft: "24px" }}>
                                    {t.guide.faq_a1}
                                </p>
                            </div>
                            
                            <div style={{ padding: "24px", background: "var(--bg)", borderRadius: "12px" }}>
                                <h3 style={{ fontSize: "0.98rem", color: "#3D3830", fontWeight: 500, marginBottom: "12px", display: "flex", gap: "8px" }}>
                                    <span style={{ color: "var(--pri)" }}>Q:</span> {t.guide.faq_q2}
                                </h3>
                                <p style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2, paddingLeft: "24px" }}>
                                    {t.guide.faq_a2}
                                </p>
                            </div>
                            
                            <div style={{ padding: "24px", background: "var(--bg)", borderRadius: "12px" }}>
                                <h3 style={{ fontSize: "0.98rem", color: "#3D3830", fontWeight: 500, marginBottom: "12px", display: "flex", gap: "8px" }}>
                                    <span style={{ color: "var(--pri)" }}>Q:</span> {t.guide.faq_q3}
                                </h3>
                                <p style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2, paddingLeft: "24px" }}>
                                    {t.guide.faq_a3}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CTA Strip */}
            <div className="cta-strip" style={{ padding: "80px 24px" }}>
                <Reveal>
                    <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "16px" }}>{t.guide.cta_title}</h3>
                    <p style={{ fontSize: "0.92rem", opacity: 0.85, marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}>{t.guide.cta_sub}</p>
                    <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginTop: "12px" }}>
                        <Link href={`${prefix}/book`} className="btn-reserve" style={{ padding: "14px 40px" }}>{t.home.cta_btn}</Link>
                        <a 
                            href="mailto:hellohouse2017@gmail.com" 
                            style={{ 
                                padding: "14px 32px", 
                                borderRadius: "10px", 
                                border: "1px solid rgba(255,255,255,0.3)", 
                                color: "#fff", 
                                fontFamily: "var(--serif)", 
                                fontSize: "0.85rem", 
                                letterSpacing: "0.08em",
                                textDecoration: "none",
                                transition: "all 0.3s"
                            }} 
                            className="btn-email"
                        >
                            ✉️ {locale === "zh" ? "Email 聯絡我們" : (locale === "ja" ? "メールでお問い合わせ" : (locale === "ko" ? "이메일 문의하기" : "Contact via Email"))}
                        </a>
                    </div>
                </Reveal>
            </div>
            </div>
        </>
    );
}
