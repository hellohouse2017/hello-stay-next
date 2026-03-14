import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import GodinPageContent from "@/components/i18n/GodinPageContent";

const t = getDictionary("ko");

export const metadata: Metadata = {
    title: t.godin.meta_title,
    description: t.godin.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/ko/godin" },
};

export default function KoGodinPage() {
    return <GodinPageContent locale="ko" />;
}
