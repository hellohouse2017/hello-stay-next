import type { Metadata } from "next";
import MoneyPageTemplate from "@/components/MoneyPageTemplate";

export const metadata: Metadata = {
    title: "鹽埕包棟民宿推薦｜近駁二・大港橋・鹽埕美食圈｜Hello Stay",
    description: "鹽埕區包棟民宿首選！Hello Stay 三館都在鹽埕，步行到駁二、大港橋、鴨肉珍。6-48人彈性包棟，平日$3,500起。在地經營8年，Google 4.9星→LINE查空房",
    alternates: { canonical: "https://www.hello-stay.com/yancheng-entire-home" },
    openGraph: {
        title: "鹽埕包棟民宿推薦｜近駁二・大港橋",
        description: "鹽埕區在地包棟品牌，三館6-48人，步行到駁二→LINE查空房",
        url: "https://www.hello-stay.com/yancheng-entire-home",
    },
};

const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "鹽埕區有推薦的包棟民宿嗎？", acceptedAnswer: { "@type": "Answer", text: "Hello Stay 是鹽埕在地8年的包棟品牌。三間民宿都在鹽埕區：你好哇寓所（6-26人）、溝頂民宿（10-12人）、大智若愚（最大48人），步行即達駁二、大港橋。" } },
        { "@type": "Question", name: "鹽埕包棟民宿離駁二多遠？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所步行約10分鐘，溝頂民宿步行約8分鐘，大智若愚緊鄰大港橋步行3分鐘即達駁二。全部在鹽埕區核心地帶。" } },
        { "@type": "Question", name: "鹽埕附近有什麼好吃的？", acceptedAnswer: { "@type": "Answer", text: "步行範圍內有鴨肉珍（3分鐘）、阿進切仔麵（5分鐘）、港園牛肉麵（8分鐘），還有鹽埕區老街的各種小吃。" } },
    ],
};

export default function YanchengEntireHomePage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <MoneyPageTemplate
                title="鹽埕包棟民宿"
                subtitle="在地8年品牌・步行駁二大港橋・鹽埕美食圈"
                heroImage="/images/godin/cover-bg.webp"
                intro="鹽埕區是高雄最有味道的老城區——駁二藝術特區、大港橋、愛河、還有數不完的老字號美食。Hello Stay 在鹽埕深耕 8 年，三間包棟民宿都在這個區域的核心地帶。從民宿出發，步行就能到駁二逛展、大港橋看夕陽、鴨肉珍吃晚餐。你好哇寓所在大公路巷子裡，鬧中取靜；溝頂民宿在五金街旁，感受老鹽埕的生活氣息；大智若愚緊鄰大港橋，是離駁二最近的包棟選擇。住在鹽埕，才能真正體驗高雄的文化脈動。"
                properties={[
                    {
                        name: "你好哇寓所", slug: "hellohouse",
                        capacity: "6-26人", price: "平日$3,500起",
                        highlight: "大公路巷弄・鬧中取靜",
                        features: ["步行10分鐘到駁二", "鴨肉珍步行3分鐘", "捷運鹽埕埔站步行5分鐘", "中島廚房可開伙", "麻將桌・桌遊"],
                        image: "/images/cover-bg.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                    {
                        name: "大智若愚", slug: "dazhi",
                        capacity: "最大48人", price: "可包層/包棟",
                        highlight: "大港橋旁・離駁二最近",
                        features: ["步行3分鐘到駁二", "緊鄰大港橋", "全新電梯大樓", "周邊夜景絕佳", "大團體首選"],
                        image: "/images/dazhi/building-render.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                    {
                        name: "溝頂民宿", slug: "godin",
                        capacity: "10-12人", price: "平日$10,000起",
                        highlight: "老鹽埕生活感・五金街旁",
                        features: ["五層獨棟全棟使用", "感受老鹽埕氛圍", "步行8分鐘到駁二", "安靜住宅區", "4間套房"],
                        image: "/images/godin/cover-1.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                ]}
                faqs={[
                    { q: "鹽埕區有推薦的包棟民宿嗎？", a: "Hello Stay 在鹽埕在地 8 年，三間民宿都在鹽埕區核心：你好哇（6-26人）、溝頂（10-12人）、大智若愚（最大48人）。" },
                    { q: "離駁二藝術特區多遠？", a: "最近的是大智若愚（步行3分鐘），你好哇寓所步行10分鐘，溝頂步行8分鐘。全部在鹽埕區。" },
                    { q: "鹽埕附近有什麼好吃的？", a: "步行範圍：鴨肉珍（3分鐘）、阿進切仔麵（5分鐘）、港園牛肉麵（8分鐘）、還有鹽埕老街各種小吃。" },
                    { q: "怎麼到鹽埕？", a: "捷運鹽埕埔站1號出口步行5分鐘。開車可停民宿附近特約停車場（$100/天）。高鐵左營站搭捷運約25分鐘。" },
                ]}
                relatedLinks={[
                    { href: "/kaohsiung-entire-home", emoji: "🏠", title: "高雄包棟民宿總覽", desc: "三館完整比較" },
                    { href: "/explore", emoji: "🗺️", title: "鹽埕周邊探索", desc: "景點美食推薦" },
                    { href: "/blog/pier2-accommodation", emoji: "🎨", title: "駁二住宿推薦", desc: "步行攻略" },
                ]}
                lineUrl="https://lin.ee/atCiMQw"
                ctaText="住鹽埕・玩高雄"
            />
        </>
    );
}
