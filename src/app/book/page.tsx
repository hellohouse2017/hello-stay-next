import type { Metadata } from "next";
import BookingFlow from "./BookingFlow";
import { getAlternateLanguageMap } from "@/i18n/config";

export const metadata: Metadata = {
    title: "高雄包棟民宿官方訂房入口｜先選館別再查空房與報價",
    description: "先選擇你好哇寓所、溝頂民宿或雙館包棟，再前往 Hello Stay 官方 booking 站查空房、看目前試算總價並完成預訂。",
    alternates: { canonical: "https://www.hello-stay.com/book", languages: getAlternateLanguageMap("/book") },
    openGraph: {
        title: "Hello Stay 官方訂房入口 | 先選館別再查空房與報價",
        description: "先選擇館別，再前往官方 booking 站查空房、看目前試算總價並完成預訂。",
        url: "https://www.hello-stay.com/book",
        images: [{ url: "https://www.hello-stay.com/images/cover-bg.webp", width: 1200, height: 630, alt: "Hello Stay 訂房入口" }],
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
                            name: "Hello Stay 官方訂房入口",
                            description: "先選擇館別，再前往官方 booking 站查空房、看目前試算總價並完成預訂。",
                            url: "https://www.hello-stay.com/book",
                            isPartOf: { "@type": "WebSite", name: "Hello Stay 高雄包棟民宿", url: "https://www.hello-stay.com" },
                            potentialAction: {
                                "@type": "ReserveAction",
                                target: "https://booking.hello-stay.com/booking",
                                result: { "@type": "LodgingReservation", name: "Hello Stay 包棟預訂" },
                            },
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: [
                                {
                                    "@type": "Question",
                                    name: "這個頁面可以直接完成訂房嗎？",
                                    acceptedAnswer: { "@type": "Answer", text: "不能直接在這頁完成訂房。這裡會先帶你前往 booking.hello-stay.com/booking，先選館別再查空房與總價。" },
                                },
                                {
                                    "@type": "Question",
                                    name: "查到有空房後要怎麼預訂？",
                                    acceptedAnswer: { "@type": "Answer", text: "進入 booking.hello-stay.com/booking 後，選日期、人數與館別，完成 Email 驗證、簽署與付款即可。" },
                                },
                                {
                                    "@type": "Question",
                                    name: "Hello Stay 的高雄包棟民宿適合幾人？",
                                    acceptedAnswer: { "@type": "Answer", text: "你好哇寓所適合 8 至 26 人，溝頂民宿適合 4 至 12 人；更大團體可以直接查看雙館方案。" },
                                },
                            ],
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "HowTo",
                            name: "如何使用 Hello Stay 官方訂房入口",
                            description: "先選擇館別，再前往 booking 站查空房、看目前試算總價並完成預訂。",
                            totalTime: "PT5M",
                            step: [
                                {
                                    "@type": "HowToStep",
                                    position: 1,
                                    name: "先選館別",
                                    text: "先選擇你好哇寓所、溝頂民宿或雙館包棟，再看空房與總價。",
                                    url: "https://www.hello-stay.com/book",
                                },
                                {
                                    "@type": "HowToStep",
                                    position: 2,
                                    name: "前往 booking 站",
                                    text: "點擊按鈕前往 booking.hello-stay.com/booking，先查空房。",
                                    url: "https://booking.hello-stay.com/booking",
                                },
                                {
                                    "@type": "HowToStep",
                                    position: 3,
                                    name: "輸入日期與人數",
                                    text: "在 booking 站選入住日期、退房日期與實際人數，查看目前試算總價。",
                                    url: "https://booking.hello-stay.com/booking",
                                },
                                {
                                    "@type": "HowToStep",
                                    position: 4,
                                    name: "完成驗證與付款",
                                    text: "完成 Email 驗證、合約簽署與付款，訂單就會成立。",
                                    url: "https://booking.hello-stay.com/booking",
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
