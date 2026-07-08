"use client";

import { useState } from "react";

const PROPERTIES = [
    { id: "hellohouse", name: "你好哇寓所", capacity: "6-26人", price: "依人數彈性報價", perPerson: 0, features: "中島廚房・手動麻將" },
    { id: "godin", name: "溝頂民宿", capacity: "4-12人", price: "平日$8,000起", perPerson: 0, features: "五層獨棟・交誼廳" },
    { id: "dazhi", name: "大智若愚", capacity: "規劃中", price: "尚未開放訂房", perPerson: 0, features: "電梯大樓・未來可包層" },
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

    const lineUrl = `https://line.me/R/msg/text/?${lineMessage}`;

    if (generated) {
        return (
            <div className="proposal-card proposal-card--done">
                <div className="proposal-card__header">
                    <span className="proposal-card__eyebrow">Hello Stay Proposal</span>
                    <h3>你的包棟提案</h3>
                    <p>確認後可直接用 LINE 傳給管家</p>
                </div>

                <div className="proposal-summary">
                    <div>
                        <span>日期</span>
                        <strong>{dates || "待確認"}</strong>
                    </div>
                    <div>
                        <span>人數</span>
                        <strong>{guests} 人</strong>
                    </div>
                    <div>
                        <span>場景</span>
                        <strong>{scenario}</strong>
                    </div>
                    <div>
                        <span>報價</span>
                        <strong>{recommended.perPerson ? `$${recommended.perPerson}起` : "依報價"}</strong>
                    </div>
                </div>

                <div className="proposal-recommendation">
                    <span>推薦館別</span>
                    <strong>{recommended.name}</strong>
                    <p>
                        {recommended.capacity}｜{recommended.features}
                    </p>
                </div>

                {needs.length > 0 && (
                    <div className="proposal-needs">
                        <span>需求清單</span>
                        <div>
                            {needs.map(n => (
                                <small key={n}>{n}</small>
                            ))}
                        </div>
                    </div>
                )}

                <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="proposal-line">
                    用 LINE 發送這個提案
                </a>

                <button onClick={() => { setGenerated(false); setStep(0); }} className="proposal-secondary">
                    重新填寫
                </button>
            </div>
        );
    }

    return (
        <div className="proposal-card">
            <div className="proposal-card__header">
                <span className="proposal-card__eyebrow">Quick Proposal</span>
                <h3>30 秒產出包棟提案</h3>
                <p>用真實日期、人數與需求，整理成 LINE 聯絡訊息</p>
                <div className="proposal-progress" aria-label={`目前第 ${step + 1} 步，共 4 步`}>
                    {[0, 1, 2, 3].map(i => (
                        <span key={i} className={i <= step ? "active" : ""} />
                    ))}
                </div>
            </div>

            {step === 0 && (
                <div className="proposal-step">
                    <label>幾個人入住？</label>
                    <div className="proposal-counter">
                        <button onClick={() => setGuests(Math.max(2, guests - 1))}>−</button>
                        <strong>{guests}</strong>
                        <button onClick={() => setGuests(Math.min(48, guests + 1))}>+</button>
                    </div>
                    <input type="range" min={2} max={48} value={guests} onChange={e => setGuests(+e.target.value)}
                        className="proposal-range" />
                    <div className="proposal-scale">
                        <span>2人</span><span>12人</span><span>26人</span><span>48人</span>
                    </div>
                    <button onClick={() => setStep(1)} className="proposal-primary">下一步</button>
                </div>
            )}

            {step === 1 && (
                <div className="proposal-step">
                    <label>預計入住日期</label>
                    <input type="date" value={dates} onChange={e => setDates(e.target.value)}
                        className="proposal-input" />
                    <p>平日通常比較好安排，也更容易取得優惠報價。</p>
                    <div className="proposal-actions">
                        <button onClick={() => setStep(0)} className="proposal-secondary">上一步</button>
                        <button onClick={() => setStep(2)} className="proposal-primary">下一步</button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="proposal-step">
                    <label>這次旅行的目的？</label>
                    <div className="proposal-options">
                        {SCENARIOS.map(s => (
                            <button key={s} onClick={() => setScenario(s)} className={scenario === s ? "active" : ""}>{s}</button>
                        ))}
                    </div>
                    <div className="proposal-actions">
                        <button onClick={() => setStep(1)} className="proposal-secondary">上一步</button>
                        <button onClick={() => setStep(3)} disabled={!scenario} className="proposal-primary">下一步</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="proposal-step">
                    <label>特殊需求（可多選）</label>
                    <div className="proposal-options">
                        {needOptions.map(n => (
                            <button key={n} onClick={() => setNeeds(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])} className={needs.includes(n) ? "active" : ""}>{n}</button>
                        ))}
                    </div>
                    <div className="proposal-actions">
                        <button onClick={() => setStep(2)} className="proposal-secondary">上一步</button>
                        <button onClick={() => setGenerated(true)} className="proposal-line">產生提案</button>
                    </div>
                </div>
            )}
        </div>
    );
}
