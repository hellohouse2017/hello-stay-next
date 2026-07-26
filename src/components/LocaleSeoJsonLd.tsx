import JsonLd from "@/components/JsonLd";

type LocaleSeoJsonLdProps = {
  url: string;
  name: string;
  description: string;
  locale: string;
  kind?: "WebSite" | "WebPage";
  faq?: { q: string; a: string }[];
};

export default function LocaleSeoJsonLd({ url, name, description, locale, kind = "WebPage", faq }: LocaleSeoJsonLdProps) {
  const base = kind === "WebSite"
    ? {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name,
        description,
        url,
        inLanguage: locale,
        publisher: { "@type": "Organization", name: "Hello Stay", url: "https://www.hello-stay.com" },
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name,
        description,
        url,
        inLanguage: locale,
        isPartOf: { "@type": "WebSite", name: "Hello Stay", url: "https://www.hello-stay.com" },
      };

  const data = faq && faq.length > 0
    ? [
        base,
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: locale,
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ]
    : base;

  return <JsonLd data={data} />;
}
