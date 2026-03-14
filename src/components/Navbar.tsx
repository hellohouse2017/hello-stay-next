"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { createPortal } from "react-dom";
import type { Locale } from "@/i18n/config";
import { locales, localeNames, getLocalePath } from "@/i18n/config";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const path = usePathname();

    useEffect(() => { setMounted(true); }, []);

    // Close menu on route change
    useEffect(() => { setOpen(false); setLangOpen(false); }, [path]);

    // Detect current locale from path
    const currentLocale: Locale = (locales.find(l => l !== "zh" && path.startsWith(`/${l}/`)) || (locales.find(l => l !== "zh" && path === `/${l}`) || "zh")) as Locale;
    const prefix = currentLocale === "zh" ? "" : `/${currentLocale}`;

    // Get the path without locale prefix for language switching
    const pathWithoutLocale = currentLocale === "zh" ? path : path.replace(`/${currentLocale}`, "") || "/";

    // B-style (zen light) for godin, D-style (dark gold) for everything else
    const isZen = path.endsWith("/godin");
    const isDark = !isZen;

    const links = [
        { href: `${prefix}/hellohouse`, label: currentLocale === "zh" ? "你好哇寓所" : "Hello House" },
        { href: `${prefix}/godin`, label: currentLocale === "zh" ? "溝頂民宿" : "Godin House" },
        { href: `${prefix !== "" ? prefix : ""}/dazhi`, label: "大智若愚" },
        { href: `${prefix}/book`, label: currentLocale === "zh" ? "預訂" : "Book", cta: true },
    ];

    // Mobile menu portal - renders outside nav to avoid nav's height/overflow constraints
    const mobileMenu = open && mounted ? createPortal(
        <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 9999,
            background: isDark ? "rgba(14,14,14,0.98)" : "rgba(252,251,249,0.98)",
            backdropFilter: "blur(20px)",
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "28px",
            boxSizing: "border-box",
        }}>
            {/* Close button */}
            <button
                onClick={() => setOpen(false)}
                aria-label="關閉選單"
                style={{
                    position: "absolute", top: "20px", right: "20px",
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: "28px", lineHeight: 1,
                    color: isDark ? "#C8AD7F" : "#2a2a2a",
                    padding: "8px",
                }}
            >✕</button>
            {links.map((l, i) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                    style={{
                        fontFamily: "var(--serif)", fontSize: "1.4rem", letterSpacing: "0.1em",
                        color: isDark ? (l.cta ? "#C8AD7F" : "#fff") : (l.cta ? "#2a2a2a" : "#888"),
                        opacity: 0, animation: `fadeInUp 0.5s ease ${i * 0.1}s forwards`,
                        textDecoration: "none",
                    }}
                >{l.label}</Link>
            ))}
        </div>,
        document.body
    ) : null;

    return (
        <>
            <nav className={isDark ? "nav-d" : "nav-b"}>
                <div className="w" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                    <Link href={prefix || "/"} className="logo">Hello Stay</Link>

                    {/* Desktop */}
                    <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                        {links.map(l => (
                            <Link key={l.href} href={l.href} className={l.cta ? "cta-link" : ""}>
                                {l.label}
                            </Link>
                        ))}
                        {/* Language Switcher */}
                        <div style={{ position: "relative" }}>
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                style={{
                                    background: "none", border: "1px solid rgba(200,173,127,0.3)", cursor: "pointer",
                                    color: isDark ? "#C8AD7F" : "#888", fontSize: "0.75rem", padding: "4px 10px",
                                    borderRadius: "4px", fontFamily: "var(--en)", letterSpacing: "0.05em",
                                }}
                            >
                                🌐 {localeNames[currentLocale]}
                            </button>
                            {langOpen && (
                                <div style={{
                                    position: "absolute", top: "100%", right: 0, marginTop: "8px",
                                    background: isDark ? "#1a1a1a" : "#fff", border: "1px solid rgba(200,173,127,0.2)",
                                    borderRadius: "8px", overflow: "hidden", minWidth: "120px",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)", zIndex: 100,
                                }}>
                                    {locales.map(l => (
                                        <Link key={l} href={getLocalePath(l, pathWithoutLocale === "/" ? "" : pathWithoutLocale)}
                                            onClick={() => setLangOpen(false)}
                                            style={{
                                                display: "block", padding: "10px 16px", fontSize: "0.8rem",
                                                color: l === currentLocale ? "#C8AD7F" : (isDark ? "#ccc" : "#666"),
                                                fontWeight: l === currentLocale ? 600 : 400,
                                                textDecoration: "none", transition: "background 0.2s",
                                                background: l === currentLocale ? (isDark ? "rgba(200,173,127,0.1)" : "rgba(200,173,127,0.05)") : "transparent",
                                            }}
                                        >
                                            {localeNames[l]}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
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
            </nav>
            {mobileMenu}
        </>
    );
}
