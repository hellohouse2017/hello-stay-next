import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { publicStayFacts } from "@/data/public-stay-facts";

const galleryImages = [
    { src: "/images/hellohouse/photo1.jpg", alt: "Hello House B&B Kaohsiung B&B - Cozy and spacious 1F common area with premium open-island kitchen, card games, and mahjong for group stay." },
    { src: "/images/hellohouse/photo2.jpg", alt: "Hello House B&B Kaohsiung B&B - Luxury open-island kitchen with dual IH stove, large double-door refrigerator, and complete cooking utensils." },
    { src: "/images/hellohouse/photo3.jpg", alt: "Hello House B&B Kaohsiung B&B - Elegant guest room featuring double bed with premium pocket spring mattress for high-quality sleep." },
    { src: "/images/hellohouse/photo4.jpg", alt: "Hello House B&B Kaohsiung B&B - Exquisite details of renovated old-house styling, combining vintage retro terrazzo floors and modern design." },
    { src: "/images/hellohouse/photo5.jpg", alt: "Hello House B&B Kaohsiung B&B - Serene exterior view of the independent historic townhouse B&B, located in the quiet alleys of Yancheng." },
    { src: "/images/hellohouse/bar-2.jpg", alt: "Hello House B&B Kaohsiung B&B - Sleek high-chair bar area in 1F common space, perfect for family chats and late-night drinks." },
];

const rooms = {
    zh: [
        { floor: "1F", name: "公共空間", sub: "寬敞舒適的交誼核心，大家聚在一起最棒的空間。", size: "56 m²", highlight: "豪華中島廚房", img: "/images/hellohouse/1000.jpg", imgAlt: "Hello Stay 你好哇寓所一樓挑高公共空間，將奢華中島廚房、高腳椅吧台與交誼聚會空間連成一體，打造無阻隔的 20 人聚會大空間。", amenities: ["🍳 雙口IH爐 / 抽油煙機", "🧊 RO飲水機 / 雙門冰箱", "🍞 烤箱 / 微波爐", "📺 聯網電視", "🀄 麻將 / 撲克牌", "❄️ 一級冷暖空調"] },
        { floor: "2F", name: "1201 雙人房", sub: "標準舒適空間，溫馨的休憩角落。", size: "24 m²", highlight: "對外氣密窗", img: "/images/hellohouse/1201.jpg", imgAlt: "Hello Stay 你好哇寓所二樓 1201 溫馨雙人房，配置標準雙人床獨立筒床墊、簡約書桌椅、對外氣密窗與乾濕分離獨立衛浴。", amenities: ["🛏️ 標準雙人床", "💻 書桌", "❄️ 空調 / 吹風機"] },
        { floor: "2F", name: "1202 四人房", sub: "極佳採光與網美設施，拍照打卡首選。", size: "40 m²", highlight: "落地玻璃採光", img: "/images/hellohouse/1202.jpg", imgAlt: "Hello Stay 你好哇寓所二樓 1202 網美四人房，配置兩張標準雙人床獨立筒床墊、質感沙發與極具特色的白色針織吊椅。", amenities: ["🛏️ 標準雙人床 ×2", "🪑 沙發 / 茶几 / 吊椅", "📺 聯網電視", "🚿 乾濕分離衛浴"] },
        { floor: "3F", name: "1301 雙人房", sub: "獨立雙人房，補齊六房配置。", size: "雙人房", highlight: "獨立休息空間", img: "/images/hellohouse/1301.jpg", imgAlt: "Hello Stay 你好哇寓所三樓 1301 雙人房，配置一張標準雙人床與獨立休息空間。", amenities: ["🛏️ 標準雙人床", "❄️ 冷暖空調"] },
        { floor: "3F", name: "1302 六人房", sub: "寬敞團體空間，適合家庭或好朋友同住。", size: "48 m²", highlight: "落地玻璃採光", img: "/images/hellohouse/1302.jpg", imgAlt: "Hello Stay 你好哇寓所三樓 1302 寬敞六人房，備有三張標準雙人床、書桌椅、聯網電視與大面落地玻璃採光窗。", amenities: ["🛏️ 雙人床 (150×200) ×3", "💻 書桌", "📺 聯網電視", "❄️ 空調 / 吹風機"] },
        { floor: "4F", name: "1401 雙人房", sub: "雅緻高樓層視野，享受安靜的私人時光。", size: "24 m²", highlight: "對外落地窗", img: "/images/hellohouse/1401.jpg", imgAlt: "Hello Stay 你好哇寓所四樓 1401 雅緻雙人房，享有高樓層開闊視野與對外落地窗，房內設有精緻雙人沙發與茶几。", amenities: ["🛏️ 標準雙人床", "🪑 沙發 / 茶几", "❄️ 空調 / 吹風機"] },
        { floor: "4F", name: "1402 六人房", sub: "高樓層大空間，視野開闊，團體入住首選。", size: "45 m²", highlight: "落地玻璃採光", img: "/images/hellohouse/1402.jpg", imgAlt: "Hello Stay 你好哇寓所四樓 1402 景觀六人房，備有三張雙人床、大面玻璃落地窗，適合家庭旅遊或團體包棟入住。", amenities: ["🛏️ 雙人床 (150×200) ×3", "💻 書桌", "📺 聯網電視", "❄️ 空調 / 吹風機"] },
    ],
    en: [
        { floor: "1F", name: "Common Area", sub: "Spacious socializing hub—the best space for everyone to gather.", size: "56 m²", highlight: "Luxury Island Kitchen", img: "/images/hellohouse/1000.jpg", imgAlt: "Hello House B&B Kaohsiung B&B - 1F common area merging open-island kitchen and social space, accommodating 20 guests.", amenities: ["🍳 Dual IH Stove / Hood", "🧊 RO Water / Fridge", "🍞 Oven / Microwave", "📺 Smart TV", "🀄 Mahjong / Cards", "❄️ Climate Control"] },
        { floor: "2F", name: "Room 1201 (Double)", sub: "Comfortable standard room, a cozy retreat.", size: "24 m²", highlight: "Sealed Window", img: "/images/hellohouse/1201.jpg", imgAlt: "Hello House B&B Kaohsiung B&B - 2F Room 1201 double bed guest room with standard layout, desk, A/C, and private bathroom.", amenities: ["🛏️ Double Bed", "💻 Desk", "❄️ A/C / Dryer"] },
        { floor: "2F", name: "Room 1202 (Quad)", sub: "Excellent natural light with Instagram-worthy hanging chair.", size: "40 m²", highlight: "Floor-to-ceiling Glass", img: "/images/hellohouse/1202.jpg", imgAlt: "Hello House B&B Kaohsiung B&B - 2F Room 1202 quad room featuring a classic hanging chair, natural light, and comfy sofas.", amenities: ["🛏️ Double Bed ×2", "🪑 Sofa / Table / Swing Chair", "📺 Smart TV", "🚿 Separate Bathroom"] },
        { floor: "3F", name: "Room 1301 (Double)", sub: "An independent double room completing the six-bedroom layout.", size: "Double room", highlight: "Private sleeping space", img: "/images/hellohouse/1301.jpg", imgAlt: "Hello House B&B Kaohsiung - 3F Room 1301 with one standard double bed and an independent sleeping space.", amenities: ["🛏️ Double Bed", "❄️ Climate Control"] },
        { floor: "3F", name: "Room 1302 (6-person)", sub: "Spacious group room, great for families or friends.", size: "48 m²", highlight: "Floor-to-ceiling Glass", img: "/images/hellohouse/1302.jpg", imgAlt: "Hello House B&B Kaohsiung B&B - 3F Room 1302 spacious six-person bedroom with three double beds and floor-to-ceiling windows.", amenities: ["🛏️ Double Bed ×3", "💻 Desk", "📺 Smart TV", "❄️ A/C / Dryer"] },
        { floor: "4F", name: "Room 1401 (Double)", sub: "Elegant high-floor views for a quiet private retreat.", size: "24 m²", highlight: "Floor-length Window", img: "/images/hellohouse/1401.jpg", imgAlt: "Hello House B&B Kaohsiung B&B - 4F Room 1401 elegant double bed room on a high floor with beautiful window views and cozy couch.", amenities: ["🛏️ Double Bed", "🪑 Sofa / Table", "❄️ A/C / Dryer"] },
        { floor: "4F", name: "Room 1402 (6-person)", sub: "High floor, expansive space—perfect for groups.", size: "45 m²", highlight: "Floor-to-ceiling Glass", img: "/images/hellohouse/1402.jpg", imgAlt: "Hello House B&B Kaohsiung B&B - 4F Room 1402 scenic six-person bedroom, perfect for family reunions or group travel.", amenities: ["🛏️ Double Bed ×3", "💻 Desk", "📺 Smart TV", "❄️ A/C / Dryer"] },
    ],
    ja: [
        { floor: "1F", name: "共用スペース", sub: "広々とした交流空間。みんなが集まる最高の場所。", size: "56 m²", highlight: "高級アイランドキッチン", img: "/images/hellohouse/1000.jpg", imgAlt: "Hello House B&B 高雄 - 1F共用スペース、高級アイランドキッチンと交流エリアが一体となった20人対応空間。", amenities: ["🍳 IHコンロ×2 / レンジフード", "🧊 RO浄水器 / 冷蔵庫", "🍞 オーブン / 電子レンジ", "📺 スマートTV", "🀄 麻雀 / トランプ", "❄️ 冷暖房完備"] },
        { floor: "2F", name: "1201 ダブルルーム", sub: "スタンダードな快適空間。", size: "24 m²", highlight: "気密窓", img: "/images/hellohouse/1201.jpg", imgAlt: "Hello House B&B 高雄 - 2F 1201ダブルルーム、快適なダブルベッド、エアコン、専用バスルーム完備。", amenities: ["🛏️ ダブルベッド", "💻 デスク", "❄️ エアコン / ドライヤー"] },
        { floor: "2F", name: "1202 4人部屋", sub: "採光抜群、インスタ映えハンギングチェア付き。", size: "40 m²", highlight: "落地ガラス窓", img: "/images/hellohouse/1202.jpg", imgAlt: "Hello House B&B 高雄 - 2F 12024人部屋、名物の白いハンギングチェア、大きな窓からの明るい採光。", amenities: ["🛏️ ダブルベッド ×2", "🪑 ソファ / テーブル / 吊り椅子", "📺 スマートTV", "🚿 乾湿分離バスルーム"] },
        { floor: "3F", name: "1301 ダブルルーム", sub: "6室構成を満たす独立ダブルルーム。", size: "ダブルルーム", highlight: "独立した寝室", img: "/images/hellohouse/1301.jpg", imgAlt: "Hello House B&B 高雄 - 3F 1301ダブルルーム、標準ダブルベッド1台の独立した寝室。", amenities: ["🛏️ ダブルベッド", "❄️ 冷暖房完備"] },
        { floor: "3F", name: "1302 6人部屋", sub: "広々としたグループルーム。家族や友人に最適。", size: "48 m²", highlight: "落地ガラス窓", img: "/images/hellohouse/1302.jpg", imgAlt: "Hello House B&B 高雄 - 3F 1302広々とした6人部屋、ダブルベッド3台、ガラス窓からの良い眺望。", amenities: ["🛏️ ダブルベッド ×3", "💻 デスク", "📺 スマートTV", "❄️ エアコン / ドライヤー"] },
        { floor: "4F", name: "1401 ダブルルーム", sub: "上品な高層階ビュー。静かなプライベート空間。", size: "24 m²", highlight: "落地窓", img: "/images/hellohouse/1401.jpg", imgAlt: "Hello House B&B 高雄 - 4F 1401優雅なダブルルーム、高層階の窓からの街の景色とリラックス用ソファ。", amenities: ["🛏️ ダブルベッド", "🪑 ソファ / テーブル", "❄️ エアコン / ドライヤー"] },
        { floor: "4F", name: "1402 6人部屋", sub: "高層階の広い空間。グループ宿泊に最適。", size: "45 m²", highlight: "落地ガラス窓", img: "/images/hellohouse/1402.jpg", imgAlt: "Hello House B&B 高雄 - 4F 14026人部屋、大人数グループやファミリー旅行に最適な広い客室。", amenities: ["🛏️ ダブルベッド ×3", "💻 デスク", "📺 スマートTV", "❄️ エアコン / ドライヤー"] },
    ],
    ko: [
        { floor: "1F", name: "공용 공간", sub: "넓고 편안한 소셜 공간. 모두가 모이는 최고의 장소.", size: "56 m²", highlight: "고급 아일랜드 키친", img: "/images/hellohouse/1000.jpg", imgAlt: "Hello House B&B 가오슝 - 1F 공용 공간, 오픈 아일랜드 주방과 모임 공간이 어우러진 20인용 친목 공간.", amenities: ["🍳 IH쿡탑×2 / 후드", "🧊 RO정수기 / 냉장고", "🍞 오븐 / 전자레인지", "📺 스마트TV", "🀄 마작 / 카드", "❄️ 냉난방"] },
        { floor: "2F", name: "1201 더블룸", sub: "편안한 스탠다드 객실.", size: "24 m²", highlight: "기밀창", img: "/images/hellohouse/1201.jpg", imgAlt: "Hello House B&B 가오슝 - 2F 1201 더블룸, 더블 침대, 에어컨 및 독립된 욕실 완비.", amenities: ["🛏️ 더블 침대", "💻 책상", "❄️ 에어컨 / 드라이어"] },
        { floor: "2F", name: "1202 4인실", sub: "뛰어난 채광, 인스타용 해먹 의자 완비.", size: "40 m²", highlight: "바닥~천장 유리창", img: "/images/hellohouse/1202.jpg", imgAlt: "Hello House B&B 가오슝 - 2F 1202 4인실, 인스타 감성의 하얀 그네 의자와 대형 유리창 채광.", amenities: ["🛏️ 더블 침대 ×2", "🪑 소파 / 테이블 / 해먹", "📺 스마트TV", "🚿 건습분리 욕실"] },
        { floor: "3F", name: "1301 더블룸", sub: "6개 객실 구성을 완성하는 독립 더블룸.", size: "더블룸", highlight: "독립 침실", img: "/images/hellohouse/1301.jpg", imgAlt: "Hello House B&B 가오슝 - 3F 1301 더블룸, 표준 더블 침대 1개가 있는 독립 침실.", amenities: ["🛏️ 더블 침대", "❄️ 냉난방"] },
        { floor: "3F", name: "1302 6인실", sub: "넓은 단체 객실. 가족이나 친구에게 최적.", size: "48 m²", highlight: "바닥~천장 유리창", img: "/images/hellohouse/1302.jpg", imgAlt: "Hello House B&B 가오슝 - 3F 1302 넓은 6인실, 더블 침대 3개 탑재 및 통유리 채광창.", amenities: ["🛏️ 더블 침대 ×3", "💻 책상", "📺 스마트TV", "❄️ 에어컨 / 드라이어"] },
        { floor: "4F", name: "1401 더블룸", sub: "고층 전망의 우아한 프라이빗 공간.", size: "24 m²", highlight: "바닥~천장 창문", img: "/images/hellohouse/1401.jpg", imgAlt: "Hello House B&B 가오슝 - 4F 1401 우아한 더블룸, 고층 뷰와 안락한 소파 테이블 구비.", amenities: ["🛏️ 더블 침대", "🪑 소파 / 테이블", "❄️ 에어컨 / 드라이어"] },
        { floor: "4F", name: "1402 6인실", sub: "고층의 넓은 공간. 단체 숙박에 최적.", size: "45 m²", highlight: "바닥~천장 유리창", img: "/images/hellohouse/1402.jpg", imgAlt: "Hello House B&B 가오슝 - 4F 1402 6인실, 가족 여행 및 단체 투숙객에게 알맞은 넓고 쾌적한 공간.", amenities: ["🛏️ 더블 침대 ×3", "💻 책상", "📺 스마트TV", "❄️ 에어컨 / 드라이어"] },
    ],
    vi: [
        { floor: "1F", name: "Khu vực chung", sub: "Không gian giao lưu rộng rãi — nơi tuyệt vời nhất để mọi người tụ họp.", size: "56 m²", highlight: "Bếp đảo sang trọng", img: "/images/hellohouse/1000.jpg", imgAlt: "Hello House B&B Kaohsiung - Không gian chung 1F kết hợp bếp đảo sang trọng và khu vực giao lưu rộng rãi cho đoàn 20 khách.", amenities: ["🍳 Bếp IH×2 / Máy hút mùi", "🧊 Máy lọc RO / Tủ lạnh", "🍞 Lò nướng / Vi sóng", "📺 Smart TV", "🀄 Mạt chược / Bài", "❄️ Điều hòa"] },
        { floor: "2F", name: "Phòng 1201 (Đôi)", sub: "Phòng tiêu chuẩn thoải mái.", size: "24 m²", highlight: "Cửa sổ kín", img: "/images/hellohouse/1201.jpg", imgAlt: "Hello House B&B Kaohsiung - 2F Phòng 1201 giường đôi tiêu chuẩn thoải mái với bàn làm việc, máy điều hòa và nhà vệ sinh riêng.", amenities: ["🛏️ Giường đôi", "💻 Bàn làm việc", "❄️ Điều hòa / Máy sấy"] },
        { floor: "2F", name: "Phòng 1202 (4 người)", sub: "Ánh sáng tuyệt vời, ghế treo sống ảo.", size: "40 m²", highlight: "Kính cường lực sàn-trần", img: "/images/hellohouse/1202.jpg", imgAlt: "Hello House B&B Kaohsiung - 2F Phòng 1202 phòng 4 người có ghế treo sống ảo độc đáo, ban công sáng sủa.", amenities: ["🛏️ Giường đôi ×2", "🪑 Sofa / Bàn / Ghế treo", "📺 Smart TV", "🚿 Phòng tắm khô-ướt"] },
        { floor: "3F", name: "Phòng 1301 (Đôi)", sub: "Phòng đôi riêng hoàn thiện cấu hình sáu phòng ngủ.", size: "Phòng đôi", highlight: "Không gian ngủ riêng", img: "/images/hellohouse/1301.jpg", imgAlt: "Hello House B&B Kaohsiung - Phòng 1301 tầng 3 với một giường đôi tiêu chuẩn và không gian ngủ riêng.", amenities: ["🛏️ Giường đôi", "❄️ Điều hòa"] },
        { floor: "3F", name: "Phòng 1302 (6 người)", sub: "Phòng nhóm rộng rãi, lý tưởng cho gia đình hoặc bạn bè.", size: "48 m²", highlight: "Kính cường lực sàn-trần", img: "/images/hellohouse/1302.jpg", imgAlt: "Hello House B&B Kaohsiung - 3F Phòng 1302 phòng 6 người rộng rãi với 3 giường đôi và cửa kính kịch trần.", amenities: ["🛏️ Giường đôi ×3", "💻 Bàn làm việc", "📺 Smart TV", "❄️ Điều hòa / Máy sấy"] },
        { floor: "4F", name: "Phòng 1401 (Đôi)", sub: "Tầng cao sang trọng, không gian yên tĩnh riêng tư.", size: "24 m²", highlight: "Cửa sổ sàn-trần", img: "/images/hellohouse/1401.jpg", imgAlt: "Hello House B&B Kaohsiung - 4F Phòng 1401 phòng đôi thanh lịch trên tầng cao với tầm nhìn mở và sofa thư giãn.", amenities: ["🛏️ Giường đôi", "🪑 Sofa / Bàn", "❄️ Điều hòa / Máy sấy"] },
        { floor: "4F", name: "Phòng 1402 (6 người)", sub: "Tầng cao, không gian rộng. Lý tưởng cho nhóm.", size: "45 m²", highlight: "Kính cường lực sàn-trần", img: "/images/hellohouse/1402.jpg", imgAlt: "Hello House B&B Kaohsiung - 4F Phòng 1402 phòng 6 người có tầm nhìn đẹp thích hợp cho đại gia đình hoặc nhóm bạn thân.", amenities: ["🛏️ Giường đôi ×3", "💻 Bàn làm việc", "📺 Smart TV", "❄️ Điều hòa / Máy sấy"] },
    ],
};

export default function HelloHousePageContent({ locale }: { locale: Locale }) {
    const t = getDictionary(locale);
    const prefix = locale === "zh" ? "" : `/${locale}`;
    const localeRooms = rooms[locale];

    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "LodgingBusiness",
                name: `${publicStayFacts.hellohouse.name} / Hello House B&B`,
                url: `https://www.hello-stay.com${prefix}/hellohouse`,
                inLanguage: locale,
                numberOfRooms: publicStayFacts.hellohouse.bedrooms,
                amenityFeature: [
                    { "@type": "LocationFeatureSpecification", name: "Island kitchen", value: true },
                    { "@type": "LocationFeatureSpecification", name: "Manual mahjong table", value: true },
                ],
            }} />

            <div className="legacy-editorial-page legacy-property-page legacy-hellohouse-page">
            {/* Hero */}
            <section className="hero-d">
                <div className="bg" style={{ backgroundImage: "url('/images/hellohouse/cover.jpg')", opacity: 0.5 }} />
                <div className="overlay" />
                <div className="content" style={{ padding: "0 28px" }}>
                    <div className="tagline" style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.2s forwards" }}>{t.hellohouse.tagline}</div>
                    <h1 style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.4s forwards" }}>{t.hellohouse.title}</h1>
                    <p className="sub" style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.6s forwards" }}>{t.hellohouse.sub}</p>
                    <div style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.8s forwards" }}>
                        <Link href={`${prefix}/book`} className="btn-reserve">{t.hellohouse.cta}</Link>
                    </div>
                </div>
            </section>

            {/* About */}
            <section className="sec-cream">
                <div className="w">
                    <Reveal>
                        <div className="grid-asym" style={{ marginBottom: "0" }}>
                            <div className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                <Image src="/images/hellohouse/photo1.jpg" alt="Hello House B&B Kaohsiung - Private townhouse B&B accommodating 8 to 26 guests with premium open kitchen, mahjong, and smart TV." width={700} height={525} sizes="(max-width: 768px) 100vw, 50vw" className="img-cover" />
                            </div>
                            <div>
                                <div className="label-d" style={{ color: "var(--pri)" }}>About</div>
                                <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", marginBottom: "16px", letterSpacing: "0.06em" }}>{t.hellohouse.about_title}</h2>
                                <div className="gold-line" style={{ marginBottom: "20px" }} />
                                <p style={{ fontSize: "0.92rem", color: "#8A8279", lineHeight: 2.2 }}>{t.hellohouse.about_desc}</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Features */}
            <section className="sec-dark">
                <div className="w" style={{ textAlign: "center", marginBottom: "50px" }}>
                    <Reveal>
                        <div className="label-d">Highlights</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", color: "#fff", letterSpacing: "0.06em" }}>{t.hellohouse.why_title}</h2>
                    </Reveal>
                </div>
                <div className="w">
                    <Reveal>
                        <div className="col3">
                            <div className="col3-item">
                                <div className="gold" style={{ fontSize: "1.6rem", marginBottom: "4px" }}>🍳</div>
                                <h3 style={{ color: "#fff" }}>{t.hellohouse.feat1_title}</h3>
                                <p>{t.hellohouse.feat1_desc}</p>
                            </div>
                            <div className="col3-item">
                                <div className="gold" style={{ fontSize: "1.6rem", marginBottom: "4px" }}>🀄</div>
                                <h3 style={{ color: "#fff" }}>{t.hellohouse.feat2_title}</h3>
                                <p>{t.hellohouse.feat2_desc}</p>
                            </div>
                            <div className="col3-item">
                                <div className="gold" style={{ fontSize: "1.6rem", marginBottom: "4px" }}>🛏️</div>
                                <h3 style={{ color: "#fff" }}>{t.hellohouse.feat3_title}</h3>
                                <p>{t.hellohouse.feat3_desc}</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Rooms */}
            <section className="sec-white">
                <div className="w" style={{ marginBottom: "50px" }}>
                    <Reveal>
                        <div className="label-d" style={{ color: "#8A8279" }}>Rooms</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", letterSpacing: "0.06em" }}>{t.hellohouse.rooms_title}</h2>
                        <p style={{ fontSize: "0.9rem", color: "#8A8279", marginTop: "10px" }}>{t.hellohouse.rooms_sub}</p>
                    </Reveal>
                </div>
                {localeRooms.map((room, i) => (
                    <div className="w" key={i}>
                        <Reveal>
                            <div className={`room-detail-card${i % 2 === 1 ? " reverse" : ""}`}>
                                <div className="room-detail-img">
                                    <Image src={room.img} alt={(room as { imgAlt?: string }).imgAlt || room.name} width={700} height={500} sizes="(max-width: 768px) 100vw, 50vw" className="img-cover" />
                                </div>
                                <div className="room-detail-info">
                                    <div className="room-floor-tag">{room.floor}</div>
                                    <h3>{room.name}</h3>
                                    <p className="room-subtitle">{room.sub}</p>
                                    <div className="room-badges">
                                        <span className="room-badge">{room.size}</span>
                                        <span className="room-badge gold">{room.highlight}</span>
                                    </div>
                                    <div className="room-amenities">
                                        {room.amenities.map((a) => <span key={a}>{a}</span>)}
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                ))}
            </section>

            {/* Gallery */}
            <section className="sec-cream">
                <div className="w" style={{ marginBottom: "40px" }}>
                    <Reveal>
                        <div className="label-d" style={{ color: "#8A8279" }}>Gallery</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", letterSpacing: "0.06em" }}>{t.hellohouse.gallery_title}</h2>
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

            {/* CTA */}
            <div className="cta-strip">
                <Reveal>
                    <h3>{t.hellohouse.cta_bottom_title}</h3>
                    <p>{t.hellohouse.cta_bottom_sub}</p>
                    <Link href={`${prefix}/book`} className="btn-reserve">{t.hellohouse.cta_bottom_btn}</Link>
                </Reveal>
            </div>
            </div>
        </>
    );
}
