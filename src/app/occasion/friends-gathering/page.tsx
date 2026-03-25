import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "高雄好友聚會包棟｜打麻將·煮火鍋·生日派對｜Hello Stay",
    description: "高雄好友聚會包棟推薦！你好哇寓所有手動麻將桌、中島廚房煮火鍋、Netflix電視。6-26人包棟每人$909起，鹽埕區駁二旁。",
    alternates: { canonical: "https://www.hello-stay.com/occasion/friends-gathering" },
};
export default function Page() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                { "@type": "Question", name: "高雄有可以打麻將的包棟嗎？", acceptedAnswer: { "@type": "Answer", text: "有！你好哇寓所與溝頂民宿皆配備手動麻將桌，6-26人包棟。還有中島廚房（可煮火鍋）、桌遊、Netflix電視。鹽埕區步行10分鐘到駁二，Google 4.9星。" } },
            ]}} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 20px 80px" }}>
                <Reveal><div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>Occasion: Friends Gathering</div>
                    <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)", fontWeight: 400, color: "#2a2a2a" }}>高雄好友聚會包棟推薦</h1>
                    <p style={{ fontSize: "0.85rem", color: "#999", marginTop: "12px" }}>打麻將·煮火鍋·生日派對·畢業旅行</p>
                </div></Reveal>
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", borderLeft: "4px solid var(--pri)" }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "10px" }}>結論</div>
                    <p style={{ fontSize: "0.88rem", color: "#3D3830", lineHeight: 2 }}>
                        好友聚會首選 → <Link href="/hellohouse" style={{ color: "var(--pri)" }}>你好哇寓所</Link>（麻將桌＋中島廚房＋桌遊＋Netflix）<br />
                        6–12人簡單住 → <Link href="/godin" style={{ color: "var(--pri)" }}>溝頂民宿</Link>（五層獨棟，獨立空間感）<br />
                        12人以上派對 → 兩棟合訂，各有空間又能串場
                    </p>
                </div></Reveal>
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "12px" }}>聚會設備</h2>
                    <div style={{ display: "grid", gap: "8px" }}>
                        {[
                            { icon: "🀄", title: "手動麻將桌", desc: "你好哇＆溝頂兩館均有，打到天亮也可以" },
                            { icon: "🍲", title: "中島廚房煮火鍋", desc: "IH爐×2、製冰機、完整鍋碗，自備食材就能煮" },
                            { icon: "🎮", title: "桌遊之夜", desc: "多款桌遊，適合破冰和暖場" },
                            { icon: "📺", title: "Netflix 電視", desc: "43吋聯網電視，看電影追劇" },
                            { icon: "🍺", title: "製冰機", desc: "不用出門買冰，喝酒聊天隨時有冰" },
                        ].map(f => (
                            <div key={f.title} style={{ padding: "14px 16px", borderRadius: "10px", background: "var(--bg)" }}>
                                <div style={{ fontSize: "0.88rem", color: "#3D3830", fontWeight: 500 }}>{f.icon} {f.title}</div>
                                <div style={{ fontSize: "0.78rem", color: "#999", marginTop: "4px" }}>{f.desc}</div>
                            </div>
                        ))}
                    </div>
                </div></Reveal>
                <Reveal><div style={{ textAlign: "center", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/hellohouse" style={{ padding: "14px 28px", borderRadius: "10px", background: "#161618", color: "#fff", fontSize: "0.82rem", textDecoration: "none" }}>看你好哇寓所</Link>
                    <a href="https://lin.ee/atCiMQw" target="_blank" rel="noopener noreferrer" className="btn-line btn-line--lg">💬 LINE 詢問</a>
                    <Link href="/kaohsiung-whole-house" style={{ padding: "14px 28px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontSize: "0.82rem", textDecoration: "none" }}>← 高雄包棟總覽</Link>
                </div></Reveal>
            </div>
        </div>
    );
}
