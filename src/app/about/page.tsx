import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PropertyShowcasePage from "@/components/PropertyShowcasePage";

export const metadata: Metadata = {
  title: "高雄包棟民宿品牌介紹｜鹽埕兩館與規劃中館別",
  description:
    "從品牌起點、兩館可訂方案到規劃中館別，一次看懂 Hello Stay 在高雄鹽埕區的團體包棟住宿定位。",
  alternates: { canonical: "https://www.hello-stay.com/about" },
  openGraph: {
    title: "Hello Stay 是專為團體旅客設計的高雄包棟民宿品牌",
    description: "了解 Hello Stay 的品牌起點、兩館可訂方案、規劃中館別與合法安全承諾。",
    url: "https://www.hello-stay.com/about",
    images: [
      {
        url: "https://www.hello-stay.com/images/hellohouse/cover.webp",
        width: 1200,
        height: 630,
        alt: "Hello Stay 品牌故事",
      },
    ],
  },
};

const brandCards = [
  {
    id: "about-origin",
    kicker: "品牌起點",
    title: "從鹽埕老屋開始",
    summary: "Hello Stay 不是先想做很多館，而是先想解決團體旅客住飯店被拆散的問題。",
    image: {
      src: "/images/hellohouse/photo5.webp",
      alt: "Hello Stay 鹽埕老屋與巷弄生活圈",
    },
    linkLabel: "查看品牌起點",
  },
  {
    id: "about-portfolio",
    kicker: "館別分工",
    title: "兩館可訂，一館規劃中",
    summary: "你好哇寓所與溝頂民宿目前可訂；大智若愚仍在規劃中，尚未開放房況與報價。",
    image: {
      src: "/images/hellohouse/1000.webp",
      alt: "Hello Stay 可訂館別與規劃中館別定位",
    },
    linkLabel: "查看館別定位",
  },
  {
    id: "about-safety",
    kicker: "安全承諾",
    title: "合法與安全先講清楚",
    summary: "合法民宿登記、公共意外責任險與消防設備，不是附帶提一句，而是客人能不能放心下訂的前提。",
    image: {
      src: "/images/godin/cover-1.webp",
      alt: "Hello Stay 合法民宿與安全承諾代表畫面",
    },
    linkLabel: "查看安全承諾",
  },
];

const detailCards = [
  {
    id: "about-origin",
    kicker: "品牌起點",
    title: "品牌起點不是做設計，是解決團體住宿的痛點",
    description:
      "很多家庭、同學會和公司團體不是真的在找最豪華的房，而是在找一個可以住在一起、吃在一起、晚上還能繼續聚的地方。Hello Stay 就是從這個需求開始，在鹽埕慢慢把適合團體入住的空間整理出來。",
    image: {
      src: "/images/hellohouse/photo5.webp",
      alt: "Hello Stay 品牌起點與鹽埕街區",
    },
    specs: [
      { label: "創立起點", value: "2017 年起深耕鹽埕" },
      { label: "品牌出發點", value: "解決團體被拆房與缺少公共空間" },
      { label: "服務主軸", value: "家庭 朋友 企業 團體包棟" },
      { label: "地點選擇", value: "鹽埕生活圈與景點步行範圍" },
    ],
    groups: [
      {
        title: "我們一開始就在意",
        items: ["大家能不能住在一起", "公共空間夠不夠直覺", "周邊步行生活圈夠不夠完整"],
      },
      {
        title: "後來延伸出的館別方向",
        items: ["館別都以包棟邏輯規劃", "人數與設備差異會被放在前面", "不是把所有客人都塞進同一種館型"],
      },
    ],
  },
  {
    id: "about-portfolio",
    kicker: "館別分工",
    title: "目前可訂方案與規劃中館別分開說明",
    description:
      "你好哇寓所與溝頂民宿是目前可查房、可報價的館別，也可依人數安排雙館。大智若愚是規劃中的電梯館別，尚未開放訂房，因此不列入現行方案比較。",
    image: {
      src: "/images/hellohouse/1000.webp",
      alt: "Hello Stay 可訂館別與規劃中館別定位",
    },
    specs: [
      { label: "你好哇寓所", value: "8-26 人 中島廚房與大型聚會" },
      { label: "溝頂民宿", value: "4-12 人 分層客房與獨立衛浴" },
      { label: "雙館包棟", value: "27-36 人依實際人數確認" },
      { label: "大智若愚", value: "規劃中 尚未開放訂房" },
    ],
    groups: [
      {
        title: "客人選館時真的在比",
        items: ["人數級距", "房型和衛浴配置", "公共空間大小", "有沒有廚房或電梯"],
      },
      {
        title: "現在的館別安排",
        items: ["可訂與規劃中狀態分開", "房型頁補完整設備資訊", "日期與報價回到訂房站確認"],
      },
    ],
    action: { href: "/compare", label: "看兩館與雙館完整比較" },
  },
  {
    id: "about-safety",
    kicker: "安全承諾",
    title: "合法營運、安全設備與保險，是我們先交代的底線",
    description:
      "團體住宿不是只看照片 館別是否合法 是否投保公共意外責任險 消防與清潔是不是有基本水準 這些都會直接影響旅客敢不敢訂 Hello Stay 會把這些資訊公開呈現",
    image: {
      src: "/images/godin/cover-3.webp",
      alt: "Hello Stay 安全與合法承諾",
    },
    specs: [
      { label: "合法館別", value: "你好哇寓所 民宿 131 號" },
      { label: "合法館別", value: "溝頂民宿 民宿 163 號" },
      { label: "保險", value: "富邦產險公共意外責任險" },
      { label: "安全基本盤", value: "消防設備與高溫清潔" },
    ],
    groups: [
      {
        title: "這些資訊為什麼重要",
        items: ["團體入住風險高於單人旅宿", "家庭與企業會更在意合法性", "不是只有漂亮照片就能成立信任"],
      },
      {
        title: "我們的基本原則",
        items: ["合法登記", "定期消防檢查", "公共責任保險", "備品高溫清潔處理"],
      },
    ],
    action: { href: "/agreement", label: "查看入住須知與規範" },
  },
];

const facts = [
  { label: "我們在做什麼", value: "高雄鹽埕區團體包棟" },
  { label: "選館基準", value: "人數 設備 房型" },
  { label: "目前可訂", value: "你好哇 溝頂與雙館方案" },
  { label: "規劃中", value: "大智若愚 尚未開放訂房" },
];

const guides = [
  "Hello Stay 以團體包棟住宿為主軸",
  "兩館可訂 大智若愚仍在規劃中",
  "合法登記與安全承諾公開呈現",
  "房型與設備細節仍以各館頁為準",
];

const fit = [
  { label: "適合對象", value: "第一次認識 Hello Stay 的客人" },
  { label: "重點內容", value: "品牌起點 館別狀態 安全承諾" },
  { label: "延伸頁面", value: "可訂方案比較 或各館頁" },
  { label: "更多資訊", value: "房型與設備會在各館頁完整介紹" },
];

const galleryImages = [
  {
    src: "/images/hellohouse/cover.webp",
    alt: "你好哇寓所外觀與館別代表畫面",
    caption: "你好哇寓所",
  },
  {
    src: "/images/godin/cover-1.webp",
    alt: "溝頂民宿外觀與館別代表畫面",
    caption: "溝頂民宿",
  },
  {
    src: "/images/dazhi/building-render.webp",
    alt: "大智若愚規劃示意圖",
    caption: "大智若愚（規劃中）",
  },
];

const faqs = [
  {
    question: "Hello Stay 是訂房平台，還是自己的館別品牌？",
    answer: "是自己的館別品牌 官網會先把館別差異整理清楚 再連到官方訂房站查日期與報價",
  },
  {
    question: "目前哪些館別可以訂？",
    answer: "你好哇寓所與溝頂民宿目前可訂，也可依人數安排雙館；大智若愚仍在規劃中，尚未開放訂房。",
  },
  {
    question: "如果我想快速知道哪一館適合我 應該去哪裡",
    answer: "先看高雄包棟民宿比較頁最快；如果已經知道自己是 4-12 人或 8-26 人，也可以直接查看溝頂民宿或你好哇寓所。",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": "https://www.hello-stay.com/about/#webpage",
            url: "https://www.hello-stay.com/about",
            name: "關於 Hello Stay",
            description: "Hello Stay 高雄鹽埕包棟民宿品牌故事、可訂館別、規劃中館別與安全承諾。",
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://www.hello-stay.com/#organization",
            name: "Hello Stay",
            url: "https://www.hello-stay.com",
            foundingDate: "2017",
            subOrganization: [
              {
                "@type": "LodgingBusiness",
                name: "你好哇寓所",
                url: "https://www.hello-stay.com/hellohouse",
              },
              {
                "@type": "LodgingBusiness",
                name: "溝頂民宿",
                url: "https://www.hello-stay.com/godin",
              },
            ],
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
          kicker: "關於品牌",
          title: "Hello Stay",
          lead: "高雄鹽埕的團體包棟住宿。依人數提供不同空間方案，公開合法登記與安全資訊。",
          image: {
            src: "/images/hellohouse/cover.webp",
            alt: "Hello Stay 品牌與館別主視覺",
          },
          stats: [
            { label: "品牌起點", value: "2017 年起深耕鹽埕" },
            { label: "目前可訂", value: "你好哇 溝頂 雙館" },
            { label: "共同原則", value: "包棟邏輯 合法安全" },
            { label: "規劃中", value: "大智若愚 尚未開放" },
          ],
          primaryAction: { href: "/compare", label: "看可訂方案比較" },
          secondaryAction: { href: "/book", label: "直接查日期與空房" },
        }}
        overview={{
          kicker: "品牌怎麼開始",
          title: "品牌怎麼開始",
          intro: "從起點、定位到安全承諾",
          columns: 3,
          cards: brandCards,
        }}
        details={{
          kicker: "為什麼客人會選",
          title: "為什麼客人會選 Hello Stay",
          intro: "重點不在形容詞，而在館別定位與住宿邏輯。",
          cards: detailCards,
          factsTitle: "品牌重點整理",
          facts,
          guidesTitle: "品牌定位",
          guides,
          fitTitle: "適合對象",
          fit,
        }}
        gallery={{
          kicker: "目前館別方向",
          title: "目前館別方向",
          intro: "你好哇與溝頂目前可訂；大智若愚僅展示規劃方向，尚未開放房況與報價。",
          columns: 3,
          images: galleryImages,
        }}
        faq={{
          kicker: "常見問題",
          title: "品牌常見問題",
          intro: "客人最常問的品牌問題",
          items: faqs,
        }}
        final={{
          kicker: "下一步",
          title: "真正影響入住決定的是館別差異",
          body:
            "人數、公共空間、房型配置與設備條件，會比品牌介紹更直接影響入住判斷。",
          primaryAction: { href: "/compare", label: "看可訂方案比較" },
          secondaryAction: { href: "/packages", label: "看情境方案" },
        }}
      />
    </>
  );
}
