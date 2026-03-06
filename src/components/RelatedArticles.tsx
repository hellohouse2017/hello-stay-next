"use client";
import Link from "next/link";

const allArticles = [
    { slug: "kaohsiung-group-stay-guide", title: "高雄包棟民宿完全攻略", emoji: "🏠", tags: ["包棟", "攻略"] },
    { slug: "yancheng-food-guide", title: "鹽埕區美食地圖 30 間", emoji: "🍜", tags: ["美食", "鹽埕"] },
    { slug: "kaohsiung-group-trip", title: "團體旅遊行程 9 主題", emoji: "📋", tags: ["行程", "團體"] },
    { slug: "kaohsiung-wedding-venue", title: "婚禮迎娶包棟推薦", emoji: "💒", tags: ["婚禮", "迎娶"] },
    { slug: "kaohsiung-offsite-teambuilding", title: "企業 Off-site 團建", emoji: "💼", tags: ["企業", "團建"] },
    { slug: "kaohsiung-graduation-trip", title: "畢業旅行包棟推薦", emoji: "🎓", tags: ["畢旅", "學生"] },
    { slug: "pier2-accommodation", title: "駁二住宿推薦", emoji: "🎨", tags: ["駁二", "住宿"] },
    { slug: "kaohsiung-nye-stay", title: "高雄跨年包棟", emoji: "🎆", tags: ["跨年", "派對"] },
    { slug: "kaohsiung-mahjong-stay", title: "麻將民宿推薦", emoji: "🀄", tags: ["麻將", "娛樂"] },
    { slug: "kaohsiung-kitchen-bnb", title: "有廚房的民宿推薦", emoji: "🍳", tags: ["廚房", "火鍋"] },
    { slug: "kaohsiung-family-reunion", title: "家族旅遊包棟推薦", emoji: "👨‍👩‍👧‍👦", tags: ["家族", "親子"] },
    { slug: "kaohsiung-sports-team", title: "球隊比賽住宿推薦", emoji: "⚾", tags: ["球隊", "比賽"] },
];

export default function RelatedArticles({ current, count = 4 }: { current: string; count?: number }) {
    // Pick related articles: exclude current, shuffle, take `count`
    const others = allArticles.filter(a => a.slug !== current);
    const shuffled = others.sort(() => 0.5 - Math.random());
    const picks = shuffled.slice(0, count);

    return (
        <div style={{ marginTop: "40px", padding: "32px 24px", background: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "16px" }}>
                Related Articles
            </div>
            <div style={{ display: "grid", gap: "10px" }}>
                {picks.map(a => (
                    <Link key={a.slug} href={`/blog/${a.slug}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "10px", background: "#FAF8F5", transition: "background 0.2s" }}>
                        <span style={{ fontSize: "1.3rem" }}>{a.emoji}</span>
                        <span style={{ fontSize: "0.82rem", color: "#3D3830" }}>{a.title}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
