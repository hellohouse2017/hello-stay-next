import type { Metadata } from "next";
import configs, { CapacityPage } from "../shared";

export const metadata: Metadata = {
    title: "高雄 10 人包棟民宿推薦｜溝頂民宿 每人 $1,000",
    description: "高雄10人包棟首選溝頂民宿，五層樓獨棟每人只要$1,000。各層獨立衛浴、麻將桌，步行10分鐘到駁二藝術特區。鹽埕區合法民宿。",
    alternates: { canonical: "https://www.hello-stay.com/capacity/10" },
    openGraph: {
        title: "高雄 10 人包棟推薦｜溝頂民宿 每人 $1,000",
        description: "五層樓獨棟包棟民宿，10人平日$10,000起。各層獨立衛浴、麻將桌，步行10分鐘到駁二。",
        url: "https://www.hello-stay.com/capacity/10",
        images: [{ url: "https://www.hello-stay.com/images/cover-bg.webp", width: 1200, height: 630, alt: "Hello Stay 10人包棟" }],
    },
};

export default function Page() { return <CapacityPage config={configs["10"]} />; }
