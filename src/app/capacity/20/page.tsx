import type { Metadata } from "next";
import configs, { CapacityPage } from "../shared";

export const metadata: Metadata = {
    title: "高雄 20 人包棟民宿推薦｜你好哇寓所 每人 $1,000",
    description: "高雄20人包棟推薦你好哇寓所，6間房彈性配置。豪華中島廚房、麻將桌、Netflix。Google 4.9星。步行10分鐘到駁二。",
    alternates: { canonical: "https://www.hello-stay.com/capacity/20" },
    openGraph: {
        title: "高雄 20 人包棟推薦｜你好哇寓所 每人 $1,000",
        description: "6間房彈性配置，20人每人約$1,000。豪華中島廚房、麻將桌、Netflix。Google 4.9星。",
        url: "https://www.hello-stay.com/capacity/20",
        images: [{ url: "https://www.hello-stay.com/images/cover-bg.webp", width: 1200, height: 630, alt: "Hello Stay 20人包棟" }],
    },
};

export default function Page() { return <CapacityPage config={configs["20"]} />; }
