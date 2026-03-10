import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
