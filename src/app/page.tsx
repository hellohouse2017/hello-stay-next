import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "高雄質感包棟民宿 | 你好哇寓所・溝頂民宿・大智若愚 | 6-48人團體住宿首選",
  description: "高雄鹽埕區包棟民宿推薦。你好哇寓所（6-26人）、溝頂民宿（10-12人）、大智若愚（最大48人），專為團體打造的質感獨立旅宿空間。近駁二、大港橋。",
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          {
            "@context": "https://schema.org", "@type": "LodgingBusiness",
            name: "Hello Stay 你好哇寓所 & 溝頂民宿 & 大智若愚",
            url: "https://www.hello-stay.com",
            telephone: "+886-932-828-922",
            description: "高雄鹽埕區質感包棟民宿，三館可容納6至48人。配備中島廚房、麻將桌與KTV設備。",
            address: { "@type": "PostalAddress", streetAddress: "大公路70巷8號", addressLocality: "鹽埕區", addressRegion: "高雄市", postalCode: "803", addressCountry: "TW" },
            geo: { "@type": "GeoCoordinates", latitude: 22.6245, longitude: 120.2823 },
            priceRange: "$$",
            checkinTime: "16:00", checkoutTime: "11:00",
            numberOfRooms: 10, petsAllowed: false,
            amenityFeature: [
              { "@type": "LocationFeatureSpecification", name: "中島廚房", value: true },
              { "@type": "LocationFeatureSpecification", name: "麻將桌", value: true },
              { "@type": "LocationFeatureSpecification", name: "KTV", value: true },
              { "@type": "LocationFeatureSpecification", name: "免費 Wi-Fi", value: true },
            ],
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "87", bestRating: "5" },
          },
          {
            "@context": "https://schema.org", "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "你好哇寓所最多可以住幾人？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所最多可容納26人，提供6間房型。另有溝頂民宿（10-12人）及即將開幕的大智若愚（最大48人）。" } },
              { "@type": "Question", name: "高雄包棟民宿有停車場嗎？", acceptedAnswer: { "@type": "Answer", text: "周邊有6間停車場，大公路路邊20:00-08:00免費停車。詳見交通指南頁面。" } },
              { "@type": "Question", name: "民宿可以帶寵物嗎？", acceptedAnswer: { "@type": "Answer", text: "非寵物友善旅宿。經事前申請並同意者，酌收清潔費$800-$1,000。" } },
              { "@type": "Question", name: "有廚房可以煮飯嗎？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所配備豪華中島廚房，可自行採買食材料理。非常適合包棟聚餐、火鍋圍爐。" } },
              { "@type": "Question", name: "怎麼到達民宿？", acceptedAnswer: { "@type": "Answer", text: "搭高鐵至左營站，轉捷運紅線到美麗島站，再轉橘線至鹽埕埔站（O2），4號出口步行約5分鐘即達。" } },
              { "@type": "Question", name: "附近有什麼景點？", acceptedAnswer: { "@type": "Answer", text: "步行10分鐘到駁二藝術特區，8分鐘到大港橋，鄰近棧貳庫、西子灣、旗津渡輪站。位於鹽埕區美食一級戰區。" } },
            ],
          },
        ])
      }} />

      {/* ── Hero ── */}
      <section className="hero-d">
        <div className="bg" style={{ backgroundImage: "url('/images/cover-bg.jpg')", opacity: 0.45 }} />
        <div className="overlay" />
        <div className="content" style={{ padding: "0 28px" }}>
          <div className="tagline" style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.3s forwards" }}>
            Kaohsiung · Yancheng · Since 2017
          </div>
          <h1 style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.5s forwards" }}>
            Hello Stay
          </h1>
          <p className="sub" style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.7s forwards" }}>
            高雄鹽埕・質感包棟旅宿
          </p>
          <div style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.9s forwards" }}>
            <Link href="/book" className="btn-reserve">立即查詢空房</Link>
          </div>
        </div>
        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", animation: "float 3s ease-in-out infinite" }}>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(180deg, rgba(200,173,127,0.5), transparent)" }} />
        </div>
      </section>

      {/* ── Two Properties ── */}
      <section className="sec-cream">
        <div className="w" style={{ textAlign: "center", marginBottom: "60px" }}>
          <Reveal>
            <div className="label-d" style={{ color: "#8A8279" }}>Three Properties, One Philosophy</div>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "0.06em" }}>三館風格，一種堅持</h2>
            <div className="gold-line" style={{ margin: "24px auto" }} />
          </Reveal>
        </div>

        {/* 你好哇寓所 */}
        <div className="w">
          <Reveal>
            <div className="grid-asym" style={{ marginBottom: "clamp(60px, 8vw, 100px)" }}>
              <div className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/hellohouse/cover.jpg" alt="你好哇寓所 中島廚房" width={700} height={525} className="img-cover" />
              </div>
              <div>
                <div className="label-d" style={{ color: "#C8AD7F" }}>01</div>
                <h3 style={{ fontSize: "1.6rem", marginBottom: "16px", letterSpacing: "0.06em" }}>你好哇寓所</h3>
                <div className="gold-line" style={{ marginBottom: "20px" }} />
                <p style={{ fontSize: "0.92rem", color: "#8A8279", lineHeight: 2.1, marginBottom: "8px" }}>
                  6 至 26 人彈性包棟。豪宅級中島廚房、麻將桌、多元房型。老屋溫度與現代質感的完美融合。
                </p>
                <p style={{ fontSize: "0.78rem", color: "#bbb", marginBottom: "28px" }}>
                  近駁二藝術特區・步行 10 分鐘
                </p>
                <Link href="/hellohouse" style={{ fontFamily: "var(--serif)", fontSize: "0.85rem", color: "#C8AD7F", letterSpacing: "0.1em", borderBottom: "1px solid rgba(200,173,127,0.3)", paddingBottom: "4px" }}>
                  探索空間 →
                </Link>
              </div>
            </div>
          </Reveal>

          {/* 溝頂民宿 */}
          <Reveal>
            <div className="grid-asym grid-asym-r">
              <div>
                <div className="label-d" style={{ color: "#8A8279" }}>02</div>
                <h3 style={{ fontSize: "1.6rem", marginBottom: "16px", letterSpacing: "0.06em" }}>溝頂民宿</h3>
                <div className="gold-line" style={{ background: "#D4CBC0", marginBottom: "20px" }} />
                <p style={{ fontSize: "0.92rem", color: "#8A8279", lineHeight: 2.1, marginBottom: "8px" }}>
                  10 至 12 人精緻獨棟。五層樓完整空間，溫馨家庭風格。小團體的高 CP 值首選。
                </p>
                <p style={{ fontSize: "0.78rem", color: "#bbb", marginBottom: "28px" }}>
                  鹽埕靜謐巷弄・平日 $10,000 起
                </p>
                <Link href="/godin" style={{ fontFamily: "var(--serif)", fontSize: "0.85rem", color: "#8A8279", letterSpacing: "0.1em", borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "4px" }}>
                  探索空間 →
                </Link>
              </div>
              <div className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/godin/cover-1.jpg" alt="溝頂民宿 客廳空間" width={700} height={525} className="img-cover" />
              </div>
            </div>
          </Reveal>

          {/* 大智若愚 */}
          <Reveal>
            <div className="grid-asym" style={{ marginTop: "clamp(60px, 8vw, 100px)" }}>
              <div style={{ background: "#FAF8F5", borderRadius: "16px", padding: "40px 32px", textAlign: "center" }}>
                <div style={{ fontSize: "0.6rem", fontFamily: "var(--en)", letterSpacing: "0.3em", textTransform: "uppercase", color: "#BEB5A8", marginBottom: "16px" }}>Coming Soon · 2026</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "2rem", color: "#3D3830", letterSpacing: "0.1em", marginBottom: "12px" }}>大智若愚</div>
                <div style={{ width: "40px", height: "1px", background: "#D4CBC0", margin: "0 auto" }} />
              </div>
              <div>
                <div className="label-d" style={{ color: "#BEB5A8" }}>03</div>
                <h3 style={{ fontSize: "1.6rem", marginBottom: "16px", letterSpacing: "0.06em" }}>大智若愚</h3>
                <div className="gold-line" style={{ background: "#D4CBC0", marginBottom: "20px" }} />
                <p style={{ fontSize: "0.92rem", color: "#8A8279", lineHeight: 2.1, marginBottom: "8px" }}>
                  全新電梯民宿，最大可住 48 人。大港橋旁、駁二大義倉庫群。一層三房一廳，可包層可包棟。
                </p>
                <p style={{ fontSize: "0.78rem", color: "#bbb", marginBottom: "28px" }}>
                  大港橋旁・即將開幕
                </p>
                <Link href="/dazhi" style={{ fontFamily: "var(--serif)", fontSize: "0.85rem", color: "#A09282", letterSpacing: "0.1em", borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "4px" }}>
                  了解更多 →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-strip">
        <Reveal>
          <h3>找到屬於你的理想空間</h3>
          <p>6 至 48 人彈性包棟，為每一場相聚量身打造。</p>
          <Link href="/book" className="btn-reserve">查詢空房與報價</Link>
        </Reveal>
      </div>
    </>
  );
}
