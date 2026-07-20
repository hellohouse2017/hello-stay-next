import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PropertyShowcasePage from "@/components/PropertyShowcasePage";

export const metadata: Metadata = {
  title: "高雄包棟民宿入住須知｜付款、取消與住宿規則",
  description:
    "訂高雄包棟民宿前，先看懂 Hello Stay 的付款方式、取消規則、加人費用、安寧時間與入住條件。把高雄包棟住宿常見的訂房與入住重點一次確認清楚。",
  alternates: { canonical: "https://www.hello-stay.com/agreement" },
  openGraph: {
    title: "高雄包棟民宿入住須知｜付款、取消與住宿規則｜Hello Stay",
    description: "先看懂高雄包棟民宿常見的付款、取消、加人與住宿規則，訂房前把 Hello Stay 的入住條件確認清楚。",
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
    kicker: "入住時間",
    title: "入住與退房時間",
    summary: "最先要確認的是幾點能進館、幾點要退房，以及延遲退房怎麼算。",
    image: {
      src: "/images/hellohouse/photo5.webp",
      alt: "Hello Stay 入住與退房時間說明",
    },
    linkLabel: "查看時間規則",
  },
  {
    id: "agreement-money",
    kicker: "付款與取消",
    title: "付款 取消與加人",
    summary: "先把全額預收、取消保留與加人方式講清楚，避免入住前後有落差。",
    image: {
      src: "/images/hellohouse/photo2.webp",
      alt: "Hello Stay 訂房付款與取消規則",
    },
    linkLabel: "查看費用規則",
  },
  {
    id: "agreement-rules",
    kicker: "住宿規定",
    title: "禁止事項與安寧規定",
    summary: "禁菸、寵物、噪音、訪客與清潔狀況，都會直接影響後續入住安排。",
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
    kicker: "入住與退房",
    title: "入住與退房時間",
    description:
      "客人最常問的是什麼時候能進館、最晚幾點要到、幾點一定要退，這些都會直接影響當天安排。",
    image: {
      src: "/images/hellohouse/photo5.webp",
      alt: "Hello Stay 入住與退房時間重點",
    },
    specs: [
      { label: "入住時間", value: "16:00 之後" },
      { label: "退房時間", value: "11:00 之前" },
      { label: "最晚入住", value: "原則上 21:00 前" },
      { label: "延遲退房", value: "每小時加收 1,800 元" },
    ],
    groups: [
      {
        title: "入住資料",
        items: ["請準備證件辦理登記", "完成全額付款後才算訂房成功", "若要提早到需先聯繫確認"],
      },
      {
        title: "超時規則",
        items: ["未經同意延遲退房會計費", "超過 4 小時以續住一天計算", "不要把退房時間當彈性參考"],
      },
    ],
  },
  {
    id: "agreement-money",
    kicker: "付款與取消",
    title: "付款 取消與加人",
    description:
      "因為是整棟只接一組客，付款、取消與加人都要先講清楚，這樣入住前後才不會有落差。",
    image: {
      src: "/images/hellohouse/photo2.webp",
      alt: "Hello Stay 付款、取消與加人說明",
    },
    specs: [
      { label: "付款方式", value: "全額預收制" },
      { label: "取消處理", value: "已付款項可保留一年內折抵使用" },
      { label: "超出訂房人數", value: "每人每晚 1,800 元" },
      { label: "事先加人", value: "平日 1,000 / 假日 1,500 元" },
    ],
    groups: [
      {
        title: "付款怎麼算",
        items: ["完成全額付款後才算訂房成功", "已付款項可保留一年作為下次入住折抵", "入住當日取消或未入住，恕無法退還或保留"],
      },
      {
        title: "取消重點",
        items: ["本館採全額預收制", "已付款項可保留一年作為下次入住折抵", "入住當日取消或未入住，恕無法退還或保留"],
      },
    ],
  },
  {
    id: "agreement-rules",
    kicker: "住宿規定",
    title: "禁菸 訪客 寵物 噪音與清潔",
    description:
      "這些規則會直接影響鄰里安寧、下一組旅客與清潔安排，所以需要明確列出。",
    image: {
      src: "/images/godin/cover-3.webp",
      alt: "Hello Stay 住宿規則與安寧守則",
    },
    specs: [
      { label: "全面禁菸", value: "含電子菸 違規直接終止入住" },
      { label: "安寧時間", value: "23:00 - 08:00" },
      { label: "非住客訪客", value: "不得任意進入" },
      { label: "寵物清潔費", value: "事前同意後每隻 NT$800" },
    ],
    groups: [
      {
        title: "最重要禁止事項",
        items: ["吸菸 吸毒 賭博 檳榔 爆竹", "未經同意攜帶寵物", "非當日住客進入館內", "深夜喧嘩擾鄰"],
      },
      {
        title: "會影響後續入住的情況",
        items: ["室內吸菸", "寢具血漬或嘔吐物", "公共空間未復原", "設備與家具損壞"],
      },
    ],
  },
];

const facts = [
  { label: "入住 / 退房", value: "16:00 後 / 11:00 前" },
  { label: "付款方式", value: "全額預收制" },
  { label: "取消邏輯", value: "一年內保留折抵為主" },
  { label: "最重要規則", value: "禁菸 安寧 訪客與清潔" },
];

const guides = [
  "最常被問的是時間、付款、取消、加人與禁止事項。",
  "正式訂房前仍建議詳閱完整條款。",
  "特殊需求可先聯繫確認。",
  "規則與訂房頁資訊需一起閱讀。",
];

const fit = [
  { label: "適合對象", value: "準備下訂前確認規則的人" },
  { label: "最常確認", value: "時間 付款 取消與加人" },
  { label: "延伸頁面", value: "訂房頁與空房報價" },
  { label: "重要提醒", value: "安寧與禁菸規則" },
];

const faqs = [
  {
    question: "可以提早入住或延後退房嗎？",
    answer: "如房況與清潔流程允許，可事先詢問提早入住；延後退房則需先同意，每小時加收 1,800 元，超過 4 小時以續住一天計算。",
  },
  {
    question: "付款後如果取消怎麼辦？",
    answer: "原則上已付款項可保留一年作為下次入住折抵；若在入住當日取消或未入住，恕無法退還或保留。",
  },
  {
    question: "哪些情況會影響入住？",
    answer: "常見情況包含室內吸菸、設備損壞、寢具特殊髒污、公共空間未恢復或違反重要入住規則。",
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
            description: "Hello Stay 訂房前應先了解的入住時間、付款、取消、加人、禁菸與安寧規則。",
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
          kicker: "入住須知",
          title: "入住須知",
          lead: "付款、取消與住宿規則。訂房前請先確認。",
          image: {
            src: "/images/hellohouse/photo2.webp",
            alt: "Hello Stay 入住須知與住宿規則主視覺",
          },
          stats: [
            { label: "入住 / 退房", value: "16:00 後 / 11:00 前" },
            { label: "付款", value: "全額預收制" },
            { label: "取消原則", value: "已付款項可保留一年折抵" },
            { label: "重點提醒", value: "禁菸 安寧 不得超住" },
          ],
          primaryAction: { href: "/book", label: "查空房與報價" },
          secondaryAction: {
            href: "https://www.ey.gov.tw/File/E9EE77286036F2D4?A=C",
            label: "看行政院定型化契約",
            external: true,
          },
        }}
        overview={{
          kicker: "三件事先看",
          title: "最常被問的三件事",
          intro: "時間、金流、規則",
          columns: 3,
          cards: ruleCards,
        }}
        details={{
          kicker: "規則重點",
          title: "訂房前最重要的規則",
          intro: "把最常出問題的地方拆成三段整理。",
          cards: detailCards,
          factsTitle: "規則重點整理",
          facts,
          guidesTitle: "重點提醒",
          guides,
          fitTitle: "適合對象",
          fit,
        }}
        faq={{
          kicker: "常見問題",
          title: "入住規則常見問題",
          intro: "客人最常確認的三件事。",
          items: faqs,
        }}
        final={{
          kicker: "訂房前提醒",
          title: "日期與報價也要一起看",
          body: "入住時間、付款與基本規則確認後，日期、人數與報價就會變成下一個判斷重點。",
          primaryAction: { href: "/book", label: "查詢空房與報價" },
          secondaryAction: { href: "/compare", label: "回三館比較" },
        }}
      />
    </>
  );
}
