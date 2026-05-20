import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "關於 Hello Stay｜深耕高雄鹽埕的質感包棟民宿品牌",
    description: "了解高雄包棟民宿品牌 Hello Stay 的創立故事與服務理念。我們自 2017 年起深耕鹽埕，旗下包含合法館別「你好哇寓所」與「溝頂民宿」，提供 6-48 人家庭出遊、企業包棟的高質感空間，以「家」的溫度承接您的珍貴時光。",
    openGraph: {
        title: "關於 Hello Stay｜深耕高雄鹽埕的質感包棟民宿品牌",
        description: "Hello Stay 創立故事、服務理念與合法民宿認證。",
        url: "https://www.hello-stay.com/about",
        images: [{ url: "/images/cover-bg.webp", width: 1200, height: 630, alt: "About Hello Stay" }],
    },
};

export default function AboutPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "AboutPage",
                        "@id": "https://www.hello-stay.com/about/#webpage",
                        "url": "https://www.hello-stay.com/about",
                        "name": "關於 Hello Stay - 品牌故事與理念",
                        "description": "了解 Hello Stay 高雄包棟民宿的創立背景、旗下合法民宿登記證及營運理念。",
                        "mainEntity": {
                            "@type": "Organization",
                            "@id": "https://www.hello-stay.com/#organization",
                            "name": "Hello Stay",
                            "url": "https://www.hello-stay.com",
                            "logo": "https://www.hello-stay.com/images/cover-bg.webp",
                            "foundingDate": "2017",
                            "subOrganization": [
                                {
                                    "@type": "LodgingBusiness",
                                    "@id": "https://www.hello-stay.com/#lodging",
                                    "name": "你好哇寓所",
                                    "alternateName": ["Hello House", "Hello Stay 主館"],
                                    "address": {
                                        "@type": "PostalAddress",
                                        "streetAddress": "大公路70巷8號",
                                        "addressLocality: ": "鹽埕區",
                                        "addressRegion": "高雄市",
                                        "postalCode": "803",
                                        "addressCountry": "TW"
                                    },
                                    "telephone": "+886-932-828-922",
                                    "sameAs": [
                                        "https://www.google.com/maps/place/?q=place_id:ChIJs97gIJMFbjQRzlIsr4hlP-U"
                                    ]
                                },
                                {
                                    "@type": "LodgingBusiness",
                                    "@id": "https://www.hello-stay.com/godin/#lodging",
                                    "name": "溝頂民宿",
                                    "alternateName": ["Godin House", "Hello Stay 二館"],
                                    "address": {
                                        "@type": "PostalAddress",
                                        "streetAddress": "大公路70巷6-2號",
                                        "addressLocality": "鹽埕區",
                                        "addressRegion": "高雄市",
                                        "postalCode": "803",
                                        "addressCountry": "TW"
                                    },
                                    "telephone": "+886-932-828-922",
                                    "sameAs": [
                                        "https://www.google.com/maps/search/?api=1&query=%E6%BA%9溝%E9%A0%82%E6%B0%91%E5%AE%BF"
                                    ]
                                }
                            ]
                        }
                    }
                ]
            }} />
            
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                
                {/* Header */}
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "50px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>
                            Our Story & Values
                        </div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>
                            關於 Hello Stay
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px auto" }} />
                        <p style={{ fontSize: "0.85rem", color: "#BEB5A8", lineHeight: 1.9, fontStyle: "italic" }}>
                            「三館風格，一種堅持」—— 讓每一次聚會都像回到了家。
                        </p>
                    </div>
                </Reveal>

                {/* Brand Story */}
                <Reveal>
                    <section style={cardStyle}>
                        <SectionLabel en="Origin of Hello Stay" />
                        <h3 style={h3Style}>🏡 品牌故事：從一間老屋的溫暖延伸</h3>
                        <div style={contentStyle}>
                            <p>
                                創立於 2017 年，<strong>Hello Stay</strong> 的誕生源於一個單純的初衷：
                                <em>「我們能不能在高雄最有人情味的鹽埕老街區，為遠道而來的旅人打造一個真正能『聚在一起』的家？」</em>
                            </p>
                            <p>
                                許多人在計畫團體旅行時常面臨兩難 —— 住飯店會被分散在不同的房間，聚會聊天缺乏私密性；而傳統的民宿又常常面臨設備不齊或鄰里吵鬧的窘境。
                            </p>
                            <p>
                                於是，我們以老街區的舊建建築為起點，逐步修復並改建，創造了今日的 <strong>Hello Stay 旅宿品牌</strong>。
                                過去數年來，我們已服務超過 5,000 組家庭、畢業旅行與企業團隊，陪伴無數旅客在高雄度過了充滿笑聲的溫馨假期。
                            </p>
                        </div>
                    </section>
                </Reveal>

                {/* Brand Core Values */}
                <Reveal>
                    <section style={cardStyle}>
                        <SectionLabel en="Our Core Philosophy" />
                        <h3 style={h3Style}>✨ 我們的核心堅持</h3>
                        <div style={{ display: "grid", gap: "16px", marginTop: "16px" }}>
                            <ValueItem
                                icon="🤝"
                                title="無干擾的完全私密空間"
                                desc="一天只接待一組預訂。在入住期間，整棟空間、客廳與娛樂配備完全由您的團體獨享，沒有外人打擾，您可以和最親密的親友自在放鬆。"
                            />
                            <ValueItem
                                icon="🍳"
                                title="豐富的生活機能配置"
                                desc="配備頂級開放式中島廚房（你好哇寓所）或流理台設備（溝頂民宿），並備齊餐具與基本調味；更提供麻將桌、桌遊、聯網電視等，滿足聚會的一切需求。"
                            />
                            <ValueItem
                                icon="🛡️"
                                title="合規與安全第一"
                                desc="旗下所有營運館別均依法取得中華民國「合法民宿登記證」，全館裝設合格消防設備，並投保公共意外責任險，讓您的假期住得舒適，更住得安心。"
                            />
                        </div>
                    </section>
                </Reveal>

                {/* Sub-Properties Summary */}
                <Reveal>
                    <section style={cardStyle}>
                        <SectionLabel en="Our Properties" />
                        <h3 style={h3Style}>🏛️ 旗下合法館別一覽</h3>
                        <p style={{ fontSize: "0.78rem", color: "#999", marginBottom: "20px", lineHeight: 1.8 }}>
                            Hello Stay 目前提供三種不同風格與容納人數的館別，滿足不同規模的包棟需求：
                        </p>
                        
                        <div style={{ display: "grid", gap: "20px" }}>
                            
                            {/* Property 1 */}
                            <div style={propItemStyle}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                                    <h4 style={propNameStyle}>主館｜你好哇寓所</h4>
                                    <span style={regTagStyle}>民宿 131-1 號</span>
                                </div>
                                <p style={propDescStyle}>
                                    <strong>適合人數：</strong>6 - 26 人<br />
                                    <strong>館別特色：</strong>五層樓獨棟，設有寬敞的 56 m² 豪華中島廚房交誼廳、手動麻將桌、桌遊、網美吊椅房。每間房間均設有乾濕分離獨立衛浴。<br />
                                    <strong>詳細地址：</strong>高雄市鹽埕區大公路70巷8號
                                </p>
                                <Link href="/hellohouse" style={propLinkStyle}>深入了解 你好哇寓所 →</Link>
                            </div>

                            {/* Property 2 */}
                            <div style={propItemStyle}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                                    <h4 style={propNameStyle}>二館｜溝頂民宿</h4>
                                    <span style={regTagStyle}>民宿 163 號</span>
                                </div>
                                <p style={propDescStyle}>
                                    <strong>適合人數：</strong>10 - 12 人<br />
                                    <strong>館別特色：</strong>五層樓溫馨小家庭包棟。4 樓設有專屬公共交誼廳，配備麻將桌、桌遊、沙發及簡易流理台（RO 飲水機、雙門冰箱與微波爐，不可開伙）。<br />
                                    <strong>詳細地址：</strong>高雄市鹽埕區大公路70巷6-2號
                                </p>
                                <Link href="/godin" style={propLinkStyle}>深入了解 溝頂民宿 →</Link>
                            </div>

                            {/* Property 3 */}
                            <div style={propItemStyle}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                                    <h4 style={propNameStyle}>三館｜大智若愚</h4>
                                    <span style={{ ...regTagStyle, background: "#E8F0FE", color: "#1565C0" }}>預計 2027 開幕</span>
                                </div>
                                <p style={propDescStyle}>
                                    <strong>適合人數：</strong>最大 48 人<br />
                                    <strong>館別特色：</strong>座落於鹽埕大港橋旁。全新電梯民宿，規劃一層三房一廳的獨立樓層設計，提供無障礙梯位，極適合公司大型團建或大家族同遊。<br />
                                    <strong>詳細地址：</strong>高雄市鹽埕區大智路旁近大港橋
                                </p>
                                <Link href="/dazhi" style={propLinkStyle}>深入了解 大智若愚 →</Link>
                            </div>
                            
                        </div>
                    </section>
                </Reveal>

                {/* Legal & Safety Declaration */}
                <Reveal>
                    <section style={{ ...cardStyle, background: "#FFF8F8", border: "1px solid #F5DEDE" }}>
                        <SectionLabel en="Safety & Insurance" />
                        <h3 style={{ ...h3Style, color: "#9B2C2C" }}>🛡️ 安全承諾與公共責任保險</h3>
                        <div style={{ fontSize: "0.82rem", color: "#555", lineHeight: 2 }}>
                            <p>
                                為保障每位入住旅客的安全，Hello Stay 旗下所有民宿皆：
                            </p>
                            <p>• 依法投保 <strong>富邦產物保險公共意外責任險</strong>，保險額度符合政府最高規範。</p>
                            <p>• 定期進行消防安全設備安檢申報，全館備有合格滅火器、偵煙探測器與緊急照明指示燈。</p>
                            <p>• 客房及公共區域床單備品均委託專業清潔廠高溫洗滌殺菌，提供潔淨無憂的起居環境。</p>
                        </div>
                    </section>
                </Reveal>

                {/* CTA */}
                <Reveal>
                    <div style={{ textAlign: "center", marginTop: "30px" }}>
                        <p style={{ fontSize: "0.85rem", color: "#999", marginBottom: "20px" }}>
                            正在規劃高雄的包棟旅程？讓 Hello Stay 成為您的落腳之處
                        </p>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/book" style={{
                                padding: "14px 32px", borderRadius: "10px", background: "#161618",
                                color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em",
                            }}>查詢空房</Link>
                            <a href="https://lin.ee/atCiMQw" target="_blank" rel="noreferrer" style={{
                                padding: "14px 32px", borderRadius: "10px", background: "#06C755",
                                color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em",
                            }}>LINE 聯絡管家</a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}

/* ── Shared Styles ── */
const cardStyle: React.CSSProperties = {
    background: "#fff", borderRadius: "16px", padding: "32px 28px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px",
};
const h3Style: React.CSSProperties = {
    fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "16px",
};
const contentStyle: React.CSSProperties = {
    fontSize: "0.85rem", color: "#666", lineHeight: 2, display: "grid", gap: "14px",
};
const propItemStyle: React.CSSProperties = {
    padding: "20px", background: "var(--bg)", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.02)",
};
const propNameStyle: React.CSSProperties = {
    fontSize: "0.95rem", color: "#3D3830", fontWeight: 600,
};
const regTagStyle: React.CSSProperties = {
    fontSize: "0.7rem", padding: "4px 8px", background: "#F5F2EB", color: "#8E7D65", borderRadius: "4px", fontWeight: 500,
};
const propDescStyle: React.CSSProperties = {
    fontSize: "0.8rem", color: "#666", lineHeight: 1.8, margin: "10px 0 14px",
};
const propLinkStyle: React.CSSProperties = {
    fontSize: "0.78rem", color: "#B85A38", fontWeight: 500, textDecoration: "none",
};

/* ── Sub-components ── */
function SectionLabel({ en }: { en: string }) {
    return (
        <div style={{
            fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#BEB5A8", marginBottom: "14px",
        }}>{en}</div>
    );
}

function ValueItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
    return (
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <span style={{ fontSize: "1.3rem", padding: "10px", background: "var(--bg)", borderRadius: "10px", lineHeight: 1 }}>{icon}</span>
            <div>
                <h4 style={{ fontSize: "0.88rem", fontWeight: 600, color: "#3D3830", marginBottom: "4px" }}>{title}</h4>
                <p style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.7 }}>{desc}</p>
            </div>
        </div>
    );
}
