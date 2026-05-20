import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import GuidePageContent from "@/components/i18n/GuidePageContent";

const t = getDictionary("vi");

export const metadata: Metadata = {
    title: t.guide.meta_title,
    description: t.guide.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/vi/guide" },
    openGraph: {
        title: t.guide.meta_title,
        description: t.guide.meta_desc,
        url: "https://www.hello-stay.com/vi/guide",
        type: "website",
    },
};

export default function ViGuidePage() {
    return <GuidePageContent locale="vi" />;
}
