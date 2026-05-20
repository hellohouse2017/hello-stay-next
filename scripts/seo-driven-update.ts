#!/usr/bin/env tsx
/**
 * SEO 驅動的智能更新腳本
 * 根據 MongoDB 中的 SEO 數據，優先更新需要改善的文章
 *
 * 優先級：
 * 1. 排名下降 > 5 名的文章（緊急）
 * 2. 排名在第 2-3 頁（11-30 名）的文章（有機會衝第一頁）
 * 3. CTR < 2% 的文章（標題/描述需優化）
 * 4. 隨機選擇其他文章（保持新鮮度）
 */

import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://hellohouse2017_db_user:***REMOVED***@bnbbot.virfati.mongodb.net/bnb_chatbot?retryWrites=true&w=majority&appName=bnbbot'
const articlesDir = path.join(process.cwd(), 'src/content/articles')

// ===== MongoDB Schema =====
const SeoSnapshotSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true, index: true },
  totalClicks: Number,
  totalImpressions: Number,
  avgPosition: Number,
  topQueries: [{ query: String, clicks: Number, impressions: Number, ctr: Number, position: Number }],
  targetKeywords: [{ query: String, clicks: Number, impressions: Number, ctr: Number, position: Number }],
  topPages: [{ page: String, clicks: Number, impressions: Number, ctr: Number, position: Number }],
}, { timestamps: true })

const SeoSnapshot = mongoose.models.SeoSnapshot || mongoose.model('SeoSnapshot', SeoSnapshotSchema)

interface ArticlePriority {
  slug: string
  priority: number
  reason: string
  currentRank?: number
  previousRank?: number
  ctr?: number
  clicks?: number
  impressions?: number
}

function getDateStr(daysAgo: number): string {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString().split('T')[0]
}

/**
 * 分析 SEO 數據，找出需要優先更新的文章
 */
async function analyzeSeoData(): Promise<ArticlePriority[]> {
  console.log('🔍 分析 SEO 數據...\n')

  await mongoose.connect(MONGO_URI)

  // 取最近兩天的數據（用於比較排名變化）
  const today = await SeoSnapshot.findOne().sort({ date: -1 }).lean()
  const yesterday = await SeoSnapshot.findOne({ date: getDateStr(3) }).lean()

  if (!today) {
    console.log('❌ 沒有 SEO 數據')
    await mongoose.disconnect()
    return []
  }

  console.log(`📊 最新數據日期: ${today.date}`)
  console.log(`📊 對比數據日期: ${yesterday?.date || '無'}\n`)

  const priorities: ArticlePriority[] = []

  // 分析部落格頁面
  for (const page of today.topPages || []) {
    if (!page.page.includes('/blog/')) continue

    const slug = page.page.replace('/blog/', '').replace(/\/$/, '')
    const filePath = path.join(articlesDir, `${slug}.mdx`)

    // 檢查文章是否存在
    if (!fs.existsSync(filePath)) continue

    const currentRank = page.position || 0
    const ctr = page.ctr || 0
    const clicks = page.clicks || 0
    const impressions = page.impressions || 0

    // 找出昨天的排名
    const previousPage = yesterday?.topPages?.find((p: { page: string }) => p.page === page.page)
    const previousRank = previousPage?.position || 0

    // 優先級 1: 排名下降 > 5 名（緊急）
    if (previousRank > 0 && currentRank > 0 && (currentRank - previousRank) > 5) {
      priorities.push({
        slug,
        priority: 1,
        reason: `排名下降 ${Math.round(currentRank - previousRank)} 名（${Math.round(previousRank)} → ${Math.round(currentRank)}）`,
        currentRank,
        previousRank,
        ctr,
        clicks,
        impressions
      })
      continue
    }

    // 優先級 2: 排名在第 2-3 頁（11-30 名）
    if (currentRank >= 11 && currentRank <= 30) {
      priorities.push({
        slug,
        priority: 2,
        reason: `排名第 ${Math.ceil(currentRank / 10)} 頁（第 ${Math.round(currentRank)} 名），有機會衝第一頁`,
        currentRank,
        ctr,
        clicks,
        impressions
      })
      continue
    }

    // 優先級 3: CTR < 2%（標題/描述需優化）
    if (impressions > 10 && ctr < 0.02) {
      priorities.push({
        slug,
        priority: 3,
        reason: `CTR 過低 (${(ctr * 100).toFixed(1)}%)，${impressions} 人看到但只有 ${clicks} 人點`,
        currentRank,
        ctr,
        clicks,
        impressions
      })
      continue
    }
  }

  // 排序：優先級越小越優先
  priorities.sort((a, b) => a.priority - b.priority)

  await mongoose.disconnect()

  return priorities
}

/**
 * 顯示分析結果
 */
function displayAnalysis(priorities: ArticlePriority[]) {
  console.log('📋 分析結果:\n')

  if (priorities.length === 0) {
    console.log('✅ 所有文章表現良好，無需緊急更新')
    return
  }

  const urgent = priorities.filter(p => p.priority === 1)
  const opportunity = priorities.filter(p => p.priority === 2)
  const lowCtr = priorities.filter(p => p.priority === 3)

  if (urgent.length > 0) {
    console.log('🚨 緊急（排名下降）:')
    urgent.forEach(p => {
      console.log(`  • ${p.slug}`)
      console.log(`    ${p.reason}`)
    })
    console.log('')
  }

  if (opportunity.length > 0) {
    console.log('🎯 機會（第 2-3 頁）:')
    opportunity.forEach(p => {
      console.log(`  • ${p.slug}`)
      console.log(`    ${p.reason}`)
    })
    console.log('')
  }

  if (lowCtr.length > 0) {
    console.log('⚠️ 需優化（CTR 低）:')
    lowCtr.forEach(p => {
      console.log(`  • ${p.slug}`)
      console.log(`    ${p.reason}`)
    })
    console.log('')
  }

  console.log(`總計: ${priorities.length} 篇文章需要關注\n`)
}

/**
 * 輸出優先更新清單（供 weekly-refresh.ts 使用）
 */
function exportPriorityList(priorities: ArticlePriority[]) {
  const outputPath = path.join(process.cwd(), 'scripts/seo-priority-list.json')
  const generatedAt = new Date().toISOString()

  const output = {
    generatedAt,
    priorities: priorities.map(p => ({
      slug: p.slug,
      priority: p.priority,
      reason: p.reason,
      currentRank: p.currentRank,
      previousRank: p.previousRank,
      ctr: p.ctr,
      clicks: p.clicks,
      impressions: p.impressions,
      generatedAt
    }))
  }

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8')
  console.log(`✅ 優先清單已輸出: ${outputPath}`)
}

// ===== 主程序 =====
async function main() {
  console.log('🚀 SEO 驅動的智能更新分析\n')

  const priorities = await analyzeSeoData()
  displayAnalysis(priorities)
  exportPriorityList(priorities)

  console.log('\n💡 下次執行 weekly-refresh 時，會優先更新這些文章')
}

main().catch(error => {
  console.error('❌ 錯誤:', error)
  process.exit(1)
})
