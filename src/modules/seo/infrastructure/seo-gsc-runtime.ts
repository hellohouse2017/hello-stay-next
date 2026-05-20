import { getGoogleServiceAccountAuth } from '@/modules/seo/infrastructure/seo-google-service-account';

export const SEO_GSC_READONLY_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
export const DEFAULT_GSC_SITE_URL = 'sc-domain:hello-stay.com';
export const DEFAULT_MAIN_SITE_ORIGIN = 'https://www.hello-stay.com';
export const DEFAULT_RUINS_SITE_ORIGIN = 'https://ruins.hello-stay.com';

export interface SearchConsoleAuthProvider {
    getAuth(): ReturnType<typeof getGoogleServiceAccountAuth>;
}

export function createGoogleSearchConsoleAuthProvider(deps?: {
    getAuth?: typeof getGoogleServiceAccountAuth;
}): SearchConsoleAuthProvider {
    const getAuth = deps?.getAuth || getGoogleServiceAccountAuth;

    return {
        getAuth() {
            return getAuth([SEO_GSC_READONLY_SCOPE]);
        },
    };
}

export const defaultSearchConsoleAuthProvider = createGoogleSearchConsoleAuthProvider();
