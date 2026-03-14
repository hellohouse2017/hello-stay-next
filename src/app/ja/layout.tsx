import type { Metadata } from "next";
import { getAlternateLinks } from "@/i18n/config";

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
    return <>{children}</>;
}
