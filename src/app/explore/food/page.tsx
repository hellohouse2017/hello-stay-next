import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LocalGuidePage from "@/components/LocalGuidePage";
import {
  foodGuideItemCount,
  foodGuideItems,
  foodGuideSections,
  foodSupportSections,
} from "@/data/local-guides";

const pageTitle = `【2026/2027鹽埕美食地圖】${foodGuideItemCount} 間在地老店/必吃小吃/深夜宵夜懶人包・附Google導航`;
const pageDescription = `2026/2027 高雄鹽埕美食終極攻略！精選 ${foodGuideItemCount} 間在地老字號、排隊小吃、深夜咖啡與宵夜酒吧，全時段分類附 Google Maps 一鍵導航。步行 3-5 分鐘外帶老店美食回 Hello Stay 民宿 1F 挑高中島廚房，多人包棟同樂開伙聚餐首選！`;

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
    title: `【2026/2027 鹽埕美食地圖】${foodGuideItemCount} 間在地老店/必吃小吃/宵夜全攻略・附 Google 導航`,
    description: "高雄鹽埕必吃美食一次整理！早餐、老店熱炒、古早味小吃、咖啡甜點到深夜酒吧，附 Google Maps 導航。推薦外帶回 Hello Stay 民宿中島廚房聚會！",
    url: "https://www.hello-stay.com/explore/food",
    images: [{ url: "https://www.hello-stay.com/images/explore/market.webp", width: 1280, height: 672, alt: "鹽埕第一公有零售市場入口" }],
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
            dateModified: "2026-09-02",
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
        lead={`從早餐、老店到咖啡與酒吧，先看 ${foodGuideItemCount} 間餐飲主清單；採買與洗衣放在後段，避免生活補給稀釋美食內容。步行 3-5 分鐘外帶老店美食回民宿 1F 挑高中島廚房聚餐最享受！`}
        image={{ src: "/images/explore/market.webp", alt: "鹽埕第一公有零售市場入口與街區生活" }}
        facts={[
          { label: "餐飲主清單", value: `${foodGuideItemCount} 間` },
          { label: "內容分類", value: "早餐、正餐、小吃、咖啡、酒吧" },
          { label: "核對日期", value: "2026-09-02" },
          { label: "地圖功能", value: "每家可開導航" },
        ]}
        sections={foodGuideSections}
        secondarySections={foodSupportSections}
        sectionHeading={`${foodGuideItemCount} 間鹽埕餐飲，依時段與類型挑選`}
        sectionLead="餐飲店家是本頁主體；店名與位置已核對，營業時間與臨時公休仍以店家當日公告為準。"
        directAnswer={{
          title: "2026/2027 鹽埕美食分類導航與包棟聚餐攻略",
          body: `鹽埕美食涵蓋古早味早餐、經典老店、特色小吃、午後咖啡與深夜居酒屋。本頁精選 ${foodGuideItemCount} 間指標餐飲附 Google Maps 導航。入住 Hello Stay（你好哇寓所 8-26人 / 溝頂民宿 4-12人），步行 3-5 分鐘即可外帶熱騰騰老店美食回民宿 1F 挑高中島廚房，吹冷氣開伙聚會最自在（23:00 後請放輕音量維護社區安寧）。`,
          checkedOn: "2026-09-02",
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
