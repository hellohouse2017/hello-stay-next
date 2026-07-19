import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import HomePageContent from "@/components/i18n/HomePageContent";
import { getAlternateLanguageMap } from "@/i18n/config";
import LocaleSeoJsonLd from "@/components/LocaleSeoJsonLd";

const t = getDictionary("ja");

export const metadata: Metadata = {
    title: t.home.meta_title,
    description: t.home.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/ja", languages: getAlternateLanguageMap("") },
};

export default function JaHomePage() {
    return <><LocaleSeoJsonLd url="https://www.hello-stay.com/ja" name={t.home.meta_title} description={t.home.meta_desc} locale="ja" kind="WebSite" /><HomePageContent locale="ja" /></>;
}
