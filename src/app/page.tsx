import type { Metadata } from "next";
import HomeTemplateExperience from "@/components/HomeTemplateExperience";

export const metadata: Metadata = {
  title: "高雄包棟民宿推薦 Hello Stay｜鹽埕 6-48 人・官方訂房查空房與報價",
  description:
    "Hello Stay 高雄鹽埕包棟民宿，提供你好哇寓所 6-26 人、溝頂民宿 10-12 人與大型團體方案。依人數與空間需求選館別，再查日期、人數、空房與報價。",
  alternates: { canonical: "https://www.hello-stay.com" },
  openGraph: {
    title: "高雄包棟民宿推薦 Hello Stay｜鹽埕 6-48 人・官方訂房查空房與報價",
    description:
      "高雄鹽埕包棟民宿，依人數與空間需求比較你好哇寓所、溝頂民宿與大型團體方案，再查空房與總價。",
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
      "高雄鹽埕區質感包棟民宿，三館可容納6至48人。配備中島廚房、麻將與桌遊設備，步行10分鐘到駁二藝術特區。自2017年起服務超過5,000組旅客。",
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
        description: "10-12人精緻獨棟，五層樓空間",
        numberOfBedrooms: 4,
        occupancy: { "@type": "QuantitativeValue", maxValue: 12 },
      },
      {
        "@type": "Accommodation",
        name: "大智若愚",
        description: "規劃中的電梯包層 / 包棟民宿，預計 2027 年中開幕，最大48人",
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
