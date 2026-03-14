import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import DazhiPageContent from "@/components/i18n/DazhiPageContent";

const t = getDictionary("vi");

export const metadata: Metadata = {
    title: t.dazhi.meta_title,
    description: t.dazhi.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/vi/dazhi" },
};

export default function UviDazhiPage() {
    return <DazhiPageContent locale="vi" />;
}
