import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LocalGuidePage from "@/components/LocalGuidePage";
import {
  foodGuideItemCount,
  foodGuideItems,
  foodGuideSections,
  foodSupportSections,
} from "@/data/local-guides";

const pageTitle = `鹽埕美食地圖｜${foodGuideItemCount} 間必吃早餐、老店與小吃（2026）`;
const pageDescription = `${foodGuideItemCount} 間鹽埕美食一次看：早餐、老店、小吃、咖啡與宵夜依時段分類，每間附 Google Maps 導航；多人行程可直接接高雄包棟住宿方案。`;

const faqs = [
  {
    question: "鹽埕區美食第一次去怎麼選？",
    answer: `早上可先選大ㄎㄡ胖碳烤三明治或大溝頂虱目魚米粉湯；正餐再看港園牛肉麵、鴨肉珍等老店，下午安排高雄婆婆冰、新濱·駅前或小堤咖啡。頁面共整理 ${foodGuideItemCount} 間餐飲店家，可依分類直接導航。`,
  },
  {
    question: `這 ${foodGuideItemCount} 間店都在鹽埕附近嗎？`,
    answer: "清單以鹽埕區與相鄰港區為主，但每間步行距離與當日路況不同。出發前請開啟店家旁的 Google Maps 導航，確認目前位置、路線與營業狀態。",
  },
  {
    question: "店家的營業時間與公休日準確嗎？",
    answer: "本頁核對店名與地圖位置，不刊登容易過期的固定營業時間。店家可能臨時休息或調整時段，請以店家當日公告與 Google Maps 商家頁為準。",
  },
  {
    question: "住 Hello Stay 要怎麼接鹽埕美食行程？",
    answer: "先依同行人數比較溝頂民宿、你好哇寓所或雙館方案，再把早餐、正餐與咖啡分散到不同時段。採買與洗衣列在頁面後段，方便入住期間臨時補給。",
  },
] as const;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "https://www.hello-stay.com/explore/food" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://www.hello-stay.com/explore/food",
    images: [{ url: "https://www.hello-stay.com/images/explore/market.jpg", width: 1280, height: 672, alt: "鹽埕第一公有零售市場入口" }],
  },
};

export default function FoodExplorePage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: pageTitle,
            description: pageDescription,
            url: "https://www.hello-stay.com/explore/food",
            dateModified: "2026-08-25",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["#page-title", "#local-guide-answer-title", "#local-guide-stay-bridge-title"],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.hello-stay.com" },
              { "@type": "ListItem", position: 2, name: "鹽埕探索", item: "https://www.hello-stay.com/explore" },
              { "@type": "ListItem", position: 3, name: "鹽埕區美食推薦", item: "https://www.hello-stay.com/explore/food" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `鹽埕區美食推薦 ${foodGuideItemCount} 選`,
            numberOfItems: foodGuideItemCount,
            itemListElement: foodGuideItems.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "LocalBusiness",
                name: item.name,
                description: item.detail,
                areaServed: "高雄市鹽埕區",
              },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]}
      />
      <LocalGuidePage
        kind="food"
        eyebrow="YANCHENG FOOD GUIDE"
        titleId="page-title"
        title={pageTitle}
        lead={`從早餐、老店到咖啡與酒吧，先看 ${foodGuideItemCount} 間餐飲主清單；採買與洗衣放在後段，避免生活補給稀釋美食內容。`}
        image={{ src: "/images/explore/market.jpg", alt: "鹽埕第一公有零售市場入口與街區生活" }}
        facts={[
          { label: "餐飲主清單", value: `${foodGuideItemCount} 間` },
          { label: "內容分類", value: "早餐、正餐、小吃、咖啡、酒吧" },
          { label: "核對日期", value: "2026-08-16" },
          { label: "地圖功能", value: "每家可開導航" },
        ]}
        sections={foodGuideSections}
        secondarySections={foodSupportSections}
        sectionHeading={`${foodGuideItemCount} 間鹽埕餐飲，依時段與類型挑選`}
        sectionLead="餐飲店家是本頁主體；店名與位置已核對，營業時間與臨時公休仍以店家當日公告為準。"
        directAnswer={{
          title: "鹽埕美食分類與導航",
          body: `鹽埕美食分成早餐、正餐熱炒、小吃飲品、咖啡甜點與晚間酒吧。本頁整理 ${foodGuideItemCount} 間餐飲店家，每間附 Google Maps 導航；多人同行可先確認包棟住宿再排行程。`,
          checkedOn: "2026-08-16",
          sources: [
            { label: "Google Maps 店家資訊", href: "https://www.google.com/maps" },
            { label: "高雄捷運官方網站", href: "https://www.krtc.com.tw/" },
          ],
        }}
        faq={[...faqs]}
        primaryAction={{ href: "/kaohsiung-whole-house", label: "依人數選高雄包棟" }}
        noteActions={[
          { href: "/kaohsiung-whole-house", label: "看包棟方案與適合人數" },
          { href: "/book", label: "查空房與報價" },
        ]}
        contentBridgeId="food-guide"
      />
    </>
  );
}
