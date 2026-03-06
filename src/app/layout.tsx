import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: {
    default: "高雄包棟民宿推薦 | 你好哇寓所 & 溝頂民宿 | 6-38人團體住宿首選",
    template: "%s | 你好哇寓所 & 溝頂民宿",
  },
  description: "高雄包棟民宿最佳選擇，專為團體設計的質感旅宿。提供6-38人彈性包棟方案，配備中島廚房與麻將設施。近駁二藝術特區、捷運鹽埕埔站。",
  keywords: ["高雄包棟", "高雄包棟民宿", "高雄10人包棟", "高雄20人包棟", "高雄30人包棟", "鹽埕區民宿", "駁二住宿", "你好哇寓所", "溝頂民宿"],
  authors: [{ name: "你好哇寓所 & 溝頂民宿" }],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://www.hello-stay.com",
    title: "高雄包棟民宿推薦 | 你好哇寓所 & 溝頂民宿",
    description: "尋找高雄包棟民宿？我們提供6人至38人的彈性包棟方案。享受專屬的設計空間與舒適氛圍。",
    images: [{ url: "/images/cover-bg.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.hello-stay.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+TC:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
