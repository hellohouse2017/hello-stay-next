import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PropertyShowcasePage from "@/components/PropertyShowcasePage";
import { parkingLots } from "@/data/parking-lots";

export const metadata: Metadata = {
  title: "Hello Stay 怎麼去？捷運、高鐵、停車一次看",
  description:
    "Hello Stay 高雄鹽埕包棟民宿交通停車整理。捷運怎麼走、高鐵怎麼轉、自駕停哪裡、叫車在哪裡下，這頁一次看完。",
  alternates: { canonical: "https://www.hello-stay.com/traffic" },
  openGraph: {
    title: "Hello Stay 怎麼去？捷運、高鐵、停車一次看",
    description: "搭捷運、從高鐵轉車、自駕停車或叫車前來，Hello Stay 的交通方式這頁直接整理給你。",
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
    kicker: "捷運",
    title: "搭捷運",
    summary: "搭到鹽埕埔站 O2，出站後步行約 5 分鐘就會到。",
    image: {
      src: "/images/traffic/mrt.svg",
      alt: "捷運到鹽埕埔站示意",
    },
    description: "沒有開車的話，直接搭捷運到鹽埕埔站最省事。從 O2 二號出口出站後，沿大公路走進 70 巷，大約 5 分鐘就會到。",
    specs: [
      { label: "下車站", value: "鹽埕埔站 O2" },
      { label: "出口", value: "O2 二號出口" },
      { label: "步行", value: "約 5 分鐘" },
      { label: "適合", value: "無車旅客" },
    ],
    groups: [
      {
        title: "怎麼走",
        items: ["搭捷運到鹽埕埔站", "從 O2 二號出口出站", "沿大公路步行到 70 巷"],
      },
      {
        title: "先記這三件事",
        items: ["先到鹽埕埔站 O2", "出站走二號出口", "沿大公路步行進 70 巷"],
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
    kicker: "高鐵",
    title: "搭高鐵",
    summary: "左營下車後轉捷運，到鹽埕埔站後再步行進巷。",
    image: {
      src: "/images/traffic/hsr.svg",
      alt: "高鐵轉捷運到鹽埕埔示意",
    },
    description: "外縣市過來的話，從高鐵左營站轉捷運最方便。到鹽埕埔站後，再步行進大公路 70 巷即可。",
    specs: [
      { label: "高鐵", value: "左營站" },
      { label: "紅線", value: "到美麗島站" },
      { label: "橘線", value: "到鹽埕埔站" },
      { label: "最後", value: "步行約 5 分鐘" },
    ],
    groups: [
      {
        title: "轉乘方式",
        items: ["高鐵左營站下車", "轉捷運紅線到美麗島站", "再轉橘線到鹽埕埔站"],
      },
      {
        title: "適合",
        items: ["外縣市旅客", "無車同行", "不想處理停車"],
      },
    ],
  },
  {
    id: "traffic-parking",
    kicker: "停車",
    title: "自駕停車",
    summary: "先找路邊車格，沒有位置再停附近收費停車場。",
    image: {
      src: "/images/traffic/parking.svg",
      alt: "自駕停車示意",
    },
    description: "兩館都在巷內，車子不能直接開到門口。先在周邊停好車，再步行進巷會比較順。",
    specs: [
      { label: "路邊車格", value: "大公路 七賢三路 富野路周邊" },
      { label: "收費停車場", value: "下方都有地圖連結" },
      { label: "下車", value: "依共用地圖紅箭頭處" },
      { label: "進館", value: "停好後步行入內" },
    ],
    groups: [
      {
        title: "停車順序",
        items: ["先找大公路、七賢三路和富野路周邊的路邊車格", "如果沒有位置，再停附近收費停車場", "下面整理的每個停車點都能直接開 Google Maps"],
      },
      {
        title: "停車前先看",
        items: ["不要把車停在巷口等太久", "不要預期能直接停到門口", "可以先讓同行者下車，再去找車位"],
      },
    ],
    action: { href: "#traffic-map", label: "看周邊停車點" },
  },
  {
    id: "traffic-dropoff",
    kicker: "叫車",
    title: "叫車下車",
    summary: "直接定位大公路 70 巷，下車後步行約 1 分鐘。",
    image: {
      src: "/images/traffic/dropoff.svg",
      alt: "叫車下車後步行示意",
    },
    description: "搭 Uber 或計程車的話，直接定位館名或大公路 70 巷即可。在巷口下車後，再步行進館最方便。",
    specs: [
      { label: "定位", value: "館名或地址" },
      { label: "下車", value: "依共用地圖紅箭頭處" },
      { label: "步行", value: "約 1 分鐘" },
      { label: "適合", value: "多人行李" },
    ],
    groups: [
      {
        title: "叫車定位",
        items: ["直接輸入館名或地址", "也可以定位大公路 70 巷", "下車後再步行進巷"],
      },
      {
        title: "下車後再確認",
        items: ["先確認門牌位置", "車輛不能直達門口", "再直接步行入內"],
      },
    ],
    action: {
      href: "https://www.google.com/maps/search/?api=1&query=高雄市鹽埕區大公路70巷8號",
      label: "打開下車點",
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
  "兩館地址與館名",
  "共用地圖",
  "停車點地圖",
  "大公路 70 巷下車處",
];

const bestFor = [
  { label: "捷運旅客", value: "鹽埕埔站 O2" },
  { label: "高鐵旅客", value: "左營站轉捷運" },
  { label: "自駕旅客", value: "先停車再步行" },
  { label: "多人帶行李", value: "共用下車點" },
];

const faqs = [
  {
    question: "從鹽埕埔站走到民宿要多久？",
    answer: "從 O2 二號出口出站後，步行約 5 分鐘就會到大公路 70 巷。",
  },
  {
    question: "從高鐵左營站怎麼到 Hello Stay？",
    answer: "從左營站搭捷運紅線到美麗島站，再轉橘線到鹽埕埔站，出站後步行進大公路 70 巷即可。",
  },
  {
    question: "開車停哪裡最方便？",
    answer: "先找大公路、七賢三路和富野路周邊的路邊車格。如果沒有位置，再看下面整理的收費停車場。",
    links: parkingLots.map((lot) => ({
      href: lot.nav,
      label: lot.name,
      external: true,
    })),
  },
  {
    question: "車可以直接開到門口嗎？",
    answer: "不行。兩館都在巷內，車子不能直接開到門口，請先在巷口周邊下車或停車，再步行進館。",
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
            description: "搭捷運到鹽埕埔站 O2 二號出口後，再步行前往 Hello Stay 高雄鹽埕包棟民宿",
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
          kicker: "交通指南",
          title: "Hello Stay 怎麼去？",
          lead: "Hello Stay 不難找。兩館都在高雄鹽埕區大公路 70 巷，搭捷運、高鐵、自駕或叫車都能到，但車子不能直接開到門口。先在巷口周邊下車或停車，再步行進巷會比較順。",
          image: {
            src: "/images/traffic/parking.svg",
            alt: "Hello Stay 交通與停車示意",
          },
          stats: trafficFacts,
          primaryAction: {
            href: "https://www.google.com/maps/dir/?api=1&destination=你好哇寓所&travelmode=walking",
            label: "直接開導航",
            external: true,
          },
          secondaryAction: { href: "#traffic-map", label: "先看共用地圖" },
        }}
        overview={{
          kicker: "先選到達方式",
          title: "你怎麼來，就看哪一段",
          intro: "你是搭捷運、從高鐵轉車、自駕，還是直接叫車過來，就看對應那張卡片。",
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
          kicker: "照你的交通方式走",
          title: "四種最常見的到達方式",
          intro: "兩館都在同一帶，主要差別只在你是搭捷運、開車，還是叫車過來。下面把最常見的四種走法分開整理。",
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
          factsTitle: "先看這幾個重點",
          facts: trafficFacts,
          guidesTitle: "出發前先存起來",
          guides: beforeArrival,
          fitTitle: "常見情況",
          fit: bestFor,
        }}
        faq={{
          kicker: "常見問題",
          title: "交通與停車常見問題",
          intro: "這幾題是住客最常問的，也是最容易在出發前卡住的地方。",
          items: faqs,
        }}
        location={{
          id: "traffic-map",
          kicker: "共用地圖",
          title: "共用地圖與停車點",
          intro: "如果你想直接看圖，這裡有兩館位置、下車處和周邊停車點。下面每個停車點都能直接開 Google Maps。",
          cardTitle: "兩館地址與下車位置",
          address: "高雄市鹽埕區大公路 70 巷 8 號 / 6-2 號",
          description: "你好哇寓所和溝頂民宿就在同一條巷子裡。兩館都要從巷口步行進去，照地圖紅箭頭標示的位置下車，再步行進巷就可以了。",
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
