import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CalendarCheck,
  ExternalLink,
  MapPin,
  Navigation,
  Utensils,
  Sparkles,
} from "lucide-react";
import type { LocalGuideSection } from "@/data/local-guides";
import GuideShareToolbar from "./GuideShareToolbar";
import GuideReadingExperience from "./GuideReadingExperience";

type LocalGuideFaq = {
  question: string;
  answer: string;
};

type LocalGuideSource = {
  label: string;
  href: string;
};

type LocalGuideAction = {
  href: string;
  label: string;
};

type LocalGuidePageProps = {
  kind: "food" | "spots";
  eyebrow: string;
  title: string;
  lead: string;
  image: { src: string; alt: string };
  facts: { label: string; value: string }[];
  sections: LocalGuideSection[];
  secondarySections?: LocalGuideSection[];
  sectionHeading?: string;
  sectionLead?: string;
  directAnswer?: {
    title: string;
    body: string;
    checkedOn: string;
    sources: LocalGuideSource[];
  };
  faq?: LocalGuideFaq[];
  primaryAction: LocalGuideAction;
  noteActions?: LocalGuideAction[];
  contentBridgeId?: string;
};

function getSectionId(section: LocalGuideSection) {
  return section.kicker.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function GuideSections({ sections }: { sections: LocalGuideSection[] }) {
  return (
    <div className="local-guide-sections">
      {sections.map((section) => (
        <section className="local-guide-section" id={getSectionId(section)} key={section.title}>
          <div className="local-guide-section__head">
            <div>
              <p className="local-guide-kicker">{section.kicker}</p>
              <h3>{section.title}</h3>
            </div>
            <p>{section.intro}</p>
          </div>
          <div className="local-guide-items">
            {section.items.map((item) => (
              <article className="local-guide-item concierge-spot-card" key={item.name}>
                <div className="concierge-spot-card__header">
                  {item.badge && (
                    <span className="concierge-spot-card__badge">
                      <Sparkles size={11} aria-hidden="true" />
                      {item.badge}
                    </span>
                  )}
                  <h4 className="concierge-spot-card__title">{item.name}</h4>
                </div>

                {item.signature && (
                  <div className="concierge-spot-card__signature">
                    <strong>私房必點：</strong>
                    <span>{item.signature}</span>
                  </div>
                )}

                <p className="concierge-spot-card__detail">{item.detail}</p>

                <div className="concierge-spot-card__meta-row">
                  <span className="concierge-spot-card__walk">
                    <MapPin size={13} aria-hidden="true" /> {item.meta}
                  </span>
                </div>

                <div className="concierge-spot-card__actions">
                  {item.articleSlug ? (
                    <Link
                      className="local-guide-item__article"
                      href={`/blog/${item.articleSlug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        border: "1px solid #d4ddd7",
                        fontSize: "0.82rem",
                        color: "#17483d",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      <BookOpenText size={14} aria-hidden="true" />
                      推薦攻略
                    </Link>
                  ) : null}
                  <a
                    className="concierge-spot-card__map-btn"
                    href={
                      item.directMapUrl ||
                      `https://maps.google.com/?q=${encodeURIComponent(item.mapQuery)}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`直接開啟 ${item.name} 的 Google Maps 地標`}
                  >
                    <Navigation size={13} aria-hidden="true" />
                    Google 地圖地標
                    <ExternalLink size={11} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function LocalGuidePage({
  kind,
  eyebrow,
  title,
  lead,
  image,
  facts,
  sections,
  secondarySections = [],
  sectionHeading = "依類型找你需要的內容",
  sectionLead = "地點名稱已整理成可直接開啟 Google Maps 的地標連結，營業時間請以當日公告為準。",
  directAnswer,
  faq = [],
  primaryAction,
  noteActions,
  contentBridgeId,
}: LocalGuidePageProps) {
  const Icon = kind === "food" ? Utensils : MapPin;
  const allSections = [...sections, ...secondarySections];
  const finalActions = noteActions || [{ href: "/book", label: "查空房與報價" }];
  const allHighlights = sections.flatMap((s) => s.items.slice(0, 2).map((it) => `${it.name}（${it.meta}）`)).slice(0, 8);

  return (
    <div className="local-guide-page">
      <GuideReadingExperience
        title={title}
        description={lead}
        url={kind === "food" ? "/explore/food" : "/explore/spots"}
        highlights={allHighlights}
      />

      <section className="local-guide-hero">
        <div className="local-guide-shell local-guide-hero__grid">
          <div className="local-guide-hero__media">
            <Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 820px) 100vw, 52vw" />
          </div>
          <div className="local-guide-hero__content">
            <p className="local-guide-kicker"><Icon size={15} aria-hidden="true" /> {eyebrow}</p>
            <h1>{title}</h1>
            <p className="local-guide-hero__lead">{lead}</p>
            <div className="local-guide-facts" aria-label="頁面重點">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>
            <Link
              className="local-guide-button"
              href={primaryAction.href}
              data-content-bridge={contentBridgeId}
              data-content-bridge-target="primary"
            >
              {primaryAction.label} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="local-guide-content">
        <div className="local-guide-shell">
          {directAnswer ? (
            <section className="local-guide-answer" aria-labelledby="local-guide-answer-title">
              <p className="local-guide-kicker">QUICK ANSWER</p>
              <h2 id="local-guide-answer-title">{directAnswer.title}</h2>
              <p>{directAnswer.body}</p>
              <div className="local-guide-answer__verification">
                <span><CalendarCheck size={15} aria-hidden="true" /> 核對日期：{directAnswer.checkedOn}</span>
                {directAnswer.sources.map((source) => (
                  <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>
                    {source.label} <ExternalLink size={13} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          <nav className="local-guide-category-nav" aria-label="頁面分類導覽">
            {allSections.map((section) => (
              <a href={`#${getSectionId(section)}`} key={section.title}>{section.title}</a>
            ))}
          </nav>

          <div className="local-guide-section-heading">
            <p className="local-guide-kicker">HELLO STAY ｜ 精選推薦</p>
            <h2>{sectionHeading}</h2>
            <p>{sectionLead}</p>
          </div>

          <GuideSections sections={sections} />

          {secondarySections.length > 0 ? (
            <section className="local-guide-secondary" aria-labelledby="local-guide-secondary-title">
              <div className="local-guide-section-heading">
                <p className="local-guide-kicker">生活機能 ｜ 日常補給</p>
                <h2 id="local-guide-secondary-title">入住期間的生活補給</h2>
                <p>採買與洗衣保留為次要資訊，方便入住期間臨時補給，不納入美食推薦數量。</p>
              </div>
              <GuideSections sections={secondarySections} />
            </section>
          ) : null}

          {faq.length > 0 ? (
            <section className="local-guide-faq" aria-labelledby="local-guide-faq-title">
              <p className="local-guide-kicker">FAQ</p>
              <h2 id="local-guide-faq-title">常見問題</h2>
              <div className="local-guide-faq__items">
                {faq.map((item) => (
                  <article key={item.question}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {/* 底部大型同行友人分享卡片 */}
          <GuideShareToolbar
            title={title}
            description={lead}
            url={kind === "food" ? "/explore/food" : "/explore/spots"}
            highlights={allHighlights}
          />

          <div className="local-guide-note">
            <div>
              <p className="local-guide-kicker">Hello Stay</p>
              <h2>先選生活圈，再依人數選住宿</h2>
              <p>住在鹽埕，白天可以步行出門；回館前先比較人數、房型與公共空間。</p>
            </div>
            <div className="local-guide-note__actions">
              {finalActions.map((action) => (
                <Link
                  className="local-guide-button local-guide-button--dark"
                  href={action.href}
                  key={action.href}
                  data-content-bridge={contentBridgeId}
                  data-content-bridge-target={action.href}
                >
                  {action.label} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
