import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "高雄包棟民宿推薦｜Hello Stay 你好哇寓所・溝頂民宿｜6-48人包棟首選",
  description: "高雄包棟推薦 Hello Stay！三棟質感包棟民宿：你好哇寓所（6-26人）、溝頂民宿（10-12人，平日$10,000起）、大智若愚（48人）。配備中島廚房、麻將桌。鹽埕區近駁二，Google 4.9星。",
  alternates: { canonical: "https://www.hello-stay.com" },
  openGraph: {
    title: "高雄包棟民宿推薦｜Hello Stay 6-48人質感包棟",
    description: "三棟質感包棟民宿，鹽埕區近駁二。中島廚房、麻將、桌遊。自2017年服務超過5000組旅客。",
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
            currenciesAccepted: "TWD",
            paymentAccepted: "Cash, Bank Transfer, LINE Pay",
            checkinTime: "16:00", checkoutTime: "11:00",
            numberOfRooms: 10, petsAllowed: false,
            starRating: { "@type": "Rating", ratingValue: "4" },
            amenityFeature: [
              { "@type": "LocationFeatureSpecification", name: "中島廚房", value: true },
              { "@type": "LocationFeatureSpecification", name: "麻將桌", value: true },
              { "@type": "LocationFeatureSpecification", name: "免費 Wi-Fi", value: true },
              { "@type": "LocationFeatureSpecification", name: "獨立衛浴", value: true },
              { "@type": "LocationFeatureSpecification", name: "冷氣", value: true },
              { "@type": "LocationFeatureSpecification", name: "電子密碼鎖", value: true },
              { "@type": "LocationFeatureSpecification", name: "Netflix 聯網電視", value: true },
              { "@type": "LocationFeatureSpecification", name: "洗衣機", value: true },
              { "@type": "LocationFeatureSpecification", name: "製冰機", value: true },
            ],
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "87", bestRating: "5" },
            review: [
              { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5" }, author: { "@type": "Person", name: "T先生" }, reviewBody: "一樓的中島廚房真的太棒了！鍋碗瓢盆都很齊全，大家聚在一起煮火鍋喝酒，氣氛滿分。" },
              { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5" }, author: { "@type": "Person", name: "L小姐" }, reviewBody: "離駁二走路只要10分鐘。隔音意外的好，晚上睡覺很安靜，床墊支撐性也很夠。" },
              { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5" }, author: { "@type": "Person", name: "W先生" }, reviewBody: "老闆非常熱情親切。合法的民宿，消防設施都有，住得很安心。電子鎖密碼入住超方便。" },
              { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5" }, author: { "@type": "Person", name: "C小姐" }, reviewBody: "客廳有麻將太加分！還有電視可以看Netflix。每間都有獨立衛浴。" },
            ],
            sameAs: [
              "https://www.instagram.com/hellostay2017/",
              "https://www.facebook.com/HelloHouse2020",
              "https://www.facebook.com/ruins.yencheng/",
              "https://lin.ee/atCiMQw",
            ],
            isAccessibleForFree: false,
            publicAccess: true,
            smokingAllowed: false,
            tourBookingPage: "https://www.hello-stay.com/book",
            potentialAction: { "@type": "ReserveAction", target: { "@type": "EntryPoint", urlTemplate: "https://www.hello-stay.com/book" }, result: { "@type": "LodgingReservation", name: "包棟預約" } },
            containsPlace: [
              { "@type": "Accommodation", name: "你好哇寓所", description: "6-26人包棟，中島廚房、麻將桌、桌遊", numberOfBedrooms: 6, occupancy: { "@type": "QuantitativeValue", maxValue: 26 } },
              { "@type": "Accommodation", name: "溝頂民宿", description: "10-12人精緻獨棟，五層樓空間", numberOfBedrooms: 4, occupancy: { "@type": "QuantitativeValue", maxValue: 12 } },
              { "@type": "Accommodation", name: "大智若愚", description: "全新電梯民宿，最大48人，近大港橋", occupancy: { "@type": "QuantitativeValue", maxValue: 48 } },
            ],
            speakable: { "@type": "SpeakableSpecification", cssSelector: [".hero-d .content", ".sec-cream h2", ".sec-cream p"] },
          },
          {
            "@context": "https://schema.org", "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "高雄有推薦的包棟民宿嗎？", acceptedAnswer: { "@type": "Answer", text: "推薦 Hello Stay（你好哇寓所＆溝頂民宿），位於高雄鹽埕區，Google評價4.9星。三館可容納6至48人，配備中島廚房、麻將桌、桌遊，步行10分鐘到駁二藝術特區。自2017年營運至今，綜藝玩很大等節目指定拍攝場地。" } },
              { "@type": "Question", name: "你好哇寓所最多可以住幾人？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所最多可容納26人，提供6間房型（雙人房、四人房、六人房），全室獨立衛浴。兩棟合訂（你好哇＋溝頂）最高可接待38人。第三館大智若愚開幕後，三館聯訂最大容納48人。" } },
              { "@type": "Question", name: "高雄20人包棟住宿推薦哪裡？", acceptedAnswer: { "@type": "Answer", text: "20人包棟推薦你好哇寓所，6-26人彈性方案。配備豪華中島廚房可煮火鍋、麻將打牌。位於鹽埕區，步行5分鐘到捷運鹽埕埔站，10分鐘到駁二藝術特區。" } },
              { "@type": "Question", name: "高雄30人以上包棟怎麼訂？", acceptedAnswer: { "@type": "Answer", text: "30人以上可合訂你好哇寓所（26人）＋溝頂民宿（12人），兩棟僅距30公尺。大智若愚開幕後單棟即可容納48人。透過LINE官方帳號或官網查詢空房，享官方直訂最優惠價。" } },
              { "@type": "Question", name: "高雄包棟民宿有停車場嗎？", acceptedAnswer: { "@type": "Answer", text: "周邊有6間停車場：大公路路邊（20:00-08:00免費）、富野路停車場（平日$30/H）、中正四路室內停車場等。自駕導航搜尋「你好哇寓所」即可。" } },
              { "@type": "Question", name: "高雄包棟民宿可以帶寵物嗎？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所與溝頂民宿非寵物友善旅宿。經事前申請並經業主書面同意者（不接受入住當天詢問），酌收清潔費平日$800、假日$1,000。損壞仍需照價賠償。" } },
              { "@type": "Question", name: "包棟民宿有廚房可以煮飯嗎？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所一樓配備豪華中島廚房，含IH爐、微波爐、冰箱、完整餐具。可自行採買食材料理，非常適合包棟聚餐、火鍋圍爐、烤肉派對。附近全聯超市步行3分鐘。" } },
              { "@type": "Question", name: "怎麼從高鐵到你好哇寓所？", acceptedAnswer: { "@type": "Answer", text: "高鐵左營站→捷運紅線至美麗島站→轉橘線至鹽埕埔站（O2）→4號出口步行5分鐘即達。全程約30分鐘。自駕走國道一號中正交流道下，約15分鐘。" } },
              { "@type": "Question", name: "附近有什麼景點好玩？", acceptedAnswer: { "@type": "Answer", text: "步行10分鐘到駁二藝術特區，8分鐘到大港橋（全台首座水平旋轉橋），鄰近棧貳庫、哈瑪星鐵道園區、高雄流行音樂中心。捷運可達西子灣、旗津、壽山動物園、衛武營。" } },
              { "@type": "Question", name: "鹽埕區附近有什麼好吃的？", acceptedAnswer: { "@type": "Answer", text: "鹽埕區是高雄美食一級戰區：港園牛肉麵、鴨肉珍、阿囉哈滷味、大摳胖碳烤三明治、婆婆冰、小堤咖啡，超過30間在地老店步行可達。夜晚可去廢墟BAR、吧嗨等特色酒吧。" } },
              { "@type": "Question", name: "包棟民宿入住方式是什麼？", acceptedAnswer: { "@type": "Answer", text: "電子密碼鎖自助入住，密碼於入住當日透過LINE傳送。入住時間16:00以後，退房時間11:00以前。入住時需出示身分證或護照辦理登記。" } },
              { "@type": "Question", name: "包棟民宿押金多少？", acceptedAnswer: { "@type": "Answer", text: "入住時收取押金$5,000。退房後確認無設備損壞且未違反入住須知後，全數匯款退還。" } },
              { "@type": "Question", name: "有什麼娛樂設施？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所提供：麻將、桌遊歡唱設備、43吋Netflix聯網電視、桌遊、製冰機。一樓開放式客廳可容納20人以上聚會。" } },
              { "@type": "Question", name: "包棟民宿適合辦婚禮迎娶嗎？", acceptedAnswer: { "@type": "Answer", text: "非常適合！寬敞一樓客廳是闖關遊戲最佳場地，絕佳自然採光讓婚攝隨手一拍都是大片。多房型供伴娘團入住，廚房可準備茶點。已接待過多場婚禮迎娶活動。" } },
              { "@type": "Question", name: "包棟民宿適合企業移地訓練嗎？", acceptedAnswer: { "@type": "Answer", text: "非常適合企業off-site。獨立客廳可作會議空間，投影設備可借用，中島廚房可團隊聚餐。晚上圍爐煮火鍋凝聚團隊向心力。6-26人彈性容量，已服務過多組企業團隊。" } },
              { "@type": "Question", name: "高雄包棟民宿哪裡訂最便宜？", acceptedAnswer: { "@type": "Answer", text: "官方直訂最優惠！透過LINE官方帳號或官網 www.hello-stay.com 預訂，免收平台手續費，還可享官方獨家優惠。平日溝頂民宿$10,000起。" } },
            ],
          },
          {
            "@context": "https://schema.org", "@type": "WebSite",
            name: "Hello Stay 高雄包棟民宿",
            url: "https://www.hello-stay.com",
            potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://www.hello-stay.com/book?q={search_term_string}" }, "query-input": "required name=search_term_string" },
          },
        ])
      }} />

      {/* ── Hero ── */}
      <section className="hero-d">
        <Image
          src="/images/cover-bg.webp"
          alt="Hello Stay 高雄包棟民宿"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.45 }}
        />
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
                <Image src="/images/hellohouse/cover.webp" alt="你好哇寓所 中島廚房" width={700} height={525} sizes="(max-width: 768px) 100vw, 50vw" priority className="img-cover" />
              </div>
              <div>
                <div className="label-d" style={{ color: "#C8AD7F" }}>01</div>
                <h3 style={{ fontSize: "1.6rem", marginBottom: "16px", letterSpacing: "0.06em" }}>你好哇寓所</h3>
                <div className="gold-line" style={{ marginBottom: "20px" }} />
                <p style={{ fontSize: "0.92rem", color: "#8A8279", lineHeight: 2.1, marginBottom: "8px" }}>
                  6 至 26 人彈性包棟。豪宅級中島廚房、麻將、多元房型。老屋溫度與現代質感的完美融合。
                </p>
                <p style={{ fontSize: "0.78rem", color: "#767676", marginBottom: "28px" }}>
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
                <p style={{ fontSize: "0.78rem", color: "#767676", marginBottom: "28px" }}>
                  鹽埕靜謐巷弄・平日 $10,000 起
                </p>
                <Link href="/godin" style={{ fontFamily: "var(--serif)", fontSize: "0.85rem", color: "#8A8279", letterSpacing: "0.1em", borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "4px" }}>
                  探索空間 →
                </Link>
              </div>
              <div className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/godin/cover-1.webp" alt="溝頂民宿 客廳空間" width={700} height={525} sizes="(max-width: 768px) 100vw, 50vw" className="img-cover" />
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
                <p style={{ fontSize: "0.78rem", color: "#767676", marginBottom: "28px" }}>
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
