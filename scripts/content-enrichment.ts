#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { buildMonthlyBlocks, MONTHLY_MARKER, replaceMarkedBlock, updateDateModified } from './content-block-builder'
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
    console.log('⚠️ 無法讀取 SEO 優先清單，monthly 將只使用站內 facts')
    return new Map()
  }
}

async function main() {
  console.log('🚀 開始內容豐富化...\n')

  const priorityMap = loadPriorityMap()
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'))
  const numToUpdate = Math.random() < 0.5 ? 1 : 2
  const selectedFiles = shuffle(files).slice(0, numToUpdate)
  const updatedFiles: string[] = []

  for (const file of selectedFiles) {
    const slug = file.replace('.mdx', '')
    const filePath = path.join(articlesDir, file)
    const original = fs.readFileSync(filePath, 'utf-8')
    const blocks = buildMonthlyBlocks(slug, currentMonth, priorityMap.get(slug))

    let next = updateDateModified(original, today)
    next = replaceMarkedBlock(next, MONTHLY_MARKER, blocks.join('\n\n'))

    if (next !== original) {
      fs.writeFileSync(filePath, `${next}\n`, 'utf-8')
      updatedFiles.push(file)
      console.log(`✅ ${file}`)
      blocks.forEach((_, index) => console.log(`   - monthly block ${index + 1}`))
    }
  }

  if (updatedFiles.length === 0) {
    console.log('\n✨ 沒有實際內容變更，跳過 Git 操作')
    return
  }

  try {
    execSync(`git add ${updatedFiles.map(file => `src/content/articles/${file}`).join(' ')}`, { stdio: 'inherit' })
    execSync(
      `git commit -m "feat: 深度內容更新 (${currentMonth})\n\n- 以 structured facts 補充 monthly 深度段落\n- 視 SEO priority 加入排名與曝光脈絡\n- 更新 ${updatedFiles.length} 篇文章的 dateModified\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"`,
      { stdio: 'inherit' }
    )
    execSync('git push origin main', { stdio: 'inherit' })
    console.log('✅ 推送到 GitHub 完成')
  } catch (error) {
    console.error('❌ Git 操作失敗:', error)
    process.exit(1)
  }
}

main().catch(error => {
  console.error('❌ 更新失敗:', error)
  process.exit(1)
})
