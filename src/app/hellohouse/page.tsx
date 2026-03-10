import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
    title: "你好哇寓所 | 高雄包棟民宿 | 6-26人鹽埕駁二質感旅宿",
    description: "高雄鹽埕區合法包棟首選｜你好哇寓所提供6-26人彈性包棟，配備豪華中島廚房、手動麻將桌、多元房型。電梯大樓含停車指引，步行即達駁二藝術特區、大港橋。綜藝玩很大拍攝場地，家族旅遊、朋友聚會、企業包場最佳選擇。",
    alternates: { canonical: "https://www.hello-stay.com/hellohouse" },
};

const galleryImages = [
    { src: "/images/hellohouse/photo1.jpg", alt: "你好哇寓所 客廳空間" },
    { src: "/images/hellohouse/photo2.jpg", alt: "你好哇寓所 廚房設備" },
    { src: "/images/hellohouse/photo3.jpg", alt: "你好哇寓所 房間" },
    { src: "/images/hellohouse/photo4.jpg", alt: "你好哇寓所 空間細節" },
    { src: "/images/hellohouse/photo5.jpg", alt: "你好哇寓所 環境" },
    { src: "/images/hellohouse/bar-2.jpg", alt: "你好哇寓所 吧台區" },
];

const reviews = [
    { text: "一樓的中島廚房真的太棒了！鍋碗瓢盆都很齊全，大家聚在一起煮火鍋喝酒，氣氛滿分。", author: "T 先生" },
    { text: "離駁二走路只要10分鐘。隔音意外的好，晚上睡覺很安靜，床墊支撐性也很夠。", author: "L 小姐" },
    { text: "老闆非常熱情親切。合法的民宿，消防設施都有，住得很安心。電子鎖密碼入住超方便。", author: "W 先生" },
    { text: "客廳有麻將太加分！還有電視可以看 Netflix。每間都有獨立衛浴。", author: "C 小姐" },
];

export default function HelloHousePage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify([
                    {
                        "@context": "https://schema.org", "@type": "LodgingBusiness",
                        "@id": "https://www.hello-stay.com/hellohouse/#lodging",
                        name: "你好哇寓所 Hello House",
                        alternateName: ["Hello House", "你好哇", "Hello Stay 一館"],
                        url: "https://www.hello-stay.com/hellohouse",
                        telephone: "+886-932-828-922",
                        description: "高雄鹽埕區質感包棟民宿，6-26人彈性包棟。配備豪華中島廚房、麻將桌、桌遊。步行10分鐘到駁二藝術特區。綜藝玩很大、我們回家吧2等節目拍攝場地。",
                        address: { "@type": "PostalAddress", streetAddress: "大公路70巷8號", addressLocality: "鹽埕區", addressRegion: "高雄市", postalCode: "803", addressCountry: "TW" },
                        geo: { "@type": "GeoCoordinates", latitude: 22.6245, longitude: 120.2823 },
                        hasMap: "https://goo.gl/maps/qxGN4mpNP8qfRCB16",
                        priceRange: "$$", checkinTime: "16:00", checkoutTime: "11:00",
                        numberOfRooms: 6, petsAllowed: false,
                        amenityFeature: [
                            { "@type": "LocationFeatureSpecification", name: "中島廚房", value: true },
                            { "@type": "LocationFeatureSpecification", name: "麻將桌", value: true },
                            { "@type": "LocationFeatureSpecification", name: "免費 Wi-Fi", value: true },
                            { "@type": "LocationFeatureSpecification", name: "獨立衛浴", value: true },
                            { "@type": "LocationFeatureSpecification", name: "冷氣", value: true },
                            { "@type": "LocationFeatureSpecification", name: "Netflix 聯網電視", value: true },
                            { "@type": "LocationFeatureSpecification", name: "洗衣機", value: true },
                            { "@type": "LocationFeatureSpecification", name: "電子密碼鎖", value: true },
                        ],
                        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "87", bestRating: "5" },
                        review: [
                            { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5" }, author: { "@type": "Person", name: "T先生" }, reviewBody: "一樓的中島廚房真的太棒了！鍋碗瓢盆都很齊全，大家聚在一起煮火鍋喝酒，氣氛滿分。" },
                            { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5" }, author: { "@type": "Person", name: "L小姐" }, reviewBody: "離駁二走路只要10分鐘。隔音意外的好，晚上睡覺很安靜，床墊支撐性也很夠。" },
                            { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5" }, author: { "@type": "Person", name: "W先生" }, reviewBody: "老闆非常熱情親切。合法的民宿，消防設施都有，住得很安心。電子鎖密碼入住超方便。" },
                        ],
                        tourBookingPage: "https://www.hello-stay.com/book",
                        speakable: { "@type": "SpeakableSpecification", cssSelector: [".hero-d .content", ".sec-cream h2", ".sec-cream p"] },
                    },
                    {
                        "@context": "https://schema.org", "@type": "FAQPage",
                        mainEntity: [
                            { "@type": "Question", name: "你好哇寓所有哪些房型？", acceptedAnswer: { "@type": "Answer", text: "提供雙人房、四人房、六人房，共6間房。全室獨立衛浴、乾濕分離。其中有網美吊椅房型，非常適合拍照打卡。" } },
                            { "@type": "Question", name: "你好哇寓所有被電視節目拍過嗎？", acceptedAnswer: { "@type": "Answer", text: "是的！曾上過「我們回家吧2」（曾寶儀主持）、「綜藝玩很大」（吳宗憲、KID）、「我的明星村長」（卜學亮、郭泓志）等多個知名節目，是劇組與明星的一致首選民宿。" } },
                            { "@type": "Question", name: "廚房設備有哪些？", acceptedAnswer: { "@type": "Answer", text: "一樓豪華中島廚房配備：IH爐、微波爐、冰箱、完整鍋碗瓢盆、餐具、調味料架。可同時4-6人下廚。適合煮火鍋、包水餃、做早餐。" } },
                            { "@type": "Question", name: "包棟可以容納多少人？", acceptedAnswer: { "@type": "Answer", text: "彈性方案6至26人。兩棟合訂（你好哇＋溝頂）最高可接待38人，三館聯訂最大48人。" } },
                            { "@type": "Question", name: "哪裡訂房最便宜？", acceptedAnswer: { "@type": "Answer", text: "官方訂房最優惠！透過 LINE 官方帳號或官網 www.hello-stay.com 預訂，免收平台手續費。" } },
                            { "@type": "Question", name: "附近有什麼好玩景點？", acceptedAnswer: { "@type": "Answer", text: "步行即達駁二藝術特區、大港橋、棧貳庫、哈瑪星鐵道園區。鄰近愛河、西子灣、壽山動物園、旗津渡輪。" } },
                            { "@type": "Question", name: "有廚房和娛樂設施嗎？", acceptedAnswer: { "@type": "Answer", text: "一樓大型中島廚房（含IH爐、冰箱、完整餐具），麻將、桌遊歡唱設備、43吋Netflix聯網電視、製冰機。" } },
                            { "@type": "Question", name: "隔音好嗎？睡覺會不會吵？", acceptedAnswer: { "@type": "Answer", text: "隔音非常好，住客評價「隔音意外的好，晚上睡覺很安靜」。但位於住宅區，23:00後請降低音量，為鄰居著想。" } },
                        ],
                    },
                ])
            }} />

            {/* ── Hero (D-style: dark + gold) ── */}
            <section className="hero-d">
                <div className="bg" style={{ backgroundImage: "url('/images/hellohouse/cover.jpg')", opacity: 0.5 }} />
                <div className="overlay" />
                <div className="content" style={{ padding: "0 28px" }}>
                    <div className="tagline" style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.2s forwards" }}>
                        Hello House · Est. 2017
                    </div>
                    <h1 style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.4s forwards" }}>
                        你好哇寓所
                    </h1>
                    <p className="sub" style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.6s forwards" }}>
                        6 – 26 人 · 鹽埕質感包棟
                    </p>
                    <div style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.8s forwards" }}>
                        <Link href="/book" className="btn-reserve">查詢空房</Link>
                    </div>
                </div>
            </section>

            {/* ── Intro (editorial split) ── */}
            <section className="sec-cream">
                <div className="w">
                    <Reveal>
                        <div className="grid-asym" style={{ marginBottom: "0" }}>
                            <div className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                <Image src="/images/hellohouse/photo1.jpg" alt="你好哇寓所 大廳" width={700} height={525} className="img-cover" />
                            </div>
                            <div>
                                <div className="label-d" style={{ color: "#C8AD7F" }}>About</div>
                                <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", marginBottom: "16px", letterSpacing: "0.06em" }}>在港都巷弄裡，<br />遇見有溫度的空間</h2>
                                <div className="gold-line" style={{ marginBottom: "20px" }} />
                                <p style={{ fontSize: "0.92rem", color: "#8A8279", lineHeight: 2.2 }}>
                                    座落於高雄鹽埕區核心，「你好哇・寓所」是您探索港都的最佳基地。
                                    我們專注於 6 至 26 人的獨立包棟空間。
                                    在這裡沒有外人的打擾，只有您與親朋好友在寬敞的中島廚房圍爐、在客廳歡笑的珍貴時刻。
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── 3 Features (D-theme dark) ── */}
            <section className="sec-dark">
                <div className="w" style={{ textAlign: "center", marginBottom: "50px" }}>
                    <Reveal>
                        <div className="label-d">Highlights</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", color: "#fff", letterSpacing: "0.06em" }}>為什麼選擇你好哇</h2>
                    </Reveal>
                </div>
                <div className="w">
                    <Reveal>
                        <div className="col3">
                            <div className="col3-item">
                                <div className="gold" style={{ fontSize: "1.6rem", marginBottom: "4px" }}>🍳</div>
                                <h3 style={{ color: "#fff" }}>豪宅級中島廚房</h3>
                                <p>開放式空間，IH 爐、微波爐、完整餐具，聚餐煮火鍋首選。</p>
                            </div>
                            <div className="col3-item">
                                <div className="gold" style={{ fontSize: "1.6rem", marginBottom: "4px" }}>🀄</div>
                                <h3 style={{ color: "#fff" }}>專屬娛樂設施</h3>
                                <p>麻將、43 吋聯網電視，讓派對時光絕無冷場。</p>
                            </div>
                            <div className="col3-item">
                                <div className="gold" style={{ fontSize: "1.6rem", marginBottom: "4px" }}>🛏️</div>
                                <h3 style={{ color: "#fff" }}>多元舒適房型</h3>
                                <p>雙人至六人房靈活配置，全室乾濕分離衛浴，更有網美吊椅房型。</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── Room Details ── */}
            <section className="sec-white">
                <div className="w" style={{ marginBottom: "50px" }}>
                    <Reveal>
                        <div className="label-d" style={{ color: "#8A8279" }}>Rooms</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", letterSpacing: "0.06em" }}>房型與空間介紹</h2>
                        <p style={{ fontSize: "0.9rem", color: "#8A8279", marginTop: "10px" }}>全館 6 間客房皆配備獨立筒床墊、乾濕分離衛浴、聯網電視與冷暖空調</p>
                    </Reveal>
                </div>

                {/* 1F 公共空間 */}
                <div className="w">
                    <Reveal>
                        <div className="room-detail-card">
                            <div className="room-detail-img">
                                <Image src="/images/hellohouse/1000.jpg" alt="1F 公共空間 — 中島廚房與交誼區" width={700} height={500} className="img-cover" />
                            </div>
                            <div className="room-detail-info">
                                <div className="room-floor-tag">1F</div>
                                <h3>公共空間</h3>
                                <p className="room-subtitle">寬敞舒適的交誼核心，大家聚在一起最棒的空間。</p>
                                <div className="room-badges">
                                    <span className="room-badge">56 m²</span>
                                    <span className="room-badge gold">豪華中島廚房</span>
                                    <span className="room-badge">獨立衛浴</span>
                                </div>
                                <div className="room-amenities">
                                    <span>🍳 雙口IH爐 / 抽油煙機</span>
                                    <span>🧊 RO飲水機 / 雙門冰箱</span>
                                    <span>🍞 烤箱 / 微波爐</span>
                                    <span>📺 聯網電視</span>
                                    <span>🀄 麻將 / 撲克牌</span>
                                    <span>❄️ 一級冷暖空調</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* 2F-1201 雙人房 */}
                <div className="w">
                    <Reveal>
                        <div className="room-detail-card reverse">
                            <div className="room-detail-img">
                                <Image src="/images/hellohouse/1201.jpg" alt="2F-1201 雙人房" width={700} height={500} className="img-cover" />
                            </div>
                            <div className="room-detail-info">
                                <div className="room-floor-tag">2F</div>
                                <h3>1201 雙人房</h3>
                                <p className="room-subtitle">標準舒適空間，溫馨的休憩角落。</p>
                                <div className="room-badges">
                                    <span className="room-badge">24 m²</span>
                                    <span className="room-badge gold">對外氣密窗</span>
                                    <span className="room-badge">乾濕分離衛浴</span>
                                </div>
                                <div className="room-amenities">
                                    <span>🛏️ 標準雙人床</span>
                                    <span>💻 書桌</span>
                                    <span>📺 聯網電視</span>
                                    <span>❄️ 空調 / 吹風機</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* 2F-1202 四人房 */}
                <div className="w">
                    <Reveal>
                        <div className="room-detail-card">
                            <div className="room-detail-img">
                                <Image src="/images/hellohouse/1202.jpg" alt="2F-1202 四人房 — 網美吊椅房" width={700} height={500} className="img-cover" />
                            </div>
                            <div className="room-detail-info">
                                <div className="room-floor-tag">2F</div>
                                <h3>1202 四人房</h3>
                                <p className="room-subtitle">極佳採光與網美設施，拍照打卡首選。</p>
                                <div className="room-badges">
                                    <span className="room-badge">40 m²</span>
                                    <span className="room-badge gold">落地玻璃採光</span>
                                    <span className="room-badge gold">✨ 網美吊椅</span>
                                </div>
                                <div className="room-amenities">
                                    <span>🛏️ 標準雙人床 ×2</span>
                                    <span>🪑 沙發 / 茶几 / 吊椅</span>
                                    <span>📺 聯網電視</span>
                                    <span>🚿 乾濕分離衛浴</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* 3F-1302 六人房 */}
                <div className="w">
                    <Reveal>
                        <div className="room-detail-card reverse">
                            <div className="room-detail-img">
                                <Image src="/images/hellohouse/1302.jpg" alt="3F-1302 六人房" width={700} height={500} className="img-cover" />
                            </div>
                            <div className="room-detail-info">
                                <div className="room-floor-tag">3F</div>
                                <h3>1302 六人房</h3>
                                <p className="room-subtitle">寬敞團體空間，適合家庭或好朋友同住。</p>
                                <div className="room-badges">
                                    <span className="room-badge">48 m²</span>
                                    <span className="room-badge gold">落地玻璃採光</span>
                                    <span className="room-badge">乾濕分離衛浴</span>
                                </div>
                                <div className="room-amenities">
                                    <span>🛏️ 雙人床 (150×200) ×3</span>
                                    <span>💻 書桌</span>
                                    <span>📺 聯網電視</span>
                                    <span>❄️ 空調 / 吹風機</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* 4F-1401 雙人房 */}
                <div className="w">
                    <Reveal>
                        <div className="room-detail-card">
                            <div className="room-detail-img">
                                <Image src="/images/hellohouse/1401.jpg" alt="4F-1401 雙人房" width={700} height={500} className="img-cover" />
                            </div>
                            <div className="room-detail-info">
                                <div className="room-floor-tag">4F</div>
                                <h3>1401 雙人房</h3>
                                <p className="room-subtitle">雅緻高樓層視野，享受安靜的私人時光。</p>
                                <div className="room-badges">
                                    <span className="room-badge">24 m²</span>
                                    <span className="room-badge gold">對外落地窗</span>
                                    <span className="room-badge">乾濕分離衛浴</span>
                                </div>
                                <div className="room-amenities">
                                    <span>🛏️ 標準雙人床</span>
                                    <span>🪑 沙發 / 茶几</span>
                                    <span>📺 聯網電視</span>
                                    <span>❄️ 空調 / 吹風機</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* 4F-1402 六人房 */}
                <div className="w">
                    <Reveal>
                        <div className="room-detail-card reverse">
                            <div className="room-detail-img">
                                <Image src="/images/hellohouse/1402.jpg" alt="4F-1402 六人房" width={700} height={500} className="img-cover" />
                            </div>
                            <div className="room-detail-info">
                                <div className="room-floor-tag">4F</div>
                                <h3>1402 六人房</h3>
                                <p className="room-subtitle">高樓層大空間，視野開闊，團體入住首選。</p>
                                <div className="room-badges">
                                    <span className="room-badge">45 m²</span>
                                    <span className="room-badge gold">落地玻璃採光</span>
                                    <span className="room-badge">乾濕分離衛浴</span>
                                </div>
                                <div className="room-amenities">
                                    <span>🛏️ 雙人床 (150×200) ×3</span>
                                    <span>💻 書桌</span>
                                    <span>📺 聯網電視</span>
                                    <span>❄️ 空調 / 吹風機</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── Photo Gallery ── */}
            <section className="sec-cream">
                <div className="w" style={{ marginBottom: "40px" }}>
                    <Reveal>
                        <div className="label-d" style={{ color: "#8A8279" }}>Gallery</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", letterSpacing: "0.06em" }}>更多空間實景</h2>
                    </Reveal>
                </div>
                <div className="w">
                    <Reveal>
                        <div className="grid-3">
                            {galleryImages.map((img) => (
                                <div key={img.src} className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                    <Image src={img.src} alt={img.alt} width={400} height={300} className="img-cover" />
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── Reviews (dark) ── */}
            <section className="sec-dark">
                <div className="w" style={{ maxWidth: "700px" }}>
                    <Reveal>
                        <div className="label-d">Testimonials</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", color: "#fff", marginBottom: "40px", letterSpacing: "0.06em" }}>住客真實好評</h2>
                    </Reveal>
                    {reviews.map((r, i) => (
                        <Reveal key={i}>
                            <div className="review-item">
                                <div className="stars">★ ★ ★ ★ ★</div>
                                <p className="text">&ldquo;{r.text}&rdquo;</p>
                                <div className="author">— {r.author}</div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── Media (cream) ── */}
            <section className="sec-cream">
                <div className="w" style={{ maxWidth: "700px" }}>
                    <Reveal>
                        <div className="label-d" style={{ color: "#8A8279" }}>Media</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", marginBottom: "30px", letterSpacing: "0.06em" }}>劇組與明星的一致首選</h2>
                    </Reveal>
                    {[
                        { show: "我們回家吧 2", cast: "曾寶儀", url: "http://www.youtube.com/watch?v=L09FRVlfPgU" },
                        { show: "綜藝玩很大", cast: "吳宗憲、KID、坤達", url: "https://youtu.be/ohgLr40pOrA?t=99" },
                        { show: "我的明星村長", cast: "卜學亮、郭泓志、姚元浩", url: "https://youtu.be/IveYmupy8XM?t=2657" },
                    ].map((s) => (
                        <Reveal key={s.show}>
                            <div style={{ padding: "20px 0", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <div style={{ fontWeight: 500, fontSize: "0.95rem" }}>{s.show}</div>
                                    <div style={{ fontSize: "0.78rem", color: "#aaa" }}>{s.cast}</div>
                                </div>
                                <a href={s.url} target="_blank" rel="noreferrer" style={{ fontSize: "0.82rem", color: "#C8AD7F", letterSpacing: "0.05em" }}>
                                    觀看片段 →
                                </a>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="sec-white">
                <div className="w" style={{ maxWidth: "700px" }}>
                    <Reveal>
                        <div className="label-d" style={{ color: "#8A8279" }}>FAQ</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", marginBottom: "30px", letterSpacing: "0.06em" }}>常見問題</h2>
                    </Reveal>
                    {[
                        { q: "哪裡訂房最便宜？", a: "官方訂房最優惠！透過 LINE 或網站預訂，免收平台手續費。" },
                        { q: "附近有什麼好玩景點？", a: "步行即達駁二藝術特區、大港橋、棧貳庫。鄰近愛河、西子灣、壽山動物園。" },
                        { q: "包棟可以容納多少人？", a: "彈性方案 6 至 26 人。兩棟合訂最高可接待 38 人。" },
                        { q: "有廚房或娛樂設施嗎？", a: "一樓大型中島廚房（含 IH 爐、冰箱、餐具）及麻將。" },
                    ].map(faq => (
                        <Reveal key={faq.q}>
                            <div style={{ padding: "22px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                                <div style={{ fontWeight: 500, fontSize: "0.95rem", marginBottom: "6px" }}>{faq.q}</div>
                                <div style={{ fontSize: "0.88rem", color: "#8A8279", lineHeight: 2 }}>{faq.a}</div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <div className="cta-strip">
                <Reveal>
                    <h3>準備好開啟您的高雄之旅？</h3>
                    <p>無論是家族旅遊還是朋友派對，我們都準備好了。</p>
                    <Link href="/book" className="btn-reserve">立即查詢空房</Link>
                </Reveal>
            </div>
        </>
    );
}
