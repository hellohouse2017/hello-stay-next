import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
    title: "高雄球隊比賽住宿推薦｜系隊・社會隊・比賽包棟民宿",
    description: "高雄球隊比賽住包棟最方便！10-38人團體住宿，有製冰機冰敷、洗衣機洗球衣、廚房補充營養。近捷運到各場館方便。",
    alternates: { canonical: "https://www.hello-stay.com/blog/kaohsiung-sports-team" },
};

const sections = [
    {
        id: "why", title: "球隊比賽為什麼住包棟？", content: `球隊出征住飯店的問題：
❌ 費用爆表 — 一間雙人房 $2,500 × 5 間 = $12,500/晚
❌ 分散管理 — 隊員住不同樓層，集合永遠遲到
❌ 沒辦法討論戰術 — 大廳太公開、房間太小
❌ 冰敷不便 — 需要自帶冰塊或跟櫃台要

包棟民宿完美解決：
✅ 整棟包下 — 全隊住一起，紀律管理方便
✅ 客廳開會 — 戰術討論、賽前鼓勵、賽後檢討
✅ 製冰機 — 無限冰塊冰敷（太重要了！）
✅ 洗衣機 — 多天賽程球衣每天洗
✅ 廚房補給 — 自煮高蛋白餐、碳水補充
✅ 超便宜 — 20 人每人不到 $1,000/晚` },
    {
        id: "venues", title: "高雄常用運動場館交通", content: `從民宿出發（捷運鹽埕埔站 O2）

⚾ 澄清湖棒球場
🚇 捷運+公車約 40 分鐘
🚗 開車約 25 分鐘

🏀 高雄巨蛋
🚇 捷運紅線巨蛋站，約 20 分鐘

⚽ 高雄國家體育場（世運主場館）
🚇 捷運紅線世運站，約 35 分鐘

🏐 高雄市立體育場
🚗 開車約 15 分鐘

🏓 各區體育館
🚇 捷運直達多處` },
    {
        id: "schedule", title: "比賽期間住宿安排", content: `比賽前一天
16:00 入住 + 安頓行李
17:00 客廳戰術會議（55 吋電視可接筆電播戰術影片）
18:00 廚房煮高蛋白晚餐（雞胸肉、蛋、義大利麵）
20:00 製冰機製冰 → 冰桶準備
21:00 各房間深層放鬆 + 伸展
22:00 良好作息，早點睡

比賽當天
06:30 早餐：吐司、蛋、香蕉、牛奶
07:30 集合出發
（比賽）
回到民宿 → 冰敷 + 洗衣機洗球衣 → 開檢討會
晚上：全聯買食材煮火鍋慶功

多天賽程
• 洗衣機每天洗球衣（附烘衣功能）
• 製冰機每日補充冰塊
• 排定睡眠時間表` },
    {
        id: "size", title: "球隊規模方案", content: `12 人以下（系隊 / 社會隊）
→ 溝頂民宿：五層樓獨棟，平日 $10,000
→ 每人 $833/晚

12-26 人（校隊 / 大型社會隊）
→ 你好哇寓所：6 間房 + 大客廳
→ 中島廚房是營養補給站

27-38 人（校隊 + 教練團 + 後勤）
→ 兩棟合訂：選手住一棟、教練住一棟
→ 各有獨立空間

重要設備
• 製冰機：冰敷無限供應
• 洗衣機：多天賽程必備
• 廚房：自煮賽前餐和慶功宴
• 客廳：戰術討論和賽後檢討` },
];

export default function SportsPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                { "@context": "https://schema.org", "@type": "Article", headline: "高雄球隊比賽住宿推薦", author: { "@type": "Organization", name: "Hello Stay" }, publisher: { "@type": "Organization", name: "Hello Stay" }, datePublished: "2026-03-06", mainEntityOfPage: "https://www.hello-stay.com/blog/kaohsiung-sports-team", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#why", "#schedule"] } },
                {
                    "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                        { "@type": "Question", name: "高雄球隊比賽住哪裡？", acceptedAnswer: { "@type": "Answer", text: "推薦包棟民宿，12人溝頂$10,000/晚（每人$833），20人你好哇每人不到$1,000。有製冰機冰敷、洗衣機洗球衣、廚房煮高蛋白餐、客廳戰術討論。近捷運到高雄巨蛋20分鐘、澄清湖棒球場40分鐘。" } },
                        { "@type": "Question", name: "高雄系隊比賽包棟住宿有什麼設備？", acceptedAnswer: { "@type": "Answer", text: "製冰機（冰敷必備）、洗衣機（多天賽程洗球衣）、中島廚房（煮賽前營養餐）、55吋電視可接筆電（播放戰術影片）、客廳可開賽後檢討會。全部免費使用。" } },
                    ]
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: "球隊比賽住宿", href: "/blog/kaohsiung-sports-team" }]} />
                <Reveal><div style={{ marginBottom: "40px" }}><div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--pri)", marginBottom: "12px" }}>2026-03-06</div><h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>高雄球隊比賽住宿推薦<br />系隊・社會隊包棟首選</h1><div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px 0" }} /></div></Reveal>
                {sections.map(s => (<Reveal key={s.id}><section id={s.id} style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}><h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>{s.title}</h2><div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2.2, whiteSpace: "pre-line" }}>{s.content}</div></section></Reveal>))}
                <RelatedArticles current="kaohsiung-sports-team" />
                <Reveal><div style={{ textAlign: "center", marginTop: "20px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}><Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link><Link href="/blog" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>更多攻略</Link></div></Reveal>
            </div>
        </div>
    );
}
