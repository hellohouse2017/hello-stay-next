import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "高雄家庭旅遊包棟推薦｜帶長輩小孩友善｜Hello Stay",
    description: "高雄家庭旅遊包棟首選！6-48人家族出遊方案：帶長輩選溝頂（五層獨棟各層獨立）、大家庭選你好哇（中島廚房煮火鍋）。鹽埕區駁二旁。",
    alternates: { canonical: "https://www.hello-stay.com/occasion/family-trip" },
};
export default function Page() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                { "@type": "Question", name: "高雄家庭旅遊包棟住哪裡？", acceptedAnswer: { "@type": "Answer", text: "6-12人帶長輩小家庭推薦溝頂民宿（五層獨棟，長輩住低樓層）。13-26人大家庭推薦你好哇寓所（中島廚房可煮飯，小孩也安全）。三代同堂超過26人可兩棟合訂。全在鹽埕區，步行駁二10分鐘。" } },
                { "@type": "Question", name: "高雄包棟適合帶長輩嗎？", acceptedAnswer: { "@type": "Answer", text: "適合！溝頂民宿五層獨棟設計，長輩住低樓層無需爬樓。大智若愚（2027年開幕）有電梯，是帶長輩大團體的最佳選擇。" } },
            ]}} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 20px 80px" }}>
                <Reveal><div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>Occasion: Family Trip</div>
                    <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)", fontWeight: 400, color: "#2a2a2a" }}>高雄家庭旅遊包棟推薦</h1>
                    <p style={{ fontSize: "0.85rem", color: "#999", marginTop: "12px" }}>帶長輩·帶小孩·三代同堂都適合</p>
                </div></Reveal>
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", borderLeft: "4px solid var(--pri)" }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "10px" }}>結論</div>
                    <p style={{ fontSize: "0.88rem", color: "#3D3830", lineHeight: 2 }}>
                        <strong>帶長輩小家庭（6-12人）</strong>→ <Link href="/godin" style={{ color: "var(--pri)" }}>溝頂民宿</Link>（五層獨棟，長輩住低樓層最舒適）<br />
                        <strong>大家庭煮飯聚餐（13-26人）</strong>→ <Link href="/hellohouse" style={{ color: "var(--pri)" }}>你好哇寓所</Link>（中島廚房全家一起煮火鍋）<br />
                        <strong>三代同堂超大家族（27-38人）</strong>→ 兩棟合訂，各有獨立空間
                    </p>
                </div></Reveal>
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "12px" }}>家庭旅遊會在意的事</h2>
                    <div style={{ display: "grid", gap: "8px" }}>
                        {[
                            { icon: "👴", title: "長輩友善", desc: "溝頂五層獨棟，長輩住低樓層。大智若愚有電梯（2027年）" },
                            { icon: "🍳", title: "可以煮飯", desc: "你好哇豪華中島廚房，可同時4-6人下廚煮火鍋" },
                            { icon: "🛏️", title: "獨立空間", desc: "每間套房獨立衛浴，大人小孩不用搶廁所" },
                            { icon: "📍", title: "鄰近景點", desc: "步行10分鐘到駁二、大港橋、棧貳庫，小孩放電聖地" },
                            { icon: "🔒", title: "安全性", desc: "合法民宿、電子密碼鎖、消防設備齊全" },
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
