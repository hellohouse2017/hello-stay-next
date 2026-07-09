import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";

const CANONICAL_EN = "https://www.hello-stay.com/en/blog/pier2-accommodation";
const CANONICAL_ZH = "https://www.hello-stay.com/blog/pier2-accommodation";

export const metadata: Metadata = {
    title: "Pier-2 Art Center Accommodation | Walk 10 Min from Yancheng Villas",
    description: "Looking for a stay near Pier-2 Art Center in Kaohsiung? Hello Stay's private villas in Yancheng District are a 10-minute walk from Pier-2 and 8 minutes from Dagang Bridge — more convenient than Cijin, with better food nearby.",
    alternates: {
        canonical: CANONICAL_EN,
        languages: { "zh-Hant": CANONICAL_ZH, en: CANONICAL_EN, "x-default": CANONICAL_ZH },
    },
    openGraph: {
        title: "Pier-2 Art Center Accommodation | Walk 10 Min from Yancheng Villas",
        description: "A 10-minute walk from Pier-2 Art Center, 8 minutes from Dagang Bridge. Private villas in Kaohsiung's Yancheng District.",
        url: CANONICAL_EN,
        type: "article",
    },
};

const sections = [
    {
        id: "location",
        title: "Why stay in Yancheng instead of right next to Pier-2?",
        content: `Pier-2 Art Center itself has no lodging — it's a converted warehouse district. The nearby accommodation options break down like this:

Yancheng District (most recommended ⭐)
• 10-minute walk to the Pier-2 Dayi Warehouse cluster
• 8-minute walk to Dagang Bridge
• 15-minute walk to Zanzibar (Pier-2 Warehouse No. 2)
• The district itself is a food destination
• 5-minute walk to Yanchengpu MRT Station

Qianzhen District (near the Kaohsiung Music Center)
• Fewer lodging options, mostly hotels
• Farther from the Pier-2 core area

Cijin
• 20+ minute walk to Pier-2
• Fewer dining options, quieter at night

Bottom line: staying in Yancheng puts you inside the walking radius for Pier-2, food, and the MRT — all at once.`,
    },
    {
        id: "spots",
        title: "Must-see spots around Pier-2 (all walkable)",
        content: `Within a 5-minute walk
☑ Dagoding traditional market — a local daily-life spot, slowly getting a hip makeover

Within a 10-minute walk
☑ Pier-2 Dayi Warehouse cluster — murals, indie shops, VR experiences
☑ Dagang Bridge — Taiwan's first horizontally rotating bridge, opens on the hour

Within a 15-minute walk
☑ Zanzibar (Pier-2 Warehouse No. 2) — the white carousel, harborside restaurants
☑ Hamasen Railway Cultural Park — mini trains, railway heritage

Within a 20-minute walk
☑ Kaohsiung Music Center — the hexagonal building cluster
☑ Love River — riverside walks, evening gondola rides

One MRT stop away
☑ Cihou — the former British Consulate at Takao, sunset views
☑ Qijin Ferry — seafood, the lighthouse, the rainbow church`,
    },
    {
        id: "stay",
        title: "Recommended stays within walking distance of Pier-2",
        content: `Hello House ⭐ Top choice
📍 No. 8, Ln. 70, Dagong Rd. (10-minute walk to Pier-2)
👥 Private rental for 6–26 guests
🏷 Full kitchen, mahjong table, board games
📊 Google rating 4.5 stars / 75 reviews
💰 From NT$12,000 on weekdays

Godin House
📍 No. 6-2, Ln. 70, Dagong Rd. (10-minute walk to Pier-2)
👥 Standalone building for 4–12 guests
🏷 Five floors, family-style layout
✨ Best for family trips and small groups
💰 From about NT$8,000 on weekdays

Booking both properties together can host up to 38 guests — ideal for large groups.`,
    },
    {
        id: "tips",
        title: "Tips for visiting Pier-2",
        content: `Best time to visit
• Weekdays are quieter, no waiting for photos
• Weekend markets and pop-up events
• Golden hour light is best around 16:00–18:00

Admission
• The Pier-2 warehouse cluster is free to enter
• VR experiences are ticketed separately
• Dagang Bridge is free (rotates on the hour daily)

Dining tips
• In-district restaurants tend to run pricier — walking back to Yancheng gets you better value
• Or cook in your villa's kitchen — cheaper and more fun as a group

Getting there
• MRT Orange Line, Yanchengpu Station (O2), Exit 2
• Light Rail: Pier-2 Dayi Station, Pier-2 Pengluan Station`,
    },
];

export default function EnPier2Page() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <link rel="alternate" hrefLang="zh-Hant" href={CANONICAL_ZH} />
            <link rel="alternate" hrefLang="en" href={CANONICAL_EN} />
            <link rel="alternate" hrefLang="x-default" href={CANONICAL_ZH} />

            <JsonLd data={[
                {
                    "@context": "https://schema.org", "@type": "Article",
                    headline: "Pier-2 Art Center Accommodation | Walk 10 Min from Yancheng Villas",
                    description: "A 10-minute walk from Pier-2 Art Center, 8 minutes from Dagang Bridge. Private villas in Kaohsiung's Yancheng District.",
                    author: { "@type": "Organization", name: "Hello Stay", url: "https://www.hello-stay.com" },
                    publisher: { "@type": "Organization", name: "Hello Stay", url: "https://www.hello-stay.com" },
                    datePublished: "2026-03-06", dateModified: "2026-05-11",
                    inLanguage: "en",
                    mainEntityOfPage: CANONICAL_EN,
                    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#location", "#stay"] },
                },
                {
                    "@context": "https://schema.org", "@type": "FAQPage",
                    mainEntity: [
                        {
                            "@type": "Question",
                            name: "Is there recommended lodging near Pier-2 Art Center?",
                            acceptedAnswer: { "@type": "Answer", text: "We recommend staying in Yancheng District, a 10-minute walk from Pier-2. Hello House, for example, is a private rental for 6-26 guests with a 4.5-star Google rating. Yancheng itself is a food destination, making it more convenient and offering more variety than staying right next to Pier-2." },
                        },
                        {
                            "@type": "Question",
                            name: "Does Pier-2 Art Center require an admission ticket?",
                            acceptedAnswer: { "@type": "Answer", text: "The Pier-2 warehouse cluster is free to enter. Dagang Bridge is also free and rotates on the hour daily. Some exhibitions and VR experiences are ticketed separately. Weekdays are less crowded, and golden hour (16:00-18:00) offers the best light for photos." },
                        },
                    ],
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "Travel Guide", href: "/en/guide" }, { name: "Pier-2 Accommodation", href: "/en/blog/pier2-accommodation" }]} />
                <Reveal>
                    <div style={{ marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--pri)", marginBottom: "12px" }}>2026-03-06</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.5 }}>
                            Pier-2 Art Center Accommodation<br />A 10-Minute Walk from Yancheng
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px 0" }} />
                    </div>
                </Reveal>
                {sections.map((s) => (
                    <Reveal key={s.id}>
                        <section id={s.id} style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>{s.title}</h2>
                            <div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2.2, whiteSpace: "pre-line" }}>{s.content}</div>
                        </section>
                    </Reveal>
                ))}
                <Reveal>
                    <div style={{ textAlign: "center", marginTop: "20px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/en/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>Check Availability</Link>
                        <Link href="/en/guide" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>More Guides</Link>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
