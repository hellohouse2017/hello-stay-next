import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CarTaxiFront,
  CircleParking,
  ExternalLink,
  MapPin,
  TramFront,
  TrainFrontTunnel,
  type LucideIcon,
} from "lucide-react";
import ShowcaseImageLightbox from "./ShowcaseImageLightbox";

type ShowcaseText = string | string[];

export type ShowcaseAction = {
  href: string;
  label: string;
  external?: boolean;
};

export type ShowcaseStat = {
  label: string;
  value: string;
};

export type ShowcaseImage = {
  src: string;
  alt: string;
};

export type ShowcaseOverviewCard = {
  id: string;
  kicker: string;
  title: string;
  summary: ShowcaseText;
  image?: ShowcaseImage;
  href?: string;
  linkLabel?: string | null;
};

export type ShowcaseDetailGroup = {
  title: string;
  items: string[];
};

export type ShowcaseDetailCard = {
  id: string;
  kicker: string;
  title: string;
  description: ShowcaseText;
  image?: ShowcaseImage;
  specs: ShowcaseStat[];
  groups: ShowcaseDetailGroup[];
  action?: ShowcaseAction;
};

export type ShowcaseGalleryItem = ShowcaseImage & {
  caption: string;
};

export type ShowcaseFaqItem = {
  question: string;
  answer: ShowcaseText;
  links?: ShowcaseAction[];
};

export type ShowcaseLocationSpot = {
  name: string;
  detail: string;
  href?: string;
};

type ShowcaseSectionHead = {
  kicker: string;
  title: string;
  intro?: ShowcaseText;
};

type ShowcaseLocation = ShowcaseSectionHead & {
  id?: string;
  cardTitle: string;
  address: string;
  description: ShowcaseText;
  image?: ShowcaseImage;
  imageLabel?: string;
  mapUrl?: string;
  mapLabel?: string;
  spots: ShowcaseLocationSpot[];
};

type ShowcaseFinal = {
  kicker: string;
  title: string;
  body?: ShowcaseText;
  navLabel?: string;
  primaryAction: ShowcaseAction;
  secondaryAction?: ShowcaseAction;
};

export type PropertyShowcasePageProps = {
  hero: {
    status?: string;
    kicker: string;
    title: string;
    lead: ShowcaseText;
    image: ShowcaseImage;
    stats: ShowcaseStat[];
    primaryAction: ShowcaseAction;
    secondaryAction?: ShowcaseAction;
  };
  overview: ShowcaseSectionHead & {
    cards: ShowcaseOverviewCard[];
    columns?: number;
  };
  details: ShowcaseSectionHead & {
    cards: ShowcaseDetailCard[];
    factsTitle: string;
    facts: ShowcaseStat[];
    guidesTitle: string;
    guides: string[];
    fitTitle: string;
    fit: ShowcaseStat[];
  };
  gallery?: ShowcaseSectionHead & {
    images: ShowcaseGalleryItem[];
    columns?: number;
  };
  faq?: ShowcaseSectionHead & {
    items: ShowcaseFaqItem[];
  };
  location?: ShowcaseLocation;
  final?: ShowcaseFinal;
};

function TextLines({ text }: { text?: ShowcaseText }) {
  if (!hasShowcaseText(text)) return null;
  if (!Array.isArray(text)) return text;

  return text.map((line, index) => (
    <span className="showcase-text-line" key={`${line}-${index}`}>
      {line}
    </span>
  ));
}

function hasShowcaseText(text?: ShowcaseText) {
  if (Array.isArray(text)) return text.length > 0;
  return Boolean(text);
}

const showcaseVisuals: Record<string, { mark: string; Icon: LucideIcon }> = {
  "traffic-mrt": { mark: "O2", Icon: TramFront },
  "traffic-hsr": { mark: "左營", Icon: TrainFrontTunnel },
  "traffic-parking": { mark: "P", Icon: CircleParking },
  "traffic-dropoff": { mark: "巷口", Icon: CarTaxiFront },
};

function ShowcaseVisual({ id, label }: { id: string; label: string }) {
  const visual = showcaseVisuals[id] ?? { mark: "HS", Icon: MapPin };
  const Icon = visual.Icon;

  return (
    <div className="showcase-visual" aria-label={`${label}圖示`}>
      <span className="showcase-visual__rule showcase-visual__rule--top" />
      <span className="showcase-visual__rule showcase-visual__rule--bottom" />
      <span className="showcase-visual__mark">{visual.mark}</span>
      <span className="showcase-visual__icon">
        <Icon size={42} strokeWidth={1.15} aria-hidden="true" />
      </span>
      <span className="showcase-visual__label">{label}</span>
    </div>
  );
}

const pageStyles = String.raw`
.showcase-page {
  --ink: #121413;
  --text: #343c37;
  --muted: #68736d;
  --line: #e4e2d8;
  --paper: #f8f6f0;
  --card: #ffffff;
  --accent: #c29b61;
  --accent-dark: #a88047;
  --accent-soft: #f3ecdf;
  --overview-columns: 5;
  --overview-columns-tablet: 3;
  --overview-columns-mobile: 2;
  --gallery-columns: 5;
  --gallery-columns-tablet: 3;
  --gallery-columns-mobile: 2;
  padding-bottom: 96px;
  background: var(--paper);
  color: var(--ink);
  font-family: inherit;
}

.showcase-page * {
  box-sizing: border-box;
}

.showcase-page a {
  text-decoration: none;
}

.showcase-text-line {
  display: block;
}

.showcase-shell {
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;
}

.showcase-kicker {
  margin: 0;
  color: var(--accent-dark);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.showcase-pill {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 34px;
  padding: 0 16px;
  border-radius: 999px;
  background: rgba(18, 20, 19, 0.85);
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1;
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.showcase-hero {
  padding-top: calc(var(--nav-h) + 24px);
}

.showcase-hero__frame {
  position: relative;
  min-height: min(760px, calc(100vh - var(--nav-h) - 36px));
  overflow: hidden;
  border-radius: 20px;
  background: #121413;
  box-shadow: 0 24px 54px -12px rgba(18, 20, 19, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.showcase-hero__media {
  position: absolute;
  inset: 0;
}

.showcase-hero__media::after {
  position: absolute;
  inset: 0;
  content: "";
  background:
    linear-gradient(90deg, rgba(18, 17, 15, 0.78) 0%, rgba(18, 17, 15, 0.44) 44%, rgba(18, 17, 15, 0.14) 76%),
    linear-gradient(0deg, rgba(18, 17, 15, 0.2), rgba(18, 17, 15, 0.04));
}

.showcase-hero__media img,
.showcase-overview-card__image img,
.showcase-detail-card__media img,
.showcase-gallery__image img {
  object-fit: cover;
}

.showcase-hero__content {
  position: relative;
  z-index: 2;
  display: grid;
  align-content: end;
  min-height: min(760px, calc(100vh - var(--nav-h) - 36px));
  padding: clamp(32px, 5vw, 64px);
}

.showcase-hero__copy {
  display: grid;
  gap: 22px;
  width: min(700px, 100%);
}

.showcase-hero__copy .showcase-kicker {
  color: rgba(236, 244, 236, 0.9);
}

.showcase-hero h1 {
  margin: 0;
  color: #fffaf2;
  font-size: clamp(2.55rem, 4.35vw, 4.75rem);
  font-weight: 780;
  line-height: 1.06;
  letter-spacing: 0;
  line-break: strict;
  text-wrap: balance;
}

.showcase-hero__lead {
  margin: 0;
  color: rgba(255, 250, 242, 0.86);
  font-size: 1.05rem;
  line-height: 1.9;
  line-break: strict;
  text-wrap: pretty;
}

.showcase-actions,
.showcase-final__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.showcase-button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 24px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 600;
  backdrop-filter: blur(14px);
  transition: all 0.25s ease;
  white-space: nowrap;
}

.showcase-button:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.showcase-button--primary {
  border-color: var(--accent);
  background: var(--accent);
  color: #121413;
  box-shadow: 0 4px 14px rgba(194, 155, 97, 0.35);
  font-weight: 700;
}

.showcase-button--primary:hover {
  background: #d4ae72;
  border-color: #d4ae72;
  box-shadow: 0 8px 24px rgba(194, 155, 97, 0.45);
}

.showcase-hero__stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  width: 100%;
  margin-top: 36px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(18px);
}

.showcase-hero__stats article {
  display: grid;
  gap: 6px;
  min-width: 0;
  padding: 18px 20px;
  background: rgba(18, 20, 19, 0.65);
}

.showcase-hero__stats span {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.76rem;
  font-weight: 600;
  line-height: 1.45;
  white-space: nowrap;
}

.showcase-hero__stats strong {
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.45;
  white-space: nowrap;
}

.showcase-inpage-nav {
  position: sticky;
  top: var(--nav-h);
  z-index: 20;
  border-top: 1px solid rgba(18, 20, 19, 0.08);
  border-bottom: 1px solid var(--line);
  background: rgba(248, 246, 240, 0.94);
  backdrop-filter: blur(16px);
}

.showcase-inpage-nav__inner {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 52px;
  overflow-x: auto;
  scrollbar-width: none;
}

.showcase-inpage-nav__inner::-webkit-scrollbar { display: none; }

.showcase-inpage-nav a {
  flex: 0 0 auto;
  padding: 8px 16px;
  border-radius: 999px;
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.showcase-inpage-nav a:hover,
.showcase-inpage-nav a:focus-visible {
  background: var(--accent-soft);
  color: var(--accent-dark);
}

.showcase-section {
  padding-top: 84px;
}

.showcase-section__head {
  display: grid;
  gap: 10px;
  max-width: 820px;
  margin-bottom: 28px;
}

.showcase-section__head h2 {
  margin: 0;
  color: var(--ink);
  font-family: var(--serif, serif);
  font-size: clamp(1.8rem, 2.55vw, 2.55rem);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
  word-break: normal;
  text-wrap: balance;
}

.showcase-section__head p {
  margin: 0;
  color: var(--muted);
  font-size: 0.96rem;
  line-height: 1.7;
  word-break: normal;
  text-wrap: pretty;
}

.showcase-overview-grid {
  display: grid;
  grid-template-columns: repeat(var(--overview-columns), minmax(0, 1fr));
  gap: 20px;
}

.showcase-overview-card {
  display: grid;
  gap: 14px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(18, 20, 19, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.showcase-overview-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(18, 20, 19, 0.08);
  border-color: rgba(194, 155, 97, 0.4);
}

.showcase-overview-card__image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border-radius: 12px;
  background: #e8e6dd;
}

.showcase-visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 182px;
  overflow: hidden;
  border: 1px solid rgba(194, 155, 97, 0.2);
  border-radius: 12px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 246, 240, 0.9)),
    repeating-linear-gradient(90deg, transparent 0 54px, rgba(194, 155, 97, 0.08) 55px 56px);
  color: var(--accent);
}

.showcase-visual::before,
.showcase-visual::after {
  position: absolute;
  content: "";
  pointer-events: none;
}

.showcase-visual::before {
  width: 180%;
  height: 1px;
  background: rgba(194, 155, 97, 0.2);
  transform: rotate(-26deg);
}

.showcase-visual::after {
  width: 180%;
  height: 1px;
  background: rgba(168, 128, 71, 0.28);
  transform: rotate(26deg);
}

.showcase-visual__rule {
  position: absolute;
  left: 18px;
  width: 34px;
  height: 1px;
  background: rgba(194, 155, 97, 0.42);
}

.showcase-visual__rule--top {
  top: 20px;
}

.showcase-visual__rule--bottom {
  right: 18px;
  bottom: 20px;
  left: auto;
  background: rgba(168, 128, 71, 0.66);
}

.showcase-visual__mark {
  position: absolute;
  top: 16px;
  right: 18px;
  color: rgba(18, 20, 19, 0.4);
  font-family: var(--serif, Georgia, serif);
  font-size: 0.76rem;
  letter-spacing: 0.14em;
}

.showcase-visual__icon {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 78px;
  height: 78px;
  border: 1px solid rgba(194, 155, 97, 0.35);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 12px 28px rgba(18, 20, 19, 0.08);
}

.showcase-visual__label {
  position: absolute;
  right: 18px;
  bottom: 16px;
  color: var(--accent-dark);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.showcase-overview-card__body {
  display: grid;
  gap: 8px;
}

.showcase-overview-card__body span {
  color: var(--accent-dark);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.showcase-overview-card__body strong {
  color: var(--ink);
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.4;
  word-break: normal;
  text-wrap: balance;
}

.showcase-overview-card__body p,
.showcase-overview-card__link {
  margin: 0;
  color: var(--muted);
  font-size: 0.86rem;
  line-height: 1.6;
  word-break: normal;
}

.showcase-overview-card__link {
  color: var(--accent-dark);
  font-weight: 700;
}

.showcase-detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) 340px;
  gap: 28px;
  align-items: start;
}

.showcase-detail-stack {
  display: grid;
  gap: 24px;
}

.showcase-detail-card {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 0;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--card);
  box-shadow: 0 16px 40px -10px rgba(18, 20, 19, 0.06);
  scroll-margin-top: calc(var(--nav-h) + 28px);
}

.showcase-detail-card__media {
  position: relative;
  min-height: 260px;
  background: #e8e6dd;
}

.showcase-detail-card__media .showcase-visual {
  height: 100%;
  min-height: 260px;
  border: 0;
  border-radius: 0;
}

.showcase-detail-card__body {
  display: grid;
  gap: 16px;
  align-content: start;
  padding: 26px 28px;
}

.showcase-detail-card__head {
  display: grid;
  gap: 6px;
}

.showcase-detail-card__head span {
  color: var(--accent-dark);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.showcase-detail-card__head h3 {
  margin: 0;
  color: var(--ink);
  font-family: var(--serif, serif);
  font-size: 1.45rem;
  font-weight: 600;
  line-height: 1.28;
  word-break: normal;
  text-wrap: balance;
}

.showcase-detail-card__head p {
  margin: 0;
  color: var(--muted);
  font-size: 0.92rem;
  line-height: 1.7;
  word-break: normal;
  text-wrap: pretty;
}

.showcase-detail-card__specs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--line);
}

.showcase-detail-card__spec {
  display: grid;
  gap: 4px;
  min-width: 0;
  padding: 12px 14px;
  background: #faf8f3;
}

.showcase-detail-card__spec span,
.showcase-facts-card span,
.showcase-fit-card span,
.showcase-location-card span,
.showcase-location-list span {
  color: var(--muted);
  font-size: 0.74rem;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
}

.showcase-detail-card__spec strong,
.showcase-facts-card strong,
.showcase-fit-card strong,
.showcase-location-card strong,
.showcase-location-list strong {
  color: var(--ink);
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1.45;
}

.showcase-detail-card__groups {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.showcase-detail-card__footer {
  display: flex;
  justify-content: flex-start;
  margin-top: 6px;
}

.showcase-detail-card__footer .showcase-button {
  min-height: 42px;
  border-color: var(--line);
  background: #ffffff;
  color: var(--ink);
  backdrop-filter: none;
  font-size: 0.84rem;
  border: 1px solid var(--line);
}

.showcase-detail-card__footer .showcase-button:hover {
  background: var(--accent);
  color: #121413;
  border-color: var(--accent);
}

.showcase-group {
  display: grid;
  gap: 8px;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #ffffff;
}

.showcase-group h4 {
  margin: 0;
  color: var(--ink);
  font-size: 0.88rem;
  font-weight: 700;
  word-break: normal;
}

.showcase-group ul {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.showcase-group li {
  position: relative;
  padding-left: 14px;
  color: var(--muted);
  font-size: 0.84rem;
  line-height: 1.55;
  word-break: normal;
}

.showcase-group li::before {
  position: absolute;
  top: 0.58rem;
  left: 0;
  width: 5px;
  height: 5px;
  content: "";
  border-radius: 999px;
  background: var(--accent);
}

.showcase-side-stack {
  display: grid;
  gap: 18px;
  position: sticky;
  top: calc(var(--nav-h) + 24px);
}

.showcase-facts-card,
.showcase-fit-card,
.showcase-location-card,
.showcase-location-list,
.showcase-final {
  border: 1px solid var(--line);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(18, 20, 19, 0.05);
}

.showcase-facts-card,
.showcase-fit-card,
.showcase-location-card {
  padding: 22px;
}

.showcase-facts-card h3,
.showcase-fit-card h3,
.showcase-location-card h3 {
  margin: 0 0 14px;
  color: var(--ink);
  font-family: var(--serif, serif);
  font-size: 1.1rem;
  font-weight: 600;
  word-break: normal;
}

.showcase-facts-list,
.showcase-fit-list {
  display: grid;
  gap: 1px;
  overflow: hidden;
  border-radius: 12px;
  background: var(--line);
}

.showcase-facts-list article,
.showcase-fit-list article {
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  background: #ffffff;
}

.showcase-guides {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 18px;
}

.showcase-guides li {
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.65;
  word-break: normal;
}

.showcase-location-card p {
  margin: 0;
  color: var(--muted);
  font-size: 0.92rem;
  line-height: 1.75;
  word-break: normal;
  text-wrap: pretty;
}

.showcase-location-card__image-button {
  position: relative;
  display: block;
  width: 100%;
  margin-top: 14px;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #f8f6f0;
  aspect-ratio: 941 / 1672;
  cursor: zoom-in;
  text-decoration: none;
}

.showcase-location-card__image-button img {
  object-fit: contain;
}

.showcase-image-lightbox {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(18, 20, 19, 0.92);
  backdrop-filter: blur(14px);
}

.showcase-image-lightbox:target {
  display: flex;
}

.showcase-image-lightbox__backdrop {
  position: absolute;
  inset: 0;
}

.showcase-image-lightbox__content {
  position: relative;
  display: grid;
  gap: 12px;
  width: min(920px, 100%);
  max-height: 92vh;
}

.showcase-image-lightbox__close {
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 1;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  text-decoration: none;
  font-weight: 700;
}

.showcase-image-lightbox__frame {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: min(76vh, 1180px);
  border-radius: 14px;
  background: #f8f6f0;
}

.showcase-image-lightbox__frame img {
  object-fit: contain;
}

.showcase-image-lightbox__caption {
  margin: 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.88rem;
  text-align: center;
}

.showcase-location-card a {
  display: inline-flex;
  margin-top: 14px;
  color: var(--accent-dark);
  font-size: 0.9rem;
  font-weight: 700;
}

.showcase-location-list {
  display: grid;
  gap: 1px;
  overflow: hidden;
  background: var(--line);
  border-radius: 18px;
}

.showcase-location-list a {
  display: block;
  color: inherit;
  text-decoration: none;
}

.showcase-location-list a:hover article {
  background: #f9f7f2;
}

.showcase-location-list article {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  padding: 16px 20px;
  background: #ffffff;
}

.showcase-location-list__meta {
  display: grid;
  gap: 4px;
}

.showcase-location-list__cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  justify-self: start;
  padding: 8px 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: #faf8f3;
  color: var(--accent-dark);
  font-size: 0.82rem;
  font-weight: 700;
  white-space: nowrap;
}

.showcase-gallery {
  display: grid;
  grid-template-columns: repeat(var(--gallery-columns), minmax(0, 1fr));
  gap: 16px;
}

.showcase-gallery__item {
  display: grid;
  gap: 8px;
}

.showcase-gallery__image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border-radius: 14px;
  background: #e8e6dd;
  box-shadow: 0 10px 28px rgba(18, 20, 19, 0.05);
}

.showcase-gallery__item figcaption {
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 600;
}

.showcase-faq-list {
  display: grid;
  gap: 12px;
}

.showcase-faq-item {
  display: grid;
  gap: 10px;
  padding: 24px 28px;
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid var(--line);
  box-shadow: 0 4px 16px rgba(18, 20, 19, 0.03);
}

.showcase-faq-item h3 {
  margin: 0;
  color: var(--ink);
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.45;
  word-break: normal;
  text-wrap: balance;
}

.showcase-faq-item p {
  margin: 0;
  color: var(--muted);
  font-size: 0.92rem;
  line-height: 1.75;
  word-break: normal;
  text-wrap: pretty;
}

.showcase-faq-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
}

.showcase-faq-links .showcase-button {
  min-height: 40px;
  padding: 0 14px;
  border-color: var(--line);
  background: #f7f1e7;
  color: var(--ink);
  font-size: 0.85rem;
  backdrop-filter: none;
}

.showcase-final {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-top: 88px;
  padding: 40px 44px;
  background: #121413;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 24px 54px rgba(18, 20, 19, 0.25);
}

.showcase-final .showcase-kicker {
  color: var(--accent);
}

.showcase-final h2 {
  margin: 0 0 12px;
  color: #ffffff;
  font-family: var(--serif, serif);
  font-size: clamp(1.7rem, 2.65vw, 2.35rem);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
  word-break: normal;
  text-wrap: balance;
}

.showcase-final p {
  margin: 0;
  color: rgba(255, 250, 242, 0.78);
  font-size: 0.96rem;
  line-height: 1.75;
  line-break: strict;
  text-wrap: pretty;
}

.showcase-final .showcase-button {
  border-color: rgba(255, 255, 255, 0.22);
}

.showcase-final__actions {
  justify-content: flex-end;
  align-self: center;
}

.showcase-final .showcase-button {
  width: auto;
  min-width: 154px;
}

@media (max-width: 1180px) {
  .showcase-overview-grid {
    grid-template-columns: repeat(var(--overview-columns-tablet), minmax(0, 1fr));
  }

  .showcase-gallery {
    grid-template-columns: repeat(var(--gallery-columns-tablet), minmax(0, 1fr));
  }
}

@media (max-width: 1024px) {
  .showcase-hero__stats,
  .showcase-detail-card__specs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .showcase-detail-layout {
    grid-template-columns: 1fr;
  }

  .showcase-side-stack {
    position: static;
  }

  .showcase-detail-card {
    grid-template-columns: 260px minmax(0, 1fr);
  }
}

@media (max-width: 820px) {
  .showcase-shell {
    width: calc(100% - 28px);
  }

  .showcase-hero__frame,
  .showcase-hero__content {
    min-height: 620px;
  }

  .showcase-overview-grid {
    grid-template-columns: repeat(var(--overview-columns-mobile), minmax(0, 1fr));
  }

  .showcase-gallery {
    grid-template-columns: repeat(var(--gallery-columns-mobile), minmax(0, 1fr));
  }

  .showcase-detail-card {
    grid-template-columns: 1fr;
  }

  .showcase-detail-card__media {
    min-height: 240px;
  }

  .showcase-final {
    display: grid;
  }
}

@media (max-width: 640px) {
  .showcase-inpage-nav__inner {
    gap: 0;
    scroll-padding-inline: 14px;
  }

  .showcase-inpage-nav a {
    padding: 7px 6px;
    font-size: 0.7rem;
  }

  .showcase-hero {
    padding-top: calc(var(--nav-h) + 14px);
  }

  .showcase-hero__frame,
  .showcase-hero__content {
    min-height: 560px;
  }

  .showcase-hero__content {
    padding: 22px;
  }

  .showcase-hero h1 {
    font-size: 2.3rem;
    line-height: 1.12;
  }

  .showcase-hero__lead {
    font-size: 0.98rem;
    line-height: 1.75;
  }

  .showcase-hero__stats,
  .showcase-overview-grid,
  .showcase-detail-card__specs,
  .showcase-detail-card__groups,
  .showcase-gallery {
    grid-template-columns: 1fr;
  }

  .showcase-section {
    padding-top: 68px;
  }

  .showcase-location-list article {
    grid-template-columns: 1fr;
  }

  .showcase-button,
  .showcase-final .showcase-button {
    width: 100%;
  }

  .showcase-actions,
  .showcase-final__actions {
    display: grid;
  }
}
`;

function ShowcaseActionButton({ action, primary = false }: { action: ShowcaseAction; primary?: boolean }) {
  const className = primary ? "showcase-button showcase-button--primary" : "showcase-button";

  if (action.external) {
    return (
      <a className={className} href={action.href} target="_blank" rel="noreferrer">
        {action.label}
      </a>
    );
  }

  return (
    <Link className={className} href={action.href}>
      {action.label}
    </Link>
  );
}

export default function PropertyShowcasePage({
  hero,
  overview,
  details,
  gallery,
  faq,
  location,
  final,
}: PropertyShowcasePageProps) {
  const overviewColumns = overview.columns ?? 5;
  const galleryColumns = gallery?.columns ?? 5;

  const pageVariables = {
    ["--overview-columns" as string]: String(overviewColumns),
    ["--overview-columns-tablet" as string]: String(Math.min(overviewColumns, 3)),
    ["--overview-columns-mobile" as string]: String(Math.min(overviewColumns, 2)),
    ["--gallery-columns" as string]: String(galleryColumns),
    ["--gallery-columns-tablet" as string]: String(Math.min(galleryColumns, 3)),
    ["--gallery-columns-mobile" as string]: String(Math.min(galleryColumns, 2)),
  } as CSSProperties;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <div className="showcase-page luxury-showcase" style={pageVariables}>
        <section className="showcase-hero">
          <div className="showcase-shell">
            <div className="showcase-hero__frame">
              <div className="showcase-hero__media">
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt}
                  fill
                  priority
                  loading="eager"
                  fetchPriority="high"
                  unoptimized
                  sizes="100vw"
                />
              </div>

              <div className="showcase-hero__content">
                <div className="showcase-hero__copy">
                  {hero.status ? <p className="showcase-pill">{hero.status}</p> : null}
                  <p className="showcase-kicker">{hero.kicker}</p>
                  <h1>{hero.title}</h1>
                  <p className="showcase-hero__lead"><TextLines text={hero.lead} /></p>

                  <div className="showcase-actions">
                    <ShowcaseActionButton action={hero.primaryAction} primary />
                    {hero.secondaryAction ? <ShowcaseActionButton action={hero.secondaryAction} /> : null}
                  </div>
                </div>

                <div className="showcase-hero__stats">
                  {hero.stats.map((item) => (
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

        <nav className="showcase-inpage-nav" aria-label="館內導覽">
          <div className="showcase-shell showcase-inpage-nav__inner">
            <a href="#showcase-overview">空間總覽</a>
            <a href="#showcase-details">房型與設備</a>
            {gallery ? <a href="#showcase-gallery">實景照片</a> : null}
            {faq ? <a href="#showcase-faq">常見問題</a> : null}
            {location ? <a href="#showcase-location">交通位置</a> : null}
            {final ? <a href="#showcase-final">{final.navLabel || "查空房"}</a> : null}
          </div>
        </nav>

        <section className="showcase-section" id="showcase-overview">
          <div className="showcase-shell">
            <div className="showcase-section__head">
              <p className="showcase-kicker">{overview.kicker}</p>
              <h2>{overview.title}</h2>
              {hasShowcaseText(overview.intro) ? <p><TextLines text={overview.intro} /></p> : null}
            </div>

              <div className="showcase-overview-grid">
                {overview.cards.map((card) => (
                <a className="showcase-overview-card" href={card.href ?? `#${card.id}`} key={card.id}>
                  {card.image ? (
                    <div className="showcase-overview-card__image">
                      <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1180px) 33vw, 20vw"
                      />
                    </div>
                  ) : (
                    <ShowcaseVisual id={card.id} label={card.kicker} />
                  )}

                  <div className="showcase-overview-card__body">
                    <span>{card.kicker}</span>
                    <strong>{card.title}</strong>
                    <p><TextLines text={card.summary} /></p>
                    {card.linkLabel !== null ? (
                      <span className="showcase-overview-card__link">{card.linkLabel ?? "查看重點"}</span>
                    ) : null}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="showcase-section" id="showcase-details">
          <div className="showcase-shell">
            <div className="showcase-section__head">
              <p className="showcase-kicker">{details.kicker}</p>
              <h2>{details.title}</h2>
              {hasShowcaseText(details.intro) ? <p><TextLines text={details.intro} /></p> : null}
            </div>

            <div className="showcase-detail-layout">
              <div className="showcase-detail-stack">
                {details.cards.map((card) => (
                  <article className="showcase-detail-card" id={card.id} key={card.id}>
                    <div className="showcase-detail-card__media">
                      {card.image ? (
                        <Image
                          src={card.image.src}
                          alt={card.image.alt}
                          fill
                          unoptimized
                          sizes="(max-width: 820px) 100vw, 320px"
                        />
                      ) : (
                        <ShowcaseVisual id={card.id} label={card.kicker} />
                      )}
                    </div>

                    <div className="showcase-detail-card__body">
                      <div className="showcase-detail-card__head">
                        <span>{card.kicker}</span>
                        <h3>{card.title}</h3>
                        <p><TextLines text={card.description} /></p>
                      </div>

                      <div className="showcase-detail-card__specs">
                        {card.specs.map((spec) => (
                          <article className="showcase-detail-card__spec" key={`${card.id}-${spec.label}`}>
                            <span>{spec.label}</span>
                            <strong>{spec.value}</strong>
                          </article>
                        ))}
                      </div>

                      <div className="showcase-detail-card__groups">
                        {card.groups.map((group) => (
                          <section className="showcase-group" key={`${card.id}-${group.title}`}>
                            <h4>{group.title}</h4>
                            <ul>
                              {group.items.map((item) => (
                                <li key={`${group.title}-${item}`}>{item}</li>
                              ))}
                            </ul>
                          </section>
                        ))}
                      </div>

                      {card.action ? (
                        <div className="showcase-detail-card__footer">
                          <ShowcaseActionButton action={card.action} />
                        </div>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>

              <aside className="showcase-side-stack">
                <section className="showcase-facts-card">
                  <h3>{details.factsTitle}</h3>
                  <div className="showcase-facts-list">
                    {details.facts.map((item) => (
                      <article key={item.label}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="showcase-facts-card">
                  <h3>{details.guidesTitle}</h3>
                  <ul className="showcase-guides">
                    {details.guides.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className="showcase-fit-card">
                  <h3>{details.fitTitle}</h3>
                  <div className="showcase-fit-list">
                    {details.fit.map((item) => (
                      <article key={item.label}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </article>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </section>

        {gallery ? (
          <section className="showcase-section" id="showcase-gallery">
            <div className="showcase-shell">
              <div className="showcase-section__head">
                <p className="showcase-kicker">{gallery.kicker}</p>
                <h2>{gallery.title}</h2>
                {hasShowcaseText(gallery.intro) ? <p><TextLines text={gallery.intro} /></p> : null}
              </div>

              <div className="showcase-gallery">
                {gallery.images.map((image) => (
                  <figure className="showcase-gallery__item" key={image.src}>
                    <div className="showcase-gallery__image">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1180px) 33vw, 20vw"
                      />
                    </div>
                    <figcaption>{image.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {faq ? (
          <section className="showcase-section" id="showcase-faq">
            <div className="showcase-shell">
              <div className="showcase-section__head">
                <p className="showcase-kicker">{faq.kicker}</p>
                <h2>{faq.title}</h2>
                {hasShowcaseText(faq.intro) ? <p><TextLines text={faq.intro} /></p> : null}
              </div>

              <div className="showcase-faq-list">
                {faq.items.map((item) => (
                  <article className="showcase-faq-item" key={item.question}>
                    <h3>{item.question}</h3>
                    <p><TextLines text={item.answer} /></p>
                    {item.links?.length ? (
                      <div className="showcase-faq-links">
                        {item.links.map((link) => (
                          <a
                            className="showcase-button"
                            href={link.href}
                            key={`${item.question}-${link.label}`}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noreferrer" : undefined}
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {location ? (
          <section className="showcase-section" id={location.id ?? "showcase-location"}>
            <div className="showcase-shell">
              <div className="showcase-section__head">
                <p className="showcase-kicker">{location.kicker}</p>
                <h2>{location.title}</h2>
                {hasShowcaseText(location.intro) ? <p><TextLines text={location.intro} /></p> : null}
              </div>

              <div className="showcase-detail-layout">
                <section className="showcase-location-card">
                  <h3>{location.cardTitle}</h3>
                  <strong>{location.address}</strong>
                  <p><TextLines text={location.description} /></p>
                  {location.image ? <ShowcaseImageLightbox image={location.image} label={location.imageLabel ?? location.cardTitle} /> : null}
                  {location.mapUrl ? (
                    <a href={location.mapUrl} target="_blank" rel="noreferrer">
                      {location.mapLabel ?? "在 Google Maps 開啟"}
                    </a>
                  ) : null}
                </section>

                <div className="showcase-location-list">
                  {location.spots.map((spot) => (
                    spot.href ? (
                      <a
                        href={spot.href}
                        key={`${spot.name}-${spot.detail}`}
                        target="_blank"
                        rel="noreferrer"
                        title={`${spot.name} Google Maps`}
                        aria-label={`${spot.name} Google Maps`}
                      >
                        <article>
                          <div className="showcase-location-list__meta">
                            <span>{spot.name}</span>
                            <strong>{spot.detail}</strong>
                          </div>
                          <span className="showcase-location-list__cta">
                            <ExternalLink size={14} aria-hidden="true" />
                            Google Maps
                          </span>
                        </article>
                      </a>
                    ) : (
                      <article key={`${spot.name}-${spot.detail}`}>
                        <span>{spot.name}</span>
                        <strong>{spot.detail}</strong>
                      </article>
                    )
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {final ? (
          <section className="showcase-final showcase-shell" id="showcase-final">
            <div>
              <p className="showcase-kicker">{final.kicker}</p>
              <h2>{final.title}</h2>
              {hasShowcaseText(final.body) ? <p><TextLines text={final.body} /></p> : null}
            </div>

            <div className="showcase-final__actions">
              <ShowcaseActionButton action={final.primaryAction} primary />
              {final.secondaryAction ? <ShowcaseActionButton action={final.secondaryAction} /> : null}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
