"use client";
import { useState } from "react";

const BNB_API = process.env.NEXT_PUBLIC_BNB_API || "https://bnb-mgmt-system.vercel.app";

interface AvailResult {
    bnbName: string;
    available: boolean;
}

export default function BookingPage() {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<AvailResult[] | null>(null);
    const [error, setError] = useState("");

    // Min date = today
    const today = new Date().toISOString().split("T")[0];

    const handleCheck = async () => {
        if (!checkIn || !checkOut) {
            setError("請選擇入住和退房日期");
            return;
        }
        if (checkOut <= checkIn) {
            setError("退房日期必須晚於入住日期");
            return;
        }
        setError("");
        setLoading(true);
        setResults(null);

        try {
            const res = await fetch(
                `${BNB_API}/api/web/availability?checkIn=${checkIn}&checkOut=${checkOut}`
            );
            const data = await res.json();
            if (data.error) {
                setError(data.error);
            } else {
                setResults(data.results);
            }
        } catch {
            setError("查詢失敗，請稍後再試");
        } finally {
            setLoading(false);
        }
    };

    const nights = checkIn && checkOut && checkOut > checkIn
        ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
        : 0;

    const openChat = () => {
        const chatBtn = document.querySelector("[data-chat-toggle]") as HTMLButtonElement;
        if (chatBtn) chatBtn.click();
    };

    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "#F8F6F3", minHeight: "100vh" }}>
            <div className="w" style={{ maxWidth: "600px", padding: "0 28px 80px" }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "50px" }}>
                    <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "12px" }}>
                        Check Availability
                    </div>
                    <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>
                        查詢空房
                    </h1>
                    <div style={{ width: "40px", height: "1px", background: "#C8AD7F", margin: "20px auto" }} />
                    <p style={{ fontSize: "0.88rem", color: "#999", lineHeight: 1.9 }}>
                        選擇日期即時查看兩館空房狀況
                    </p>
                </div>

                {/* Date Picker */}
                <div style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", marginBottom: "24px" }}>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                        <div>
                            <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "var(--en)", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "8px" }}>
                                入住日期
                            </label>
                            <input
                                type="date"
                                value={checkIn}
                                min={today}
                                onChange={e => { setCheckIn(e.target.value); setResults(null); }}
                                style={{
                                    width: "100%", padding: "14px 16px", border: "1px solid #e5e2dd",
                                    borderRadius: "10px", fontSize: "0.95rem", fontFamily: "var(--sans)",
                                    color: "#2a2a2a", outline: "none", transition: "border 0.3s",
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "var(--en)", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "8px" }}>
                                退房日期
                            </label>
                            <input
                                type="date"
                                value={checkOut}
                                min={checkIn || today}
                                onChange={e => { setCheckOut(e.target.value); setResults(null); }}
                                style={{
                                    width: "100%", padding: "14px 16px", border: "1px solid #e5e2dd",
                                    borderRadius: "10px", fontSize: "0.95rem", fontFamily: "var(--sans)",
                                    color: "#2a2a2a", outline: "none", transition: "border 0.3s",
                                }}
                            />
                        </div>
                    </div>

                    {nights > 0 && (
                        <p style={{ fontSize: "0.82rem", color: "#aaa", textAlign: "center", marginBottom: "20px" }}>
                            共 {nights} 晚
                        </p>
                    )}

                    <button
                        onClick={handleCheck}
                        disabled={loading || !checkIn || !checkOut}
                        style={{
                            width: "100%", padding: "16px", border: "none", borderRadius: "10px",
                            background: loading ? "#ddd" : "#161618", color: "#fff",
                            fontFamily: "var(--serif)", fontSize: "0.9rem", letterSpacing: "0.1em",
                            cursor: loading ? "not-allowed" : "pointer", transition: "all 0.3s",
                        }}
                    >
                        {loading ? "查詢中⋯" : "查詢空房"}
                    </button>

                    {error && (
                        <p style={{ color: "#c44", fontSize: "0.85rem", textAlign: "center", marginTop: "16px" }}>
                            {error}
                        </p>
                    )}
                </div>

                {/* Results */}
                {results && (
                    <div style={{ animation: "fadeInUp 0.5s ease" }}>
                        <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", marginBottom: "24px" }}>
                            <div style={{ fontSize: "0.72rem", fontFamily: "var(--en)", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "16px" }}>
                                {checkIn} → {checkOut} · {nights} 晚
                            </div>

                            {results.map(r => (
                                <div key={r.bnbName} style={{
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    padding: "18px 0",
                                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                                }}>
                                    <div>
                                        <div style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", color: "#2a2a2a", marginBottom: "2px" }}>
                                            {r.bnbName}
                                        </div>
                                        <div style={{ fontSize: "0.78rem", color: "#aaa" }}>
                                            {r.bnbName === "你好哇寓所" ? "6-26人" : "6-12人"}
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: "6px 16px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 500,
                                        background: r.available ? "rgba(76,175,80,0.08)" : "rgba(244,67,54,0.06)",
                                        color: r.available ? "#2e7d32" : "#c62828",
                                    }}>
                                        {r.available ? "✓ 有空房" : "✕ 已滿房"}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        {results.some(r => r.available) && (
                            <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", textAlign: "center" }}>
                                <p style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", color: "#2a2a2a", marginBottom: "6px" }}>
                                    太好了，有空房！
                                </p>
                                <p style={{ fontSize: "0.82rem", color: "#999", marginBottom: "24px" }}>
                                    請透過以下方式完成預訂
                                </p>
                                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                                    <button onClick={openChat} style={{
                                        padding: "14px 28px", border: "1px solid #161618", borderRadius: "10px",
                                        background: "#161618", color: "#fff", fontFamily: "var(--serif)",
                                        fontSize: "0.85rem", letterSpacing: "0.08em", cursor: "pointer",
                                        transition: "all 0.3s",
                                    }}>
                                        💬 線上諮詢預訂
                                    </button>
                                    <a href="https://lin.ee/atCiMQw" target="_blank" rel="noreferrer" style={{
                                        display: "inline-flex", alignItems: "center",
                                        padding: "14px 28px", border: "1px solid #06C755", borderRadius: "10px",
                                        background: "#06C755", color: "#fff", fontFamily: "var(--serif)",
                                        fontSize: "0.85rem", letterSpacing: "0.08em",
                                        transition: "all 0.3s",
                                    }}>
                                        LINE 預訂
                                    </a>
                                </div>
                            </div>
                        )}

                        {results.every(r => !r.available) && (
                            <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", textAlign: "center" }}>
                                <p style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", color: "#2a2a2a", marginBottom: "6px" }}>
                                    很抱歉，這段日期已滿房
                                </p>
                                <p style={{ fontSize: "0.82rem", color: "#999", marginBottom: "20px" }}>
                                    建議更換日期，或聯繫我們協助安排
                                </p>
                                <button onClick={openChat} style={{
                                    padding: "14px 28px", border: "1px solid #161618", borderRadius: "10px",
                                    background: "transparent", color: "#2a2a2a", fontFamily: "var(--serif)",
                                    fontSize: "0.85rem", letterSpacing: "0.08em", cursor: "pointer",
                                }}>
                                    💬 聯繫我們
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
