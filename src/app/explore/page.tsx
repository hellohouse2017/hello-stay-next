import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
    title: "周邊探索 | 景點・美食・行程推薦 | 你好哇寓所 & 溝頂民宿",
    description: "鹽埕區周邊景點、美食地圖與行程推薦。駁二、大港橋、西子灣、旗津，30+ 間必吃老店，9 條主題行程一次看。",
};

/* ── Data ── */
const attractions = [
    { name: "駁二藝術特區", dist: "步行 10 分", desc: "高雄最知名藝術園區，創意裝置與週末市集" },
    { name: "高雄大港橋", dist: "步行 8 分", desc: "全台首座水平旋轉橋，下午 3 點有開合秀" },
    { name: "高雄流行音樂中心", dist: "步行 12 分", desc: "前衛蜂巢建築，愛河灣最耀眼地標" },
    { name: "棧貳庫 KW2", dist: "步行 15 分", desc: "百年碼頭倉庫，純白旋轉木馬與無敵海景" },
    { name: "哈瑪星鐵道文化園區", dist: "步行 12 分", desc: "大草皮、舊鐵軌，親子放風箏野餐好去處" },
    { name: "西子灣風景區", dist: "捷運 10 分", desc: "高雄賞夕陽首選，坐在防波堤聽海浪" },
    { name: "打狗英國領事館", dist: "捷運 15 分", desc: "紅磚英式建築，俯瞰西子灣海景配下午茶" },
    { name: "壽山動物園", dist: "車程 10 分", desc: "全新整修園區，空中漫步長廊與水豚君" },
    { name: "旗津高雄燈塔", dist: "渡輪 15 分", desc: "純白百年燈塔，現有景觀咖啡廳" },
    { name: "旗津彩虹教堂", dist: "渡輪 15 分", desc: "色彩繽紛幾何建築，IG 打卡聖地" },
    { name: "衛武營藝術中心", dist: "捷運橘線直達", desc: "世界最大單一屋頂劇院，榕樹意象建築" },
    { name: "高雄市立美術館", dist: "輕軌直達", desc: "廣闊戶外雕塑公園與湖泊，遠離塵囂" },
    { name: "高雄市立圖書館總館", dist: "輕軌直達", desc: "全球首座懸吊式綠建築，夜晚如珠寶盒" },
    { name: "蓮池潭 龍虎塔", dist: "車程 20 分", desc: "最具代表的傳統景點，入龍喉出虎口" },
];

const foodCategories = [
    {
        title: "鹽埕區熱門酒吧",
        icon: "🍸",
        items: ["廢墟 BAR", "吧嗨 Bar High", "空白酒吧", "大溝頂老街酒場", "港思酒研所", "鼓山老酒吧"],
    },
    {
        title: "經典小吃 & 下酒菜",
        icon: "🍢",
        items: ["阿囉哈滷味", "大溝頂虱目魚", "黃家肉燥飯", "鹹酥雞", "無名攤蚵仔煎", "豆花"],
    },
    {
        title: "特色早餐",
        icon: "🌅",
        items: ["大摳胖碳烤三明治", "鄧記肉圓", "阿昌虱目魚"],
    },
    {
        title: "必吃正餐",
        icon: "🥘",
        items: ["港園牛肉麵", "鴨肉珍 / 鴨肉本", "Kyomo Pasta", "葉家肉粥", "銀座日本料理", "阿進切仔麵", "小堤咖啡", "新濱・駅前", "高雄婆婆冰"],
    },
    {
        title: "夜市推薦",
        icon: "🏮",
        items: ["鹽埕夜市", "六合夜市", "瑞豐夜市"],
    },
    {
        title: "生活便利",
        icon: "🏪",
        items: ["自助洗衣店", "全聯福利中心", "全家便利商店", "7-11", "菸酒專賣"],
    },
];

const itineraries = [
    {
        days: "2天1夜", plans: [
            { name: "親子放電", emoji: "👶", desc: "駁二小火車 → 港園牛肉麵 → 壽山動物園" },
            { name: "網美打卡", emoji: "📸", desc: "大港橋旋轉秀 → Pier No.1 高空酒吧 → 民宿 KTV" },
            { name: "吃貨攻略", emoji: "🍜", desc: "奶茶一條街 → 鴨肉珍 → 阿囉哈滷味 → 阿綿麻糬" },
        ]
    },
    {
        days: "3天2夜", plans: [
            { name: "文化慢旅", emoji: "🏛️", desc: "鹽埕老街 → 愛河貢多拉 → 打狗英國領事館 → 中島廚房" },
            { name: "海港風情", emoji: "⛴️", desc: "駁二倉庫群 → 渡輪旗津 → 高雄燈塔 → 流行音樂中心" },
            { name: "輕鬆休閒", emoji: "☕", desc: "睡飽 → Kyomo Pasta → 新濱・駅前 → 滿足賦歸" },
        ]
    },
    {
        days: "4天3夜", plans: [
            { name: "港都全覽", emoji: "🌊", desc: "旗津一日遊 → 西子灣夕陽 → 龍貓隧道 → 瑞豐夜市" },
            { name: "藝文深度", emoji: "🎨", desc: "駁二 VR → 衛武營 → 高雄美術館 → 內惟藝術中心" },
            { name: "購物血拼", emoji: "🛍️", desc: "新崛江 → SKM Park Outlets → 漢神巨蛋 → 義享天地" },
        ]
    },
];

export default function ExplorePage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "#FAF8F5", minHeight: "100vh" }}>
            <div className="w" style={{ maxWidth: "780px", padding: "0 28px 80px" }}>

                {/* Header */}
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "50px" }}>
                        <div style={labelEn}>Explore Kaohsiung</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>
                            周邊探索
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "#C8AD7F", margin: "20px auto" }} />
                        <p style={{ fontSize: "0.85rem", color: "#999", lineHeight: 1.9 }}>
                            景點 · 美食 · 主題行程  ─  步出門就開始旅行
                        </p>
                    </div>
                </Reveal>

                {/* ─── 景點 ─── */}
                <Reveal>
                    <section style={cardStyle}>
                        <SectionLabel en="Nearby Attractions" />
                        <h2 style={h2Style}>🗺️ 周邊景點</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            {attractions.map(a => (
                                <div key={a.name} style={{
                                    padding: "16px 14px", background: "#FAF8F5", borderRadius: "12px",
                                }}>
                                    <div style={{ fontFamily: "var(--serif)", fontSize: "0.92rem", color: "#3D3830", marginBottom: "4px" }}>{a.name}</div>
                                    <div style={{ fontSize: "0.7rem", color: "#C8AD7F", marginBottom: "6px", fontWeight: 500 }}>{a.dist}</div>
                                    <div style={{ fontSize: "0.75rem", color: "#999", lineHeight: 1.7 }}>{a.desc}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </Reveal>

                {/* ─── 美食 ─── */}
                <Reveal>
                    <section style={cardStyle}>
                        <SectionLabel en="Local Food Map" />
                        <h2 style={h2Style}>🍽️ 鹽埕美食地圖</h2>
                        <p style={{ fontSize: "0.82rem", color: "#999", lineHeight: 1.9, marginBottom: "20px" }}>
                            住在美食的中心點！從早餐虱目魚到深夜特色酒吧，走路就能吃遍米其林推薦與在地人私藏名單。推薦外帶回民宿中島廚房，吹冷氣享受包棟聚餐。
                        </p>
                        <div style={{ display: "grid", gap: "16px" }}>
                            {foodCategories.map(cat => (
                                <div key={cat.title}>
                                    <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#3D3830", marginBottom: "10px" }}>
                                        {cat.icon} {cat.title}
                                    </div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                        {cat.items.map(item => (
                                            <span key={item} style={{
                                                padding: "6px 14px", borderRadius: "20px", background: "#FAF8F5",
                                                fontSize: "0.78rem", color: "#666",
                                            }}>{item}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </Reveal>

                {/* ─── 行程推薦 ─── */}
                <Reveal>
                    <section style={cardStyle}>
                        <SectionLabel en="Recommended Itineraries" />
                        <h2 style={h2Style}>📋 主題行程推薦</h2>
                        <div style={{ display: "grid", gap: "24px" }}>
                            {itineraries.map(group => (
                                <div key={group.days}>
                                    <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "12px" }}>
                                        {group.days}
                                    </div>
                                    <div style={{ display: "grid", gap: "10px" }}>
                                        {group.plans.map(p => (
                                            <div key={p.name} style={{
                                                display: "flex", gap: "14px", alignItems: "flex-start",
                                                padding: "16px", background: "#FAF8F5", borderRadius: "12px",
                                            }}>
                                                <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{p.emoji}</span>
                                                <div>
                                                    <div style={{ fontFamily: "var(--serif)", fontSize: "0.9rem", color: "#3D3830", marginBottom: "4px" }}>{p.name}</div>
                                                    <div style={{ fontSize: "0.78rem", color: "#999", lineHeight: 1.7 }}>{p.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </Reveal>

                {/* CTA */}
                <Reveal>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <p style={{ fontSize: "0.85rem", color: "#999", marginBottom: "20px" }}>
                            住在最好的位置，開啟你的高雄旅行
                        </p>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/book" style={ctaDark}>查詢空房</Link>
                            <Link href="/traffic" style={ctaOutline}>交通停車</Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}

/* ── Shared ── */
const labelEn: React.CSSProperties = { fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "12px" };
const cardStyle: React.CSSProperties = { background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" };
const h2Style: React.CSSProperties = { fontFamily: "var(--serif)", fontSize: "1.2rem", color: "#3D3830", marginBottom: "20px" };
const ctaDark: React.CSSProperties = { padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" };
const ctaOutline: React.CSSProperties = { padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" };

function SectionLabel({ en }: { en: string }) {
    return <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#BEB5A8", marginBottom: "14px" }}>{en}</div>;
}
