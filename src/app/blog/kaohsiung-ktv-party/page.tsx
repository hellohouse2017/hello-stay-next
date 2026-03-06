import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
    title: "高雄 KTV 派對包棟推薦｜歡唱不限時・生日趴・慶功宴",
    description: "高雄包棟民宿有 KTV 歡唱設備！不限時唱到凌晨，搭配中島廚房準備派對餐點、麻將桌娛樂。6-26人包棟，生日派對、慶功宴首選。",
    alternates: { canonical: "https://www.hello-stay.com/blog/kaohsiung-ktv-party" },
};

const sections = [
    {
        id: "why", title: "在民宿唱 KTV 比外面爽 100 倍", content: `去外面 KTV 的痛點你一定知道：
❌ 限時制（唱到一半被趕走）
❌ 包廂費很貴（假日大包廂 $1,500/H）
❌ 低消壓力（飲料食物被強推）
❌ 不能躺（唱累了只能坐著等）

在包棟民宿唱 KTV：
✅ 不限時 — 從下午唱到半夜都行
✅ 零額外費用 — KTV 設備免費使用
✅ 想吃自己煮 — 中島廚房準備派對美食
✅ 唱累了上樓睡 — 房間就在樓上
✅ 同時麻將桌 — 不想唱的人可以打牌
✅ 完全包場 — 私人 party 不受打擾` },
    {
        id: "setup", title: "KTV 設備規格", content: `歡唱系統
• 專業 KTV 點歌系統
• 持續更新歌庫
• 支援國語、台語、英語、日語、韓語
• 43 吋螢幕顯示歌詞

音響
• 專業喇叭音質清晰
• 無線麥克風（不怕被線纏住跳舞）
• 音量可調（入夜後調小聲繼續唱）

使用時間
• 入住到退房期間自由使用
• 建議 23:00 前音量全開享受，之後調小聲繼續唱` },
    {
        id: "party", title: "派對主題推薦", content: `🎂 生日派對
佈置：氣球拱門、生日布條、蛋糕桌
流程：開場 KTV → 吹蠟燭 → 繼續唱
餐點：中島廚房擺小蛋糕、finger food

🏆 慶功宴
佈置：香檳塔、獎盃
流程：頒獎 → 乾杯 → KTV → 打麻將
餐點：火鍋 + 啤酒

🎉 朋友聚會
佈置：輕鬆就好
流程：到了就開唱 → 餓了就煮 → 累了就睡
餐點：阿囉哈滷味 + 鹹酥雞 + 啤酒

👰 單身派對
佈置：主題裝飾、道具
流程：闖關遊戲 → KTV → 秘密爆料時間
餐點：精緻小點 + 香檳` },
    {
        id: "tips", title: "KTV 包棟注意事項", content: `🎤 設備使用
• 使用前先確認音量（別一開就嚇到自己）
• 麥克風用完放回架上
• 不要對著麥克風吹氣或拍打

⏰ 音量管理
• 19:00-23:00：盡情嗨
• 23:00 後：調低音量，享受輕聲版 KTV
• 建議把最想唱的歌排在 23:00 前

🍺 飲酒注意
• 喝酒適量，不要吐在地上（押金保衛戰）
• 備好垃圾袋和濕紙巾
• 意識不清請直接上樓睡覺 😂` },
];

export default function KTVPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "#FAF8F5", minHeight: "100vh" }}>
            <JsonLd data={[
                { "@context": "https://schema.org", "@type": "Article", headline: "高雄KTV派對包棟推薦", author: { "@type": "Organization", name: "Hello Stay" }, publisher: { "@type": "Organization", name: "Hello Stay" }, datePublished: "2026-03-06", mainEntityOfPage: "https://www.hello-stay.com/blog/kaohsiung-ktv-party", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#why", "#party"] } },
                {
                    "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                        { "@type": "Question", name: "高雄哪間民宿有KTV？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所有KTV歡唱設備，不限時免費使用。專業點歌系統、無線麥克風、43吋螢幕。23:00後調低音量可繼續唱。同時有麻將桌和中島廚房，適合生日派對、慶功宴。" } },
                        { "@type": "Question", name: "包棟民宿KTV可以唱到幾點？", acceptedAnswer: { "@type": "Answer", text: "入住到退房期間自由使用。23:00前可全音量享受，之後調低音量繼續唱到凌晨沒問題。不像外面KTV限時制，想唱多久就唱多久。" } },
                    ]
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: "KTV 派對包棟", href: "/blog/kaohsiung-ktv-party" }]} />
                <Reveal><div style={{ marginBottom: "40px" }}><div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#C8AD7F", marginBottom: "12px" }}>2026-03-06</div><h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>高雄 KTV 派對包棟推薦<br />歡唱不限時・生日趴</h1><div style={{ width: "40px", height: "1px", background: "#C8AD7F", margin: "20px 0" }} /></div></Reveal>
                {sections.map(s => (<Reveal key={s.id}><section id={s.id} style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}><h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>{s.title}</h2><div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2.2, whiteSpace: "pre-line" }}>{s.content}</div></section></Reveal>))}
                <Reveal><div style={{ textAlign: "center", marginTop: "20px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}><Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link><Link href="/blog" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>更多攻略</Link></div></Reveal>
            </div>
        </div>
    );
}
