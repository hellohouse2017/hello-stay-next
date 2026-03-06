import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
    title: "你好哇寓所 | 高雄包棟民宿 | 6-26人鹽埕駁二質感旅宿",
    description: "高雄鹽埕區合法包棟首選。你好哇寓所提供6-26人彈性包棟，配備豪華中島廚房、麻將桌、多元房型。步行即達駁二藝術特區、大港橋。",
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
    { text: "客廳有麻將桌太加分！還有電視可以看 Netflix。每間都有獨立衛浴。", author: "C 小姐" },
];

export default function HelloHousePage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify([
                    {
                        "@context": "https://schema.org", "@type": "LodgingBusiness",
                        name: "你好哇寓所 Hello House", url: "https://www.hello-stay.com/hellohouse",
                        telephone: "+886-932-828-922",
                        description: "高雄鹽埕區質感包棟民宿，6-26人彈性包棟。配備豪華中島廚房、麻將桌、KTV。步行10分鐘到駁二藝術特區。",
                        address: { "@type": "PostalAddress", streetAddress: "大公路70巷8號", addressLocality: "鹽埕區", addressRegion: "高雄市", postalCode: "803", addressCountry: "TW" },
                        geo: { "@type": "GeoCoordinates", latitude: 22.6245, longitude: 120.2823 },
                        priceRange: "$$", checkinTime: "16:00", checkoutTime: "11:00",
                        numberOfRooms: 6, petsAllowed: false,
                        amenityFeature: [
                            { "@type": "LocationFeatureSpecification", name: "中島廚房", value: true },
                            { "@type": "LocationFeatureSpecification", name: "麻將桌", value: true },
                            { "@type": "LocationFeatureSpecification", name: "KTV", value: true },
                            { "@type": "LocationFeatureSpecification", name: "免費 Wi-Fi", value: true },
                            { "@type": "LocationFeatureSpecification", name: "獨立衛浴", value: true },
                        ],
                        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "87", bestRating: "5" },
                    },
                    {
                        "@context": "https://schema.org", "@type": "FAQPage",
                        mainEntity: [
                            { "@type": "Question", name: "哪裡訂房最便宜？", acceptedAnswer: { "@type": "Answer", text: "官方訂房最優惠！透過 LINE 或網站預訂，免收平台手續費。" } },
                            { "@type": "Question", name: "附近有什麼好玩景點？", acceptedAnswer: { "@type": "Answer", text: "步行即達駁二藝術特區、大港橋、棧貳庫。鄰近愛河、西子灣、壽山動物園。" } },
                            { "@type": "Question", name: "包棟可以容納多少人？", acceptedAnswer: { "@type": "Answer", text: "彈性方案6至26人。兩棟合訂最高可接待38人。" } },
                            { "@type": "Question", name: "有廚房或娛樂設施嗎？", acceptedAnswer: { "@type": "Answer", text: "一樓大型中島廚房（含IH爐、冰箱、餐具）及麻將桌、43吋聯網電視。" } },
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
                                <p>麻將桌、43 吋聯網電視，讓派對時光絕無冷場。</p>
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

            {/* ── Photo Gallery ── */}
            <section className="sec-white">
                <div className="w" style={{ marginBottom: "40px" }}>
                    <Reveal>
                        <div className="label-d" style={{ color: "#8A8279" }}>Gallery</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", letterSpacing: "0.06em" }}>空間一覽</h2>
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
                        { q: "有廚房或娛樂設施嗎？", a: "一樓大型中島廚房（含 IH 爐、冰箱、餐具）及麻將桌。" },
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
