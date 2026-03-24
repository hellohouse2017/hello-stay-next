import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAlternateLinks } from "@/i18n/config";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function HomePage({ locale }: { locale: Locale }) {
    const t = getDictionary(locale);
    const prefix = locale === "zh" ? "" : `/${locale}`;

    return (
        <>
            {/* hreflang */}
            {getAlternateLinks("").map((link) => (
                <link key={link.hreflang} rel="alternate" hrefLang={link.hreflang} href={link.href} />
            ))}
            <link rel="alternate" hrefLang="x-default" href="https://www.hello-stay.com/" />

            {/* Hero */}
            <section className="hero-d">
                <div className="bg" style={{ backgroundImage: "url('/images/cover-bg.jpg')", opacity: 0.45 }} />
                <div className="overlay" />
                <div className="content" style={{ padding: "0 28px" }}>
                    <div className="tagline" style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.3s forwards" }}>
                        {t.home.tagline}
                    </div>
                    <h1 style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.5s forwards" }}>
                        {t.home.title}
                    </h1>
                    <p className="sub" style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.7s forwards" }}>
                        {t.home.sub}
                    </p>
                    <div style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.9s forwards" }}>
                        <Link href={`${prefix}/book`} className="btn-reserve">{t.home.cta}</Link>
                    </div>
                </div>
                <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", animation: "float 3s ease-in-out infinite" }}>
                    <div style={{ width: "1px", height: "40px", background: "linear-gradient(180deg, rgba(200,173,127,0.5), transparent)" }} />
                </div>
            </section>

            {/* Two Properties */}
            <section className="sec-cream">
                <div className="w" style={{ textAlign: "center", marginBottom: "60px" }}>
                    <Reveal>
                        <div className="label-d" style={{ color: "#8A8279" }}>{t.home.section_label}</div>
                        <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "0.06em" }}>{t.home.section_title}</h2>
                        <div className="gold-line" style={{ margin: "24px auto" }} />
                    </Reveal>
                </div>

                {/* 你好哇寓所 */}
                <div className="w">
                    <Reveal>
                        <div className="grid-asym" style={{ marginBottom: "clamp(60px, 8vw, 100px)" }}>
                            <div className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                <Image src="/images/hellohouse/cover.jpg" alt="Hello House" width={700} height={525} sizes="(max-width: 768px) 100vw, 50vw" priority className="img-cover" />
                            </div>
                            <div>
                                <div className="label-d" style={{ color: "var(--pri)" }}>01</div>
                                <h3 style={{ fontSize: "1.6rem", marginBottom: "16px", letterSpacing: "0.06em" }}>{locale === "zh" ? "你好哇寓所" : "Hello House"}</h3>
                                <div className="gold-line" style={{ marginBottom: "20px" }} />
                                <p style={{ fontSize: "0.92rem", color: "#8A8279", lineHeight: 2.1, marginBottom: "8px" }}>
                                    {t.home.hellohouse_desc}
                                </p>
                                <p style={{ fontSize: "0.78rem", color: "#bbb", marginBottom: "28px" }}>
                                    {t.home.hellohouse_location}
                                </p>
                                <Link href={`${prefix}/hellohouse`} style={{ fontFamily: "var(--serif)", fontSize: "0.85rem", color: "var(--pri)", letterSpacing: "0.1em", borderBottom: "1px solid rgba(200,173,127,0.3)", paddingBottom: "4px" }}>
                                    {t.home.explore_link}
                                </Link>
                            </div>
                        </div>
                    </Reveal>

                    {/* 溝頂民宿 */}
                    <Reveal>
                        <div className="grid-asym grid-asym-r">
                            <div>
                                <div className="label-d" style={{ color: "#8A8279" }}>02</div>
                                <h3 style={{ fontSize: "1.6rem", marginBottom: "16px", letterSpacing: "0.06em" }}>{locale === "zh" ? "溝頂民宿" : "Godin House"}</h3>
                                <div className="gold-line" style={{ background: "#D4CBC0", marginBottom: "20px" }} />
                                <p style={{ fontSize: "0.92rem", color: "#8A8279", lineHeight: 2.1, marginBottom: "8px" }}>
                                    {t.home.godin_desc}
                                </p>
                                <p style={{ fontSize: "0.78rem", color: "#bbb", marginBottom: "28px" }}>
                                    {t.home.godin_location}
                                </p>
                                <Link href={`${prefix}/godin`} style={{ fontFamily: "var(--serif)", fontSize: "0.85rem", color: "#8A8279", letterSpacing: "0.1em", borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "4px" }}>
                                    {t.home.explore_link}
                                </Link>
                            </div>
                            <div className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                <Image src="/images/godin/cover-1.jpg" alt="Godin House" width={700} height={525} sizes="(max-width: 768px) 100vw, 50vw" className="img-cover" />
                            </div>
                        </div>
                    </Reveal>

                    {/* 大智若愚 */}
                    <Reveal>
                        <div className="grid-asym" style={{ marginTop: "clamp(60px, 8vw, 100px)" }}>
                            <div style={{ background: "var(--bg)", borderRadius: "16px", padding: "40px 32px", textAlign: "center" }}>
                                <div style={{ fontSize: "0.6rem", fontFamily: "var(--en)", letterSpacing: "0.3em", textTransform: "uppercase", color: "#BEB5A8", marginBottom: "16px" }}>{t.home.dazhi_coming}</div>
                                <div style={{ fontFamily: "var(--serif)", fontSize: "2rem", color: "#3D3830", letterSpacing: "0.1em", marginBottom: "12px" }}>大智若愚</div>
                                <div style={{ width: "40px", height: "1px", background: "#D4CBC0", margin: "0 auto" }} />
                            </div>
                            <div>
                                <div className="label-d" style={{ color: "#BEB5A8" }}>03</div>
                                <h3 style={{ fontSize: "1.6rem", marginBottom: "16px", letterSpacing: "0.06em" }}>大智若愚</h3>
                                <div className="gold-line" style={{ background: "#D4CBC0", marginBottom: "20px" }} />
                                <p style={{ fontSize: "0.92rem", color: "#8A8279", lineHeight: 2.1, marginBottom: "8px" }}>
                                    {t.home.dazhi_desc}
                                </p>
                                <p style={{ fontSize: "0.78rem", color: "#bbb", marginBottom: "28px" }}>
                                    {t.home.dazhi_location}
                                </p>
                                <Link href={`${prefix}/dazhi`} style={{ fontFamily: "var(--serif)", fontSize: "0.85rem", color: "#A09282", letterSpacing: "0.1em", borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "4px" }}>
                                    {t.home.learn_more}
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CTA */}
            <div className="cta-strip">
                <Reveal>
                    <h3>{t.home.cta_title}</h3>
                    <p>{t.home.cta_sub}</p>
                    <Link href={`${prefix}/book`} className="btn-reserve">{t.home.cta_btn}</Link>
                </Reveal>
            </div>
        </>
    );
}
