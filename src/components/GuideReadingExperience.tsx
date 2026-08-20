"use client";

import React, { useEffect, useState } from "react";

interface GuideReadingExperienceProps {
  title?: string;
  description?: string;
  url?: string;
  highlights?: string[];
}

export default function GuideReadingExperience(_props: GuideReadingExperienceProps) {
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
  );
}
