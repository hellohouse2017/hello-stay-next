import type { Metadata } from "next";
import HomeTemplateExperience from "@/components/HomeTemplateExperience";
import { homepageFaqItems, homepageLastReviewed } from "@/data/homepage-faq";
import { godin, hellohouse } from "@/data/properties";
import { getAlternateLanguageMap } from "@/i18n/config";

const homeDescription =
  "Hello Stay 高雄鹽埕官方住宿入口：你好哇寓所、溝頂民宿與雙館包棟方案，提供 4-36 人整棟住宿、獨立衛浴與聚會空間，近駁二與捷運站，可直接查空房與官方報價。";

export const metadata: Metadata = {
  title: "Hello Stay 高雄鹽埕包棟民宿｜你好哇寓所與溝頂民宿官方直訂",
  description: homeDescription,
  alternates: {
    canonical: "https://www.hello-stay.com",
    languages: getAlternateLanguageMap(""),
  },
  openGraph: {
    title: "Hello Stay 高雄鹽埕包棟民宿｜官方住宿與訂房入口",
    description:
      "高雄鹽埕 4-36 人包棟住宿，提供 4 房、6 房與 10 房方案，全獨立套房衛浴・包棟不鎖房，依人數或房間數查即時空房與官方報價。",
    url: "https://www.hello-stay.com",
    siteName: "Hello Stay 高雄包棟民宿",
    type: "website",
    images: [
      {
        url: "https://www.hello-stay.com/images/hellohouse/cover.webp",
        width: 1200,
        height: 466,
        alt: "Hello Stay 你好哇寓所高雄包棟民宿公共空間",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello Stay 高雄鹽埕包棟民宿｜官方住宿與訂房入口",
    description: "高雄鹽埕 4-36 人包棟住宿，4 房、6 房與 10 房全獨立套房，包棟不鎖房，即時查空房與免手續費直訂。",
    images: ["https://www.hello-stay.com/images/hellohouse/cover.webp"],
  },
};

const organizationId = "https://www.hello-stay.com/#organization";
const websiteId = "https://www.hello-stay.com/#website";
const webpageId = "https://www.hello-stay.com/#webpage";
const helloHouseId = "https://www.hello-stay.com/hellohouse#lodging";
const godinId = "https://www.hello-stay.com/godin#lodging";
const dualStayId = "https://www.hello-stay.com/#dual-stay";

const reserveAction = {
  "@type": "ReserveAction",
  target: {
    "@type": "EntryPoint",
    urlTemplate: "https://booking.hello-stay.com/booking",
    inLanguage: "zh-Hant",
    actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
  },
  result: { "@type": "LodgingReservation", name: "Hello Stay 包棟預訂" },
};

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Hello Stay",
      alternateName: ["Hello Stay 高雄包棟"],
      url: "https://www.hello-stay.com",
      image: "https://www.hello-stay.com/images/hellohouse/cover.webp",
      foundingDate: "2017",
      email: "hellohouse2017@gmail.com",
      telephone: "+886-932-828-922",
      subOrganization: [{ "@id": helloHouseId }, { "@id": godinId }],
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
        "https://www.google.com/maps/place/?q=place_id:ChIJs97gIJMFbjQRzlIsr4hlP-U",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: "https://www.hello-stay.com",
      name: "Hello Stay 高雄包棟民宿",
      inLanguage: ["zh-Hant", "en", "ja", "ko", "vi"],
      publisher: { "@id": organizationId },
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: "https://www.hello-stay.com",
      name: "Hello Stay 高雄鹽埕包棟民宿｜官方住宿與訂房入口",
      description: homeDescription,
      inLanguage: "zh-Hant-TW",
      isPartOf: { "@id": websiteId },
      about: [{ "@id": helloHouseId }, { "@id": godinId }, { "@id": dualStayId }],
      mainEntity: { "@id": "https://www.hello-stay.com/#stay-options" },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://www.hello-stay.com/images/hellohouse/cover.webp",
      },
      dateModified: homepageLastReviewed,
    },
    {
      "@type": "LodgingBusiness",
      "@id": helloHouseId,
      name: hellohouse.name,
      alternateName: hellohouse.nameEn,
      url: "https://www.hello-stay.com/hellohouse",
      image: `https://www.hello-stay.com${hellohouse.coverImage}`,
      description: hellohouse.description,
      parentOrganization: { "@id": organizationId },
      telephone: hellohouse.phone,
      email: "hellohouse2017@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: hellohouse.addressFull.street,
        addressLocality: hellohouse.addressFull.district,
        addressRegion: hellohouse.addressFull.city,
        postalCode: hellohouse.addressFull.zip,
        addressCountry: "TW",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: hellohouse.location.lat,
        longitude: hellohouse.location.lng,
      },
      hasMap: hellohouse.mapUrl,
      priceRange: "$$",
      checkinTime: hellohouse.checkin,
      checkoutTime: hellohouse.checkout,
      numberOfRooms: hellohouse.totalRooms,
      containsPlace: {
        "@type": "Accommodation",
        name: `${hellohouse.name}包棟住宿`,
        numberOfBedrooms: hellohouse.totalRooms,
        occupancy: {
          "@type": "QuantitativeValue",
          minValue: hellohouse.capacity.min,
          maxValue: hellohouse.capacity.max,
        },
      },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "中島廚房", value: true },
        { "@type": "LocationFeatureSpecification", name: "手動麻將桌", value: true },
        { "@type": "LocationFeatureSpecification", name: "免費 Wi-Fi", value: true },
        { "@type": "LocationFeatureSpecification", name: "電子密碼鎖自助入住", value: true },
      ],
      sameAs: ["https://www.google.com/maps/place/?q=place_id:ChIJs97gIJMFbjQRzlIsr4hlP-U"],
      potentialAction: reserveAction,
    },
    {
      "@type": "LodgingBusiness",
      "@id": godinId,
      name: godin.name,
      alternateName: godin.nameEn,
      url: "https://www.hello-stay.com/godin",
      image: `https://www.hello-stay.com${godin.coverImage}`,
      description: godin.description,
      parentOrganization: { "@id": organizationId },
      telephone: godin.phone,
      email: "hellohouse2017@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: godin.addressFull.street,
        addressLocality: godin.addressFull.district,
        addressRegion: godin.addressFull.city,
        postalCode: godin.addressFull.zip,
        addressCountry: "TW",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: godin.location.lat,
        longitude: godin.location.lng,
      },
      hasMap: godin.mapUrl,
      priceRange: "$$",
      checkinTime: godin.checkin,
      checkoutTime: godin.checkout,
      numberOfRooms: godin.totalRooms,
      containsPlace: {
        "@type": "Accommodation",
        name: `${godin.name}包棟住宿`,
        numberOfBedrooms: godin.totalRooms,
        occupancy: {
          "@type": "QuantitativeValue",
          minValue: godin.capacity.min,
          maxValue: godin.capacity.max,
        },
      },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "簡易備餐空間", value: true },
        { "@type": "LocationFeatureSpecification", name: "手動麻將桌", value: true },
        { "@type": "LocationFeatureSpecification", name: "免費 Wi-Fi", value: true },
        { "@type": "LocationFeatureSpecification", name: "電子密碼鎖自助入住", value: true },
      ],
      sameAs: [godin.mapUrl],
      potentialAction: reserveAction,
    },
    {
      "@type": "Service",
      "@id": dualStayId,
      name: "Hello Stay 雙館包棟",
      description: "你好哇寓所與溝頂民宿兩館合住，通常適合 27-34 人，35-36 人須加床；兩館步行約 5 秒。",
      provider: { "@id": organizationId },
      areaServed: { "@type": "City", name: "高雄市" },
      potentialAction: reserveAction,
    },
    {
      "@type": "ItemList",
      "@id": "https://www.hello-stay.com/#stay-options",
      name: "Hello Stay 可訂住宿方案",
      numberOfItems: 3,
      itemListElement: [
        { "@type": "ListItem", position: 1, item: { "@id": godinId } },
        { "@type": "ListItem", position: 2, item: { "@id": helloHouseId } },
        { "@type": "ListItem", position: 3, item: { "@id": dualStayId } },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.hello-stay.com/#faq",
      mainEntity: homepageFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

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
