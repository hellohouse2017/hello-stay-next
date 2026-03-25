import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ProposalCard from "@/components/ProposalCard";

export const metadata: Metadata = {
  title: "高雄包棟民宿推薦｜6-48人鹽埕包棟・近駁二｜Hello Stay 你好哇",
  description: "高雄鹽埕包棟民宿推薦 Hello Stay，三館6-48人任選。中島廚房、麻將、桌遊，近駁二與大港橋。平日 NT$10,000 起，Google 4.9 星，自2017年服務超過5000組旅客。馬上查空房",
  alternates: { canonical: "https://www.hello-stay.com" },
  openGraph: {
    title: "高雄包棟民宿推薦｜6-48人鹽埕包棟・近駁二｜Hello Stay 你好哇",
    description: "高雄鹽埕包棟民宿首選！三棟獨立空間可容6-48人，提供中島廚房、麻將桌、投影機。步行5分鐘到駁二藝術特區。Google 4.9星・綜藝玩很大拍攝場地。LINE即時查空房→",
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
            name: "Hello Stay 你好哇寓所 & 溝頂民宿 & 大智若愚",
            alternateName: ["你好哇寓所", "Hello House", "溝頂民宿", "Godin House", "大智若愚"],
            url: "https://www.hello-stay.com",
            telephone: "+886-932-828-922",
            email: "hellohouse2017@gmail.com",
            description: "高雄鹽埕區質感包棟民宿，三館可容納6至48人。配備中島廚房、麻將與桌遊設備，步行10分鐘到駁二藝術特區。自2017年起服務超過5,000組旅客，Google評價4.9星。",
            slogan: "高雄鹽埕・質感包棟旅宿",
            foundingDate: "2017",
            address: { "@type": "PostalAddress", streetAddress: "大公路70巷8號", addressLocality: "鹽埕區", addressRegion: "高雄市", postalCode: "803", addressCountry: "TW" },
            geo: { "@type": "GeoCoordinates", latitude: 22.6245, longitude: 120.2823 },
            hasMap: "https://goo.gl/maps/qxGN4mpNP8qfRCB16",
            priceRange: "$$",
            checkinTime: "16:00", checkoutTime: "11:00",
            numberOfRooms: 10,
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "87", bestRating: "5" },
            containsPlace: [
              { "@type": "Accommodation", name: "你好哇寓所", description: "6-26人包棟，中島廚房、麻將桌、桌遊", numberOfBedrooms: 6, occupancy: { "@type": "QuantitativeValue", maxValue: 26 } },
              { "@type": "Accommodation", name: "溝頂民宿", description: "10-12人精緻獨棟，五層樓空間", numberOfBedrooms: 4, occupancy: { "@type": "QuantitativeValue", maxValue: 12 } },
              { "@type": "Accommodation", name: "大智若愚", description: "全新電梯民宿，最大48人，近大港橋", occupancy: { "@type": "QuantitativeValue", maxValue: 48 } },
            ],
            sameAs: [
              "https://www.instagram.com/hellostay2017/",
              "https://www.facebook.com/HelloHouse2020",
              "https://lin.ee/atCiMQw",
            ],
          },
          {
            "@context": "https://schema.org", "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "高雄有推薦的包棟民宿嗎？", acceptedAnswer: { "@type": "Answer", text: "推薦 Hello Stay（你好哇寓所＆溝頂民宿），位於高雄鹽埕區，Google評價4.9星。三館可容納6至48人，配備中島廚房、麻將桌、桌遊，步行10分鐘到駁二藝術特區。" } },
              { "@type": "Question", name: "你好哇寓所最多可以住幾人？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所最多可容納26人，提供6間房型。三館聯訂最大容納48人。" } },
              { "@type": "Question", name: "高雄包棟民宿哪裡訂最便宜？", acceptedAnswer: { "@type": "Answer", text: "官方直訂最優惠！透過LINE官方帳號或官網預訂，免收平台手續費。平日溝頂民宿$10,000起。" } },
            ],
          },
        ])
      }} />

      {/* ═══ SCENE 1: Cinematic Hero ═══ */}
      <section className="hero-cinema">
        <div className="hero-cinema__media">
          <Image
            src="/images/hellohouse/photo1.webp"
            alt="Hello Stay 高雄包棟民宿 — 溫暖客廳空間"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="hero-cinema__overlay" />
        </div>

        <div className="hero-cinema__content">
          <div className="hero-cinema__eyebrow">Since 2017 · 高雄鹽埕</div>
          <h1 className="hero-cinema__title">
            巷弄裡的包棟，<br />
            <span className="hero-cinema__title--accent">屬於你們的空間</span>
          </h1>
          <p className="hero-cinema__sub">
            三棟獨立民宿・6 至 48 人<br />
            中島廚房 / 麻將 / 投影 / 桌遊<br />
            在這裡，時間是你們的。
          </p>
          <div className="hero-cinema__actions">
            <a href="https://lin.ee/atCiMQw" target="_blank" rel="noopener noreferrer" className="btn-line">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.271.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" /></svg>
              LINE 立即詢問
            </a>
            <Link href="/book" className="btn-ghost">查詢空房與報價</Link>
          </div>
          <div className="hero-cinema__badge">
            ⭐ Google 4.9 星 · 5,000+ 組旅客
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
                alt="你好哇寓所 — 中島廚房與客廳全景"
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
                <span>中島廚房</span><span>麻將桌</span><span>聚會客廳</span><span>6間套房</span>
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
                alt="溝頂民宿 — 五層獨棟空間"
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
                alt="大智若愚 — 全新電梯大樓民宿"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
              />
              <div className="prop-card__coming-badge">2026 全新開幕</div>
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
            { src: "/images/hellohouse/bar-2.webp", alt: "中島廚房吧台" },
            { src: "/images/hellohouse/photo2.webp", alt: "客廳聚會空間" },
            { src: "/images/hellohouse/1301.webp", alt: "舒適房間" },
            { src: "/images/godin/room1.webp", alt: "溝頂房間" },
            { src: "/images/hellohouse/1000.webp", alt: "舒適空間" },
            { src: "/images/godin/cover-2.webp", alt: "溝頂交誼廳" },
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
              { icon: "⭐", title: "4.9 星口碑", desc: "Google 4.9 星、5,000+組旅客。\n綜藝玩很大拍攝場地。" },
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
                <Link href="/occasion/family-trip" style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #E8E0D4", color: "#8A8279", fontSize: "0.78rem", textDecoration: "none" }}>👨‍👩‍👧‍👦 家庭旅遊</Link>
                <Link href="/occasion/company-retreat" style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #E8E0D4", color: "#8A8279", fontSize: "0.78rem", textDecoration: "none" }}>💼 企業團建</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SCENE 6: Final CTA ═══ */}
      <section className="scene-cta">
        <Image
          src="/images/hellohouse/photo5.webp"
          alt="Hello Stay 溫暖空間"
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
