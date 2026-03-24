import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import PropertyLinksBlock from "@/components/PropertyLinksBlock";

export const metadata: Metadata = {
    title: "高雄跨年包棟推薦｜倒數派對・煙火觀賞・包棟民宿",
    description: "高雄跨年住包棟民宿，在頂樓看義大世界煙火！中島廚房準備跨年大餐，麻將遊同樂，隔天睡到自然醒。鹽埕區6-48人包棟。",
    alternates: { canonical: "https://www.hello-stay.com/blog/kaohsiung-nye-stay" },
};

const sections = [
    {
        id: "why", title: "高雄跨年為什麼選包棟？", content: `跨年夜最怕：人擠人看煙火、餐廳訂不到、飯店隔音差到崩潰。包棟完美解決：

• 專屬跨年派對 — 整棟都是你們的私人倒數趴
• 中島廚房 — 自煮跨年大餐，火鍋、燒烤、甚至年菜
• 桌遊同樂 — 倒數前唱到嗨，不用搶新年第一首歌
• 不用開車 — 跨完年直接上樓睡，隔天自然醒
• 高雄跨年不冷 — 12月底還有 20°C，比北部舒服太多` },
    {
        id: "fireworks", title: "高雄跨年煙火觀賞攻略", content: `義大世界跨年煙火
• 時間：12/31 23:59 開始，長達 999 秒
• 觀賞點：民宿頂樓可遠眺
• 交通：如要近距離看，捷運紅線到橋頭站

高雄港跨年活動
• 地點：高雄港（步行 15 分鐘可達）
• 活動：跨年市集、音樂表演
• 特色：港邊倒數氣氛獨特

愛河畔
• 距離：步行 10 分鐘
• 特色：河畔燈光倒影，適合浪漫跨年

最佳方案
跨年倒數前在民宿吃飯唱歌 → 11:30 走到港邊 → 倒數看煙火 → 走回民宿睡覺` },
    {
        id: "plan", title: "跨年 2 天 1 夜行程", content: `12/31 跨年夜
14:00  入住 + 佈置派對
15:00  全聯採買食材（步行 3 分鐘）
16:00  駁二散步 → 大港橋夕陽
18:00  回民宿 → 中島廚房開煮！火鍋 + 壽喜燒
20:00  桌遊同樂時間 🎤
22:00  客廳遊戲：年度回顧 + 新年願望
23:30  出發到港邊
23:59  倒數！🎆
00:30  回民宿繼續喝 → 自由時間

1/1 元旦
   睡到自然醒
10:00  外帶早餐回民宿吃
11:00  退房 → 新年第一天！` },
    {
        id: "tips", title: "跨年訂房注意事項", content: `⚠️ 提早訂！
跨年檔期是全年最搶手的日期之一，建議 10 月前就要訂房。

⚠️ 跨年加價
多數民宿跨年檔期會加收節日溢價，建議直接洽詢官方確認。

⚠️ 噪音管理
跨年夜可以比較彈性，但凌晨 1:00 後還是要注意音量。

💡 推薦
• 帶拉炮、仙女棒（戶外使用）
• 準備新年小遊戲、交換禮物
• 預先分配房間，避免喝完酒搶房間` },
];

export default function NYEPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                { "@context": "https://schema.org", "@type": "Article", headline: "高雄跨年包棟推薦", author: { "@type": "Organization", name: "Hello Stay" }, publisher: { "@type": "Organization", name: "Hello Stay" }, datePublished: "2026-03-06", mainEntityOfPage: "https://www.hello-stay.com/blog/kaohsiung-nye-stay", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#why", "#fireworks"] } },
                {
                    "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                        { "@type": "Question", name: "高雄跨年住哪裡好？", acceptedAnswer: { "@type": "Answer", text: "推薦鹽埕區包棟民宿。中島廚房煮跨年大餐，麻將遊同樂，步行15分鐘到高雄港看煙火，23:30出門倒數完走回來睡。不用開車、不用人擠人。6-48人包棟方案。" } },
                        { "@type": "Question", name: "高雄跨年看煙火哪裡最好？", acceptedAnswer: { "@type": "Answer", text: "義大世界煙火（999秒，全台最長）、高雄港跨年市集、愛河畔。住鹽埕區步行10-15分鐘可達高雄港和愛河，跨年不用塞車。" } },
                    ]
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: "跨年包棟", href: "/blog/kaohsiung-nye-stay" }]} />
                <Reveal><div style={{ marginBottom: "40px" }}><div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--pri)", marginBottom: "12px" }}>2026-03-06</div><h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>高雄跨年包棟推薦<br />倒數派對・煙火・民宿</h1><div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px 0" }} /></div></Reveal>
                {sections.map(s => (<Reveal key={s.id}><section id={s.id} style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}><h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>{s.title}</h2><div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2.2, whiteSpace: "pre-line" }}>{s.content}</div></section></Reveal>))}
                <PropertyLinksBlock />
                <RelatedArticles current="kaohsiung-nye-stay" />
                <Reveal><div style={{ textAlign: "center", marginTop: "20px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}><Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link><Link href="/blog" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>更多攻略</Link></div></Reveal>
            </div>
        </div>
    );
}
