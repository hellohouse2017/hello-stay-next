"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, CheckCircle2, Hotel, ShieldCheck, Users } from "lucide-react";
import { properties } from "@/data/properties";

const bookingBase = "https://booking.hello-stay.com/booking";

type Entrance = {
  name: string;
  nameEn: string;
  badge: string;
  guests: string;
  rooms: string;
  detail: string;
  property: string;
  image?: string;
  alt?: string;
  splitImages?: { src: string; alt: string; label: string }[];
};

function buildBookingHref(property?: string) {
  const url = new URL(bookingBase);
  if (property) url.searchParams.set("property", property);
  url.searchParams.set("openCalendar", "1");
  return url.toString();
}

const entrances: Entrance[] = [
  {
    name: "溝頂民宿",
    nameEn: "GODIN VILLA",
    badge: "小團體整棟首選",
    guests: "4-12 人",
    rooms: "2-4 間客房",
    detail: "五層獨棟分層休息，頂樓專屬交誼廳與麻將桌，小家庭與好友出遊最自在。",
    image: properties[1]?.coverImage || "/images/godin/cover-1.webp",
    alt: "溝頂民宿五層獨棟空間",
    property: "溝頂民宿",
  },
  {
    name: "你好哇寓所",
    nameEn: "HELLO HOUSE VILLA",
    badge: "中島廚房＆多人聚會",
    guests: "8-26 人",
    rooms: "3-6 間客房",
    detail: "寬敞一樓中島廚房與高腳吧台，多間套房獨立衛浴，適合家族三代聚會或迎娶活動。",
    image: properties[0]?.coverImage || "/images/hellohouse/cover.webp",
    alt: "你好哇寓所公共空間",
    property: "你好哇寓所",
  },
  {
    name: "雙館包棟",
    nameEn: "DUAL STAY RETREAT",
    badge: "兩館相鄰 5 秒",
    guests: "27-36 人",
    rooms: "7-10 間客房",
    detail: "兩館相鄰步行 5 秒，最多 10 間客房與雙交誼空間，大型團體同聚也能保有私密休息空間。",
    splitImages: [
      { src: properties[1]?.coverImage || "/images/godin/cover-1.webp", alt: "溝頂民宿", label: "溝頂民宿" },
      { src: properties[0]?.coverImage || "/images/hellohouse/cover.webp", alt: "你好哇寓所", label: "你好哇寓所" },
    ],
    property: "雙館包棟",
  },
];

const steps = [
  {
    step: "01",
    title: "挑選館別與人數",
    text: "依團體人數（4-36人）或房間需求（2-10房），選擇最適合的包棟方案。",
    icon: Hotel,
  },
  {
    step: "02",
    title: "查看即時空房與總價",
    text: "選取入住與退房日期，系統即時連線官方日曆計算透明報價，保證免手續費。",
    icon: CalendarDays,
  },
  {
    step: "03",
    title: "線上簽約與安全付款",
    text: "完成 Email 驗證、線上定型化合約簽署與多元支付，即時收到入住憑證。",
    icon: ShieldCheck,
  },
];

export default function BookingFlow() {
  return (
    <div className="book-luxury-page">
      {/* ═══ 1. HERO ═══ */}
      <section className="book-luxury-hero">
        <div className="mockup-container book-luxury-hero__inner">
          <div className="book-luxury-hero__copy">
            <p className="mockup-kicker">OFFICIAL BOOKING PORTAL</p>
            <h1>先選館別，再查空房與即時報價</h1>
            <p className="book-luxury-hero__sub">
              官方直訂保證最優價格・即時日曆連線・免平台手續費。<br />
              依團體人數或房間需求選擇館別，一鍵進入官方訂房系統。
            </p>
            <div className="book-luxury-hero__actions">
              <a href={buildBookingHref()} className="mockup-btn mockup-btn--gold">
                前往官方訂房系統 <ArrowRight size={16} aria-hidden="true" />
              </a>
              <Link href="/compare" className="mockup-btn mockup-btn--outline">
                先比較三館差異 <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="book-luxury-hero__media">
            <Image
              src="/images/hellohouse/cover.webp"
              alt="Hello Stay 高雄包棟民宿"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
            />
            <div className="book-luxury-hero__media-badge">
              <CheckCircle2 size={16} aria-hidden="true" />
              <span>官方直訂・合法民宿・即時確認</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. BOOKING STEPS ═══ */}
      <section className="book-luxury-steps" aria-label="預訂三步驟流程">
        <div className="mockup-container">
          <div className="book-luxury-steps__grid">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <article className="book-luxury-step-card" key={step.title}>
                  <div className="book-luxury-step-card__top">
                    <span className="book-luxury-step-card__num">{step.step}</span>
                    <Icon size={22} className="book-luxury-step-card__icon" aria-hidden="true" />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 3. ENTRANCES SHOWCASE ═══ */}
      <section className="book-luxury-entrances" aria-labelledby="book-entrances-title">
        <div className="mockup-container">
          <div className="mockup-villas__head">
            <p className="mockup-kicker">CURATED RETREATS</p>
            <h2 id="book-entrances-title">選擇你要預訂的館別方案</h2>
            <p>點選任一館別，將自動為您帶入對應房型並開啟空房日曆。</p>
          </div>

          <div className="book-luxury-cards">
            {entrances.map((item) => (
              <article className="book-luxury-card" key={item.name}>
                <div className="book-luxury-card__media-wrap">
                  {item.splitImages ? (
                    <div className="book-luxury-card__split">
                      {item.splitImages.map((image) => (
                        <div className="book-luxury-card__split-pane" key={image.label}>
                          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 50vw, 20vw" />
                          <span>{image.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Image src={item.image!} alt={item.alt!} fill sizes="(max-width: 900px) 100vw, 33vw" />
                  )}
                  <span className="book-luxury-card__badge">{item.badge}</span>
                </div>

                <div className="book-luxury-card__body">
                  <div>
                    <p className="mockup-kicker">{item.nameEn}</p>
                    <h3>{item.name}</h3>
                    <div className="book-luxury-card__meta">
                      <span><Users size={14} aria-hidden="true" /> {item.guests}</span>
                      <span><Hotel size={14} aria-hidden="true" /> {item.rooms}</span>
                    </div>
                    <p className="book-luxury-card__desc">{item.detail}</p>
                  </div>

                  <a href={buildBookingHref(item.property)} className="mockup-btn mockup-btn--gold">
                    查詢 {item.name} 空房 <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

