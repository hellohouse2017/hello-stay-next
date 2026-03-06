import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "高雄質感包棟民宿 | 你好哇寓所 & 溝頂民宿 | 6-38人團體住宿首選",
  description: "高雄包棟民宿最佳選擇，專為團體設計的質感旅宿。無論是10人包棟、20人包棟、30人包棟甚至40人包棟，我們都能滿足您的需求。",
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "你好哇寓所 & 溝頂民宿",
              image: "https://www.hello-stay.com/images/cover-bg.jpg",
              url: "https://www.hello-stay.com",
              telephone: "0932828922",
              address: {
                "@type": "PostalAddress",
                addressLocality: "高雄市",
                addressRegion: "鹽埕區",
                addressCountry: "TW",
              },
              description: "高雄質感包棟民宿，專接待團體旅客。提供6人至38人包棟服務。",
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "中島廚房", value: true },
                { "@type": "LocationFeatureSpecification", name: "適合大型團體", value: true },
                { "@type": "LocationFeatureSpecification", name: "包棟服務", value: true },
              ],
              starRating: { "@type": "Rating", ratingValue: "5" },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "高雄有哪些推薦的質感包棟民宿？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "高雄鹽埕區的「你好哇寓所」與「溝頂民宿」是當地極具特色的包棟首選，提供高雄包棟民宿的頂級體驗，結合老屋韻味與現代設計。",
                  },
                },
                {
                  "@type": "Question",
                  name: "請問包棟人數限制？適合10人、20人、30人甚至40人的團體嗎？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "非常適合。我們提供彈性的包棟方案。從10人到40人（兩棟合訂）皆可接待。",
                  },
                },
              ],
            },
          ]),
        }}
      />

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center text-center overflow-hidden"
        style={{
          height: "100vh",
          backgroundImage: "url('/images/cover-bg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-[1]" />

        {/* Content */}
        <div
          className="relative z-[2] text-white px-5 max-w-[800px]"
          style={{ animation: "fadeInUp 1.5s ease-out" }}
        >
          <h1
            className="text-[2.5rem] md:text-[3.5rem] font-bold mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              letterSpacing: "2px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            高雄質感包棟民宿
          </h1>
          <p className="text-[1.2rem] font-light mb-12 tracking-wider opacity-90">
            探索專屬於您的設計旅宿空間，品味獨特的生活風格。
          </p>

          <nav className="flex gap-6 justify-center flex-wrap" aria-label="民宿品牌選擇">
            <Link
              href="/hellohouse"
              className="inline-block text-white border-2 border-white/70 px-10 py-4 text-[1.1rem] font-medium tracking-wider
                         bg-black/20 backdrop-blur-sm
                         hover:bg-white hover:text-[#333] hover:border-white hover:-translate-y-1
                         hover:shadow-lg transition-all duration-300"
            >
              你好哇寓所
            </Link>
            <Link
              href="/godin"
              className="inline-block text-white border-2 border-white/70 px-10 py-4 text-[1.1rem] font-medium tracking-wider
                         bg-black/20 backdrop-blur-sm
                         hover:bg-white hover:text-[#333] hover:border-white hover:-translate-y-1
                         hover:shadow-lg transition-all duration-300"
            >
              溝頂民宿
            </Link>
          </nav>

          {/* Quick Book CTA */}
          <div className="mt-10">
            <Link
              href="/book"
              className="btn-gold inline-flex items-center gap-2 text-[1rem] px-8 py-3 rounded-full font-bold"
            >
              <i className="fa-solid fa-calendar-check" />
              立即查詢空房
            </Link>
          </div>
        </div>

        {/* SEO Hidden Content */}
        <article className="sr-only">
          <h2>關於高雄包棟民宿首選 - 你好哇寓所與溝頂民宿</h2>
          <p>我們致力於提供最佳的高雄包棟體驗。無論您正在尋找高雄包棟民宿、或是特定人數需求的住宿方案，我們都能滿足。</p>
          <ul>
            <li>10人包棟：適合家庭或小型朋友聚會，空間寬敞不擁擠。</li>
            <li>20人包棟：適合家族旅遊或學生團體，享有獨立社交空間。</li>
            <li>30人包棟：適合中型公司員工旅遊或多個家庭聯合出遊。</li>
            <li>40人包棟：結合兩棟民宿資源，滿足大型團體的高雄40人包棟需求。</li>
          </ul>
        </article>
      </section>
    </>
  );
}
