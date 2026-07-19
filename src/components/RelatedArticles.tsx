import Link from "next/link";
import { getPublishedArticles, scheduledArticles } from "@/data/scheduled-articles";

interface ArticleInfo {
    slug: string;
    title: string;
    emoji: string;
    tags: string[];
}

const allArticles: ArticleInfo[] = [
    { slug: "yancheng-breakfast-guide", title: "鹽埕早餐怎麼吃", emoji: "", tags: ["鹽埕", "早餐"] },
    { slug: "yancheng-local-meals-guide", title: "鹽埕午餐晚餐吃什麼", emoji: "", tags: ["鹽埕", "午餐"] },
    { slug: "yancheng-snacks-guide", title: "鹽埕小吃怎麼選", emoji: "", tags: ["鹽埕", "小吃"] },
    { slug: "yancheng-dessert-drinks-guide", title: "鹽埕下午茶與甜點", emoji: "", tags: ["鹽埕", "甜點"] },
    { slug: "yancheng-night-guide", title: "鹽埕晚上去哪裡", emoji: "", tags: ["鹽埕", "夜生活"] },
    { slug: "yancheng-shopping-laundry-guide", title: "鹽埕採買與洗衣", emoji: "", tags: ["鹽埕", "採買", "洗衣"] },
    { slug: "pier2-one-day-itinerary", title: "駁二一日遊怎麼排", emoji: "", tags: ["駁二", "一日遊"] },
    { slug: "dagangqiao-attraction-guide", title: "大港橋周邊景點", emoji: "", tags: ["大港橋", "景點"] },
    { slug: "yancheng-market-guide", title: "鹽埕市場怎麼逛", emoji: "", tags: ["鹽埕", "市場"] },
    { slug: "yancheng-port-arts-guide", title: "高雄港區藝文散步", emoji: "", tags: ["高雄港", "藝文"] },
    { slug: "yancheng-westbay-route-guide", title: "西子灣與旗津半日路線", emoji: "", tags: ["西子灣", "旗津"] },
    { slug: "kaohsiung-group-trip", title: "團體旅遊行程 9 主題", emoji: "", tags: ["行程", "團體"] },
    { slug: "kaohsiung-wedding-venue", title: "婚禮迎娶包棟推薦", emoji: "", tags: ["婚禮", "迎娶"] },
    { slug: "kaohsiung-offsite-teambuilding", title: "企業 Off-site 團建", emoji: "", tags: ["企業", "團建"] },
    { slug: "pier2-accommodation", title: "駁二住宿推薦", emoji: "", tags: ["駁二", "住宿"] },
    { slug: "kaohsiung-nye-stay", title: "高雄跨年包棟", emoji: "", tags: ["跨年", "派對"] },
    { slug: "kaohsiung-mahjong-stay", title: "麻將民宿推薦", emoji: "", tags: ["麻將", "娛樂"] },
    { slug: "kaohsiung-kitchen-bnb", title: "有廚房的民宿推薦", emoji: "", tags: ["廚房", "火鍋"] },
    { slug: "kaohsiung-family-reunion", title: "家族旅遊包棟推薦", emoji: "", tags: ["家族", "親子"] },
    { slug: "kaohsiung-6-person-stay", title: "6 人住宿推薦", emoji: "", tags: ["包棟", "6人"] },
    { slug: "kaohsiung-10-person-stay", title: "10 人包棟怎麼選", emoji: "", tags: ["包棟", "10人"] },
    { slug: "kaohsiung-15-person-stay", title: "15 人住宿完整比較", emoji: "", tags: ["包棟", "15人"] },
    { slug: "kaohsiung-20-person-stay", title: "20 人包棟住哪裡", emoji: "", tags: ["包棟", "20人"] },
    { slug: "kaohsiung-30-person-stay", title: "30 人大團體攻略", emoji: "", tags: ["包棟", "30人"] },
    { slug: "kaohsiung-40-person-stay", title: "40 人超大包棟方案", emoji: "", tags: ["包棟", "40人"] },
    { slug: "kaohsiung-birthday-party-venue", title: "生日派對場地推薦", emoji: "", tags: ["生日", "派對"] },
    { slug: "kaohsiung-bachelorette-party", title: "閨蜜單身派對住宿", emoji: "", tags: ["閨蜜", "單身趴"] },
    { slug: "kaohsiung-parent-child-stay", title: "親子包棟民宿推薦", emoji: "", tags: ["親子", "家庭"] },
    { slug: "kaohsiung-couple-friends-trip", title: "夫妻檔出遊包棟", emoji: "", tags: ["夫妻", "朋友"] },
    { slug: "kaohsiung-company-retreat", title: "員工旅遊住宿推薦", emoji: "", tags: ["員旅", "企業"] },
    { slug: "kaohsiung-class-reunion", title: "同學會包棟聚會", emoji: "", tags: ["同學會", "聚會"] },
    { slug: "kaohsiung-church-group-stay", title: "教會團契住宿推薦", emoji: "", tags: ["教會", "團契"] },
    { slug: "kaohsiung-whole-floor-rental", title: "包層住宿推薦", emoji: "", tags: ["包層", "小團體"] },
    { slug: "kaohsiung-hotpot-gathering", title: "煮火鍋包棟推薦", emoji: "", tags: ["火鍋", "廚房"] },
    { slug: "kaohsiung-board-game-stay", title: "桌遊民宿推薦", emoji: "", tags: ["桌遊", "娛樂"] },
    { slug: "kaohsiung-party-stay", title: "派對包棟推薦", emoji: "", tags: ["派對", "包棟"] },
    { slug: "kaohsiung-netflix-stay", title: "Netflix 電視民宿", emoji: "", tags: ["Netflix", "雨天"] },
    { slug: "kaohsiung-self-checkin-bnb", title: "密碼鎖自助入住", emoji: "", tags: ["自助入住", "密碼鎖"] },
    { slug: "pier2-one-day-itinerary", title: "駁二一日遊攻略", emoji: "", tags: ["駁二", "行程"] },
    { slug: "dagangqiao-attraction-guide", title: "大港橋周邊景點", emoji: "", tags: ["大港橋", "景點"] },
    { slug: "yancheng-night-guide", title: "鹽埕夜生活攻略", emoji: "", tags: ["鹽埕", "酒吧"] },
    { slug: "yancheng-breakfast-guide", title: "鹽埕早餐 Top 10", emoji: "", tags: ["鹽埕", "早餐"] },
    { slug: "kaohsiung-bnb-vs-hotel", title: "包棟與飯店比較", emoji: "", tags: ["比較", "攻略"] },
    { slug: "kaohsiung-legal-bnb", title: "合法民宿安全指南", emoji: "", tags: ["合法", "安全"] },
    { slug: "kaohsiung-bnb-price-guide", title: "包棟價格攻略", emoji: "", tags: ["價格", "攻略"] },
    { slug: "kaohsiung-mid-autumn-bbq", title: "中秋包棟烤肉攻略", emoji: "", tags: ["中秋", "包棟"] },
    { slug: "kaohsiung-christmas-party", title: "聖誕派對場地推薦", emoji: "", tags: ["聖誕", "派對"] },
    { slug: "kaohsiung-2-day-itinerary", title: "兩天一夜行程推薦", emoji: "", tags: ["行程", "兩天一夜"] },
    { slug: "kaohsiung-3-day-itinerary", title: "三天兩夜深度旅遊", emoji: "", tags: ["行程", "三天兩夜"] },
    { slug: "kaohsiung-train-trip-stay", title: "搭火車玩高雄攻略", emoji: "", tags: ["交通", "火車"] },
];

function getRelatedByTags(current: string, currentTags: string[]): ArticleInfo[] {
    const scheduledSlugs = new Set(scheduledArticles.map((article) => article.slug));
    const publishedScheduledSlugs = new Set(getPublishedArticles(scheduledArticles).map((article) => article.slug));
    return allArticles
        .filter((article) => article.slug !== current && (!scheduledSlugs.has(article.slug) || publishedScheduledSlugs.has(article.slug)))
        .map((article) => ({ ...article, score: article.tags.filter((tag) => currentTags.includes(tag)).length }))
        .sort((a, b) => b.score - a.score);
}

export default function RelatedArticles({ current, currentTags, count = 4 }: { current: string; currentTags?: string[]; count?: number }) {
    const tags = currentTags || allArticles.find((article) => article.slug === current)?.tags || [];
    const related = getRelatedByTags(current, tags).slice(0, count);

    if (related.length === 0) return null;

    return (
        <section className="article-related">
            <p className="article-kicker">RELATED ARTICLES</p>
            <div className="article-related__list">
                {related.map((article) => (
                    <Link key={article.slug} href={`/blog/${article.slug}`}>
                        <span>{article.title}</span>
                    </Link>
                ))}
            </div>
            <div className="article-related__footer">
                <Link href="/blog">瀏覽所有攻略</Link>
            </div>
        </section>
    );
}
