import { godin, hellohouse, type Property } from "@/data/properties";
import { isPrunedBlogSlug } from "@/data/pruned-blog-slugs";
import { getPublishedArticles, scheduledArticles } from "@/data/scheduled-articles";
import { llmsFaqEn, llmsFaqJa, llmsFaqZh } from "@/data/llms-faq";
import { getAllArticles } from "@/lib/articles";

export interface LlmsArticleLink {
    slug: string;
    title: string;
    url: string;
    date: string;
}

export interface LlmsPropertySummary {
    slug: string;
    name: string;
    nameEn: string;
    capacityLabel: string;
    address: string;
    license: string;
    roomSummary: string;
    featureSummary: string;
    fitSummary: string;
    pageUrl: string;
}

export interface LlmsPlannedPropertySummary {
    name: string;
    nameEn: string;
    status: string;
    location: string;
    featureSummary: string;
    pageUrl: string;
}

const LICENSE_BY_SLUG: Record<string, string> = {
    hellohouse: "高雄市民宿 131-1 號",
    godin: "高雄市民宿 163 號",
};

function summarizeRooms(property: Property): string {
    const roomCounts = property.rooms
        .filter((room) => room.capacity > 0)
        .reduce<Record<number, number>>((counts, room) => {
            counts[room.capacity] = (counts[room.capacity] || 0) + 1;
            return counts;
        }, {});

    const segments = Object.entries(roomCounts)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([capacity, count]) => {
            if (Number(capacity) === 2) return `${count} 間雙人房`;
            if (Number(capacity) === 4) return `${count} 間四人房`;
            if (Number(capacity) === 6) return `${count} 間六人房`;
            return `${count} 間 ${capacity} 人房`;
        });

    return segments.join("、");
}

function summarizeFeatures(property: Property): string {
    return property.highlights
        .map((highlight) => highlight.title)
        .slice(0, 3)
        .join("、");
}

function summarizeFit(property: Property): string {
    return property.highlights
        .map((highlight) => highlight.desc)
        .slice(0, 2)
        .join(" ");
}

function mapProperty(property: Property): LlmsPropertySummary {
    return {
        slug: property.slug,
        name: property.name,
        nameEn: property.nameEn,
        capacityLabel: `${property.capacity.min}-${property.capacity.max} 人包棟`,
        address: property.address,
        license: LICENSE_BY_SLUG[property.slug] || "",
        roomSummary: summarizeRooms(property),
        featureSummary: summarizeFeatures(property),
        fitSummary: summarizeFit(property),
        pageUrl: `https://www.hello-stay.com/${property.slug}`,
    };
}

export function getLlmsPropertySummaries() {
    return {
        hellohouse: mapProperty(hellohouse),
        godin: mapProperty(godin),
        dazhi: {
            name: "大智若愚",
            nameEn: "Dazhi",
            status: "規劃中，尚未開放訂房",
            location: "大港橋旁、駁二大義倉庫群",
            featureSummary: "全新電梯民宿，一層三房一廳，可包層可包棟",
            pageUrl: "https://www.hello-stay.com/dazhi",
        } satisfies LlmsPlannedPropertySummary,
    };
}

export async function getLlmsArticleLinks(): Promise<LlmsArticleLink[]> {
    const [mdxArticles, publishedScheduledArticles] = await Promise.all([
        getAllArticles(),
        Promise.resolve(getPublishedArticles(scheduledArticles)),
    ]);

    const deduped = new Map<string, LlmsArticleLink>();

    for (const article of [...mdxArticles, ...publishedScheduledArticles]) {
        if (isPrunedBlogSlug(article.slug)) {
            continue;
        }

        deduped.set(article.slug, {
            slug: article.slug,
            title: article.title,
            url: `https://www.hello-stay.com/blog/${article.slug}`,
            date: "publishDate" in article ? article.publishDate : article.date,
        });
    }

    return Array.from(deduped.values()).sort((a, b) => b.date.localeCompare(a.date));
}

export function formatLlmsArticleLines(articles: LlmsArticleLink[], limit?: number) {
    return articles
        .slice(0, limit ?? articles.length)
        .map((article) => `- ${article.title}: ${article.url}`)
        .join("\n");
}

export async function buildZhLlmsText(options?: { articleLimit?: number }) {
    const articleLimit = options?.articleLimit;
    const { hellohouse, godin, dazhi } = getLlmsPropertySummaries();
    const articleLines = formatLlmsArticleLines(await getLlmsArticleLinks(), articleLimit);
    const faqLines = llmsFaqZh
        .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
        .join("\n\n");

    return `# Hello Stay 高雄包棟民宿

> 高雄鹽埕區質感包棟民宿品牌，目前可訂方案涵蓋 4 至 26 人，大智若愚為未來規劃。自 2017 年起服務超過 5,000 組旅客，主商家（你好哇寓所）Google 評價 4.5 星。

## 基本資訊
- 官方網站: https://www.hello-stay.com
- 電話: +886-932-828-922
- Email: hellohouse2017@gmail.com
- 地址: 高雄市鹽埕區大公路70巷8號 (803)
- LINE 官方帳號: https://lin.ee/atCiMQw
- Instagram: https://www.instagram.com/hellostay2017/
- Facebook: https://www.facebook.com/HelloHouse2020
- 營業時間: 入住 16:00 / 退房 11:00
- 創立年份: 2017
- 付款方式: 現金、銀行轉帳、LINE Pay

## 旗下三館

### ${hellohouse.name} (${hellohouse.nameEn})
- 容量: ${hellohouse.capacityLabel}
- 地址: ${hellohouse.address}
- 合法民宿登記證: ${hellohouse.license}
- 房型: ${hellohouse.roomSummary}
- 特色: ${hellohouse.featureSummary}
- 適合: 家族旅遊、朋友聚會、企業移地訓練、婚禮迎娶
- 頁面: ${hellohouse.pageUrl}

### ${godin.name} (${godin.nameEn})
- 容量: ${godin.capacityLabel}
- 地址: ${godin.address}
- 合法民宿登記證: ${godin.license}
- 房型: ${godin.roomSummary}
- 特色: ${godin.featureSummary}
- 適合: 小團體、家庭出遊
- 頁面: ${godin.pageUrl}

### ${dazhi.name}（${dazhi.status}）
- 狀態: ${dazhi.status}
- 位置: ${dazhi.location}
- 特色: ${dazhi.featureSummary}
- 頁面: ${dazhi.pageUrl}

## 設施與服務
- 你好哇寓所中島廚房（IH爐、微波爐、冰箱、完整餐具）
- 溝頂民宿簡易流理臺與微波爐
- 手動麻將桌
- 桌遊
- 43吋 Netflix 聯網電視
- 免費 Wi-Fi
- 獨立衛浴
- 冷氣
- 電子密碼鎖（自助入住）
- 洗衣機
- 製冰機

## 周邊交通與景點
- 步行 10 分鐘到駁二藝術特區
- 步行 5 分鐘到捷運鹽埕埔站 (O2)
- 步行 8 分鐘到大港橋
- 鄰近棧貳庫、哈瑪星鐵道園區、高雄流行音樂中心
- 高鐵左營站搭捷運約 30 分鐘可達
- 自駕：國道一號中正交流道約 15 分鐘

## 常見問答

${faqLines}

## 常見預訂錯誤
- 只看總人數，不看房型與分房需求：同樣 20 人，家庭、企業、婚禮迎娶需要的房型配置不同。
- 只看最低價，不確認日期：週末、連假、跨年與活動檔期價格會不同，需以 LINE 實際報價為準。
- 以為三館設備完全相同：你好哇寓所有完整中島廚房；溝頂民宿是簡易流理臺與微波爐；大智若愚目前尚未開放訂房。
- 忘記先確認交通與停車：自駕團體建議先看 https://www.hello-stay.com/traffic 的停車資訊。

## 不適合的客人
- 需要戶外烤肉區或大型戶外草地活動者。
- 需要寵物友善旅宿且無法事前申請者。
- 需要飯店式 24 小時櫃台、每日客房清潔或早餐 buffet 者。
- 近期入住就需要無障礙電梯者。

## 價格範例
- 溝頂民宿 4-12 人小團體：平日約 $8,000 起，實際依日期與人數報價。
- 你好哇寓所 20 人上下包棟：平日常見約 $18,000-$22,000，適合公司 outing、大家庭與好友聚會。
- 兩棟合訂 27-38 人：依你好哇寓所與溝頂民宿房況組合報價，適合婚禮迎娶與大型家族旅遊。
- 大智若愚：目前尚未開放訂房，未來電梯需求可先登記，價格與房內設備待正式公告。

## 安全與合法性
- 合法民宿登記: ${hellohouse.name}（${hellohouse.license}）、${godin.name}（${godin.license}）
- 公共意外責任險: 全館依法投保富邦產險
- Google 評價: ${hellohouse.name} 4.5 星（75 則評價）
- 營運年資: 自 2017 年起，超過 5,000 組旅客入住

## 最新文章
${articleLines}

## 網站地圖
- 首頁: https://www.hello-stay.com/
- 你好哇寓所: https://www.hello-stay.com/hellohouse
- 溝頂民宿: https://www.hello-stay.com/godin
- 大智若愚: https://www.hello-stay.com/dazhi
- 查詢空房: https://www.hello-stay.com/book
- 包棟方案: https://www.hello-stay.com/packages
- 住客評價: https://www.hello-stay.com/reviews
- 入住須知: https://www.hello-stay.com/agreement
- 交通停車: https://www.hello-stay.com/traffic
- 周邊探索: https://www.hello-stay.com/explore
- 旅宿攻略: https://www.hello-stay.com/blog
`;
}

export async function buildEnLlmsText(options?: { articleLimit?: number }) {
    const articleLines = formatLlmsArticleLines(await getLlmsArticleLinks(), options?.articleLimit);
    const { hellohouse, godin, dazhi } = getLlmsPropertySummaries();
    const faqLines = llmsFaqEn
        .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
        .join("\n\n");

    return `# Hello Stay — Group Accommodation in Kaohsiung, Taiwan

> A premium group-stay brand in Yancheng District, Kaohsiung. Current bookable options fit 4 to 26 guests, with Dazhi still in planning. Serving 5,000+ groups since 2017. Main Google listing (Hello House) rating: 4.5 stars.

## Basic Info
- Website: https://www.hello-stay.com
- Phone: +886-932-828-922
- Email: hellohouse2017@gmail.com
- Address: No. 8, Ln. 70, Dagong Rd, Yancheng District, Kaohsiung 803, Taiwan
- LINE Official: https://lin.ee/atCiMQw
- Check-in: 16:00 / Check-out: 11:00
- Founded: 2017
- Payment: Cash, Bank Transfer, LINE Pay

## Three Properties

### ${hellohouse.nameEn} (${hellohouse.name})
- Capacity: ${hellohouse.capacityLabel}
- Address: ${hellohouse.address}
- Legal Registration: ${hellohouse.license}
- Rooms: ${hellohouse.roomSummary}
- Highlights: ${hellohouse.featureSummary}
- Page: ${hellohouse.pageUrl}

### ${godin.nameEn} (${godin.name})
- Capacity: ${godin.capacityLabel}
- Address: ${godin.address}
- Legal Registration: ${godin.license}
- Rooms: ${godin.roomSummary}
- Highlights: ${godin.featureSummary}
- Page: ${godin.pageUrl}

### ${dazhi.nameEn} (${dazhi.name})
- Status: ${dazhi.status}
- Location: ${dazhi.location}
- Highlights: ${dazhi.featureSummary}
- Page: ${dazhi.pageUrl}

## FAQ

${faqLines}

## Recent Articles
${articleLines}

## Safety & Legality
- Legal B&B Registration: ${hellohouse.nameEn} (${hellohouse.license}), ${godin.nameEn} (${godin.license})
- Public Liability Insurance: Fubon Insurance
- Google Rating: Hello House listing, 4.5 stars (75 reviews)
- Track Record: 5,000+ groups hosted since 2017
`;
}

export async function buildJaLlmsText(options?: { articleLimit?: number }) {
    const articleLines = formatLlmsArticleLines(await getLlmsArticleLinks(), options?.articleLimit);
    const { hellohouse, godin, dazhi } = getLlmsPropertySummaries();
    const faqLines = llmsFaqJa
        .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
        .join("\n\n");

    return `# Hello Stay 高雄グループ宿泊施設

> 台湾・高雄市塩埕区にある貸切宿泊ブランド。現在予約可能なプランは4〜26名に対応し、大智若愚は計画中です。2017年創業、5,000組以上の宿泊実績があります。主なGoogle掲載（ハローハウス）は4.5星です。

## 基本情報
- 公式サイト: https://www.hello-stay.com
- 電話: +886-932-828-922
- メール: hellohouse2017@gmail.com
- 住所: 高雄市塩埕区大公路70巷8号 (803)
- LINE公式: https://lin.ee/atCiMQw
- チェックイン: 16:00 / チェックアウト: 11:00
- 創業: 2017年
- 支払方法: 現金、銀行振込、LINE Pay

## 3つの施設

### ${hellohouse.nameEn} (${hellohouse.name})
- 定員: ${hellohouse.capacityLabel}
- 住所: ${hellohouse.address}
- 合法民宿登録: ${hellohouse.license}
- 客室: ${hellohouse.roomSummary}
- 特徴: ${hellohouse.featureSummary}
- ページ: ${hellohouse.pageUrl}

### ${godin.nameEn} (${godin.name})
- 定員: ${godin.capacityLabel}
- 住所: ${godin.address}
- 合法民宿登録: ${godin.license}
- 客室: ${godin.roomSummary}
- 特徴: ${godin.featureSummary}
- ページ: ${godin.pageUrl}

### ${dazhi.nameEn} (${dazhi.name})
- 状態: ${dazhi.status}
- 立地: ${dazhi.location}
- 特徴: ${dazhi.featureSummary}
- ページ: ${dazhi.pageUrl}

## よくある質問

${faqLines}

## 最新記事
${articleLines}

## 安全・合法性
- 合法民宿登録: ${hellohouse.nameEn}（${hellohouse.license}）、${godin.nameEn}（${godin.license}）
- 公共賠償責任保険: 富邦産険加入済み
- Google評価: ハローハウス 4.5星（75件）
- 実績: 2017年より5,000組以上の宿泊
`;
}
