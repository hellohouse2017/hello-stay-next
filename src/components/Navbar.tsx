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
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const logoText = brand === "godin" ? "溝頂民宿" : brand === "hellohouse" ? "你好哇寓所" : "Hello Stay";
    const basePath = brand === "godin" ? "/godin" : brand === "hellohouse" ? "/hellohouse" : "";

    const navLinks = brand === "main" ? [
        { href: "/hellohouse", label: "你好哇寓所", icon: "fa-solid fa-house" },
        { href: "/godin", label: "溝頂民宿", icon: "fa-solid fa-house" },
        { href: "/book", label: "查詢空房", icon: "fa-solid fa-calendar-check", isBooking: true },
    ] : [
        { href: `${basePath}`, label: "首頁", icon: "fa-solid fa-house" },
        { href: `${basePath}/rooms`, label: "房型介紹", icon: "fa-solid fa-bed" },
        { href: `${basePath}/traffic`, label: "交通停車", icon: "fa-solid fa-car" },
        { href: `${basePath}/travel`, label: "旅遊行程", icon: "fa-solid fa-map-location-dot" },
        { href: "/book", label: "查詢空房", icon: "fa-solid fa-calendar-check", isBooking: true },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${scrolled ? "shadow-lg" : ""
                }`}
            style={{
                background: "rgba(26, 32, 44, 0.95)",
                backdropFilter: "blur(10px)",
                borderBottom: "1px solid rgba(197, 160, 101, 0.3)",
                height: "70px",
            }}
        >
            <div className="flex justify-between items-center h-full max-w-[1200px] mx-auto px-5">
                <Link
                    href={basePath || "/"}
                    className="text-[1.5rem] font-bold tracking-wider"
                    style={{ color: "var(--c-accent)", fontFamily: "var(--font-serif)" }}
                >
                    {logoText}
                </Link>

                {/* Mobile toggle */}
                <button
                    className="block md:hidden cursor-pointer border-none bg-transparent p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="選單"
                >
                    <span className="block w-[25px] h-[3px] my-[5px] transition-all duration-300" style={{ backgroundColor: "var(--c-accent)" }} />
                    <span className="block w-[25px] h-[3px] my-[5px] transition-all duration-300" style={{ backgroundColor: "var(--c-accent)" }} />
                    <span className="block w-[25px] h-[3px] my-[5px] transition-all duration-300" style={{ backgroundColor: "var(--c-accent)" }} />
                </button>

                {/* Menu */}
                <ul
                    className={`md:flex items-center gap-5 list-none m-0 p-0 ${menuOpen
                            ? "flex flex-col fixed left-0 top-[70px] w-full bg-[#1A202C] py-4 px-6 gap-0"
                            : "hidden"
                        }`}
                >
                    {navLinks.map((link) => (
                        <li key={link.href} className={menuOpen ? "w-full border-b border-white/5" : ""}>
                            <Link
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center gap-2 text-white text-[0.95rem] font-medium transition-all duration-300 ${link.isBooking
                                        ? "px-5 py-2 rounded-full font-bold border"
                                        : "py-3 px-1 hover:text-[#C5A065]"
                                    } ${menuOpen ? "py-5 text-[1.1rem]" : ""}`}
                                style={
                                    link.isBooking
                                        ? { backgroundColor: "var(--c-accent)", borderColor: "var(--c-accent)", color: "white" }
                                        : undefined
                                }
                            >
                                <i className={link.icon} />
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
