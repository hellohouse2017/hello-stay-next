import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
    title: "鹽埕區美食地圖｜在地人推薦 30 間必吃老店",
    description: "高雄鹽埕區美食完整攻略：從早餐虱目魚到深夜酒吧，30間以上必吃老店。附步行距離、營業時間，住在鹽埕就是住在美食的中心。",
    alternates: { canonical: "https://www.hello-stay.com/blog/yancheng-food-guide" },
};

const categories = [
    {
        title: "🌅 早餐 — 用鹽埕的味道開啟一天",
        items: [
            { name: "大摳胖碳烤三明治", walk: "步行 3 分", note: "碳烤吐司配自製美乃滋，排隊名店" },
            { name: "阿昌虱目魚", walk: "步行 5 分", note: "在地人的早餐日常，虱目魚粥鮮甜" },
            { name: "鄧記肉圓", walk: "步行 4 分", note: "蒸肉圓配甜辣醬，老鹽埕味道" },
        ],
    },
    {
        title: "🥘 正餐 — 從日料到牛肉麵全制霸",
        items: [
            { name: "港園牛肉麵", walk: "步行 8 分", note: "鹽埕經典，每桌必點紅燒牛肉麵" },
            { name: "鴨肉珍 / 鴨肉本", walk: "步行 6 分", note: "60年老店，鴨肉飯配下水湯" },
            { name: "Kyomo Pasta", walk: "步行 7 分", note: "文青義大利麵，駁二藝術村內" },
            { name: "葉家肉粥", walk: "步行 5 分", note: "肉粥配炸肉捲，在地人私藏" },
            { name: "銀座日本料理", walk: "步行 3 分", note: "鹽埕老字號日料，價格公道" },
            { name: "阿進切仔麵", walk: "步行 6 分", note: "古早味切仔麵，豬肝湯必點" },
        ],
    },
    {
        title: "🍢 小吃下酒菜 — 銅板價吃到飽",
        items: [
            { name: "阿囉哈滷味", walk: "步行 4 分", note: "宵夜首選，自選滷味秤重賣" },
            { name: "大溝頂虱目魚", walk: "步行 2 分", note: "就在民宿巷口的虱目魚專賣" },
            { name: "黃家肉燥飯", walk: "步行 5 分", note: "鹽甜交織的肉燥，配荷包蛋" },
            { name: "鹹酥雞", walk: "步行 3 分", note: "鹽埕夜市口，炸功一流" },
            { name: "無名攤蚵仔煎", walk: "步行 5 分", note: "大顆蚵仔煎，要排隊的那種" },
        ],
    },
    {
        title: "☕ 咖啡甜點 — 文青特區",
        items: [
            { name: "小堤咖啡", walk: "步行 5 分", note: "40 年老咖啡廳，時光凝固的空間" },
            { name: "新濱・駅前", walk: "步行 10 分", note: "日式老屋咖啡廳，拍照聖地" },
            { name: "高雄婆婆冰", walk: "步行 7 分", note: "招牌水果冰，夏天必訪" },
            { name: "阿綿麻糬", walk: "步行 8 分", note: "手工麻糬伴手禮，Q 彈好吃" },
        ],
    },
    {
        title: "🍸 深夜酒吧 — 鹽埕的夜晚才正精彩",
        items: [
            { name: "廢墟 BAR", walk: "步行 2 分", note: "Hello Stay 秘密基地，可代訂場地" },
            { name: "吧嗨 Bar High", walk: "步行 5 分", note: "精釀啤酒專賣，氣氛輕鬆" },
            { name: "空白酒吧", walk: "步行 6 分", note: "低調巷弄酒吧，調酒厲害" },
            { name: "大溝頂老街酒場", walk: "步行 3 分", note: "在傳統市場裡喝酒，獨特體驗" },
            { name: "港思酒研所", walk: "步行 7 分", note: "復古港口風格，威士忌選擇多" },
        ],
    },
    {
        title: "🏪 生活便利 — 腳到即達",
        items: [
            { name: "全聯福利中心", walk: "步行 3 分", note: "採買食材、零食、酒水" },
            { name: "全家便利商店", walk: "步行 1 分", note: "巷口就有" },
            { name: "7-11", walk: "步行 2 分", note: "ATM 提款也方便" },
            { name: "自助洗衣店", walk: "步行 4 分", note: "多天旅遊必備" },
        ],
    },
];

export default function FoodGuidePage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "#FAF8F5", minHeight: "100vh" }}>
            <JsonLd data={[
                {
                    "@context": "https://schema.org", "@type": "Article",
                    headline: "鹽埕區美食地圖｜在地人推薦 30 間必吃老店",
                    description: "高雄鹽埕區美食完整攻略，30間以上必吃老店。附步行距離。",
                    author: { "@type": "Organization", name: "Hello Stay 你好哇寓所", url: "https://www.hello-stay.com" },
                    publisher: { "@type": "Organization", name: "Hello Stay" },
                    datePublished: "2026-03-03", dateModified: "2026-03-06",
                    mainEntityOfPage: "https://www.hello-stay.com/blog/yancheng-food-guide",
                    about: { "@type": "Place", name: "高雄鹽埕區", geo: { "@type": "GeoCoordinates", latitude: 22.6245, longitude: 120.2823 } },
                    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", ".intro"] },
                },
                {
                    "@context": "https://schema.org", "@type": "FAQPage",
                    mainEntity: [
                        { "@type": "Question", name: "鹽埕區有什麼好吃的？", acceptedAnswer: { "@type": "Answer", text: "鹽埕區是高雄美食一級戰區，必吃：港園牛肉麵、鴨肉珍（60年老店）、大摳胖碳烤三明治、高雄婆婆冰、阿囉哈滷味。超過30間老店步行可達，從早餐到深夜酒吧一應俱全。" } },
                        { "@type": "Question", name: "駁二附近有什麼美食？", acceptedAnswer: { "@type": "Answer", text: "駁二周邊推薦：Kyomo Pasta（文青義大利麵）、新濱・駅前（日式老屋咖啡）、鹽埕夜市（各式小吃）、小堤咖啡（40年老店）。住在鹽埕區的包棟民宿，步行就能吃遍。" } },
                        { "@type": "Question", name: "高雄鹽埕區有推薦的酒吧嗎？", acceptedAnswer: { "@type": "Answer", text: "推薦：廢墟BAR（Hello Stay秘密基地）、吧嗨Bar High（精釀啤酒）、空白酒吧（調酒厲害）、大溝頂老街酒場（市場裡喝酒的獨特體驗）。鹽埕區的夜晚非常精彩。" } },
                    ],
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅宿攻略", href: "/blog" }, { name: "鹽埕美食地圖", href: "/blog/yancheng-food-guide" }]} />

                <Reveal>
                    <div style={{ marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#C8AD7F", marginBottom: "12px" }}>2026-03-03</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>
                            鹽埕區美食地圖<br />在地人推薦 30 間必吃老店
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "#C8AD7F", margin: "20px 0" }} />
                        <p className="intro" style={{ fontSize: "0.88rem", color: "#999", lineHeight: 2 }}>
                            住在鹽埕區，就是住在高雄美食的中心。從清晨的虱目魚粥到深夜的特色酒吧，走路就能吃遍數十年老店。以下是我們經營民宿 8 年來，與住客們共同驗證的「不踩雷」名單。推薦外帶回民宿中島廚房，吹冷氣享受包棟聚餐。
                        </p>
                    </div>
                </Reveal>

                {categories.map(cat => (
                    <Reveal key={cat.title}>
                        <section style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "20px" }}>
                                {cat.title}
                            </h2>
                            <div style={{ display: "grid", gap: "12px" }}>
                                {cat.items.map(item => (
                                    <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "#FAF8F5", borderRadius: "10px" }}>
                                        <div>
                                            <div style={{ fontSize: "0.92rem", color: "#3D3830", fontWeight: 500, marginBottom: "2px" }}>{item.name}</div>
                                            <div style={{ fontSize: "0.75rem", color: "#BEB5A8" }}>{item.note}</div>
                                        </div>
                                        <div style={{ fontSize: "0.72rem", color: "#C8AD7F", fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0 }}>
                                            {item.walk}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </Reveal>
                ))}

                <Reveal>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <p style={{ fontSize: "0.85rem", color: "#999", marginBottom: "20px" }}>住在最好吃的位置，開啟你的鹽埕美食之旅</p>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link>
                            <Link href="/blog" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>更多攻略</Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
