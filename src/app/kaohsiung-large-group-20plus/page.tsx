import type { Metadata } from "next";
import MoneyPageTemplate from "@/components/MoneyPageTemplate";

export const metadata: Metadata = {
    title: "高雄20人以上包棟民宿｜大型聚會/班遊/球隊住宿｜最大48人｜Hello Stay",
    description: "20人以上找高雄包棟？大智若愚最大48人電梯民宿，你好哇寓所最大26人。可包層可包棟，適合班遊、球隊、大家族。近駁二→LINE查空房",
    alternates: { canonical: "https://www.hello-stay.com/kaohsiung-large-group-20plus" },
    openGraph: {
        title: "高雄20人以上包棟｜最大48人",
        description: "大團體包棟首選！最大48人電梯民宿，近駁二→LINE查空房",
        url: "https://www.hello-stay.com/kaohsiung-large-group-20plus",
    },
};

const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "高雄有能住20人以上的包棟嗎？", acceptedAnswer: { "@type": "Answer", text: "Hello Stay 大智若愚最大可容納48人，全新電梯大樓。你好哇寓所最大26人。兩館合訂可容納70+人。" } },
        { "@type": "Question", name: "班遊適合住包棟嗎？", acceptedAnswer: { "@type": "Answer", text: "非常適合！大智若愚一層三房一廳，可以按班級分配樓層。有電梯方便行李搬運，近駁二適合團體活動。" } },
    ],
};

export default function LargeGroupPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <MoneyPageTemplate
                title="高雄20人以上包棟"
                subtitle="班遊・球隊・大家族・公司部門｜最大48人"
                heroImage="/images/dazhi/building-render.webp"
                intro="20 人以上要找高雄包棟，選擇其實不多——但 Hello Stay 大智若愚是高雄最大的包棟民宿，全新電梯大樓最多可容納 48 人。一層三房一廳的格局，可以按團體需求分配樓層。如果加上你好哇寓所（最大26人），兩館合訂可以容納 70+ 人的超大團體。不管是大學班遊、球隊移地訓練、大家族團圓、還是公司整個部門出遊——一次包下來，比分散住飯店更有凝聚力，也更划算。"
                properties={[
                    {
                        name: "大智若愚（最大48人）", slug: "dazhi",
                        capacity: "最大48人", price: "可包層/包棟",
                        highlight: "高雄最大包棟・電梯直達",
                        features: ["最大48人", "全新電梯大樓", "一層三房一廳", "可包層靈活分配", "緊鄰大港橋/駁二"],
                        image: "/images/dazhi/building-render.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                    {
                        name: "你好哇寓所（最大26人）", slug: "hellohouse",
                        capacity: "6-26人", price: "平日$3,500起",
                        highlight: "中島廚房・娛樂設施齊全",
                        features: ["最大26人", "中島廚房大團餐", "麻將/桌遊/投影", "6間套房", "綜藝拍攝場地"],
                        image: "/images/cover-bg.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                ]}
                faqs={[
                    { q: "最多可以住幾人？", a: "大智若愚最大48人。加上你好哇寓所（26人），兩館合訂可容納70+人。" },
                    { q: "有電梯嗎？", a: "大智若愚是全新電梯大樓，方便大團體行李搬運。你好哇寓所是三層樓獨棟。" },
                    { q: "適合班遊嗎？", a: "非常適合！大智若愚一層三房一廳，可按班級分配。近駁二適合團體活動。" },
                    { q: "球隊移地訓練適合嗎？", a: "適合！鹽埕附近有高雄體育場、壽山運動中心。住宿後可在民宿休息、開會檢討。" },
                ]}
                relatedLinks={[
                    { href: "/kaohsiung-entire-home", emoji: "🏠", title: "高雄包棟民宿總覽", desc: "三館完整比較" },
                    { href: "/kaohsiung-corporate-team", emoji: "🏢", title: "企業團建包棟", desc: "統編報帳OK" },
                    { href: "/kaohsiung-family-entire-home", emoji: "👨‍👩‍👧‍👦", title: "家庭包棟", desc: "家族旅遊" },
                ]}
                lineUrl="https://lin.ee/atCiMQw"
                ctaText="大團體・一次搞定"
            />
        </>
    );
}
