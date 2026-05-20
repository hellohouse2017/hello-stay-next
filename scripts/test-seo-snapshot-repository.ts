import assert from 'node:assert/strict';
import { Schema } from 'mongoose';
import { createMongoSeoSnapshotRepository } from '@/modules/seo/infrastructure/seo-snapshot-repository';
import type { ISeoSnapshot } from '@/modules/seo/infrastructure/seo-ranking';

async function main() {
    const calls: Array<{ method: 'save' | 'get'; collectionName: string; date: string; data?: Record<string, unknown> }> = [];
    const schema = new Schema<ISeoSnapshot>({
        date: { type: String, required: true },
        totalClicks: Number,
        totalImpressions: Number,
        avgPosition: Number,
        avgCtr: Number,
        topQueries: [{ query: String, clicks: Number, impressions: Number, ctr: Number, position: Number }],
        targetKeywords: [{ query: String, clicks: Number, impressions: Number, ctr: Number, position: Number }],
        topPages: [{ page: String, clicks: Number, impressions: Number, ctr: Number, position: Number }],
    });

    const repository = createMongoSeoSnapshotRepository({
        collectionName: 'TestSeoSnapshot',
        snapshotSchema: schema,
        getModel: (collectionName) => ({
            findOneAndUpdate: async (query: { date: string }, payload: Record<string, unknown>) => {
                calls.push({ method: 'save', collectionName, date: String(query.date), data: payload });
                return payload;
            },
            findOne: (query: { date: string }) => ({
                lean: async () => {
                    calls.push({ method: 'get', collectionName, date: String(query.date) });
                    return { date: query.date, totalClicks: 3 } as ISeoSnapshot;
                },
            }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any,
    });

    await repository.save('2026-05-12', {
        totalClicks: 7,
        totalImpressions: 70,
        avgPosition: 5,
        avgCtr: 0.1,
        topQueries: [],
        targetKeywords: [],
        topPages: [],
    });
    const snapshot = await repository.get('2026-05-11');

    assert.equal(snapshot?.date, '2026-05-11');
    assert.deepEqual(calls, [
        {
            method: 'save',
            collectionName: 'TestSeoSnapshot',
            date: '2026-05-12',
            data: {
                date: '2026-05-12',
                totalClicks: 7,
                totalImpressions: 70,
                avgPosition: 5,
                avgCtr: 0.1,
                topQueries: [],
                targetKeywords: [],
                topPages: [],
            },
        },
        {
            method: 'get',
            collectionName: 'TestSeoSnapshot',
            date: '2026-05-11',
        },
    ]);

    console.log('✅ SEO snapshot repository tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
