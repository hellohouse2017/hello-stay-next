import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
    title: "高雄婚禮迎娶包棟推薦｜闖關遊戲・婚攝場地・伴娘團住宿",
    description: "高雄包棟民宿是婚禮迎娶最佳選擇！寬敞一樓客廳適合闖關遊戲，絕佳自然採光讓婚攝一拍就是大片。多房型供伴娘團入住，廚房備茶點。",
    alternates: { canonical: "https://www.hello-stay.com/blog/kaohsiung-wedding-venue" },
};

const sections = [
    {
        id: "why", title: "為什麼用包棟民宿辦迎娶？", content: `傳統迎娶在新娘家或飯店，但越來越多新人選擇包棟民宿，理由很簡單：

• 空間更自由 — 客廳直接變闖關場地，不用搶飯店走廊
• 採光更好 — 民宿的自然光讓婚攝隨手一拍都是大片
• 隱私性高 — 整棟都是你們的，不用擔心路人入鏡
• 伴娘團直接住 — 前一晚一起住、一起化妝、一起出發
• 費用更合理 — 比包飯店宴會廳便宜太多` },
    {
        id: "space", title: "你好哇寓所的迎娶優勢", content: `一樓大客廳（闖關場地）
• 開放式空間可容納 20+ 人站立
• 絕佳自然採光，落地窗引入美麗的光線
• 中島廚房可備茶點、甜點塔

樓上房間（準備空間）
• 6 間房讓新娘、伴娘團分別準備
• 吊椅房拍照超美，網美風格
• 每間獨立衛浴，化妝不用排隊

戶外走廊
• 紅磚老巷弄風格，適合拍復古風婚紗
• 鹽埕老街氛圍獨特` },
    {
        id: "flow", title: "迎娶當天流程建議", content: `前一晚
20:00 伴娘團入住，客廳佈置氣球拱門
22:00 伴娘團腳底按摩 + 聊天（鹽埕按摩店走路5分鐘）

當天早上
06:00 新秘到場（一樓廚房可備咖啡）
07:00 新娘化妝 / 伴娘依序
08:00 攝影師到場，拍攝新娘準備過程
09:00 新郎車隊到達
09:30 闖關遊戲開始！
10:00 拜別儀式 → 上車出發

小提示
• 車隊建議停大公路路邊（免費停車時段）
• 鞭炮需事先告知鄰居
• 氣球拱門可請「高雄OO氣球」（在地推薦）` },
    {
        id: "photo", title: "包棟婚攝取景推薦", content: `室內
☑ 一樓中島廚房 — 新娘圍裙煮咖啡的日常感
☑ 吊椅房 — 新娘坐在吊椅上的夢幻照
☑ 樓梯轉角 — 新郎等待新娘下樓的經典場面

周邊（步行10分鐘內）
☑ 大港橋 — 以港口為背景的浪漫照
☑ 駁二倉庫群 — 工業風文青婚紗
☑ 紅磚老巷 — 復古懷舊風格
☑ 愛河邊 — 夕陽黃金時刻` },
    {
        id: "cost", title: "費用估算", content: `包棟住宿（前一晚 + 當天早上）
• 你好哇寓所：依人數 $12,000-$28,000
• 含 6 間房、全部公共空間使用

相比飯店
• 飯店迎娶場地租借：$15,000-$30,000（不含住宿）
• 飯店伴娘房：$3,000-$5,000 × 3 間 = $9,000-$15,000
• 包棟民宿 = 場地 + 住宿一次搞定，省 $10,000+

透過官網或 LINE 預訂，免平台手續費。` },
];

export default function WeddingPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                { "@context": "https://schema.org", "@type": "Article", headline: "高雄婚禮迎娶包棟推薦", description: "包棟民宿是婚禮迎娶最佳選擇，寬敞客廳適合闖關，自然採光婚攝大片。", author: { "@type": "Organization", name: "Hello Stay" }, publisher: { "@type": "Organization", name: "Hello Stay" }, datePublished: "2026-03-06", mainEntityOfPage: "https://www.hello-stay.com/blog/kaohsiung-wedding-venue", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#why", "#space"] } },
                {
                    "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                        { "@type": "Question", name: "高雄哪裡適合辦婚禮迎娶？", acceptedAnswer: { "@type": "Answer", text: "推薦鹽埕區的包棟民宿，如你好哇寓所。一樓大客廳可容納20人以上闖關遊戲，6間房供伴娘團前一晚入住，中島廚房備茶點。自然採光讓婚攝隨手一拍就是大片。費用含住宿+場地，比飯店省$10,000以上。" } },
                        { "@type": "Question", name: "包棟民宿辦迎娶一晚多少？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所依人數$12,000-$28,000，含6間房和全部公共空間。相比飯店場地租借$15,000-$30,000還不含住宿，包棟CP值高出很多。" } },
                    ]
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: "婚禮迎娶包棟", href: "/blog/kaohsiung-wedding-venue" }]} />
                <Reveal><div style={{ marginBottom: "40px" }}><div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--pri)", marginBottom: "12px" }}>2026-03-06</div><h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>高雄婚禮迎娶包棟推薦<br />闖關遊戲・婚攝・伴娘團</h1><div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px 0" }} /></div></Reveal>
                {sections.map(s => (<Reveal key={s.id}><section id={s.id} style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}><h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>{s.title}</h2><div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2.2, whiteSpace: "pre-line" }}>{s.content}</div></section></Reveal>))}
                <RelatedArticles current="kaohsiung-wedding-venue" />
                <Reveal><div style={{ textAlign: "center", marginTop: "20px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}><Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link><Link href="/blog" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>更多攻略</Link></div></Reveal>
            </div>
        </div>
    );
}
