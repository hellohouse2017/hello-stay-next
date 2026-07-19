import type { Metadata } from "next";
import { getAlternateLinks } from "@/i18n/config";
import { DEFAULT_SEO_IMAGE } from "@/lib/seo-metadata";

export const metadata: Metadata = {
    title: { default: "Biệt thự riêng Cao Hùng | Hello Stay", template: "%s" },
    description: "Hello Stay cung cấp 3 biệt thự riêng cao cấp tại quận Diêm Trình, Cao Hùng. Có bếp đảo, mạt chược, gần Pier-2 và phục vụ khách đoàn từ năm 2017.",
    openGraph: { type: "website", locale: "vi_VN", siteName: "Hello Stay Cao Hùng", images: [DEFAULT_SEO_IMAGE] },
    twitter: { card: "summary_large_image", title: "Biệt thự riêng Cao Hùng | Hello Stay", description: "Nhà nghỉ riêng cho nhóm tại Diêm Trình, Cao Hùng." },
    alternates: {
        canonical: "https://www.hello-stay.com/vi",
        languages: {
            ...Object.fromEntries(getAlternateLinks("").map(l => [l.hreflang, l.href])),
            "x-default": "https://www.hello-stay.com",
        },
    },
    robots: { index: true, follow: true },
};

export default function ViLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
