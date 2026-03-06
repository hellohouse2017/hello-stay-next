import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "高雄質感包棟民宿 | 你好哇寓所 & 溝頂民宿 | 6-38人團體住宿首選",
  description: "高雄鹽埕區包棟民宿推薦。你好哇寓所（6-26人）與溝頂民宿（10-12人），專為團體打造的質感獨立旅宿空間。近駁二、大港橋，配備中島廚房與麻將設備。",
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "LodgingBusiness",
          name: "Hello Stay 你好哇寓所 & 溝頂民宿", url: "https://www.hello-stay.com",
          telephone: "0932828922",
          description: "高雄鹽埕質感包棟民宿，6-38人團體住宿首選。",
        })
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
            <div className="label-d" style={{ color: "#8A8279" }}>Two Properties, One Philosophy</div>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "0.06em" }}>兩棟風格，一種堅持</h2>
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
                  6 至 26 人彈性包棟。紅磚中島廚房、電動麻將桌、多元房型。老屋溫度與現代質感的完美融合。
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
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-strip">
        <Reveal>
          <h3>找到屬於你的理想空間</h3>
          <p>6 至 38 人彈性包棟，為每一場相聚量身打造。</p>
          <Link href="/book" className="btn-reserve">查詢空房與報價</Link>
        </Reveal>
      </div>
    </>
  );
}
