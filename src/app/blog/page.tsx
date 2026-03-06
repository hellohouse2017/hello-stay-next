import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
    title: "旅宿攻略 | 高雄包棟・鹽埕美食・行程推薦 | Hello Stay",
    description: "高雄包棟民宿完全攻略、鹽埕區美食地圖、團體旅遊行程推薦。在地經營8年的民宿主人，分享最道地的高雄旅遊情報。",
};

const articles = [
    {
        slug: "kaohsiung-group-stay-guide",
        title: "2026 高雄包棟民宿完全攻略｜6-48人怎麼選？",
        excerpt: "從人數、預算、設備到地點，一篇搞定高雄包棟住宿所有疑問。在地經營8年的民宿主人告訴你真正該注意的事。",
        date: "2026-03-01",
        emoji: "🏠",
        tags: ["包棟", "攻略", "高雄住宿"],
    },
    {
        slug: "yancheng-food-guide",
        title: "鹽埕區美食地圖｜在地人推薦 30 間必吃老店",
        excerpt: "從早餐虱目魚到深夜特色酒吧，住在鹽埕區就是住在美食的中心。附步行距離與營業時間。",
        date: "2026-03-03",
        emoji: "🍜",
        tags: ["美食", "鹽埕區", "駁二"],
    },
    {
        slug: "kaohsiung-group-trip",
        title: "高雄團體旅遊行程推薦｜2-4天懶人包",
        excerpt: "親子、情侶、公司旅遊、球隊比賽...9種主題行程一次看，從住宿到景點美食全規劃。",
        date: "2026-03-05",
        emoji: "📋",
        tags: ["行程", "團體旅遊", "親子"],
    },
];

export default function BlogIndex() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "#FAF8F5", minHeight: "100vh" }}>
            <div className="w" style={{ maxWidth: "780px", padding: "0 28px 80px" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "50px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "12px" }}>
                            Local Insights
                        </div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>
                            旅宿攻略
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "#C8AD7F", margin: "20px auto" }} />
                        <p style={{ fontSize: "0.85rem", color: "#999", lineHeight: 1.9 }}>
                            在地經營 8 年，最道地的高雄旅遊情報
                        </p>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gap: "20px" }}>
                    {articles.map(a => (
                        <Reveal key={a.slug}>
                            <Link href={`/blog/${a.slug}`} style={{ textDecoration: "none", display: "block" }}>
                                <article style={{
                                    background: "#fff", borderRadius: "16px", padding: "32px 28px",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)", transition: "all 0.3s",
                                }}>
                                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                                        <span style={{ fontSize: "2rem", flexShrink: 0 }}>{a.emoji}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#C8AD7F", marginBottom: "8px" }}>
                                                {a.date}
                                            </div>
                                            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "10px", letterSpacing: "0.04em" }}>
                                                {a.title}
                                            </h2>
                                            <p style={{ fontSize: "0.82rem", color: "#999", lineHeight: 1.9, marginBottom: "12px" }}>
                                                {a.excerpt}
                                            </p>
                                            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                                {a.tags.map(t => (
                                                    <span key={t} style={{
                                                        padding: "4px 12px", borderRadius: "16px", fontSize: "0.7rem",
                                                        background: "#FAF8F5", color: "#8A8279",
                                                    }}>{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
}
