import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
    title: "高雄團體旅遊行程推薦｜2-4 天懶人包 9 種主題",
    description: "親子放電、網美打卡、吃貨攻略、文化慢旅...9 種主題行程，從 2 天 1 夜到 4 天 3 夜全規劃。住包棟民宿搭配周邊景點美食。",
    alternates: { canonical: "https://www.hello-stay.com/blog/kaohsiung-group-trip" },
};

const itineraries = [
    {
        days: "2 天 1 夜",
        plans: [
            {
                name: "👶 親子放電",
                day1: "抵達 → 入住民宿 → 駁二小火車 + 哈瑪星鐵道園區 → 港園牛肉麵（午餐）→ 壽山動物園（水豚君、空中步道）→ 回民宿中島廚房煮晚餐 → 客廳桌遊時光",
                day2: "早餐外帶大摳胖碳烤三明治 → 棧貳庫旋轉木馬 → 大港橋水上旋轉秀（15:00）→ 退房返程",
                tips: "小孩推車可推行，駁二步道平坦。壽山動物園建議平日前往避開排隊。",
            },
            {
                name: "📸 網美打卡",
                day1: "抵達 → 大港橋拍照 → 駁二大義倉庫群（彩繪牆）→ 新濱・駅前日式老屋咖啡 → 入住你好哇打卡網美吊椅房 → 廢墟 BAR 微醺之夜",
                day2: "高雄流行音樂中心拍建築 → Kyomo Pasta 午餐 → 棧貳庫白色旋轉木馬 → 退房",
                tips: "下午光線最適合拍照。吊椅房型建議提早預訂。",
            },
            {
                name: "🍜 吃貨攻略",
                day1: "抵達 → 鴨肉珍（午餐）→ 高雄婆婆冰 → 入住 → 中島廚房自煮火鍋趴 → 阿囉哈滷味宵夜 → 大溝頂老街酒場小酌",
                day2: "阿昌虱目魚（早餐）→ 黃家肉燥飯 → 阿綿麻糬（伴手禮）→ 退房返程",
                tips: "建議帶保冷袋，可到全聯採買火鍋料回民宿廚房料理。",
            },
        ],
    },
    {
        days: "3 天 2 夜",
        plans: [
            {
                name: "🏛️ 文化慢旅",
                day1: "抵達 → 鹽埕老街散步 → 小堤咖啡（40年老店）→ 入住 → 愛河貢多拉夜遊",
                day2: "打狗英國領事館（俯瞰西子灣）→ 旗津渡輪 → 旗津老街午餐 → 旗津燈塔咖啡廳 → 回民宿 桌遊同樂 → 空白酒吧",
                day3: "衛武營藝術中心 → 午餐 → 退房返程",
                tips: "旗津渡輪可刷 iPass 一卡通，假日排隊約 15 分鐘。",
            },
            {
                name: "⛴️ 海港風情",
                day1: "抵達 → 駁二倉庫群 → VR 體驗 → 入住 → 大港橋夜景散步",
                day2: "渡輪旗津 → 旗津彩虹教堂 + 海水浴場 → 高雄燈塔 → 回程 → 民宿火鍋聚餐",
                day3: "高雄流行音樂中心 → 棧貳庫午餐 → 退房",
                tips: "夏天旗津海水浴場可玩水，記得帶防曬。",
            },
            {
                name: "☕ 輕鬆休閒",
                day1: "睡飽 → 大摳胖碳烤三明治（午餐）→ 入住 → 駁二慢慢逛 → 民宿麻將之夜",
                day2: "睡到自然醒 → Kyomo Pasta 午餐 → 壽山看夕陽 → 新濱・駅前下午茶 → 廢墟 BAR",
                day3: "葉家肉粥早餐 → 阿綿麻糬伴手禮 → 退房",
                tips: "不趕行程的旅行最幸福。包棟民宿的好處就是隨時可以回去休息。",
            },
        ],
    },
    {
        days: "4 天 3 夜",
        plans: [
            {
                name: "🌊 港都全覽",
                day1: "抵達 → 入住 → 鹽埕老街美食巡禮 → 愛河夜景",
                day2: "旗津一日遊（渡輪→燈塔→海產→彩虹教堂）→ 西子灣夕陽 → 晚餐",
                day3: "駁二全日（倉庫群→大港橋→棧貳庫→流行音樂中心）→ 民宿 桌遊之夜",
                day4: "壽山動物園或瑞豐夜市 → 退房返程",
                tips: "四天三夜最完整！建議第二天租機車遊旗津。",
            },
            {
                name: "🎨 藝文深度",
                day1: "抵達 → 駁二 VR 體驗館 → 大義倉庫群藝廊 → 入住",
                day2: "衛武營藝術中心（世界最大單一屋頂劇院）→ 高雄市立美術館 → 內惟藝術中心",
                day3: "高雄市立圖書館總館（懸吊式綠建築）→ 紅毛港文化園區 → 民宿聚餐",
                day4: "哈瑪星鐵道園區 → 打狗領事館 → 退房",
                tips: "衛武營可提前買演出票，有不定期國際級表演。",
            },
            {
                name: "🛍️ 購物血拼",
                day1: "抵達 → 入住 → 新崛江商圈 → 六合夜市",
                day2: "SKM Park Outlets（全日）→ 義享天地晚餐",
                day3: "漢神巨蛋百貨 → 瑞豐夜市 → 回民宿打麻將",
                day4: "鹽埕老街最後巡禮 → 阿綿麻糬伴手禮 → 退房",
                tips: "SKM Park Outlets 有接駁車，建議安排半天以上。",
            },
        ],
    },
];

export default function TripGuidePage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "#FAF8F5", minHeight: "100vh" }}>
            <JsonLd data={[
                {
                    "@context": "https://schema.org", "@type": "Article",
                    headline: "高雄團體旅遊行程推薦｜2-4天懶人包 9 種主題",
                    description: "親子、網美、吃貨、文化慢旅等9種主題行程，從2天1夜到4天3夜全規劃。搭配包棟民宿住宿。",
                    author: { "@type": "Organization", name: "Hello Stay 你好哇寓所", url: "https://www.hello-stay.com" },
                    publisher: { "@type": "Organization", name: "Hello Stay" },
                    datePublished: "2026-03-05", dateModified: "2026-03-06",
                    mainEntityOfPage: "https://www.hello-stay.com/blog/kaohsiung-group-trip",
                    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", ".intro"] },
                },
                {
                    "@context": "https://schema.org", "@type": "FAQPage",
                    mainEntity: [
                        { "@type": "Question", name: "高雄團體旅遊住哪裡好？", acceptedAnswer: { "@type": "Answer", text: "推薦住鹽埕區的包棟民宿，如Hello Stay你好哇寓所。步行可達駁二、大港橋，附近30+間美食老店。包棟有廚房、麻將桌、桌遊，晚上不用出門也能玩。6-48人彈性方案。" } },
                        { "@type": "Question", name: "高雄親子旅遊2天1夜怎麼排？", acceptedAnswer: { "@type": "Answer", text: "Day1：駁二小火車→港園牛肉麵→壽山動物園→民宿煮晚餐。Day2：大摳胖碳烤三明治→棧貳庫旋轉木馬→大港橋旋轉秀。住包棟民宿小孩可以盡情跑跳不怕吵。" } },
                        { "@type": "Question", name: "高雄3天2夜行程推薦？", acceptedAnswer: { "@type": "Answer", text: "推薦文化慢旅路線：Day1鹽埕老街→愛河貢多拉。Day2打狗英國領事館→旗津渡輪→燈塔咖啡廳→民宿麻將桌遊。Day3衛武營藝術中心。住在鹽埕區的包棟民宿，景點全在步行或捷運範圍內。" } },
                    ],
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: "團體旅遊行程", href: "/blog/kaohsiung-group-trip" }]} />

                <Reveal>
                    <div style={{ marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#C8AD7F", marginBottom: "12px" }}>2026-03-05</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>
                            高雄團體旅遊行程推薦<br />2-4 天懶人包 · 9 種主題
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "#C8AD7F", margin: "20px 0" }} />
                        <p className="intro" style={{ fontSize: "0.88rem", color: "#999", lineHeight: 2 }}>
                            不管是親子出遊、公司旅遊、球隊移地訓練還是大學好友重聚，我們都幫你規劃好了。以包棟民宿為基地，搭配周邊景點與美食，住好吃好玩好。
                        </p>
                    </div>
                </Reveal>

                {itineraries.map(group => (
                    <Reveal key={group.days}>
                        <section style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                            <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "16px" }}>
                                {group.days}
                            </div>

                            <div style={{ display: "grid", gap: "20px" }}>
                                {group.plans.map(plan => (
                                    <div key={plan.name} style={{ padding: "20px", background: "#FAF8F5", borderRadius: "12px" }}>
                                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", color: "#3D3830", marginBottom: "12px" }}>
                                            {plan.name}
                                        </h3>
                                        <div style={{ fontSize: "0.82rem", color: "#666", lineHeight: 2 }}>
                                            <p><strong>Day 1：</strong>{plan.day1}</p>
                                            <p><strong>Day 2：</strong>{plan.day2}</p>
                                            {"day3" in plan && <p><strong>Day 3：</strong>{(plan as { day3: string }).day3}</p>}
                                            {"day4" in plan && <p><strong>Day 4：</strong>{(plan as { day4: string }).day4}</p>}
                                        </div>
                                        <div style={{ marginTop: "10px", padding: "10px 14px", background: "#fff", borderRadius: "8px", fontSize: "0.78rem", color: "#C8AD7F" }}>
                                            💡 {plan.tips}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </Reveal>
                ))}

                <Reveal>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <p style={{ fontSize: "0.85rem", color: "#999", marginBottom: "20px" }}>行程規劃好了，先訂房吧！</p>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link>
                            <Link href="/blog" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>更多攻略</Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
