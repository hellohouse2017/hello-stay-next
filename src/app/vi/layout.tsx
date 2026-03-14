import type { Metadata } from "next";
import { getAlternateLinks } from "@/i18n/config";

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
    return <>{children}</>;
}
