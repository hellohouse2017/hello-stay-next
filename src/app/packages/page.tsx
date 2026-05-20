import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "高雄團體住宿推薦｜家族旅遊・企業團建・朋友包棟方案｜Hello Stay",
    description: "找高雄團體住宿或家族旅遊包棟？依人數、活動型態、廚房與公共空間需求，快速找到適合方案，再直接查空房與報價。",
    alternates: { canonical: "https://www.hello-stay.com/packages" },
    openGraph: {
        title: "高雄團體住宿推薦｜家族旅遊・企業團建・朋友包棟方案",
        description: "從人數、活動型態到廚房與公共空間需求，快速找到適合的高雄包棟方案。",
        url: "https://www.hello-stay.com/packages",
        images: [{ url: "https://www.hello-stay.com/images/cover-bg.webp", width: 1200, height: 630, alt: "Hello Stay 包棟方案" }],
    },
};

const scenarioPackages = [
    {
        emoji: "🏢",
        title: "企業包棟與移地訓練",
        desc: "白天開會、晚上聚餐，是 Hello Stay 最常見的企業使用情境。需要客廳、投影、廚房與晚間續聊空間時，包棟比飯店分房更有效率。",
        features: ["中島廚房團隊聚餐", "獨立客廳會議空間", "16-26 人常見配置", "投影設備可借用"],
        color: "#3B82F6",
        fit: "16-26 人優先看你好哇寓所；若超過 26 人，可改雙棟合訂或詢問大智若愚。",
        primaryHref: "/hellohouse",
        primaryLabel: "看你好哇寓所",
        secondaryHref: "/blog/kaohsiung-offsite-teambuilding",
        secondaryLabel: "看企業團建攻略",
    },
    {
        emoji: "💒",
        title: "婚禮迎娶與前夜準備",
        desc: "迎娶最需要的是大客廳、自然採光與多房型。你好哇寓所的一樓空間與多間套房，適合闖關、婚攝與伴娘團前一晚入住。",
        features: ["寬敞一樓闖關場地", "自然採光婚攝友善", "多房型供伴娘團入住", "廚房可準備茶點"],
        color: "#EC4899",
        fit: "20 人上下迎娶首選你好哇寓所；若雙方親友人數更多，常搭配溝頂民宿一起使用。",
        primaryHref: "/hellohouse",
        primaryLabel: "看迎娶首選館別",
        secondaryHref: "/blog/kaohsiung-wedding-venue",
        secondaryLabel: "看婚禮迎娶攻略",
    },
    {
        emoji: "👨‍👩‍👧‍👦",
        title: "家族旅遊與圍爐聚餐",
        desc: "家族包棟通常同時在乎廚房、麻將、長輩休息與小孩活動空間。Hello Stay 的做法是先看人數，再決定是否需要分層住宿或雙棟合訂。",
        features: ["麻將是長輩常用需求", "可開伙煮火鍋", "分層住宿互不干擾", "適合三代同堂"],
        color: "#F59E0B",
        fit: "6-12 人可看溝頂民宿，6-26 人聚餐型家族多選你好哇寓所，大型家族可再往雙棟合訂。",
        primaryHref: "/kaohsiung-whole-house#need-family-trip",
        primaryLabel: "看家庭旅遊方案",
        secondaryHref: "/blog/kaohsiung-kitchen-bnb#kitchen",
        secondaryLabel: "看廚房設備差異",
    },
    {
        emoji: "⚽",
        title: "球隊比賽與團體移訓",
        desc: "球隊通常重視分房彈性、回房動線和賽後集合。小型隊伍可住溝頂民宿，大型隊伍則建議直接依人數詢問多館搭配。",
        features: ["小隊可住 10-12 人獨棟", "回房與集合動線清楚", "賽後可在交誼空間檢討", "鄰近捷運與市區機能"],
        color: "#10B981",
        fit: "10-12 人先看溝頂民宿；若超過 20 人，建議直接比較各館或詢問客製化搭配。",
        primaryHref: "/godin",
        primaryLabel: "看溝頂民宿",
        secondaryHref: "/compare",
        secondaryLabel: "比較三館差異",
    },
    {
        emoji: "🎉",
        title: "朋友聚會與慶生派對",
        desc: "朋友包棟最常見的是煮火鍋、打麻將、看投影、走路去鹽埕續攤。這類情境多半更吃公共空間與廚房配置，而不是房間數量本身。",
        features: ["桌遊與麻將同樂", "私密不受干擾", "中島廚房適合聚餐", "鹽埕酒吧步行可達"],
        color: "#8B5CF6",
        fit: "14-20 人朋友聚會通常直接選你好哇寓所；若是 6-10 人小聚，可回頭比對溝頂民宿。",
        primaryHref: "/hellohouse",
        primaryLabel: "看聚會熱門館別",
        secondaryHref: "/blog/kaohsiung-mahjong-stay",
        secondaryLabel: "看麻將聚會攻略",
    },
    {
        emoji: "🍜",
        title: "鹽埕漫遊與美食旅行",
        desc: "如果你的行程核心是鹽埕散步、駁二、大港橋和老店美食，住宿重點就會回到地點、交通和回來後能不能繼續聊天聚餐。",
        features: ["步行即達鹽埕老店", "捷運鹽埕埔站 5 分鐘", "駁二與大港橋散步可達", "適合慢節奏城市旅行"],
        color: "#EF4444",
        fit: "這類需求通常不用先想活動型態，先確認人數，再看交通、停車與是否需要廚房即可。",
        primaryHref: "/explore",
        primaryLabel: "看鹽埕探索指南",
        secondaryHref: "/traffic",
        secondaryLabel: "看交通停車",
    },
];

const faqs = [
    {
        q: "高雄包棟一晚大概多少錢？",
        a: "實際價格會依日期、人數與館別不同。小團體常見的溝頂民宿平日約 $8,000 起；20 人上下常見的你好哇寓所方案約落在 $18,000-$22,000；更大團體可再依大智若愚或多館搭配另行報價。",
    },
    {
        q: "高雄包棟民宿適合辦哪些活動？",
        a: "企業團建、婚禮迎娶、家族旅遊、朋友聚會、生日派對、球隊移訓都很常見。重點不是活動名稱，而是回到人數、是否要廚房、是否需要大客廳與分層住宿。",
    },
    {
        q: "如果我還不知道要訂哪一館，應該先看哪裡？",
        a: "先看 /compare 比較三館差異，再看 /book 查日期與人數。若你已經知道自己的重點是廚房、停車或家庭旅遊，也可以直接從對應意圖頁進去。",
    },
    {
        q: "最多可以住幾個人？",
        a: "單館可從 6 人到 48 人不等；你好哇寓所與溝頂民宿兩棟合訂最高 38 人，三館聯訂則可接近 80 人。實際安排仍要依日期與房況確認。",
    },
];

export default function PackagesPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                {
                    "@context": "https://schema.org",
                    "@type": "Service",
                    provider: { "@type": "LodgingBusiness", name: "Hello Stay" },
                    name: "高雄包棟民宿方案推薦",
                    description: "依企業團建、婚禮迎娶、家族旅遊、朋友聚會與團體需求，安排高雄鹽埕區包棟方案。",
                    areaServed: { "@type": "Place", name: "高雄鹽埕區" },
                    serviceType: "包棟住宿",
                    hasOfferCatalog: {
                        "@type": "OfferCatalog",
                        name: "包棟方案列表",
                        itemListElement: scenarioPackages.map((pkg, i) => ({
                            "@type": "Offer",
                            position: i + 1,
                            name: pkg.title,
                            description: pkg.desc,
                        })),
                    },
                },
                {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: faqs.map((faq) => ({
                        "@type": "Question",
                        name: faq.q,
                        acceptedAnswer: { "@type": "Answer", text: faq.a },
                    })),
                },
            ]} />
            <div className="w" style={{ maxWidth: "820px", padding: "0 28px 80px" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "44px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>
                            Occasion Planning
                        </div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>
                            高雄團體住宿方案推薦
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px auto" }} />
                        <p style={{ fontSize: "0.85rem", color: "#999", lineHeight: 1.9, maxWidth: "560px", margin: "0 auto" }}>
                            從企業團建、婚禮迎娶到家族旅遊，先看活動型態，再回到人數、廚房、麻將、交通與停車，會比直接看房型更快找到合適方案。
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <section style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", marginBottom: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                        <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>
                            高雄包棟民宿推薦
                        </div>
                        <p style={{ fontSize: "0.84rem", color: "#666", lineHeight: 1.9, marginBottom: "16px" }}>
                            如果你還在總覽階段，先回{" "}
                            <Link href="/" style={{ color: "var(--pri)", textDecoration: "underline" }}>首頁看三館</Link>
                            {" "}或從{" "}
                            <Link href="/compare" style={{ color: "var(--pri)", textDecoration: "underline" }}>比較頁</Link>
                            {" "}判斷哪一館合適。這一頁的用途是把常見活動情境整理成可直接行動的方案入口。
                        </p>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            <Link href="/" style={{ fontSize: "0.78rem", padding: "8px 14px", borderRadius: "20px", background: "var(--bg)", color: "#3D3830", textDecoration: "none", border: "1px solid #EDE8E3" }}>回首頁看三館</Link>
                            <Link href="/compare" style={{ fontSize: "0.78rem", padding: "8px 14px", borderRadius: "20px", background: "var(--bg)", color: "#3D3830", textDecoration: "none", border: "1px solid #EDE8E3" }}>比較三館差異</Link>
                            <Link href="/book" style={{ fontSize: "0.78rem", padding: "8px 14px", borderRadius: "20px", background: "#161618", color: "#fff", textDecoration: "none" }}>查詢空房</Link>
                        </div>
                    </section>
                </Reveal>

                <Reveal>
                    <section style={{ background: "#fff", borderRadius: "16px", padding: "28px", marginBottom: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#BEB5A8", marginBottom: "14px" }}>
                            How To Choose
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "14px" }}>
                            {[
                                { icon: "👥", text: "先看人數級距" },
                                { icon: "🍳", text: "再看廚房需求" },
                                { icon: "🀄", text: "確認公共空間" },
                                { icon: "🚇", text: "最後看交通停車" },
                            ].map((item) => (
                                <div key={item.text} style={{ textAlign: "center", padding: "16px 12px", background: "var(--bg)", borderRadius: "12px" }}>
                                    <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>{item.icon}</div>
                                    <div style={{ fontSize: "0.8rem", color: "#666" }}>{item.text}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </Reveal>

                <div style={{ display: "grid", gap: "16px", marginBottom: "24px" }}>
                    {scenarioPackages.map((pkg) => (
                        <Reveal key={pkg.title}>
                            <section style={{ background: "#fff", borderRadius: "16px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", borderLeft: `3px solid ${pkg.color}` }}>
                                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                                    <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{pkg.emoji}</span>
                                    <div style={{ flex: 1 }}>
                                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", color: "#3D3830", marginBottom: "8px" }}>{pkg.title}</h2>
                                        <p style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.9, marginBottom: "14px" }}>{pkg.desc}</p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                                            {pkg.features.map((feature) => (
                                                <span key={feature} style={{ padding: "4px 12px", borderRadius: "16px", fontSize: "0.72rem", background: `${pkg.color}0D`, color: pkg.color, fontWeight: 500 }}>
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                        <p style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.8, marginBottom: "16px" }}>
                                            <strong style={{ color: "#3D3830" }}>怎麼配：</strong>{pkg.fit}
                                        </p>
                                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                            <Link href={pkg.primaryHref} style={{ padding: "10px 18px", borderRadius: "10px", background: "#161618", color: "#fff", fontSize: "0.78rem", textDecoration: "none" }}>
                                                {pkg.primaryLabel}
                                            </Link>
                                            <Link href={pkg.secondaryHref} style={{ padding: "10px 18px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontSize: "0.78rem", textDecoration: "none" }}>
                                                {pkg.secondaryLabel}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Reveal>
                    ))}
                </div>

                <Reveal>
                    <section style={{ background: "#161618", borderRadius: "16px", padding: "32px 28px", marginBottom: "24px", textAlign: "center" }}>
                        <div style={{ fontSize: "0.6rem", fontFamily: "var(--en)", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>
                            Secret Venue
                        </div>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", color: "#fff", marginBottom: "12px" }}>
                            想辦一場難忘的派對？
                        </h3>
                        <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: "20px" }}>
                            若需求不只住宿，也可另外洽詢「廢墟 BAR」類型的派對場地搭配，
                            讓聚會動線和住宿動線分開處理。
                        </p>
                        <a href="https://lin.ee/atCiMQw" target="_blank" rel="noreferrer" style={{ display: "inline-block", padding: "12px 28px", borderRadius: "8px", background: "var(--pri)", color: "#161618", fontFamily: "var(--serif)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.06em", textDecoration: "none" }}>
                            LINE 洽詢派對方案
                        </a>
                    </section>
                </Reveal>

                <Reveal>
                    <section style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "28px" }}>
                        <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "18px" }}>
                            FAQ
                        </div>
                        {faqs.map((faq) => (
                            <div key={faq.q} style={{ padding: "16px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                                <div style={{ fontWeight: 500, fontSize: "0.92rem", marginBottom: "6px", color: "#3D3830" }}>{faq.q}</div>
                                <div style={{ fontSize: "0.84rem", color: "#666", lineHeight: 1.9 }}>{faq.a}</div>
                            </div>
                        ))}
                    </section>
                </Reveal>

                <Reveal>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em", textDecoration: "none" }}>
                                查詢空房
                            </Link>
                            <Link href="/kaohsiung-whole-house" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em", textDecoration: "none" }}>
                                看完整包棟方案
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
