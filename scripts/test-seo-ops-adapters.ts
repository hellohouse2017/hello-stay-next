import assert from 'node:assert/strict';
import {
    createSeoAlertNotifier,
    createSeoOpsStateStore,
} from '@/modules/seo/infrastructure/seo-ops-adapters';

async function main() {
    const sent: Array<{ channel: 'main' | 'ruins'; report: string }> = [];
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

    const stateStore = createSeoOpsStateStore({
        persist: async (key, state) => {
            persisted.push({ key, state });
            return state;
        },
    });

    await stateStore.persistMain({ status: 'healthy' });
    await stateStore.persistRuins({ status: 'failed' });

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
