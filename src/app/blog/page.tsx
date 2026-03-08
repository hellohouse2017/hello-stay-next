import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { scheduledArticles, getPublishedArticles } from "@/data/scheduled-articles";

export const metadata: Metadata = {
    title: "旅宿攻略 | 高雄包棟・鹽埕美食・行程推薦 | Hello Stay",
    description: "高雄包棟民宿完全攻略、鹽埕區美食地圖、團體旅遊行程推薦。在地經營8年的民宿主人，分享最道地的高雄旅遊情報。",
};

const existingArticles = [
    { slug: "kaohsiung-group-stay-guide", title: "2026 高雄包棟民宿完全攻略｜6-48人怎麼選？", excerpt: "從人數、預算、設備到地點，一篇搞定高雄包棟住宿所有疑問。", date: "2026-03-01", emoji: "🏠", tags: ["包棟", "攻略"] },
    { slug: "yancheng-food-guide", title: "鹽埕區美食地圖｜在地人推薦 30 間必吃老店", excerpt: "從早餐虱目魚到深夜特色酒吧，住在鹽埕區就是住在美食的中心。", date: "2026-03-03", emoji: "🍜", tags: ["美食", "鹽埕區"] },
    { slug: "kaohsiung-group-trip", title: "高雄團體旅遊行程推薦｜2-4天懶人包", excerpt: "親子、情侶、公司旅遊...9種主題行程一次看，從住宿到景點全規劃。", date: "2026-03-05", emoji: "📋", tags: ["行程", "團體旅遊"] },
    { slug: "kaohsiung-wedding-venue", title: "高雄婚禮迎娶包棟推薦｜闖關遊戲・婚攝場地", excerpt: "包棟民宿是婚禮迎娶最佳選擇！寬敞客廳闖關、自然採光婚攝大片。", date: "2026-03-06", emoji: "💒", tags: ["婚禮", "迎娶"] },
    { slug: "kaohsiung-offsite-teambuilding", title: "高雄企業移地訓練住宿｜Off-site 團建包棟", excerpt: "客廳當會議室，中島廚房團隊聚餐，白天開會晚上圍爐凝聚向心力。", date: "2026-03-06", emoji: "💼", tags: ["企業", "團建"] },
    { slug: "kaohsiung-graduation-trip", title: "高雄畢業旅行包棟推薦｜學生畢旅住宿首選", excerpt: "20人平均每人不到$1,000！有麻將、桌遊、廚房。3天2夜全攻略。", date: "2026-03-06", emoji: "🎓", tags: ["畢旅", "學生"] },
    { slug: "pier2-accommodation", title: "駁二住宿推薦｜步行 10 分鐘到駁二的包棟民宿", excerpt: "住鹽埕區 = 駁二步行圈 + 美食圈 + 捷運圈。完整景點指南。", date: "2026-03-06", emoji: "🎨", tags: ["駁二", "住宿"] },
    { slug: "kaohsiung-nye-stay", title: "高雄跨年包棟推薦｜倒數派對・煙火觀賞", excerpt: "中島廚房跨年大餐，麻將同樂，步行到港邊看煙火。", date: "2026-03-06", emoji: "🎆", tags: ["跨年", "派對"] },
    { slug: "kaohsiung-mahjong-stay", title: "高雄麻將民宿推薦｜麻將・打牌到天亮", excerpt: "麻將免洗牌，不限時打到凌晨。邊打邊煮宵夜。", date: "2026-03-06", emoji: "🀄", tags: ["麻將", "娛樂"] },
    { slug: "kaohsiung-kitchen-bnb", title: "高雄有廚房的民宿推薦｜中島廚房・火鍋趴", excerpt: "豪華中島廚房完整配備，火鍋趴每人$150搞定。附菜單推薦。", date: "2026-03-06", emoji: "🍳", tags: ["廚房", "火鍋"] },
    { slug: "kaohsiung-family-reunion", title: "高雄家族旅遊包棟推薦｜三代同堂・長輩友善", excerpt: "每間獨立衛浴，長輩打麻將、小孩看Netflix、爸媽廚房備餐。", date: "2026-03-06", emoji: "👨‍👩‍👧‍👦", tags: ["家族", "親子"] },
    { slug: "kaohsiung-sports-team", title: "高雄球隊比賽住宿推薦｜系隊・社會隊包棟", excerpt: "洗衣機洗球衣、廚房補充營養。10-38人包棟方案。", date: "2026-03-06", emoji: "⚾", tags: ["球隊", "比賽"] },
];

// Merge existing + scheduled (only published ones)
const publishedScheduled = getPublishedArticles(scheduledArticles).map(a => ({
    slug: a.slug, title: a.title, excerpt: a.excerpt, date: a.publishDate, emoji: a.emoji, tags: a.tags,
}));
const articles = [...existingArticles, ...publishedScheduled].sort((a, b) => b.date.localeCompare(a.date));

export default function BlogIndex() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "#FAF8F5", minHeight: "100vh" }}>
            <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Hello Stay 旅宿攻略", description: "高雄包棟民宿攻略、鹽埕美食地圖、團體旅遊行程推薦", url: "https://www.hello-stay.com/blog", mainEntity: { "@type": "ItemList", itemListElement: articles.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: `https://www.hello-stay.com/blog/${a.slug}`, name: a.title })) } }} />
            <div className="w" style={{ maxWidth: "780px", padding: "0 28px 80px" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "50px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "12px" }}>Local Insights</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>旅宿攻略</h1>
                        <div style={{ width: "40px", height: "1px", background: "#C8AD7F", margin: "20px auto" }} />
                        <p style={{ fontSize: "0.85rem", color: "#999", lineHeight: 1.9 }}>在地經營 8 年，最道地的高雄旅遊情報</p>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gap: "16px" }}>
                    {articles.map(a => (
                        <Reveal key={a.slug}>
                            <Link href={`/blog/${a.slug}`} style={{ textDecoration: "none", display: "block" }}>
                                <article style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", transition: "all 0.3s" }}>
                                    <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                                        <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{a.emoji}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#C8AD7F", marginBottom: "6px" }}>{a.date}</div>
                                            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1rem", color: "#3D3830", marginBottom: "8px", letterSpacing: "0.04em" }}>{a.title}</h2>
                                            <p style={{ fontSize: "0.78rem", color: "#999", lineHeight: 1.8, marginBottom: "10px" }}>{a.excerpt}</p>
                                            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                                                {a.tags.map(t => (<span key={t} style={{ padding: "3px 10px", borderRadius: "14px", fontSize: "0.65rem", background: "#FAF8F5", color: "#8A8279" }}>{t}</span>))}
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
