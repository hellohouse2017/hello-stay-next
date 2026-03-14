import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAlternateLinks } from "@/i18n/config";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const floors = {
    zh: [
        { num: "1F", label: "經典雙人房", desc: "一樓獨立空間，舒適安靜的休憩角落。", img: "/images/godin/room1.jpg", size: "15 m²", highlight: "獨立衛浴", amenities: ["🛏️ 標準雙人床 ×1", "💻 工作桌椅", "❄️ 冷暖空調", "🚿 淋浴設備"] },
        { num: "2F", label: "陽光四人房", desc: "寬敞明亮，大面採光玻璃，適合家庭入住。", img: "/images/godin/room2.jpg", size: "18 m²", highlight: "大面採光玻璃", amenities: ["🛏️ 標準雙人床 ×2", "🧴 衛浴備品齊全", "💨 吹風機 / 空調", "☀️ 自然採光"] },
        { num: "3F", label: "雅緻四人房", desc: "溫馨風格，獨立衛浴，安靜舒適。", img: "/images/godin/room3.jpg", size: "18 m²", highlight: "大面採光玻璃", amenities: ["🛏️ 標準雙人床 ×2", "🧴 衛浴備品齊全", "💨 吹風機 / 空調", "☀️ 自然採光"] },
        { num: "4F", label: "公共交誼廳", desc: "團聚歡樂空間，麻將、桌遊、沙發，最棒的交誼時光。", img: "/images/godin/room4.jpg", size: "24 m²", highlight: "休閒麻將桌", amenities: ["🀄 麻將 / 桌遊", "🧊 RO飲水機 / 雙門冰箱", "🍞 微波爐", "📺 聯網電視", "🛋️ 舒適沙發區", "🚰 流理台"] },
        { num: "5F", label: "景觀雙人房", desc: "頂樓視野開闊，落地窗街景，充足採光。", img: "/images/godin/room5.jpg", size: "15 m²", highlight: "落地窗", amenities: ["🛏️ 標準雙人床", "📖 閱讀區", "❄️ 冷暖空調", "🏙️ 街景視野"] },
    ],
    en: [
        { num: "1F", label: "Classic Double", desc: "Ground floor private room, a quiet retreat.", img: "/images/godin/room1.jpg", size: "15 m²", highlight: "Private Bathroom", amenities: ["🛏️ Double Bed", "💻 Work Desk", "❄️ Climate Control", "🚿 Shower"] },
        { num: "2F", label: "Sunny Quad Room", desc: "Spacious and bright with large windows, perfect for families.", img: "/images/godin/room2.jpg", size: "18 m²", highlight: "Large Windows", amenities: ["🛏️ Double Bed ×2", "🧴 Toiletries", "💨 Dryer / A/C", "☀️ Natural Light"] },
        { num: "3F", label: "Elegant Quad Room", desc: "Cozy style with private bathroom, quiet and comfortable.", img: "/images/godin/room3.jpg", size: "18 m²", highlight: "Large Windows", amenities: ["🛏️ Double Bed ×2", "🧴 Toiletries", "💨 Dryer / A/C", "☀️ Natural Light"] },
        { num: "4F", label: "Common Lounge", desc: "Social hub with mahjong, board games, and comfy sofas.", img: "/images/godin/room4.jpg", size: "24 m²", highlight: "Mahjong Table", amenities: ["🀄 Mahjong / Games", "🧊 Water / Fridge", "🍞 Microwave", "📺 Smart TV", "🛋️ Sofa Area", "🚰 Sink"] },
        { num: "5F", label: "Rooftop Double", desc: "Top floor panorama with floor-to-ceiling windows.", img: "/images/godin/room5.jpg", size: "15 m²", highlight: "Floor-length Window", amenities: ["🛏️ Double Bed", "📖 Reading Nook", "❄️ Climate Control", "🏙️ Street View"] },
    ],
    ja: [
        { num: "1F", label: "クラシックダブル", desc: "1階の独立空間、静かな憩いの場。", img: "/images/godin/room1.jpg", size: "15 m²", highlight: "専用バスルーム", amenities: ["🛏️ ダブルベッド", "💻 デスク", "❄️ 冷暖房", "🚿 シャワー"] },
        { num: "2F", label: "サニー4人部屋", desc: "広くて明るい大きな窓、家族に最適。", img: "/images/godin/room2.jpg", size: "18 m²", highlight: "大きな採光窓", amenities: ["🛏️ ダブルベッド ×2", "🧴 アメニティ完備", "💨 ドライヤー / エアコン", "☀️ 自然光"] },
        { num: "3F", label: "エレガント4人部屋", desc: "温かみのあるスタイル、専用バスルーム。", img: "/images/godin/room3.jpg", size: "18 m²", highlight: "大きな採光窓", amenities: ["🛏️ ダブルベッド ×2", "🧴 アメニティ完備", "💨 ドライヤー / エアコン", "☀️ 自然光"] },
        { num: "4F", label: "ラウンジ", desc: "麻雀、ボードゲーム、ソファでくつろぐ交流空間。", img: "/images/godin/room4.jpg", size: "24 m²", highlight: "麻雀卓", amenities: ["🀄 麻雀 / ゲーム", "🧊 飲料水 / 冷蔵庫", "🍞 電子レンジ", "📺 スマートTV", "🛋️ ソファエリア", "🚰 シンク"] },
        { num: "5F", label: "屋上ダブル", desc: "最上階パノラマ、落地窓からの眺望。", img: "/images/godin/room5.jpg", size: "15 m²", highlight: "落地窓", amenities: ["🛏️ ダブルベッド", "📖 読書コーナー", "❄️ 冷暖房", "🏙️ 街景ビュー"] },
    ],
    ko: [
        { num: "1F", label: "클래식 더블", desc: "1층 독립 공간, 조용한 휴식처.", img: "/images/godin/room1.jpg", size: "15 m²", highlight: "전용 욕실", amenities: ["🛏️ 더블 침대", "💻 책상", "❄️ 냉난방", "🚿 샤워"] },
        { num: "2F", label: "선샤인 4인실", desc: "넓고 밝은 대형 창문, 가족에게 최적.", img: "/images/godin/room2.jpg", size: "18 m²", highlight: "대형 채광 유리", amenities: ["🛏️ 더블 침대 ×2", "🧴 어메니티 완비", "💨 드라이어 / 에어컨", "☀️ 자연 채광"] },
        { num: "3F", label: "엘레강트 4인실", desc: "아늑한 스타일, 전용 욕실, 조용하고 편안.", img: "/images/godin/room3.jpg", size: "18 m²", highlight: "대형 채광 유리", amenities: ["🛏️ 더블 침대 ×2", "🧴 어메니티 완비", "💨 드라이어 / 에어컨", "☀️ 자연 채광"] },
        { num: "4F", label: "공용 라운지", desc: "마작, 보드게임, 소파가 있는 소셜 공간.", img: "/images/godin/room4.jpg", size: "24 m²", highlight: "마작 테이블", amenities: ["🀄 마작 / 게임", "🧊 정수기 / 냉장고", "🍞 전자레인지", "📺 스마트TV", "🛋️ 소파", "🚰 싱크대"] },
        { num: "5F", label: "루프탑 더블", desc: "최상층 파노라마, 바닥~천장 창문.", img: "/images/godin/room5.jpg", size: "15 m²", highlight: "바닥~천장 창문", amenities: ["🛏️ 더블 침대", "📖 독서 코너", "❄️ 냉난방", "🏙️ 거리 전망"] },
    ],
    vi: [
        { num: "1F", label: "Phòng Đôi Cổ Điển", desc: "Không gian riêng tư tầng trệt, góc nghỉ ngơi yên tĩnh.", img: "/images/godin/room1.jpg", size: "15 m²", highlight: "Phòng tắm riêng", amenities: ["🛏️ Giường đôi", "💻 Bàn làm việc", "❄️ Điều hòa", "🚿 Vòi sen"] },
        { num: "2F", label: "Phòng 4 Người", desc: "Rộng rãi, cửa sổ lớn, lý tưởng cho gia đình.", img: "/images/godin/room2.jpg", size: "18 m²", highlight: "Cửa sổ lớn", amenities: ["🛏️ Giường đôi ×2", "🧴 Đồ dùng vệ sinh", "💨 Máy sấy / Điều hòa", "☀️ Ánh sáng tự nhiên"] },
        { num: "3F", label: "Phòng 4 Người Sang", desc: "Phong cách ấm cúng, phòng tắm riêng.", img: "/images/godin/room3.jpg", size: "18 m²", highlight: "Cửa sổ lớn", amenities: ["🛏️ Giường đôi ×2", "🧴 Đồ dùng vệ sinh", "💨 Máy sấy / Điều hòa", "☀️ Ánh sáng tự nhiên"] },
        { num: "4F", label: "Phòng khách chung", desc: "Không gian giao lưu với mạt chược, trò chơi, sofa.", img: "/images/godin/room4.jpg", size: "24 m²", highlight: "Bàn mạt chược", amenities: ["🀄 Mạt chược / Trò chơi", "🧊 Nước / Tủ lạnh", "🍞 Lò vi sóng", "📺 Smart TV", "🛋️ Khu vực sofa", "🚰 Bồn rửa"] },
        { num: "5F", label: "Phòng Đôi Tầng Thượng", desc: "Tầng cao nhất, cửa sổ sàn-trần, tầm nhìn mở.", img: "/images/godin/room5.jpg", size: "15 m²", highlight: "Cửa sổ sàn-trần", amenities: ["🛏️ Giường đôi", "📖 Góc đọc sách", "❄️ Điều hòa", "🏙️ Tầm nhìn phố"] },
    ],
};

export default function GodinPageContent({ locale }: { locale: Locale }) {
    const t = getDictionary(locale);
    const prefix = locale === "zh" ? "" : `/${locale}`;
    const localeFloors = floors[locale];

    return (
        <>
            {getAlternateLinks("/godin").map((link) => (
                <link key={link.hreflang} rel="alternate" hrefLang={link.hreflang} href={link.href} />
            ))}

            {/* Hero */}
            <section className="hero-b">
                <Image src="/images/godin/cover-1.jpg" alt="Godin House" width={900} height={600} priority />
                <h1>{t.godin.title}</h1>
                <div className="sub">{t.godin.tagline}</div>
                <p className="desc">{t.godin.hero_desc}</p>
            </section>

            {/* About */}
            <section className="sec-warm" style={{ paddingTop: "0" }}>
                <div className="w">
                    <Reveal>
                        <div className="grid-asym">
                            <div className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                <Image src="/images/godin/cover-2.jpg" alt="Godin House" width={700} height={525} sizes="(max-width: 768px) 100vw, 50vw" className="img-cover" />
                            </div>
                            <div>
                                <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#aaa", marginBottom: "12px" }}>About</div>
                                <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", marginBottom: "16px", letterSpacing: "0.06em", color: "#2a2a2a" }}>{t.godin.about_title}</h2>
                                <div style={{ width: "40px", height: "1px", background: "#ddd", marginBottom: "20px" }} />
                                <p style={{ fontSize: "0.92rem", color: "#999", lineHeight: 2.2 }}>{t.godin.about_desc}</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Rooms */}
            <section style={{ background: "#fff", padding: "clamp(60px, 10vw, 100px) 0" }}>
                <div className="w" style={{ marginBottom: "50px" }}>
                    <Reveal>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#aaa", marginBottom: "12px" }}>Rooms</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", letterSpacing: "0.06em", color: "#2a2a2a" }}>{t.godin.rooms_title}</h2>
                        <p style={{ fontSize: "0.9rem", color: "#999", marginTop: "10px" }}>{t.godin.rooms_sub}</p>
                    </Reveal>
                </div>
                {localeFloors.map((floor, i) => (
                    <div className="w" key={i}>
                        <Reveal>
                            <div className={`room-detail-card${i % 2 === 1 ? " reverse" : ""}`}>
                                <div className="room-detail-img">
                                    <Image src={floor.img} alt={floor.label} width={700} height={500} sizes="(max-width: 768px) 100vw, 50vw" className="img-cover" />
                                </div>
                                <div className="room-detail-info">
                                    <div className="room-floor-tag">{floor.num}</div>
                                    <h3>{floor.label}</h3>
                                    <p className="room-subtitle">{floor.desc}</p>
                                    <div className="room-badges">
                                        <span className="room-badge">{floor.size}</span>
                                        <span className="room-badge gold">{floor.highlight}</span>
                                    </div>
                                    <div className="room-amenities">
                                        {floor.amenities.map((a) => <span key={a}>{a}</span>)}
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                ))}
            </section>

            {/* Photos */}
            <section className="sec-warm">
                <div className="w">
                    <Reveal>
                        <div className="grid-3">
                            {["/images/godin/cover-3.jpg", "/images/godin/cover-4.jpg", "/images/godin/cover-bg.jpg"].map(src => (
                                <div key={src} className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                    <Image src={src} alt="Godin House" width={400} height={300} sizes="(max-width: 768px) 100vw, 50vw" className="img-cover" />
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: "#fff", padding: "80px 28px", textAlign: "center" }}>
                <Reveal>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", letterSpacing: "0.06em", color: "#2a2a2a", marginBottom: "12px" }}>
                        {t.godin.cta_title}
                    </h3>
                    <p style={{ fontSize: "0.88rem", color: "#aaa", marginBottom: "30px" }}>{t.godin.cta_sub}</p>
                    <Link href={`${prefix}/book`} style={{
                        display: "inline-block", padding: "14px 44px",
                        border: "1px solid #2a2a2a", color: "#2a2a2a",
                        fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.12em",
                        transition: "all 0.4s",
                    }}>{t.godin.cta_btn}</Link>
                </Reveal>
            </section>
        </>
    );
}
