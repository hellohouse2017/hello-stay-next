import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import GuidePageContent from "@/components/i18n/GuidePageContent";
import { getAlternateLanguageMap } from "@/i18n/config";

const t = getDictionary("en");

export const metadata: Metadata = {
    title: t.guide.meta_title,
    description: t.guide.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/en/guide", languages: getAlternateLanguageMap("/guide") },
    openGraph: {
        title: t.guide.meta_title,
        description: t.guide.meta_desc,
        url: "https://www.hello-stay.com/en/guide",
        type: "website",
    },
};

export default function EnGuidePage() {
    return <GuidePageContent locale="en" />;
}
