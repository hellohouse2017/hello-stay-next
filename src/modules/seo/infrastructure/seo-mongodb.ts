import mongoose from 'mongoose';

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
    uri: string | null;
}

declare global {
    var seoMongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.seoMongoose || { conn: null, promise: null, uri: null };

if (!global.seoMongoose) {
    global.seoMongoose = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
    const uri = process.env.MONGODB_URI || '';
    if (!uri) {
        throw new Error('請設定 MONGODB_URI 環境變數');
    }

    if (cached.conn && cached.uri === uri) {
        return cached.conn;
    }

    if (!cached.promise || cached.uri !== uri) {
        cached.promise = mongoose.connect(uri, { bufferCommands: false });
        cached.uri = uri;
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        cached.uri = null;
        throw error;
    }

    return cached.conn;
}

export default connectToDatabase;
