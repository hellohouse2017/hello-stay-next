import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
    title: "高雄畢業旅行包棟推薦｜學生畢旅住宿・班遊・系隊比賽",
    description: "高雄畢旅住包棟民宿最划算！20人平均每人不到$1,000，有麻將、桌遊桌、廚房可煮宵夜。走路到駁二，捷運到西子灣旗津。",
    alternates: { canonical: "https://www.hello-stay.com/blog/kaohsiung-graduation-trip" },
};

const sections = [
    {
        id: "why", title: "為什麼學生畢旅選包棟？", content: `畢旅就是要一群人瘋在一起，飯店做不到的事，包棟民宿全部可以：

• 不分房 — 整棟都是你們的，想聚在客廳聊到天亮都行
• 桌遊同樂 — 麻將、撲克牌、UNO 等，民宿通通有
• 煮宵夜 — 半夜肚子餓？廚房煮泡麵、火鍋都可以
• 打麻將 — 麻將！不用帶牌
• 超便宜 — 20 人平均每人不到 $1,000
• 拍照打卡 — 網美房型、中島廚房、老巷弄都是場景` },
    {
        id: "plan", title: "畢旅 3 天 2 夜推薦行程", content: `Day 1 — 集合出發
14:00  入住你好哇，分配房間
15:00  徒步駁二（10分鐘）→ 倉庫群、小火車、大港橋
17:00  大港橋旋轉秀（整點開）
18:00  鹽埕夜市覓食 → 鴨肉珍、港園牛肉麵
20:00  回民宿 → 桌遊大亂鬥 🎤
23:00  廚房煮泡麵宵夜

Day 2 — 旗津放風
09:00  大摳胖碳烤三明治（早餐外帶回民宿吃）
10:00  捷運 → 西子灣渡輪 → 旗津
11:00  旗津老街吃海鮮
13:00  彩虹教堂 + 海邊踩浪
15:00  旗津燈塔看夕陽
17:00  回民宿
18:00  全聯採買 → 中島廚房煮火鍋 🍲
21:00  通宵麻將 + 桌遊 + Netflix

Day 3 — 最後巡禮
09:00  睡到自然醒
10:00  棧貳庫旋轉木馬 + 逛逛
11:00  退房 → 阿綿麻糬買伴手禮 → 返程` },
    {
        id: "budget", title: "學生預算攻略", content: `住宿（以 20 人為例）
• 你好哇寓所 2 晚：約 $40,000-$50,000
• 每人分攤：約 $2,000-$2,500 / 2 晚

餐費
• 路邊攤 / 小吃：每餐 $80-$150
• 自煮火鍋：全聯採買每人約 $150
• 3 天 2 夜餐費每人約 $600-$800

交通
• 高鐵學生票（台北→左營）：約 $1,180
• 捷運一日卡：$150
• 旗津渡輪：$40

總計每人約：$4,000-$4,500（含交通、住宿、餐費）
比去日本便宜太多了！` },
    {
        id: "tips", title: "畢旅小提醒", content: `⚠️ 噪音管理
23:00 後降低音量，位於住宅區。

⚠️ 押金 $5,000
退房後確認無損壞全數退還。大家一起注意設備即可。

⚠️ 禁止事項
室內禁煙、禁止攜帶寵物（除非事先申請）、禁止使用明火（瓦斯爐）。

✅ 建議事項
• 提早 1-2 個月訂房（畢旅旺季搶很快）
• 選平日（週日-四）更便宜
• 帶拉炮、氣球、道具增加趣味
• 準備桌遊帶來玩` },
];

export default function GraduationPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                { "@context": "https://schema.org", "@type": "Article", headline: "高雄畢業旅行包棟推薦", author: { "@type": "Organization", name: "Hello Stay" }, publisher: { "@type": "Organization", name: "Hello Stay" }, datePublished: "2026-03-06", mainEntityOfPage: "https://www.hello-stay.com/blog/kaohsiung-graduation-trip", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#why", "#plan"] } },
                {
                    "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                        { "@type": "Question", name: "高雄畢業旅行住哪裡便宜又好玩？", acceptedAnswer: { "@type": "Answer", text: "推薦你好哇寓所包棟民宿，20人每人不到$1,000/晚。有麻將、桌遊桌、廚房可煮宵夜。走路10分鐘到駁二，捷運可到旗津、西子灣。3天2夜含交通住宿餐費每人約$4,000-$4,500。" } },
                        { "@type": "Question", name: "高雄畢旅3天2夜行程怎麼排？", acceptedAnswer: { "@type": "Answer", text: "Day1：駁二+大港橋+桌遊之夜。Day2：旗津一日遊+中島廚房火鍋趴。Day3：棧貳庫+伴手禮。住包棟民宿，晚上不用趕回飯店，想玩到多晚都可以。" } },
                    ]
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: "畢業旅行包棟", href: "/blog/kaohsiung-graduation-trip" }]} />
                <Reveal><div style={{ marginBottom: "40px" }}><div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--pri)", marginBottom: "12px" }}>2026-03-06</div><h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>高雄畢業旅行包棟推薦<br />學生畢旅・班遊住宿首選</h1><div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px 0" }} /></div></Reveal>
                {sections.map(s => (<Reveal key={s.id}><section id={s.id} style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}><h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>{s.title}</h2><div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2.2, whiteSpace: "pre-line" }}>{s.content}</div></section></Reveal>))}
                <RelatedArticles current="kaohsiung-graduation-trip" />
                <Reveal><div style={{ textAlign: "center", marginTop: "20px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}><Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link><Link href="/blog" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>更多攻略</Link></div></Reveal>
            </div>
        </div>
    );
}
