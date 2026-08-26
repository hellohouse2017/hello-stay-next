"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Car,
  CarTaxiFront,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleParking,
  Compass,
  Copy,
  HelpCircle,
  MapPin,
  MessageSquare,
  Navigation,
  PhoneCall,
  Sparkles,
  Train,
  TrainFrontTunnel,
  TramFront,
  X,
  Zap,
  ZoomIn,
} from "lucide-react";
import { parkingLots } from "@/data/parking-lots";

const lineUrl = "https://lin.ee/atCiMQw";

type TrafficTab = "parking" | "map" | "transit" | "taxi" | "faq";

const tabs: Array<{ id: TrafficTab; label: string; icon: typeof Car; badge?: string }> = [
  { id: "parking", label: "自駕與停車", icon: CircleParking, badge: "最常用" },
  { id: "map", label: "地圖與位置", icon: MapPin },
  { id: "transit", label: "捷運／高鐵／輕軌", icon: TramFront },
  { id: "taxi", label: "計程車／叫車", icon: CarTaxiFront },
  { id: "faq", label: "常見問題", icon: HelpCircle },
];

const properties = [
  {
    id: "hellohouse",
    name: "你好哇寓所",
    subName: "Hello House",
    addr: "高雄市鹽埕區大公路 70 巷 8 號",
    doorNumber: "8 號",
    badge: "13-26 人整棟包棟",
    walkFromAlley: "巷口進入約 30 秒（右側）",
    navUrl: "https://www.google.com/maps/dir/?api=1&destination=你好哇寓所&travelmode=walking",
  },
  {
    id: "godin",
    name: "溝頂民宿",
    subName: "Godin House",
    addr: "高雄市鹽埕區大公路 70 巷 6-2 號",
    doorNumber: "6-2 號",
    badge: "4-12 人獨棟分層",
    walkFromAlley: "巷口進入約 20 秒（右側）",
    navUrl: "https://www.google.com/maps/dir/?api=1&destination=溝頂民宿+高雄&travelmode=walking",
  },
];

const trafficFaqs = [
  {
    id: "faq-door",
    question: "車可以直接開到民宿門口嗎？",
    answer:
      "不行。你好哇寓所與溝頂民宿皆位於傳統鹽埕巷弄內（大公路 70 巷），巷道窄小車輛無法直達門口，亦無專屬私人車位。請先將車輛開至「大公路 70 巷口」讓同行家人、朋友與大件行李下車，駕駛再前往周邊停車場停妥後步行進館。",
    tag: "停車規則",
  },
  {
    id: "faq-dropoff",
    question: "可以在巷口暫停放行李嗎？",
    answer:
      "可以。大公路 70 巷口路面寬敞，可臨時臨停 1~2 分鐘讓同行人員與大件行李先下車。巷口走進民宿僅需 20~30 秒，同行者可先前往門口等候，駕駛再輕鬆前往停車。",
    tag: "下車行李",
  },
  {
    id: "faq-best-parking",
    question: "開車過來停哪裡最方便、最推薦？",
    answer:
      "1.【首選路邊車格】：大公路、七賢三路、富野路周邊皆有公有計時車格，抵達時若有空位建議直接停放。\n2.【室內首選】：推薦「高雄國際會議中心地下停車場」（步行約 3-4 分鐘），室內地下防曬防雨且空間寬敞。\n3.【車位最多】：推薦「鹽埕立體停車場（大仁路）」（步行約 4-5 分鐘），公有大型車塔車位充裕。",
    tag: "停車推薦",
  },
  {
    id: "faq-ev",
    question: "周邊停車場有電動車充電樁（EV）嗎？",
    answer:
      "有的！鄰近的「鹽埕立體停車場（大仁路）」（步行約 4-5 分鐘）設有公有電動車充電樁設備；亦可透過充電 App 查詢周邊即時充電樁空位狀態。",
    tag: "充電樁",
  },
  {
    id: "faq-luggage-early",
    question: "可以提前寄放行李嗎？",
    answer:
      "可以。入住當天中午 12:00 後開放提前寄放行李；請務必提前透過 LINE 客服告知管家，並請同組旅客一次統一寄放，寄放完成後請先離開現場，待 16:00 整理完畢領取密碼後再正式進房入住。",
    tag: "行李寄放",
  },
  {
    id: "faq-luggage-checkout",
    question: "退房後可以繼續寄放行李嗎？",
    answer:
      "退房後無法提供行李寄放服務（需進行全館消毒與次組接待準備）。建議旅客可將行李寄放於「捷運鹽埕埔站 (O2)」或「捷運美麗島站」之付費置物櫃，寄放後即可輕鬆暢遊鹽埕與駁二特區。",
    tag: "退房行李",
  },
];

export default function TrafficExperience() {
  const [activeTab, setActiveTab] = useState<TrafficTab>("parking");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isMapLightboxOpen, setIsMapLightboxOpen] = useState(false);
  const [openFaqMap, setOpenFaqMap] = useState<Record<string, boolean>>({
    "faq-door": true,
    "faq-dropoff": true,
  });

  // 支援 URL 參數解析與 Deep Link
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleUrlState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash.replace("#", "");

      // 來源如果是 LINE 或帶有 parking 相關參數，自動鎖定 parking 分頁
      const src = searchParams.get("src") || searchParams.get("utm_source");
      const tabParam = searchParams.get("tab");

      if (tabParam && ["parking", "map", "transit", "taxi", "faq"].includes(tabParam)) {
        setActiveTab(tabParam as TrafficTab);
      } else if (hash && ["parking", "map", "transit", "taxi", "faq"].includes(hash)) {
        setActiveTab(hash as TrafficTab);
      } else if (src === "line" || hash === "traffic-parking" || hash === "parking") {
        setActiveTab("parking");
      } else if (hash === "traffic-map" || hash === "map") {
        setActiveTab("map");
      }
    };

    handleUrlState();
    window.addEventListener("hashchange", handleUrlState);
    return () => window.removeEventListener("hashchange", handleUrlState);
  }, []);

  const handleCopy = (text: string, label: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2200);
    }
  };

  const toggleFaq = (id: string) => {
    setOpenFaqMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="traffic-experience-page" style={{ paddingTop: "76px" }}>
      {/* ─── 1. HERO BANNER ─── */}
      <section className="traffic-hero">
        <div className="traffic-container">
          <div className="traffic-hero__inner">
            <div className="traffic-hero__tag">
              <Sparkles size={14} aria-hidden="true" />
              <span>HELLO STAY 官方交通與停車指引</span>
            </div>
            <h1 className="traffic-hero__title">交通與停車指南</h1>
            <p className="traffic-hero__subtitle">
              兩館位於高雄鹽埕區大公路 70 巷。傳統巷弄車輛無法直達門口，自駕請先於巷口下行李後停車，搭乘捷運或叫車步行 1-5 分鐘即可抵達。
            </p>

            {/* 4 大核心速覽指標 */}
            <div className="traffic-hero__metrics">
              <div className="traffic-metric-card" onClick={() => setActiveTab("map")} role="button" tabIndex={0}>
                <div className="traffic-metric-card__icon">
                  <MapPin size={18} aria-hidden="true" />
                </div>
                <div className="traffic-metric-card__body">
                  <span className="traffic-metric-card__label">兩館位置</span>
                  <strong className="traffic-metric-card__val">大公路 70 巷內</strong>
                </div>
              </div>

              <div className="traffic-metric-card traffic-metric-card--highlight" onClick={() => setActiveTab("parking")} role="button" tabIndex={0}>
                <div className="traffic-metric-card__icon">
                  <CircleParking size={18} aria-hidden="true" />
                </div>
                <div className="traffic-metric-card__body">
                  <span className="traffic-metric-card__label">自駕停車</span>
                  <strong className="traffic-metric-card__val">巷口下車・周邊停車</strong>
                </div>
              </div>

              <div className="traffic-metric-card" onClick={() => setActiveTab("transit")} role="button" tabIndex={0}>
                <div className="traffic-metric-card__icon">
                  <TramFront size={18} aria-hidden="true" />
                </div>
                <div className="traffic-metric-card__body">
                  <span className="traffic-metric-card__label">搭乘捷運</span>
                  <strong className="traffic-metric-card__val">鹽埕埔站 2 號口 5 分</strong>
                </div>
              </div>

              <div className="traffic-metric-card" onClick={() => setActiveTab("transit")} role="button" tabIndex={0}>
                <div className="traffic-metric-card__icon">
                  <TrainFrontTunnel size={18} aria-hidden="true" />
                </div>
                <div className="traffic-metric-card__body">
                  <span className="traffic-metric-card__label">搭乘輕軌</span>
                  <strong className="traffic-metric-card__val">文武聖殿站 4 分鐘</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. STICKY TABS NAVIGATION ─── */}
      <div className="traffic-tabs-wrapper">
        <div className="traffic-container">
          <nav className="traffic-tabs-nav" role="tablist" aria-label="交通方式切換">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  className={`traffic-tab-btn ${isActive ? "is-active" : ""}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (typeof window !== "undefined") {
                      window.location.hash = tab.id;
                    }
                  }}
                  aria-selected={isActive}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{tab.label}</span>
                  {tab.badge && <span className="traffic-tab-badge">{tab.badge}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ─── 3. TAB CONTENTS ─── */}
      <main className="traffic-main-content">
        <div className="traffic-container">
          {/* ========================================================================= */}
          {/* TAB 1: 自駕與停車 (PARKING) - 預設與 LINE 優先 */}
          {/* ========================================================================= */}
          {activeTab === "parking" && (
            <div className="traffic-section-fade">
              {/* 警示卡片：車輛無法開進巷內 */}
              <div className="traffic-alert-banner">
                <div className="traffic-alert-banner__icon">
                  <AlertTriangle size={24} aria-hidden="true" />
                </div>
                <div className="traffic-alert-banner__content">
                  <h3>開車必看：民宿在巷內，車輛無法直達門口</h3>
                  <p>
                    你好哇寓所與溝頂民宿皆位於寧靜傳統巷弄內，無專屬私人車位。強烈建議依循下方<strong>「停車 3 步驟」</strong>，先在巷口下放同行親友與行李，駕駛再前往周邊停車場，最為省力順暢！
                  </p>
                </div>
              </div>

              {/* 停車抵達 3 步驟 SOP */}
              <div className="traffic-sop-card">
                <div className="traffic-section-header">
                  <span className="traffic-section-kicker">ARRIVAL SOP</span>
                  <h2 className="traffic-section-title">開車抵達 3 步驟指南</h2>
                  <p className="traffic-section-desc">按照以下順序操作，免去搬運重物與巷弄繞行困擾：</p>
                </div>

                <div className="traffic-sop-grid">
                  {/* Step 1 */}
                  <div className="traffic-sop-step">
                    <div className="traffic-sop-step__badge">步驟 1</div>
                    <div className="traffic-sop-step__icon">
                      <MapPin size={22} />
                    </div>
                    <h4>開至大公路 70 巷口下車</h4>
                    <p>
                      導航設定「大公路 70 巷口」，於巷口路旁臨停 1-2 分鐘，讓同行親友與大件行李先下車，步行 30 秒即可先進民宿。
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=高雄市鹽埕區大公路70巷口"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="traffic-action-btn traffic-action-btn--primary"
                    >
                      <Navigation size={14} />
                      導航至巷口下車處
                    </a>
                  </div>

                  {/* Step 2 */}
                  <div className="traffic-sop-step">
                    <div className="traffic-sop-step__badge">步驟 2</div>
                    <div className="traffic-sop-step__icon">
                      <CircleParking size={22} />
                    </div>
                    <h4>駕駛前往周邊推薦停車場</h4>
                    <p>
                      首選大公路／七賢三路路邊公有車格，若客滿可就近停入室內地下或大型立體停車場（下方提供 6 大停車點一鍵導航）。
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById("parking-lots-list");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="traffic-action-btn traffic-action-btn--outline"
                    >
                      <Compass size={14} />
                      查看下方 6 大停車場
                    </button>
                  </div>

                  {/* Step 3 */}
                  <div className="traffic-sop-step">
                    <div className="traffic-sop-step__badge">步驟 3</div>
                    <div className="traffic-sop-step__icon">
                      <CheckCircle2 size={22} />
                    </div>
                    <h4>停妥後步行 2-5 分鐘進館</h4>
                    <p>
                      停妥愛車後，沿大公路步行進 70 巷，輸入管家透過 LINE 提供之門鎖密碼即可自助開門入住！
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab("map")}
                      className="traffic-action-btn traffic-action-btn--outline"
                    >
                      <MapPin size={14} />
                      查看兩館門牌地圖
                    </button>
                  </div>
                </div>
              </div>

              {/* 6 大推薦停車場清單 */}
              <div id="parking-lots-list" className="traffic-lots-section">
                <div className="traffic-section-header">
                  <span className="traffic-section-kicker">RECOMMENDED PARKING</span>
                  <h2 className="traffic-section-title">周邊推薦停車場一覽</h2>
                  <p className="traffic-section-desc">
                    以下整理距離民宿最近、收費透明的 6 處停車點，點擊<strong>「Google Maps 導航」</strong>即可直接出發：
                  </p>
                </div>

                <div className="traffic-lots-grid">
                  {parkingLots.map((lot, idx) => (
                    <article key={lot.id || idx} className="traffic-lot-card">
                      <div className="traffic-lot-card__head">
                        <div className="traffic-lot-card__tags">
                          {lot.recommendTag && (
                            <span className="traffic-tag traffic-tag--gold">{lot.recommendTag}</span>
                          )}
                          {lot.typeLabel && (
                            <span className="traffic-tag traffic-tag--dark">{lot.typeLabel}</span>
                          )}
                        </div>
                        <span className="traffic-lot-card__walk">
                          <Zap size={13} className="text-gold" />
                          {lot.walkTime || "步行約 3 分鐘"}
                        </span>
                      </div>

                      <h3 className="traffic-lot-card__title">{lot.name}</h3>
                      <p className="traffic-lot-card__addr">{lot.addr}</p>

                      <div className="traffic-lot-card__price-box">
                        <span className="traffic-lot-card__price-label">收費說明</span>
                        <strong className="traffic-lot-card__price-val">{lot.price}</strong>
                      </div>

                      {lot.note && <p className="traffic-lot-card__note">{lot.note}</p>}

                      {lot.features && lot.features.length > 0 && (
                        <div className="traffic-lot-card__features">
                          {lot.features.map((f, i) => (
                            <span key={i} className="traffic-chip">
                              <Check size={12} />
                              {f}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="traffic-lot-card__action">
                        <a
                          href={lot.nav}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="traffic-action-btn traffic-action-btn--primary traffic-action-btn--full"
                        >
                          <Navigation size={15} />
                          開啟 Google Maps 導航
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: 地圖與位置 (MAP) */}
          {/* ========================================================================= */}
          {activeTab === "map" && (
            <div className="traffic-section-fade">
              <div className="traffic-map-wrapper">
                {/* 交通指引實景地圖 */}
                <div className="traffic-map-card">
                  <div className="traffic-map-card__header">
                    <div>
                      <span className="traffic-section-kicker">OFFICIAL MAP</span>
                      <h2 className="traffic-section-title">官方交通指引與下車地圖</h2>
                      <p className="traffic-section-desc">
                        清楚標註大公路 70 巷口下車處、你好哇寓所 (8 號)、溝頂民宿 (6-2 號) 與步行進巷動線。
                      </p>
                    </div>
                    <button
                      type="button"
                      className="traffic-action-btn traffic-action-btn--outline"
                      onClick={() => setIsMapLightboxOpen(true)}
                    >
                      <ZoomIn size={16} />
                      放大全螢幕檢視
                    </button>
                  </div>

                  <div
                    className="traffic-map-image-container"
                    onClick={() => setIsMapLightboxOpen(true)}
                    role="button"
                    tabIndex={0}
                    aria-label="點擊放大交通指引圖"
                  >
                    <Image
                      src="/images/traffic/guide-v3.webp"
                      alt="Hello Stay 官方交通指引圖 溝頂民宿與你好哇寓所"
                      width={1200}
                      height={675}
                      className="traffic-map-image"
                      priority
                    />
                    <div className="traffic-map-image__overlay">
                      <ZoomIn size={24} />
                      <span>點擊放大檢視清晰地圖</span>
                    </div>
                  </div>
                </div>

                {/* 兩館門牌與定位卡片 */}
                <div className="traffic-properties-grid">
                  {properties.map((prop) => (
                    <div key={prop.id} className="traffic-property-card">
                      <div className="traffic-property-card__header">
                        <div className="traffic-property-card__titles">
                          <span className="traffic-tag traffic-tag--gold">{prop.badge}</span>
                          <h3>{prop.name}</h3>
                          <small>{prop.subName}</small>
                        </div>
                        <div className="traffic-property-card__door">
                          <span>門牌</span>
                          <strong>{prop.doorNumber}</strong>
                        </div>
                      </div>

                      <div className="traffic-property-card__address-box">
                        <MapPin size={16} className="text-gold" />
                        <span>{prop.addr}</span>
                      </div>

                      <p className="traffic-property-card__walk-hint">
                        <CheckCircle2 size={14} className="text-gold" />
                        {prop.walkFromAlley}
                      </p>

                      <div className="traffic-property-card__actions">
                        <button
                          type="button"
                          className="traffic-action-btn traffic-action-btn--outline"
                          onClick={() => handleCopy(prop.addr, prop.name)}
                        >
                          {copiedText === prop.name ? <Check size={14} /> : <Copy size={14} />}
                          {copiedText === prop.name ? "已複製地址！" : "複製地址"}
                        </button>
                        <a
                          href={prop.navUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="traffic-action-btn traffic-action-btn--primary"
                        >
                          <Navigation size={14} />
                          開啟步行導航
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 巷口下車處專屬定位 */}
                <div className="traffic-dropoff-box">
                  <div className="traffic-dropoff-box__icon">
                    <CarTaxiFront size={24} />
                  </div>
                  <div className="traffic-dropoff-box__body">
                    <h4>大公路 70 巷口（共用下車點）</h4>
                    <p>高雄市鹽埕區大公路 70 巷口（車輛於此處暫停下行李，再步行 30 秒進巷）</p>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=高雄市鹽埕區大公路70巷8號"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="traffic-action-btn traffic-action-btn--primary"
                  >
                    <Navigation size={14} />
                    開啟下車點 Google Maps
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: 大眾運輸 (TRANSIT) */}
          {/* ========================================================================= */}
          {activeTab === "transit" && (
            <div className="traffic-section-fade">
              <div className="traffic-section-header">
                <span className="traffic-section-kicker">PUBLIC TRANSPORTATION</span>
                <h2 className="traffic-section-title">捷運、高鐵、台鐵與輕軌指引</h2>
                <p className="traffic-section-desc">鹽埕交通四通八達，搭乘捷運出站步行 5 分鐘即可抵達：</p>
              </div>

              <div className="traffic-transit-grid">
                {/* 捷運 */}
                <article className="traffic-transit-card">
                  <div className="traffic-transit-card__head">
                    <div className="traffic-transit-card__icon-wrap">
                      <TramFront size={24} />
                    </div>
                    <div>
                      <span className="traffic-tag traffic-tag--gold">最推薦・無車首選</span>
                      <h3>搭乘高雄捷運（橘線）</h3>
                    </div>
                  </div>
                  <div className="traffic-transit-card__body">
                    <div className="traffic-transit-step-item">
                      <span className="traffic-step-num">1</span>
                      <p>搭乘高雄捷運橘線至<strong>「鹽埕埔站 (O2)」</strong>。</p>
                    </div>
                    <div className="traffic-transit-step-item">
                      <span className="traffic-step-num">2</span>
                      <p>由<strong> 2 號出口</strong>出站，左轉沿大公路直行。</p>
                    </div>
                    <div className="traffic-transit-step-item">
                      <span className="traffic-step-num">3</span>
                      <p>沿大公路步行約 400 公尺（約 5 分鐘），左轉進入<strong>大公路 70 巷</strong>即達。</p>
                    </div>
                  </div>
                  <div className="traffic-transit-card__foot">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=你好哇寓所&travelmode=walking"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="traffic-action-btn traffic-action-btn--primary traffic-action-btn--full"
                    >
                      <Navigation size={15} />
                      開啟捷運步行導航
                    </a>
                  </div>
                </article>

                {/* 高鐵 / 台鐵新左營站 */}
                <article className="traffic-transit-card">
                  <div className="traffic-transit-card__head">
                    <div className="traffic-transit-card__icon-wrap">
                      <Train size={24} />
                    </div>
                    <div>
                      <span className="traffic-tag traffic-tag--dark">外縣市旅客</span>
                      <h3>高鐵左營站／台鐵新左營</h3>
                    </div>
                  </div>
                  <div className="traffic-transit-card__body">
                    <div className="traffic-transit-step-item">
                      <span className="traffic-step-num">1</span>
                      <p>於高鐵左營站轉搭<strong>捷運紅線</strong>（往小港方向）。</p>
                    </div>
                    <div className="traffic-transit-step-item">
                      <span className="traffic-step-num">2</span>
                      <p>於<strong>「美麗島站 (R10/O5)」</strong>轉乘<strong>捷運橘線</strong>（往哈瑪星方向）。</p>
                    </div>
                    <div className="traffic-transit-step-item">
                      <span className="traffic-step-num">3</span>
                      <p>於<strong>「鹽埕埔站 (O2)」</strong>下車，2 號出口步行 5 分鐘進巷（全程約 25 分鐘）。</p>
                    </div>
                  </div>
                  <div className="traffic-transit-card__foot">
                    <span className="traffic-transit-tip">轉乘僅需 1 次，捷運班次密集便利</span>
                  </div>
                </article>

                {/* 高雄火車站 */}
                <article className="traffic-transit-card">
                  <div className="traffic-transit-card__head">
                    <div className="traffic-transit-card__icon-wrap">
                      <TrainFrontTunnel size={24} />
                    </div>
                    <div>
                      <span className="traffic-tag traffic-tag--dark">台鐵旅客</span>
                      <h3>高雄火車站（台鐵）</h3>
                    </div>
                  </div>
                  <div className="traffic-transit-card__body">
                    <div className="traffic-transit-step-item">
                      <span className="traffic-step-num">1</span>
                      <p>於高雄車站搭乘<strong>捷運紅線</strong>（往小港方向）。</p>
                    </div>
                    <div className="traffic-transit-step-item">
                      <span className="traffic-step-num">2</span>
                      <p>於<strong>「美麗島站」</strong>轉乘<strong>捷運橘線</strong>（往哈瑪星方向）。</p>
                    </div>
                    <div className="traffic-transit-step-item">
                      <span className="traffic-step-num">3</span>
                      <p>於<strong>「鹽埕埔站 (O2)」</strong>下車，2 號出口步行 5 分鐘（全程約 15 分鐘）。</p>
                    </div>
                  </div>
                  <div className="traffic-transit-card__foot">
                    <span className="traffic-transit-tip">搭乘計程車約 10 分鐘（車資約 NT$150-180）</span>
                  </div>
                </article>

                {/* 高雄輕軌 */}
                <article className="traffic-transit-card">
                  <div className="traffic-transit-card__head">
                    <div className="traffic-transit-card__icon-wrap">
                      <TramFront size={24} />
                    </div>
                    <div>
                      <span className="traffic-tag traffic-tag--gold">漫遊高雄</span>
                      <h3>搭乘高雄輕軌（環狀線）</h3>
                    </div>
                  </div>
                  <div className="traffic-transit-card__body">
                    <div className="traffic-transit-step-item">
                      <span className="traffic-step-num">1</span>
                      <p>搭乘高雄輕軌至<strong>「文武聖殿站 (C16)」</strong>。</p>
                    </div>
                    <div className="traffic-transit-step-item">
                      <span className="traffic-step-num">2</span>
                      <p>出站後沿大公路向北直行約 350 公尺（約 4 分鐘）。</p>
                    </div>
                    <div className="traffic-transit-step-item">
                      <span className="traffic-step-num">3</span>
                      <p>右轉進入<strong>大公路 70 巷</strong>即達兩館。</p>
                    </div>
                  </div>
                  <div className="traffic-transit-card__foot">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=你好哇寓所&travelmode=walking"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="traffic-action-btn traffic-action-btn--primary traffic-action-btn--full"
                    >
                      <Navigation size={15} />
                      開啟輕軌步行導航
                    </a>
                  </div>
                </article>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: 計程車與叫車 (TAXI) */}
          {/* ========================================================================= */}
          {activeTab === "taxi" && (
            <div className="traffic-section-fade">
              <div className="traffic-section-header">
                <span className="traffic-section-kicker">TAXI & UBER</span>
                <h2 className="traffic-section-title">計程車與 Uber 叫車指引</h2>
                <p className="traffic-section-desc">帶著全家長輩、幼童或多件大行李，叫車直達巷口最省力：</p>
              </div>

              <div className="traffic-taxi-box">
                <div className="traffic-taxi-box__content">
                  <div className="traffic-taxi-box__badge">叫車下車定位教學</div>
                  <h3>叫車 App 或向司機報路方式</h3>
                  <p>
                    搭乘 Uber、55688 台灣大車隊或一般計程車時，建議將下車目的地直接設為<strong>「大公路 70 巷口」</strong>或<strong>「你好哇寓所」</strong>。
                  </p>

                  <div className="traffic-taxi-address-card">
                    <div className="traffic-taxi-address-card__info">
                      <span className="traffic-taxi-address-card__label">建議定位地址</span>
                      <strong className="traffic-taxi-address-card__val">
                        高雄市鹽埕區大公路 70 巷口（或 8 號）
                      </strong>
                    </div>
                    <button
                      type="button"
                      className="traffic-action-btn traffic-action-btn--outline"
                      onClick={() => handleCopy("高雄市鹽埕區大公路70巷口", "taxi-addr")}
                    >
                      {copiedText === "taxi-addr" ? <Check size={14} /> : <Copy size={14} />}
                      {copiedText === "taxi-addr" ? "已複製地址！" : "複製地址"}
                    </button>
                  </div>

                  <div className="traffic-taxi-hints">
                    <div className="traffic-taxi-hint-item">
                      <CheckCircle2 size={16} className="text-gold" />
                      <span>下車後巷口旁即為 70 巷，步行約 20~30 秒即可看到民宿門牌。</span>
                    </div>
                    <div className="traffic-taxi-hint-item">
                      <CheckCircle2 size={16} className="text-gold" />
                      <span>車輛請停於巷口路旁讓同行者下車，請勿要求司機駛入巷弄以避免會車困難。</span>
                    </div>
                  </div>

                  <div className="traffic-taxi-actions">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=高雄市鹽埕區大公路70巷8號"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="traffic-action-btn traffic-action-btn--primary"
                    >
                      <Navigation size={15} />
                      開啟 Google Maps 定位
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: 常見問題 (FAQ) */}
          {/* ========================================================================= */}
          {activeTab === "faq" && (
            <div className="traffic-section-fade">
              <div className="traffic-section-header">
                <span className="traffic-section-kicker">FREQUENTLY ASKED QUESTIONS</span>
                <h2 className="traffic-section-title">交通與停車常見問題</h2>
                <p className="traffic-section-desc">彙整旅客出發前與抵達時最常詢問的 6 大疑問：</p>
              </div>

              <div className="traffic-faq-grid">
                {trafficFaqs.map((faq) => {
                  const isOpen = !!openFaqMap[faq.id];
                  return (
                    <article key={faq.id} className={`traffic-faq-card ${isOpen ? "is-open" : ""}`}>
                      <button
                        type="button"
                        className="traffic-faq-card__trigger"
                        onClick={() => toggleFaq(faq.id)}
                        aria-expanded={isOpen}
                      >
                        <div className="traffic-faq-card__trigger-text">
                          <span className="traffic-tag traffic-tag--gold">{faq.tag}</span>
                          <span className="traffic-faq-card__question">{faq.question}</span>
                        </div>
                        <ChevronDown
                          size={18}
                          className={`traffic-faq-card__chevron ${isOpen ? "is-open" : ""}`}
                          aria-hidden="true"
                        />
                      </button>

                      {isOpen && (
                        <div className="traffic-faq-card__body">
                          <p style={{ whiteSpace: "pre-line" }}>{faq.answer}</p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── 4. BOTTOM CONCIERGE & EMERGENCY ASSISTANCE BAR ─── */}
          <aside className="traffic-bottom-bar">
            <div className="traffic-bottom-bar__inner">
              <div>
                <h3 className="traffic-bottom-bar__title">抵達現場遇到問題或需要管家協助？</h3>
                <p className="traffic-bottom-bar__desc">
                  我們提供 LINE 官方管家 1 對 1 即時在線服務，緊急情況亦可直接撥打緊急專線電話。
                </p>
              </div>
              <div className="traffic-bottom-bar__actions">
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="traffic-action-btn traffic-action-btn--line"
                >
                  <MessageSquare size={16} aria-hidden="true" />
                  LINE 官方管家諮詢
                </a>
                <a
                  href="tel:0932828922"
                  className="traffic-action-btn traffic-action-btn--outline-light"
                >
                  <PhoneCall size={16} aria-hidden="true" />
                  緊急電話 0932-828-922
                </a>
                <Link href="/book" className="traffic-action-btn traffic-action-btn--primary">
                  即時查空房
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ─── LIGHTBOX MODAL ─── */}
      {isMapLightboxOpen && (
        <div
          className="traffic-modal-backdrop"
          onClick={() => setIsMapLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="交通指引地圖放大檢視"
        >
          <div className="traffic-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="traffic-modal-close"
              onClick={() => setIsMapLightboxOpen(false)}
              aria-label="關閉地圖放大"
            >
              <X size={20} />
            </button>
            <div className="traffic-modal-image-wrap">
              <Image
                src="/images/traffic/guide-v3.webp"
                alt="Hello Stay 官方交通指引圖 溝頂民宿與你好哇寓所"
                width={1600}
                height={900}
                className="traffic-modal-image"
                priority
              />
            </div>
            <p className="traffic-modal-caption">
              Hello Stay 官方交通與停車指引地圖（紅箭頭標示大公路 70 巷口下車處）
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
