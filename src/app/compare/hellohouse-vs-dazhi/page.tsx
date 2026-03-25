import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "你好哇寓所 vs 大智若愚｜高雄包棟比較｜6-26人 vs 20-48人",
    description: "你好哇寓所和大智若愚完整比較：人數、廚房、電梯、價格。中型聚會 vs 超大團體，幫你快速決定。",
    alternates: { canonical: "https://www.hello-stay.com/compare/hellohouse-vs-dazhi" },
};

export default function Page() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                { "@type": "Question", name: "20人包棟選你好哇還是大智若愚？", acceptedAnswer: { "@type": "Answer", text: "20人目前選你好哇寓所（已營運，中島廚房+麻將桌，Google 4.9星）。大智若愚預計2027年開幕，開幕後20人以上可選擇有電梯的大智若愚。" } },
            ]}} />
            <div className="w" style={{ maxWidth: "780px", padding: "0 20px 80px" }}>
                <Reveal><div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>Compare</div>
                    <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)", fontWeight: 400, color: "#2a2a2a" }}>你好哇寓所 vs 大智若愚</h1>
                    <p style={{ fontSize: "0.85rem", color: "#999", marginTop: "12px" }}>中型聚會 vs 超大團體｜6-26人 vs 20-48人</p>
                </div></Reveal>
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", borderLeft: "4px solid var(--pri)" }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "10px" }}>快速結論</div>
                    <p style={{ fontSize: "0.88rem", color: "#3D3830", lineHeight: 2 }}>
                        <strong>20人以內</strong>→ 你好哇寓所（已營運、中島廚房、麻將桌、Google 4.9星）<br />
                        <strong>20–48人超大團體</strong>→ 大智若愚（2027年開幕、電梯、可包層）<br />
                        <strong>兩館都合適的 20–26人</strong>→ 目前選你好哇，開幕後可比較
                    </p>
                </div></Reveal>
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 12px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                        <thead><tr style={{ borderBottom: "2px solid #F5F1ED" }}>
                            <th style={{ textAlign: "left", padding: "10px 8px", color: "#999" }}>項目</th>
                            <th style={{ textAlign: "center", padding: "10px 8px", color: "var(--pri)", fontWeight: 600 }}>你好哇寓所</th>
                            <th style={{ textAlign: "center", padding: "10px 8px", color: "var(--pri)", fontWeight: 600 }}>大智若愚</th>
                        </tr></thead>
                        <tbody>
                            {[
                                ["人數", "6–26 人", "20–48 人"],
                                ["狀態", "✅ 營運中", "🔜 2027年中開幕"],
                                ["價格", "$12,000–$34,800", "即將公布"],
                                ["房間數", "6 間套房", "16+ 間"],
                                ["電梯", "❌", "✅"],
                                ["廚房", "✅ 豪華中島廚房", "規劃中"],
                                ["麻將桌", "✅ 全自動", "規劃中"],
                                ["最適合", "家庭·婚禮·企業團建", "企業員旅·球隊·大家族"],
                            ].map(([label, a, b], i) => (
                                <tr key={label} style={{ borderBottom: "1px solid #F5F1ED", background: i % 2 === 0 ? "#FDFCFB" : "#fff" }}>
                                    <td style={{ padding: "12px 8px", color: "#666", fontWeight: 500 }}>{label}</td>
                                    <td style={{ padding: "12px 8px", textAlign: "center", color: "#3D3830" }}>{a}</td>
                                    <td style={{ padding: "12px 8px", textAlign: "center", color: "#3D3830" }}>{b}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div></Reveal>
                <Reveal><div style={{ textAlign: "center", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/hellohouse" style={{ padding: "14px 28px", borderRadius: "10px", background: "#161618", color: "#fff", fontSize: "0.82rem", textDecoration: "none" }}>看你好哇寓所</Link>
                    <Link href="/dazhi" style={{ padding: "14px 28px", borderRadius: "10px", background: "#161618", color: "#fff", fontSize: "0.82rem", textDecoration: "none" }}>看大智若愚</Link>
                    <Link href="/compare" style={{ padding: "14px 28px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontSize: "0.82rem", textDecoration: "none" }}>← 全部比較</Link>
                </div></Reveal>
            </div>
        </div>
    );
}
