import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
    title: "大智若愚｜高雄大型包棟48人・電梯民宿2027新開｜大港橋旁鹽埕",
    description: "高雄最大包棟民宿！最多48人入住，全新電梯大樓。一層三房一廳，獨立樓層。緊鄰大港橋＆駁二，適合企業團建、大家族旅遊、球隊移訓→LINE查空房",
    alternates: { canonical: "https://www.hello-stay.com/dazhi" },
    openGraph: {
        title: "大智若愚｜高雄大型包棟48人・電梯民宿2027新開｜大港橋旁鹽埕",
        description: "高雄最大包棟民宿！最多48人，全新電梯大樓，緊鄰大港橋＆駁二→LINE查空房",
        url: "https://www.hello-stay.com/dazhi",
        images: [{ url: "https://www.hello-stay.com/images/dazhi/building-render.webp", width: 1200, height: 630, alt: "大智若愚" }],
    },
};

export default function DazhiPage() {
    return (
        <div style={{
            minHeight: "100vh",
            background: "var(--bg)",
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
                        borderRadius: "4px", overflow: "hidden",
                        marginBottom: "50px", border: "1px solid var(--line)",
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
                            display: "inline-block", padding: "8px 24px", borderRadius: "4px",
                            background: "var(--surface)", fontFamily: "var(--sans)", fontSize: "0.6rem",
                            letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--muted)",
                            marginBottom: "40px", fontWeight: 600,
                        }}>
                            預計 2027 年中後開幕
                        </div>
                    </Reveal>

                    <Reveal>
                        <h1 style={{
                            fontFamily: "var(--serif)", fontSize: "clamp(2.4rem, 7vw, 4.2rem)",
                            fontWeight: 400, color: "var(--text)", letterSpacing: "0.12em",
                            marginBottom: "20px", lineHeight: 1.3,
                        }}>
                            大智若愚｜高雄鹽埕最大48人電梯包棟
                        </h1>
                    </Reveal>

                    <Reveal>
                        <p style={{
                            fontFamily: "var(--sans)", fontSize: "0.68rem", letterSpacing: "0.3em",
                            textTransform: "uppercase", color: "var(--muted)", marginBottom: "50px", opacity: 0.6,
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
                            background: "var(--surface)", borderRadius: "4px", padding: "36px 32px",
                            border: "1px solid var(--line)", marginBottom: "32px",
                        }}>
                            <div style={{
                                fontSize: "0.6rem", fontFamily: "var(--sans)", letterSpacing: "0.35em",
                                textTransform: "uppercase", color: "var(--pri)", marginBottom: "14px", fontWeight: 600,
                            }}>
                                Location
                            </div>
                            <p style={{
                                fontFamily: "var(--serif)", fontSize: "1.15rem", color: "var(--text)",
                                letterSpacing: "0.08em", lineHeight: 1.8,
                            }}>
                                大港橋旁 · 駁二大義倉庫群
                            </p>
                            <p style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: "8px" }}>
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
                                    background: "var(--surface)", borderRadius: "4px", padding: "28px 20px",
                                    border: "1px solid var(--line)", textAlign: "center",
                                }}>
                                    <div style={{ fontSize: "1.6rem", marginBottom: "10px" }}>{f.icon}</div>
                                    <div style={{
                                        fontFamily: "var(--serif)", fontSize: "0.95rem", color: "var(--text)",
                                        letterSpacing: "0.06em", marginBottom: "4px", fontWeight: 400,
                                    }}>{f.title}</div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{f.sub}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    {/* Description */}
                    <Reveal>
                        <p style={{
                            fontSize: "0.92rem", color: "var(--muted)", lineHeight: 2.3,
                            marginBottom: "50px",
                        }}>
                            Hello Stay 第三館即將登場。<br />
                            全新電梯建築，座落大港橋旁黃金地段。<br />
                            以「大智若愚」為名，追求外拙內秀的空間哲學。<br />
                            敬請期待。
                        </p>
                    </Reveal>

                    {/* AEO Quick Summary */}
                    <Reveal>
                        <div style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", marginBottom: "20px" }}>
                            <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "16px" }}>一眼看懂</div>
                            <div style={{ display: "grid", gap: "12px", marginBottom: "24px" }}>
                                <div style={{ display: "flex", gap: "12px", fontSize: "0.88rem", color: "#3D3830" }}>
                                    <span style={{ color: "var(--pri)", minWidth: "20px" }}>👥</span>
                                    <span>適合 <strong>20–48 人</strong>超大團體，高雄最大容量包棟</span>
                                </div>
                                <div style={{ display: "flex", gap: "12px", fontSize: "0.88rem", color: "#3D3830" }}>
                                    <span style={{ color: "var(--pri)", minWidth: "20px" }}>🛗</span>
                                    <span>全新電梯民宿，近大港橋，<strong>2027年中開幕</strong></span>
                                </div>
                                <div style={{ display: "flex", gap: "12px", fontSize: "0.88rem", color: "#3D3830" }}>
                                    <span style={{ color: "var(--pri)", minWidth: "20px" }}>📍</span>
                                    <span>鹽埕區，可包層/包棟，適合球隊・企業員旅・大家族</span>
                                </div>
                            </div>
                            {[
                                { q: "大智若愚可以住幾人？", a: "最多可接待 48 人，最低建議 20 人包棟。可依人數選擇包層（單層）或包棟（全棟），彈性配置高雄最大容量包棟方案。" },
                                { q: "大智若愚什麼時候開幕？", a: "預計 2027 年中正式開幕。目前開放搶先預約，早鳥享有優先排程與諮詢服務，建議透過 LINE 官方帳號登記。" },
                                { q: "大智若愚有電梯嗎？", a: "是的！大智若愚是 Hello Stay 三館中唯一有電梯的民宿，特別適合帶長輩、行動不便者，或需要搬運大量行李的大型企業團隊。" },
                                { q: "大智若愚適合什麼樣的活動？", a: "最適合：大型家族旅遊（三代同堂）、企業員工旅遊、球隊/運動隊集訓住宿、同學會/同事聚會。20–48人靈活配置，可包層或整棟使用。" },
                                { q: "大智若愚跟你好哇寓所有什麼不同？", a: "你好哇寓所：6–26人，已開幕，中島廚房+麻將桌，適合中型團體。大智若愚：20–48人，2027年開幕，電梯設備，適合超大團體。可同步詢問兩館搭配方案。" },
                                { q: "大智若愚在哪裡？交通如何？", a: "位於高雄鹽埕區大港橋旁，距捷運鹽埕埔站步行8分鐘，開車到高雄火車站約10分鐘，步行到駁二藝術特區約12分鐘。附近有多處停車場。" },
                            ].map(faq => (
                                <div key={faq.q} style={{ padding: "15px 0", borderBottom: "1px solid #F5F1ED" }}>
                                    <div style={{ fontWeight: 500, fontSize: "0.88rem", marginBottom: "5px", color: "#3D3830" }}>{faq.q}</div>
                                    <div style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.9 }}>{faq.a}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    {/* CTAs */}
                    <Reveal>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/" className="btn-ghost" style={{ color: "var(--muted)", borderColor: "var(--line)" }}>
                                返回首頁
                            </Link>
                            <a href="https://lin.ee/atCiMQw" target="_blank" rel="noreferrer" className="btn-line btn-line--lg">
                                LINE 搶先預約
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
