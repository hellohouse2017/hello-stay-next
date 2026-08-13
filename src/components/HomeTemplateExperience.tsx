"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bath,
  BedDouble,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CookingPot,
  House,
  KeyRound,
  MapPin,
  Pause,
  Play,
  ShieldCheck,
  Star,
  TrainFront,
  Users,
} from "lucide-react";
import { godin, hellohouse } from "@/data/properties";
import { homepageFaqItems, homepageLastReviewed } from "@/data/homepage-faq";
import { publicStayFacts } from "@/data/public-stay-facts";
import { foodGuideSections, spotGuideSections } from "@/data/local-guides";

type BookingProperty = "" | "你好哇寓所" | "溝頂民宿" | "雙館包棟";

type StayOption = {
  id: "hellohouse" | "godin" | "dual";
  name: string;
  nameEn: string;
  href: string;
  image?: string;
  imageAlt?: string;
  splitImages?: { src: string; alt: string; label: string }[];
  capacity: string;
  roomCount: string;
  bathroomCount: string;
  kitchen: string;
  commonSpace: string;
  price: string;
  bookingProperty?: BookingProperty;
  guestGuide: string;
  description: string;
  facts: string[];
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
    id: "hellohouse",
    name: hellohouse.name,
    nameEn: hellohouse.nameEn,
    href: "/hellohouse",
    image: hellohouse.coverImage,
    imageAlt: "你好哇寓所一樓中島廚房與高雄包棟民宿公共交誼空間",
    capacity: `${hellohouse.capacity.min}-${hellohouse.capacity.max} 人`,
    roomCount: `${publicStayFacts.hellohouse.bedrooms} 間客房`,
    bathroomCount: "客房皆有獨立衛浴",
    kitchen: "中島廚房",
    commonSpace: "大型交誼空間",
    price: `平日起 NT$${hellohouse.startPrice.toLocaleString("zh-TW")} 起`,
    bookingProperty: "你好哇寓所",
    guestGuide: "13-26 人優先",
    description: hellohouse.description,
    facts: ["中島廚房", "麻將桌", "電子密碼鎖"],
  },
  {
    id: "godin",
    name: godin.name,
    nameEn: godin.nameEn,
    href: "/godin",
    image: godin.coverImage,
    imageAlt: "溝頂民宿四樓交誼廳與高雄鹽埕小團體包棟空間",
    capacity: `${godin.capacity.min}-${godin.capacity.max} 人`,
    roomCount: `${publicStayFacts.godin.bedrooms} 間客房`,
    bathroomCount: "客房皆有獨立衛浴",
    kitchen: "簡易備餐空間",
    commonSpace: "4F 交誼廳",
    price: `平日起 NT$${godin.startPrice.toLocaleString("zh-TW")} 起`,
    bookingProperty: "溝頂民宿",
    guestGuide: "4-12 人優先",
    description: godin.description,
    facts: ["五層獨棟", "麻將桌", "分層休息"],
  },
  {
    id: "dual",
    name: "雙館包棟",
    nameEn: "Dual Stay",
    href: "/book",
    splitImages: [
      { src: hellohouse.coverImage, alt: "你好哇寓所公共空間", label: "你好哇寓所" },
      { src: godin.coverImage, alt: "溝頂民宿五層獨棟空間", label: "溝頂民宿" },
    ],
    capacity: `${publicStayFacts.dual.standardCapacity.min}-${publicStayFacts.dual.standardCapacity.max} 人，最多 36 人`,
    roomCount: `${publicStayFacts.dual.bedrooms} 間客房`,
    bathroomCount: "兩館客房皆有獨立衛浴",
    kitchen: "兩館各自提供備餐空間",
    commonSpace: "兩館公共空間",
    price: "依日期與人數即時報價",
    bookingProperty: "雙館包棟",
    guestGuide: "27-34 人優先",
    description: "兩館相鄰、步行約 5 秒，適合需要更多房間與分層休息的大型團體；35-36 人需加床。",
    facts: ["兩館相鄰", "大型團體", "不拆單"],
  },
];

const heroSlides: HeroSlide[] = [
  {
    src: hellohouse.coverImage,
    alt: "你好哇寓所一樓中島廚房與高腳椅吧台公共空間",
    label: "你好哇寓所｜中島廚房",
  },
  {
    src: "/images/hellohouse/1000.webp",
    alt: "你好哇寓所一樓完整中島廚房、冰箱與備餐設備",
    label: "你好哇寓所｜多人備餐空間",
  },
  {
    src: "/images/hellohouse/1202.webp",
    alt: "你好哇寓所二樓 1202 四人房、雙人床與吊椅",
    label: "你好哇寓所｜四人房",
  },
  {
    src: godin.coverImage,
    alt: "溝頂民宿四樓交誼廳、長桌與聯網電視",
    label: "溝頂民宿｜交誼廳",
  },
  {
    src: "/images/godin/cover-4.webp",
    alt: "溝頂民宿四樓交誼廳手動麻將桌與多人座位",
    label: "溝頂民宿｜麻將空間",
  },
];

const decisionRows = [
  {
    guests: "4-5 人",
    stay: "溝頂民宿",
    setup: "2 房起、小團體整棟",
    reason: "人數少也能保有完整獨立空間，先看溝頂最直接。",
  },
  {
    guests: "8-12 人",
    stay: "兩館都可比較",
    setup: "溝頂偏整棟；你好哇偏大空間",
    reason: "重視預算與分層休息看溝頂；重視中島廚房與聚會空間看你好哇。",
  },
  {
    guests: "13-26 人",
    stay: "你好哇寓所",
    setup: "3-6 房級距",
    reason: "需要多人一起備餐、聚會、打麻將或辦迎娶活動時最合適。",
  },
  {
    guests: "27-34 人",
    stay: "雙館包棟",
    setup: "兩館合住、最多 10 房",
    reason: "兩館步行約 5 秒；35-36 人需加床，可分房休息，也不用拆成兩個地區。",
  },
] as const;

const comparisonRows = [
  { label: "適合人數", values: stays.map((stay) => stay.capacity) },
  { label: "客房數", values: stays.map((stay) => stay.roomCount) },
  { label: "衛浴", values: stays.map((stay) => stay.bathroomCount) },
  { label: "廚房 / 備餐", values: stays.map((stay) => stay.kitchen) },
  { label: "客廳 / 公共空間", values: stays.map((stay) => stay.commonSpace) },
  { label: "麻將桌", values: [publicStayFacts.hellohouse.mahjong, publicStayFacts.godin.mahjong, "兩館皆有"] },
  { label: "電梯", values: [publicStayFacts.hellohouse.elevator ? "有" : "無", publicStayFacts.godin.elevator ? "有" : "無", "兩館皆無"] },
  { label: "起始參考", values: [stays[0].price, stays[1].price, stays[2].price] },
] as const;

const reviewQuotes = [
  ...hellohouse.reviews.map((review) => ({ ...review, property: hellohouse.name })),
  ...godin.reviews.map((review) => ({ ...review, property: godin.name })),
];

const localExperiences = [
  {
    label: "FOOD & DAILY LIFE",
    title: "住進鹽埕，從一碗早餐開始",
    description: foodGuideSections[0].intro,
    items: foodGuideSections[0].items.slice(0, 3),
    image: "/images/hellohouse/foodie-cover.webp",
    imageAlt: "鹽埕在地美食與 Hello Stay 住宿生活圈",
    href: "/explore/food",
    linkLabel: "探索鹽埕美食",
  },
  {
    label: "ARTS & WATERFRONT",
    title: "沿著港區散步，慢慢認識高雄",
    description: spotGuideSections[0].intro,
    items: spotGuideSections[0].items.slice(0, 3),
    image: "/images/godin/cover-3.webp",
    imageAlt: "鹽埕街區與高雄港周邊景點",
    href: "/explore/spots",
    linkLabel: "查看周邊景點",
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

function suggestProperty(guestCount: string): BookingProperty {
  const guests = Number(guestCount);
  if (!Number.isFinite(guests) || guests < 4 || guests > 36) return "";
  if (guests <= 7) return "溝頂民宿";
  if (guests <= 12) return "";
  if (guests <= 26) return "你好哇寓所";
  return "雙館包棟";
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
  const [guestCount, setGuestCount] = useState("");
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  const selectedProperty = suggestProperty(guestCount);
  const parsedGuestCount = Number(guestCount);
  const guestCountOutsideRange =
    guestCount !== "" && (!Number.isFinite(parsedGuestCount) || parsedGuestCount < 4 || parsedGuestCount > 36);
  const bookingHref = guestCountOutsideRange
    ? lineUrl
    : buildBookingHref({ property: selectedProperty, checkIn, checkOut, guestCount });
  const checkOutMinimum = checkIn ? addDays(checkIn, 1) : dayAfterTomorrow;

  useEffect(() => {
    if (heroSlides.length < 2 || isHeroPaused) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setHeroSlideIndex((current) => (current + 1) % heroSlides.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, [isHeroPaused]);

  const goToHeroSlide = (nextIndex: number, pause = true) => {
    const total = heroSlides.length;
    setHeroSlideIndex(((nextIndex % total) + total) % total);
    if (pause) setIsHeroPaused(true);
  };

  const handleCheckInChange = (value: string) => {
    setCheckIn(value);
    if (value && checkOut && checkOut <= value) setCheckOut("");
  };

  const bookingActionLabel = guestCountOutsideRange
    ? "LINE 詢問其他人數"
    : selectedProperty
      ? `查看${selectedProperty}空房`
      : "查看空房與報價";

  return (
    <div className="luxury-home">
      <section className="luxury-hero" aria-labelledby="home-hero-title">
        <div className="luxury-hero__media">
          <div
            className="luxury-hero__carousel"
            role="region"
            aria-roledescription="輪播"
            aria-label="Hello Stay 住宿空間照片"
          >
            {heroSlides.map((slide, index) => (
              <div
                className={`luxury-hero__slide${index === heroSlideIndex ? " is-active" : ""}`}
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
          <div className="luxury-hero__shade" aria-hidden="true" />
          <div className="luxury-hero__wash" aria-hidden="true" />
          <div className="luxury-hero__caption" aria-hidden="true">
            {heroSlides[heroSlideIndex]?.label}
          </div>
          <div className="luxury-hero__controls" aria-label="Hero 圖片控制">
            <button type="button" onClick={() => goToHeroSlide(heroSlideIndex - 1)} aria-label="上一張圖片">
              <ChevronLeft size={18} strokeWidth={1.8} />
            </button>
            <span>
              {String(heroSlideIndex + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => goToHeroSlide(heroSlideIndex + 1)} aria-label="下一張圖片">
              <ChevronRight size={18} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={() => setIsHeroPaused((current) => !current)}
              aria-label={isHeroPaused ? "繼續自動播放" : "暫停自動播放"}
              aria-pressed={isHeroPaused}
            >
              {isHeroPaused ? <Play size={15} strokeWidth={1.8} /> : <Pause size={15} strokeWidth={1.8} />}
            </button>
          </div>
          <div className="luxury-hero__dots" aria-label="Hero 圖片分頁">
            {heroSlides.map((slide, index) => (
              <button
                key={`${slide.label}-${index}`}
                type="button"
                className={index === heroSlideIndex ? "is-active" : ""}
                onClick={() => goToHeroSlide(index)}
                aria-label={`切換到第 ${index + 1} 張：${slide.label}`}
                aria-pressed={index === heroSlideIndex}
              />
            ))}
          </div>
        </div>

        <div className="luxury-container luxury-hero__inner">
          <div className="luxury-hero__copy">
            <p className="luxury-kicker">HELLO STAY · KAOHSIUNG</p>
            <h1 id="home-hero-title">在鹽埕，住進一整棟的質感假期</h1>
            <p className="luxury-hero__lead">
              三種包棟選擇，從 4 人小團體到 36 人雙館入住。<br />
              讓每一次相聚，都有舒服而完整的空間。
            </p>
            <div className="luxury-hero__meta">
              <span><MapPin size={15} aria-hidden="true" /> 高雄鹽埕生活圈</span>
              <span>近捷運鹽埕埔站與駁二藝術特區</span>
            </div>
          </div>
        </div>

        <div className="luxury-container luxury-booking-anchor">
          <div className="luxury-booking" aria-label="快速查詢空房與報價">
            <div className="luxury-booking__fields">
              <label>
                <span><CalendarDays size={16} aria-hidden="true" /> 入住</span>
                <input
                  type="date"
                  value={checkIn}
                  min={tomorrow}
                  onChange={(event) => handleCheckInChange(event.target.value)}
                  onInput={(event) => handleCheckInChange(event.currentTarget.value)}
                />
              </label>
              <label>
                <span><CalendarDays size={16} aria-hidden="true" /> 退房</span>
                <input
                  type="date"
                  value={checkOut}
                  min={checkOutMinimum}
                  onChange={(event) => setCheckOut(event.target.value)}
                  onInput={(event) => setCheckOut(event.currentTarget.value)}
                />
              </label>
              <label>
                <span><Users size={16} aria-hidden="true" /> 人數</span>
                <input
                  inputMode="numeric"
                  min="4"
                  max="36"
                  placeholder="例：12"
                  type="number"
                  value={guestCount}
                  onChange={(event) => setGuestCount(event.target.value)}
                />
              </label>
            </div>
            <div className="luxury-booking__action">
              <p aria-live="polite">
                {guestCountOutsideRange
                  ? "目前線上方案支援 4-36 人，其他人數請先用 LINE 確認"
                  : selectedProperty
                    ? `依人數優先推薦：${selectedProperty}`
                    : "輸入日期與實際需要床位的人數，前往官方訂房站查詢"
                }
              </p>
              <Link
                className="luxury-button luxury-button--dark"
                href={bookingHref}
                target={guestCountOutsideRange ? "_blank" : undefined}
                rel={guestCountOutsideRange ? "noopener noreferrer" : undefined}
              >
                {bookingActionLabel} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="luxury-trust" aria-label="Hello Stay 核心承諾">
        <div className="luxury-container luxury-trust__grid">
          <div className="luxury-trust__item">
            <ShieldCheck size={24} strokeWidth={1.3} aria-hidden="true" />
            <div><strong>官方直訂最佳優惠</strong><span>免平台手續費，報價以訂房站即時結果為準</span></div>
          </div>
          <div className="luxury-trust__item">
            <House size={24} strokeWidth={1.3} aria-hidden="true" />
            <div><strong>合法民宿・安心入住</strong><span>你好哇 131-1 號，溝頂 163 號</span></div>
          </div>
          <div className="luxury-trust__item">
            <TrainFront size={24} strokeWidth={1.3} aria-hidden="true" />
            <div><strong>近捷運與鹽埕景點</strong><span>鹽埕埔站約 5 分鐘，駁二約 10 分鐘</span></div>
          </div>
          <div className="luxury-trust__item">
            <KeyRound size={24} strokeWidth={1.3} aria-hidden="true" />
            <div><strong>自助入住・彈性便利</strong><span>16:00 入住，11:00 退房</span></div>
          </div>
        </div>
      </section>

      <section className="luxury-section luxury-stays" id="stay-options" aria-labelledby="stay-options-title">
        <div className="luxury-container">
          <div className="luxury-section__heading luxury-section__heading--split">
            <div>
              <p className="luxury-kicker">STAY YOUR WAY</p>
              <h2 id="stay-options-title">依人數選住宿</h2>
            </div>
            <p>先找到適合團體規模的空間，再比較房型、公共區域與入住節奏。</p>
          </div>

          <div className="luxury-stays__grid">
            {stays.map((stay) => {
              const bookingHrefForStay =
                stay.bookingProperty && stay.id !== "dual"
                  ? buildBookingHref({ property: stay.bookingProperty, checkIn, checkOut, guestCount })
                  : stay.id === "dual"
                    ? buildBookingHref({ property: "雙館包棟", checkIn, checkOut, guestCount })
                    : stay.href;

              return (
                <article className="luxury-stay" key={stay.id}>
                  <Link href={stay.href} className="luxury-stay__media" aria-label={`查看 ${stay.name} 詳細介紹`}>
                    {stay.splitImages ? (
                      <div className="luxury-stay__split">
                        {stay.splitImages.map((image) => (
                          <div className="luxury-stay__split-pane" key={image.label}>
                            <Image src={image.src} alt={image.alt} fill loading="lazy" sizes="(max-width: 820px) 100vw, 25vw" />
                            <span>{image.label}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Image src={stay.image!} alt={stay.imageAlt!} fill loading="lazy" sizes="(max-width: 820px) 100vw, 33vw" />
                    )}
                    <span className="luxury-stay__capacity">{stay.capacity}</span>
                  </Link>
                  <div className="luxury-stay__body">
                    <div className="luxury-stay__title-row">
                      <div>
                        <p className="luxury-stay__eyebrow">{stay.nameEn}</p>
                        <h3>{stay.name}</h3>
                      </div>
                      <p className="luxury-stay__fit">{stay.guestGuide}</p>
                    </div>
                    <p className="luxury-stay__description">{stay.description}</p>
                    <dl className="luxury-stay__facts">
                      <div><dt><BedDouble size={15} aria-hidden="true" /> 房間</dt><dd>{stay.roomCount}</dd></div>
                      <div><dt><Bath size={15} aria-hidden="true" /> 衛浴</dt><dd>{stay.bathroomCount}</dd></div>
                      <div><dt><CookingPot size={15} aria-hidden="true" /> 設備</dt><dd>{stay.kitchen}</dd></div>
                      <div><dt><House size={15} aria-hidden="true" /> 空間</dt><dd>{stay.commonSpace}</dd></div>
                    </dl>
                    <div className="luxury-stay__foot">
                      <div>
                        <span className="luxury-stay__price-label">價格參考</span>
                        <strong>{stay.price}</strong>
                      </div>
                      <div className="luxury-stay__tags">
                        {stay.facts.map((fact) => <span key={fact}>{fact}</span>)}
                      </div>
                    </div>
                    <div className="luxury-stay__actions">
                      <Link href={stay.href} className="luxury-text-link">看房型與設備 <ArrowUpRight size={15} aria-hidden="true" /></Link>
                      <Link href={bookingHrefForStay} className="luxury-button luxury-button--outline">查這館空房 <ArrowRight size={15} aria-hidden="true" /></Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="luxury-section luxury-decision" aria-labelledby="decision-title">
        <div className="luxury-container">
          <div className="luxury-section__heading">
            <p className="luxury-kicker">A QUICK DECISION</p>
            <h2 id="decision-title">先用人數縮小選擇，再看空間需求</h2>
            <p>不用在所有房型裡迷路，先從團體規模找到最值得比較的方案。</p>
          </div>
          <div className="luxury-decision__list">
            {decisionRows.map((row) => (
              <div className="luxury-decision__row" key={row.guests}>
                <strong>{row.guests}</strong>
                <span>{row.stay}</span>
                <span>{row.setup}</span>
                <p>{row.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="luxury-section luxury-comparison" id="comparison" aria-labelledby="comparison-title">
        <div className="luxury-container">
          <div className="luxury-section__heading luxury-section__heading--split">
            <div>
              <p className="luxury-kicker">COMPARE THE SPACE</p>
              <h2 id="comparison-title">選對空間，旅程更完美</h2>
            </div>
            <p>把人數、房間、衛浴和公共空間放在同一張表裡，快速找到適合你們的館別。</p>
          </div>
          <div className="luxury-comparison__scroll">
            <table>
              <caption>Hello Stay 三種住宿方案比較</caption>
              <thead>
                <tr>
                  <th scope="col">比較項目</th>
                  {stays.map((stay) => <th scope="col" key={stay.id}>{stay.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((value, index) => <td key={`${row.label}-${index}`}>{value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="luxury-comparison__note">
            <span>* 雙館 35-36 人需加床；實際可訂房型與價格以官方訂房站即時結果為準。</span>
            <Link className="luxury-text-link" href="/compare">查看完整住宿比較 <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="luxury-section luxury-reviews" aria-labelledby="reviews-title">
        <div className="luxury-container">
          <div className="luxury-section__heading luxury-section__heading--split">
            <div>
              <p className="luxury-kicker">GUEST NOTES</p>
              <h2 id="reviews-title">旅客住過，才知道空間好不好用</h2>
            </div>
            <div className="luxury-review-summary">
              <strong>{hellohouse.rating?.value ?? "-"}<small> / 5</small></strong>
              <span><Stars rating={5} /> 主館 Google 評價 {hellohouse.rating?.count ?? ""} 則</span>
              <Link href="/reviews">閱讀更多入住回饋 <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="luxury-reviews__grid">
            {reviewQuotes.map((review, index) => (
              <article className="luxury-review" key={`${review.property}-${review.author}-${index}`}>
                <div className="luxury-review__top"><Stars rating={review.rating} /><span>{review.property}</span></div>
                <blockquote>「{review.text}」</blockquote>
                <cite>{review.author}</cite>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="luxury-section luxury-local" id="local-explore" aria-labelledby="local-title">
        <div className="luxury-container">
          <div className="luxury-section__heading luxury-section__heading--split">
            <div>
              <p className="luxury-kicker">YANCHENG LOCAL GUIDE</p>
              <h2 id="local-title">住在鹽埕，還可以玩什麼？</h2>
            </div>
            <p>從住宿出發，步行去吃一間老店、逛駁二，再沿著港區把高雄慢慢走一遍。</p>
          </div>
          <div className="luxury-local__grid">
            {localExperiences.map((experience) => (
              <article className="luxury-local-story" key={experience.title}>
                <div className="luxury-local-story__media">
                  <Image src={experience.image} alt={experience.imageAlt} fill loading="lazy" sizes="(max-width: 820px) 100vw, 50vw" />
                </div>
                <div className="luxury-local-story__body">
                  <p className="luxury-kicker">{experience.label}</p>
                  <h3>{experience.title}</h3>
                  <p>{experience.description}</p>
                  <ul>
                    {experience.items.map((item) => <li key={item.name}><span>{item.name}</span><small>{item.meta}</small></li>)}
                  </ul>
                  <Link className="luxury-text-link" href={experience.href}>{experience.linkLabel} <ArrowUpRight size={15} aria-hidden="true" /></Link>
                </div>
              </article>
            ))}
          </div>
          <div className="luxury-local__footer">
            <span><MapPin size={16} aria-hidden="true" /> 駁二步行約 10 分鐘・鹽埕埔站步行約 5 分鐘</span>
            <Link className="luxury-button luxury-button--outline" href="/explore">查看完整鹽埕指南 <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="luxury-section luxury-faq" id="home-faq" aria-labelledby="home-faq-title">
        <div className="luxury-container luxury-faq__layout">
          <div className="luxury-section__heading">
            <p className="luxury-kicker">BEFORE YOU BOOK</p>
            <h2 id="home-faq-title">預訂前，先把疑問釐清</h2>
            <p>房型、設備、交通與報價方式，都整理在這裡。</p>
            <div className="luxury-faq__links">
              <Link className="luxury-text-link" href="/agreement">入住與取消規則 <ArrowUpRight size={15} aria-hidden="true" /></Link>
              <Link className="luxury-text-link" href="/traffic">交通與停車 <ArrowUpRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="luxury-faq__list">
            {homepageFaqItems.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span aria-hidden="true" /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
            <p className="luxury-faq__updated">資料核對：{homepageLastReviewed}</p>
          </div>
        </div>
      </section>

      <section className="luxury-final" aria-labelledby="home-final-title">
        <div className="luxury-container luxury-final__inner">
          <div>
            <p className="luxury-kicker">YOUR STAY STARTS HERE</p>
            <h2 id="home-final-title">準備好住進你的鹽埕假期了嗎？</h2>
            <p>輸入日期與人數，從官方訂房站查看即時空房、方案與報價。</p>
          </div>
          <div className="luxury-final__actions">
            <Link className="luxury-button luxury-button--light" href={bookingHref} target={guestCountOutsideRange ? "_blank" : undefined} rel={guestCountOutsideRange ? "noopener noreferrer" : undefined}>
              {bookingActionLabel} <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link className="luxury-text-link luxury-text-link--light" href="/compare">先比較住宿方案 <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
