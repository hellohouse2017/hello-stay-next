"use client";

import React, { useState } from "react";
import { Share2, Check, Copy, MessageCircle } from "lucide-react";

interface GuideShareToolbarProps {
  title: string;
  description?: string;
  url?: string;
  highlights?: string[];
  variant?: "inline" | "card" | "compact";
}

export default function GuideShareToolbar({
  title,
  description = "",
  url,
  highlights = [],
}: GuideShareToolbarProps) {
  const [copiedNote, setCopiedNote] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const getFullUrl = () => {
    if (typeof window === "undefined") return url || "https://www.hello-stay.com/explore";
    return url?.startsWith("http") ? url : `${window.location.origin}${url || window.location.pathname}`;
  };

  const handleLineShare = () => {
    const shareUrl = getFullUrl();
    const highlightSnippet =
      highlights.length > 0
        ? `\n\n📌 精選必訪：\n${highlights.slice(0, 5).map((h) => `• ${h}`).join("\n")}`
        : "";
    const text = `【Hello Stay 鹽埕私房攻略】\n✨ ${title}\n${description ? `\n${description}` : ""}${highlightSnippet}\n\n🔗 完整攻略與地標：\n${shareUrl}`;
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(text)}`;
    window.open(lineUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopyNotes = async () => {
    const shareUrl = getFullUrl();
    const noteText = `【Hello Stay 鹽埕私房行程筆記】\n📌 ${title}\n${description ? `💬 簡介：${description}\n` : ""}\n🗺️ 重點地標清單：\n${
      highlights.length > 0
        ? highlights.map((h, i) => `${i + 1}. ${h}`).join("\n")
        : "• 鹽埕在地美食與景點地標"
    }\n\n🔗 完整地標導航：${shareUrl}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(noteText);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = noteText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedNote(true);
      setTimeout(() => setCopiedNote(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyUrl = async () => {
    const shareUrl = getFullUrl();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section className="hotel-trip-card" aria-label="包棟旅伴行程統整與分享">
      <div className="hotel-trip-card__header">
        <div className="hotel-trip-card__kicker">
          <Share2 size={13} aria-hidden="true" />
          <span>包棟同行旅伴專屬</span>
        </div>
        <h3 className="hotel-trip-card__title">正在與朋友規劃高雄行程嗎？</h3>
        <p className="hotel-trip-card__subtitle">
          一鍵將這份鹽埕私房地標與精華路線分享給同行旅伴，出遊討論更輕鬆。
        </p>
      </div>

      {highlights.length > 0 && (
        <div className="hotel-trip-card__pills">
          {highlights.slice(0, 6).map((item) => (
            <span key={item} className="hotel-trip-card__pill">
              {item}
            </span>
          ))}
        </div>
      )}

      <div className="hotel-trip-card__actions">
        <button
          type="button"
          onClick={handleLineShare}
          className="hotel-trip-btn hotel-trip-btn--line"
          aria-label="透過 LINE 一鍵分享給同行友人"
        >
          <MessageCircle size={17} aria-hidden="true" />
          <span>LINE 分享給同行友人</span>
        </button>

        <button
          type="button"
          onClick={handleCopyNotes}
          className="hotel-trip-btn hotel-trip-btn--notes"
          aria-label="複製本篇條列行程筆記"
        >
          {copiedNote ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          <span>{copiedNote ? "已複製行程筆記！" : "複製行程筆記"}</span>
        </button>

        <button
          type="button"
          onClick={handleCopyUrl}
          className="hotel-trip-btn hotel-trip-btn--link"
          aria-label="複製文章連結"
        >
          {copiedLink ? <Check size={15} aria-hidden="true" /> : <Share2 size={15} aria-hidden="true" />}
          <span>{copiedLink ? "已複製網址" : "複製網址"}</span>
        </button>
      </div>
    </section>
  );
}
