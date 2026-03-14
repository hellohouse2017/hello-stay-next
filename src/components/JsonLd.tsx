/* JSON-LD structured data component — renders schema.org markup as a script tag */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
        />
    );
}
