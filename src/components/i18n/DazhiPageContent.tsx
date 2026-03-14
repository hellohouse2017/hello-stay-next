"use client";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function DazhiPageContent({ locale }: { locale: Locale }) {
    const t = getDictionary(locale);
    const d = t.dazhi;
    const prefix = locale === "zh" ? "" : `/${locale}`;

    const features = [
        { icon: "🏗️", title: d.feat1_title, sub: d.feat1_sub },
        { icon: "🏠", title: d.feat2_title, sub: d.feat2_sub },
        { icon: "🔑", title: d.feat3_title, sub: d.feat3_sub },
        { icon: "👥", title: d.feat4_title, sub: d.feat4_sub },
    ];

    return (
        <div style={{ minHeight: "100vh", background: "#FAF8F5", paddingTop: "calc(var(--nav-h) + 20px)", paddingBottom: "80px" }}>
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px" }}>
                <Reveal>
                    <div style={{ borderRadius: "20px", overflow: "hidden", marginBottom: "50px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
                        <Image src="/images/dazhi/building-render.webp" alt="大智若愚" width={720} height={720} className="img-cover" style={{ width: "100%", height: "auto" }} priority />
                    </div>
                </Reveal>
                <div style={{ textAlign: "center" }}>
                    <Reveal>
                        <div style={{ display: "inline-block", padding: "8px 24px", borderRadius: "40px", background: "#F0ECE6", fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#A09282", marginBottom: "40px" }}>
                            {d.coming_soon}
                        </div>
                    </Reveal>
                    <Reveal>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.4rem, 7vw, 4.2rem)", fontWeight: 400, color: "#3D3830", letterSpacing: "0.12em", marginBottom: "20px", lineHeight: 1.3 }}>
                            {d.title}
                        </h1>
                    </Reveal>
                    <Reveal>
                        <p style={{ fontFamily: "var(--en)", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#BEB5A8", marginBottom: "50px" }}>
                            {d.tagline}
                        </p>
                    </Reveal>
                    <Reveal><div style={{ width: "80px", height: "2px", margin: "0 auto 50px", background: "linear-gradient(90deg, transparent, #D4CBC0, transparent)" }} /></Reveal>
                    <Reveal>
                        <div style={{ background: "#fff", borderRadius: "20px", padding: "36px 32px", boxShadow: "0 4px 30px rgba(0,0,0,0.03)", marginBottom: "32px" }}>
                            <div style={{ fontSize: "0.65rem", fontFamily: "var(--en)", letterSpacing: "0.25em", textTransform: "uppercase", color: "#BEB5A8", marginBottom: "14px" }}>{d.location_label}</div>
                            <p style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", letterSpacing: "0.06em", lineHeight: 1.8 }}>{d.location_title}</p>
                            <p style={{ fontSize: "0.82rem", color: "#BEB5A8", marginTop: "8px" }}>{d.location_sub}</p>
                        </div>
                    </Reveal>
                    <Reveal>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "40px" }}>
                            {features.map(f => (
                                <div key={f.title} style={{ background: "#fff", borderRadius: "16px", padding: "28px 20px", boxShadow: "0 2px 16px rgba(0,0,0,0.02)", textAlign: "center" }}>
                                    <div style={{ fontSize: "1.6rem", marginBottom: "10px" }}>{f.icon}</div>
                                    <div style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", color: "#3D3830", letterSpacing: "0.04em", marginBottom: "4px" }}>{f.title}</div>
                                    <div style={{ fontSize: "0.75rem", color: "#BEB5A8" }}>{f.sub}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                    <Reveal>
                        <p style={{ fontSize: "0.92rem", color: "#A09282", lineHeight: 2.3, marginBottom: "50px", whiteSpace: "pre-line" }}>
                            {d.desc}
                        </p>
                    </Reveal>
                    <Reveal>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href={prefix || "/"} style={{ padding: "14px 36px", borderRadius: "40px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em", transition: "all 0.3s" }}>
                                {d.cta_home}
                            </Link>
                            <a href="https://lin.ee/atCiMQw" target="_blank" rel="noreferrer" style={{ padding: "14px 36px", borderRadius: "40px", background: "#06C755", border: "1px solid #06C755", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em", transition: "all 0.3s" }}>
                                {d.cta_line}
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
