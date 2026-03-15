"use client";
import Link from "next/link";

interface ArticleInfo {
    slug: string;
    title: string;
    emoji: string;
    tags: string[];
}

// 所有文章（靜態 + 動態排程的）合併在此
const allArticles: ArticleInfo[] = [
    // 原始靜態文章
    { slug: "kaohsiung-bnb-recommendation", title: "高雄包棟民宿推薦 Top 3", emoji: "⭐", tags: ["包棟", "民宿", "推薦", "攻略"] },
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
    // Q1 排程文章
    { slug: "kaohsiung-6-person-stay", title: "6 人住宿推薦", emoji: "👥", tags: ["包棟", "6人"] },
    { slug: "kaohsiung-10-person-stay", title: "10 人包棟怎麼選", emoji: "🏠", tags: ["包棟", "10人"] },
    { slug: "kaohsiung-15-person-stay", title: "15 人住宿完整比較", emoji: "👨‍👩‍👧‍👦", tags: ["包棟", "15人"] },
    { slug: "kaohsiung-20-person-stay", title: "20 人包棟住哪裡", emoji: "🎉", tags: ["包棟", "20人"] },
    { slug: "kaohsiung-30-person-stay", title: "30 人大團體攻略", emoji: "🏘️", tags: ["包棟", "30人"] },
    { slug: "kaohsiung-40-person-stay", title: "40 人超大包棟方案", emoji: "🏢", tags: ["包棟", "40人"] },
    { slug: "kaohsiung-birthday-party-venue", title: "生日派對場地推薦", emoji: "🎂", tags: ["生日", "派對"] },
    { slug: "kaohsiung-bachelorette-party", title: "閨蜜單身派對住宿", emoji: "👯‍♀️", tags: ["閨蜜", "單身趴"] },
    { slug: "kaohsiung-parent-child-stay", title: "親子包棟民宿推薦", emoji: "👶", tags: ["親子", "家庭"] },
    { slug: "kaohsiung-couple-friends-trip", title: "夫妻檔出遊包棟", emoji: "💑", tags: ["夫妻", "朋友"] },
    { slug: "kaohsiung-company-retreat", title: "員工旅遊住宿推薦", emoji: "🏢", tags: ["員旅", "企業"] },
    { slug: "kaohsiung-class-reunion", title: "同學會包棟聚會", emoji: "🎓", tags: ["同學會", "聚會"] },
    { slug: "kaohsiung-church-group-stay", title: "教會團契住宿推薦", emoji: "⛪", tags: ["教會", "團契"] },
    // Q2 排程文章
    { slug: "kaohsiung-whole-floor-rental", title: "包層住宿推薦", emoji: "🏗️", tags: ["包層", "小團體"] },
    { slug: "kaohsiung-hotpot-gathering", title: "煮火鍋包棟推薦", emoji: "🍲", tags: ["火鍋", "廚房"] },
    { slug: "kaohsiung-board-game-stay", title: "桌遊民宿推薦", emoji: "🎲", tags: ["桌遊", "娛樂"] },
    { slug: "kaohsiung-party-stay", title: "派對包棟推薦", emoji: "🎵", tags: ["派對", "包棟"] },
    { slug: "kaohsiung-netflix-stay", title: "Netflix 電視民宿", emoji: "📺", tags: ["Netflix", "雨天"] },
    { slug: "kaohsiung-self-checkin-bnb", title: "密碼鎖自助入住", emoji: "🔐", tags: ["自助入住", "密碼鎖"] },
    { slug: "pier2-one-day-itinerary", title: "駁二一日遊攻略", emoji: "🎨", tags: ["駁二", "行程"] },
    { slug: "dagangqiao-attraction-guide", title: "大港橋周邊景點", emoji: "🌉", tags: ["大港橋", "景點"] },
    { slug: "yancheng-night-guide", title: "鹽埕夜生活攻略", emoji: "🌙", tags: ["鹽埕", "酒吧"] },
    { slug: "yancheng-breakfast-guide", title: "鹽埕早餐 Top 10", emoji: "🥚", tags: ["鹽埕", "早餐"] },
    { slug: "kaohsiung-bnb-vs-hotel", title: "包棟 vs 飯店比較", emoji: "⚖️", tags: ["比較", "攻略"] },
    { slug: "kaohsiung-legal-bnb", title: "合法民宿安全指南", emoji: "✅", tags: ["合法", "安全"] },
    { slug: "kaohsiung-bnb-price-guide", title: "包棟價格大公開", emoji: "💰", tags: ["價格", "攻略"] },
    // Q3-Q4 重點文章
    { slug: "kaohsiung-mid-autumn-bbq", title: "中秋包棟烤肉攻略", emoji: "🌕", tags: ["中秋", "包棟"] },
    { slug: "kaohsiung-christmas-party", title: "聖誕派對場地推薦", emoji: "🎄", tags: ["聖誕", "派對"] },
    { slug: "kaohsiung-2-day-itinerary", title: "兩天一夜行程推薦", emoji: "📍", tags: ["行程", "兩天一夜"] },
    { slug: "kaohsiung-3-day-itinerary", title: "三天兩夜深度旅遊", emoji: "🗺️", tags: ["行程", "三天兩夜"] },
    { slug: "kaohsiung-train-trip-stay", title: "搭火車玩高雄攻略", emoji: "🚄", tags: ["交通", "火車"] },
];

function getRelatedByTags(current: string, currentTags: string[]): ArticleInfo[] {
    const others = allArticles.filter(a => a.slug !== current);
    // Score by tag overlap
    const scored = others.map(a => ({
        ...a,
        score: a.tags.filter(t => currentTags.includes(t)).length,
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored;
}

export default function RelatedArticles({ current, currentTags, count = 4 }: { current: string; currentTags?: string[]; count?: number }) {
    const tags = currentTags || allArticles.find(a => a.slug === current)?.tags || [];
    const related = getRelatedByTags(current, tags).slice(0, count);

    if (related.length === 0) return null;

    return (
        <div style={{ marginTop: "40px", padding: "32px 24px", background: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "16px" }}>
                Related Articles
            </div>
            <div style={{ display: "grid", gap: "10px" }}>
                {related.map(a => (
                    <Link key={a.slug} href={`/blog/${a.slug}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "10px", background: "#FAF8F5", transition: "background 0.2s" }}>
                        <span style={{ fontSize: "1.3rem" }}>{a.emoji}</span>
                        <span style={{ fontSize: "0.82rem", color: "#3D3830" }}>{a.title}</span>
                    </Link>
                ))}
            </div>
            <div style={{ marginTop: "16px", textAlign: "center" }}>
                <Link href="/blog" style={{ fontSize: "0.75rem", color: "#C8AD7F", textDecoration: "none", letterSpacing: "0.1em" }}>
                    瀏覽所有攻略 →
                </Link>
            </div>
        </div>
    );
}
