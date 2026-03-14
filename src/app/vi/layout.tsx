import type { Metadata } from "next";
import { getAlternateLinks } from "@/i18n/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
    title: { default: "Biệt thự riêng Cao Hùng | Hello Stay | 6-48 khách", template: "%s | Hello Stay Cao Hùng" },
    description: "Hello Stay cung cấp 3 biệt thự riêng cao cấp tại quận Diêm Trình, Cao Hùng. Bếp đảo, mạt chược, gần Pier-2. Google 4.9 sao.",
    openGraph: { type: "website", locale: "vi_VN", url: "https://www.hello-stay.com/vi", siteName: "Hello Stay Cao Hùng" },
    alternates: {
        canonical: "https://www.hello-stay.com/vi",
        languages: Object.fromEntries(getAlternateLinks("").map(l => [l.hreflang, l.href])),
    },
    robots: { index: true, follow: true },
};

export default function ViLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
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
