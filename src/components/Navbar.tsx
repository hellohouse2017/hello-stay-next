"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { createPortal } from "react-dom";
import { Languages, Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { locales, localeNames, getLocaleSwitchPath } from "@/i18n/config";

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

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [open]);

    // Detect current locale from path
    const currentLocale: Locale = (locales.find(l => l !== "zh" && path.startsWith(`/${l}/`)) || (locales.find(l => l !== "zh" && path === `/${l}`) || "zh")) as Locale;
    const prefix = currentLocale === "zh" ? "" : `/${currentLocale}`;

    // Get the path without locale prefix for language switching
    const pathWithoutLocale = currentLocale === "zh" ? path : path.replace(`/${currentLocale}`, "") || "/";

    const propertyLinks: NavLink[] = [
        { href: `${prefix}/hellohouse`, label: currentLocale === "zh" ? "你好哇寓所" : "Hello House" },
        { href: `${prefix}/godin`, label: currentLocale === "zh" ? "溝頂民宿" : "Godin House" },
    ];

    const zhPlanningLinks: NavLink[] = [
        { href: `${prefix}/#stay-options`, label: "住宿選擇" },
        { href: `${prefix}/compare`, label: "比較住宿" },
        { href: `${prefix}/explore`, label: "鹽埕玩什麼" },
        { href: `${prefix}/#home-faq`, label: "常見問題" },
    ];

    const links: NavLink[] = [
        ...(currentLocale === "zh" ? zhPlanningLinks : propertyLinks),
        { href: `${prefix}/book`, label: currentLocale === "zh" ? "查空房" : "Book", cta: true },
    ];

    // Mobile menu portal - renders outside nav to avoid nav's height/overflow constraints
    const mobileMenu = open && mounted ? createPortal(
        <div id="mobile-site-menu" className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="網站導覽">
            <button
                onClick={() => setOpen(false)}
                aria-label="關閉選單"
                className="mobile-menu-close"
            >
                <X size={22} strokeWidth={2} aria-hidden="true" />
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
                    <Link key={l} href={getLocaleSwitchPath(l, pathWithoutLocale)}
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
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className={[l.cta ? "cta-link" : "", !l.cta && l.href === `${prefix}/explore` ? "is-active" : ""].filter(Boolean).join(" ")}
                                    aria-current={!l.cta && l.href === `${prefix}/explore` ? "page" : undefined}
                                >
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
                                    <Languages size={15} strokeWidth={2} aria-hidden="true" />
                                    {localeNames[currentLocale]}
                                </button>
                                {langOpen && (
                                    <div className="language-menu__panel" role="menu">
                                        {locales.map(l => (
                                            <Link key={l} href={getLocaleSwitchPath(l, pathWithoutLocale)}
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
                            aria-label={open ? "關閉選單" : "開啟選單"}
                            aria-expanded={open}
                            aria-controls="mobile-site-menu"
                        >
                            {open
                                ? <X size={21} strokeWidth={2} aria-hidden="true" />
                                : <Menu size={21} strokeWidth={2} aria-hidden="true" />}
                        </button>
                    </div>
                </nav>
            </header>
            {mobileMenu}
        </>
    );
}
