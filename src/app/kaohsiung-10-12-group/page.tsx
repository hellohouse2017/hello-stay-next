import type { Metadata } from "next";
import MoneyPageTemplate from "@/components/MoneyPageTemplate";

export const metadata: Metadata = {
    title: "高雄10-12人包棟民宿｜小團體$10,000起・五層獨棟｜Hello Stay 溝頂",
    description: "10-12人高雄小包棟？溝頂民宿五層獨棟$10,000起，每人$833。4間套房+交誼廳麻將桌，近駁二鹽埕。小團體最超值→LINE查空房",
    alternates: { canonical: "https://www.hello-stay.com/kaohsiung-10-12-group" },
    openGraph: {
        title: "高雄10-12人包棟｜五層獨棟$10,000起",
        description: "小團體包棟首選！五層獨棟每人$833，近駁二→LINE查空房",
        url: "https://www.hello-stay.com/kaohsiung-10-12-group",
    },
};

const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "高雄10人包棟多少錢？", acceptedAnswer: { "@type": "Answer", text: "溝頂民宿平日10人$10,000（每人$1,000）。12人$10,000（每人$833）。你好哇寓所也可10人入住，每人$583起。" } },
        { "@type": "Question", name: "10人適合住哪間？", acceptedAnswer: { "@type": "Answer", text: "溝頂民宿最適合：10-12人五層獨棟全棟使用。也可選你好哇寓所（空間更大，適合12-26人）。" } },
    ],
};

export default function Group10to12Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <MoneyPageTemplate
                title="高雄10-12人包棟"
                subtitle="五層獨棟・每人$833起・小團體最超值"
                heroImage="/images/godin/cover-1.webp"
                intro="10-12 個人來高雄玩，訂飯店要好幾間房，分散在不同樓層，聚在一起很麻煩。溝頂民宿是你的最佳選擇——五層樓整棟都是你的，4 間套房 + 4 樓交誼廳可以打麻將、聊天。全棟獨立使用，沒有外人打擾。平日只要 $10,000，12 個人分下來每人才 $833。比住飯店便宜一半，但你多了一整棟的私密空間。步行就能到駁二、鹽埕美食區——白天逛景點、晚上回來打牌喝酒，這才是小團旅行的正確姿勢。"
                properties={[
                    {
                        name: "溝頂民宿（10-12人首選）", slug: "godin",
                        capacity: "10-12人", price: "平日$10,000起",
                        highlight: "五層獨棟・只屬於你們",
                        features: ["五層樓全棟使用", "4間套房・獨立衛浴", "4F交誼廳麻將桌", "雙門冰箱・微波爐", "每人$833起"],
                        image: "/images/godin/cover-1.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                    {
                        name: "你好哇寓所（10-26人彈性）", slug: "hellohouse",
                        capacity: "6-26人", price: "平日$3,500起",
                        highlight: "空間更大・設備更多",
                        features: ["中島廚房可煮火鍋", "麻將/桌遊/投影全配", "6間套房", "綜藝拍攝場地", "每人更便宜"],
                        image: "/images/cover-bg.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                ]}
                faqs={[
                    { q: "10個人包棟多少錢？", a: "溝頂民宿平日 $10,000（每人$1,000）。你好哇寓所也可10人入住，每人更便宜。" },
                    { q: "有麻將桌嗎？", a: "溝頂4樓有手動麻將桌，你好哇寓所也有。免費使用，牌具齊全。" },
                    { q: "12人剛好怎麼睡？", a: "溝頂4間套房可住12人。1F雙人房+2F/3F各四人房+5F雙人房=12人。" },
                    { q: "離駁二多遠？", a: "溝頂步行約8分鐘到駁二。鹽埕美食圈步行3-5分鐘。" },
                ]}
                relatedLinks={[
                    { href: "/kaohsiung-entire-home", emoji: "🏠", title: "高雄包棟民宿總覽", desc: "三館比較" },
                    { href: "/kaohsiung-friends-gathering", emoji: "🍻", title: "朋友聚會包棟", desc: "派對空間" },
                    { href: "/kaohsiung-budget-entire-home", emoji: "💰", title: "平價包棟", desc: "每人$583起" },
                ]}
                lineUrl="https://lin.ee/atCiMQw"
                ctaText="10個人的完美週末"
            />
        </>
    );
}
