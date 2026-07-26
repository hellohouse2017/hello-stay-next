import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import AgreementPageContent, { agreementJa } from "@/components/i18n/AgreementPageContent";
import { getAlternateLanguageMapFor } from "@/i18n/config";

export const metadata: Metadata = {
    title: "ご利用案内・宿泊ルール｜チェックイン時間・キャンセル規定 | Hello Stay",
    description:
        "Hello Stay（高雄・塩埕の貸切宿）のご宿泊規約。チェックイン16:00・チェックアウト11:00、全額前払い制、キャンセル時の1年間充当、禁煙・静粛時間などのルールを日本語でご案内します。",
    alternates: {
        canonical: "https://www.hello-stay.com/ja/agreement",
        languages: getAlternateLanguageMapFor("/agreement", ["zh", "ja", "ko"]),
    },
    openGraph: {
        title: "ご利用案内・宿泊ルール｜Hello Stay 高雄貸切宿",
        description: "チェックイン時間・お支払い・キャンセル・館内ルールを日本語でご案内。",
        url: "https://www.hello-stay.com/ja/agreement",
        locale: "ja_JP",
    },
};

export default function JaAgreementPage() {
    return (
        <>
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: "ご利用案内・宿泊ルール",
                        description: "Hello Stay のチェックイン時間・お支払い・キャンセル・館内ルール（日本語）。",
                        url: "https://www.hello-stay.com/ja/agreement",
                        inLanguage: "ja",
                        isPartOf: { "@type": "WebSite", name: "Hello Stay", url: "https://www.hello-stay.com" },
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        inLanguage: "ja",
                        mainEntity: agreementJa.faqs.map((faq) => ({
                            "@type": "Question",
                            name: faq.q,
                            acceptedAnswer: { "@type": "Answer", text: faq.a },
                        })),
                    },
                ]}
            />
            <AgreementPageContent copy={agreementJa} prefix="/ja" />
        </>
    );
}
