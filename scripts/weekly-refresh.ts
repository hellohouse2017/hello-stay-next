#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { buildWeeklyBlocks, replaceMarkedBlock, updateDateModified, WEEKLY_MARKER } from './content-block-builder'
import type { SeoPriorityEntry } from './content-facts'
import { formatTaipeiMonthLabel, formatTaipeiYmd } from '../src/lib/taipei-time'

const articlesDir = path.join(process.cwd(), 'src/content/articles')
const priorityPath = path.join(process.cwd(), 'scripts/seo-priority-list.json')
const today = formatTaipeiYmd()
const currentMonth = formatTaipeiMonthLabel()

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5)
}

function hasFrontmatterFaq(content: string): boolean {
  // Articles with structured frontmatter faq render their own FAQ section;
  // injecting the weekly quick-decision block would duplicate visible content.
  const frontmatter = content.match(/^---\n[\s\S]*?\n---/)
  return frontmatter ? /^faq:/m.test(frontmatter[0]) : false
}

function loadSeoPriorityList(): SeoPriorityEntry[] {
  if (!fs.existsSync(priorityPath)) return []

  try {
    const data = JSON.parse(fs.readFileSync(priorityPath, 'utf-8'))
    return Array.isArray(data.priorities) ? data.priorities : []
  } catch {
    console.log('⚠️ SEO 優先清單讀取失敗，改用隨機選文')
    return []
  }
}

async function weeklyRefresh() {
  console.log('🔄 開始每週 SEO 導向更新...\n')

  const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.mdx'))
  const priorities = loadSeoPriorityList()
  const priorityMap = new Map(priorities.map(item => [item.slug, item]))
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

    if (hasFrontmatterFaq(original)) {
      console.log(`⏭️ ${file}（frontmatter 已有 faq，跳過每週區塊注入）`)
      continue
    }

    const blocks = buildWeeklyBlocks(slug, currentMonth, priorityMap.get(slug))

    let next = updateDateModified(original, today)
    next = replaceMarkedBlock(next, WEEKLY_MARKER, blocks.join('\n\n'))

    if (next !== original) {
      fs.writeFileSync(filePath, `${next}\n`, 'utf-8')
      updatedFiles.push(file)
      console.log(`✅ ${file}`)
    }
  }

  if (updatedFiles.length === 0) {
    console.log('\n✨ 沒有實際內容變更，跳過 Git 操作')
    return
  }

  try {
    const staged = updatedFiles.map(file => `src/content/articles/${file}`).join(' ')
    const extra = fs.existsSync(priorityPath) ? ` ${priorityPath}` : ''
    execSync(`git add ${staged}${extra}`, { stdio: 'inherit' })
    execSync(
      `git commit -m "chore: 每週 SEO 導向內容更新\n\n- 補強 FAQ 與決策型內容\n- 更新 ${updatedFiles.length} 篇文章的 dateModified\n- 以 SEO metrics 與結構化 facts 生成每週區塊\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"`,
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
