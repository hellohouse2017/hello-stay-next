import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import GodinPageContent from "@/components/i18n/GodinPageContent";
import { getAlternateLanguageMap } from "@/i18n/config";

const t = getDictionary("vi");

export const metadata: Metadata = {
    title: t.godin.meta_title,
    description: t.godin.meta_desc,
    alternates: {
        canonical: "https://www.hello-stay.com/vi/godin",
        languages: getAlternateLanguageMap("/godin"),
    },
};

export default function ViGodinPage() {
    return <GodinPageContent locale="vi" />;
}
