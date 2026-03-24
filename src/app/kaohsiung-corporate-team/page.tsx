import type { Metadata } from "next";
import MoneyPageTemplate from "@/components/MoneyPageTemplate";

export const metadata: Metadata = {
    title: "高雄企業包棟團建｜公司旅遊・移地訓練・員工旅遊｜6-48人｜Hello Stay",
    description: "公司團建來高雄？Hello Stay 6-48人包棟，獨立空間不受打擾。附會議投影、廚房團餐、多間套房。近駁二可安排團隊活動。統編報帳OK→LINE查空房",
    alternates: { canonical: "https://www.hello-stay.com/kaohsiung-corporate-team" },
    openGraph: {
        title: "高雄企業包棟團建｜6-48人",
        description: "公司旅遊/移地訓練/員工旅遊，6-48人獨棟，統編報帳OK→LINE查空房",
        url: "https://www.hello-stay.com/kaohsiung-corporate-team",
    },
};

const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "高雄有適合企業團建的包棟嗎？", acceptedAnswer: { "@type": "Answer", text: "Hello Stay 適合 6-48 人企業活動。獨棟空間可做會議/工作坊，有投影設備。你好哇寓所適合 6-26 人團建，大智若愚最大 48 人。" } },
        { "@type": "Question", name: "可以開統編嗎？", acceptedAnswer: { "@type": "Answer", text: "可以！Hello Stay 可開立統編發票，方便公司報帳。透過 LINE 預訂時告知統編資訊即可。" } },
        { "@type": "Question", name: "可以安排團體活動嗎？", acceptedAnswer: { "@type": "Answer", text: "可以！周邊有駁二藝術特區（團體導覽）、大港橋（散步活動）、鹽埕美食導覽。也可以在民宿內做 team building 活動。" } },
    ],
};

export default function CorporateTeamPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <MoneyPageTemplate
                title="高雄企業團建包棟"
                subtitle="公司旅遊・移地訓練・員工旅遊・統編報帳OK"
                heroImage="/images/hellohouse/photo2.webp"
                intro="不要再去千篇一律的飯店做團建了！Hello Stay 包棟給你完全私密的團隊空間：白天用投影做簡報、討論；下午去駁二做 team building 活動；晚上在中島廚房煮火鍋、打麻將、玩桌遊。整棟從 6 人到 48 人都能容納，獨立空間不會遇到其他客人。統編報帳沒問題，可提供正式發票。比起飯店的會議室＋標準房，包棟的「生活感」更能凝聚團隊。在鹽埕老城區散步、在大港橋看夕陽——這是飯店無法給的團建體驗。"
                properties={[
                    {
                        name: "你好哇寓所（中型團隊）", slug: "hellohouse",
                        capacity: "6-26人", price: "平日$3,500起",
                        highlight: "投影簡報・廚房團餐・桌遊破冰",
                        features: ["120吋投影可做簡報", "中島廚房可辦團餐", "桌遊50款（破冰神器）", "6間套房獨立衛浴", "統編報帳OK"],
                        image: "/images/cover-bg.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                    {
                        name: "大智若愚（大型團隊）", slug: "dazhi",
                        capacity: "最大48人", price: "可包層/包棟",
                        highlight: "電梯大樓・可容納整個部門",
                        features: ["全新電梯大樓", "最大48人", "一層三房一廳", "可包層靈活調配", "近大港橋/駁二"],
                        image: "/images/dazhi/building-render.webp",
                        lineUrl: "https://lin.ee/atCiMQw",
                    },
                ]}
                faqs={[
                    { q: "可以開統編嗎？", a: "可以！Hello Stay 提供統編發票，方便公司報帳。LINE 預訂時告知統編資訊即可。" },
                    { q: "有投影設備可以做簡報嗎？", a: "你好哇寓所有 120 吋投影幕，可接筆電投屏做簡報、工作坊。" },
                    { q: "附近有什麼團隊活動？", a: "駁二藝術特區導覽、大港橋散步、鹽埕美食 tour、旗津渡輪行程。也可在民宿內做桌遊破冰活動。" },
                    { q: "可以安排餐飲嗎？", a: "中島廚房可自煮團餐。也可推薦在地外燴或團購鹽埕美食。" },
                ]}
                relatedLinks={[
                    { href: "/kaohsiung-entire-home", emoji: "🏠", title: "高雄包棟民宿總覽", desc: "三館比較" },
                    { href: "/kaohsiung-large-group-20plus", emoji: "👥", title: "20人以上大團體", desc: "大部門方案" },
                    { href: "/packages", emoji: "📋", title: "企業方案總覽", desc: "客製報價" },
                ]}
                lineUrl="https://lin.ee/atCiMQw"
                ctaText="讓團建不再無聊"
            />
        </>
    );
}
