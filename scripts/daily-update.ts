#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { buildDailyBlock, DAILY_MARKER, replaceMarkedBlock, updateDateModified } from './content-block-builder'
import type { SeoPriorityEntry } from './content-facts'

const articlesDir = path.join(process.cwd(), 'src/content/articles')
const priorityPath = path.join(process.cwd(), 'scripts/seo-priority-list.json')
const today = new Date().toISOString().slice(0, 10)
const currentMonth = new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long' })

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5)
}

function loadPriorityMap(): Map<string, SeoPriorityEntry> {
  if (!fs.existsSync(priorityPath)) return new Map()

  try {
    const data = JSON.parse(fs.readFileSync(priorityPath, 'utf-8'))
    return new Map((data.priorities || []).map((item: SeoPriorityEntry) => [item.slug, item]))
  } catch {
    return new Map()
  }
}

async function main() {
  console.log('🚀 開始每日實質更新...\n')

  const priorityMap = loadPriorityMap()
  const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.mdx'))
  const selected = shuffle(files).slice(0, Math.random() < 0.5 ? 1 : 2)
  const updatedFiles: string[] = []

  for (const file of selected) {
    const slug = file.replace('.mdx', '')
    const filePath = path.join(articlesDir, file)
    const original = fs.readFileSync(filePath, 'utf-8')
    const block = buildDailyBlock(slug, currentMonth, priorityMap.get(slug))

    let next = updateDateModified(original, today)
    next = replaceMarkedBlock(next, DAILY_MARKER, block)

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
    execSync(`git add ${updatedFiles.map(file => `src/content/articles/${file}`).join(' ')}`, { stdio: 'inherit' })
    execSync(
      `git commit -m "chore: 每日實質內容更新\n\n- 補充最新訂房與行程提醒\n- 更新 ${updatedFiles.length} 篇文章的 dateModified\n- 以結構化 facts 生成每日區塊\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"`,
      { stdio: 'inherit' }
    )
    execSync('git push origin main', { stdio: 'inherit' })
    console.log('\n✅ 每日更新已推送')
  } catch (error) {
    console.error('❌ Git 操作失敗:', error)
    process.exit(1)
  }
}

main().catch(error => {
  console.error('❌ 更新失敗:', error)
  process.exit(1)
})
