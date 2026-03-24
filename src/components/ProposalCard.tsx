"use client";

import { useState } from "react";

const PROPERTIES = [
    { id: "hellohouse", name: "你好哇寓所", capacity: "6-26人", price: "依人數彈性報價", perPerson: 0, features: "中島廚房・手動麻將" },
    { id: "godin", name: "溝頂民宿", capacity: "10-12人", price: "平日$10,000起", perPerson: 0, features: "五層獨棟・交誼廳" },
    { id: "dazhi", name: "大智若愚", capacity: "20-48人", price: "依人數彈性報價", perPerson: 0, features: "電梯大樓・可包層" },
];

const SCENARIOS = ["家庭旅遊", "朋友聚會", "公司團建", "慶生派對", "班遊", "球隊移訓", "其他"];

export default function ProposalCard() {
    const [step, setStep] = useState(0);
    const [guests, setGuests] = useState(10);
    const [dates, setDates] = useState("");
    const [scenario, setScenario] = useState("");
    const [needs, setNeeds] = useState<string[]>([]);
    const [generated, setGenerated] = useState(false);

    const recommended = guests <= 6 ? PROPERTIES[0]
        : guests <= 12 ? PROPERTIES[1]
        : guests <= 26 ? PROPERTIES[0]
        : PROPERTIES[2];

    const needOptions = ["廚房開伙", "麻將桌", "投影機", "桌遊", "停車位", "嬰兒床", "無障礙/電梯", "統編報帳"];

    const lineMessage = encodeURIComponent(
        `嗨！我想預訂包棟 🏠\n` +
        `📅 日期：${dates || "待確認"}\n` +
        `👥 人數：${guests}人\n` +
        `🎯 場景：${scenario || "未選擇"}\n` +
        `📋 需求：${needs.length ? needs.join("、") : "無特殊需求"}\n` +
        `💡 系統推薦：${recommended.name}\n` +
        `\n請幫我查空房和報價，謝謝！`
    );

    const lineUrl = `https://lin.ee/atCiMQw`;

    if (generated) {
        return (
            <div style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                borderRadius: "20px", padding: "32px", maxWidth: "480px", margin: "0 auto",
                color: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}>
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🏠</div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "4px" }}>你的包棟提案</h3>
                    <p style={{ fontSize: "0.72rem", opacity: 0.6 }}>by Hello Stay</p>
                </div>

                <div style={{
                    background: "rgba(255,255,255,0.08)", borderRadius: "14px",
                    padding: "20px", marginBottom: "16px", backdropFilter: "blur(10px)",
                }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", fontSize: "0.8rem" }}>
                        <div>
                            <div style={{ opacity: 0.5, fontSize: "0.65rem", marginBottom: "4px" }}>日期</div>
                            <div style={{ fontWeight: 600 }}>{dates || "待確認"}</div>
                        </div>
                        <div>
                            <div style={{ opacity: 0.5, fontSize: "0.65rem", marginBottom: "4px" }}>人數</div>
                            <div style={{ fontWeight: 600 }}>{guests} 人</div>
                        </div>
                        <div>
                            <div style={{ opacity: 0.5, fontSize: "0.65rem", marginBottom: "4px" }}>場景</div>
                            <div style={{ fontWeight: 600 }}>{scenario}</div>
                        </div>
                        <div>
                            <div style={{ opacity: 0.5, fontSize: "0.65rem", marginBottom: "4px" }}>每人預估</div>
                            <div style={{ fontWeight: 600, color: "#06C755" }}>
                                {recommended.perPerson ? `$${recommended.perPerson}起` : "依報價"}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    background: "rgba(6,199,85,0.12)", borderRadius: "14px",
                    padding: "16px", marginBottom: "16px", border: "1px solid rgba(6,199,85,0.2)",
                }}>
                    <div style={{ fontSize: "0.7rem", opacity: 0.6, marginBottom: "8px" }}>💡 系統推薦</div>
                    <div style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "4px" }}>{recommended.name}</div>
                    <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                        {recommended.capacity}｜{recommended.features}
                    </div>
                </div>

                {needs.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "0.7rem", opacity: 0.5, marginBottom: "8px" }}>需求清單</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            {needs.map(n => (
                                <span key={n} style={{
                                    fontSize: "0.68rem", padding: "4px 10px",
                                    background: "rgba(255,255,255,0.1)", borderRadius: "20px",
                                }}>✓ {n}</span>
                            ))}
                        </div>
                    </div>
                )}

                <a href={lineUrl} target="_blank" rel="noopener noreferrer" style={{
                    display: "block", textAlign: "center", padding: "14px",
                    background: "#06C755", color: "#fff", borderRadius: "12px",
                    fontSize: "0.9rem", fontWeight: 700, textDecoration: "none",
                    marginBottom: "10px",
                }}>
                    💬 用 LINE 發送這個提案
                </a>

                <button onClick={() => { setGenerated(false); setStep(0); }} style={{
                    display: "block", width: "100%", padding: "10px",
                    background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff", borderRadius: "12px", fontSize: "0.78rem",
                    cursor: "pointer", opacity: 0.6,
                }}>
                    重新填寫
                </button>
            </div>
        );
    }

    return (
        <div style={{
            background: "#fff", borderRadius: "20px", padding: "32px",
            maxWidth: "480px", margin: "0 auto",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
        }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#2a2a2a", marginBottom: "6px" }}>
                    30秒產出包棟提案
                </h3>
                <p style={{ fontSize: "0.75rem", color: "#999" }}>選完直接傳 LINE 給朋友決定</p>
                {/* Progress bar */}
                <div style={{ display: "flex", gap: "4px", marginTop: "16px" }}>
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} style={{
                            flex: 1, height: "3px", borderRadius: "2px",
                            background: i <= step ? "#06C755" : "#E8E0D4",
                            transition: "background 0.3s",
                        }} />
                    ))}
                </div>
            </div>

            {/* Step 0: Guests */}
            {step === 0 && (
                <div>
                    <label style={{ fontSize: "0.85rem", color: "#555", fontWeight: 500 }}>
                        👥 幾個人入住？
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "16px 0" }}>
                        <button onClick={() => setGuests(Math.max(2, guests - 1))} style={btnStyle}>−</button>
                        <span style={{ fontSize: "2rem", fontWeight: 700, color: "#2a2a2a", minWidth: "60px", textAlign: "center" }}>{guests}</span>
                        <button onClick={() => setGuests(Math.min(48, guests + 1))} style={btnStyle}>+</button>
                    </div>
                    <input type="range" min={2} max={48} value={guests} onChange={e => setGuests(+e.target.value)}
                        style={{ width: "100%", accentColor: "#06C755" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "#bbb", marginTop: "4px" }}>
                        <span>2人</span><span>12人</span><span>26人</span><span>48人</span>
                    </div>
                    <button onClick={() => setStep(1)} style={nextBtnStyle}>下一步 →</button>
                </div>
            )}

            {/* Step 1: Dates */}
            {step === 1 && (
                <div>
                    <label style={{ fontSize: "0.85rem", color: "#555", fontWeight: 500 }}>
                        📅 預計入住日期
                    </label>
                    <input type="date" value={dates} onChange={e => setDates(e.target.value)}
                        style={{
                            width: "100%", padding: "14px", marginTop: "12px",
                            border: "2px solid #E8E0D4", borderRadius: "12px",
                            fontSize: "1rem", outline: "none",
                        }} />
                    <p style={{ fontSize: "0.72rem", color: "#bbb", marginTop: "8px" }}>
                        💡 平日（週一至四）更便宜，約省 30%
                    </p>
                    <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                        <button onClick={() => setStep(0)} style={{ ...nextBtnStyle, background: "#eee", color: "#666", flex: 1 }}>← 上一步</button>
                        <button onClick={() => setStep(2)} style={{ ...nextBtnStyle, flex: 2 }}>下一步 →</button>
                    </div>
                </div>
            )}

            {/* Step 2: Scenario */}
            {step === 2 && (
                <div>
                    <label style={{ fontSize: "0.85rem", color: "#555", fontWeight: 500 }}>
                        🎯 這次旅行的目的？
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "12px" }}>
                        {SCENARIOS.map(s => (
                            <button key={s} onClick={() => setScenario(s)} style={{
                                padding: "12px", borderRadius: "10px",
                                border: scenario === s ? "2px solid #06C755" : "1px solid #E8E0D4",
                                background: scenario === s ? "#E8F5E9" : "#fff",
                                fontSize: "0.82rem", cursor: "pointer", color: "#444",
                            }}>{s}</button>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                        <button onClick={() => setStep(1)} style={{ ...nextBtnStyle, background: "#eee", color: "#666", flex: 1 }}>← 上一步</button>
                        <button onClick={() => setStep(3)} disabled={!scenario} style={{ ...nextBtnStyle, flex: 2, opacity: scenario ? 1 : 0.4 }}>下一步 →</button>
                    </div>
                </div>
            )}

            {/* Step 3: Needs */}
            {step === 3 && (
                <div>
                    <label style={{ fontSize: "0.85rem", color: "#555", fontWeight: 500 }}>
                        📋 特殊需求（可多選）
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "12px" }}>
                        {needOptions.map(n => (
                            <button key={n} onClick={() => setNeeds(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])} style={{
                                padding: "10px", borderRadius: "10px",
                                border: needs.includes(n) ? "2px solid #06C755" : "1px solid #E8E0D4",
                                background: needs.includes(n) ? "#E8F5E9" : "#fff",
                                fontSize: "0.78rem", cursor: "pointer", color: "#444",
                            }}>{needs.includes(n) ? "✓ " : ""}{n}</button>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                        <button onClick={() => setStep(2)} style={{ ...nextBtnStyle, background: "#eee", color: "#666", flex: 1 }}>← 上一步</button>
                        <button onClick={() => setGenerated(true)} style={{
                            ...nextBtnStyle, flex: 2, background: "#06C755",
                            fontSize: "0.9rem", fontWeight: 700,
                        }}>✨ 產生提案</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const btnStyle: React.CSSProperties = {
    width: "44px", height: "44px", borderRadius: "50%",
    border: "2px solid #E8E0D4", background: "#fff",
    fontSize: "1.2rem", cursor: "pointer", color: "#2a2a2a",
};

const nextBtnStyle: React.CSSProperties = {
    width: "100%", padding: "14px", marginTop: "16px",
    background: "#2a2a2a", color: "#fff", border: "none",
    borderRadius: "12px", fontSize: "0.85rem",
    cursor: "pointer", fontWeight: 500,
};
