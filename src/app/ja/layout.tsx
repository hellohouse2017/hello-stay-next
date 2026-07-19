import type { Metadata } from "next";
import { getAlternateLinks } from "@/i18n/config";
import { DEFAULT_SEO_IMAGE } from "@/lib/seo-metadata";

export const metadata: Metadata = {
    title: { default: "高雄貸切民宿おすすめ | Hello Stay", template: "%s" },
    description: "Hello Stayは高雄塩埕区の上質な貸切宿。アイランドキッチン・麻雀卓完備。駁二芸術特区近く、2017年からグループ滞在をサポート。",
    openGraph: { type: "website", locale: "ja_JP", siteName: "Hello Stay 高雄貸切宿", images: [DEFAULT_SEO_IMAGE] },
    twitter: { card: "summary_large_image", title: "高雄貸切民宿おすすめ | Hello Stay", description: "高雄・塩埕区のグループ向け貸切宿。" },
    alternates: {
        canonical: "https://www.hello-stay.com/ja",
        languages: {
            ...Object.fromEntries(getAlternateLinks("").map(l => [l.hreflang, l.href])),
            "x-default": "https://www.hello-stay.com",
        },
    },
    robots: { index: true, follow: true },
};

export default function JaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
