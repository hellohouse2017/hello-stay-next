import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
    title: "高雄麻將民宿推薦｜自動麻將桌・包棟打牌到天亮",
    description: "高雄有麻將桌的包棟民宿推薦！自動麻將桌免洗牌，打到凌晨也不怕吵。同時有KTV、廚房可煮宵夜。鹽埕區6-26人包棟。",
    alternates: { canonical: "https://www.hello-stay.com/blog/kaohsiung-mahjong-stay" },
};

const sections = [
    {
        id: "why", title: "打麻將就是要在包棟民宿", content: `去外面的麻將館？太沒氣氛了。在包棟民宿打麻將才是正解：

• 自動麻將桌 — 免洗牌，摸牌速度翻倍
• 不限時 — 想打到幾點就幾點，不像外面有營業時間
• 打累了直接睡 — 上樓就是房間，不用開車回家
• 邊打邊吃 — 廚房煮宵夜端到桌邊，零食飲料無限供應
• 完全隱私 — 整棟都是你們的，輸再多錢也不會被路人看到 😆
• KTV 換場 — 打膩了直接轉戰 KTV，不用移動` },
    {
        id: "setup", title: "你好哇寓所的麻將配備", content: `自動麻將桌
• 品牌：傳統自動洗牌麻將桌
• 位置：4F 交誼廳（你好哇）/ 4F（溝頂）
• 桌布：絨面，牌感一流
• 檯面大小：標準尺寸，舒適打牌

周邊配備
• 椅子 4 張（舒適靠背椅，久坐不累）
• 旁邊小桌放飲料零食
• 獨立空調（夏天打牌不流汗）
• 照明充足（不會看錯牌）

加碼
• 撲克牌、UNO、桌遊也有
• 43 吋 Netflix 電視（等牌的人可以看劇）` },
    {
        id: "food", title: "打麻將必備宵夜清單", content: `外送到民宿
📞 阿囉哈滷味（步行 4 分，外帶回來最棒）
📞 鹹酥雞（巷口就有）
📞 大摳胖碳烤三明治（如果打到早上的話 😂）

中島廚房自煮
🍲 火鍋 — 全聯買料，邊打邊涮
🍜 泡麵 — 加蛋加菜，深夜神物
🥤 飲料 — 全聯買啤酒、飲料（製冰機提供冰塊！）

重要提醒
• 吃東西時注意不要弄髒麻將桌面
• 飲料放旁邊小桌，別直接放麻將桌上` },
    {
        id: "rules", title: "包棟打麻將注意事項", content: `✅ 可以
• 打到凌晨沒問題（麻將桌隔音不錯）
• 可以帶自己的牌尺、計分APP
• 邊打邊 KTV 沒問題

⚠️ 請注意
• 23:00 後降低音量（麻將碰胡的叫聲要控制 😆）
• 不要用力拍桌（自動麻將桌是精密機器）
• 如果卡牌請不要硬拆，通知管理員處理
• 結束後將牌清回桌面，椅子歸位

💰 損壞賠償
• 麻將桌非正常損壞需照價賠償
• 正常使用磨損不收費` },
];

export default function MahjongPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "#FAF8F5", minHeight: "100vh" }}>
            <JsonLd data={[
                { "@context": "https://schema.org", "@type": "Article", headline: "高雄麻將民宿推薦", author: { "@type": "Organization", name: "Hello Stay" }, publisher: { "@type": "Organization", name: "Hello Stay" }, datePublished: "2026-03-06", mainEntityOfPage: "https://www.hello-stay.com/blog/kaohsiung-mahjong-stay", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#why", "#setup"] } },
                {
                    "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                        { "@type": "Question", name: "高雄有麻將桌的民宿推薦？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所和溝頂民宿都有自動麻將桌。位於4F交誼廳，獨立空調照明。可打到凌晨不限時，打累了上樓直接睡。附近有阿囉哈滷味、鹹酥雞當宵夜，中島廚房也能自煮火鍋。6-26人包棟。" } },
                        { "@type": "Question", name: "高雄包棟民宿可以打麻將到幾點？", acceptedAnswer: { "@type": "Answer", text: "包棟民宿打麻將不限時，凌晨也可以。但23:00後請降低音量，避免碰胡大叫。自動麻將桌噪音不大，主要是人聲要控制。" } },
                    ]
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: "麻將民宿推薦", href: "/blog/kaohsiung-mahjong-stay" }]} />
                <Reveal><div style={{ marginBottom: "40px" }}><div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#C8AD7F", marginBottom: "12px" }}>2026-03-06</div><h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>高雄麻將民宿推薦<br />自動麻將桌・打牌到天亮</h1><div style={{ width: "40px", height: "1px", background: "#C8AD7F", margin: "20px 0" }} /></div></Reveal>
                {sections.map(s => (<Reveal key={s.id}><section id={s.id} style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}><h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>{s.title}</h2><div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2.2, whiteSpace: "pre-line" }}>{s.content}</div></section></Reveal>))}
                <Reveal><div style={{ textAlign: "center", marginTop: "20px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}><Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link><Link href="/blog" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>更多攻略</Link></div></Reveal>
            </div>
        </div>
    );
}
