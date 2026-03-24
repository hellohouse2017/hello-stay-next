import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import PropertyLinksBlock from "@/components/PropertyLinksBlock";

export const metadata: Metadata = {
    title: "高雄企業移地訓練住宿｜Off-site 團建・會議包棟推薦",
    description: "高雄包棟民宿是企業 off-site 團建最佳場地。獨立客廳當會議室，中島廚房團隊聚餐，6-48人彈性方案。白天開會晚上圍爐，凝聚向心力。",
    alternates: { canonical: "https://www.hello-stay.com/blog/kaohsiung-offsite-teambuilding" },
};

const sections = [
    {
        id: "why", title: "為什麼企業 Off-site 選包棟民宿？", content: `比起會議中心或飯店，包棟民宿的 off-site 體驗完全不同：

• 打破辦公室的僵硬感 — 在客廳沙發上腦力激盪，效率更高
• 團隊 24 小時相處 — 不像飯店各回各的房間，包棟讓團隊真正連結
• 廚房聚餐 > 餐廳包廂 — 一起下廚、一起吃，Team Building 自然發生
• 彈性空間 — 白天客廳當會議室，晚上變成聚會空間
• 成本更低 — 場地 + 住宿一價全包，不用另租會議室` },
    {
        id: "setup", title: "你好哇寓所的會議配置", content: `一樓客廳（主會議室）
• 可容納 20+ 人坐席
• 55 吋電視可接筆電投影（HDMI）
• Wi-Fi 穩定
• 中島廚房 coffee break 隨時供應

各樓層（分組空間）
• 6 間房分 3 組小組討論
• 每間房有桌椅、空調、獨立衛浴

娛樂空間（team building）
• 麻將 → 策略思考訓練（誤）
• 桌遊同樂
• 桌遊 → 團隊破冰` },
    {
        id: "schedule", title: "2 天 1 夜 Off-site 行程範本", content: `Day 1
14:00  入住 + 自由活動
15:00  開場：Q3 回顧 / 年度 OKR 對齊（客廳）
16:30  Coffee Break（中島廚房現煮咖啡）
17:00  分組討論：策略工作坊（各房間）
18:30  團隊料理時間：到全聯採買 → 中島廚房煮火鍋
20:00  團隊晚餐 + 分享
21:00  麻將 / 桌遊 / 自由交流
23:00  各房休息

Day 2
08:30  外帶早餐（大摳胖碳烤三明治，步行 3 分鐘）
09:30  上午場：各組報告 + 討論
11:00  退房 → 駁二散步 or 直接返程

進階：3 天 2 夜
→ 第二天下午安排駁二藝術特區戶外活動或旗津一日遊` },
    {
        id: "size", title: "不同團隊規模方案", content: `5-12 人（小團隊 / 新創）
→ 溝頂民宿：整棟五層樓，平日 $10,000 起
→ 平均每人 $1,000，比共享空間日租還便宜

13-26 人（部門 / 中型團隊）
→ 你好哇寓所：6 間房 + 大客廳
→ 中島廚房是最大亮點，團隊聚餐氣氛滿分

27-38 人（全公司 / 大型團隊）
→ 兩棟合訂，各有獨立空間
→ 白天一棟開會、一棟休息，互不干擾

39-48 人
→ 大智若愚（第三館）即將開幕，現代電梯大樓` },
    {
        id: "cases", title: "實際客戶案例", content: `案例 1：科技新創 15 人 off-site
「我們從台北飛高雄做年度策略會議，在你好哇住了兩晚。白天開會很有效率，晚上圍爐煮火鍋喝啤酒，是公司成立以來最有凝聚力的一次活動。」

案例 2：設計公司 8 人 team building
「選溝頂是因為預算考量，結果意外的好。五層樓分組討論很方便，四樓交誼廳打麻將打到凌晨。隔天走路去駁二逛展覽，團隊氛圍超好。」

案例 3：NGO 組織 30 人培訓營
「兩棟合訂剛好。一棟上課一棟住宿，中間走 30 秒。廚房自己煮省了很多餐費。」` },
];

export default function OffsitePage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                { "@context": "https://schema.org", "@type": "Article", headline: "高雄企業移地訓練住宿｜Off-site 團建包棟推薦", author: { "@type": "Organization", name: "Hello Stay" }, publisher: { "@type": "Organization", name: "Hello Stay" }, datePublished: "2026-03-06", mainEntityOfPage: "https://www.hello-stay.com/blog/kaohsiung-offsite-teambuilding", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#why", "#setup"] } },
                {
                    "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                        { "@type": "Question", name: "高雄企業off-site住哪裡好？", acceptedAnswer: { "@type": "Answer", text: "推薦鹽埕區你好哇寓所，客廳可當會議室（20+人），55吋電視投影，中島廚房coffee break和團隊聚餐。6-48人彈性方案，場地+住宿一價全包。比飯店會議室+住宿省30%以上。" } },
                        { "@type": "Question", name: "高雄團建活動推薦什麼？", acceptedAnswer: { "@type": "Answer", text: "白天策略工作坊後，推薦：中島廚房團隊料理時間、麻將策略訓練、駁二藝術特區戶外活動、旗津單車一日遊。包棟民宿的好處是不用移動場地，所有活動在同一棟樓。" } },
                    ]
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: "企業 Off-site", href: "/blog/kaohsiung-offsite-teambuilding" }]} />
                <Reveal><div style={{ marginBottom: "40px" }}><div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--pri)", marginBottom: "12px" }}>2026-03-06</div><h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>高雄企業移地訓練住宿<br />Off-site 團建包棟推薦</h1><div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px 0" }} /></div></Reveal>
                {sections.map(s => (<Reveal key={s.id}><section id={s.id} style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}><h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>{s.title}</h2><div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2.2, whiteSpace: "pre-line" }}>{s.content}</div></section></Reveal>))}
                <PropertyLinksBlock />
                <RelatedArticles current="kaohsiung-offsite-teambuilding" />
                <Reveal><div style={{ textAlign: "center", marginTop: "20px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}><Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link><Link href="/blog" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>更多攻略</Link></div></Reveal>
            </div>
        </div>
    );
}
