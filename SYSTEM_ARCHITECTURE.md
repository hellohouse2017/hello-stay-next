# Hello Stay 官網系統架構說明

## 🏗️ 目前系統架構（混合模式）

### 文章來源（3 種）

```
┌─────────────────────────────────────────────────────┐
│                    Blog 文章系統                      │
├─────────────────────────────────────────────────────┤
│                                                       │
│  1️⃣ 靜態 TSX 文章（舊系統，15 篇）                    │
│     src/app/blog/yancheng-food-guide/page.tsx       │
│     src/app/blog/kaohsiung-nye-stay/page.tsx        │
│     ... 等 15 篇                                      │
│     特點：內容寫死在程式碼裡                           │
│                                                       │
│  2️⃣ Scheduled Articles（排程文章，2000+ 篇）         │
│     src/data/scheduled-articles.ts                   │
│     特點：內容在 TypeScript 檔案裡，有發布日期控制     │
│                                                       │
│  3️⃣ MDX 文章（新系統，1 篇）← 剛剛新增的              │
│     src/content/articles/kaohsiung-mahjong-stay.mdx │
│     特點：內容與程式碼分離，易於管理和更新             │
│                                                       │
└─────────────────────────────────────────────────────┘
```

### 路由處理邏輯

當使用者訪問 `/blog/xxx` 時：

```typescript
// src/app/blog/[slug]/page.tsx

1. 先檢查是否有 MDX 文章
   ↓
   如果找到 → 顯示 MDX 內容
   ↓
   如果沒找到 ↓

2. 檢查 scheduled-articles
   ↓
   如果找到 → 顯示 scheduled 內容
   ↓
   如果沒找到 ↓

3. 檢查靜態 TSX 文章
   ↓
   如果找到 → 顯示靜態內容
   ↓
   如果都沒找到 → 404
```

## 📊 實際運作範例

### 範例 1：訪問 `/blog/kaohsiung-mahjong-stay`

```
使用者請求
    ↓
檢查 MDX: src/content/articles/kaohsiung-mahjong-stay.mdx
    ↓
✅ 找到了！
    ↓
讀取 MDX frontmatter (title, description, etc.)
    ↓
編譯 MDX 內容為 React 元件
    ↓
渲染頁面
```

**結果：顯示 MDX 版本的文章**

### 範例 2：訪問 `/blog/yancheng-food-guide`

```
使用者請求
    ↓
檢查 MDX: src/content/articles/yancheng-food-guide.mdx
    ↓
❌ 沒找到
    ↓
檢查 scheduled-articles.ts
    ↓
❌ 沒找到
    ↓
檢查靜態 TSX: src/app/blog/yancheng-food-guide/page.tsx
    ↓
✅ 找到了！
    ↓
渲染靜態 TSX 頁面
```

**結果：顯示舊版靜態 TSX 文章**

### 範例 3：訪問 `/blog/kaohsiung-6-person-stay`

```
使用者請求
    ↓
檢查 MDX: src/content/articles/kaohsiung-6-person-stay.mdx
    ↓
❌ 沒找到
    ↓
檢查 scheduled-articles.ts
    ↓
✅ 找到了！（publishDate: 2026-03-01）
    ↓
檢查發布日期：今天 >= 2026-03-01？
    ↓
✅ 是的，已發布
    ↓
渲染 scheduled article 內容
```

**結果：顯示 scheduled-articles 的文章**

## 🔄 文章生命週期

### 舊系統（靜態 TSX）
```
1. 手寫 TSX 檔案
2. 內容寫死在程式碼裡
3. 要更新 → 改程式碼 → 重新部署
4. 無法動態更新
```

### 中間系統（Scheduled Articles）
```
1. 用腳本生成文章內容（generate-seo-articles.ts）
2. 存在 scheduled-articles.ts
3. 有發布日期控制
4. 要更新 → 改 TS 檔案 → 重新部署
```

### 新系統（MDX）← 我們剛建立的
```
1. 文章寫在 .mdx 檔案
2. 內容與程式碼分離
3. 可以動態更新（未來可用 ISR）
4. 易於管理和自動化
```

## 🎯 為什麼要這樣設計？

### 優點

**1. 向後相容**
- 舊文章繼續運作
- 不影響現有 SEO
- 零風險遷移

**2. 漸進式遷移**
- 一次遷移一篇
- 隨時可以停止
- 隨時可以回滾

**3. 靈活性**
- MDX 優先（最新技術）
- Scheduled 備援（批量內容）
- 靜態 TSX 保底（穩定可靠）

### 缺點

**1. 複雜度增加**
- 3 種文章來源
- 需要維護多套系統

**2. 效能考量**
- 需要檢查多個來源
- 但實際影響很小（毫秒級）

## 📈 未來演進計畫

### Phase 1（已完成）✅
```
建立 MDX 系統
測試 1 篇文章
部署驗證
```

### Phase 2（下一步）
```
自動發布系統
├── GitHub Actions 每天自動發布
├── 從 scheduled-articles 生成 MDX
└── 自動 commit 和部署
```

### Phase 3（SEO 優化）
```
Google Search Console 整合
├── 監控排名
├── 自動優化標題/描述
└── A/B 測試
```

### Phase 4（完全自動化）
```
最終目標：
├── 所有文章都是 MDX
├── 自動生成新文章
├── 自動優化舊文章
├── 自動更新時效性內容
└── 零人工介入
```

## 🔍 技術細節

### MDX 文章結構

```markdown
---
title: "文章標題"
description: "SEO 描述"
canonical: "https://www.hello-stay.com/blog/slug"
date: "2026-03-06"
emoji: "🀄"
tags: ["標籤1", "標籤2"]
excerpt: "摘要"
---

## 內容標題

文章內容...
```

### 檔案結構

```
src/
├── app/
│   └── blog/
│       ├── [slug]/
│       │   └── page.tsx          ← 動態路由（處理 MDX + scheduled）
│       ├── yancheng-food-guide/
│       │   └── page.tsx          ← 靜態文章（舊）
│       └── ...
├── content/
│   └── articles/
│       └── kaohsiung-mahjong-stay.mdx  ← MDX 文章（新）
├── data/
│   └── scheduled-articles.ts     ← 排程文章（中）
└── lib/
    └── articles.ts               ← MDX 工具函數
```

### 優先順序

```
MDX > Scheduled > 靜態 TSX

為什麼？
1. MDX 最靈活，優先使用
2. Scheduled 有發布控制，次之
3. 靜態 TSX 最穩定，保底
```

## 🎬 實際運作流程

### Build Time（npm run build）

```
1. Next.js 掃描所有路由
   ↓
2. generateStaticParams() 被呼叫
   ↓
3. 收集所有文章 slug：
   - getAllArticleSlugs() → MDX 文章
   - getPublishedArticles() → Scheduled 文章
   ↓
4. 為每個 slug 生成靜態 HTML
   ↓
5. 輸出到 .next/ 目錄
```

### Runtime（使用者訪問）

```
1. 使用者訪問 /blog/xxx
   ↓
2. Next.js 查找對應的靜態 HTML
   ↓
3. 如果是 MDX 文章：
   - 讀取 .mdx 檔案
   - 編譯 MDX → React
   - 渲染頁面
   ↓
4. 如果是 Scheduled 文章：
   - 從 scheduled-articles.ts 讀取
   - 渲染頁面
   ↓
5. 返回 HTML 給使用者
```

## 💡 關鍵概念

### 1. 內容與程式碼分離

**舊方式：**
```tsx
// 內容寫死在程式碼裡
export default function Page() {
  return <div>文章內容...</div>
}
```

**新方式：**
```markdown
<!-- 內容在 .mdx 檔案 -->
---
title: "標題"
---
文章內容...
```

### 2. 動態路由

```
/blog/[slug]  ← 一個檔案處理所有文章
而不是
/blog/article-1/page.tsx
/blog/article-2/page.tsx
/blog/article-3/page.tsx
...
```

### 3. 漸進式遷移

```
不是一次全改，而是：
第 1 週：遷移 1 篇測試
第 2 週：遷移 3 篇
第 3 週：遷移 10 篇
...
最終：全部遷移完成
```

## 🎯 總結

**現在的系統：**
- ✅ 3 種文章來源共存
- ✅ MDX 優先，向後相容
- ✅ 可以漸進式遷移
- ✅ SEO 完全不受影響

**下一步：**
- 🔄 自動發布系統
- 📊 SEO 自動優化
- 🤖 完全自動化

**最終目標：**
- 自動生成文章
- 自動發布
- 自動優化
- 自動搶 SEO 排名
- 零人工介入
