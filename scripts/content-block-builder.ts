import { CONTENT_FACTS, inferArticleCategory, type SeoPriorityEntry } from './content-facts'

export const DAILY_MARKER = 'AUTO-SEO-DAILY'
export const WEEKLY_MARKER = 'AUTO-SEO-WEEKLY'
export const MONTHLY_MARKER = 'AUTO-SEO-MONTHLY'

export function updateDateModified(content: string, today: string): string {
  if (/dateModified: ".*?"/.test(content)) {
    return content.replace(/dateModified: ".*?"/, `dateModified: "${today}"`)
  }

  return content.replace(/date: ".*?"/, `$&\ndateModified: "${today}"`)
}

export function replaceMarkedBlock(content: string, marker: string, blockContent: string): string {
  const start = `<!-- ${marker}:START -->`
  const end = `<!-- ${marker}:END -->`
  const pattern = new RegExp(`\\n?${escapeRegex(start)}[\\s\\S]*?${escapeRegex(end)}\\n?`, 'g')
  const wrapped = `\n\n${start}\n${blockContent.trim()}\n${end}\n`

  if (pattern.test(content)) {
    return content.replace(pattern, wrapped).trimEnd()
  }

  return `${content.trimEnd()}${wrapped}`.trimEnd()
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')
}

function ensureSentence(value: string): string {
  return value.trim().replace(/[。．，、；：,;:.!?！？]+$/u, '')
}

function joinItems(items: string[]): string {
  return items.map(item => item.trim()).filter(Boolean).join('、')
}

function toCountText(value?: number): string | null {
  if (typeof value !== 'number' || value <= 0) return null
  return value.toLocaleString('zh-TW')
}

function formatMetricLine(priority?: SeoPriorityEntry): string[] {
  if (!priority) return []

  const metrics: string[] = []
  if (typeof priority.currentRank === 'number') metrics.push(`目前自然排名約第 ${Math.round(priority.currentRank)} 名`)
  if (typeof priority.ctr === 'number') metrics.push(`CTR 約 ${(priority.ctr * 100).toFixed(1)}%`)

  const impressions = toCountText(priority.impressions)
  if (impressions) metrics.push(`近期曝光約 ${impressions}`)

  const clicks = toCountText(priority.clicks)
  if (clicks) metrics.push(`點擊約 ${clicks}`)

  if (metrics.length === 0) return []
  return ['### SEO 觀察', `${ensureSentence(priority.reason)}；${metrics.join('、')}。`]
}

export function buildDailyBlock(slug: string, currentMonth: string, priority?: SeoPriorityEntry): string {
  const category = inferArticleCategory(slug)
  const intro = [`## ${currentMonth} 最後更新重點`]
  const metricLines = formatMetricLine(priority)

  const bodyByCategory = {
    food: [
      '### 最新美食動線',
      `最近最適合住客的安排，是把 ${joinItems(CONTENT_FACTS.foodHighlights.slice(0, 3))} 拆成不同餐期去吃。這樣不只比較不會排太久，也能讓整趟住宿行程保留回民宿休息的彈性。`,
      '',
      '### 交通與步行安排',
      `${ensureSentence(CONTENT_FACTS.transportUpdates[1])}。對第一次來高雄的旅客來說，比一直開車換點更順。`
    ],
    group: [
      '### 團體入住提醒',
      `${ensureSentence(CONTENT_FACTS.bookingTips[1])}。這件事會直接影響入住第一晚的體驗。若提前分好房型與採買任務，通常比現場討論來得順。`,
      '',
      '### 晚餐安排建議',
      `${ensureSentence(CONTENT_FACTS.bookingTips[2])}。對 15 人以上團體尤其有效，也比較能兼顧不同飲食需求。`
    ],
    guide: [
      '### 預訂前快速判斷',
      `如果你的需求是多人同行、希望一起聊天聚餐、又不想被飯店房型切散，${ensureSentence(CONTENT_FACTS.baseFacts[0])} 會比一般飯店方案更貼近實際需求。`,
      '',
      '### 現在最實用的安排方式',
      `${ensureSentence(CONTENT_FACTS.transportUpdates[2])}，再把 ${joinItems(CONTENT_FACTS.nearbySpots.slice(0, 3))} 排成同一路線，會比來回折返更有效率。`
    ],
    general: [
      '### 近期訂房觀察',
      `${ensureSentence(CONTENT_FACTS.bookingTips[0])}。`,
      '',
      '### 住宿決策重點',
      `${ensureSentence(CONTENT_FACTS.baseFacts[1])}，所以真正影響體驗的通常不是單一景點，而是住宿點能不能把行程串起來。`
    ]
  }

  return [...intro, '', ...metricLines, ...(metricLines.length ? [''] : []), ...bodyByCategory[category]].join('\n')
}

export function buildWeeklyBlocks(slug: string, currentMonth: string, priority?: SeoPriorityEntry): string[] {
  const category = inferArticleCategory(slug)
  const metricLines = formatMetricLine(priority)
  const blocks: string[] = []

  const decisionBlock = [
    `## ${currentMonth} 預訂前快速判斷`,
    ...metricLines,
    ...(metricLines.length ? [''] : []),
    '如果你現在還在猶豫要不要包棟，可以先看三件事：人數是否超過 10 人、晚上是否需要一起聚餐聊天、作息是否需要彈性。只要中了兩項，包棟通常就比飯店更適合。',
    '',
    `而且 ${ensureSentence(CONTENT_FACTS.baseFacts[1])}，這會讓行程切換成本明顯降低。`
  ].join('\n')
  blocks.push(decisionBlock)

  if (category === 'group') {
    blocks.push([
      `## 團體包棟 FAQ（${currentMonth}更新）`,
      '### Q：20 人包棟要不要自己煮？',
      `${ensureSentence(CONTENT_FACTS.bookingTips[2])}，也比較容易控制總預算。`,
      '',
      '### Q：下雨天行程怎麼辦？',
      `建議把 ${joinItems(CONTENT_FACTS.nearbySpots.slice(0, 3))} 與民宿聚餐排成可互換動線，遇到天氣變化時調整空間會比較大。`
    ].join('\n'))
  }

  if (category === 'guide') {
    blocks.push([
      `## 常見決策問題（${currentMonth}版）`,
      '### Q：12 個人要訂兩間飯店還是一間包棟？',
      `若重視互動與公共空間，${CONTENT_FACTS.properties.hellohouse.displayName} 這類有客廳與廚房的方案通常更有效率。`,
      '',
      '### Q：只住一晚也值得包棟嗎？',
      '值得，但最好在傍晚前入住，才能真正用到公共空間與步行生活圈。'
    ].join('\n'))
  }

  if (category === 'food') {
    blocks.push([
      `## ${currentMonth} 鹽埕吃法建議`,
      `最推薦的方式不是一次塞滿所有店，而是把 ${joinItems(CONTENT_FACTS.foodHighlights.slice(0, 4))} 拆成早餐、午餐、宵夜不同時段。`,
      '',
      `${ensureSentence(CONTENT_FACTS.transportUpdates[1])}，所以吃累了就回民宿休息，比住較遠區域方便得多。`
    ].join('\n'))
  }

  return blocks.slice(0, 2)
}

export function buildMonthlyBlocks(slug: string, currentMonth: string, priority?: SeoPriorityEntry): string[] {
  const category = inferArticleCategory(slug)
  const property = category === 'group' ? CONTENT_FACTS.properties.combo : CONTENT_FACTS.properties.hellohouse
  const priorityNote = priority
    ? `${ensureSentence(priority.reason)}。這次深度更新也會把曝光、排名與使用者決策資訊一起補強。`
    : '這次深度更新以站內既有營運事實與近期訂房決策需求為主，補強文章深度與判斷資訊。'

  const blocks = [
    [
      `## ${currentMonth} 最新資訊`,
      '### 本次更新重點',
      priorityNote,
      '',
      '### 目前最重要的住宿事實',
      `${property.displayName} 目前主打 ${property.capacity}，核心賣點包含 ${joinItems(property.highlights)}。若是多人同行、需要聚餐或分層作息，這類空間型住宿通常比傳統飯店更有彈性。`,
      '',
      '### 交通與周邊動線',
      `${ensureSentence(CONTENT_FACTS.transportUpdates[0])}，而且 ${joinItems(CONTENT_FACTS.nearbySpots.slice(0, 4))} 可以排成同一條旅遊動線。`
    ].join('\n'),
    [
      `## 真實案例分享（${currentMonth}更新）`,
      '### 近期團體入住案例',
      `最近比較典型的需求，是先用 ${CONTENT_FACTS.properties.hellohouse.displayName} 安排主要聚會空間，再視人數決定是否搭配 ${CONTENT_FACTS.properties.godin.displayName} 分流長輩與早睡成員。這樣做的好處是公共活動與休息空間不會互相干擾。`,
      '',
      '### 實際決策重點',
      `住客最常比較的不是「能不能住」，而是「住起來會不會擠」與「回來後能不能繼續聚在一起」。因此我們在深度更新時會優先補上房型分配、交通方式、晚餐安排與停車資訊，而不是只改時間戳。`
    ].join('\n')
  ]

  if (category !== 'food') {
    blocks.push([
      `## 常見問題（${currentMonth}更新）`,
      '### Q：包棟民宿和飯店到底差在哪？',
      `最大的差異不是價格而已，而是能不能把客廳、廚房與整棟空間真正用起來。對 ${property.capacity} 的團體來說，整體互動品質通常比被拆成多間房更好。`,
      '',
      '### Q：停車與採買方便嗎？',
      `周邊常用選擇包含 ${joinItems(CONTENT_FACTS.parkingOptions)}；若要自己煮，附近也能快速完成食材採買。`
    ].join('\n'))
  }

  return blocks
}
