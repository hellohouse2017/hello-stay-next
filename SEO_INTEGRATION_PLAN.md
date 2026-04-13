# SEO 報告與自動更新系統整合方案

## 現況分析

### 現有系統
1. **SEO 健康檢查系統**（每晚 19:30）
   - 位置：`/Users/kaotangyu/Documents/Antigravity/民宿管理系統/scripts/local-seo-health.js`
   - 功能：GSC 排名追蹤、GA4 流量、Zenserp SERP 快照、部落格文章流量
   - 輸出：Telegram 日報
   - 數據來源：MongoDB (SeoSnapshot collection)

2. **自動更新系統**（GitHub Actions）
   - 每日更新：凌晨 2:57 UTC（台灣時間 10:57）
   - 每週更新：週一凌晨 3:17 UTC（台灣時間 11:17）
   - 功能：更新時效性內容、微調文章、更新 dateModified
   - 位置：`scripts/daily-update.ts` + `scripts/weekly-refresh.ts`

### 核心問題
**GSC 數據延遲太久（超過 3 天）**
- Google Search Console 數據通常延遲 2-3 天
- 如果延遲更久，報告顯示的數據就不夠即時
- 無法及時反映文章更新後的 SEO 效果

---

## 整合目標

### 1. 讓 SEO 報告反映自動更新狀況
- 報告中顯示哪些文章被自動更新了
- 顯示 dateModified 的變化
- 追蹤更新後的排名變化

### 2. 根據 SEO 數據智能調整更新策略
- 優先更新排名下降的文章
- 加強更新流量高但排名不佳的文章
- 保持高排名文章的新鮮度

### 3. 解決數據延遲問題
- 結合多個數據源（GSC + GA4 + Zenserp）
- 使用 GA4 即時數據補充 GSC 延遲
- 明確標示數據時間範圍

---

## 整合方案

### Phase 1：在 SEO 報告中顯示自動更新狀況

**新增功能：**
1. 讀取 Git commit 記錄，找出最近被自動更新的文章
2. 在報告中新增「📝 自動更新記錄」區塊
3. 顯示：
   - 今日/本週更新了哪些文章
   - 更新類型（每日/每週）
   - dateModified 變化

**實作位置：**
- 修改 `local-seo-health.js`
- 新增函數讀取 Git log

**範例輸出：**
```
📝 自動更新記錄
──────────────
今日更新（每日）：無
本週更新（每週）：5 篇
  • kaohsiung-group-trip.mdx (2026-04-13)
  • kaohsiung-group-stay-guide.mdx (2026-04-13)
  • pier2-accommodation.mdx (2026-04-13)
  • kaohsiung-graduation-trip.mdx (2026-04-13)
  • kaohsiung-family-reunion.mdx (2026-04-13)
```

---

### Phase 2：根據 SEO 數據智能更新

**新增功能：**
1. 從 MongoDB 讀取 SEO 快照數據
2. 分析哪些文章需要優先更新：
   - 排名下降 > 5 名
   - 曝光高但點擊率低（CTR < 2%）
   - 排名在第 2-3 頁（11-30 名）
3. 修改 `weekly-refresh.ts`，優先選擇這些文章

**實作位置：**
- 新增 `scripts/seo-driven-update.ts`
- 連接 MongoDB 讀取 SeoSnapshot
- 整合到 weekly-refresh 的選文邏輯

**選文邏輯：**
```typescript
// 優先級排序
1. 排名下降 > 5 名的文章（緊急）
2. 排名 11-30 名的文章（有機會衝第一頁）
3. CTR < 2% 的文章（標題/描述需優化）
4. 隨機選擇其他文章（保持新鮮度）
```

---

### Phase 3：多數據源整合，解決延遲問題

**改善策略：**
1. **GSC 數據**（延遲 2-3 天）
   - 用於：排名追蹤、關鍵字分析
   - 明確標示數據日期

2. **GA4 數據**（延遲 1 天）
   - 用於：即時流量監控
   - 補充 GSC 延遲期間的數據

3. **Zenserp 數據**（即時）
   - 用於：即時排名快照
   - 驗證 GSC 數據準確性

**報告改善：**
```
📊 數據來源說明
──────────────
GSC 排名數據：2026-04-10（3 天前）⚠️
GA4 流量數據：2026-04-12（1 天前）✅
Zenserp 即時排名：2026-04-13（今天）✅

💡 GSC 數據延遲中，以 GA4 + Zenserp 為準
```

---

### Phase 4：自動化 SEO 優化循環

**完整流程：**
```
1. 每晚 19:30：SEO 健康檢查
   ↓
2. 分析數據，找出需要優化的文章
   ↓
3. 寫入 MongoDB 優化清單
   ↓
4. 隔天凌晨 2:57：每日更新（時效性內容）
   ↓
5. 週一凌晨 3:17：每週更新（優先處理 SEO 清單）
   ↓
6. 3-7 天後：GSC 數據反映變化
   ↓
7. 下次 SEO 報告：追蹤改善效果
```

---

## 實作步驟

### Step 1：修改 SEO 報告，顯示自動更新記錄
- [ ] 在 `local-seo-health.js` 新增讀取 Git log 功能
- [ ] 解析 commit 訊息，找出自動更新的文章
- [ ] 在 Telegram 報告中新增「自動更新記錄」區塊

### Step 2：建立 SEO 驅動的更新腳本
- [ ] 新增 `scripts/seo-driven-update.ts`
- [ ] 連接 MongoDB 讀取 SeoSnapshot
- [ ] 實作智能選文邏輯（排名下降、CTR 低、排名 11-30）
- [ ] 整合到 `weekly-refresh.ts`

### Step 3：改善數據延遲問題
- [ ] 在報告中明確標示各數據源的時間
- [ ] 加強 GA4 即時數據的權重
- [ ] 當 GSC 延遲 > 3 天時，顯示警告並以其他數據源為準

### Step 4：建立 SEO 優化循環
- [ ] 在 MongoDB 新增 `SeoOptimizationQueue` collection
- [ ] SEO 報告寫入需優化的文章清單
- [ ] 每週更新優先處理清單中的文章
- [ ] 追蹤優化效果（排名變化、流量變化）

---

## 預期效果

### 短期（1 個月）
- ✅ SEO 報告能即時反映自動更新狀況
- ✅ 數據延遲問題得到緩解（多數據源）
- ✅ 更新策略更有針對性

### 中期（3 個月）
- 📈 排名下降的文章快速恢復
- 📈 第 2-3 頁的文章衝上第 1 頁
- 📈 整體 CTR 提升 20-30%

### 長期（6 個月）
- 📈 完全自動化的 SEO 優化循環
- 📈 排名穩定在前 3 名
- 📈 自然流量成長 200-300%

---

## 技術細節

### MongoDB Schema 擴充

**現有：SeoSnapshot**
```javascript
{
  date: String,
  totalClicks: Number,
  totalImpressions: Number,
  topQueries: Array,
  targetKeywords: Array,
  topPages: Array
}
```

**新增：SeoOptimizationQueue**
```javascript
{
  date: String,
  articles: [{
    slug: String,
    path: String,
    reason: String, // 'rank_drop', 'low_ctr', 'page_2_3'
    priority: Number, // 1-5
    currentRank: Number,
    previousRank: Number,
    ctr: Number,
    clicks: Number,
    impressions: Number
  }],
  processed: Boolean,
  processedAt: Date
}
```

### Git Log 解析

**讀取最近 7 天的自動更新：**
```javascript
const { execSync } = require('child_process');

function getRecentAutoUpdates() {
  const log = execSync(
    'git log --since="7 days ago" --grep="chore: 每日\\|chore: 每週" --pretty=format:"%H|%s|%ai"',
    { cwd: '/path/to/Hellostay官網', encoding: 'utf-8' }
  );
  
  return log.split('\n').map(line => {
    const [hash, message, date] = line.split('|');
    return { hash, message, date };
  });
}
```

---

## 下一步

你想要我先實作哪個 Phase？

**建議順序：**
1. **Phase 1**（最簡單）：在 SEO 報告中顯示自動更新記錄
2. **Phase 3**（解決當前問題）：改善數據延遲問題
3. **Phase 2**（最有價值）：根據 SEO 數據智能更新
4. **Phase 4**（完整閉環）：自動化 SEO 優化循環

或者你有其他想法？
