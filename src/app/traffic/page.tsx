import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "交通指南與停車資訊 | 你好哇寓所 & 溝頂民宿",
    description: "前往你好哇寓所及溝頂民宿的完整交通指南｜開車導航、周邊停車場位置與收費、高雄捷運鹽埕埔站步行路線。高鐵左營站轉乘方式、機場接駁建議，讓您輕鬆抵達鹽埕區包棟民宿。",
    alternates: { canonical: "https://www.hello-stay.com/traffic" },
    openGraph: {
        title: "交通指南與停車資訊 | Hello Stay",
        description: "如何前往你好哇寓所、溝頂民宿，鄰近停車場與捷運資訊。",
        url: "https://www.hello-stay.com/traffic",
        images: [{ url: "https://www.hello-stay.com/images/cover-bg.webp", width: 1200, height: 630, alt: "Hello Stay 交通指南" }],
    },
};

const parkingLots = [
    { name: "大公路路邊停車", addr: "大公路與七賢三路周邊", price: "20:00-08:00 免費", nav: "https://www.google.com/maps/search/?api=1&query=高雄市鹽埕區大公路七賢三路口" },
    { name: "富野路停車場", addr: "富野路 78 號", price: "平日 $30/H・假日 $50/H", nav: "https://maps.google.com/?cid=1856535064860438519" },
    { name: "富野路停車場 (二)", addr: "富野路 27 號", price: "平日 $40/H・假日 $50/H", nav: "https://maps.google.com/?cid=18149634423983651854" },
    { name: "中正四路停車場", addr: "中正四路 274 號", price: "室內平面・免曬太陽", nav: "https://maps.google.com/?cid=2933515461281075928" },
    { name: "富野路停車場 (三)", addr: "富野路 170 號", price: "06:00-22:00（非24H）", nav: "https://maps.google.com/?cid=14869428468779387843" },
    { name: "大仁路停車場", addr: "大仁路 10 號", price: "室內多層停車場", nav: "https://maps.google.com/?cid=4456456276069017907" },
];

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
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "#FAF8F5", minHeight: "100vh" }}>
            <JsonLd data={[
                { "@context": "https://schema.org", "@type": "Place", name: "你好哇寓所", address: { "@type": "PostalAddress", streetAddress: "大公路70巷8號", addressLocality: "鹽埕區", addressRegion: "高雄市", addressCountry: "TW" }, geo: { "@type": "GeoCoordinates", latitude: 22.6245, longitude: 120.2823 }, publicAccess: true },
                { "@context": "https://schema.org", "@type": "Place", name: "溝頂民宿", address: { "@type": "PostalAddress", streetAddress: "大公路70巷6-2號", addressLocality: "鹽埕區", addressRegion: "高雄市", addressCountry: "TW" }, geo: { "@type": "GeoCoordinates", latitude: 22.6244, longitude: 120.2822 }, publicAccess: true },
                { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "怎麼從高鐵到你好哇寓所？", acceptedAnswer: { "@type": "Answer", text: "高鐵左營站 → 捷運紅線至美麗島站 → 轉橘線至鹽埕埔站 (O2) → 4號出口步行 5 分鐘即達。全程約30分鐘。" } }, { "@type": "Question", name: "附近有停車場嗎？", acceptedAnswer: { "@type": "Answer", text: "周邊有6間停車場。大公路路邊晚上8點至早上8點免費，富野路停車場平日$30/小時。" } }, { "@type": "Question", name: "可以搭捷運到嗎？", acceptedAnswer: { "@type": "Answer", text: "可以。捷運橘線鹽埕埔站(O2) 4號出口步行5分鐘即達。" } }] },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>

                {/* Header */}
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "50px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "12px" }}>
                            Getting Here
                        </div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>
                            交通指南與停車
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "#C8AD7F", margin: "20px auto" }} />
                    </div>
                </Reveal>

                {/* Property locations */}
                {properties.map(p => (
                    <Reveal key={p.name}>
                        <section style={{ background: "#fff", borderRadius: "16px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                                <div>
                                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "4px" }}>{p.name}</h3>
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
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#BEB5A8", marginBottom: "14px" }}>
                            Public Transit
                        </div>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "20px" }}>大眾運輸指南</h3>

                        <div style={{ display: "grid", gap: "16px" }}>
                            {[
                                { step: "1", icon: "🚄", title: "高鐵 → 左營站", desc: "搭乘高鐵至左營站" },
                                { step: "2", icon: "🚇", title: "捷運紅線 → 美麗島站", desc: "左營站上車，搭至美麗島站" },
                                { step: "3", icon: "🔄", title: "轉乘橘線 → 鹽埕埔站", desc: "美麗島站轉橘線，一站即達鹽埕埔站（O2）" },
                                { step: "4", icon: "🚶", title: "步行 5 分鐘抵達", desc: "從 4 號出口步行約 5 分鐘即可到達" },
                            ].map(s => (
                                <div key={s.step} style={{
                                    display: "flex", gap: "16px", alignItems: "flex-start",
                                    padding: "16px", background: "#FAF8F5", borderRadius: "12px",
                                }}>
                                    <div style={{
                                        width: "36px", height: "36px", borderRadius: "50%", background: "#C8AD7F",
                                        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                                        fontFamily: "var(--en)", fontSize: "0.75rem", fontWeight: 600, flexShrink: 0,
                                    }}>
                                        {s.step}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.9rem", color: "#3D3830", fontWeight: 500, marginBottom: "2px" }}>
                                            {s.icon} {s.title}
                                        </div>
                                        <div style={{ fontSize: "0.8rem", color: "#999" }}>{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: "center", marginTop: "20px", padding: "14px", background: "#FAF8F5", borderRadius: "10px" }}>
                            <p style={{ fontSize: "0.82rem", color: "#888" }}>
                                🚗 自駕導航搜尋「你好哇寓所」即可
                            </p>
                        </div>
                    </section>
                </Reveal>

                {/* 停車場 */}
                <Reveal>
                    <section style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#BEB5A8", marginBottom: "14px" }}>
                            Parking
                        </div>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "20px" }}>周邊停車場（依距離排序）</h3>

                        <div style={{ display: "grid", gap: "12px" }}>
                            {parkingLots.map((lot, i) => (
                                <a key={i} href={lot.nav} target="_blank" rel="noreferrer" style={{
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    padding: "16px 18px", background: "#FAF8F5", borderRadius: "12px",
                                    transition: "all 0.3s", textDecoration: "none",
                                }}>
                                    <div>
                                        <div style={{ fontSize: "0.9rem", color: "#3D3830", fontWeight: 500, marginBottom: "2px" }}>{lot.name}</div>
                                        <div style={{ fontSize: "0.75rem", color: "#BEB5A8" }}>{lot.addr}</div>
                                    </div>
                                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                                        <div style={{ fontSize: "0.82rem", color: "#C8AD7F", fontWeight: 500 }}>{lot.price}</div>
                                        <div style={{ fontSize: "0.68rem", color: "#ccc", marginTop: "2px" }}>導航 →</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                </Reveal>

                {/* CTA */}
                <Reveal>
                    <div style={{ textAlign: "center" }}>
                        <Link href="/book" style={{
                            padding: "14px 32px", borderRadius: "10px", background: "#161618",
                            color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem",
                            letterSpacing: "0.08em",
                        }}>
                            查詢空房
                        </Link>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
