# Google 新鮮度機制與內容更新策略

## 🔍 Google 新鮮度（Freshness）機制

### Google 如何判斷內容新鮮度

```
1. 內容更新日期
   - <meta property="article:modified_time">
   - JSON-LD 的 dateModified
   - 頁面實際內容變化

2. 更新頻率
   - 經常更新的頁面 → 更高權重
   - 長期不更新 → 權重下降

3. 更新幅度
   - 小改動（修錯字）→ 影響小
   - 大改動（新增段落、更新數據）→ 影響大

4. 時效性關鍵字
   - "2027 跨年"、"最新"、"今年" → 需要新鮮內容
   - "歷史"、"經典" → 新鮮度不重要
```

### 你的文章類型分析

```
📊 時效性文章（需要常更新）
├─ kaohsiung-nye-stay-2027（跨年）
├─ kaohsiung-cny-stay-2027（春節）
├─ megaport-fest-stay（大港開唱）
└─ bts-kaohsiung-stay（演唱會）
   → 需要每年更新日期、活動資訊

🌲 常青文章（不太需要更新）
├─ yancheng-food-guide（美食地圖）
├─ kaohsiung-mahjong-stay（麻將民宿）
└─ pier2-accommodation（駁二住宿）
   → 偶爾更新店家資訊即可
```

## 🎯 內容更新策略

### 策略 A：自動更新時效性內容（推薦）

```typescript
// scripts/auto-update-timely-content.ts

// 每月自動執行：
1. 掃描所有 MDX 文章
2. 識別時效性關鍵字：
   - "2027" → 改成 "2028"
   - "今年" → 更新年份
   - 活動日期 → 更新到最新
3. 更新 dateModified
4. 自動 commit 和部署

範例：
---
title: "高雄跨年住宿推薦 2027"  → "高雄跨年住宿推薦 2028"
dateModified: "2027-01-15"      → "2028-01-15"
---

內容：
"2027 年高雄跨年..."  → "2028 年高雄跨年..."
```

### 策略 B：定期微調內容

```typescript
// 每週自動執行：
1. 隨機選 5-10 篇文章
2. 微調內容：
   - 新增一個段落
   - 更新店家資訊
   - 調整關鍵字密度
3. 更新 dateModified
4. 觸發重新索引

目的：
- 讓 Google 看到「這個網站很活躍」
- 提升整體網站的新鮮度分數
```

### 策略 C：根據 GSC 數據優化

```typescript
// 每週自動執行：
1. 從 Google Search Console 抓取數據
2. 找出表現不佳的文章：
   - 曝光高但點擊低 → 優化標題
   - 排名下降 → 更新內容
   - 跳出率高 → 改善內容品質
3. 自動生成優化建議
4. 更新文章
```

## 🏗️ 技術實作方案

### Phase 2A：自動更新系統（優先）

```typescript
// scripts/auto-update-content.ts

interface UpdateRule {
  pattern: RegExp
  replacement: (match: string) => string
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
}

const rules: UpdateRule[] = [
  // 年份更新
  {
    pattern: /2027/g,
    replacement: () => new Date().getFullYear().toString(),
    frequency: 'yearly'
  },
  
  // 活動日期更新
  {
    pattern: /(\d{4})-(\d{2})-(\d{2})/g,
    replacement: (match) => {
      // 如果日期已過，更新到明年同一天
      const date = new Date(match)
      if (date < new Date()) {
        date.setFullYear(date.getFullYear() + 1)
        return date.toISOString().slice(0, 10)
      }
      return match
    },
    frequency: 'monthly'
  },
  
  // 隨機微調（保持新鮮度）
  {
    pattern: /。/g,
    replacement: (match) => {
      // 10% 機率在句號後加入空格（微調）
      return Math.random() < 0.1 ? '。 ' : '。'
    },
    frequency: 'weekly'
  }
]

async function updateArticles() {
  const articles = await getAllArticles()
  
  for (const article of articles) {
    let updated = false
    let content = fs.readFileSync(article.path, 'utf-8')
    
    for (const rule of rules) {
      if (shouldApplyRule(rule)) {
        const newContent = content.replace(rule.pattern, rule.replacement)
        if (newContent !== content) {
          content = newContent
          updated = true
        }
      }
    }
    
    if (updated) {
      // 更新 dateModified
      content = updateFrontmatter(content, {
        dateModified: new Date().toISOString().slice(0, 10)
      })
      
      fs.writeFileSync(article.path, content)
      console.log(`✅ Updated: ${article.slug}`)
    }
  }
}
```

### Phase 2B：智能更新系統

```typescript
// scripts/smart-update.ts

// 使用 AI 生成更新內容
async function smartUpdate(article: Article) {
  // 1. 分析文章表現
  const performance = await getGSCData(article.slug)
  
  // 2. 生成優化建議
  const suggestions = await generateSuggestions({
    article,
    performance,
    competitors: await getCompetitors(article.keywords)
  })
  
  // 3. 自動更新內容
  if (suggestions.shouldUpdate) {
    const updatedContent = await generateUpdatedContent({
      original: article.content,
      suggestions
    })
    
    await saveArticle(article.slug, updatedContent)
    await notifyGoogleOfUpdate(article.url)
  }
}
```

## 📋 TSX vs MDX 遷移策略

### 選項 A：全部改成 MDX（推薦）

**優點：**
- ✅ 統一管理，降低複雜度
- ✅ 所有文章都能自動更新
- ✅ 更容易實現自動化

**缺點：**
- ⚠️ 需要一次性遷移 15 篇
- ⚠️ 短期工作量較大

**實作計畫：**
```
Week 1: 遷移 5 篇（測試）
Week 2: 遷移 5 篇
Week 3: 遷移 5 篇
Week 4: 刪除舊的 TSX 檔案
```

### 選項 B：保留 TSX，只遷移需要更新的

**優點：**
- ✅ 工作量較小
- ✅ 風險較低

**缺點：**
- ❌ 系統複雜度高
- ❌ 部分文章無法自動更新
- ❌ 長期維護成本高

### 選項 C：混合策略（折衷）

```
時效性文章 → 立即遷移到 MDX
├─ kaohsiung-nye-stay
├─ kaohsiung-cny-stay
├─ megaport-fest-stay
└─ 所有包含年份的文章

常青文章 → 保持 TSX，慢慢遷移
├─ yancheng-food-guide
├─ kaohsiung-mahjong-stay
└─ 不常更新的文章
```

## 🎯 我的建議

### 短期（1-2 週）

**1. 全部遷移到 MDX**
```bash
理由：
- 只有 15 篇靜態 TSX，工作量不大
- 統一系統，未來更好維護
- 可以對所有文章實施自動更新

步驟：
Week 1: 遷移 5 篇 + 測試
Week 2: 遷移 10 篇 + 刪除 TSX
```

**2. 建立自動更新系統**
```typescript
// 每天執行
- 更新時效性內容（年份、日期）
- 更新 dateModified
- 觸發 Google 重新索引

// 每週執行
- 隨機微調 5-10 篇文章
- 新增/更新段落
- 優化關鍵字
```

### 中期（1-2 個月）

**3. 智能優化系統**
```typescript
// 根據 GSC 數據
- 自動優化低表現文章
- A/B 測試標題
- 調整內容結構
```

**4. 內容生成系統**
```typescript
// 自動生成新文章
- 根據熱門關鍵字
- 根據競品分析
- 根據季節性需求
```

### 長期（3-6 個月）

**5. 完全自動化**
```
- 自動生成
- 自動發布
- 自動優化
- 自動更新
- 零人工介入
```

## 🚀 立即行動計畫

### Step 1: 遷移所有 TSX 到 MDX（本週）

```bash
# 我可以幫你做：
1. 批次遷移 15 篇 TSX 文章到 MDX
2. 測試每一篇確保正常
3. 部署驗證
4. 刪除舊的 TSX 檔案

預計時間：2-3 小時
風險：低（可隨時回滾）
```

### Step 2: 建立自動更新腳本（下週）

```typescript
// scripts/daily-update.ts
- 每天自動更新時效性內容
- 更新 dateModified
- 提交 git commit
- 觸發部署

// scripts/weekly-refresh.ts
- 每週隨機更新 10 篇文章
- 微調內容保持新鮮度
- 通知 Google 重新索引
```

### Step 3: 設定 GitHub Actions（下週）

```yaml
# .github/workflows/auto-update.yml
name: Auto Update Content

on:
  schedule:
    - cron: '0 2 * * *'  # 每天凌晨 2 點

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - name: Update timely content
        run: npx tsx scripts/daily-update.ts
      
      - name: Commit changes
        run: |
          git add .
          git commit -m "chore: auto-update content"
          git push
```

## 📊 預期效果

### 短期（1 個月）
- ✅ 所有文章統一為 MDX
- ✅ 自動更新系統運作
- ✅ 文章新鮮度提升
- 📈 SEO 排名提升 10-20%

### 中期（3 個月）
- ✅ 智能優化系統運作
- ✅ 根據數據自動調整
- 📈 自然流量成長 50-100%

### 長期（6 個月）
- ✅ 完全自動化
- ✅ 持續產出新內容
- 📈 SEO 排名穩定前 3 名
- 📈 自然流量成長 200-300%

## 💡 總結

**關於 TSX：**
- ❌ 不需要保留
- ✅ 全部遷移到 MDX
- ✅ 統一系統更好維護

**關於新鮮度：**
- ✅ 建立自動更新系統
- ✅ 每天更新時效性內容
- ✅ 每週微調保持活躍
- ✅ 根據 GSC 數據優化

**下一步：**
1. 我幫你批次遷移 15 篇 TSX → MDX
2. 建立自動更新腳本
3. 設定 GitHub Actions
4. 開始自動化運作

要開始嗎？
