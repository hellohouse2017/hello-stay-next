import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
    title: "溝頂民宿 | 高雄鹽埕精緻包棟 | 10-12人家庭出遊推薦",
    description: "高雄鹽埕區精緻獨棟包棟民宿。溝頂民宿提供10-12人入住，五層樓完整空間，溫馨家庭風格。近駁二藝術特區、大港橋。平日$10,000起。",
    alternates: { canonical: "https://www.hello-stay.com/godin" },
    openGraph: {
        title: "溝頂民宿 | 高雄鹽埕精緻包棟 | 10-12人",
        description: "五層樓獨棟包棟民宿，10-12人入住，溫馨家庭風格。平日$10,000起。近駁二。",
        url: "https://www.hello-stay.com/godin",
        images: [{ url: "/images/godin/cover-1.jpg", width: 1200, height: 630, alt: "溝頂民宿" }],
    },
};

const rooms = [
    { src: "/images/godin/room1.jpg", alt: "1F 經典雙人房" },
    { src: "/images/godin/room2.jpg", alt: "2F 陽光四人房" },
    { src: "/images/godin/room3.jpg", alt: "3F 雅緻四人房" },
    { src: "/images/godin/room4.jpg", alt: "4F 公共交誼廳" },
    { src: "/images/godin/room5.jpg", alt: "5F 景觀雙人房" },
];

const floors = [
    { num: "1F", label: "經典雙人房", desc: "一樓獨立空間，舒適雙人住宿" },
    { num: "2F", label: "陽光四人房", desc: "寬敞明亮，適合家庭入住" },
    { num: "3F", label: "雅緻四人房", desc: "溫馨風格，獨立衛浴" },
    { num: "4F", label: "公共交誼廳", desc: "客廳、麻將，團聚歡樂空間" },
    { num: "5F", label: "景觀雙人房", desc: "頂樓視野，充足採光" },
];

export default function GodinPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify([
                    {
                        "@context": "https://schema.org", "@type": "LodgingBusiness",
                        "@id": "https://www.hello-stay.com/godin/#lodging",
                        name: "溝頂民宿 Godin House",
                        alternateName: ["Godin House", "溝頂", "Hello Stay 二館"],
                        url: "https://www.hello-stay.com/godin",
                        telephone: "+886-932-828-922",
                        description: "高雄鹽埕區精緻獨棟包棟民宿，五層樓完整空間，10-12人家庭出遊首選。溫馨家庭風格，平日$10,000起。步行10分鐘到駁二藝術特區。",
                        address: { "@type": "PostalAddress", streetAddress: "大公路70巷6-2號", addressLocality: "鹽埕區", addressRegion: "高雄市", postalCode: "803", addressCountry: "TW" },
                        geo: { "@type": "GeoCoordinates", latitude: 22.6244, longitude: 120.2822 },
                        priceRange: "$", checkinTime: "16:00", checkoutTime: "11:00",
                        numberOfRooms: 4, petsAllowed: false,
                        amenityFeature: [
                            { "@type": "LocationFeatureSpecification", name: "麻將桌", value: true },
                            { "@type": "LocationFeatureSpecification", name: "獨立衛浴", value: true },
                            { "@type": "LocationFeatureSpecification", name: "免費 Wi-Fi", value: true },
                            { "@type": "LocationFeatureSpecification", name: "冷氣", value: true },
                            { "@type": "LocationFeatureSpecification", name: "電子密碼鎖", value: true },
                        ],
                        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "45", bestRating: "5" },
                        tourBookingPage: "https://www.hello-stay.com/book",
                        speakable: { "@type": "SpeakableSpecification", cssSelector: [".hero-b h1", ".hero-b .desc", ".sec-warm p"] },
                    },
                    {
                        "@context": "https://schema.org", "@type": "FAQPage",
                        mainEntity: [
                            { "@type": "Question", name: "溝頂民宿可以住幾人？", acceptedAnswer: { "@type": "Answer", text: "溝頂民宿為五層樓獨棟，可容納10-12人入住。1F經典雙人房、2F陽光四人房、3F雅緻四人房、5F景觀雙人房，4F為交誼廳。" } },
                            { "@type": "Question", name: "溝頂民宿平日多少錢？", acceptedAnswer: { "@type": "Answer", text: "平日$10,000起，含整棟五層樓獨立使用。是10人左右小團體包棟的超值首選，平均每人只要$1,000。" } },
                            { "@type": "Question", name: "溝頂民宿在哪裡？", acceptedAnswer: { "@type": "Answer", text: "位於高雄鹽埕區大公路70巷6-2號，鄰近捷運鹽埕埔站O2（步行5分鐘），步行至駁二藝術特區約10分鐘。與你好哇寓所僅距30公尺。" } },
                            { "@type": "Question", name: "溝頂民宿適合帶長輩嗎？", acceptedAnswer: { "@type": "Answer", text: "非常適合！溫馨家庭風格，分層住宿讓作息不同的家人互不干擾。4F交誼廳有麻將，長輩最愛。每間房獨立衛浴，方便年長者使用。" } },
                            { "@type": "Question", name: "溝頂民宿跟你好哇寓所可以一起訂嗎？", acceptedAnswer: { "@type": "Answer", text: "可以！兩棟僅距30公尺，合訂最高38人。非常適合大家族旅遊或大型團體活動。透過LINE或官網一起預訂即可。" } },
                            { "@type": "Question", name: "高雄小包棟10人左右推薦哪裡？", acceptedAnswer: { "@type": "Answer", text: "推薦溝頂民宿，整棟五層樓獨立使用，10-12人入住，平日只要$10,000。位於鹽埕區，近駁二、大港橋，Google評價4.8星。" } },
                        ],
                    },
                ])
            }} />

            {/* ── Hero (B-style: clean photo, no overlay) ── */}
            <section className="hero-b">
                <Image src="/images/godin/cover-1.jpg" alt="溝頂民宿 共用空間" width={900} height={600} priority />
                <h1>溝頂民宿</h1>
                <div className="sub">Godin House · A Quiet Retreat</div>
                <p className="desc">
                    隱身鹽埕靜謐巷弄，五層樓獨棟空間。<br />
                    為 10 至 12 人的小團體，打造有溫度的包棟體驗。
                </p>
            </section>

            {/* ── Intro (asymmetric) ── */}
            <section className="sec-warm" style={{ paddingTop: "0" }}>
                <div className="w">
                    <Reveal>
                        <div className="grid-asym">
                            <div className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                <Image src="/images/godin/cover-2.jpg" alt="溝頂民宿 客廳" width={700} height={525} className="img-cover" />
                            </div>
                            <div>
                                <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#aaa", marginBottom: "12px" }}>About</div>
                                <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", marginBottom: "16px", letterSpacing: "0.06em", color: "#2a2a2a" }}>像回家一樣的旅行</h2>
                                <div style={{ width: "40px", height: "1px", background: "#ddd", marginBottom: "20px" }} />
                                <p style={{ fontSize: "0.92rem", color: "#999", lineHeight: 2.2 }}>
                                    溝頂民宿是你好哇系列的精緻二館。整棟五層樓獨立使用，沒有外人打擾。
                                    以溫馨家庭風格呈現，讓每一次入住都像回到自己的家。
                                    平日 $10,000 起，是小團體包棟的超值首選。
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── Room Details ── */}
            <section style={{ background: "#fff", padding: "clamp(60px, 10vw, 100px) 0" }}>
                <div className="w" style={{ marginBottom: "50px" }}>
                    <Reveal>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#aaa", marginBottom: "12px" }}>Rooms</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", letterSpacing: "0.06em", color: "#2a2a2a" }}>房型與空間介紹</h2>
                        <p style={{ fontSize: "0.9rem", color: "#999", marginTop: "10px" }}>五層樓獨棟，4 間客房皆配備獨立衛浴、冷暖空調</p>
                    </Reveal>
                </div>

                {/* 1F 經典雙人房 */}
                <div className="w">
                    <Reveal>
                        <div className="room-detail-card">
                            <div className="room-detail-img">
                                <Image src="/images/godin/room1.jpg" alt="1F 經典雙人房" width={700} height={500} className="img-cover" />
                            </div>
                            <div className="room-detail-info">
                                <div className="room-floor-tag">1F</div>
                                <h3>經典雙人房</h3>
                                <p className="room-subtitle">一樓獨立空間，舒適安靜的休憩角落。</p>
                                <div className="room-badges">
                                    <span className="room-badge">15 m²</span>
                                    <span className="room-badge gold">獨立衛浴</span>
                                    <span className="room-badge">對外窗</span>
                                </div>
                                <div className="room-amenities">
                                    <span>🛏️ 標準雙人床 ×1</span>
                                    <span>💻 工作桌椅</span>
                                    <span>❄️ 冷暖空調</span>
                                    <span>🚿 淋浴設備</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* 2F 陽光四人房 */}
                <div className="w">
                    <Reveal>
                        <div className="room-detail-card reverse">
                            <div className="room-detail-img">
                                <Image src="/images/godin/room2.jpg" alt="2F 陽光四人房" width={700} height={500} className="img-cover" />
                            </div>
                            <div className="room-detail-info">
                                <div className="room-floor-tag">2F</div>
                                <h3>陽光四人房</h3>
                                <p className="room-subtitle">寬敞明亮，大面採光玻璃，適合家庭入住。</p>
                                <div className="room-badges">
                                    <span className="room-badge">18 m²</span>
                                    <span className="room-badge gold">大面採光玻璃</span>
                                    <span className="room-badge">獨立衛浴</span>
                                </div>
                                <div className="room-amenities">
                                    <span>🛏️ 標準雙人床 ×2</span>
                                    <span>🧴 衛浴備品齊全</span>
                                    <span>💨 吹風機 / 空調</span>
                                    <span>☀️ 自然採光</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* 3F 雅緻四人房 */}
                <div className="w">
                    <Reveal>
                        <div className="room-detail-card">
                            <div className="room-detail-img">
                                <Image src="/images/godin/room3.jpg" alt="3F 雅緻四人房" width={700} height={500} className="img-cover" />
                            </div>
                            <div className="room-detail-info">
                                <div className="room-floor-tag">3F</div>
                                <h3>雅緻四人房</h3>
                                <p className="room-subtitle">溫馨風格，獨立衛浴，安靜舒適。</p>
                                <div className="room-badges">
                                    <span className="room-badge">18 m²</span>
                                    <span className="room-badge gold">大面採光玻璃</span>
                                    <span className="room-badge">獨立衛浴</span>
                                </div>
                                <div className="room-amenities">
                                    <span>🛏️ 標準雙人床 ×2</span>
                                    <span>🧴 衛浴備品齊全</span>
                                    <span>💨 吹風機 / 空調</span>
                                    <span>☀️ 自然採光</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* 4F 公共交誼廳 */}
                <div className="w">
                    <Reveal>
                        <div className="room-detail-card reverse">
                            <div className="room-detail-img">
                                <Image src="/images/godin/room4.jpg" alt="4F 公共交誼廳" width={700} height={500} className="img-cover" />
                            </div>
                            <div className="room-detail-info">
                                <div className="room-floor-tag">4F</div>
                                <h3>公共交誼廳</h3>
                                <p className="room-subtitle">團聚歡樂空間，麻將、桌遊、沙發，最棒的交誼時光。</p>
                                <div className="room-badges">
                                    <span className="room-badge">24 m²</span>
                                    <span className="room-badge gold">休閒麻將桌</span>
                                    <span className="room-badge">獨立空調</span>
                                </div>
                                <div className="room-amenities">
                                    <span>🀄 麻將 / 桌遊</span>
                                    <span>🧊 RO飲水機 / 雙門冰箱</span>
                                    <span>🍞 微波爐</span>
                                    <span>📺 聯網電視</span>
                                    <span>🛋️ 舒適沙發區</span>
                                    <span>🚰 流理台</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* 5F 景觀雙人房 */}
                <div className="w">
                    <Reveal>
                        <div className="room-detail-card">
                            <div className="room-detail-img">
                                <Image src="/images/godin/room5.jpg" alt="5F 景觀雙人房" width={700} height={500} className="img-cover" />
                            </div>
                            <div className="room-detail-info">
                                <div className="room-floor-tag">5F</div>
                                <h3>景觀雙人房</h3>
                                <p className="room-subtitle">頂樓視野開闊，落地窗街景，充足採光。</p>
                                <div className="room-badges">
                                    <span className="room-badge">15 m²</span>
                                    <span className="room-badge gold">落地窗</span>
                                    <span className="room-badge">獨立衛浴</span>
                                </div>
                                <div className="room-amenities">
                                    <span>🛏️ 標準雙人床</span>
                                    <span>📖 閱讀區</span>
                                    <span>❄️ 冷暖空調</span>
                                    <span>🏙️ 街景視野</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── More photos ── */}
            <section className="sec-warm">
                <div className="w">
                    <Reveal>
                        <div className="grid-3">
                            {["/images/godin/cover-3.jpg", "/images/godin/cover-4.jpg", "/images/godin/cover-bg.jpg"].map(src => (
                                <div key={src} className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                    <Image src={src} alt="溝頂民宿" width={400} height={300} className="img-cover" />
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── CTA (B-style: soft) ── */}
            <section style={{ background: "#fff", padding: "80px 28px", textAlign: "center" }}>
                <Reveal>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", letterSpacing: "0.06em", color: "#2a2a2a", marginBottom: "12px" }}>
                        小團體的完美包棟體驗
                    </h3>
                    <p style={{ fontSize: "0.88rem", color: "#aaa", marginBottom: "30px" }}>
                        平日 $10,000 起 · 12 人以內
                    </p>
                    <Link href="/book" style={{
                        display: "inline-block", padding: "14px 44px",
                        border: "1px solid #2a2a2a", color: "#2a2a2a",
                        fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.12em",
                        transition: "all 0.4s",
                    }}>
                        查詢空房
                    </Link>
                </Reveal>
            </section>
        </>
    );
}
