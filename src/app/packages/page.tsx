import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PropertyShowcasePage from "@/components/PropertyShowcasePage";

export const metadata: Metadata = {
  title: "高雄團體住宿推薦｜家族旅遊・企業團建・朋友包棟方案",
  description:
    "找高雄團體住宿推薦、家族旅遊包棟或朋友聚會空間？依人數、活動型態、廚房與公共空間需求，快速找到適合的高雄包棟方案，再直接進官方訂房站。",
  alternates: { canonical: "https://www.hello-stay.com/packages" },
  openGraph: {
    title: "高雄團體住宿推薦｜家族旅遊・企業團建・朋友包棟方案",
    description: "從家族旅遊、企業團建到朋友聚會，快速找到適合的高雄團體住宿與包棟方案。",
    url: "https://www.hello-stay.com/packages",
    images: [
      {
        url: "https://www.hello-stay.com/images/hellohouse/party-cover.webp",
        width: 1200,
        height: 630,
        alt: "Hello Stay 包棟方案",
      },
    ],
  },
};

const scenarios = [
  {
    id: "occasion-company-retreat",
    kicker: "企業團建",
    title: "企業包棟與移地訓練",
    summary: ["多人討論", "一起聚餐", "晚上還要一起收尾"],
    image: {
      src: "/images/hellohouse/business-cover.webp",
      alt: "企業團建使用你好哇寓所公共空間與中島廚房",
    },
    description: ["多人討論、聚餐與晚間交流，", "都需要寬敞公共空間。"],
    specs: [
      { label: "常見人數", value: "18-26 人" },
      { label: "優先館別", value: "你好哇寓所" },
      { label: "核心設備", value: "中島廚房 公共空間" },
      { label: "超過單館", value: "雙館包棟" },
    ],
    groups: [
      {
        title: "適合",
        items: ["企業團建", "移地訓練", "討論後一起聚餐"],
      },
      {
        title: "重點",
        items: ["公共空間大小", "能不能一起用餐", "超過 26 人可改看雙館"],
      },
    ],
    action: { href: "/hellohouse", label: "看你好哇寓所" },
  },
  {
    id: "occasion-wedding",
    kicker: "婚禮迎娶",
    title: "婚禮迎娶與前夜準備",
    summary: ["採光", "動線", "分房", "比房數更重要"],
    image: {
      src: "/images/hellohouse/wedding-cover.webp",
      alt: "你好哇寓所婚禮迎娶與前夜準備空間",
    },
    description: ["迎娶時，", "採光與房間分配通常比單純房數更重要。"],
    specs: [
      { label: "常見人數", value: "12-24 人" },
      { label: "優先館別", value: "你好哇寓所" },
      { label: "空間重點", value: "採光 一樓動線" },
      { label: "加大家族", value: "雙館一起看" },
    ],
    groups: [
      {
        title: "最常確認",
        items: ["一樓夠不夠闖關", "婚攝採光好不好", "伴娘與家人怎麼分房"],
      },
      {
        title: "重點",
        items: ["一樓公共空間", "雙人房與多人房比例", "加大家族是否需要雙館"],
      },
    ],
    action: { href: "/hellohouse", label: "看你好哇寓所" },
  },
  {
    id: "occasion-family",
    kicker: "家族旅遊",
    title: "家族旅遊與圍爐聚餐",
    summary: ["家族慢住", "多人聚餐", "對空間需求不同"],
    image: {
      src: "/images/hellohouse/family-cover.webp",
      alt: "家族旅遊與圍爐聚餐適合的 Hello Stay 包棟空間",
    },
    description: ["小家庭和大家族，", "會落在不同館型。", "廚房需求也差很多。"],
    specs: [
      { label: "4-12 人", value: "溝頂民宿" },
      { label: "13-26 人", value: "你好哇寓所" },
      { label: "要開伙", value: "你好哇寓所" },
      { label: "每房衛浴", value: "溝頂民宿" },
    ],
    groups: [
      {
        title: "常見需求",
        items: ["可以煮火鍋", "晚上能打麻將", "長輩能早點休息", "小孩白天有地方待"],
      },
      {
        title: "重點",
        items: ["人數級距", "是否需要廚房", "長輩和小孩怎麼分房"],
      },
    ],
    action: { href: "/compare", label: "看三館比較" },
  },
  {
    id: "occasion-friends",
    kicker: "朋友聚會",
    title: "朋友聚會與慶生派對",
    summary: ["聚餐", "麻將", "宵夜", "公共空間更重要"],
    image: {
      src: "/images/hellohouse/party-cover.webp",
      alt: "朋友聚會與慶生派對適合的 Hello Stay 公共空間",
    },
    description: ["聚餐、麻將、宵夜，", "以及回館後的氣氛，", "都會影響這次聚會感受。"],
    specs: [
      { label: "6-10 人", value: "可看溝頂民宿" },
      { label: "14-20 人", value: "多半適合你好哇寓所" },
      { label: "主軸", value: "聚餐 麻將 宵夜" },
      { label: "晚上行程", value: "鹽埕步行生活圈" },
    ],
    groups: [
      {
        title: "最常確認",
        items: ["有沒有中島或吧台", "有沒有麻將和沙發", "晚上散場後能不能續聊"],
      },
      {
        title: "重點",
        items: ["公共空間大小", "小團也可比較溝頂", "日期確定後再查空房"],
      },
    ],
    action: { href: "/hellohouse", label: "看你好哇寓所" },
  },
];

const packageFacts = [
  { label: "4-12 人", value: "多半適合溝頂" },
  { label: "13-26 人", value: "多半適合你好哇" },
  { label: "要開伙", value: "你好哇更完整" },
  { label: "超過單館", value: "雙館包棟" },
];

const packageGuides = [
  "人數先決定單館或雙館",
  "廚房需求會影響館別",
  "公共空間大小會影響聚會感受",
  "日期與價格仍以訂房站為準",
];

const packageFit = [
  { label: "現在在比什麼", value: "還在比較館別的團體客" },
  { label: "最常拿來比", value: "人數 廚房 公共空間" },
  { label: "下一步", value: "三館比較 或館頁" },
  { label: "房型細節", value: "各館頁另外完整介紹" },
];

const galleryImages = [
  {
    src: "/images/hellohouse/business-cover.webp",
    alt: "企業團建與移地訓練適合的 Hello Stay 場景",
    caption: "企業團建",
  },
  {
    src: "/images/hellohouse/wedding-cover.webp",
    alt: "婚禮迎娶與前夜準備適合的 Hello Stay 場景",
    caption: "婚禮迎娶",
  },
  {
    src: "/images/hellohouse/family-cover.webp",
    alt: "家族旅遊與圍爐聚餐適合的 Hello Stay 場景",
    caption: "家族旅遊",
  },
  {
    src: "/images/hellohouse/party-cover.webp",
    alt: "朋友聚會與慶生派對適合的 Hello Stay 場景",
    caption: "朋友聚會",
  },
];

const faqs = [
  {
    question: "還沒決定館別 該從哪裡開始",
    answer: "先把情境對到人數與設備需求，再看三館比較，會更快找到合適方案。",
  },
  {
    question: "這裡能直接看房價嗎",
    answer: "不能 房價要依日期 人數 房況到訂房站確認",
  },
  {
    question: "情境和人數衝突時 怎麼判斷",
    answer: "人數優先 因為這會先決定單館能不能入住 再來才是廚房和公共空間需求",
  },
];

export default function PackagesPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            provider: { "@type": "LodgingBusiness", name: "Hello Stay" },
            name: "高雄包棟民宿方案推薦",
            description: "依企業團建、婚禮迎娶、家族旅遊、朋友聚會與團體需求，安排高雄鹽埕區包棟方案。",
            areaServed: { "@type": "Place", name: "高雄鹽埕區" },
            serviceType: "包棟住宿",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]}
      />

      <PropertyShowcasePage
        hero={{
          kicker: "入住情境",
          title: "團體住宿方案",
          lead: "依人數與空間需求選擇家族旅行、朋友聚會、企業團建或迎娶住宿方案。",
          image: {
            src: "/images/hellohouse/party-cover.webp",
            alt: "Hello Stay 包棟方案與多人聚會主視覺",
          },
          stats: [
            { label: "怎麼選", value: "人數 廚房 公共空間" },
            { label: "4-12 人", value: "多半落在溝頂" },
            { label: "13-26 人", value: "多半落在你好哇" },
            { label: "更大團體", value: "雙館包棟一起看" },
          ],
          primaryAction: { href: "/compare", label: "看三館比較" },
          secondaryAction: { href: "/book", label: "查空房" },
        }}
        overview={{
          kicker: "情境速覽",
          title: "常見入住情境",
          intro: ["企業", "迎娶", "家族", "朋友聚會"],
          columns: 4,
          cards: scenarios.map((scenario) => ({
            id: scenario.id,
            kicker: scenario.kicker,
            title: scenario.title,
            summary: scenario.summary,
            image: scenario.image,
            linkLabel: null,
          })),
        }}
        details={{
          kicker: "方案細節",
          title: "依情境選方案",
          intro: [
            "先看這次旅程的目的，",
            "再對到適合的館別與空間。",
          ],
          cards: scenarios.map((scenario) => ({
            id: scenario.id,
            kicker: scenario.kicker,
            title: scenario.title,
            description: scenario.description,
            image: scenario.image,
            specs: scenario.specs,
            groups: scenario.groups,
            action: scenario.action,
          })),
          factsTitle: "快速對照",
          facts: packageFacts,
          guidesTitle: "挑選基準",
          guides: packageGuides,
          fitTitle: "你現在最需要看什麼",
          fit: packageFit,
        }}
        gallery={{
          kicker: "常見氛圍",
          title: "常見入住氛圍",
          columns: 4,
          images: galleryImages,
        }}
        faq={{
          kicker: "常見問題",
          title: "選館前常見問題",
          items: faqs,
        }}
      />
    </>
  );
}
