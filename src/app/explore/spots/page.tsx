import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LocalGuidePage from "@/components/LocalGuidePage";
import { spotGuideSections } from "@/data/local-guides";

export const metadata: Metadata = {
  title: "鹽埕周邊景點｜駁二、大港橋與半日行程",
  description: "整理 Hello Stay 周邊可在 Google Maps 找到的駁二、大港橋、港區景點與延伸路線。",
  alternates: { canonical: "https://www.hello-stay.com/explore/spots" },
  openGraph: {
    url: "https://www.hello-stay.com/explore/spots",
    images: [{ url: "https://www.hello-stay.com/images/explore/pier2.jpg", width: 1280, height: 853, alt: "駁二藝術特區蓬萊倉庫群" }],
  },
};

export default function SpotsExplorePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "鹽埕周邊景點",
          description: "Hello Stay 周邊可在 Google Maps 找到的駁二、大港橋、港區景點與延伸路線。",
          url: "https://www.hello-stay.com/explore/spots",
        }}
      />
      <LocalGuidePage
        kind="spots"
        eyebrow="YANCHENG LOCAL SPOTS"
        title="鹽埕周邊景點"
        lead="從駁二、大港橋開始，把港區、藝文與海線行程接成適合團體的路線。"
        image={{ src: "/images/explore/pier2.jpg", alt: "駁二藝術特區蓬萊倉庫群與周邊景點" }}
        facts={[
          { label: "核心區域", value: "鹽埕與駁二" },
          { label: "港區景點", value: "大港橋與棧貳庫" },
          { label: "藝文路線", value: "港史與鐵道" },
          { label: "延伸玩法", value: "旗津與西子灣" },
        ]}
        sections={spotGuideSections}
        primaryAction={{ href: "/explore", label: "回到周邊探索" }}
      />
    </>
  );
}
