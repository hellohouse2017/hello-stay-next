import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
    title: "2026 高雄包棟民宿推薦｜在地人精選 Top 3 包棟住宿",
    description: "高雄包棟民宿怎麼選？在地經營8年的民宿主人推薦鹽埕區你好哇寓所、溝頂民宿、大智若愚，6-48人包棟方案，附設中島廚房、麻將桌、桌遊。高雄團體住宿、家族旅遊住宿首選。",
    alternates: { canonical: "https://www.hello-stay.com/blog/kaohsiung-bnb-recommendation" },
};

const sections = [
    {
        id: "why-kaohsiung",
        title: "為什麼高雄包棟民宿越來越受歡迎？",
        content: `近兩年「高雄包棟民宿」的搜尋量持續成長，原因很簡單：比起飯店，包棟民宿讓團體旅遊更自由、更有溫度。整棟獨立使用，不用擔心打擾其他住客，客廳、廚房、麻將桌都是你們的。

高雄包棟推薦的幾個關鍵理由：
• 整棟獨立使用，聚會不受限
• 自帶中島廚房，可煮火鍋 / 做早餐
• 平均每人 $800~$1,500，比飯店划算
• 設備豐富：麻將、桌遊、Netflix、製冰機
• 鹽埕區地段絕佳，步行到駁二、大港橋

如果你正在搜尋「高雄包棟推薦」或「高雄民宿推薦」，這篇從在地經營者的角度，幫你整理最值得入住的三間包棟民宿。`,
    },
    {
        id: "top3",
        title: "高雄包棟民宿推薦 Top 3",
        content: `以下三間都位於高雄鹽埕區，步行可到駁二藝術特區、大港橋，Google 評價都在 4.8 星以上。

🏠 No.1｜你好哇寓所（6-26 人）
• 地點：鹽埕區五福四路，捷運鹽埕埔站步行 5 分鐘
• 特色：豪華中島廚房、全自動麻將桌、桌遊牆、Netflix
• 價格：平日 $12,000 起，20 人平均每人不到 $1,000
• 適合：企業團建、婚禮迎娶、朋友聚會、家族旅遊
• 曾被「綜藝玩很大」等節目選為拍攝場地

🏡 No.2｜溝頂民宿（6-12 人）
• 地點：鹽埕區，距你好哇寓所步行 30 秒
• 特色：五層樓獨棟透天，頂樓露台、獨立衛浴
• 價格：平日 $10,000 起，10 人平均每人 $1,000
• 適合：家庭旅遊、長輩友善、小團體出遊
• 高雄民宿包棟中少見的全棟透天格局

🏢 No.3｜大智若愚（20-48 人）
• 地點：大港橋旁，全新電梯民宿
• 特色：一層三房一廳，可包層可包棟
• 價格：依人數配置，適合超大團體
• 適合：高雄團體住宿、球隊比賽、企業員旅
• 2027 年中開幕，設備最新`,
    },
    {
        id: "yancheng",
        title: "鹽埕民宿為什麼是最佳選擇？",
        content: `搜尋「鹽埕民宿」或「鹽埕包棟」的人越來越多，因為鹽埕區是高雄觀光的黃金地段。

鹽埕區的優勢：
• 步行 10 分鐘到駁二藝術特區
• 步行 8 分鐘到大港橋
• 步行 15 分鐘到棧貳庫
• 捷運鹽埕埔站步行 5 分鐘
• 美食一級戰區：港園牛肉麵、鴨肉珍、阿囉哈滷味

選擇鹽埕包棟的另一個好處是：不用開車就能走到所有景點，團體旅遊不需要煩惱停車問題。Hello Stay 三間民宿都位於鹽埕區核心，徒步就能享受高雄最精華的觀光體驗。`,
    },
    {
        id: "group-stay",
        title: "高雄團體住宿怎麼選？各人數對照表",
        content: `不管你是搜尋「高雄團體住宿」還是「高雄家族旅遊住宿」，選對人數對應的民宿最重要。

6-12 人 → 溝頂民宿
整棟五層樓，獨立衛浴、頂樓露台。適合家庭旅遊、帶長輩出遊。平日每人約 $1,000。

13-26 人 → 你好哇寓所
6 間房彈性配置，中島廚房、麻將、桌遊。適合企業團建、婚禮、朋友聚會。平日每人約 $800。

27-38 人 → 你好哇 + 溝頂合訂
兩棟距離僅 30 公尺，各有獨立空間又能串場。非常適合大家族旅遊、婚禮迎娶。

39-48 人 → 大智若愚
全新電梯民宿，可包層可包棟。適合超大團體住宿、球隊比賽。`,
    },
    {
        id: "family",
        title: "高雄家族旅遊住宿攻略",
        content: `家族旅遊最怕的就是「大家住不同飯店」或「長輩不方便」。高雄家族旅遊住宿選包棟民宿，所有人住在一起，晚上打麻將、聊天、煮宵夜，才是家族旅遊的精髓。

家族旅遊包棟重點：
• 電梯或一樓房型（長輩友善）
• 獨立衛浴（不用排隊）
• 廚房設備（煮早餐、燉湯）
• 麻將桌（長輩最愛）
• 近醫院或藥局（以防萬一）

溝頂民宿特別適合家族旅遊：五層樓透天，長輩住低樓層，年輕人住高樓層，各有空間又能聚在客廳。你好哇寓所則適合大家族（15-26 人），中島廚房可以辦家族圍爐。`,
    },
    {
        id: "how-to-book",
        title: "怎麼訂高雄包棟民宿最划算？",
        content: `1. 官方直訂最便宜
透過民宿官網或 LINE 官方帳號訂房，免收平台手續費。比 Booking、AsiaYo 省 15-20%。

2. 平日價省 30-50%
週日到週四是平日價。時間彈性的話，平日出遊 CP 值最高。

3. 人數越多越划算
包棟是固定總價，20 人包你好哇寓所，每人不到 $1,000。

4. 提早預訂搶熱門日
連假、過年通常 2-3 個月前就被訂滿。

Hello Stay 官方預訂管道：
• 官網查空房：www.hello-stay.com/book
• LINE 官方帳號：@hellostay
• 即時回覆，免費諮詢包棟方案`,
    },
    {
        id: "compare",
        title: "高雄包棟民宿 vs 飯店比較",
        content: `很多人猶豫「到底要訂包棟民宿還是飯店？」以下是實際比較：

                    包棟民宿              飯店
價格（20人）      $12,000-$20,000       $30,000-$50,000
平均每人          $600-$1,000           $1,500-$2,500
客廳              ✅ 共用大客廳          ❌ 沒有
廚房              ✅ 中島廚房            ❌ 沒有
麻將桌            ✅ 全自動              ❌ 要另外租
桌遊              ✅ 免費提供            ❌ 沒有
隱私性            ✅ 整棟獨立            ❌ 與其他旅客共用
停車              ✅ 附近停車場          ⚠️ 飯店停車貴

結論：高雄民宿推薦包棟民宿給所有 6 人以上的團體旅遊、家庭旅遊、企業活動。CP 值高、設備豐富、隱私性好。`,
    },
];

export default function ArticlePage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                {
                    "@context": "https://schema.org", "@type": "Article",
                    headline: "2026 高雄包棟民宿推薦｜在地人精選 Top 3 包棟住宿",
                    description: "高雄包棟民宿怎麼選？在地經營8年的民宿主人推薦鹽埕區三間包棟，6-48人方案，中島廚房、麻將桌、桌遊。",
                    author: { "@type": "Organization", name: "Hello Stay 你好哇寓所", url: "https://www.hello-stay.com" },
                    publisher: { "@type": "Organization", name: "Hello Stay", url: "https://www.hello-stay.com" },
                    datePublished: "2026-03-15", dateModified: "2026-03-15",
                    mainEntityOfPage: "https://www.hello-stay.com/blog/kaohsiung-bnb-recommendation",
                    image: "https://www.hello-stay.com/images/cover-bg.webp",
                    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#top3", "#how-to-book"] },
                },
                {
                    "@context": "https://schema.org", "@type": "FAQPage",
                    mainEntity: [
                        { "@type": "Question", name: "高雄包棟民宿推薦哪幾間？", acceptedAnswer: { "@type": "Answer", text: "推薦鹽埕區三間包棟民宿：你好哇寓所（6-26人，中島廚房、麻將桌）、溝頂民宿（6-12人，五層獨棟透天）、大智若愚（20-48人，全新電梯民宿）。Google評價4.8星以上，平均每人$800-$1,500。" } },
                        { "@type": "Question", name: "高雄包棟民宿一晚多少錢？", acceptedAnswer: { "@type": "Answer", text: "溝頂民宿平日$10,000起（10人平均$1,000/人），你好哇寓所平日$12,000起（20人平均$600/人）。官方直訂比平台便宜15-20%。" } },
                        { "@type": "Question", name: "高雄團體住宿怎麼選？", acceptedAnswer: { "@type": "Answer", text: "6-12人選溝頂民宿，13-26人選你好哇寓所，27-38人兩棟合訂，39-48人選大智若愚。都在鹽埕區，步行到駁二10分鐘。" } },
                        { "@type": "Question", name: "鹽埕民宿推薦哪間？", acceptedAnswer: { "@type": "Answer", text: "鹽埕區最推薦Hello Stay旗下三間包棟民宿。位於鹽埕核心地段，步行到駁二、大港橋、棧貳庫，美食步行可達，捷運鹽埕埔站5分鐘。" } },
                        { "@type": "Question", name: "高雄家族旅遊住宿推薦什麼？", acceptedAnswer: { "@type": "Answer", text: "家族旅遊推薦包棟民宿，全家住一起打麻將。10人以下選溝頂民宿（透天格局長輩友善），15人以上選你好哇寓所（中島廚房可辦圍爐）。" } },
                    ],
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: "高雄包棟民宿推薦", href: "/blog/kaohsiung-bnb-recommendation" }]} />

                <Reveal>
                    <div style={{ marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--pri)", marginBottom: "12px" }}>2026-03-15</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>
                            高雄包棟民宿推薦<br />在地人精選 Top 3 包棟住宿
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px 0" }} />
                        <p style={{ fontSize: "0.85rem", color: "#999", lineHeight: 1.9 }}>
                            在地經營 8 年的民宿主人，精選高雄鹽埕區最值得入住的包棟民宿。
                        </p>
                    </div>
                </Reveal>

                {sections.map(sec => (
                    <Reveal key={sec.id}>
                        <section id={sec.id} style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px", letterSpacing: "0.04em" }}>
                                {sec.title}
                            </h2>
                            <div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2.2, whiteSpace: "pre-line" }}>
                                {sec.content}
                            </div>
                        </section>
                    </Reveal>
                ))}

                <Reveal>
                    <section style={{ background: "linear-gradient(135deg, #2a2a2a 0%, #3D3830 100%)", borderRadius: "16px", padding: "36px 28px", marginBottom: "20px", textAlign: "center" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--pri)", marginBottom: "12px" }}>BOOK NOW</div>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", color: "#fff", marginBottom: "8px", letterSpacing: "0.06em" }}>
                            立即查詢高雄包棟民宿空房
                        </h2>
                        <p style={{ fontSize: "0.82rem", color: "#A09282", lineHeight: 1.8, marginBottom: "24px" }}>
                            官方直訂最划算，免平台手續費
                        </p>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "var(--pri)", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link>
                            <Link href="https://lin.ee/atCiMQw" target="_blank" rel="noreferrer" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid var(--pri)", color: "var(--pri)", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>LINE 諮詢</Link>
                        </div>
                    </section>
                </Reveal>

                <RelatedArticles current="kaohsiung-bnb-recommendation" currentTags={["包棟", "民宿", "推薦", "攻略"]} />

                <Reveal>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
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
