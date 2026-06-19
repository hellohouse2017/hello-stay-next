import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PropertyShowcasePage from "@/components/PropertyShowcasePage";

export const metadata: Metadata = {
  title: "入住須知與住宿規則｜Hello Stay 訂房前重點整理",
  description:
    "把入住時間 押金 取消方式 加人與禁止事項整理成更容易看懂的規則頁 讓客人訂房前掌握重點",
  alternates: { canonical: "https://www.hello-stay.com/agreement" },
  openGraph: {
    title: "入住須知與住宿規則｜Hello Stay 訂房前重點整理",
    description: "把入住規則拆成客人最常問的幾個重點",
    url: "https://www.hello-stay.com/agreement",
    images: [
      {
        url: "https://www.hello-stay.com/images/hellohouse/cover.webp",
        width: 1200,
        height: 630,
        alt: "Hello Stay 入住須知",
      },
    ],
  },
};

const ruleCards = [
  {
    id: "agreement-time",
    kicker: "CHECK-IN",
    title: "入住與退房時間",
    summary: "大部分客人最先在意的是幾點能進、幾點得退，以及超時會怎麼算。",
    image: {
      src: "/images/hellohouse/photo5.webp",
      alt: "Hello Stay 入住與退房時間說明",
    },
    linkLabel: "查看時間規則",
  },
  {
    id: "agreement-money",
    kicker: "PAYMENT",
    title: "押金 取消與加人",
    summary: "這些是最容易出現誤會的地方，所以要用最直白的方式講清楚。",
    image: {
      src: "/images/hellohouse/photo2.webp",
      alt: "Hello Stay 訂房、押金與取消規則",
    },
    linkLabel: "查看費用規則",
  },
  {
    id: "agreement-rules",
    kicker: "HOUSE RULES",
    title: "禁止事項與安寧規定",
    summary: "禁菸、寵物、噪音、訪客與清潔狀況，這些都會直接影響押金與是否能繼續入住。",
    image: {
      src: "/images/godin/cover-3.webp",
      alt: "Hello Stay 住宿規則與安寧要求",
    },
    linkLabel: "查看禁止事項",
  },
];

const detailCards = [
  {
    id: "agreement-time",
    kicker: "CHECK-IN / CHECK-OUT",
    title: "入住與退房時間",
    description:
      "客人最常問的是什麼時候能進館 最晚幾點要到 幾點一定要退 還有延遲退房怎麼算 這些資訊會直接影響當天安排",
    image: {
      src: "/images/hellohouse/photo5.webp",
      alt: "Hello Stay 入住與退房時間重點",
    },
    specs: [
      { label: "入住時間", value: "16:00 之後" },
      { label: "退房時間", value: "11:00 之前" },
      { label: "最晚入住", value: "原則上 21:00 前" },
      { label: "延遲退房", value: "每小時加收 1,500 元" },
    ],
    groups: [
      {
        title: "入住資料",
        items: ["請準備證件辦理登記", "入住時繳清尾款", "若要提早到需先聯繫確認"],
      },
      {
        title: "超時規則",
        items: ["未經同意延遲退房會計費", "超過 5 小時以一日包棟定價計", "不要把退房時間當彈性參考"],
      },
    ],
  },
  {
    id: "agreement-money",
    kicker: "PAYMENT / DEPOSIT",
    title: "押金 取消與加人",
    description:
      "因為是整棟只接一組客 押金 取消與加人都需要事先講清楚 這樣入住前後才不會有落差",
    image: {
      src: "/images/hellohouse/photo2.webp",
      alt: "Hello Stay 押金、取消與加人說明",
    },
    specs: [
      { label: "押金", value: "入住時收 5,000 元" },
      { label: "取消處理", value: "原則上保留一年內折抵使用" },
      { label: "超出訂房人數", value: "每人每晚 1,800 元" },
      { label: "事先加人", value: "平日 1,000 / 假日 1,500 元" },
    ],
    groups: [
      {
        title: "押金怎麼退",
        items: ["退房後確認無損壞與重大髒亂", "確認後匯款退還", "違反規則或設備損壞將扣抵"],
      },
      {
        title: "取消重點",
        items: ["本館採預收約定房價總金額", "非當日取消可保留一年折抵", "當日取消或未通知可能不退還"],
      },
    ],
  },
  {
    id: "agreement-rules",
    kicker: "HOUSE RULES",
    title: "禁菸 訪客 寵物 噪音與清潔",
    description:
      "這些規則會直接影響鄰里安寧 下一組旅客與押金處理 所以需要明確列出",
    image: {
      src: "/images/godin/cover-3.webp",
      alt: "Hello Stay 住宿規則與安寧守則",
    },
    specs: [
      { label: "全面禁菸", value: "含電子菸 違規直接扣押金" },
      { label: "安寧時間", value: "23:00 - 08:00" },
      { label: "非住客訪客", value: "不得任意進入" },
      { label: "寵物", value: "原則上不接待 需事前同意" },
    ],
    groups: [
      {
        title: "最重要禁止事項",
        items: ["吸菸 吸毒 賭博 檳榔 爆竹", "未經同意攜帶寵物", "非當日住客進入館內", "深夜喧嘩擾鄰"],
      },
      {
        title: "會影響押金的情況",
        items: ["室內吸菸", "寢具血漬或嘔吐物", "公共空間未復原", "設備與家具損壞"],
      },
    ],
  },
];

const facts = [
  { label: "入住 / 退房", value: "16:00 後 / 11:00 前" },
  { label: "押金", value: "5,000 元" },
  { label: "取消邏輯", value: "一年內保留折抵為主" },
  { label: "最重要規則", value: "禁菸 安寧 訪客與清潔" },
];

const guides = [
  "最常被問的是時間 押金 取消 加人與禁止事項",
  "正式訂房前仍建議詳閱完整條款",
  "特殊需求可先聯繫確認",
  "規則與訂房頁資訊需一起閱讀",
];

const fit = [
  { label: "適合對象", value: "準備下訂前確認規則的人" },
  { label: "最常確認", value: "時間 押金 取消與加人" },
  { label: "延伸頁面", value: "訂房頁與空房報價" },
  { label: "重要提醒", value: "安寧與禁菸規則" },
];

const faqs = [
  {
    question: "可以提早入住或延後退房嗎？",
    answer: "如房況與清潔流程允許，可事先詢問提早入住；延後退房則需先同意，未經同意每小時加收 1,500 元，超過 5 小時以一日包棟定價計算。",
  },
  {
    question: "押金什麼情況會被扣？",
    answer: "常見情況包含室內吸菸、設備損壞、寢具特殊髒污、公共空間未恢復或違反重要入住規則。",
  },
  {
    question: "如果臨時取消怎麼辦？",
    answer: "原則上會保留已付金額於一年內折抵日後消費；若在入住當日取消或未通知，業者得不退還預收房價總金額。",
  },
];

export default function AgreementPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "入住須知與住宿規則",
            description: "Hello Stay 訂房前應先了解的入住時間、押金、取消與住宿規則。",
            author: { "@type": "Organization", name: "Hello Stay" },
            publisher: { "@type": "Organization", name: "Hello Stay" },
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
          kicker: "HOUSE RULES",
          title: "入住規則與住宿須知",
          lead:
            "入住時間 押金 取消 加人與禁止事項都整理在這裡 訂房前把重點看清楚 之後就不容易有落差",
          image: {
            src: "/images/hellohouse/photo2.webp",
            alt: "Hello Stay 入住須知與住宿規則主視覺",
          },
          stats: [
            { label: "入住 / 退房", value: "16:00 後 / 11:00 前" },
            { label: "押金", value: "5,000 元" },
            { label: "取消原則", value: "保留一年內折抵使用" },
            { label: "最重要規則", value: "禁菸 安寧 不得超住" },
          ],
          primaryAction: { href: "/book", label: "查空房與報價" },
          secondaryAction: {
            href: "https://www.ey.gov.tw/File/E9EE77286036F2D4?A=C",
            label: "看行政院定型化契約",
            external: true,
          },
        }}
        overview={{
          kicker: "RULES OVERVIEW",
          title: "最常被問的三件事",
          intro: "時間 金流 規則",
          columns: 3,
          cards: ruleCards,
        }}
        details={{
          kicker: "KEY TERMS",
          title: "訂房前最重要的規則",
          intro: "把最常出問題的地方拆成三段整理",
          cards: detailCards,
          factsTitle: "規則重點整理",
          facts,
          guidesTitle: "重點提醒",
          guides,
          fitTitle: "適合對象",
          fit,
        }}
        faq={{
          kicker: "FAQ",
          title: "入住規則常見問題",
          intro: "客人最常確認的三件事",
          items: faqs,
        }}
        final={{
          kicker: "BOOKING",
          title: "日期與報價也要一起看",
          body:
            "入住時間 押金與基本規則確認後 日期 人數與報價就會變成下一個判斷重點",
          primaryAction: { href: "/book", label: "查空房與報價" },
          secondaryAction: { href: "/compare", label: "回三館比較" },
        }}
      />
    </>
  );
}
