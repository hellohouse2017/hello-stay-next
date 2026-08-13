import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LocalGuidePage from "@/components/LocalGuidePage";
import { foodGuideSections } from "@/data/local-guides";

export const metadata: Metadata = {
  title: "鹽埕美食與生活機能地圖｜早餐、老店、採買與洗衣",
  description: "整理 Hello Stay 周邊可在 Google Maps 找到的早餐、老店、小吃、咖啡、酒吧、採買與自助洗衣店。",
  alternates: { canonical: "https://www.hello-stay.com/explore/food" },
  openGraph: {
    url: "https://www.hello-stay.com/explore/food",
    images: [{ url: "https://www.hello-stay.com/images/explore/market.jpg", width: 1280, height: 672, alt: "鹽埕第一公有零售市場入口" }],
  },
};

export default function FoodExplorePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "鹽埕美食與生活機能地圖",
          description: "Hello Stay 周邊可在 Google Maps 找到的早餐、老店、小吃、咖啡、酒吧、採買與自助洗衣店。",
          url: "https://www.hello-stay.com/explore/food",
        }}
      />
      <LocalGuidePage
        kind="food"
        eyebrow="YANCHENG FOOD GUIDE"
        title="鹽埕美食與生活機能"
        lead="從早餐、老店到宵夜、採買與洗衣，整理成入住期間可以直接使用的清單。"
        image={{ src: "/images/explore/market.jpg", alt: "鹽埕第一公有零售市場入口與街區生活" }}
        facts={[
          { label: "內容分類", value: "早餐到洗衣" },
          { label: "地點範圍", value: "鹽埕與港區" },
          { label: "使用方式", value: "現場吃、採買或導航" },
          { label: "地圖功能", value: "每家可開導航" },
        ]}
        sections={foodGuideSections}
        primaryAction={{ href: "/explore", label: "回到周邊探索" }}
      />
    </>
  );
}
