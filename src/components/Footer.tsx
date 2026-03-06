"use client";
import Link from "next/link";

interface FooterProps {
    brand?: "hellohouse" | "godin" | "main";
}

export default function Footer({ brand = "main" }: FooterProps) {
    return (
        <footer
            style={{
                background: "var(--c-charcoal)",
                color: "rgba(255,255,255,0.6)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Gold accent line */}
            <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, var(--c-gold), transparent)" }} />

            <div className="container" style={{ padding: "60px 0 40px" }}>
                {/* Top section */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "40px", marginBottom: "50px" }}>
                    {/* Brand */}
                    <div>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--c-gold)", marginBottom: "16px", letterSpacing: "0.08em" }}>
                            Hello Stay
                        </h3>
                        <p style={{ fontSize: "0.88rem", lineHeight: 1.9, color: "rgba(255,255,255,0.45)" }}>
                            高雄鹽埕區質感包棟民宿<br />
                            帶給每位旅人最有溫度的空間
                        </p>
                    </div>

                    {/* Properties */}
                    <div>
                        <h4 style={{ fontSize: "0.75rem", fontFamily: "var(--font-en)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: "20px" }}>Properties</h4>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                            <li><Link href="/hellohouse" style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", transition: "color 0.3s" }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = "var(--c-gold)"} onMouseLeave={(e) => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)"}>你好哇寓所</Link></li>
                            <li><Link href="/godin" style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", transition: "color 0.3s" }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = "var(--c-gold)"} onMouseLeave={(e) => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)"}>溝頂民宿</Link></li>
                            <li><Link href="/book" style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", transition: "color 0.3s" }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = "var(--c-gold)"} onMouseLeave={(e) => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)"}>查詢空房</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ fontSize: "0.75rem", fontFamily: "var(--font-en)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: "20px" }}>Contact</h4>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                            <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.88rem" }}>
                                <i className="fa-solid fa-phone" style={{ color: "var(--c-gold)", fontSize: "0.8rem", width: "16px" }} />
                                0932-828-922
                            </li>
                            <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.88rem" }}>
                                <i className="fa-brands fa-line" style={{ color: "var(--c-gold)", fontSize: "0.8rem", width: "16px" }} />
                                <a href="https://lin.ee/yourline" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.6)" }}>LINE 官方帳號</a>
                            </li>
                            <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.88rem" }}>
                                <i className="fa-solid fa-location-dot" style={{ color: "var(--c-gold)", fontSize: "0.8rem", width: "16px" }} />
                                高雄市鹽埕區
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
                    <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
                        © {new Date().getFullYear()} Hello Stay. All rights reserved.
                    </p>
                    <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)" }}>
                        高雄包棟民宿 · 團體旅遊 · 家族聚會 · 駁二住宿 · 鹽埕區民宿
                    </p>
                </div>
            </div>
        </footer>
    );
}
