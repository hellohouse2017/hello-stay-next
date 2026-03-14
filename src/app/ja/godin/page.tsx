import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import GodinPageContent from "@/components/i18n/GodinPageContent";

const t = getDictionary("ja");

export const metadata: Metadata = {
    title: t.godin.meta_title,
    description: t.godin.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/ja/godin" },
};

export default function JaGodinPage() {
    return <GodinPageContent locale="ja" />;
}
