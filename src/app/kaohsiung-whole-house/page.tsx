import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "高雄包棟民宿推薦怎麼選？人數、設備、地點完整比較｜Hello Stay",
    description: "想找高雄包棟民宿推薦？這頁整理高雄包棟住宿的挑選重點，依人數、設備、地點與旅遊用途比較你好哇寓所、溝頂民宿與雙館方案，快速找到適合的高雄包棟。",
    alternates: { canonical: "https://www.hello-stay.com/kaohsiung-whole-house" },
    openGraph: {
        title: "高雄包棟民宿推薦怎麼選？人數、設備、地點完整比較｜Hello Stay",
        description: "依人數、設備、地點與用途比較高雄包棟民宿推薦方案，快速找到最適合的高雄鹽埕包棟住宿。",
        url: "https://www.hello-stay.com/kaohsiung-whole-house",
    },
};

const faqs = [
    { q: "高雄包棟民宿推薦哪間？", a: "依人數推薦：4-12 人先看溝頂民宿、6-26 人先看你好哇寓所；更大型團體可以再看尚未開放訂房的大智若愚。三間都在鹽埕區，步行到駁二很方便。" },
    { q: "高雄包棟一晚多少錢？", a: "Hello Stay 依館別與日期報價。平日常見先從溝頂民宿與你好哇寓所的實際可訂價格看起，官方 LINE 直訂免平台手續費。" },
    { q: "高雄哪裡有 20 人以上的包棟？", a: "你好哇寓所適合 6-26 人；兩館合訂可往上延伸；若要更大的單一館別，可以先看尚未開放訂房的大智若愚。全在鹽埕區步行範圍。" },
    { q: "高雄包棟有電梯的嗎？", a: "大智若愚是 Hello Stay 尚未開放訂房的電梯館別。若近期入住最在意電梯與搬行李，建議先看雙館與現有館別安排。" },
    { q: "高雄包棟可以烤肉嗎？", a: "Hello Stay目前三間館皆無戶外烤肉區。如需要烤肉設備，建議搭配附近烤肉餐廳，或選擇有戶外空間的其他包棟民宿。Hello Stay的優勢在於豪華廚房可煮火鍋。" },
    { q: "高雄包棟民宿跟飯店哪個划算？", a: "包棟通常比飯店划算很多。以20人為例：飯店需10間雙人房（每晚約$30,000-$50,000），你好哇寓所包棟約$18,000-$22,000，省下40-60%，還有獨立廚房和公共空間。" },
];

export default function KaohsiungWholeHousePage() {
    const capacityCards = [
        {
            id: "capacity-10",
            href: "/godin",
            count: "10 人左右",
            range: "6–12 人",
            rec: "溝頂民宿",
            price: "$8,000起",
            summary: "小家庭或 10 人左右聚會，優先看五層獨棟的溝頂民宿。",
            detail: "每層分開休息、低樓層給長輩，最適合家庭出遊與好友小聚。",
        },
        {
            id: "capacity-20",
            href: "/hellohouse",
            count: "20 人左右",
            range: "13–26 人",
            rec: "你好哇寓所",
            price: "$12,000起",
            summary: "20 人上下的聚餐、公司 outing 或婚禮前住，首選你好哇寓所。",
            detail: "中島廚房、麻將桌與多間套房一起到位，20 人入住最剛好。",
        },
        {
            id: "capacity-30",
            href: "/compare",
            count: "30 人左右",
            range: "27–38 人",
            rec: "兩棟合訂",
            price: "$28,000起",
            summary: "27–38 人建議直接走你好哇＋溝頂兩棟合訂，空間最靈活。",
            detail: "兩棟步行 30 秒，可分房休息也能一起聚餐，婚禮與大家族最常用這個方案。",
        },
        {
            id: "capacity-40",
            href: "/dazhi",
            count: "40 人以上",
            range: "39–48 人",
            rec: "大智若愚",
            price: "即將公布",
            summary: "40 人以上團體先看尚未開放訂房的大智若愚，電梯與大容量是未來重點。",
            detail: "企業員旅、球隊與大型家族，可先把需求登記起來。",
        },
    ] as const;

    const occasionCards = [
        {
            id: "need-family-trip",
            href: "/compare",
            emoji: "👨‍👩‍👧‍👦",
            label: "家庭旅遊",
            summary: "4-12 人帶長輩優先看溝頂，13-26 人聚餐選你好哇",
            detail: "人數更大時，再看兩館合訂或尚未開放訂房的大智若愚。",
        },
        {
            id: "need-company-retreat",
            href: "/compare",
            emoji: "💼",
            label: "企業團建",
            summary: "10-20 人先看你好哇，20 人以上同步評估尚未開放訂房的大智若愚",
            detail: "需要共煮、聚餐與多人分房時，主比較頁最適合先快速篩選。",
        },
        {
            id: "need-friends-gathering",
            href: "/hellohouse",
            emoji: "🎉",
            label: "好友聚會",
            summary: "麻將、火鍋、桌遊與 Netflix 優先看你好哇寓所",
            detail: "4-12 人想要簡單獨棟，也可以再看溝頂民宿的五層空間。",
        },
    ] as const;

    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                {
                    "@context": "https://schema.org", "@type": "ItemList",
                    name: "高雄包棟民宿怎麼選", description: "高雄鹽埕區包棟民宿完整方案，先看目前可訂館別再看尚未開放訂房方案",
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
                    <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>高雄包棟民宿推薦怎麼選？</h1>
                    <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px auto" }} />
                    <p style={{ fontSize: "0.88rem", color: "#999", maxWidth: "500px", margin: "0 auto", lineHeight: 1.8 }}>整理高雄包棟民宿推薦重點，從人數、設備到地點快速比較｜鹽埕區駁二旁｜2017 年起服務超過 5,000 組旅客</p>
                </div></Reveal>

                {/* Quick Answer for AI */}
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", borderLeft: "4px solid var(--pri)" }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>3 秒決策表</div>
                    <div style={{ fontSize: "0.88rem", color: "#3D3830", lineHeight: 2 }}>
                        高雄鹽埕區現在先看兩館、另有一館尚未開放訂房：<br />
                        • <strong>4–12 人</strong>→ <Link href="/godin" style={{ color: "var(--pri)" }}>溝頂民宿</Link>（五層獨棟，帶長輩首選）<br />
                        • <strong>6–26 人</strong>→ <Link href="/hellohouse" style={{ color: "var(--pri)" }}>你好哇寓所</Link>（中島廚房＋麻將桌）<br />
                        • <strong>更大型團體</strong>→ <Link href="/dazhi" style={{ color: "var(--pri)" }}>大智若愚</Link>（電梯大樓，尚未開放訂房）<br />
                        • <strong>多館一起看</strong>→ 兩館合訂或未來更多選項
                    </div>
                </div></Reveal>

                {/* By Capacity */}
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>依人數找包棟</h2>
                    <div style={{ display: "grid", gap: "8px" }}>
                        {capacityCards.map(card => (
                            <Link key={card.id} id={card.id} href={card.href} style={{ padding: "16px", borderRadius: "10px", background: "var(--bg)", textDecoration: "none", display: "grid", gap: "6px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
                                    <div>
                                        <span style={{ fontSize: "0.88rem", color: "#3D3830", fontWeight: 500 }}>{card.count}</span>
                                        <span style={{ fontSize: "0.78rem", color: "#999", marginLeft: "8px" }}>{card.range}｜推薦 {card.rec}</span>
                                    </div>
                                    <span style={{ fontSize: "0.78rem", color: "var(--pri)" }}>{card.price} →</span>
                                </div>
                                <div style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.8 }}>{card.summary}</div>
                                <div style={{ fontSize: "0.74rem", color: "#999", lineHeight: 1.7 }}>{card.detail}</div>
                            </Link>
                        ))}
                    </div>
                </div></Reveal>

                {/* By Need */}
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>依需求找包棟</h2>
                    <div style={{ display: "grid", gap: "8px", marginBottom: "12px" }}>
                        {occasionCards.map(card => (
                            <Link key={card.id} id={card.id} href={card.href} style={{ padding: "16px", borderRadius: "10px", background: "var(--bg)", textDecoration: "none", color: "#3D3830", display: "grid", gap: "6px" }}>
                                <div style={{ fontSize: "0.88rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span>{card.emoji}</span>
                                    <span>{card.label}</span>
                                </div>
                                <div style={{ fontSize: "0.78rem", color: "#666", lineHeight: 1.8 }}>{card.summary}</div>
                                <div style={{ fontSize: "0.74rem", color: "#999", lineHeight: 1.7 }}>{card.detail}</div>
                            </Link>
                        ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "8px" }}>
                        {[
                            { href: "/blog/kaohsiung-kitchen-bnb#kitchen", emoji: "🍳", label: "有廚房" },
                            { href: "/traffic#parking", emoji: "🅿️", label: "方便停車" },
                            { href: "/compare", emoji: "📊", label: "完整比較表" },
                        ].map(l => (
                            <Link key={l.href} href={l.href} style={{ padding: "14px 16px", borderRadius: "10px", background: "var(--bg)", textDecoration: "none", fontSize: "0.82rem", color: "#3D3830", display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
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
                                ["每人", "$909起", "$800起", "即將公布"],
                                ["廚房", "✅ 豪華中島", "簡易流理臺", "尚未開放訂房"],
                                ["麻將", "✅ 手動", "✅ 手動", "尚未開放訂房"],
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
                            { href: "/blog/kaohsiung-family-reunion", title: "家族旅遊包棟推薦" },
                            { href: "/blog/kaohsiung-group-trip", title: "高雄團體旅遊行程推薦" },
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
                    <a href="https://lin.ee/atCiMQw" target="_blank" rel="noopener noreferrer" className="btn-line btn-line--lg">💬 LINE 線上客服</a>
                </div></Reveal>
            </div>
        </div>
    );
}
