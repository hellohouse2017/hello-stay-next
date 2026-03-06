import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
    title: "高雄包棟民宿推薦 | 你好哇寓所 | 6-26人鹽埕駁二包棟首選",
    description: "尋找高雄包棟民宿？推薦鹽埕區「你好哇寓所」。合法民宿執照，近駁二與捷運站。提供豪華中島廚房、麻將設備，6-26人彈性包棟方案。",
    alternates: { canonical: "https://www.hello-stay.com/hellohouse" },
};

const reviews = [
    { tag: "廚房設備超讚", text: "一樓的中島廚房真的太棒了！鍋碗瓢盆都很齊全，大家聚在一起煮火鍋喝酒，氣氛滿分。", author: "T 先生" },
    { tag: "地點絕佳", text: "離駁二走路只要10分鐘。隔音意外的好，晚上睡覺很安靜，床墊支撐性也很夠。", author: "L 小姐" },
    { tag: "管家親切", text: "老闆非常熱情親切。合法的民宿，消防設施都有，讓人住得很安心。電子鎖密碼很方便。", author: "W 先生" },
    { tag: "設施豐富", text: "客廳有電動麻將桌太加分了！還有大電視可以看 Netflix。每間都有獨立衛浴。", author: "C 小姐" },
];

const features = [
    { icon: "fa-solid fa-kitchen-set", title: "豪宅級中島廚房", desc: "56㎡ 開放空間，IH爐、微波爐、完整餐具，聚餐煮火鍋首選。" },
    { icon: "fa-solid fa-dice", title: "專屬娛樂設施", desc: "電動麻將桌、55吋聯網電視、投影設備，派對時光絕無冷場。" },
    { icon: "fa-solid fa-bed", title: "多元舒適房型", desc: "雙人至六人房靈活配置，全室乾濕分離衛浴，更有網美吊椅房型。" },
    { icon: "fa-solid fa-map-location-dot", title: "絕佳地理位置", desc: "步行至駁二 10 分鐘、大港橋 5 分鐘，鹽埕美食環繞。" },
];

const stars = [
    { show: "我們回家吧 2", cast: "曾寶儀", url: "http://www.youtube.com/watch?v=L09FRVlfPgU" },
    { show: "綜藝玩很大", cast: "吳宗憲、KID、坤達", url: "https://youtu.be/ohgLr40pOrA?t=99" },
    { show: "我的明星村長", cast: "卜學亮、郭泓志、姚元浩", url: "https://youtu.be/IveYmupy8XM?t=2657" },
];

export default function HelloHousePage() {
    return (
        <>
            {/* Hero */}
            <section
                style={{
                    position: "relative",
                    height: "75vh",
                    minHeight: "550px",
                    display: "flex",
                    alignItems: "flex-end",
                    overflow: "hidden",
                    background: "#0a0a0a",
                }}
            >
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/hellohouse/cover.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.55, animation: "zoomSlow 25s infinite alternate" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)" }} />
                <div style={{ position: "relative", zIndex: 2, padding: "60px 0", width: "100%" }}>
                    <div className="container">
                        <div style={{ fontFamily: "var(--font-en)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--c-gold-light)", marginBottom: "16px", opacity: 0, animation: "fadeInUp 0.8s ease 0.2s forwards" }}>
                            Hello House · Est. 2017
                        </div>
                        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white", fontWeight: 600, letterSpacing: "0.06em", lineHeight: 1.3, marginBottom: "24px", opacity: 0, animation: "fadeInUp 0.8s ease 0.4s forwards" }}>
                            你好哇寓所
                        </h1>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", opacity: 0, animation: "fadeInUp 0.8s ease 0.6s forwards" }}>
                            {["6-26人彈性包棟", "紅磚中島廚房", "近駁二藝術特區"].map(t => (
                                <span key={t} className="badge" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.15)" }}>{t}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section className="section" style={{ background: "white" }}>
                <div className="container" style={{ maxWidth: "750px", textAlign: "center" }}>
                    <Reveal>
                        <span className="section-label" style={{ justifyContent: "center" }}>Welcome</span>
                        <p style={{ fontSize: "1.15rem", lineHeight: 2.2, color: "var(--c-text-soft)" }}>
                            座落於高雄鹽埕區核心，<strong style={{ color: "var(--c-text)" }}>「你好哇・寓所」</strong>是您探索港都的最佳基地。
                            我們專注於提供 <strong style={{ color: "var(--c-text)" }}>6 至 26 人</strong> 的獨立包棟空間，
                            在這裡沒有外人的打擾，只有您與親朋好友在寬敞的中島廚房圍爐、在客廳歡笑的珍貴時刻。
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Gallery */}
            <section style={{ padding: "0 0 var(--space-2xl)" }}>
                <div className="container">
                    <Reveal>
                        <div className="gallery-grid">
                            {[
                                { src: "/images/hellohouse/photo1.jpg", alt: "你好哇寓所 - 寬敞客廳聚會空間" },
                                { src: "/images/hellohouse/photo2.jpg", alt: "你好哇寓所 - 紅磚中島廚房" },
                                { src: "/images/hellohouse/photo3.jpg", alt: "你好哇寓所 - 舒適臥房" },
                            ].map(img => (
                                <div key={img.src} className="gallery-img">
                                    <Image src={img.src} alt={img.alt} width={800} height={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Features */}
            <section className="section" style={{ background: "var(--c-warm-white)" }}>
                <div className="container">
                    <Reveal>
                        <span className="section-label">Why Choose Us</span>
                        <h2 className="section-heading">為什麼選擇你好哇？</h2>
                    </Reveal>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginTop: "50px" }}>
                        {features.map((f, i) => (
                            <Reveal key={f.title} delay={i + 1}>
                                <div className="feature-card">
                                    <div className="feature-icon"><i className={f.icon} /></div>
                                    <h3 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>{f.title}</h3>
                                    <p style={{ color: "var(--c-text-soft)", fontSize: "0.9rem", lineHeight: 1.8 }}>{f.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Media */}
            <section className="section">
                <div className="container">
                    <Reveal>
                        <span className="section-label">Media Exposure</span>
                        <h2 className="section-heading">劇組與明星的一致首選</h2>
                    </Reveal>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "50px" }}>
                        {stars.map((s, i) => (
                            <Reveal key={s.show} delay={i + 1}>
                                <div className="card" style={{ padding: "32px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                                        <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "var(--c-gold-glow)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--c-gold)" }}>
                                            <i className="fa-solid fa-tv" />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: "1rem" }}>{s.show}</div>
                                            <div style={{ fontSize: "0.8rem", color: "var(--c-text-muted)" }}>{s.cast}</div>
                                        </div>
                                    </div>
                                    <a href={s.url} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--c-gold)", fontWeight: 500 }}>
                                        <i className="fa-brands fa-youtube" /> 觀看片段
                                        <i className="fa-solid fa-arrow-right" style={{ fontSize: "0.7rem" }} />
                                    </a>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews */}
            <section className="section" style={{ background: "var(--c-charcoal)", color: "white" }}>
                <div className="container">
                    <Reveal>
                        <span className="section-label" style={{ color: "var(--c-gold-light)" }}>Testimonials</span>
                        <h2 className="section-heading" style={{ color: "white" }}>住客真實好評</h2>
                    </Reveal>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginTop: "50px" }}>
                        {reviews.map((r, i) => (
                            <Reveal key={r.tag} delay={i + 1}>
                                <div style={{ padding: "32px", borderRadius: "var(--radius)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
                                    <div style={{ color: "var(--c-gold)", fontSize: "0.7rem", letterSpacing: "2px", marginBottom: "12px" }}>
                                        {[...Array(5)].map((_, j) => <i key={j} className="fa-solid fa-star" />)}
                                    </div>
                                    <span className="review-tag" style={{ marginBottom: "16px", display: "inline-block" }}>{r.tag}</span>
                                    <p style={{ fontSize: "0.92rem", lineHeight: 1.9, color: "rgba(255,255,255,0.75)", fontStyle: "italic", margin: "16px 0" }}>&ldquo;{r.text}&rdquo;</p>
                                    <div style={{ fontSize: "0.8rem", color: "var(--c-text-muted)" }}>— {r.author}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section" style={{ background: "var(--c-cream)" }}>
                <div className="container">
                    <Reveal>
                        <div className="cta-block">
                            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "white", marginBottom: "16px" }}>
                                準備好開啟您的高雄之旅了嗎？
                            </h3>
                            <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "36px", lineHeight: 2 }}>
                                無論是家族旅遊還是朋友派對，我們都準備好了。
                            </p>
                            <Link href="/book" className="btn btn-gold" style={{ padding: "16px 48px" }}>
                                立即查詢空房
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* FAQ */}
            <section className="section" style={{ background: "white" }}>
                <div className="container" style={{ maxWidth: "750px" }}>
                    <Reveal>
                        <span className="section-label">FAQ</span>
                        <h2 className="section-heading">常見問題</h2>
                    </Reveal>
                    <div style={{ marginTop: "40px" }}>
                        {[
                            { q: "哪裡訂房最便宜？", a: "官方訂房最優惠！透過 LINE 或網站預訂，免收平台手續費，保證比 Agoda / Booking 更划算。" },
                            { q: "附近有什麼好玩景點？", a: "步行即可達駁二藝術特區、大港橋、棧貳庫。鄰近愛河、西子灣、壽山動物園。" },
                            { q: "包棟可以容納多少人？", a: "彈性方案 6 至 26 人皆可。兩棟合訂最高可接待 38 人。" },
                            { q: "有廚房或娛樂設施嗎？", a: "一樓有大型紅磚中島廚房（含電磁爐、冰箱、餐具）及電動麻將桌。" },
                        ].map((faq, i) => (
                            <Reveal key={faq.q} delay={i}>
                                <div className="faq-item" style={{ padding: "24px 0" }}>
                                    <div style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "8px", display: "flex", alignItems: "center", gap: "12px" }}>
                                        <span style={{ color: "var(--c-gold)", fontFamily: "var(--font-en)", fontSize: "0.85rem" }}>Q.</span>
                                        {faq.q}
                                    </div>
                                    <div style={{ color: "var(--c-text-soft)", fontSize: "0.92rem", lineHeight: 1.9, paddingLeft: "28px" }}>{faq.a}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
