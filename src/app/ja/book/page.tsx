import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import BookingFlow from "@/app/book/BookingFlow";

const t = getDictionary("ja");

export const metadata: Metadata = {
    title: t.book.meta_title,
    description: t.book.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/ja/book" },
};

export default function JaBookPage() {
    return <BookingFlow />;
}
