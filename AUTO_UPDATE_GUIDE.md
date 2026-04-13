# 自動更新系統說明

## 📋 系統概述

自動更新系統會定期更新網站內容，提升 Google 新鮮度分數，改善 SEO 排名。

## 🔄 自動化任務

### 1. 每日更新（Daily Update）

**執行時間：** 每天凌晨 2:57

**功能：**
- 更新時效性內容（年份：2026 → 2027）
- 更新標題中的年份
- 更新跨年等特殊日期
- 自動更新 `dateModified` 欄位
- 自動 commit 並推送到 GitHub

**手動執行：**
```bash
npm run update:daily
```

### 2. 每週更新（Weekly Refresh）

**執行時間：** 每週一凌晨 3:17

**功能：**
- 隨機選擇 5-10 篇文章
- 微調內容保持新鮮度：
  - 調整標點符號間距
  - 更新時間描述詞（最近 ↔ 近期）
  - 調整段落視覺節奏
- 更新 `dateModified` 欄位
- 自動 commit 並推送到 GitHub

**手動執行：**
```bash
npm run update:weekly
```

## 📁 檔案結構

```
.github/workflows/
├── daily-update.yml      # 每日更新 GitHub Action
└── weekly-refresh.yml    # 每週更新 GitHub Action

scripts/
├── daily-update.ts       # 每日更新腳本
└── weekly-refresh.ts     # 每週更新腳本
```

## 🎯 為什麼需要自動更新？

### Google 新鮮度機制

Google 會優先顯示**經常更新**的內容。自動更新系統確保：

1. **時效性內容保持最新**
   - 「2026 跨年」自動更新為「2027 跨年」
   - 過期的活動日期自動調整

2. **內容保持活躍**
   - 定期微調讓 Google 看到「這個網站很活躍」
   - 提升整體網站的新鮮度分數

3. **SEO 排名提升**
   - 新鮮內容獲得更高排名
   - 點擊率和曝光率提升

## 📊 預期效果

### 短期（1 個月）
- ✅ 所有時效性內容自動保持最新
- ✅ 文章 `dateModified` 定期更新
- ✅ Google 重新索引頻率提升

### 中期（3 個月）
- 📈 SEO 排名提升 10-20%
- 📈 自然流量成長 50-100%
- 📈 點擊率提升

### 長期（6 個月）
- 📈 SEO 排名穩定前 3 名
- 📈 自然流量成長 200-300%
- 📈 完全自動化，零人工介入

## 🔧 維護與監控

### 檢查自動化狀態

1. **GitHub Actions**
   - 前往：https://github.com/hellohouse2017/hello-stay-next/actions
   - 查看最近的執行記錄
   - 確認無錯誤

2. **Git Commit 歷史**
   ```bash
   git log --oneline | grep "chore: 每日自動更新"
   git log --oneline | grep "chore: 每週內容更新"
   ```

3. **檢查文章更新**
   ```bash
   # 查看最近更新的文章
   ls -lt src/content/articles/*.mdx | head -10
   ```

### 手動觸發

如果需要立即執行更新：

1. **在 GitHub 上手動觸發**
   - 前往 Actions 頁面
   - 選擇對應的 workflow
   - 點擊「Run workflow」

2. **本地執行**
   ```bash
   npm run update:daily   # 每日更新
   npm run update:weekly  # 每週更新
   ```

## ⚠️ 注意事項

### 更新規則

1. **保守更新**
   - 只更新明確的時效性內容
   - 不改變文章核心內容
   - 保持 SEO 關鍵字不變

2. **微調策略**
   - 每週只更新 5-10 篇文章
   - 避免一次性大量更新（可能被 Google 視為異常）
   - 微調幅度小，不影響閱讀體驗

3. **Git 歷史**
   - 所有更新都有 commit 記錄
   - 可隨時回滾
   - 透明可追蹤

### 停用自動更新

如果需要暫停自動更新：

1. **停用 GitHub Actions**
   - 前往 `.github/workflows/`
   - 刪除或重命名 workflow 檔案

2. **或者在 GitHub 設定中停用**
   - Settings > Actions > Disable Actions

## 🚀 未來擴展

### Phase 3：智能優化（規劃中）

- 整合 Google Search Console API
- 根據 GSC 數據自動優化：
  - 曝光高但點擊低 → 優化標題
  - 排名下降 → 更新內容
  - 跳出率高 → 改善內容品質
- A/B 測試標題和描述

### Phase 4：內容生成（規劃中）

- 根據熱門關鍵字自動生成新文章
- 根據競品分析優化內容
- 根據季節性需求調整內容

## 📞 問題排查

### 常見問題

**Q: GitHub Actions 執行失敗？**
A: 檢查 Actions 頁面的錯誤訊息，通常是權限或依賴問題。

**Q: 更新後 build 失敗？**
A: 檢查更新的內容是否破壞了 MDX 格式，可以回滾 commit。

**Q: 想要調整更新頻率？**
A: 修改 `.github/workflows/` 中的 cron 表達式。

**Q: 想要新增更新規則？**
A: 編輯 `scripts/daily-update.ts` 或 `scripts/weekly-refresh.ts`。

## 📚 相關文檔

- [FRESHNESS_STRATEGY.md](./FRESHNESS_STRATEGY.md) - Google 新鮮度策略
- [SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md) - 系統架構說明
- [PHASE1_REPORT.md](./PHASE1_REPORT.md) - Phase 1 完成報告
