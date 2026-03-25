import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import RoomGallery from "@/components/RoomGallery";
import EquipmentGrid from "@/components/EquipmentGrid";
import LocationSection from "@/components/LocationSection";
import LineFloatingCTA from "@/components/LineFloatingCTA";
import { godin } from "@/data/properties";

export const metadata: Metadata = {
    title: "溝頂民宿｜高雄小包棟10-12人・五層獨棟$10,000起｜近駁二鹽埕",
    description: "高雄鹽埕小團體包棟首選！6-12人五層獨棟，每人$800起。4間套房＋交誼廳麻將→LINE查空房",
    alternates: { canonical: "https://www.hello-stay.com/godin" },
    openGraph: {
        title: "溝頂民宿｜高雄小包棟10-12人・五層獨棟$10,000起｜近駁二鹽埕",
        description: "高雄鹽埕小團體包棟首選！6-12人五層獨棟全棟使用，每人$800起。4間套房＋交誼廳麻將・步行到駁二。平日$8,000起，Google好評→LINE查空房",
        url: "https://www.hello-stay.com/godin",
        images: [{ url: "https://www.hello-stay.com/images/godin/cover-1.webp", width: 1200, height: 630, alt: "溝頂民宿" }],
    },
};

const rooms = [
    { src: "/images/godin/room1.webp", alt: "1F 經典雙人房" },
    { src: "/images/godin/room2.webp", alt: "2F 陽光四人房" },
    { src: "/images/godin/room3.webp", alt: "3F 雅緻四人房" },
    { src: "/images/godin/room4.webp", alt: "4F 公共交誼廳" },
    { src: "/images/godin/room5.webp", alt: "5F 景觀雙人房" },
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

            {/* ── Hero (Cinematic) ── */}
            <section className="hero-cinema">
                <div className="hero-cinema__media">
                    <Image src="/images/godin/cover-1.webp" alt="溝頂民宿 五層獨棟空間" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
                    <div className="hero-cinema__overlay" />
                </div>
                <div className="hero-cinema__content">
                    <div className="hero-cinema__eyebrow">Godin House · A Quiet Retreat</div>
                    <h1 className="hero-cinema__title">溝頂民宿</h1>
                    <p className="hero-cinema__sub">
                        10-12人五層獨棟 · 麻將 · 交誼廳 · 平日 $10,000 起
                    </p>
                    <div className="hero-cinema__actions">
                        <a href="https://lin.ee/atCiMQw" target="_blank" rel="noopener noreferrer" className="btn-line">💬 LINE 查空房</a>
                        <Link href="/book" className="btn-ghost">查詢空房與報價</Link>
                    </div>
                </div>
            </section>

            {/* ── Intro (asymmetric) ── */}
                  {/* ── Room Details — Interactive Gallery + Equipment ── */}
            <section style={{ background: "var(--surface)", padding: "clamp(80px, 14vw, 160px) 0" }}>
                <div className="w" style={{ marginBottom: "50px" }}>
                    <Reveal>
                        <div className="scene-eyebrow">Rooms</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", letterSpacing: "0.08em", color: "var(--text)", fontWeight: 400 }}>房型與空間介紹</h2>
                        <p style={{ fontSize: "0.9rem", color: "var(--muted)", marginTop: "10px" }}>五層樓獨棟，4 間客房皆配備獨立衛浴、冷暖空調<br />👆 點擊照片可放大瀏覽</p>
                    </Reveal>
                </div>

                {godin.rooms.map((room, idx) => (
                    <div key={room.id} className="w">
                        <Reveal>
                            <div className={`room-detail-card${idx % 2 === 1 ? ' reverse' : ''}`}>
                                <div className="room-detail-img">
                                    <RoomGallery images={room.images} roomName={room.name} />
                                </div>
                                <div className="room-detail-info">
                                    <div className="room-floor-tag">{room.floor}</div>
                                    <h3>{room.name}</h3>
                                    <p className="room-subtitle">{room.subtitle}</p>
                                    <div className="room-badges">
                                        {room.badges.map(b => (
                                            <span key={b.label} className={`room-badge${b.gold ? ' gold' : ''}`}>{b.label}</span>
                                        ))}
                                    </div>
                                    <EquipmentGrid categories={room.equipment} />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                ))}
            </section>

            {/* ── Location & Nearby ── */}
            <LocationSection
                propertyName={godin.name}
                address={godin.address}
                mapUrl={godin.mapUrl}
                nearbySpots={godin.nearbySpots}
            />

            {/* ── More photos ── */}
            <section className="sec-warm">
                <div className="w">
                    <Reveal>
                        <div className="grid-3">
                            {["/images/godin/cover-3.webp", "/images/godin/cover-4.webp", "/images/godin/cover-bg.webp"].map((src, i) => (
                                <div key={src} className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                    <Image src={src} alt={["溝頂民宿 客廳交誼空間", "溝頂民宿 溫馨房型實景", "溝頂民宿 五層樓獨棟外觀"][i]} width={400} height={300} sizes="(max-width: 768px) 100vw, 50vw" className="img-cover" />
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── AEO Quick Summary + FAQ ── */}
            <section className="sec-cream">
                <div className="w" style={{ maxWidth: "700px" }}>
                    <Reveal>
                        <div style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                            <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "16px" }}>一眼看懂</div>
                            <div style={{ display: "grid", gap: "12px", marginBottom: "24px" }}>
                                <div style={{ display: "flex", gap: "12px", fontSize: "0.88rem", color: "#3D3830" }}>
                                    <span style={{ color: "var(--pri)", minWidth: "20px" }}>👥</span>
                                    <span>適合 <strong>6–12 人</strong>小團體包棟，五層樓獨棟獨立使用</span>
                                </div>
                                <div style={{ display: "flex", gap: "12px", fontSize: "0.88rem", color: "#3D3830" }}>
                                    <span style={{ color: "var(--pri)", minWidth: "20px" }}>🏡</span>
                                    <span>4 間套房 + 頂樓露台，<strong>長輩友善</strong>，低樓層無障礙動線</span>
                                </div>
                                <div style={{ display: "flex", gap: "12px", fontSize: "0.88rem", color: "#3D3830" }}>
                                    <span style={{ color: "var(--pri)", minWidth: "20px" }}>📍</span>
                                    <span>鹽埕區，與你好哇寓所步行 <strong>30 秒</strong>，可兩棟合訂最高 38 人</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal>
                        <div style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                            <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "20px" }}>FAQ</div>
                            {[
                                { q: "溝頂民宿可以住幾人？", a: "一般配置 6–10 人最舒適，最多可接待 12 人。五層樓獨棟全棟包場，每層樓分配清楚，不用搶廁所。" },
                                { q: "溝頂民宿平日多少錢？", a: "平日 $8,000 起（10人平均每人 $800）。週末假日另計。官方 LINE 直訂免平台手續費，比 AsiaYo 便宜 15–20%。" },
                                { q: "溝頂民宿在哪裡？離駁二多遠？", a: "位於高雄市鹽埕區，距你好哇寓所步行30秒。步行10分鐘到駁二藝術特區，步行8分鐘到大港橋，捷運鹽埕埔站步行5分鐘。" },
                                { q: "溝頂民宿適合帶長輩嗎？", a: "適合！五層樓格局讓長輩住低樓層、年輕人住高樓層，各有活動空間。如需電梯，建議詢問大智若愚（有電梯，可容20–48人）。" },
                                { q: "溝頂民宿有廚房嗎？", a: "有簡易流理臺與微波爐，可加熱食物但不可明火、無電磁爐。若需要豪華中島廚房（IH爐×2、製冰機、完整鍋具），可選擇你好哇寓所，兩棟距離僅30秒。" },
                                { q: "溝頂民宿跟你好哇寓所有什麼不同？", a: "溝頂：6–12人，五層獨棟透天，適合家庭/小聚。你好哇寓所：6–26人，三層空間，中島廚房+麻將桌，適合企業/婚禮。可兩棟合訂，最高38人。" },
                                { q: "溝頂民宿停車方便嗎？", a: "附近有多處收費停車場，開車約3–5分鐘車程。鹽埕區建議以步行/捷運為主，捷運鹽埕埔站步行5分鐘，景點全在步行範圍內。" },
                                { q: "高雄小包棟10人左右推薦哪裡？", a: "推薦溝頂民宿！五層獨棟，4間套房，10人包棟每人約$1,000，位於鹽埕區黃金地段，步行到駁二、大港橋，Google評價4.8星以上。" },
                            ].map(faq => (
                                <Reveal key={faq.q}>
                                    <div style={{ padding: "18px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                                        <div style={{ fontWeight: 500, fontSize: "0.92rem", marginBottom: "6px", color: "#3D3830" }}>{faq.q}</div>
                                        <div style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 2 }}>{faq.a}</div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ background: "var(--surface)", padding: "clamp(100px, 14vw, 160px) 28px", textAlign: "center" }}>
                <Reveal>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", letterSpacing: "0.08em", color: "var(--text)", marginBottom: "12px", fontWeight: 400 }}>
                        小團體的完美包棟體驗
                    </h3>
                    <p style={{ fontSize: "0.88rem", color: "var(--muted)", marginBottom: "36px" }}>
                        平日 $10,000 起 · 12 人以內
                    </p>
                    <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                        <a href={godin.lineUrl} target="_blank" rel="noopener noreferrer" className="btn-line btn-line--lg">
                            💬 LINE 詢問空房
                        </a>
                        <Link href="/book" className="btn-ghost" style={{ color: "var(--text)", borderColor: "var(--line)" }}>
                            自助查空房
                        </Link>
                    </div>
                </Reveal>
            </section>


            {/* ── Related Blog ── */}
            <section style={{ padding: "clamp(60px, 10vw, 100px) 28px", background: "var(--bg)" }}>
                <div className="w" style={{ maxWidth: "780px" }}>
                    <Reveal>
                        <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px", textAlign: "center", fontWeight: 600 }}>Related Articles</div>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "var(--text)", textAlign: "center", marginBottom: "24px", letterSpacing: "0.08em", fontWeight: 400 }}>相關旅宿攻略</h3>
                        <div style={{ display: "grid", gap: "10px" }}>
                            {[
                                { href: "/blog/kaohsiung-group-stay-guide", emoji: "🏠", title: "高雄包棟民宿完全攻略", desc: "6-48人怎麼選？" },
                                { href: "/blog/kaohsiung-bnb-recommendation", emoji: "⭐", title: "高雄包棟民宿推薦 Top 3", desc: "在地人精選" },
                                { href: "/blog/pier2-accommodation", emoji: "🎨", title: "駁二住宿推薦", desc: "步行 10 分鐘到駁二" },
                                { href: "/blog/kaohsiung-mahjong-stay", emoji: "🀄", title: "麻將民宿推薦", desc: "打牌到天亮" },
                            ].map(a => (
                                <Link key={a.href} href={a.href} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "10px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                                    <span style={{ fontSize: "1.3rem" }}>{a.emoji}</span>
                                    <div>
                                        <div style={{ fontSize: "0.85rem", color: "#3D3830", fontWeight: 500 }}>{a.title}</div>
                                        <div style={{ fontSize: "0.72rem", color: "#999" }}>{a.desc}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div style={{ textAlign: "center", marginTop: "16px" }}>
                            <Link href="/blog" style={{ fontSize: "0.75rem", color: "var(--pri)", textDecoration: "none", letterSpacing: "0.1em" }}>瀏覽所有攻略 →</Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── LINE Floating CTA ── */}
            <LineFloatingCTA lineUrl={godin.lineUrl} message="幫你查空房 💬" />
        </>
    );
}
