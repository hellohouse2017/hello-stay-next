import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

async function main() {
    const filePath = path.join(process.cwd(), 'src/modules/seo/infrastructure/seo-ranking.ts');
    const source = fs.readFileSync(filePath, 'utf8');

    assert.doesNotMatch(source, /BlogScheduleModel/);
    assert.doesNotMatch(source, /from ['"]@\/models\/BlogSchedule['"]/);
    assert.doesNotMatch(source, /google-service-account/);
    assert.match(source, /defaultBlogTitleLookup/);
    assert.match(source, /defaultSearchConsoleAuthProvider/);
    assert.match(source, /titleLookup\?: BlogTitleLookup/);

    console.log('✅ SEO ranking boundary tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
