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

import GuideShareToolbar from "./GuideShareToolbar";
import GuideReadingExperience from "./GuideReadingExperience";

type ExploreCategory = "all" | "breakfast" | "food" | "snacks" | "nightmarket" | "coffee" | "spots" | "life" | "traffic";

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
  directMapUrl?: string;
  href?: string;
};

const categories: Array<{ id: ExploreCategory; label: string; icon: typeof Utensils }> = [
  { id: "all", label: "全部推薦", icon: Compass },
  { id: "breakfast", label: "特色早餐", icon: Utensils },
  { id: "food", label: "正餐熱炒", icon: Utensils },
  { id: "snacks", label: "街頭小吃", icon: ShoppingBag },
  { id: "nightmarket", label: "夜市推薦", icon: Sparkles },
  { id: "coffee", label: "咖啡酒吧", icon: Coffee },
  { id: "spots", label: "景點藝文", icon: Sparkles },
  { id: "life", label: "生活補給", icon: ShoppingBag },
  { id: "traffic", label: "交通資訊", icon: Car },
];

const exploreCards: ExploreCard[] = [
  {
    category: "breakfast",
    label: "BREAKFAST",
    title: "鹽埕特色早餐",
    description: "大溝頂虱目魚肚漿、大ㄎㄡ胖炭烤三明治、姐妹老五爆餡烘蛋堡，開啟活力早晨。",
    image: "/images/explore/market.jpg",
    alt: "鹽埕第一公有零售市場與在地早餐街區",
    href: "/explore/food#breakfast",
    linkLabel: "查看特色早餐",
    icon: Utensils,
  },
  {
    category: "food",
    label: "LOCAL MEALS & HOTPOTS",
    title: "必吃正餐與汕頭火鍋",
    description: "米其林必比登鴨肉珍、港園牛肉麵、味味香沙茶火鍋與北站深夜熱炒，美味齊全。",
    image: "/images/hellohouse/1000.webp",
    alt: "聚餐美食與包棟料理空間",
    href: "/explore/food#local-meals",
    linkLabel: "探索正餐與火鍋",
    icon: Utensils,
  },
  {
    category: "snacks",
    label: "STREET SNACKS",
    title: "經典小吃與甜品",
    description: "阿囉哈滷味、阿芳清蒸肉圓、阿寶豆乳雞、戴蛋餅、王家豆花與50年杏仁茶。",
    image: "/images/explore/ice.jpg",
    alt: "鹽埕街頭古早味冰品與小吃",
    href: "/explore/food#snacks-street-food",
    linkLabel: "查看小吃清單",
    icon: ShoppingBag,
  },
  {
    category: "nightmarket",
    label: "NIGHT MARKETS",
    title: "在地與觀光夜市",
    description: "週六限定鹽埕建國夜市、六合觀光夜市與自強夜市，感受高雄道地夜生活風情。",
    image: "/images/explore/harbor.jpg",
    alt: "高雄港夜市與港灣夜景",
    href: "/explore/food#night-markets",
    linkLabel: "探索夜市行程",
    icon: Sparkles,
  },
  {
    category: "coffee",
    label: "COFFEE & NIGHTLIFE",
    title: "老屋咖啡與私密酒吧",
    description: "新濱·駅前百年金庫冰滴、小堤昭和咖啡館，以及瀨南街廢墟BAR預約包場特色體驗。",
    image: "/images/explore/sanhe-05.jpg",
    alt: "新濱·駅前百年金庫冰滴咖啡設備",
    href: "/explore/food#coffee-nightlife",
    linkLabel: "探索咖啡與酒吧",
    icon: Coffee,
  },
  {
    category: "spots",
    label: "ARTS & WATERFRONT",
    title: "藝文景點巡禮",
    description: "從駁二藝術特區、水平旋轉大港橋到高流愛河灣，把鹽埕老城與海港一次走遍。",
    image: "/images/explore/pier2.jpg",
    alt: "駁二藝術特區蓬萊倉庫群與步道",
    href: "/explore/spots",
    linkLabel: "查看周邊景點",
    icon: Sparkles,
  },
  {
    category: "life",
    label: "LOCAL LIFE & LAUNDRY",
    title: "生活機能與補給",
    description: "IPSO自助洗衣、衣潔洗衣、全聯生鮮超市下廚採買與24H便利超商，隨時便利。",
    image: "/images/explore/oldhouse.jpg",
    alt: "鹽埕老街老屋與日常生活機能",
    href: "/explore/food#laundry",
    linkLabel: "查看採買與洗衣",
    icon: ShoppingBag,
  },
];

const trafficCard: ExploreCard = {
  category: "traffic",
  label: "GETTING AROUND",
  title: "交通資訊一次看",
  description: "捷運鹽埕埔站、高鐵轉乘、自駕停車場與叫車方式都整理好，抵達後安心散步。",
  image: "/images/traffic/hero.webp",
  alt: "高雄輕軌與鹽埕駁二周邊交通指南",
  href: "/traffic",
  linkLabel: "查看交通指南",
  icon: Car,
};

const popularPicks: PopularPick[] = [
  {
    category: "米其林推薦",
    title: "鴨肉珍 (總店)",
    description: "香濃肉燥鴨肉飯與鮮嫩切盤，米其林必比登推介排隊名店。",
    meta: "五福四路",
    image: "/images/explore/market.jpg",
    alt: "鹽埕鴨肉珍",
    directMapUrl: "https://maps.app.goo.gl/n7rDEnbjunGjisPS9",
    href: "/explore/food#local-meals",
  },
  {
    category: "人氣火鍋",
    title: "味味香廣東汕頭牛豬羊肉爐",
    description: "扁魚沙茶高湯與現切溫體牛，包棟朋友聚餐圍爐首選。",
    meta: "七賢三路",
    image: "/images/hellohouse/1000.webp",
    alt: "味味香廣東汕頭沙茶火鍋",
    directMapUrl: "https://maps.google.com/?q=味味香廣東汕頭沙茶火鍋+高雄",
    href: "/explore/food#local-meals",
  },
  {
    category: "特色小吃",
    title: "阿囉哈滷味",
    description: "鹽埕代表性乾式滷味，特調黑胡椒醬汁入味，宵夜首選。",
    meta: "大仁路",
    image: "/images/explore/ice.jpg",
    alt: "阿囉哈滷味",
    directMapUrl: "https://goo.gl/maps/7p6QA3RUA2d1zS1J9",
    href: "/explore/food#snacks-street-food",
  },
  {
    category: "在地早餐",
    title: "大溝頂虱目魚米粉湯",
    description: "無刺鮮美虱目魚肚漿、米粉湯與煎魚腸，老饕清晨首選。",
    meta: "大溝頂老街",
    image: "/images/explore/market.jpg",
    alt: "大溝頂虱目魚米粉湯",
    directMapUrl: "https://goo.gl/maps/2DPVK1d8ep9m3Ggi7",
    href: "/explore/food#breakfast",
  },
  {
    category: "夜市推薦",
    title: "鹽埕建國夜市（週六限定）",
    description: "鹽埕人私房週六限定街區夜市，充滿傳統夜市小吃與人情味。",
    meta: "建國四路",
    image: "/images/explore/harbor.jpg",
    alt: "鹽埕建國夜市",
    directMapUrl: "https://maps.google.com/?q=鹽埕埔夜市+高雄",
    href: "/explore/food#night-markets",
  },
  {
    category: "景點藝文",
    title: "駁二藝術特區",
    description: "倉庫群、當代展覽、文創小店與週末市集，慢慢散步最舒服。",
    meta: "步行約 10 分鐘",
    image: "/images/explore/pier2.jpg",
    alt: "駁二藝術特區蓬萊倉庫群",
    directMapUrl: "https://maps.google.com/?q=駁二藝術特區+高雄",
    href: "/explore/spots#walkable-core",
  },
  {
    category: "老屋酒吧",
    title: "廢墟BAR (預約包場制)",
    description: "老屋廢墟美學再生空間，預約包場享受專屬私密調酒聚會。",
    meta: "瀨南街",
    image: "/images/explore/sanhe-05.jpg",
    alt: "廢墟BAR老屋空間",
    directMapUrl: "https://maps.google.com/?q=廢墟Ruins+高雄",
    href: "/explore/food#coffee-nightlife",
  },
  {
    category: "老屋咖啡",
    title: "新濱·駅前",
    description: "百年舊三和銀行古蹟裡的咖啡與茶點，百年金庫冰滴咖啡座。",
    meta: "哈瑪星商圈",
    image: "/images/explore/sanhe-01.jpg",
    alt: "新濱·駅前咖啡館室內空間",
    directMapUrl: "https://maps.google.com/?q=新濱駅前+高雄",
    href: "/explore/food#coffee-nightlife",
  },
  {
    category: "水岸地標",
    title: "大港橋",
    description: "全台首座水平旋轉景觀橋，傍晚開合秀，連通棧貳庫水岸。",
    meta: "港區散步",
    image: "/images/explore/bridge.jpg",
    alt: "高雄港大港橋與水岸景色",
    directMapUrl: "https://maps.google.com/?q=大港橋+高雄",
    href: "/explore/spots#walkable-core",
  },
  {
    category: "生活補給",
    title: "IPSO 自助洗衣 (距離最近)",
    description: "全新進口商用洗脫烘一體機，快速高溫殺菌，離民宿最近。",
    meta: "大仁路商圈",
    image: "/images/explore/oldhouse.jpg",
    alt: "鹽埕街區生活設施",
    directMapUrl: "https://maps.google.com/?q=IPSO+自助洗衣+高雄鹽埕",
    href: "/explore/food#laundry",
  },
];

const trafficPicks: PopularPick[] = [
  {
    category: "捷運",
    title: "鹽埕埔站 O2",
    description: "從二號出口出站，沿大公路步行到 70 巷。",
    meta: "步行約 5 分鐘",
    image: "/images/traffic/mrt.webp",
    alt: "高雄捷運鹽埕埔站 2 號出口",
    href: "/traffic#traffic-mrt",
  },
  {
    category: "高鐵",
    title: "左營站轉捷運",
    description: "高鐵左營站轉紅線至美麗島，再轉橘線到鹽埕埔站。",
    meta: "外縣市旅客",
    image: "/images/traffic/hsr.webp",
    alt: "台灣高鐵左營站列車月台",
    href: "/traffic#traffic-hsr",
  },
  {
    category: "自駕",
    title: "先停車，再步行進巷",
    description: "兩館位於巷內，周邊停車點與共用地圖已整理好。",
    meta: "周邊停車資訊",
    image: "/images/traffic/parking.webp",
    alt: "高雄市鹽埕立體停車場",
    href: "/traffic#traffic-map",
  },
];

function getItemByName(sections: typeof foodGuideSections | typeof spotGuideSections, name: string): LocalGuideItem | undefined {
  return sections.flatMap((section) => section.items).find((item) => item.name === name);
}

function mapHref(item: LocalGuideItem | undefined): string | undefined {
  if (!item) return undefined;
  if (item.directMapUrl) return item.directMapUrl;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.mapQuery)}`;
}

function PopularCard({ pick }: { pick: PopularPick }) {
  const item = getItemByName(foodGuideSections, pick.title) || getItemByName(spotGuideSections, pick.title);
  const href = pick.directMapUrl || pick.href || mapHref(item);
  const isExternal = Boolean(pick.directMapUrl) || (!pick.href && Boolean(href));

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

  const hubHighlights = [
    "鴨肉珍（米其林必比登推介）",
    "味味香廣東汕頭沙茶火鍋",
    "大溝頂虱目魚米粉湯與大ㄎㄡ胖碳烤三明治",
    "阿囉哈滷味與阿芳古早味清蒸肉圓",
    "鹽埕建國夜市（週六限定）",
    "駁二藝術特區與旋轉大港橋",
    "廢墟BAR老屋包場酒吧",
    "IPSO 自助洗衣（離館最近）",
  ];

  return (
    <div className="local-guide-page explore-redesign">
      <GuideReadingExperience
        title="鹽埕玩什麼？美食、景點與在地生活指南"
        description="從老屋咖啡、在地美食，到河岸風景、藝文空間與日常補給，鹽埕有留給旅人慢慢走的理由。"
        url="/explore"
        highlights={hubHighlights}
      />

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
          <p className="explore-redesign__eyebrow"><MapPin size={14} aria-hidden="true" /> Hello Stay ｜ 鹽埕私房漫遊指南</p>
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
            <p className="explore-redesign__eyebrow explore-redesign__eyebrow--dark">Hello Stay ｜ 鹽埕在地探索</p>
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
                <p className="explore-redesign__eyebrow explore-redesign__eyebrow--dark">人氣精選 ｜ 街區私房點</p>
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

      {/* 底部大型同行友人分享卡片 */}
      <div className="explore-redesign__container">
        <GuideShareToolbar
          title="鹽埕玩什麼？在地旅宿美食與景點總覽"
          description="把這份鹽埕必吃、夜市、老屋酒吧與生活機能地圖傳給同行友人，一起規劃高雄包棟之旅！"
          url="/explore"
          highlights={hubHighlights}
          variant="card"
        />
      </div>

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
                <Link className="explore-redesign__button" href="/kaohsiung-whole-house">查看包棟攻略 <ArrowRight size={15} aria-hidden="true" /></Link>
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
