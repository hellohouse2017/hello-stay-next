import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "高雄質感包棟民宿 | 你好哇寓所 & 溝頂民宿 | 6-38人團體住宿首選",
  description: "高雄包棟民宿最佳選擇，專為團體設計的質感旅宿。提供6-38人彈性包棟方案，配備中島廚房與麻將設施。近駁二藝術特區、捷運鹽埕埔站。",
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            name: "你好哇寓所 & 溝頂民宿",
            url: "https://www.hello-stay.com",
            telephone: "0932828922",
            description: "高雄質感包棟民宿，專接待團體旅客。提供6人至38人包棟服務。",
          }),
        }}
      />

      {/* ===== HERO ===== */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "700px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#0a0a0a",
        }}
      >
        {/* BG Image with Ken Burns */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/cover-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5,
            animation: "zoomSlow 25s infinite alternate",
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", color: "white", padding: "0 24px", maxWidth: "900px" }}>
          <div
            style={{
              fontFamily: "var(--font-en)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--c-gold-light)",
              marginBottom: "24px",
              opacity: 0,
              animation: "fadeInUp 1s ease 0.2s forwards",
            }}
          >
            Kaohsiung · Yancheng District · Since 2017
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              lineHeight: 1.3,
              marginBottom: "28px",
              opacity: 0,
              animation: "fadeInUp 1s ease 0.4s forwards",
            }}
          >
            探索您專屬的<br />
            <span style={{ color: "var(--c-gold-light)" }}>質感包棟旅宿</span>
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: 300,
              lineHeight: 2,
              opacity: 0,
              animation: "fadeInUp 1s ease 0.6s forwards",
              color: "rgba(255,255,255,0.75)",
              maxWidth: "550px",
              margin: "0 auto 50px",
            }}
          >
            在高雄鹽埕的靜謐巷弄中，<br />
            為每一場相聚，提供最有溫度的空間。
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
              opacity: 0,
              animation: "fadeInUp 1s ease 0.8s forwards",
            }}
          >
            <Link href="/hellohouse" className="btn btn-ghost" style={{ minWidth: "180px" }}>
              你好哇寓所
            </Link>
            <Link href="/godin" className="btn btn-ghost" style={{ minWidth: "180px" }}>
              溝頂民宿
            </Link>
          </div>

          <div style={{ marginTop: "40px", opacity: 0, animation: "fadeInUp 1s ease 1s forwards" }}>
            <Link href="/book" className="btn btn-gold" style={{ padding: "16px 44px", fontSize: "1rem" }}>
              <i className="fa-regular fa-calendar-check" />
              立即查詢空房
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            color: "rgba(255,255,255,0.4)",
            animation: "float 3s ease-in-out infinite",
          }}
        >
          <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-en)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "30px", background: "linear-gradient(180deg, rgba(255,255,255,0.4), transparent)" }} />
        </div>
      </section>

      {/* ===== TWO PROPERTIES SECTION ===== */}
      <section className="section" style={{ background: "var(--c-cream)" }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
              <span className="section-label" style={{ justifyContent: "center" }}>
                <span>Two Unique Stay</span>
              </span>
              <h2 className="section-heading" style={{ margin: "0 auto", textAlign: "center" }}>
                兩棟風格，一種堅持
              </h2>
              <div className="divider divider-center" />
              <p className="section-desc" style={{ margin: "0 auto", textAlign: "center" }}>
                我們用心打造每一個空間細節，讓整趟旅程從踏入的那一刻開始，就是一場值得期待的體驗。
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "30px" }}>
            {/* HelloHouse Card */}
            <Reveal delay={1}>
              <Link href="/hellohouse" className="card" style={{ display: "block", textDecoration: "none" }}>
                <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                  <Image src="/images/hellohouse/cover.jpg" alt="你好哇寓所 - 高雄質感包棟民宿" fill style={{ objectFit: "cover", transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "30px", background: "linear-gradient(transparent, rgba(0,0,0,0.7))", color: "white" }}>
                    <span className="badge" style={{ background: "rgba(201,169,110,0.25)", color: "var(--c-gold-light)", marginBottom: "12px" }}>6 - 26 人</span>
                  </div>
                </div>
                <div style={{ padding: "32px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-display)" }}>你好哇寓所</h3>
                    <i className="fa-solid fa-arrow-right" style={{ color: "var(--c-gold)", fontSize: "1.1rem" }} />
                  </div>
                  <p style={{ color: "var(--c-text-soft)", fontSize: "0.95rem", lineHeight: 1.9 }}>
                    保留老屋溫度的主館，配備紅磚中島廚房、麻將桌、多樣化房型。適合中大型團體包棟。
                  </p>
                  <div style={{ display: "flex", gap: "8px", marginTop: "20px", flexWrap: "wrap" }}>
                    {["中島廚房", "麻將設備", "電視娛樂", "近駁二"].map(t => (
                      <span key={t} className="badge">{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* Godin Card */}
            <Reveal delay={2}>
              <Link href="/godin" className="card" style={{ display: "block", textDecoration: "none" }}>
                <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                  <Image src="/images/godin/cover-1.jpg" alt="溝頂民宿 - 高雄精緻小包棟" fill style={{ objectFit: "cover", transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "30px", background: "linear-gradient(transparent, rgba(0,0,0,0.7))", color: "white" }}>
                    <span className="badge" style={{ background: "rgba(201,169,110,0.25)", color: "var(--c-gold-light)", marginBottom: "12px" }}>10 - 12 人</span>
                  </div>
                </div>
                <div style={{ padding: "32px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-display)" }}>溝頂民宿</h3>
                    <i className="fa-solid fa-arrow-right" style={{ color: "var(--c-gold)", fontSize: "1.1rem" }} />
                  </div>
                  <p style={{ color: "var(--c-text-soft)", fontSize: "0.95rem", lineHeight: 1.9 }}>
                    隱身巷弄的精緻二館，整棟獨立。五層樓空間規劃，家庭出遊的高 CP 值首選。
                  </p>
                  <div style={{ display: "flex", gap: "8px", marginTop: "20px", flexWrap: "wrap" }}>
                    {["獨棟包棟", "溫馨家庭風", "超值價格", "靜謐巷弄"].map(t => (
                      <span key={t} className="badge">{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section" style={{ padding: "0 0 var(--space-2xl)" }}>
        <div className="container">
          <Reveal>
            <div className="cta-block">
              <span className="section-label" style={{ color: "var(--c-gold-light)", justifyContent: "center" }}>
                <span>Ready to explore</span>
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "white", marginBottom: "20px" }}>
                找到屬於你的理想空間
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", maxWidth: "450px", margin: "0 auto 40px", lineHeight: 2 }}>
                從 6 人小聚會到 38 人大派對，<br />我們都為你準備妥當。
              </p>
              <Link href="/book" className="btn btn-gold" style={{ padding: "16px 48px" }}>
                立即查詢空房與報價
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SEO Hidden Content */}
      <article className="sr-only">
        <h2>高雄包棟民宿推薦</h2>
        <p>高雄包棟民宿最佳選擇。10人包棟、20人包棟、30人包棟、40人包棟皆可接待。</p>
      </article>
    </>
  );
}
