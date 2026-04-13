#!/usr/bin/env tsx

/**
 * 每週自動更新腳本
 * 功能：
 * 1. 隨機選擇 5-10 篇文章
 * 2. 微調內容保持新鮮度
 * 3. 更新 dateModified
 * 4. 自動 commit 和推送
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const articlesDir = path.join(process.cwd(), 'src/content/articles')
const today = new Date().toISOString().slice(0, 10)

// 微調策略
const refreshStrategies = [
  {
    name: '調整標點符號間距',
    apply: (content: string) => {
      // 10% 機率在句號後加入空格
      return content.replace(/。/g, (match) => {
        return Math.random() < 0.1 ? '。 ' : '。'
      })
    }
  },
  {
    name: '更新時間描述',
    apply: (content: string) => {
      // 更新「最近」、「近期」等時間描述
      const timeWords = [
        { old: '最近', new: '近期' },
        { old: '近期', new: '最近' },
        { old: '目前', new: '現在' },
        { old: '現在', new: '目前' }
      ]

      const word = timeWords[Math.floor(Math.random() * timeWords.length)]
      return content.replace(new RegExp(word.old, 'g'), word.new)
    }
  },
  {
    name: '調整段落順序',
    apply: (content: string) => {
      // 在某些段落前後加入換行，改變視覺節奏
      return content.replace(/\n\n/g, (match) => {
        return Math.random() < 0.05 ? '\n\n\n' : match
      })
    }
  }
]

async function weeklyRefresh() {
  console.log('🔄 開始每週內容更新...\n')

  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'))

  // 隨機選擇 5-10 篇文章
  const numToUpdate = Math.floor(Math.random() * 6) + 5 // 5-10
  const shuffled = files.sort(() => Math.random() - 0.5)
  const selectedFiles = shuffled.slice(0, numToUpdate)

  console.log(`📝 選擇 ${selectedFiles.length} 篇文章進行更新\n`)

  const updatedFiles: string[] = []

  for (const file of selectedFiles) {
    const filePath = path.join(articlesDir, file)
    let content = fs.readFileSync(filePath, 'utf-8')

    // 隨機應用 1-2 個策略
    const numStrategies = Math.random() < 0.5 ? 1 : 2
    const strategies = refreshStrategies
      .sort(() => Math.random() - 0.5)
      .slice(0, numStrategies)

    const appliedStrategies: string[] = []
    for (const strategy of strategies) {
      content = strategy.apply(content)
      appliedStrategies.push(strategy.name)
    }

    // 更新 dateModified
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (frontmatterMatch) {
      let frontmatter = frontmatterMatch[1]

      if (frontmatter.includes('dateModified:')) {
        frontmatter = frontmatter.replace(
          /dateModified: ".*?"/,
          `dateModified: "${today}"`
        )
      } else {
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
    updatedFiles.push(file)

    console.log(`✅ ${file}`)
    appliedStrategies.forEach(s => console.log(`   - ${s}`))
    console.log('')
  }

  console.log(`\n📊 更新完成：${updatedFiles.length} 篇文章`)

  // Git commit
  try {
    execSync('git add src/content/articles/', { stdio: 'inherit' })
    execSync(
      `git commit -m "chore: 每週內容更新\n\n- 微調 ${updatedFiles.length} 篇文章保持新鮮度\n- 更新 dateModified\n- 自動化執行"`,
      { stdio: 'inherit' }
    )
    console.log('\n✅ Git commit 完成')

    execSync('git push origin main', { stdio: 'inherit' })
    console.log('✅ 推送到 GitHub 完成')
  } catch (error) {
    console.error('❌ Git 操作失敗:', error)
    process.exit(1)
  }
}

// 執行
weeklyRefresh().catch(error => {
  console.error('❌ 更新失敗:', error)
  process.exit(1)
})
