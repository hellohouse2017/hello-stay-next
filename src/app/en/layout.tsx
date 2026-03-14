import type { Metadata } from "next";
import { getAlternateLinks } from "@/i18n/config";

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
    return <>{children}</>;
}
