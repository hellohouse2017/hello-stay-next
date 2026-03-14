import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import TrafficPageContent from "@/components/i18n/TrafficPageContent";

const t = getDictionary("ko");

export const metadata: Metadata = {
    title: t.traffic.meta_title,
    description: t.traffic.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/ko/traffic" },
};

export default function KoTrafficPage() {
    return <TrafficPageContent locale="ko" />;
}
