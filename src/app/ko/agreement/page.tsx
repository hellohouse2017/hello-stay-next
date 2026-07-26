import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import AgreementPageContent, { agreementKo } from "@/components/i18n/AgreementPageContent";
import { getAlternateLanguageMapFor } from "@/i18n/config";

export const metadata: Metadata = {
    title: "이용 안내 · 숙박 규정｜체크인 시간 · 취소 규정 | Hello Stay",
    description:
        "Hello Stay(가오슝 옌청 독채 숙소)의 숙박 규정. 체크인 16:00 · 체크아웃 11:00, 전액 선결제, 취소 시 1년간 다음 숙박 사용, 금연 · 정숙 시간 등 규정을 한국어로 안내합니다.",
    alternates: {
        canonical: "https://www.hello-stay.com/ko/agreement",
        languages: getAlternateLanguageMapFor("/agreement", ["zh", "ja", "ko"]),
    },
    openGraph: {
        title: "이용 안내 · 숙박 규정｜Hello Stay 가오슝 독채 숙소",
        description: "체크인 시간 · 결제 · 취소 · 숙소 규정을 한국어로 안내합니다.",
        url: "https://www.hello-stay.com/ko/agreement",
        locale: "ko_KR",
    },
};

export default function KoAgreementPage() {
    return (
        <>
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: "이용 안내 · 숙박 규정",
                        description: "Hello Stay의 체크인 시간 · 결제 · 취소 · 숙소 규정(한국어).",
                        url: "https://www.hello-stay.com/ko/agreement",
                        inLanguage: "ko",
                        isPartOf: { "@type": "WebSite", name: "Hello Stay", url: "https://www.hello-stay.com" },
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        inLanguage: "ko",
                        mainEntity: agreementKo.faqs.map((faq) => ({
                            "@type": "Question",
                            name: faq.q,
                            acceptedAnswer: { "@type": "Answer", text: faq.a },
                        })),
                    },
                ]}
            />
            <AgreementPageContent copy={agreementKo} prefix="/ko" />
        </>
    );
}
