import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
    title: "駁二住宿推薦｜步行 10 分鐘到駁二的鹽埕區包棟民宿",
    description: "想住駁二附近？鹽埕區的包棟民宿步行10分鐘到駁二藝術特區、8分鐘到大港橋。比西子灣更方便、比市區更有文化味。6-48人包棟。",
    alternates: { canonical: "https://www.hello-stay.com/blog/pier2-accommodation" },
};

const sections = [
    {
        id: "location", title: "為什麼住鹽埕區比住駁二旁更好？", content: `駁二藝術特區本身沒有民宿（它是倉庫群），最近的住宿選擇分佈在：

鹽埕區（最推薦 ⭐）
• 步行 10 分鐘到駁二大義倉庫群
• 步行 8 分鐘到大港橋
• 步行 15 分鐘到棧貳庫
• 本身就是美食一級戰區
• 捷運鹽埕埔站步行 5 分鐘

前鎮區（高雄流行音樂中心旁）
• 住宿選擇少，多是飯店
• 離駁二核心區較遠

西子灣
• 離駁二步行 20+ 分鐘
• 餐飲選擇少，晚上偏安靜

結論：住鹽埕區 = 駁二步行圈 + 美食圈 + 捷運圈` },
    {
        id: "spots", title: "駁二周邊必逛景點（步行可達）", content: `5 分鐘步行圈
☑ 大溝頂傳統市場 — 在地人的日常，文青改造進行中

10 分鐘步行圈
☑ 駁二大義倉庫群 — 彩繪牆、文創小店、VR 體驗
☑ 大港橋 — 全台首座水平旋轉橋，整點旋轉

15 分鐘步行圈
☑ 棧貳庫 — 白色旋轉木馬、港邊餐廳
☑ 哈瑪星鐵道園區 — 小火車、鐵道文化

20 分鐘步行圈
☑ 高雄流行音樂中心 — 六角形建築群
☑ 愛河 — 河邊散步、貢多拉夜遊

捷運一站
☑ 西子灣 — 打狗英國領事館、夕陽
☑ 旗津渡輪 — 海鮮、燈塔、彩虹教堂` },
    {
        id: "stay", title: "駁二步行圈住宿推薦", content: `你好哇寓所 ⭐ 首選
📍 大公路70巷8號（步行駁二 10 分鐘）
👥 6-26 人包棟
🏷 有廚房、麻將、桌遊桌
📊 Google 4.9 星 / 87 則評價
💰 平日 $12,000 起

溝頂民宿
📍 大公路70巷6-2號（步行駁二 10 分鐘）
👥 10-12 人獨棟
🏷 五層樓、家庭風格
📊 Google 4.8 星 / 45 則評價
💰 平日 $10,000 起

兩棟合訂可接待 38 人，非常適合大團體。` },
    {
        id: "tips", title: "駁二旅遊小提示", content: `最佳造訪時間
• 平日人少，拍照不用排隊
• 週末有市集活動
• 傍晚 16:00-18:00 光線最美

門票
• 駁二倉庫群免費入場
• VR 體驗另計
• 大港橋免費（每日整點旋轉）

餐飲建議
• 園區內有餐廳但偏貴，建議走回鹽埕吃
• 或在民宿廚房自煮，更省更有趣

交通
• 捷運橘線鹽埕埔站 O2，4號出口
• 輕軌駁二大義站、駁二蓬萊站` },
];

export default function Pier2Page() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                { "@context": "https://schema.org", "@type": "Article", headline: "駁二住宿推薦｜步行10分鐘到駁二的包棟民宿", author: { "@type": "Organization", name: "Hello Stay" }, publisher: { "@type": "Organization", name: "Hello Stay" }, datePublished: "2026-03-06", mainEntityOfPage: "https://www.hello-stay.com/blog/pier2-accommodation", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#location", "#stay"] } },
                {
                    "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                        { "@type": "Question", name: "駁二附近有推薦的住宿嗎？", acceptedAnswer: { "@type": "Answer", text: "推薦住鹽埕區的包棟民宿，步行10分鐘到駁二。如你好哇寓所，6-26人包棟，Google4.9星。鹽埕區本身就是美食區，比住駁二旁更方便、選擇更多。" } },
                        { "@type": "Question", name: "駁二藝術特區要門票嗎？", acceptedAnswer: { "@type": "Answer", text: "駁二倉庫群免費入場。大港橋免費，每日整點旋轉。部分展覽和VR體驗另計。建議平日造訪人少，傍晚16:00-18:00光線最美拍照最好。" } },
                    ]
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: "駁二住宿推薦", href: "/blog/pier2-accommodation" }]} />
                <Reveal><div style={{ marginBottom: "40px" }}><div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--pri)", marginBottom: "12px" }}>2026-03-06</div><h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>駁二住宿推薦<br />步行 10 分鐘的鹽埕區包棟</h1><div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px 0" }} /></div></Reveal>
                {sections.map(s => (<Reveal key={s.id}><section id={s.id} style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}><h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>{s.title}</h2><div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2.2, whiteSpace: "pre-line" }}>{s.content}</div></section></Reveal>))}
                <RelatedArticles current="pier2-accommodation" />
                <Reveal><div style={{ textAlign: "center", marginTop: "20px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}><Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link><Link href="/blog" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>更多攻略</Link></div></Reveal>
            </div>
        </div>
    );
}
