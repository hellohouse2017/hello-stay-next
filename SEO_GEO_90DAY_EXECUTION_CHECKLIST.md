# Hello Stay SEO / GEO 90 天執行清單

最後更新：2026-07-09  
適用站點：`https://www.hello-stay.com`  
執行目標：放大「高雄包棟民宿 / 高雄團體住宿 / 鹽埕步行圈包棟」的非品牌流量，並讓 `/hellohouse`、`/godin`、`/kaohsiung-whole-house` 成為 Google 與 AI 最容易直接引用的決策頁。

---

## 0.1 已完成進度（2026-07-09 第一輪上線）

- [x] `/hellohouse`、`/godin` 補 page-level `hreflang` 與對應 `canonical`
- [x] 主商品頁與核心公開頁 title 去重，避免 `| Hello Stay | Hello Stay`
- [x] `/hellohouse` 移除未即時同步的 `aggregateRating`
- [x] `/reviews`、`/kaohsiung-whole-house`、`/blog/pier2-accommodation` 清掉固定評價數、旅客數與未舉證價差說法
- [x] `/hellohouse` 新增可見 FAQ、`FAQPage` schema、`BreadcrumbList` schema
- [x] `/kaohsiung-whole-house` 補 `BreadcrumbList` schema
- [x] `scheduled-articles` 已開始清理未來文章中的高風險固定數字文案

---

## 0. 這份清單的判斷基礎

### 第一方數據基線

- GSC 最新可用日：`2026-07-06`
- 近 7 天（2026-06-30 ~ 2026-07-06）
  - `167 clicks`
  - `3525 impressions`
  - `CTR 4.74%`
  - `平均排名 8.68`
- 品牌詞強
  - `你好哇寓所`：`19 clicks / 100 impressions / 平均 3.34`
  - `溝頂民宿`：`16 / 44 / 平均 3.95`
- 非品牌核心詞弱
  - `高雄包棟民宿`：`3 / 209 / 平均 9.21`
  - `高雄包棟`：`1 / 50 / 平均 10.34`
  - `高雄民宿包棟`：`0 / 11 / 平均 10.09`
  - `鹽埕民宿`：`0 / 7 / 平均 11.86`
- 近 28 天 GA4
  - Organic Search：`492 sessions / 389 users / 944 pageviews`
  - AI Assistants：`23 sessions / 22 users / 63 pageviews`
  - AI 來源：`chatgpt.com 20 sessions`、`gemini.google.com 3 sessions`
  - AI 主落地頁：`/hellohouse 16 sessions`

### 外部需求基線

- 交通部觀光署 114 年 1-9 月：
  - 全台旅館住客人次 `5,404.6 萬`
  - 整體住用率 `51.31%`
  - 高雄市住用率 `53.22%`
  - 高雄年增 `3.54%`
- 高雄市 2025 年 6 月景點人次
  - `駁二藝術特區 245,430`
  - `愛河 164,595`
  - `高雄流行音樂中心 71,139`
- 高雄市觀光產業統計（113 年底）
  - 鹽埕區 `一般旅館 21 家`
  - 鹽埕區 `民宿 18 家`
  - 鹽埕區 `一般觀光旅館 1 家 / 250 房`
- 官方來源
  - [交通部觀光署新聞稿：114 年 1-9 月觀光旅館與旅館營運概況](https://admin.taiwan.net.tw/News/NewsTravel?a=35&id=34803)
  - [高雄市主要觀光遊憩區遊客人次表（2025 年 6 月）](https://admin.khh.travel/file/5099/)
  - [高雄市觀光產業統計彙整表（113 年 12 月）](https://admin.khh.travel/file/4802/)

### 目前已確認的站內現象

- `/hellohouse` 是目前最強自然流量商品頁：`41 clicks / 189 impressions / CTR 21.7%`
- `/godin` 是第二強商品頁：`25 / 99 / CTR 25.3%`
- `/kaohsiung-whole-house` 有曝光但轉化訊號還不夠強：`9 / 286 / CTR 3.15%`
- 長尾已經被市場驗證有效：
  - `高雄包棟民宿30人`
  - `/blog/kaohsiung-20-person-stay`
  - `/blog/kaohsiung-mahjong-stay`
  - `/blog/kaohsiung-arena-accommodation`
- live 頁面已確認缺口：
  - `/hellohouse` HTML head 缺 page-level hreflang
  - `/hellohouse` live title 出現重複品牌尾綴
  - GSC 仍看得到 `/hellohouse` 與 `/hellohouse/` 的歷史訊號分裂

---

## 1. 執行原則

- 不優先堆泛旅遊文，先強化錢頁。
- 沒有可舉證的數字，不寫進公開頁面與 schema。
- 所有「價格、評論數、旅客數、節省比例」都視為高風險訊號。
- 先搶「高雄包棟民宿」的非品牌需求，再放大「鹽埕地段 + 團體情境」。
- 每一批上線後都要看 GSC 與 GA4，不一次大改全站。

---

## 2. 優先順序總表

### P0：1-2 週內必做

- [ ] 修正主商品頁 hreflang / canonical / title 重複
- [ ] 清掉無法即時驗證的評價數、比較價差、旅客數等公開數字
- [ ] 把 `/kaohsiung-whole-house` 調整成核心商業 landing page
- [ ] 把 `/hellohouse` 補成 AI 最容易摘答的商品頁

### P1：30 天內完成

- [ ] 補齊 `/godin`、`/compare`、`/packages` 的決策型內容
- [ ] 強化已經有曝光的長尾內容頁，全部導流回商品頁
- [ ] 重新整理內鏈結構，讓首頁、比較頁、情境頁都回推 `/hellohouse` / `/godin` / `/book`

### P2：60 天內完成

- [ ] 擴寫已驗證有效的人數型與情境型頁面
- [ ] 建立可被 AI 引用的 FAQ / quick answer / comparison block
- [ ] 補強英文與日文的主商品頁與高曝光文章對應關係

### P3：90 天內完成

- [ ] 做完本地權威與品牌一致性清理
- [ ] 形成固定月報節奏：GSC / GA4 / AI 流量 / 頁面 CTR / 內容更新

---

## 3. 第一批排工（直接開做）

### 3.1 技術修正：主商品頁 head 訊號

#### 任務 A：補 page-level hreflang

- 目的：讓 Google 與 AI 更清楚知道 `/hellohouse`、`/godin` 等頁面與 `/en/*`、`/ja/*`、`/ko/*`、`/vi/*` 的對應關係
- 優先頁面：
  - `/hellohouse`
  - `/godin`
  - `/dazhi`
- 對應檔案：
  - `src/app/hellohouse/page.tsx`
  - `src/app/godin/page.tsx`
  - `src/app/dazhi/page.tsx`
  - `src/app/en/hellohouse/page.tsx`
  - `src/app/ja/hellohouse/page.tsx`
  - `src/app/ko/hellohouse/page.tsx`
  - `src/app/vi/hellohouse/page.tsx`
  - `src/app/en/godin/page.tsx`
  - `src/app/ja/godin/page.tsx`
  - `src/app/ko/godin/page.tsx`
  - `src/app/vi/godin/page.tsx`
- 執行方式：
  - 建立共用 alternates helper
  - 每頁 metadata 同時輸出 `canonical` 與 `alternates.languages`
  - 補 `x-default`
- 完成條件：
  - live HTML head 看得到 `rel="alternate"` + `hreflang`
  - sitemap 與 head 訊號一致

#### 任務 B：修 title 品牌尾綴重複

- 目的：避免 `<title>` 變成 `... | Hello Stay | Hello Stay`
- 優先頁面：
  - `/hellohouse`
  - `/godin`
  - `/kaohsiung-whole-house`
  - `/`
  - `/compare`
  - `/packages`
- 對應檔案：
  - `src/app/layout.tsx`
  - `src/app/page.tsx`
  - `src/app/hellohouse/page.tsx`
  - `src/app/godin/page.tsx`
  - `src/app/kaohsiung-whole-house/page.tsx`
  - `src/app/compare/page.tsx`
  - `src/app/packages/page.tsx`
- 執行方式：
  - 保留 layout template
  - 頁面 title 不再手動加 `Hello Stay`
- 完成條件：
  - live title 僅保留一次品牌尾綴

#### 任務 C：整理 slash / non-slash 訊號

- 目的：把 `/hellohouse` 與 `/hellohouse/` 的歷史權重盡快收斂
- 執行方式：
  - 保持 308 redirect
  - 檢查 sitemap、canonical、內鏈都只指向無 slash 版本
  - 在 GSC 觀察 2-4 週
- 完成條件：
  - 站內無主動連到 `/hellohouse/`
  - GSC 中 `/hellohouse/` 曝光持續下降

---

## 4. 信任度修正（不要讓 SEO 成效被不實訊號拖累）

### 4.1 先稽核所有高風險數字

- [ ] `評價星數 / 評論數`
- [ ] `服務超過幾組旅客`
- [ ] `飯店 vs 包棟可省幾 %`
- [ ] `某人數方案一晚多少錢`
- [ ] `官方直訂省多少 % 手續費`

### 4.2 已點到名的高風險頁面

- `src/app/hellohouse/page.tsx`
  - `aggregateRating` 若不是自動同步，先移除
- `src/app/reviews/page.tsx`
  - 將 `4.5 星 / 75 則評論` 改成非固定數字描述，或改成「以 Google 商家評價內容為主」
- `src/app/kaohsiung-whole-house/page.tsx`
  - 移除 `服務超過 5,000 組旅客`
  - 移除 `20 人住飯店 vs 包棟省 40-60%` 這類未即時驗證比較
- `src/data/scheduled-articles.ts`
  - 全面掃描價格型文案，所有精準行情數字分成三類：
    - 可由第一方價格資料支持：保留
    - 需要人工確認：改成區間或流程描述
    - 無法舉證：刪除

### 4.3 驗收標準

- 公開頁面沒有明顯無法舉證的精準數字
- schema 不含可能過期的評論數 / 分數
- GEO 頁面內容以「事實、設備、位置、適合情境」為主，而不是浮誇比較

---

## 5. 錢頁改版清單

### 5.1 `/kaohsiung-whole-house`

這頁是你要搶 `高雄包棟民宿` 的核心頁，不是普通說明頁。

- 目標詞：
  - `高雄包棟民宿`
  - `高雄包棟`
  - `高雄民宿包棟`
  - `高雄團體住宿`
- 必做區塊：
  - [ ] 首屏一句話直接回答「幾人住哪一館」
  - [ ] 人數比較表：`4-12 / 13-26 / 27-38 / 40+`
  - [ ] 設備比較表：`廚房 / 麻將 / 每房衛浴 / 電梯 / 大公共空間`
  - [ ] 情境比較：`家族 / 朋友 / 迎娶 / 團建`
  - [ ] 步行圈事實：`駁二 / 捷運鹽埕埔 / 大港橋`
  - [ ] CTA 只做兩個：`看館別`、`查空房`
- 內鏈：
  - 指向 `/hellohouse`
  - 指向 `/godin`
  - 指向 `/compare`
  - 指向 `/book`
- schema：
  - [ ] FAQPage
  - [ ] BreadcrumbList
  - [ ] 若內容足夠，可補 `ItemList` 或 `Table` 對應的可見比較結構
- 完成標準：
  - 讀完 30 秒內能完成「我該看哪一館」的判斷

### 5.2 `/hellohouse`

這頁是目前最強商品頁，也是 GEO 主頁。

- 目標詞：
  - `高雄包棟民宿30人`
  - `高雄 20 人包棟`
  - `高雄有廚房民宿`
  - `高雄麻將民宿`
- 必做區塊：
  - [ ] 頁首 3 行答案：幾人、主打設備、步行圈
  - [ ] FAQ：可不可以煮、可不可以打麻將、適合什麼團體、走到駁二多久
  - [ ] 決策區：適合哪些需求，不適合哪些需求
  - [ ] 情境區：`家族 / 朋友聚餐 / 迎娶 / 公司 outing`
  - [ ] 周邊事實區：引用 `src/data/properties.ts` 的步行分鐘數
- schema：
  - [ ] LodgingBusiness 保留
  - [ ] 若評論數未即時同步，移除 `aggregateRating`
  - [ ] 補 FAQPage
- 完成標準：
  - AI 摘答只抓這頁，也能回答使用者 80% 的問題

### 5.3 `/godin`

- 目標詞：
  - `鹽埕民宿`
  - `高雄小團體包棟`
  - `4-12 人包棟`
- 必做區塊：
  - [ ] 明確寫出這館不是大型派對館
  - [ ] 強調四間房都獨立衛浴
  - [ ] 強調適合 4-12 人家庭 / 小團體
  - [ ] 補 FAQ：有沒有廚房、4F 公共空間怎麼用、長輩適不適合
- 完成標準：
  - 和 `/hellohouse` 的分工一眼就看懂

### 5.4 `/compare`

- 目標：做最後決策頁，不搶首頁角色
- 必做：
  - [ ] 一張真正可掃讀的館別比較表
  - [ ] 「什麼需求先排除哪一館」的反向篩選
  - [ ] 連回 `/hellohouse` / `/godin`

### 5.5 `/packages`

- 目標：吃情境詞，不是當純介紹頁
- 目標詞：
  - `高雄團體住宿`
  - `高雄家族旅遊住宿`
  - `高雄企業團建住宿`
- 必做：
  - [ ] 每個情境都對應館別
  - [ ] 每個情境都對應內鏈到館頁
  - [ ] 每個情境都回答「為什麼不住飯店」

---

## 6. 內容更新清單（只做已被數據證明有效的主題）

### 6.1 先更新，不先新開

- [ ] `/blog/kaohsiung-20-person-stay`
  - 補回主館與比較頁內鏈
  - 補「20 人要不要直接看你好哇」答案區
- [ ] `/blog/kaohsiung-30-person-stay`
  - 補兩館合訂情境與 `/compare` 內鏈
- [ ] `/blog/kaohsiung-mahjong-stay`
  - 補「麻將只是配件，真正差異是公共空間」段落
  - 導流回 `/hellohouse`
- [ ] `/blog/pier2-accommodation`
  - 補官方景點人流資料
  - 補「為什麼住鹽埕比只住景點旁更好」比較
- [ ] `/blog/kaohsiung-family-accommodation`
  - 補家族分房與館別建議
- [ ] `/blog/kaohsiung-arena-accommodation`
  - 這頁曝光高 CTR 低，重寫 title / 首段 / CTA

### 6.2 新內容只開這幾種

- [ ] `高雄 20 人包棟民宿`
- [ ] `高雄 30 人包棟住宿`
- [ ] `高雄家族旅遊包棟`
- [ ] `高雄團體住宿推薦`
- [ ] `高雄有廚房包棟`
- [ ] `高雄高流住宿 / 駁二住宿 / 鹽埕步行住宿`

### 6.3 每篇內容固定骨架

- [ ] 開頭先回答需求，不先鋪陳情緒
- [ ] 放人數 / 設備 / 地點 3 個決策點
- [ ] 放 3-5 題可見 FAQ
- [ ] 只給 1-2 個主要 CTA
- [ ] 文末只導到最相關的館頁，不亂分流

---

## 7. GEO / AEO 執行清單

### 7.1 商品頁要變成 AI 可以直接引用的格式

- [ ] 每個核心頁前 300 字內有明確答案
- [ ] FAQ 用短句直答，不寫行銷空話
- [ ] 比較區要能讓 AI 摘成表格
- [ ] 周邊地點、步行時間、設備名稱都寫成可結構化辨識的形式

### 7.2 AI 最需要的不是更多字，是更乾淨的事實

- [ ] 人數範圍固定寫法
- [ ] 設備命名固定寫法
- [ ] 地址 / 區域 / 地標固定寫法
- [ ] 館別角色固定寫法

建議固定句式：

- `你好哇寓所：6-26 人，高雄鹽埕區包棟，主打中島廚房與大型公共空間`
- `溝頂民宿：4-12 人，高雄鹽埕區獨棟包棟，四間客房皆有獨立衛浴`

### 7.3 AI 流量量測

- [ ] 每週看一次 `ai-assistant` sessions
- [ ] 每週記錄 AI 落地頁排序
- [ ] AI 落地頁若不是 `/hellohouse` / `/kaohsiung-whole-house`，就回頭看頁面答案是否不夠完整

---

## 8. 在地權威與品牌一致性

### 8.1 NAP / 法規 / 品牌資料一致化

- [ ] 官網 footer、館頁、訂房頁、Google 商家資訊、FB、IG 的館名一致
- [ ] 地址格式一致
- [ ] 電話一致
- [ ] 合法民宿證號格式一致

### 8.2 周邊在地證據

- [ ] `駁二 10 分鐘步行`
- [ ] `鹽埕埔站 5 分鐘步行`
- [ ] `大港橋 / 棧貳庫`
- [ ] `愛河 / 高流 / 駁二`

這些不是裝飾資訊，是讓 Google 與 AI 理解「你賣的是鹽埕步行生活圈」。

---

## 9. 每週固定檢查表

### 每週一

- [ ] 抓 GSC 最新 7 天與 28 天數據
- [ ] 看 `高雄包棟民宿`、`高雄包棟`、`高雄民宿包棟`
- [ ] 看 `/hellohouse`、`/godin`、`/kaohsiung-whole-house` CTR

### 每週三

- [ ] 看 GA4 organic landing pages
- [ ] 看 AI assistants landing pages
- [ ] 看哪篇文章有曝光但沒點擊

### 每週五

- [ ] 挑 1 個錢頁、1 篇長尾文做迭代
- [ ] 補 3 個內鏈
- [ ] 補 2-3 題 FAQ 或調整首段

---

## 10. 30 / 60 / 90 天 KPI

### 30 天

- [ ] `高雄包棟民宿` 平均排名由 `9.21` 進到 `8.x`
- [ ] `/kaohsiung-whole-house` CTR 由 `3.15%` 提升到 `4.5%+`
- [ ] `/hellohouse` head 訊號修正完成
- [ ] AI landing page 仍以 `/hellohouse` 為主，且 sessions 成長

### 60 天

- [ ] `高雄包棟` 進入穩定第 1-2 頁前段
- [ ] `/blog/kaohsiung-20-person-stay`、`/blog/kaohsiung-mahjong-stay` 都能穩定導流到館頁
- [ ] `/godin` 在小團體與鹽埕詞的曝光增加

### 90 天

- [ ] 非品牌詞 clicks 占比提升
- [ ] `/kaohsiung-whole-house` 成為穩定商業 landing page
- [ ] AI assistants 28 天 sessions 由 `23` 提升到 `35+`
- [ ] 至少 3 個長尾情境頁形成穩定流量入口

---

## 11. 明確不要做的事

- [ ] 不再大量開泛高雄旅遊文
- [ ] 不寫無來源的住宿行情、節省比例、評論數
- [ ] 不讓每篇文章都導回首頁
- [ ] 不把 `/compare`、`/packages`、`/kaohsiung-whole-house` 做成重複頁
- [ ] 不在 GEO 頁面塞過多形容詞

---

## 12. 建議的實作順序

1. `head 訊號修正`
2. `數字信任度清理`
3. `/kaohsiung-whole-house` 改版
4. `/hellohouse` FAQ / answer block / schema 補強
5. `/godin` 與 `/compare` 補決策內容
6. 更新已有曝光文章
7. 每週小幅迭代

如果只能先做一批，就先做：

- `/hellohouse`
- `/godin`
- `/kaohsiung-whole-house`
- `/compare`

這四頁會最直接影響目前已經存在的自然搜尋與 GEO 成效。
