"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Coffee,
  Compass,
  ExternalLink,
  MapPin,
  Navigation,
  ShoppingBag,
  Sparkles,
  TrainFront,
  Utensils,
} from "lucide-react";
import { foodGuideSections, spotGuideSections, type LocalGuideItem } from "@/data/local-guides";

type ExploreCategory = "all" | "food" | "coffee" | "spots" | "life" | "traffic";

type ExploreCard = {
  category: Exclude<ExploreCategory, "all">;
  label: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  linkLabel: string;
  icon: typeof Utensils;
};

type PopularPick = {
  category: string;
  title: string;
  description: string;
  meta: string;
  image: string;
  alt: string;
  mapQuery?: string;
  href?: string;
};

const categories: Array<{ id: ExploreCategory; label: string; icon: typeof Utensils }> = [
  { id: "all", label: "全部推薦", icon: Compass },
  { id: "food", label: "美食小吃", icon: Utensils },
  { id: "coffee", label: "咖啡甜點", icon: Coffee },
  { id: "spots", label: "景點藝文", icon: Sparkles },
  { id: "life", label: "在地生活", icon: ShoppingBag },
  { id: "traffic", label: "交通資訊", icon: Car },
];

const exploreCards: ExploreCard[] = [
  {
    category: "food",
    label: "FOOD & DAILY LIFE",
    title: "鹽埕必吃美食",
    description: "從在地早餐、老店小吃到古早味冰品，沿著鹽埕的日常滋味慢慢吃。",
    image: "/images/explore/ice.jpg",
    alt: "鹽埕高雄婆婆冰的芒果冰",
    href: "/explore/food#breakfast",
    linkLabel: "探索鹽埕美食",
    icon: Utensils,
  },
  {
    category: "coffee",
    label: "COFFEE & SWEETS",
    title: "老屋咖啡香",
    description: "午後沿著老街散步，找一間老屋咖啡館，讓旅程留一點慢下來的空白。",
    image: "/images/explore/sanhe-05.jpg",
    alt: "新濱·駅前百年金庫冰滴咖啡設備",
    href: "/explore/food#coffee-sweets",
    linkLabel: "探索咖啡甜點",
    icon: Coffee,
  },
  {
    category: "spots",
    label: "ARTS & WATERFRONT",
    title: "藝文景點巡禮",
    description: "從駁二、大港橋到港區藝文空間，把鹽埕的老城與海港一次走進。",
    image: "/images/explore/pier2.jpg",
    alt: "駁二藝術特區蓬萊倉庫群與步道",
    href: "/explore/spots",
    linkLabel: "查看周邊景點",
    icon: Sparkles,
  },
  {
    category: "life",
    label: "LOCAL LIFE",
    title: "在地生活風景",
    description: "採買、補給與洗衣都在附近，住進鹽埕，也住進一段不必趕路的日常。",
    image: "/images/explore/oldhouse.jpg",
    alt: "鹽埕老街老屋與日常街景",
    href: "/explore/food#shopping",
    linkLabel: "查看生活機能",
    icon: ShoppingBag,
  },
];

const trafficCard: ExploreCard = {
  category: "traffic",
  label: "GETTING AROUND",
  title: "交通資訊一次看",
  description: "捷運、高鐵、自駕與叫車方式都整理好，抵達鹽埕後再安心開始散步。",
  image: "/images/traffic/guide.png",
  alt: "你好哇寓所與溝頂民宿交通停車指引圖",
  href: "/traffic",
  linkLabel: "查看交通指南",
  icon: Car,
};

const popularPicks: PopularPick[] = [
  {
    category: "景點藝文",
    title: "駁二藝術特區",
    description: "倉庫群、展覽與文創店，從鹽埕出發最適合慢慢逛。",
    meta: "步行約 10 分鐘",
    image: "/images/explore/pier2.jpg",
    alt: "駁二藝術特區蓬萊倉庫群",
    mapQuery: "駁二藝術特區 高雄市鹽埕區大勇路1號",
    href: "/explore/spots#walkable-core",
  },
  {
    category: "在地生活",
    title: "鹽埕示範公有零售市場",
    description: "市場小吃與街區生活，適合把早餐和散步排在一起。",
    meta: "鹽埕市場",
    image: "/images/explore/market.jpg",
    alt: "鹽埕第一公有零售市場入口",
    mapQuery: "鹽埕示範公有零售市場 高雄",
    href: "/explore/spots#walkable-core",
  },
  {
    category: "咖啡甜點",
    title: "新濱·駅前",
    description: "日式老屋裡的咖啡與茶點，適合午後慢慢坐著。",
    meta: "老屋咖啡",
    image: "/images/explore/sanhe-01.jpg",
    alt: "新濱·駅前咖啡館室內空間",
    mapQuery: "新濱·駅前 高雄鹽埕",
    href: "/explore/food#coffee-sweets",
  },
  {
    category: "景點藝文",
    title: "大港橋",
    description: "沿港區散步，看旋轉橋景，也能接著走到棧貳庫。",
    meta: "港區散步",
    image: "/images/explore/bridge.jpg",
    alt: "高雄港大港橋與水岸景色",
    mapQuery: "大港橋 高雄",
    href: "/explore/spots#walkable-core",
  },
  {
    category: "咖啡甜點",
    title: "高雄婆婆冰",
    description: "鹽埕經典古早味冰品，適合散步途中停下來消暑。",
    meta: "七賢三路",
    image: "/images/explore/ice.jpg",
    alt: "鹽埕阿婆冰芒果冰",
    mapQuery: "高雄婆婆冰 創始店 七賢三路135號",
    href: "/explore/food#snacks-drinks",
  },
  {
    category: "住宿空間",
    title: "回到你好哇寓所",
    description: "逛累了回到中島廚房與公共空間，繼續一起吃飯、聊天。",
    meta: "Hello Stay",
    image: "/images/hellohouse/1000.webp",
    alt: "你好哇寓所中島廚房與多人備餐空間",
    href: "/hellohouse",
  },
  {
    category: "慢旅行",
    title: "三天兩夜慢旅行",
    description: "把鹽埕、駁二、旗津與捷運備案排成不趕路的三天行程。",
    meta: "行程提案",
    image: "/images/explore/harbor.jpg",
    alt: "高雄港灣與鹽埕港區景色",
    href: "/blog/kaohsiung-3day-seasonal",
  },
];

const trafficPicks: PopularPick[] = [
  {
    category: "捷運",
    title: "鹽埕埔站 O2",
    description: "從二號出口出站，沿大公路步行到 70 巷。",
    meta: "步行約 5 分鐘",
    image: "/images/traffic/mrt.svg",
    alt: "鹽埕埔站捷運交通示意圖",
    href: "/traffic#traffic-mrt",
  },
  {
    category: "高鐵",
    title: "左營站轉捷運",
    description: "高鐵左營站轉紅線至美麗島，再轉橘線到鹽埕埔站。",
    meta: "外縣市旅客",
    image: "/images/traffic/hsr.svg",
    alt: "高鐵左營站轉乘捷運示意圖",
    href: "/traffic#traffic-hsr",
  },
  {
    category: "自駕",
    title: "先停車，再步行進巷",
    description: "兩館位於巷內，周邊停車點與共用地圖已整理好。",
    meta: "周邊停車資訊",
    image: "/images/traffic/parking.svg",
    alt: "Hello Stay 周邊停車示意圖",
    href: "/traffic#traffic-map",
  },
];

function getItemByName(sections: typeof foodGuideSections | typeof spotGuideSections, name: string): LocalGuideItem | undefined {
  return sections.flatMap((section) => section.items).find((item) => item.name === name);
}

function mapHref(item: LocalGuideItem | undefined): string | undefined {
  if (!item) return undefined;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.mapQuery)}`;
}

function PopularCard({ pick }: { pick: PopularPick }) {
  const item = getItemByName(foodGuideSections, pick.title) || getItemByName(spotGuideSections, pick.title);
  const href = pick.href || mapHref(item);
  const isExternal = !pick.href && Boolean(href);

  const content = (
    <>
      <div className="explore-redesign__popular-media">
        <Image src={pick.image} alt={pick.alt} fill sizes="(max-width: 720px) 78vw, 240px" />
        <span>{pick.category}</span>
      </div>
      <div className="explore-redesign__popular-body">
        <h3>{pick.title}</h3>
        <p>{pick.description}</p>
        <span className="explore-redesign__popular-meta"><MapPin size={13} aria-hidden="true" /> {pick.meta}</span>
      </div>
    </>
  );

  if (!href) return <article className="explore-redesign__popular-card">{content}</article>;
  if (isExternal) {
    return <a className="explore-redesign__popular-card" href={href} target="_blank" rel="noreferrer">{content}</a>;
  }
  return <Link className="explore-redesign__popular-card" href={href}>{content}</Link>;
}

export default function LocalExploreHub() {
  const [activeCategory, setActiveCategory] = useState<ExploreCategory>("all");
  const popularRef = useRef<HTMLDivElement>(null);

  const visibleCards = useMemo(
    () => activeCategory === "all"
      ? exploreCards
      : activeCategory === "traffic"
        ? [trafficCard]
        : exploreCards.filter((card) => card.category === activeCategory),
    [activeCategory],
  );

  const visiblePicks = activeCategory === "traffic" ? trafficPicks : popularPicks;

  const scrollPopular = (direction: "left" | "right") => {
    popularRef.current?.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <div className="local-guide-page explore-redesign">
      <section className="explore-redesign__hero" aria-labelledby="explore-title">
        <Image
          src="/images/explore/pier2.jpg"
          alt="駁二藝術特區蓬萊倉庫群與鹽埕港區"
          fill
          priority
          sizes="100vw"
        />
        <div className="explore-redesign__hero-overlay" aria-hidden="true" />
        <div className="explore-redesign__container explore-redesign__hero-content">
          <p className="explore-redesign__eyebrow"><MapPin size={14} aria-hidden="true" /> YANCHENG LOCAL GUIDE</p>
          <h1 id="explore-title">鹽埕玩什麼？</h1>
          <p className="explore-redesign__hero-lead">在老城裡，發現最迷人的生活節奏</p>
          <p className="explore-redesign__hero-copy">從老屋咖啡、在地美食，到河岸風景、藝文空間與日常補給，鹽埕有留給旅人慢慢走的理由。</p>
          <div className="explore-redesign__hero-location"><MapPin size={16} aria-hidden="true" /> 高雄市鹽埕區</div>
        </div>
      </section>

      <nav className="explore-redesign__categories" aria-label="探索分類">
        <div className="explore-redesign__container explore-redesign__category-list">
          {categories.map((category) => {
            const Icon = category.icon;
            const active = category.id === activeCategory;
            return (
              <button
                type="button"
                key={category.id}
                className={active ? "is-active" : ""}
                aria-pressed={active}
                onClick={() => setActiveCategory(category.id)}
              >
                <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <section className="explore-redesign__intro" aria-labelledby="explore-intro-title">
          <div className="explore-redesign__container">
            <p className="explore-redesign__eyebrow explore-redesign__eyebrow--dark">EXPLORE YANCHENG</p>
            <h2 id="explore-intro-title">探索鹽埕的美好日常</h2>
            <span className="explore-redesign__rule" aria-hidden="true" />
            <p>精選推薦，帶你走進鹽埕的在地魅力與文化風景。</p>
          </div>
      </section>

      <section className="explore-redesign__categories-grid" aria-label="探索主題">
          <div className="explore-redesign__container explore-redesign__card-grid">
            {visibleCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link className="explore-redesign__feature-card" href={card.href} key={card.category}>
                  <div className="explore-redesign__feature-media">
                    <Image src={card.image} alt={card.alt} fill sizes="(max-width: 720px) 100vw, 25vw" />
                  </div>
                  <div className="explore-redesign__feature-overlay" aria-hidden="true" />
                  <div className="explore-redesign__feature-body">
                    <span className="explore-redesign__feature-label"><Icon size={14} aria-hidden="true" /> {card.label}</span>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <span className="explore-redesign__feature-link">{card.linkLabel} <ArrowRight size={15} aria-hidden="true" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
      </section>

      <section className="explore-redesign__popular" aria-labelledby="popular-title">
          <div className="explore-redesign__container">
            <div className="explore-redesign__section-head">
              <div>
                <p className="explore-redesign__eyebrow explore-redesign__eyebrow--dark">TOP PICKS</p>
                <h2 id="popular-title">人氣推薦</h2>
                <p>旅客最愛的鹽埕景點與美食</p>
              </div>
              <div className="explore-redesign__carousel-controls" aria-label="人氣推薦控制">
                <button type="button" aria-label="查看上一項推薦" onClick={() => scrollPopular("left")}><ArrowLeft size={17} aria-hidden="true" /></button>
                <button type="button" aria-label="查看下一項推薦" onClick={() => scrollPopular("right")}><ArrowRight size={17} aria-hidden="true" /></button>
              </div>
            </div>
            <div className="explore-redesign__popular-track" ref={popularRef}>
              {visiblePicks.map((pick) => <PopularCard key={pick.title} pick={pick} />)}
            </div>
          </div>
      </section>

      <section className="explore-redesign__stay-cta" aria-labelledby="stay-cta-title">
          <div className="explore-redesign__container explore-redesign__stay-grid">
            <div className="explore-redesign__stay-media">
              <Image src="/images/hellohouse/1000.webp" alt="你好哇寓所中島廚房與多人公共空間" fill sizes="(max-width: 720px) 100vw, 50vw" />
            </div>
            <div className="explore-redesign__stay-copy">
              <p className="explore-redesign__eyebrow explore-redesign__eyebrow--dark">HELLO STAY</p>
              <h2 id="stay-cta-title">玩累了，就回來好好休息</h2>
              <p>選擇最適合你的包棟住宿，在鹽埕享受步行出門、回館聚會的旅程。</p>
              <div className="explore-redesign__stay-links">
                <Link className="explore-redesign__button" href="/#stay-options">查看住宿選擇 <ArrowRight size={15} aria-hidden="true" /></Link>
                <Link className="explore-redesign__text-link" href="/compare">比較住宿方案 <ArrowRight size={15} aria-hidden="true" /></Link>
              </div>
            </div>
          </div>
      </section>

      <section className="explore-redesign__quick-links" aria-label="探索延伸資訊">
          <div className="explore-redesign__container">
            <div className="explore-redesign__quick-grid">
              <Link href="/explore/food#shopping"><ShoppingBag size={17} aria-hidden="true" /><span><strong>入住補給</strong><small>超商、採買與洗衣</small></span><ArrowRight size={15} aria-hidden="true" /></Link>
              <Link href="/explore/spots#extended-routes"><Navigation size={17} aria-hidden="true" /><span><strong>延伸行程</strong><small>旗津、西子灣與港區</small></span><ArrowRight size={15} aria-hidden="true" /></Link>
              <Link href="/traffic"><TrainFront size={17} aria-hidden="true" /><span><strong>交通與停車</strong><small>捷運、高鐵與停車資訊</small></span><ArrowRight size={15} aria-hidden="true" /></Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Hello%20Stay%20鹽埕" target="_blank" rel="noreferrer"><MapPin size={17} aria-hidden="true" /><span><strong>開啟地圖</strong><small>查看住宿與街區位置</small></span><ExternalLink size={15} aria-hidden="true" /></a>
            </div>
            <p className="explore-redesign__credits" id="photo-credits">
              街區照片取自 <a href="https://commons.wikimedia.org/" target="_blank" rel="noreferrer">Wikimedia Commons</a>；作者與授權明細已整理於專案素材說明。
            </p>
          </div>
      </section>
    </div>
  );
}
