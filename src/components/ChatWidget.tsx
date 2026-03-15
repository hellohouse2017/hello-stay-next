"use client";
import { useState } from "react";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    const lineUrl = "https://lin.ee/atCiMQw";

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
                aria-label="LINE 訂房助手"
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
                            <div className="font-bold text-sm" style={{ color: "var(--c-accent)" }}>訂房小助手</div>
                            <div className="text-[0.65rem]" style={{ color: "rgba(255,255,255,0.4)" }}>24 小時即時回覆</div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-5 py-4">
                        {/* Welcome */}
                        <p className="text-[0.85rem] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
                            想查空房、報價、或預訂房間？<br />
                            加入 LINE 官方帳號，AI 小幫手<span style={{ color: "var(--c-accent)" }}>即時幫您服務</span>。
                        </p>

                        {/* Benefits */}
                        <div className="grid grid-cols-2 gap-1.5 mb-4">
                            {[
                                { icon: "fa-bolt", text: "即時回覆" },
                                { icon: "fa-magnifying-glass", text: "查空房報價" },
                                { icon: "fa-key", text: "自動發密碼" },
                                { icon: "fa-gift", text: "好友優惠" },
                            ].map(item => (
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

                        {/* LINE CTA */}
                        <a
                            href={lineUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:brightness-110"
                            style={{
                                background: "linear-gradient(135deg, var(--c-accent) 0%, #b8945a 100%)",
                                color: "#1a1a1a",
                                textDecoration: "none",
                                letterSpacing: "0.05em",
                                boxShadow: "0 4px 14px rgba(197,160,101,0.25)",
                            }}
                        >
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="#1a1a1a">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                            </svg>
                            加入 LINE 立即預訂
                        </a>

                        {/* Sub link */}
                        <div className="text-center mt-3">
                            <a
                                href="/book"
                                className="text-[0.7rem] transition-colors hover:underline"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                                或前往查詢空房頁面 →
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
