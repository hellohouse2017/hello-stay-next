import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
    title: "高雄家族旅遊包棟推薦｜三代同堂・長輩友善・親子住宿",
    description: "高雄家族旅遊住包棟民宿最好！三代同堂每間房獨立衛浴，長輩打麻將、小孩看Netflix、爸媽廚房備餐。鹽埕區6-38人包棟。",
    alternates: { canonical: "https://www.hello-stay.com/blog/kaohsiung-family-reunion" },
};

const sections = [
    {
        id: "why", title: "家族旅遊為什麼選包棟民宿？", content: `帶阿公阿嬤出門最怕的事：

飯店的問題 ❌
• 房間分散不同樓層，跨房串門不方便
• 長輩晚上想打牌沒地方
• 小朋友跑跳被隔壁客人投訴
• 想聚在一起吃飯要訂餐廳

包棟民宿的解法 ✅
• 整棟都是自家的 — 小孩盡情跑跳
• 每間房獨立衛浴 — 長輩不用排隊
• 客廳打麻將 — 阿公阿嬤最開心的事
• 廚房煮飯 — 照顧老人小孩的飲食需求
• 分層住宿 — 作息不同也不互相干擾` },
    {
        id: "plan", title: "三代同堂房間安排建議", content: `你好哇寓所（6-26人）

1F — 公共空間
客廳、中島廚房、用餐區。白天全家集合吃飯聊天、晚上打牌。

2F-4F — 長輩房
建議安排在較低樓層，出入方便。每間有獨立衛浴、冷氣。

高樓層 — 年輕人 / 情侶
可選吊椅房拍照打卡。晚上如果要熬夜不會影響樓下。

溝頂民宿（家庭首選）
五層樓獨棟，4F 有交誼廳 + 麻將。
1F-3F 分配給不同小家庭，5F 景觀房給蜜月夫妻。
各層有獨立空間，像住在自己家一樣。

兩棟合訂（大家族 27-38人）
你好哇住年輕人、溝頂住長輩。兩棟距離 30 公尺。` },
    {
        id: "activity", title: "全家活動安排", content: `長輩最愛
☑ 麻將 — 麻將，免洗牌
☑ 看電視 — Netflix 聯網電視
☑ 市場散步 — 大溝頂市場就在巷口
☑ 小堤咖啡 — 40 年老咖啡廳，長輩有共鳴

小朋友最愛
☑ 駁二小火車 — 步行 10 分鐘
☑ 棧貳庫旋轉木馬
☑ 壽山動物園（水豚君！）
☑ 旗津踩浪

全家一起
☑ 大港橋看旋轉（整點表演）
☑ 中島廚房一起煮飯
☑ 鹽埕老街散步吃小吃
☑ 愛河畔合照` },
    {
        id: "tips", title: "家族包棟貼心提醒", content: `飲食
• 長輩和小孩的飲食可在中島廚房自理
• 全聯步行 3 分鐘，採買方便
• 可提前準備副食品、養生食材

安全
• 電子鎖密碼制，不怕小孩弄丟鑰匙
• 合法民宿，消防設施齊全
• 急救箱備用

交通
• 從高鐵左營站搭捷運約 30 分鐘到
• 建議租車或包車，方便載長輩
• 附近停車場 6 間以上

最佳時段
• 平日出遊景點人少，長輩走路舒服
• 避開暑假旺季，價格更划算` },
];

export default function FamilyPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                { "@context": "https://schema.org", "@type": "Article", headline: "高雄家族旅遊包棟推薦", author: { "@type": "Organization", name: "Hello Stay" }, publisher: { "@type": "Organization", name: "Hello Stay" }, datePublished: "2026-03-06", mainEntityOfPage: "https://www.hello-stay.com/blog/kaohsiung-family-reunion", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#why", "#plan"] } },
                {
                    "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                        { "@type": "Question", name: "高雄家族旅遊住哪裡好？", acceptedAnswer: { "@type": "Answer", text: "推薦包棟民宿，如你好哇寓所+溝頂民宿。三代同堂每間獨立衛浴、阿公阿嬤打麻將、小孩盡情跑跳、廚房可煮全家餐。兩棟合訂最多38人，各層獨立像住家一樣舒適。" } },
                        { "@type": "Question", name: "高雄三代同堂旅遊行程推薦？", acceptedAnswer: { "@type": "Answer", text: "長輩：小堤咖啡+大溝頂市場+麻將。小孩：駁二小火車+壽山動物園+旗津。全家：大港橋+中島廚房聚餐+鹽埕老街散步。住包棟分層安排，作息不同也不互相影響。" } },
                    ]
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: "家族旅遊包棟", href: "/blog/kaohsiung-family-reunion" }]} />
                <Reveal><div style={{ marginBottom: "40px" }}><div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--pri)", marginBottom: "12px" }}>2026-03-06</div><h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>高雄家族旅遊包棟推薦<br />三代同堂・長輩友善</h1><div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px 0" }} /></div></Reveal>
                {sections.map(s => (<Reveal key={s.id}><section id={s.id} style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}><h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>{s.title}</h2><div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2.2, whiteSpace: "pre-line" }}>{s.content}</div></section></Reveal>))}
                <RelatedArticles current="kaohsiung-family-reunion" />
                <Reveal><div style={{ textAlign: "center", marginTop: "20px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}><Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link><Link href="/blog" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>更多攻略</Link></div></Reveal>
            </div>
        </div>
    );
}
