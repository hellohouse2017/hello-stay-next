type TelegramSendOptions = {
    tokenKey?: string;
    chatIdKey?: string;
    missingConfigContext?: string;
};

const TELEGRAM_SAFE_MESSAGE_LENGTH = 3800;

export function splitTelegramMessage(text: string, maxLength = TELEGRAM_SAFE_MESSAGE_LENGTH): string[] {
    if (text.length <= maxLength) return [text];

    const chunks: string[] = [];
    let current = "";
    for (const line of text.split("\n")) {
        const candidate = current ? `${current}\n${line}` : line;
        if (candidate.length <= maxLength) {
            current = candidate;
            continue;
        }
        if (current) chunks.push(current);
        current = line;
    }
    if (current) chunks.push(current);
    return chunks.length > 0 ? chunks : [text.slice(0, maxLength)];
}

function shouldWarnMissingTelegramConfig(): boolean {
    return process.env.NODE_ENV !== 'test';
}

async function logTelegramApiError(response: Response, context: string): Promise<void> {
    let detail = '';
    try {
        detail = await response.text();
    } catch {
        detail = '(無法讀取 Telegram 回應內容)';
    }
    console.error(`[Telegram] ${context} 失敗: ${response.status} ${response.statusText} ${detail}`);
}

async function sendTelegramMessageViaConfig(
    text: string,
    config: { token: string; chatId: string },
    missingConfigContext: string
): Promise<boolean> {
    const { token, chatId } = config;

    if (!token || !chatId) {
        if (shouldWarnMissingTelegramConfig()) {
            console.warn(`${missingConfigContext} skipped: Missing token or chat ID.`);
        }
        return false;
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const chunks = splitTelegramMessage(text);
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Taipei",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
    }).formatToParts(new Date());
    const reportTimestamp = parts.filter((part) => part.type !== "literal").map((part) => part.value).join("");
    const reportId = `seo-${reportTimestamp}`;
    try {
        for (const [index, chunk] of chunks.entries()) {
            const header = `🆔 ${reportId} · ${index + 1}/${chunks.length}\n`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: header + chunk, parse_mode: 'HTML' }),
            });

            if (!response.ok) {
                await logTelegramApiError(response, 'sendMessage');
                return false;
            }
        }

        return true;
    } catch (error) {
        console.error('Error sending Telegram message:', error);
        return false;
    }
}

export async function sendTelegramMessage(text: string): Promise<boolean> {
    return sendTelegramMessageViaConfig(
        text,
        {
            token: process.env.TELEGRAM_BOT_TOKEN || '',
            chatId: process.env.TELEGRAM_CHAT_ID || '',
        },
        'Telegram notifications'
    );
}

export async function sendTelegramMessageToConfiguredChannel(
    text: string,
    options: TelegramSendOptions
): Promise<boolean> {
    const tokenKey = options.tokenKey || 'TELEGRAM_BOT_TOKEN';
    const chatIdKey = options.chatIdKey || 'TELEGRAM_CHAT_ID';

    return sendTelegramMessageViaConfig(
        text,
        {
            token: process.env[tokenKey] || '',
            chatId: process.env[chatIdKey] || '',
        },
        options.missingConfigContext || 'Telegram notifications'
    );
}
