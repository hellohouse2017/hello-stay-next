import path from "node:path";
import type { NextConfig } from "next";

const appRoot = path.resolve(process.cwd());

const nextConfig: NextConfig = {
  outputFileTracingRoot: appRoot,
  turbopack: {
    root: appRoot,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Cache-Control", value: "private, no-store, max-age=0" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // ===== 多語系頁面 trailing slash → 正規 URL（修正 GSC 重新導向錯誤）=====
      { source: "/en/", destination: "/en", permanent: true },
      { source: "/ja/", destination: "/ja", permanent: true },
      { source: "/ko/", destination: "/ko", permanent: true },
      { source: "/vi/", destination: "/vi", permanent: true },
      // 多語系子頁面 trailing slash（預防性）
      { source: "/en/:path*/", destination: "/en/:path*", permanent: true },
      { source: "/ja/:path*/", destination: "/ja/:path*", permanent: true },
      { source: "/ko/:path*/", destination: "/ko/:path*", permanent: true },
      { source: "/vi/:path*/", destination: "/vi/:path*", permanent: true },

      // ===== GSC 涵蓋範圍報告中的 404 URL =====
      { source: "/index", destination: "/", permanent: true },
      { source: "/index/", destination: "/", permanent: true },
      { source: "/rooms", destination: "/hellohouse", permanent: true },
      { source: "/rooms/", destination: "/hellohouse", permanent: true },
      { source: "/%E5%91%A8%E9%82%8A%E6%99%AF%E9%BB%9E", destination: "/explore", permanent: true },
      { source: "/%E5%91%A8%E9%82%8A%E6%99%AF%E9%BB%9E/", destination: "/explore", permanent: true },

      // ===== 舊站 hellohouse/ 頁面 → 新站對應頁面 =====
      { source: "/hellohouse/index.html", destination: "/hellohouse", permanent: true },
      { source: "/hellohouse/rooms.html", destination: "/hellohouse", permanent: true },
      { source: "/hellohouse/info.html", destination: "/hellohouse", permanent: true },
      { source: "/hellohouse/faq.html", destination: "/hellohouse", permanent: true },
      { source: "/hellohouse/agreement.html", destination: "/agreement", permanent: true },
      { source: "/hellohouse/signature.html", destination: "/agreement", permanent: true },
      { source: "/hellohouse/traffic.html", destination: "/traffic", permanent: true },
      { source: "/hellohouse/self-checkin.html", destination: "/hellohouse", permanent: true },
      { source: "/hellohouse/check.html", destination: "/book", permanent: true },
      { source: "/hellohouse/food.html", destination: "/explore", permanent: true },
      { source: "/hellohouse/attractions.html", destination: "/explore", permanent: true },
      { source: "/hellohouse/travel.html", destination: "/explore", permanent: true },
      { source: "/hellohouse/packages.html", destination: "/packages", permanent: true },
      { source: "/hellohouse/packages-business.html", destination: "/packages", permanent: true },
      { source: "/hellohouse/packages-family.html", destination: "/packages", permanent: true },
      { source: "/hellohouse/packages-team.html", destination: "/packages", permanent: true },
      { source: "/hellohouse/packages-wedding.html", destination: "/packages", permanent: true },

      // ===== 舊站 godin/ 頁面 → 新站對應頁面 =====
      { source: "/godin/index.html", destination: "/godin", permanent: true },
      { source: "/godin/rooms.html", destination: "/godin", permanent: true },
      { source: "/godin/agreement.html", destination: "/agreement", permanent: true },
      { source: "/godin/signature.html", destination: "/agreement", permanent: true },
      { source: "/godin/traffic.html", destination: "/traffic", permanent: true },
      { source: "/godin/check.html", destination: "/book", permanent: true },
      { source: "/godin/food.html", destination: "/explore", permanent: true },
      { source: "/godin/attractions.html", destination: "/explore", permanent: true },
      { source: "/godin/travel.html", destination: "/explore", permanent: true },

      // ===== 舊站根目錄 =====
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/ruins/index.html", destination: "/dazhi", permanent: true },
      { source: "/ruins", destination: "/dazhi", permanent: true },
      { source: "/blog/kaohsiung-concert-accommodation", destination: "/blog/kaohsiung-arena-accommodation", permanent: true },
    ];
  },
};

export default nextConfig;
