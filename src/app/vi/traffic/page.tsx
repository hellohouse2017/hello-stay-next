import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import TrafficPageContent from "@/components/i18n/TrafficPageContent";
import { getAlternateLanguageMap } from "@/i18n/config";

const t = getDictionary("vi");

export const metadata: Metadata = {
    title: t.traffic.meta_title,
    description: t.traffic.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/vi/traffic", languages: getAlternateLanguageMap("/traffic") },
};

export default function ViTrafficPage() {
    return <TrafficPageContent locale="vi" />;
}
