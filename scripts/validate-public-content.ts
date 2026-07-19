import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { getPublishedArticles, scheduledArticles } from '@/data/scheduled-articles';
import { publicStayFacts } from '@/data/public-stay-facts';
import { hellohouse } from '@/data/properties';

const root = process.cwd();
const articleDirectory = path.join(root, 'src/content/articles');

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

console.log(`✅ 公開內容驗證通過：${publishedScheduled.length} 篇已發布排程文章、${sourceSlugs.size} 篇 MDX`);
