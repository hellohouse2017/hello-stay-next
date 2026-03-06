import type { Metadata } from "next";
import configs, { CapacityPage } from "../shared";

export const metadata: Metadata = {
    title: "高雄 20 人包棟民宿推薦｜你好哇寓所 每人 $1,000",
    description: "高雄20人包棟推薦你好哇寓所，6間房彈性配置。豪華中島廚房、麻將桌、Netflix。Google 4.9星。步行10分鐘到駁二。",
    alternates: { canonical: "https://www.hello-stay.com/capacity/20" },
};

export default function Page() { return <CapacityPage config={configs["20"]} />; }
