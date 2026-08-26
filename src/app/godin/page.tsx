import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import LineFloatingCTA from "@/components/LineFloatingCTA";
import { godin } from "@/data/properties";
import { getAlternateLanguageMap } from "@/i18n/config";

const bookingHref = "https://booking.hello-stay.com/booking?property=%E6%BA%9D%E9%A0%82%E6%B0%91%E5%AE%BF";

export const metadata: Metadata = {
  title: "溝頂民宿｜高雄鹽埕 4-12 人包棟民宿・五層獨棟・每房獨立衛浴",
  description:
    "高雄小團體包棟推薦「溝頂民宿」：4-12 人五層獨棟、4 間客房皆有獨立衛浴，整棟專屬獨享。4F 設專屬交誼廳與手動麻將桌，步行 5 分鐘到捷運鹽埕埔站、8 分鐘到駁二，即時查空房與直訂優惠！",
  alternates: {
    canonical: "https://www.hello-stay.com/godin",
    languages: getAlternateLanguageMap("/godin"),
  },
  openGraph: {
    title: "溝頂民宿｜高雄鹽埕 4-12 人包棟民宿・五層獨棟・每房獨立衛浴｜Hello Stay",
    description:
      "高雄鹽埕小團體包棟首選「溝頂民宿」：適合 4-12 人，4 間客房皆有獨立衛浴，4F 設交誼廳、手動麻將桌與簡易備餐空間，步行可到駁二與捷運鹽埕埔站。",
    url: "https://www.hello-stay.com/godin",
    images: [
      {
        url: "https://www.hello-stay.com/images/godin/cover-1.webp",
        width: 1200,
        height: 630,
        alt: "溝頂民宿",
      },
    ],
  },
};

const heroStats = [
  { label: "入住人數", value: "4-12 人" },
  { label: "客房配置", value: "雙人房 2 間 四人房 2 間" },
  { label: "衛浴", value: "四間客房皆有獨立衛浴" },
  { label: "公共空間", value: "4F 交誼廳與簡易備餐" },
];

const houseFacts = [
  { label: "交誼設備", value: "麻將 桌遊 沙發 聯網電視" },
  { label: "備餐設備", value: "RO 飲水機 雙門冰箱 微波爐 流理台" },
  { label: "入住配置", value: "冷暖空調 Wi-Fi 自助入住" },
  { label: "衛浴說明", value: "1F 2F 3F 5F 為客房獨立衛浴，4F 無衛浴" },
];

const stayGuides = [
  "1F 與 5F 為雙人房，2F 與 3F 為四人房",
  "四間客房皆有獨立衛浴，4F 公共交誼廳無衛浴",
  "4F 為整團聊天 麻將 桌遊與簡易備餐空間",
  "如需補寢具或需要加床，請先用 LINE 確認當次方案",
];

const fitGuides = [
  { label: "適合人數", value: "4-12 人家庭旅行 小型朋友聚會" },
  { label: "適合需求", value: "想住同一棟 又希望房間分層休息" },
  { label: "不必期待", value: "大型廚房或超大宴客空間" },
  { label: "整棟節奏", value: "白天出門 晚上回 4F 集合最順" },
];

const faqItems = [
  {
    q: "溝頂民宿可以幾個人包棟？",
    a: "溝頂民宿適合 4-12 人整棟包棟，共 2 間雙人房與 2 間四人房，四間客房皆有獨立衛浴，適合家庭旅行與小型朋友聚會。",
  },
  {
    q: "溝頂民宿可以開伙煮飯嗎？",
    a: "館內提供流理台、雙門冰箱、微波爐與 RO 飲水機，適合簡單備餐與宵夜加熱，不提供正式開伙的廚房。想要中島廚房與完整烹飪設備，可以改看你好哇寓所。",
  },
  {
    q: "溝頂民宿有麻將桌嗎？",
    a: "有，4F 交誼廳備有手動麻將桌、桌遊、沙發與聯網電視，整團晚上回民宿可以在同一層聚會。",
  },
  {
    q: "溝頂民宿有電梯嗎？長輩適合入住嗎？",
    a: "溝頂民宿沒有電梯，五層樓以樓梯移動；若有長輩同行，建議優先把 1F 雙人房安排給長輩，減少上下樓需求。",
  },
  {
    q: "溝頂民宿走到駁二和捷運站要多久？",
    a: "步行到捷運鹽埕埔站約 5 分鐘、輕軌駁二大義站約 7 分鐘、大港橋約 8 分鐘、駁二藝術特區約 10 分鐘；巷口步行 2-3 分鐘內有超商與在地小吃。",
  },
  {
    q: "超過 12 人的團體怎麼辦？",
    a: "13 人以上建議改看 8-26 人的你好哇寓所；27-36 人可以選擇兩館一起訂的雙館包棟方案，兩館步行約 5 秒即達。",
  },
];

const actualGallery = [
  { src: "/images/godin/room1.webp", alt: "溝頂民宿 1F 經典雙人房實景" },
  { src: "/images/godin/room2.webp", alt: "溝頂民宿 2F 陽光四人房實景" },
  { src: "/images/godin/room3.webp", alt: "溝頂民宿 3F 雅緻四人房實景" },
  { src: "/images/godin/room4.webp", alt: "溝頂民宿 4F 公共交誼廳實景" },
  { src: "/images/godin/room5.webp", alt: "溝頂民宿 5F 景觀雙人房實景" },
];

const nearbyHighlights = godin.nearbySpots.slice(0, 6);

const getRoomId = (room: (typeof godin.rooms)[number]) => `room-${room.id}`;

const getBathroomLabel = (room: (typeof godin.rooms)[number]) =>
  room.capacity > 0 ? "獨立衛浴" : "公共空間無衛浴";

const getUseLabel = (room: (typeof godin.rooms)[number]) =>
  room.capacity > 0 ? `${room.capacity} 人入住` : "團聚與備餐";

const getHighlightLabel = (room: (typeof godin.rooms)[number]) =>
  room.highlight ?? room.badges.find((badge) => badge.gold)?.label ?? room.badges[0]?.label ?? "空間細節";

const pageStyles = String.raw`
.godin-page {
  --ink: #1f1a16;
  --text: #5f584f;
  --muted: #8f8579;
  --line: #e6ddd0;
  --paper: #f6f1e8;
  --card: #fffdf9;
  --accent: #2d5a44;
  --accent-soft: #dce9df;
  --overlay: rgba(15, 14, 12, 0.42);
  padding-bottom: 96px;
  background: linear-gradient(180deg, #f7f2ea 0%, #f4efe6 100%);
  color: var(--ink);
}

.godin-page * {
  box-sizing: border-box;
}

.godin-page a {
  text-decoration: none;
}

.godin-shell {
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
}

.godin-kicker {
  margin: 0;
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 760;
  letter-spacing: 0;
}

.godin-hero {
  padding-top: calc(var(--nav-h) + 24px);
}

.godin-hero__frame {
  position: relative;
  min-height: min(760px, calc(100vh - var(--nav-h) - 36px));
  overflow: hidden;
  border-radius: 8px;
  background: #25211d;
  box-shadow: 0 32px 84px rgba(31, 26, 22, 0.18);
}

.godin-hero__media {
  position: absolute;
  inset: 0;
}

.godin-hero__media::after {
  position: absolute;
  inset: 0;
  content: "";
  background:
    linear-gradient(90deg, rgba(18, 17, 15, 0.78) 0%, rgba(18, 17, 15, 0.44) 44%, rgba(18, 17, 15, 0.14) 76%),
    linear-gradient(0deg, rgba(18, 17, 15, 0.2), rgba(18, 17, 15, 0.04));
}

.godin-hero__media img,
.godin-overview-card__image img,
.godin-room-card__media img,
.godin-gallery__image img {
  object-fit: cover;
}

.godin-hero__content {
  position: relative;
  z-index: 2;
  display: grid;
  align-content: end;
  min-height: min(760px, calc(100vh - var(--nav-h) - 36px));
  padding: clamp(32px, 5vw, 64px);
}

.godin-hero__copy {
  display: grid;
  gap: 22px;
  width: min(560px, 100%);
}

.godin-hero__copy .godin-kicker {
  color: rgba(236, 244, 236, 0.9);
}

.godin-hero h1 {
  margin: 0;
  color: #fffaf2;
  font-size: clamp(2.9rem, 5vw, 5.6rem);
  font-weight: 780;
  line-height: 0.98;
  letter-spacing: 0;
}

.godin-hero__lead {
  margin: 0;
  color: rgba(255, 250, 242, 0.86);
  font-size: 1.05rem;
  line-height: 1.9;
}

.godin-hero__actions,
.godin-final__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.godin-button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: #fffaf2;
  font-size: 0.92rem;
  font-weight: 760;
  backdrop-filter: blur(14px);
  transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
}

.godin-button:hover {
  transform: translateY(-1px);
}

.godin-button--primary {
  border-color: rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.92);
  color: var(--ink);
}

.godin-hero__stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  width: 100%;
  margin-top: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(18px);
}

.godin-hero__stats article {
  display: grid;
  gap: 8px;
  min-width: 0;
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.08);
}

.godin-hero__stats span {
  color: rgba(255, 250, 242, 0.7);
  font-size: 0.76rem;
  font-weight: 720;
  line-height: 1.45;
}

.godin-hero__stats strong {
  color: #fffaf2;
  font-size: 0.98rem;
  font-weight: 760;
  line-height: 1.55;
}

.godin-inpage-nav {
  position: sticky;
  top: var(--nav-h);
  z-index: 20;
  border-top: 1px solid rgba(31, 26, 22, 0.08);
  border-bottom: 1px solid var(--line);
  background: rgba(247, 242, 234, 0.94);
  backdrop-filter: blur(16px);
}

.godin-inpage-nav__inner {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 48px;
  overflow-x: auto;
  scrollbar-width: none;
}

.godin-inpage-nav__inner::-webkit-scrollbar { display: none; }

.godin-inpage-nav a {
  flex: 0 0 auto;
  padding: 7px 12px;
  border-radius: 999px;
  color: var(--text);
  font-size: 0.76rem;
  font-weight: 760;
  white-space: nowrap;
}

.godin-inpage-nav a:hover,
.godin-inpage-nav a:focus-visible {
  background: var(--accent-soft);
  color: var(--accent);
}

.godin-section {
  padding-top: 84px;
}

.godin-section__head {
  display: grid;
  gap: 12px;
  max-width: 720px;
  margin-bottom: 28px;
}

.godin-section__head h2 {
  margin: 0;
  color: var(--ink);
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: 760;
  line-height: 1.12;
}

.godin-section__head p {
  margin: 0;
  color: var(--text);
  font-size: 0.98rem;
  line-height: 1.8;
}

.godin-overview-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.godin-overview-card {
  display: grid;
  gap: 14px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255, 253, 249, 0.92);
  box-shadow: 0 14px 36px rgba(31, 26, 22, 0.05);
}

.godin-overview-card__image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border-radius: 6px;
  background: #e8dfd0;
}

.godin-overview-card__body {
  display: grid;
  gap: 8px;
}

.godin-overview-card__body span {
  color: var(--accent);
  font-size: 0.76rem;
  font-weight: 760;
}

.godin-overview-card__body strong {
  color: var(--ink);
  font-size: 1rem;
  font-weight: 760;
  line-height: 1.45;
}

.godin-overview-card__body p,
.godin-overview-card__link {
  margin: 0;
  color: var(--text);
  font-size: 0.86rem;
  line-height: 1.6;
}

.godin-overview-card__link {
  color: var(--accent);
  font-weight: 720;
}

.godin-detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) 340px;
  gap: 26px;
  align-items: start;
}

.godin-room-stack {
  display: grid;
  gap: 18px;
}

.godin-room-card {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 0;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--card);
  box-shadow: 0 16px 42px rgba(31, 26, 22, 0.06);
}

.godin-room-card__media {
  position: relative;
  min-height: 260px;
  background: #e8dfd0;
}

.godin-room-card__body {
  display: grid;
  gap: 16px;
  align-content: start;
  padding: 22px 24px;
}

.godin-room-card__head {
  display: grid;
  gap: 8px;
}

.godin-room-card__floor {
  color: var(--accent);
  font-size: 0.76rem;
  font-weight: 760;
}

.godin-room-card__head h3 {
  margin: 0;
  color: var(--ink);
  font-size: 1.46rem;
  font-weight: 760;
  line-height: 1.22;
}

.godin-room-card__head p {
  margin: 0;
  color: var(--text);
  font-size: 0.92rem;
  line-height: 1.7;
}

.godin-room-card__specs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--line);
}

.godin-room-card__spec {
  display: grid;
  gap: 6px;
  min-width: 0;
  padding: 12px;
  background: #faf6ef;
}

.godin-room-card__spec span,
.godin-facts-card span,
.godin-fit-card span,
.godin-location-card span,
.godin-location-list span {
  color: var(--muted);
  font-size: 0.76rem;
  font-weight: 720;
  line-height: 1.45;
}

.godin-room-card__spec strong,
.godin-facts-card strong,
.godin-fit-card strong,
.godin-location-card strong,
.godin-location-list strong {
  color: var(--ink);
  font-size: 0.96rem;
  font-weight: 760;
  line-height: 1.55;
}

.godin-room-card__amenities {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.godin-amenity-box {
  display: grid;
  gap: 10px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fffaf4;
}

.godin-amenity-box h4 {
  margin: 0;
  color: var(--ink);
  font-size: 0.9rem;
  font-weight: 760;
}

.godin-amenity-box ul {
  display: grid;
  gap: 7px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.godin-amenity-box li {
  position: relative;
  padding-left: 14px;
  color: var(--text);
  font-size: 0.84rem;
  line-height: 1.55;
}

.godin-amenity-box li::before {
  position: absolute;
  top: 0.58rem;
  left: 0;
  width: 5px;
  height: 5px;
  content: "";
  border-radius: 999px;
  background: var(--accent);
}

.godin-side-stack {
  display: grid;
  gap: 16px;
  position: sticky;
  top: calc(var(--nav-h) + 24px);
}

.godin-facts-card,
.godin-fit-card,
.godin-location-card,
.godin-location-list,
.godin-final {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255, 253, 249, 0.94);
  box-shadow: 0 14px 36px rgba(31, 26, 22, 0.05);
}

.godin-facts-card,
.godin-fit-card,
.godin-location-card {
  padding: 20px;
}

.godin-facts-card h3,
.godin-fit-card h3,
.godin-location-card h3 {
  margin: 0 0 14px;
  color: var(--ink);
  font-size: 1rem;
  font-weight: 760;
}

.godin-facts-list,
.godin-fit-list {
  display: grid;
  gap: 1px;
  overflow: hidden;
  border-radius: 6px;
  background: var(--line);
}

.godin-facts-list article,
.godin-fit-list article {
  display: grid;
  gap: 6px;
  padding: 14px;
  background: #fffaf4;
}

.godin-guides {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 18px;
}

.godin-guides li {
  color: var(--text);
  font-size: 0.9rem;
  line-height: 1.65;
}

.godin-location-card p {
  margin: 0;
  color: var(--text);
  font-size: 0.92rem;
  line-height: 1.75;
}

.godin-location-card a {
  display: inline-flex;
  margin-top: 14px;
  color: var(--accent);
  font-size: 0.9rem;
  font-weight: 760;
}

.godin-location-list {
  display: grid;
  gap: 1px;
  overflow: hidden;
  background: var(--line);
}

.godin-location-list article {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  padding: 16px 18px;
  background: #fffaf4;
}

.godin-gallery {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
}

.godin-gallery__item {
  display: grid;
  gap: 8px;
}

.godin-gallery__image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  background: #e8dfd0;
  box-shadow: 0 10px 28px rgba(31, 26, 22, 0.05);
}

.godin-gallery__item figcaption {
  color: var(--text);
  font-size: 0.82rem;
  font-weight: 720;
}

.godin-final {
  display: flex;
  justify-content: space-between;
  gap: 28px;
  margin-top: 88px;
  padding: 28px 30px;
  background: #1f1a16;
}

.godin-final .godin-kicker {
  color: rgba(228, 238, 228, 0.9);
}

.godin-final h2 {
  margin: 0 0 12px;
  color: #fffaf2;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 760;
  line-height: 1.16;
}

.godin-final p {
  margin: 0;
  color: rgba(255, 250, 242, 0.78);
  font-size: 0.96rem;
  line-height: 1.75;
}

.godin-final .godin-button {
  border-color: rgba(255, 255, 255, 0.22);
}

.godin-faq-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.godin-faq-card {
  display: grid;
  gap: 10px;
  align-content: start;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--card);
  box-shadow: 0 14px 36px rgba(31, 26, 22, 0.05);
}

.godin-faq-card h3 {
  margin: 0;
  color: var(--ink);
  font-size: 1.02rem;
  font-weight: 760;
  line-height: 1.4;
}

.godin-faq-card p {
  margin: 0;
  color: var(--text);
  font-size: 0.9rem;
  line-height: 1.75;
}

.godin-crosslinks {
  margin: 24px 0 0;
  color: var(--text);
  font-size: 0.92rem;
  line-height: 1.8;
}

.godin-crosslinks a {
  margin: 0 2px;
  color: var(--accent);
  font-weight: 760;
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 1180px) {
  .godin-overview-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .godin-gallery {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 1024px) {
  .godin-hero__stats,
  .godin-room-card__specs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .godin-detail-layout {
    grid-template-columns: 1fr;
  }

  .godin-side-stack {
    position: static;
  }

  .godin-room-card {
    grid-template-columns: 260px minmax(0, 1fr);
  }
}

@media (max-width: 820px) {
  .godin-shell {
    width: calc(100% - 28px);
  }

  .godin-hero__frame,
  .godin-hero__content {
    min-height: 620px;
  }

  .godin-overview-grid,
  .godin-gallery {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .godin-faq-grid {
    grid-template-columns: 1fr;
  }

  .godin-room-card {
    grid-template-columns: 1fr;
  }

  .godin-room-card__media {
    min-height: 240px;
  }

  .godin-final {
    display: grid;
  }
}

@media (max-width: 640px) {
  .godin-hero {
    padding-top: calc(var(--nav-h) + 14px);
  }

  .godin-hero__frame,
  .godin-hero__content {
    min-height: 560px;
  }

  .godin-hero__content {
    padding: 22px;
  }

  .godin-hero h1 {
    font-size: 2.7rem;
  }

  .godin-hero__stats,
  .godin-overview-grid,
  .godin-room-card__specs,
  .godin-room-card__amenities,
  .godin-gallery {
    grid-template-columns: 1fr;
  }

  .godin-section {
    padding-top: 68px;
  }

  .godin-location-list article {
    grid-template-columns: 1fr;
  }

  .godin-button,
  .godin-final .godin-button {
    width: 100%;
  }

  .godin-hero__actions,
  .godin-final__actions {
    display: grid;
  }
}
`;

export default function GodinPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "@id": "https://www.hello-stay.com/godin/#lodging",
              name: "溝頂民宿 Godin House",
              alternateName: ["Godin House", "溝頂", "Hello Stay 二館"],
              url: "https://www.hello-stay.com/godin",
              telephone: "+886-932-828-922",
              email: "hellohouse2017@gmail.com",
              description:
                "高雄鹽埕區五層樓獨棟包棟民宿，四間客房皆有獨立衛浴，適合 4-12 人家庭或小團體入住。",
              address: {
                "@type": "PostalAddress",
                streetAddress: "大公路70巷6-2號",
                addressLocality: "鹽埕區",
                addressRegion: "高雄市",
                postalCode: "803",
                addressCountry: "TW",
              },
              geo: { "@type": "GeoCoordinates", latitude: 22.6244, longitude: 120.2822 },
              hasMap: godin.mapUrl,
              sameAs: [
                "https://www.instagram.com/hellohouse2020/",
                "https://www.facebook.com/HelloHouse2020/",
                "https://lin.ee/atCiMQw",
              ],
              checkinTime: "16:00",
              checkoutTime: "11:00",
              numberOfRooms: 4,
              petsAllowed: false,
              smokingAllowed: false,
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "四間客房皆有獨立衛浴", value: true },
                { "@type": "LocationFeatureSpecification", name: "4F 公共交誼廳", value: true },
                { "@type": "LocationFeatureSpecification", name: "麻將桌", value: true },
                { "@type": "LocationFeatureSpecification", name: "免費 Wi-Fi", value: true },
                { "@type": "LocationFeatureSpecification", name: "微波爐與簡易備餐流理台", value: true },
                { "@type": "LocationFeatureSpecification", name: "RO 逆滲透飲水機", value: true },
                { "@type": "LocationFeatureSpecification", name: "自助密碼鎖入住", value: true },
                { "@type": "LocationFeatureSpecification", name: "電梯", value: false },
                { "@type": "LocationFeatureSpecification", name: "戶外烤肉區", value: false },
              ],
              containsPlace: [
                {
                  "@type": "Accommodation",
                  name: "溝頂 雙人房 (共 2 間：1F 雙人房、5F 雙人房)",
                  occupancy: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2 },
                  bed: { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "Double" },
                },
                {
                  "@type": "Accommodation",
                  name: "溝頂 四人房 (共 2 間：2F 四人房、3F 四人房)",
                  occupancy: { "@type": "QuantitativeValue", minValue: 1, maxValue: 4 },
                  bed: { "@type": "BedDetails", numberOfBeds: 2, typeOfBed: "Double" },
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.hello-stay.com" },
                { "@type": "ListItem", position: 2, name: "溝頂民宿", item: "https://www.hello-stay.com/godin" },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]),
        }}
      />

      <div className="godin-page luxury-property-page">
        <section className="godin-hero">
          <div className="godin-shell">
            <div className="godin-hero__frame">
              <div className="godin-hero__media">
                <Image
                  src="/images/godin/cover-1.webp"
                  alt="溝頂民宿 4F 交誼廳實景"
                  fill
                  priority
                  loading="eager"
                  fetchPriority="high"
                  unoptimized
                  sizes="100vw"
                />
              </div>

              <div className="godin-hero__content">
                <div className="godin-hero__copy">
                  <p className="godin-kicker">高雄鹽埕 4-12 人包棟民宿</p>
                  <h1>溝頂民宿</h1>
                  <p className="godin-hero__lead">
                    五層獨棟包棟，適合家庭旅行與小團體入住。四間客房皆有獨立衛浴，4F 是整團共用的交誼廳與簡易備餐空間。想找鹽埕民宿推薦或高雄小團體包棟，這館會是很直覺的選擇。
                  </p>

                  <div className="godin-hero__actions">
                    <a className="godin-button godin-button--primary" href={bookingHref} target="_blank" rel="noreferrer">
                      查詢空房與報價
                    </a>
                    <a className="godin-button" href={godin.lineUrl} target="_blank" rel="noreferrer">
                      LINE 線上客服
                    </a>
                  </div>
                </div>

                <div className="godin-hero__stats">
                  {heroStats.map((item) => (
                    <article key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <nav className="godin-inpage-nav" aria-label="溝頂民宿頁面導覽">
          <div className="godin-shell godin-inpage-nav__inner">
            <a href="#godin-overview">房型總覽</a>
            <a href="#godin-details">房型與設備</a>
            <a href="#godin-gallery">實景照片</a>
            <a href="#godin-location">交通位置</a>
            <a href="#godin-faq">常見問題</a>
            <a href="#godin-final">查空房</a>
          </div>
        </nav>

        <section className="godin-section" id="godin-overview">
          <div className="godin-shell">
            <div className="godin-section__head">
              <p className="godin-kicker">房型指南</p>
              <h2>房型與整棟安排</h2>
              <p>每層用途、人數與衛浴配置都整理在這裡。</p>
            </div>

            <div className="godin-overview-grid">
              {godin.rooms.map((room) => (
                <a className="godin-overview-card" href={`#${getRoomId(room)}`} key={room.id}>
                  <div className="godin-overview-card__image">
                    <Image
                      src={room.images[0]?.src ?? godin.coverImage}
                      alt={room.images[0]?.alt ?? room.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1180px) 33vw, 20vw"
                    />
                  </div>
                  <div className="godin-overview-card__body">
                    <span>{room.floor}</span>
                    <strong>{room.name}</strong>
                    <p>
                      {getUseLabel(room)} · {room.size} · {getBathroomLabel(room)}
                    </p>
                    <span className="godin-overview-card__link">實景與設備</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="godin-section" id="godin-details">
          <div className="godin-shell">
            <div className="godin-section__head">
              <p className="godin-kicker">房型細節</p>
              <h2>逐層房型與設備</h2>
              <p>每層的用途、坪數、衛浴與設備都整理在這裡。</p>
            </div>

            <div className="godin-detail-layout">
              <div className="godin-room-stack">
                {godin.rooms.map((room) => (
                  <article className="godin-room-card" id={getRoomId(room)} key={room.id}>
                    <div className="godin-room-card__media">
                      <Image
                        src={room.images[0]?.src ?? godin.coverImage}
                        alt={room.images[0]?.alt ?? room.name}
                        fill
                        unoptimized
                        sizes="(max-width: 820px) 100vw, 320px"
                      />
                    </div>

                    <div className="godin-room-card__body">
                      <div className="godin-room-card__head">
                        <span className="godin-room-card__floor">{room.floor}</span>
                        <h3>{room.name}</h3>
                        <p>{room.subtitle}</p>
                      </div>

                      <div className="godin-room-card__specs">
                        <article className="godin-room-card__spec">
                          <span>用途</span>
                          <strong>{getUseLabel(room)}</strong>
                        </article>
                        <article className="godin-room-card__spec">
                          <span>空間</span>
                          <strong>{room.size}</strong>
                        </article>
                        <article className="godin-room-card__spec">
                          <span>衛浴</span>
                          <strong>{getBathroomLabel(room)}</strong>
                        </article>
                        <article className="godin-room-card__spec">
                          <span>亮點</span>
                          <strong>{getHighlightLabel(room)}</strong>
                        </article>
                      </div>

                      <div className="godin-room-card__amenities">
                        {room.equipment.map((category) => (
                          <section className="godin-amenity-box" key={category.category}>
                            <h4>{category.category}</h4>
                            <ul>
                              {category.items.map((item) => (
                                <li key={`${category.category}-${item.label}`}>
                                  {item.label}
                                  {item.detail ? ` ${item.detail}` : ""}
                                </li>
                              ))}
                            </ul>
                          </section>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="godin-side-stack">
                <section className="godin-facts-card">
                  <h3>整棟設備</h3>
                  <div className="godin-facts-list">
                    {houseFacts.map((item) => (
                      <article key={item.label}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="godin-facts-card">
                  <h3>入住重點</h3>
                  <ul className="godin-guides">
                    {stayGuides.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </section>

                <section className="godin-fit-card">
                  <h3>適合的入住方式</h3>
                  <div className="godin-fit-list">
                    {fitGuides.map((item) => (
                      <article key={item.label}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </article>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </section>

        <section className="godin-section" id="godin-gallery">
          <div className="godin-shell">
            <div className="godin-section__head">
              <p className="godin-kicker">實景照片</p>
              <h2>實景照片</h2>
              <p>館內實景都整理在這裡。</p>
            </div>

            <div className="godin-gallery">
              {actualGallery.map((image, index) => (
                <figure className="godin-gallery__item" key={image.src}>
                  <div className="godin-gallery__image">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1180px) 33vw, 20vw"
                    />
                  </div>
                  <figcaption>{godin.rooms[index]?.floor} {godin.rooms[index]?.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="godin-section" id="godin-location">
          <div className="godin-shell">
            <div className="godin-section__head">
              <p className="godin-kicker">交通位置</p>
              <h2>住在鹽埕哪一段</h2>
              <p>從大公路巷內出發，步行可到駁二、大港橋、捷運鹽埕埔站與幾家在地小吃。</p>
            </div>

            <div className="godin-detail-layout">
              <section className="godin-location-card">
                <h3>地址</h3>
                <strong>{godin.address}</strong>
                <p>如果這次重點是鹽埕行程、駁二散步與一群人回民宿續攤，這個位置會很順。</p>
                <a href={godin.mapUrl} target="_blank" rel="noreferrer">
                  在 Google Maps 開啟
                </a>
              </section>

              <div className="godin-location-list">
                {nearbyHighlights.map((spot) => (
                  <article key={`${spot.name}-${spot.walkMinutes}`}>
                    <span>{spot.name}</span>
                    <strong>{spot.walkMinutes > 0 ? `步行 ${spot.walkMinutes} 分鐘` : "捷運可達"}</strong>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="godin-section" id="godin-faq">
          <div className="godin-shell">
            <div className="godin-section__head">
              <p className="godin-kicker">常見問題</p>
              <h2>入住溝頂民宿前最常問的事</h2>
              <p>人數、備餐、麻將、樓梯與步行距離，先在這裡確認清楚。</p>
            </div>

            <div className="godin-faq-grid">
              {faqItems.map((item) => (
                <article className="godin-faq-card" key={item.q}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>

            <p className="godin-crosslinks">
              還在比較館別？可以先看
              <Link href="/kaohsiung-whole-house">高雄包棟民宿總覽</Link>、
              <Link href="/hellohouse">你好哇寓所（8-26 人）</Link>或
              <Link href="/compare">館別比較</Link>
              ，確定人數與日期後再<Link href="/book">查詢空房與報價</Link>。
            </p>
          </div>
        </section>

        <section className="godin-final godin-shell" id="godin-final">
          <div>
            <p className="godin-kicker">訂房提醒</p>
            <h2>確認日期與人數後查空房</h2>
            <p>如果房型 人數與整棟配置都符合 日期與報價就會是最後的判斷重點。</p>
          </div>
          <div className="godin-final__actions">
            <a className="godin-button godin-button--primary" href={bookingHref} target="_blank" rel="noreferrer">
              查這館空房
            </a>
            <a className="godin-button" href={godin.lineUrl} target="_blank" rel="noreferrer">
              LINE 線上客服
            </a>
          </div>
        </section>
      </div>

      <LineFloatingCTA lineUrl={godin.lineUrl} />
    </>
  );
}
