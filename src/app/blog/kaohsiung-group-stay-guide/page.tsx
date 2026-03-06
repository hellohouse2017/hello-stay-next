import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
    title: "2026 高雄包棟民宿完全攻略｜6-48人怎麼選？",
    description: "從人數、預算、設備到地點，在地經營8年的民宿主人手把手教你挑選高雄包棟民宿。涵蓋鹽埕、駁二、西子灣熱門地段分析。",
    alternates: { canonical: "https://www.hello-stay.com/blog/kaohsiung-group-stay-guide" },
};

const sections = [
    {
        id: "why",
        title: "為什麼選包棟而不是飯店？",
        content: `團體出遊選飯店，通常會遇到幾個問題：房間分散在不同樓層，聚會要到大廳喬時間，想煮宵夜沒廚房。包棟民宿解決了所有問題 — 整棟房子就是你們的，想聚在客廳打麻將到半夜都可以。

包棟民宿的優勢：
• 整棟獨立使用，不受其他住客干擾
• 共用客廳、廚房，團體互動更密切
• 通常比等量飯店房間便宜（平均每人 $800-$1,500）
• 設備更多元：麻將、桌遊、中島廚房等
• 更有「家」的感覺，適合家族旅遊`,
    },
    {
        id: "capacity",
        title: "各人數怎麼挑？從 6 人到 48 人完整對照",
        content: `6-12 人（小團體 / 家庭）
推薦溝頂民宿：整棟五層樓獨立使用，平日 $10,000 起，平均每人只要 $1,000。有麻將、獨立衛浴，非常適合帶長輩的家庭旅遊。

13-26 人（中團體 / 企業）
推薦你好哇寓所：6 間房彈性配置，配備豪華中島廚房可煮火鍋、桌遊同樂設備、麻將。曾是綜藝玩很大等節目的拍攝場地。

27-38 人（大團體）
推薦你好哇 + 溝頂合訂：兩棟僅距 30 公尺，各有獨立空間又能串場。非常適合婚禮迎娶、大家族旅遊。

39-48 人（超大團體）
推薦大智若愚：Hello Stay 第三館，全新電梯民宿，位於大港橋旁。一層三房一廳，可包層可包棟。2026 年即將開幕。`,
    },
    {
        id: "facilities",
        title: "包棟民宿該有的設備清單",
        content: `選包棟民宿時，建議確認以下設備：

必備設備 ✅
• 獨立衛浴（共用衛浴會排隊排到崩潰）
• 冷氣（高雄的夏天沒有冷氣會融化）
• Wi-Fi（現在沒網路等於沒呼吸）
• 電子鎖（方便自助入住，不用配鑰匙）

加分設備 ⭐
• 中島廚房（包棟聚餐的靈魂！煮火鍋、做早餐）
• 麻將（長輩開心，年輕人也愛）
• 桌遊（放鬆同樂，增進感情）
• Netflix 電視（雨天備案）
• 洗衣機（多天旅遊必須）
• 製冰機（球隊冰敷、派對調酒）

你好哇寓所以上設備全部都有。`,
    },
    {
        id: "location",
        title: "高雄包棟民宿地點怎麼選？",
        content: `鹽埕區（最推薦 ⭐）
優勢：步行到駁二藝術特區（10分鐘）、大港橋（8分鐘）、棧貳庫（15分鐘）。鹽埕區本身就是美食一級戰區，港園牛肉麵、鴨肉珍、阿囉哈滷味步行可達。捷運鹽埕埔站步行5分鐘。
適合：所有類型的團體旅遊

西子灣 / 哈瑪星
優勢：靠近海邊，有夕陽景觀
劣勢：餐飲選擇較少，離市區較遠

前鎮 / 夢時代
優勢：靠近百貨商圈
劣勢：離觀光景點較遠，缺少文化氣息

左營 / 高鐵站
優勢：靠近高鐵站，交通方便
劣勢：離駁二等熱門景點較遠`,
    },
    {
        id: "booking",
        title: "訂房小撇步：怎麼訂最便宜？",
        content: `1. 官方直訂最划算
透過民宿官網或 LINE 官方帳號訂房，免收平台手續費（AsiaYo、Booking 平台抽成 15-20%）。

2. 平日比假日便宜 30-50%
週日到週四是平日價，可省下不少預算。如果時間彈性，平日出遊 CP 值最高。

3. 提早訂有優勢
熱門日期（連假、過年）通常 2-3 個月前就被訂滿。越早訂越有機會拿到理想日期。

4. 人數越多越划算
包棟民宿是固定總價，人數越多平均每人越便宜。20 人包棟你好哇寓所，每人不到 $1,000。

Hello Stay 官方預訂管道：
• 官網：www.hello-stay.com/book
• LINE：@hellostay（免費加入）`,
    },
    {
        id: "checklist",
        title: "入住前確認清單",
        content: `訂房前確認 📋
□ 包棟人數上限（別超訂！超出會加收費用）
□ 入住 / 退房時間
□ 停車場位置與費用
□ 押金金額與退還方式
□ 寵物是否可攜帶
□ 取消政策

入住時準備 🎒
□ 身分證或護照（登記用）
□ 押金現金
□ 食材/酒水（如果有廚房的話）
□ 桌遊/紙牌（加碼娛樂）

退房前確認 🧹
□ 廚房恢復原貌
□ 垃圾集中
□ 檢查有沒有遺失物品
□ 冷氣、燈光關閉`,
    },
];

export default function ArticlePage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "#FAF8F5", minHeight: "100vh" }}>
            <JsonLd data={[
                {
                    "@context": "https://schema.org", "@type": "Article",
                    headline: "2026 高雄包棟民宿完全攻略｜6-48人怎麼選？",
                    description: "從人數、預算、設備到地點，在地經營8年的民宿主人手把手教你挑選高雄包棟民宿。",
                    author: { "@type": "Organization", name: "Hello Stay 你好哇寓所", url: "https://www.hello-stay.com" },
                    publisher: { "@type": "Organization", name: "Hello Stay", url: "https://www.hello-stay.com" },
                    datePublished: "2026-03-01", dateModified: "2026-03-06",
                    mainEntityOfPage: "https://www.hello-stay.com/blog/kaohsiung-group-stay-guide",
                    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#why", "#capacity", "#booking"] },
                },
                {
                    "@context": "https://schema.org", "@type": "FAQPage",
                    mainEntity: [
                        { "@type": "Question", name: "高雄包棟民宿怎麼選？", acceptedAnswer: { "@type": "Answer", text: "選包棟民宿要看：人數容量、設備（廚房、麻將桌、桌遊）、地點（建議鹽埕區，近駁二和捷運）、價格（官方直訂最划算）。推薦 Hello Stay，6-48人彈性方案，Google評價4.9星。" } },
                        { "@type": "Question", name: "高雄包棟民宿一晚多少錢？", acceptedAnswer: { "@type": "Answer", text: "溝頂民宿平日$10,000起（10人），你好哇寓所依人數$12,000-$28,000。平均每人$800-$1,500，比飯店便宜且設備更豐富。" } },
                        { "@type": "Question", name: "高雄包棟民宿推薦哪個區域？", acceptedAnswer: { "@type": "Answer", text: "最推薦鹽埕區：步行到駁二10分鐘、大港橋8分鐘，就是美食一級戰區，捷運鹽埕埔站也才走5分鐘。所有觀光景點一網打盡。" } },
                    ],
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: "高雄包棟攻略", href: "/blog/kaohsiung-group-stay-guide" }]} />

                <Reveal>
                    <div style={{ marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#C8AD7F", marginBottom: "12px" }}>2026-03-01</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>
                            高雄包棟民宿完全攻略<br />6-48 人怎麼選？
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "#C8AD7F", margin: "20px 0" }} />
                        <p style={{ fontSize: "0.85rem", color: "#999", lineHeight: 1.9 }}>
                            在地經營 8 年的民宿主人，手把手教你挑選高雄包棟。
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
