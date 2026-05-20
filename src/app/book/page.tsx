import type { Metadata } from "next";
import BookingFlow from "./BookingFlow";

export const metadata: Metadata = {
    title: "高雄包棟民宿空房查詢與報價｜6-26人・10-12人官方直訂｜Hello Stay",
    description: "即時查詢 Hello Stay 高雄包棟民宿空房與報價｜輸入日期與人數，快速查看你好哇寓所(6-26人)、溝頂民宿(6-12人)是否有房。官方直訂、LINE 洽詢、自助入住。",
    alternates: { canonical: "https://www.hello-stay.com/book" },
    openGraph: {
        title: "高雄包棟民宿空房查詢與報價 | Hello Stay",
        description: "輸入日期與人數，快速查詢高雄包棟民宿空房與報價。",
        url: "https://www.hello-stay.com/book",
        images: [{ url: "https://www.hello-stay.com/images/cover-bg.webp", width: 1200, height: 630, alt: "Hello Stay 查詢空房" }],
    },
    robots: { index: true, follow: true },
};

export default function BookPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            name: "高雄包棟民宿空房查詢與報價",
                            description: "即時查詢高雄包棟民宿空房與報價",
                            url: "https://www.hello-stay.com/book",
                            isPartOf: { "@type": "WebSite", name: "Hello Stay 高雄包棟民宿", url: "https://www.hello-stay.com" },
                            potentialAction: {
                                "@type": "ReserveAction",
                                target: "https://www.hello-stay.com/book",
                                result: { "@type": "LodgingReservation", name: "Hello Stay 包棟預訂" },
                            },
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: [
                                {
                                    "@type": "Question",
                                    name: "高雄包棟民宿可以先查空房再決定館別嗎？",
                                    acceptedAnswer: { "@type": "Answer", text: "可以。先輸入日期與人數，就能快速查看你好哇寓所與溝頂民宿是否有空房，再依人數與設備需求決定要訂哪一館。" },
                                },
                                {
                                    "@type": "Question",
                                    name: "查到有空房後要怎麼預訂？",
                                    acceptedAnswer: { "@type": "Answer", text: "查到有空房後，可以直接加入 Hello Stay LINE 官方帳號洽詢，確認人數、價格與入住細節後完成預訂。" },
                                },
                                {
                                    "@type": "Question",
                                    name: "Hello Stay 的高雄包棟民宿適合幾人？",
                                    acceptedAnswer: { "@type": "Answer", text: "你好哇寓所適合 6 至 26 人，溝頂民宿適合 6 至 12 人；若是更大團體，也可以先看 Hello Stay 官網的包棟方案整理。" },
                                },
                            ],
                        },
                    ]),
                }}
            />
            <BookingFlow />
        </>
    );
}
