import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Route, Utensils } from "lucide-react";

const guides = [
  {
    href: "/explore/food",
    title: "鹽埕美食",
    label: "FOOD GUIDE",
    description: "早餐、老店、甜點、酒吧與外帶回館的選擇。",
    image: "/images/hellohouse/foodie-cover.webp",
    alt: "鹽埕美食與 Hello Stay 旅宿生活圈",
    icon: Utensils,
  },
  {
    href: "/explore/spots",
    title: "周邊景點",
    label: "LOCAL SPOTS",
    description: "駁二、大港橋、港區與半日行程整理。",
    image: "/images/godin/cover-3.webp",
    alt: "鹽埕街區市場與周邊景點生活感",
    icon: MapPin,
  },
  {
    href: "/blog/kaohsiung-3day-seasonal",
    title: "三天兩夜路線",
    label: "3-DAY ROUTE",
    description: "鹽埕、駁二、旗津與捷運備案，排成不趕路的三天行程。",
    image: "/images/hellohouse/cover.webp",
    alt: "從鹽埕出發的高雄三天兩夜慢旅行路線",
    icon: Route,
  },
];

export default function LocalExploreHub() {
  return (
    <div className="local-guide-page local-explore-hub">
      <section className="local-guide-hero local-explore-hub__hero">
        <div className="local-guide-shell local-explore-hub__intro">
          <p className="local-guide-kicker"><MapPin size={15} aria-hidden="true" /> YANCHENG LOCAL GUIDE</p>
          <h1>鹽埕散步指南</h1>
          <p className="local-guide-hero__lead">從鹽埕早餐、老店與甜點，到駁二、大港橋、旗津轉乘和三天兩夜步行路線，先選玩法，再回頭比較住宿。</p>
          <div className="local-explore-hub__stats">
            <span>駁二步行約 10 分鐘</span>
            <span>鹽埕埔站步行約 5 分鐘</span>
            <span>美食與補給集中</span>
          </div>
        </div>
      </section>

      <section className="local-guide-content">
        <div className="local-guide-shell">
          <div className="local-guide-section-heading">
            <p className="local-guide-kicker">START HERE</p>
            <h2>從你想做的事開始</h2>
            <p>不用先讀完整攻略，直接進入美食、景點或三天兩夜路線。</p>
          </div>
          <div className="local-explore-hub__cards">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link className="local-explore-card" href={guide.href} key={guide.href}>
                  <div className="local-explore-card__media">
                    <Image src={guide.image} alt={guide.alt} fill sizes="(max-width: 820px) 100vw, 50vw" />
                  </div>
                  <div className="local-explore-card__body">
                    <p className="local-guide-kicker"><Icon size={14} aria-hidden="true" /> {guide.label}</p>
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <span>開始查看 <ArrowRight size={16} aria-hidden="true" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="local-guide-note local-guide-note--compact">
            <div>
              <p className="local-guide-kicker">STAY NEAR THE ROUTE</p>
              <h2>先看位置，再比較館別</h2>
              <p>你好哇寓所與溝頂民宿都在鹽埕生活圈內。</p>
            </div>
            <Link className="local-guide-button local-guide-button--dark" href="/compare">
              比較住宿方案 <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
