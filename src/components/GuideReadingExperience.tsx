"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface GuideReadingExperienceProps {
  title?: string;
  description?: string;
  url?: string;
  highlights?: string[];
  bookingHref?: string;
  seoIntent?: string;
  partySize?: number;
}

const LINE_URL = "https://lin.ee/atCiMQw";

export default function GuideReadingExperience({
  bookingHref = "/book",
  seoIntent = "inspiration",
  partySize,
}: GuideReadingExperienceProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="hotel-reading-progress"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${progress}%`,
          height: "2.5px",
          background: "linear-gradient(90deg, #C5A880 0%, #E2D3BE 100%)",
          zIndex: 9999,
          transition: "width 0.1s ease-out",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <nav className="guide-mobile-booking-bar" aria-label="快速訂房入口">
        <Link
          href={bookingHref}
          data-seo-intent={seoIntent}
          data-party-size={partySize}
          data-cta-type="booking"
          data-cta-position="sticky_mobile"
        >
          查空房與報價
        </Link>
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-seo-intent={seoIntent}
          data-party-size={partySize}
          data-cta-type="line_quote"
          data-cta-position="sticky_mobile"
        >
          LINE 諮詢
        </a>
      </nav>
    </>
  );
}
