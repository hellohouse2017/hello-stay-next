import React from "react";
import Image from "next/image";
import { MapPin, Navigation, ExternalLink, Sparkles } from "lucide-react";

export interface ConciergeSpotCardProps {
  name: string;
  badge?: string;
  signature?: string;
  detail?: string;
  address?: string;
  walkTime?: string;
  directMapUrl: string;
  image?: string;
  alt?: string;
}

export default function ConciergeSpotCard({
  name,
  badge,
  signature,
  detail,
  address,
  walkTime,
  directMapUrl,
  image,
  alt,
}: ConciergeSpotCardProps) {
  return (
    <article className="concierge-spot-card">
      {image && (
        <div className="concierge-spot-card__media">
          <Image
            src={image}
            alt={alt || name}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            className="concierge-spot-card__img"
          />
          {badge && (
            <span className="concierge-spot-card__badge">
              <Sparkles size={11} aria-hidden="true" />
              {badge}
            </span>
          )}
        </div>
      )}

      <div className="concierge-spot-card__body">
        <div className="concierge-spot-card__header">
          {!image && badge && (
            <span className="concierge-spot-card__badge concierge-spot-card__badge--inline">
              <Sparkles size={11} aria-hidden="true" />
              {badge}
            </span>
          )}
          <h3 className="concierge-spot-card__title">{name}</h3>
        </div>

        {signature && (
          <div className="concierge-spot-card__signature">
            <strong>私房必點：</strong>
            <span>{signature}</span>
          </div>
        )}

        {detail && <p className="concierge-spot-card__detail">{detail}</p>}

        <div className="concierge-spot-card__meta-row">
          {walkTime && (
            <span className="concierge-spot-card__walk">
              <MapPin size={13} aria-hidden="true" />
              {walkTime}
            </span>
          )}
          {address && (
            <span className="concierge-spot-card__address">{address}</span>
          )}
        </div>

        <div className="concierge-spot-card__actions">
          <a
            href={directMapUrl}
            target="_blank"
            rel="noreferrer"
            className="concierge-spot-card__map-btn"
            aria-label={`直接開啟 ${name} 的 Google Maps 地標頁面`}
          >
            <Navigation size={13} aria-hidden="true" />
            <span>Google 地圖地標</span>
            <ExternalLink size={11} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
