import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidgetLoader from "@/components/ChatWidgetLoader";
import LineFloatingCTA from "@/components/LineFloatingCTA";

const notoSans = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans",
});

const notoSerif = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hello-stay.com"),
  title: {
    default: "高雄包棟民宿｜6-48人鹽埕住宿・近駁二大港橋｜Hello Stay",
    template: "%s | Hello Stay 高雄包棟民宿",
  },
  description: "高雄鹽埕包棟民宿推薦 Hello Stay，三館6-48人任選。中島廚房、麻將、桌遊，近駁二與大港橋。平日 NT$10,000 起，Google 4.9 星，自2017年服務超過5000組旅客。馬上查空房",
  keywords: ["高雄包棟", "高雄包棟民宿", "高雄包棟民宿推薦", "高雄10人包棟", "高雄20人包棟", "高雄30人包棟", "高雄40人包棟", "鹽埕區民宿", "鹽埕住宿", "駁二住宿", "駁二民宿", "大港橋民宿", "高雄團體住宿", "高雄企業包棟", "高雄婚禮包棟", "你好哇寓所", "溝頂民宿", "大智若愚民宿"],
  authors: [{ name: "Hello Stay 你好哇寓所 & 溝頂民宿 & 大智若愚" }],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://www.hello-stay.com",
    siteName: "Hello Stay 高雄包棟民宿",
    title: "高雄包棟民宿｜6-48人鹽埕住宿｜Hello Stay",
    description: "高雄鹽埕包棟民宿，6-48人三館任選。附中島廚房、麻將、桌遊。平日 NT$10,000 起，近駁二大港橋，馬上查空房。",
    images: [{ url: "https://www.hello-stay.com/images/cover-bg.webp", width: 1200, height: 630, alt: "Hello Stay 高雄包棟民宿" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "高雄包棟民宿推薦 | Hello Stay",
    description: "高雄鹽埕區三館包棟民宿，6至48人彈性方案。",
    images: ["https://www.hello-stay.com/images/cover-bg.webp"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.hello-stay.com" },
  other: {
    "geo.region": "TW-KHH",
    "geo.placename": "高雄市鹽埕區",
    "geo.position": "22.6245;120.2823",
    "ICBM": "22.6245, 120.2823",
  },
  verification: {
    google: "VccBLBmoWAgu_Hn0562s8itv58XjH6QGshmI26mY32o",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        {/* AI crawler discovery */}
        <link rel="alternate" type="text/plain" href="https://www.hello-stay.com/llms.txt" title="LLMs.txt - AI Summary" />
        <link rel="alternate" type="text/plain" href="https://www.hello-stay.com/llms-full.txt" title="LLMs-full.txt - AI Full Details" />
        <link rel="alternate" type="text/plain" hrefLang="en" href="https://www.hello-stay.com/llms-en.txt" title="LLMs.txt - English" />
        <link rel="alternate" type="text/plain" hrefLang="ja" href="https://www.hello-stay.com/llms-ja.txt" title="LLMs.txt - Japanese" />
      </head>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N2LV3SSTPF"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N2LV3SSTPF');
          `}
        </Script>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <LineFloatingCTA lineUrl="https://lin.ee/atCiMQw" />
        <ChatWidgetLoader />
        <Script
          id="font-awesome"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
              document.head.appendChild(link);
            `,
          }}
        />
      </body>
    </html>
  );
}
