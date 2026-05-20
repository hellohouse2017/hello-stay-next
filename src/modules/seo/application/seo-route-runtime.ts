import type { NextRequest, NextResponse } from 'next/server';
import { requireCronAuthorization } from '@/modules/seo/infrastructure/seo-cron-auth';
import {
    defaultSeoAlertNotifier,
    defaultSeoOpsStateStore,
    type SeoAlertNotifier,
    type SeoOpsStateStore,
} from '@/modules/seo/infrastructure/seo-ops-adapters';

export interface CronRequestAuthorizer {
    authorize(request: Request | NextRequest): Promise<NextResponse | null>;
}

export interface SeoRouteRuntime {
    authorizer: CronRequestAuthorizer;
    notifier: SeoAlertNotifier;
    opsStateStore: SeoOpsStateStore;
}

export function createCronRequestAuthorizer(deps?: {
    authorize?: typeof requireCronAuthorization;
}): CronRequestAuthorizer {
    return {
        authorize(request) {
            return (deps?.authorize || requireCronAuthorization)(request);
        },
    };
}

export function createSeoRouteRuntime(deps?: {
    authorizer?: CronRequestAuthorizer;
    notifier?: SeoAlertNotifier;
    opsStateStore?: SeoOpsStateStore;
}): SeoRouteRuntime {
    return {
        authorizer: deps?.authorizer || createCronRequestAuthorizer(),
        notifier: deps?.notifier || defaultSeoAlertNotifier,
        opsStateStore: deps?.opsStateStore || defaultSeoOpsStateStore,
    };
}

export const defaultSeoRouteRuntime = createSeoRouteRuntime();
