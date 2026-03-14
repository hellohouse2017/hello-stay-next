import type { Metadata } from "next";
import { getAlternateLinks } from "@/i18n/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
    title: { default: "高雄貸切民宿おすすめ | Hello Stay | 6-48名対応", template: "%s | Hello Stay 高雄" },
    description: "Hello Stayは高雄塩埕区の上質な貸切宿。アイランドキッチン・麻雀卓完備。駁二芸術特区近く、Google 4.9星。",
    openGraph: { type: "website", locale: "ja_JP", url: "https://www.hello-stay.com/ja", siteName: "Hello Stay 高雄貸切宿" },
    alternates: {
        canonical: "https://www.hello-stay.com/ja",
        languages: Object.fromEntries(getAlternateLinks("").map(l => [l.hreflang, l.href])),
    },
    robots: { index: true, follow: true },
};

export default function JaLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Serif+TC:wght@400;600;700&display=swap" rel="stylesheet" />
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
