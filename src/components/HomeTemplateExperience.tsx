"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { godin, hellohouse } from "@/data/properties";
import { homepageFaqItems, homepageLastReviewed } from "@/data/homepage-faq";

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
  planSummary: string;
  location: string;
  bookingProperty?: BookingProperty;
  guestGuide: string;
  bestFor: string;
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
    imageAlt: "你好哇寓所中島廚房與高雄包棟民宿公共交誼空間",
    capacity: "8-26 人",
    planSummary: "3-6 房，最多 26 人",
    location: "近駁二、鹽埕埔站",
    bookingProperty: "你好哇寓所",
    guestGuide: "13-26 人優先",
    bestFor: "中島廚房、大公共空間，適合 13 人以上團體",
    facts: ["合法登記", "3-6 房方案", "中島廚房", "8-26 人"],
  },
  {
    id: "godin",
    name: godin.name,
    nameEn: godin.nameEn,
    href: "/godin",
    image: godin.coverImage,
    imageAlt: "溝頂民宿四樓交誼廳與高雄鹽埕小團體包棟空間",
    capacity: "4-12 人",
    planSummary: "2-4 房，最多 12 人",
    location: "鹽埕老街生活圈",
    bookingProperty: "溝頂民宿",
    guestGuide: "4-12 人優先",
    bestFor: "4-12 人小團體，重視整棟獨立與預算",
    facts: ["四房配置", "2-4 房方案", "交誼廳", "麻將桌"],
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
    capacity: "27-34 人，35-36 人需加床",
    planSummary: "兩館合住，合計 10 房",
    location: "兩館相鄰，位於鹽埕",
    bookingProperty: "雙館包棟",
    guestGuide: "27-34 人優先",
    bestFor: "27-34 人團體，或需要超過 6 間房；35-36 人需加床",
    facts: ["雙館入住", "最多 10 房", "大型團體", "不拆單"],
  },
];

const heroSlides: HeroSlide[] = [
  {
    src: hellohouse.coverImage,
    alt: "你好哇寓所一樓中島廚房與高腳椅吧台公共空間",
    label: "你好哇寓所 中島廚房",
  },
  {
    src: "/images/hellohouse/1000.webp",
    alt: "你好哇寓所一樓完整中島廚房、冰箱與備餐設備",
    label: "你好哇寓所 廚房設備",
  },
  {
    src: "/images/hellohouse/1201.webp",
    alt: "你好哇寓所二樓 1201 雙人房與對外窗",
    label: "你好哇寓所 雙人房",
  },
  {
    src: "/images/hellohouse/1202.webp",
    alt: "你好哇寓所二樓 1202 四人房、雙人床與吊椅",
    label: "你好哇寓所 四人房",
  },
  {
    src: godin.coverImage,
    alt: "溝頂民宿四樓交誼廳、長桌與聯網電視",
    label: "溝頂民宿 交誼廳",
  },
  {
    src: "/images/godin/cover-4.webp",
    alt: "溝頂民宿四樓交誼廳手動麻將桌與多人座位",
    label: "溝頂民宿 麻將空間",
  },
  {
    src: "/images/godin/room3.webp",
    alt: "溝頂民宿三樓四人房與兩張雙人床",
    label: "溝頂民宿 四人房",
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
    }, 5200);

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

  return (
    <div className="hs-template">
      <section className="hs-hero" aria-labelledby="home-hero-title">
        <div className="hs-hero__media">
          <div className="hs-hero-carousel" role="region" aria-roledescription="輪播" aria-label="Hello Stay 住宿空間照片">
            {heroSlides.map((slide, index) => (
              <div
                className={`hs-hero-carousel__slide${index === heroSlideIndex ? " is-active" : ""}`}
                aria-hidden={index !== heroSlideIndex}
                key={`${slide.src}-${slide.label}`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 900px) 100vw, 48vw"
                />
              </div>
            ))}
          </div>
          <div className="hs-hero-carousel__shade" aria-hidden="true" />
          <div className="hs-hero-carousel__bar" aria-label="hero slide controls">
            <button type="button" onClick={() => goToHeroSlide(heroSlideIndex - 1)} aria-label="上一張圖片">
              <ChevronLeft size={18} strokeWidth={2.25} />
            </button>
            <span>
              {heroSlideIndex + 1} / {heroSlides.length}
            </span>
            <button type="button" onClick={() => goToHeroSlide(heroSlideIndex + 1)} aria-label="下一張圖片">
              <ChevronRight size={18} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={() => setIsHeroPaused((current) => !current)}
              aria-label={isHeroPaused ? "繼續自動播放" : "暫停自動播放"}
              aria-pressed={isHeroPaused}
            >
              {isHeroPaused ? <Play size={16} strokeWidth={2.25} /> : <Pause size={16} strokeWidth={2.25} />}
            </button>
          </div>
          <div className="hs-hero-carousel__dots" aria-label="hero slide pagination">
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
          <div className="hs-hero-carousel__label" aria-hidden="true">
            {heroSlides[heroSlideIndex]?.label}
          </div>
        </div>

        <div className="hs-hero__content">
          <p className="hs-eyebrow">官方訂房入口</p>
          <h1 id="home-hero-title">Hello Stay<br />高雄鹽埕包棟民宿</h1>
          <p className="hs-hero__lead">
            <span>4-7 人溝頂　8-12 人兩館比較　13-26 人你好哇　27-34 人雙館</span>
            <span>輸入日期與人數　查看方案與空房</span>
          </p>

          <div className="hs-book-panel" aria-label="快速查詢空房與報價">
            <p className="hs-book-panel__prompt">依人數推薦住宿方案</p>
            <div className="hs-book-panel__grid">
              <label>
                <span>入住</span>
                <input type="date" value={checkIn} min={tomorrow} onChange={(event) => handleCheckInChange(event.target.value)} />
              </label>
              <label>
                <span>退房</span>
                <input
                  type="date"
                  value={checkOut}
                  min={checkOutMinimum}
                  onChange={(event) => setCheckOut(event.target.value)}
                />
              </label>
              <label>
                <span>人數</span>
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
            <div className="hs-book-panel__action">
              <p aria-live="polite">
                {guestCountOutsideRange
                  ? "目前線上方案支援 4-36 人，其他人數請先用 LINE 確認"
                  : selectedProperty
                    ? `依人數優先推薦：${selectedProperty}`
                    : "先輸入日期與實際需要床位的人數"}
              </p>
              <div className="hs-book-panel__links">
                <Link
                  href={bookingHref}
                  target={guestCountOutsideRange ? "_blank" : undefined}
                  rel={guestCountOutsideRange ? "noopener noreferrer" : undefined}
                >
                  {guestCountOutsideRange
                    ? "LINE 詢問其他人數"
                    : selectedProperty
                      ? `查看${selectedProperty}空房`
                      : "查空房與報價"}
                </Link>
                <Link href="/compare">先比較住宿方案</Link>
              </div>
            </div>
          </div>

          <div className="hs-flow" aria-label="官方訂房重點">
            <span>官方直訂</span>
            <span>免平台手續費</span>
            <span>即時查詢</span>
            <Link className="hs-flow__link" href={lineUrl} target="_blank" rel="noopener noreferrer">
              LINE 線上客服
            </Link>
          </div>
        </div>
      </section>

      <section className="hs-proof-strip" aria-label="Hello Stay 核心承諾">
        <div>
          <strong>目前可訂</strong>
          <span>兩間合法民宿與雙館方案</span>
        </div>
        <div>
          <strong>合法登記</strong>
          <span>高雄市民宿 131-1 號與 163 號</span>
        </div>
        <div>
          <strong>步行好移動</strong>
          <span>捷運 5 分鐘、駁二 10 分鐘</span>
        </div>
        <div>
          <strong>自助入住</strong>
          <span>入住 16:00、退房 11:00</span>
        </div>
      </section>

      <section className="hs-section hs-decision" aria-labelledby="stay-decision-title">
        <div className="hs-section__head">
          <p className="hs-eyebrow">30 秒快速判斷</p>
          <h2 id="stay-decision-title">先用人數縮小選擇，再看空間需求</h2>
          <p>
            <span>先按人數縮小範圍，再比較廚房、公共空間與房型。</span>
          </p>
        </div>
        <div className="hs-decision-table" role="table" aria-label="Hello Stay 人數與住宿方案比較">
          <div className="hs-decision-table__head" role="row">
            <span role="columnheader">人數</span>
            <span role="columnheader">優先看</span>
            <span role="columnheader">房間與空間</span>
            <span role="columnheader">判斷理由</span>
          </div>
          {decisionRows.map((row) => (
            <div className="hs-decision-row" role="row" key={row.guests}>
              <span className="hs-decision-row__guests" role="cell">{row.guests}</span>
              <strong role="cell">{row.stay}</strong>
              <span role="cell">{row.setup}</span>
              <p role="cell">{row.reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="hs-section hs-stays" id="stay-options" aria-labelledby="stay-compare-title">
        <div className="hs-section__head">
          <p className="hs-eyebrow">入住方案</p>
          <h2 id="stay-compare-title">
            依人數與需求
            <br />
            直接選館
          </h2>
          <p>
            <span>一次比較人數、位置與空間</span>
            <span>確認後直接查空房</span>
          </p>
        </div>

        <div className="hs-stay-grid">
          {stays.map((stay) => {
            const href =
              stay.bookingProperty && stay.id !== "dual"
                ? buildBookingHref({ property: stay.bookingProperty, checkIn, checkOut, guestCount })
                : stay.href;

            return (
              <article className="hs-stay-card" key={stay.id}>
                <Link href={stay.href} className="hs-stay-card__image" aria-label={`查看 ${stay.name} 詳細介紹`}>
                  {stay.splitImages ? (
                    <div className="hs-stay-card__split">
                      {stay.splitImages.map((image) => (
                        <div className="hs-stay-card__split-pane" key={image.label}>
                          <Image src={image.src} alt={image.alt} fill loading="lazy" sizes="(max-width: 900px) 50vw, 16vw" />
                          <em>{image.label}</em>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Image
                      src={stay.image!}
                      alt={stay.imageAlt!}
                      fill
                      loading="lazy"
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
                  )}
                  <span>{stay.capacity}</span>
                </Link>
                <div className="hs-stay-card__body">
                  <div>
                    <p className="hs-stay-card__kicker">{stay.nameEn}</p>
                    <h3>{stay.name}</h3>
                    <p className="hs-stay-card__guide">{stay.guestGuide}</p>
                    <p className="hs-stay-card__fit">{stay.bestFor}</p>
                  </div>
                  <dl className="hs-stay-card__facts">
                    <div>
                      <dt>方案</dt>
                      <dd>{stay.planSummary}</dd>
                    </div>
                    <div>
                      <dt>位置</dt>
                      <dd>{stay.location}</dd>
                    </div>
                  </dl>
                  <div className="hs-chip-row">
                    {stay.facts.map((fact) => (
                      <span key={fact}>{fact}</span>
                    ))}
                  </div>
                  <div className="hs-stay-card__actions">
                    <Link href={stay.href}>{stay.id === "dual" ? "看雙館方案" : "看房型"}</Link>
                    <Link href={href}>{stay.id === "dual" ? "查雙館空房" : "查這館空房"}</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="hs-section hs-faq" id="home-faq" aria-labelledby="home-faq-title">
        <div className="hs-section__head">
          <p className="hs-eyebrow">預訂前常見問題</p>
          <h2 id="home-faq-title">把最容易卡住的問題先回答清楚</h2>
          <p>
            <span>先看常見問題，再查即時空房與價格。</span>
          </p>
        </div>
        <div className="hs-faq__list">
          {homepageFaqItems.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="hs-faq__source">
          <span>資料核對：{homepageLastReviewed}</span>
          <Link href="/agreement">入住與取消規則</Link>
          <Link href="/traffic">交通與停車</Link>
        </div>
      </section>

      <section className="hs-final-cta" aria-labelledby="home-final-cta-title">
        <div>
          <p className="hs-eyebrow">Ready To Book</p>
          <h2 id="home-final-cta-title">已經知道日期或人數 就直接查空房</h2>
          <p>查空房、報價與付款都在官方訂房站完成。</p>
        </div>
        <div>
          <Link
            href={bookingHref}
            target={guestCountOutsideRange ? "_blank" : undefined}
            rel={guestCountOutsideRange ? "noopener noreferrer" : undefined}
          >
            {guestCountOutsideRange ? "LINE 詢問其他人數" : "查詢空房與報價"}
          </Link>
          <Link href="/book">查看訂房方式</Link>
        </div>
      </section>
    </div>
  );
}
