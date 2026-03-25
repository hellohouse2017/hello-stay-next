import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "高雄包棟民宿比較｜你好哇 vs 溝頂 vs 大智若愚｜人數·設備·價格一次看",
    description: "高雄3間包棟民宿完整比較：你好哇寓所(6-26人)、溝頂民宿(6-12人)、大智若愚(20-48人)。依人數、設備、價格選出最適合你的包棟方案。",
    alternates: { canonical: "https://www.hello-stay.com/compare" },
    openGraph: {
        title: "高雄包棟民宿比較｜3間館完整比較表",
        description: "依人數、設備、預算，幫你快速選出最適合的高雄包棟民宿。",
        url: "https://www.hello-stay.com/compare",
    },
};

const properties = [
    { name: "你好哇寓所", link: "/hellohouse", capacity: "6–26 人", price: "$12,000–$34,800", perPerson: "$462–$2,000", rooms: "6 間套房", floors: "3 層樓", kitchen: "✅ 豪華中島廚房", mahjong: "✅ 全自動", elevator: "❌", parking: "附近停車場", bbq: "❌", best: "家庭聚會·婚禮·企業團建", lineUrl: "https://lin.ee/atCiMQw" },
    { name: "溝頂民宿", link: "/godin", capacity: "6–12 人", price: "$8,000–$18,400", perPerson: "$667–$1,533", rooms: "4 間套房", floors: "5 層獨棟", kitchen: "❌ 簡易流理臺（微波爐）", mahjong: "❌", elevator: "❌", parking: "附近停車場", bbq: "❌", best: "小家庭·帶長輩·好友小聚", lineUrl: "https://lin.ee/atCiMQw" },
    { name: "大智若愚", link: "/dazhi", capacity: "20–48 人", price: "即將公布", perPerson: "預估 $800–$1,200", rooms: "16+ 間套房", floors: "多層樓", kitchen: "規劃中", mahjong: "規劃中", elevator: "✅ 電梯", parking: "附近停車場", bbq: "規劃中", best: "企業員旅·球隊·大家族", lineUrl: "https://lin.ee/atCiMQw" },
];

const faqs = [
    { q: "高雄包棟民宿怎麼選？", a: "先確認人數：6-12人選溝頂（五層獨棟，適合帶長輩）；6-26人選你好哇寓所（中島廚房+麻將桌，適合聚會）；20-48人選大智若愚（電梯大樓，適合企業團體）。再依設備需求（廚房/麻將/停車）做最終決定。" },
    { q: "三間民宿都在哪裡？", a: "三間都在高雄鹽埕區，你好哇與溝頂步行僅30秒，大智若愚在大港橋旁。距駁二藝術特區步行10–12分鐘、捷運鹽埕埔站步行5–8分鐘。" },
    { q: "可以同時預訂多間嗎？", a: "可以！兩棟合訂（你好哇+溝頂）最多38人，三館聯訂最多可容納近80人。適合大型家族旅遊、企業全體旅遊、跨年派對。" },
    { q: "哪間最便宜？", a: "以每人均攤計算，你好哇寓所26人包棟每人約$583最划算。溝頂民宿12人包棟每人約$833。官方LINE直訂免平台手續費，比AsiaYo/Booking便宜15-20%。" },
    { q: "有廚房可以煮火鍋嗎？", a: "你好哇寓所有豪華中島廚房（IH爐×2、冰箱、完整鍋碗）可同時4-6人下廚。溝頂民宿僅有簡易流理臺與微波爐，可加熱但不可明火或使用電磁爐。大智若愚的廚房規劃中。" },
];

export default function ComparePage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                {
                    "@context": "https://schema.org", "@type": "ItemList",
                    name: "高雄包棟民宿比較", description: "Hello Stay 三間高雄包棟民宿完整比較",
                    itemListElement: properties.map((p, i) => ({
                        "@type": "ListItem", position: i + 1,
                        item: { "@type": "LodgingBusiness", name: p.name, url: `https://www.hello-stay.com${p.link}` },
                    })),
                },
                {
                    "@context": "https://schema.org", "@type": "FAQPage",
                    mainEntity: faqs.map(f => ({
                        "@type": "Question", name: f.q,
                        acceptedAnswer: { "@type": "Answer", text: f.a },
                    })),
                },
            ]} />

            <div className="w" style={{ maxWidth: "900px", padding: "0 20px 80px" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>Compare Properties</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>高雄包棟民宿比較</h1>
                        <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px auto" }} />
                        <p style={{ fontSize: "0.88rem", color: "#999", maxWidth: "500px", margin: "0 auto", lineHeight: 1.8 }}>
                            依人數、設備、預算，幫你快速選出最適合的包棟方案。<br />三間都在高雄鹽埕區，步行可達駁二藝術特區。
                        </p>
                    </div>
                </Reveal>

                {/* Quick Answer */}
                <Reveal>
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", borderLeft: "4px solid var(--pri)" }}>
                        <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>快速結論</div>
                        <div style={{ fontSize: "0.88rem", color: "#3D3830", lineHeight: 2 }}>
                            <strong>6–12人小團體</strong>→ 溝頂民宿（五層獨棟，帶長輩首選）<br />
                            <strong>6–26人聚會</strong>→ 你好哇寓所（中島廚房＋麻將，性價比最高）<br />
                            <strong>20–48人大團體</strong>→ 大智若愚（電梯民宿，企業員旅首選）
                        </div>
                    </div>
                </Reveal>

                {/* HTML Comparison Table */}
                <Reveal>
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "24px 12px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px", overflowX: "auto" }}>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px", paddingLeft: "8px" }}>完整比較表</h2>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                            <thead>
                                <tr style={{ borderBottom: "2px solid #F5F1ED" }}>
                                    <th style={{ textAlign: "left", padding: "10px 8px", color: "#999", fontWeight: 500 }}>項目</th>
                                    {properties.map(p => (
                                        <th key={p.name} style={{ textAlign: "center", padding: "10px 8px", color: "#3D3830", fontWeight: 600 }}>
                                            <Link href={p.link} style={{ color: "var(--pri)", textDecoration: "none" }}>{p.name}</Link>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { label: "人數", key: "capacity" },
                                    { label: "價格", key: "price" },
                                    { label: "每人均攤", key: "perPerson" },
                                    { label: "房間數", key: "rooms" },
                                    { label: "樓層", key: "floors" },
                                    { label: "廚房", key: "kitchen" },
                                    { label: "麻將桌", key: "mahjong" },
                                    { label: "電梯", key: "elevator" },
                                    { label: "停車", key: "parking" },
                                    { label: "最適合", key: "best" },
                                ].map((row, i) => (
                                    <tr key={row.label} style={{ borderBottom: "1px solid #F5F1ED", background: i % 2 === 0 ? "#FDFCFB" : "#fff" }}>
                                        <td style={{ padding: "12px 8px", color: "#666", fontWeight: 500 }}>{row.label}</td>
                                        {properties.map(p => (
                                            <td key={p.name} style={{ padding: "12px 8px", textAlign: "center", color: "#3D3830" }}>
                                                {(p as Record<string, string>)[row.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Reveal>

                {/* Individual Compare Links */}
                <Reveal>
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>詳細比較</h2>
                        <div style={{ display: "grid", gap: "8px" }}>
                            {[
                                { href: "/compare/hellohouse-vs-godin", title: "你好哇寓所 vs 溝頂民宿", desc: "6–26人 vs 6–12人，中島廚房 vs 五層獨棟" },
                                { href: "/compare/hellohouse-vs-dazhi", title: "你好哇寓所 vs 大智若愚", desc: "6–26人 vs 20–48人，現在預訂 vs 2027開幕" },
                                { href: "/compare/godin-vs-dazhi", title: "溝頂民宿 vs 大智若愚", desc: "6–12人 vs 20–48人，小家庭 vs 大企業團" },
                            ].map(a => (
                                <Link key={a.href} href={a.href} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderRadius: "10px", background: "var(--bg)", textDecoration: "none" }}>
                                    <div>
                                        <div style={{ fontSize: "0.88rem", color: "#3D3830", fontWeight: 500 }}>{a.title}</div>
                                        <div style={{ fontSize: "0.75rem", color: "#999", marginTop: "4px" }}>{a.desc}</div>
                                    </div>
                                    <span style={{ color: "var(--pri)", fontSize: "0.8rem" }}>→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* FAQ */}
                <Reveal>
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "28px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>常見問題</h2>
                        {faqs.map(f => (
                            <div key={f.q} style={{ padding: "14px 0", borderBottom: "1px solid #F5F1ED" }}>
                                <div style={{ fontSize: "0.88rem", fontWeight: 500, color: "#3D3830", marginBottom: "6px" }}>{f.q}</div>
                                <div style={{ fontSize: "0.82rem", color: "#666", lineHeight: 1.9 }}>{f.a}</div>
                            </div>
                        ))}
                    </div>
                </Reveal>

                {/* Related Pages */}
                <Reveal>
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>依需求找包棟</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}>
                            {[
                                { href: "/capacity/10", label: "🏠 10人包棟" },
                                { href: "/capacity/20", label: "🏡 20人包棟" },
                                { href: "/capacity/30", label: "🏘️ 30人包棟" },
                                { href: "/capacity/40", label: "🏢 40人包棟" },
                                { href: "/features/kitchen", label: "🍳 有廚房" },
                                { href: "/features/parking", label: "🅿️ 方便停車" },
                                { href: "/occasion/family-trip", label: "👨‍👩‍👧‍👦 家庭旅遊" },
                                { href: "/occasion/company-retreat", label: "💼 企業團建" },
                            ].map(l => (
                                <Link key={l.href} href={l.href} style={{ padding: "12px 16px", borderRadius: "10px", background: "var(--bg)", textDecoration: "none", fontSize: "0.82rem", color: "#3D3830" }}>{l.label}</Link>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* CTA */}
                <Reveal>
                    <div style={{ textAlign: "center", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em", textDecoration: "none" }}>查詢空房</Link>
                        <a href="https://lin.ee/atCiMQw" target="_blank" rel="noopener noreferrer" className="btn-line btn-line--lg">💬 LINE 詢問</a>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
