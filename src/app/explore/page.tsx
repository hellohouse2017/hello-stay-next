import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PropertyShowcasePage from "@/components/PropertyShowcasePage";

export const metadata: Metadata = {
  title: "鹽埕周邊探索｜住 Hello Stay 可以怎麼玩、怎麼吃",
  description:
    "把鹽埕美食、步行景點與簡單行程排法整理成同一頁，讓客人先知道住在 Hello Stay 周邊的旅行節奏。",
  alternates: { canonical: "https://www.hello-stay.com/explore" },
  openGraph: {
    title: "鹽埕周邊探索｜住 Hello Stay 可以怎麼玩、怎麼吃",
    description: "步行景點、在地美食與行程節奏一次整理。",
    url: "https://www.hello-stay.com/explore",
    images: [
      {
        url: "https://www.hello-stay.com/images/hellohouse/photo5.webp",
        width: 1200,
        height: 630,
        alt: "Hello Stay 鹽埕周邊探索",
      },
    ],
  },
};

const exploreCards = [
  {
    id: "explore-walkable",
    kicker: "WALKABLE",
    title: "住在步行生活圈",
    summary: "真正有價值的不是景點很多，而是晚餐、散步、宵夜、回民宿這條路線可以不用再搭車。",
    image: {
      src: "/images/hellohouse/photo5.webp",
      alt: "Hello Stay 館外巷弄與鹽埕步行生活圈",
    },
    linkLabel: "查看步行重點",
  },
  {
    id: "explore-food",
    kicker: "LOCAL FOOD",
    title: "吃的密度很高",
    summary: "鹽埕的優勢不是單一名店，而是早餐、小吃、酒吧、冰品和宵夜都在同一個生活圈內。",
    image: {
      src: "/images/hellohouse/photo1.webp",
      alt: "Hello Stay 適合外帶回館聚餐的鹽埕美食節奏",
    },
    linkLabel: "查看美食節奏",
  },
  {
    id: "explore-itinerary",
    kicker: "TRIP FLOW",
    title: "行程安排可以很鬆",
    summary: "這裡適合把行程排成白天出去、傍晚散步、晚上回民宿繼續聚，而不是從早到晚一直趕車。",
    image: {
      src: "/images/godin/cover-3.webp",
      alt: "住 Hello Stay 後回館聚會的旅行節奏",
    },
    linkLabel: "查看行程節奏",
  },
];

const detailCards = [
  {
    id: "explore-walkable",
    kicker: "WALKABLE",
    title: "這個區域最大的優勢，是住和玩可以接在一起",
    description:
      "如果住宿離景點太遠，晚上回館就很容易散掉。Hello Stay 在鹽埕的優勢，是駁二、大港橋、捷運鹽埕埔站、奶茶街和幾家老店都能串成同一條步行動線，整趟旅程比較完整。",
    image: {
      src: "/images/hellohouse/photo5.webp",
      alt: "鹽埕步行生活圈與 Hello Stay 住宿位置",
    },
    specs: [
      { label: "駁二藝術特區", value: "步行約 10 分鐘" },
      { label: "大港橋", value: "步行約 8 分鐘" },
      { label: "鹽埕埔站 O2", value: "步行約 5 分鐘" },
      { label: "回館節奏", value: "不用特地再拉車" },
    ],
    groups: [
      {
        title: "住客最有感的地方",
        items: ["晚餐吃完還能順路散步", "喝完再慢慢走回民宿", "白天景點和晚上聚會不會被切開"],
      },
      {
        title: "適合這樣玩",
        items: ["下午駁二", "傍晚大港橋", "晚上回館續攤", "隔天早上再去吃早餐店"],
      },
    ],
    action: { href: "/traffic", label: "看交通與步行動線" },
  },
  {
    id: "explore-food",
    kicker: "LOCAL FOOD",
    title: "鹽埕的吃法，不是收集清單，是找適合帶回館的節奏",
    description:
      "對團體客來說，真正好用的不是『打卡了幾間』，而是知道什麼適合現場吃、什麼適合外帶回去。像鴨肉珍、港園牛肉麵、婆婆冰、奶茶街、酒吧與宵夜攤，會讓晚上在館內聚會更完整。",
    image: {
      src: "/images/hellohouse/photo1.webp",
      alt: "Hello Stay 公共空間與外帶美食回館的情境",
    },
    specs: [
      { label: "正餐關鍵字", value: "鴨肉珍 港園牛肉麵 葉家肉粥" },
      { label: "甜點冰品", value: "婆婆冰 阿綿麻糬" },
      { label: "酒吧與宵夜", value: "老街酒場與鹽埕夜間生活圈" },
      { label: "最實用玩法", value: "外帶回館聚" },
    ],
    groups: [
      {
        title: "適合現場吃",
        items: ["老店熱食", "早餐店", "下午茶與冰品"],
      },
      {
        title: "適合帶回館",
        items: ["滷味", "啤酒與宵夜", "火鍋食材", "超商與全聯補貨"],
      },
    ],
    action: { href: "/packages", label: "看聚會型入住方案" },
  },
  {
    id: "explore-itinerary",
    kicker: "TRIP FLOW",
    title: "這裡適合排成白天出門 晚上回館的旅程節奏",
    description:
      "鹽埕不是那種一定要塞滿整天景點的地方。對包棟客更好的方式，通常是白天走一段、晚上留時間回民宿吃東西、聊天、打麻將或繼續喝。這跟住飯店的節奏完全不同。",
    image: {
      src: "/images/godin/cover-3.webp",
      alt: "回館聚會與住宿後旅行節奏",
    },
    specs: [
      { label: "2 天 1 夜", value: "駁二 + 大港橋 + 館內聚會" },
      { label: "3 天 2 夜", value: "再加西子灣 旗津或高流" },
      { label: "家庭客", value: "白天走景點 晚上館內慢住" },
      { label: "朋友團", value: "白天散步 晚上宵夜麻將" },
    ],
    groups: [
      {
        title: "最實際的排法",
        items: ["不要一天排太滿", "把館內時間留下來", "旅程的記憶點通常在晚上"],
      },
      {
        title: "這也是包棟和飯店的差異",
        items: ["飯店比較像睡覺點", "包棟本身是行程的一部分", "館內活動和外出行程互相補強"],
      },
    ],
    action: { href: "/compare", label: "看哪一館更符合你們的節奏" },
  },
];

const facts = [
  { label: "生活圈重點", value: "駁二 大港橋 鹽埕埔站" },
  { label: "吃的節奏", value: "現場吃與外帶回館並存" },
  { label: "典型玩法", value: "白天出門 晚上回館聚" },
  { label: "旅行感受", value: "住和玩能自然接在一起" },
];

const guides = [
  "鹽埕的優勢在於步行生活圈完整",
  "景點 美食與回館節奏能自然串在一起",
  "對包棟客來說 館內時間和外出行程一樣重要",
  "交通與館別可再搭配其他頁面一起看",
];

const fit = [
  { label: "適合對象", value: "想先確認地點與生活圈的人" },
  { label: "最常在意", value: "步行景點與美食節奏" },
  { label: "延伸頁面", value: "交通頁 或選館頁" },
  { label: "旅程節奏", value: "白天出門 晚上回館聚" },
];

const locationSpots = [
  { name: "駁二藝術特區", detail: "步行 10 分鐘" },
  { name: "大港橋", detail: "步行 8 分鐘" },
  { name: "捷運鹽埕埔站", detail: "步行 5 分鐘" },
  { name: "鴨肉珍", detail: "步行 3 分鐘" },
  { name: "婆婆冰", detail: "步行約 5 分鐘" },
  { name: "7-ELEVEN / 全聯", detail: "補貨很方便" },
];

const galleryImages = [
  {
    src: "/images/hellohouse/photo5.webp",
    alt: "Hello Stay 館外巷弄與鹽埕生活圈",
    caption: "步行生活圈",
  },
  {
    src: "/images/hellohouse/photo2.webp",
    alt: "你好哇寓所中島廚房與外帶回館聚餐情境",
    caption: "外帶回館聚餐",
  },
  {
    src: "/images/godin/room4.webp",
    alt: "溝頂民宿交誼廳與回館後團體活動",
    caption: "晚上回館的節奏",
  },
];

const faqs = [
  {
    question: "住在 Hello Stay 周邊，最方便的景點是哪幾個？",
    answer: "最直覺的是駁二藝術特區、大港橋和鹽埕老街生活圈，因為都能步行完成，不需要再安排車程。",
  },
  {
    question: "鹽埕的美食適合怎麼吃比較合理？",
    answer: "白天吃幾間老店，晚上把適合外帶的宵夜、酒水或甜點帶回館內，通常比一直在外面跑更適合團體客。",
  },
  {
    question: "喜歡這個生活圈後 還要看什麼",
    answer: "交通停車頁會補足抵達方式 三館比較頁則能把人數與公共空間差異看得更清楚",
  },
];

export default function ExplorePage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            name: "高雄鹽埕生活圈",
            description: "適合步行散步、美食聚集與港區景點連動的高雄住宿生活圈。",
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
          kicker: "EXPLORE YANCHENG",
          title: "住在鹽埕 很適合這樣玩",
          lead:
            "駁二 大港橋 鹽埕老街與在地美食都在步行範圍 住在這裡的感覺不是趕行程 而是白天出去 晚上回館繼續聚",
          image: {
            src: "/images/hellohouse/photo5.webp",
            alt: "Hello Stay 周邊探索與鹽埕生活圈主視覺",
          },
          stats: [
            { label: "步行生活圈", value: "駁二 大港橋 鹽埕埔站" },
            { label: "旅遊方式", value: "白天出門 晚上回館聚" },
            { label: "吃的重點", value: "老店密度高 外帶回館方便" },
            { label: "地點感受", value: "住和玩接得很順" },
          ],
          primaryAction: { href: "/compare", label: "比較三館位置與需求" },
          secondaryAction: { href: "/traffic", label: "看交通與停車" },
        }}
        overview={{
          kicker: "AREA GUIDE",
          title: "鹽埕的旅遊節奏",
          intro: "景點 生活機能和回館時間可以自然接在一起",
          columns: 3,
          cards: exploreCards,
        }}
        details={{
          kicker: "STAY FLOW",
          title: "住在這裡的旅行節奏",
          intro: "把住客會真的用到的步行動線、美食節奏和行程安排拆開來看，會比單純列清單更有用。",
          cards: detailCards,
          factsTitle: "周邊重點整理",
          facts,
          guidesTitle: "旅遊重點",
          guides,
          fitTitle: "適合對象",
          fit,
        }}
        gallery={{
          kicker: "SCENES",
          title: "住和玩是接在一起的",
          intro: "這幾個畫面代表的不是單一景點，而是這區最實際的使用方式。",
          columns: 3,
          images: galleryImages,
        }}
        faq={{
          kicker: "FAQ",
          title: "周邊探索常見問題",
          intro: "客人最常問的玩法邏輯",
          items: faqs,
        }}
        location={{
          kicker: "NEARBY",
          title: "步行範圍先記這些就夠了",
          intro: "第一次住鹽埕 把這幾個點記起來就很夠用",
          cardTitle: "Hello Stay 周邊生活圈",
          address: "高雄市鹽埕區大公路巷弄周邊",
          description:
            "以 Hello Stay 為中心，步行就能串起景點、美食和補給。對團體旅客來說，這種不用一直集合再搭車的動線會輕鬆很多。",
          spots: locationSpots,
        }}
        final={{
          kicker: "PROPERTIES",
          title: "生活圈對了 館別差異會更清楚",
          body:
            "接著看的通常會是人數 公共空間與房型配置 這些差異會直接影響住起來的感受",
          primaryAction: { href: "/compare", label: "看三館比較" },
          secondaryAction: { href: "/book", label: "查空房與報價" },
        }}
      />
    </>
  );
}
