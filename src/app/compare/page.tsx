import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PropertyShowcasePage from "@/components/PropertyShowcasePage";
import { publicStayFacts } from "@/data/public-stay-facts";

export const metadata: Metadata = {
  title: "【高雄包棟民宿比較】4房vs6房怎麼挑？你好哇寓所與溝頂民宿房型・衛浴・分房配置評比｜Hello Stay",
  description:
    "高雄包棟民宿怎麼選？比較溝頂民宿（4房/4衛・4-12人）、你好哇寓所（6房/6衛・8-26人）與雙館 10 房方案的房型配置、分房隱私、中島廚房與公共空間，全獨立套房・包棟絕不鎖房。",
  alternates: { canonical: "https://www.hello-stay.com/compare" },
  openGraph: {
    title: "【高雄包棟民宿比較】4房vs6房怎麼挑？你好哇寓所與溝頂民宿房型・衛浴・分房配置評比｜Hello Stay",
    description: "依房間數（4房/6房/10房）、人數與分房隱私比較高雄鹽埕目前可訂的兩館與雙館包棟方案，全套房獨立衛浴・包棟絕不鎖房。",
    url: "https://www.hello-stay.com/compare",
    images: [
      {
        url: "https://www.hello-stay.com/images/hellohouse/cover.webp",
        width: 1200,
        height: 630,
        alt: "Hello Stay 高雄鹽埕包棟民宿比較",
      },
    ],
  },
};

const bookableOptions = [
  {
    id: "compare-hellohouse",
    kicker: "你好哇寓所",
    title: "你好哇寓所",
    summary: ["8-26 人", "6 間客房", "中島廚房與大型公共空間"],
    image: {
      src: "/images/hellohouse/1000.webp",
      alt: "你好哇寓所 1F 中島廚房與大型交誼空間",
    },
    description: ["想一起吃飯、聊天或辦活動", "1F 中島廚房與大型交誼空間是主要優勢"],
    specs: [
      { label: "適合人數", value: "8-26 人" },
      {
        label: "房型",
        value: `雙人房 ${publicStayFacts.hellohouse.bedroomLayout.double} 間、四人房 ${publicStayFacts.hellohouse.bedroomLayout.quadruple} 間、六人房 ${publicStayFacts.hellohouse.bedroomLayout.sixPerson} 間`,
      },
      { label: "衛浴", value: "客房皆有獨立衛浴" },
      { label: "設備", value: "中島廚房、手動麻將、桌遊、聯網電視" },
    ],
    groups: [
      {
        title: "適合",
        items: ["13 人以上團體", "需要大型公共空間", "想開伙或聚餐", "婚禮迎娶與慶生聚會"],
      },
      {
        title: "入住前留意",
        items: ["房間分配是否符合睡法", "是否需要加床", "館內沒有電梯，需走樓梯"],
      },
    ],
    action: { href: "/hellohouse", label: "看你好哇房型與設備" },
  },
  {
    id: "compare-godin",
    kicker: "溝頂民宿",
    title: "溝頂民宿",
    summary: ["4-12 人", "五層獨棟、四間客房", "每間客房都有獨立衛浴"],
    image: {
      src: "/images/godin/cover-1.webp",
      alt: "溝頂民宿 4F 交誼廳與整棟分層空間",
    },
    description: ["想住同一棟、各自好睡", "四間客房都有獨立衛浴", "4F 是交誼與備餐空間"],
    specs: [
      { label: "適合人數", value: "4-12 人" },
      { label: "房型", value: "雙人房 2 間、四人房 2 間" },
      { label: "衛浴", value: "四間客房皆有獨立衛浴" },
      { label: "設備", value: "4F 交誼廳、手動麻將、冰箱、微波爐" },
    ],
    groups: [
      {
        title: "適合",
        items: ["家庭旅行", "小型朋友聚會", "想整棟獨立", "希望每間客房都有衛浴"],
      },
      {
        title: "入住前留意",
        items: ["4F 公共交誼廳無衛浴", "不開放正式開伙", "館內沒有電梯，需走樓梯"],
      },
    ],
    action: { href: "/godin", label: "看溝頂房型與設備" },
  },
  {
    id: "compare-dual",
    kicker: "雙館方案",
    title: "你好哇＋溝頂雙館",
    summary: ["27-36 人", "兩館步行約 5 秒", "10 間客房、分棟休息"],
    image: {
      src: "/images/hellohouse/team-cover.webp",
      alt: "Hello Stay 多人團體使用你好哇寓所與溝頂民宿雙館方案",
    },
    description: ["27-34 人是標準安排", "35-36 人須加床", "聚會集中在你好哇、休息分散到兩館"],
    specs: [
      { label: "適合人數", value: "27-36 人" },
      { label: "房型", value: "兩館合計 10 間客房" },
      { label: "館距", value: "兩館步行約 5 秒" },
      { label: "安排", value: "35-36 人須加床" },
    ],
    groups: [
      {
        title: "適合",
        items: ["大家族旅行", "婚禮親友住宿", "企業與活動團體", "需要分棟安排作息"],
      },
      {
        title: "入住前留意",
        items: ["需事先分配兩館房間", "聚會空間以你好哇為主", "兩館都沒有電梯"],
      },
    ],
    action: { href: "/book?guestCount=30", label: "查雙館空房與報價" },
  },
] as const;

const comparisonFacts = [
  { label: "4 房包棟（4-12人）", value: "溝頂：4 間獨立套房衛浴・不鎖房" },
  { label: "6 房包棟（8-26人）", value: "你好哇：6 間獨立套房衛浴＋中島大廚房" },
  { label: "10 房包棟（27-36人）", value: "雙館：10 間獨立套房衛浴・分棟休息" },
  { label: "分房隱私與承諾", value: "全套房獨立衛浴・包棟絕不鎖房" },
];

const bookingNotes = [
  "3-4 對情侶或小團體：溝頂 4 房提供 4 間獨立套房（2雙+2四），每組皆有專屬衛浴",
  "多組家庭或聚會迎娶：你好哇 6 房提供 6 間獨立套房與 1F 中島廚房大客廳",
  "包棟透明承諾：所有包棟方案皆享有對應之完整房間數與全棟空間，絕不鎖房",
  "27-34 人使用雙館標準安排，35-36 人須加床；兩館皆為樓梯動線、無電梯",
];

const fit = [
  { label: "你好哇寓所", value: "聚餐、迎娶、慶生" },
  { label: "溝頂民宿", value: "家庭、小團體、分層休息" },
  { label: "雙館方案", value: "27-36 人大型團體" },
  { label: "規劃中", value: "大智若愚尚未開放訂房" },
];

const galleryImages = [
  {
    src: "/images/hellohouse/1000.webp",
    alt: "你好哇寓所大型公共空間",
    caption: "你好哇寓所：中島廚房與大型交誼區",
  },
  {
    src: "/images/godin/cover-1.webp",
    alt: "溝頂民宿交誼廳與整棟分層空間",
    caption: "溝頂民宿：五層獨棟與 4F 交誼廳",
  },
  {
    src: "/images/hellohouse/team-cover.webp",
    alt: "Hello Stay 雙館多人團體入住情境",
    caption: "雙館方案：聚會集中、分棟休息",
  },
];

const faqs = [
  {
    question: "高雄包棟民宿 10 人怎麼選？",
    answer: "10 人通常先看溝頂民宿：四間客房為 2 間雙人房與 2 間四人房，每間客房都有獨立衛浴。若更重視完整廚房與大型聚會空間，再比較你好哇寓所。",
  },
  {
    question: "20 人與 30 人包棟分別怎麼選？",
    answer: "20 人優先看 8-26 人的你好哇寓所；30 人則看你好哇與溝頂雙館方案。雙館標準安排為 27-34 人，35-36 人須加床。",
  },
  {
    question: "目前可訂的方案有電梯嗎？",
    answer: "沒有。你好哇寓所、溝頂民宿與雙館方案都需要走樓梯；近期入住若一定需要電梯，應另找符合需求的住宿。大智若愚仍在規劃中，不能用來承諾近期房況。",
  },
  {
    question: "大智若愚現在可以直接訂嗎？",
    answer: "不可以。大智若愚目前是規劃中館別，尚未開放訂房，也不列入目前可訂方案的比較或 ItemList。",
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
              { "@type": "ListItem", position: 2, name: "高雄包棟民宿比較", item: "https://www.hello-stay.com/compare" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Hello Stay 目前可訂包棟方案",
            description: "依人數比較溝頂民宿、你好哇寓所與雙館方案。",
            numberOfItems: bookableOptions.length,
            itemListElement: bookableOptions.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": item.id === "compare-dual" ? "Service" : "LodgingBusiness",
                name: item.title,
                url:
                  item.id === "compare-hellohouse"
                    ? "https://www.hello-stay.com/hellohouse"
                    : item.id === "compare-godin"
                      ? "https://www.hello-stay.com/godin"
                      : "https://www.hello-stay.com/compare#compare-dual",
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

      <PropertyShowcasePage
        hero={{
          kicker: "高雄包棟民宿比較",
          title: "高雄包棟民宿怎麼選？",
          lead: "先看人數，再看房型與公共空間：4-12 人選溝頂、8-26 人選你好哇、27-36 人選雙館。規劃中的大智若愚不列入目前可訂比較。",
          image: {
            src: "/images/hellohouse/cover.webp",
            alt: "Hello Stay 高雄包棟民宿比較主視覺",
          },
          stats: [
            { label: "4-12 人", value: "溝頂民宿" },
            { label: "8-26 人", value: "你好哇寓所" },
            { label: "27-36 人", value: "雙館方案" },
            { label: "目前電梯方案", value: "無" },
          ],
          primaryAction: { href: "/book", label: "查詢空房與報價" },
          secondaryAction: { href: "/kaohsiung-whole-house", label: "依人數看完整攻略" },
        }}
        overview={{
          kicker: "BOOKABLE OPTIONS",
          title: "目前可訂的三種安排",
          intro: [
            "兩間合法民宿，加上一個雙館組合。",
            "先依總人數縮小範圍，再確認房間分配、廚房與樓梯動線。",
          ],
          columns: 3,
          cards: bookableOptions.map((item) => ({
            id: item.id,
            kicker: item.kicker,
            title: item.title,
            summary: [...item.summary],
            image: item.image,
            linkLabel: "看方案細節",
          })),
        }}
        details={{
          kicker: "PROPERTY DETAILS",
          title: "房型、設備與適合情境",
          intro: [
            "泛包棟搜尋先由這一頁比較。",
            "若已經確定是 6、10、20 或 30 人，再前往人數方案中樞看對應攻略。",
          ],
          cards: bookableOptions.map((item) => ({
            id: item.id,
            kicker: item.kicker,
            title: item.title,
            description: [...item.description],
            image: item.image,
            specs: [...item.specs],
            groups: item.groups.map((group) => ({ title: group.title, items: [...group.items] })),
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
          title: "目前可訂方案的空間差異",
          columns: 3,
          images: galleryImages,
        }}
        faq={{
          kicker: "常見問題",
          title: "高雄包棟民宿比較常見問題",
          items: faqs,
        }}
        final={{
          kicker: "PLANNING NOTICE",
          title: "大智若愚仍在規劃中，尚未開放訂房",
          body: "電梯、規劃容量與房內設備都要等正式公告。本輪只保留獨立規劃說明，不把它列入目前可訂館別、雙館方案或主要 ItemList。",
          navLabel: "規劃中館別",
          primaryAction: { href: "/dazhi", label: "查看規劃說明" },
          secondaryAction: { href: "/book", label: "查目前可訂方案" },
        }}
      />
    </>
  );
}
