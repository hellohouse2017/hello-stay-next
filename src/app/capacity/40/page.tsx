import type { Metadata } from "next";
import configs, { CapacityPage } from "../shared";

export const metadata: Metadata = {
    title: "高雄 40 人包棟民宿推薦｜三館聯訂最大 48 人 每人 $1,000 起",
    description: "高雄40人團體住宿推薦 Hello Stay 三館聯訂，最大容納48人。大智若愚電梯包棟＋你好哇寓所＋溝頂民宿，鹽埕區近駁二大港橋。企業團建、畢旅首選。",
    alternates: { canonical: "https://www.hello-stay.com/capacity/40" },
    openGraph: {
        title: "高雄 40 人包棟推薦｜Hello Stay 三館聯訂 每人 $1,000 起",
        description: "三館聯訂最大48人。大智若愚電梯包棟＋你好哇＋溝頂。鹽埕區近駁二大港橋，企業團建、畢旅首選。",
        url: "https://www.hello-stay.com/capacity/40",
        images: [{ url: "https://www.hello-stay.com/images/cover-bg.webp", width: 1200, height: 630, alt: "Hello Stay 40人包棟" }],
    },
};

export default function Page() { return <CapacityPage config={configs["40"]} />; }
