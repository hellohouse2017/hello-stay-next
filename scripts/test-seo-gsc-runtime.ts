import assert from 'node:assert/strict';
import {
    DEFAULT_GSC_SITE_URL,
    DEFAULT_MAIN_SITE_ORIGIN,
    DEFAULT_RUINS_SITE_ORIGIN,
    SEO_GSC_READONLY_SCOPE,
    createGoogleSearchConsoleAuthProvider,
} from '@/modules/seo/infrastructure/seo-gsc-runtime';

async function main() {
    const capturedScopes: Array<string | string[]> = [];
    const provider = createGoogleSearchConsoleAuthProvider({
        getAuth: async (scopes) => {
            capturedScopes.push(scopes);
            return { ok: true } as never;
        },
    });

    const auth = await provider.getAuth();
    assert.deepEqual(auth, { ok: true });
    assert.deepEqual(capturedScopes, [[SEO_GSC_READONLY_SCOPE]]);
    assert.equal(DEFAULT_GSC_SITE_URL, 'sc-domain:hello-stay.com');
    assert.equal(DEFAULT_MAIN_SITE_ORIGIN, 'https://www.hello-stay.com');
    assert.equal(DEFAULT_RUINS_SITE_ORIGIN, 'https://ruins.hello-stay.com');

    console.log('✅ SEO GSC runtime tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
