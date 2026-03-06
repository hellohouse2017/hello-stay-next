/* Breadcrumb navigation + BreadcrumbList JSON-LD */
import Link from "next/link";
import JsonLd from "./JsonLd";

interface BreadcrumbItem {
    name: string;
    href: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
    const allItems = [{ name: "首頁", href: "/" }, ...items];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: allItems.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: `https://www.hello-stay.com${item.href}`,
        })),
    };

    return (
        <>
            <JsonLd data={jsonLd} />
            <nav aria-label="breadcrumb" style={{
                padding: "12px 0", fontSize: "0.72rem", color: "#BEB5A8",
                fontFamily: "var(--en)", letterSpacing: "0.05em",
            }}>
                {allItems.map((item, i) => (
                    <span key={item.href}>
                        {i > 0 && <span style={{ margin: "0 8px", opacity: 0.4 }}>/</span>}
                        {i === allItems.length - 1 ? (
                            <span style={{ color: "#8A8279" }}>{item.name}</span>
                        ) : (
                            <Link href={item.href} style={{ color: "#BEB5A8" }}>{item.name}</Link>
                        )}
                    </span>
                ))}
            </nav>
        </>
    );
}
