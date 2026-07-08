import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import EquipmentGrid from "@/components/EquipmentGrid";
import LocationSection from "@/components/LocationSection";
import RoomGallery from "@/components/RoomGallery";
import type { NearbySpot, Room } from "@/data/properties";

type DetailCta = {
  href: string;
  label: string;
  external?: boolean;
};

type DetailStat = {
  label: string;
  value: string;
};

type DetailHighlight = {
  title: string;
  description: string;
};

type DetailProof = {
  title: string;
  body: string;
  meta?: string;
};

type DetailPlanning = {
  title: string;
  description: string;
};

type DetailDecision = {
  title: string;
  description: string;
};

type DetailEquipment = {
  label: string;
  value: string;
};

type DetailLocation = {
  propertyName: string;
  address: string;
  mapUrl: string;
  nearbySpots: NearbySpot[];
};

type DetailHeroImage = {
  src: string;
  alt: string;
};

export type PropertyDetailTemplateProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  stageLabel?: string;
  verdict: string;
  heroImage: DetailHeroImage;
  heroPrimaryCta: DetailCta;
  heroSecondaryCta?: DetailCta;
  heroStats: DetailStat[];
  roomsTitle: string;
  roomsIntro: string;
  equipmentTitle: string;
  equipmentItems: DetailEquipment[];
  decisionTitle: string;
  decisionIntro: string;
  decisionCards: DetailDecision[];
  overviewTitle: string;
  overviewBody: string;
  summaryCards: DetailStat[];
  highlightsTitle: string;
  highlights: DetailHighlight[];
  sectionTitle: string;
  sectionIntro: string;
  rooms?: Room[];
  planningCards?: DetailPlanning[];
  location?: DetailLocation;
  proofTitle: string;
  proofIntro?: string;
  proofItems: DetailProof[];
  finalTitle: string;
  finalBody: string;
  finalPrimaryCta: DetailCta;
  finalSecondaryCta?: DetailCta;
};

function DetailAction({ cta, primary = false }: { cta: DetailCta; primary?: boolean }) {
  const className = primary ? "pd-action pd-action--primary" : "pd-action";

  if (cta.external) {
    return (
      <a className={className} href={cta.href} target="_blank" rel="noreferrer">
        {cta.label}
      </a>
    );
  }

  return (
    <Link className={className} href={cta.href}>
      {cta.label}
    </Link>
  );
}

export default function PropertyDetailTemplate({
  eyebrow,
  title,
  subtitle,
  stageLabel,
  verdict,
  heroImage,
  heroPrimaryCta,
  heroSecondaryCta,
  heroStats,
  roomsTitle,
  roomsIntro,
  equipmentTitle,
  equipmentItems,
  decisionTitle,
  decisionIntro,
  decisionCards,
  overviewTitle,
  overviewBody,
  summaryCards,
  highlightsTitle,
  highlights,
  sectionTitle,
  sectionIntro,
  rooms,
  planningCards,
  location,
  proofTitle,
  proofIntro,
  proofItems,
  finalTitle,
  finalBody,
  finalPrimaryCta,
  finalSecondaryCta,
}: PropertyDetailTemplateProps) {
  return (
    <main className="pd-page">
      <section className="pd-hero">
        <div className="pd-hero__media">
          <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="(max-width: 960px) 100vw, 52vw" />
        </div>

        <div className="pd-hero__content">
          {stageLabel ? <p className="pd-stage">{stageLabel}</p> : null}
          <p className="pd-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="pd-hero__subtitle">{subtitle}</p>

          <div className="pd-hero__stats">
            {heroStats.map((item) => (
              <div key={`${item.label}-${item.value}`}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="pd-actions">
            <DetailAction cta={heroPrimaryCta} primary />
            {heroSecondaryCta ? <DetailAction cta={heroSecondaryCta} /> : null}
          </div>

          <div className="pd-verdict">
            <span>選館提醒</span>
            <strong>{verdict}</strong>
          </div>
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-room-overview">
          <div className="pd-section__head pd-section__head--compact">
            <p className="pd-eyebrow">房型與設備</p>
            <h2>{roomsTitle}</h2>
            <p>{roomsIntro}</p>
          </div>

          <div className="pd-room-overview__grid">
            <div className="pd-room-overview__rooms">
              <h3>房型</h3>
              {rooms?.length ? (
                <div className="pd-room-table">
                  {rooms.map((room) => (
                    <article key={room.id}>
                      {room.images[0] ? (
                        <div className="pd-room-table__image">
                          <Image src={room.images[0].src} alt={room.images[0].alt} width={236} height={177} sizes="(max-width: 768px) 96px, 118px" />
                        </div>
                      ) : null}
                      <div>
                        <span>{room.floor}</span>
                        <strong>{room.name}</strong>
                        <p>{room.size ? `${room.size} ` : ""}{room.capacity > 0 ? `${room.capacity} 人` : "公共空間"}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="pd-room-table">
                  {planningCards?.map((item) => (
                    <article key={item.title}>
                      <span>尚未開放訂房</span>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="pd-room-overview__equipment">
              <h3>{equipmentTitle}</h3>
              <div className="pd-equipment-list">
                {equipmentItems.map((item) => (
                  <article key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-decision">
          <div className="pd-section__head pd-section__head--compact">
            <p className="pd-eyebrow">適合誰</p>
            <h2>{decisionTitle}</h2>
            <p>{decisionIntro}</p>
          </div>

          <div className="pd-decision__grid">
            {decisionCards.map((item) => (
              <article className="pd-decision__card" key={item.title}>
                <div className="pd-decision__icon">
                  <CheckCircle2 size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-section__head">
          <p className="pd-eyebrow">館別總覽</p>
          <h2>{overviewTitle}</h2>
          <p>{overviewBody}</p>
        </div>

        <div className="pd-summary-grid">
          {summaryCards.map((item) => (
            <article className="pd-summary-card" key={`${item.label}-${item.value}`}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-section__head">
          <p className="pd-eyebrow">空間亮點</p>
          <h2>{highlightsTitle}</h2>
        </div>

        <div className="pd-highlight-grid">
          {highlights.map((item) => (
            <article className="pd-highlight-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-section__head">
          <p className="pd-eyebrow">{rooms?.length ? "房型與空間" : "規劃重點"}</p>
          <h2>{sectionTitle}</h2>
          <p>{sectionIntro}</p>
        </div>

        {rooms?.length ? (
          <div className="pd-room-list">
            {rooms.map((room, index) => (
              <article className={`room-detail-card${index % 2 === 1 ? " reverse" : ""}`} key={room.id}>
                <div className="room-detail-img">
                  <RoomGallery images={room.images} roomName={room.name} />
                </div>
                <div className="room-detail-info">
                  <div className="room-floor-tag">{room.floor}</div>
                  <h3>{room.name}</h3>
                  <p className="room-subtitle">{room.subtitle}</p>
                  <div className="room-badges">
                    {room.badges.map((badge) => (
                      <span className={`room-badge${badge.gold ? " gold" : ""}`} key={badge.label}>
                        {badge.label}
                      </span>
                    ))}
                  </div>
                  <EquipmentGrid categories={room.equipment} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="pd-planning-grid">
            {planningCards?.map((item) => (
              <article className="pd-planning-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      {location ? (
        <LocationSection
          propertyName={location.propertyName}
          address={location.address}
          mapUrl={location.mapUrl}
          nearbySpots={location.nearbySpots}
        />
      ) : null}

      <section className="pd-section">
        <div className="pd-section__head">
          <p className="pd-eyebrow">入住前確認</p>
          <h2>{proofTitle}</h2>
          {proofIntro ? <p>{proofIntro}</p> : null}
        </div>

        <div className="pd-proof-grid">
          {proofItems.map((item) => (
            <article className="pd-proof-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              {item.meta ? <span>{item.meta}</span> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="pd-final">
        <div>
          <p className="pd-eyebrow">下一步</p>
          <h2>{finalTitle}</h2>
          <p>{finalBody}</p>
        </div>
        <div className="pd-actions">
          <DetailAction cta={finalPrimaryCta} primary />
          {finalSecondaryCta ? <DetailAction cta={finalSecondaryCta} /> : null}
        </div>
      </section>
    </main>
  );
}
