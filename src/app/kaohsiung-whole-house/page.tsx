import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { publicStayFacts } from "@/data/public-stay-facts";
import { DEFAULT_SEO_IMAGE } from "@/lib/seo-metadata";

export const metadata: Metadata = {
    title: "【高雄包棟民宿總整理】4房/6房/10房怎麼選？4-36人房型・衛浴與分房指南｜Hello Stay",
    description: "高雄 4 房、6 房與 10 房包棟住宿怎麼選？依人數與房間數前往對應攻略，完整比較溝頂民宿（4房/4衛）、你好哇寓所（6房/6衛）與雙館方案的房型配置、設備與分房動線。",
    alternates: { canonical: "https://www.hello-stay.com/kaohsiung-whole-house" },
    openGraph: {
        title: "【高雄包棟民宿總整理】4房/6房/10房怎麼選？4-36人房型・衛浴與分房指南｜Hello Stay",
        description: "依 4 房、6 房、10 房與 6、10、20、30 人快速比較溝頂、你好哇與雙館方案，全套房獨立衛浴・包棟絕不鎖房。",
        url: "https://www.hello-stay.com/kaohsiung-whole-house",
        images: [DEFAULT_SEO_IMAGE],
    },
};

const faqs = [
    { q: "高雄包棟民宿推薦哪間？有幾間房間？", a: "依房數與人數推薦：4 房選溝頂民宿（4-12 人、4 間客房含 2 間雙人房與 2 間四人房，全獨立衛浴）；6 房選你好哇寓所（8-26 人、6 間客房含中島廚房）；27-34 人推薦 10 房雙館方案，35-36 人使用雙館時須加床。包棟整棟獨享不鎖房。大智若愚尚未開放訂房，不列入近期可訂選項。" },
    { q: "高雄包棟一晚多少錢？", a: "Hello Stay 依館別與日期報價。平日常見先從溝頂民宿與你好哇寓所的實際可訂價格看起，官方 LINE 直訂免平台手續費。" },
    { q: "高雄哪裡有 20 人以上的包棟？", a: "你好哇寓所適合 8-26 人；雙館通常適合 27-34 人，35-36 人須加床。超過 36 人須由客服確認其他安排，網站不以未開放館別承接近期訂房。" },
    { q: "高雄包棟有電梯的嗎？", a: "Hello Stay 目前可訂的你好哇寓所、溝頂民宿與雙館方案都沒有電梯，館內需要走樓梯。若近期入住一定需要電梯，請另找符合需求的住宿；規劃中的大智若愚尚未開放訂房。" },
    { q: "高雄包棟可以烤肉嗎？", a: "Hello Stay 目前可訂館別都沒有戶外烤肉區。若需要烤肉設備，建議選擇有合法戶外空間的其他住宿；你好哇寓所可使用中島廚房準備餐點，但仍須遵守館內規範與安寧時段。" },
    { q: "高雄包棟民宿跟飯店哪個更適合？", a: "如果同行人數多、晚上還要聚餐聊天或一起活動，包棟通常比拆成多間飯店房更直覺。真正怎麼選，還是要看日期、人數、是否需要廚房，以及你們會不會用到公共空間。" },
];

export default function KaohsiungWholeHousePage() {
    const capacityCards = [
        {
            id: "capacity-6",
            href: "/blog/kaohsiung-6-person-stay",
            count: "6 人住宿",
            range: `${publicStayFacts.godin.capacity.min}–${publicStayFacts.godin.capacity.max} 人`,
            rec: "溝頂民宿",
            price: "看 6 人攻略",
            summary: "6 人先比較四房獨棟與飯店分房，再確認是否需要公共交誼空間。",
            detail: "溝頂開放 4-12 人，房型為 2 間雙人房與 2 間四人房。",
        },
        {
            id: "capacity-10",
            href: "/blog/kaohsiung-10-person-stay",
            count: "10 人住宿",
            range: `${publicStayFacts.godin.capacity.min}–${publicStayFacts.godin.capacity.max} 人`,
            rec: "溝頂民宿",
            price: "看 10 人攻略",
            summary: "10 人重點是四間房如何分配、每房衛浴與晚上是否需要一起活動。",
            detail: "溝頂的實際房型是 2 間雙人房與 2 間四人房，不是四間雙人房。",
        },
        {
            id: "capacity-20",
            href: "/blog/kaohsiung-20-person-stay",
            count: "20 人住宿",
            range: `${publicStayFacts.hellohouse.capacity.min}–${publicStayFacts.hellohouse.capacity.max} 人`,
            rec: "你好哇寓所",
            price: "看 20 人攻略",
            summary: "20 人通常先看你好哇寓所的 6 間客房與 1F 中島廚房。",
            detail: "若需要更多分房空間，再比較兩館合訂，不用先看未開放館別。",
        },
        {
            id: "capacity-30",
            href: "/blog/kaohsiung-30-person-stay",
            count: "30 人住宿",
            range: `${publicStayFacts.dual.capacity.min}–${publicStayFacts.dual.capacity.max} 人`,
            rec: "兩館合訂",
            price: "看 30 人攻略",
            summary: "30 人使用你好哇＋溝頂雙館；27-34 人是標準安排，35-36 人須加床。",
            detail: "兩館步行約 5 秒，可把聚會集中在你好哇、休息分散到兩館。",
        },
    ] as const;

    const occasionCards = [
        {
            id: "need-family-trip",
            href: "/blog/kaohsiung-family-reunion",
            emoji: "👨‍👩‍👧‍👦",
            label: "家庭旅遊",
            summary: "4-12 人帶長輩優先看溝頂，13-26 人聚餐選你好哇",
            detail: "人數更大時，再比較兩館合訂；長輩同行須先確認樓層與樓梯動線。",
        },
        {
            id: "need-company-retreat",
            href: "/blog/kaohsiung-offsite-teambuilding",
            emoji: "💼",
            label: "企業團建",
            summary: "10-26 人先看你好哇，27-36 人再比較雙館方案",
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
                    name: "高雄 4-36 人包棟方案", description: "依人數比較高雄鹽埕區目前可訂的兩館與雙館方案",
                    itemListElement: [
                        { "@type": "ListItem", position: 1, item: { "@type": "LodgingBusiness", name: "你好哇寓所", url: "https://www.hello-stay.com/hellohouse" } },
                        { "@type": "ListItem", position: 2, item: { "@type": "LodgingBusiness", name: "溝頂民宿", url: "https://www.hello-stay.com/godin" } },
                        { "@type": "ListItem", position: 3, item: { "@type": "Service", name: "你好哇＋溝頂雙館方案", url: "https://www.hello-stay.com/compare#compare-dual" } },
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
                        { "@type": "ListItem", position: 2, name: "高雄包棟民宿", item: "https://www.hello-stay.com/kaohsiung-whole-house" },
                    ],
                },
            ]} />

            <div className="w" style={{ maxWidth: "800px", padding: "0 20px 80px" }}>
                <Reveal><div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>Kaohsiung Whole House Rental</div>
                    <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>高雄 4-36 人包棟方案怎麼選？</h1>
                    <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px auto" }} />
                    <p style={{ fontSize: "0.88rem", color: "#999", maxWidth: "500px", margin: "0 auto", lineHeight: 1.8 }}>溝頂民宿 4-12 人、你好哇寓所 8-26 人、雙館包棟 27-36 人｜鹽埕區駁二步行圈｜先判斷館別，再查空房與報價</p>
                </div></Reveal>

                {/* Quick Answer for AI */}
                <Reveal><div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", borderLeft: "4px solid var(--pri)" }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>3 秒決策表</div>
                    <div style={{ fontSize: "0.88rem", color: "#3D3830", lineHeight: 2 }}>
                        高雄鹽埕區目前有兩間可訂民宿與一個雙館方案：<br />
                        • <strong>4–12 人</strong>→ <Link href="/godin" style={{ color: "var(--pri)" }}>溝頂民宿</Link>（五層獨棟，帶長輩首選）<br />
                        • <strong>8–26 人</strong>→ <Link href="/hellohouse" style={{ color: "var(--pri)" }}>你好哇寓所</Link>（中島廚房＋麻將桌）<br />
                        • <strong>27–34 人</strong>→ <Link href="/compare" style={{ color: "var(--pri)" }}>雙館方案</Link>（你好哇＋溝頂）；35–36 人須加床<br />
                        • <strong>37 人以上</strong>→ 超過目前公開方案，請由客服人工確認
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
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px", paddingLeft: "8px" }}>目前可訂方案快速比較</h2>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                        <thead><tr style={{ borderBottom: "2px solid #F5F1ED" }}>
                            <th style={{ textAlign: "left", padding: "8px", color: "#999" }}></th>
                            <th style={{ textAlign: "center", padding: "8px", color: "var(--pri)", fontWeight: 600 }}>你好哇</th>
                            <th style={{ textAlign: "center", padding: "8px", color: "var(--pri)", fontWeight: 600 }}>溝頂</th>
                            <th style={{ textAlign: "center", padding: "8px", color: "var(--pri)", fontWeight: 600 }}>雙館</th>
                        </tr></thead>
                        <tbody>
                            {[
                                ["人數", "8–26", "4–12", "27–36"],
                                ["客房", "6 間", "4 間", "合計 10 間"],
                                ["廚房", "完整中島廚房", "簡易備餐空間", "以你好哇為主"],
                                ["麻將", "手動", "手動", "兩館皆有"],
                                ["電梯", publicStayFacts.hellohouse.elevator ? "有" : "無", publicStayFacts.godin.elevator ? "有" : "無", "無"],
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

                <Reveal><aside style={{ background: "#F5F1ED", padding: "20px", borderLeft: "4px solid #8A8279", marginBottom: "20px" }}>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "1rem", color: "#3D3830", marginBottom: "8px" }}>大智若愚為規劃中館別</h2>
                    <p style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.8, margin: 0 }}>
                        大智若愚尚未開放訂房，不列入目前可訂方案，也不能承接近期電梯需求。規劃內容請看
                        {" "}<Link href="/dazhi" style={{ color: "var(--pri)" }}>獨立說明頁</Link>。
                    </p>
                </aside></Reveal>

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
                            { href: "/blog/taiwan-travel-subsidy-guide", title: "2026 國旅補助平日包棟住宿攻略" },
                            { href: "/blog/taiwan-travel-subsidy-pricing-guide", title: "國旅補助防坑與透明定價指南" },
                            { href: "/blog/pier2-accommodation", title: "駁二藝術特區周邊包棟住宿推薦" },
                            { href: "/blog/kaohsiung-concert-stay-group", title: "高雄流行音樂中心與演唱會包棟推薦" },
                            { href: "/blog/kaohsiung-family-reunion", title: "家族旅遊長輩友善包棟推薦" },
                            { href: "/blog/kaohsiung-group-trip", title: "高雄團體旅遊行程 2-4 天推薦" },
                            { href: "/blog/kaohsiung-kitchen-bnb", title: "有廚房的高雄包棟民宿自煮指南" },
                            { href: "/blog/kaohsiung-mahjong-stay", title: "高雄手動麻將包棟民宿指南" },
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
