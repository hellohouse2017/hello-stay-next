import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LocalExploreHub from "@/components/LocalExploreHub";

export const metadata: Metadata = {
  title: "鹽埕周邊探索｜美食與景點整理",
  description: "從 Hello Stay 鹽埕住宿出發，整理早餐、老店、甜點、駁二、大港橋、旗津轉乘與三天兩夜步行路線，依美食、景點和行程快速規劃。",
  alternates: { canonical: "https://www.hello-stay.com/explore" },
  openGraph: {
    title: "鹽埕周邊探索｜美食與景點整理",
    description: "從 Hello Stay 鹽埕住宿出發，整理美食、駁二、大港橋、旗津轉乘與三天兩夜步行路線。",
    url: "https://www.hello-stay.com/explore",
    images: [{ url: "https://www.hello-stay.com/images/godin/cover-3.webp", width: 1200, height: 800, alt: "鹽埕街區市場與周邊景點" }],
  },
};

export default function ExplorePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "鹽埕周邊探索",
          description: "Hello Stay 周邊的美食、景點與簡單行程整理。",
          url: "https://www.hello-stay.com/explore",
        }}
      />
      <LocalExploreHub />
    </>
  );
}
