import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import BookingFlow from "@/app/book/BookingFlow";
import { getAlternateLanguageMap } from "@/i18n/config";
import LocaleSeoJsonLd from "@/components/LocaleSeoJsonLd";

const t = getDictionary("ko");

export const metadata: Metadata = {
    title: t.book.meta_title,
    description: t.book.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/ko/book", languages: getAlternateLanguageMap("/book") },
};

export default function KoBookPage() {
    return <><LocaleSeoJsonLd url="https://www.hello-stay.com/ko/book" name={t.book.meta_title} description={t.book.meta_desc} locale="ko" /><BookingFlow /></>;
}
