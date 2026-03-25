import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

type CapacityConfig = {
    count: number;
    range: string;
    property: string;
    propertyLink: string;
    price: string;
    perPerson: string;
    rooms: string;
    scenarios: string[];
    features: string[];
    faq: { q: string; a: string }[];
};

const configs: Record<string, CapacityConfig> = {
    "10": {
        count: 10, range: "6-12 人", property: "溝頂民宿", propertyLink: "/godin",
        price: "平日 $8,000 起", perPerson: "每人 $800 起", rooms: "五層樓獨棟，各層獨立衛浴",
        scenarios: ["小家庭旅遊", "情侶雙人遊", "好友小聚", "球隊移訓", "攝影外拍"],
        features: ["五層樓獨立使用", "每層獨立衛浴", "4F 交誼廳 + 麻將桌", "步行 10 分鐘到駁二", "附近 6+ 停車場"],
        faq: [
            { q: "高雄10人包棟住哪裡？", a: "推薦溝頂民宿，五層樓獨棟，10人平日$10,000，每人只要$1,000。各層獨立衛浴、4F交誼廳有麻將桌，步行10分鐘到駁二藝術特區。" },
            { q: "高雄10人包棟一晚多少？", a: "溝頂民宿平日$10,000起，假日$12,000起。10人均攤每人$1,000-$1,200，比飯店雙人房便宜，空間卻大很多。" },
        ],
    },
    "20": {
        count: 20, range: "13-26 人", property: "你好哇寓所", propertyLink: "/hellohouse",
        price: "依人數 $12,000-$20,000", perPerson: "每人 $909 起", rooms: "多間房，彈性配置",
        scenarios: ["企業 off-site 團建", "大學畢業旅行", "家族旅遊", "婚禮迎娶", "生日派對"],
        features: ["豪華中島廚房", "麻將桌", "43 吋 Netflix 電視", "製冰機", "洗衣機", "曾上綜藝玩很大"],
        faq: [
            { q: "高雄20人包棟住哪裡？", a: "推薦你好哇寓所，多間房彈性配置，20人每人約$1,000。有豪華中島廚房可煮火鍋、麻將桌、Netflix電視。位於鹽埕區，步行到駁二10分鐘。Google 4.9星。" },
            { q: "高雄20人包棟一晚多少？", a: "你好哇寓所20人約$18,000-$22,000，每人均攤$900-$1,100。含整棟空間和所有設備使用。透過官網或LINE直訂免平台手續費。" },
        ],
    },
    "30": {
        count: 30, range: "27-38 人", property: "兩棟合訂（你好哇 + 溝頂）", propertyLink: "/hellohouse",
        price: "兩棟合計約 $20,000-$30,000", perPerson: "每人 $800 起", rooms: "共 10+ 間房",
        scenarios: ["大家族旅遊", "公司全體旅遊", "球隊 + 教練團", "婚禮包棟", "跨年派對"],
        features: ["兩棟距離僅 30 公尺", "各有獨立空間又能串場", "雙廚房（可分工煮不同料理）", "雙麻將桌", "超大團體的最佳方案"],
        faq: [
            { q: "高雄30人包棟住哪裡？", a: "推薦Hello Stay兩棟合訂（你好哇寓所+溝頂民宿），共10+間房，最多38人。兩棟相距僅30公尺，各有獨立空間。30人每人約$930-$1,330，是高雄大團體包棟的最佳方案。" },
            { q: "高雄30人以上的包棟民宿？", a: "Hello Stay兩棟合訂最多38人。你好哇（多間房/26人）+溝頂（5層樓/12人），距離30公尺。2027年中第三館大智若愚開幕後可達48人。" },
        ],
    },
    "40": {
        count: 40, range: "39-48 人", property: "大智若愚（三館聯訂）", propertyLink: "/dazhi",
        price: "三館聯訂約 $35,000-$55,000", perPerson: "每人 $750 起", rooms: "三棟共 16+ 間房",
        scenarios: ["企業全體旅遊", "大型畢業旅行", "40 人以上家族聚會", "跨年 / 連假大團出遊", "球隊聯賽移訓"],
        features: ["三館聯訂最大 48 人", "電梯直達每層（大智若愚）", "一層三房一廳可包層", "三棟皆位於鹽埕區步行範圍", "大港橋旁・近駁二大義倉庫群"],
        faq: [
            { q: "高雄40人包棟住哪裡？", a: "推薦Hello Stay三館聯訂：你好哇寓所（26人）+ 溝頂民宿（12人）+ 大智若愚（48人），最多可容納近80人。三館皆在鹽埕區步行範圍內，40人均攤每人約$1,000-$1,350。" },
            { q: "高雄40人以上團體住宿推薦？", a: "Hello Stay是高雄最大規模包棟品牌，三館聯訂最高80人。大智若愚為全新電梯民宿，一層三房一廳，可包層可包棟。近大港橋與駁二藝術特區，企業團建、大型畢旅首選。" },
            { q: "高雄有電梯的包棟民宿？", a: "大智若愚（Hello Stay三館）配備電梯，適合攜帶行李、輪椅或長輩同行。最大可容納48人，位於大港橋旁，2027年底開放預訂。" },
        ],
    },
};

function CapacityPage({ config }: { config: CapacityConfig }) {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                {
                    "@context": "https://schema.org", "@type": "LodgingBusiness",
                    name: "Hello Stay", description: `高雄${config.count}人包棟民宿推薦`,
                    address: { "@type": "PostalAddress", addressLocality: "高雄市", addressRegion: "鹽埕區" },
                    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "87" },
                },
                {
                    "@context": "https://schema.org", "@type": "FAQPage",
                    mainEntity: config.faq.map(f => ({
                        "@type": "Question", name: f.q,
                        acceptedAnswer: { "@type": "Answer", text: f.a },
                    })),
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>Capacity Guide</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>高雄 {config.count} 人包棟住宿</h1>
                        <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px auto" }} />
                        <p style={{ fontSize: "0.85rem", color: "#999" }}>{config.range}｜{config.perPerson}</p>
                    </div>
                </Reveal>

                <Reveal>
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>推薦方案</h2>
                        <div style={{ display: "grid", gap: "12px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", background: "var(--bg)", borderRadius: "10px" }}>
                                <span style={{ fontSize: "0.88rem", color: "#3D3830" }}>推薦館別</span>
                                <Link href={config.propertyLink} style={{ fontSize: "0.88rem", color: "var(--pri)", fontWeight: 500 }}>{config.property}</Link>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", background: "var(--bg)", borderRadius: "10px" }}>
                                <span style={{ fontSize: "0.88rem", color: "#3D3830" }}>房間數</span>
                                <span style={{ fontSize: "0.88rem", color: "#666" }}>{config.rooms}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", background: "var(--bg)", borderRadius: "10px" }}>
                                <span style={{ fontSize: "0.88rem", color: "#3D3830" }}>價格</span>
                                <span style={{ fontSize: "0.88rem", color: "#666" }}>{config.price}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", background: "var(--bg)", borderRadius: "10px" }}>
                                <span style={{ fontSize: "0.88rem", color: "#3D3830" }}>每人均攤</span>
                                <span style={{ fontSize: "0.88rem", color: "var(--pri)", fontWeight: 500 }}>{config.perPerson}</span>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>設備亮點</h2>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {config.features.map(f => (
                                <span key={f} style={{ padding: "8px 16px", borderRadius: "20px", fontSize: "0.8rem", background: "var(--bg)", color: "#3D3830" }}>✓ {f}</span>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>適合場景</h2>
                        <div style={{ display: "grid", gap: "8px" }}>
                            {config.scenarios.map(s => (
                                <div key={s} style={{ padding: "12px 16px", background: "var(--bg)", borderRadius: "10px", fontSize: "0.85rem", color: "#666" }}>→ {s}</div>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>常見問題</h2>
                        {config.faq.map(f => (
                            <div key={f.q} style={{ marginBottom: "16px" }}>
                                <div style={{ fontSize: "0.88rem", fontWeight: 500, color: "#3D3830", marginBottom: "6px" }}>Q: {f.q}</div>
                                <div style={{ fontSize: "0.82rem", color: "#666", lineHeight: 1.9 }}>A: {f.a}</div>
                            </div>
                        ))}
                    </div>
                </Reveal>

                <Reveal>
                    <div style={{ textAlign: "center", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link>
                        <Link href="/blog/kaohsiung-group-stay-guide" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>包棟攻略</Link>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}

export default configs;
export { CapacityPage };
