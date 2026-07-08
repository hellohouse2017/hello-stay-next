import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PropertyShowcasePage from "@/components/PropertyShowcasePage";

export const metadata: Metadata = {
  title: "Hello Stay 是專為團體旅客設計的高雄包棟民宿品牌",
  description:
    "從品牌起點、三館定位到安全承諾，一次看懂 Hello Stay 為什麼專注在高雄鹽埕區做團體包棟住宿。",
  alternates: { canonical: "https://www.hello-stay.com/about" },
  openGraph: {
    title: "Hello Stay 是專為團體旅客設計的高雄包棟民宿品牌",
    description: "了解 Hello Stay 的品牌起點、三館角色分工與合法安全承諾。",
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
    kicker: "三館分工",
    title: "三館各自有角色",
    summary: "你好哇、溝頂和大智若愚不是重複館型，而是對應不同人數和不同使用情境。",
    image: {
      src: "/images/hellohouse/1000.webp",
      alt: "Hello Stay 三館定位與公共空間代表畫面",
    },
    linkLabel: "查看三館定位",
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
    kicker: "三館分工",
    title: "三館各自對應不同人數與空間需求",
    description:
      "你好哇寓所主打大型公共空間與中島廚房，溝頂民宿主打小團體整棟獨立與四間客房獨立衛浴，大智若愚則是面向更大型團體的電梯與包層規劃。這樣分，是為了讓客人更快找到適合自己的空間。",
    image: {
      src: "/images/hellohouse/1000.webp",
      alt: "Hello Stay 三館定位與公共空間",
    },
    specs: [
      { label: "你好哇寓所", value: "6-26 人 中島廚房與大型聚會" },
      { label: "溝頂民宿", value: "4-12 人 分層客房與獨立衛浴" },
      { label: "大智若愚", value: "20-48 人 電梯與包層規劃" },
      { label: "雙館包棟", value: "大型團體不拆單" },
    ],
    groups: [
      {
        title: "客人選館時真的在比",
        items: ["人數級距", "房型和衛浴配置", "公共空間大小", "有沒有廚房或電梯"],
      },
      {
        title: "現在的館別安排",
        items: ["館別差異先被講清楚", "房型頁補完整設備資訊", "日期與報價回到訂房站確認"],
      },
    ],
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
      { label: "合法館別", value: "你好哇寓所 民宿 131-1 號" },
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
  },
];

const facts = [
  { label: "我們在做什麼", value: "高雄鹽埕區團體包棟" },
  { label: "選館基準", value: "人數 設備 房型" },
  { label: "目前館別", value: "你好哇 溝頂 大智若愚" },
  { label: "決策底線", value: "合法 安全 位置與空間好用" },
];

const guides = [
  "Hello Stay 以團體包棟住宿為主軸",
  "三館各自對應不同人數與使用方式",
  "合法登記與安全承諾公開呈現",
  "房型與設備細節仍以各館頁為準",
];

const fit = [
  { label: "適合對象", value: "第一次認識 Hello Stay 的客人" },
  { label: "重點內容", value: "品牌起點 三館分工 安全承諾" },
  { label: "延伸頁面", value: "三館比較 或各館頁" },
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
    caption: "大智若愚",
  },
];

const faqs = [
  {
    question: "Hello Stay 是訂房平台，還是自己的館別品牌？",
    answer: "是自己的館別品牌 官網會先把館別差異整理清楚 再連到官方訂房站查日期與報價",
  },
  {
    question: "三館是不是只是大小不同？",
    answer: "不是。除了人數不同，三館的核心差在公共空間、廚房、衛浴配置與入住動線，所以要分開設計、分開介紹。",
  },
  {
    question: "如果我想快速知道哪一館適合我 應該去哪裡",
    answer: "直接去 /compare 最快；如果你已經知道自己偏小團或大團，也可以直接進 /godin 或 /hellohouse。",
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
            description: "Hello Stay 高雄鹽埕包棟民宿品牌故事、三館定位與安全承諾。",
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
              {
                "@type": "LodgingBusiness",
                name: "大智若愚",
                url: "https://www.hello-stay.com/dazhi",
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
          title: "Hello Stay 是專為團體旅客設計的高雄包棟民宿品牌",
          lead:
            "Hello Stay 以高雄鹽埕團體包棟住宿為主軸。三館分別對應不同人數與空間需求，合法登記與安全承諾也一併公開。",
          image: {
            src: "/images/hellohouse/cover.webp",
            alt: "Hello Stay 品牌與館別主視覺",
          },
          stats: [
            { label: "品牌起點", value: "2017 年起深耕鹽埕" },
            { label: "館別方向", value: "小團 大團 大型團體分流" },
            { label: "共同原則", value: "包棟邏輯 合法安全" },
            { label: "品牌輪廓", value: "角色清楚 不做重複館型" },
          ],
          primaryAction: { href: "/compare", label: "看三館比較" },
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
          intro: "三館不是同一個模板換名字，而是依不同團體需求分別設計。",
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
          primaryAction: { href: "/compare", label: "看三館比較" },
          secondaryAction: { href: "/packages", label: "看情境方案" },
        }}
      />
    </>
  );
}
