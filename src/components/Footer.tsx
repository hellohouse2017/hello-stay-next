"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function Footer() {
    const path = usePathname();
    const currentLocale: Locale = (locales.find(l => l !== "zh" && path.startsWith(`/${l}/`)) || (locales.find(l => l !== "zh" && path === `/${l}`) || "zh")) as Locale;
    const prefix = currentLocale === "zh" ? "" : `/${currentLocale}`;
    const t = getDictionary(currentLocale);

    return (
        <footer className="footer-d">
            <div className="gold-rule" />
            <div className="w">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "36px", marginBottom: "40px" }}>
                    <div>
                        <div style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#C8AD7F", letterSpacing: "0.1em", marginBottom: "14px" }}>{t.footer.brand}</div>
                        <p style={{ fontSize: "0.78rem", lineHeight: 2, color: "rgba(255,255,255,0.6)", whiteSpace: "pre-line" }}>{t.footer.desc}</p>
                    </div>
                    <div>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "16px" }}>{t.footer.properties}</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Link href={`${prefix}/hellohouse`} style={{ fontSize: "0.82rem" }}>{t.footer.prop_hellohouse}</Link>
                            <Link href={`${prefix}/godin`} style={{ fontSize: "0.82rem" }}>{t.footer.prop_godin}</Link>
                            <Link href={`${prefix}/dazhi`} style={{ fontSize: "0.82rem" }}>{t.footer.prop_dazhi}</Link>
                            <Link href={`${prefix}/book`} style={{ fontSize: "0.82rem" }}>{t.footer.prop_book}</Link>
                        </div>
                    </div>
                    <div>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "16px" }}>{t.footer.info}</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Link href={`${prefix}/agreement`} style={{ fontSize: "0.82rem" }}>{t.footer.info_agreement}</Link>
                            <Link href={`${prefix}/traffic`} style={{ fontSize: "0.82rem" }}>{t.footer.info_traffic}</Link>
                            <Link href={`${prefix}/explore`} style={{ fontSize: "0.82rem" }}>{t.footer.info_explore}</Link>
                            <Link href={`${prefix}/packages`} style={{ fontSize: "0.82rem" }}>{t.footer.info_packages}</Link>
                            <Link href={`${prefix}/blog`} style={{ fontSize: "0.82rem" }}>{t.footer.info_blog}</Link>
                            <Link href={`${prefix}/reviews`} style={{ fontSize: "0.82rem" }}>{t.footer.info_reviews}</Link>
                        </div>
                    </div>
                    <div>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "16px" }}>{t.footer.contact}</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.82rem" }}>
                            <a href="tel:+886932828922" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}>📞 0932-828-922</a>
                            <a href="mailto:hellohouse2017@gmail.com" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}>✉️ hellohouse2017@gmail.com</a>
                        </div>
                    </div>
                </div>

                {/* ── Addresses & Registration ── */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "30px", padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: "10px" }}>
                    <div>
                        <div style={{ fontSize: "0.78rem", color: "#C8AD7F", marginBottom: "6px", fontWeight: 500 }}>{t.footer.hellohouse_name}</div>
                        <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                            {t.footer.hellohouse_addr}<br />
                            {t.footer.hellohouse_reg}
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: "0.78rem", color: "#C8AD7F", marginBottom: "6px", fontWeight: 500 }}>{t.footer.godin_name}</div>
                        <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                            {t.footer.godin_addr}<br />
                            {t.footer.godin_reg}
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: "center", fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", marginBottom: "24px" }}>
                    {t.footer.insurance}
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px", fontSize: "0.7rem", color: "rgba(255,255,255,0.55)", textAlign: "center" }}>
                    © {new Date().getFullYear()} Hello Stay. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
