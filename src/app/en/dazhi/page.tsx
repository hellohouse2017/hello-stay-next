import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import DazhiPageContent from "@/components/i18n/DazhiPageContent";

const t = getDictionary("en");

export const metadata: Metadata = {
    title: t.dazhi.meta_title,
    description: t.dazhi.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/en/dazhi" },
};

export default function UenDazhiPage() {
    return <DazhiPageContent locale="en" />;
}
