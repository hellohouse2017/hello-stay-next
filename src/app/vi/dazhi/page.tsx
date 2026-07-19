import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import DazhiPageContent from "@/components/i18n/DazhiPageContent";
import { getAlternateLanguageMap } from "@/i18n/config";
import LocaleSeoJsonLd from "@/components/LocaleSeoJsonLd";

const t = getDictionary("vi");

export const metadata: Metadata = {
    title: t.dazhi.meta_title,
    description: t.dazhi.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/vi/dazhi", languages: getAlternateLanguageMap("/dazhi") },
};

export default function UviDazhiPage() {
    return <><LocaleSeoJsonLd url="https://www.hello-stay.com/vi/dazhi" name={t.dazhi.meta_title} description={t.dazhi.meta_desc} locale="vi" /><DazhiPageContent locale="vi" /></>;
}
