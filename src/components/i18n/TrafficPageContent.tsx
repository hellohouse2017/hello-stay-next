import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAlternateLinks } from "@/i18n/config";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

const parkingLots = [
    { name: "大公路路邊停車", addr: "大公路與七賢三路周邊", price: "20:00-08:00 FREE", nav: "https://www.google.com/maps/search/?api=1&query=高雄市鹽埕區大公路七賢三路口" },
    { name: "富野路停車場", addr: "富野路 78 號", price: "$30-50/H", nav: "https://maps.google.com/?cid=1856535064860438519" },
    { name: "富野路停車場 (2)", addr: "富野路 27 號", price: "$40-50/H", nav: "https://maps.google.com/?cid=18149634423983651854" },
    { name: "中正四路停車場", addr: "中正四路 274 號", price: "Indoor", nav: "https://maps.google.com/?cid=2933515461281075928" },
    { name: "富野路停車場 (3)", addr: "富野路 170 號", price: "06:00-22:00", nav: "https://maps.google.com/?cid=14869428468779387843" },
    { name: "大仁路停車場", addr: "大仁路 10 號", price: "Multi-level", nav: "https://maps.google.com/?cid=4456456276069017907" },
];

const properties = [
    { name: "你好哇寓所 / Hello House", addr: "高雄市鹽埕區大公路 70 巷 8 號", walkNav: "https://www.google.com/maps/dir/?api=1&destination=你好哇寓所&travelmode=walking" },
    { name: "溝頂民宿 / Godin House", addr: "高雄市鹽埕區大公路 70 巷 6-2 號", walkNav: "https://www.google.com/maps/dir/?api=1&destination=溝頂民宿+高雄&travelmode=walking" },
];

export default function TrafficPageContent({ locale }: { locale: Locale }) {
    const t = getDictionary(locale);
    const prefix = locale === "zh" ? "" : `/${locale}`;
    const steps = [
        { step: "1", icon: "🚄", title: t.traffic.step1_title, desc: t.traffic.step1_desc },
        { step: "2", icon: "🚇", title: t.traffic.step2_title, desc: t.traffic.step2_desc },
        { step: "3", icon: "🔄", title: t.traffic.step3_title, desc: t.traffic.step3_desc },
        { step: "4", icon: "🚶", title: t.traffic.step4_title, desc: t.traffic.step4_desc },
    ];

    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "#FAF8F5", minHeight: "100vh" }}>
            {getAlternateLinks("/traffic").map((link) => (
                <link key={link.hreflang} rel="alternate" hrefLang={link.hreflang} href={link.href} />
            ))}
            <JsonLd data={[
                { "@context": "https://schema.org", "@type": "Place", name: "Hello House", address: { "@type": "PostalAddress", streetAddress: "大公路70巷8號", addressLocality: "鹽埕區", addressRegion: "Kaohsiung", addressCountry: "TW" }, geo: { "@type": "GeoCoordinates", latitude: 22.6245, longitude: 120.2823 } },
                { "@context": "https://schema.org", "@type": "Place", name: "Godin House", address: { "@type": "PostalAddress", streetAddress: "大公路70巷6-2號", addressLocality: "鹽埕區", addressRegion: "Kaohsiung", addressCountry: "TW" }, geo: { "@type": "GeoCoordinates", latitude: 22.6244, longitude: 120.2822 } },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "50px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "12px" }}>{t.traffic.label}</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>{t.traffic.title}</h1>
                        <div style={{ width: "40px", height: "1px", background: "#C8AD7F", margin: "20px auto" }} />
                    </div>
                </Reveal>

                {properties.map(p => (
                    <Reveal key={p.name}>
                        <section style={{ background: "#fff", borderRadius: "16px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                                <div>
                                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "4px" }}>{p.name}</h3>
                                    <p style={{ fontSize: "0.82rem", color: "#999" }}>{p.addr}</p>
                                </div>
                                <a href={p.walkNav} target="_blank" rel="noreferrer" style={{ padding: "10px 18px", borderRadius: "8px", background: "#4285F4", color: "#fff", fontSize: "0.78rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
                                    <i className="fa-solid fa-location-dot" /> {t.traffic.nav_btn}
                                </a>
                            </div>
                            <div style={{ borderRadius: "12px", overflow: "hidden", height: "200px", background: "#eee" }}>
                                <iframe src={`https://www.google.com/maps?q=${encodeURIComponent(p.addr)}&output=embed`} width="100%" height="200" style={{ border: "none" }} loading="lazy" title={`${p.name} map`} />
                            </div>
                        </section>
                    </Reveal>
                ))}

                <Reveal>
                    <section style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#BEB5A8", marginBottom: "14px" }}>Public Transit</div>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "20px" }}>{t.traffic.transit_title}</h3>
                        <div style={{ display: "grid", gap: "16px" }}>
                            {steps.map(s => (
                                <div key={s.step} style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "16px", background: "#FAF8F5", borderRadius: "12px" }}>
                                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#C8AD7F", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--en)", fontSize: "0.75rem", fontWeight: 600, flexShrink: 0 }}>{s.step}</div>
                                    <div>
                                        <div style={{ fontSize: "0.9rem", color: "#3D3830", fontWeight: 500, marginBottom: "2px" }}>{s.icon} {s.title}</div>
                                        <div style={{ fontSize: "0.8rem", color: "#999" }}>{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: "center", marginTop: "20px", padding: "14px", background: "#FAF8F5", borderRadius: "10px" }}>
                            <p style={{ fontSize: "0.82rem", color: "#888" }}>{t.traffic.driving_tip}</p>
                        </div>
                    </section>
                </Reveal>

                <Reveal>
                    <section style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#BEB5A8", marginBottom: "14px" }}>Parking</div>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "20px" }}>{t.traffic.parking_title}</h3>
                        <div style={{ display: "grid", gap: "12px" }}>
                            {parkingLots.map((lot, i) => (
                                <a key={i} href={lot.nav} target="_blank" rel="noreferrer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", background: "#FAF8F5", borderRadius: "12px", transition: "all 0.3s", textDecoration: "none" }}>
                                    <div>
                                        <div style={{ fontSize: "0.9rem", color: "#3D3830", fontWeight: 500, marginBottom: "2px" }}>{lot.name}</div>
                                        <div style={{ fontSize: "0.75rem", color: "#BEB5A8" }}>{lot.addr}</div>
                                    </div>
                                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                                        <div style={{ fontSize: "0.82rem", color: "#C8AD7F", fontWeight: 500 }}>{lot.price}</div>
                                        <div style={{ fontSize: "0.68rem", color: "#ccc", marginTop: "2px" }}>{t.traffic.nav_arrow}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                </Reveal>

                <Reveal>
                    <div style={{ textAlign: "center" }}>
                        <Link href={`${prefix}/book`} style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>{t.traffic.cta_btn}</Link>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
