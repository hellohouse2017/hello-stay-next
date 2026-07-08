# GEO / AI 引用量測說明

## 目前怎麼判定 AI Assistants

- 前台 GA4 初始化在 [src/app/layout.tsx](/Users/tangyukao/Documents/你好哇_正式官網含LINEbot_20260620/主站官網/src/app/layout.tsx)。
- AI referrer allowlist 定義在 [src/lib/ai-assistant-referrers.ts](/Users/tangyukao/Documents/你好哇_正式官網含LINEbot_20260620/主站官網/src/lib/ai-assistant-referrers.ts)。
- 如果 `document.referrer` 命中 allowlist，GA4 會在第一次 `gtag('config', ...)` 時帶入：
  - `campaign_medium = ai-assistant`
  - `campaign_source = 實際 referrer hostname`

這樣 GA4 Data API 就能用 `sessionMedium = ai-assistant` 查出 AI Assistants 的 sessions / users / pageviews，並用 `sessionSource` 看來源拆分。

## 目前 allowlist

- `chatgpt.com`
- `chat.openai.com`
- `perplexity.ai`
- `gemini.google.com`
- `bard.google.com`
- `claude.ai`
- `copilot.microsoft.com`
- `bing.com`

## 日報讀取位置

- 日報 route: [src/app/api/cron/seo-health/route.ts](/Users/tangyukao/Documents/你好哇_正式官網含LINEbot_20260620/主站官網/src/app/api/cron/seo-health/route.ts)
- GA4 helper: [src/modules/seo/infrastructure/seo-ga4.ts](/Users/tangyukao/Documents/你好哇_正式官網含LINEbot_20260620/主站官網/src/modules/seo/infrastructure/seo-ga4.ts)

目前日報使用：

- `sessionDefaultChannelGroup = Organic Search` 看自然搜尋總量
- `sessionMedium = ai-assistant` 看可辨識的 AI 助手流量
- `sessionSource` 看 AI 來源排名

## 觀察限制

- Google AI Overviews / AI Mode 仍多半會留在 `Organic Search`，不一定會帶可辨識 referrer。
- 只有帶 referrer 且命中 allowlist 的流量，才會進到 `AI Assistants` 那列。
- 若之後發現新來源，直接補 allowlist 即可，不需要改日報查詢邏輯。
