import mongoose, { type Model, type Schema } from 'mongoose';
import type { ISeoSnapshot } from './seo-ranking';

export interface SeoSnapshotRepository {
    save(date: string, data: Omit<ISeoSnapshot, 'date' | 'createdAt'>): Promise<unknown>;
    get(date: string): Promise<ISeoSnapshot | null>;
}

export function getSeoSnapshotModel(collectionName: string, snapshotSchema: Schema<ISeoSnapshot>): Model<ISeoSnapshot> {
    if (mongoose.models[collectionName]) {
        return mongoose.models[collectionName] as Model<ISeoSnapshot>;
    }

    return mongoose.model<ISeoSnapshot>(collectionName, snapshotSchema, collectionName);
}

export function createMongoSeoSnapshotRepository(options: {
    collectionName: string;
    snapshotSchema: Schema<ISeoSnapshot>;
    getModel?: (collectionName: string, snapshotSchema: Schema<ISeoSnapshot>) => Model<ISeoSnapshot>;
}): SeoSnapshotRepository {
    const getModel = options.getModel || getSeoSnapshotModel;

    return {
        async save(date, data) {
            const model = getModel(options.collectionName, options.snapshotSchema);
            return model.findOneAndUpdate({ date }, { date, ...data }, { upsert: true, new: true });
        },
        async get(date) {
            const model = getModel(options.collectionName, options.snapshotSchema);
            return model.findOne({ date }).lean();
        },
    };
}
