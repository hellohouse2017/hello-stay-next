import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import AboutExperience from "@/components/AboutExperience";

export const metadata: Metadata = {
  title: "高雄包棟民宿品牌故事｜Hello Stay 鹽埕老屋・合法包棟與款待初心",
  description:
    "深耕高雄老鹽埕！Hello Stay 提供 4-36 人合法包棟民宿（你好哇寓所 131 號・溝頂民宿 163 號）。每間客房皆有獨立衛浴、挑高中島大廚房、麻將娛樂，投保全額公共意外責任險，漫步 10 分鐘即達駁二與大港橋。",
  keywords: [
    "高雄包棟民宿",
    "Hello Stay",
    "你好哇寓所",
    "溝頂民宿",
    "高雄包棟推薦",
    "鹽埕包棟民宿",
    "高雄合法民宿",
    "高雄老屋包棟",
    "中島廚房包棟",
    "高雄麻將包棟",
    "駁二包棟民宿",
    "大港橋住宿",
    "高雄家族旅遊包棟",
    "高雄團體住宿",
  ],
  alternates: { canonical: "https://www.hello-stay.com/about" },
  openGraph: {
    title: "高雄包棟民宿品牌故事｜Hello Stay 鹽埕老屋・合法包棟與款待初心",
    description:
      "2017 年深耕高雄鹽埕，堅持「讓聚在一起的時光不被拆散」。高市府合法登記民宿（131 號、163 號），全獨立套房、中島大廚房、手動麻將與安全承諾。",
    url: "https://www.hello-stay.com/about",
    images: [
      {
        url: "https://www.hello-stay.com/images/hellohouse/cover.webp",
        width: 1200,
        height: 630,
        alt: "Hello Stay 高雄鹽埕包棟民宿品牌故事",
      },
    ],
  },
};

export default function AboutPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://www.hello-stay.com/about/#webpage",
      url: "https://www.hello-stay.com/about",
      name: "關於 Hello Stay 高雄包棟民宿",
      description:
        "Hello Stay 高雄鹽埕包棟民宿品牌故事、創立初衷、可訂館別、規劃中館別與安全承諾。",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://www.hello-stay.com/#organization",
      name: "Hello Stay",
      url: "https://www.hello-stay.com",
      foundingDate: "2017",
      description:
        "Hello Stay 是深耕高雄鹽埕的特色包棟旅宿品牌，提供 4 至 36 人獨立包棟與老街慢活體驗。",
      address: {
        "@type": "PostalAddress",
        streetAddress: "大公路70巷8號",
        addressLocality: "鹽埕區",
        addressRegion: "高雄市",
        postalCode: "803",
        addressCountry: "TW",
      },
      subOrganization: [
        {
          "@type": "LodgingBusiness",
          name: "你好哇寓所",
          url: "https://www.hello-stay.com/hellohouse",
          telephone: "+886-932-828-922",
          address: {
            "@type": "PostalAddress",
            streetAddress: "大公路70巷8號",
            addressLocality: "鹽埕區",
            addressRegion: "高雄市",
            postalCode: "803",
            addressCountry: "TW",
          },
        },
        {
          "@type": "LodgingBusiness",
          name: "溝頂民宿",
          url: "https://www.hello-stay.com/godin",
          telephone: "+886-932-828-922",
          address: {
            "@type": "PostalAddress",
            streetAddress: "大公路70巷6-2號",
            addressLocality: "鹽埕區",
            addressRegion: "高雄市",
            postalCode: "803",
            addressCountry: "TW",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "首頁",
          item: "https://www.hello-stay.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "關於我們",
          item: "https://www.hello-stay.com/about",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "包棟期間會有其他陌生客人或管家同住嗎？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "完全不會！Hello Stay 實行全棟獨立包棟制，入住期間整棟建築包含所有公共空間（中島廚房、交誼廳、麻將桌）皆由您的團體專屬獨享，絕不分拆出租給其他人、無陌生人同住。客房依預訂方案開放，未開放之房間會上鎖以確保房務維護。管家僅在入住接待與退房時提供必要協助，給您百分之百的私密與自在。",
          },
        },
        {
          "@type": "Question",
          name: "民宿有提供開伙備餐與麻將娛樂設備嗎？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "有的！「你好哇寓所」1 樓設有挑高豪華中島廚房（配置雙口 IH 爐、微波爐、烤箱、雙門大冰箱、RO 飲水機與完整鍋碗餐具）與手動麻將桌，非常適合煮火鍋或備餐聚會；「溝頂民宿」4 樓交誼廳亦配備微波爐、流理台、冰箱與休閒麻將桌。為維護老街安寧，夜間 23:00 後請於室內降低音量。",
          },
        },
        {
          "@type": "Question",
          name: "可以開立統編收據報帳嗎？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "可以！Hello Stay 為高雄市政府合法登記民宿，我們提供蓋有合法民宿專用章、可填寫公司抬頭與統一編號的合法收據（免用統一發票收據），完全符合公司企業、學校機關與團體報帳核銷規範。",
          },
        },
        {
          "@type": "Question",
          name: "兩館之間距離多遠？如果人數超過 26 人怎麼安排？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "「你好哇寓所」與「溝頂民宿」位於同一巷弄內，兩館門口步行僅約 5 秒！27 至 36 人的大型團體可選擇「雙館包棟」，白天全部聚在你好哇寓所的大中島廚房與挑高空間熱鬧交流，晚上分流兩館共 10 間獨立套房安靜好眠，兼顧熱鬧聚會與睡眠品質。",
          },
        },
        {
          "@type": "Question",
          name: "如何預訂與確認即時報價？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "官網提供透明即時的線上查房系統，您可以前往「即時查空房」選擇入住日期與人數試算精準金額；若有特殊包棟需求、客製化活動或超過 36 人，也歡迎直接加入 Hello Stay 官方 LINE（@hellostay）由專人客服即時為您確認與保留檔期。",
          },
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <div className="w">
        <Breadcrumb items={[{ name: "關於我們", href: "/about" }]} />
      </div>
      <AboutExperience />
    </>
  );
}
