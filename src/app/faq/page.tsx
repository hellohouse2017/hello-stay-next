import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import FaqExperience from "@/components/FaqExperience";
import { homepageFaqItems } from "@/data/homepage-faq";

export const metadata: Metadata = {
  title: "常見問題 FAQ｜高雄包棟民宿預訂、設備、進退房與生活公約｜Hello Stay",
  description:
    "Hello Stay 高雄鹽埕包棟民宿官方常見問題知識庫。30 題完整解析：包棟整棟專屬獨享、依預訂房數開放客房、自助密碼鎖進出、中島廚房與手動麻將設備、訂金改期保留、押金退還、合法登記 131/163 號與停車指南。",
  alternates: {
    canonical: "https://www.hello-stay.com/faq",
  },
  openGraph: {
    title: "常見問題與服務指南 FAQ｜Hello Stay 高雄包棟民宿",
    description:
      "最完整的包棟常見問題解答：進退房時間、整棟專屬獨享、手動麻將、中島廚房、押金與付款改期完整說明。",
    url: "https://www.hello-stay.com/faq",
    images: [
      {
        url: "https://www.hello-stay.com/images/hellohouse/cover.webp",
        width: 1200,
        height: 630,
        alt: "Hello Stay 常見問題 FAQ",
      },
    ],
  },
};

export default function FaqPage() {
  const faqSchemaItems = homepageFaqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": "https://www.hello-stay.com/#faq",
            mainEntity: faqSchemaItems,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "首頁",
                item: "https://www.hello-stay.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "常見問題",
                item: "https://www.hello-stay.com/faq",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            name: "Hello Stay 高雄包棟民宿",
            url: "https://www.hello-stay.com",
            telephone: "+886-932-828-922",
            address: {
              "@type": "PostalAddress",
              addressLocality: "高雄市",
              addressRegion: "鹽埕區",
              addressCountry: "TW",
            },
          },
        ]}
      />
      <FaqExperience />
    </>
  );
}
