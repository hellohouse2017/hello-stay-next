"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const path = usePathname();

    // B-style (zen light) for godin, D-style (dark gold) for everything else
    const isZen = path === "/godin";
    const isDark = !isZen;

    const links = [
        { href: "/hellohouse", label: "你好哇寓所" },
        { href: "/godin", label: "溝頂民宿" },
        { href: "/book", label: "預訂", cta: true },
    ];

    return (
        <nav className={isDark ? "nav-d" : "nav-b"}>
            <div className="w" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                <Link href="/" className="logo">Hello Stay</Link>

                {/* Desktop */}
                <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                    {links.map(l => (
                        <Link key={l.href} href={l.href} className={l.cta ? "cta-link" : ""}>
                            {l.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setOpen(!open)}
                    aria-label="選單"
                    style={{
                        background: "none", border: "none", cursor: "pointer",
                        display: "flex", flexDirection: "column", gap: "5px", padding: "8px",
                    }}
                >
                    {[0, 1, 2].map(i => (
                        <span key={i} style={{
                            width: "20px", height: "1.5px",
                            background: isDark ? "#C8AD7F" : "#2a2a2a",
                            transition: "all 0.3s",
                            transform: open ? (i === 0 ? "rotate(45deg) translate(4px,4px)" : i === 2 ? "rotate(-45deg) translate(4px,-4px)" : "scaleX(0)") : "none",
                        }} />
                    ))}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div style={{
                    position: "fixed", inset: 0, zIndex: 998,
                    background: isDark ? "rgba(14,14,14,0.98)" : "rgba(252,251,249,0.98)",
                    backdropFilter: "blur(20px)",
                    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px",
                }}>
                    {links.map((l, i) => (
                        <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                            style={{
                                fontFamily: "var(--serif)", fontSize: "1.4rem", letterSpacing: "0.1em",
                                color: isDark ? (l.cta ? "#C8AD7F" : "#fff") : (l.cta ? "#2a2a2a" : "#888"),
                                opacity: 0, animation: `fadeInUp 0.5s ease ${i * 0.1}s forwards`,
                            }}
                        >{l.label}</Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
