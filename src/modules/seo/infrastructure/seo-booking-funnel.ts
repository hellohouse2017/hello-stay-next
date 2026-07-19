export type BookingFunnelRow = {
    key: string;
    label: string;
    visits: number;
    planDetailOpens: number;
    inquiries: number;
    searchesCompleted: number;
    checkoutSubmits: number;
    ordersCreated: number;
    paymentsSucceeded: number;
    checkoutRate: number;
    orderRate: number;
    paymentRate: number;
};

export type BookingSeoFunnelReport = {
    generatedAt: string;
    since: string;
    windowDays: number;
    attribution: {
        bookingViews: number;
        attributedBookingViews: number;
        coverage: number | null;
    };
    organic: {
        totals: BookingFunnelRow;
        byLandingPath: BookingFunnelRow[];
    };
};

export async function fetchBookingSeoFunnel(days: 7 | 28, fetchImpl: typeof fetch = fetch): Promise<BookingSeoFunnelReport | null> {
    const baseUrl = (process.env.BOOKING_CORE_INTERNAL_URL || 'https://booking.hello-stay.com').replace(/\/$/, '');
    const secret = process.env.SEO_FUNNEL_SHARED_SECRET || '';
    if (!secret) return null;

    const response = await fetchImpl(`${baseUrl}/api/internal/analytics/seo-funnel?days=${days}`, {
        headers: { Authorization: `Bearer ${secret}` },
        cache: 'no-store',
        signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) throw new Error(`Booking SEO funnel ${response.status}: ${await response.text()}`);
    return await response.json() as BookingSeoFunnelReport;
}

function percent(value: number | null): string {
    return value === null ? '樣本不足' : `${(value * 100).toFixed(1)}%`;
}

function renderTotals(label: string, row: BookingFunnelRow): string {
    return `${label}: 進站 ${row.visits} / 搜尋 ${row.searchesCompleted} / Checkout ${row.checkoutSubmits} / 建單 ${row.ordersCreated} / 付款 ${row.paymentsSucceeded}（付款率 ${percent(row.paymentRate)}）`;
}

export function buildBookingSeoFunnelSection(sevenDay: BookingSeoFunnelReport | null, twentyEightDay: BookingSeoFunnelReport | null): string {
    if (!sevenDay && !twentyEightDay) {
        return '\n📉 <b>Organic 訂房漏斗</b>\n──────────────\nℹ️ 尚未設定 Booking funnel 讀取密鑰。\n';
    }

    let report = '\n📉 <b>Organic 訂房漏斗</b>\n──────────────\n';
    if (sevenDay) report += `${renderTotals('近 7 天', sevenDay.organic.totals)}\n`;
    if (twentyEightDay) report += `${renderTotals('近 28 天', twentyEightDay.organic.totals)}\n`;
    const attribution = sevenDay?.attribution || twentyEightDay?.attribution;
    if (attribution) {
        report += `歸因覆蓋: ${attribution.attributedBookingViews}/${attribution.bookingViews} booking views（${percent(attribution.coverage)}）\n`;
    }

    const landingRows = sevenDay?.organic.byLandingPath || twentyEightDay?.organic.byLandingPath || [];
    if (landingRows.length > 0) {
        report += '<b>Organic Landing Path 漏斗</b>\n';
        for (const row of landingRows.slice(0, 5)) {
            report += `• ${row.key}: 進站 ${row.visits} / 搜尋 ${row.searchesCompleted} / Checkout ${row.checkoutSubmits} / 建單 ${row.ordersCreated} / 付款 ${row.paymentsSucceeded}\n`;
        }
    }
    const visits = sevenDay?.organic.totals.visits || 0;
    if (visits < 100) report += `ℹ️ 近 7 天 Organic booking views 少於 100，只報數字、不下成長結論。\n`;
    return report;
}
