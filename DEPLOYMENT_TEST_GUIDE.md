# 部署測試指南

## ✅ 已完成
- Git commit 建立完成
- 推送到 GitHub 成功
- Vercel 應該會自動觸發部署

## 📋 接下來的測試步驟

### 1. 檢查 Vercel 部署狀態

前往 Vercel Dashboard：
- https://vercel.com/dashboard
- 找到 hello-stay-next 專案
- 查看最新的部署狀態

預期會看到：
- ✅ Building...
- ✅ Deploying...
- ✅ Ready

### 2. 測試 Preview URL

部署完成後，Vercel 會提供一個 Preview URL，例如：
```
https://hello-stay-next-xxx.vercel.app
```

**測試項目：**

#### A. 基本功能測試
```
訪問：https://your-preview-url.vercel.app/blog/kaohsiung-mahjong-stay

檢查：
✅ 頁面正常顯示
✅ 標題正確：「高雄麻將民宿推薦｜麻將・包棟打牌到天亮」
✅ 內容完整顯示
✅ 圖片載入正常
✅ 連結可以點擊
```

#### B. SEO Metadata 檢查
```
右鍵 > 檢視原始碼

確認以下標籤存在：
✅ <title>高雄麻將民宿推薦｜麻將・包棟打牌到天亮</title>
✅ <meta name="description" content="...">
✅ <link rel="canonical" href="https://www.hello-stay.com/blog/kaohsiung-mahjong-stay">
✅ <script type="application/ld+json"> (JSON-LD)
```

#### C. 效能測試
```
使用 Chrome DevTools：
1. 開啟 Network 面板
2. 重新載入頁面
3. 檢查：
   ✅ 載入時間 < 3 秒
   ✅ 沒有 404 錯誤
   ✅ 沒有 console 錯誤
```

#### D. 行動裝置測試
```
使用 Chrome DevTools：
1. 切換到行動裝置模式 (Ctrl+Shift+M)
2. 測試不同裝置：
   ✅ iPhone 14 Pro
   ✅ iPad
   ✅ Android
3. 確認排版正常
```

### 3. 比較新舊版本

**舊版（靜態 TSX）：**
```
https://your-preview-url.vercel.app/blog/yancheng-food-guide
```

**新版（MDX）：**
```
https://your-preview-url.vercel.app/blog/kaohsiung-mahjong-stay
```

**檢查項目：**
- ✅ 兩者外觀一致
- ✅ 載入速度相近
- ✅ SEO 結構相同

### 4. Google Search Console 檢查

**重要：只有部署到 production 後才能檢查**

如果你決定部署到 production：

1. 前往 Google Search Console
   - https://search.google.com/search-console

2. 選擇 hello-stay.com 網站

3. 使用「網址檢查」工具
   ```
   輸入：https://www.hello-stay.com/blog/kaohsiung-mahjong-stay
   ```

4. 點擊「要求建立索引」

5. 等待 24-48 小時後檢查：
   - 索引狀態
   - 點擊率
   - 曝光次數
   - 平均排名

### 5. 監控指標（部署後 3-7 天）

#### Google Search Console
```
路徑：成效 > 搜尋結果

監控：
- 點擊次數（應該維持或增加）
- 曝光次數（應該維持或增加）
- 平均點閱率（應該維持）
- 平均排名（應該維持或提升）

特別關注：
- kaohsiung-mahjong-stay 相關關鍵字
- 高雄麻將民宿
- 高雄包棟打麻將
```

#### Vercel Analytics
```
路徑：Vercel Dashboard > Analytics

監控：
- 頁面瀏覽量
- 獨立訪客
- 跳出率
- 平均停留時間
```

## ⚠️ 警告信號

如果看到以下情況，立即回滾：

### 🚨 嚴重問題
- ❌ 頁面 404 錯誤
- ❌ 頁面完全空白
- ❌ Build 失敗
- ❌ 載入時間 > 5 秒

### ⚠️ 需要注意
- ⚠️ SEO metadata 缺失
- ⚠️ 排名下降 > 5 名
- ⚠️ 點擊率下降 > 20%
- ⚠️ Console 有錯誤訊息

## 🔄 回滾步驟

如果需要回滾：

```bash
cd "/Users/kaotangyu/Documents/Antigravity/官網/Hellostay官網"

# 方法 1：回到上一個 commit
git revert HEAD
git push origin main

# 方法 2：直接 reset（危險，會丟失變更）
git reset --hard HEAD~1
git push --force origin main

# 方法 3：在 Vercel 直接回滾
# 前往 Vercel Dashboard > Deployments
# 找到上一個成功的部署
# 點擊 "Promote to Production"
```

## 📊 成功標準

**3 天後檢查：**
- ✅ 頁面正常運作
- ✅ 無 404 錯誤
- ✅ SEO 排名穩定（±2 名內）
- ✅ 點擊率穩定（±10% 內）

**7 天後檢查：**
- ✅ 所有指標穩定
- ✅ 無使用者回報問題
- ✅ 可以繼續遷移更多文章

## 🎯 下一步

### 如果測試成功
1. 繼續遷移 2-3 篇文章
2. 重複測試流程
3. 逐步遷移所有文章
4. 進入 Phase 2（自動發布）

### 如果遇到問題
1. 記錄問題詳情
2. 截圖錯誤訊息
3. 檢查 Vercel logs
4. 必要時回滾
5. 修正問題後重新測試

## 📞 需要幫助？

如果遇到以下情況，可以切換回 Opus：
- Build 失敗無法解決
- SEO 排名異常下降
- 出現奇怪的錯誤
- 需要架構決策

---

**目前狀態：**
- ✅ 程式碼已推送到 GitHub
- ⏳ 等待 Vercel 自動部署
- 📋 準備開始測試

**Vercel 部署通常需要 2-5 分鐘**
