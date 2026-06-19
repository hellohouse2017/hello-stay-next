import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PropertyShowcasePage from "@/components/PropertyShowcasePage";
import { parkingLots } from "@/data/parking-lots";

export const metadata: Metadata = {
    title: "高雄包棟民宿交通停車指南｜鹽埕埔站・附近停車場｜Hello Stay",
    description:
    "Hello Stay 高雄鹽埕包棟民宿交通停車指南｜捷運鹽埕埔站步行約 5 分鐘 高鐵左營轉捷運 自駕停車與下車位置一次看",
  alternates: { canonical: "https://www.hello-stay.com/traffic" },
  openGraph: {
    title: "高雄包棟民宿交通停車指南 | Hello Stay",
    description: "捷運 高鐵 自駕停車 叫車下車 Hello Stay 交通資訊一次看",
    url: "https://www.hello-stay.com/traffic",
    images: [
      {
        url: "https://www.hello-stay.com/images/traffic/parking.svg",
        width: 1200,
        height: 760,
        alt: "Hello Stay 交通與停車示意",
      },
    ],
  },
};

const routeCards = [
  {
    id: "traffic-mrt",
    kicker: "MRT",
    title: "搭捷運",
    summary: "鹽埕埔站 O2 二號出口 步行約 5 分鐘",
    image: {
      src: "/images/traffic/mrt.svg",
      alt: "捷運到鹽埕埔站示意",
    },
    description: ["搭橘線到鹽埕埔站", "從 O2 二號出口出站後直接步行"],
    specs: [
      { label: "下車站", value: "鹽埕埔站 O2" },
      { label: "出口", value: "O2 二號出口" },
      { label: "步行", value: "約 5 分鐘" },
      { label: "適合", value: "無車旅客" },
    ],
    groups: [
      {
        title: "走法",
        items: ["搭捷運到鹽埕埔站", "從 O2 二號出口出站", "沿大公路步行到 70 巷"],
      },
      {
        title: "記住這句",
        items: ["鹽埕埔站 O2", "二號出口", "沿大公路走到 70 巷"],
      },
    ],
    action: {
      href: "https://www.google.com/maps/dir/?api=1&destination=你好哇寓所&travelmode=walking",
      label: "開啟步行導航",
      external: true,
    },
  },
  {
    id: "traffic-hsr",
    kicker: "HSR",
    title: "搭高鐵",
    summary: "左營站轉紅線與橘線 到鹽埕埔再步行",
    image: {
      src: "/images/traffic/hsr.svg",
      alt: "高鐵轉捷運到鹽埕埔示意",
    },
    description: ["高鐵到左營後轉捷運", "一路轉到鹽埕埔再步行進巷"],
    specs: [
      { label: "高鐵", value: "左營站" },
      { label: "紅線", value: "到美麗島站" },
      { label: "橘線", value: "到鹽埕埔站" },
      { label: "最後", value: "步行約 5 分鐘" },
    ],
    groups: [
      {
        title: "轉乘",
        items: ["高鐵左營站", "轉捷運紅線到美麗島", "再轉橘線到鹽埕埔"],
      },
      {
        title: "適合",
        items: ["外縣市旅客", "無車同行", "不想處理停車"],
      },
    ],
  },
  {
    id: "traffic-parking",
    kicker: "PARKING",
    title: "自駕停車",
    summary: "先找路邊車格 沒位再開下面的停車地圖",
    image: {
      src: "/images/traffic/parking.svg",
      alt: "自駕停車示意",
    },
    description: ["兩館都在巷弄內", "停好車再步行進巷最方便"],
    specs: [
      { label: "路邊車格", value: "大公路 七賢三路 富野路周邊" },
      { label: "收費停車場", value: "下方都有地圖連結" },
      { label: "下車", value: "依共用地圖紅箭頭處" },
      { label: "進館", value: "停好後步行入內" },
    ],
    groups: [
      {
        title: "停車順序",
        items: ["先找大公路、七賢三路與富野路周邊路邊車格", "沒有位置再看收費停車場", "下面每個停車點都能直接開 Google Maps"],
      },
      {
        title: "先別做",
        items: ["不要久停巷口", "不要期待直接停到門口", "先下車 再去找車位"],
      },
    ],
    action: { href: "#traffic-map", label: "看所有停車地圖" },
  },
  {
    id: "traffic-dropoff",
    kicker: "DROPOFF",
    title: "叫車下車",
    summary: "直接定位大公路 70 巷 下車後步行",
    image: {
      src: "/images/traffic/dropoff.svg",
      alt: "叫車下車後步行示意",
    },
    description: ["計程車或 Uber 直接定位", "先下車 再沿巷內步行進館"],
    specs: [
      { label: "定位", value: "館名或地址" },
      { label: "下車", value: "依共用地圖紅箭頭處" },
      { label: "步行", value: "約 1 分鐘" },
      { label: "適合", value: "多人行李" },
    ],
    groups: [
      {
        title: "叫車定位",
        items: ["館名或地址", "大公路 70 巷", "下車後步行進巷"],
      },
      {
        title: "到達",
        items: ["確認門牌", "車輛不能直達門口", "同行者直接步行入內"],
      },
    ],
    action: {
      href: "https://www.google.com/maps/search/?api=1&query=高雄市鹽埕區大公路70巷8號",
      label: "開啟下車點",
      external: true,
    },
  },
];

const trafficFacts = [
  { label: "兩館位置", value: "大公路 70 巷" },
  { label: "捷運", value: "鹽埕埔站 O2" },
  { label: "步行", value: "約 5 分鐘" },
  { label: "停車", value: "路邊車格優先" },
];

const beforeArrival = [
  "館別地址",
  "停車地圖",
  "大公路 70 巷下車處",
  "停車地圖",
];

const bestFor = [
  { label: "捷運旅客", value: "鹽埕埔站 O2" },
  { label: "高鐵旅客", value: "左營轉捷運" },
  { label: "自駕旅客", value: "先停車再步行" },
  { label: "多人行李", value: "共用下車點" },
];

const faqs = [
  {
    question: "鹽埕埔站到民宿要走多久",
    answer: "從 O2 二號出口出站後步行約 5 分鐘即可到大公路 70 巷",
  },
  {
    question: "高鐵左營站怎麼到 Hello Stay",
    answer: "高鐵左營站轉捷運紅線到美麗島 再轉橘線到鹽埕埔站",
  },
  {
    question: "開車停哪裡比較方便",
    answer: "先找大公路、七賢三路與富野路周邊路邊車格，沒有位置再點下面的 Google Maps 看國際會議中心地下室、鹽埕立體停車場（大仁路）、文武聖殿停車場與富野路兩個收費停車場。",
    links: parkingLots.map((lot) => ({
      href: lot.nav,
      label: lot.name,
      external: true,
    })),
  },
  {
    question: "車可以直接開到門口嗎",
    answer: "不行 民宿在巷弄內 車輛無法直接駛入館門口 請依共用地圖紅箭頭下車處步行入內",
  },
];

const locationSpots = parkingLots.map((lot) => ({
  name: lot.name,
  detail: lot.price,
  href: lot.nav,
}));

export default function TrafficPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "如何前往 Hello Stay 高雄包棟民宿",
            description: "搭捷運到鹽埕埔站 O2 二號出口後步行前往 Hello Stay 高雄鹽埕包棟民宿",
            totalTime: "PT30M",
            step: [
              { "@type": "HowToStep", position: 1, name: "抵達高雄捷運鹽埕埔站" },
              { "@type": "HowToStep", position: 2, name: "從 O2 二號出口出站" },
              { "@type": "HowToStep", position: 3, name: "步行到大公路 70 巷" },
              { "@type": "HowToStep", position: 4, name: "依館別門牌入住" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: Array.isArray(faq.answer) ? faq.answer.join(" ") : faq.answer },
            })),
          },
        ]}
      />

      <PropertyShowcasePage
        hero={{
          kicker: "TRAFFIC",
          title: "到 Hello Stay 很簡單",
          lead: ["如果你是搭捷運、坐高鐵、自己開車或叫車", "兩館都在大公路 70 巷", "車輛不能直達館門口，停好車再步行最順"],
          image: {
            src: "/images/traffic/parking.svg",
            alt: "Hello Stay 交通與停車示意",
          },
          stats: trafficFacts,
          primaryAction: {
            href: "https://www.google.com/maps/dir/?api=1&destination=你好哇寓所&travelmode=walking",
            label: "開啟導航",
            external: true,
          },
          secondaryAction: { href: "#traffic-map", label: "看共用地圖" },
        }}
        overview={{
          kicker: "ACCESS GUIDE",
          title: "依交通工具看路線",
          intro: "依交通方式查看對應路線",
          columns: 4,
          cards: routeCards.map((card) => ({
            id: card.id,
            kicker: card.kicker,
            title: card.title,
            summary: card.summary,
            image: card.image,
            linkLabel: null,
          })),
        }}
        details={{
          kicker: "ROUTE DETAILS",
          title: "實際怎麼走",
          intro: "兩館同一生活圈 實際上就是把交通工具分開看",
          cards: routeCards.map((card) => ({
            id: card.id,
            kicker: card.kicker,
            title: card.title,
            description: card.description,
            image: card.image,
            specs: card.specs,
            groups: card.groups,
            action: card.action,
          })),
          factsTitle: "抵達重點",
          facts: trafficFacts,
          guidesTitle: "出發前可先存",
          guides: beforeArrival,
          fitTitle: "常見到達方式",
          fit: bestFor,
        }}
        faq={{
          kicker: "FAQ",
          title: "交通與停車常見問題",
          intro: "只留客人真的會用到的問題",
          items: faqs,
        }}
        location={{
          id: "traffic-map",
          kicker: "MAP",
          title: "共用地圖與停車選項",
          intro: "點圖可放大 下面每個停車點也能直接開地圖",
          cardTitle: "兩館地址",
          address: "高雄市鹽埕區大公路 70 巷 8 號 / 6-2 號",
          description: ["你好哇寓所與溝頂民宿距離很近", "車輛無法直接開到館門口 請依地圖紅箭頭下車處步行入內", "下面每個停車點都能直接開地圖"],
          image: {
            src: "/images/traffic/guide.png",
            alt: "民宿交通指引圖 溝頂 你好哇寓所 共用地圖",
          },
          imageLabel: "點開放大檢視民宿交通指引圖",
          spots: locationSpots,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=高雄市鹽埕區大公路70巷8號",
          mapLabel: "開啟 Google Maps",
        }}
      />
    </>
  );
}
