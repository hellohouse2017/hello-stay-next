import type { Metadata } from "next";
import { getAlternateLinks } from "@/i18n/config";

export const metadata: Metadata = {
    title: { default: "가오슝 단독 숙소 추천 | Hello Stay", template: "%s | Hello Stay 가오슝" },
    description: "Hello Stay는 가오슝 옌청구의 프리미엄 단독 숙소입니다. 아일랜드 키친과 마작 시설을 갖추고 있으며 피어-2 인근에서 2017년부터 단체 숙박을 운영하고 있습니다.",
    openGraph: { type: "website", locale: "ko_KR", url: "https://www.hello-stay.com/ko", siteName: "Hello Stay 가오슝" },
    alternates: {
        canonical: "https://www.hello-stay.com/ko",
        languages: {
            ...Object.fromEntries(getAlternateLinks("").map(l => [l.hreflang, l.href])),
            "x-default": "https://www.hello-stay.com",
        },
    },
    robots: { index: true, follow: true },
};

export default function KoLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
