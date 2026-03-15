import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

/**
 * /go/[channel] — 各管道短連結轉址
 * 
 * 用法：
 *   hello-stay.com/go/line        → LINE（來源：官網）
 *   hello-stay.com/go/line-fb     → LINE（來源：FB）
 *   hello-stay.com/go/line-ig     → LINE（來源：IG）
 *   hello-stay.com/go/line-threads → LINE（來源：Threads）
 *   hello-stay.com/go/line-google → LINE（來源：Google）
 *   hello-stay.com/go/line-tiktok → LINE（來源：TikTok）
 */

const CHANNEL_MAP: Record<string, string> = {
    'line':         '官網',
    'line-fb':      'FB',
    'line-ig':      'IG',
    'line-threads': 'Threads',
    'line-google':  'Google',
    'line-tiktok':  'TikTok',
    'line-booking': 'Booking',
    'line-tripadvisor': 'TripAdvisor',
};

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ channel: string }> }
) {
    const { channel } = await params;
    const source = CHANNEL_MAP[channel];

    if (!source) {
        // 未知管道 → 直接跳 LINE 加好友頁
        redirect('https://lin.ee/atCiMQw');
    }

    const msg = encodeURIComponent(`我想訂房 #來源${source}`);
    redirect(`https://line.me/R/oaMessage/@hellostay/?${msg}`);
}
