import type { Metadata } from "next";
import { getAlternateLinks } from "@/i18n/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
    title: { default: "가오슝 단독 숙소 추천 | Hello Stay | 6-48명", template: "%s | Hello Stay 가오슝" },
    description: "Hello Stay는 가오슝 옌청구의 프리미엄 단독 숙소. 아일랜드 키친, 마작 완비. 피어-2 인근, 구글 4.9성.",
    openGraph: { type: "website", locale: "ko_KR", url: "https://www.hello-stay.com/ko", siteName: "Hello Stay 가오슝" },
    alternates: {
        canonical: "https://www.hello-stay.com/ko",
        languages: Object.fromEntries(getAlternateLinks("").map(l => [l.hreflang, l.href])),
    },
    robots: { index: true, follow: true },
};

export default function KoLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+TC:wght@400;600;700&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            </head>
            <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Navbar />
                <main style={{ flex: 1 }}>{children}</main>
                <Footer />
                <ChatWidget />
            </body>
        </html>
    );
}
