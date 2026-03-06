import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";

export const metadata: Metadata = {
    title: "住客真心話｜Hello Stay 你好哇寓所 Google 評價精選",
    description: "Google 評價 4.9 星、87 則真實住客評價精選。家族旅遊、畢業旅行、企業團建、婚禮迎娶的住客分享包棟體驗。高雄鹽埕區包棟民宿。",
    alternates: { canonical: "https://www.hello-stay.com/reviews" },
};

const reviews = [
    { author: "林小姐", rating: 5, date: "2025-12", property: "你好哇寓所", group: "家族旅遊 18 人", text: "三代同堂的家庭旅遊，體驗太棒了！廚房超大，我們直接在中島煮火鍋，比在外面吃更有家的感覺。阿公阿嬤打麻將打到不想回家。民宿很乾淨，老闆也超親切。大推！" },
    { author: "陳先生", rating: 5, date: "2025-11", property: "你好哇寓所", group: "大學畢旅 22 人", text: "畢旅住包棟真的是最正確的選擇，每人不到一千塊！客廳空間超大，晚上通宵玩桌遊超開心。走路十分鐘就到駁二，旁邊還有超多美食。下次同學會還要來！" },
    { author: "王小姐", rating: 5, date: "2025-10", property: "你好哇寓所", group: "婚禮迎娶", text: "在你好哇辦迎娶的體驗超好。一樓客廳很適合闖關遊戲，採光超棒婚攝拍出來的照片美翻。前一晚伴娘團住在這裡一起準備，氣氛滿分。老闆還幫我們推薦附近的新秘。" },
    { author: "張先生", rating: 5, date: "2025-09", property: "溝頂民宿", group: "球隊比賽 12 人", text: "系隊比賽來高雄住溝頂，五層樓空間很足夠。製冰機每天做冰塊冰敷超方便，洗衣機洗球衣也不用擔心。最棒的是全聯走路三分鐘，大家一起煮飯省超多。" },
    { author: "李小姐", rating: 5, date: "2025-08", property: "你好哇寓所", group: "公司團建 16 人", text: "公司 off-site 選你好哇超讚。白天在客廳開會，電視接筆電投影很方便。晚上大家圍在中島廚房煮火鍋，團隊凝聚力直接拉滿。鹽埕區真的有好多好吃的，同事全部吃肥回來。" },
    { author: "黃先生", rating: 5, date: "2025-07", property: "你好哇寓所", group: "朋友聚會 14 人", text: "一群朋友的年度聚會，從台北特地飛到高雄來。中島廚房晚上煮火鍋配啤酒，接著打麻將打到凌晨三點。隔天走去駁二散步消化，這種旅行太舒服了。" },
    { author: "劉小姐", rating: 5, date: "2025-06", property: "溝頂民宿", group: "家庭旅遊 8 人", text: "帶爸媽和小孩來住溝頂，每層樓都有衛浴不用排隊。小孩愛死了壽山動物園的水豚君，阿嬤在民宿打麻將不想出門 😂 鹽埕的美食真的好多好吃。" },
    { author: "周先生", rating: 5, date: "2025-05", property: "你好哇寓所", group: "跨年派對 20 人", text: "跨年夜在你好哇寓所辦倒數趴，中島廚房準備法式火鍋，11點半大家一起走到港邊看煙火！包棟跨年比去飯店或人擠人看煙火好太多了。" },
    { author: "吳小姐", rating: 4, date: "2025-04", property: "溝頂民宿", group: "情侶旅行 2 人", text: "只有兩個人住整棟有點太奢侈哈哈，但環境真的很乾淨舒服。走路就到大溝頂市場和駁二，附近的大摳胖碳烤三明治超好吃。下次要揪一大群朋友來包棟才划算。" },
    { author: "蔡先生", rating: 5, date: "2025-03", property: "你好哇寓所", group: "劇組拍攝", text: "劇組取景來住你好哇，空間夠大、光線好、巷弄有味道。老闆很配合拍攝時間，設備也齊全。是很好的拍攝場地，之前綜藝玩很大也在這裡拍過。" },
];

const stats = { total: 87, rating: 4.9, five: 82, four: 4, three: 1 };

export default function ReviewsPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "#FAF8F5", minHeight: "100vh" }}>
            <JsonLd data={[
                {
                    "@context": "https://schema.org", "@type": "LodgingBusiness",
                    name: "Hello Stay 你好哇寓所", url: "https://www.hello-stay.com",
                    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "87", bestRating: "5" },
                    review: reviews.map(r => ({
                        "@type": "Review",
                        author: { "@type": "Person", name: r.author },
                        datePublished: r.date,
                        reviewBody: r.text,
                        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
                    })),
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "12px" }}>Guest Reviews</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>住客真心話</h1>
                        <div style={{ width: "40px", height: "1px", background: "#C8AD7F", margin: "20px auto" }} />
                    </div>
                </Reveal>

                <Reveal>
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "24px", textAlign: "center" }}>
                        <div style={{ fontSize: "3rem", fontFamily: "var(--en)", fontWeight: 300, color: "#3D3830" }}>{stats.rating}</div>
                        <div style={{ fontSize: "1.2rem", marginBottom: "6px" }}>⭐⭐⭐⭐⭐</div>
                        <div style={{ fontSize: "0.82rem", color: "#999" }}>Google 評價 {stats.total} 則</div>
                        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "16px" }}>
                            {[
                                { label: "5星", count: stats.five, pct: Math.round(stats.five / stats.total * 100) },
                                { label: "4星", count: stats.four, pct: Math.round(stats.four / stats.total * 100) },
                            ].map(s => (
                                <div key={s.label} style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: "0.75rem", color: "#C8AD7F" }}>{s.label}</div>
                                    <div style={{ fontSize: "1.1rem", fontWeight: 500, color: "#3D3830" }}>{s.pct}%</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gap: "16px" }}>
                    {reviews.map((r, i) => (
                        <Reveal key={i}>
                            <div style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                                    <div>
                                        <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "#3D3830" }}>{r.author}</span>
                                        <span style={{ fontSize: "0.72rem", color: "#BEB5A8", marginLeft: "10px" }}>{r.group}</span>
                                    </div>
                                    <span style={{ fontSize: "0.7rem", color: "#C8AD7F" }}>{r.date}</span>
                                </div>
                                <div style={{ fontSize: "0.75rem", marginBottom: "10px" }}>
                                    {"⭐".repeat(r.rating)}
                                </div>
                                <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 2 }}>{r.text}</p>
                                <div style={{ fontSize: "0.7rem", color: "#BEB5A8", marginTop: "8px" }}>{r.property}</div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal>
                    <div style={{ textAlign: "center", marginTop: "30px" }}>
                        <p style={{ fontSize: "0.82rem", color: "#999", marginBottom: "16px" }}>期待你也成為我們的故事</p>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>查詢空房</Link>
                            <a href="https://g.page/r/CQvfS4dZvVleEBM/review" target="_blank" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>留下你的評價</a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
