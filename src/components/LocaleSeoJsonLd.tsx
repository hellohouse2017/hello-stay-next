import JsonLd from "@/components/JsonLd";

type LocaleSeoJsonLdProps = {
  url: string;
  name: string;
  description: string;
  locale: string;
  kind?: "WebSite" | "WebPage";
};

export default function LocaleSeoJsonLd({ url, name, description, locale, kind = "WebPage" }: LocaleSeoJsonLdProps) {
  const data = kind === "WebSite"
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

  return <JsonLd data={data} />;
}
