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
            <div className="w">
                <div className="footer-d__top">
                    <div className="footer-d__brand">
                        <div className="footer-d__eyebrow">Private Stays in Kaohsiung</div>
                        <div className="footer-d__logo">{t.footer.brand}</div>
                        <p>{t.footer.desc}</p>
                    </div>
                    <div className="footer-d__col">
                        <div className="footer-d__title">{t.footer.properties}</div>
                        <div className="footer-d__links">
                            <Link href={`${prefix}/hellohouse`}>{t.footer.prop_hellohouse}</Link>
                            <Link href={`${prefix}/godin`}>{t.footer.prop_godin}</Link>
                            <Link href={`${prefix}/dazhi`}>
                                {currentLocale === "zh" ? `${t.footer.prop_dazhi}（規劃中）` : t.footer.prop_dazhi}
                            </Link>
                            <Link href={`${prefix}/book`}>{t.footer.prop_book}</Link>
                        </div>
                    </div>
                    <div className="footer-d__col">
                        <div className="footer-d__title">{t.footer.info}</div>
                        <div className="footer-d__links">
                            <Link href="/agreement">{t.footer.info_agreement}</Link>
                            <Link href={`${prefix}/traffic`}>{t.footer.info_traffic}</Link>
                            <Link href="/explore">{t.footer.info_explore}</Link>
                            {currentLocale === "zh" ? (
                                <>
                                    <Link href="/explore/food">鹽埕美食</Link>
                                    <Link href="/explore/spots">周邊景點</Link>
                                </>
                            ) : null}
                            <Link href="/packages">{t.footer.info_packages}</Link>
                            <Link href={currentLocale === "zh" ? "/blog" : `${prefix}/guide`}>{t.footer.info_blog}</Link>
                            <Link href="/reviews">{t.footer.info_reviews}</Link>
                            <Link href="/about">{t.footer.info_about}</Link>
                        </div>
                    </div>
                    <div className="footer-d__col">
                        <div className="footer-d__title">{t.footer.contact}</div>
                        <div className="footer-d__links footer-d__links--contact">
                            <a href="tel:+886932828922">0932-828-922</a>
                            <a href="mailto:hellohouse2017@gmail.com">hellohouse2017@gmail.com</a>
                            <a href="https://lin.ee/atCiMQw" target="_blank" rel="noopener noreferrer">LINE 官方直訂</a>
                        </div>
                    </div>
                </div>

                <div className="footer-d__registry">
                    <div>
                        <div className="footer-d__registry-name">{t.footer.hellohouse_name}</div>
                        <div className="footer-d__registry-text">
                            {t.footer.hellohouse_addr}<br />
                            {t.footer.hellohouse_reg}
                        </div>
                    </div>
                    <div>
                        <div className="footer-d__registry-name">{t.footer.godin_name}</div>
                        <div className="footer-d__registry-text">
                            {t.footer.godin_addr}<br />
                            {t.footer.godin_reg}
                        </div>
                    </div>
                </div>

                <div className="footer-d__insurance">
                    {t.footer.insurance}
                </div>

                <div className="footer-d__bottom">
                    <span>© {new Date().getFullYear()} Hello Stay. All rights reserved.</span>
                    <span>合法民宿・公共意外責任保險・官方直訂</span>
                </div>
            </div>
        </footer>
    );
}
