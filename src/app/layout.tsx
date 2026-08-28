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
    default: "高雄包棟民宿推薦｜4-36人整棟包棟・每房獨立衛浴・中島廚房與麻將｜Hello Stay",
    template: "%s | Hello Stay",
  },
  description: "高雄包棟民宿推薦 Hello Stay：提供 4–36 人整棟包棟（4房/6房/10房），每間客房皆有獨立衛浴，配備 1F 大型中島廚房與手動麻將桌。近捷運鹽埕埔站與駁二特區，官網即時查空房與免手續費最低價直訂！",
  authors: [{ name: "Hello Stay" }],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://www.hello-stay.com",
    siteName: "Hello Stay 高雄包棟民宿",
    title: "高雄包棟民宿推薦｜4-36人整棟包棟・每房獨立衛浴・中島廚房與麻將｜Hello Stay",
    description: "高雄鹽埕 4-36 人包棟住宿首選，每間客房皆有獨立衛浴・整棟專屬獨享，配備中島廚房與手動麻將，近駁二與捷運鹽埕埔站，官網即時查空房與免手續費直訂。",
    images: [{ url: "https://www.hello-stay.com/images/cover-bg.webp", width: 1200, height: 630, alt: "Hello Stay 高雄包棟民宿" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "高雄包棟民宿推薦｜4-36人整棟包棟・每房獨立衛浴・中島廚房與麻將｜Hello Stay",
    description: "高雄鹽埕區 4-36 人包棟住宿，4 房、6 房與 10 房每房皆有獨立衛浴，整棟專屬獨享，即時查空房與免手續費直訂。",
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
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://booking.hello-stay.com" />
        <link rel="dns-prefetch" href="https://booking.hello-stay.com" />
        {/* AI crawler discovery */}
        <link rel="alternate" type="text/plain" href="https://www.hello-stay.com/llms.txt" title="LLMs.txt - AI Summary" />
        <link rel="alternate" type="text/plain" href="https://www.hello-stay.com/llms-full.txt" title="LLMs-full.txt - AI Full Details" />
        <link rel="alternate" type="text/plain" hrefLang="en" href="https://www.hello-stay.com/llms-en.txt" title="LLMs.txt - English" />
        <link rel="alternate" type="text/plain" hrefLang="ja" href="https://www.hello-stay.com/llms-ja.txt" title="LLMs.txt - Japanese" />
        <link rel="alternate" type="text/plain" hrefLang="ko" href="https://www.hello-stay.com/llms-ko.txt" title="LLMs.txt - Korean" />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: buildGa4InitScript(GA4_MEASUREMENT_ID) }}
        />
      </head>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
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
