import type { Metadata } from "next";
import MoneyPageTemplate from "@/components/MoneyPageTemplate";

export const metadata: Metadata = {
    title: "高雄平價包棟民宿｜每人$583起・6-48人｜廚房麻將齊全｜Hello Stay",
    description: "找高雄便宜包棟？Hello Stay 每人只要$583起！6-48人獨棟空間，附中島廚房、麻將桌、投影機。省住宿費去吃美食！鹽埕近駁二→LINE查空房",
    alternates: { canonical: "https://www.hello-stay.com/kaohsiung-budget-entire-home" },
    openGraph: {
        title: "高雄平價包棟民宿｜每人$583起",
        description: "高雄最划算包棟！每人$583起，廚房麻將齊全，近駁二→LINE查空房",
        url: "https://www.hello-stay.com/kaohsiung-budget-entire-home",
    },
};

const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "高雄便宜包棟一個人多少錢？", acceptedAnswer: { "@type": "Answer", text: "Hello Stay 最便宜的方案是你好哇寓所平日 6 人包棟 $3,500，換算每人只要 $583。溝頂民宿 12 人包棟每人$833。人越多越划算！" } },
        { "@type": "Question", name: "平價包棟會不會設備很差？", acceptedAnswer: { "@type": "Answer", text: "不會！Hello Stay 每間都有獨立衛浴、冷暖空調、免費 Wi-Fi。你好哇寓所還有中島廚房、麻將桌、投影機。省住宿費不犧牲品質。" } },
        { "@type": "Question", name: "怎麼住更便宜？", acceptedAnswer: { "@type": "Answer", text: "平日比假日便宜約 30%。人數越多每人越便宜。透過 LINE 直接訂可能有優惠方案。建議避開連假，平日包棟最划算。" } },
    ],
};

export default function BudgetEntireHomePage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <MoneyPageTemplate
                title="高雄平價包棟民宿"
                subtitle="每人$583起・省住宿費去吃美食🍜"
                heroImage="/images/hellohouse/photo3.webp"
                intro="高雄包棟民宿不用花大錢！Hello Stay 你好哇寓所平日 6 人包棟只要 $3,500，換算每人 $583，比住青旅還划算——但你有整棟獨立空間、中島廚房、麻將桌、投影機。朋友團體更省：12 人平均每人不到 $300。把住宿省下的預算拿去吃鹽埕的鴨肉珍、港園牛肉麵，才是高雄旅遊的正確打開方式。自己煮火鍋、打麻將到天亮——這些在飯店要花好幾萬的體驗，在這裡用銅板價就能享受。"
                properties={[
                    {
                        name: "你好哇寓所（最省方案）", slug: "hellohouse",
                        capacity: "6-26人", price: "每人$583起",
                        highlight: "自己煮更省・廚房設備齊全",
                        features: ["平日6人 $3,500（每人$583）", "中島廚房自己煮更省", "麻將桌/投影/桌遊全免費", "獨立衛浴冷暖空調", "Google 4.9星品質保證"],
                        image: "/images/cover-bg.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                    {
                        name: "溝頂民宿（小團體超值）", slug: "godin",
                        capacity: "10-12人", price: "每人$833起",
                        highlight: "五層獨棟・人多更划算",
                        features: ["平日10人 $10,000（每人$1,000）", "12人每人只要$833", "全棟獨立不受打擾", "麻將桌・雙門冰箱", "安靜住宅區"],
                        image: "/images/godin/cover-1.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                ]}
                faqs={[
                    { q: "高雄包棟一個人最便宜多少？", a: "你好哇寓所平日 6 人 $3,500，每人 $583。人越多越便宜，12人平均不到$300。" },
                    { q: "平價但品質好嗎？", a: "每間獨立衛浴、冷暖空調、免費 Wi-Fi。還有中島廚房、麻將桌、投影機。Google 4.9星，品質有保證。" },
                    { q: "怎麼住更便宜？", a: "訂平日（週一到四）最划算。人數越多每人越便宜。透過 LINE 直接問可能有優惠。避開連假寒暑假。" },
                    { q: "需要額外付費嗎？", a: "不用！廚房設備、麻將桌、桌遊、投影機全部免費使用，不另收費。" },
                ]}
                relatedLinks={[
                    { href: "/kaohsiung-entire-home", emoji: "🏠", title: "高雄包棟民宿總覽", desc: "三館完整比較" },
                    { href: "/kaohsiung-friends-gathering", emoji: "🍻", title: "朋友聚會包棟", desc: "揪團更划算" },
                    { href: "/blog/kaohsiung-group-stay-guide", emoji: "📖", title: "包棟完全攻略", desc: "第一次訂必看" },
                ]}
                lineUrl="https://lin.ee/atCiMQw"
                ctaText="省住宿費・玩更爽"
            />
        </>
    );
}
