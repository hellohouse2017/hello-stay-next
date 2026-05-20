"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Locale, locales } from "@/i18n/config";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname() || "";

    // Detect current locale
    const currentLocale: Locale = (locales.find(l => l !== "zh" && pathname.startsWith(`/${l}/`)) || 
                                  (locales.find(l => l !== "zh" && pathname === `/${l}`) || "zh")) as Locale;

    // Multi-lingual content map
    const contentMap = {
        zh: {
            ariaLabel: "LINE 訂房助手",
            title: "訂房小助手",
            subTitle: "24 小時即時回覆",
            welcome: <>想查空房、報價、或預訂房間？<br />加入 LINE 官方帳號，AI 小幫手<span style={{ color: "var(--c-accent)" }}>即時幫您服務</span>。</>,
            features: [
                { icon: "fa-bolt", text: "即時回覆" },
                { icon: "fa-magnifying-glass", text: "查空房報價" },
                { icon: "fa-key", text: "自動發密碼" },
                { icon: "fa-gift", text: "好友優惠" },
            ],
            primaryBtn: {
                text: "加入 LINE 立即預訂",
                href: "https://lin.ee/atCiMQw",
                isLine: true,
                isEmail: false
            },
            secondaryBtn: null,
            subLinkText: "或前往查詢空房頁面 →",
            subLinkHref: "/book"
        },
        en: {
            ariaLabel: "Booking Assistant",
            title: "Booking Assistant",
            subTitle: "Support in English",
            welcome: <>Interested in checking availability, pricing, or booking a room?<br />Contact us via <span style={{ color: "var(--c-accent)" }}>Email</span> or <span style={{ color: "var(--c-accent)" }}>LINE</span>. We&apos;ll reply promptly!</>,
            features: [
                { icon: "fa-envelope", text: "24h Email Support" },
                { icon: "fa-bolt", text: "Fast Response" },
                { icon: "fa-language", text: "English Support" },
                { icon: "fa-gift", text: "Exclusive Offers" },
            ],
            primaryBtn: {
                text: "✉️ Contact via Email",
                href: "mailto:hellohouse2017@gmail.com?subject=Booking%20Inquiry%20-%20Hello%20Stay&body=Hello%20Hello%20Stay%20Team%2C%0D%0A%0D%0AI%20would%20like%20to%20inquire%20about%20your%20private%20villa%20rental%20in%20Kaohsiung.%0D%0A%0D%0A1.%20Planned%20Check-in%20Date%3A%20%0D%0A2.%20Planned%20Check-out%20Date%3A%20%0D%0A3.%20Number%20of%20Guests%3A%20%0D%0A%0D%0AThank%20you%21",
                isLine: false,
                isEmail: true
            },
            secondaryBtn: {
                text: "💬 Chat via LINE",
                href: "https://lin.ee/atCiMQw"
            },
            subLinkText: "Or Check Availability Online →",
            subLinkHref: "/en/book"
        },
        ja: {
            ariaLabel: "予約サポート",
            title: "予約アシスタント",
            subTitle: "日本語対応サポート",
            welcome: <>空室状況、料金確認、またはご予約をご希望ですか？<br /><span style={{ color: "var(--c-accent)" }}>メール</span>または<span style={{ color: "var(--c-accent)" }}>LINE</span>でお気軽にお問い合わせください。</>,
            features: [
                { icon: "fa-envelope", text: "メール対応 (24h)" },
                { icon: "fa-bolt", text: "迅速な対応" },
                { icon: "fa-comments", text: "日本語サポート" },
                { icon: "fa-gift", text: "限定特典" },
            ],
            primaryBtn: {
                text: "✉️ メールでお問い合わせ",
                href: "mailto:hellohouse2017@gmail.com?subject=%E3%80%90%E5%9F%B7%E6%B3%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B%E3%80%91Hello%20Stay&body=Hello%20Stay%20%E6%8B%85%E5%BD%93%E8%80%85%E6%A7%98%0D%0A%0D%0A%E9%AB%98%E9%9B%84%E3%81%A7%E3%81%AE%E4%B8%80%E6%A3%9F%E8%B2%B8%E3%81%97%E5%AE%BF%E6%B3%8A%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B%E3%81%84%E3%81%9F%E3%81%97%E3%81%BE%E3%81%99%E3%80%82%0D%0A%0D%0A1.%20%E3%83%81%E3%83%A7%E3%83%83%E3%82%AF%E3%82%A4%E3%83%B3%E4%BA%88%E5%AE%9A%E6%97%A5%3A%20%0D%0A2.%20%E3%83%81%E3%83%A7%E3%83%83%E3%82%AF%E3%82%A2%E3%82%A6%E3%83%88%E4%BA%88%E5%AE%9A%E6%97%A5%3A%20%0D%0A3.%20%E3%81%94%E5%AE%BF%E6%B3%8A%E4%BA%BA%E6%95%B0%3A%20%0D%0A%0D%0A%E3%82%88%E3%82%8D%E3%81%97%E3%81%8F%E3%81%8A%E9%A1%98%E3%81%84%E3%81%84%E3%81%9F%E3%81%97%E3%81%BE%E3%81%99%E3%80%82",
                isLine: false,
                isEmail: true
            },
            secondaryBtn: {
                text: "💬 公式LINEで問い合わせ",
                href: "https://lin.ee/atCiMQw"
            },
            subLinkText: "または オンライン空室検索 →",
            subLinkHref: "/ja/book"
        },
        ko: {
            ariaLabel: "예약 지원",
            title: "예약 도우미",
            subTitle: "한국어 대응 가능",
            welcome: <>공실 확인, 요금 문의 또는 예약 진행을 원하십니까?<br /><span style={{ color: "var(--c-accent)" }}>이메일</span>이나 <span style={{ color: "var(--c-accent)" }}>LINE</span>으로 언제든 문의해 주세요.</>,
            features: [
                { icon: "fa-envelope", text: "이메일 지원 (24h)" },
                { icon: "fa-bolt", text: "신속한 답변" },
                { icon: "fa-comments", text: "한국어 대응" },
                { icon: "fa-gift", text: "전용 혜택" },
            ],
            primaryBtn: {
                text: "✉️ 이메일로 문의하기",
                href: "mailto:hellohouse2017@gmail.com?subject=%5B%EC%98%88%EC%95%BD%20%EB%AC%B8%EC%9D%98%5D%20Hello%20Stay&body=Hello%20Stay%20%EB%8B%B4%EB%8B%B9%EC%9E%90%EB%8B%98%2C%0D%0A%0D%0A%EA%B0%80%EC%98%A4%EC%8A%9D%20%EB%8F%85%EC%B1%84%20%ED%8E%9C%EC%85%98%20%EC%98%88%EC%95%BD%EC%97%90%20%EB%8C%80%ED%95%B4%20%EB%AC%B8%EC%9D%98%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4.%0D%0A%0D%0A1.%20%EC%B2%B4%ED%81%AC%EC%9D%B8%20%EC%98%88%EC%A0%95%EC%9D%BC%3A%20%0D%0A2.%20%EC%B2%B4%ED%81%AC%EC%95%84%EC%9B%83%20%EC%98%88%EC%A0%95%EC%9D%BC%3A%20%0D%0A3.%20%EC%88%99%EB%B0%95%20%EC%9D%B8%EC%9B%90%3A%20%0D%0A%0D%0A%EA%B0%90%EC%82%AC%ED%95%A9%EB%8B%88%EB%8B%A4.",
                isLine: false,
                isEmail: true
            },
            secondaryBtn: {
                text: "💬 공식 LINE으로 문의하기",
                href: "https://lin.ee/atCiMQw"
            },
            subLinkText: "또는 온라인 공실 검색 →",
            subLinkHref: "/ko/book"
        },
        vi: {
            ariaLabel: "Hỗ trợ đặt phòng",
            title: "Trợ lý Đặt phòng",
            subTitle: "Hỗ trợ tiếng Việt",
            welcome: <>Kiểm tra phòng trống, báo giá hoặc đặt phòng?<br />Liên hệ qua <span style={{ color: "var(--c-accent)" }}>Email</span> hoặc <span style={{ color: "var(--c-accent)" }}>LINE</span> để hỗ trợ nhanh nhất.</>,
            features: [
                { icon: "fa-envelope", text: "Hỗ trợ Email 24h" },
                { icon: "fa-bolt", text: "Hồi đáp nhanh" },
                { icon: "fa-language", text: "Hỗ trợ tiếng Việt" },
                { icon: "fa-gift", text: "Ưu đãi độc quyền" },
            ],
            primaryBtn: {
                text: "✉️ Liên hệ qua Email",
                href: "mailto:hellohouse2017@gmail.com?subject=Y%C3%AAu%20c%E1%BA%A7u%20%C4%91%E1%BA%B7t%20ph%C3%B2ng%20-%20Hello%20Stay&body=Xin%20ch%C3%A0o%20%C4%91%E1%BB%99i%20ng%C5%A9%20Hello%20Stay%2C%0D%0A%0D%0AT%C3%B4i%20mu%E1%BB%91n%20h%E1%BB%8Fi%20v%E1%BB%81%20vi%E1%BB%87c%20thu%C3%AA%20villa%20nguy%C3%AAn%20c%C4%83n%20t%E1%BA%A1i%20Cao%20H%C3%B9ng.%0D%0A%0D%0A1.%20Ng%C3%A0y%20nh%E1%BA%ADn%20ph%C3%B2ng%3A%20%0D%0A2.%20Ng%C3%A0y%20tr%E1%BA%A3%20ph%C3%B2ng%3A%20%0D%0A3.%20Số%20lượng%20khách%3A%20%0D%0A%0D%0AXin%20c%E1%BA%A3n%20ơn%21",
                isLine: false,
                isEmail: true
            },
            secondaryBtn: {
                text: "💬 Kết nối qua LINE",
                href: "https://lin.ee/atCiMQw"
            },
            subLinkText: "Hoặc kiểm tra phòng trống →",
            subLinkHref: "/vi/book"
        }
    };

    const currentContent = contentMap[currentLocale] || contentMap.zh;

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                data-chat-toggle="true"
                className="fixed z-[998] flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                style={{
                    bottom: "30px",
                    right: "30px",
                    width: "60px",
                    height: "60px",
                    backgroundColor: "var(--c-accent)",
                    color: "white",
                    fontSize: "24px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 5px 20px rgba(197,160,101,0.4)",
                }}
                aria-label={currentContent.ariaLabel}
            >
                <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-comments"} />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="fixed z-[997] flex flex-col overflow-hidden shadow-2xl"
                    style={{
                        bottom: "100px",
                        right: "30px",
                        width: "340px",
                        maxWidth: "calc(100vw - 40px)",
                        borderRadius: "16px",
                        backgroundColor: "#1a1a1a",
                        border: "1px solid rgba(197,160,101,0.3)",
                        animation: "slideUp 0.3s ease",
                    }}
                >
                    {/* Header */}
                    <div
                        className="flex items-center gap-3 px-5 py-4 shrink-0"
                        style={{
                            background: "linear-gradient(135deg, #1a1a1a 0%, #2a2520 100%)",
                            borderBottom: "1px solid rgba(197,160,101,0.25)",
                        }}
                    >
                        <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-sm"
                            style={{ backgroundColor: "rgba(197,160,101,0.15)", color: "var(--c-accent)" }}
                        >
                            <i className="fa-solid fa-concierge-bell" />
                        </div>
                        <div>
                            <div className="font-bold text-sm" style={{ color: "var(--c-accent)" }}>{currentContent.title}</div>
                            <div className="text-[0.65rem]" style={{ color: "rgba(255,255,255,0.4)" }}>{currentContent.subTitle}</div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-5 py-4">
                        {/* Welcome */}
                        <p className="text-[0.85rem] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
                            {currentContent.welcome}
                        </p>

                        {/* Benefits */}
                        <div className="grid grid-cols-2 gap-1.5 mb-4">
                            {currentContent.features.map(item => (
                                <div
                                    key={item.text}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                                    style={{ backgroundColor: "rgba(255,255,255,0.04)", fontSize: "0.78rem", color: "rgba(255,255,255,0.55)" }}
                                >
                                    <i className={`fa-solid ${item.icon}`} style={{ color: "var(--c-accent)", fontSize: "0.7rem", opacity: 0.7 }} />
                                    {item.text}
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col gap-2">
                            {/* Primary Button */}
                            <a
                                href={currentContent.primaryBtn.href}
                                target={currentContent.primaryBtn.isEmail ? undefined : "_blank"}
                                rel={currentContent.primaryBtn.isEmail ? undefined : "noreferrer"}
                                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:brightness-110"
                                style={{
                                    background: currentContent.primaryBtn.isLine 
                                        ? "linear-gradient(135deg, #06C755 0%, #05B34B 100%)" 
                                        : "linear-gradient(135deg, var(--c-accent) 0%, #b8945a 100%)",
                                    color: currentContent.primaryBtn.isLine ? "#ffffff" : "#1a1a1a",
                                    textDecoration: "none",
                                    letterSpacing: "0.05em",
                                    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                                }}
                                onClick={() => {
                                    if (typeof window !== 'undefined') {
                                        const win = window as Window & { gtag?: (type: string, action: string, options?: Record<string, unknown>) => void };
                                        if (win.gtag) {
                                            const eventName = currentContent.primaryBtn.isEmail ? 'email_cta_click' : 'line_cta_click';
                                            win.gtag('event', eventName, { event_category: 'conversion' });
                                        }
                                    }
                                }}
                            >
                                {!currentContent.primaryBtn.isEmail && !currentContent.primaryBtn.isLine && (
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="#1a1a1a">
                                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                    </svg>
                                )}
                                {currentContent.primaryBtn.text}
                            </a>

                            {/* Secondary Button (LINE in non-ZH locales) */}
                            {currentContent.secondaryBtn && (
                                <a
                                    href={currentContent.secondaryBtn.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-300 hover:brightness-110"
                                    style={{
                                        background: "linear-gradient(135deg, #06C755 0%, #05B34B 100%)",
                                        color: "#ffffff",
                                        textDecoration: "none",
                                        letterSpacing: "0.05em",
                                        boxShadow: "0 3px 10px rgba(6, 199, 85, 0.2)",
                                    }}
                                    onClick={() => {
                                        if (typeof window !== 'undefined') {
                                            const win = window as Window & { gtag?: (type: string, action: string, options?: Record<string, unknown>) => void };
                                            if (win.gtag) {
                                                win.gtag('event', 'line_cta_click', { event_category: 'conversion' });
                                            }
                                        }
                                    }}
                                >
                                    {currentContent.secondaryBtn.text}
                                </a>
                            )}
                        </div>

                        {/* Sub link */}
                        <div className="text-center mt-3">
                            <a
                                href={currentContent.subLinkHref}
                                className="text-[0.7rem] transition-colors hover:underline"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                                {currentContent.subLinkText}
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}
