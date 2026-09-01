import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getAllArticles } from "@/lib/articles";
import { scheduledArticles, getPublishedArticles } from "@/data/scheduled-articles";
import { isPrunedBlogSlug } from "@/data/pruned-blog-slugs";
import GuideShareToolbar from "@/components/GuideShareToolbar";

export const metadata: Metadata = {
  title: "高雄包棟民宿怎麼選？情境、設備與交通整理",
  description:
    "把 Hello Stay 的攻略內容重排成更好理解的入口，直接依旅遊目的、設備需求與人數問題找文章。",
  alternates: { canonical: "https://www.hello-stay.com/blog" },
  openGraph: {
    title: "高雄包棟民宿怎麼選？情境、設備與交通整理",
    description: "從家族旅遊、企業團建、婚禮迎娶到廚房、麻將與交通，直接從需求切入。",
    url: "https://www.hello-stay.com/blog",
    images: [
      {
        url: "https://www.hello-stay.com/images/hellohouse/cover.webp",
        width: 1200,
        height: 630,
        alt: "Hello Stay 旅宿攻略",
      },
    ],
  },
};

type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  emoji: string;
  tags: string[];
};

type ArticleBucket = {
  id: string;
  kicker: string;
  title: string;
  intro: string;
  articleSlugs: string[];
};

const buckets: ArticleBucket[] = [
  {
    id: "bucket-scenarios",
    kicker: "旅遊情境",
    title: "依旅程找文章",
    intro: "如果你是在找這次旅程到底該怎麼安排 從情境入口切入會最快",
    articleSlugs: [
      "kaohsiung-cny-xinle-street-market",
      "kaohsiung-concert-stay-group",
      "kaohsiung-family-reunion",
      "kaohsiung-offsite-teambuilding",
      "kaohsiung-wedding-venue",
      "kaohsiung-group-trip",
    ],
  },
  {
    id: "bucket-features",
    kicker: "設備玩法",
    title: "找設備或玩法",
    intro: "很多客人不是先問哪一館，而是先問有沒有廚房、麻將、跨年空間或駁二步行圈。",
    articleSlugs: [
      "kaohsiung-kitchen-bnb",
      "kaohsiung-mahjong-stay",
      "kaohsiung-nye-stay",
      "pier2-accommodation",
    ],
  },
  {
    id: "bucket-practical",
    kicker: "實用資訊",
    title: "政策補助與交通指南",
    intro: "整理政府最新國旅補助方案、平日折抵規則、透明防坑攻略與無車自由行交通痛點，出發前看這篇最省心省預算。",
    articleSlugs: [
      "taiwan-travel-subsidy-guide",
      "taiwan-travel-subsidy-pricing-guide",
      "taiwan-travel-foreign-guide",
    ],
  },
  {
    id: "bucket-local-journal",
    kicker: "鹽埕實地分享",
    title: "從吃飯、散步到入住生活",
    intro: "用一條旅程把真實店家、景點、採買與洗衣串起來，先找到想去的地方，再回頭選住宿。",
    articleSlugs: [
      "yancheng-breakfast-guide",
      "yancheng-local-meals-guide",
      "yancheng-snacks-guide",
      "yancheng-dessert-drinks-guide",
      "yancheng-night-guide",
      "pier2-one-day-itinerary",
      "dagangqiao-attraction-guide",
      "yancheng-market-guide",
      "yancheng-port-arts-guide",
      "yancheng-shopping-laundry-guide",
      "yancheng-westbay-route-guide",
    ],
  },
];

const pageStyles = String.raw`
.blog-showcase {
  --ink: #1f1a16;
  --text: #5f584f;
  --muted: #8f8579;
  --line: #e6ddd0;
  --paper: #f6f1e8;
  --card: #fffdf9;
  --accent: #2d5a44;
  padding-bottom: 96px;
  background: linear-gradient(180deg, #f7f2ea 0%, #f4efe6 100%);
  color: var(--ink);
}

.blog-showcase * {
  box-sizing: border-box;
}

.blog-showcase a {
  text-decoration: none;
}

.blog-shell {
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
}

.blog-kicker {
  margin: 0;
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 760;
}

.blog-hero {
  padding-top: calc(var(--nav-h) + 24px);
}

.blog-hero__frame {
  position: relative;
  min-height: min(760px, calc(100vh - var(--nav-h) - 36px));
  overflow: hidden;
  border-radius: 8px;
  background: #25211d;
  box-shadow: 0 32px 84px rgba(31, 26, 22, 0.18);
}

.blog-hero__media,
.blog-featured__media,
.blog-card__media {
  position: absolute;
  inset: 0;
}

.blog-hero__media img,
.blog-featured__media img,
.blog-card__media img {
  object-fit: cover;
}

.blog-hero__media::after {
  position: absolute;
  inset: 0;
  content: "";
  background:
    linear-gradient(90deg, rgba(18, 17, 15, 0.8) 0%, rgba(18, 17, 15, 0.46) 46%, rgba(18, 17, 15, 0.18) 78%),
    linear-gradient(0deg, rgba(18, 17, 15, 0.2), rgba(18, 17, 15, 0.02));
}

.blog-hero__content {
  position: relative;
  z-index: 2;
  display: grid;
  align-content: end;
  min-height: min(760px, calc(100vh - var(--nav-h) - 36px));
  padding: clamp(32px, 5vw, 64px);
}

.blog-hero__copy {
  display: grid;
  gap: 22px;
  width: min(720px, 100%);
}

.blog-pill {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 250, 242, 0.94);
  font-size: 0.78rem;
  font-weight: 760;
  backdrop-filter: blur(14px);
}

.blog-hero .blog-kicker {
  color: rgba(236, 244, 236, 0.9);
}

.blog-hero h1 {
  margin: 0;
  color: #fffaf2;
  font-size: clamp(2.5rem, 4.3vw, 4.65rem);
  font-weight: 780;
  line-height: 1.06;
  line-break: strict;
  text-wrap: balance;
}

.blog-hero__lead {
  margin: 0;
  color: rgba(255, 250, 242, 0.86);
  font-size: 1.04rem;
  line-height: 1.9;
  line-break: strict;
  text-wrap: pretty;
}

.blog-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.blog-button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: #fffaf2;
  font-size: 0.92rem;
  font-weight: 760;
  backdrop-filter: blur(14px);
}

.blog-button--primary {
  border-color: rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.92);
  color: var(--ink);
}

.blog-hero__stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  width: 100%;
  margin-top: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(18px);
}

.blog-hero__stats article {
  display: grid;
  gap: 8px;
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.08);
}

.blog-hero__stats span {
  color: rgba(255, 250, 242, 0.7);
  font-size: 0.76rem;
  font-weight: 720;
  line-height: 1.45;
}

.blog-hero__stats strong {
  color: #fffaf2;
  font-size: 0.98rem;
  font-weight: 760;
  line-height: 1.55;
}

.blog-section {
  padding-top: 84px;
}

.blog-section__head {
  display: grid;
  gap: 12px;
  max-width: 840px;
  margin-bottom: 28px;
}

.blog-section__head h2 {
  margin: 0;
  font-size: clamp(1.8rem, 2.55vw, 2.55rem);
  line-height: 1.18;
  line-break: strict;
  text-wrap: balance;
}

.blog-section__head p {
  margin: 0;
  color: var(--text);
  font-size: 0.98rem;
  line-height: 1.8;
  line-break: strict;
  text-wrap: pretty;
}

.blog-featured {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) 340px;
  gap: 26px;
}

.blog-featured__main {
  position: relative;
  overflow: hidden;
  min-height: 420px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--card);
  box-shadow: 0 16px 42px rgba(31, 26, 22, 0.06);
}

.blog-featured__media {
  position: absolute;
  inset: 0;
}

.blog-featured__media::after {
  position: absolute;
  inset: 0;
  content: "";
  background:
    linear-gradient(180deg, rgba(16, 15, 14, 0.02) 0%, rgba(16, 15, 14, 0.62) 100%);
}

.blog-featured__body {
  position: relative;
  z-index: 2;
  display: grid;
  align-content: end;
  min-height: 420px;
  padding: 26px;
  gap: 14px;
}

.blog-featured__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.blog-date,
.blog-tag,
.blog-card__date,
.blog-card__tag {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 760;
}

.blog-date,
.blog-card__date {
  background: rgba(255, 255, 255, 0.16);
  color: #fffaf2;
}

.blog-tag,
.blog-card__tag {
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 250, 242, 0.86);
}

.blog-featured__body h3 {
  margin: 0;
  color: #fffaf2;
  font-size: clamp(1.65rem, 2.45vw, 2.35rem);
  line-height: 1.2;
  line-break: strict;
  text-wrap: balance;
}

.blog-featured__body p {
  margin: 0;
  max-width: 580px;
  color: rgba(255, 250, 242, 0.84);
  font-size: 0.94rem;
  line-height: 1.8;
  line-break: strict;
  text-wrap: pretty;
}

.blog-link {
  display: inline-flex;
  width: fit-content;
  color: var(--accent);
  font-size: 0.9rem;
  font-weight: 760;
}

.blog-featured__body .blog-link {
  color: #fffaf2;
}

.blog-side {
  display: grid;
  gap: 16px;
}

.blog-side-card {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255, 253, 249, 0.94);
  box-shadow: 0 14px 36px rgba(31, 26, 22, 0.05);
  padding: 20px;
}

.blog-side-card h3 {
  margin: 0 0 14px;
  font-size: 1rem;
  font-weight: 760;
  line-break: strict;
  text-wrap: balance;
}

.blog-side-list,
.blog-path-list {
  display: grid;
  gap: 1px;
  overflow: hidden;
  border-radius: 6px;
  background: var(--line);
}

.blog-side-list article,
.blog-path-list a {
  display: grid;
  gap: 6px;
  padding: 14px;
  background: #fffaf4;
}

.blog-side-list span,
.blog-path-list span,
.blog-card__tag-line {
  color: var(--muted);
  font-size: 0.76rem;
  font-weight: 720;
  line-height: 1.45;
}

.blog-side-list strong,
.blog-path-list strong {
  color: var(--ink);
  font-size: 0.96rem;
  font-weight: 760;
  line-height: 1.55;
  line-break: strict;
  text-wrap: balance;
}

.blog-buckets {
  display: grid;
  gap: 26px;
}

.blog-bucket {
  display: grid;
  gap: 18px;
}

.blog-bucket__head {
  display: grid;
  gap: 10px;
  max-width: 760px;
}

.blog-bucket__head h3 {
  margin: 0;
  font-size: 1.44rem;
  line-height: 1.28;
  line-break: strict;
  text-wrap: balance;
}

.blog-bucket__head p {
  margin: 0;
  color: var(--text);
  font-size: 0.94rem;
  line-height: 1.8;
  line-break: strict;
  text-wrap: pretty;
}

.blog-card-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.blog-card {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--card);
  box-shadow: 0 14px 36px rgba(31, 26, 22, 0.05);
}

.blog-card__media {
  position: relative;
  min-height: 200px;
  background: #e8dfd0;
}

.blog-card__body {
  display: grid;
  align-content: start;
  gap: 12px;
  padding: 18px;
}

.blog-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.blog-card__date {
  background: #efe5d7;
  color: var(--ink);
}

.blog-card__tag {
  background: #f5eee3;
  color: var(--text);
}

.blog-card h4 {
  margin: 0;
  font-size: 1.04rem;
  line-height: 1.45;
  line-break: strict;
  text-wrap: balance;
}

.blog-card p {
  margin: 0;
  color: var(--text);
  font-size: 0.88rem;
  line-height: 1.7;
  line-break: strict;
  text-wrap: pretty;
}

.blog-final {
  display: flex;
  justify-content: space-between;
  gap: 28px;
  margin-top: 88px;
  padding: 28px 30px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #1f1a16;
}

.blog-final .blog-kicker {
  color: rgba(228, 238, 228, 0.9);
}

.blog-final h2 {
  margin: 0 0 12px;
  color: #fffaf2;
  font-size: clamp(1.7rem, 2.65vw, 2.35rem);
  line-height: 1.2;
  line-break: strict;
  text-wrap: balance;
}

.blog-final p {
  margin: 0;
  color: rgba(255, 250, 242, 0.78);
  font-size: 0.96rem;
  line-height: 1.75;
  line-break: strict;
  text-wrap: pretty;
}

@media (max-width: 1024px) {
  .blog-hero__stats,
  .blog-card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .blog-featured {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 820px) {
  .blog-shell {
    width: calc(100% - 28px);
  }

  .blog-hero__frame,
  .blog-hero__content {
    min-height: 620px;
  }

  .blog-card {
    grid-template-columns: 1fr;
  }

  .blog-card__media {
    min-height: 220px;
  }

  .blog-final {
    display: grid;
  }
}

@media (max-width: 640px) {
  .blog-hero {
    padding-top: calc(var(--nav-h) + 14px);
  }

  .blog-hero__frame,
  .blog-hero__content {
    min-height: 560px;
  }

  .blog-hero__content {
    padding: 22px;
  }

  .blog-hero h1 {
    font-size: 2.28rem;
    line-height: 1.12;
  }

  .blog-hero__lead {
    font-size: 0.98rem;
    line-height: 1.75;
  }

  .blog-hero__stats,
  .blog-card-grid {
    grid-template-columns: 1fr;
  }

  .blog-section {
    padding-top: 68px;
  }

  .blog-button {
    width: 100%;
  }

  .blog-actions {
    display: grid;
  }
}
`;

function pickImage(article: ArticleSummary) {
  if (article.slug === "kaohsiung-cny-xinle-street-market") {
    return { src: "/images/hellohouse/party-cover.webp", alt: article.title };
  }
  if (article.slug === "kaohsiung-offsite-teambuilding") {
    return { src: "/images/hellohouse/business-cover.webp", alt: article.title };
  }
  if (article.slug === "kaohsiung-wedding-venue") {
    return { src: "/images/hellohouse/wedding-cover.webp", alt: article.title };
  }
  if (article.slug === "kaohsiung-family-reunion") {
    return { src: "/images/hellohouse/family-cover.webp", alt: article.title };
  }
  if (article.slug === "kaohsiung-kitchen-bnb") {
    return { src: "/images/hellohouse/photo2.webp", alt: article.title };
  }
  if (article.slug === "kaohsiung-mahjong-stay") {
    return { src: "/images/godin/room4.webp", alt: article.title };
  }
  if (article.slug === "pier2-accommodation") {
    return { src: "/images/hellohouse/photo5.webp", alt: article.title };
  }
  if (article.slug === "taiwan-travel-foreign-guide") {
    return { src: "/images/explore/harbor.webp", alt: article.title };
  }
  if (article.slug === "taiwan-travel-subsidy-guide") {
    return { src: "/images/hellohouse/photo3.webp", alt: article.title };
  }
  if (article.slug === "taiwan-travel-subsidy-pricing-guide") {
    return { src: "/images/hellohouse/1000.webp", alt: article.title };
  }
  if (article.slug === "kaohsiung-nye-stay" || article.slug === "kaohsiung-concert-stay-group") {
    return { src: "/images/hellohouse/party-cover.webp", alt: article.title };
  }
  if (article.tags.includes("鹽埕") || article.tags.includes("駁二") || article.tags.includes("景點")) {
    return { src: "/images/hellohouse/foodie-cover.webp", alt: article.title };
  }
  return { src: "/images/hellohouse/cover.webp", alt: article.title };
}

function joinTags(tags: string[]) {
  return tags.slice(0, 2).join(" / ");
}

export default async function BlogIndex() {
  const articleMap = new Map<string, ArticleSummary>();

  for (const article of (await getAllArticles()).filter((item) => !isPrunedBlogSlug(item.slug))) {
    articleMap.set(article.slug, {
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      date: article.date,
      emoji: article.emoji,
      tags: article.tags,
    });
  }

  for (const article of getPublishedArticles(scheduledArticles)) {
    if (isPrunedBlogSlug(article.slug)) continue;
    if (articleMap.has(article.slug)) continue;
    articleMap.set(article.slug, {
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      date: article.publishDate,
      emoji: article.emoji,
      tags: article.tags,
    });
  }

  const articles = Array.from(articleMap.values()).sort((a, b) => b.date.localeCompare(a.date));
  const featured = articles.find((article) => article.slug === "taiwan-travel-foreign-guide") ?? articles[0];
  const latest = articles.slice(0, 4);

  const bucketEntries = buckets
    .map((bucket) => ({
      ...bucket,
      articles: bucket.articleSlugs.map((slug) => articleMap.get(slug)).filter(Boolean) as ArticleSummary[],
    }))
    .filter((bucket) => bucket.articles.length > 0);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Hello Stay 旅宿攻略",
          description: "高雄包棟、鹽埕生活圈與團體旅遊問題整理。",
          url: "https://www.hello-stay.com/blog",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: articles.map((article, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://www.hello-stay.com/blog/${article.slug}`,
              name: article.title,
            })),
          },
        }}
      />

      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <div className="blog-showcase luxury-journal">
        <section className="blog-hero">
          <div className="blog-shell">
            <div className="blog-hero__frame">
              <div className="blog-hero__media">
                <Image
                  src="/images/hellohouse/cover.webp"
                  alt="Hello Stay 旅宿攻略主視覺"
                  fill
                  priority
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
              </div>

              <div className="blog-hero__content">
                <div className="blog-hero__copy">
                  <p className="blog-pill">HELLO STAY JOURNAL</p>
                  <p className="blog-kicker">LOCAL INSIGHTS</p>
                  <h1>Hello Stay Journal</h1>
                  <p className="blog-hero__lead">
                    依旅遊情境、設備與交通整理。從需求找到主題，再回到比較頁與訂房。
                  </p>

                  <div className="blog-actions">
                    <Link className="blog-button blog-button--primary" href="/compare">
                      先比較三館
                    </Link>
                    <Link className="blog-button" href="/book">
                      直接查空房
                    </Link>
                  </div>
                </div>

                <div className="blog-hero__stats">
                  <article>
                    <span>你現在要找的</span>
                    <strong>住宿與周邊問題</strong>
                  </article>
                  <article>
                    <span>常見入口</span>
                    <strong>情境、設備、生活圈</strong>
                  </article>
                  <article>
                    <span>怎麼讀</span>
                    <strong>從需求找到主題</strong>
                  </article>
                  <article>
                    <span>下一步</span>
                    <strong>比較與房型頁</strong>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        {featured ? (
          <section className="blog-section">
            <div className="blog-shell">
              <div className="blog-section__head">
                <p className="blog-kicker">FEATURED</p>
                <h2>精選攻略</h2>
                <p>先從熱門問題開始。</p>
              </div>

              <div className="blog-featured">
                <Link className="blog-featured__main" href={`/blog/${featured.slug}`}>
                  <div className="blog-featured__media">
                    <Image
                      src={pickImage(featured).src}
                      alt={pickImage(featured).alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                  <div className="blog-featured__body">
                    <div className="blog-featured__meta">
                      <span className="blog-date">{featured.date}</span>
                      <span className="blog-tag">{joinTags(featured.tags)}</span>
                    </div>
                    <h3>{featured.title}</h3>
                    <p>{featured.excerpt}</p>
                    <span className="blog-link">讀這篇攻略</span>
                  </div>
                </Link>

                <aside className="blog-side">
                  <section className="blog-side-card">
                    <h3>先看什麼</h3>
                    <div className="blog-side-list">
                      <article>
                        <span>情境</span>
                        <strong>家族旅遊 朋友聚會 企業團建</strong>
                      </article>
                      <article>
                        <span>設備</span>
                        <strong>廚房 麻將 交通與生活圈</strong>
                      </article>
                      <article>
                        <span>下一步</span>
                        <strong>三館比較 房型設備與空房報價</strong>
                      </article>
                    </div>
                  </section>

                  <section className="blog-side-card">
                    <h3>最近更新</h3>
                    <div className="blog-path-list">
                      {latest.map((article) => (
                        <Link href={`/blog/${article.slug}`} key={article.slug}>
                          <span>{article.date}</span>
                          <strong>{article.title}</strong>
                        </Link>
                      ))}
                    </div>
                  </section>
                </aside>
              </div>
            </div>
          </section>
        ) : null}

        <section className="blog-section">
          <div className="blog-shell">
            <div className="blog-section__head">
              <p className="blog-kicker">LOCAL GUIDE</p>
              <h2>鹽埕美食與景點</h2>
              <p>早餐、老店、駁二與大港橋，另有獨立清單。</p>
            </div>
            <div className="blog-featured">
              <Link className="blog-featured__main" href="/explore/food">
                <div className="blog-featured__media">
                  <Image src="/images/hellohouse/foodie-cover.webp" alt="鹽埕美食地圖" fill sizes="(max-width: 1024px) 100vw, 60vw" />
                </div>
                <div className="blog-featured__body">
                  <div className="blog-featured__meta"><span className="blog-tag">FOOD GUIDE</span></div>
                  <h3>鹽埕美食地圖</h3>
                  <p>早餐、正餐、甜點、酒吧與採買地點。</p>
                  <span className="blog-link">查看美食</span>
                </div>
              </Link>
              <aside className="blog-side">
                <Link className="blog-side-card" href="/explore/spots">
                  <h3>周邊景點</h3>
                  <p>駁二、大港橋、港區與半日行程。</p>
                  <span className="blog-link">查看景點</span>
                </Link>
              </aside>
            </div>
          </div>
        </section>

        <section className="blog-section">
          <div className="blog-shell">
            <div className="blog-section__head">
              <p className="blog-kicker">READ BY NEED</p>
              <h2>依需求找文章</h2>
              <p>直接從需求切入。</p>
            </div>

            <div style={{ margin: "24px 0" }}>
              <GuideShareToolbar
                title="Hello Stay 高雄包棟旅宿攻略庫"
                description="家族旅遊、企業團建、包棟麻將廚房、鹽埕美食夜市與周邊景點全指南。"
                url="/blog"
                variant="inline"
              />
            </div>

            <div className="blog-buckets">
              {bucketEntries.map((bucket) => (
                <section className="blog-bucket" key={bucket.id}>
                  <div className="blog-bucket__head">
                    <p className="blog-kicker">{bucket.kicker}</p>
                    <h3>{bucket.title}</h3>
                    <p>{bucket.intro}</p>
                  </div>

                  <div className="blog-card-grid">
                    {bucket.articles.map((article) => {
                      const image = pickImage(article);

                      return (
                        <Link className="blog-card" href={`/blog/${article.slug}`} key={article.slug}>
                          <div className="blog-card__media">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              sizes="(max-width: 820px) 100vw, 240px"
                            />
                          </div>

                          <div className="blog-card__body">
                            <div className="blog-card__meta">
                              <span className="blog-card__date">{article.date}</span>
                              {article.tags.slice(0, 2).map((tag) => (
                                <span className="blog-card__tag" key={`${article.slug}-${tag}`}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <h4>{article.title}</h4>
                            <p>{article.excerpt}</p>
                            <span className="blog-link">看這篇</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="blog-final blog-shell">
          <div>
            <p className="blog-kicker">下一步</p>
            <h2>攻略看完 去選館</h2>
            <p>
              確認需求後，回到館別比較、房型設備與空房查詢。
            </p>
          </div>

          <div className="blog-actions">
            <Link className="blog-button blog-button--primary" href="/compare">
              看三館比較
            </Link>
            <Link className="blog-button" href="/book">
              查空房與報價
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
