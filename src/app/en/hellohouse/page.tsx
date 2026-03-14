import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import HelloHousePageContent from "@/components/i18n/HelloHousePageContent";

const t = getDictionary("en");

export const metadata: Metadata = {
    title: t.hellohouse.meta_title,
    description: t.hellohouse.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/en/hellohouse" },
};

export default function EnHelloHousePage() {
    return <HelloHousePageContent locale="en" />;
}
