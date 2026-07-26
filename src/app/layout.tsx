import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "../styles/luxury.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { getAlternateLinks } from "@/i18n/config";
import { buildGa4InitScript } from "@/lib/ai-assistant-referrers";
import { GA4_MEASUREMENT_ID } from "@/lib/analytics-config";
import { DEFAULT_SEO_IMAGE_URL } from "@/lib/seo-metadata";
import { headers } from "next/headers";

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
    default: "高雄包棟民宿｜Hello Stay",
    template: "%s | Hello Stay",
  },
  description: "高雄鹽埕包棟民宿推薦 Hello Stay，依人數選擇你好哇寓所、溝頂民宿與雙館包棟。近駁二、大港橋與鹽埕埔站，官網先幫你判斷館別，再查空房與報價。",
  authors: [{ name: "Hello Stay" }],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://www.hello-stay.com",
    siteName: "Hello Stay 高雄包棟民宿",
    title: "高雄包棟民宿｜Hello Stay",
    description: "高雄鹽埕包棟民宿，依人數選擇你好哇寓所、溝頂民宿與雙館包棟。近駁二、大港橋與鹽埕埔站，先查空房與報價。",
    images: [{ url: "https://www.hello-stay.com/images/cover-bg.webp", width: 1200, height: 630, alt: "Hello Stay 高雄包棟民宿" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "高雄包棟民宿推薦 | Hello Stay",
    description: "高雄鹽埕區 4-36 人包棟住宿，依人數選擇溝頂、你好哇或雙館方案。",
    images: ["https://www.hello-stay.com/images/cover-bg.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.hello-stay.com",
    languages: {
      ...Object.fromEntries(getAlternateLinks("").map(l => [l.hreflang, l.href])),
      "x-default": "https://www.hello-stay.com",
    },
  },
  other: {
    "geo.region": "TW-KHH",
    "geo.placename": "高雄市鹽埕區",
    "geo.position": "22.6245;120.2823",
    "ICBM": "22.6245, 120.2823",
  },
  verification: {
    google: "VccBLBmoWAgu_Hn0562s8itv58XjH6QGshmI26mY32o",
    other: {
      ...(process.env.NAVER_SITE_VERIFICATION ? { "naver-site-verification": [process.env.NAVER_SITE_VERIFICATION] } : {}),
      ...(process.env.YAHOO_SITE_VERIFICATION ? { "y_key": [process.env.YAHOO_SITE_VERIFICATION] } : {}),
    }
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requestHeaders = await headers();
  const htmlLang = requestHeaders.get("x-site-html-lang") || "zh-Hant-TW";
  const sitePath = requestHeaders.get("x-site-path") || "/";
  const siteUrl = new URL(sitePath, "https://www.hello-stay.com").toString();
  return (
    <html lang={htmlLang} className={`${notoSans.variable} ${notoSerif.variable}`}>
      <head>
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={DEFAULT_SEO_IMAGE_URL} />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        {/* AI crawler discovery */}
        <link rel="alternate" type="text/plain" href="https://www.hello-stay.com/llms.txt" title="LLMs.txt - AI Summary" />
        <link rel="alternate" type="text/plain" href="https://www.hello-stay.com/llms-full.txt" title="LLMs-full.txt - AI Full Details" />
        <link rel="alternate" type="text/plain" hrefLang="en" href="https://www.hello-stay.com/llms-en.txt" title="LLMs.txt - English" />
        <link rel="alternate" type="text/plain" hrefLang="ja" href="https://www.hello-stay.com/llms-ja.txt" title="LLMs.txt - Japanese" />
        <link rel="alternate" type="text/plain" hrefLang="ko" href="https://www.hello-stay.com/llms-ko.txt" title="LLMs.txt - Korean" />
      </head>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {buildGa4InitScript(GA4_MEASUREMENT_ID)}
        </Script>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <AnalyticsTracker />
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
