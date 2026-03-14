import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import HomePageContent from "@/components/i18n/HomePageContent";

const t = getDictionary("ja");

export const metadata: Metadata = {
    title: t.home.meta_title,
    description: t.home.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/ja" },
};

export default function JaHomePage() {
    return <HomePageContent locale="ja" />;
}
