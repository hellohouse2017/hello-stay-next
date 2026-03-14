import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
    title: "高雄有廚房的民宿推薦｜中島廚房・包棟煮飯・火鍋趴",
    description: "高雄哪間民宿有廚房可以煮飯？你好哇寓所有豪華中島廚房，IH爐、冰箱、完整餐具，最適合包棟火鍋趴、團隊聚餐、家族圍爐。",
    alternates: { canonical: "https://www.hello-stay.com/blog/kaohsiung-kitchen-bnb" },
};

const sections = [
    {
        id: "why", title: "有廚房的民宿，旅行完全不一樣", content: `出門旅遊最花錢的就是「吃」。一群人外食，隨便一餐每人 $300-$500，三天下來餐費比住宿還貴。
有廚房的包棟民宿改變了這個公式：

• 火鍋趴 — 全聯買料每人 $150，20 個人的火鍋大餐只要 $3,000
• 早餐自煮 — 吐司、蛋、牛奶，省下每人 $80 的早餐錢
• 宵夜不求人 — 半夜煮泡麵加蛋，不用叫外送等半小時
• 聚餐氛圍 — 一起下廚的記憶比餐廳吃飯深刻 100 倍
• 特殊飲食 — 素食、過敏、嬰兒副食品，自煮最安心` },
    {
        id: "kitchen", title: "你好哇寓所中島廚房配備", content: `料理設備
☑ IH 感應爐 × 2（安全不怕忘關火）
☑ 微波爐
☑ 冰箱（大容量，可放大量食材）
☑ 製冰機（調酒、冰敷都好用）

廚具
☑ 鍋子：湯鍋、炒鍋、火鍋鍋
☑ 平底鍋（煎蛋、煎牛排）
☑ 砧板 + 刀具組
☑ 餐具：碗盤杯筷，20 人份以上
☑ 調味料架（鹽、醬油、油基本的都有）

中島吧台
☑ 可同時 8 人圍坐
☑ 高腳椅 + 一般椅
☑ 非常適合一邊煮一邊聊天的開放感

清潔
☑ 洗碗精、海綿、抹布
☑ 垃圾袋
☑ 使用後請基本清潔即可` },
    {
        id: "recipes", title: "包棟聚餐推薦菜單", content: `🍲 火鍋趴（最受歡迎）
• 全聯買：火鍋湯底 × 2、肉片、火鍋料、蔬菜、冬粉
• 預算：每人約 $150-$200
• 適合人數：10-20 人
• 搭配：啤酒、汽水（製冰機提供冰塊）

🥩 牛排之夜
• 好市多買：牛排、沙拉、麵包
• 用平底鍋煎，中島廚房有完美的場地
• 搭配紅酒，氣氛滿分

🍳 豐盛早餐
• 全聯買：蛋、吐司、火腿、牛奶、果汁
• 用 IH 爐煎蛋、烤吐司
• 中島吧台擺盤就像 Buffet

🍜 宵夜泡麵大會
• 每人帶一包自己最愛的泡麵
• 廚房煮水加料：蛋、蔬菜、起司
• 半夜的泡麵特別好吃` },
    {
        id: "nearby", title: "附近食材採買", content: `全聯福利中心
📍 步行 3 分鐘
🕐 08:00-23:00
🛒 生鮮、火鍋料、酒水、零食

傳統市場（大溝頂）
📍 步行 1 分鐘（就在巷口！）
🕐 06:00-12:00
🛒 新鮮蔬果、魚肉、豆腐

全家 / 7-11
📍 步行 1-2 分鐘
🕐 24 小時
🛒 微波食品、飲料、冰棒` },
];

export default function KitchenPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "#FAF8F5", minHeight: "100vh" }}>
            <JsonLd data={[
                { "@context": "https://schema.org", "@type": "Article", headline: "高雄有廚房的民宿推薦", author: { "@type": "Organization", name: "Hello Stay" }, publisher: { "@type": "Organization", name: "Hello Stay" }, datePublished: "2026-03-06", mainEntityOfPage: "https://www.hello-stay.com/blog/kaohsiung-kitchen-bnb", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#why", "#kitchen"] } },
                {
                    "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                        { "@type": "Question", name: "高雄哪間民宿有廚房可以煮飯？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所有豪華中島廚房，配備IH爐×2、微波爐、冰箱、完整鍋碗瓢盆。中島吧台可8人圍坐。步行3分鐘有全聯超市採買食材。最適合火鍋趴、團隊聚餐。" } },
                        { "@type": "Question", name: "包棟民宿煮火鍋每人要花多少？", acceptedAnswer: { "@type": "Answer", text: "全聯買火鍋湯底、肉片、蔬菜、火鍋料，每人約$150-$200。20人火鍋大餐只要$3,000-$4,000，比外面吃便宜一半以上，而且氣氛更好！" } },
                    ]
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: "有廚房的民宿", href: "/blog/kaohsiung-kitchen-bnb" }]} />
                <Reveal><div style={{ marginBottom: "40px" }}><div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#C8AD7F", marginBottom: "12px" }}>2026-03-06</div><h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>高雄有廚房的民宿推薦<br />中島廚房・火鍋趴・聚餐</h1><div style={{ width: "40px", height: "1px", background: "#C8AD7F", margin: "20px 0" }} /></div></Reveal>
                {sections.map(s => (<Reveal key={s.id}><section id={s.id} style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}><h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>{s.title}</h2><div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2.2, whiteSpace: "pre-line" }}>{s.content}</div></section></Reveal>))}
                <RelatedArticles current="kaohsiung-kitchen-bnb" />
                <Reveal><div style={{ textAlign: "center", marginTop: "20px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}><Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link><Link href="/blog" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>更多攻略</Link></div></Reveal>
            </div>
        </div>
    );
}
