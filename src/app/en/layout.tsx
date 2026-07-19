import type { Metadata } from "next";
import { getAlternateLinks } from "@/i18n/config";
import { DEFAULT_SEO_IMAGE } from "@/lib/seo-metadata";

export const metadata: Metadata = {
    title: { default: "Kaohsiung Private Villa Rental | Hello Stay", template: "%s" },
    description: "Hello Stay offers three premium private villas in Kaohsiung's Yancheng district. Island kitchen, mahjong, near Pier-2 Art Center, serving group stays since 2017.",
    openGraph: { type: "website", locale: "en_US", siteName: "Hello Stay Kaohsiung", images: [DEFAULT_SEO_IMAGE] },
    twitter: { card: "summary_large_image", title: "Kaohsiung Private Villa Rental | Hello Stay", description: "Private group stays in Kaohsiung's Yancheng District." },
    alternates: {
        canonical: "https://www.hello-stay.com/en",
        languages: {
            ...Object.fromEntries(getAlternateLinks("").map(l => [l.hreflang, l.href])),
            "x-default": "https://www.hello-stay.com",
        },
    },
    robots: { index: true, follow: true },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
