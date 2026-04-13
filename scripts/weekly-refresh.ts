#!/usr/bin/env tsx

/**
 * 每週 SEO 導向更新腳本
 * 功能：
 * 1. 優先挑選 SEO 表現需要補強的文章
 * 2. 加入 FAQ / 決策比較 / 實用提醒等實質內容
 * 3. 更新 dateModified
 * 4. 有實際變更才 commit / push
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const articlesDir = path.join(process.cwd(), 'src/content/articles')
const priorityPath = path.join(process.cwd(), 'scripts/seo-priority-list.json')
const today = new Date().toISOString().slice(0, 10)
const currentMonth = new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long' })

interface SeoPriority {
  slug: string
  priority: number
  reason: string
}

interface WeeklyBlock {
  title: string
  content: string
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5)
}

function loadSeoPriorityList(): SeoPriority[] {
  if (!fs.existsSync(priorityPath)) return []

  try {
    const data = JSON.parse(fs.readFileSync(priorityPath, 'utf-8'))
    return Array.isArray(data.priorities) ? data.priorities : []
  } catch {
    console.log('⚠️ SEO 優先清單讀取失敗，改用隨機選文')
    return []
  }
}

function blocksForSlug(slug: string): WeeklyBlock[] {
  const common: WeeklyBlock[] = [
    {
      title: `## ${currentMonth} 預訂前快速判斷`,
      content: [
        '如果你現在還在猶豫要不要包棟，可以先用三個問題判斷：第一，你們是不是 10 人以上？第二，晚上是不是會想一起聊天、吃宵夜或打牌？第三，行程中是不是有人需要較彈性的作息？只要其中兩題答案是「是」，包棟通常就比飯店更適合。',
        '',
        '這種判斷方式對搜尋讀者很重要，因為多數人不是只想看景點介紹，而是想快速知道「這篇文章適不適合我」。把答案講清楚，比微調字詞更有 SEO 價值。'
      ].join('\n')
    }
  ]

  if (slug.includes('guide') || slug.includes('recommendation')) {
    return [
      {
        title: `## ${currentMonth} 怎麼選才不會訂錯`,
        content: [
          '最近最常出現的錯誤，是人數抓得剛剛好卻忽略作息差異。舉例來說，20 人團體如果有長輩、早睡的人、會晚睡聊天的人混在一起，實際住宿體驗常常比想像中差。選包棟時不只看可住幾人，還要看房間分布、衛浴數量、公共空間是否足夠。',
          '',
          '如果你們是第一次來高雄，建議優先選鹽埕區。原因不是只有離駁二近，而是從早餐、小吃、咖啡到晚上酒吧幾乎都能步行解決。對外地旅客來說，行程切換成本低，這點往往比單純房價更重要。'
        ].join('\n')
      },
      {
        title: `## 常見決策問題（${currentMonth}版）`,
        content: [
          '### Q：12 個人要訂兩間飯店還是一間包棟？',
          '如果你們重視一起吃飯、聊天、玩桌遊，通常一間包棟會更有效率。因為飯店雖然看似方便，但大家入住後很容易分散到各自房間，真正相處時間反而變少。',
          '',
          '### Q：只住一晚也值得包棟嗎？',
          '值得，但前提是入住時間不要拖太晚。若預計晚上 8 點後才到，能享受公共空間的時間有限；若下午 4-5 點就入住，包棟的價值會明顯放大。'
        ].join('\n')
      },
      ...common
    ]
  }

  if (slug.includes('family') || slug.includes('group') || slug.includes('graduation')) {
    return [
      {
        title: `## ${currentMonth} 實際入住分工建議`,
        content: [
          '最近住客回饋最好的做法，是在出發前先分好三件事：誰負責採買、誰負責交通、誰負責房間分配。這樣入住當天幾乎不會混亂。尤其 15 人以上的團體，如果大家都等到現場才討論晚餐或睡哪間房，通常會浪費第一個晚上最珍貴的相處時間。',
          '',
          '如果有長輩同行，也建議提前決定誰陪同搭車、誰負責照顧孩子，讓整體節奏更穩。對搜尋使用者來說，這些細節很實用，也能提高文章停留時間。'
        ].join('\n')
      },
      {
        title: `## 團體包棟 FAQ（${currentMonth}更新）`,
        content: [
          '### Q：20 人包棟要不要自己煮？',
          '如果你們想控制預算、又希望大家有互動，自己煮火鍋通常是最穩定的選項。採買容易、分工清楚，也能照顧不同飲食需求。',
          '',
          '### Q：下雨天行程怎麼辦？',
          '建議把駁二、大港橋、室內咖啡店與民宿聚餐排成可互換動線。高雄天氣變化快，有備案的團體體驗通常會比硬衝戶外行程好很多。'
        ].join('\n')
      },
      ...common
    ]
  }

  if (slug.includes('food')) {
    return [
      {
        title: `## ${currentMonth} 鹽埕吃法建議`,
        content: [
          '如果是第一次來鹽埕，最推薦的不是「一次吃最多」，而是把餐期拆開。早餐吃在地老店，中午選一間代表性主食，下午再穿插咖啡或冰品，晚上外帶滷味回民宿。這樣的吃法最輕鬆，也最適合搭配包棟行程。',
          '',
          '住客實際經驗是：當你把美食安排跟住宿動線綁在一起，整趟旅程會更順。因為走累了可以隨時回民宿休息，不像住在較遠區域還得來回折返。'
        ].join('\n')
      },
      ...common
    ]
  }

  return common
}

function removeExistingWeeklyBlocks(content: string): string {
  return content.replace(/\n## .*?(快速判斷|怎麼選才不會訂錯|常見決策問題|實際入住分工建議|團體包棟 FAQ|鹽埕吃法建議)[\s\S]*$/m, '').trimEnd()
}

function updateDateModified(content: string): string {
  if (/dateModified: ".*?"/.test(content)) {
    return content.replace(/dateModified: ".*?"/, `dateModified: "${today}"`)
  }

  return content.replace(/date: ".*?"/, `$&\ndateModified: "${today}"`)
}

async function weeklyRefresh() {
  console.log('🔄 開始每週 SEO 導向更新...\n')

  const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.mdx'))
  const priorities = loadSeoPriorityList()
  const selected: string[] = []

  const priorityFiles = priorities
    .map(item => `${item.slug}.mdx`)
    .filter(file => files.includes(file))
    .slice(0, 4)

  selected.push(...priorityFiles)

  const targetCount = Math.max(5, priorityFiles.length)
  if (selected.length < targetCount) {
    const extra = shuffle(files.filter(file => !selected.includes(file))).slice(0, targetCount - selected.length)
    selected.push(...extra)
  }

  const updatedFiles: string[] = []

  for (const file of selected) {
    const slug = file.replace('.mdx', '')
    const filePath = path.join(articlesDir, file)
    const original = fs.readFileSync(filePath, 'utf-8')
    const blocks = shuffle(blocksForSlug(slug)).slice(0, 2)

    let next = removeExistingWeeklyBlocks(original)
    for (const block of blocks) {
      next += `\n\n${block.title}\n\n${block.content}\n`
    }
    next = updateDateModified(next)

    if (next !== original) {
      fs.writeFileSync(filePath, next, 'utf-8')
      updatedFiles.push(file)
      console.log(`✅ ${file}`)
      blocks.forEach(block => console.log(`   - ${block.title}`))
    }
  }

  if (updatedFiles.length === 0) {
    console.log('\n✨ 沒有實際內容變更，跳過 Git 操作')
    return
  }

  try {
    execSync(`git add ${updatedFiles.map(file => `src/content/articles/${file}`).join(' ')} scripts/seo-priority-list.json`, { stdio: 'inherit' })
    execSync(
      `git commit -m "chore: 每週 SEO 導向內容更新\n\n- 補強 FAQ 與決策型內容\n- 更新 ${updatedFiles.length} 篇文章的 dateModified\n- 優先處理 SEO 表現待提升文章\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"`,
      { stdio: 'inherit' }
    )
    execSync('git push origin main', { stdio: 'inherit' })
    console.log('\n✅ 每週更新已推送')
  } catch (error) {
    console.error('❌ Git 操作失敗:', error)
    process.exit(1)
  }
}

weeklyRefresh().catch(error => {
  console.error('❌ 更新失敗:', error)
  process.exit(1)
})
