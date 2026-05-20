import mongoose, { Schema, type Model } from 'mongoose';

export const SEO_HEALTH_STATE_KEY = 'seo_health_status';
export const RUINS_SEO_HEALTH_STATE_KEY = 'ruins_seo_health_status';

export interface ContentOpsState {
    status?: 'healthy' | 'failed';
    lastCheckedAt?: string;
    lastAlertAt?: string;
    healthy?: boolean;
    alertSent?: boolean;
    summary?: Record<string, unknown>;
    message?: string;
}

interface OpsStateDocument {
    key: string;
    value: ContentOpsState;
}

const OpsStateSchema = new Schema<OpsStateDocument>({
    key: { type: String, required: true, unique: true, index: true },
    value: { type: Schema.Types.Mixed, required: true },
});

const OpsStateModel: Model<OpsStateDocument> =
    (mongoose.models.SeoOpsState as Model<OpsStateDocument> | undefined)
    || mongoose.model<OpsStateDocument>('SeoOpsState', OpsStateSchema);

type OpsStateWithAlert = {
    lastAlertAt?: string;
};

export function mergeOpsStateWithAlert<T extends OpsStateWithAlert>(nextState: T, prevState?: Partial<T> | null): T {
    return {
        ...nextState,
        lastAlertAt: nextState.lastAlertAt ?? prevState?.lastAlertAt,
    };
}

export async function readOpsState<T>(key: string): Promise<T | null> {
    const doc = await OpsStateModel.findOne({ key }).lean();
    return ((doc?.value as T | undefined) || null);
}

export async function persistOpsState<T extends OpsStateWithAlert>(key: string, nextState: T): Promise<T> {
    const prevState = await readOpsState<T>(key);
    const mergedState = mergeOpsStateWithAlert(nextState, prevState);

    await OpsStateModel.findOneAndUpdate(
        { key },
        { key, value: mergedState },
        { upsert: true }
    );

    return mergedState;
}
