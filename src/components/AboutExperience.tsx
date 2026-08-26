"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Heart,
  Sparkles,
  MapPin,
  CheckCircle2,
  Award,
  ChevronDown,
  ArrowRight,
  Building2,
  Flame,
  Clock,
  Film,
  CalendarCheck,
  MessageCircle,
  Tv,
  Play,
  ExternalLink,
} from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const aboutFaqs: FaqItem[] = [
  {
    question: "包棟期間會有其他陌生客人或管家同住嗎？",
    answer:
      "完全不會！Hello Stay 實行全棟獨立包棟制，入住期間整棟建築包含所有公共空間（中島廚房、交誼廳、麻將桌）皆由您的團體專屬獨享，絕不分拆出租給其他人、無陌生人同住。客房依預訂方案開放，未開放之房間會上鎖以確保房務維護。管家僅在入住接待與退房時提供必要協助，給您百分之百的私密與自在。",
  },
  {
    question: "民宿有提供開伙備餐與麻將娛樂設備嗎？",
    answer:
      "有的！「你好哇寓所」1 樓設有挑高豪華中島廚房（配置雙口 IH 爐、微波爐、烤箱、雙門大冰箱、RO 飲水機與完整鍋碗餐具）與手動麻將桌，非常適合煮火鍋或備餐聚會；「溝頂民宿」4 樓交誼廳亦配備微波爐、流理台、冰箱與休閒麻將桌。為維護老街安寧，夜間 23:00 後請於室內降低音量。",
  },
  {
    question: "可以開立統編收據報帳嗎？",
    answer:
      "可以！Hello Stay 為高雄市政府合法登記民宿，我們提供蓋有合法民宿專用章、可填寫公司抬頭與統一編號的合法收據（免用統一發票收據），完全符合公司企業、學校機關與團體報帳核銷規範。",
  },
  {
    question: "兩館之間距離多遠？如果人數超過 26 人怎麼安排？",
    answer:
      "「你好哇寓所」與「溝頂民宿」位於同一巷弄內，兩館門口步行僅約 5 秒！27 至 36 人的大型團體可選擇「雙館包棟」，白天全部聚在你好哇寓所的大中島廚房與挑高空間熱鬧交流，晚上分流兩館共 10 間獨立套房安靜好眠，兼顧熱鬧聚會與睡眠品質。",
  },
  {
    question: "如何預訂與確認即時報價？",
    answer:
      "官網提供透明即時的線上查房系統，您可以前往「即時查空房」選擇入住日期與人數試算精準金額；若有特殊包棟需求、客製化活動或超過 36 人，也歡迎直接加入 Hello Stay 官方 LINE（@hellostay）由專人客服即時為您確認與保留檔期。",
  },
];

const mediaAppearances = [
  {
    show: "《我們回家吧 2》",
    cast: "主持人 曾寶儀",
    theme: "EP9 高雄鹽埕篇・走進歷史街區老屋的溫暖人情",
    tag: "文化紀實節目",
    url: "https://www.youtube.com/watch?v=L09FRVlfPgU",
  },
  {
    show: "《綜藝玩很大》",
    cast: "吳宗憲、KID、坤達",
    theme: "高雄鹽埕外景特輯・熱鬧歡聚的包棟體驗",
    tag: "人氣外景實境",
    url: "https://youtu.be/ohgLr40pOrA?t=99",
  },
  {
    show: "《我的明星村長》",
    cast: "卜學亮、郭泓志、姚元浩",
    theme: "在地深度走訪・體驗鹽埕老屋生活美學",
    tag: "實境體驗綜藝",
    url: "https://youtu.be/IveYmupy8XM?t=2657",
  },
];

const commitments = [
  {
    icon: ShieldCheck,
    title: "高市府合法登記民宿",
    subtitle: "你好哇 131 號 · 溝頂 163 號",
    desc: "通過高市府觀光局嚴格消防與建管審查，領有合法民宿登記證照，合法經營讓您的團體假期安心有保障。",
  },
  {
    icon: Award,
    title: "全額公共意外責任險",
    subtitle: "富邦產險高額投保",
    desc: "投保高額公共意外責任險，無論是家族長輩出遊或孩童奔跑，每一位入住旅客的權益與安全都受到周全保護。",
  },
  {
    icon: Flame,
    title: "合格消防與高溫消毒布草",
    subtitle: "安全防護與專業洗滌",
    desc: "全棟配置合格滅火器、火警偵煙警報器、緊急照明與逃生指示；每組床單被套皆送經專業工廠高溫殺菌洗滌。",
  },
  {
    icon: MapPin,
    title: "鹽埕在地真誠生活引路",
    subtitle: "步行 5-10 分抵捷運與景點",
    desc: "步行 5 分鐘抵捷運鹽埕埔站、10 分鐘漫步駁二與大港橋；下樓就是鴨肉珍、冬粉王、婆婆冰等數十年排隊老字號。",
  },
];

const propertiesShowcase = [
  {
    id: "hellohouse",
    name: "你好哇寓所 Hello House",
    tagline: "8 至 26 人 · 旗艦中島廚房聚會首選",
    desc: "挑高 56m² 寬敞交誼空間，配置大型中島吧台、雙口 IH 爐、手動麻將與 43 吋聯網電視。全棟 6 間獨立衛浴套房，大家庭與好友聚會首選。",
    image: "/images/hellohouse/cover.webp",
    specs: ["8-26 人包棟", "6 間獨立套房", "56m² 中島廚房", "手動麻將桌"],
    href: "/hellohouse",
    linkText: "查看你好哇空間詳情",
    primary: true,
  },
  {
    id: "godin",
    name: "溝頂民宿 Godin House",
    tagline: "4 至 12 人 · 五層獨棟老街慢活",
    desc: "整棟獨立五層樓建築，4 樓設有專屬休閒交誼廳、手動麻將與微波備餐空間。4 間客房皆有獨立衛浴，適合小家庭與好友漫遊鹽埕。",
    image: "/images/godin/cover-1.webp",
    specs: ["4-12 人包棟", "4 間獨立套房", "4F 專屬交誼廳", "休閒麻將桌"],
    href: "/godin",
    linkText: "查看溝頂空間詳情",
    primary: false,
  },
  {
    id: "dual",
    name: "雙館包棟 Dual Villas",
    tagline: "27 至 36 人 · 兩館相鄰步行僅 5 秒",
    desc: "你好哇寓所與溝頂民宿緊鄰對門！白天全員聚在你好哇寓所大中島廚房同樂，夜晚分流兩館共 10 間獨立套房，兼顧盛大歡聚與高品質睡眠。",
    image: "/images/hellohouse/1000.webp",
    specs: ["27-36 人包棟", "10 間獨立套房", "兩館相鄰 5 秒", "大中島+雙交誼廳"],
    href: "/compare",
    linkText: "看兩館與雙館方案比較",
    primary: false,
  },
];

export default function AboutExperience() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="about-root">
      {/* 1. Hero 品牌主視覺與核心標語 */}
      <section className="about-hero">
        <div className="about-container">
          <div className="about-hero__badge">
            <Sparkles size={15} className="about-hero__badge-icon" />
            <span>ABOUT HELLO STAY · EST. 2017</span>
          </div>

          <h1 className="about-hero__title">
            走進老鹽埕的煙火氣，<br className="hidden sm:inline" />
            把最重要的人聚在一起
          </h1>

          <p className="about-hero__desc">
            2017 年，我們在高雄鹽埕的歷史巷弄裡，推開了第一扇老屋大門。
            我們始終相信：一趟美好的團體旅程，最珍貴的不是住得多奢華，而是所有人不用被拆散在不同房號與樓層——在大中島前熱騰騰地煮一鍋湯、在客廳打牌暢聊到深夜，在屬於自己的獨立天地裡，享受無拘無束的歡聚時光。
          </p>

          {/* 四大核心信任數據 */}
          <div className="about-hero__stats">
            <div className="about-stat-item">
              <span className="about-stat-number">2017</span>
              <span className="about-stat-label">深耕高雄老鹽埕</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">2 棟</span>
              <span className="about-stat-label">高市府合法獨立包棟</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">4-36 人</span>
              <span className="about-stat-label">彈性專屬包棟方案</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">4.5 ★</span>
              <span className="about-stat-label">Google 75+ 則真實好評</span>
            </div>
          </div>

          {/* 氛圍三聯圖畫廊 */}
          <div className="about-hero__gallery">
            <div className="about-hero__gallery-item">
              <Image
                src="/images/hellohouse/cover.webp"
                alt="Hello Stay 你好哇寓所挑高中島吧台與客廳實景"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="about-hero__gallery-img"
                priority
              />
              <span className="about-hero__gallery-tag">你好哇寓所・挑高中島吧台</span>
            </div>
            <div className="about-hero__gallery-item">
              <Image
                src="/images/hellohouse/photo5.webp"
                alt="Hello Stay 鹽埕老屋巷弄街區與生活氛圍"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="about-hero__gallery-img"
              />
              <span className="about-hero__gallery-tag">鹽埕老街・步調慢活生活圈</span>
            </div>
            <div className="about-hero__gallery-item">
              <Image
                src="/images/godin/cover-1.webp"
                alt="Hello Stay 溝頂民宿 4F 專屬交誼長桌與麻將空間"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="about-hero__gallery-img"
              />
              <span className="about-hero__gallery-tag">溝頂民宿・4F 專屬交誼廳</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 品牌起源與初衷（雜誌雙欄圖文對照） */}
      <section className="about-story-section">
        <div className="about-container">
          <div className="about-story-grid">
            <div className="about-story-copy">
              <div className="about-section-badge">
                <Heart size={14} />
                <span>OUR STORY & PHILOSOPHY</span>
              </div>
              <h2 className="about-section-title">
                從解決「團體出遊被拆散」的痛點開始
              </h2>
              <div className="about-story-text">
                <p>
                  每次和一大家子、好幾組家庭或多年摯友出遊，最常遇到的遺憾就是住飯店時被分散在不同樓層與房號，回到房間後各自關門；想找個地方一起吃宵夜喝酒聊天，只能擠在某個狹窄的雙人房床邊，既拘束又擔心吵到隔壁房客。
                </p>
                <p>
                  Hello Stay 從一開始就決定走不一樣的路：我們不把客人塞進千篇一律的標準飯店房，而是將鹽埕充滿歷史底蘊的老屋細心改造，打造成專屬於團體的溫馨之居。
                </p>
                <p>
                  我們堅持「全棟獨立包棟、全獨立衛浴套房」——讓大人能在挑高中島廚房前煮熱騰騰的火鍋、在客廳打麻將暢聊到深夜，孩子在安全的專屬空間自在玩耍，每個人都能在熱鬧與隱私之間找到最舒適的平衡。
                </p>
              </div>

              <div className="about-story-highlights">
                <div className="about-highlight-pill">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>整棟專屬獨享，絕無陌生人混住</span>
                </div>
                <div className="about-highlight-pill">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>每間客房皆為獨立衛浴套房，作息不打擾</span>
                </div>
                <div className="about-highlight-pill">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>步出巷弄即是老鹽埕美食與駁二藝術特區</span>
                </div>
              </div>
            </div>

            <div className="about-story-visual">
              <div className="about-story-card">
                <div className="about-story-card__image-wrap">
                  <Image
                    src="/images/hellohouse/photo1.webp"
                    alt="Hello Stay 溫馨熱鬧的團體聚會交誼空間"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="about-story-card__image"
                  />
                </div>
                <div className="about-story-card__content">
                  <span className="about-story-card__quote-mark">“</span>
                  <blockquote className="about-story-card__quote">
                    包棟不只是一晚住宿，更是所有重要的人聚在一起、創造無可取代回憶的時光。
                  </blockquote>
                  <div className="about-story-card__author">
                    <strong>Hello Stay 團隊</strong>
                    <span>深耕鹽埕 · 用心款待</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 四大款待基石與安全底線 */}
      <section className="about-commitments-section">
        <div className="about-container">
          <div className="about-section-header">
            <div className="about-section-badge">
              <ShieldCheck size={14} />
              <span>OUR COMMITMENTS</span>
            </div>
            <h2 className="about-section-title">四大款待基石與安全底線</h2>
            <p className="about-section-subtitle">
              團體出遊，安全與安心是第一前提。我們把合法認證、保險與消防細節公開透明呈現。
            </p>
          </div>

          <div className="about-commitments-grid">
            {commitments.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="about-commitment-card">
                  <div className="about-commitment-card__icon-wrap">
                    <IconComponent size={24} className="about-commitment-card__icon" />
                  </div>
                  <h3 className="about-commitment-card__title">{item.title}</h3>
                  <span className="about-commitment-card__subtitle">{item.subtitle}</span>
                  <p className="about-commitment-card__desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. 精選館別陣容與空間魅力 */}
      <section className="about-properties-section">
        <div className="about-container">
          <div className="about-section-header">
            <div className="about-section-badge">
              <Building2 size={14} />
              <span>THE PORTFOLIO</span>
            </div>
            <h2 className="about-section-title">依人數與聚會風格，選擇最契合的空間</h2>
            <p className="about-section-subtitle">
              兩大可訂館別各具特色，亦可無縫聯訂雙館；大智若愚電梯館別持續規劃中。
            </p>
          </div>

          <div className="about-properties-grid">
            {propertiesShowcase.map((prop) => (
              <article
                key={prop.id}
                className={`about-property-card ${prop.primary ? "about-property-card--featured" : ""}`}
              >
                <div className="about-property-card__image-wrap">
                  <Image
                    src={prop.image}
                    alt={prop.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="about-property-card__image"
                  />
                  {prop.primary && (
                    <span className="about-property-card__badge">熱門推薦</span>
                  )}
                </div>

                <div className="about-property-card__body">
                  <h3 className="about-property-card__title">{prop.name}</h3>
                  <p className="about-property-card__tagline">{prop.tagline}</p>
                  <p className="about-property-card__desc">{prop.desc}</p>

                  <div className="about-property-card__specs">
                    {prop.specs.map((spec, sIdx) => (
                      <span key={sIdx} className="about-property-card__spec-pill">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <Link href={prop.href} className="about-property-card__btn">
                    <span>{prop.linkText}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* 規劃中館別說明 */}
          <div className="about-dazhi-note">
            <div className="about-dazhi-note__badge">規劃中館別</div>
            <div className="about-dazhi-note__content">
              <strong>大智若愚 Dazhi · 電梯旗艦館別</strong>
              <p>
                規劃中的全新電梯獨棟館別，未來將提供長輩無障礙動線與更豐富的空間配置。目前仍在籌備階段，尚未開放房況與報價，正式上線資訊將於官網公告。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 影視媒體足跡與文化肯定 */}
      <section className="about-media-section">
        <div className="about-container">
          <div className="about-section-header">
            <div className="about-section-badge">
              <Film size={14} />
              <span>MEDIA & RECOGNITION</span>
            </div>
            <h2 className="about-section-title">影視節目青睞與在地足跡</h2>
            <p className="about-section-subtitle">
              感謝各大外景綜藝與文化紀實節目選為高雄鹽埕拍攝場景，見證老屋再生的生命力。
            </p>
          </div>

          <div className="about-media-grid">
            {mediaAppearances.map((item, index) => (
              <div key={index} className="about-media-card">
                <div className="about-media-card__top">
                  <span className="about-media-card__tag">{item.tag}</span>
                  <Tv size={18} className="text-amber-700/60" />
                </div>
                <h3 className="about-media-card__show">{item.show}</h3>
                <span className="about-media-card__cast">{item.cast}</span>
                <p className="about-media-card__theme">{item.theme}</p>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-media-card__link"
                  >
                    <Play size={13} className="fill-current" />
                    <span>觀看 YouTube 節目片段</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 旅人常見問題 FAQ 手風琴 */}
      <section className="about-faq-section">
        <div className="about-container">
          <div className="about-section-header">
            <div className="about-section-badge">
              <Clock size={14} />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="about-section-title">旅人最常詢問的品牌與入住問題</h2>
            <p className="about-section-subtitle">
              若有任何客製化需求或疑問，我們隨時樂意為您解答。
            </p>
          </div>

          <div className="about-faq-list">
            {aboutFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`about-faq-item ${isOpen ? "about-faq-item--open" : ""}`}
                >
                  <button
                    type="button"
                    className="about-faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`about-faq-icon ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="about-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. 底部直訂與諮詢 CTA */}
      <section className="about-cta-section">
        <div className="about-container">
          <div className="about-cta-card">
            <div className="about-cta-content">
              <div className="about-cta-badge">
                <CalendarCheck size={15} />
                <span>DIRECT BOOKING & INQUIRY</span>
              </div>
              <h2 className="about-cta-title">
                走進老鹽埕，開啟專屬於你們的包棟時光
              </h2>
              <p className="about-cta-desc">
                無論是三代同堂家族旅遊、多年好友慶生狂歡，或公司團隊移地聚會，
                Hello Stay 都在鹽埕為您準備好最溫暖自在的家。
              </p>
              <div className="about-cta-actions">
                <Link href="/compare" className="about-cta-btn about-cta-btn--secondary">
                  看方案與房型比較
                </Link>
                <Link href="/book" className="about-cta-btn about-cta-btn--primary">
                  即時查詢空房與報價
                </Link>
                <a
                  href="https://lin.ee/atCiMQw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-cta-btn about-cta-btn--line"
                >
                  <MessageCircle size={17} />
                  <span>LINE 專人諮詢</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scoped CSS styling */}
      <style jsx>{`
        .about-root {
          --ink: #181b19;
          --text-muted: #5f6b64;
          --paper: #f8f6f0;
          --card-bg: #ffffff;
          --accent: #c29b61;
          --accent-dark: #a88047;
          --accent-soft: #f4ecdf;
          --line: #e6e3d8;
          --radius-lg: 20px;
          --radius-md: 14px;
          --radius-sm: 8px;
          background: var(--paper);
          color: var(--ink);
          font-family: inherit;
        }

        .about-container {
          width: min(1200px, calc(100% - 48px));
          margin: 0 auto;
        }

        @media (max-width: 640px) {
          .about-container {
            width: calc(100% - 32px);
          }
        }

        /* 1. Hero Section */
        .about-hero {
          padding-top: calc(var(--nav-h, 88px) + 24px);
          padding-bottom: 60px;
        }

        .about-hero__badge,
        .about-section-badge,
        .about-cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          border-radius: 999px;
          background: var(--accent-soft);
          color: var(--accent-dark);
          font-size: 0.76rem;
          font-weight: 750;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .about-hero__title {
          font-family: var(--serif, Georgia, serif);
          font-size: clamp(2.1rem, 3.8vw, 3.4rem);
          font-weight: 650;
          line-height: 1.25;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin: 0 0 20px 0;
          text-wrap: balance;
        }

        .about-hero__desc {
          font-size: clamp(1.02rem, 1.25vw, 1.15rem);
          line-height: 1.85;
          color: var(--text-muted);
          max-width: 860px;
          margin: 0 0 36px 0;
          text-wrap: pretty;
        }

        .about-hero__stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 40px;
        }

        @media (max-width: 768px) {
          .about-hero__stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        .about-stat-item {
          background: #ffffff;
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 4px 16px rgba(24, 27, 25, 0.03);
        }

        .about-stat-number {
          font-family: var(--serif, Georgia, serif);
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 700;
          color: var(--accent-dark);
          line-height: 1.2;
        }

        .about-stat-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .about-hero__gallery {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        @media (max-width: 768px) {
          .about-hero__gallery {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        .about-hero__gallery-item {
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #eae8df;
          box-shadow: 0 10px 24px rgba(24, 27, 25, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }

        .about-hero__gallery-img {
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .about-hero__gallery-item:hover .about-hero__gallery-img {
          transform: scale(1.04);
        }

        .about-hero__gallery-tag {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(24, 27, 25, 0.8);
          color: #ffffff;
          font-size: 0.74rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 999px;
          backdrop-filter: blur(8px);
          z-index: 2;
        }

        /* 2. Story Section */
        .about-story-section {
          padding: 80px 0;
          background: #ffffff;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }

        .about-story-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 56px;
          align-items: center;
        }

        @media (max-width: 960px) {
          .about-story-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .about-section-title {
          font-family: var(--serif, Georgia, serif);
          font-size: clamp(1.65rem, 2.4vw, 2.3rem);
          font-weight: 650;
          line-height: 1.3;
          color: var(--ink);
          margin: 0 0 18px 0;
          text-wrap: balance;
        }

        .about-section-subtitle {
          font-size: 1rem;
          color: var(--text-muted);
          margin: 0 0 32px 0;
          max-width: 680px;
          line-height: 1.7;
        }

        .about-story-text {
          display: grid;
          gap: 16px;
          font-size: 0.98rem;
          line-height: 1.85;
          color: #3b423e;
          margin-bottom: 28px;
        }

        .about-story-highlights {
          display: grid;
          gap: 12px;
        }

        .about-highlight-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--paper);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--ink);
          border: 1px solid var(--line);
        }

        .about-story-card {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 16px 40px -10px rgba(24, 27, 25, 0.08);
        }

        .about-story-card__image-wrap {
          position: relative;
          aspect-ratio: 16 / 10;
          width: 100%;
          background: #e4e2d8;
        }

        .about-story-card__image {
          object-fit: cover;
        }

        .about-story-card__content {
          padding: 28px 30px;
          position: relative;
        }

        .about-story-card__quote-mark {
          position: absolute;
          top: 10px;
          left: 24px;
          font-family: var(--serif, Georgia, serif);
          font-size: 3.5rem;
          line-height: 1;
          color: rgba(194, 155, 97, 0.25);
          pointer-events: none;
        }

        .about-story-card__quote {
          position: relative;
          z-index: 1;
          font-family: var(--serif, Georgia, serif);
          font-size: 1.08rem;
          font-style: italic;
          line-height: 1.7;
          color: var(--ink);
          margin: 0 0 18px 0;
        }

        .about-story-card__author {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 0.84rem;
        }

        .about-story-card__author strong {
          color: var(--accent-dark);
          font-weight: 700;
        }

        .about-story-card__author span {
          color: var(--text-muted);
        }

        /* 3. Commitments Section */
        .about-commitments-section {
          padding: 80px 0;
        }

        .about-section-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 48px auto;
        }

        .about-commitments-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
        }

        @media (max-width: 1024px) {
          .about-commitments-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .about-commitments-grid {
            grid-template-columns: 1fr;
          }
        }

        .about-commitment-card {
          background: #ffffff;
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 24px rgba(24, 27, 25, 0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .about-commitment-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(24, 27, 25, 0.08);
          border-color: rgba(194, 155, 97, 0.5);
        }

        .about-commitment-card__icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--accent-soft);
          color: var(--accent-dark);
          display: grid;
          place-items: center;
          margin-bottom: 20px;
        }

        .about-commitment-card__title {
          font-family: var(--serif, Georgia, serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 6px 0;
        }

        .about-commitment-card__subtitle {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--accent-dark);
          margin-bottom: 12px;
        }

        .about-commitment-card__desc {
          font-size: 0.88rem;
          line-height: 1.7;
          color: var(--text-muted);
          margin: 0;
        }

        /* 4. Properties Showcase */
        .about-properties-section {
          padding: 80px 0;
          background: #ffffff;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }

        .about-properties-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          margin-bottom: 36px;
        }

        @media (max-width: 960px) {
          .about-properties-grid {
            grid-template-columns: 1fr;
          }
        }

        .about-property-card {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(24, 27, 25, 0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .about-property-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px rgba(24, 27, 25, 0.09);
        }

        .about-property-card--featured {
          border-color: rgba(194, 155, 97, 0.6);
        }

        .about-property-card__image-wrap {
          position: relative;
          aspect-ratio: 16 / 10;
          width: 100%;
          background: #eae8df;
        }

        .about-property-card__image {
          object-fit: cover;
        }

        .about-property-card__badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: var(--accent);
          color: #ffffff;
          font-size: 0.74rem;
          font-weight: 750;
          padding: 4px 10px;
          border-radius: 999px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .about-property-card__body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .about-property-card__title {
          font-family: var(--serif, Georgia, serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 6px 0;
        }

        .about-property-card__tagline {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--accent-dark);
          margin: 0 0 12px 0;
        }

        .about-property-card__desc {
          font-size: 0.88rem;
          line-height: 1.65;
          color: var(--text-muted);
          margin: 0 0 18px 0;
          flex-grow: 1;
        }

        .about-property-card__specs {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }

        .about-property-card__spec-pill {
          background: #ffffff;
          border: 1px solid var(--line);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--ink);
        }

        .about-property-card__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          min-height: 44px;
          border-radius: var(--radius-sm);
          background: #ffffff;
          color: var(--ink);
          border: 1px solid var(--line);
          font-size: 0.86rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .about-property-card__btn:hover {
          background: var(--ink);
          color: #ffffff;
          border-color: var(--ink);
        }

        .about-dazhi-note {
          display: flex;
          gap: 20px;
          background: var(--paper);
          border: 1px dashed rgba(194, 155, 97, 0.5);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          align-items: center;
        }

        @media (max-width: 640px) {
          .about-dazhi-note {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }

        .about-dazhi-note__badge {
          background: var(--accent-soft);
          color: var(--accent-dark);
          font-size: 0.78rem;
          font-weight: 750;
          padding: 6px 12px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .about-dazhi-note__content strong {
          display: block;
          font-size: 0.94rem;
          color: var(--ink);
          margin-bottom: 4px;
        }

        .about-dazhi-note__content p {
          font-size: 0.86rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin: 0;
        }

        /* 5. Media Section */
        .about-media-section {
          padding: 80px 0;
        }

        .about-media-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        @media (max-width: 768px) {
          .about-media-grid {
            grid-template-columns: 1fr;
          }
        }

        .about-media-card {
          background: #ffffff;
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 6px 20px rgba(24, 27, 25, 0.03);
        }

        .about-media-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .about-media-card__tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent-dark);
          background: var(--accent-soft);
          padding: 3px 8px;
          border-radius: 4px;
        }

        .about-media-card__show {
          font-family: var(--serif, Georgia, serif);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 6px 0;
        }

        .about-media-card__cast {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--accent-dark);
          margin-bottom: 12px;
        }

        .about-media-card__theme {
          font-size: 0.86rem;
          line-height: 1.65;
          color: var(--text-muted);
          margin: 0;
          flex-grow: 1;
        }

        .about-media-card__link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 16px;
          padding: 8px 14px;
          border-radius: var(--radius-sm);
          background: var(--accent-soft);
          color: var(--accent-dark);
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
          width: fit-content;
        }

        .about-media-card__link:hover {
          background: var(--accent);
          color: #181b19;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(194, 155, 97, 0.3);
        }

        /* 6. FAQ Section */
        .about-faq-section {
          padding: 80px 0;
          background: #ffffff;
          border-top: 1px solid var(--line);
        }

        .about-faq-list {
          max-width: 800px;
          margin: 0 auto;
          display: grid;
          gap: 14px;
        }

        .about-faq-item {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color 0.25s ease;
        }

        .about-faq-item--open {
          border-color: rgba(194, 155, 97, 0.6);
        }

        .about-faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--ink);
          gap: 16px;
        }

        .about-faq-icon {
          color: var(--accent-dark);
          transition: transform 0.25s ease;
          flex-shrink: 0;
        }

        .about-faq-answer {
          padding: 0 24px 20px 24px;
          font-size: 0.92rem;
          line-height: 1.75;
          color: #434c46;
          border-top: 1px solid rgba(230, 227, 216, 0.6);
          margin-top: 4px;
          padding-top: 16px;
        }

        .about-faq-answer p {
          margin: 0;
        }

        /* 7. CTA Section */
        .about-cta-section {
          padding: 80px 0 100px 0;
        }

        .about-cta-card {
          background: linear-gradient(135deg, #181b19 0%, #252b27 100%);
          border-radius: var(--radius-lg);
          padding: clamp(36px, 6vw, 64px);
          color: #ffffff;
          box-shadow: 0 24px 60px -12px rgba(24, 27, 25, 0.35);
          position: relative;
          overflow: hidden;
        }

        .about-cta-card::after {
          content: "";
          position: absolute;
          top: -50%;
          right: -20%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(194, 155, 97, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .about-cta-content {
          position: relative;
          z-index: 1;
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }

        .about-cta-badge {
          background: rgba(255, 255, 255, 0.12);
          color: #f7ecdf;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .about-cta-title {
          font-family: var(--serif, Georgia, serif);
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 650;
          line-height: 1.3;
          margin: 0 0 16px 0;
          color: #ffffff;
          text-wrap: balance;
        }

        .about-cta-desc {
          font-size: 1rem;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 auto 32px auto;
          max-width: 600px;
        }

        .about-cta-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .about-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
          padding: 0 24px;
          border-radius: 999px;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .about-cta-btn--primary {
          background: var(--accent);
          color: #181b19;
          box-shadow: 0 4px 16px rgba(194, 155, 97, 0.4);
        }

        .about-cta-btn--primary:hover {
          background: #d4ae72;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(194, 155, 97, 0.5);
        }

        .about-cta-btn--secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.24);
          backdrop-filter: blur(10px);
        }

        .about-cta-btn--secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        .about-cta-btn--line {
          background: #06c755;
          color: #ffffff;
          box-shadow: 0 4px 16px rgba(6, 199, 85, 0.35);
        }

        .about-cta-btn--line:hover {
          background: #05b34c;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(6, 199, 85, 0.45);
        }
      `}</style>
    </div>
  );
}
