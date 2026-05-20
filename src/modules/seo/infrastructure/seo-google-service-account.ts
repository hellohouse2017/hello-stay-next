import { google } from 'googleapis';

export interface GoogleServiceAccountCredentials {
    clientEmail: string;
    privateKey: string;
}

export async function getGoogleServiceAccountCredentials(): Promise<GoogleServiceAccountCredentials | null> {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || '';
    const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY || '';

    if (!clientEmail || !privateKeyRaw) {
        return null;
    }

    return {
        clientEmail,
        privateKey: privateKeyRaw.replace(/\\n/g, '\n'),
    };
}

export async function hasGoogleServiceAccountCredentials(): Promise<boolean> {
    return (await getGoogleServiceAccountCredentials()) !== null;
}

export async function getGoogleServiceAccountAuth(scopes: string | string[]) {
    const credentials = await getGoogleServiceAccountCredentials();
    if (!credentials) {
        return null;
    }

    return new google.auth.GoogleAuth({
        credentials: {
            client_email: credentials.clientEmail,
            private_key: credentials.privateKey,
        },
        scopes,
    });
}
