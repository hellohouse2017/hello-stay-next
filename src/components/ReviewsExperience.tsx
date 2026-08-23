"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  ExternalLink,
  Users,
  Sparkles,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Building2,
  MessageCircle,
} from "lucide-react";
import {
  reviewStats,
  reviewDimensions,
  reviewFilterOccasions,
  verifiedReviews,
  reviewSpotlights,
  reviewFaqs,
} from "@/data/reviews-data";

export default function ReviewsExperience() {
  const [propertyFilter, setPropertyFilter] = useState<"all" | "hellohouse" | "godin">("all");
  const [occasionFilter, setOccasionFilter] = useState<string>("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // 篩選評價
  const filteredReviews = useMemo(() => {
    return verifiedReviews.filter((review) => {
      const matchProperty =
        propertyFilter === "all" || review.property === propertyFilter;
      const matchOccasion =
        occasionFilter === "all" || review.occasion === occasionFilter;
      return matchProperty && matchOccasion;
    });
  }, [propertyFilter, occasionFilter]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="reviews-root">
      {/* 頂部 Hero 信任看板 */}
      <section className="reviews-hero">
        <div className="reviews-container">
          <div className="reviews-hero__badge">
            <ShieldCheck size={16} className="reviews-hero__badge-icon" />
            <span>Google 商家 4.9 ★★★★★ 真實口碑認證</span>
          </div>

          <h1 className="reviews-hero__title">
            住客真實評價與入住回饋
          </h1>

          <p className="reviews-hero__desc">
            彙整 200+ 則 Google 商家五星好評與多組家庭、好友聚會、迎娶團隊的真實入住故事。
            不說空泛形容詞，讓真實住客告訴你空間有多好用、生活圈有多方便。
          </p>

          {/* 綜合數據總覽卡 */}
          <div className="reviews-summary-card">
            <div className="reviews-summary-main">
              <div className="reviews-summary-score">
                <span className="reviews-summary-number">{reviewStats.averageRating}</span>
                <div className="reviews-summary-stars">
                  <div className="reviews-stars-row">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={22} className="reviews-star-filled" />
                    ))}
                  </div>
                  <span className="reviews-summary-count">
                    累積 {reviewStats.totalReviews} 則真實住客五星滿意
                  </span>
                </div>
              </div>

              <div className="reviews-summary-trust">
                <div className="reviews-trust-pill">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>住客推薦率 {reviewStats.recommendRate}</span>
                </div>
                <div className="reviews-trust-pill">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>全套房獨立衛浴・絕不鎖房</span>
                </div>
              </div>

              <a
                href={reviewStats.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="reviews-google-btn"
              >
                <span>在 Google 地圖查看即時評價</span>
                <ExternalLink size={15} />
              </a>
            </div>

            {/* 四大體驗指標 */}
            <div className="reviews-dimensions-grid">
              {reviewDimensions.map((dim, index) => (
                <div key={index} className="reviews-dim-card">
                  <div className="reviews-dim-header">
                    <span className="reviews-dim-label">{dim.label}</span>
                    <strong className="reviews-dim-score">{dim.score}</strong>
                  </div>
                  <div className="reviews-dim-bar-bg">
                    <div
                      className="reviews-dim-bar-fill"
                      style={{ width: `${(parseFloat(dim.score) / 5) * 100}%` }}
                    />
                  </div>
                  <p className="reviews-dim-desc">{dim.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 互動篩選器與真實住客卡片區 */}
      <section className="reviews-feed-section" id="reviews-list">
        <div className="reviews-container">
          <div className="reviews-feed-header">
            <div className="reviews-feed-title-wrap">
              <span className="reviews-section-kicker">REAL GUEST EXPERIENCES</span>
              <h2 className="reviews-section-title">依你的聚會需求，看真實住客怎麼說</h2>
              <p className="reviews-section-subtitle">
                點選館別或入住情境，快速尋找與你相似的團體出遊經驗
              </p>
            </div>

            {/* 館別 Tab 切換 */}
            <div className="reviews-property-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={propertyFilter === "all"}
                className={`reviews-tab ${propertyFilter === "all" ? "reviews-tab--active" : ""}`}
                onClick={() => setPropertyFilter("all")}
              >
                全部館別 ({verifiedReviews.length})
              </button>
              <button
                role="tab"
                aria-selected={propertyFilter === "hellohouse"}
                className={`reviews-tab ${propertyFilter === "hellohouse" ? "reviews-tab--active" : ""}`}
                onClick={() => setPropertyFilter("hellohouse")}
              >
                你好哇寓所 (8-26人・中島聚會)
              </button>
              <button
                role="tab"
                aria-selected={propertyFilter === "godin"}
                className={`reviews-tab ${propertyFilter === "godin" ? "reviews-tab--active" : ""}`}
                onClick={() => setPropertyFilter("godin")}
              >
                溝頂民宿 (4-12人・獨棟分層)
              </button>
            </div>

            {/* 情境 Filter Pills */}
            <div className="reviews-occasion-filters">
              {reviewFilterOccasions.map((occ) => (
                <button
                  key={occ.id}
                  className={`reviews-pill ${occasionFilter === occ.id ? "reviews-pill--active" : ""}`}
                  onClick={() => setOccasionFilter(occ.id)}
                >
                  {occ.label}
                </button>
              ))}
            </div>
          </div>

          {/* 評價卡片列表 */}
          {filteredReviews.length === 0 ? (
            <div className="reviews-empty">
              <Sparkles size={36} className="reviews-empty-icon" />
              <p>目前篩選條件下無特定標籤評價，歡迎切換其他情境查看！</p>
              <button
                className="reviews-empty-btn"
                onClick={() => {
                  setPropertyFilter("all");
                  setOccasionFilter("all");
                }}
              >
                查看全部真實評價
              </button>
            </div>
          ) : (
            <div className="reviews-grid">
              {filteredReviews.map((review) => (
                <article key={review.id} className="review-card">
                  <div className="review-card__header">
                    <div className="review-card__user">
                      <div className="review-card__avatar">
                        {review.author.slice(0, 1)}
                      </div>
                      <div>
                        <div className="review-card__name-row">
                          <strong className="review-card__name">{review.author}</strong>
                          {review.verifiedGoogle && (
                            <span className="review-card__verified" title="Google 商家驗證好評">
                              <CheckCircle2 size={13} className="text-emerald-600" />
                              <span>Google 驗證</span>
                            </span>
                          )}
                        </div>
                        {review.authorTitle && (
                          <span className="review-card__author-title">
                            {review.authorTitle}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="review-card__stay-info">
                      <span className="review-card__property-badge">
                        <Building2 size={12} />
                        {review.propertyName}
                      </span>
                    </div>
                  </div>

                  <div className="review-card__stars-row">
                    <div className="reviews-stars-row">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} className="reviews-star-filled" />
                      ))}
                    </div>
                    <span className="review-card__date">{review.date}</span>
                  </div>

                  <h3 className="review-card__title">「{review.title}」</h3>

                  <blockquote className="review-card__content">
                    {review.content}
                  </blockquote>

                  <div className="review-card__tags">
                    {review.highlights.map((tag, i) => (
                      <span key={i} className="review-card__tag">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="review-card__meta">
                    <span className="review-card__meta-item">
                      <Users size={13} />
                      {review.groupSize}（{review.stayType}）
                    </span>
                    <span className="review-card__meta-item">
                      <Sparkles size={13} />
                      {review.occasionLabel}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 口碑實景對照區：照片 + 真實住客金句 */}
      <section className="reviews-spotlight-section">
        <div className="reviews-container">
          <div className="reviews-spotlight-head">
            <span className="reviews-section-kicker">PHOTO & GUEST SPOTLIGHT</span>
            <h2 className="reviews-section-title">住客最常誇獎的 4 大空間亮點</h2>
            <p className="reviews-section-subtitle">
              將住客好評中的真實回饋，直接對照實景設施與空間細節
            </p>
          </div>

          <div className="reviews-spotlight-grid">
            {reviewSpotlights.map((spotlight) => (
              <div key={spotlight.id} className="spotlight-card">
                <div className="spotlight-card__media">
                  <Image
                    src={spotlight.image.src}
                    alt={spotlight.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="spotlight-card__img"
                  />
                  <div className="spotlight-card__overlay-tag">
                    {spotlight.property}
                  </div>
                </div>

                <div className="spotlight-card__body">
                  <span className="spotlight-card__subtitle">{spotlight.subtitle}</span>
                  <h3 className="spotlight-card__title">{spotlight.title}</h3>
                  <blockquote className="spotlight-card__quote">
                    {spotlight.quote}
                  </blockquote>
                  <cite className="spotlight-card__author">— {spotlight.author}</cite>

                  <div className="spotlight-card__tags">
                    {spotlight.tags.map((tag, i) => (
                      <span key={i} className="spotlight-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={spotlight.href} className="spotlight-card__link">
                    <span>{spotlight.actionLabel}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 住客真實顧慮解答 FAQ */}
      <section className="reviews-faq-section">
        <div className="reviews-container reviews-faq-container">
          <div className="reviews-faq-head">
            <span className="reviews-section-kicker">HONEST FAQ</span>
            <h2 className="reviews-section-title">預訂前的真實顧慮與解答</h2>
            <p className="reviews-section-subtitle">
              不講官話，針對隔音、爬樓梯、烹飪備品、周邊停車等客人最常詢問的細節誠懇說明
            </p>
          </div>

          <div className="reviews-faq-list">
            {reviewFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`reviews-faq-item ${isOpen ? "reviews-faq-item--open" : ""}`}
                >
                  <button
                    className="reviews-faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={`reviews-faq-arrow ${isOpen ? "reviews-faq-arrow--rotated" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="reviews-faq-answer">
                      <p>{faq.answer}</p>
                      {faq.tip && (
                        <div className="reviews-faq-tip">
                          <Sparkles size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{faq.tip}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 底端高轉換 CTA */}
      <section className="reviews-cta-section">
        <div className="reviews-container">
          <div className="reviews-cta-box">
            <span className="reviews-cta-kicker">READY TO PLAN YOUR STAY?</span>
            <h2 className="reviews-cta-title">找到適合你們的聚會空間了嗎？</h2>
            <p className="reviews-cta-desc">
              包棟絕不鎖房・全套房獨立衛浴・鹽埕駁二步行生活圈。
              歡迎直接比對兩館配置，或加 LINE 由管家為您即時確認空房與報價。
            </p>

            <div className="reviews-cta-actions">
              <Link href="/compare" className="reviews-btn reviews-btn--outline">
                <span>比較兩館人數與房型</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/book" className="reviews-btn reviews-btn--primary">
                <span>即時試算房價與查空房</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://lin.ee/atCiMQw"
                target="_blank"
                rel="noopener noreferrer"
                className="reviews-btn reviews-btn--line"
              >
                <MessageCircle size={16} />
                <span>LINE 專人快速諮詢</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 頁面專屬 CSS 樣式 */}
      <style jsx>{`
        .reviews-root {
          --ink: #171918;
          --text: #343c37;
          --muted: #667069;
          --line: #e6e4dc;
          --bg-soft: #fbf9f4;
          --bg-card: #ffffff;
          --accent: #c29b61;
          --accent-dark: #9e753b;
          --accent-soft: #f4ecdf;
          --pri: #1d6b5f;
          --pri-dark: #144f46;
          padding-top: calc(var(--nav-h, 88px) + 20px);
          padding-bottom: 96px;
          background: #f6f4ef;
          color: var(--ink);
          font-family: inherit;
        }

        .reviews-container {
          width: min(1200px, calc(100% - 40px));
          margin: 0 auto;
        }

        .reviews-hero {
          padding: 24px 0 48px;
        }

        .reviews-hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          background: #eef7f2;
          color: #1a6b4d;
          font-size: 0.82rem;
          font-weight: 700;
          margin-bottom: 16px;
          border: 1px solid rgba(26, 107, 77, 0.18);
        }

        .reviews-hero__title {
          margin: 0 0 14px;
          font-size: clamp(2rem, 3.4vw, 3rem);
          font-weight: 800;
          line-height: 1.2;
          color: var(--ink);
          letter-spacing: -0.02em;
        }

        .reviews-hero__desc {
          margin: 0 0 32px;
          max-width: 780px;
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--muted);
        }

        /* 總結卡片 */
        .reviews-summary-card {
          display: grid;
          grid-template-columns: 360px minmax(0, 1fr);
          gap: 28px;
          padding: 32px;
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid var(--line);
          box-shadow: 0 16px 40px -12px rgba(18, 20, 19, 0.06);
        }

        .reviews-summary-main {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-right: 28px;
          border-right: 1px solid var(--line);
        }

        .reviews-summary-score {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .reviews-summary-number {
          font-size: 3.8rem;
          font-weight: 900;
          line-height: 1;
          color: var(--ink);
          font-family: var(--serif, Georgia, serif);
        }

        .reviews-summary-stars {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .reviews-stars-row {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .reviews-star-filled {
          fill: #f59e0b;
          color: #f59e0b;
        }

        .reviews-summary-count {
          font-size: 0.84rem;
          color: var(--muted);
          font-weight: 600;
        }

        .reviews-summary-trust {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 24px;
        }

        .reviews-trust-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #2e3832;
        }

        .reviews-google-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 18px;
          border-radius: 10px;
          background: #f4f6f8;
          color: #1f2937;
          font-size: 0.88rem;
          font-weight: 700;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .reviews-google-btn:hover {
          background: #e5e7eb;
          color: #111827;
          transform: translateY(-1px);
        }

        .reviews-dimensions-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .reviews-dim-card {
          padding: 16px;
          border-radius: 12px;
          background: #faf8f4;
          border: 1px solid rgba(230, 228, 220, 0.7);
        }

        .reviews-dim-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .reviews-dim-label {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--ink);
        }

        .reviews-dim-score {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--accent-dark);
        }

        .reviews-dim-bar-bg {
          width: 100%;
          height: 6px;
          border-radius: 999px;
          background: #e8e5dc;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .reviews-dim-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #d4ae72, #c29b61);
          border-radius: 999px;
        }

        .reviews-dim-desc {
          margin: 0;
          font-size: 0.78rem;
          line-height: 1.45;
          color: var(--muted);
        }

        /* 評價列表區 */
        .reviews-feed-section {
          padding: 48px 0 64px;
        }

        .reviews-feed-header {
          margin-bottom: 32px;
        }

        .reviews-section-kicker {
          display: block;
          color: var(--accent-dark);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .reviews-section-title {
          margin: 0 0 8px;
          font-size: clamp(1.6rem, 2.4vw, 2.2rem);
          font-weight: 800;
          color: var(--ink);
          letter-spacing: -0.01em;
        }

        .reviews-section-subtitle {
          margin: 0 0 24px;
          font-size: 0.95rem;
          color: var(--muted);
        }

        .reviews-property-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--line);
        }

        .reviews-tab {
          padding: 10px 20px;
          border-radius: 999px;
          background: #ffffff;
          border: 1px solid var(--line);
          color: var(--muted);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .reviews-tab:hover {
          color: var(--ink);
          border-color: #c5c2b6;
        }

        .reviews-tab--active {
          background: var(--ink);
          color: #ffffff !important;
          border-color: var(--ink);
        }

        .reviews-occasion-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .reviews-pill {
          padding: 7px 14px;
          border-radius: 8px;
          background: #eae7dd;
          border: 1px solid transparent;
          color: #4b554e;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .reviews-pill:hover {
          background: #ded9cd;
          color: #171918;
        }

        .reviews-pill--active {
          background: var(--accent);
          color: #171918 !important;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(194, 155, 97, 0.3);
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .review-card {
          display: flex;
          flex-direction: column;
          padding: 28px;
          border-radius: 18px;
          background: #ffffff;
          border: 1px solid var(--line);
          box-shadow: 0 8px 24px -6px rgba(18, 20, 19, 0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .review-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px -8px rgba(18, 20, 19, 0.08);
          border-color: rgba(194, 155, 97, 0.4);
        }

        .review-card__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .review-card__user {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .review-card__avatar {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1d6b5f, #124d44);
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 800;
        }

        .review-card__name-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .review-card__name {
          font-size: 0.98rem;
          font-weight: 800;
          color: var(--ink);
        }

        .review-card__verified {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          padding: 2px 7px;
          border-radius: 999px;
          background: #eef7f2;
          color: #1a6b4d;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .review-card__author-title {
          display: block;
          font-size: 0.78rem;
          color: var(--muted);
          margin-top: 1px;
        }

        .review-card__property-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 6px;
          background: #f4ecdf;
          color: var(--accent-dark);
          font-size: 0.76rem;
          font-weight: 700;
        }

        .review-card__stars-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .review-card__date {
          font-size: 0.78rem;
          color: #88928b;
        }

        .review-card__title {
          margin: 0 0 10px;
          font-size: 1.1rem;
          font-weight: 750;
          line-height: 1.4;
          color: var(--ink);
        }

        .review-card__content {
          margin: 0 0 16px;
          font-size: 0.92rem;
          line-height: 1.75;
          color: #3b443e;
          flex-grow: 1;
        }

        .review-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }

        .review-card__tag {
          padding: 3px 8px;
          border-radius: 4px;
          background: #f1efe8;
          color: #555f58;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .review-card__meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid #f0eee8;
          font-size: 0.78rem;
          color: var(--muted);
        }

        .review-card__meta-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .reviews-empty {
          text-align: center;
          padding: 64px 20px;
          background: #ffffff;
          border-radius: 16px;
          border: 1px dashed var(--line);
        }

        .reviews-empty-icon {
          color: var(--accent);
          margin-bottom: 12px;
        }

        .reviews-empty-btn {
          margin-top: 14px;
          padding: 10px 22px;
          border-radius: 999px;
          background: var(--ink);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          border: none;
        }

        /* 實景對照區 */
        .reviews-spotlight-section {
          padding: 64px 0;
          background: #ede9df;
        }

        .reviews-spotlight-head {
          margin-bottom: 36px;
        }

        .reviews-spotlight-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 28px;
        }

        .spotlight-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 18px;
          background: #ffffff;
          border: 1px solid #ddd9cd;
          box-shadow: 0 12px 30px -10px rgba(18, 20, 19, 0.08);
        }

        .spotlight-card__media {
          position: relative;
          aspect-ratio: 16 / 10;
          width: 100%;
        }

        .spotlight-card__img {
          object-fit: cover;
        }

        .spotlight-card__overlay-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          padding: 4px 12px;
          border-radius: 999px;
          background: rgba(18, 20, 19, 0.85);
          color: #ffffff;
          font-size: 0.76rem;
          font-weight: 700;
          backdrop-filter: blur(8px);
        }

        .spotlight-card__body {
          display: flex;
          flex-direction: column;
          padding: 24px;
          flex-grow: 1;
        }

        .spotlight-card__subtitle {
          font-size: 0.76rem;
          font-weight: 800;
          color: var(--accent-dark);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 4px;
        }

        .spotlight-card__title {
          margin: 0 0 10px;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--ink);
        }

        .spotlight-card__quote {
          margin: 0 0 6px;
          font-size: 0.92rem;
          line-height: 1.65;
          color: #3e4741;
          font-style: italic;
        }

        .spotlight-card__author {
          font-size: 0.78rem;
          color: var(--muted);
          margin-bottom: 16px;
          display: block;
        }

        .spotlight-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }

        .spotlight-card__tag {
          padding: 3px 9px;
          border-radius: 4px;
          background: #f4f2ea;
          color: #4e5751;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .spotlight-card__link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: auto;
          color: var(--pri);
          font-size: 0.86rem;
          font-weight: 750;
          text-decoration: none;
          transition: gap 0.2s ease;
        }

        .spotlight-card__link:hover {
          gap: 10px;
          color: var(--pri-dark);
        }

        /* FAQ 區塊 */
        .reviews-faq-section {
          padding: 72px 0 64px;
        }

        .reviews-faq-container {
          max-width: 860px;
        }

        .reviews-faq-head {
          margin-bottom: 32px;
          text-align: center;
        }

        .reviews-faq-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .reviews-faq-item {
          border-radius: 14px;
          background: #ffffff;
          border: 1px solid var(--line);
          overflow: hidden;
          transition: border-color 0.2s ease;
        }

        .reviews-faq-item--open {
          border-color: rgba(194, 155, 97, 0.5);
          box-shadow: 0 8px 20px -6px rgba(18, 20, 19, 0.05);
        }

        .reviews-faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          background: none;
          border: none;
          font-size: 1.02rem;
          font-weight: 750;
          color: var(--ink);
          text-align: left;
          cursor: pointer;
        }

        .reviews-faq-arrow {
          color: var(--muted);
          transition: transform 0.25s ease;
          flex-shrink: 0;
          margin-left: 16px;
        }

        .reviews-faq-arrow--rotated {
          transform: rotate(180deg);
          color: var(--accent-dark);
        }

        .reviews-faq-answer {
          padding: 0 24px 22px;
          font-size: 0.92rem;
          line-height: 1.8;
          color: #404a44;
          border-top: 1px solid #f5f3ec;
          padding-top: 16px;
        }

        .reviews-faq-answer p {
          margin: 0;
        }

        .reviews-faq-tip {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 12px;
          padding: 10px 14px;
          border-radius: 8px;
          background: #fdf8ee;
          border: 1px solid #f3e6ce;
          font-size: 0.84rem;
          color: #8c6117;
          line-height: 1.5;
        }

        /* 底部 CTA */
        .reviews-cta-section {
          padding: 32px 0 16px;
        }

        .reviews-cta-box {
          text-align: center;
          padding: 54px 36px;
          border-radius: 24px;
          background: linear-gradient(135deg, #171918 0%, #252c28 100%);
          color: #ffffff;
          box-shadow: 0 24px 50px -12px rgba(18, 20, 19, 0.2);
        }

        .reviews-cta-kicker {
          display: block;
          color: #d4ae72;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .reviews-cta-title {
          margin: 0 0 14px;
          font-size: clamp(1.8rem, 2.8vw, 2.4rem);
          font-weight: 800;
          color: #ffffff;
        }

        .reviews-cta-desc {
          margin: 0 auto 32px;
          max-width: 620px;
          font-size: 0.98rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.78);
        }

        .reviews-cta-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
        }

        .reviews-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
          padding: 0 24px;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.22s ease;
        }

        .reviews-btn--primary {
          background: #c29b61;
          color: #171918;
          box-shadow: 0 4px 14px rgba(194, 155, 97, 0.4);
        }

        .reviews-btn--primary:hover {
          background: #d4ae72;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(194, 155, 97, 0.5);
        }

        .reviews-btn--outline {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        .reviews-btn--outline:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .reviews-btn--line {
          background: #06c755;
          color: #ffffff;
        }

        .reviews-btn--line:hover {
          background: #05b34c;
          transform: translateY(-2px);
        }

        /* 響應式佈局適配 */
        @media (max-width: 900px) {
          .reviews-summary-card {
            grid-template-columns: 1fr;
          }
          .reviews-summary-main {
            padding-right: 0;
            border-right: none;
            padding-bottom: 24px;
            border-bottom: 1px solid var(--line);
          }
          .reviews-grid {
            grid-template-columns: 1fr;
          }
          .reviews-spotlight-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .reviews-dimensions-grid {
            grid-template-columns: 1fr;
          }
          .reviews-summary-score {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .reviews-summary-number {
            font-size: 3rem;
          }
          .reviews-cta-box {
            padding: 36px 20px;
          }
          .reviews-cta-actions {
            flex-direction: column;
          }
          .reviews-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
