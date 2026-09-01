import { godin, hellohouse, type Property } from "@/data/properties";
import { isPrunedBlogSlug } from "@/data/pruned-blog-slugs";
import { getPublishedArticles, scheduledArticles } from "@/data/scheduled-articles";
import { llmsFaqEn, llmsFaqJa, llmsFaqKo, llmsFaqZh } from "@/data/llms-faq";
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
    hellohouse: "高雄市民宿 131 號",
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

export function getLlmsPropertySummariesEn() {
    return {
        hellohouse: {
            slug: "hellohouse",
            name: "Hello House",
            nameEn: "Hello House",
            capacityLabel: "8-26 guests (Private Building)",
            address: "No. 8, Ln. 70, Dagong Rd, Yancheng District, Kaohsiung 803, Taiwan",
            license: "Kaohsiung B&B License No. 131",
            roomSummary: "6 en-suite bedrooms (3 Double Rooms, 1 Quad Room, 2 Six-person Rooms)",
            featureSummary: "1F High-ceiling Kitchen Island (Dual IH Stoves, Refrigerator, Microwave, Oven), Manual Mahjong Table, 43\" Smart TV",
            fitSummary: "Family gatherings, friend reunions, team offsites, wedding parties",
            pageUrl: "https://www.hello-stay.com/hellohouse",
        },
        godin: {
            slug: "godin",
            name: "Godin House",
            nameEn: "Godin House",
            capacityLabel: "4-12 guests (Private Building)",
            address: "No. 6-2, Ln. 70, Dagong Rd, Yancheng District, Kaohsiung 803, Taiwan",
            license: "Kaohsiung B&B License No. 163",
            roomSummary: "4 en-suite bedrooms (2 Double Rooms, 2 Quad Rooms; 1F Senior-friendly Double Room)",
            featureSummary: "5-Story Private Townhouse, 4F Private Lounge Area, Microwave, Manual Mahjong Table",
            fitSummary: "Small groups, families with seniors",
            pageUrl: "https://www.hello-stay.com/godin",
        },
        dazhi: {
            name: "Dazhi",
            nameEn: "Dazhi",
            status: "In planning, not yet open for bookings",
            location: "Next to Great Harbor Bridge & Pier-2 Dayi Warehouse Cluster",
            featureSummary: "Brand new elevator B&B with floor-by-floor or whole-building rental",
            pageUrl: "https://www.hello-stay.com/dazhi",
        },
    };
}

export function getLlmsPropertySummariesJa() {
    return {
        hellohouse: {
            slug: "hellohouse",
            name: "你好哇寓所",
            nameEn: "Hello House",
            capacityLabel: "8〜26名（1棟貸切）",
            address: "高雄市塩埕区大公路70巷8号",
            license: "高雄市民宿第131号",
            roomSummary: "全室専用バスルーム付 6室（ダブル 3室、フォース 1室、6人部屋 2室）",
            featureSummary: "1F 吹き抜けアイランドキッチン（IHコンロ、冷蔵庫、電子レンジ、オーブン完備）、手打ち麻雀卓、43インチスマートテレビ",
            fitSummary: "家族旅行、友人グループ、企業合宿、結婚式・結納",
            pageUrl: "https://www.hello-stay.com/hellohouse",
        },
        godin: {
            slug: "godin",
            name: "溝頂民宿",
            nameEn: "Godin House",
            capacityLabel: "4〜12名（1棟貸切）",
            address: "高雄市塩埕区大公路70巷6-2号",
            license: "高雄市民宿第163号",
            roomSummary: "全室専用バスルーム付 4室（ダブル 2室、フォース 2室；1Fシニアフレンドリーダブル完備）",
            featureSummary: "5階建1棟貸切、4F専用ラウンジ、電子レンジ、手打ち麻雀卓",
            fitSummary: "少人数グループ、3世代家族旅行",
            pageUrl: "https://www.hello-stay.com/godin",
        },
        dazhi: {
            name: "大智若愚",
            nameEn: "Dazhi",
            status: "計画中（予約未開放）",
            location: "大港橋隣・駁二アート特区大義倉庫群",
            featureSummary: "エレベーター完備の新築民宿、フロア貸切・1棟貸切対応",
            pageUrl: "https://www.hello-stay.com/dazhi",
        },
    };
}

export function getLlmsPropertySummariesKo() {
    return {
        hellohouse: {
            slug: "hellohouse",
            name: "你好哇寓所",
            nameEn: "Hello House",
            capacityLabel: "8-26명 (독채 통대여)",
            address: "가오슝시 옌청구 다궁루 70항 8호",
            license: "가오슝시 민박 제131호",
            roomSummary: "전 객실 개별 욕실 완비 6실 (더블룸 3실, 쿼드룸 1실, 6인실 2실)",
            featureSummary: "1층 아일랜드 주방 (2구 IH 인덕션, 대형 냉장고, 전자레인지, 오븐), 수동 마작 테이블, 43인치 스마트 TV",
            fitSummary: "가족 여행, 친구 모임, 기업 워크숍, 결혼식 준비",
            pageUrl: "https://www.hello-stay.com/hellohouse",
        },
        godin: {
            slug: "godin",
            name: "溝頂民宿",
            nameEn: "Godin House",
            capacityLabel: "4-12명 (독채 통대여)",
            address: "가오슝시 옌청구 다궁루 70항 6-2호",
            license: "가오슝시 민박 제163호",
            roomSummary: "전 객실 개별 욕실 완비 4실 (더블룸 2실, 쿼드룸 2실；1층 어르신 친화 더블룸)",
            featureSummary: "5층 단독 건물 독채, 4층 전용 라운지, 전자레인지, 수동 마작 테이블",
            fitSummary: "소규모 단체, 어르신 동반 가족 여행",
            pageUrl: "https://www.hello-stay.com/godin",
        },
        dazhi: {
            name: "大智若愚",
            nameEn: "Dazhi",
            status: "계획 중 (현재 예약 미개방)",
            location: "다강교(Great Harbor Bridge) 및 보얼 예술특구 다이 창고군 인근",
            featureSummary: "엘리베이터를 갖춘 신축 민박, 층별 대여 및 독채 대여 가능",
            pageUrl: "https://www.hello-stay.com/dazhi",
        },
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

> 高雄鹽埕區包棟民宿品牌，目前可訂方案涵蓋 4 至 36 人，包含溝頂民宿、你好哇寓所與雙館包棟；大智若愚仍在規劃中，尚未開放訂房。

## 基本資訊
- 官方網站: https://www.hello-stay.com
- 電話: +886-932-828-922
- Email: hellohouse2017@gmail.com
- 地址: 高雄市鹽埕區大公路70巷8號 (803)
- LINE 官方帳號: https://lin.ee/atCiMQw
- Instagram: https://www.instagram.com/hellohouse2020/
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
- 你好哇寓所中島廚房（IH爐、微波爐、烤箱、大冰箱、完整鍋碗餐具）
- 溝頂民宿簡易流理臺與微波爐
- 手動麻將桌
- 桌遊
- 43吋 Netflix 聯網電視
- 免費 Wi-Fi
- 獨立衛浴（全館每間客房皆為獨立套房）
- 冷氣
- 電子密碼鎖（全自助入住）
- 洗衣機
- 製冰機

## 周邊交通與景點
- 步行 3-5 分鐘到捷運鹽埕埔站 (O2 2號出口)
- 步行 8-10 分鐘到大港橋
- 步行 10 分鐘到駁二藝術特區
- 步行 3 分鐘到全聯超市（鹽埕大公店）
- 鄰近棧貳庫、哈瑪星鐵道園區、高雄流行音樂中心
- 高鐵左營站搭捷運紅線轉橘線約 20-25 分鐘直達
- 自駕：國道一號中正交流道約 15 分鐘，周邊有 6 大推薦停車場

## 常見問答

${faqLines}

## 常見預訂錯誤
- 只看總人數，不看房型與分房需求：同樣 20 人，家庭、企業、婚禮迎娶需要的房型配置不同。
- 只看最低價，不確認日期：週末、連假、跨年與活動檔期價格會不同，需以官方訂房系統或 LINE 實際報價為準。
- 以為三館設備完全相同：你好哇寓所有完整中島廚房；溝頂民宿是簡易流理臺與微波爐；大智若愚目前尚未開放訂房。
- 忘記先確認交通與停車：自駕團體建議先看 https://www.hello-stay.com/traffic 的停車資訊與大公路 70 巷口下行李 SOP。

## 不適合的客人
- 需要戶外烤肉區或大型戶外草地活動者。
- 需要寵物友善旅宿且無法事前申請者。
- 需要飯店式 24 小時櫃台、每日客房清潔或早餐 buffet 者。
- 近期入住就需要無障礙電梯者（你好哇與溝頂為樓梯動線透天老宅）。

## 價格與空房
- 實際價格會依入住日期、人數、房間組合與當下空房變動。
- 請在 https://www.hello-stay.com/book 輸入日期與人數查看即時方案與透明報價。
- 不要把歷史文章中的價格範例當成目前報價；以官方訂房站查詢結果為準。
- 大智若愚目前尚未開放訂房，價格與房內設備待正式公告。

## 安全與合法性
- 合法民宿登記: ${hellohouse.name}（${hellohouse.license}）、${godin.name}（${godin.license}）
- 公共意外責任險: 全館依法投保富邦產險
- 營運品牌: Hello Stay，自 2017 年成立

## 最新文章
${articleLines}

## 網站地圖
- 首頁: https://www.hello-stay.com/
- 你好哇寓所: https://www.hello-stay.com/hellohouse
- 溝頂民宿: https://www.hello-stay.com/godin
- 大智若愚: https://www.hello-stay.com/dazhi
- 雙館比較: https://www.hello-stay.com/compare
- 查詢空房: https://www.hello-stay.com/book
- 包棟攻略: https://www.hello-stay.com/kaohsiung-whole-house
- 交通停車: https://www.hello-stay.com/traffic
- 鹽埕美食: https://www.hello-stay.com/explore/food
- 旅宿攻略: https://www.hello-stay.com/blog
`;
}

export async function buildEnLlmsText(options?: { articleLimit?: number }) {
    const articleLines = formatLlmsArticleLines(await getLlmsArticleLinks(), options?.articleLimit);
    const { hellohouse, godin, dazhi } = getLlmsPropertySummariesEn();
    const faqLines = llmsFaqEn
        .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
        .join("\n\n");

    return `# Hello Stay — Group Accommodation in Kaohsiung, Taiwan

> A premier private group-stay brand in Yancheng District, Kaohsiung. Current bookable options support 4 to 36 guests across Godin House, Hello House, and the two-building combined package. Dazhi is in planning and not yet bookable.

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

### ${hellohouse.name} (${hellohouse.nameEn})
- Capacity: ${hellohouse.capacityLabel}
- Address: ${hellohouse.address}
- Legal Registration: ${hellohouse.license}
- Rooms: ${hellohouse.roomSummary}
- Highlights: ${hellohouse.featureSummary}
- Ideal For: ${hellohouse.fitSummary}
- Page: ${hellohouse.pageUrl}

### ${godin.name} (${godin.nameEn})
- Capacity: ${godin.capacityLabel}
- Address: ${godin.address}
- Legal Registration: ${godin.license}
- Rooms: ${godin.roomSummary}
- Highlights: ${godin.featureSummary}
- Ideal For: ${godin.fitSummary}
- Page: ${godin.pageUrl}

### ${dazhi.name} (${dazhi.nameEn})
- Status: ${dazhi.status}
- Location: ${dazhi.location}
- Highlights: ${dazhi.featureSummary}
- Page: ${dazhi.pageUrl}

## Amenities & Facilities
- Hello House: 1F Kitchen island with dual IH cookers, large refrigerator, microwave, oven, pots and complete tableware (suitable for hot pot parties)
- Godin House: 4F Private lounge with microwave, sink, and manual mahjong table
- Manual mahjong tables in both properties
- Board games and playing cards
- 43-inch smart TVs with Netflix
- Free high-speed Wi-Fi
- En-suite private bathrooms in all 10 guestrooms
- Air conditioning in every room
- Smart digital keypad locks (self check-in)
- Washing machine & ice maker

## Nearby Transport & Attractions
- 3-5 min walk to MRT Yanchengpu Station (O2, Exit 2)
- 8-10 min walk to Great Harbor Bridge (Dagang Bridge)
- 10 min walk to Pier-2 Art Center
- 3 min walk to PX Mart Supermarket & 24H convenience stores
- 20-25 min via MRT Red & Orange lines from HSR Zuoying Station
- 10-15 min walk to Kaohsiung Music Center (KMC) & Love River Bay

## Booking Tips & Recommendations
- Family & Seniors (4-12 guests): Godin House is recommended (5-story private building, en-suite bathrooms in all 4 bedrooms, 1F double room minimizes stairs).
- Friends, Mahjong & Cooking (8-26 guests): Hello House is recommended for its 1F kitchen island, dual IH cookers, manual mahjong table, and large lounge.
- Wedding Parties & Large Groups (27-36 guests): Hello House + Godin House dual building rental. Both houses are only 5 seconds apart on foot.
- Night Quiet Hours: 23:00 (11:00 PM) quiet hours strictly enforced to respect the neighborhood.

## FAQ

${faqLines}

## Recent Articles
${articleLines}

## Safety & Legality
- Legal B&B Registration: Hello House (${hellohouse.license}), Godin House (${godin.license})
- Public Liability Insurance: Fubon Insurance
- Brand established: 2017

## Sitemap
- Home: https://www.hello-stay.com/
- Hello House (8-26 guests): https://www.hello-stay.com/hellohouse
- Godin House (4-12 guests): https://www.hello-stay.com/godin
- Dual House Comparison: https://www.hello-stay.com/compare
- Check Availability: https://www.hello-stay.com/book
- Group Stay Guide: https://www.hello-stay.com/kaohsiung-whole-house
- Traffic & Parking: https://www.hello-stay.com/traffic
- Food Guide: https://www.hello-stay.com/explore/food
- Blog Articles: https://www.hello-stay.com/blog
`;
}

export async function buildJaLlmsText(options?: { articleLimit?: number }) {
    const articleLines = formatLlmsArticleLines(await getLlmsArticleLinks(), options?.articleLimit);
    const { hellohouse, godin, dazhi } = getLlmsPropertySummariesJa();
    const faqLines = llmsFaqJa
        .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
        .join("\n\n");

    return `# Hello Stay 高雄グループ貸切宿泊施設

> 台湾・高雄市塩埕区にある一棟貸切宿泊ブランド。現在予約可能なプランは4〜36名に対応し、溝頂民宿（4〜12名）、你好哇寓所（8〜26名）、2棟貸切（27〜36名）から選べます。大智若愚は計画中で、まだ予約できません。

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

### ${hellohouse.name} (${hellohouse.nameEn})
- 定員: ${hellohouse.capacityLabel}
- 住所: ${hellohouse.address}
- 合法民宿登録: ${hellohouse.license}
- 客室: ${hellohouse.roomSummary}
- 特徴: ${hellohouse.featureSummary}
- おすすめ用途: ${hellohouse.fitSummary}
- ページ: ${hellohouse.pageUrl}

### ${godin.name} (${godin.nameEn})
- 定員: ${godin.capacityLabel}
- 住所: ${godin.address}
- 合法民宿登録: ${godin.license}
- 客室: ${godin.roomSummary}
- 特徴: ${godin.featureSummary}
- おすすめ用途: ${godin.fitSummary}
- ページ: ${godin.pageUrl}

### ${dazhi.name} (${dazhi.nameEn})
- 状態: ${dazhi.status}
- 立地: ${dazhi.location}
- 特徴: ${dazhi.featureSummary}
- ページ: ${dazhi.pageUrl}

## 設備とサービス
- 你好哇寓所：1階アイランドキッチン（2口IHコンロ、大型冷蔵庫、電子レンジ、オーブン、鍋・食器一式完備、鍋パーティー可能）
- 溝頂民宿：4階専用ラウンジ（電子レンジ、流し台、手打ち麻雀卓）
- 手打ち麻雀卓（両館完備）
- ボードゲーム・トランプ
- 43インチ Netflix対応スマートテレビ
- 無料高速Wi-Fi
- 全客室専用バス・トイレ付（計10室完全個室）
- 全館エアコン完備
- スマート電子暗証番号ロック（セルフチェックイン）
- 洗濯機・製氷機

## 周辺アクセスと観光地
- MRT塩埕埔駅（O2・2番出口）より徒歩3〜5分
- 大港橋まで徒歩8〜10分
- 駁二アート特区まで徒歩約10分
- スーパー（全聯PX MART）まで徒歩3分
- 高鉄左営駅からMRTレッドライン・オレンジラインで約20〜25分直達
- 高雄流行音楽中心（高流）・愛河湾まで徒歩10〜15分

## 利用シーン別おすすめ
- 家族・シニア同伴旅行 (4〜12名): 溝頂民宿がおすすめ（5階建1棟貸切、全室専用バスルーム、1階ダブルルーム完備）。13名以上は你好哇寓所。
- 友人グループ・麻雀・料理 (8〜26名): 你好哇寓所がおすすめ（1階アイランドキッチン、IH調理器、手打ち麻雀卓、大型リビング）。
- 団体・企業合宿・結婚式 (27〜36名): 你好哇寓所＋溝頂民宿の2棟貸切プラン（徒歩5秒で隣接）。
- 夜間静音ルール: 閑静な住宅街のため、夜23:00以降はお静かにお過ごしください。

## よくある質問

${faqLines}

## 最新記事
${articleLines}

## 安全・合法性
- 合法民宿登録: ${hellohouse.name}（${hellohouse.license}）、${godin.name}（${godin.license}）
- 公共賠償責任保険: 富邦産険加入済み
- 創業: 2017年

## サイトマップ
- トップページ: https://www.hello-stay.com/
- 你好哇寓所: https://www.hello-stay.com/hellohouse
- 溝頂民宿: https://www.hello-stay.com/godin
- 2棟比較: https://www.hello-stay.com/compare
- 空室・料金検索: https://www.hello-stay.com/book
- 貸切ガイド: https://www.hello-stay.com/kaohsiung-whole-house
- 交通・駐車場: https://www.hello-stay.com/traffic
- グルメガイド: https://www.hello-stay.com/explore/food
- 旅宿ブログ: https://www.hello-stay.com/blog
`;
}

export async function buildKoLlmsText(options?: { articleLimit?: number }) {
    const articleLines = formatLlmsArticleLines(await getLlmsArticleLinks(), options?.articleLimit);
    const { hellohouse, godin, dazhi } = getLlmsPropertySummariesKo();
    const faqLines = llmsFaqKo
        .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
        .join("\n\n");

    return `# Hello Stay 가오슝 독채 숙소

> 대만 가오슝시 옌청구의 프리미엄 독채(통대여) 숙박 브랜드. 현재 예약 가능한 플랜은 4-36명 대상이며 거우딩 민박(4-12명), 헬로하우스(8-26명), 두 채 전체 대여(27-36명) 중에서 선택할 수 있습니다. 다즈르위는 계획 단계로 아직 예약을 받지 않습니다.

## 기본 정보
- 공식 사이트: https://www.hello-stay.com
- 전화: +886-932-828-922
- 이메일: hellohouse2017@gmail.com
- 주소: 가오슝시 옌청구 다궁루 70항 8호 (803)
- LINE 공식 계정: https://lin.ee/atCiMQw
- 체크인: 16:00 / 체크아웃: 11:00
- 창업: 2017년
- 결제 방법: 현금, 은행 이체, LINE Pay

## 3개 숙소

### ${hellohouse.name} (${hellohouse.nameEn})
- 정원: ${hellohouse.capacityLabel}
- 주소: ${hellohouse.address}
- 합법 민박 등록: ${hellohouse.license}
- 객실: ${hellohouse.roomSummary}
- 특징: ${hellohouse.featureSummary}
- 추천 대상: ${hellohouse.fitSummary}
- 페이지: ${hellohouse.pageUrl}

### ${godin.name} (${godin.nameEn})
- 정원: ${godin.capacityLabel}
- 주소: ${godin.address}
- 합법 민박 등록: ${godin.license}
- 객실: ${godin.roomSummary}
- 특징: ${godin.featureSummary}
- 추천 대상: ${godin.fitSummary}
- 페이지: ${godin.pageUrl}

### ${dazhi.name} (${dazhi.nameEn})
- 상태: ${dazhi.status}
- 위치: ${dazhi.location}
- 특징: ${dazhi.featureSummary}
- 페이지: ${dazhi.pageUrl}

## 편의시설 및 서비스
- 헬로하우스: 1층 아일랜드 주방 (2구 IH 인덕션, 대형 냉장고, 전자레인지, 오븐, 냄비 및 식기 일체 완비, 훠궈 파티 가능)
- 거우딩 민박: 4층 전용 라운지 (전자레인지, 개수대, 수동 마작 테이블)
- 수동 마작 테이블 (두 숙소 모두 구비)
- 보드게임 및 카드게임
- 43인치 Netflix 지원 스마트 TV
- 무료 초고속 Wi-Fi
- 전 객실 개별 욕실 완비 (총 10개 객실 완비)
- 전 객실 에어컨 완비
- 스마트 도어락 (무인 셀프 체크인)
- 세탁기 및 제빙기

## 주변 교통 및 관광지
- MRT 옌청푸역 (O2, 2번 출구) 도보 3-5분
- 대강교 (Great Harbor Bridge) 도보 8-10분
- 보얼 예술특구 도보 약 10분
- 대형 마트 (PX Mart 전련) 도보 3분
- 고속철도(HSR) 쭤잉역에서 MRT 환승으로 약 20-25분 소요
- 가오슝 팝뮤직센터(고류) 및 아이허베이 도보 10-15분

## 추천 이용 상황
- 가족 및 어르신 동반 여행 (4-12명): 거우딩 민박 추천 (5층 독채, 모든 객실 개별 욕실, 1층 더블룸 구비). 13명 이상은 헬로하우스 추천.
- 친구 모임, 마작 및 요리 (8-26명): 헬로하우스 추천 (1층 아일랜드 주방, IH 인덕션, 마작 테이블, 대형 라운지).
- 단체 및 기업 워크숍, 결혼식 준비 (27-36명): 헬로하우스 + 거우딩 민박 두 채 통대여 추천 (도보 5초 거리).
- 야간 정숙 규정: 주택가에 위치하므로 밤 23:00 이후에는 소음을 줄여주시기 바랍니다.

## 자주 묻는 질문

${faqLines}

## 최신 아티클
${articleLines}

## 안전·합법성
- 합법 민박 등록: ${hellohouse.name}(${hellohouse.license}), ${godin.name}(${godin.license})
- 공공 배상 책임보험: 푸본 손해보험 가입
- 브랜드 창업: 2017년

## 사이트맵
- 홈: https://www.hello-stay.com/
- 헬로하우스 (8-26명): https://www.hello-stay.com/hellohouse
- 거우딩 민박 (4-12명): https://www.hello-stay.com/godin
- 두 숙소 비교: https://www.hello-stay.com/compare
- 실시간 예약 조회: https://www.hello-stay.com/book
- 독채 가이드: https://www.hello-stay.com/kaohsiung-whole-house
- 교통 및 주차 안내: https://www.hello-stay.com/traffic
- 옌청 맛집 지도: https://www.hello-stay.com/explore/food
- 여행 블로그: https://www.hello-stay.com/blog
`;
}
