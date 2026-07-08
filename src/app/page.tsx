import type { Metadata } from "next";
import HomeTemplateExperience from "@/components/HomeTemplateExperience";

export const metadata: Metadata = {
  title: "高雄包棟民宿推薦｜近駁二捷運・官方直訂免手續費｜Hello Stay",
  description:
    "Hello Stay 提供高雄鹽埕包棟住宿與雙館包棟方案，近駁二、大港橋與鹽埕埔站。先依人數快速選館，再查空房、報價與官方直訂免手續費資訊。",
  alternates: { canonical: "https://www.hello-stay.com" },
  openGraph: {
    title: "高雄包棟民宿推薦｜近駁二捷運・官方直訂免手續費｜Hello Stay",
    description:
      "高雄包棟民宿推薦品牌 Hello Stay，近駁二、大港橋與鹽埕埔站，先依人數快速選館，再查空房與官方直訂報價。",
    url: "https://www.hello-stay.com",
    siteName: "Hello Stay 高雄包棟民宿",
    type: "website",
  },
};

const homeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": "https://www.hello-stay.com/#lodging",
    name: "Hello Stay 高雄包棟",
    parentOrganization: { "@type": "Organization", "@id": "https://www.hello-stay.com/#organization" },
    alternateName: ["Hello Stay", "Hello Stay 高雄包棟"],
    url: "https://www.hello-stay.com",
    telephone: "+886-932-828-922",
    email: "hellohouse2017@gmail.com",
    description:
      "高雄鹽埕區質感包棟民宿，目前可訂 4 至 26 人包棟方案，另有大型團體與電梯需求的未來館別規劃。配備中島廚房、麻將與桌遊設備，步行 10 分鐘可到駁二藝術特區。",
    slogan: "高雄鹽埕・質感包棟旅宿",
    foundingDate: "2017",
    address: {
      "@type": "PostalAddress",
      streetAddress: "大公路70巷8號",
      addressLocality: "鹽埕區",
      addressRegion: "高雄市",
      postalCode: "803",
      addressCountry: "TW",
    },
    geo: { "@type": "GeoCoordinates", latitude: 22.6245, longitude: 120.2823 },
    hasMap: "https://goo.gl/maps/qxGN4mpNP8qfRCB16",
    priceRange: "$$",
    checkinTime: "16:00",
    checkoutTime: "11:00",
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
      {
        "@type": "Accommodation",
        name: "你好哇寓所",
        description: "6-26人包棟，中島廚房、麻將桌、桌遊",
        numberOfBedrooms: 6,
        occupancy: { "@type": "QuantitativeValue", maxValue: 26 },
      },
      {
        "@type": "Accommodation",
        name: "溝頂民宿",
        description: "4-12 人整棟包棟，四間客房皆有獨立衛浴，4F 為交誼廳與簡易備餐空間",
        numberOfBedrooms: 4,
        occupancy: { "@type": "QuantitativeValue", maxValue: 12 },
      },
      {
        "@type": "Accommodation",
        name: "大智若愚",
        description: "尚未開放訂房的電梯包層 / 包棟規劃，未來以正式公告內容為準",
        occupancy: { "@type": "QuantitativeValue", maxValue: 48 },
      },
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
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://booking.hello-stay.com/booking",
        inLanguage: "zh-Hant",
        actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
      },
      result: { "@type": "LodgingReservation", name: "Hello Stay 包棟預訂" },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.hello-stay.com/#organization",
    name: "Hello Stay",
    alternateName: ["Hello Stay", "Hello Stay 高雄包棟"],
    subOrganization: [
      {
        "@type": "LodgingBusiness",
        "@id": "https://www.hello-stay.com/#lodging",
        name: "你好哇寓所",
        address: {
          "@type": "PostalAddress",
          streetAddress: "大公路70巷8號",
          addressLocality: "鹽埕區",
          addressRegion: "高雄市",
          postalCode: "803",
          addressCountry: "TW",
        },
        telephone: "+886-932-828-922",
        sameAs: ["https://www.google.com/maps/place/?q=place_id:ChIJs97gIJMFbjQRzlIsr4hlP-U"],
      },
      {
        "@type": "LodgingBusiness",
        "@id": "https://www.hello-stay.com/godin/#lodging",
        name: "溝頂民宿",
        address: {
          "@type": "PostalAddress",
          streetAddress: "大公路70巷6-2號",
          addressLocality: "鹽埕區",
          addressRegion: "高雄市",
          postalCode: "803",
          addressCountry: "TW",
        },
        telephone: "+886-932-828-922",
        sameAs: ["https://www.google.com/maps/search/?api=1&query=%E6%BA%9D%E9%A0%82%E6%B0%91%E5%AE%BF"],
      },
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
    "@context": "https://schema.org",
    "@type": "WebSite",
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
      cssSelector: [".hs-hero__content", "h1", ".hs-section__head h2"],
    },
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />
      <HomeTemplateExperience />
    </>
  );
}
