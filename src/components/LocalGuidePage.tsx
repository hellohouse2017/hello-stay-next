import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenText, MapPin, Navigation, Utensils } from "lucide-react";
import type { LocalGuideSection } from "@/data/local-guides";

type LocalGuidePageProps = {
  kind: "food" | "spots";
  eyebrow: string;
  title: string;
  lead: string;
  image: { src: string; alt: string };
  facts: { label: string; value: string }[];
  sections: LocalGuideSection[];
  primaryAction: { href: string; label: string };
};

export default function LocalGuidePage({
  kind,
  eyebrow,
  title,
  lead,
  image,
  facts,
  sections,
  primaryAction,
}: LocalGuidePageProps) {
  const Icon = kind === "food" ? Utensils : MapPin;

  return (
    <div className="local-guide-page">
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
            <Link className="local-guide-button" href={primaryAction.href}>
              {primaryAction.label} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="local-guide-content">
        <div className="local-guide-shell">
          <div className="local-guide-section-heading">
            <p className="local-guide-kicker">LOCAL PICKS</p>
            <h2>依類型找你需要的內容</h2>
            <p>地點名稱已整理成可直接開啟 Google Maps 的連結，營業時間請以當日公告為準。</p>
          </div>

          <div className="local-guide-sections">
            {sections.map((section) => (
              <section
                className="local-guide-section"
                id={section.kicker.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}
                key={section.title}
              >
                <div className="local-guide-section__head">
                  <div>
                    <p className="local-guide-kicker">{section.kicker}</p>
                    <h3>{section.title}</h3>
                  </div>
                  <p>{section.intro}</p>
                </div>
                <div className="local-guide-items">
                  {section.items.map((item) => (
                    <article className="local-guide-item" key={item.name}>
                      <div className="local-guide-item__title">
                        <h4>{item.name}</h4>
                        <span><MapPin size={14} aria-hidden="true" /> {item.meta}</span>
                      </div>
                      <p>{item.detail}</p>
                      <div className="local-guide-item__actions">
                        {item.articleSlug ? (
                          <Link className="local-guide-item__article" href={`/blog/${item.articleSlug}`}>
                            <BookOpenText size={14} aria-hidden="true" />
                            閱讀分享
                          </Link>
                        ) : null}
                        <a
                          className="local-guide-item__map"
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.mapQuery)}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`前往 ${item.name} 的 Google Maps 導航`}
                        >
                          <Navigation size={14} aria-hidden="true" />
                          Google Maps 導航
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="local-guide-note">
            <div>
              <p className="local-guide-kicker">HELLO STAY</p>
              <h2>先選生活圈，再選房型</h2>
              <p>住在鹽埕，白天可以步行出門，晚上回館休息或聚會。</p>
            </div>
            <Link className="local-guide-button local-guide-button--dark" href="/book">
              查空房與報價 <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
