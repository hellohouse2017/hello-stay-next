#!/usr/bin/env npx tsx
/**
 * SEO 活動文章批次產生器
 * 使用 GPT-5.4 via LiteLLM 生成 24 篇高雄活動 SEO 文章
 * 
 * Usage: npx tsx scripts/generate-seo-articles.ts
 * Output: scripts/generated-articles-output.ts (可直接貼入 scheduled-articles.ts)
 */

const API_BASE = "http://mac-mini.tailfdcc16.ts.net:4000/v1";
const API_KEY = "sk-jDXAorQ1hbhwyAmWRy3yaQ";
const MODEL = "gpt-5.4";

// ── 24 篇文章 Metadata ──
interface ArticleMeta {
    slug: string;
    title: string;
    description: string;
    emoji: string;
    tags: string[];
    excerpt: string;
    type: "evergreen" | "timely";
    eventName?: string;
    eventMonth?: number;
    keywords: string[];
}

const articles: ArticleMeta[] = [
    // ── 常青文（10 篇）──
    {
        slug: "kaohsiung-concert-accommodation",
        title: "高雄演唱會住哪最順？巨蛋、左營、鹽埕 3 區比較",
        description: "高雄演唱會住宿完整比較，依場館位置推薦最佳住宿區域。巨蛋、世運主場館、流行音樂中心周邊攻略。",
        emoji: "🎤", tags: ["演唱會", "住宿"],
        excerpt: "看完演唱會不想人擠人搶計程車？住對區域，散場後散步就到。",
        type: "evergreen",
        keywords: ["高雄演唱會住宿", "高雄巨蛋民宿", "世運主場館住宿"],
    },
    {
        slug: "kaohsiung-3day-seasonal",
        title: "高雄三天兩夜行程推薦：四季都適用的慢旅行路線",
        description: "高雄三天兩夜自由行行程推薦，依四季特色規劃路線。鹽埕、駁二、旗津一條龍攻略。",
        emoji: "📋", tags: ["行程", "三天兩夜"],
        excerpt: "不管什麼季節來高雄，這條路線都好走。住鹽埕，步行就能玩透。",
        type: "evergreen",
        keywords: ["高雄三天兩夜", "高雄自由行", "高雄行程規劃"],
    },
    {
        slug: "yancheng-midnight-food-map",
        title: "鹽埕區深夜美食 × 住宿動線地圖",
        description: "高雄鹽埕區深夜美食完整地圖，附住宿動線規劃。活動散場後的宵夜攻略。",
        emoji: "🌙", tags: ["美食", "鹽埕區"],
        excerpt: "大港開唱散場、演唱會結束、跨年倒數後⋯⋯鹽埕的深夜小吃等著你。",
        type: "evergreen",
        keywords: ["鹽埕美食", "鹽埕宵夜", "高雄深夜美食"],
    },
    {
        slug: "kaohsiung-arena-accommodation",
        title: "高雄巨蛋/世運主場館住宿比較：追星住哪一區最順",
        description: "看演唱會住高雄巨蛋附近還是世運主場館附近？交通時間、餐飲選擇、住宿品質完整比較。",
        emoji: "🏟️", tags: ["巨蛋", "住宿"],
        excerpt: "巨蛋在左營、世運在鳳山，但住鹽埕才是追星的最佳基地。我跟你說為什麼。",
        type: "evergreen",
        keywords: ["高雄巨蛋住宿", "世運住宿", "高雄追星住宿"],
    },
    {
        slug: "kaohsiung-summer-stay",
        title: "夏天來高雄怎麼住不狼狽？交通、宵夜、沖澡動線一次講清楚",
        description: "高雄夏天住宿攻略，從交通散熱、活動規劃到住宿選擇，讓你夏天來高雄不再汗流浹背。",
        emoji: "☀️", tags: ["夏天", "住宿"],
        excerpt: "高雄 35 度不是開玩笑。但只要住對地方、排對行程，夏天來高雄一樣舒服。",
        type: "evergreen",
        keywords: ["高雄夏天住宿", "高雄暑假住宿", "高雄旅遊攻略"],
    },
    {
        slug: "kaohsiung-family-accommodation",
        title: "高雄親子住宿推薦：帶小孩也能輕鬆的住宿空間",
        description: "高雄親子友善住宿推薦，有廚房、獨立衛浴、寬敞客廳的包棟民宿，帶小孩出遊不再崩潰。",
        emoji: "👶", tags: ["親子", "家庭"],
        excerpt: "帶小孩住飯店怕吵到隔壁？包棟整棟都是你的，小孩怎麼跑都不怕。",
        type: "evergreen",
        keywords: ["高雄親子住宿", "高雄親子民宿", "高雄家庭住宿"],
    },
    {
        slug: "kaohsiung-wenqing-bnb",
        title: "高雄文青民宿推薦：老屋改建的質感空間",
        description: "高雄文青風格民宿推薦，老屋改建、工業風、復古設計。每個角落都是拍照打卡點。",
        emoji: "📸", tags: ["文青", "老屋"],
        excerpt: "紅磚牆、木質調、自然光⋯⋯住在鹽埕的老屋裡，每個角落都是打卡點。",
        type: "evergreen",
        keywords: ["高雄文青民宿", "高雄老屋民宿", "高雄設計住宿"],
    },
    {
        slug: "kaohsiung-backpacker-guide",
        title: "高雄背包客住宿攻略：平價又有品質的選擇",
        description: "高雄背包客住宿推薦，從青旅到小包棟，各種預算的住宿方案完整比較。",
        emoji: "🎒", tags: ["背包客", "平價"],
        excerpt: "預算有限但不想犧牲品質？高雄其實有很多高 CP 值的住法。",
        type: "evergreen",
        keywords: ["高雄背包客住宿", "高雄平價民宿", "高雄青旅推薦"],
    },
    {
        slug: "kaohsiung-event-accommodation-guide",
        title: "高雄活動住宿總整理：按場館選住宿最聰明",
        description: "高雄各大場館周邊住宿推薦總整理，巨蛋、世運、流行音樂中心、展覽館一次看完。",
        emoji: "📍", tags: ["活動", "住宿"],
        excerpt: "不管是演唱會、展覽還是音樂祭，先看場館在哪，再選住哪，就不會踩雷。",
        type: "evergreen",
        keywords: ["高雄活動住宿", "高雄展覽住宿", "高雄看展住哪"],
    },
    {
        slug: "pier2-stay-complete-guide",
        title: "駁二藝術特區住宿推薦：住鹽埕逛駁二的完整攻略",
        description: "駁二藝術特區周邊住宿推薦，住鹽埕區步行即達。含散步路線、美食地圖、交通攻略。",
        emoji: "🎨", tags: ["駁二", "住宿"],
        excerpt: "住鹽埕 = 駁二步行圈 + 美食圈 + 捷運圈。三個圈重疊的黃金地段。",
        type: "evergreen",
        keywords: ["駁二住宿推薦", "駁二附近民宿", "鹽埕住宿推薦"],
    },

    // ── 時效文（14 篇）──
    {
        slug: "kaohsiung-nye-stay-2027",
        title: "高雄跨年住宿推薦：散場不卡人潮，住鹽埕最聰明",
        description: "高雄跨年住宿攻略，看完煙火不用人擠人搶車。住鹽埕散步回民宿，還能吃宵夜。",
        emoji: "🎆", tags: ["跨年", "住宿"],
        excerpt: "跨年散場最痛苦的就是交通。住鹽埕，走路就回房，還能順路吃宵夜。",
        type: "timely", eventName: "高雄跨年晚會", eventMonth: 12,
        keywords: ["高雄跨年住宿", "夢時代跨年民宿", "高雄跨年訂房"],
    },
    {
        slug: "kaohsiung-cny-stay-2027",
        title: "高雄春節住宿：過年來鹽埕走春、駁二看展",
        description: "春節過年高雄包棟住宿推薦，有廚房煮年菜、有麻將打到初五。附春節行程規劃。",
        emoji: "🧧", tags: ["春節", "過年"],
        excerpt: "過年不想窩在家？帶全家來高雄，有廚房煮年菜，有麻將桌打到初五。",
        type: "timely", eventName: "農曆春節", eventMonth: 1,
        keywords: ["高雄春節住宿", "高雄過年住宿", "高雄過年民宿"],
    },
    {
        slug: "kaohsiung-lantern-stay",
        title: "高雄燈會住宿攻略：愛河灣附近怎麼住最順",
        description: "高雄燈會住宿推薦，愛河灣周邊步行可達的民宿。含燈會散步路線和交通攻略。",
        emoji: "🏮", tags: ["燈會", "住宿"],
        excerpt: "燈會人潮超可怕，但住在鹽埕就是任性。看完燈會散步回房，不用擠公車。",
        type: "timely", eventName: "高雄燈會", eventMonth: 2,
        keywords: ["高雄燈會住宿", "愛河住宿", "高雄元宵住宿"],
    },
    {
        slug: "megaport-fest-stay",
        title: "大港開唱住宿攻略：散場後回鹽埕，走路就到",
        description: "大港開唱住宿推薦，駁二會場步行可達的包棟民宿。含交通、宵夜、散場動線攻略。",
        emoji: "🎸", tags: ["大港開唱", "音樂祭"],
        excerpt: "大港開唱跳到腿軟？從會場走路回民宿不用 10 分鐘。洗個澡倒頭就睡。",
        type: "timely", eventName: "大港開唱", eventMonth: 3,
        keywords: ["大港開唱住宿", "大港開唱民宿", "高雄音樂祭住宿"],
    },
    {
        slug: "yancheng-art-festival-stay",
        title: "鹽埕藝術季住宿：住在藝術裡的散步路線",
        description: "鹽埕藝術季住宿推薦，住在展區核心，步行即可逛完所有展場。含散步路線地圖。",
        emoji: "🎨", tags: ["藝術季", "鹽埕"],
        excerpt: "展場散佈在鹽埕巷弄裡，住在這裡就是住在藝術裡面。出門就是展覽。",
        type: "timely", eventName: "鹽埕藝術季", eventMonth: 3,
        keywords: ["鹽埕藝術季住宿", "鹽埕展覽住宿", "高雄藝術住宿"],
    },
    {
        slug: "namasia-firefly-stay",
        title: "那瑪夏賞螢季住宿：白天看螢火蟲，晚上回城市住",
        description: "那瑪夏賞螢季住宿攻略。白天上山賞螢，晚上回高雄市區住包棟。含交通攻略。",
        emoji: "✨", tags: ["賞螢", "那瑪夏"],
        excerpt: "山上看螢火蟲很夢幻，但住山上不方便。回城市住包棟，舒服又便利。",
        type: "timely", eventName: "那瑪夏賞螢季", eventMonth: 4,
        keywords: ["那瑪夏賞螢住宿", "高雄賞螢住宿", "那瑪夏交通"],
    },
    {
        slug: "kaohsiung-children-day-stay",
        title: "高雄兒童節住宿：帶小孩放電的連假攻略",
        description: "兒童節連假高雄親子住宿推薦，帶小孩放電的行程規劃和包棟住宿攻略。",
        emoji: "🧒", tags: ["兒童節", "親子"],
        excerpt: "兒童節連假去哪？高雄動物園 + 駁二小火車 + 包棟煮火鍋，小孩開心大人輕鬆。",
        type: "timely", eventName: "兒童節", eventMonth: 4,
        keywords: ["高雄兒童節住宿", "高雄親子連假", "高雄兒童活動"],
    },
    {
        slug: "kaohsiung-beer-fest-stay",
        title: "高雄啤酒音樂節住宿：微醺之後走路回民宿",
        description: "高雄啤酒音樂節住宿推薦，喝完啤酒不用擔心交通，走路就能回到民宿。",
        emoji: "🍺", tags: ["啤酒節", "音樂節"],
        excerpt: "啤酒喝到微醺，不用叫代駕。走路回民宿，路上還能再吃一攤。",
        type: "timely", eventName: "高雄啤酒音樂節", eventMonth: 7,
        keywords: ["高雄啤酒節住宿", "高雄音樂節住宿", "高雄夏日活動"],
    },
    {
        slug: "cijin-kite-festival-stay",
        title: "旗津風箏節住宿：看風箏、玩海水的夏日住宿攻略",
        description: "旗津風箏節住宿推薦，白天旗津玩水看風箏，傍晚回鹽埕吃宵夜的夏日攻略。",
        emoji: "🪁", tags: ["風箏節", "旗津"],
        excerpt: "旗津看風箏、玩海水，傍晚搭渡輪回來洗個澡，晚上鹽埕吃宵夜。完美一天。",
        type: "timely", eventName: "旗津風箏節", eventMonth: 7,
        keywords: ["旗津風箏節住宿", "旗津住宿推薦", "高雄海邊住宿"],
    },
    {
        slug: "kaohsiung-design-fest-stay",
        title: "高雄設計節住宿：白天看展，晚上回老宅喝一杯",
        description: "高雄設計節住宿推薦，駁二展覽+設計節步行圈的包棟民宿。含觀展路線。",
        emoji: "🖌️", tags: ["設計節", "展覽"],
        excerpt: "設計節每年在駁二，住鹽埕就是住在展區旁邊。白天逛展，晚上回老宅喝酒。",
        type: "timely", eventName: "高雄設計節", eventMonth: 10,
        keywords: ["高雄設計節住宿", "駁二設計住宿", "高雄展覽住宿"],
    },
    {
        slug: "lotus-pond-wannian-stay",
        title: "蓮池潭萬年季住宿：夜市逛到腳軟走回民宿",
        description: "左營萬年季住宿推薦，蓮池潭攻炮城看火獅。含交通攻略和民俗活動導覽。",
        emoji: "🏮", tags: ["萬年季", "左營"],
        excerpt: "萬年季的火獅超震撼！看完逛夜市，吃到腳軟再回民宿。",
        type: "timely", eventName: "左營萬年季", eventMonth: 10,
        keywords: ["萬年季住宿", "蓮池潭民宿", "左營住宿推薦"],
    },
    {
        slug: "kaohsiung-halloween-stay",
        title: "高雄萬聖節活動住宿：衛武營搞怪之夜攻略",
        description: "高雄萬聖節活動住宿推薦，衛武營萬聖節派對+變裝遊行攻略。",
        emoji: "🎃", tags: ["萬聖節", "活動"],
        excerpt: "衛武營的巨型南瓜和變裝遊行，然後回民宿繼續萬聖節趴。",
        type: "timely", eventName: "衛武營萬聖節", eventMonth: 10,
        keywords: ["高雄萬聖節住宿", "衛武營萬聖節", "高雄萬聖活動"],
    },
    {
        slug: "bts-kaohsiung-stay",
        title: "BTS 防彈少年團高雄住宿懶人包",
        description: "BTS防彈少年團高雄演唱會住宿攻略，從搶票到住宿一次搞定。含場館交通和周邊美食。",
        emoji: "💜", tags: ["BTS", "演唱會"],
        excerpt: "搶到票了嗎？下一步就是搶房間。高雄BTS場最佳住宿攻略。",
        type: "timely", eventName: "BTS 世界巡迴高雄站", eventMonth: 11,
        keywords: ["BTS高雄住宿", "防彈高雄民宿", "高雄演唱會住宿"],
    },
    {
        slug: "kaohsiung-christmas-stay",
        title: "高雄聖誕住宿：12 月最有氣氛的住宿提案",
        description: "高雄聖誕節住宿推薦，12月最有冬日氣氛的包棟體驗。含聖誕派對規劃攻略。",
        emoji: "🎄", tags: ["聖誕", "住宿"],
        excerpt: "南部的聖誕不用穿大衣。來高雄鹽埕散散步，回民宿辦交換禮物。剛剛好。",
        type: "timely", eventName: "聖誕節", eventMonth: 12,
        keywords: ["高雄聖誕住宿", "高雄12月住宿", "高雄冬天旅遊"],
    },
];

// ── Prompt Template ──
function buildPrompt(meta: ArticleMeta): string {
    return `你是一位在高雄鹽埕區經營包棟民宿 8 年的在地人（Hello Stay / 你好哇寓所 + 溝頂民宿）。
你要寫一篇 SEO 部落格文章，風格是「像朋友在 LINE 上聊天推薦」，不是企劃書或新聞稿。

## 品牌資訊
- 你好哇寓所：6間房，6-26人包棟，中島廚房、麻將桌、桌遊、Netflix
- 溝頂民宿：4間房，10-12人獨棟，5層樓
- 地點：鹽埕區，步行10分鐘到駁二、5分鐘到捷運鹽埕埔站
- 風格：老屋改建、工業風、文青
- 平日 $10,000 起
- 官網：hello-stay.com

## 文章規格
- 標題：${meta.title}
- 主關鍵字：${meta.keywords[0]}
- 長尾關鍵字：${meta.keywords.slice(1).join("、")}
- 對應活動：${meta.eventName || "（常青文，非特定活動）"}

## 寫作規則
1. 口語化、親切、像朋友推薦。不要用「首先」「其次」「總而言之」
2. 每個段落要有畫面感，讓讀者「想住」
3. 主關鍵字自然出現 3-5 次，不要硬塞
4. 必須包含真實在地資訊：路名、店名、捷運站名、步行時間
5. 禁止：「令人驚艷」「非常推薦」「絕對不能錯過」這類空泛形容
6. 文章要有訂房導流：自然提到 Hello Stay 的優勢
7. 每段 content 用純文字，段落之間用 \\n\\n 分隔，不要用 markdown

## 輸出格式（嚴格 JSON）
請輸出以下 JSON 結構，不要加任何 markdown 標記或解釋文字：
{
  "sections": [
    { "id": "section-id", "title": "段落標題（含關鍵字）", "content": "段落內容，200-400字" },
    { "id": "section-id-2", "title": "...", "content": "..." },
    { "id": "section-id-3", "title": "...", "content": "..." }
  ],
  "faq": [
    { "q": "常見問題（含關鍵字）", "a": "回答（50-100字）" },
    { "q": "...", "a": "..." }
  ]
}

請生成 3-4 個 sections 和 2-3 個 FAQ。`;
}

// ── API Call ──
async function callGPT(prompt: string): Promise<string> {
    const res = await fetch(`${API_BASE}/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                { role: "system", content: "你是一個 JSON 生成器。只輸出合法的 JSON，不要加任何 markdown 標記、解釋文字或程式碼框。直接以 { 開頭。" },
                { role: "user", content: prompt }
            ],
        }),
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`API Error ${res.status}: ${err}`);
    }

    const data = await res.json();
    return data.choices[0].message.content;
}

// ── Parse JSON from GPT response ──
function parseGPTResponse(raw: string): { sections: any[]; faq: any[] } {
    // Try direct parse first (should work with response_format: json_object)
    try {
        return JSON.parse(raw);
    } catch {}

    // Fallback: extract JSON from markdown fences
    let jsonStr = raw;
    const fenceMatch = raw.match(/```(?:json)?\s*\n([\s\S]*?)\n\s*```/);
    if (fenceMatch) jsonStr = fenceMatch[1];
    
    // Try to find JSON object
    const objMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (objMatch) jsonStr = objMatch[0];

    try {
        return JSON.parse(jsonStr);
    } catch (e: any) {
        console.error(`  Parse error: ${e.message}`);
        console.error(`  Raw response (first 300 chars): ${raw.slice(0, 300)}`);
        throw e;
    }
}

// ── Generate article entry as TS string ──
function toTsEntry(meta: ArticleMeta, content: { sections: any[]; faq: any[] }): string {
    const entry = {
        slug: meta.slug,
        title: meta.title,
        description: meta.description,
        publishDate: "2026-03-24",
        emoji: meta.emoji,
        tags: meta.tags,
        excerpt: meta.excerpt,
        sections: content.sections,
        faq: content.faq,
    };
    return JSON.stringify(entry, null, 4);
}

// ── Main ──
async function main() {
    console.log(`\n🚀 Starting SEO article generation with ${MODEL}`);
    console.log(`📝 Articles to generate: ${articles.length}\n`);

    const results: string[] = [];
    let success = 0;
    let failed = 0;

    for (let i = 0; i < articles.length; i++) {
        const meta = articles[i];
        const label = `[${i + 1}/${articles.length}]`;
        console.log(`${label} Generating: ${meta.title}...`);

        try {
            const prompt = buildPrompt(meta);
            const raw = await callGPT(prompt);
            const content = parseGPTResponse(raw);

            if (!content.sections || content.sections.length === 0) {
                throw new Error("No sections in response");
            }

            results.push(toTsEntry(meta, content));
            success++;
            console.log(`  ✅ Done (${content.sections.length} sections, ${content.faq?.length || 0} FAQ)`);
        } catch (err: any) {
            failed++;
            console.error(`  ❌ Failed: ${err.message}`);
            // Generate fallback
            const fallback = {
                sections: [
                    { id: "main", title: meta.title.split("：")[1] || meta.title, content: `${meta.excerpt}\n\n（此文章內容待補充）` },
                ],
                faq: meta.keywords.map(k => ({ q: `${k}推薦哪裡？`, a: `推薦 Hello Stay 包棟民宿，位於鹽埕區步行 10 分鐘到駁二。` })),
            };
            results.push(toTsEntry(meta, fallback));
        }

        // Rate limit: wait 2s between calls
        if (i < articles.length - 1) {
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    // Write output
    const output = `// ── SEO 活動文章（自動生成 ${new Date().toISOString().slice(0, 10)}）──
// 請將以下內容追加到 scheduled-articles.ts 的 scheduledArticles 陣列中

${results.map(r => `    ${r}`).join(",\n")}
`;

    const fs = await import("fs");
    const path = await import("path");
    const outPath = path.join(__dirname, "generated-articles-output.ts");
    fs.writeFileSync(outPath, output, "utf-8");

    console.log(`\n${"=".repeat(50)}`);
    console.log(`✅ Success: ${success}  ❌ Failed: ${failed}`);
    console.log(`📄 Output: ${outPath}`);
    console.log(`${"=".repeat(50)}\n`);
}

main().catch(console.error);
