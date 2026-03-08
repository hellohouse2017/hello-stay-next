import type { Metadata } from "next";
import BookingFlow from "./BookingFlow";

export const metadata: Metadata = {
    title: "查詢空房與報價 | 你好哇寓所 & 溝頂民宿",
    description: "即時查詢高雄包棟民宿空房與報價。選擇日期和人數，系統即時為您查詢可訂方案。",
    openGraph: {
        title: "查詢空房與報價 | Hello Stay",
        description: "即時查詢高雄包棟民宿空房與報價，選擇日期和人數即可查詢。",
        url: "https://www.hello-stay.com/book",
        images: [{ url: "/images/cover-bg.jpg", width: 1200, height: 630, alt: "Hello Stay 查詢空房" }],
    },
    robots: { index: true, follow: true },
};

export default function BookPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: "查詢空房與報價",
                        description: "即時查詢高雄包棟民宿空房與報價",
                        isPartOf: { "@type": "WebSite", name: "你好哇寓所 & 溝頂民宿", url: "https://www.hello-stay.com" },
                    }),
                }}
            />
            <BookingFlow />
        </>
    );
}
