import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import BookingFlow from "@/app/book/BookingFlow";

const t = getDictionary("vi");

export const metadata: Metadata = {
    title: t.book.meta_title,
    description: t.book.meta_desc,
    alternates: { canonical: "https://www.hello-stay.com/vi/book" },
};

export default function ViBookPage() {
    return <BookingFlow />;
}
