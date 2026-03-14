import type { Metadata } from "next";
import { getAlternateLinks } from "@/i18n/config";

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
    return <>{children}</>;
}
