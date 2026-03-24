import type { Metadata } from "next";
import MoneyPageTemplate from "@/components/MoneyPageTemplate";

export const metadata: Metadata = {
    title: "高雄家庭包棟民宿推薦｜三代同堂6-48人｜安全・廚房・電梯｜Hello Stay",
    description: "帶長輩小孩來高雄家庭旅遊？Hello Stay 三館適合家族包棟：有廚房可開伙、獨立衛浴、電梯、安靜社區。6-48人彈性空間，步行到駁二大港橋→LINE查空房",
    alternates: { canonical: "https://www.hello-stay.com/kaohsiung-family-entire-home" },
    openGraph: {
        title: "高雄家庭包棟民宿推薦｜三代同堂6-48人",
        description: "帶長輩小孩的高雄家族包棟首選！有廚房、電梯、安靜社區→LINE查空房",
        url: "https://www.hello-stay.com/kaohsiung-family-entire-home",
    },
};

const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "高雄哪間包棟適合帶長輩？", acceptedAnswer: { "@type": "Answer", text: "推薦大智若愚（有電梯）或你好哇寓所（一樓公共空間）。兩間都在安靜社區，獨立衛浴，適合長輩行動。" } },
        { "@type": "Question", name: "家庭包棟可以煮飯嗎？", acceptedAnswer: { "@type": "Answer", text: "你好哇寓所有豪華中島廚房，IH爐×2、鍋碗瓢盆齊全，可以煮火鍋、準備早餐。溝頂有微波爐和冰箱。" } },
        { "@type": "Question", name: "有嬰兒床或兒童設施嗎？", acceptedAnswer: { "@type": "Answer", text: "可以提前透過 LINE 告知需求，我們會盡量協助準備。所有民宿都有獨立衛浴、冷暖空調，適合帶小孩的家庭。" } },
        { "@type": "Question", name: "家族20人以上怎麼住？", acceptedAnswer: { "@type": "Answer", text: "20人以上推薦大智若愚（最大48人，可包層），或你好哇寓所（最大26人）。超過26人可以兩館聯合使用，相距步行5分鐘。" } },
    ],
};

export default function FamilyEntireHomePage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <MoneyPageTemplate
                title="高雄家庭包棟民宿"
                subtitle="三代同堂的完美住宿・廚房開伙・安全安靜・步行駁二"
                heroImage="/images/hellohouse/photo1.webp"
                intro="帶著爸媽、小孩來高雄家族旅遊？最怕的就是住宿空間不夠大、長輩爬樓梯不便、沒辦法煮飯。Hello Stay 三間包棟民宿專為家庭設計：你好哇寓所有中島廚房可以煮火鍋、準備早餐；大智若愚全新電梯大樓，長輩不用爬樓梯；溝頂民宿五層獨棟適合 10 人以內的小家庭。三間都在鹽埕區安靜社區，每間房獨立衛浴，讓全家人睡得安穩。步行就到駁二、大港橋，白天逛景點、晚上在民宿聚餐打麻將——這才是家族旅遊該有的樣子。"
                properties={[
                    {
                        name: "你好哇寓所", slug: "hellohouse",
                        capacity: "6-26人", price: "平日$3,500起",
                        highlight: "中島廚房・適合煮飯聚餐的家庭",
                        features: ["中島廚房可開伙", "一樓公共空間・長輩友善", "手動麻將桌", "獨立衛浴×6", "近駁二步行10分鐘"],
                        image: "/images/cover-bg.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                    {
                        name: "大智若愚", slug: "dazhi",
                        capacity: "最大48人", price: "可包層/包棟",
                        highlight: "電梯直達・大家族首選",
                        features: ["全新電梯大樓", "一層三房一廳", "獨立空間不受打擾", "緊鄰大港橋", "最大48人"],
                        image: "/images/dazhi/building-render.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                    {
                        name: "溝頂民宿", slug: "godin",
                        capacity: "10-12人", price: "平日$10,000起",
                        highlight: "五層獨棟・小家庭溫馨選擇",
                        features: ["全棟獨立使用", "4間套房", "手動麻將桌", "安靜住宅區", "每人$833起"],
                        image: "/images/godin/cover-1.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                ]}
                faqs={[
                    { q: "帶長輩適合住哪間？", a: "推薦大智若愚（有電梯）或你好哇寓所（一樓公共空間寬敞）。兩間都有獨立衛浴、安靜社區。" },
                    { q: "可以煮飯嗎？", a: "你好哇寓所有中島廚房（IH爐×2、鍋碗瓢盆齊全），適合煮火鍋、準備早餐。溝頂有微波爐和冰箱。" },
                    { q: "家族20人以上怎麼住？", a: "20人以上推薦大智若愚（最大48人可包層），或你好哇寓所（最大26人）。超過26人可兩館聯合使用。" },
                    { q: "附近有什麼家庭景點？", a: "駁二藝術特區（步行10分鐘）、大港橋（步行3分鐘）、旗津渡輪（搭捷運2站）、壽山動物園（車程15分鐘），都適合帶小孩。" },
                ]}
                relatedLinks={[
                    { href: "/kaohsiung-entire-home", emoji: "🏠", title: "高雄包棟民宿總覽", desc: "三館完整比較" },
                    { href: "/kaohsiung-large-group-20plus", emoji: "👥", title: "20人以上包棟", desc: "大團體方案" },
                    { href: "/blog/kaohsiung-family-reunion", emoji: "👨‍👩‍👧‍👦", title: "家族旅遊攻略", desc: "三代同堂行程" },
                ]}
                lineUrl="https://lin.ee/atCiMQw"
                ctaText="讓全家人住得開心"
            />
        </>
    );
}
