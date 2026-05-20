import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ProposalCard from "@/components/ProposalCard";

export const metadata: Metadata = {
  title: "【包棟$8,000起】高雄包棟民宿推薦 Hello Stay｜6-48人三館・中島廚房/麻將・官方直訂免手續費",
  description: "高雄包棟民宿首選 Hello Stay！平日包棟最低 $8,000 起，提供 6-48 人三館獨立空間。配備豪華中島廚房、手動麻將桌、娛樂桌遊，步行 5-10 分鐘即達駁二藝術特區、大港橋與鹽埕美食。官方 LINE 直訂享最優惠報價、免收平台服務費！",
  alternates: { canonical: "https://www.hello-stay.com" },
  openGraph: {
    title: "【包棟$8,000起】高雄包棟民宿推薦 Hello Stay｜6-48人三館・中島廚房/麻將・官方直訂免手續費",
    description: "高雄包棟民宿首選 Hello Stay！平日包棟 $8,000 起，6-48人三館任選。附中島廚房、麻將、桌遊，步行即達駁二大港橋。官方直訂免收平台手續費，馬上查空房！",
    url: "https://www.hello-stay.com",
    siteName: "Hello Stay 高雄包棟民宿",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          {
            "@context": "https://schema.org", "@type": "LodgingBusiness",
            "@id": "https://www.hello-stay.com/#lodging",
            name: "Hello Stay 高雄包棟",
            parentOrganization: { "@type": "Organization", "@id": "https://www.hello-stay.com/#organization" },
            alternateName: ["Hello Stay", "Hello Stay 高雄包棟"],
            url: "https://www.hello-stay.com",
            telephone: "+886-932-828-922",
            email: "hellohouse2017@gmail.com",
            description: "高雄鹽埕區質感包棟民宿，三館可容納6至48人。配備中島廚房、麻將與桌遊設備，步行10分鐘到駁二藝術特區。自2017年起服務超過5,000組旅客。",
            slogan: "高雄鹽埕・質感包棟旅宿",
            foundingDate: "2017",
            address: { "@type": "PostalAddress", streetAddress: "大公路70巷8號", addressLocality: "鹽埕區", addressRegion: "高雄市", postalCode: "803", addressCountry: "TW" },
            geo: { "@type": "GeoCoordinates", latitude: 22.6245, longitude: 120.2823 },
            hasMap: "https://goo.gl/maps/qxGN4mpNP8qfRCB16",
            priceRange: "$$",
            checkinTime: "16:00", checkoutTime: "11:00",
            numberOfRooms: 10,
            amenityFeature: [
              { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
              { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
              { "@type": "LocationFeatureSpecification", name: "Air conditioning", value: true },
              { "@type": "LocationFeatureSpecification", name: "Self check-in", value: true },
              { "@type": "LocationFeatureSpecification", name: "Mahjong table", value: true },
              { "@type": "LocationFeatureSpecification", name: "Streaming TV", value: true },
            ],
            containsPlace: [
              { "@type": "Accommodation", name: "你好哇寓所", description: "6-26人包棟，中島廚房、麻將桌、桌遊", numberOfBedrooms: 6, occupancy: { "@type": "QuantitativeValue", maxValue: 26 } },
              { "@type": "Accommodation", name: "溝頂民宿", description: "10-12人精緻獨棟，五層樓空間", numberOfBedrooms: 4, occupancy: { "@type": "QuantitativeValue", maxValue: 12 } },
              { "@type": "Accommodation", name: "大智若愚", description: "全新電梯民宿，最大48人，近大港橋", occupancy: { "@type": "QuantitativeValue", maxValue: 48 } },
            ],
            sameAs: [
              "https://www.instagram.com/hellohouse2020/",
              "https://www.facebook.com/HelloHouse2020/",
              "https://lin.ee/atCiMQw",
              "https://lin.ee/tUNnRLw",
              "https://www.google.com/maps/place/?q=place_id:ChIJs97gIJMFbjQRzlIsr4hlP-U",
            ],
            potentialAction: {
              "@type": "ReserveAction",
              target: { "@type": "EntryPoint", urlTemplate: "https://lin.ee/tUNnRLw", inLanguage: "zh-Hant", actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] },
              result: { "@type": "LodgingReservation", name: "Hello Stay 包棟預訂" },
            },
          },
          {
            "@context": "https://schema.org", "@type": "Organization",
            "@id": "https://www.hello-stay.com/#organization",
            name: "Hello Stay",
            alternateName: ["Hello Stay", "Hello Stay 高雄包棟"],
            subOrganization: [
              {
                "@type": "LodgingBusiness",
                "@id": "https://www.hello-stay.com/#lodging",
                name: "你好哇寓所",
                address: { "@type": "PostalAddress", streetAddress: "大公路70巷8號", addressLocality: "鹽埕區", addressRegion: "高雄市", postalCode: "803", addressCountry: "TW" },
                telephone: "+886-932-828-922",
                sameAs: ["https://www.google.com/maps/place/?q=place_id:ChIJs97gIJMFbjQRzlIsr4hlP-U"]
              },
              {
                "@type": "LodgingBusiness",
                "@id": "https://www.hello-stay.com/godin/#lodging",
                name: "溝頂民宿",
                address: { "@type": "PostalAddress", streetAddress: "大公路70巷6-2號", addressLocality: "鹽埕區", addressRegion: "高雄市", postalCode: "803", addressCountry: "TW" },
                telephone: "+886-932-828-922",
                sameAs: ["https://www.google.com/maps/search/?api=1&query=%E6%BA%9溝%E9%A0%82%E6%B0%91%E5%AE%BF"]
              }
            ],
            url: "https://www.hello-stay.com",
            logo: "https://www.hello-stay.com/images/cover-bg.webp",
            foundingDate: "2017",
            email: "hellohouse2017@gmail.com",
            telephone: "+886-932-828-922",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+886-932-828-922",
              contactType: "customer service",
              email: "hellohouse2017@gmail.com",
              availableLanguage: ["zh-Hant", "en", "ja", "ko", "vi"],
              areaServed: "TW",
            },
            sameAs: [
              "https://www.instagram.com/hellohouse2020/",
              "https://www.facebook.com/HelloHouse2020/",
              "https://lin.ee/atCiMQw",
              "https://lin.ee/tUNnRLw",
              "https://www.google.com/maps/place/?q=place_id:ChIJs97gIJMFbjQRzlIsr4hlP-U",
            ],
          },
          {
            "@context": "https://schema.org", "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "高雄有推薦的包棟民宿嗎？", acceptedAnswer: { "@type": "Answer", text: "推薦 Hello Stay，位於高雄鹽埕區，三館可容納6至48人。主館你好哇寓所目前 Google 評價 4.5 星（75 則評論），並配備中島廚房、麻將桌、桌遊，步行10分鐘到駁二藝術特區。" } },
              { "@type": "Question", name: "你好哇寓所最多可以住幾人？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所最多可容納26人，多間獨立套房彈性配置。三館聯訂最大容納48人。" } },
              { "@type": "Question", name: "高雄包棟民宿哪裡訂最便宜？", acceptedAnswer: { "@type": "Answer", text: "官方直訂最優惠！透過 LINE 官方帳號或官網預訂，免收平台手續費，還能直接依人數與日期取得包棟報價。" } },
              { "@type": "Question", name: "Hello Stay 三間民宿各自可以住多少人？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所 6-26 人，溝頂民宿 10-12 人，大智若愚最大 48 人。三館聯訂可容納近 80 人。" } },
              { "@type": "Question", name: "距離駁二藝術特區多遠？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所與溝頂民宿步行約 10 分鐘到駁二藝術特區；大智若愚位於大港橋旁，緊鄰駁二大義倉庫群。" } },
              { "@type": "Question", name: "有提供哪些娛樂設施？", acceptedAnswer: { "@type": "Answer", text: "豪宅級中島廚房（IH爐、冰箱、完整餐具）、麻將桌、桌遊、43吋 Netflix 聯網電視、製冰機、洗衣機。一樓開放式中島廚房與交誼大空間可容納 20 人以上聚會。" } },
              { "@type": "Question", name: "入住方式是什麼？", acceptedAnswer: { "@type": "Answer", text: "電子密碼鎖自助入住，密碼於入住當日透過 LINE 傳送。入住時間 16:00 以後，退房時間 11:00 以前。" } },
              { "@type": "Question", name: "怎麼從高鐵到 Hello Stay？", acceptedAnswer: { "@type": "Answer", text: "高鐵左營站 → 捷運紅線至美麗島站 → 轉橘線至鹽埕埔站（O2）→ 4號出口步行 5 分鐘。全程約 30 分鐘。" } },
              { "@type": "Question", name: "可以帶寵物嗎？", acceptedAnswer: { "@type": "Answer", text: "非寵物友善旅宿。經事前申請並書面同意者，酌收清潔費平日 $800、假日 $1,000。" } },
              { "@type": "Question", name: "Hello Stay 是合法民宿嗎？", acceptedAnswer: { "@type": "Answer", text: "是的。你好哇寓所（高雄市民宿 131-1 號）與溝頂民宿（高雄市民宿 163 號）皆為合法登記民宿，並依法投保富邦產險公共意外責任險。" } },
              { "@type": "Question", name: "包棟民宿適合辦婚禮迎娶嗎？", acceptedAnswer: { "@type": "Answer", text: "非常適合。寬敞的一樓中島廚房與交誼大空間適合闖關遊戲，絕佳自然採光適合婚攝，多房型供伴娘團入住。曾服務多組迎娶與婚禮前夜派對。" } },
            ],
          },
          {
            "@context": "https://schema.org", "@type": "WebSite",
            "@id": "https://www.hello-stay.com/#website",
            url: "https://www.hello-stay.com",
            name: "Hello Stay 高雄包棟民宿",
            inLanguage: ["zh-Hant", "en", "ja", "ko", "vi"],
            publisher: { "@id": "https://www.hello-stay.com/#lodging" },
            potentialAction: {
              "@type": "SearchAction",
              target: { "@type": "EntryPoint", urlTemplate: "https://www.hello-stay.com/book?date={search_term_string}" },
              "query-input": "required name=search_term_string",
            },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".hero-cinema__content", "h1", "h2"],
            },
          },
        ])
      }} />

      {/* ═══ SCENE 1: Cinematic Hero ═══ */}
      <section className="hero-cinema">
        <div className="hero-cinema__media">
          <Image
            src="/images/hellohouse/photo1.webp"
            alt="Hello Stay 高雄包棟民宿你好哇寓所一樓挑高寬敞的豪華中島廚房與交誼大空間全景，適合多人在此備餐、打麻將與歡聚"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="hero-cinema__overlay" />
        </div>

        <div className="hero-cinema__content">
          <div className="hero-cinema__eyebrow">Since 2017 · 高雄包棟民宿推薦 · 鹽埕</div>
          <h1 className="hero-cinema__title">
            高雄包棟民宿推薦，<br />
            <span className="hero-cinema__title--accent">6-48 人都住得自在</span>
          </h1>
          <p className="hero-cinema__sub">
            三棟獨立民宿・6 至 48 人<br />
            中島廚房 / 麻將 / 桌遊 / 官方直訂<br />
            步行可達鹽埕美食、駁二與大港橋
          </p>
          <div className="hero-cinema__actions">
            <a href="https://lin.ee/atCiMQw" target="_blank" rel="noopener noreferrer" className="btn-line">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.271.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" /></svg>
              LINE 立即詢問
            </a>
            <Link href="/book" className="btn-ghost">查詢空房與報價</Link>
          </div>
          <div className="hero-cinema__badge">
            ⭐ 主館你好哇寓所 Google 4.5 星 · 75 則評論
          </div>
        </div>

        <div className="hero-cinema__scroll">
          <span>SCROLL</span>
          <div className="hero-cinema__scroll-line" />
        </div>
      </section>

      {/* ═══ SCENE 2: Brand Statement ═══ */}
      <section className="scene-brand">
        <div className="w">
          <Reveal>
            <p className="brand-statement">
              「不只是住一晚，是創造<strong>一段回憶</strong>。」
            </p>
            <p className="brand-sub">
              2017 年起，我們在高雄鹽埕的巷弄裡，<br />
              用三棟風格各異的民宿，為超過五千組旅客打造專屬空間。
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ SCENE 3: Three Properties — Immersive Gallery ═══ */}
      <section className="scene-properties">
        <div className="w" style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 80px)" }}>
          <Reveal>
            <div className="scene-eyebrow">Three Properties</div>
            <h2 className="scene-h2">三館風格，一種堅持</h2>
          </Reveal>
        </div>

        {/* Property 1: 你好哇寓所 */}
        <Reveal>
          <div className="prop-card">
            <div className="prop-card__img">
              <Image
                src="/images/hellohouse/cover.webp"
                alt="Hello Stay 你好哇寓所高雄包棟首選，一樓大容量開放式中島廚房與交誼吧台無阻隔的歡聚空間"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="prop-card__body">
              <span className="prop-card__num">01</span>
              <h3 className="prop-card__name">你好哇寓所</h3>
              <p className="prop-card__caption">Hello House · 6-26人</p>
              <div className="prop-card__divider" />
              <p className="prop-card__desc">
                豪宅級中島廚房、手動麻將桌、Netflix 影音娛樂。
                老屋溫度遇上現代質感——這裡是你的私人招待所。
              </p>
              <div className="prop-card__tags">
                <span>中島廚房</span><span>麻將桌</span><span>聚會空間</span><span>多間套房</span>
              </div>
              <div className="prop-card__footer">
                <span className="prop-card__price">依人數彈性配置 · LINE 諮詢</span>
                <Link href="/hellohouse" className="prop-card__link">探索空間 →</Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Property 2: 溝頂民宿 */}
        <Reveal>
          <div className="prop-card prop-card--reverse">
            <div className="prop-card__img">
              <Image
                src="/images/godin/cover-1.webp"
                alt="溝頂民宿 Godin House 高雄鹽埕 10-12 人超值獨棟包棟民宿外觀，享有完全無外人打擾的私人空間"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="prop-card__body">
              <span className="prop-card__num">02</span>
              <h3 className="prop-card__name">溝頂民宿</h3>
              <p className="prop-card__caption">Godin House · 10-12人</p>
              <div className="prop-card__divider" />
              <p className="prop-card__desc">
                五層樓整棟使用，專屬交誼廳可打麻將。
                小團體的高 CP 值首選——整棟都是你的，打牌到天亮沒人管。
              </p>
              <div className="prop-card__tags">
                <span>五層獨棟</span><span>麻將桌</span><span>4間套房</span><span>交誼廳</span>
              </div>
              <div className="prop-card__footer">
                <span className="prop-card__price">平日 $8,000 起</span>
                <Link href="/godin" className="prop-card__link">探索空間 →</Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Property 3: 大智若愚 */}
        <Reveal>
          <div className="prop-card prop-card--coming">
            <div className="prop-card__img">
              <Image
                src="/images/dazhi/building-render.webp"
                alt="大智若愚民宿大樓外觀 3D 渲染設計圖，全新電梯包層包棟民宿，鄰近大港橋與駁二大義倉庫群"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
              />
              <div className="prop-card__coming-badge">2027 年中開幕</div>
            </div>
            <div className="prop-card__body">
              <span className="prop-card__num" style={{ color: "var(--sec)" }}>03</span>
              <h3 className="prop-card__name">大智若愚</h3>
              <p className="prop-card__caption">Dazhi House · 最大48人</p>
              <div className="prop-card__divider" style={{ background: "var(--sec)" }} />
              <p className="prop-card__desc">
                全新電梯大樓，大港橋旁、駁二大義倉庫群。
                一層三房一廳，可包層可包棟——從部門旅遊到大型班遊都能容納。
              </p>
              <div className="prop-card__tags">
                <span>電梯民宿</span><span>最大48人</span><span>可包層</span><span>大港橋旁</span>
              </div>
              <div className="prop-card__footer">
                <span className="prop-card__price">依人數報價 · LINE 諮詢</span>
                <Link href="/dazhi" className="prop-card__link" style={{ color: "var(--sec)" }}>了解更多 →</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ SCENE 4: Photo Strip ═══ */}
      <section className="scene-strip">
        <div className="strip-scroll">
          {[
            { src: "/images/hellohouse/bar-2.webp", alt: "Hello Stay 你好哇寓所一樓精緻的中島吧台與高腳椅，適合親友小酌聊天與品嚐鹽埕美食" },
            { src: "/images/hellohouse/photo2.webp", alt: "Hello Stay 你好哇寓所一樓開放式交誼空間與手動麻將桌，提供旅客豐富的室內休閒活動選擇" },
            { src: "/images/hellohouse/1301.webp", alt: "Hello Stay 你好哇寓所客房配備標準雙人床獨立筒床墊，營造如家般舒適與安穩的極致睡眠環境" },
            { src: "/images/godin/room1.webp", alt: "溝頂民宿溫馨優雅的客房室內設計，採光通風良好，配備一級冷暖空調與獨立衛浴設備" },
            { src: "/images/hellohouse/1000.webp", alt: "Hello Stay 你好哇寓所一樓豪華中島廚房與大餐桌，備有完整餐具與 IH 爐適合多人開伙聚餐" },
            { src: "/images/godin/cover-2.webp", alt: "溝頂民宿四樓公共沙發交誼廳與休閒麻將桌，是 10-12 人團體包棟聊天娛樂的高 CP 值首選空間" },
          ].map((img, i) => (
            <div key={i} className="strip-scroll__item">
              <Image src={img.src} alt={img.alt} width={480} height={320} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SCENE 5: Features Grid ═══ */}
      <section className="scene-features">
        <div className="w">
          <Reveal>
            <div className="scene-eyebrow">Why Hello Stay</div>
            <h2 className="scene-h2" style={{ marginBottom: "clamp(40px, 6vw, 72px)" }}>為什麼選我們</h2>
          </Reveal>
          <div className="feat-grid">
            {[
              { icon: "🏠", title: "整棟包下", desc: "三館皆為獨立空間。\n不跟別人共用，完全屬於你們。" },
              { icon: "👥", title: "6-48人彈性", desc: "從小家庭到企業團建。\n三館任選或合訂，最高近80人。" },
              { icon: "📍", title: "鹽埕黃金區", desc: "步行到駁二、大港橋。\n30+間在地老店走路可達。" },
              { icon: "⭐", title: "主館 Google 評價", desc: "你好哇寓所 Google 4.5 星、75 則評論。\n綜藝玩很大拍攝場地。" },
              { icon: "💰", title: "直訂最划算", desc: "官方LINE直訂免平台手續費。\n比OTA便宜15-20%。" },
              { icon: "💬", title: "LINE 即訂", desc: "LINE 即時回覆、查房報價。\n30秒產出包棟提案。" },
            ].map((f, i) => (
              <Reveal key={i}>
                <div className="feat-card">
                  <div className="feat-card__icon">{f.icon}</div>
                  <h3 className="feat-card__title">{f.title}</h3>
                  <p className="feat-card__desc">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SCENE 5.5: Proposal Card + Browse Links ═══ */}
      <section className="scene-proposal" style={{ background: "var(--bg)", padding: "100px 0" }}>
        <div className="w">
          <Reveal>
            <ProposalCard />
          </Reveal>
          {/* Browse alternative — for users who prefer to compare first */}
          <Reveal>
            <div style={{ maxWidth: "480px", margin: "32px auto 0", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "#BEB5A8", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "14px" }}>或先瀏覽比較</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
                <Link href="/compare" style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #E8E0D4", color: "#8A8279", fontSize: "0.78rem", textDecoration: "none" }}>📊 三館比較</Link>
                <Link href="/kaohsiung-whole-house" style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #E8E0D4", color: "#8A8279", fontSize: "0.78rem", textDecoration: "none" }}>🏠 包棟總覽</Link>
                <Link href="/kaohsiung-whole-house#need-family-trip" style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #E8E0D4", color: "#8A8279", fontSize: "0.78rem", textDecoration: "none" }}>👨‍👩‍👧‍👦 家庭旅遊</Link>
                <Link href="/kaohsiung-whole-house#need-company-retreat" style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #E8E0D4", color: "#8A8279", fontSize: "0.78rem", textDecoration: "none" }}>💼 企業團建</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SCENE 6: Final CTA ═══ */}
      <section className="scene-cta">
        <Image
          src="/images/hellohouse/photo5.webp"
          alt="Hello Stay 高雄包棟民宿精緻溫馨的高質感客房環境，點綴溫暖燈光讓旅人如回到家一般"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="scene-cta__overlay" />
        <div className="scene-cta__content">
          <Reveal>
            <h2>準備好了嗎？</h2>
            <p>在鹽埕的巷弄裡，有一個空間正等著你們。</p>
            <div className="scene-cta__buttons">
              <a href="https://lin.ee/atCiMQw" target="_blank" rel="noopener noreferrer" className="btn-line btn-line--lg">
                💬 LINE 查空房
              </a>
              <Link href="/book" className="btn-ghost btn-ghost--light">查詢空房與報價</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
