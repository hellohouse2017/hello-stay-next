# Haiku 任務清單

## 📋 剩餘工作

### 1. 完成剩餘 3 篇 TSX → MDX 轉換

還需要轉換的文章：
- `kaohsiung-bnb-recommendation` (高雄民宿推薦)
- `kaohsiung-group-stay-guide` (高雄包棟民宿完全攻略)
- `kaohsiung-group-trip` (高雄團體旅遊行程推薦)

**操作步驟：**
```bash
# 讀取每篇 TSX 文章
src/app/blog/kaohsiung-bnb-recommendation/page.tsx
src/app/blog/kaohsiung-group-stay-guide/page.tsx
src/app/blog/kaohsiung-group-trip/page.tsx

# 轉換成 MDX 格式，參考已完成的格式
src/content/articles/yancheng-food-guide.mdx

# 儲存到
src/content/articles/kaohsiung-bnb-recommendation.mdx
src/content/articles/kaohsiung-group-stay-guide.mdx
src/content/articles/kaohsiung-group-trip.mdx
```

### 2. 測試 Build

```bash
cd "/Users/kaotangyu/Documents/Antigravity/官網/Hellostay官網"
npm run build
```

確認：
- ✅ Build 成功
- ✅ 無錯誤訊息
- ✅ 所有文章都能正常生成

### 3. Git Commit

```bash
git add src/content/articles/
git commit -m "feat: 完成所有 TSX 文章遷移到 MDX

- 轉換剩餘 3 篇文章到 MDX 格式
- 保持 URL 結構和 SEO metadata 完整
- 總計完成 13 篇文章遷移

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

### 4. 推送到 GitHub

```bash
git push origin main
```

### 5. 更新任務狀態

完成後標記任務 #3 為 completed

---

## 📝 注意事項

1. **保持格式一致**
   - 參考已完成的 MDX 文章格式
   - frontmatter 必須包含：title, description, canonical, date, emoji, tags, excerpt

2. **內容完整性**
   - 確保所有 sections 內容都轉換過來
   - 保持原始內容不變

3. **測試重點**
   - Build 必須成功
   - 檢查生成的靜態頁面數量是否正確

4. **如果遇到問題**
   - 檢查 MDX frontmatter 格式
   - 確認檔案路徑正確
   - 查看 build 錯誤訊息

---

## ✅ 完成標準

- [ ] 3 篇文章全部轉換完成
- [ ] npm run build 成功
- [ ] Git commit 完成
- [ ] 推送到 GitHub 成功
- [ ] 任務 #3 標記為 completed
