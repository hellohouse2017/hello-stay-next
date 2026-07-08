"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { createPortal } from "react-dom";
import type { Locale } from "@/i18n/config";
import { locales, localeNames, getLocalePath } from "@/i18n/config";

type NavLink = {
    href: string;
    label: string;
    cta?: boolean;
};

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const path = usePathname();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setMounted(true); }, []);

    // Close menu on route change
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setOpen(false); setLangOpen(false); }, [path]);

    // Detect current locale from path
    const currentLocale: Locale = (locales.find(l => l !== "zh" && path.startsWith(`/${l}/`)) || (locales.find(l => l !== "zh" && path === `/${l}`) || "zh")) as Locale;
    const prefix = currentLocale === "zh" ? "" : `/${currentLocale}`;

    // Get the path without locale prefix for language switching
    const pathWithoutLocale = currentLocale === "zh" ? path : path.replace(`/${currentLocale}`, "") || "/";

    const propertyLinks: NavLink[] = [
        { href: `${prefix}/hellohouse`, label: currentLocale === "zh" ? "你好哇寓所" : "Hello House" },
        { href: `${prefix}/godin`, label: currentLocale === "zh" ? "溝頂民宿" : "Godin House" },
        { href: `${prefix}/dazhi`, label: "大智若愚" },
    ];

    const zhPlanningLinks: NavLink[] = [
        { href: "/compare", label: "三館比較" },
        { href: "/packages", label: "方案" },
        { href: "/traffic", label: "交通" },
    ];

    const links: NavLink[] = [
        ...propertyLinks,
        ...(currentLocale === "zh" ? zhPlanningLinks : []),
        { href: `${prefix}/book`, label: currentLocale === "zh" ? "預訂" : "Book", cta: true },
    ];

    // Mobile menu portal - renders outside nav to avoid nav's height/overflow constraints
    const mobileMenu = open && mounted ? createPortal(
        <div className="mobile-menu-panel">
            <button
                onClick={() => setOpen(false)}
                aria-label="關閉選單"
                className="mobile-menu-close"
            >
                ×
            </button>
            <Link href={prefix || "/"} onClick={() => setOpen(false)} className="mobile-menu-brand">
                Hello Stay
            </Link>
            {links.map((l, i) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                    className={l.cta ? "mobile-menu-link mobile-menu-link--cta" : "mobile-menu-link"}
                    style={{ animationDelay: `${i * 0.06}s` }}
                >
                    {l.label}
                </Link>
            ))}
            <div className="mobile-menu-langs" aria-label="語言切換">
                {locales.map(l => (
                    <Link key={l} href={getLocalePath(l, pathWithoutLocale === "/" ? "" : pathWithoutLocale)}
                        onClick={() => setOpen(false)}
                        className={l === currentLocale ? "mobile-menu-lang active" : "mobile-menu-lang"}
                    >
                        {localeNames[l]}
                    </Link>
                ))}
            </div>
        </div>,
        document.body
    ) : null;

    return (
        <>
            <header className="site-header nav-d">
                <div className="site-announcement">
                    <span>Official Booking</span>
                    <strong>Hello Stay 高雄鹽埕包棟民宿</strong>
                    <span>官網看方案｜訂房站查空房與報價</span>
                </div>
                <nav className="site-nav">
                    <div className="w site-nav__inner">
                        <Link href={prefix || "/"} className="logo site-logo">
                            <span>Hello Stay</span>
                            <small>Kaohsiung Private Stays</small>
                        </Link>

                        <div className="desktop-nav site-nav__links">
                            {links.map(l => (
                                <Link key={l.href} href={l.href} className={l.cta ? "cta-link" : ""}>
                                    {l.label}
                                </Link>
                            ))}
                            <div className="language-menu">
                                <button
                                    onClick={() => setLangOpen(!langOpen)}
                                    className="language-menu__button"
                                    aria-expanded={langOpen}
                                    aria-haspopup="menu"
                                >
                                    <span aria-hidden="true">⌘</span>
                                    {localeNames[currentLocale]}
                                </button>
                                {langOpen && (
                                    <div className="language-menu__panel" role="menu">
                                        {locales.map(l => (
                                            <Link key={l} href={getLocalePath(l, pathWithoutLocale === "/" ? "" : pathWithoutLocale)}
                                                onClick={() => setLangOpen(false)}
                                                className={l === currentLocale ? "language-menu__item active" : "language-menu__item"}
                                                role="menuitem"
                                            >
                                                {localeNames[l]}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            className="mobile-toggle"
                            onClick={() => setOpen(!open)}
                            aria-label="選單"
                            aria-expanded={open}
                        >
                            {[0, 1, 2].map(i => (
                                <span key={i}
                                    style={{
                                        transform: open ? (i === 0 ? "rotate(45deg) translate(4px,4px)" : i === 2 ? "rotate(-45deg) translate(4px,-4px)" : "scaleX(0)") : "none",
                                    }}
                                />
                            ))}
                        </button>
                    </div>
                </nav>
            </header>
            {mobileMenu}
        </>
    );
}
