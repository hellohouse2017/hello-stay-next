# Hello Stay 官網模組化計畫

## 目標
1. 實現文章自動更新
2. 提升 SEO/AEO 排名
3. 降低內容管理成本

## Phase 1: 內容分離（Week 1-2）

### 1.1 安裝依賴
```bash
npm install contentlayer next-contentlayer date-fns gray-matter
npm install -D @types/mdx
```

### 1.2 建立內容結構
```
src/content/
├── articles/
│   ├── kaohsiung-group-stay-guide.mdx
│   ├── yancheng-food-guide.mdx
│   └── ...
├── config/
│   └── contentlayer.config.ts
└── utils/
    └── mdx.ts
```

### 1.3 遷移現有文章
- 將 `src/app/blog/[slug]/page.tsx` 改為動態路由
- 文章內容移到 MDX 檔案
- 保留 SEO metadata 在 frontmatter

### 1.4 動態路由改造
```typescript
// src/app/blog/[slug]/page.tsx
import { allArticles } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = allArticles.find((a) => a.slug === params.slug)
  if (!article) notFound()
  
  return <ArticleTemplate article={article} />
}
```

## Phase 2: 自動發布系統（Week 3-4）

### 2.1 GitHub Actions 自動發布
```yaml
# .github/workflows/auto-publish.yml
name: Auto Publish Articles
on:
  schedule:
    - cron: '0 0 * * *'  # 每天 00:00
  workflow_dispatch:

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
      - name: Run publish script
        run: npx tsx scripts/auto-publish.ts
      - name: Commit new articles
        run: |
          git config user.name "Auto Publisher"
          git add src/content/articles/
          git commit -m "chore: auto-publish scheduled articles"
          git push
```

### 2.2 發布腳本
```typescript
// scripts/auto-publish.ts
import { scheduledArticles } from '@/data/scheduled-articles'
import fs from 'fs'
import path from 'path'

const today = new Date().toISOString().slice(0, 10)

scheduledArticles
  .filter(article => article.publishDate === today)
  .forEach(article => {
    const mdx = generateMDX(article)
    const filePath = path.join('src/content/articles', `${article.slug}.mdx`)
    fs.writeFileSync(filePath, mdx)
    console.log(`✅ Published: ${article.title}`)
  })
```

## Phase 3: SEO 自動優化（Week 5-6）

### 3.1 Google Search Console 整合
```typescript
// scripts/seo-optimizer.ts
import { google } from 'googleapis'

const searchconsole = google.searchconsole('v1')

async function analyzePerformance() {
  const response = await searchconsole.searchanalytics.query({
    siteUrl: 'https://www.hello-stay.com',
    requestBody: {
      startDate: '2026-03-01',
      endDate: '2026-04-13',
      dimensions: ['page', 'query'],
    }
  })
  
  // 分析低表現頁面
  const lowPerformers = response.data.rows
    .filter(row => row.clicks < 10 && row.impressions > 100)
  
  // 自動優化建議
  return generateOptimizationSuggestions(lowPerformers)
}
```

### 3.2 內容優化策略
- **標題優化**：A/B 測試不同標題（用 Vercel Edge Config）
- **關鍵字密度**：自動檢查並調整
- **內部連結**：自動添加相關文章連結
- **更新時效性**：自動更新日期、數據

## Phase 4: 內容更新機制（Week 7-8）

### 4.1 時效性內容自動更新
```typescript
// scripts/content-updater.ts
// 每月自動更新「2027 跨年」→「2028 跨年」
// 更新文章中的日期、活動資訊
```

### 4.2 GSC 數據驅動優化
```typescript
// 根據 GSC 數據自動：
// 1. 調整 meta description
// 2. 添加缺失的關鍵字
// 3. 優化內部連結結構
```

## 技術棧選擇

### 內容管理
- **Contentlayer**（推薦）：輕量、型別安全、與 Next.js 整合好
- 替代：next-mdx-remote, mdx-bundler

### SEO 工具
- **Google Search Console API**：排名監控
- **Vercel Analytics**：流量分析
- **Ahrefs API**（選配）：競品分析

### 自動化
- **GitHub Actions**：免費、簡單
- **Vercel Cron Jobs**：付費但更穩定

## 預期效果

### 短期（1-2 個月）
- 文章發布自動化，節省 80% 人工時間
- SEO 排名提升 20-30%（透過持續優化）

### 中期（3-6 個月）
- 自然流量成長 2-3 倍
- 長尾關鍵字覆蓋率提升 50%

### 長期（6-12 個月）
- 建立內容護城河，SEO 排名穩定在前 3 名
- 自動化系統完全運作，幾乎零人工介入

## 成本估算

### 開發成本
- Phase 1-2: 40-60 小時（內容分離 + 自動發布）
- Phase 3-4: 40-60 小時（SEO 優化 + 內容更新）
- 總計：80-120 小時

### 運營成本
- GitHub Actions: 免費（2000 分鐘/月）
- Google Search Console API: 免費
- Vercel 部署: 現有方案即可
- 總計：$0/月（使用免費方案）

## 風險與注意事項

1. **SEO 波動**：內容大改可能短期影響排名
2. **自動化錯誤**：需要監控機制
3. **內容品質**：AI 生成內容需要人工審核

## 下一步

1. 確認方案可行性
2. 建立 Phase 1 開發環境
3. 遷移 1-2 篇文章測試
4. 逐步推進後續 Phase
