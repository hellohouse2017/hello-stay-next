import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getAlternateLinks } from "@/i18n/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
    title: { default: "Kaohsiung Private Villa Rental | Hello Stay | 6-48 Guests", template: "%s | Hello Stay Kaohsiung" },
    description: "Hello Stay offers three premium private villas in Kaohsiung's Yancheng district. Island kitchen, mahjong, near Pier-2 Art Center. Google 4.9 stars.",
    openGraph: { type: "website", locale: "en_US", url: "https://www.hello-stay.com/en", siteName: "Hello Stay Kaohsiung" },
    alternates: {
        canonical: "https://www.hello-stay.com/en",
        languages: Object.fromEntries(getAlternateLinks("").map(l => [l.hreflang, l.href])),
    },
    robots: { index: true, follow: true },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+TC:wght@400;600;700&display=swap" rel="stylesheet" />
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
