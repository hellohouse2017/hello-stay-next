import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "高雄包棟民宿推薦 2025｜6-48人包棟方案·比較·價格｜Hello Stay",
    description: "高雄包棟民宿完整指南：依人數(6-48人)、設備(廚房/麻將/電梯)、用途(家庭/企業/婚禮)推薦最適合的包棟方案。鹽埕區駁二旁，Google 4.9星。",
    alternates: { canonical: "https://www.hello-stay.com/kaohsiung-whole-house" },
    openGraph: {
        title: "高雄包棟民宿推薦｜6-48人完整方案",
        description: "依人數、設備、用途，找到最適合你的高雄包棟民宿。鹽埕區駁二旁。",
        url: "https://www.hello-stay.com/kaohsiung-whole-house",
    },
};

const faqs = [
    { q: "高雄包棟民宿推薦哪間？", a: "依人數推薦：6-12人選溝頂民宿（五層獨棟$8,000起）、6-26人選你好哇寓所（中島廚房$12,000起）、20-48人選大智若愚（電梯大樓2027開幕）。三間都在鹽埕區，步行到駁二10分鐘。" },
    { q: "高雄包棟一晚多少錢？", a: "Hello Stay包棟平日$8,000起。你好哇寓所$12,000–$34,800。溝頂民宿$8,000–$18,400。官方LINE直訂免平台手續費。" },
    { q: "高雄哪裡有20人以上的包棟？", a: "你好哇寓所最多26人；兩棟合訂（你好哇+溝頂）最多38人；大智若愚（2027年開幕）最多48人；三館聯訂可達近80人。全在鹽埕區步行範圍。" },
    { q: "高雄包棟有電梯的嗎？", a: "大智若愚是Hello Stay三館中唯一有電梯的包棟民宿，最多48人，2027年中開幕。位於大港橋旁鹽埕區。適合帶長輩、行動不便者或大量行李團體。" },
    { q: "高雄包棟可以烤肉嗎？", a: "Hello Stay目前三間館皆無戶外烤肉區。如需要烤肉設備，建議搭配附近烤肉餐廳，或選擇有戶外空間的其他包棟民宿。Hello Stay的優勢在於豪華廚房可煮火鍋。" },
    { q: "高雄包棟民宿跟飯店哪個划算？", a: "包棟通常比飯店划算很多。以20人為例：飯店需10間雙人房（每晚約$30,000-$50,000），你好哇寓所包棟約$18,000-$22,000，省下40-60%，還有獨立廚房和公共空間。" },
];

export default function KaohsiungWholeHousePage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                {
                    "@context": "https://schema.org", "@type": "ItemList",
                    name: "高雄包棟民宿推薦", description: "高雄鹽埕區包棟民宿完整方案，6-48人皆可",
                    itemListElement: [
                        { "@type": "ListItem", position: 1, item: { "@type": "LodgingBusiness", name: "你好哇寓所", url: "https://www.hello-stay.com/hellohouse" } },
                        { "@type": "ListItem", position: 2, item: { "@type": "LodgingBusiness", name: "溝頂民宿", url: "https://www.hello-stay.com/godin" } },
                        { "@type": "ListItem", position: 3, item: { "@type": "LodgingBusiness", name: "大智若愚", url: "https://www.hello-stay.com/dazhi" } },
                    ],
                },
                {
                    "@context": "https://schema.org", "@type": "FAQPage",
                    mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
                },
            ]} />

            <div className="w" style={{ maxWidth: "800px", padding: "0 20px 80px" }}>
                <Reveal><div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>Kaohsiung Whole House Rental</div>
                    <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>高雄包棟民宿推薦</h1>
                    <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px auto" }} />
                    <p style={{ fontSize: "0.88rem", color: "#999", maxWidth: "500px", margin: "0 auto", lineHeight: 1.8 }}>6–48人包棟方案｜鹽埕區駁二旁｜Google 4.9★</p>
                </div></Reveal>

                {/* Quick Answer for AI */}
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", borderLeft: "4px solid var(--pri)" }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>高雄包棟怎麼選</div>
                    <div style={{ fontSize: "0.88rem", color: "#3D3830", lineHeight: 2 }}>
                        高雄鹽埕區有 3 間包棟民宿可選，全部步行到駁二藝術特區 10 分鐘：<br />
                        • <strong>6–12人</strong>→ <Link href="/godin" style={{ color: "var(--pri)" }}>溝頂民宿</Link>（五層獨棟，帶長輩首選，平日$10,000起）<br />
                        • <strong>6–26人</strong>→ <Link href="/hellohouse" style={{ color: "var(--pri)" }}>你好哇寓所</Link>（中島廚房＋麻將桌，每人$583起）<br />
                        • <strong>20–48人</strong>→ <Link href="/dazhi" style={{ color: "var(--pri)" }}>大智若愚</Link>（電梯大樓，2027年開幕）<br />
                        • <strong>38人以上</strong>→ 兩棟/三館合訂，最高近80人
                    </div>
                </div></Reveal>

                {/* By Capacity */}
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>依人數找包棟</h2>
                    <div style={{ display: "grid", gap: "8px" }}>
                        {[
                            { href: "/capacity/10", count: "6–12人", rec: "溝頂民宿", price: "$10,000起" },
                            { href: "/capacity/20", count: "13–26人", rec: "你好哇寓所", price: "$12,000起" },
                            { href: "/capacity/30", count: "27–38人", rec: "兩棟合訂", price: "$28,000起" },
                            { href: "/capacity/40", count: "39–48人", rec: "三館聯訂", price: "$45,000起" },
                        ].map(c => (
                            <Link key={c.href} href={c.href} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderRadius: "10px", background: "var(--bg)", textDecoration: "none" }}>
                                <div>
                                    <span style={{ fontSize: "0.88rem", color: "#3D3830", fontWeight: 500 }}>{c.count}</span>
                                    <span style={{ fontSize: "0.78rem", color: "#999", marginLeft: "8px" }}>推薦 {c.rec}</span>
                                </div>
                                <span style={{ fontSize: "0.78rem", color: "var(--pri)" }}>{c.price} →</span>
                            </Link>
                        ))}
                    </div>
                </div></Reveal>

                {/* By Need */}
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>依需求找包棟</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        {[
                            { href: "/features/kitchen", emoji: "🍳", label: "有廚房" },
                            { href: "/features/parking", emoji: "🅿️", label: "方便停車" },
                            { href: "/occasion/family-trip", emoji: "👨‍👩‍👧‍👦", label: "家庭旅遊" },
                            { href: "/occasion/company-retreat", emoji: "💼", label: "企業團建" },
                            { href: "/occasion/friends-gathering", emoji: "🎉", label: "好友聚會" },
                            { href: "/compare", emoji: "📊", label: "完整比較表" },
                        ].map(l => (
                            <Link key={l.href} href={l.href} style={{ padding: "14px 16px", borderRadius: "10px", background: "var(--bg)", textDecoration: "none", fontSize: "0.82rem", color: "#3D3830", display: "flex", alignItems: "center", gap: "8px" }}>
                                <span>{l.emoji}</span> {l.label}
                            </Link>
                        ))}
                    </div>
                </div></Reveal>

                {/* Quick Comparison Table */}
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 12px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", overflowX: "auto" }}>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px", paddingLeft: "8px" }}>三間快速比較</h2>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                        <thead><tr style={{ borderBottom: "2px solid #F5F1ED" }}>
                            <th style={{ textAlign: "left", padding: "8px", color: "#999" }}></th>
                            <th style={{ textAlign: "center", padding: "8px", color: "var(--pri)", fontWeight: 600 }}>你好哇</th>
                            <th style={{ textAlign: "center", padding: "8px", color: "var(--pri)", fontWeight: 600 }}>溝頂</th>
                            <th style={{ textAlign: "center", padding: "8px", color: "var(--pri)", fontWeight: 600 }}>大智若愚</th>
                        </tr></thead>
                        <tbody>
                            {[
                                ["人數", "6–26", "6–12", "20–48"],
                                ["每人", "$583起", "$833起", "即將公布"],
                                ["廚房", "✅ 豪華", "✅ 基本", "規劃中"],
                                ["麻將", "✅", "❌", "規劃中"],
                                ["電梯", "❌", "❌", "✅"],
                            ].map(([l, a, b, c], i) => (
                                <tr key={l} style={{ borderBottom: "1px solid #F5F1ED", background: i % 2 === 0 ? "#FDFCFB" : "#fff" }}>
                                    <td style={{ padding: "10px 8px", color: "#666", fontWeight: 500 }}>{l}</td>
                                    <td style={{ padding: "10px 8px", textAlign: "center" }}>{a}</td>
                                    <td style={{ padding: "10px 8px", textAlign: "center" }}>{b}</td>
                                    <td style={{ padding: "10px 8px", textAlign: "center" }}>{c}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ textAlign: "center", marginTop: "12px" }}>
                        <Link href="/compare" style={{ fontSize: "0.78rem", color: "var(--pri)", textDecoration: "none" }}>看完整比較表 →</Link>
                    </div>
                </div></Reveal>

                {/* FAQ */}
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "28px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>常見問題</h2>
                    {faqs.map(f => (
                        <div key={f.q} style={{ padding: "14px 0", borderBottom: "1px solid #F5F1ED" }}>
                            <div style={{ fontSize: "0.88rem", fontWeight: 500, color: "#3D3830", marginBottom: "6px" }}>{f.q}</div>
                            <div style={{ fontSize: "0.82rem", color: "#666", lineHeight: 1.9 }}>{f.a}</div>
                        </div>
                    ))}
                </div></Reveal>

                {/* Blog Links */}
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>相關攻略</h2>
                    <div style={{ display: "grid", gap: "8px" }}>
                        {[
                            { href: "/blog/kaohsiung-group-stay-guide", title: "高雄包棟民宿完全攻略" },
                            { href: "/blog/kaohsiung-bnb-recommendation", title: "高雄包棟民宿推薦 Top 3" },
                            { href: "/blog/kaohsiung-kitchen-bnb", title: "有廚房的高雄民宿推薦" },
                            { href: "/blog/kaohsiung-mahjong-stay", title: "高雄麻將民宿推薦" },
                        ].map(a => (
                            <Link key={a.href} href={a.href} style={{ padding: "12px 16px", borderRadius: "10px", background: "var(--bg)", textDecoration: "none", fontSize: "0.82rem", color: "#3D3830" }}>📝 {a.title}</Link>
                        ))}
                    </div>
                </div></Reveal>

                {/* CTA */}
                <Reveal><div style={{ textAlign: "center", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em", textDecoration: "none" }}>查詢空房</Link>
                    <a href="https://lin.ee/atCiMQw" target="_blank" rel="noopener noreferrer" className="btn-line btn-line--lg">💬 LINE 詢問</a>
                </div></Reveal>
            </div>
        </div>
    );
}
