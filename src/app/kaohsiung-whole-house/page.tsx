import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { publicStayFacts } from "@/data/public-stay-facts";
import { DEFAULT_SEO_IMAGE } from "@/lib/seo-metadata";

export const metadata: Metadata = {
    title: "高雄包棟民宿推薦怎麼選？人數、設備、地點完整比較",
    description: "想找高雄包棟民宿推薦？這頁整理高雄包棟住宿的挑選重點，依人數、設備、地點與旅遊用途比較你好哇寓所、溝頂民宿與雙館方案，快速找到適合的高雄包棟。",
    alternates: { canonical: "https://www.hello-stay.com/kaohsiung-whole-house" },
    openGraph: {
        title: "高雄包棟民宿推薦怎麼選？人數、設備、地點完整比較｜Hello Stay",
        description: "依人數、設備、地點與用途比較高雄包棟民宿推薦方案，快速找到最適合的高雄鹽埕包棟住宿。",
        url: "https://www.hello-stay.com/kaohsiung-whole-house",
        images: [DEFAULT_SEO_IMAGE],
    },
};

const faqs = [
    { q: "高雄包棟民宿推薦哪間？", a: "依人數推薦：4-12 人先看溝頂民宿、8-26 人先看你好哇寓所、27-36 人比較雙館方案。大智若愚尚未開放訂房，不列入近期可訂選項。" },
    { q: "高雄包棟一晚多少錢？", a: "Hello Stay 依館別與日期報價。平日常見先從溝頂民宿與你好哇寓所的實際可訂價格看起，官方 LINE 直訂免平台手續費。" },
    { q: "高雄哪裡有 20 人以上的包棟？", a: "你好哇寓所適合 8-26 人；27-36 人可比較你好哇寓所與溝頂民宿雙館方案。超過 36 人須由客服確認其他安排，網站不以未開放館別承接近期訂房。" },
    { q: "高雄包棟有電梯的嗎？", a: "大智若愚是 Hello Stay 尚未開放訂房的電梯館別。若近期入住最在意電梯與搬行李，建議先看雙館與現有館別安排。" },
    { q: "高雄包棟可以烤肉嗎？", a: "Hello Stay目前三間館皆無戶外烤肉區。如需要烤肉設備，建議搭配附近烤肉餐廳，或選擇有戶外空間的其他包棟民宿。Hello Stay的優勢在於豪華廚房可煮火鍋。" },
    { q: "高雄包棟民宿跟飯店哪個更適合？", a: "如果同行人數多、晚上還要聚餐聊天或一起活動，包棟通常比拆成多間飯店房更直覺。真正怎麼選，還是要看日期、人數、是否需要廚房，以及你們會不會用到公共空間。" },
];

export default function KaohsiungWholeHousePage() {
    const capacityCards = [
        {
            id: "capacity-10",
            href: "/godin",
            count: "10 人左右",
            range: `${publicStayFacts.godin.capacity.min}–${publicStayFacts.godin.capacity.max} 人`,
            rec: "溝頂民宿",
            price: "依日期查詢",
            summary: "小家庭或 10 人左右聚會，優先看五層獨棟的溝頂民宿。",
            detail: "每層分開休息、低樓層給長輩，最適合家庭出遊與好友小聚。",
        },
        {
            id: "capacity-20",
            href: "/hellohouse",
            count: "20 人左右",
            range: `13–${publicStayFacts.hellohouse.capacity.max} 人`,
            rec: "你好哇寓所",
            price: "依日期與人數報價",
            summary: "20 人上下的聚餐、公司 outing 或婚禮前住，首選你好哇寓所。",
            detail: "中島廚房、麻將桌與多間套房一起到位，20 人入住最剛好。",
        },
        {
            id: "capacity-30",
            href: "/compare",
            count: "30 人左右",
            range: `${publicStayFacts.dual.capacity.min}–${publicStayFacts.dual.capacity.max} 人`,
            rec: "兩棟合訂",
            price: "兩館合訂報價",
            summary: "27–36 人建議直接走你好哇＋溝頂雙館包棟，空間最靈活。",
            detail: "兩棟步行 30 秒，可分房休息也能一起聚餐，婚禮與大家族最常用這個方案。",
        },
        {
            id: "capacity-40",
            href: "/book",
            count: "37 人以上",
            range: "超過目前線上方案",
            rec: "人工確認",
            price: "不直接線上預訂",
            summary: "目前公開可訂方案上限為 36 人，超過人數請由客服確認可行安排。",
            detail: "大智若愚仍在規劃中，不以未開放館別承諾近期住宿。",
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
        <div className="legacy-editorial-page seo-comparison-page" style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
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
                {
                    "@context": "https://schema.org", "@type": "BreadcrumbList",
                    itemListElement: [
                        { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.hello-stay.com/" },
                        { "@type": "ListItem", position: 2, name: "高雄包棟民宿推薦怎麼選", item: "https://www.hello-stay.com/kaohsiung-whole-house" },
                    ],
                },
            ]} />

            <div className="w" style={{ maxWidth: "800px", padding: "0 20px 80px" }}>
                <Reveal><div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>Kaohsiung Whole House Rental</div>
                    <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>高雄包棟民宿推薦怎麼選？</h1>
                    <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px auto" }} />
                    <p style={{ fontSize: "0.88rem", color: "#999", maxWidth: "500px", margin: "0 auto", lineHeight: 1.8 }}>整理高雄包棟民宿推薦重點，從人數、設備到地點快速比較｜鹽埕區駁二旁｜先判斷館別，再查空房與報價</p>
                </div></Reveal>

                {/* Quick Answer for AI */}
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", borderLeft: "4px solid var(--pri)" }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>3 秒決策表</div>
                    <div style={{ fontSize: "0.88rem", color: "#3D3830", lineHeight: 2 }}>
                        高雄鹽埕區現在先看兩館、另有一館尚未開放訂房：<br />
                        • <strong>4–12 人</strong>→ <Link href="/godin" style={{ color: "var(--pri)" }}>溝頂民宿</Link>（五層獨棟，帶長輩首選）<br />
                        • <strong>6–26 人</strong>→ <Link href="/hellohouse" style={{ color: "var(--pri)" }}>你好哇寓所</Link>（中島廚房＋麻將桌）<br />
                        • <strong>27–36 人</strong>→ <Link href="/compare" style={{ color: "var(--pri)" }}>雙館方案</Link>（你好哇＋溝頂）<br />
                        • <strong>37 人以上</strong>→ 人工確認，不以規劃中館別承諾房況
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
                                ["人數", "6–26", "4–12", "尚未開放"],
                                ["報價方式", "依日期與人數報價", "依日期與人數報價", "不開放訂房"],
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
