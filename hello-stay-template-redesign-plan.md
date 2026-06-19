# Hello Stay Template Redesign Plan

## 目標

將目前 `Hellostay官網` 首頁與關鍵入口重做成 `/Users/tangyukao/Documents/Antigravity/官網/hello-stay` 模板的版型語言，而不是只在舊首頁上調整配色。

本次核心目標是：視覺與版面更貼近 `hello-stay` 模板，資料、SEO、GSC 與訂房功能仍使用目前正式官網的真實架構。

## 模板對齊基準

參考檔案：

- `/Users/tangyukao/Documents/Antigravity/官網/hello-stay/src/App.tsx`
- `/Users/tangyukao/Documents/Antigravity/官網/hello-stay/src/components/Header.tsx`
- `/Users/tangyukao/Documents/Antigravity/官網/hello-stay/src/components/Filters.tsx`
- `/Users/tangyukao/Documents/Antigravity/官網/hello-stay/src/components/VillaCard.tsx`
- `/Users/tangyukao/Documents/Antigravity/官網/hello-stay/src/components/JournalSection.tsx`

需要對齊的畫面結構：

- 深色 luxury alert bar
- cream sticky header
- 置中 `Luxury Stays` hero
- 搜尋模式 segmented control
- 精確篩選 panel
- 橫向大型 villa listing card
- Journal / AEO FAQ 區塊
- 深色 luxury footer 的整體節奏

## 不可破壞邊界

- 不直接修改 `.env`
- 不直接修改 `next.config.ts`
- 不移除或替換 GA / GSC verification
- 不破壞 canonical、hreflang、robots、sitemap、llms 路由
- 不移除首頁既有 JSON-LD / LodgingBusiness / Organization / FAQ / WebSite schema
- 不引入假預訂流程
- 不用 localStorage 製造「預訂成功」
- 不呼叫不存在的 `/api/chat`
- 不使用 Unsplash 假圖替代真實民宿圖片
- 不把大智若愚寫成已正式營運
- 不寫固定假價格；價格必須沿用目前站內口徑或導向 LINE / `/book` 確認

## 真實資料映射

館別：

- 你好哇寓所：`/hellohouse`，圖片使用 `public/images/hellohouse/*`
- 溝頂民宿：`/godin`，圖片使用 `public/images/godin/*`
- 大智若愚：`/dazhi`，圖片使用 `public/images/dazhi/*`，狀態標示 2027 年中開幕

訂房：

- 查空房：`/book`
- LINE：`https://lin.ee/atCiMQw`
- `/book` 仍使用現有 `NEXT_PUBLIC_BNB_API` 查詢，不改成假資料

## 實作計劃

### Phase 1: 首頁模板化

- [x] 新增首頁專用 client component
- [x] 重現模板的 `Luxury Stays` hero
- [x] 重現搜尋模式切換
- [x] 重現篩選 panel
- [x] 重現大型 villa listing cards
- [x] 重現 Journal / FAQ 區塊
- [x] 首頁 CTA 全部導向真實 `/book`、館別頁、LINE

### Phase 2: Shell 對齊

- [x] Navbar 更接近模板 Header 視覺
- [x] 保留 crawlable 站內連結
- [x] Footer 更接近模板深色 luxury footer
- [x] 手機版 header / menu 不溢出

### Phase 3: SEO 與功能保護

- [x] 確認首頁 metadata 未退化
- [x] 確認 GSC verification meta 存在
- [x] 確認 canonical 存在
- [x] 確認首頁 JSON-LD 存在
- [x] 確認 robots.txt 規則完整
- [x] 確認 sitemap.xml 與 hreflang 正常
- [x] 確認 `/book` 仍保留現有空房查詢頁與 JSON-LD / canonical

### Phase 4: 驗證

- [x] `npm run lint`
- [x] `npm run build:local`
- [x] `npm run test:seo-route-boundaries`
- [x] `npm run test:seo-route-runtime`
- [x] `npm run test:seo-page-health`
- [x] production preview 截圖檢查桌機首頁
- [x] production preview 截圖檢查手機首頁
- [x] 檢查無水平 overflow

## 完成標準

- 首屏看起來應明顯是 `hello-stay` 模板方向，而不是舊 cinematic 首頁。
- 首頁資訊架構必須包含模板的 hero、search mode、filter panel、villa cards、journal / FAQ。
- SEO/GSC 設定不得退化。
- 真實訂房與 LINE 流程不得被假功能取代。
- 所有驗證指令通過後，更新 `context.md` 最近變更。
