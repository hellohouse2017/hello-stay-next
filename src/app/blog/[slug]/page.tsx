import { scheduledArticles, getPublishedArticles, getArticleDescription } from "@/data/scheduled-articles";
import { getArticleBySlug, getAllArticleSlugs, hasArticleSourceFile } from "@/lib/articles";
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import PropertyLinksBlock from "@/components/PropertyLinksBlock";
import HomepageIntentBlock from "@/components/HomepageIntentBlock";
import { notFound, permanentRedirect } from "next/navigation";
import { getPrunedBlogRedirect, isPrunedBlogSlug } from "@/data/pruned-blog-slugs";
import { getBlogTranslationLanguages } from "@/data/blog-translations";
import { DEFAULT_SEO_IMAGE } from "@/lib/seo-metadata";
import GuideShareToolbar from "@/components/GuideShareToolbar";
import GuideReadingExperience from "@/components/GuideReadingExperience";

type Props = { params: Promise<{ slug: string }> };
type ArticleFaq = { q: string; a: string };
type ArticleBridgeLink = {
    href: string;
    label: string;
    partySize?: number;
    seoIntent?: string;
    ctaType?: string;
};
type ArticleBridge = {
    id: string;
    title: string;
    body: string;
    links: ArticleBridgeLink[];
};

type ArticleHeroCtaAction = {
    href: string;
    label: string;
    solid?: boolean;
    bridgeTarget: string;
    ctaType: string;
};

const DEFAULT_ARTICLE_IMAGE = "https://www.hello-stay.com/images/cover-bg.webp";
const ARTICLE_PARTY_SIZES: Record<string, number> = {
    "kaohsiung-6-person-stay": 6,
    "kaohsiung-10-person-stay": 10,
    "kaohsiung-15-person-stay": 15,
    "kaohsiung-20-person-stay": 20,
    "kaohsiung-30-person-stay": 30,
    "taiwan-travel-subsidy-guide": 10,
};

function getArticleBookingHref(slug: string) {
    const partySize = ARTICLE_PARTY_SIZES[slug];
    return partySize ? `/book?guestCount=${partySize}` : "/book";
}

function getArticleBookingLabel(slug: string) {
    const partySize = ARTICLE_PARTY_SIZES[slug];
    return partySize ? `輸入 ${partySize} 人查空房與報價` : "查詢空房與報價";
}

function getArticleSeoIntent(slug: string) {
    if (slug === "taiwan-travel-subsidy-guide") return "subsidy";
    if (ARTICLE_PARTY_SIZES[slug]) return "party_size";
    if (/kitchen|mahjong|family|arena/.test(slug)) return "feature";
    return "inspiration";
}

function getArticleHeroCta(slug: string) {
    if (slug === "taiwan-travel-subsidy-guide") {
        const cta: { title: string; body: string; actions: ArticleHeroCtaAction[] } = {
            title: "2026 國旅補助 × 高雄包棟立即試算",
            body: "平日（週日至週四）連住兩晚每房最高折抵 2,000 元；壽星生日券可疊加至 3,200 元；Taiwan PASS 提供乘車與住宿雙省。Hello Stay 堅持常態透明房價、現場實名核銷，絕不先漲價後折抵！",
            actions: [
                {
                    href: "/book?guestCount=10",
                    label: "輸入 10 人查空房與報價",
                    solid: true,
                    bridgeTarget: "hero_booking",
                    ctaType: "booking",
                },
                {
                    href: "/blog/taiwan-travel-subsidy-pricing-guide",
                    label: "看透明定價指南",
                    bridgeTarget: "pricing_guide",
                    ctaType: "content_bridge",
                },
            ],
        };
        return cta;
    }
    if (/^kaohsiung-(6|10|15|20|30)-person-stay$/.test(slug)) {
        return {
            title: "確認日期與人數，直接查當期報價",
            body: "補助與房價都會隨平假日、連假與可訂館別變動；先輸入同行人數，再比對官方即時空房最準確。",
            actions: [
                {
                    href: getArticleBookingHref(slug),
                    label: getArticleBookingLabel(slug),
                    solid: true,
                    bridgeTarget: "party_size_booking",
                    ctaType: "booking",
                },
                {
                    href: "/compare",
                    label: "比較三館配置",
                    bridgeTarget: "compare_page",
                    ctaType: "content_bridge",
                },
            ] as ArticleHeroCtaAction[],
        };
    }
    return null;
}

const ARTICLE_CONTENT_BRIDGES: Record<string, ArticleBridge> = {
    "kaohsiung-cny-xinle-street-market": {
        id: "cny-xinle-market-stay-choice",
        title: "2027 高雄新樂街過年市集包棟選館建議",
        body: "新樂年街步行 3 分鐘！4-12 人選五層獨棟溝頂民宿（4F 手動麻將與交誼空間），8-26 人選你好哇寓所（1F 中島廚房煮年夜火鍋、1F 手動麻將），27-36 人可訂雙館合訂方案。春節連假熱門，建議提早查房預約。",
        links: [
            { href: "/hellohouse", label: "8–26 人看你好哇寓所 (1F中島圍爐)", seoIntent: "feature" },
            { href: "/godin", label: "4–12 人看溝頂民宿 (4F手動麻將)", seoIntent: "feature" },
            { href: "/compare", label: "27–36 人看雙館包棟比較", seoIntent: "feature" },
            { href: "/book?guestCount=16", label: "輸入 16 人查春節包棟空房", partySize: 16, seoIntent: "feature", ctaType: "booking" },
        ],
    },
    "kaohsiung-3day-seasonal": {
        id: "three-day-headcount",
        title: "依同行人數選住宿",
        body: "行程確定後，再用總人數縮小住宿範圍：4-12 人先看溝頂、8-26 人先看你好哇、27-36 人比較雙館。兩間目前可訂館別都沒有電梯，長輩同行要先確認樓層。",
        links: [
            { href: "/godin", label: "4-12 人看溝頂" },
            { href: "/hellohouse", label: "8-26 人看你好哇" },
            { href: "/compare", label: "27-36 人看雙館" },
        ],
    },
    "kaohsiung-arena-accommodation": {
        id: "arena-stay-choice",
        title: "先選散場動線，再選多人住宿",
        body: "只看單場、想快速回房，優先找左營或場館附近；多人同行且還要玩駁二、鹽埕，才比較 Hello Stay 的房型與公共空間。",
        links: [
            { href: "/compare", label: "比較目前可訂方案" },
            { href: "/kaohsiung-whole-house", label: "依人數看包棟攻略" },
            { href: "/book", label: "查日期與空房" },
        ],
    },
    "kaohsiung-mahjong-stay": {
        id: "mahjong-stay-choice",
        title: "高雄麻將包棟選館建議",
        body: "你好哇寓所 1F 配備手動麻將桌、桌遊與大型中島交誼廳，適合 8-26 人聚會；溝頂民宿 4F 設有獨立交誼廳與麻將空間，適合 4-12 人包棟。",
        links: [
            { href: "/hellohouse", label: "8-26 人看你好哇", seoIntent: "feature" },
            { href: "/godin", label: "4-12 人看溝頂", seoIntent: "feature" },
            { href: "/book?guestCount=10", label: "輸入人數查麻將包棟空房", partySize: 10, seoIntent: "feature", ctaType: "booking" },
        ],
    },
    "kaohsiung-kitchen-bnb": {
        id: "kitchen-stay-choice",
        title: "想開伙煮火鍋？兩館設備差異",
        body: "你好哇寓所提供 1F 完整中島廚房（雙口 IH 爐、烤箱、微波爐、雙門冰箱與鍋碗餐具），適合煮火鍋與備餐；溝頂民宿 4F 提供簡易流理台與微波爐。",
        links: [
            { href: "/hellohouse", label: "你好哇中島廚房", seoIntent: "feature" },
            { href: "/godin", label: "溝頂簡易備餐", seoIntent: "feature" },
            { href: "/book?guestCount=20", label: "輸入人數查廚房包棟空房", partySize: 20, seoIntent: "feature", ctaType: "booking" },
        ],
    },
    "kaohsiung-10-person-stay": {
        id: "headcount-10-stay-choice",
        title: "10 人包棟先看房型，再直接查當期報價",
        body: "10 人通常先看溝頂民宿的 4 間客房與獨立衛浴；若更重視正式開伙與較大的 1F 公共空間，再比較你好哇寓所。價格與可入住館別會隨日期、人數與方案變動，直接帶入 10 人查詢最準。",
        links: [
            { href: "/godin", label: "看溝頂 4 房配置", seoIntent: "party_size" },
            { href: "/compare", label: "比較 10 人適合的館別", seoIntent: "party_size" },
            { href: "/book?guestCount=10", label: "輸入 10 人查空房與報價", partySize: 10, seoIntent: "party_size", ctaType: "booking" },
        ],
    },
    "kaohsiung-20-person-stay": {
        id: "headcount-20-stay-choice",
        title: "20 人包棟先看你好哇，再確認分房與檔期",
        body: "20 人落在你好哇寓所 8-26 人的主要適用範圍，重點是 6 間客房、全房獨立衛浴與 1F 中島公共空間；若需要更多分房或分棟休息，再比較雙館方案。",
        links: [
            { href: "/hellohouse", label: "看你好哇 6 房配置", seoIntent: "party_size" },
            { href: "/compare", label: "比較單館與雙館", seoIntent: "party_size" },
            { href: "/book?guestCount=20", label: "輸入 20 人查空房與報價", partySize: 20, seoIntent: "party_size", ctaType: "booking" },
        ],
    },
    "kaohsiung-30-person-stay": {
        id: "headcount-30-stay-choice",
        title: "30 人直接看雙館，先確認分棟與當期房況",
        body: "30 人屬於你好哇寓所＋溝頂民宿雙館的標準安排範圍（27-34 人）；兩館步行約 5 秒、合計 10 間客房。35-36 人需加床，請直接用 30 人與入住日期查詢官方報價。",
        links: [
            { href: "/compare", label: "看雙館房型與分棟比較", seoIntent: "party_size" },
            { href: "/kaohsiung-whole-house", label: "看 27-36 人包棟主頁", seoIntent: "party_size" },
            { href: "/book?guestCount=30", label: "輸入 30 人查雙館空房與報價", partySize: 30, seoIntent: "party_size", ctaType: "booking" },
        ],
    },
    "kaohsiung-family-accommodation": {
        id: "family-accommodation-choice",
        title: "親子包棟先確認樓梯，再選公共空間",
        body: "你好哇寓所適合 8-26 人家庭團體，1F 有中島廚房與公共空間；溝頂民宿適合 4-12 人、1F 有房但全館無電梯。兩館都須走樓梯，帶幼兒或長輩請先核對樓層與分房。",
        links: [
            { href: "/kaohsiung-whole-house", label: "依人數看包棟方案", seoIntent: "feature" },
            { href: "/compare", label: "比較房型與樓梯動線", seoIntent: "feature" },
            { href: "/book?guestCount=12", label: "輸入人數查親子包棟空房", partySize: 12, seoIntent: "feature", ctaType: "booking" },
        ],
    },
    "pier2-accommodation": {
        id: "pier2-stay-choice",
        title: "駁二藝術特區步行圈包棟推薦",
        body: "Hello Stay 位於鹽埕區大公路，步行 10 分鐘到駁二藝術特區、5 分鐘到捷運鹽埕埔站。4-12 人選溝頂民宿，8-26 人選你好哇寓所，27-36 人選雙館方案。",
        links: [
            { href: "/hellohouse", label: "8–26 人看你好哇寓所" },
            { href: "/godin", label: "4–12 人看溝頂民宿" },
            { href: "/compare#compare-dual", label: "27–36 人看雙館包棟" },
            { href: "/book?guestCount=16", label: "查 16 人駁二行程空房", partySize: 16, seoIntent: "feature", ctaType: "booking" },
        ],
    },
    "kaohsiung-group-trip": {
        id: "group-trip-choice",
        title: "多人團體住宿快速篩選",
        body: "8-26 人優先選擇你好哇寓所（6 間客房皆有獨立衛浴）；27-36 人可預訂雙館合訂方案；4-12 人小家庭或小型團體選擇五層獨棟的溝頂民宿。",
        links: [
            { href: "/kaohsiung-whole-house", label: "依人數選方案" },
            { href: "/compare", label: "三館方案比較" },
            { href: "/book", label: "即時查詢空房" },
        ],
    },
    "kaohsiung-wedding-venue": {
        id: "wedding-stay-choice",
        title: "婚禮迎娶與親友包棟配置",
        body: "迎娶儀式與親友聚會推薦空間挑高、具備中島大廳的你好哇寓所；若長輩同行需減少爬樓梯，溝頂民宿 1F 設有獨立衛浴雙人房，兩館步行僅 5 秒。",
        links: [
            { href: "/hellohouse", label: "迎娶主場地看你好哇寓所" },
            { href: "/godin", label: "長輩親友看溝頂民宿" },
            { href: "/book?guestCount=24&property=你好哇寓所", label: "查 24 人迎娶空房", partySize: 24, seoIntent: "feature", ctaType: "booking" },
        ],
    },
    "kaohsiung-family-reunion": {
        id: "family-stay-choice",
        title: "家庭家族旅遊選館指南",
        body: "帶長輩出遊（4-12 人）建議優先安排溝頂民宿 1F 雙人房；13 人以上大家族聚餐聊天推薦你好哇寓所 1F 大交誼廳；27 人以上建議雙館分棟住宿。",
        links: [
            { href: "/godin", label: "4–12 人看溝頂民宿" },
            { href: "/hellohouse", label: "8–26 人看你好哇寓所" },
            { href: "/compare", label: "比較房型與樓梯動線" },
        ],
    },
    "kaohsiung-offsite-teambuilding": {
        id: "teambuilding-stay-choice",
        title: "企業移地訓練與團隊 Outing",
        body: "團隊需要工作討論與晚上聚會，你好哇寓所 1F 中島長桌與大交誼廳最適合；若需男女分棟或作息分流，可合訂你好哇＋溝頂雙館（共 10 間客房）。",
        links: [
            { href: "/hellohouse", label: "20 人團建看你好哇寓所" },
            { href: "/compare#compare-dual", label: "27 人以上看雙館包棟" },
            { href: "/book?guestCount=20&property=你好哇寓所", label: "查 20 人團建空房", partySize: 20, seoIntent: "feature", ctaType: "booking" },
        ],
    },
    "kaohsiung-nye-stay": {
        id: "nye-stay-choice",
        title: "跨年連假與大港開唱熱門檔期",
        body: "跨年、演唱會與連假檔期熱門，建議提早 2-3 個月確認空房。4-12 人選溝頂民宿，8-26 人選你好哇寓所，官方 LINE 直接諮詢。",
        links: [
            { href: "/book", label: "查連假即時空房" },
            { href: "/kaohsiung-whole-house", label: "看人數包棟攻略" },
        ],
    },
    "yancheng-food-guide": {
        id: "food-guide-stay-choice",
        title: "鹽埕在地美食散策與住宿",
        body: "住在 Hello Stay 步行 3-5 分鐘即可抵達鴨肉珍、米糕城、阿英排骨與鹽埕老街。白天吃遍鹽埕老店，晚上回民宿交誼廳聚會休息。",
        links: [
            { href: "/explore/food", label: "鹽埕美食 20 選" },
            { href: "/hellohouse", label: "你好哇寓所" },
            { href: "/godin", label: "溝頂民宿" },
        ],
    },
    "taiwan-travel-subsidy-guide": {
        id: "subsidy-guide-stay-choice",
        title: "運用 2026 國旅補助預訂高雄包棟",
        body: "平日連住兩晚搭配生日券，單房折抵最高 3,200 元！4-12 人選五層獨棟溝頂民宿、8-26 人選中島廚房你好哇寓所，企業團建可申請每團 2 萬員工旅遊獎助。",
        links: [
            { href: "/compare", label: "三館特色與人數比較" },
            { href: "/hellohouse", label: "你好哇寓所 (8-26人)" },
            { href: "/godin", label: "溝頂民宿 (4-12人)" },
            { href: "/book", label: "查詢平日空房與報價" },
        ],
    },
    "taiwan-travel-subsidy-pricing-guide": {
        id: "subsidy-pricing-stay-choice",
        title: "拒絕假優惠！Hello Stay 透明定價高雄包棟",
        body: "堅持常態平日房價，現場實扣政府身分證補助與生日券。4-12 人選五層獨棟溝頂民宿、8-26 人選中島廚房你好哇寓所，官方 LINE 免費提供透明試算明細。",
        links: [
            { href: "/book", label: "官網即時查房檢驗價格" },
            { href: "/hellohouse", label: "你好哇寓所 (8-26人)" },
            { href: "/godin", label: "溝頂民宿 (4-12人)" },
            { href: "/compare", label: "三館包棟比較" },
        ],
    },
    "kaohsiung-concert-stay-group": {
        id: "concert-stay-choice",
        title: "高雄演唱會與音樂祭包棟住宿推薦",
        body: "散場搭捷運免塞車直達鹽埕埔站，高流與大港開唱步行 10 分鐘！4-12 人選五層獨棟溝頂民宿、8-26 人選 1F 中島廚房你好哇寓所，深夜煮宵夜火鍋、開啤酒同樂。",
        links: [
            { href: "/hellohouse", label: "8–26 人看你好哇寓所" },
            { href: "/godin", label: "4–12 人看溝頂民宿" },
            { href: "/compare", label: "三館方案比較" },
            { href: "/book?guestCount=16", label: "查演唱會檔期空房", partySize: 16, seoIntent: "feature", ctaType: "booking" },
        ],
    },
};

function getArticleSection(tags?: string[]) {
    return tags?.[0];
}

function estimateWordCount(text: string) {
    const plainText = text.replace(/\s+/g, " ").trim();
    if (!plainText) {
        return 0;
    }

    const cjkCount = (plainText.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu) || []).length;
    const latinWordCount = plainText
        .replace(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu, " ")
        .split(/\s+/)
        .filter(Boolean)
        .length;

    return cjkCount + latinWordCount;
}

function getScheduledArticleWordCount(article: { sections: Array<{ content: string }> }) {
    return estimateWordCount(article.sections.map((section) => section.content).join(" "));
}

function buildFaqSchema(faq?: ArticleFaq[]) {
    if (!faq || faq.length === 0) {
        return [];
    }

    return [{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    }];
}

function FaqSection({ faq }: { faq: ArticleFaq[] }) {
    return (
        <Reveal>
            <section style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px", letterSpacing: "0.04em" }}>常見問答</h2>
                {faq.map((item, index) => (
                    <div key={`${item.q}-${index}`} style={{ marginBottom: index < faq.length - 1 ? "20px" : 0 }}>
                        <h3 style={{ fontSize: "0.92rem", color: "#3D3830", marginBottom: "8px", fontWeight: 500 }}>Q: {item.q}</h3>
                        <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 2 }}>A: {item.a}</p>
                    </div>
                ))}
            </section>
        </Reveal>
    );
}

function ArticleContentBridge({ bridge }: { bridge: ArticleBridge }) {
    return (
        <Reveal>
            <aside style={{ background: "#F5F1ED", padding: "28px", borderLeft: "4px solid var(--pri)", marginBottom: "20px" }}>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "10px", letterSpacing: 0 }}>
                    {bridge.title}
                </h2>
                <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.9, margin: 0 }}>{bridge.body}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
                    {bridge.links.map((link) => (
                        <Link
                            href={link.href}
                            key={link.href}
                            data-content-bridge={bridge.id}
                            data-content-bridge-target={link.href}
                            data-seo-intent={link.seoIntent}
                            data-party-size={link.partySize}
                            data-cta-type={link.ctaType}
                            data-cta-position="content_bridge"
                            style={{ padding: "9px 12px", border: "1px solid #D4CBC0", color: "#3D3830", fontSize: "0.78rem", fontWeight: 600 }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </aside>
        </Reveal>
    );
}

// Generate static pages for both scheduled articles and MDX articles
export async function generateStaticParams() {
    const scheduledSlugs = getPublishedArticles(scheduledArticles)
        .filter(article => !isPrunedBlogSlug(article.slug))
        .map(a => a.slug);
    const mdxSlugs = getAllArticleSlugs()
        .filter(slug => !isPrunedBlogSlug(slug))
    return Array.from(new Set([...scheduledSlugs, ...mdxSlugs])).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    if (!slug) return {};

    // Try MDX first
    const mdxArticle = hasArticleSourceFile(slug) ? await getArticleBySlug(slug) : null;
    if (mdxArticle) {
        return {
            title: mdxArticle.title,
            description: mdxArticle.description,
            alternates: {
                canonical: mdxArticle.canonical,
                languages: getBlogTranslationLanguages(slug, mdxArticle.canonical),
            },
            openGraph: {
                title: mdxArticle.title,
                description: mdxArticle.description,
                url: mdxArticle.canonical,
                type: "article",
                images: [DEFAULT_SEO_IMAGE],
            },
        };
    }

    // Fallback to scheduled articles
    const article = scheduledArticles.find(a => a?.slug === slug);
    if (!article || article.status === "draft" || article.status === "review") return {};
    return {
        title: article.title,
        description: getArticleDescription(article),
        alternates: { canonical: `https://www.hello-stay.com/blog/${slug}` },
        openGraph: {
            title: article.title,
            description: getArticleDescription(article),
            url: `https://www.hello-stay.com/blog/${slug}`,
            type: "article",
            images: [DEFAULT_SEO_IMAGE],
        },
    };
}

// Extract list items or headings as highlights for sharing
function extractArticleHighlights(content: string): string[] {
    const lines = content.split("\n");
    const items: string[] = [];
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("### ") || trimmed.startsWith("## ")) {
            const heading = trimmed.replace(/^#+\s+/, "").replace(/\*\*/g, "").trim();
            if (heading && !heading.includes("常見問答") && !heading.includes("安排建議") && !heading.includes("節奏")) {
                items.push(heading);
            }
        } else if (trimmed.startsWith("- **[") || trimmed.startsWith("1. **") || trimmed.startsWith("2. **") || trimmed.startsWith("3. **") || trimmed.startsWith("4. **")) {
            const match = trimmed.match(/\*\*([^*]+)\*\*/);
            if (match && match[1] && !items.includes(match[1])) {
                items.push(match[1]);
            }
        }
        if (items.length >= 6) break;
    }
    return items;
}

export default async function ScheduledArticlePage({ params }: Props) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    if (!slug) notFound();
    if (isPrunedBlogSlug(slug)) {
        permanentRedirect(getPrunedBlogRedirect(slug));
    }

    // Try MDX first
    const mdxArticle = hasArticleSourceFile(slug) ? await getArticleBySlug(slug) : null;
    if (mdxArticle) {
        const readTimeMinutes = Math.max(2, Math.ceil(mdxArticle.wordCount / 350));
        const canonicalUrl = mdxArticle.canonical || `https://www.hello-stay.com/blog/${slug}`;
        const highlights = extractArticleHighlights(mdxArticle.rawContent || "");

        return (
            <div className="luxury-guide-page">
                <GuideReadingExperience
                    title={mdxArticle.title}
                    description={mdxArticle.description}
                    url={canonicalUrl}
                    highlights={highlights}
                    bookingHref={getArticleBookingHref(slug)}
                    seoIntent={getArticleSeoIntent(slug)}
                    partySize={ARTICLE_PARTY_SIZES[slug]}
                />

                <JsonLd data={[
                    {
                        "@context": "https://schema.org", "@type": "Article",
                        headline: mdxArticle.title,
                        description: mdxArticle.description,
                        image: [DEFAULT_ARTICLE_IMAGE],
                        author: { "@type": "Organization", name: "Hello Stay 你好哇寓所", url: "https://www.hello-stay.com" },
                        publisher: {
                            "@type": "Organization",
                            name: "Hello Stay",
                            url: "https://www.hello-stay.com",
                            logo: { "@type": "ImageObject", url: DEFAULT_ARTICLE_IMAGE },
                        },
                        datePublished: mdxArticle.date,
                        dateModified: mdxArticle.dateModified || mdxArticle.date,
                        inLanguage: "zh-Hant",
                        keywords: (mdxArticle.tags || []).join(", "),
                        articleSection: getArticleSection(mdxArticle.tags),
                        wordCount: mdxArticle.wordCount,
                        mainEntityOfPage: canonicalUrl,
                    },
                    {
                        "@context": "https://schema.org", "@type": "BreadcrumbList",
                        itemListElement: [
                            { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.hello-stay.com" },
                            { "@type": "ListItem", position: 2, name: "旅宿攻略", item: "https://www.hello-stay.com/blog" },
                            { "@type": "ListItem", position: 3, name: mdxArticle.title.split("｜")[0] || mdxArticle.title, item: canonicalUrl },
                        ],
                    },
                    ...buildFaqSchema(mdxArticle.faq),
                ]} />

                {/* 奢華 Hero 視覺 */}
                <header className="luxury-guide-hero">
                    <div className="luxury-guide-hero__inner">
                        <Breadcrumb
                            items={[
                                { name: "首頁", href: "/" },
                                { name: "旅宿攻略", href: "/blog" },
                                { name: mdxArticle.title.split("｜")[0] || mdxArticle.title, href: `/blog/${slug}` },
                            ]}
                        />

                        <div style={{ marginTop: "24px" }}>
                            <div className="luxury-guide-hero__kicker">
                                <span>Hello Stay ｜ 鹽埕漫遊私房攻略</span>
                            </div>
                            <h1>{mdxArticle.title}</h1>

                            <div className="luxury-guide-hero__meta">
                                <span>🗓️ {mdxArticle.dateModified || mdxArticle.date}</span>
                                <span>⏱️ 約 {readTimeMinutes} 分鐘閱讀</span>
                                {mdxArticle.tags && mdxArticle.tags.length > 0 && (
                                    <span>🏷️ {mdxArticle.tags.join("・")}</span>
                                )}
                                <span>📍 鹽埕生活圈</span>
                            </div>

                            <p className="luxury-guide-hero__lead">{mdxArticle.description}</p>
                        </div>
                        {getArticleHeroCta(slug) ? (
                            <aside className="article-instant-cta">
                                <h2>{getArticleHeroCta(slug)?.title}</h2>
                                <p>{getArticleHeroCta(slug)?.body}</p>
                                <div className="article-instant-cta__actions">
                                    {(getArticleHeroCta(slug)?.actions || []).map((action) => (
                                        <Link
                                            key={`${action.href}-${action.label}`}
                                            href={action.href}
                                            className={action.solid ? "article-action article-action--solid" : "article-action"}
                                            data-content-bridge={slug === "taiwan-travel-subsidy-guide" ? "subsidy-instant-calculation" : `${slug}-hero-cta`}
                                            data-content-bridge-target={action.bridgeTarget}
                                            data-seo-intent={getArticleSeoIntent(slug)}
                                            data-party-size={ARTICLE_PARTY_SIZES[slug]}
                                            data-cta-type={action.ctaType}
                                            data-cta-position="hero"
                                        >
                                            {action.label}
                                        </Link>
                                    ))}
                                </div>
                            </aside>
                        ) : null}
                    </div>
                </header>

                {/* 內容容器 */}
                <main className="luxury-guide-container">
                    {/* 文章主體卡片 */}
                    <article className="luxury-guide-card">
                        <div className="luxury-guide-content mdx-content">
                            {mdxArticle.content}
                        </div>
                    </article>

                    {/* 文末單一行程統整與旅伴分享卡 */}
                    <Reveal>
                        <GuideShareToolbar
                            title={mdxArticle.title}
                            description={mdxArticle.description}
                            url={canonicalUrl}
                            highlights={highlights}
                        />
                    </Reveal>

                    {ARTICLE_CONTENT_BRIDGES[slug] ? <ArticleContentBridge bridge={ARTICLE_CONTENT_BRIDGES[slug]} /> : null}

                    {mdxArticle.faq && mdxArticle.faq.length > 0 ? <FaqSection faq={mdxArticle.faq} /> : null}

                    <Reveal>
                        <HomepageIntentBlock
                            eyebrow="Article To Home"
                            title="如果這篇剛好解到你的問題，下一步就是回首頁比館別"
                            actions={[
                                { href: "/", label: "高雄包棟民宿推薦首頁" },
                                { href: "/compare", label: "高雄包棟推薦比較" },
                                { href: getArticleBookingHref(slug), label: getArticleBookingLabel(slug), solid: true },
                            ]}
                        >
                            很多人是先從攻略文章找到我們，再回到{" "}
                            <Link href="/" style={{ color: "var(--pri)", textDecoration: "underline" }}>
                                高雄包棟民宿推薦 Hello Stay
                            </Link>
                            {" "}看目前可訂方案。如果你已經知道自己的重點是人數、廚房、麻將或鹽埕地點，現在就可以直接進首頁或比較頁。
                        </HomepageIntentBlock>
                    </Reveal>

                    <PropertyLinksBlock />

                    <RelatedArticles current={slug} currentTags={mdxArticle.tags} />

                    <Reveal>
                        <div style={{ textAlign: "center", marginTop: "36px" }}>
                            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                                <Link
                                    href={getArticleBookingHref(slug)}
                                    data-seo-intent={getArticleSeoIntent(slug)}
                                    data-party-size={ARTICLE_PARTY_SIZES[slug]}
                                    data-cta-type="booking"
                                    data-cta-position="bottom"
                                    style={{
                                        padding: "14px 36px",
                                        borderRadius: "999px",
                                        background: "linear-gradient(135deg, #17483d 0%, #10342c 100%)",
                                        color: "#ffffff",
                                        fontFamily: "var(--serif)",
                                        fontSize: "0.9rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.08em",
                                        boxShadow: "0 6px 20px rgba(23, 72, 61, 0.28)",
                                    }}
                                >
                                    {getArticleBookingLabel(slug)}
                                </Link>
                                <Link
                                    href="/explore"
                                    style={{
                                        padding: "14px 36px",
                                        borderRadius: "999px",
                                        border: "1px solid #d4cbc0",
                                        background: "#ffffff",
                                        color: "#3d3830",
                                        fontFamily: "var(--serif)",
                                        fontSize: "0.9rem",
                                        fontWeight: 600,
                                        letterSpacing: "0.08em",
                                    }}
                                >
                                    探索鹽埕美食與景點
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </main>
            </div>
        );
    }

    // Fallback to scheduled articles
    const article = scheduledArticles.find(a => a?.slug === slug);
    if (!article || article.status === "draft" || article.status === "review") notFound();

    // Check publish date
    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Taipei",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());
    if (article.publishDate > today) notFound();

    const canonicalUrl = `https://www.hello-stay.com/blog/${slug}`;
    const wordCount = getScheduledArticleWordCount(article);
    const readTimeMinutes = Math.max(2, Math.ceil(wordCount / 350));
    const articleHighlights = article.sections.map(s => s.title);

    return (
        <div className="luxury-guide-page">
            <GuideReadingExperience
                title={article.title}
                description={getArticleDescription(article)}
                url={canonicalUrl}
                highlights={articleHighlights}
                bookingHref={getArticleBookingHref(slug)}
                seoIntent={getArticleSeoIntent(slug)}
                partySize={ARTICLE_PARTY_SIZES[slug]}
            />

            <JsonLd data={[
                {
                    "@context": "https://schema.org", "@type": "Article",
                    headline: article.title,
                    description: getArticleDescription(article),
                    image: [DEFAULT_ARTICLE_IMAGE],
                    author: { "@type": "Organization", name: "Hello Stay 你好哇寓所", url: "https://www.hello-stay.com" },
                    publisher: {
                        "@type": "Organization",
                        name: "Hello Stay",
                        url: "https://www.hello-stay.com",
                        logo: { "@type": "ImageObject", url: DEFAULT_ARTICLE_IMAGE },
                    },
                    datePublished: article.publishDate,
                    dateModified: article.dateModified || article.publishDate,
                    inLanguage: "zh-Hant",
                    keywords: (article.tags || []).join(", "),
                    articleSection: getArticleSection(article.tags),
                    wordCount: wordCount,
                    mainEntityOfPage: canonicalUrl,
                },
                {
                    "@context": "https://schema.org", "@type": "BreadcrumbList",
                    itemListElement: [
                        { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.hello-stay.com" },
                        { "@type": "ListItem", position: 2, name: "旅宿攻略", item: "https://www.hello-stay.com/blog" },
                        { "@type": "ListItem", position: 3, name: article.title.split("：")[0] || article.title, item: canonicalUrl },
                    ],
                },
                ...buildFaqSchema(article.faq),
            ]} />

            {/* 奢華 Hero 視覺 */}
            <header className="luxury-guide-hero">
                <div className="luxury-guide-hero__inner">
                    <Breadcrumb
                        items={[
                            { name: "首頁", href: "/" },
                            { name: "旅宿攻略", href: "/blog" },
                            { name: article.title.split("：")[0] || article.title, href: `/blog/${slug}` },
                        ]}
                    />

                    <Reveal>
                        <div style={{ marginTop: "24px" }}>
                            <div className="luxury-guide-hero__kicker">
                                <span>Hello Stay ｜ 鹽埕漫遊私房攻略</span>
                            </div>
                            <h1>{article.title}</h1>

                            <div className="luxury-guide-hero__meta">
                                <span>🗓️ {article.dateModified || article.publishDate}</span>
                                <span>⏱️ 約 {readTimeMinutes} 分鐘閱讀</span>
                                {article.tags && article.tags.length > 0 && (
                                    <span>🏷️ {article.tags.join("・")}</span>
                                )}
                                <span>📍 鹽埕生活圈</span>
                            </div>

                            <p className="luxury-guide-hero__lead">{getArticleDescription(article)}</p>
                        </div>
                    </Reveal>
                </div>
            </header>

            {/* 內容容器 */}
            <main className="luxury-guide-container">
                {article.sections.map(sec => (
                    <Reveal key={sec.id}>
                        <section id={sec.id} className="luxury-guide-card">
                            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", color: "var(--hotel-forest)", marginBottom: "16px", borderLeft: "4px solid var(--hotel-gold)", paddingLeft: "12px" }}>
                                {sec.title}
                            </h2>
                            <div className="luxury-guide-content" style={{ whiteSpace: "pre-line" }}>
                                {sec.content}
                            </div>
                        </section>
                    </Reveal>
                ))}

                {/* 文末單一行程統整與旅伴分享卡 */}
                <Reveal>
                    <GuideShareToolbar
                        title={article.title}
                        description={getArticleDescription(article)}
                        url={canonicalUrl}
                        highlights={articleHighlights}
                    />
                </Reveal>

                {ARTICLE_CONTENT_BRIDGES[slug] ? <ArticleContentBridge bridge={ARTICLE_CONTENT_BRIDGES[slug]} /> : null}

                {article.faq && article.faq.length > 0 ? <FaqSection faq={article.faq} /> : null}

                <Reveal>
                    <HomepageIntentBlock
                        eyebrow="Article To Home"
                        title="看完攻略後，直接回首頁挑館別最快"
                        actions={[
                            { href: "/", label: "高雄包棟推薦首頁" },
                            { href: "/kaohsiung-whole-house", label: "依需求看包棟方案" },
                            { href: getArticleBookingHref(slug), label: getArticleBookingLabel(slug), solid: true },
                        ]}
                    >
                        如果你是從這篇內容頁一路看下來，通常已經知道自己在找什麼了。這時候直接回{" "}
                        <Link href="/" style={{ color: "var(--pri)", textDecoration: "underline" }}>
                            高雄包棟民宿推薦
                        </Link>
                        {" "}首頁，比一直在文章裡跳來跳去更快進入訂房判斷。
                    </HomepageIntentBlock>
                </Reveal>

                <PropertyLinksBlock />

                <RelatedArticles current={slug} currentTags={article.tags} />

                <Reveal>
                    <div style={{ textAlign: "center", marginTop: "36px" }}>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                                <Link
                                    href={getArticleBookingHref(slug)}
                                    data-seo-intent={getArticleSeoIntent(slug)}
                                    data-party-size={ARTICLE_PARTY_SIZES[slug]}
                                    data-cta-type="booking"
                                    data-cta-position="bottom"
                                    style={{
                                    padding: "14px 36px",
                                    borderRadius: "999px",
                                    background: "linear-gradient(135deg, #17483d 0%, #10342c 100%)",
                                    color: "#ffffff",
                                    fontFamily: "var(--serif)",
                                    fontSize: "0.9rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.08em",
                                    boxShadow: "0 6px 20px rgba(23, 72, 61, 0.28)",
                                }}
                            >
                                {getArticleBookingLabel(slug)}
                            </Link>
                            <Link
                                href="/explore"
                                style={{
                                    padding: "14px 36px",
                                    borderRadius: "999px",
                                    border: "1px solid #d4cbc0",
                                    background: "#ffffff",
                                    color: "#3d3830",
                                    fontFamily: "var(--serif)",
                                    fontSize: "0.9rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.08em",
                                }}
                            >
                                探索鹽埕美食與景點
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </main>
        </div>
    );
}
