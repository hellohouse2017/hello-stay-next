#!/usr/bin/env tsx

/**
 * 每日自動更新腳本
 * 功能：
 * 1. 更新時效性內容（年份、日期）
 * 2. 更新 dateModified
 * 3. 自動 commit 和推送
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const articlesDir = path.join(process.cwd(), 'src/content/articles')
const currentYear = new Date().getFullYear()
const today = new Date().toISOString().slice(0, 10)

interface UpdateRule {
  pattern: RegExp
  replacement: (match: string) => string
  description: string
}

// 更新規則
const rules: UpdateRule[] = [
  // 年份更新：只更新明確的舊年份到當前年份
  // 例如：2026 → 2027（如果現在是 2027 年）
  {
    pattern: /\b2026\b/g,
    replacement: () => {
      // 只有當前年份 > 2026 時才更新
      return currentYear > 2026 ? currentYear.toString() : '2026'
    },
    description: '更新 2026 年份到當前年份'
  },

  // 標題中的年份（更保守的更新）
  {
    pattern: /(title: ".*?)2026(.*?")/g,
    replacement: (match, before, after) => {
      if (currentYear > 2026) {
        return `${before}${currentYear}${after}`
      }
      return match
    },
    description: '更新標題中的 2026 年份'
  }
]

async function updateArticles() {
  console.log('🚀 開始每日自動更新...\n')

  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'))
  let updatedCount = 0
  const updatedFiles: string[] = []

  for (const file of files) {
    const filePath = path.join(articlesDir, file)
    let content = fs.readFileSync(filePath, 'utf-8')
    let hasChanges = false
    const changes: string[] = []

    // 應用所有更新規則
    for (const rule of rules) {
      const originalContent = content
      content = content.replace(rule.pattern, rule.replacement)

      if (content !== originalContent) {
        hasChanges = true
        changes.push(rule.description)
      }
    }

    // 如果有變更，更新 dateModified
    if (hasChanges) {
      // 更新 frontmatter 中的 dateModified
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
      if (frontmatterMatch) {
        let frontmatter = frontmatterMatch[1]

        // 如果已有 dateModified，更新它
        if (frontmatter.includes('dateModified:')) {
          frontmatter = frontmatter.replace(
            /dateModified: ".*?"/,
            `dateModified: "${today}"`
          )
        } else {
          // 如果沒有，在 date 後面加入
          frontmatter = frontmatter.replace(
            /date: ".*?"/,
            `$&\ndateModified: "${today}"`
          )
        }

        content = content.replace(
          /^---\n[\s\S]*?\n---/,
          `---\n${frontmatter}\n---`
        )
      }

      fs.writeFileSync(filePath, content, 'utf-8')
      updatedCount++
      updatedFiles.push(file)

      console.log(`✅ ${file}`)
      changes.forEach(change => console.log(`   - ${change}`))
      console.log('')
    }
  }

  console.log(`\n📊 更新完成：${updatedCount}/${files.length} 篇文章`)

  if (updatedCount > 0) {
    console.log('\n更新的文章：')
    updatedFiles.forEach(f => console.log(`  - ${f}`))

    // Git commit
    try {
      execSync('git add src/content/articles/', { stdio: 'inherit' })
      execSync(
        `git commit -m "chore: 每日自動更新內容\n\n- 更新時效性內容（年份、日期）\n- 更新 ${updatedCount} 篇文章的 dateModified\n- 自動化執行"`,
        { stdio: 'inherit' }
      )
      console.log('\n✅ Git commit 完成')

      // 推送到 GitHub
      execSync('git push origin main', { stdio: 'inherit' })
      console.log('✅ 推送到 GitHub 完成')
    } catch (error) {
      console.error('❌ Git 操作失敗:', error)
      process.exit(1)
    }
  } else {
    console.log('\n✨ 所有文章都是最新的，無需更新')
  }
}

// 執行
updateArticles().catch(error => {
  console.error('❌ 更新失敗:', error)
  process.exit(1)
})
