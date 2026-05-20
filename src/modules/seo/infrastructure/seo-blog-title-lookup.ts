import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { scheduledArticles } from '@/data/scheduled-articles';

export interface BlogTitleLookup {
    getTitleMap(): Promise<Map<string, string>>;
}

export function createMongoBlogTitleLookup(deps?: {
    connect?: () => Promise<unknown>;
    findTitles?: () => Promise<Array<{ slug: string; title: string }>>;
    onError?: (error: unknown) => void;
}): BlogTitleLookup {
    return {
        async getTitleMap() {
            try {
                await (deps?.connect || defaultConnect)();
                const docs = await (deps?.findTitles || defaultFindBlogTitles)();
                return new Map(docs.map((doc) => [doc.slug, doc.title]));
            } catch (error) {
                (deps?.onError || defaultLogBlogTitleLookupError)(error);
                return new Map();
            }
        },
    };
}

async function defaultConnect(): Promise<void> {}

async function defaultFindBlogTitles(): Promise<Array<{ slug: string; title: string }>> {
    const scheduled = scheduledArticles.map((article) => ({
        slug: article.slug,
        title: article.title,
    }));
    const articlesDirectory = path.join(process.cwd(), 'src/content/articles');
    const published = fs.existsSync(articlesDirectory)
        ? fs.readdirSync(articlesDirectory)
            .filter((file) => file.endsWith('.mdx'))
            .map((file) => {
                const slug = file.replace(/\.mdx$/, '');
                const fileContents = fs.readFileSync(path.join(articlesDirectory, file), 'utf8');
                const { data } = matter(fileContents);
                return {
                    slug,
                    title: typeof data.title === 'string' ? data.title : slug,
                };
            })
        : [];
    return [...scheduled, ...published];
}

function defaultLogBlogTitleLookupError(error: unknown): void {
    console.error('[SEO] Blog title map error:', error instanceof Error ? error.message : error);
}

export const defaultBlogTitleLookup = createMongoBlogTitleLookup();
