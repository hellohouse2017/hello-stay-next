import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import HomePageContent from "@/components/i18n/HomePageContent";
import { getAlternateLanguageMap } from "@/i18n/config";
import LocaleSeoJsonLd from "@/components/LocaleSeoJsonLd";

const t = getDictionary("vi");

export const metadata: Metadata = {
    title: { absolute: t.home.meta_title },
    description: t.home.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/vi", languages: getAlternateLanguageMap("") },
};

export default function ViHomePage() {
    return <><LocaleSeoJsonLd url="https://www.hello-stay.com/vi" name={t.home.meta_title} description={t.home.meta_desc} locale="vi" kind="WebSite" /><HomePageContent locale="vi" /></>;
}
