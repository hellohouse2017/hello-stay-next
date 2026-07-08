import { sendTelegramMessage, sendTelegramMessageToConfiguredChannel } from '@/modules/seo/infrastructure/seo-notification';
import {
    SEO_HEALTH_STATE_KEY,
    RUINS_SEO_HEALTH_STATE_KEY,
    persistOpsState,
    readOpsState,
    type ContentOpsState,
} from '@/modules/seo/infrastructure/seo-ops-state';

export interface SeoAlertNotifier {
    notifyMain(report: string): Promise<boolean>;
    notifyRuins(report: string): Promise<boolean>;
}

export interface SeoOpsStateStore {
    readMain(): Promise<ContentOpsState | null>;
    readRuins(): Promise<ContentOpsState | null>;
    persistMain(state: ContentOpsState): Promise<ContentOpsState>;
    persistRuins(state: ContentOpsState): Promise<ContentOpsState>;
}

export function createSeoAlertNotifier(deps?: {
    sendMain?: (report: string) => Promise<boolean>;
    sendRuins?: (report: string) => Promise<boolean>;
}): SeoAlertNotifier {
    return {
        notifyMain(report: string) {
            return (deps?.sendMain || sendTelegramMessage)(report);
        },
        notifyRuins(report: string) {
            return (deps?.sendRuins || defaultSendRuinsSeoAlert)(report);
        },
    };
}

export function createSeoOpsStateStore(deps?: {
    read?: (key: string) => Promise<ContentOpsState | null>;
    persist?: (key: string, state: ContentOpsState) => Promise<ContentOpsState>;
}): SeoOpsStateStore {
    const read = deps?.read || defaultReadSeoOpsState;
    const persist = deps?.persist || defaultPersistSeoOpsState;

    return {
        readMain() {
            return read(SEO_HEALTH_STATE_KEY);
        },
        readRuins() {
            return read(RUINS_SEO_HEALTH_STATE_KEY);
        },
        persistMain(state: ContentOpsState) {
            return persist(SEO_HEALTH_STATE_KEY, state);
        },
        persistRuins(state: ContentOpsState) {
            return persist(RUINS_SEO_HEALTH_STATE_KEY, state);
        },
    };
}

async function defaultSendRuinsSeoAlert(report: string): Promise<boolean> {
    return sendTelegramMessageToConfiguredChannel(report, {
        tokenKey: 'RUINS_TELEGRAM_BOT_TOKEN',
        chatIdKey: 'RUINS_TELEGRAM_CHAT_ID',
        missingConfigContext: '[Ruins SEO] Telegram notifications',
    });
}

async function defaultReadSeoOpsState(key: string): Promise<ContentOpsState | null> {
    return readOpsState<ContentOpsState>(key);
}

async function defaultPersistSeoOpsState(key: string, state: ContentOpsState): Promise<ContentOpsState> {
    return persistOpsState<ContentOpsState>(key, state);
}

export const defaultSeoAlertNotifier = createSeoAlertNotifier();
export const defaultSeoOpsStateStore = createSeoOpsStateStore();
