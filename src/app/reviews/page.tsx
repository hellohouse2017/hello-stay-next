import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import ReviewsExperience from "@/components/ReviewsExperience";
import {
  reviewStats,
  verifiedReviews,
  reviewFaqs,
} from "@/data/reviews-data";

export const metadata: Metadata = {
  title: "高雄包棟民宿評價推薦｜住客真實入住回饋與 Google 五星口碑｜Hello Stay",
  description:
    "整理 Google 商家真實好評（你好哇寓所累積 75 則 4.5 星評價）與住客真實回饋！深入了解你好哇寓所（中島大廚房・8-26人聚會）與溝頂民宿（獨棟分層・4-12人）的真實入住心得。全獨立套房、麻將娛樂、走路 10 分鐘到駁二，高雄家族旅遊與朋友包棟首選推薦。",
  keywords: [
    "高雄包棟民宿評價",
    "高雄包棟民宿推薦",
    "你好哇寓所評價",
    "溝頂民宿評價",
    "Hello Stay 評價",
    "高雄包棟 Google 評價",
    "高雄家族旅遊包棟",
    "高雄 10人包棟推薦",
    "高雄 20人包棟推薦",
    "高雄中島廚房包棟",
    "高雄麻將包棟民宿",
    "高雄迎娶民宿推薦",
    "鹽埕包棟民宿",
    "駁二包棟民宿推薦",
  ],
  alternates: { canonical: "https://www.hello-stay.com/reviews" },
  openGraph: {
    title: "高雄包棟民宿評價推薦｜住客真實入住回饋與 Google 五星口碑｜Hello Stay",
    description:
      "Google 商家 4.5 星真實好評！全獨立套房・中島大廚房・麻將娛樂・步行駁二生活圈，看真實住客怎麼說。",
    url: "https://www.hello-stay.com/reviews",
    images: [
      {
        url: "https://www.hello-stay.com/images/hellohouse/cover.webp",
        width: 1200,
        height: 630,
        alt: "Hello Stay 高雄包棟民宿住客評價與推薦",
      },
    ],
  },
};

export default function ReviewsPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      name: "Hello Stay 你好哇寓所＆溝頂民宿",
      image: "https://www.hello-stay.com/images/hellohouse/cover.webp",
      url: "https://www.hello-stay.com/reviews",
      telephone: "+886-932-828-922",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "大公路70巷8號",
        addressLocality: "鹽埕區",
        addressRegion: "高雄市",
        postalCode: "803",
        addressCountry: "TW",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: reviewStats.averageRating,
        reviewCount: "75",
        bestRating: "5",
        worstRating: "1",
      },
      review: verifiedReviews.map((rev) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: rev.author,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: rev.rating.toString(),
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody: rev.content,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: reviewFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer + (faq.tip ? ` (${faq.tip})` : ""),
        },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <div className="w">
        <Breadcrumb items={[{ name: "住客真實評價", href: "/reviews" }]} />
      </div>
      <ReviewsExperience />
    </>
  );
}
