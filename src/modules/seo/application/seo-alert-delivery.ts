import { hasAlertSentOnTaipeiDate } from '@/modules/seo/infrastructure/seo-ops-state';

const TRIGGER_SOURCE_HEADER = 'x-seo-trigger-source';
const FORCE_SEND_HEADER = 'x-seo-force-send';

export interface SeoAlertDispatchDecision {
    alertSuppressed: boolean;
    reason: 'already_sent_today' | null;
    shouldSend: boolean;
}

export function resolveSeoTriggerSource(request: Request): string {
    const explicitSource = request.headers.get(TRIGGER_SOURCE_HEADER)?.trim();
    if (explicitSource) {
        return explicitSource;
    }

    if (request.headers.get('x-vercel-cron')) {
        return 'vercel-cron';
    }

    const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
    if (userAgent.includes('vercel')) {
        return 'vercel';
    }
    if (userAgent.includes('codex')) {
        return 'codex';
    }
    if (userAgent.includes('curl')) {
        return 'curl';
    }
    if (userAgent.includes('node') || userAgent.includes('undici')) {
        return 'external-script';
    }

    return 'external';
}

export function isForceAlertSend(request: Request): boolean {
    const forceHeader = request.headers.get(FORCE_SEND_HEADER)?.trim().toLowerCase();
    if (forceHeader === '1' || forceHeader === 'true') {
        return true;
    }

    const forceParam = new URL(request.url).searchParams.get('force')?.trim().toLowerCase();
    return forceParam === '1' || forceParam === 'true';
}

export function resolveSeoAlertDispatch(options: {
    forceSend: boolean;
    lastAlertAt?: string;
    nowIso: string;
}): SeoAlertDispatchDecision {
    const { forceSend, lastAlertAt, nowIso } = options;

    if (!forceSend && hasAlertSentOnTaipeiDate(lastAlertAt, nowIso)) {
        return {
            shouldSend: false,
            alertSuppressed: true,
            reason: 'already_sent_today',
        };
    }

    return {
        shouldSend: true,
        alertSuppressed: false,
        reason: null,
    };
}
