import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import HomePageContent from "@/components/i18n/HomePageContent";
import { getAlternateLanguageMap } from "@/i18n/config";
import LocaleSeoJsonLd from "@/components/LocaleSeoJsonLd";

const t = getDictionary("en");

export const metadata: Metadata = {
    title: { absolute: t.home.meta_title },
    description: t.home.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/en", languages: getAlternateLanguageMap("") },
};

export default function EnHomePage() {
    return <><LocaleSeoJsonLd url="https://www.hello-stay.com/en" name={t.home.meta_title} description={t.home.meta_desc} locale="en" kind="WebSite" /><HomePageContent locale="en" /></>;
}
