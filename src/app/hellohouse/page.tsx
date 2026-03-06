import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "高雄包棟民宿推薦 | 你好哇寓所 | 6-38人鹽埕駁二包棟首選",
    description: "尋找高雄包棟民宿？推薦鹽埕區「你好哇寓所」。合法民宿執照，近駁二與捷運站。提供豪華中島廚房、麻將設備，6-38人彈性包棟方案。",
    keywords: ["高雄包棟民宿", "高雄包棟", "鹽埕區包棟", "駁二住宿", "你好哇寓所", "高雄親子民宿", "員工旅遊包棟"],
    alternates: { canonical: "https://www.hello-stay.com/hellohouse" },
};

const reviews = [
    { tag: "廚房設備超讚", text: "一樓的中島廚房真的太棒了！鍋碗瓢盆都很齊全，大家聚在一起煮火鍋喝酒，氣氛滿分。" },
    { tag: "地點絕佳", text: "離駁二走路只要10分鐘。隔音意外的好，晚上睡覺很安靜，床墊支撐性也很夠。" },
    { tag: "管家親切", text: "老闆非常熱情親切。合法的民宿，消防設施都有，讓人住得很安心。電子鎖密碼很方便。" },
    { tag: "設施豐富", text: "客廳有電動麻將桌太加分了！還有大電視可以看 Netflix。每間都有獨立衛浴。" },
];

const features = [
    { icon: "fa-solid fa-kitchen-set", title: "豪宅級中島廚房", desc: "56平方公尺大空間，IH爐、微波爐一應俱全，聚餐煮火鍋首選。" },
    { icon: "fa-solid fa-dice", title: "專屬娛樂設施", desc: "內建專業麻將桌、聯網電視，讓派對時光絕無冷場。" },
    { icon: "fa-solid fa-bed", title: "多元舒適房型", desc: "雙人至六人房靈活配置，乾濕分離衛浴，更有網美吊椅房型。" },
    { icon: "fa-solid fa-map-location-dot", title: "絕佳地理位置", desc: "步行可達駁二、大港橋，鹽埕在地美食老店環繞。" },
];

const stars = [
    { show: "我們回家吧 2", cast: "來賓：曾寶儀", desc: "深入在地的溫馨訪談，展現寓所的獨特老屋氛圍。", url: "http://www.youtube.com/watch?v=L09FRVlfPgU" },
    { show: "綜藝玩很大", cast: "來賓：吳宗憲、KID、坤達...等", desc: "全體隊員入住！驗證了我們接待大型團體的超強能力。", url: "https://youtu.be/ohgLr40pOrA?t=99" },
    { show: "我的明星村長", cast: "來賓：卜學亮、郭泓志、姚元浩", desc: "明星村長們的高雄駐點，體驗在地生活首選。", url: "https://youtu.be/IveYmupy8XM?t=2657" },
];

export default function HelloHousePage() {
    return (
        <>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LodgingBusiness",
                        name: "你好哇寓所",
                        image: "https://www.hello-stay.com/images/hellohouse/cover.jpg",
                        url: "https://www.hello-stay.com/hellohouse",
                        telephone: "+886-932-828-922",
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: "大公路70巷8號",
                            addressLocality: "鹽埕區",
                            addressRegion: "高雄市",
                            postalCode: "803",
                            addressCountry: "TW",
                        },
                        geo: { "@type": "GeoCoordinates", latitude: 22.6237, longitude: 120.2833 },
                        priceRange: "$$",
                        starRating: { "@type": "Rating", ratingValue: "5" },
                    }),
                }}
            />

            {/* Hero */}
            <header className="relative flex flex-col justify-center items-center text-center text-white overflow-hidden" style={{ height: "70vh", minHeight: "500px", backgroundColor: "var(--c-primary)" }}>
                <div className="absolute inset-0 z-[1]" style={{ backgroundImage: "url('/images/hellohouse/cover.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.6, animation: "zoomSlow 20s infinite alternate" }} />
                <div className="relative z-[2] px-5">
                    <h1 className="text-[clamp(2.2rem,5vw,4rem)] mb-4" style={{ fontFamily: "var(--font-serif)", textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
                        高雄包棟民宿・你好哇寓所
                    </h1>
                    <p className="text-[1.2rem] font-light mb-10 opacity-90">高雄鹽埕區・包棟首選・港都漫遊</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        {["6-38人彈性包棟", "近駁二藝術特區", "豪華中島廚房", "捷運鹽埕埔站"].map(t => (
                            <span key={t} className="bg-white/15 backdrop-blur-sm border border-white/30 px-5 py-2 rounded-full text-[0.9rem]">{t}</span>
                        ))}
                    </div>
                </div>
            </header>

            {/* Story + Gallery */}
            <section className="section-padding relative z-[3] bg-white" style={{ marginTop: "-60px", borderRadius: "30px 30px 0 0", paddingTop: "80px", paddingBottom: "80px" }}>
                <div className="container">
                    <div className="max-w-[750px] mx-auto mb-16 text-center text-[1.15rem] leading-[2.2]" style={{ color: "var(--c-text-gray)" }}>
                        <span className="section-subtitle">WELCOME</span>
                        <p>
                            座落於高雄鹽埕區核心，<strong className="text-[var(--c-primary)] font-bold">「你好哇寓所」</strong>是您探索港都的最佳基地。<br />
                            我們專注於提供 <strong className="text-[var(--c-primary)] font-bold">6 至 38 人</strong> 的獨立包棟空間，<br />
                            在這裡，沒有外人的打擾，<br />
                            只有您與親朋好友在寬敞的中島廚房圍爐、在客廳歡笑的珍貴時刻。
                        </p>
                    </div>

                    <div className="gallery-grid">
                        {[
                            { src: "/images/hellohouse/photo1.jpg", alt: "你好哇寓所 - 寬敞明亮的客廳聚會空間" },
                            { src: "/images/hellohouse/photo2.jpg", alt: "你好哇寓所 - 開放式大中島廚房與圍爐餐桌" },
                            { src: "/images/hellohouse/photo3.jpg", alt: "你好哇寓所 - 舒適溫馨的住宿臥房" },
                            { src: "/images/hellohouse/photo4.jpg", alt: "你好哇寓所 - 專屬麻將桌與交誼廳" },
                        ].map(img => (
                            <div key={img.src} className="gallery-img">
                                <Image src={img.src} alt={img.alt} width={600} height={450} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stars */}
            <section className="section-padding">
                <div className="container">
                    <span className="section-subtitle">MEDIA EXPOSURE</span>
                    <h2 className="section-title">劇組與明星的一致選擇</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stars.map(s => (
                            <div key={s.show} className="card card-accent flex flex-col justify-between">
                                <div>
                                    <div className="text-[1.25rem] font-bold mb-2.5" style={{ fontFamily: "var(--font-serif)" }}>
                                        <i className="fa-solid fa-tv mr-2" /> {s.show}
                                    </div>
                                    <div className="text-[0.9rem] mb-5 leading-relaxed" style={{ color: "var(--c-text-gray)" }}>{s.cast}</div>
                                    <p className="text-[0.9rem]" style={{ color: "#666" }}>{s.desc}</p>
                                </div>
                                <a href={s.url} target="_blank" rel="noreferrer" className="btn btn-youtube mt-5 self-start">
                                    <i className="fa-brands fa-youtube" /> 觀看片段
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section-padding" id="features">
                <div className="container">
                    <h2 className="section-title">為什麼選擇你好哇？</h2>
                    <div className="features-grid">
                        {features.map(f => (
                            <div key={f.title} className="feature-item">
                                <div className="feature-icon"><i className={f.icon} /></div>
                                <h3 className="text-[1.2rem] mb-2.5">{f.title}</h3>
                                <p className="text-[0.95rem]" style={{ color: "var(--c-text-gray)" }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews */}
            <section className="section-padding" style={{ backgroundColor: "var(--c-bg-light)", clipPath: "polygon(0 50px, 100% 0, 100% 100%, 0 100%)", paddingTop: "150px", paddingBottom: "100px" }}>
                <div className="container">
                    <span className="section-subtitle">TESTIMONIALS</span>
                    <h2 className="section-title">住客真實五星好評</h2>
                    <div className="review-grid">
                        {reviews.map(r => (
                            <div key={r.tag} className="review-card">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="review-tag">{r.tag}</span>
                                    <div className="review-stars">
                                        {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star" />)}
                                    </div>
                                </div>
                                <p className="italic opacity-90 text-[0.95rem] leading-relaxed flex-1">{r.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="cta-box">
                        <h3 className="text-[1.5rem] mb-4" style={{ fontFamily: "var(--font-serif)" }}>準備好開啟您的高雄之旅了嗎？</h3>
                        <p className="mb-8 opacity-70">無論是家族旅遊還是朋友派對，我們都準備好了。</p>
                        <Link href="/book" className="btn btn-gold">
                            <i className="fa-solid fa-calendar-check" /> 立即查詢空房
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-padding">
                <div className="container" style={{ maxWidth: "800px" }}>
                    <h2 className="section-title">常見問題 Q&A</h2>
                    {[
                        { q: "哪裡訂房最便宜?", a: "官方訂房最優惠！立刻透過 Line 或網站預訂，免收平台手續費，保證比 Agoda/Booking 更便宜。" },
                        { q: "附近有什麼好玩景點？", a: "步行即可達駁二藝術特區、大港橋與棧貳庫。鄰近愛河漫步、西子灣賞夕陽、壽山動物園。" },
                        { q: "你好哇寓所適合多少人包棟？", a: "我們提供彈性方案，6人小包棟到最高38人（24人以上需雙包棟）皆可接待。" },
                        { q: "民宿有廚房或娛樂設施嗎？", a: "一樓設有大型中島廚房（含電磁爐、冰箱、完整餐具）及麻將設備，提供完整的交誼空間。" },
                        { q: "附近好停車嗎？", a: "民宿位於靜謐巷弄內，周邊 20-100 公尺內即有多個收費停車場及路邊停車格。" },
                    ].map(faq => (
                        <div key={faq.q} className="faq-item">
                            <div className="py-5 px-6 font-bold flex items-center gap-4 cursor-pointer">
                                <i className="fa-solid fa-circle-question" style={{ color: "var(--c-accent)" }} />
                                {faq.q}
                            </div>
                            <div className="pb-6 px-6 pl-14 text-[0.95rem]" style={{ color: "var(--c-text-gray)" }}>{faq.a}</div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
