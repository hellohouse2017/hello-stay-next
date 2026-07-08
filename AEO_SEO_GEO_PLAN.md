# AEO / SEO / GEO 優化工作計劃

> 執行對象：Codex GPT-5.5
> 專案：Hello Stay 高雄包棟民宿官網（Next.js 16 App Router）
> 建立日期：2026-07-06
> 資料來源：程式碼盤點 + 2026-07-06 SEO 健康日報 + GSC/GA4 趨勢

---

## 0. 執行守則（Codex 必讀）

1. 開工前先讀 `context.md` 與 `AGENTS.md`。
2. **禁止**修改 `.env`、`next.config.js`。
3. 一律 ES modules（`import`/`export`），程式碼註解用英文，網站文案用繁體中文。
4. 每個任務完成後：跑對應驗收指令 → 確認 `npm run build` 通過 → 更新 `context.md`「最近變更」。
5. 單次改動超過 20 行的檔案，先在 commit message / PR 描述說明再做。
6. 不確定的事實（價格、房型、設施）**不要編造**，一律沿用 `src/data/properties.ts`、`llms.txt`、既有排程文章的既定內容；查不到就標 TODO，不要自己填。
7. 每個階段獨立可交付，照 P0 → P1 → P2 順序做，不要跳。

---

## 1. 現況診斷

### 1.1 已有的基礎（不要重做）
- `src/app/robots.ts`：已放行 GPTBot / ChatGPT-User / ClaudeBot / PerplexityBot / Google-Extended 等 AI 爬蟲。
- `src/app/llms.txt/route.ts`、`llms-full.txt`、`llms-en.txt`、`llms-ja.txt`：AI 摘要檔已存在（靜態字串）。
- `src/app/layout.tsx`：已有 `geo.region` / `geo.position` / hreflang / `<link rel="alternate">` 指向 llms.txt。
- 首頁 `src/app/page.tsx`：已有 `LodgingBusiness` + `Organization` + `WebSite`（含 `speakable`）JSON-LD。
- 排程文章分支（`scheduled-articles.ts`）：已輸出 `Article` + `BreadcrumbList` + `FAQPage`。
- SEO 健康檢查模組 `src/modules/seo/`：已驗證 robots / sitemap / llms / JSON-LD 覆蓋 / metadata 長度。
- `scripts/seo-driven-update.ts`：已能從 MongoDB 算出「需優化文章優先清單」，輸出 `scripts/seo-priority-list.json`。

### 1.2 已確認的缺口（本計劃要解決的）

| # | 問題 | 證據 | 影響面 |
|---|------|------|--------|
| A | **MDX 文章分支缺 FAQPage JSON-LD** | `src/app/blog/[slug]/page.tsx` MDX 分支（L74–103）只輸出 Article + BreadcrumbList；排程分支（L171–205）才有 FAQPage。純 MDX 文章（如 `taiwan-travel-foreign-guide`）拿不到 FAQ 複合結果 | AEO |
| B | **MDX 型別無 `faq` 欄位** | `src/lib/articles.ts` 的 `ArticleMetadata` 沒有 faq，frontmatter 也沒統一放 FAQ 的地方 | AEO |
| C | **AI 引用量為 0** | 日報「AI Assistants: Sessions 0 / Users 0 / Pageviews 0」 | GEO |
| D | **多語系內容頁缺口** | `src/app/en`、`ja` 只有 book/dazhi/godin/guide/hellohouse/traffic，**沒有 blog**；ko/vi 同理 | GEO / 國際 SEO |
| E | **首頁 CTR 過低** | GSC：首頁 502 曝光僅 8 點擊，CTR 1.6%，均排名 9.5 | SEO |
| F | **整體動能轉弱** | 近 28 天點擊 -25%、曝光 -27%；包棟核心詞群 28 天 -35% | SEO |
| G | **優先清單無下游動作** | `seo-driven-update.ts` 只產出清單，沒有把「該改的 title/description」落地的流程 | SEO 自動化 |

---

## 2. P0：AEO 結構化資料補完（最高優先，工程量小、收益直接）

### 任務 P0-1：MDX 文章支援 FAQ 並輸出 FAQPage

**目標**：讓所有 MDX 文章能像排程文章一樣輸出 FAQPage JSON-LD，讓 Google/AI 抽出 FAQ 複合結果。

**改動檔案**
1. `src/lib/articles.ts`
   - `ArticleMetadata` 介面新增：`faq?: { q: string; a: string }[]`。
   - `getArticleBySlug` 與 `getAllArticles` 讀取 `data.faq`（frontmatter 沒有時回傳 `undefined`，不要拋錯）。
2. `src/app/blog/[slug]/page.tsx`
   - MDX 分支的 `JsonLd data={[...]}` 陣列末端，比照排程分支加入條件式 FAQPage：
     ```ts
     ...(mdxArticle.faq && mdxArticle.faq.length > 0 ? [{
       "@context": "https://schema.org", "@type": "FAQPage",
       mainEntity: mdxArticle.faq.map(f => ({
         "@type": "Question", name: f.q,
         acceptedAnswer: { "@type": "Answer", text: f.a },
       })),
     }] : []),
     ```
   - 若文章有 faq，於內文區塊後再渲染一段可見的「常見問答」HTML（比照排程分支 L233–245 的樣式），確保 schema 與畫面內容一致（Google 要求 FAQ 內容須在頁面可見）。
3. MDX frontmatter 補 FAQ：
   - 先處理內文已有 FAQ 段落的 `kaohsiung-mahjong-stay.mdx`、`kaohsiung-group-trip.mdx`，把內文問答轉成 frontmatter `faq:` 陣列（**內容照抄，不要新編**）。
   - `taiwan-travel-foreign-guide.mdx` 若無 FAQ 段落，標 `TODO: 補 3–5 題 FAQ`，不要自己編。

**驗收標準**
- `npm run build` 通過。
- `npm run test:seo-page-health` 通過。
- 本地啟動後，MDX 文章頁 HTML 內含 `"@type":"FAQPage"`，且問答文字在頁面上可見。
- 用 Google Rich Results Test（或 `schema.org` validator）驗一篇 MDX 文章無錯誤。

---

### 任務 P0-2：文章頁補 `Article` 缺漏欄位

**目標**：提升 Article schema 完整度，利於 AI 引用與新聞/文章複合結果。

**改動檔案**：`src/app/blog/[slug]/page.tsx`（兩個分支的 Article 物件）
- 補 `wordCount`（可由內文長度估算）或至少補 `articleSection`（用第一個 tag）。
- `image` 目前全部用 `cover-bg.webp`；若文章有專屬封面則帶入，沒有維持現狀即可（不要為此硬造圖片路徑）。

**驗收**：`npm run build` 通過；schema validator 無錯誤。

---

## 3. P1：GEO / AI 可見度（中優先，收益針對日報的「AI Assistants = 0」）

### 任務 P1-1：llms.txt 改為動態生成，與網站資料同步

**目標**：目前 `llms.txt` / `llms-full.txt` 是手寫靜態字串，容易與 `properties.ts`、文章清單脫節。改為從既有資料組出，降低「AI 讀到過期資訊」風險。

**改動檔案**：`src/app/llms.txt/route.ts`、`llms-full.txt/route.ts`
- 房源基本資料（三館容量、地址、設施）改從 `src/data/properties.ts` 讀取。
- 文章清單段落改用 `getAllArticles()` + `getPublishedArticles(scheduledArticles)` 動態列出已發佈文章的 title + URL。
- FAQ 段落維持人工維護（AI 摘要用的問答品質重要），但抽成 `src/data/llms-faq.ts` 常數集中管理。
- 保留 `Cache-Control: public, max-age=86400`。

**驗收**
- `curl` 三個 llms 路由，內容 > 100 字、房源數字與 `properties.ts` 一致。
- `npm run test:seo-page-health` 中 llms 檢查維持綠燈。
- **注意**：改動需相容 route handler 在 build 期的靜態化行為，若讀檔造成 build 問題，改為 `export const dynamic = "force-static"` 或 revalidate 策略，先確認 build 通過。

### 任務 P1-2：新增英文 / 日文 blog 落地頁（至少各 2 篇高曝光文）

**目標**：日報建議翻譯的高曝光文（三天兩夜、巨蛋住宿比較、麻將民宿等）目前只有中文。GEO 與國際 SEO 都需要對應語系落地頁。

**做法**
- 依日報「建議翻譯」清單，挑月曝光 > 100 的前 2–3 篇。
- 在 `src/app/en/blog/[slug]` 與 `src/app/ja/blog/[slug]` 建立對應頁（沿用既有 `en/`、`ja/` layout 慣例）。
- 每篇需有：對應語系 metadata、canonical、hreflang 互指、Article + FAQPage schema（`inLanguage` 設對應語言）。
- 翻譯品質：機翻後**必須人工校對名詞**（館名、地名、價格單位），價格數字不得更動。

**驗收**：`npm run build` 通過；sitemap 含新頁；hreflang 雙向互指正確。

> ⚠️ 此任務工程量較大，若時間有限，P1-2 可只做「英文 2 篇」作為第一批，其餘標 TODO。

### 任務 P1-3：AI 引用可觀測性

**目標**：目前無法量化 GEO 成效。加一個追蹤點。
- 確認 GA4 是否已用 referrer / landing 判斷 AI 來源（日報已有「AI Assistants」列，找出它在 `scripts/` 或 seo 模組中的判定邏輯）。
- 若判定僅靠 referrer allowlist，補上 `chatgpt.com`、`perplexity.ai`、`gemini.google.com`、`claude.ai`、`copilot.microsoft.com` 等來源。
- 產出一份 `docs/geo-tracking.md` 說明目前如何量測 AI 引用（給人看，不是給 AI）。

**驗收**：找出判定邏輯檔案並列出目前 allowlist；補完後 `npm run test:seo-*` 相關測試通過。

---

## 4. P2：SEO 動能修復（針對日報「偏弱」與首頁低 CTR）

### 任務 P2-1：首頁與主要 landing page 標題 / 描述 CTR 優化

**目標**：首頁 CTR 1.6%（均排名 9.5，502 曝光僅 8 點擊）明顯偏低，優先改 title/description 的吸引力，不動排名結構。

**做法**
- 改 `src/app/page.tsx` 的 `metadata.title` / `description`：在不失關鍵字（高雄包棟民宿）前提下，加入更能誘發點擊的具體元素（人數彈性、直訂省手續費、近駁二/捷運）。
- 同步檢查 `/godin`、`/hellohouse`（日報顯示這兩頁是 organic 主要入口）title 是否已含 CTR 誘因。
- **不要**同時大改多頁，一次改首頁 + 1 頁，觀察 GSC 兩週再決定下一輪。

**驗收**：`npm run test:seo-page-health` 中 title/description 長度檢查通過（title 20–70 字、description ≥ 50 中文字）。

### 任務 P2-2：`seo-driven-update.ts` 加上「建議改法」輸出

**目標**：目前優先清單只說「哪篇要改」，不說「怎麼改」。讓下游（人或 AI）能直接行動。
- 在 `scripts/seo-priority-list.json` 每筆多帶：`currentTitle`、`currentDescription`（從對應 MDX / 排程資料讀）、`suggestedAction`（依 priority 類型給模板化建議文字，例如 priority 3 →「CTR 低，建議重寫 title 前 15 字加入數字與利益點」）。
- **不要**讓腳本自動改文章內容，只產出建議，人工確認後才落地（避免 AI 亂改事實）。

**驗收**：跑 `npm run seo:analyze`（需 MongoDB 連線；無連線時應優雅報錯不崩潰），輸出的 JSON 含新欄位。

---

## 5. 交付順序與里程碑

| 里程碑 | 內容 | 完成定義 |
|--------|------|----------|
| M1 | P0-1 + P0-2 | 所有文章有 FAQPage、build 綠燈、schema validator 無錯 |
| M2 | P1-1 + P1-3 | llms.txt 動態化、AI 來源可量測 |
| M3 | P2-1 + P2-2 | 首頁+1頁 CTR 優化上線、優先清單含建議 |
| M4 | P1-2 | 英文 2 篇 blog 上線（可延後） |

每個里程碑結束：更新 `context.md`「最近變更」，附上改了哪些檔案與驗收結果。

---

## 6. 全域驗收清單（每次 PR 前）

- [ ] `npm run build` 通過
- [ ] `npm run lint` 無新增錯誤
- [ ] 相關 `npm run test:seo-*` 通過
- [ ] 沒有動到 `.env` / `next.config.js`
- [ ] 沒有編造價格 / 房型 / 設施（對照 `properties.ts` 與 `llms.txt`）
- [ ] `context.md` 已更新

---

## 7. 明確不做（避免 Codex 過度發揮）

- 不新增付費 SEO 工具或第三方 SDK。
- 不改動 GA4 埋碼 ID、不動 booking 網域。
- 不大量新造文章（本計劃聚焦「既有內容的結構化與可見度」，內容量另案處理）。
- 不為了補 schema 而硬造不存在的圖片、評價、獎項。
