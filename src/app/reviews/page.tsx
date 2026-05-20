import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";

export const metadata: Metadata = {
    title: "高雄包棟民宿評價｜主館 Google 4.5 星・75 則評論｜Hello Stay",
    description: "想看高雄包棟民宿評價？這裡整理主館你好哇寓所 Google 4.5 星、75 則評論，並搭配 Hello Stay 各館實際住客回饋，方便先看口碑再查空房。",
    alternates: { canonical: "https://www.hello-stay.com/reviews" },
    openGraph: {
        title: "高雄包棟民宿評價｜主館 Google 4.5 星・75 則評論",
        description: "整理主館你好哇寓所 Google 評價與 Hello Stay 各館住宿回饋，先看口碑再選館。",
        url: "https://www.hello-stay.com/reviews",
        images: [{ url: "https://www.hello-stay.com/images/cover-bg.webp", width: 1200, height: 630, alt: "Hello Stay 住客評價" }],
    },
};

const reviews = [
    { author: "林小姐", rating: 5, date: "2025-12", property: "你好哇寓所", group: "家族旅遊 18 人", text: "三代同堂的家庭旅遊，體驗太棒了。廚房很大，我們直接在中島煮火鍋，比在外面吃更有家的感覺。阿公阿嬤打麻將打到不想回家，整體乾淨度和入住流程也很順。" },
    { author: "陳先生", rating: 5, date: "2025-11", property: "你好哇寓所", group: "大學畢旅 22 人", text: "畢旅住包棟真的最划算，每人不到一千塊。客廳空間很大，晚上通宵玩桌遊也不擁擠，走路十分鐘就到駁二，附近美食又多，很適合一群同學住在一起。" },
    { author: "王小姐", rating: 5, date: "2025-10", property: "你好哇寓所", group: "婚禮迎娶", text: "在你好哇辦迎娶的體驗很好。一樓客廳很適合闖關遊戲，採光對婚攝非常友善，前一晚伴娘團住在這裡一起準備，整個流程很順。" },
    { author: "張先生", rating: 5, date: "2025-09", property: "溝頂民宿", group: "球隊比賽 12 人", text: "系隊比賽來高雄住溝頂，五層樓空間很夠用。大家可以分層休息，四樓交誼廳集合開會也方便。宵夜買回來後用微波爐加熱、冰箱冰飲料很實用，住起來很自由。" },
    { author: "李小姐", rating: 5, date: "2025-08", property: "你好哇寓所", group: "公司團建 16 人", text: "公司 off-site 選你好哇很適合。白天在客廳開會，晚上大家圍在中島廚房煮火鍋，團隊互動感比住飯店高很多。鹽埕區美食密度也很高。" },
    { author: "黃先生", rating: 5, date: "2025-07", property: "你好哇寓所", group: "朋友聚會 14 人", text: "一群朋友年度聚會住這裡很剛好。晚上煮火鍋配啤酒，接著打麻將到很晚，隔天走去駁二散步消化，行程完全不用趕。" },
    { author: "劉小姐", rating: 5, date: "2025-06", property: "溝頂民宿", group: "家庭旅遊 8 人", text: "帶爸媽和小孩來住溝頂，每層樓都有自己的節奏，不會互相打擾。小孩喜歡附近景點，長輩則喜歡待在交誼空間聊天打麻將，家庭旅行很省心。" },
    { author: "周先生", rating: 5, date: "2025-05", property: "你好哇寓所", group: "跨年派對 20 人", text: "跨年夜在你好哇寓所辦倒數很有氣氛，中島廚房準備火鍋，晚點再一起走去港邊看煙火。比起飯店分房，大家都待在同一個空間更有過節感。" },
    { author: "吳小姐", rating: 4, date: "2025-04", property: "溝頂民宿", group: "朋友小聚 6 人", text: "溝頂很乾淨舒服，大家各自有房間又能在四樓集合聊天。走路就到大溝頂市場和駁二，位置很好，適合小團體慢慢玩鹽埕。" },
    { author: "蔡先生", rating: 5, date: "2025-03", property: "你好哇寓所", group: "劇組拍攝", text: "劇組取景來住你好哇，空間夠大、光線好，巷弄也很有味道。業主配合度高，設備齊全，確實是很適合拍攝和多人進出的場地。" },
];

const stats = { total: 75, rating: 4.5, hosted: "5,000+" };

const faqs = [
    {
        q: "Hello Stay 的 Google 4.5 星是三館合併評價嗎？",
        a: "不是。這裡標示的 Google 4.5 星、75 則評論，指的是主館「你好哇寓所」的 Google 商家評價；其他館別則以官網整理的住客回饋與入住分享為主。",
    },
    {
        q: "住客最常提到哪些優點？",
        a: "你好哇寓所最常被提到的是中島廚房、麻將、多人聚會空間與地點方便；溝頂民宿則常被提到五層樓分層住宿、交誼空間與小團體家庭旅行的舒適度。",
    },
    {
        q: "看完評價後，下一步該做什麼？",
        a: "如果你已經確定日期與人數，直接去 /book 查空房；若還在比較館別，先去 /compare 看三館差異，效率會比只看評論高。",
    },
];

export default function ReviewsPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                {
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    name: "Hello Stay 住客評價",
                    url: "https://www.hello-stay.com/reviews",
                    description: "整理主館你好哇寓所的 Google 評論摘錄，以及 Hello Stay 各館的住客回饋。",
                    about: [
                        { "@type": "LodgingBusiness", name: "你好哇寓所 Hello House" },
                        { "@type": "LodgingBusiness", name: "溝頂民宿 Godin House" },
                    ],
                },
                {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: faqs.map((faq) => ({
                        "@type": "Question",
                        name: faq.q,
                        acceptedAnswer: { "@type": "Answer", text: faq.a },
                    })),
                },
            ]} />
            <div className="w" style={{ maxWidth: "760px", padding: "0 28px 80px" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px", fontWeight: 600 }}>
                            Guest Reviews
                        </div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.08em", color: "var(--text)" }}>
                            高雄包棟民宿評價
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px auto" }} />
                        <p style={{ fontSize: "0.85rem", color: "#999", lineHeight: 1.9, maxWidth: "560px", margin: "0 auto" }}>
                            先看評價，再決定要不要查空房。這裡整理主館 Google 評價與各館常見住客回饋，避免只看照片就下決定。
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "24px" }}>
                        <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "10px" }}>
                            評價怎麼看
                        </div>
                        <p style={{ fontSize: "0.84rem", color: "#666", lineHeight: 1.9, marginBottom: "16px" }}>
                            如果你還在選館，先看{" "}
                            <Link href="/compare" style={{ color: "var(--pri)", textDecoration: "underline" }}>三館比較</Link>
                            {" "}與{" "}
                            <Link href="/kaohsiung-whole-house" style={{ color: "var(--pri)", textDecoration: "underline" }}>完整方案整理</Link>
                            。這一頁主要用來確認口碑與實際入住感受，不是用來取代比較頁。
                        </p>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            <Link href="/compare" style={{ fontSize: "0.78rem", padding: "8px 14px", borderRadius: "20px", background: "var(--bg)", color: "#3D3830", textDecoration: "none", border: "1px solid #EDE8E3" }}>比較三館差異</Link>
                            <Link href="/hellohouse" style={{ fontSize: "0.78rem", padding: "8px 14px", borderRadius: "20px", background: "var(--bg)", color: "#3D3830", textDecoration: "none", border: "1px solid #EDE8E3" }}>看主館你好哇寓所</Link>
                            <Link href="/book" style={{ fontSize: "0.78rem", padding: "8px 14px", borderRadius: "20px", background: "#161618", color: "#fff", textDecoration: "none" }}>查詢空房</Link>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "14px", marginBottom: "24px" }}>
                        <div style={{ background: "#fff", borderRadius: "16px", padding: "28px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", textAlign: "center" }}>
                            <div style={{ fontSize: "2.6rem", fontFamily: "var(--en)", fontWeight: 300, color: "#3D3830" }}>{stats.rating}</div>
                            <div style={{ fontSize: "1.05rem", marginBottom: "6px" }}>★★★★☆</div>
                            <div style={{ fontSize: "0.78rem", color: "#999", lineHeight: 1.7 }}>主館你好哇寓所<br />Google 評價 {stats.total} 則</div>
                        </div>
                        <div style={{ background: "#fff", borderRadius: "16px", padding: "28px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", textAlign: "center" }}>
                            <div style={{ fontSize: "2rem", fontFamily: "var(--en)", fontWeight: 300, color: "#3D3830" }}>{stats.hosted}</div>
                            <div style={{ fontSize: "0.78rem", color: "#999", lineHeight: 1.7 }}>自 2017 年起<br />服務旅客組數</div>
                        </div>
                        <div style={{ background: "#fff", borderRadius: "16px", padding: "28px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", textAlign: "center" }}>
                            <div style={{ fontSize: "0.92rem", fontWeight: 500, color: "#3D3830", marginBottom: "8px" }}>最常被提到</div>
                            <div style={{ fontSize: "0.78rem", color: "#999", lineHeight: 1.8 }}>中島廚房・麻將・地點方便・多人聚會空間</div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "22px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "24px", borderLeft: "4px solid var(--pri)" }}>
                        <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "10px" }}>重要說明</div>
                        <p style={{ fontSize: "0.84rem", color: "#666", lineHeight: 1.9 }}>
                            這頁顯示的 Google 4.5 星、75 則評論，只代表主館「你好哇寓所」的 Google 商家口碑；
                            溝頂民宿目前則以官網整理的入住回饋為主，避免把不同館別的評價混成同一個分數。
                        </p>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gap: "16px" }}>
                    {reviews.map((review, index) => (
                        <Reveal key={index}>
                            <div style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
                                    <div>
                                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginBottom: "6px" }}>
                                            <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "#3D3830" }}>{review.author}</span>
                                            <span style={{ fontSize: "0.72rem", color: "#BEB5A8" }}>{review.group}</span>
                                        </div>
                                        <div style={{ display: "inline-flex", padding: "4px 10px", borderRadius: "999px", background: "var(--bg)", fontSize: "0.72rem", color: "#8A8279" }}>
                                            {review.property}
                                        </div>
                                    </div>
                                    <span style={{ fontSize: "0.7rem", color: "var(--pri)", whiteSpace: "nowrap" }}>{review.date}</span>
                                </div>
                                <div style={{ fontSize: "0.75rem", marginBottom: "10px" }}>
                                    {"⭐".repeat(review.rating)}
                                </div>
                                <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 2 }}>{review.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal>
                    <section style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginTop: "28px", marginBottom: "28px" }}>
                        <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "18px" }}>
                            FAQ
                        </div>
                        {faqs.map((faq) => (
                            <div key={faq.q} style={{ padding: "16px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                                <div style={{ fontWeight: 500, fontSize: "0.92rem", marginBottom: "6px", color: "#3D3830" }}>{faq.q}</div>
                                <div style={{ fontSize: "0.84rem", color: "#666", lineHeight: 1.9 }}>{faq.a}</div>
                            </div>
                        ))}
                    </section>
                </Reveal>

                <Reveal>
                    <div style={{ textAlign: "center", marginTop: "30px" }}>
                        <p style={{ fontSize: "0.82rem", color: "#999", marginBottom: "16px" }}>看完評價後，直接用日期與人數確認房況會更準確。</p>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em", textDecoration: "none" }}>
                                查詢空房
                            </Link>
                            <a href="https://g.page/r/CQvfS4dZvVleEBM/review" target="_blank" rel="noopener noreferrer" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em", textDecoration: "none" }}>
                                留下你的評價
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
