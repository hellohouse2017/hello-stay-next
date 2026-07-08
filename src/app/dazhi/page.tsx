import type { Metadata } from "next";
import PropertyShowcasePage from "@/components/PropertyShowcasePage";

const lineUrl = "https://lin.ee/atCiMQw";

export const metadata: Metadata = {
  title: "大智若愚｜規劃中，尚未開放訂房",
  description:
    "大智若愚為 Hello Stay 規劃中的大型館別，目前尚未正式開放訂房。已知方向是一層三房一廳、電梯動線與大型團體包層 / 包棟規劃。",
  alternates: { canonical: "https://www.hello-stay.com/dazhi" },
  openGraph: {
    title: "大智若愚｜規劃中，尚未開放訂房",
    description:
      "大港橋旁規劃中的大型團體館別，目前尚未正式開放訂房。",
    url: "https://www.hello-stay.com/dazhi",
    images: [
      {
        url: "https://www.hello-stay.com/images/dazhi/building-render.webp",
        width: 1200,
        height: 630,
        alt: "大智若愚建築規劃示意",
      },
    ],
  },
};

const heroStats = [
  { label: "目前規劃", value: "20-48 人" },
  { label: "空間方向", value: "一層三房一廳" },
  { label: "動線重點", value: "全新電梯大樓" },
  { label: "使用方式", value: "可包層 可包棟" },
];

const overviewCards = [
  {
    id: "dazhi-floor-plan",
    kicker: "樓層規劃",
    title: "一層三房一廳",
    summary: "可從單層評估，也能往上擴成多層與大型團體安排。",
    image: {
      src: "/images/dazhi/building-render.webp",
      alt: "大智若愚建築規劃示意圖",
    },
    linkLabel: "看目前已知方向",
  },
  {
    id: "dazhi-elevator",
    kicker: "動線重點",
    title: "電梯動線",
    summary: "未來會是 Hello Stay 第一個以電梯為前提規劃的館別，對長輩與大件行李更友善。",
    image: {
      src: "/images/dazhi/building-original.webp",
      alt: "大智若愚建築原始外觀參考",
    },
    linkLabel: "看目前已知重點",
  },
  {
    id: "dazhi-group-fit",
    kicker: "大型團體",
    title: "大型團體優先追蹤",
    summary: "如果你常常超過 26 人，或不想再拆雙館，這會是更直接的大型團體方向。",
    image: {
      src: "/images/dazhi/building-render.webp",
      alt: "大智若愚大型團體館別規劃示意",
    },
    linkLabel: "看適合情境",
  },
];

const detailCards = [
  {
    id: "dazhi-floor-plan",
    kicker: "樓層規劃",
    title: "一層三房一廳規劃",
    description: "目前已知方向是一層三房一廳，可依人數評估只租單層，或擴大到多層與整棟。",
    image: {
      src: "/images/dazhi/building-render.webp",
      alt: "大智若愚一層三房一廳規劃示意",
    },
    specs: [
      { label: "使用方式", value: "單層或整棟規劃" },
      { label: "基本單位", value: "一層三房一廳" },
      { label: "適合人數", value: "6-10 人起可先評估包層" },
      { label: "目前不能保證", value: "房價與設備尚未公告" },
    ],
    groups: [
      {
        title: "現在已知",
        items: ["一層三房一廳", "可包層 可包棟", "會保留團體公共空間"],
      },
      {
        title: "適合需求",
        items: ["預算想先從單層開始", "不想跟其他旅客共用", "需要分層安排團員"],
      },
    ],
  },
  {
    id: "dazhi-elevator",
    kicker: "動線重點",
    title: "電梯與大型行李動線",
    description: "這一館最明確的差異，不是文青風格，而是電梯帶來的實用性，特別適合長輩同行與器材較多的團體。",
    image: {
      src: "/images/dazhi/building-original.webp",
      alt: "大智若愚電梯建築規劃參考",
    },
    specs: [
      { label: "動線重點", value: "電梯大樓" },
      { label: "適合情境", value: "長輩同行 器材較多 大型行李" },
      { label: "相較現有館別", value: "唯一規劃電梯" },
      { label: "目前不能保證", value: "實際房內設備尚未公告" },
    ],
    groups: [
      {
        title: "誰最需要",
        items: ["企業員旅", "球隊或活動團體", "有長輩同行的家族旅行"],
      },
      {
        title: "客人最會問",
        items: ["有沒有電梯", "能不能減少搬行李", "能不能分層安排還保有公共區"],
      },
    ],
  },
  {
    id: "dazhi-group-fit",
    kicker: "大型團體",
    title: "給大型團體的第三選項",
    description: "如果現在兩館加起來還是不夠直觀，或你不想拆成多筆安排，大智若愚會是未來更直接的解法。",
    image: {
      src: "/images/dazhi/building-render.webp",
      alt: "大智若愚大型包棟規劃示意",
    },
    specs: [
      { label: "目前規劃", value: "20-48 人" },
      { label: "主要客群", value: "企業 家族 球隊 活動團體" },
      { label: "決策時機", value: "先留日期與人數" },
      { label: "現在建議", value: "先登記 不先承諾未定細節" },
    ],
    groups: [
      {
        title: "適合追蹤",
        items: ["常常超過 26 人", "希望單館處理", "重視電梯和大型團體動線"],
      },
      {
        title: "目前不能保證的事項",
        items: ["還未正式開放訂房", "房價與實際房內設備尚未最終公告", "目前以需求登記為主"],
      },
    ],
  },
];

const houseFacts = [
  { label: "館別定位", value: "大型團體與電梯動線優先" },
  { label: "空間方向", value: "一層三房一廳 可包層 可包棟" },
  { label: "人數級距", value: "大型團體優先" },
  { label: "目前不能保證", value: "尚未正式開放 以需求登記為主" },
];

const stayGuides = [
  "目前已知的是電梯 大型容量與包層方向",
  "細部設備與房價仍以正式公告為準",
  "近期入住仍以你好哇 溝頂或雙館方案為主",
  "可先留下日期 人數與包層需求",
];

const fitGuides = [
  { label: "適合團體", value: "企業員旅 大型家族 球隊 活動住宿" },
  { label: "核心優勢", value: "電梯與大型行李動線" },
  { label: "人數情境", value: "超過 26 人時更直觀" },
  { label: "目前不能保證", value: "留下需求與預計日期" },
];

const galleryImages = [
  {
    src: "/images/dazhi/building-render.webp",
    alt: "大智若愚建築渲染規劃圖",
    caption: "建築規劃示意",
  },
  {
    src: "/images/dazhi/building-original.webp",
    alt: "大智若愚建築原始外觀參考",
    caption: "基地外觀參考",
  },
];

const locationSpots = [
  { name: "大港橋", detail: "步行可達" },
  { name: "駁二大義倉庫群", detail: "步行可達" },
  { name: "鹽埕港灣散步路線", detail: "館外就是行程核心" },
  { name: "大型團體集合", detail: "比一般散住旅館更直觀" },
];

export default function DazhiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "@id": "https://www.hello-stay.com/dazhi/#lodging",
              name: "大智若愚 Dazhi Ruoyu",
              url: "https://www.hello-stay.com/dazhi",
              telephone: "+886-932-828-922",
              description:
                "高雄鹽埕大港橋旁規劃中的大型電梯館別，方向為一層三房一廳，可包層可包棟，適合 20-48 人團體先登記需求。",
              address: {
                "@type": "PostalAddress",
                addressLocality: "鹽埕區",
                addressRegion: "高雄市",
                postalCode: "803",
                addressCountry: "TW",
              },
              geo: { "@type": "GeoCoordinates", latitude: 22.619, longitude: 120.285 },
              petsAllowed: false,
            },
          ]),
        }}
      />

      <PropertyShowcasePage
        hero={{
          status: "規劃中",
          kicker: "規劃中館別",
          title: "大智若愚｜規劃中，尚未開放訂房",
          lead:
            "大智若愚目前仍在規劃階段。已知方向是電梯大樓、一層三房一廳、可包層可包棟，現階段只先公開已確認的資訊。",
          image: {
            src: "/images/dazhi/building-render.webp",
            alt: "大智若愚建築規劃渲染圖",
          },
          stats: heroStats,
          primaryAction: { href: lineUrl, label: "LINE 登記需求", external: true },
          secondaryAction: { href: "/compare", label: "看現有館別" },
        }}
          overview={{
          kicker: "目前規劃",
          title: "目前規劃重點",
          intro: "只公開已確認的方向",
          columns: 3,
          cards: overviewCards,
        }}
        details={{
          kicker: "公開資訊",
          title: "目前已公開資訊",
          intro: "空間方向、動線與適合團體都整理在這裡。",
          cards: detailCards,
          factsTitle: "目前已知",
          facts: houseFacts,
          guidesTitle: "目前重點",
          guides: stayGuides,
          fitTitle: "適合團體",
          fit: fitGuides,
        }}
        gallery={{
          kicker: "參考圖",
          title: "目前視覺參考",
          intro: "現階段只有規劃圖與建築參考，正式房內實景仍待未來更新。",
          columns: 2,
          images: galleryImages,
        }}
        location={{
          kicker: "區位優勢",
          title: "大港橋旁的港灣地段",
          intro: "位置重點很清楚，就是給想把港灣、駁二與大型團體活動排在一起的人。",
          cardTitle: "區位方向",
          address: "高雄市鹽埕區大港橋旁・駁二大義倉庫群周邊",
          description: "如果你的團體行程本來就會集中在大港橋、駁二和愛河灣，這個位置的價值會比一般旅館更直接。",
          spots: locationSpots,
        }}
        final={{
          kicker: "需求登記",
          title: "大型團體可以先留下需求",
          body: "留下預計日期、人數、是否希望包層，以及你最在意的是電梯、容量還是團體動線。等正式開放時，對接速度會快很多。",
          primaryAction: { href: lineUrl, label: "LINE 登記需求", external: true },
          secondaryAction: { href: "/", label: "回首頁看現有館別" },
        }}
      />
    </>
  );
}
