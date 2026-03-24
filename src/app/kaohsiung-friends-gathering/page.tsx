import type { Metadata } from "next";
import MoneyPageTemplate from "@/components/MoneyPageTemplate";

export const metadata: Metadata = {
    title: "高雄朋友聚會包棟｜6-26人派對空間・麻將/桌遊/投影/廚房｜Hello Stay",
    description: "朋友揪團來高雄？Hello Stay 包棟是最棒的聚會空間！麻將桌、桌遊50+款、120吋投影、中島廚房火鍋趴。6-26人獨棟，每人$583起→LINE查空房",
    alternates: { canonical: "https://www.hello-stay.com/kaohsiung-friends-gathering" },
    openGraph: {
        title: "高雄朋友聚會包棟｜6-26人派對空間",
        description: "朋友揪團首選！麻將/桌遊/投影/廚房全配，每人$583起→LINE查空房",
        url: "https://www.hello-stay.com/kaohsiung-friends-gathering",
    },
};

const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "高雄有適合朋友聚會的包棟嗎？", acceptedAnswer: { "@type": "Answer", text: "Hello Stay 你好哇寓所是朋友聚會首選！有麻將桌、桌遊50+款、120吋投影、Switch、中島廚房。6-26人獨棟，打牌到天亮沒人管。" } },
        { "@type": "Question", name: "可以打麻將到很晚嗎？", acceptedAnswer: { "@type": "Answer", text: "可以！獨棟空間不影響其他人。你好哇寓所和溝頂民宿都有手動麻將桌，免費使用。建議室內活動音量適中即可。" } },
        { "@type": "Question", name: "可以辦慶生派對嗎？", acceptedAnswer: { "@type": "Answer", text: "可以！中島廚房可以準備派對食物，投影機可以播生日影片。需要蛋糕可以請我們推薦鹽埕在地烘焙店。" } },
    ],
};

export default function FriendsGatheringPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <MoneyPageTemplate
                title="高雄朋友聚會包棟"
                subtitle="麻將・桌遊・投影・火鍋趴・打牌到天亮🀄"
                heroImage="/images/hellohouse/bar-2.webp"
                intro="朋友揪團來高雄，不要再去 KTV 或餐廳了！Hello Stay 包棟就是你的私人派對空間：手動麻將桌打到天亮、50 款桌遊玩不完、120 吋投影看電影或打 Switch、中島廚房煮火鍋配啤酒。整棟獨立空間，沒有隔壁房客抗議噪音，沒有飯店的退房壓力。白天去駁二逛展、晚上回民宿繼續嗨。每人最低 $583 起——比 KTV 還便宜，但你多了一整晚的回憶。"
                properties={[
                    {
                        name: "你好哇寓所（聚會首選）", slug: "hellohouse",
                        capacity: "6-26人", price: "每人$583起",
                        highlight: "麻將/桌遊/投影/廚房——派對全配",
                        features: ["手動麻將桌（免費）", "桌遊50+款", "120吋投影+Switch", "中島廚房可煮火鍋", "獨棟不怕吵"],
                        image: "/images/cover-bg.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                    {
                        name: "溝頂民宿", slug: "godin",
                        capacity: "10-12人", price: "每人$833起",
                        highlight: "五層獨棟・小團體超嗨",
                        features: ["4樓交誼廳專屬空間", "手動麻將桌", "沙發區", "雙門冰箱冰啤酒", "五層樓全部你的"],
                        image: "/images/godin/cover-1.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                ]}
                faqs={[
                    { q: "可以打麻將到很晚嗎？", a: "可以！獨棟空間不影響別人。麻將桌免費使用，牌具齊全。建議室內音量適中即可。" },
                    { q: "有投影機嗎？可以看電影嗎？", a: "你好哇寓所有 120 吋投影幕，可接手機投屏或玩 Switch。適合看電影、打遊戲、播慶生影片。" },
                    { q: "可以辦慶生派對嗎？", a: "當然！廚房可準備食物，投影可播生日影片。需要蛋糕可以推薦在地烘焙店。" },
                    { q: "可以帶酒嗎？", a: "可以！民宿有冰箱可以冰啤酒飲料。中島廚房有杯具可以使用。請自行清潔即可。" },
                ]}
                relatedLinks={[
                    { href: "/kaohsiung-entire-home", emoji: "🏠", title: "高雄包棟民宿總覽", desc: "三館完整比較" },
                    { href: "/kaohsiung-budget-entire-home", emoji: "💰", title: "平價包棟", desc: "每人$583起" },
                    { href: "/blog/kaohsiung-mahjong-stay", emoji: "🀄", title: "麻將民宿推薦", desc: "打牌到天亮" },
                ]}
                lineUrl="https://lin.ee/atCiMQw"
                ctaText="揪團出發・今晚嗨翻"
            />
        </>
    );
}
