import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { parkingLots } from "@/data/parking-lots";

export const metadata: Metadata = {
    title: "高雄包棟民宿交通停車指南｜鹽埕埔站・附近停車場｜Hello Stay",
    description: "前往 Hello Stay 高雄包棟民宿的交通與停車指南｜捷運鹽埕埔站步行 5 分鐘、鹽埕區周邊停車場、高鐵左營站轉乘與自駕導航一次看。適合先查路線再預訂包棟。",
    alternates: { canonical: "https://www.hello-stay.com/traffic" },
    openGraph: {
        title: "高雄包棟民宿交通停車指南 | Hello Stay",
        description: "如何前往 Hello Stay，捷運鹽埕埔站、停車場與自駕導航資訊一次看。",
        url: "https://www.hello-stay.com/traffic",
        images: [{ url: "https://www.hello-stay.com/images/cover-bg.webp", width: 1200, height: 630, alt: "Hello Stay 交通指南" }],
    },
};

const properties = [
    {
        name: "你好哇寓所",
        addr: "高雄市鹽埕區大公路 70 巷 8 號",
        mapUrl: "https://goo.gl/maps/qxGN4mpNP8qfRCB16",
        walkNav: "https://www.google.com/maps/dir/?api=1&destination=你好哇寓所&travelmode=walking",
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d920.5!2d120.2823!3d22.6245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5L2g5aW95ZOH5a-T5omA!5e0!3m2!1szh-TW!2stw!4v1",
    },
    {
        name: "溝頂民宿",
        addr: "高雄市鹽埕區大公路 70 巷 6-2 號",
        mapUrl: "https://goo.gl/maps/placeholder",
        walkNav: "https://www.google.com/maps/dir/?api=1&destination=溝頂民宿+高雄&travelmode=walking",
        embedUrl: "",
    },
];

export default function TrafficPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                { "@context": "https://schema.org", "@type": "Place", name: "你好哇寓所", address: { "@type": "PostalAddress", streetAddress: "大公路70巷8號", addressLocality: "鹽埕區", addressRegion: "高雄市", addressCountry: "TW" }, geo: { "@type": "GeoCoordinates", latitude: 22.6245, longitude: 120.2823 }, publicAccess: true },
                { "@context": "https://schema.org", "@type": "Place", name: "溝頂民宿", address: { "@type": "PostalAddress", streetAddress: "大公路70巷6-2號", addressLocality: "鹽埕區", addressRegion: "高雄市", addressCountry: "TW" }, geo: { "@type": "GeoCoordinates", latitude: 22.6244, longitude: 120.2822 }, publicAccess: true },
                { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "怎麼從高鐵到你好哇寓所？", acceptedAnswer: { "@type": "Answer", text: "高鐵左營站 → 捷運紅線至美麗島站 → 轉橘線至鹽埕埔站 (O2) → 4號出口步行 5 分鐘即達。全程約30分鐘。" } }, { "@type": "Question", name: "附近有停車場嗎？", acceptedAnswer: { "@type": "Answer", text: "周邊有6間停車場。大公路路邊晚上8點至早上8點免費，富野路停車場平日$30/小時。" } }, { "@type": "Question", name: "可以搭捷運到嗎？", acceptedAnswer: { "@type": "Answer", text: "可以。捷運橘線鹽埕埔站(O2) 4號出口步行5分鐘即達。" } }] },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>

                {/* Header */}
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "50px" }}>
                        <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px", fontWeight: 600 }}>
                            Getting Here
                        </div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.08em", color: "var(--text)" }}>
                            交通指南與停車
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px auto" }} />
                        <p style={{ fontSize: "0.84rem", color: "#999", lineHeight: 1.9, maxWidth: "520px", margin: "0 auto" }}>
                            想找交通方便的高雄包棟民宿？Hello Stay 位於鹽埕區，捷運鹽埕埔站步行約 5 分鐘，走路也能到鹽埕美食、駁二與大港橋。
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <section style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                        <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>
                            高雄包棟民宿推薦
                        </div>
                        <p style={{ fontSize: "0.84rem", color: "#666", lineHeight: 1.9, marginBottom: "16px" }}>
                            如果你還在挑哪一間適合，可以先看{" "}
                            <Link href="/" style={{ color: "var(--pri)", textDecoration: "underline" }}>
                                高雄包棟民宿推薦 Hello Stay
                            </Link>
                            {" "}首頁，或從{" "}
                            <Link href="/kaohsiung-whole-house" style={{ color: "var(--pri)", textDecoration: "underline" }}>
                                包棟方案整理
                            </Link>
                            {" "}依人數與需求選館別，再回來確認交通與停車。
                        </p>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            <Link href="/" style={{ fontSize: "0.78rem", padding: "8px 14px", borderRadius: "20px", background: "var(--bg)", color: "#3D3830", textDecoration: "none", border: "1px solid #EDE8E3" }}>
                                回首頁看三館
                            </Link>
                            <Link href="/kaohsiung-whole-house" style={{ fontSize: "0.78rem", padding: "8px 14px", borderRadius: "20px", background: "var(--bg)", color: "#3D3830", textDecoration: "none", border: "1px solid #EDE8E3" }}>
                                包棟方案整理
                            </Link>
                            <Link href="/book" style={{ fontSize: "0.78rem", padding: "8px 14px", borderRadius: "20px", background: "#161618", color: "#fff", textDecoration: "none" }}>
                                查詢空房
                            </Link>
                        </div>
                    </section>
                </Reveal>

                {/* Property locations */}
                {properties.map(p => (
                    <Reveal key={p.name}>
                        <section style={{ background: "#fff", borderRadius: "16px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                                <div>
                                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "var(--text)", marginBottom: "4px" }}>{p.name}</h3>
                                    <p style={{ fontSize: "0.82rem", color: "#999" }}>{p.addr}</p>
                                </div>
                                <a href={p.walkNav} target="_blank" rel="noreferrer" style={{
                                    padding: "10px 18px", borderRadius: "8px", background: "#4285F4",
                                    color: "#fff", fontSize: "0.78rem", fontWeight: 500,
                                    display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap",
                                }}>
                                    <i className="fa-solid fa-location-dot" /> 導航
                                </a>
                            </div>
                            {/* Embedded map */}
                            <div style={{ borderRadius: "12px", overflow: "hidden", height: "200px", background: "#eee" }}>
                                <iframe
                                    src={`https://www.google.com/maps?q=${encodeURIComponent(p.addr)}&output=embed`}
                                    width="100%" height="200"
                                    style={{ border: "none" }}
                                    loading="lazy"
                                    title={`${p.name} 地圖`}
                                />
                            </div>
                        </section>
                    </Reveal>
                ))}

                {/* 大眾運輸 */}
                <Reveal>
                    <section style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                        <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "14px", fontWeight: 600 }}>
                            Public Transit
                        </div>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "var(--text)", marginBottom: "20px", fontWeight: 400 }}>大眾運輸指南</h3>

                        <div style={{ display: "grid", gap: "16px" }}>
                            {[
                                { step: "1", icon: "🚄", title: "高鐵 → 左營站", desc: "搭乘高鐵至左營站" },
                                { step: "2", icon: "🚇", title: "捷運紅線 → 美麗島站", desc: "左營站上車，搭至美麗島站" },
                                { step: "3", icon: "🔄", title: "轉乘橘線 → 鹽埕埔站", desc: "美麗島站轉橘線，一站即達鹽埕埔站（O2）" },
                                { step: "4", icon: "🚶", title: "步行 5 分鐘抵達", desc: "從 4 號出口步行約 5 分鐘即可到達" },
                            ].map(s => (
                                <div key={s.step} style={{
                                    display: "flex", gap: "16px", alignItems: "flex-start",
                                    padding: "16px", background: "var(--bg)", borderRadius: "12px",
                                }}>
                                    <div style={{
                                        width: "36px", height: "36px", borderRadius: "50%", background: "var(--pri)",
                                        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                                        fontFamily: "var(--en)", fontSize: "0.75rem", fontWeight: 600, flexShrink: 0,
                                    }}>
                                        {s.step}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.9rem", color: "var(--text)", fontWeight: 500, marginBottom: "2px" }}>
                                            {s.icon} {s.title}
                                        </div>
                                        <div style={{ fontSize: "0.8rem", color: "#999" }}>{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: "center", marginTop: "20px", padding: "14px", background: "var(--bg)", borderRadius: "10px" }}>
                            <p style={{ fontSize: "0.82rem", color: "#888" }}>
                                🚗 自駕導航搜尋「你好哇寓所」即可
                            </p>
                        </div>
                    </section>
                </Reveal>

                {/* 停車場 */}
                <Reveal>
                    <section id="parking" style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "14px", fontWeight: 600 }}>
                            Parking
                        </div>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "var(--text)", marginBottom: "20px", fontWeight: 400 }}>周邊停車場（依距離排序）</h3>

                        <div style={{ display: "grid", gap: "12px" }}>
                            {parkingLots.map((lot, i) => (
                                <a key={i} href={lot.nav} target="_blank" rel="noreferrer" style={{
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    padding: "16px 18px", background: "var(--bg)", borderRadius: "12px",
                                    transition: "all 0.3s", textDecoration: "none",
                                }}>
                                    <div>
                                        <div style={{ fontSize: "0.9rem", color: "#3D3830", fontWeight: 500, marginBottom: "2px" }}>{lot.name}</div>
                                        <div style={{ fontSize: "0.75rem", color: "#BEB5A8" }}>{lot.addr}</div>
                                    </div>
                                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                                        <div style={{ fontSize: "0.82rem", color: "var(--pri)", fontWeight: 500 }}>{lot.price}</div>
                                        <div style={{ fontSize: "0.68rem", color: "#ccc", marginTop: "2px" }}>導航 →</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                </Reveal>

                {/* CTA */}
                <Reveal>
                    <div style={{ textAlign: "center", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/book" style={{
                            padding: "14px 32px", borderRadius: "10px", background: "#161618",
                            color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem",
                            letterSpacing: "0.08em", textDecoration: "none",
                        }}>
                            查詢空房
                        </Link>
                        <Link href="/compare" style={{
                            padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0",
                            color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem",
                            letterSpacing: "0.08em", textDecoration: "none",
                        }}>
                            比較三館差異
                        </Link>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
