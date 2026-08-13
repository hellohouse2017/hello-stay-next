import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LocalExploreHub from "@/components/LocalExploreHub";

export const metadata: Metadata = {
  title: "鹽埕玩什麼？｜美食、景點與在地生活指南",
  description: "從 Hello Stay 鹽埕住宿出發，整理在地美食、老屋咖啡、駁二、大港橋、港區散步、交通與入住補給，慢慢走一趟高雄老城區。",
  alternates: { canonical: "https://www.hello-stay.com/explore" },
  openGraph: {
    title: "鹽埕玩什麼？｜Hello Stay 在地探索指南",
    description: "從 Hello Stay 出發，慢慢走進鹽埕的美食、咖啡、港區景點與在地生活。",
    url: "https://www.hello-stay.com/explore",
    images: [{ url: "https://www.hello-stay.com/images/explore/pier2.jpg", width: 1280, height: 853, alt: "駁二藝術特區蓬萊倉庫群與鹽埕港區" }],
  },
};

export default function ExplorePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "鹽埕玩什麼？",
          description: "Hello Stay 周邊的美食、景點、交通與在地生活整理。",
          url: "https://www.hello-stay.com/explore",
        }}
      />
      <LocalExploreHub />
    </>
  );
}
