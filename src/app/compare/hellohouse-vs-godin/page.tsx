import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "你好哇寓所 vs 溝頂民宿｜高雄包棟比較｜6-26人 vs 6-12人",
    description: "你好哇寓所和溝頂民宿完整比較：人數、廚房、麻將桌、價格一次看。兩棟相距僅30秒，可合訂最高38人。",
    alternates: { canonical: "https://www.hello-stay.com/compare/hellohouse-vs-godin" },
};

export default function Page() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={{
                "@context": "https://schema.org", "@type": "FAQPage",
                mainEntity: [
                    { "@type": "Question", name: "你好哇寓所和溝頂民宿哪個適合家庭？", acceptedAnswer: { "@type": "Answer", text: "6-12人帶長輩選溝頂（五層獨棟，長輩住低樓層）；13-26人大家庭或需要廚房煮飯選你好哇寓所（中島廚房+麻將桌）。兩棟步行30秒可合訂。" } },
                    { "@type": "Question", name: "你好哇寓所和溝頂有什麼不同？", acceptedAnswer: { "@type": "Answer", text: "你好哇：4層樓6間房，豪華中島廚房+手動麻將桌，適合聚會；溝頂：5層獨棟4間房，手動麻將桌，每層獨立空間，適合小家庭和帶長輩旅遊。" } },
                ],
            }} />
            <div className="w" style={{ maxWidth: "780px", padding: "0 20px 80px" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>Compare</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>你好哇寓所 vs 溝頂民宿</h1>
                        <p style={{ fontSize: "0.85rem", color: "#999", marginTop: "12px" }}>兩棟相距僅 30 秒，可合訂最高 38 人</p>
                    </div>
                </Reveal>
                <Reveal>
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", borderLeft: "4px solid var(--pri)" }}>
                        <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "10px" }}>快速結論</div>
                        <p style={{ fontSize: "0.88rem", color: "#3D3830", lineHeight: 2 }}>
                            想煮火鍋、打麻將、辦聚會 → <strong>你好哇寓所</strong>。<br />
                            6–12人小團體、帶長輩出遊 → <strong>溝頂民宿</strong>。<br />
                            13人以上大團體 → <strong>兩棟合訂</strong>最高38人。
                        </p>
                    </div>
                </Reveal>
                <Reveal>
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "24px 12px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                            <thead><tr style={{ borderBottom: "2px solid #F5F1ED" }}>
                                <th style={{ textAlign: "left", padding: "10px 8px", color: "#999" }}>項目</th>
                                <th style={{ textAlign: "center", padding: "10px 8px", color: "var(--pri)", fontWeight: 600 }}>你好哇寓所</th>
                                <th style={{ textAlign: "center", padding: "10px 8px", color: "var(--pri)", fontWeight: 600 }}>溝頂民宿</th>
                            </tr></thead>
                            <tbody>
                                {[
                                    ["人數", "6–26 人", "6–12 人"],
                                    ["價格", "$12,000–$34,800", "$8,000–$18,400"],
                                    ["每人均攤", "$583–$1,400", "$833–$1,000"],
                                    ["房間數", "6 間套房", "4 間套房"],
                                    ["樓層", "4 層樓", "5 層獨棟"],
                                    ["廚房", "✅ 豪華中島廚房", "❌ 流理臺＋微波爐"],
                                    ["麻將桌", "✅ 手動", "✅ 手動"],
                                    ["電梯", "❌", "❌"],
                                    ["長輩友善", "⭐⭐⭐", "⭐⭐⭐⭐⭐"],
                                    ["最適合", "聚會·婚禮·企業", "家庭·帶長輩·小聚"],
                                ].map(([label, a, b], i) => (
                                    <tr key={label} style={{ borderBottom: "1px solid #F5F1ED", background: i % 2 === 0 ? "#FDFCFB" : "#fff" }}>
                                        <td style={{ padding: "12px 8px", color: "#666", fontWeight: 500 }}>{label}</td>
                                        <td style={{ padding: "12px 8px", textAlign: "center", color: "#3D3830" }}>{a}</td>
                                        <td style={{ padding: "12px 8px", textAlign: "center", color: "#3D3830" }}>{b}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Reveal>
                <Reveal>
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "12px" }}>怎麼選？</h2>
                        <div style={{ fontSize: "0.85rem", color: "#666", lineHeight: 2 }}>
                            <p>✅ 選<strong>你好哇寓所</strong>：你需要中島廚房煮火鍋、打麻將、13人以上大團體、辦婚禮或企業活動。</p>
                            <p>✅ 選<strong>溝頂民宿</strong>：你是6-12人小團體、有長輩同行（五層樓各層獨立不用爬太多）、喜歡五層獨棟的隱私感。</p>
                            <p>✅ <strong>兩棟合訂</strong>：超過12人但不到38人，兩棟距離30秒，各有獨立空間。</p>
                        </div>
                    </div>
                </Reveal>
                <Reveal>
                    <div style={{ textAlign: "center", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/hellohouse" style={{ padding: "14px 28px", borderRadius: "10px", background: "#161618", color: "#fff", fontSize: "0.82rem", textDecoration: "none" }}>看你好哇寓所</Link>
                        <Link href="/godin" style={{ padding: "14px 28px", borderRadius: "10px", background: "#161618", color: "#fff", fontSize: "0.82rem", textDecoration: "none" }}>看溝頂民宿</Link>
                        <Link href="/compare" style={{ padding: "14px 28px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontSize: "0.82rem", textDecoration: "none" }}>← 全部比較</Link>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
