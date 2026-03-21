import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
    title: "大智若愚｜高雄鹽埕包棟民宿最大48人電梯館",
    description: "高雄鹽埕區最大規模包棟民宿，電梯直達，最多容納48人。近駁二藝術特區、大港橋。一層三房一廳獨立空間，可包層可包棟。企業團建、班遊首選，立即詢問報價！",
    alternates: { canonical: "https://www.hello-stay.com/dazhi" },
    openGraph: {
        title: "大智若愚｜高雄鹽埕包棟民宿最大48人電梯館",
        description: "大港橋旁全新電梯民宿，一層三房一廳，可包層可包棟，最大48人。企業團建、班遊首選。",
        url: "https://www.hello-stay.com/dazhi",
        images: [{ url: "https://www.hello-stay.com/images/dazhi/building-render.webp", width: 1200, height: 630, alt: "大智若愚" }],
    },
};

export default function DazhiPage() {
    return (
        <div style={{
            minHeight: "100vh",
            background: "#FAF8F5",
            paddingTop: "calc(var(--nav-h) + 20px)",
            paddingBottom: "80px",
        }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org", "@type": "LodgingBusiness",
                    name: "大智若愚 Dazhi Ruoyu", url: "https://www.hello-stay.com/dazhi",
                    telephone: "+886-932-828-922",
                    description: "高雄全新電梯包棟民宿，位於大港橋旁、駁二大義倉庫群。一層三房一廳，可包層可包棟，最大可住48人。即將開幕。",
                    address: { "@type": "PostalAddress", addressLocality: "鹽埕區", addressRegion: "高雄市", postalCode: "803", addressCountry: "TW" },
                    geo: { "@type": "GeoCoordinates", latitude: 22.6190, longitude: 120.2850 },
                    checkinTime: "16:00", checkoutTime: "11:00",
                    petsAllowed: false,
                })
            }} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px" }}>

                {/* Hero render */}
                <Reveal>
                    <div style={{
                        borderRadius: "20px", overflow: "hidden",
                        marginBottom: "50px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                    }}>
                        <Image
                            src="/images/dazhi/building-render.webp"
                            alt="大智若愚 外觀設計圖"
                            width={720} height={720}
                            className="img-cover"
                            style={{ width: "100%", height: "auto" }}
                            priority
                        />
                    </div>
                </Reveal>

                <div style={{ textAlign: "center" }}>
                    <Reveal>
                        {/* Coming Soon pill */}
                        <div style={{
                            display: "inline-block", padding: "8px 24px", borderRadius: "40px",
                            background: "#F0ECE6", fontFamily: "var(--en)", fontSize: "0.6rem",
                            letterSpacing: "0.35em", textTransform: "uppercase", color: "#A09282",
                            marginBottom: "40px",
                        }}>
                            預計 2027 年底開放
                        </div>
                    </Reveal>

                    <Reveal>
                        <h1 style={{
                            fontFamily: "var(--serif)", fontSize: "clamp(2.4rem, 7vw, 4.2rem)",
                            fontWeight: 400, color: "#3D3830", letterSpacing: "0.12em",
                            marginBottom: "20px", lineHeight: 1.3,
                        }}>
                            大智若愚
                        </h1>
                    </Reveal>

                    <Reveal>
                        <p style={{
                            fontFamily: "var(--en)", fontSize: "0.68rem", letterSpacing: "0.3em",
                            textTransform: "uppercase", color: "#BEB5A8", marginBottom: "50px",
                        }}>
                            Dazhi Ruoyu · A Wise Retreat
                        </p>
                    </Reveal>

                    {/* Organic divider */}
                    <Reveal>
                        <div style={{
                            width: "80px", height: "2px", margin: "0 auto 50px",
                            background: "linear-gradient(90deg, transparent, #D4CBC0, transparent)",
                        }} />
                    </Reveal>

                    {/* Location highlight */}
                    <Reveal>
                        <div style={{
                            background: "#fff", borderRadius: "20px", padding: "36px 32px",
                            boxShadow: "0 4px 30px rgba(0,0,0,0.03)", marginBottom: "32px",
                        }}>
                            <div style={{
                                fontSize: "0.65rem", fontFamily: "var(--en)", letterSpacing: "0.25em",
                                textTransform: "uppercase", color: "#BEB5A8", marginBottom: "14px",
                            }}>
                                Location
                            </div>
                            <p style={{
                                fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830",
                                letterSpacing: "0.06em", lineHeight: 1.8,
                            }}>
                                大港橋旁 · 駁二大義倉庫群
                            </p>
                            <p style={{ fontSize: "0.82rem", color: "#BEB5A8", marginTop: "8px" }}>
                                高雄最精華的港灣地段，步出門即是藝文散步路線
                            </p>
                        </div>
                    </Reveal>

                    {/* Feature cards */}
                    <Reveal>
                        <div style={{
                            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px",
                            marginBottom: "40px",
                        }}>
                            {[
                                { icon: "🏗️", title: "全新電梯民宿", sub: "現代化電梯大樓" },
                                { icon: "🏠", title: "一層三房一廳", sub: "獨立樓層空間" },
                                { icon: "🔑", title: "可包層 · 可包棟", sub: "靈活包棟方案" },
                                { icon: "👥", title: "最大 48 人", sub: "超大團體首選" },
                            ].map(f => (
                                <div key={f.title} style={{
                                    background: "#fff", borderRadius: "16px", padding: "28px 20px",
                                    boxShadow: "0 2px 16px rgba(0,0,0,0.02)", textAlign: "center",
                                }}>
                                    <div style={{ fontSize: "1.6rem", marginBottom: "10px" }}>{f.icon}</div>
                                    <div style={{
                                        fontFamily: "var(--serif)", fontSize: "0.95rem", color: "#3D3830",
                                        letterSpacing: "0.04em", marginBottom: "4px",
                                    }}>{f.title}</div>
                                    <div style={{ fontSize: "0.75rem", color: "#BEB5A8" }}>{f.sub}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    {/* Description */}
                    <Reveal>
                        <p style={{
                            fontSize: "0.92rem", color: "#A09282", lineHeight: 2.3,
                            marginBottom: "50px",
                        }}>
                            Hello Stay 第三館即將登場。<br />
                            全新電梯建築，座落大港橋旁黃金地段。<br />
                            以「大智若愚」為名，追求外拙內秀的空間哲學。<br />
                            敬請期待。
                        </p>
                    </Reveal>

                    {/* CTAs */}
                    <Reveal>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/" style={{
                                padding: "14px 36px", borderRadius: "40px",
                                border: "1px solid #D4CBC0", color: "#8A8279",
                                fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em",
                                transition: "all 0.3s",
                            }}>
                                返回首頁
                            </Link>
                            <a href="https://lin.ee/atCiMQw" target="_blank" rel="noreferrer" style={{
                                padding: "14px 36px", borderRadius: "40px",
                                background: "#06C755", border: "1px solid #06C755", color: "#fff",
                                fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em",
                                transition: "all 0.3s",
                            }}>
                                LINE 搶先預約
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
