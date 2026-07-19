import {
    buildGscDailyPerformanceReport,
    buildRankingReport,
    buildTrendRankingReport,
    fetchGscDailyPerformance,
    findLatestGSCDate,
    type GscDailyPerformance,
    type ISeoSnapshot,
    type SeoTrendReport,
} from '@/modules/seo/infrastructure/seo-ranking';

export type SeoRankingData = {
    date: string;
    totalClicks: number;
    totalImpressions: number;
    avgPosition: number;
    avgCtr: number;
    topQueries: ISeoSnapshot['topQueries'];
    targetKeywords: ISeoSnapshot['targetKeywords'];
    topPages: ISeoSnapshot['topPages'];
    trendReport: SeoTrendReport;
};

type RankingSnapshotFetcher = (date: string) => Promise<ISeoSnapshot | null>;
type RankingSnapshotSaver = (date: string, data: Omit<ISeoSnapshot, 'date' | 'createdAt'>) => Promise<unknown>;

export type BuildSeoRankingSectionOptions<TRankingData extends Omit<ISeoSnapshot, 'date' | 'createdAt'>> = {
    pageFilter?: string;
    fetchData: (targetDate: string) => Promise<TRankingData | null>;
    saveSnapshot: RankingSnapshotSaver;
    getSnapshot: RankingSnapshotFetcher;
    errorPrefix: string;
    connect?: () => Promise<unknown>;
    findLatestDate?: typeof findLatestGSCDate;
};

export type BuildSeoRankingSectionResult<TRankingData extends Omit<ISeoSnapshot, 'date' | 'createdAt'>> = {
    report: string;
    rankingData: (TRankingData & { date: string }) | null;
    rankingError: string | null;
};

export type BuildSeoDailyPerformanceSectionResult = {
    report: string;
    dataDate: string | null;
    performance: GscDailyPerformance | null;
    rankingError: string | null;
};

function hasTrendReport(data: Omit<ISeoSnapshot, 'date' | 'createdAt'>): data is SeoRankingData {
    return 'trendReport' in data;
}

export function getDaysAgoDateString(daysAgo: number): string {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
}

export async function buildSeoRankingSection<TRankingData extends Omit<ISeoSnapshot, 'date' | 'createdAt'>>(options: BuildSeoRankingSectionOptions<TRankingData>): Promise<BuildSeoRankingSectionResult<TRankingData>> {
    const { pageFilter, fetchData, saveSnapshot, getSnapshot, errorPrefix } = options;
    const connect = options.connect || (async () => undefined);
    const findLatestDate = options.findLatestDate || findLatestGSCDate;

    let report = '';
    let rankingData: (TRankingData & { date: string }) | null = null;
    let rankingError: string | null = null;

    try {
        await connect();

        const latestDate = await findLatestDate(pageFilter);
        if (!latestDate) {
            report += `\n⚠️ GSC 最近 7 天都沒有數據\n`;
            rankingError = 'No GSC data available in last 7 days';
            return { report, rankingData, rankingError };
        }

        const dataDate = latestDate.date;
        if (latestDate.daysAgo > 3) {
            report += `\n⚠️ GSC 數據延遲中，目前最新為 ${latestDate.daysAgo} 天前 (${dataDate})\n`;
        }

        const gscData = await fetchData(dataDate);
        if (!gscData) {
            report += `\n⚠️ GSC 數據暫時無法取得\n`;
            rankingError = 'fetchGSCData returned null';
            return { report, rankingData, rankingError };
        }

        await saveSnapshot(dataDate, gscData);

        const yesterdayDate = getDaysAgoDateString(latestDate.daysAgo + 1);
        const lastWeekDate = getDaysAgoDateString(latestDate.daysAgo + 7);
        const [yesterday, lastWeek] = await Promise.all([
            getSnapshot(yesterdayDate),
            getSnapshot(lastWeekDate),
        ]);

        const todaySnapshot: ISeoSnapshot = {
            date: dataDate,
            totalClicks: gscData.totalClicks,
            totalImpressions: gscData.totalImpressions,
            avgPosition: gscData.avgPosition,
            avgCtr: gscData.avgCtr,
            topQueries: gscData.topQueries,
            targetKeywords: gscData.targetKeywords,
            topPages: gscData.topPages,
            createdAt: new Date(),
        };
        report += hasTrendReport(gscData)
            ? buildTrendRankingReport(dataDate, gscData)
            : buildRankingReport(todaySnapshot, yesterday, lastWeek);
        rankingData = { date: dataDate, ...gscData };
    } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        console.error(`${errorPrefix} Ranking data error:`, msg);
        report += `\n⚠️ 排名數據錯誤: ${msg}\n`;
        rankingError = msg;
    }

    return { report, rankingData, rankingError };
}

export async function buildSeoDailyPerformanceSection(options: {
    pageFilter?: string;
    connect?: () => Promise<unknown>;
    findLatestDate?: typeof findLatestGSCDate;
    fetchData?: typeof fetchGscDailyPerformance;
    errorPrefix: string;
}): Promise<BuildSeoDailyPerformanceSectionResult> {
    const connect = options.connect || (async () => undefined);
    const findLatestDate = options.findLatestDate || findLatestGSCDate;
    const fetchData = options.fetchData || fetchGscDailyPerformance;

    try {
        await connect();
        const latestDate = await findLatestDate(options.pageFilter);
        if (!latestDate) {
            return {
                report: '\n⚠️ GSC 最近 7 天都沒有數據\n',
                dataDate: null,
                performance: null,
                rankingError: 'No GSC data available in last 7 days',
            };
        }

        let report = latestDate.daysAgo > 3
            ? `\n⚠️ GSC 數據延遲中，目前最新為 ${latestDate.daysAgo} 天前 (${latestDate.date})\n`
            : '';
        const performance = await fetchData(latestDate.date, { pageFilter: options.pageFilter });
        if (!performance) {
            return {
                report: `${report}\n⚠️ GSC 數據暫時無法取得\n`,
                dataDate: latestDate.date,
                performance: null,
                rankingError: 'fetchGscDailyPerformance returned null',
            };
        }

        report += buildGscDailyPerformanceReport(latestDate.date, performance);
        return { report, dataDate: latestDate.date, performance, rankingError: null };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`${options.errorPrefix} Daily search performance error:`, message);
        return {
            report: `\n⚠️ GSC 成效數據錯誤: ${message}\n`,
            dataDate: null,
            performance: null,
            rankingError: message,
        };
    }
}
