import type { Metadata } from "next";
import configs, { CapacityPage } from "../shared";

export const metadata: Metadata = {
    title: "高雄 30 人包棟民宿推薦｜兩棟合訂 每人 $1,000",
    description: "高雄30人包棟推薦Hello Stay兩棟合訂，你好哇+溝頂共10+間房，最多38人。兩棟相距30公尺，各有獨立空間。鹽埕區合法民宿。",
    alternates: { canonical: "https://www.hello-stay.com/capacity/30" },
};

export default function Page() { return <CapacityPage config={configs["30"]} />; }
