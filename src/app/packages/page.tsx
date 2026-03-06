import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "包棟方案 | 企業・婚禮・家族・球隊・派對 | 你好哇寓所 & 溝頂民宿",
    description: "專為各種場合量身打造的包棟住宿方案。企業移地訓練、婚禮迎娶、家族旅遊、球隊比賽、朋友派對，高雄鹽埕最彈性的包棟民宿。",
};

const packages = [
    {
        emoji: "🏢",
        title: "企業包棟 & 移地訓練",
        desc: "打破辦公室的隔閡。在有溫度的老宅裡進行年度策略會議，晚上圍爐煮火鍋，凝聚團隊向心力。",
        features: ["中島廚房團隊聚餐", "獨立客廳會議空間", "6-26 人彈性容量", "投影設備可借用"],
        color: "#3B82F6",
    },
    {
        emoji: "💒",
        title: "婚禮迎娶 & 闖關",
        desc: "像娘家一樣溫馨。寬敞的一樓客廳是闖關遊戲的最佳戰場，絕佳採光讓婚攝隨手一拍都是大片。",
        features: ["寬敞一樓闖關場地", "絕佳自然採光", "多房型供伴娘團入住", "廚房可準備茶點"],
        color: "#EC4899",
    },
    {
        emoji: "👨‍👩‍👧‍👦",
        title: "家族旅遊 & 圍爐",
        desc: "找回過年過節的熱鬧。長輩打麻將、小孩看電視、媽媽煮火鍋，分層住宿讓作息不同的家人也能和諧共處。",
        features: ["麻將桌（長輩最愛）", "大型中島廚房", "分層住宿互不干擾", "適合三代同堂"],
        color: "#F59E0B",
    },
    {
        emoji: "⚽",
        title: "球隊比賽 & 移地訓練",
        desc: "專為運動員設計。提供洗衣機清洗球衣、製冰機冰敷，還有賽後檢討空間。鄰近高雄巨蛋與各大場館。",
        features: ["洗衣機清洗球衣", "製冰機冰敷復原", "大客廳戰術檢討", "鄰近各大場館"],
        color: "#10B981",
    },
    {
        emoji: "🎉",
        title: "朋友聚會 & 慶生派對",
        desc: "專屬你們的私密派對空間。盡情歡唱、打牌，深夜再散步去附近的特色酒吧續攤，不用擔心吵到鄰居。",
        features: ["KTV 歡唱設備", "私密不受干擾", "附近酒吧散步到", "麻將打到天亮"],
        color: "#8B5CF6",
    },
    {
        emoji: "🍜",
        title: "鹽埕漫遊 & 美食攻略",
        desc: "住在高雄最好吃、最有文化底蘊的鹽埕區。走路就能到奶茶街、吃遍數十年老店，深度感受港都舊城區的魅力。",
        features: ["步行即達各大老店", "奶茶一條街", "駁二藝文散步", "夜市宵夜一應俱全"],
        color: "#EF4444",
    },
];

export default function PackagesPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "#FAF8F5", minHeight: "100vh" }}>
            <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", provider: { "@type": "LodgingBusiness", name: "Hello Stay" }, name: "高雄包棟方案", description: "企業移地訓練、婚禮迎娶、家族旅遊、球隊比賽、朋友派對，量身打造高雄鹽埕區包棟方案。", areaServed: { "@type": "Place", name: "高雄鹽埕區" }, serviceType: "包棟住宿", hasOfferCatalog: { "@type": "OfferCatalog", name: "包棟方案列表", itemListElement: packages.map((p, i) => ({ "@type": "Offer", position: i + 1, name: p.title, description: p.desc })) } }} />
            <div className="w" style={{ maxWidth: "780px", padding: "0 28px 80px" }}>

                {/* Header */}
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "50px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "12px" }}>
                            One House, Infinite Possibilities
                        </div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>
                            一棟民宿・無限可能
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "#C8AD7F", margin: "20px auto" }} />
                        <p style={{ fontSize: "0.85rem", color: "#999", lineHeight: 1.9 }}>
                            無論什麼場合，我們都能為你量身打造
                        </p>
                    </div>
                </Reveal>

                {/* Why choose us */}
                <Reveal>
                    <section style={{
                        background: "#fff", borderRadius: "16px", padding: "28px", marginBottom: "24px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                    }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#BEB5A8", marginBottom: "14px" }}>
                            Why Hello Stay
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "14px" }}>
                            {[
                                { icon: "🏠", text: "整棟包租不受干擾" },
                                { icon: "🍳", text: "豪華中島廚房" },
                                { icon: "🀄", text: "麻將、KTV 設備" },
                                { icon: "📍", text: "鄰近捷運與駁二" },
                            ].map(f => (
                                <div key={f.text} style={{
                                    textAlign: "center", padding: "16px 12px", background: "#FAF8F5", borderRadius: "12px",
                                }}>
                                    <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>{f.icon}</div>
                                    <div style={{ fontSize: "0.8rem", color: "#666" }}>{f.text}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </Reveal>

                {/* Package cards */}
                <div style={{ display: "grid", gap: "16px", marginBottom: "24px" }}>
                    {packages.map(pkg => (
                        <Reveal key={pkg.title}>
                            <section style={{
                                background: "#fff", borderRadius: "16px", padding: "28px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.03)", overflow: "hidden",
                                borderLeft: `3px solid ${pkg.color}`,
                            }}>
                                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                                    <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{pkg.emoji}</span>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", color: "#3D3830", marginBottom: "8px" }}>{pkg.title}</h3>
                                        <p style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.9, marginBottom: "14px" }}>{pkg.desc}</p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                            {pkg.features.map(f => (
                                                <span key={f} style={{
                                                    padding: "4px 12px", borderRadius: "16px", fontSize: "0.72rem",
                                                    background: `${pkg.color}0D`, color: pkg.color, fontWeight: 500,
                                                }}>{f}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Reveal>
                    ))}
                </div>

                {/* 廢墟 BAR */}
                <Reveal>
                    <section style={{
                        background: "#161618", borderRadius: "16px", padding: "32px 28px", marginBottom: "24px",
                        textAlign: "center",
                    }}>
                        <div style={{ fontSize: "0.6rem", fontFamily: "var(--en)", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "12px" }}>
                            Secret Venue
                        </div>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", color: "#fff", marginBottom: "12px" }}>
                            想辦一場難忘的派對？
                        </h3>
                        <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: "20px" }}>
                            我們的秘密基地「廢墟 BAR」可代訂場地，<br />
                            打造專屬你們的私密派對空間。
                        </p>
                        <a href="https://lin.ee/atCiMQw" target="_blank" rel="noreferrer" style={{
                            display: "inline-block", padding: "12px 28px", borderRadius: "8px",
                            background: "#C8AD7F", color: "#161618", fontFamily: "var(--serif)",
                            fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.06em",
                        }}>
                            LINE 洽詢派對方案
                        </a>
                    </section>
                </Reveal>

                {/* CTA */}
                <Reveal>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/book" style={{
                                padding: "14px 32px", borderRadius: "10px", background: "#161618",
                                color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em",
                            }}>查詢空房</Link>
                            <Link href="/explore" style={{
                                padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0",
                                color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em",
                            }}>周邊探索</Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
