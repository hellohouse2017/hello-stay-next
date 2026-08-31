"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  DoorClosed,
  FileCheck2,
  HelpCircle,
  MessageSquare,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import {
  faqCategories,
  homepageFaqItems,
  type FaqCategoryId,
} from "@/data/homepage-faq";

const lineUrl = "https://lin.ee/atCiMQw";

const quickChips = [
  { label: "🔥 全部問題", category: "all" as FaqCategoryId, search: "" },
  { label: "🔑 自助密碼鎖", category: "all" as FaqCategoryId, search: "密碼" },
  { label: "🀄 手動麻將", category: "all" as FaqCategoryId, search: "麻將" },
  { label: "🍳 中島廚房", category: "all" as FaqCategoryId, search: "中島" },
  { label: "🏠 專屬獨享原則", category: "all" as FaqCategoryId, search: "獨享" },
  { label: "💰 押金退還", category: "all" as FaqCategoryId, search: "押金" },
  { label: "📅 改期保留", category: "all" as FaqCategoryId, search: "改期" },
  { label: "🚗 停車與交通", category: "all" as FaqCategoryId, search: "停車" },
  { label: "🐶 寵物入住", category: "all" as FaqCategoryId, search: "寵物" },
  { label: "🧾 報帳收據", category: "all" as FaqCategoryId, search: "收據" },
];

export default function FaqExperience() {
  const [activeCategory, setActiveCategory] = useState<FaqCategoryId>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqMap, setOpenFaqMap] = useState<Record<string, boolean>>({});

  // 支援 URL 參數與 Deep Link 錨點解析
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleUrlState = () => {
      let searchStr = window.location.search;
      let hashStr = window.location.hash || "";

      if (hashStr.includes("?")) {
        const [h, q] = hashStr.split("?");
        hashStr = h;
        searchStr = searchStr ? `${searchStr}&${q}` : `?${q}`;
      }

      const params = new URLSearchParams(searchStr);
      const cleanHash = hashStr.replace("#", "");

      // 1. 分類參數
      const catParam = params.get("category") || params.get("faq_cat");
      if (catParam && faqCategories.some((c) => c.id === catParam)) {
        setActiveCategory(catParam as FaqCategoryId);
      }

      // 2. 搜尋參數
      const qParam = params.get("q") || params.get("faq_q") || params.get("search");
      if (qParam) {
        setSearchQuery(qParam);
      }

      // 3. 錨點定位與自動展開
      if (cleanHash && cleanHash !== "faq") {
        const matched = homepageFaqItems.find((item) => item.id === cleanHash);
        if (matched) {
          setActiveCategory(matched.category);
          setOpenFaqMap((prev) => ({ ...prev, [matched.id]: true }));
          setTimeout(() => {
            const el = document.getElementById(matched.id);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 350);
        } else if (cleanHash.startsWith("category-")) {
          const cat = cleanHash.replace("category-", "");
          if (faqCategories.some((c) => c.id === cat)) {
            setActiveCategory(cat as FaqCategoryId);
          }
        }
      }
    };

    handleUrlState();
    window.addEventListener("hashchange", handleUrlState);
    return () => window.removeEventListener("hashchange", handleUrlState);
  }, []);

  const toggleFaq = (id: string) => {
    setOpenFaqMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const q = searchQuery.trim().toLowerCase();
  const filteredFaqs = homepageFaqItems.filter((item) => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    if (!matchCat) return false;
    if (!q) return true;
    const matchQ = item.question.toLowerCase().includes(q);
    const matchA = item.answer.toLowerCase().includes(q);
    const matchH = item.highlights?.some((h) => h.toLowerCase().includes(q)) ?? false;
    const matchK = item.keywords?.some((k) => k.toLowerCase().includes(q)) ?? false;
    return matchQ || matchA || matchH || matchK;
  });

  const expandAll = () => {
    const nextMap: Record<string, boolean> = {};
    filteredFaqs.forEach((item) => {
      nextMap[item.id] = true;
    });
    setOpenFaqMap(nextMap);
  };

  const collapseAll = () => {
    setOpenFaqMap({});
  };

  return (
    <div className="luxury-agreement-page" style={{ paddingTop: "76px" }}>
      {/* ─── 1. HERO BANNER ─── */}
      <section className="mockup-agr-hero">
        <div className="mockup-container">
          <div className="mockup-agr-hero__inner">
            <div className="mockup-agr-hero__tag">
              <Sparkles size={14} aria-hidden="true" />
              <span>HELLO STAY 官方常見問題知識庫</span>
            </div>
            <h1 className="mockup-agr-hero__title">常見問題與服務指南</h1>
            <p className="mockup-agr-hero__subtitle">
              整理旅客最常詢問的 30 題包棟住宿、預訂流程、中島廚房、麻將設備、進退房與改期規則。即時搜尋與分類解答，讓您的家族與好友出遊規劃更安心。
            </p>

            {/* 四大速覽亮點卡 */}
            <div className="mockup-agr-hero__metrics">
              <div className="mockup-agr-hero__metric-card">
                <div className="mockup-agr-hero__metric-icon">
                  <DoorClosed size={18} aria-hidden="true" />
                </div>
                <div className="mockup-agr-hero__metric-body">
                  <span className="mockup-agr-hero__metric-label">包棟原則</span>
                  <span className="mockup-agr-hero__metric-val">一組客人專屬獨享</span>
                </div>
              </div>

              <div className="mockup-agr-hero__metric-card">
                <div className="mockup-agr-hero__metric-icon">
                  <Clock size={18} aria-hidden="true" />
                </div>
                <div className="mockup-agr-hero__metric-body">
                  <span className="mockup-agr-hero__metric-label">進退房時間</span>
                  <span className="mockup-agr-hero__metric-val">16:00 入住・11:00 退房</span>
                </div>
              </div>

              <div className="mockup-agr-hero__metric-card">
                <div className="mockup-agr-hero__metric-icon">
                  <CreditCard size={18} aria-hidden="true" />
                </div>
                <div className="mockup-agr-hero__metric-body">
                  <span className="mockup-agr-hero__metric-label">訂金與改期</span>
                  <span className="mockup-agr-hero__metric-val">全額預收・一年內保留</span>
                </div>
              </div>

              <div className="mockup-agr-hero__metric-card">
                <div className="mockup-agr-hero__metric-icon">
                  <ShieldCheck size={18} aria-hidden="true" />
                </div>
                <div className="mockup-agr-hero__metric-body">
                  <span className="mockup-agr-hero__metric-label">合法登記</span>
                  <span className="mockup-agr-hero__metric-val">合法民宿 131/163 號</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. MAIN CONTENT (Search + Tabs + FAQ List) ─── */}
      <section className="mockup-agr-content">
        <div className="mockup-container">
          {/* 搜尋與快選區塊 */}
          <div className="mockup-faq__controls" style={{ marginBottom: "24px" }}>
            {/* 搜尋框 */}
            <div className="mockup-faq__search-wrap">
              <Search size={18} className="mockup-faq__search-icon" aria-hidden="true" />
              <input
                type="text"
                className="mockup-faq__search-input"
                placeholder="輸入關鍵字搜尋（例：密碼鎖、中島、麻將、押金、停車、寵物、改期...）"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="搜尋常見問題"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="mockup-faq__search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="清除搜尋"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* 熱門關鍵字快選 Chips */}
            <div className="mockup-faq__quick-chips">
              <span className="mockup-faq__chips-label">熱門關鍵字：</span>
              {quickChips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  className={`mockup-faq__chip-btn ${
                    searchQuery === chip.search && activeCategory === chip.category
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(chip.category);
                    setSearchQuery(chip.search);
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* 分類 Tabs */}
            <div className="mockup-faq__categories">
              <button
                type="button"
                className={`mockup-faq__cat-btn ${activeCategory === "all" ? "is-active" : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                全部問題
                <span className="mockup-faq__cat-count">{homepageFaqItems.length}</span>
              </button>
              {faqCategories.map((cat) => {
                const count = homepageFaqItems.filter((item) => item.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`mockup-faq__cat-btn ${activeCategory === cat.id ? "is-active" : ""}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.label}
                    <span className="mockup-faq__cat-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 狀態列與批次展開按鈕 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--mockup-muted)" }}>
              共找到 <strong style={{ color: "var(--mockup-text)" }}>{filteredFaqs.length}</strong>{" "}
              則相關問題
              {searchQuery && `（搜尋關鍵字：「${searchQuery}」）`}
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={expandAll}
                className="mockup-btn--outline"
                style={{ padding: "6px 12px", fontSize: "0.78rem" }}
              >
                全部展開
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="mockup-btn--outline"
                style={{ padding: "6px 12px", fontSize: "0.78rem" }}
              >
                全部收合
              </button>
            </div>
          </div>

          {/* FAQ 問答列表 */}
          {filteredFaqs.length === 0 ? (
            <div
              className="mockup-agr-card"
              style={{ textAlign: "center", padding: "48px 24px" }}
            >
              <HelpCircle
                size={40}
                style={{ color: "var(--mockup-soft)", margin: "0 auto 12px" }}
              />
              <h3 style={{ fontSize: "1.15rem", margin: "0 0 8px", color: "var(--mockup-text)" }}>
                找不到符合「{searchQuery}」的常見問題
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--mockup-muted)", margin: "0 0 20px" }}>
                您可以嘗試切換其他關鍵字，或直接點擊下方按鈕由 LINE 客服專人為您即時解答。
              </p>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button
                  type="button"
                  className="mockup-btn mockup-btn--gold"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  重置搜尋條件
                </button>
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mockup-btn mockup-btn--line"
                >
                  <MessageSquare size={16} />
                  LINE 專人諮詢
                </a>
              </div>
            </div>
          ) : (
            <div className="mockup-faq__grid" style={{ gridTemplateColumns: "1fr" }}>
              {filteredFaqs.map((faq, index) => {
                const isOpen = !!openFaqMap[faq.id];
                return (
                  <article
                    key={faq.id}
                    id={faq.id}
                    className={`mockup-faq__card ${isOpen ? "is-open" : ""}`}
                  >
                    <h3 className="mockup-faq__question">
                      <button
                        type="button"
                        className="mockup-faq__summary"
                        onClick={() => toggleFaq(faq.id)}
                        aria-expanded={isOpen}
                      >
                        <span className="mockup-faq__summary-text mockup-faq__summary-text--question">
                          <span className="mockup-faq__num">Q{index + 1}.</span>
                          <span className="mockup-faq__question-title">{faq.question}</span>
                        </span>
                        <span
                          className={`mockup-faq__chevron ${isOpen ? "is-open" : ""}`}
                          aria-hidden="true"
                        >
                          <ChevronDown size={18} />
                        </span>
                      </button>
                    </h3>

                    {isOpen && (
                      <div className="mockup-faq__body">
                        <p className="mockup-faq__answer">{faq.answer}</p>
                        {faq.highlights && faq.highlights.length > 0 && (
                          <div className="mockup-faq__highlights">
                            {faq.highlights.map((tag) => (
                              <span key={tag} className="mockup-faq__badge">
                                <CheckCircle2 size={12} aria-hidden="true" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {/* ─── 3. 專屬法律與住宿須知導流 ─── */}
          <div
            className="mockup-agr-card"
            style={{ marginTop: "32px", background: "#fbf9f4", borderColor: "rgba(194,155,97,0.3)" }}
          >
            <div className="mockup-agr-contact-box" style={{ margin: 0, padding: 0, background: "transparent", border: "none" }}>
              <div>
                <strong style={{ fontSize: "1.05rem" }}>需要查閱完整定型化合約與賠償標準？</strong>
                <p>
                  我們已完整公開依法登記之定型化住宿守則、損壞賠償價目表、連住房務收費標準與雙方權益保障條款。
                </p>
              </div>
              <div className="mockup-agr-contact-actions">
                <Link href="/agreement" className="mockup-btn mockup-btn--outline">
                  <FileCheck2 size={16} />
                  定型化住宿守則
                </Link>
                <Link href="/book" className="mockup-btn mockup-btn--gold">
                  <CalendarCheck size={16} />
                  即時查空房
                </Link>
              </div>
            </div>
          </div>

          {/* ─── 4. BOTTOM CTA BANNER ─── */}
          <aside className="mockup-agr-bottom-cta">
            <div className="mockup-agr-bottom-cta__inner">
              <div>
                <h2 className="mockup-agr-bottom-cta__title">還有其他特殊需求或包棟客製疑問？</h2>
                <p className="mockup-agr-bottom-cta__desc">
                  我們提供 1 對 1 專人即時諮詢服務，協助您規劃家族聚會、求婚迎娶、公司團建或長住優惠。
                </p>
              </div>
              <div className="mockup-agr-bottom-cta__actions">
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mockup-btn mockup-btn--line"
                >
                  <MessageSquare size={16} aria-hidden="true" />
                  LINE 官方專人客服
                </a>
                <a
                  href="tel:0932828922"
                  className="mockup-btn mockup-btn--outline-light"
                >
                  <PhoneCall size={16} aria-hidden="true" />
                  電話諮詢 0932-828-922
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
