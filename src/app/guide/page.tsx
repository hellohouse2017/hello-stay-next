import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import GuidePageContent from "@/components/i18n/GuidePageContent";
import JsonLd from "@/components/JsonLd";
import { getAlternateLanguageMap } from "@/i18n/config";
import { DEFAULT_SEO_IMAGE } from "@/lib/seo-metadata";

const t = getDictionary("zh");

export const metadata: Metadata = {
    title: t.guide.meta_title,
    description: t.guide.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/guide", languages: getAlternateLanguageMap("/guide") },
    openGraph: {
        title: t.guide.meta_title,
        description: t.guide.meta_desc,
        url: "https://www.hello-stay.com/guide",
        type: "website",
        images: [DEFAULT_SEO_IMAGE],
    },
};

export default function ZhGuidePage() {
    return (
        <>
            <JsonLd data={[
                {
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    name: t.guide.meta_title,
                    description: t.guide.meta_desc,
                    url: "https://www.hello-stay.com/guide",
                    inLanguage: "zh-Hant-TW",
                },
                {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.hello-stay.com" },
                        { "@type": "ListItem", position: 2, name: "住宿指南", item: "https://www.hello-stay.com/guide" },
                    ],
                },
            ]} />
            <GuidePageContent locale="zh" />
        </>
    );
}
