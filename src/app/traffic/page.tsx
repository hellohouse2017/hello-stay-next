import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TrafficExperience from "@/components/TrafficExperience";
import { getAlternateLanguageMap } from "@/i18n/config";

export const metadata: Metadata = {
  title: "【2026/2027高雄鹽埕交通與停車指南】高鐵轉捷運20分直達・周邊推薦停車場懶人包・巷口下車SOP",
  description:
    "2026/2027 最新 Hello Stay 交通與停車指南：高鐵左營站搭捷運直達「鹽埕埔站 2 號出口」步行 5 分鐘！自駕開車整理大公路 70 巷口下行李 SOP、室內地下防雨與公有立體車塔（含 EV 充電樁）等 6 大推薦停車場一鍵導航與叫車定位，出發前必看。",
  alternates: { canonical: "https://www.hello-stay.com/traffic", languages: getAlternateLanguageMap("/traffic") },
  openGraph: {
    title: "【2026/2027 高雄鹽埕交通與停車指南】高鐵轉捷運 20 分直達・周邊推薦停車場懶人包",
    description: "自駕停車推薦、大公路 70 巷口下行李 SOP、捷運鹽埕埔站步行 5 分鐘與叫車定位，Hello Stay 官方交通指南一次看懂。",
    url: "https://www.hello-stay.com/traffic",
    images: [
      {
        url: "https://www.hello-stay.com/images/traffic/hero.webp",
        width: 1200,
        height: 675,
        alt: "高雄輕軌與鹽埕駁二周邊街景 - Hello Stay 交通指南",
      },
    ],
  },
};

const trafficSchemaFaqs = [
  {
    question: "車可以直接開到民宿門口嗎？",
    answer:
      "不行。你好哇寓所與溝頂民宿皆位於傳統鹽埕巷弄內（大公路 70 巷），巷道窄小車輛無法直達門口，亦無專屬私人車位。請先將車輛開至「大公路 70 巷口」讓同行人員與大件行李下車，駕駛再前往周邊停車場停妥後步行進館。",
  },
  {
    question: "可以在巷口暫停放行李嗎？",
    answer:
      "可以。大公路 70 巷口路面寬敞，可臨時臨停 1~2 分鐘讓同行人員與大件行李先下車。巷口走進民宿僅需 20~30 秒，同行者可先前往門口等候，駕駛再輕鬆前往停車。",
  },
  {
    question: "開車過來停哪裡最方便、最推薦？",
    answer:
      "1.【首選路邊車格】：大公路、七賢三路、富野路周邊皆有公有計時車格，抵達時若有空位建議直接停放。2.【室內首選】：推薦「高雄國際會議中心地下停車場」（步行約 3-4 分鐘），室內地下防曬防雨。3.【車位最多】：推薦「鹽埕立體停車場（大仁路）」（步行約 4-5 分鐘），公有大型車塔車位充裕。",
  },
  {
    question: "周邊停車場有電動車充電樁（EV）嗎？",
    answer:
      "有的！鄰近的「鹽埕立體停車場（大仁路）」（步行約 4-5 分鐘）設有公有電動車充電樁設備；亦可透過充電 App 查詢周邊即時充電樁空位狀態。",
  },
  {
    question: "可以提前寄放行李嗎？",
    answer:
      "可以。入住當天中午 12:00 後開放提前寄放行李；請務必提前透過 LINE 客服告知管家，並請同組旅客一次統一寄放，寄放完成後請先離開現場，待 16:00 整理完畢領取密碼後再正式進房入住。",
  },
  {
    question: "退房後可以繼續寄放行李嗎？",
    answer:
      "退房後無法提供行李寄放服務。建議旅客可將行李寄放於「捷運鹽埕埔站 (O2)」或「捷運美麗島站」之付費置物櫃，寄放後即可輕鬆暢遊鹽埕與駁二特區。",
  },
];

export default function TrafficPage() {
  return (
    <>
      <JsonLd
        data={[
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
                name: "交通與停車",
                item: "https://www.hello-stay.com/traffic",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "如何前往 Hello Stay 高雄包棟民宿（交通與停車）",
            description: "抵達高雄鹽埕大公路 70 巷口下行李後，停放周邊停車場或搭乘捷運步行前往 Hello Stay 高雄包棟民宿",
            totalTime: "PT15M",
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "抵達大公路 70 巷口（下車點）",
                text: "開車或搭車至高雄市鹽埕區大公路 70 巷口，臨停讓同行人員與行李下車。",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "停放周邊推薦停車場",
                text: "駕駛前往大公路路邊車格、高雄國際會議中心地下停車場或鹽埕立體停車場停放車輛。",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "步行進 70 巷入住民宿",
                text: "停妥後步行 20 秒至 1 分鐘進入大公路 70 巷，輸入電子門鎖密碼自助入住。",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Place",
            name: "Hello Stay 你好哇寓所",
            address: {
              "@type": "PostalAddress",
              streetAddress: "大公路 70 巷 8 號",
              addressLocality: "鹽埕區",
              addressRegion: "高雄市",
              addressCountry: "TW",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 22.6245,
              longitude: 120.2823,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Place",
            name: "Hello Stay 溝頂民宿",
            address: {
              "@type": "PostalAddress",
              streetAddress: "大公路 70 巷 6-2 號",
              addressLocality: "鹽埕區",
              addressRegion: "高雄市",
              addressCountry: "TW",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 22.6244,
              longitude: 120.2822,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: trafficSchemaFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]}
      />

      <TrafficExperience />
    </>
  );
}
