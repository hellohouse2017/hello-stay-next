import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PropertyShowcasePage from "@/components/PropertyShowcasePage";
import { publicStayFacts } from "@/data/public-stay-facts";

export const metadata: Metadata = {
  title: "高雄包棟民宿比較｜你好哇寓所vs溝頂民宿怎麼選",
  description:
    "高雄包棟怎麼選？比較你好哇寓所（8-26 人）、溝頂民宿（4-12 人）與 27-36 人雙館方案的人數、房型、衛浴、廚房與公共空間；大智若愚目前僅列規劃狀態，不開放訂房。",
  alternates: { canonical: "https://www.hello-stay.com/compare" },
  openGraph: {
    title: "高雄包棟民宿比較｜你好哇寓所vs溝頂民宿怎麼選｜Hello Stay",
    description: "直接比較高雄鹽埕兩館包棟民宿與雙館方案的人數、房型、設備與開放狀態。",
    url: "https://www.hello-stay.com/compare",
    images: [
      {
        url: "https://www.hello-stay.com/images/hellohouse/cover.webp",
        width: 1200,
        height: 630,
        alt: "Hello Stay 三館比較",
      },
    ],
  },
};

const properties = [
  {
    id: "compare-hellohouse",
    kicker: "你好哇寓所",
    title: "你好哇寓所",
    summary: ["8-26 人", "中島廚房與大型公共空間", "適合聚餐 迎娶 慶生"],
    image: {
      src: "/images/hellohouse/1000.webp",
      alt: "你好哇寓所 1F 中島廚房與大型交誼空間",
    },
    description: ["想一起吃飯 聊天 辦活動", "1F 中島廚房與大型交誼空間是主角"],
    specs: [
      { label: "適合人數", value: "8-26 人" },
      { label: "房型", value: `雙人房 ${publicStayFacts.hellohouse.bedroomLayout.double} 間 四人房 ${publicStayFacts.hellohouse.bedroomLayout.quadruple} 間 六人房 ${publicStayFacts.hellohouse.bedroomLayout.sixPerson} 間` },
      { label: "衛浴", value: "客房皆有獨立衛浴" },
      { label: "設備", value: "中島廚房 麻將 桌遊 聯網電視" },
    ],
    groups: [
      {
        title: "適合",
        items: ["13 人以上團體", "需要大型公共空間", "想開伙或聚餐", "婚禮迎娶與慶生聚會"],
      },
      {
        title: "入住前留意",
        items: ["房間分配是否符合睡法", "是否需要補寢具", "樓梯動線是否適合長輩"],
      },
    ],
    action: { href: "/hellohouse", label: "看你好哇房型與設備" },
  },
  {
    id: "compare-godin",
    kicker: "溝頂民宿",
    title: "溝頂民宿",
    summary: ["4-12 人", "五層獨棟 四間客房", "每間客房都有獨立衛浴"],
    image: {
      src: "/images/godin/cover-1.webp",
      alt: "溝頂民宿 4F 交誼廳與整棟分層空間",
    },
    description: ["想住同一棟 各自好睡", "四間客房都有獨立衛浴", "4F 是交誼廳"],
    specs: [
      { label: "適合人數", value: "4-12 人" },
      { label: "房型", value: "雙人房 2 間 四人房 2 間" },
      { label: "衛浴", value: "四間客房皆有獨立衛浴" },
      { label: "設備", value: "4F 交誼廳 麻將 冰箱 微波爐" },
    ],
    groups: [
      {
        title: "適合",
        items: ["家庭旅行", "小型朋友聚會", "想整棟獨立", "希望每間客房都有衛浴"],
      },
      {
        title: "入住前留意",
        items: ["4F 公共交誼廳無衛浴", "無法開伙", "超過 12 人需改看其他方案"],
      },
    ],
    action: { href: "/godin", label: "看溝頂房型與設備" },
  },
  {
    id: "compare-dazhi",
    kicker: "大智若愚",
    title: "大智若愚",
    summary: ["20-48 人", "尚未開放訂房", "電梯 一層三房一廳"],
    image: {
      src: "/images/dazhi/building-render.webp",
      alt: "大智若愚電梯大樓與大型團體館別規劃",
    },
    description: ["大型團體與電梯動線需求", "尚未開放訂房", "可先留下需求"],
    specs: [
      { label: "規劃人數", value: "20-48 人" },
      { label: "空間", value: "一層三房一廳" },
      { label: "動線", value: "電梯大樓" },
      { label: "狀態", value: "尚未開放訂房 可先登記需求" },
    ],
    groups: [
      {
        title: "適合",
        items: ["大型家族旅行", "企業員旅", "球隊與活動團體", "重視電梯與行李動線"],
      },
      {
        title: "入住前留意",
        items: ["尚未正式開放訂房", "實際房價與房內設備待公告", "近期入住以你好哇或溝頂為主"],
      },
    ],
    action: { href: "/dazhi", label: "看大智若愚規劃" },
  },
];

const comparisonFacts = [
  { label: "4-12 人", value: "溝頂 四房獨棟" },
  { label: "8-26 人", value: "你好哇 中島廚房" },
  { label: "尚未開放訂房", value: "大智若愚 電梯大樓" },
  { label: "要開伙", value: "你好哇更完整" },
];

const bookingNotes = [
  "近期入住請先看你好哇或溝頂",
  "需要廚房時 你好哇優勢更明確",
  "每房獨立衛浴時 溝頂更直觀",
  "近期入住看雙館；未來電梯需求可登記大智若愚",
];

const fit = [
  { label: "你好哇寓所", value: "聚餐 迎娶 慶生" },
  { label: "溝頂民宿", value: "家庭 小團體 分層休息" },
  { label: "大智若愚", value: "大型團體 電梯需求" },
  { label: "雙館安排", value: "人數超過單館時詢問" },
];

const galleryImages = [
  {
    src: "/images/hellohouse/1000.webp",
    alt: "你好哇寓所大型公共空間",
    caption: "你好哇寓所 中島廚房與大型交誼區",
  },
  {
    src: "/images/godin/cover-1.webp",
    alt: "溝頂民宿交誼廳與整棟分層空間",
    caption: "溝頂民宿 五層獨棟與 4F 交誼廳",
  },
  {
    src: "/images/dazhi/building-render.webp",
    alt: "大智若愚大型團體與電梯館別規劃",
    caption: "大智若愚 電梯大樓與大型團體規劃",
  },
];

const faqs = [
  {
    question: "10 人小團體看哪一館",
    answer: "多數情況會落在溝頂民宿 整棟獨立 房間分層 四間客房都有獨立衛浴 如果也需要大型廚房與聚餐空間 再比較你好哇寓所",
  },
  {
    question: "哪一館適合聚餐迎娶",
    answer: "你好哇寓所最明確 1F 有中島廚房 吧台與大型交誼空間 很適合聚餐 迎娶 慶生和多人同聚",
  },
  {
    question: "大智若愚現在可以直接訂嗎",
    answer: "大智若愚目前尚未開放訂房。近期入住請先看你好哇、溝頂或雙館；若在意電梯與大型團體動線，可先登記需求。",
  },
];

export default function ComparePage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.hello-stay.com" },
              { "@type": "ListItem", position: 2, name: "館別比較", item: "https://www.hello-stay.com/compare" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Hello Stay 館別怎麼選",
            description: "先分清目前可訂館別，再看尚未開放訂房的大智若愚。",
            itemListElement: properties.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "LodgingBusiness",
                name: item.title,
                url:
                  item.id === "compare-hellohouse"
                    ? "https://www.hello-stay.com/hellohouse"
                    : item.id === "compare-godin"
                      ? "https://www.hello-stay.com/godin"
                      : "https://www.hello-stay.com/dazhi",
              },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]}
      />

      <PropertyShowcasePage
        hero={{
          kicker: "高雄包棟民宿比較",
          title: "高雄包棟怎麼選",
          lead: "依人數、房間配置與公共空間比較目前包棟方案：4-12 人看溝頂、8-26 人看你好哇、27-36 人選雙館。大智若愚仍在規劃中。",
          image: {
            src: "/images/hellohouse/cover.webp",
            alt: "Hello Stay 三館比較主視覺",
          },
          stats: [
            { label: "目前可訂", value: "溝頂民宿 與 你好哇寓所" },
            { label: "尚未開放訂房", value: "大智若愚" },
            { label: "比較重點", value: "人數 房型 衛浴 設備" },
            { label: "下一步", value: "先看目前可訂再談規劃" },
          ],
          primaryAction: { href: "/book", label: "查詢空房與報價" },
          secondaryAction: { href: "/packages", label: "看入住情境" },
        }}
        overview={{
          kicker: "三館速看",
          title: "目前可訂與尚未開放訂房",
          intro: [
            "先看目前可訂的兩館，",
            "再補看尚未開放訂房的大智若愚。",
            "人數與設備需求一對上，館別就會很快收斂。",
          ],
          columns: 3,
          cards: properties.map((item) => ({
            id: item.id,
            kicker: item.kicker,
            title: item.title,
            summary: item.summary,
            image: item.image,
            linkLabel: "看館別細節",
          })),
        }}
        details={{
          kicker: "PROPERTY DETAILS",
          title: "房型、設備與目前狀態",
          intro: [
            "先分清目前可訂與尚未開放訂房，",
            "再比住起來的節奏。",
            "這也是多數人在找高雄包棟推薦時真正會卡住的地方。",
          ],
          cards: properties.map((item) => ({
            id: item.id,
            kicker: item.kicker,
            title: item.title,
            description: item.description,
            image: item.image,
            specs: item.specs,
            groups: item.groups,
            action: item.action,
          })),
          factsTitle: "快速對照",
          facts: comparisonFacts,
          guidesTitle: "入住前留意",
          guides: bookingNotes,
          fitTitle: "典型需求",
          fit,
        }}
        gallery={{
          kicker: "空間對照",
          title: "三館空間感差異",
          columns: 3,
          images: galleryImages,
        }}
        faq={{
          kicker: "常見問題",
          title: "三館比較常見問題",
          items: faqs,
        }}
      />
    </>
  );
}
