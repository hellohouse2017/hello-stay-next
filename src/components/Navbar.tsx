"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
    brand?: "hellohouse" | "godin" | "main";
}

export default function Navbar({ brand = "main" }: NavbarProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const logoText = brand === "godin" ? "溝頂民宿" : brand === "hellohouse" ? "你好哇寓所" : "Hello Stay";
    const basePath = brand === "godin" ? "/godin" : brand === "hellohouse" ? "/hellohouse" : "";

    const navLinks = brand === "main" ? [
        { href: "/hellohouse", label: "你好哇寓所" },
        { href: "/godin", label: "溝頂民宿" },
        { href: "/book", label: "查詢空房", isCTA: true },
    ] : [
        { href: `${basePath}`, label: "首頁" },
        { href: `${basePath}/rooms`, label: "房型" },
        { href: `${basePath}/traffic`, label: "交通" },
        { href: `${basePath}/travel`, label: "旅遊" },
        { href: "/book", label: "查詢空房", isCTA: true },
    ];

    return (
        <>
            <nav
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 9999,
                    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    background: scrolled ? "rgba(28, 28, 30, 0.97)" : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(201, 169, 110, 0.15)" : "1px solid transparent",
                    height: "80px",
                }}
            >
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100%",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 30px",
                }}>
                    {/* Logo */}
                    <Link
                        href={basePath || "/"}
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1.4rem",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            color: scrolled ? "var(--c-gold)" : "white",
                            transition: "color 0.5s",
                        }}
                    >
                        {logoText}
                    </Link>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="選單"
                        style={{
                            display: "none",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "8px",
                            position: "relative",
                            width: "32px",
                            height: "32px",
                        }}
                        className="mobile-toggle"
                    >
                        <span style={{
                            display: "block",
                            width: "22px",
                            height: "2px",
                            background: scrolled ? "var(--c-gold)" : "white",
                            transition: "all 0.3s",
                            position: "absolute",
                            left: "5px",
                            top: menuOpen ? "15px" : "9px",
                            transform: menuOpen ? "rotate(45deg)" : "none",
                        }} />
                        <span style={{
                            display: "block",
                            width: "22px",
                            height: "2px",
                            background: scrolled ? "var(--c-gold)" : "white",
                            transition: "all 0.3s",
                            position: "absolute",
                            left: "5px",
                            top: "15px",
                            opacity: menuOpen ? 0 : 1,
                        }} />
                        <span style={{
                            display: "block",
                            width: "22px",
                            height: "2px",
                            background: scrolled ? "var(--c-gold)" : "white",
                            transition: "all 0.3s",
                            position: "absolute",
                            left: "5px",
                            top: menuOpen ? "15px" : "21px",
                            transform: menuOpen ? "rotate(-45deg)" : "none",
                        }} />
                    </button>

                    {/* Desktop nav */}
                    <ul className="nav-links" style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                    }}>
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                {link.isCTA ? (
                                    <Link
                                        href={link.href}
                                        className="btn btn-gold"
                                        style={{ padding: "10px 28px", fontSize: "0.88rem" }}
                                    >
                                        {link.label}
                                    </Link>
                                ) : (
                                    <Link
                                        href={link.href}
                                        style={{
                                            color: "rgba(255,255,255,0.8)",
                                            fontSize: "0.9rem",
                                            fontWeight: 400,
                                            padding: "10px 18px",
                                            borderRadius: "8px",
                                            transition: "all 0.3s",
                                            letterSpacing: "0.06em",
                                        }}
                                        onMouseEnter={e => {
                                            (e.target as HTMLElement).style.color = "white";
                                            (e.target as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                                        }}
                                        onMouseLeave={e => {
                                            (e.target as HTMLElement).style.color = "rgba(255,255,255,0.8)";
                                            (e.target as HTMLElement).style.background = "transparent";
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            {menuOpen && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9998,
                        background: "rgba(28, 28, 30, 0.98)",
                        backdropFilter: "blur(20px)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "12px",
                        animation: "fadeInUp 0.4s ease",
                    }}
                >
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                color: link.isCTA ? "var(--c-gold)" : "white",
                                fontSize: "1.6rem",
                                fontFamily: "var(--font-display)",
                                fontWeight: 500,
                                padding: "16px 0",
                                letterSpacing: "0.1em",
                                opacity: 0,
                                animation: `fadeInUp 0.5s ease ${i * 0.1}s forwards`,
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}

            <style jsx>{`
        @media (max-width: 768px) {
          .mobile-toggle { display: block !important; }
          .nav-links { display: none !important; }
        }
      `}</style>
        </>
    );
}
