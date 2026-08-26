import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import AgreementExperience from "@/components/AgreementExperience";
import { getAlternateLanguageMapFor } from "@/i18n/config";

export const metadata: Metadata = {
  title: "高雄包棟民宿入住須知與定型化住宿守則｜付款、改期、押金與生活公約｜Hello Stay",
  description:
    "Hello Stay 高雄鹽埕包棟民宿定型化住宿守則。完整公開全額預收付款、一年內改期保留、入住押金 NT$5,000、進退房時間、全館禁菸、住宅區夜間安寧與損壞賠償標準，依據觀光局定型化契約準則保障雙方權益。",
  alternates: {
    canonical: "https://www.hello-stay.com/agreement",
    languages: getAlternateLanguageMapFor("/agreement", ["zh", "ja", "ko"]),
  },
  openGraph: {
    title: "高雄包棟民宿入住須知與定型化住宿守則｜Hello Stay",
    description:
      "透明公開的包棟定型化合約：付款方式、一年內改期保留折抵、入住押金、進退房時間、全館禁菸與住宅區安寧守則。",
    url: "https://www.hello-stay.com/agreement",
    images: [
      {
        url: "https://www.hello-stay.com/images/hellohouse/cover.webp",
        width: 1200,
        height: 630,
        alt: "Hello Stay 入住須知與定型化住宿守則",
      },
    ],
  },
};

const agreementFaqs = [
  {
    q: "付款後若臨時有突發狀況需要改期，該如何處理？",
    a: "依據本館定型化契約規範，凡於預定住宿日當日前聯繫告知，已支付之全額住宿費用皆可完整保留「一年內折抵使用」，旅客可於一年內彈性挑選新日期入住，新日期房價採多退少補，絕不沒收您的住宿費用。",
  },
  {
    q: "押金 NT$5,000 是什麼時候退還？",
    a: "押金由旅客於入住前或辦理入住時支付。退房當日上午 11:00 前完成自助退房後，管家會於當天進行房況與設備核對，確認無室內吸菸、無設備損壞且無違反重大住宿守則，押金將於當日全額無息匯款退還至您的指定帳戶。",
  },
  {
    q: "入住當天可以先寄放行李嗎？退房後可以寄放嗎？",
    a: "入住當天中午 12:00 起即可統一將行李先行寄放於一樓公共空間（請提前告知管家，放妥後即行離開以利房務清消）。為維護下一組包棟貴賓之全棟專屬隱私與清潔動線，退房後恕無法提供寄放服務，建議使用步行 5 分鐘之捷運鹽埕埔站或美麗島站付費置物櫃。",
  },
  {
    q: "可以開立公司抬頭與統一編號的報帳發票或收據嗎？",
    a: "Hello Stay 為高雄市政府核准合法登記民宿（你好哇寓所 131 號、溝頂民宿 163 號），依法開立蓋有合法民宿專用章、可填寫買受人抬頭與統一編號之合法免用統一發票收據，完全符合公司行號、政府機關與學校之報帳核銷規範。",
  },
  {
    q: "如果不小心造成床單染色或物品損壞，費用如何計算？",
    a: "若寢具沾染不可水洗之血漬、紅酒、嘔吐物等，依品項收取專業特殊清潔費 NT$500 ～ NT$2,000 / 件；若公共空間使用完畢未恢復原貌或過於髒亂，收取清潔費 NT$500 ～ NT$5,000；家具設備損壞則照原廠維修或重購市價賠償。",
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
            headline: "Hello Stay 入住須知與定型化住宿守則",
            description:
              "Hello Stay 高雄鹽埕包棟民宿定型化住宿守則。完整揭示付款條件、改期保留、押金機制、進退房時間與住宿生活守則。",
            url: "https://www.hello-stay.com/agreement",
            author: { "@type": "Organization", name: "Hello Stay" },
            publisher: { "@type": "Organization", name: "Hello Stay" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "首頁",
                item: "https://www.hello-stay.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "入住須知與住宿守則",
                item: "https://www.hello-stay.com/agreement",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: agreementFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          },
        ]}
      />
      <AgreementExperience />
    </>
  );
}
