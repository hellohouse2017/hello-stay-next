import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PropertyShowcasePage from "@/components/PropertyShowcasePage";

export const metadata: Metadata = {
  title: "高雄包棟民宿住客評價｜真實入住回饋與館別差異",
  description:
    "整理主館 Google 評價重點與各館實際住客回饋 讓你在看房型之外 也能理解真實入住感受與常見稱讚點",
  alternates: { canonical: "https://www.hello-stay.com/reviews" },
  openGraph: {
    title: "Hello Stay 住客評價｜高雄包棟民宿真實入住回饋",
    description: "住客最常提到的空間感 位置便利性與入住體驗",
    url: "https://www.hello-stay.com/reviews",
    images: [
      {
        url: "https://www.hello-stay.com/images/hellohouse/cover.webp",
        width: 1200,
        height: 630,
        alt: "Hello Stay 住客評價",
      },
    ],
  },
};

const voiceCards = [
  {
    id: "reviews-space",
    kicker: "空間感",
    title: "大家最常提到空間感",
    summary: "真正讓客人留下印象的，不是『漂亮』這種空話，而是一起煮、一起玩、一起住的流暢感。",
    image: {
      src: "/images/hellohouse/1000.webp",
      alt: "你好哇寓所公共空間與住客使用情境",
    },
    linkLabel: "查看評價重點",
  },
  {
    id: "reviews-location",
    kicker: "地點便利",
    title: "位置方便也是固定高分點",
    summary: "鹽埕區步行生活圈、駁二、大港橋和美食密度，常常是評價裡反覆出現的關鍵字。",
    image: {
      src: "/images/hellohouse/photo5.webp",
      alt: "Hello Stay 鹽埕生活圈與館外步行環境",
    },
    linkLabel: "查看位置回饋",
  },
  {
    id: "reviews-trust",
    kicker: "入住順暢",
    title: "入住體驗順不順很重要",
    summary: "自助入住、環境乾淨、溝通明確，這些細節比過度包裝更能建立信任。",
    image: {
      src: "/images/godin/cover-3.webp",
      alt: "溝頂民宿交誼廳與入住體驗",
    },
    linkLabel: "查看入住回饋",
  },
];

const detailCards = [
  {
    id: "reviews-space",
    kicker: "你好哇寓所",
    title: "你好哇寓所的評價多半圍繞在聚會體驗",
    description:
      "主館 Google 商家評價的高頻內容，不是單純說房間乾淨，而是反覆提到中島廚房、多人聚會、麻將、迎娶採光與整體聚在一起的感覺。這代表它真正的價值被客人感受到。",
    image: {
      src: "/images/hellohouse/1000.webp",
      alt: "你好哇寓所中島廚房與大型聚會空間",
    },
    specs: [
      { label: "Google 評價", value: "以主館商家評價內容為主" },
      { label: "最常被提到", value: "中島廚房 麻將 聚會空間" },
      { label: "常見族群", value: "家族旅遊 畢旅 迎娶 公司團建" },
      { label: "整體印象", value: "住在一起的體驗感很強" },
    ],
    groups: [
      {
        title: "典型回饋",
        items: [
          "廚房很大，大家真的會聚在一起煮東西",
          "晚上打麻將、玩桌遊很有團體感",
          "迎娶和婚攝動線很順",
        ],
      },
      {
        title: "這代表什麼",
        items: ["你好哇不是只賣床位", "真正賣的是多人一起使用的公共空間", "適合聚會型和活動型入住"],
      },
    ],
    action: { href: "/hellohouse", label: "看你好哇寓所房型" },
  },
  {
    id: "reviews-location",
    kicker: "鹽埕位置",
    title: "鹽埕位置感受，實際上比想像中更影響滿意度",
    description:
      "客人常常不是只因為館內設備滿意，而是因為住下來後發現駁二、大港橋、捷運站與在地美食真的可以步行完成。這會讓整趟旅程更鬆，不需要一直移動。",
    image: {
      src: "/images/hellohouse/photo5.webp",
      alt: "Hello Stay 鹽埕區生活圈與步行便利性",
    },
    specs: [
      { label: "常見關鍵字", value: "駁二 大港橋 鹽埕埔站" },
      { label: "旅程感受", value: "吃喝散步回館很順" },
      { label: "對誰特別有感", value: "家庭旅遊 朋友小聚 外地旅客" },
      { label: "不是賣點包裝", value: "是真正被走出來的動線" },
    ],
    groups: [
      {
        title: "客人實際會說",
        items: ["走路就能去駁二", "附近吃的很多", "晚上回來續攤很方便"],
      },
      {
        title: "這件事的價值",
        items: ["減少交通焦慮", "提高晚上的聚會完整度", "讓住宿和行程連成一件事"],
      },
    ],
    action: { href: "/explore", label: "看周邊生活圈" },
  },
  {
    id: "reviews-trust",
    kicker: "溝頂民宿",
    title: "溝頂民宿的好評重點，是簡單、直覺、住起來省心",
    description:
      "溝頂民宿沒有主館那麼強烈的派對感 它被稱讚的通常是整棟獨立 分層休息 4F 可以集合 每間客房有獨立衛浴 還有整體乾淨與入住體驗順暢 這種評價對小團體反而很有說服力",
    image: {
      src: "/images/godin/cover-1.webp",
      alt: "溝頂民宿交誼空間與整棟入住體驗",
    },
    specs: [
      { label: "常見回饋", value: "乾淨 安靜 獨棟入住順" },
      { label: "最有感配置", value: "四間客房獨立衛浴" },
      { label: "公共空間角色", value: "4F 集合聊天與麻將" },
      { label: "適合族群", value: "家庭旅遊 小團體 朋友小聚" },
    ],
    groups: [
      {
        title: "典型回饋",
        items: ["分層住不會互相打擾", "四樓集合很方便", "位置安靜但生活機能好"],
      },
      {
        title: "這代表什麼",
        items: ["溝頂賣的是整棟獨立與入住節奏簡單", "不是要拿來和大型聚會型館別硬比", "更適合小團體快速決策"],
      },
    ],
    action: { href: "/godin", label: "看溝頂民宿房型" },
  },
];

const facts = [
  { label: "主館 Google", value: "以商家評價重點為主" },
  { label: "高頻關鍵字", value: "空間 地點 乾淨 好住" },
  { label: "主館評價主軸", value: "聚會感與中島廚房" },
  { label: "溝頂評價主軸", value: "獨棟直覺與分層休息" },
];

const guides = [
  "這裡提到的 Google 商家評價重點主要對應主館你好哇寓所",
  "其他館別以官網整理的入住回饋補充",
  "評價最有價值的地方 是看空間感受有沒有真的被住客提到",
  "房型與設備仍以各館頁資訊為準",
];

const fit = [
  { label: "適合對象", value: "想先看口碑的人" },
  { label: "最常在意", value: "空間好不好用 地點順不順" },
  { label: "延伸頁面", value: "比較頁 或各館頁" },
  { label: "下訂前確認", value: "房型與設備" },
];

const galleryImages = [
  {
    src: "/images/hellohouse/photo2.webp",
    alt: "你好哇寓所中島廚房與住客常提到的聚會體驗",
    caption: "主館高頻評價點",
  },
  {
    src: "/images/godin/room4.webp",
    alt: "溝頂民宿 4F 交誼廳與住客常提到的集合空間",
    caption: "溝頂高頻評價點",
  },
  {
    src: "/images/hellohouse/photo5.webp",
    alt: "鹽埕館外步行生活圈與交通便利性",
    caption: "位置高頻評價點",
  },
];

const faqs = [
  {
    question: "主館 Google 評價，是不是三館合在一起？",
    answer: "不是。這裡提到的 Google 商家評價重點主要對應主館你好哇寓所；其他館別則以官網整理的入住回饋與實際使用感受補充。",
  },
  {
    question: "住客最常稱讚什麼？",
    answer: "你好哇最常被提到中島廚房、多人聚會空間與迎娶採光；溝頂則是整棟獨立、每間客房獨立衛浴與 4F 交誼空間。",
  },
  {
    question: "評價對上需求後 還要看什麼",
    answer: "三館比較頁會更清楚 館頁則能補足房型與設備 日期確定後再看空房與報價",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Hello Stay 住客評價",
            url: "https://www.hello-stay.com/reviews",
            description: "整理 Hello Stay 主館 Google 評價與各館住客回饋。",
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
          kicker: "住客回饋",
          title: "住客評價",
          lead: "整理住客對空間、位置與入住流程的真實回饋。",
          image: {
            src: "/images/hellohouse/photo2.webp",
            alt: "Hello Stay 住客評價主視覺與中島廚房空間",
          },
          stats: [
            { label: "主館評價", value: "Google 商家評價重點" },
            { label: "高頻稱讚", value: "聚會空間與地點方便" },
            { label: "溝頂重點", value: "獨棟直覺與分層休息" },
            { label: "延伸頁面", value: "房型與設備" },
          ],
          primaryAction: { href: "/compare", label: "比較三館差異" },
          secondaryAction: { href: "/book", label: "直接查日期與空房" },
        }}
        overview={{
          kicker: "住客最常提到",
          title: "住客最常留下印象的三件事",
          intro: "有價值的評價 會直接說出客人怎麼用空間 怎麼感受地點",
          columns: 3,
          cards: voiceCards,
        }}
        details={{
          kicker: "評價重點",
          title: "評價反映出的使用感受",
          intro: "把高頻回饋和它代表的館別價值拆開看 差異會更清楚",
          cards: detailCards,
          factsTitle: "口碑重點整理",
          facts,
          guidesTitle: "評價重點",
          guides,
          fitTitle: "適合對象",
          fit,
        }}
        gallery={{
          kicker: "實際空間",
          title: "評價對應到的實際空間",
          intro: "把客人最常提到的空間直接對回照片，比單獨看字句更容易理解。",
          columns: 3,
          images: galleryImages,
        }}
        faq={{
          kicker: "常見問題",
          title: "評價相關常見問題",
          intro: "分數來源 館別差異與常見問題",
          items: faqs,
        }}
        final={{
          kicker: "下一步",
          title: "館別與房型才是關鍵",
          body:
            "如果口碑方向符合需求，下一步會是房型配置、設備細節與日期報價。",
          primaryAction: { href: "/compare", label: "看三館比較" },
          secondaryAction: { href: "/book", label: "查空房與報價" },
        }}
      />
    </>
  );
}
