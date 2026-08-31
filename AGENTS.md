# Hello Stay

Hello Stay 民宿官方網站，使用 Next.js 建構。

## 工作規則

1. 開始工作前先讀 `context.md` 了解專案狀態
2. 不要直接修改 `.env` 或 `next.config.js`
3. 若本次確實有主站功能或內容變更，完成工作後更新 `context.md`，並與該次程式變更放在同一個 focused commit
4. 若 `context.md` 在任務開始前已經是 dirty，視為使用者既有變更，不得為了補記錄而覆寫；流程／規範專用工作改記在 `AGENTS.md` 或 `README.md`

## 進度管理

- 重要的架構決策記錄在 `context.md`
- 每次工作結束時更新 context 中的「最近變更」區塊，但不得留下未提交的 task-owned context 變更

## Dirty changes 與部署防呆

- 每次任務先記錄 `git status --short --untracked-files=all`；既有 dirty 檔案要逐一列入 baseline，除非使用者明確採用，否則不可修改、reset、stash、刪除或加入 commit。
- 若需要修改的檔案與 baseline dirty 檔案重疊，使用獨立 worktree／branch；不要直接在混雜的 working tree 上編輯後再猜來源。
- 不得使用 `git add -A`、`git commit -am` 或整個目錄 staging。只 stage 本次明確驗證過的檔案，commit 前檢查 staged name list、`git diff --cached --check` 與 commit diff。
- 自動 SEO 更新腳本只能在 CI 的乾淨 checkout 執行；本機不可在未經明確授權的 dirty working tree 執行會寫檔、自動 commit 或 push 的內容更新腳本。
- 完成任務或交接前必須執行 `npm run check:clean`。若 baseline dirty 仍存在，必須明確列出並將本次工作與其隔離；本次 task-owned 變更不得留在 working tree。
- Production 只能使用 `npm run deploy:production`。該指令會先驗證 clean commit、執行 production build，再呼叫 Vercel；禁止直接從 dirty working tree 執行 `vercel --prod`。
