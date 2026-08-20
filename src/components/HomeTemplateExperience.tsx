"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Heart,
  House,
  KeyRound,
  MessageSquare,
  Minus,
  Pause,
  Play,
  Plus,
  ShieldCheck,
  Star,
  TrainFront,
  Users,
} from "lucide-react";
import { godin, hellohouse } from "@/data/properties";
import { homepageFaqItems, homepageLastReviewed } from "@/data/homepage-faq";
import { foodGuideSections, spotGuideSections } from "@/data/local-guides";

type BookingProperty = "" | "你好哇寓所" | "溝頂民宿" | "雙館包棟";

type StayOption = {
  id: "godin" | "hellohouse" | "dual";
  name: string;
  href: string;
  image?: string;
  imageAlt?: string;
  splitImages?: { src: string; alt: string; label: string }[];
  capacityLabel: string;
  bedroomLabel: string;
  priceLabel: string;
  bookingProperty?: BookingProperty;
  guestGuide: string;
  description: string;
  pillTags: string[];
};

type HeroSlide = {
  src: string;
  alt: string;
  label: string;
};

const bookingBase = "https://booking.hello-stay.com/booking";
const lineUrl = "https://lin.ee/atCiMQw";

const stays: StayOption[] = [
  {
    id: "godin",
    name: "溝頂民宿",
    href: "/godin",
    image: godin.coverImage,
    imageAlt: "溝頂民宿四樓交誼廳與高雄鹽埕小團體包棟空間",
    capacityLabel: "4-12 人・4 房包棟",
    bedroomLabel: "4 間獨立客房（2雙+2四）",
    priceLabel: `平日 NT$${godin.startPrice.toLocaleString("zh-TW")} 起 / 晚`,
    bookingProperty: "溝頂民宿",
    guestGuide: "4-12 人分層整棟",
    description: "五層獨棟設計，分層休息互不干擾；頂樓配備明亮交誼廳與手動麻將桌，小家庭與好友出遊專屬整棟首選。",
    pillTags: ["4 間獨立套房衛浴", "包棟整棟獨享不鎖房", "4F 頂樓交誼廳＋手動麻將", "近捷運鹽埕埔站 5 分鐘"],
  },
  {
    id: "hellohouse",
    name: "你好哇寓所",
    href: "/hellohouse",
    image: hellohouse.coverImage,
    imageAlt: "你好哇寓所一樓中島廚房與高雄包棟民宿公共交誼空間",
    capacityLabel: "8-26 人・6 房包棟",
    bedroomLabel: "6 間獨立客房（3雙+1四+2六）",
    priceLabel: `平日 NT$${hellohouse.startPrice.toLocaleString("zh-TW")} 起 / 晚`,
    bookingProperty: "你好哇寓所",
    guestGuide: "8-26 人中島大公區",
    description: "一樓設有寬敞中島廚房、高腳吧台與大型交誼客廳；多間套房獨立衛浴，最適合家族聚會、多人聚餐與迎娶活動。",
    pillTags: ["6 間獨立套房衛浴", "1F 大型中島廚房＋交誼廳", "包棟全開絕不鎖房", "手動麻將桌＋迎娶聚餐首選"],
  },
  {
    id: "dual",
    name: "雙館包棟",
    href: "/book",
    splitImages: [
      { src: hellohouse.coverImage, alt: "你好哇寓所公共空間", label: "你好哇寓所" },
      { src: godin.coverImage, alt: "溝頂民宿五層獨棟空間", label: "溝頂民宿" },
    ],
    capacityLabel: "27-36 人・10 房包棟",
    bedroomLabel: "10 間獨立客房（4房+6房合住）",
    priceLabel: "依日期與人數即時報價",
    bookingProperty: "雙館包棟",
    guestGuide: "27-36 人大型團體",
    description: "你好哇與溝頂兩館相鄰、步行僅約 5 秒；合計最多 10 間客房與雙交誼廳，大型團體同聚也能保有私密休息空間。",
    pillTags: ["10 間全套房獨立衛浴", "兩館相鄰步行 5 秒", "雙交誼空間＋中島廚房", "包棟獨享絕不鎖房"],
  },
];

const heroSlides: HeroSlide[] = [
  {
    src: hellohouse.coverImage,
    alt: "你好哇寓所一樓中島廚房與高腳椅吧台公共空間",
    label: "你好哇寓所｜經典中島廚房",
  },
  {
    src: "/images/hellohouse/1000.webp",
    alt: "你好哇寓所一樓完整中島廚房、冰箱與備餐設備",
    label: "你好哇寓所｜多人備餐與長桌交誼",
  },
  {
    src: "/images/hellohouse/1202.webp",
    alt: "你好哇寓所二樓 1202 四人房、雙人床與吊椅",
    label: "你好哇寓所｜質感套房空間",
  },
  {
    src: godin.coverImage,
    alt: "溝頂民宿四樓交誼廳、長桌與聯網電視",
    label: "溝頂民宿｜頂樓專屬交誼廳",
  },
  {
    src: "/images/godin/cover-4.webp",
    alt: "溝頂民宿四樓交誼廳手動麻將桌與多人座位",
    label: "溝頂民宿｜休閒麻將空間",
  },
];

const reviewQuotes = [
  ...hellohouse.reviews.map((review) => ({ ...review, property: hellohouse.name })),
  ...godin.reviews.map((review) => ({ ...review, property: godin.name })),
];

const localExperiences = [
  {
    label: "在地早餐與經典小吃",
    title: "住進鹽埕，從一碗在地早餐開始",
    description: foodGuideSections[0].intro,
    items: foodGuideSections[0].items.slice(0, 3),
    image: "/images/hellohouse/foodie-cover.webp",
    imageAlt: "鹽埕在地美食與 Hello Stay 住宿生活圈",
    href: "/explore/food",
    linkLabel: "探索鹽埕美食指南",
  },
  {
    label: "港區散步與駁二特區",
    title: "沿著港區散步，感受高雄海港微風",
    description: spotGuideSections[0].intro,
    items: spotGuideSections[0].items.slice(0, 3),
    image: "/images/godin/cover-3.webp",
    imageAlt: "鹽埕街區與高雄港周邊景點",
    href: "/explore/spots",
    linkLabel: "查看周邊散步景點",
  },
];

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(dateString: string, days: number) {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

function buildBookingHref(params: {
  property: BookingProperty;
  checkIn: string;
  checkOut: string;
  guestCount: string;
}) {
  const url = new URL(bookingBase);
  if (params.property) url.searchParams.set("property", params.property);
  if (params.checkIn) url.searchParams.set("checkInDate", params.checkIn);
  if (params.checkOut) url.searchParams.set("checkOutDate", params.checkOut);
  if (params.guestCount) url.searchParams.set("guestCount", params.guestCount);
  if (!params.checkIn || !params.checkOut) url.searchParams.set("openCalendar", "1");
  return url.toString();
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="luxury-review__stars" aria-label={`${rating} 顆星`}>
      {Array.from({ length: rating }, (_, index) => (
        <Star key={index} size={14} fill="currentColor" strokeWidth={1.5} aria-hidden="true" />
      ))}
    </span>
  );
}

export default function HomeTemplateExperience() {
  const tomorrow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return formatDate(date);
  }, []);

  const dayAfterTomorrow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return formatDate(date);
  }, []);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [podMode, setPodMode] = useState<"guests" | "rooms">("guests");
  const [guestCount, setGuestCount] = useState("12");
  const [roomCountChoice, setRoomCountChoice] = useState("4");
  const [preferredProperty, setPreferredProperty] = useState<BookingProperty>("");
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const parsedGuestCount = Number(guestCount);
  const guestCountOutsideRange =
    podMode === "guests" &&
    guestCount !== "" &&
    (!Number.isFinite(parsedGuestCount) || parsedGuestCount < 4 || parsedGuestCount > 36);

  const bookingHref = guestCountOutsideRange
    ? lineUrl
    : buildBookingHref({
        property: preferredProperty,
        checkIn,
        checkOut,
        guestCount: podMode === "guests" ? guestCount : String(Number(roomCountChoice) * 3),
      });
  const checkOutMinimum = checkIn ? addDays(checkIn, 1) : dayAfterTomorrow;

  useEffect(() => {
    if (heroSlides.length < 2 || isHeroPaused) return;
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isHeroPaused]);

  const goToHeroSlide = (index: number) => {
    setHeroSlideIndex((index + heroSlides.length) % heroSlides.length);
  };

  const handleCheckInChange = (value: string) => {
    setCheckIn(value);
    if (!value) return;
    if (!checkOut || new Date(checkOut) <= new Date(value)) {
      setCheckOut(addDays(value, 1));
    }
  };

  const incrementGuests = () => {
    const current = Number(guestCount) || 12;
    if (current < 36) setGuestCount(String(current + 1));
  };

  const decrementGuests = () => {
    const current = Number(guestCount) || 12;
    if (current > 4) setGuestCount(String(current - 1));
  };

  const incrementRooms = () => {
    const current = Number(roomCountChoice) || 4;
    if (current < 10) setRoomCountChoice(String(current + 1));
  };

  const decrementRooms = () => {
    const current = Number(roomCountChoice) || 4;
    if (current > 2) setRoomCountChoice(String(current - 1));
  };

  const bookingActionLabel = guestCountOutsideRange
    ? "LINE 專人安排其他需求"
    : preferredProperty
      ? `查詢 ${preferredProperty} 空房與報價`
      : "查詢即時空房與報價";

  return (
    <div className="luxury-home-v2">
      {/* ═══ 1. HERO 視覺 ＆ 快速預訂查詢艙 ═══ */}
      <section className="mockup-hero" aria-labelledby="home-hero-title">
        <div className="mockup-hero__media">
          <div
            className="mockup-hero__carousel"
            role="region"
            aria-roledescription="輪播"
            aria-label="Hello Stay 精品住宿空間實景"
          >
            {heroSlides.map((slide, index) => (
              <div
                className={`mockup-hero__slide${index === heroSlideIndex ? " is-active" : ""}`}
                aria-hidden={index !== heroSlideIndex}
                key={`${slide.src}-${slide.label}`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  loading="eager"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
          <div className="mockup-hero__overlay" aria-hidden="true" />

          <div className="mockup-hero__caption" aria-hidden="true">
            {heroSlides[heroSlideIndex]?.label}
          </div>

          <div className="mockup-hero__controls" aria-label="Hero 圖片控制">
            <button type="button" onClick={() => goToHeroSlide(heroSlideIndex - 1)} aria-label="上一張圖片">
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
            <span>
              {String(heroSlideIndex + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => goToHeroSlide(heroSlideIndex + 1)} aria-label="下一張圖片">
              <ChevronRight size={16} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => setIsHeroPaused((current) => !current)}
              aria-label={isHeroPaused ? "繼續自動播放" : "暫停自動播放"}
              aria-pressed={isHeroPaused}
            >
              {isHeroPaused ? <Play size={14} strokeWidth={2} /> : <Pause size={14} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Floating Centered Booking Pod */}
        <div className="mockup-hero__container">
          <div className="mockup-hero__intro">
            <h1 id="home-hero-title">住進一整棟的高雄質感假期</h1>
            <p className="mockup-hero__sub">
              高雄鹽埕 4-36 人包棟住宿・專屬私享空間・官方直訂免手續費
            </p>
          </div>

          <div className="mockup-pod" role="search" aria-label="快速預訂查詢艙">
            {/* Pod Mode Tabs: By Guests vs By Bedrooms */}
            <div className="mockup-pod__tabs" role="tablist" aria-label="切換查詢方式">
              <button
                type="button"
                role="tab"
                aria-selected={podMode === "guests"}
                className={`mockup-pod__tab${podMode === "guests" ? " is-active" : ""}`}
                onClick={() => setPodMode("guests")}
              >
                <Users size={14} aria-hidden="true" />
                <span>依人數找房（4-36 人）</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={podMode === "rooms"}
                className={`mockup-pod__tab${podMode === "rooms" ? " is-active" : ""}`}
                onClick={() => setPodMode("rooms")}
              >
                <House size={14} aria-hidden="true" />
                <span>依房間數找房（2-10 房）</span>
              </button>
            </div>

            {/* 4 等高欄位 Grid */}
            <div className="mockup-pod__grid">
              {/* Col 1: Check-in */}
              <div className="mockup-pod__col">
                <label htmlFor="pod-checkin" className="mockup-pod__col-head">
                  <CalendarDays size={14} aria-hidden="true" />
                  <strong>入住日期</strong>
                </label>
                <div className="mockup-pod__col-body">
                  <input
                    id="pod-checkin"
                    type="date"
                    value={checkIn}
                    min={tomorrow}
                    onChange={(e) => handleCheckInChange(e.target.value)}
                  />
                </div>
              </div>

              {/* Col 2: Check-out */}
              <div className="mockup-pod__col">
                <label htmlFor="pod-checkout" className="mockup-pod__col-head">
                  <CalendarDays size={14} aria-hidden="true" />
                  <strong>退房日期</strong>
                </label>
                <div className="mockup-pod__col-body">
                  <input
                    id="pod-checkout"
                    type="date"
                    value={checkOut}
                    min={checkOutMinimum}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              {/* Col 3: Guests or Rooms */}
              {podMode === "guests" ? (
                <div className="mockup-pod__col">
                  <div className="mockup-pod__col-head">
                    <span className="mockup-pod__label-group">
                      <Users size={14} aria-hidden="true" />
                      <strong>入住人數</strong>
                    </span>
                    <span className="mockup-pod__tag">4-36 人</span>
                  </div>
                  <div className="mockup-pod__counter">
                    <button
                      type="button"
                      onClick={decrementGuests}
                      aria-label="減少人數"
                      disabled={Number(guestCount) <= 4}
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="number"
                      min="4"
                      max="36"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      aria-label="輸入入住人數"
                    />
                    <span className="mockup-pod__counter-unit">位旅客</span>
                    <button
                      type="button"
                      onClick={incrementGuests}
                      aria-label="增加人數"
                      disabled={Number(guestCount) >= 36}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mockup-pod__col">
                  <div className="mockup-pod__col-head">
                    <span className="mockup-pod__label-group">
                      <House size={14} aria-hidden="true" />
                      <strong>房間需求</strong>
                    </span>
                    <span className="mockup-pod__tag">2-10 房</span>
                  </div>
                  <div className="mockup-pod__counter">
                    <button
                      type="button"
                      onClick={decrementRooms}
                      aria-label="減少房間數"
                      disabled={Number(roomCountChoice) <= 2}
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={roomCountChoice}
                      onChange={(e) => setRoomCountChoice(e.target.value)}
                      aria-label="輸入房間數需求"
                    />
                    <span className="mockup-pod__counter-unit">間客房</span>
                    <button
                      type="button"
                      onClick={incrementRooms}
                      aria-label="增加房間數"
                      disabled={Number(roomCountChoice) >= 10}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Col 4: Preferred Villa */}
              <div className="mockup-pod__col">
                <label htmlFor="pod-villa" className="mockup-pod__col-head">
                  <House size={14} aria-hidden="true" />
                  <strong>偏好館別</strong>
                </label>
                <div className="mockup-pod__col-body">
                  <select
                    id="pod-villa"
                    value={preferredProperty}
                    onChange={(e) => setPreferredProperty(e.target.value as BookingProperty)}
                  >
                    <option value="">
                      {podMode === "guests"
                        ? "依人數智慧推薦方案"
                        : "依房數智慧推薦方案"}
                    </option>
                    <option value="溝頂民宿">溝頂民宿（4 房・4-12 人整棟）</option>
                    <option value="你好哇寓所">你好哇寓所（6 房・8-26 人中島）</option>
                    <option value="雙館包棟">雙館包棟（10 房・27-36 人合住）</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bottom CTA Row */}
            <div className="mockup-pod__cta">
              <p className="mockup-pod__hint" aria-live="polite">
                {guestCountOutsideRange
                  ? "目前線上方案支援 4-36 人，其他需求請透過 LINE 諮詢專人"
                  : preferredProperty
                    ? `已為您指定：${preferredProperty}，直接連線官方訂房系統查即時空房`
                    : "輸入日期與需求，一鍵前往官方訂房系統查看空房與即時報價"}
              </p>
              <Link
                href={bookingHref}
                target={guestCountOutsideRange ? "_blank" : undefined}
                rel={guestCountOutsideRange ? "noopener noreferrer" : undefined}
                className="mockup-pod__btn"
              >
                <span>{bookingActionLabel}</span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. 四大核心承諾（信任背書） ═══ */}
      <section className="mockup-trust" aria-label="Hello Stay 核心承諾">
        <div className="mockup-container mockup-trust__grid">
          <div className="mockup-trust__card">
            <ShieldCheck size={26} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <strong>官方直訂免手續費</strong>
              <span>保證最優價格，即時日曆連線與透明報價</span>
            </div>
          </div>
          <div className="mockup-trust__card">
            <House size={26} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <strong>合法登記民宿</strong>
              <span>你好哇 131 號・溝頂 163 號・安全合規</span>
            </div>
          </div>
          <div className="mockup-trust__card">
            <TrainFront size={26} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <strong>近捷運與駁二特區</strong>
              <span>鹽埕埔站步行 5 分鐘・駁二特區 10 分鐘</span>
            </div>
          </div>
          <div className="mockup-trust__card">
            <KeyRound size={26} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <strong>密碼鎖自助入住</strong>
              <span>16:00 入住・11:00 退房・彈性無拘束</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. 精選包棟住宿方案（三大空間一次講清楚） ═══ */}
      <section className="mockup-villas" id="stay-options" aria-labelledby="stay-options-title">
        <div className="mockup-container">
          <div className="mockup-villas__head">
            <h2 id="stay-options-title">精選包棟住宿方案</h2>
            <p>專為家庭、親友聚會與大型團體打造的獨立整棟空間，依人數需求挑選最適合的房型。</p>
          </div>

          {/* 3 Large Boutique Cards */}
          <div className="mockup-cards">
            {stays.map((stay) => {
              const isFav = favorites[stay.id] || false;
              const bookingHrefForStay =
                stay.bookingProperty && stay.id !== "dual"
                  ? buildBookingHref({ property: stay.bookingProperty, checkIn, checkOut, guestCount })
                  : stay.id === "dual"
                    ? buildBookingHref({ property: "雙館包棟", checkIn, checkOut, guestCount })
                    : stay.href;

              return (
                <article className="mockup-card" key={stay.id}>
                  <div className="mockup-card__media-wrap">
                    <Link href={stay.href} className="mockup-card__media" aria-label={`查看 ${stay.name} 詳細介紹`}>
                      {stay.splitImages ? (
                        <div className="mockup-card__split">
                          {stay.splitImages.map((image) => (
                            <div className="mockup-card__split-pane" key={image.label}>
                              <Image src={image.src} alt={image.alt} fill loading="lazy" sizes="(max-width: 900px) 100vw, 50vw" />
                              <span>{image.label}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Image src={stay.image!} alt={stay.imageAlt!} fill loading="lazy" sizes="(max-width: 900px) 100vw, 50vw" />
                      )}
                    </Link>
                    <div className="mockup-card__badges-corner">
                      <span className="mockup-card__badge-capacity">
                        <Users size={13} aria-hidden="true" />
                        {stay.capacityLabel}
                      </span>
                      <span className="mockup-card__badge-rooms">
                        <House size={13} aria-hidden="true" />
                        {stay.bedroomLabel}
                      </span>
                    </div>
                    <button
                      type="button"
                      className={`mockup-card__favorite${isFav ? " is-active" : ""}`}
                      onClick={() => toggleFavorite(stay.id)}
                      aria-label={`收藏 ${stay.name}`}
                    >
                      <Heart size={16} fill={isFav ? "#b38547" : "none"} strokeWidth={1.8} />
                    </button>
                  </div>

                  <div className="mockup-card__body">
                    <div className="mockup-card__main">
                      <div className="mockup-card__title-row">
                        <h3>{stay.name}</h3>
                        <div className="mockup-card__guides">
                          <span className="mockup-card__fit">{stay.guestGuide}</span>
                        </div>
                      </div>

                      <p className="mockup-card__desc">{stay.description}</p>

                      <div className="mockup-card__tags">
                        {stay.pillTags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="mockup-card__footer">
                      <div className="mockup-card__pricing">
                        <span className="mockup-card__pricing-label">參考起價</span>
                        <div className="mockup-card__pricing-val">
                          <strong>{stay.priceLabel}</strong>
                        </div>
                      </div>

                      <div className="mockup-card__actions">
                        <Link href={stay.href} className="mockup-btn mockup-btn--outline">
                          查看房型細節
                        </Link>
                        <Link href={bookingHrefForStay} className="mockup-btn mockup-btn--gold">
                          查詢這館空房
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Comparison Page Link Banner */}
          <div className="mockup-comparison-banner">
            <p>需要比較各館客房格局、衛浴數量、廚房設備與即時房價等完整細節？</p>
            <Link className="mockup-link" href="/compare">
              查看三館完整規格比對頁面 <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 4. 真實旅客入住回饋 ═══ */}
      <section className="mockup-reviews" aria-labelledby="reviews-title">
        <div className="mockup-container">
          <div className="mockup-villas__head mockup-villas__head--split">
            <div>
              <h2 id="reviews-title">真實旅客入住回饋</h2>
            </div>
            <div className="mockup-rating-summary">
              <strong className="mockup-rating-summary__score">4.9</strong>
              <div className="mockup-rating-summary__details">
                <Stars rating={5} />
                <span>Google 評價 150+ 則滿意推薦</span>
              </div>
            </div>
          </div>

          <div className="mockup-reviews__grid">
            {reviewQuotes.slice(0, 4).map((review, index) => (
              <article className="mockup-review-card" key={`${review.property}-${review.author}-${index}`}>
                <div className="mockup-review-card__top">
                  <Stars rating={review.rating} />
                  <span className="mockup-review-card__stay">{review.property}</span>
                </div>
                <blockquote>「{review.text}」</blockquote>
                <cite>— {review.author}</cite>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. 鹽埕在地生活指南 ═══ */}
      <section className="mockup-local" id="local-explore" aria-labelledby="local-title">
        <div className="mockup-container">
          <div className="mockup-villas__head mockup-villas__head--split">
            <div>
              <h2 id="local-title">住在鹽埕，漫步港灣與老街</h2>
            </div>
            <p>出門就是鹽埕道地小吃、咖啡香氣與駁二文創園區，用最舒服的節奏感受高雄生活。</p>
          </div>

          <div className="mockup-local__grid">
            {localExperiences.map((experience) => (
              <article className="mockup-local-card" key={experience.title}>
                <div className="mockup-local-card__img">
                  <Image src={experience.image} alt={experience.imageAlt} fill loading="lazy" sizes="(max-width: 820px) 100vw, 50vw" />
                </div>
                <div className="mockup-local-card__content">
                  <p className="mockup-local-card__tag">{experience.label}</p>
                  <h3>{experience.title}</h3>
                  <p>{experience.description}</p>
                  <ul>
                    {experience.items.map((item) => (
                      <li key={item.name}>
                        <span>{item.name}</span>
                        <small>{item.meta}</small>
                      </li>
                    ))}
                  </ul>
                  <Link className="mockup-link" href={experience.href}>
                    {experience.linkLabel} <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. 預訂前常見問題 ═══ */}
      <section className="mockup-faq" id="home-faq" aria-labelledby="home-faq-title">
        <div className="mockup-container mockup-faq__layout">
          <div className="mockup-villas__head">
            <h2 id="home-faq-title">預訂前常見問題</h2>
            <p>訂房流程、開伙設備、打麻將與周邊停車等疑問，都在這裡為您即時解答。</p>
            <div className="mockup-faq__links">
              <Link className="mockup-link" href="/agreement">
                入住與退款守則 <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <Link className="mockup-link" href="/traffic">
                交通與周邊停車 <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="mockup-faq__list">
            {homepageFaqItems.map((item) => (
              <details className="mockup-faq__item" key={item.question}>
                <summary>
                  <span>{item.question}</span>
                  <span className="mockup-faq__icon" aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
            <p className="mockup-faq__date">最後核對日期：{homepageLastReviewed}</p>
          </div>
        </div>
      </section>

      {/* ═══ 7. 底端行動呼籲 ═══ */}
      <section className="mockup-final" aria-labelledby="home-final-title">
        <div className="mockup-container mockup-final__inner">
          <div>
            <h2 id="home-final-title">準備好開啟你的鹽埕包棟假期了嗎？</h2>
            <p>透過官方直訂系統查詢即時空房與透明報價，或透過 LINE 專人諮詢。</p>
          </div>
          <div className="mockup-final__actions">
            <Link
              className="mockup-btn mockup-btn--gold-solid"
              href={bookingHref}
              target={guestCountOutsideRange ? "_blank" : undefined}
              rel={guestCountOutsideRange ? "noopener noreferrer" : undefined}
            >
              {bookingActionLabel} <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              className="mockup-btn mockup-btn--line"
              href="https://lin.ee/atCiMQw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare size={16} aria-hidden="true" />
              LINE 官方客服專人諮詢
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 8. 行動端浮動列 ═══ */}
      <div className="mockup-mobile-bar" aria-label="行動端快速預訂操作列">
        <Link href="#home-hero-title" className="mockup-mobile-bar__btn mockup-mobile-bar__btn--dates">
          <CalendarDays size={16} aria-hidden="true" />
          <span>選擇日期查空房</span>
        </Link>
        <a
          href="https://lin.ee/atCiMQw"
          target="_blank"
          rel="noopener noreferrer"
          className="mockup-mobile-bar__btn mockup-mobile-bar__btn--booking"
        >
          <MessageSquare size={16} aria-hidden="true" />
          <span>LINE 專人諮詢</span>
        </a>
      </div>
    </div>
  );
}
