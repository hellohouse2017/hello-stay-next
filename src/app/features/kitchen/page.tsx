import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "有廚房的高雄包棟民宿｜中島廚房煮火鍋煮飯｜Hello Stay",
    description: "想找有廚房的高雄包棟？你好哇寓所有豪華中島廚房（IH爐×2、完整鍋碗）可同時4-6人下廚。溝頂民宿有基本廚房。鹽埕區駁二旁。",
    alternates: { canonical: "https://www.hello-stay.com/features/kitchen" },
};
export default function Page() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                { "@type": "Question", name: "高雄有廚房的包棟民宿推薦？", acceptedAnswer: { "@type": "Answer", text: "推薦你好哇寓所，一樓豪華中島廚房配備IH爐×2、微波爐、冰箱、完整鍋碗瓢盆，可同時4-6人下廚。適合煮火鍋、包水餃、做早餐。6-26人包棟，鹽埕區步行10分鐘到駁二。" } },
                { "@type": "Question", name: "高雄包棟可以煮火鍋嗎？", acceptedAnswer: { "@type": "Answer", text: "可以！你好哇寓所的中島廚房配備IH爐、製冰機、完整鍋碗瓢盆，非常適合煮火鍋。附近鹽埕區有大量生鮮超市和市場可採購食材。" } },
            ]}} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 20px 80px" }}>
                <Reveal><div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>Feature: Kitchen</div>
                    <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)", fontWeight: 400, color: "#2a2a2a" }}>有廚房的高雄包棟民宿</h1>
                    <p style={{ fontSize: "0.85rem", color: "#999", marginTop: "12px" }}>想煮火鍋？包水餃？做早餐？</p>
                </div></Reveal>
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", borderLeft: "4px solid var(--pri)" }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "10px" }}>結論</div>
                    <p style={{ fontSize: "0.88rem", color: "#3D3830", lineHeight: 2 }}>
                        想要<strong>豪華廚房（中島、IH爐、完整鍋碗）</strong>→ <Link href="/hellohouse" style={{ color: "var(--pri)" }}>你好哇寓所</Link><br />
                        只需<strong>基本煮食（簡單料理、泡麵）</strong>→ <Link href="/godin" style={{ color: "var(--pri)" }}>溝頂民宿</Link>
                    </p>
                </div></Reveal>
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 12px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", overflowX: "auto" }}>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "12px", paddingLeft: "8px" }}>廚房設備比較</h2>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                        <thead><tr style={{ borderBottom: "2px solid #F5F1ED" }}>
                            <th style={{ textAlign: "left", padding: "10px 8px", color: "#999" }}>設備</th>
                            <th style={{ textAlign: "center", padding: "10px 8px", color: "var(--pri)", fontWeight: 600 }}>你好哇寓所</th>
                            <th style={{ textAlign: "center", padding: "10px 8px", color: "var(--pri)", fontWeight: 600 }}>溝頂民宿</th>
                        </tr></thead>
                        <tbody>
                            {[
                                ["IH爐", "✅ ×2", "✅ ×1"],
                                ["冰箱", "✅ 大型", "✅"],
                                ["微波爐", "✅", "✅"],
                                ["鍋碗瓢盆", "✅ 完整", "✅ 基本"],
                                ["製冰機", "✅", "❌"],
                                ["同時下廚", "4-6人", "1-2人"],
                                ["適合料理", "火鍋·水餃·正餐", "簡單料理·泡麵"],
                            ].map(([l, a, b], i) => (
                                <tr key={l} style={{ borderBottom: "1px solid #F5F1ED", background: i % 2 === 0 ? "#FDFCFB" : "#fff" }}>
                                    <td style={{ padding: "10px 8px", color: "#666" }}>{l}</td>
                                    <td style={{ padding: "10px 8px", textAlign: "center" }}>{a}</td>
                                    <td style={{ padding: "10px 8px", textAlign: "center" }}>{b}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div></Reveal>
                <Reveal><div style={{ textAlign: "center", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/hellohouse" style={{ padding: "14px 28px", borderRadius: "10px", background: "#161618", color: "#fff", fontSize: "0.82rem", textDecoration: "none" }}>看你好哇寓所</Link>
                    <Link href="/compare" style={{ padding: "14px 28px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontSize: "0.82rem", textDecoration: "none" }}>全部比較</Link>
                    <Link href="/kaohsiung-whole-house" style={{ padding: "14px 28px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontSize: "0.82rem", textDecoration: "none" }}>← 高雄包棟總覽</Link>
                </div></Reveal>
            </div>
        </div>
    );
}
