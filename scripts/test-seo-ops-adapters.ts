import assert from 'node:assert/strict';
import {
    createSeoAlertNotifier,
    createSeoOpsStateStore,
} from '@/modules/seo/infrastructure/seo-ops-adapters';
import { hasAlertSentOnTaipeiDate } from '@/modules/seo/infrastructure/seo-ops-state';

async function main() {
    const sent: Array<{ channel: 'main' | 'ruins'; report: string }> = [];
    const readKeys: string[] = [];
    const persisted: Array<{ key: string; state: { status?: string } }> = [];

    const notifier = createSeoAlertNotifier({
        sendMain: async (report) => {
            sent.push({ channel: 'main', report });
            return true;
        },
        sendRuins: async (report) => {
            sent.push({ channel: 'ruins', report });
            return false;
        },
    });

    assert.equal(await notifier.notifyMain('main-report'), true);
    assert.equal(await notifier.notifyRuins('ruins-report'), false);
    assert.deepEqual(sent, [
        { channel: 'main', report: 'main-report' },
        { channel: 'ruins', report: 'ruins-report' },
    ]);

    assert.equal(hasAlertSentOnTaipeiDate('2026-06-19T01:00:00.000Z', '2026-06-19T12:00:00.000Z'), true);
    assert.equal(hasAlertSentOnTaipeiDate('2026-06-18T14:59:59.000Z', '2026-06-19T00:00:00.000Z'), false);

    const stateStore = createSeoOpsStateStore({
        read: async (key) => {
            readKeys.push(key);
            return key === 'seo_health_status' ? { status: 'healthy' } : { status: 'failed' };
        },
        persist: async (key, state) => {
            persisted.push({ key, state });
            return state;
        },
    });

    await stateStore.readMain();
    await stateStore.readRuins();
    await stateStore.persistMain({ status: 'healthy' });
    await stateStore.persistRuins({ status: 'failed' });

    assert.deepEqual(readKeys, ['seo_health_status', 'ruins_seo_health_status']);
    assert.deepEqual(persisted, [
        { key: 'seo_health_status', state: { status: 'healthy' } },
        { key: 'ruins_seo_health_status', state: { status: 'failed' } },
    ]);

    console.log('✅ SEO ops adapter tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
