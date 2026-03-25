import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "高雄企業團建包棟｜員工旅遊·公司聚會場地｜Hello Stay",
    description: "高雄企業團建包棟首選！20-48人公司旅遊方案：中島廚房Team Cooking、麻將桌Team Building、多間套房。鹽埕區駁二旁，GBP4.9星。",
    alternates: { canonical: "https://www.hello-stay.com/occasion/company-retreat" },
};
export default function Page() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                { "@type": "Question", name: "高雄企業團建包棟住哪裡？", acceptedAnswer: { "@type": "Answer", text: "20人以內選你好哇寓所（中島廚房可Team Cooking、麻將桌Team Building）。20-48人選大智若愚（電梯大樓，2027年開幕）。兩棟合訂最高38人。" } },
                { "@type": "Question", name: "高雄有適合公司旅遊的包棟嗎？", acceptedAnswer: { "@type": "Answer", text: "有！Hello Stay是高雄最大包棟品牌，三館最高可容納近80人。曾接待過多家企業團建，提供廚房共煮、桌遊、麻將等團體活動設備。鹽埕區步行到駁二，可安排一日遊行程。" } },
            ]}} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 20px 80px" }}>
                <Reveal><div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>Occasion: Company Retreat</div>
                    <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)", fontWeight: 400, color: "#2a2a2a" }}>高雄企業團建包棟推薦</h1>
                    <p style={{ fontSize: "0.85rem", color: "#999", marginTop: "12px" }}>員工旅遊·公司聚會·Team Building</p>
                </div></Reveal>
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", borderLeft: "4px solid var(--pri)" }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "10px" }}>結論</div>
                    <p style={{ fontSize: "0.88rem", color: "#3D3830", lineHeight: 2 }}>
                        <strong>10–20人小公司</strong>→ <Link href="/hellohouse" style={{ color: "var(--pri)" }}>你好哇寓所</Link>（廚房Team Cooking + 麻將桌，每人$700起）<br />
                        <strong>20–48人中型企業</strong>→ <Link href="/dazhi" style={{ color: "var(--pri)" }}>大智若愚</Link>（電梯大樓，2027年開幕）<br />
                        <strong>30–38人</strong>→ 兩棟合訂，白天各自Team Building晚上串場聚餐
                    </p>
                </div></Reveal>
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "12px" }}>企業團建設施</h2>
                    <div style={{ display: "grid", gap: "8px" }}>
                        {[
                            { icon: "🍳", title: "Team Cooking", desc: "中島廚房分組料理比賽，IH爐×2、完整鍋碗瓢盆" },
                            { icon: "🀄", title: "麻將 Team Building", desc: "手動麻將桌，部門對抗賽" },
                            { icon: "🎮", title: "桌遊之夜", desc: "多款桌遊，配合Netflix電視觀影" },
                            { icon: "📍", title: "駁二一日遊", desc: "步行10分鐘到駁二藝術特區，可安排團隊行程" },
                            { icon: "💰", title: "性價比極高", desc: "20人均攤每人$900-$1,100，含整棟空間和所有設備" },
                        ].map(f => (
                            <div key={f.title} style={{ padding: "14px 16px", borderRadius: "10px", background: "var(--bg)" }}>
                                <div style={{ fontSize: "0.88rem", color: "#3D3830", fontWeight: 500 }}>{f.icon} {f.title}</div>
                                <div style={{ fontSize: "0.78rem", color: "#999", marginTop: "4px" }}>{f.desc}</div>
                            </div>
                        ))}
                    </div>
                </div></Reveal>
                <Reveal><div style={{ textAlign: "center", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/compare" style={{ padding: "14px 28px", borderRadius: "10px", background: "#161618", color: "#fff", fontSize: "0.82rem", textDecoration: "none" }}>看比較表</Link>
                    <a href="https://lin.ee/atCiMQw" target="_blank" rel="noopener noreferrer" className="btn-line btn-line--lg">💬 LINE 詢問</a>
                    <Link href="/kaohsiung-whole-house" style={{ padding: "14px 28px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontSize: "0.82rem", textDecoration: "none" }}>← 高雄包棟總覽</Link>
                </div></Reveal>
            </div>
        </div>
    );
}
