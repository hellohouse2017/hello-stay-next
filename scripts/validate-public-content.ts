import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
    APPROVED_FUTURE_ARTICLE_SCHEDULE,
    getPublishedArticles,
    scheduledArticles,
} from '@/data/scheduled-articles';
import { publicStayFacts } from '@/data/public-stay-facts';
import { hellohouse } from '@/data/properties';

const root = process.cwd();
const articleDirectory = path.join(root, 'src/content/articles');
const staticBlogDirectory = path.join(root, 'src/app/blog');

function findDuplicates(values: string[]): string[] {
    const seen = new Set<string>();
    const duplicates = new Set<string>();
    for (const value of values) {
        if (seen.has(value)) duplicates.add(value);
        seen.add(value);
    }
    return [...duplicates];
}

function read(relativePath: string): string {
    return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

const scheduledSlugDuplicates = findDuplicates(scheduledArticles.map((article) => article.slug));
assert.deepEqual(scheduledSlugDuplicates, [], `排程文章 slug 重複: ${scheduledSlugDuplicates.join(', ')}`);

const publishedScheduled = getPublishedArticles(scheduledArticles);
const sourceSlugs = new Set(
    fs.readdirSync(articleDirectory)
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => file.replace(/\.mdx$/, '')),
);
const duplicatedPublishedSources = publishedScheduled
    .map((article) => article.slug)
    .filter((slug) => sourceSlugs.has(slug));
assert.deepEqual(duplicatedPublishedSources, [], `同一公開文章同時存在 MDX 與 scheduled source: ${duplicatedPublishedSources.join(', ')}`);

const duplicatedStaticSources = fs.readdirSync(staticBlogDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && sourceSlugs.has(entry.name))
    .filter((entry) => fs.existsSync(path.join(staticBlogDirectory, entry.name, 'page.tsx')))
    .map((entry) => entry.name)
    .sort();
assert.deepEqual(duplicatedStaticSources, [], `同一公開文章同時存在 MDX 與靜態 route: ${duplicatedStaticSources.join(', ')}`);

const managedFutureArticles = scheduledArticles
    .filter((article) => article.publishDate > '2026-08-15' && article.status !== 'draft' && article.status !== 'review')
    .map((article) => `${article.slug}:${article.publishDate}`)
    .sort();
const approvedFutureArticles = Object.entries(APPROVED_FUTURE_ARTICLE_SCHEDULE)
    .map(([slug, publishDate]) => `${slug}:${publishDate}`)
    .sort();
assert.deepEqual(
    managedFutureArticles,
    approvedFutureArticles,
    '2026-08-16 之後只有人工核准的 3 篇排程稿可進入發布流程',
);

type ContentSource = { name: string; text: string };

const publishableScheduledSources: ContentSource[] = scheduledArticles
    .filter((article) => article.status !== 'draft' && article.status !== 'review')
    .map((article) => ({ name: `scheduled:${article.slug}`, text: JSON.stringify(article) }));
const mdxSources: ContentSource[] = fs.readdirSync(articleDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({ name: `mdx:${file}`, text: fs.readFileSync(path.join(articleDirectory, file), 'utf8') }));

const unstableContentRules: Array<{ label: string; pattern: RegExp }> = [
    { label: '無來源固定金額', pattern: /(?:NT\$|\$)\s*\d|(?:新台幣\s*)?\d[\d,]*\s*元起|一萬元起/ },
    { label: '固定節省或折扣比例', pattern: /(?:省|便宜|折扣|優惠).{0,12}\d+(?:\.\d+)?\s*(?:[-~～至到]\s*\d+(?:\.\d+)?\s*)?%|\d+\s*[-~～至到]\s*\d+\s*%(?![0-9A-Fa-f])/ },
    { label: '過期經營年資', pattern: /(?:經營|做包棟|做這行).{0,12}\d+\s*年/ },
    { label: '固定評論數或評分', pattern: /\d+(?:\.\d+)?\s*(?:顆)?星(?:評分|評論)?|\d+\s*則(?:\s*Google)?\s*評論/ },
    { label: '舊總容量', pattern: /(?:6|8)\s*[-–到至]\s*48\s*人|(?:4|6)\s*[-–到至]\s*40\s*人|三棟聯訂.{0,20}(?:48|40)\s*人/ },
    { label: '你好哇舊容量', pattern: /你好哇寓所.{0,24}(?:6\s*[-–到至]\s*26|6到26)\s*人/ },
    { label: '溝頂舊容量', pattern: /溝頂民宿.{0,24}(?:10\s*[-–到至]\s*12|10到12)\s*人/ },
    { label: '溝頂舊房型', pattern: /溝頂民宿.{0,40}(?:4\s*間|四間)雙人房/ },
    { label: '你好哇舊登記證號', pattern: /131-1/ },
];

for (const source of [...publishableScheduledSources, ...mdxSources]) {
    for (const rule of unstableContentRules) {
        assert.equal(
            rule.pattern.test(source.text),
            false,
            `${source.name} 含${rule.label}: ${source.text.match(rule.pattern)?.[0] || ''}`,
        );
    }
}

const highRiskFiles = [
    'src/app/hellohouse/page.tsx',
    'src/app/compare/page.tsx',
    'src/app/kaohsiung-whole-house/page.tsx',
    'src/content/articles/kaohsiung-mahjong-stay.mdx',
];
const highRiskText = highRiskFiles.map(read).join('\n');
for (const unsupportedClaim of ['雙人房 2 間 四人房 1 間 六人房 2 間', '世運在鳳山', '打到天亮', '不限時打到凌晨', '$8,000起']) {
    assert.equal(highRiskText.includes(unsupportedClaim), false, `公開高風險頁仍含不支援說法: ${unsupportedClaim}`);
}

const helloLayout = publicStayFacts.hellohouse.bedroomLayout;
assert.equal(helloLayout.double + helloLayout.quadruple + helloLayout.sixPerson, publicStayFacts.hellohouse.bedrooms, '你好哇房型加總與總房數不一致');
assert.equal(publicStayFacts.godin.bedroomLayout.double + publicStayFacts.godin.bedroomLayout.quadruple, publicStayFacts.godin.bedrooms, '溝頂房型加總與總房數不一致');
assert.equal(publicStayFacts.dual.capacity.max, 36, '公開雙館方案上限應為 36 人');
assert.equal(hellohouse.rooms.filter((room) => room.capacity > 0).length, publicStayFacts.hellohouse.bedrooms, '你好哇公開房型資料未完整列出 6 間客房');
for (const roomCode of ['1201', '1202', '1301', '1302', '1401', '1402']) {
    assert.equal(hellohouse.rooms.some((room) => room.name.includes(roomCode)), true, `你好哇缺少房型 ${roomCode}`);
}

console.log(`✅ 公開內容驗證通過：${publishedScheduled.length} 篇已發布排程文章、${approvedFutureArticles.length} 篇核准排程、${sourceSlugs.size} 篇 MDX`);
