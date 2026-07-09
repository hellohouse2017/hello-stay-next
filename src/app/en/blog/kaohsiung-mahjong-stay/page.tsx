import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";

const CANONICAL = "https://www.hello-stay.com/en/blog/kaohsiung-mahjong-stay";
const ZH_CANONICAL = "https://www.hello-stay.com/blog/kaohsiung-mahjong-stay";

export const metadata: Metadata = {
    title: "Kaohsiung Private Villa with Mahjong Table | Play All Night",
    description: "Looking for a Kaohsiung private villa with a mahjong table? Hello House and Godin House both have a manual mahjong table in the lounge, open until late, with a kitchen for late-night snacks. For 4-26 guests in Yancheng.",
    alternates: {
        canonical: CANONICAL,
        languages: { "zh-Hant": ZH_CANONICAL, en: CANONICAL, "x-default": ZH_CANONICAL },
    },
    openGraph: {
        title: "Kaohsiung Private Villa with Mahjong Table | Play All Night",
        description: "Manual mahjong table in the lounge, open until late, plus a kitchen for late-night snacks. For 4-26 guests in Yancheng, Kaohsiung.",
        url: CANONICAL,
        type: "article",
    },
};

const sections = [
    {
        id: "why", title: "Why Play Mahjong at a Private Villa", content: `A public mahjong parlor just doesn't have the same atmosphere. Playing at your own private villa is the better call:

• Manual mahjong — traditional hand-shuffled tiles, more conversation while you shuffle
• No closing time — play as late as you want, unlike a parlor with fixed hours
• Sleep right upstairs — no need to drive home when you're tired
• Snacks on demand — the kitchen is right there for late-night bites, drinks included
• Full privacy — the whole villa is yours, win or lose without an audience` },
    {
        id: "setup", title: "Mahjong Setup at Hello House", content: `Mahjong table
• Type: traditional manual mahjong (hand-shuffled)
• Location: 4F lounge (Hello House) / 4F (Godin House)
• Tabletop: felt-covered, great tile feel
• Size: standard, comfortable for long sessions

Around the table
• 4 comfortable armchairs (no back pain from long sessions)
• A side table for drinks and snacks
• Independent air conditioning (stay cool even in summer)
• Bright lighting (no misreading tiles)

Extras
• Playing cards, UNO, and board games also available
• 43" smart TV with Netflix for anyone waiting their turn` },
    {
        id: "food", title: "Late-Night Snack Guide for Mahjong Nights", content: `Delivery to the villa
📞 A-Luo-Ha braised snacks (4 min walk, best picked up in person)
📞 Fried chicken (right around the corner)
📞 Da-Kou-Pang grilled sandwich (if you're playing until morning 😂)

Cook it yourself in the kitchen
🍲 Hot pot — buy ingredients at PX Mart, cook while you play
🍜 Instant noodles — add an egg and extra toppings, a late-night classic
🥤 Drinks — beer and soft drinks from PX Mart (the ice maker keeps things cold)

A few reminders
• Be careful not to spill food on the tiles
• Keep drinks on the side table, not directly on the mahjong surface` },
    {
        id: "rules", title: "House Rules for Mahjong Nights", content: `✅ You're welcome to
• Play until the early hours — the room is well soundproofed for mahjong
• Bring your own tile rack or scoring app


⚠️ Please note
• Keep the volume down after 23:00 (those winning shouts can get loud 😆)
• Don't slam the table too hard — please take care of the manual mahjong set
• Stack the tiles and push the chairs back in when you're done

💰 Damage policy
• Abnormal damage to the mahjong set is charged at replacement cost
• Normal wear and tear is not charged` },
];

export default function EnMahjongPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <link rel="alternate" hrefLang="zh-Hant" href={ZH_CANONICAL} />
            <link rel="alternate" hrefLang="en" href={CANONICAL} />
            <link rel="alternate" hrefLang="x-default" href={ZH_CANONICAL} />
            <JsonLd data={[
                { "@context": "https://schema.org", "@type": "Article", headline: "Kaohsiung Private Villa with Mahjong Table", author: { "@type": "Organization", name: "Hello Stay" }, publisher: { "@type": "Organization", name: "Hello Stay" }, datePublished: "2026-03-06", inLanguage: "en", mainEntityOfPage: CANONICAL, speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#why", "#setup"] } },
                {
                    "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
                        { "@type": "Question", name: "Which Kaohsiung private villas have a mahjong table?", acceptedAnswer: { "@type": "Answer", text: "Both Hello House and Godin House have a manual mahjong table in the 4F lounge, with independent air conditioning and lighting. You can play until the early hours, then head upstairs to sleep. Nearby options for late-night snacks include braised food and fried chicken stalls, and the kitchen is available for hot pot too. For 6-26 guests." } },
                        { "@type": "Question", name: "How late can we play mahjong at a Kaohsiung private villa?", acceptedAnswer: { "@type": "Answer", text: "There's no fixed cut-off time — you can play into the early hours. Just keep the volume down after 23:00, since the winning calls tend to get loud. The mahjong itself isn't very noisy; it's mainly about keeping voices down." } },
                    ]
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "Travel Guide", href: "/en/guide" }, { name: "Mahjong Villa", href: "/en/blog/kaohsiung-mahjong-stay" }]} />
                <Reveal>
                    <div style={{ marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--pri)", marginBottom: "12px" }}>2026-03-06</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.6 }}>
                            Kaohsiung Private Villa with Mahjong<br />Play All Night, No Rush
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px 0" }} />
                    </div>
                </Reveal>
                {sections.map(s => (
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
