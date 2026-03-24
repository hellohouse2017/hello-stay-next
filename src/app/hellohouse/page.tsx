import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import RoomGallery from "@/components/RoomGallery";
import EquipmentGrid from "@/components/EquipmentGrid";
import LocationSection from "@/components/LocationSection";
import LineFloatingCTA from "@/components/LineFloatingCTA";
import { hellohouse } from "@/data/properties";

export const metadata: Metadata = {
    title: "你好哇寓所｜高雄包棟民宿6-26人・中島廚房/麻將/投影｜平日$3,500起",
    description: "高雄鹽埕6-26人包棟首選！獨棟三層空間，附豪華中島廚房、手動麻將桌、桌遊、120吋投影。步行5分鐘到駁二。每人最低$583起，Google 4.9星。綜藝玩很大拍攝場地→LINE查空房",
    alternates: { canonical: "https://www.hello-stay.com/hellohouse" },
    openGraph: {
        title: "你好哇寓所｜高雄包棟民宿6-26人・中島廚房/麻將/投影｜平日$3,500起",
        description: "高雄鹽埕6-26人包棟首選！獨棟三層空間，附豪華中島廚房、手動麻將桌、桌遊、120吋投影。步行5分鐘到駁二。每人最低$583起，Google 4.9星→LINE查空房",
        url: "https://www.hello-stay.com/hellohouse",
        images: [{ url: "https://www.hello-stay.com/images/cover-bg.webp", width: 1200, height: 630, alt: "你好哇寓所 高雄包棟民宿" }],
    },
};

const galleryImages = [
    { src: "/images/hellohouse/photo1.webp", alt: "你好哇寓所 客廳空間" },
    { src: "/images/hellohouse/photo2.webp", alt: "你好哇寓所 廚房設備" },
    { src: "/images/hellohouse/photo3.webp", alt: "你好哇寓所 房間" },
    { src: "/images/hellohouse/1000.webp", alt: "你好哇寓所 空間細節" },
    { src: "/images/hellohouse/photo5.webp", alt: "你好哇寓所 環境" },
    { src: "/images/hellohouse/bar-2.webp", alt: "你好哇寓所 吧台區" },
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

            {/* ── Hero (Cinematic) ── */}
            <section className="hero-cinema">
                <div className="hero-cinema__media">
                    <Image
                      src="/images/hellohouse/cover.webp"
                      alt="你好哇寓所"
                      fill
                      priority
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="hero-cinema__overlay" />
                </div>
                <div className="hero-cinema__content">
                    <div className="hero-cinema__eyebrow">
                        Hello House · Est. 2017
                    </div>
                    <h1 className="hero-cinema__title">
                        你好哇寓所
                    </h1>
                    <p className="hero-cinema__sub">
                        6-26人包棟 · 中島廚房 · 麻將 · 近駁二
                    </p>
                    <div className="hero-cinema__actions">
                        <a href="https://lin.ee/atCiMQw" target="_blank" rel="noopener noreferrer" className="btn-line">💬 LINE 查空房</a>
                        <Link href="/book" className="btn-ghost">查詢空房與報價</Link>
                    </div>
                </div>
            </section>

            {/* ── Intro (editorial split) ── */}
            <section className="sec-cream">
                <div className="w">
                    <Reveal>
                        <div className="grid-asym" style={{ marginBottom: "0" }}>
                            <div className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                <Image src="/images/hellohouse/photo1.webp" alt="你好哇寓所 大廳" width={700} height={525} sizes="(max-width: 768px) 100vw, 50vw" className="img-cover" />
                            </div>
                            <div>
                                <div className="scene-eyebrow">About</div>
                                <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", marginBottom: "16px", letterSpacing: "0.08em", fontWeight: 400 }}>在港都巷弄裡，<br />遇見有溫度的空間</h2>
                                <div className="gold-line" style={{ marginBottom: "20px" }} />
                                <p style={{ fontSize: "0.92rem", color: "var(--muted)", lineHeight: 2.2 }}>
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
                        <div className="scene-eyebrow">Highlights</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", color: "var(--bg)", letterSpacing: "0.08em", fontWeight: 400 }}>為什麼選擇你好哇</h2>
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

            {/* ── Room Details — Interactive Gallery + Equipment ── */}
            <section className="sec-white">
                <div className="w" style={{ marginBottom: "50px" }}>
                    <Reveal>
                        <div className="scene-eyebrow">Rooms</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", letterSpacing: "0.08em", fontWeight: 400 }}>房型與空間介紹</h2>
                        <p style={{ fontSize: "0.9rem", color: "var(--muted)", marginTop: "10px" }}>全館 6 間客房皆配備獨立筒床墊、乾濕分離衛浴、聯網電視與冷暖空調<br />👆 點擊照片可放大瀏覽</p>
                    </Reveal>
                </div>

                {hellohouse.rooms.map((room, idx) => (
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
                propertyName={hellohouse.name}
                address={hellohouse.address}
                mapUrl={hellohouse.mapUrl}
                nearbySpots={hellohouse.nearbySpots}
            />

            {/* ── Photo Gallery ── */}
            <section className="sec-cream">
                <div className="w" style={{ marginBottom: "40px" }}>
                    <Reveal>
                        <div className="scene-eyebrow">Gallery</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", letterSpacing: "0.08em", fontWeight: 400 }}>更多空間實景</h2>
                    </Reveal>
                </div>
                <div className="w">
                    <Reveal>
                        <div className="grid-3">
                            {galleryImages.map((img) => (
                                <div key={img.src} className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                    <Image src={img.src} alt={img.alt} width={400} height={300} sizes="(max-width: 768px) 100vw, 50vw" className="img-cover" />
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
                        <div className="scene-eyebrow">Testimonials</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", color: "var(--bg)", marginBottom: "40px", letterSpacing: "0.08em", fontWeight: 400 }}>住客真實好評</h2>
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
                        <div className="scene-eyebrow">Media</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", marginBottom: "30px", letterSpacing: "0.08em", fontWeight: 400 }}>劇組與明星的一致首選</h2>
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
                                    <div style={{ fontSize: "0.78rem", color: "#767676" }}>{s.cast}</div>
                                </div>
                                <a href={s.url} target="_blank" rel="noreferrer" style={{ fontSize: "0.82rem", color: "var(--pri)", letterSpacing: "0.05em" }}>
                                    觀看片段 →
                                </a>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── AEO Quick Summary ── */}
            <section className="sec-cream">
                <div className="w" style={{ maxWidth: "700px" }}>
                    <Reveal>
                        <div style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                            <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "16px" }}>一眼看懂</div>
                            <div style={{ display: "grid", gap: "12px", marginBottom: "24px" }}>
                                <div style={{ display: "flex", gap: "12px", fontSize: "0.88rem", color: "#3D3830" }}>
                                    <span style={{ color: "var(--pri)", minWidth: "20px" }}>👥</span>
                                    <span>適合 <strong>6–26 人</strong>包棟，可兩棟合訂最高 38 人</span>
                                </div>
                                <div style={{ display: "flex", gap: "12px", fontSize: "0.88rem", color: "#3D3830" }}>
                                    <span style={{ color: "var(--pri)", minWidth: "20px" }}>🍳</span>
                                    <span>一樓豪華中島廚房 + 全自動麻將桌，三層樓獨棟包場</span>
                                </div>
                                <div style={{ display: "flex", gap: "12px", fontSize: "0.88rem", color: "#3D3830" }}>
                                    <span style={{ color: "var(--pri)", minWidth: "20px" }}>📍</span>
                                    <span>鹽埕區，步行 10 分鐘到<strong>駁二藝術特區</strong>，捷運 5 分鐘</span>
                                </div>
                            </div>
                            <div style={{ overflowX: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                                    <thead>
                                        <tr style={{ borderBottom: "2px solid #EDE8E3" }}>
                                            <th style={{ textAlign: "left", padding: "8px 4px", color: "#3D3830", fontWeight: 600 }}>項目</th>
                                            <th style={{ textAlign: "center", padding: "8px 4px", color: "var(--pri)", fontWeight: 600 }}>你好哇寓所</th>
                                            <th style={{ textAlign: "center", padding: "8px 4px", color: "#8A8279" }}>溝頂民宿</th>
                                            <th style={{ textAlign: "center", padding: "8px 4px", color: "#8A8279" }}>大智若愚</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            ["容納人數", "6–26 人", "6–12 人", "20–48 人"],
                                            ["房間數", "6 間套房", "4 間", "依配置"],
                                            ["中島廚房", "✅", "✅", "✅"],
                                            ["麻將桌", "✅", "❌", "❌"],
                                            ["電梯", "❌", "❌", "✅"],
                                            ["停車", "附近停車場", "附近停車場", "附近停車場"],
                                            ["適合族群", "朋友・企業・婚禮", "家庭・長輩", "超大團體"],
                                        ].map(([label, a, b, c]) => (
                                            <tr key={label} style={{ borderBottom: "1px solid #F5F1ED" }}>
                                                <td style={{ padding: "8px 4px", color: "#666" }}>{label}</td>
                                                <td style={{ padding: "8px 4px", textAlign: "center", color: "#3D3830", fontWeight: 500 }}>{a}</td>
                                                <td style={{ padding: "8px 4px", textAlign: "center", color: "#8A8279" }}>{b}</td>
                                                <td style={{ padding: "8px 4px", textAlign: "center", color: "#8A8279" }}>{c}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="sec-white">
                <div className="w" style={{ maxWidth: "700px" }}>
                    <Reveal>
                        <div className="scene-eyebrow">FAQ</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", marginBottom: "30px", letterSpacing: "0.08em", fontWeight: 400 }}>常見問題</h2>
                    </Reveal>
                    {[
                        { q: "哪裡訂房最便宜？", a: "官方訂房最優惠！透過 LINE 或網站預訂，免收平台手續費，比 Booking.com、AsiaYo 便宜 15–20%。" },
                        { q: "附近有什麼好玩景點？", a: "步行即達駁二藝術特區（10分鐘）、大港橋（8分鐘）、棧貳庫（15分鐘）。鄰近愛河、西子灣、壽山動物園，捷運鹽埕埔站步行 5 分鐘。" },
                        { q: "包棟可以容納多少人？", a: "彈性方案 6 至 26 人。若需要更多人，可與溝頂民宿兩棟合訂，最高接待 38 人。超過 38 人可詢問大智若愚方案（20–48人）。" },
                        { q: "有廚房或娛樂設施嗎？", a: "一樓大型中島廚房配備 IH 感應爐×2、大容量冰箱、微波爐、製冰機、完整鍋碗瓢盆。娛樂設施有全自動麻將桌、桌遊、Netflix 電視。" },
                        { q: "你好哇寓所在哪裡？交通方便嗎？", a: "位於高雄市鹽埕區大公路70巷8號。捷運鹽埕埔站步行 5 分鐘，步行 10 分鐘到駁二藝術特區，開車到高雄火車站約 10 分鐘。附近有多處停車場。" },
                        { q: "可以在你好哇寓所開伙煮飯嗎？", a: "可以！一樓中島廚房開放住客使用，配備 IH 爐、微波爐、完整餐具。步行 3 分鐘有全聯超市，步行 1 分鐘有大溝頂傳統市場，採買食材非常方便。" },
                        { q: "隔音好嗎？可以唱歌開派對嗎？", a: "整棟獨立使用，不需擔心打擾其他住客。室內舉辦派對沒問題。深夜音量請配合鄰居，保持窗戶關閉。" },
                        { q: "你好哇寓所有被電視節目拍過嗎？", a: "是的！曾是「綜藝玩很大」、「我們回家吧 2」等知名節目的拍攝場地，充滿戲劇感的空間也適合自拍和旅遊打卡。" },
                        { q: "你好哇寓所跟溝頂民宿可以一起訂嗎？", a: "可以！兩棟距離步行僅 30 秒，非常適合大型家族旅遊或婚禮迎娶。合訂可接待 27–38 人，各自有獨立空間又能任意串場。" },
                        { q: "溝頂民宿適合帶長輩嗎？", a: "溝頂民宿五層樓透天格局，長輩住低樓層，年輕人住高樓層。如帶行動不便的長輩，建議選大智若愚（有電梯）或直接詢問我們，我們會協助安排最合適的方案。" },
                    ].map(faq => (
                        <Reveal key={faq.q}>
                            <div style={{ padding: "22px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                                <div style={{ fontWeight: 500, fontSize: "0.95rem", marginBottom: "6px" }}>{faq.q}</div>
                                <div style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 2 }}>{faq.a}</div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>


            {/* ── Related Blog ── */}
            <section style={{ padding: "60px 28px", background: "var(--bg)" }}>
                <div className="w" style={{ maxWidth: "780px" }}>
                    <Reveal>
                        <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px", textAlign: "center", fontWeight: 600 }}>Related Articles</div>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "var(--text)", textAlign: "center", marginBottom: "24px", letterSpacing: "0.08em", fontWeight: 400 }}>相關旅宿攻略</h3>
                        <div style={{ display: "grid", gap: "10px" }}>
                            {[
                                { href: "/blog/kaohsiung-group-stay-guide", emoji: "🏠", title: "高雄包棟民宿完全攻略", desc: "6-48人怎麼選？" },
                                { href: "/blog/kaohsiung-bnb-recommendation", emoji: "⭐", title: "高雄包棟民宿推薦 Top 3", desc: "在地人精選" },
                                { href: "/blog/kaohsiung-kitchen-bnb", emoji: "🍳", title: "有廚房的民宿推薦", desc: "中島廚房・火鍋趴" },
                                { href: "/blog/kaohsiung-family-reunion", emoji: "👨‍👩‍👧‍👦", title: "家族旅遊包棟推薦", desc: "三代同堂・長輩友善" },
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

            {/* ── CTA — LINE-first ── */}
            <div className="cta-strip">
                <Reveal>
                    <h3>準備好開啟您的高雄之旅？</h3>
                    <p>無論是家族旅遊還是朋友派對，我們都準備好了。</p>
                    <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                        <a href={hellohouse.lineUrl} target="_blank" rel="noopener noreferrer" className="btn-line btn-line--lg">
                            💬 LINE 詢問空房
                        </a>
                        <Link href="/book" className="btn-ghost" style={{ color: "var(--bg)", borderColor: "rgba(247,243,238,0.35)" }}>
                            自助查空房
                        </Link>
                    </div>
                </Reveal>
            </div>

            {/* ── LINE Floating CTA ── */}
            <LineFloatingCTA lineUrl={hellohouse.lineUrl} message="幫你查空房 💬" />
        </>
    );
}
