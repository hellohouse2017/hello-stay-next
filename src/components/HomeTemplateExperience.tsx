"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { godin, hellohouse } from "@/data/properties";

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

function getGalleryImage(
  images: { src: string; alt: string }[],
  src: string,
  fallbackAlt: string,
) {
  return images.find((image) => image.src === src) ?? { src, alt: fallbackAlt };
}

const bookingBase = "https://booking.hello-stay.com/booking";

const stays: StayOption[] = [
  {
    id: "hellohouse",
    name: hellohouse.name,
    nameEn: hellohouse.nameEn,
    href: "/hellohouse",
    image: hellohouse.coverImage,
    imageAlt: "你好哇寓所中島廚房與高雄包棟民宿公共交誼空間",
    capacity: "6-26 人",
    planSummary: "3-6 房級距，最多 26 人",
    location: "鹽埕大公路，近駁二與鹽埕埔站",
    bookingProperty: "你好哇寓所",
    guestGuide: "13-26 人優先",
    bestFor: "需要中島廚房\n較大公共空間\n婚禮迎娶或 13 人以上團體",
    facts: [`Google ${hellohouse.rating?.value ?? "4.5"} 星`, "3-6 房方案", "中島廚房", "6-26 人"],
  },
  {
    id: "godin",
    name: godin.name,
    nameEn: godin.nameEn,
    href: "/godin",
    image: godin.coverImage,
    imageAlt: "溝頂民宿五層樓獨棟高雄鹽埕包棟空間",
    capacity: "4-14 人",
    planSummary: "2-4 房級距，標準 12 人",
    location: "鹽埕老街生活圈，出門就是在地美食",
    bookingProperty: "溝頂民宿",
    guestGuide: "4-12 人優先",
    bestFor: "4-12 人小團體\n預算優先\n想要整棟獨立與交誼廳",
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
    capacity: "27-36 人",
    planSummary: "你好哇 + 溝頂，最多 36 人",
    location: "兩館都在鹽埕區，距離 5 公尺",
    bookingProperty: "雙館包棟",
    guestGuide: "27-36 人優先",
    bestFor: "26 人以上團體\n需要 6 間房以上\n不想拆成兩筆訂房",
    facts: ["雙館入住", "最多 10 房", "大型團體", "不拆單"],
  },
];

const heroSlides: HeroSlide[] = [
  {
    src: hellohouse.coverImage,
    alt: "你好哇寓所高雄鹽埕包棟民宿公共空間",
    label: "你好哇寓所 公共空間",
  },
  {
    ...getGalleryImage(hellohouse.galleryImages, "/images/hellohouse/photo2.webp", "你好哇寓所中島廚房"),
    label: "你好哇寓所 中島廚房",
  },
  {
    ...getGalleryImage(hellohouse.galleryImages, "/images/hellohouse/photo3.webp", "你好哇寓所客房"),
    label: "你好哇寓所 客房",
  },
  {
    ...getGalleryImage(hellohouse.galleryImages, "/images/hellohouse/photo5.webp", "你好哇寓所外觀"),
    label: "你好哇寓所 外觀",
  },
  {
    src: godin.coverImage,
    alt: "溝頂民宿高雄鹽埕包棟民宿外觀",
    label: "溝頂民宿 外觀",
  },
  {
    ...getGalleryImage(godin.galleryImages, "/images/godin/cover-3.webp", "溝頂民宿交誼廳"),
    label: "溝頂民宿 交誼廳",
  },
  {
    ...getGalleryImage(godin.galleryImages, "/images/godin/cover-4.webp", "溝頂民宿客房"),
    label: "溝頂民宿 客房",
  },
];

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildBookingHref(params: {
  property: BookingProperty;
  checkIn: string;
  checkOut: string;
  guestCount: string;
}) {
  const url = new URL(bookingBase);
  if (params.property) url.searchParams.set("property", params.property);
  if (params.checkIn) url.searchParams.set("checkIn", params.checkIn);
  if (params.checkOut) url.searchParams.set("checkOut", params.checkOut);
  if (params.guestCount) url.searchParams.set("guestCount", params.guestCount);
  return url.toString();
}

function suggestProperty(guestCount: string): BookingProperty {
  const guests = Number(guestCount);
  if (!Number.isFinite(guests) || guests <= 0) return "";
  if (guests <= 12) return "溝頂民宿";
  if (guests <= 26) return "你好哇寓所";
  return "雙館包棟";
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
  const [property, setProperty] = useState<BookingProperty>("");
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  const selectedProperty = property || suggestProperty(guestCount);
  const bookingHref = buildBookingHref({ property: selectedProperty, checkIn, checkOut, guestCount });

  useEffect(() => {
    if (heroSlides.length < 2) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setHeroSlideIndex((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const goToHeroSlide = (nextIndex: number) => {
    const total = heroSlides.length;
    setHeroSlideIndex(((nextIndex % total) + total) % total);
  };

  return (
    <main className="hs-template">
      <section className="hs-hero" aria-labelledby="home-hero-title">
        <div className="hs-hero__media">
          <div className="hs-hero-carousel" aria-label="Hello Stay hero images">
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
          <p className="hs-eyebrow">Hello Stay Official Booking</p>
          <h1 id="home-hero-title">
            高雄鹽埕包棟民宿
            <br />
            先查日期與人數
            <br />
            再選適合館別
          </h1>
          <p className="hs-hero__lead">
            <span>溝頂民宿 4-12 人</span>
            <span>你好哇寓所 6-26 人</span>
            <span>雙館包棟 27-36 人</span>
          </p>

          <div className="hs-book-panel" aria-label="快速查詢空房與報價">
            <div className="hs-book-panel__grid">
              <label>
                <span>入住</span>
                <input type="date" value={checkIn} min={tomorrow} onChange={(event) => setCheckIn(event.target.value)} />
              </label>
              <label>
                <span>退房</span>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn || dayAfterTomorrow}
                  onChange={(event) => setCheckOut(event.target.value)}
                />
              </label>
              <label>
                <span>人數</span>
                <input
                  inputMode="numeric"
                  min="1"
                  max="48"
                  placeholder="例：12"
                  type="number"
                  value={guestCount}
                  onChange={(event) => setGuestCount(event.target.value)}
                />
              </label>
              <label>
                <span>館別</span>
                <select value={property} onChange={(event) => setProperty(event.target.value as BookingProperty)}>
                  <option value="">自動建議</option>
                  <option value="你好哇寓所">你好哇寓所</option>
                  <option value="溝頂民宿">溝頂民宿</option>
                  <option value="雙館包棟">雙館包棟</option>
                </select>
              </label>
            </div>
            <div className="hs-book-panel__action">
              <p>
                {selectedProperty ? `目前建議 ${selectedProperty}` : "可先輸入日期與人數"}
              </p>
              <Link href={bookingHref}>查看空房與報價</Link>
            </div>
          </div>

          <div className="hs-flow" aria-label="官方訂房重點">
            <span>官方直訂</span>
            <span>不收平台手續費</span>
            <span>查空房與報價</span>
            <span>LINE 詢問</span>
          </div>
        </div>
      </section>

      <section className="hs-proof-strip" aria-label="Hello Stay 核心承諾">
        <div>
          <strong>鹽埕核心</strong>
          <span>近駁二、大港橋、鹽埕埔站</span>
        </div>
        <div>
          <strong>多人包棟</strong>
          <span>4 人到 36 人皆可安排</span>
        </div>
        <div>
          <strong>即時報價</strong>
          <span>依日期與人數快速查看</span>
        </div>
        <div>
          <strong>官方直訂</strong>
          <span>查空房 報價 與詢問一次完成</span>
        </div>
      </section>

      <section className="hs-section hs-stays" aria-labelledby="stay-compare-title">
        <div className="hs-section__head">
          <p className="hs-eyebrow">Choose Your Stay</p>
          <h2 id="stay-compare-title">
            依人數與需求
            <br />
            直接選館
          </h2>
          <p>
            <span>一次看完人數 位置 與空間差異</span>
            <span>確認後直接查空房與報價</span>
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
                          <Image src={image.src} alt={image.alt} fill loading="eager" sizes="(max-width: 900px) 50vw, 16vw" />
                          <em>{image.label}</em>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Image
                      src={stay.image!}
                      alt={stay.imageAlt!}
                      fill
                      loading="eager"
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
                    <Link href={stay.href}>{stay.id === "dual" ? "看雙館方案" : "看館別"}</Link>
                    <Link href={href}>{stay.id === "dual" ? "查雙館空房" : "查這館空房"}</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="hs-final-cta" aria-labelledby="home-final-cta-title">
        <div>
          <p className="hs-eyebrow">Ready To Book</p>
          <h2 id="home-final-cta-title">已經知道日期或人數 就直接查空房</h2>
          <p>查空房 報價 驗證 與付款都在 booking.hello-stay.com/booking 完成</p>
        </div>
        <div>
          <Link href={bookingHref}>查看空房與報價</Link>
          <Link href="/book">查看訂房方式</Link>
        </div>
      </section>
    </main>
  );
}
