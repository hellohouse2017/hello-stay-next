import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "高雄包棟停車方便嗎？｜附近停車場資訊｜Hello Stay",
    description: "Hello Stay三間民宿附近停車場完整資訊。鹽埕區多處收費停車場，開車3-5分鐘。捷運鹽埕埔站步行5分鐘，建議搭捷運更方便。",
    alternates: { canonical: "https://www.hello-stay.com/features/parking" },
};
export default function Page() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                { "@type": "Question", name: "高雄包棟民宿停車方便嗎？", acceptedAnswer: { "@type": "Answer", text: "Hello Stay三間民宿位於鹽埕區，附近有多處收費停車場（每小時$20-$40）。建議搭捷運到鹽埕埔站步行5-8分鐘更方便。開車的話，附近大港停車場、鹽埕停車場皆步行3-5分鐘。" } },
            ]}} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 20px 80px" }}>
                <Reveal><div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>Feature: Parking</div>
                    <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)", fontWeight: 400, color: "#2a2a2a" }}>高雄包棟民宿停車資訊</h1>
                    <p style={{ fontSize: "0.85rem", color: "#999", marginTop: "12px" }}>附近停車場·捷運·交通方式完整說明</p>
                </div></Reveal>
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", borderLeft: "4px solid var(--pri)" }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "10px" }}>結論</div>
                    <p style={{ fontSize: "0.88rem", color: "#3D3830", lineHeight: 2 }}>三間民宿皆無自有停車場，但鹽埕區有<strong>多處公有/私有停車場</strong>步行3-5分鐘。建議搭<strong>捷運鹽埕埔站步行5分鐘</strong>最方便。大團體開多台車可用大港停車場。</p>
                </div></Reveal>
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "12px" }}>附近停車場</h2>
                    <div style={{ display: "grid", gap: "8px" }}>
                        {[
                            { name: "大港停車場", dist: "步行3分鐘", price: "每小時$20" },
                            { name: "鹽埕公有停車場", dist: "步行5分鐘", price: "每小時$30" },
                            { name: "駁二附近路邊停車", dist: "步行5-8分鐘", price: "每小時$40" },
                        ].map(p => (
                            <div key={p.name} style={{ padding: "14px 16px", borderRadius: "10px", background: "var(--bg)", display: "flex", justifyContent: "space-between" }}>
                                <div><span style={{ fontSize: "0.85rem", color: "#3D3830", fontWeight: 500 }}>{p.name}</span><span style={{ fontSize: "0.75rem", color: "#999", marginLeft: "8px" }}>{p.dist}</span></div>
                                <span style={{ fontSize: "0.8rem", color: "var(--pri)" }}>{p.price}</span>
                            </div>
                        ))}
                    </div>
                </div></Reveal>
                <Reveal><div style={{ textAlign: "center", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/traffic" style={{ padding: "14px 28px", borderRadius: "10px", background: "#161618", color: "#fff", fontSize: "0.82rem", textDecoration: "none" }}>完整交通指南</Link>
                    <Link href="/kaohsiung-whole-house" style={{ padding: "14px 28px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontSize: "0.82rem", textDecoration: "none" }}>← 高雄包棟總覽</Link>
                </div></Reveal>
            </div>
        </div>
    );
}
