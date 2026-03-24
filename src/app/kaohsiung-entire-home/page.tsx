import type { Metadata } from "next";
import MoneyPageTemplate from "@/components/MoneyPageTemplate";

export const metadata: Metadata = {
    title: "高雄包棟民宿推薦｜6-48人包棟$3,500起・鹽埕近駁二｜Hello Stay",
    description: "高雄包棟民宿怎麼選？Hello Stay 三館6-48人任選，平日$3,500起。中島廚房、麻將桌、投影機、獨立衛浴。步行5分鐘到駁二藝術特區。Google 4.9星好評→LINE查空房",
    alternates: { canonical: "https://www.hello-stay.com/kaohsiung-entire-home" },
    openGraph: {
        title: "高雄包棟民宿推薦｜6-48人包棟$3,500起",
        description: "高雄鹽埕三棟包棟民宿，6-48人任選，每人$583起。附廚房、麻將，近駁二→LINE查空房",
        url: "https://www.hello-stay.com/kaohsiung-entire-home",
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "高雄包棟民宿一晚多少錢？", acceptedAnswer: { "@type": "Answer", text: "Hello Stay 平日包棟 $3,500 起（你好哇寓所 6 人方案）。溝頂民宿 10-12 人 $10,000 起。大智若愚最多 48 人，可包層或包棟。每人換算最低 $583 起。" } },
        { "@type": "Question", name: "高雄包棟民宿推薦哪間？", acceptedAnswer: { "@type": "Answer", text: "推薦 Hello Stay 你好哇寓所（6-26人，中島廚房、麻將），溝頂民宿（10-12人，五層獨棟），大智若愚（最大48人，電梯民宿）。三館都在鹽埕區，步行到駁二。" } },
        { "@type": "Question", name: "高雄包棟可以開伙嗎？", acceptedAnswer: { "@type": "Answer", text: "可以！你好哇寓所配備豪華中島廚房，有 IH 爐×2、微波爐、冰箱、鍋碗瓢盆齊全，適合火鍋趴、BBQ。溝頂民宿有微波爐和雙門冰箱。" } },
        { "@type": "Question", name: "高雄包棟離駁二多遠？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所步行約 10 分鐘到駁二藝術特區，溝頂民宿步行約 8 分鐘。大智若愚緊鄰大港橋，步行 3 分鐘到駁二。" } },
        { "@type": "Question", name: "高雄包棟提供哪些娛樂設施？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所：手動麻將桌、桌遊 50+款、120 吋投影、Switch、藍牙音響。溝頂民宿：手動麻將桌、桌遊、聯網電視。適合朋友聚會、家庭旅遊。" } },
    ],
};

export default function KaohsiungEntireHomePage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <MoneyPageTemplate
                title="高雄包棟民宿推薦"
                subtitle="6-48人彈性包棟・每人$583起・鹽埕近駁二"
                heroImage="/images/cover-bg.webp"
                intro="在高雄找包棟民宿？Hello Stay 是鹽埕區在地經營的包棟品牌，從 2017 年開始已服務超過 5,000 組旅客。三間風格各異的獨棟空間，從 6 人小聚到 48 人大團體都能完美容納。每棟都配備獨立衛浴、冷暖空調，公共區域有中島廚房、麻將桌、桌遊。步行即達駁二藝術特區、大港橋、鹽埕美食圈。Google 4.9 星、綜藝「玩很大」拍攝場地。不只是住宿，更是一個讓你的團體創造回憶的空間。"
                properties={[
                    {
                        name: "你好哇寓所", slug: "hellohouse",
                        capacity: "6-26人", price: "平日$3,500起",
                        highlight: "中島廚房・麻將・投影｜綜藝拍攝場地",
                        features: ["豪華中島廚房（IH爐×2）", "手動麻將桌", "120吋投影+Switch", "桌遊50+款", "6間套房・獨立衛浴"],
                        image: "/images/cover-bg.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                    {
                        name: "溝頂民宿", slug: "godin",
                        capacity: "10-12人", price: "平日$10,000起",
                        highlight: "五層獨棟・溫馨家庭風",
                        features: ["五層樓全棟使用", "4間套房+交誼廳", "手動麻將桌", "雙門冰箱・微波爐", "每人$833起"],
                        image: "/images/godin/cover-1.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                    {
                        name: "大智若愚", slug: "dazhi",
                        capacity: "最大48人", price: "可包層可包棟",
                        highlight: "電梯民宿・2026全新開幕",
                        features: ["全新電梯大樓", "一層三房一廳", "獨立樓層空間", "緊鄰大港橋", "企業團建首選"],
                        image: "/images/dazhi/building-render.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                ]}
                faqs={[
                    { q: "高雄包棟民宿一晚多少錢？", a: "Hello Stay 平日包棟 $3,500 起（你好哇寓所 6 人方案）。溝頂民宿 10-12 人 $10,000 起。大智若愚可包層或包棟。每人換算最低 $583 起。" },
                    { q: "高雄包棟推薦哪間？", a: "推薦 Hello Stay 你好哇寓所（6-26人，廚房/麻將），溝頂民宿（10-12人，五層獨棟），大智若愚（最大48人，電梯）。三館都在鹽埕區，步行到駁二。" },
                    { q: "高雄包棟可以開伙煮東西嗎？", a: "可以！你好哇寓所有豪華中島廚房（IH爐×2、鍋碗瓢盆齊全）。溝頂有微波爐和冰箱。適合火鍋趴、煮菜聚餐。" },
                    { q: "離駁二藝術特區多遠？", a: "你好哇寓所步行 10 分鐘，溝頂步行 8 分鐘，大智若愚緊鄰大港橋步行 3 分鐘。全部在鹽埕區核心。" },
                    { q: "有麻將桌嗎？需要自帶牌嗎？", a: "你好哇寓所和溝頂民宿都有手動麻將桌，免費使用，牌具齊全，不用自帶。" },
                ]}
                relatedLinks={[
                    { href: "/kaohsiung-family-entire-home", emoji: "👨‍👩‍👧‍👦", title: "高雄家庭包棟推薦", desc: "三代同堂怎麼選？" },
                    { href: "/yancheng-entire-home", emoji: "📍", title: "鹽埕包棟民宿", desc: "在地人帶路" },
                    { href: "/kaohsiung-budget-entire-home", emoji: "💰", title: "高雄平價包棟", desc: "每人$583起" },
                    { href: "/blog/kaohsiung-group-stay-guide", emoji: "📖", title: "包棟民宿完全攻略", desc: "6-48人怎麼選" },
                ]}
                lineUrl="https://lin.ee/atCiMQw"
                ctaText="找到適合你的包棟空間"
            />
        </>
    );
}
