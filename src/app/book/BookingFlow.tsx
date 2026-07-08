import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronRight, Hotel, ShieldCheck } from "lucide-react";

import { properties } from "@/data/properties";

const bookingBase = "https://booking.hello-stay.com/booking";

type Entrance = {
  name: string;
  detail: string;
  property: string;
  image?: string;
  alt?: string;
  splitImages?: { src: string; alt: string; label: string }[];
};

function buildBookingHref(property?: string) {
  const url = new URL(bookingBase);
  if (property) url.searchParams.set("property", property);
  return url.toString();
}

const entrances: Entrance[] = [
  {
    name: "你好哇寓所",
    detail: "6-26 人\n依人數幫我推薦\n婚禮迎娶與中大型團體",
    image: properties[0]?.coverImage || "/images/hellohouse/cover.webp",
    alt: "你好哇寓所公共空間",
    property: "你好哇寓所",
  },
  {
    name: "溝頂民宿",
    detail: "4-12 人小團體\n我已經知道要住哪一館\n可先看獨棟空間",
    image: properties[1]?.coverImage || "/images/godin/cover-1.webp",
    alt: "溝頂民宿五層獨棟空間",
    property: "溝頂民宿",
  },
  {
    name: "雙館包棟",
    detail: "你好哇＋溝頂\n想看雙館包棟\n適合多人團體",
    splitImages: [
      { src: properties[0]?.coverImage || "/images/hellohouse/cover.webp", alt: "你好哇寓所", label: "你好哇寓所" },
      { src: properties[1]?.coverImage || "/images/godin/cover-1.webp", alt: "溝頂民宿", label: "溝頂民宿" },
    ],
    property: "雙館包棟",
  },
];

const steps = [
  {
    title: "先選館別",
    text: "先把日期與人數輸入，系統會先幫你抓對應館別與目前試算總價。",
    icon: Hotel,
  },
  {
    title: "查看空房與總價",
    text: "日期、人數與目前試算總價都會在官方訂房站顯示。",
    icon: CalendarDays,
  },
  {
    title: "完成驗證與付款",
    text: "Email 驗證、合約簽署、付款與訂單查詢都在同一個系統內完成。",
    icon: ShieldCheck,
  },
];

export default function BookingFlow() {
  return (
    <main className="book-bridge">
      <section className="book-bridge__hero">
        <div className="book-bridge__copy">
          <p className="book-bridge__eyebrow">官方訂房入口</p>
          <h1>先選館別，再查空房與報價</h1>
          <p>
            <span>先看要住哪一館</span>
            <span>再看日期與人數對應的目前試算總價</span>
            <span>驗證、簽署與付款也在同一個系統完成</span>
          </p>
          <div className="book-bridge__actions">
            <a href={buildBookingHref("你好哇寓所")}>
              查詢空房與報價
              <ChevronRight size={16} />
            </a>
            <Link href="/compare">看三館比較</Link>
          </div>
        </div>

        <div className="book-bridge__media">
          <Image
            src={properties[0]?.coverImage || "/images/hellohouse/cover.webp"}
            alt="Hello Stay 你好哇寓所"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
          />
          <div>
            <span>鹽埕區 / 近駁二</span>
            <strong>先選館別 再到 booking 站查價</strong>
          </div>
        </div>
      </section>

      <section className="book-bridge__steps" aria-label="訂房流程">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <article key={step.title}>
              <Icon size={18} />
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </article>
          );
        })}
      </section>

      <section className="book-bridge__entrances" aria-labelledby="book-entrances-title">
        <div className="book-bridge__section-head">
          <p className="book-bridge__eyebrow">先看哪種安排</p>
          <h2 id="book-entrances-title">依需求先選館別</h2>
        </div>

        <div className="book-bridge__grid">
          {entrances.map((item) => (
            <article className="book-bridge__card" key={item.name}>
              <div className="book-bridge__card-image">
                {"splitImages" in item && item.splitImages ? (
                  <div className="book-bridge__split">
                    {item.splitImages.map((image) => (
                      <div className="book-bridge__split-pane" key={image.label}>
                        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 50vw, 16vw" />
                        <em>{image.label}</em>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Image src={item.image!} alt={item.alt!} fill sizes="(max-width: 900px) 100vw, 33vw" />
                )}
              </div>
              <div className="book-bridge__card-body">
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
                <a href={buildBookingHref(item.property)}>查詢空房</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
