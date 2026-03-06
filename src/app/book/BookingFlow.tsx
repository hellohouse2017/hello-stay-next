"use client";
import { useState, useRef, useEffect, useCallback } from "react";

/* ====== 方案資料（與原 check.html 一致）====== */
const ROOM_PLANS: Record<string, Plan[]> = {
    hello: [
        { title: "3房包棟 (8人)", priceWeekday: 16000, priceWeekend: 20000, capacity: "8人", detail: "配置：3房 (2/2/4)" },
        { title: "4房包棟 (14人)", priceWeekday: 20000, priceWeekend: 24000, capacity: "14人", detail: "配置：4房 (2/2/4/6)" },
        { title: "5房包棟 (16人)", priceWeekday: 22000, priceWeekend: 26000, capacity: "16人", detail: "配置：5房 (2/2/2/4/6)" },
        { title: "5+1房包棟 (22人)", priceWeekday: 26000, priceWeekend: 30000, capacity: "22人", detail: "配置：5+1房 (2/2/2/4/6/6)" },
        { title: "5+1房+加床 (26人)", priceWeekday: 30000, priceWeekend: 36000, capacity: "26人", detail: "配置：全棟加床使用" },
    ],
    gouding: [
        { title: "3房包棟 (10人)", priceWeekday: 10000, priceWeekend: 14000, capacity: "10人", detail: "配置：3房 (2/4/4)" },
        { title: "4房包棟 (12人)", priceWeekday: 12000, priceWeekend: 16000, capacity: "12人", detail: "配置：4房 (2/4/4/2)" },
    ],
    double: [
        { title: "雙館聯賣包棟 (32-38人)", priceWeekday: 42000, priceWeekend: 52000, capacity: "38人", detail: "包含：你好哇(26人) + 溝頂(12人)" },
    ],
};

const GAS_URL = "https://script.google.com/macros/s/AKfycbzfqpbILo5s6P0593PcdpYVie5cbyYGhxe83-Xbzs5QHymN6uNwo37ziT0As6zj1tZk1w/exec";
const BNB_API = process.env.NEXT_PUBLIC_BNB_API || "https://bnb-mgmt-system.vercel.app";

interface Plan {
    title: string;
    priceWeekday: number;
    priceWeekend: number;
    capacity: string;
    detail: string;
}

interface VenueStatus {
    key: string;
    name: string;
    available: boolean;
    sub: string;
}

type GuestRange = "small" | "medium" | "large" | "";

const guestOptions = [
    { key: "small" as const, label: "6 - 12 人", sub: "你好哇 / 溝頂皆可" },
    { key: "medium" as const, label: "13 - 26 人", sub: "你好哇寓所" },
    { key: "large" as const, label: "27 - 38 人", sub: "雙館包棟 (聯賣)" },
];

function formatDate(d: Date) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function calcWeekdaysWeekends(start: Date, end: Date) {
    let weekdays = 0, weekends = 0;
    const cur = new Date(start);
    while (cur < end) {
        const day = cur.getDay();
        if (day === 5 || day === 6) weekends++;
        else weekdays++;
        cur.setDate(cur.getDate() + 1);
    }
    return { weekdays, weekends };
}

export default function BookingFlow() {
    const [step, setStep] = useState(1);
    const [guestRange, setGuestRange] = useState<GuestRange>("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [loading, setLoading] = useState(false);
    const [venues, setVenues] = useState<VenueStatus[]>([]);
    const [selectedVenue, setSelectedVenue] = useState("");
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [calc, setCalc] = useState({ weekdays: 0, weekends: 0 });
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const step2Ref = useRef<HTMLDivElement>(null);
    const step3Ref = useRef<HTMLDivElement>(null);
    const step4Ref = useRef<HTMLDivElement>(null);
    const step5Ref = useRef<HTMLDivElement>(null);

    /* ---- Step 1: Select guests ---- */
    const handleGuestSelect = (range: GuestRange) => {
        setGuestRange(range);
        setStep(2);
        setVenues([]);
        setSelectedVenue("");
        setSelectedPlan(null);
        setTimeout(() => step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
    };

    /* ---- Step 2: Query availability ---- */
    const handleQuery = useCallback(async () => {
        if (!checkIn || !checkOut || !guestRange) return;
        setLoading(true);
        setVenues([]);
        setSelectedVenue("");
        setSelectedPlan(null);
        setStep(2);

        try {
            const res = await fetch(`${GAS_URL}?start=${checkIn}&end=${checkOut}`);
            const data = await res.json();
            const status = data.status;

            let results: VenueStatus[] = [];
            if (guestRange === "small") {
                results = [
                    { key: "hello", name: "你好哇寓所 (主館)", available: status.hello.available, sub: "Hello House" },
                    { key: "gouding", name: "溝頂民宿 (二館)", available: status.gouding.available, sub: "Godin House" },
                ];
            } else if (guestRange === "medium") {
                results = [{ key: "hello", name: "你好哇寓所 (主館)", available: status.hello.available, sub: "Hello House" }];
            } else {
                const both = status.hello.available && status.gouding.available;
                results = [{ key: "double", name: "雙館聯賣包棟", available: both, sub: "你好哇 + 溝頂" }];
            }
            setVenues(results);
            setStep(3);
            setTimeout(() => step3Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
        } catch {
            alert("連線錯誤，請稍後再試");
        } finally {
            setLoading(false);
        }
    }, [checkIn, checkOut, guestRange]);

    /* ---- Step 3: Select venue → show plans ---- */
    const handleVenueSelect = (v: VenueStatus) => {
        if (!v.available) return;
        setSelectedVenue(v.key);
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const c = calcWeekdaysWeekends(start, end);
        setCalc(c);
        setStep(4);
        setTimeout(() => step4Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
    };

    /* ---- Step 4: Select plan ---- */
    const handlePlanSelect = (plan: Plan) => {
        setSelectedPlan(plan);
        const total = calc.weekdays * plan.priceWeekday + calc.weekends * plan.priceWeekend;
        setTotalPrice(total);
        setStep(5);
        setTimeout(() => step5Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
    };

    /* ---- Step 5: Submit ---- */
    const handleSubmit = async () => {
        if (!name || !phone) {
            alert("請填寫姓名與電話");
            return;
        }
        setSubmitting(true);

        try {
            // 送到 bnb-mgmt-system API（如果可用）
            const venueName = venues.find(v => v.key === selectedVenue)?.name || selectedVenue;
            const orderData = {
                source: "web",
                checkIn,
                checkOut,
                guestCount: parseInt(selectedPlan?.capacity || "0"),
                bnbName: venueName,
                planTitle: selectedPlan?.title,
                totalPrice,
                customerName: name,
                customerPhone: phone,
                customerEmail: email,
            };

            // Try sending to bnb-mgmt-system API
            try {
                await fetch(`${BNB_API}/api/web/order`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderData),
                });
            } catch {
                // Fallback: at minimum log it
                console.log("BNB API unavailable, order data:", orderData);
            }

            setSubmitted(true);
        } catch {
            alert("提交失敗，請稍後再試");
        } finally {
            setSubmitting(false);
        }
    };

    /* ---- Min Date ---- */
    const today = new Date();
    const minDate = formatDate(today);

    useEffect(() => {
        if (checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            if (end <= start) {
                const next = new Date(start);
                next.setDate(next.getDate() + 1);
                setCheckOut(formatDate(next));
            }
        }
    }, [checkIn, checkOut]);

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-[70px]" style={{ background: "#F5F5F5" }}>
                <div className="text-center px-6 py-16 max-w-[500px]">
                    <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl" style={{ backgroundColor: "var(--c-accent)" }}>
                        <i className="fa-solid fa-check" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-serif)" }}>詢價單已送出！</h2>
                    <p className="mb-2" style={{ color: "var(--c-text-gray)" }}>
                        感謝 <strong>{name}</strong> 的詢問，管家會盡快回覆您。
                    </p>
                    <div className="mt-6 p-6 rounded-lg text-left text-sm" style={{ backgroundColor: "white", border: "1px solid #eee" }}>
                        <div className="mb-2"><strong>📅 日期：</strong>{checkIn} ~ {checkOut}</div>
                        <div className="mb-2"><strong>🏨 館別：</strong>{venues.find(v => v.key === selectedVenue)?.name}</div>
                        <div className="mb-2"><strong>🛏️ 方案：</strong>{selectedPlan?.title}</div>
                        <div className="mb-2"><strong>💰 預估價格：</strong>${totalPrice.toLocaleString()}</div>
                        <div className="mb-2"><strong>👤 姓名：</strong>{name}</div>
                        <div><strong>📱 電話：</strong>{phone}</div>
                        {email && <div className="mt-2"><strong>📧 Email：</strong>{email}</div>}
                    </div>
                    <p className="mt-6 text-sm" style={{ color: "#999" }}>
                        <i className="fa-solid fa-bell mr-1" style={{ color: "var(--c-accent)" }} />
                        管家收到後將透過電話或 Email 聯繫您確認訂房
                    </p>
                    <button
                        onClick={() => { setSubmitted(false); setStep(1); setGuestRange(""); setVenues([]); setSelectedVenue(""); setSelectedPlan(null); setName(""); setPhone(""); setEmail(""); }}
                        className="btn btn-gold mt-8"
                    >
                        再查詢其他日期
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-[70px]" style={{ background: "#F5F5F5" }}>
            {/* Header */}
            <div className="text-center text-white py-10 px-5 mb-8" style={{ backgroundColor: "var(--c-primary)" }}>
                <h1 className="text-[1.8rem] tracking-wider font-medium m-0" style={{ fontFamily: "var(--font-serif)" }}>
                    房況查詢與報價
                </h1>
                <p className="text-[0.8rem] mt-1 uppercase tracking-widest" style={{ color: "var(--c-accent)" }}>
                    Check Availability & Price
                </p>
            </div>

            <div className="w-[95%] max-w-[800px] mx-auto -mt-16 relative z-10 mb-10">
                <div className="bg-white p-10 rounded shadow-lg" style={{ borderTop: "6px solid var(--c-accent)" }}>

                    {/* ===== STEP 1: Guest Count ===== */}
                    <div>
                        <div className="flex items-center justify-between mb-5 pl-4 border-l-4" style={{ borderColor: "var(--c-accent)", fontFamily: "var(--font-serif)", fontSize: "1.2rem" }}>
                            <span>01. 預計入住人數</span>
                            <i className="fa-solid fa-users" style={{ color: "var(--c-accent)" }} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                            {guestOptions.map(o => (
                                <button
                                    key={o.key}
                                    onClick={() => handleGuestSelect(o.key)}
                                    className={`p-4 rounded-lg border text-center cursor-pointer transition-all relative ${guestRange === o.key
                                            ? "border-2 shadow-md"
                                            : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-[#C5A065]"
                                        }`}
                                    style={guestRange === o.key ? { borderColor: "var(--c-accent)", background: "var(--c-accent-light)" } : {}}
                                >
                                    {guestRange === o.key && (
                                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-[0.6rem]" style={{ backgroundColor: "var(--c-accent)" }}>
                                            <i className="fa-solid fa-check" />
                                        </div>
                                    )}
                                    <h4 className="m-0 text-[0.95rem] font-bold" style={{ fontFamily: "var(--font-serif)" }}>{o.label}</h4>
                                    <span className="text-[0.75rem] text-gray-400 block mt-1">{o.sub}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ===== STEP 2: Dates ===== */}
                    {step >= 2 && (
                        <div ref={step2Ref} className="border-t border-dashed border-gray-200 mt-8 pt-6 animate-fadeIn">
                            <div className="flex items-center justify-between mb-5 pl-4 border-l-4" style={{ borderColor: "var(--c-accent)", fontFamily: "var(--font-serif)", fontSize: "1.2rem" }}>
                                <span>02. 查詢檔期</span>
                                <i className="fa-regular fa-calendar" style={{ color: "var(--c-accent)" }} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                <div>
                                    <label className="block text-[0.85rem] text-gray-500 mb-2 font-semibold uppercase tracking-wider">入住日期</label>
                                    <input
                                        type="date"
                                        value={checkIn}
                                        min={minDate}
                                        onChange={e => setCheckIn(e.target.value)}
                                        className="w-full p-3 text-base border border-gray-200 rounded bg-gray-50 focus:outline-none focus:border-[#C5A065] focus:bg-white transition"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[0.85rem] text-gray-500 mb-2 font-semibold uppercase tracking-wider">退房日期</label>
                                    <input
                                        type="date"
                                        value={checkOut}
                                        min={checkIn || minDate}
                                        onChange={e => setCheckOut(e.target.value)}
                                        className="w-full p-3 text-base border border-gray-200 rounded bg-gray-50 focus:outline-none focus:border-[#C5A065] focus:bg-white transition"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleQuery}
                                disabled={!checkIn || !checkOut || loading}
                                className="w-full py-4 rounded-full text-white font-bold text-base tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ backgroundColor: loading ? "#bbb" : "var(--c-accent)" }}
                            >
                                {loading ? (
                                    <>
                                        <i className="fa-solid fa-circle-notch fa-spin" />
                                        系統正在確認即時房況...
                                    </>
                                ) : (
                                    <>
                                        查詢即時房況
                                        <i className="fa-solid fa-magnifying-glass" />
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* ===== STEP 3: Venue Results ===== */}
                    {step >= 3 && venues.length > 0 && (
                        <div ref={step3Ref} className="border-t border-dashed border-gray-200 mt-8 pt-6 animate-fadeIn">
                            <div className="flex items-center justify-between mb-5 pl-4 border-l-4" style={{ borderColor: "var(--c-accent)", fontFamily: "var(--font-serif)", fontSize: "1.2rem" }}>
                                <span>03. 選擇場館</span>
                                <i className="fa-solid fa-hotel" style={{ color: "var(--c-accent)" }} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {venues.map(v => (
                                    <button
                                        key={v.key}
                                        onClick={() => handleVenueSelect(v)}
                                        disabled={!v.available}
                                        className={`p-4 rounded-lg border text-center transition-all relative flex flex-col justify-between ${!v.available
                                                ? "opacity-60 cursor-not-allowed bg-gray-100 border-dashed"
                                                : selectedVenue === v.key
                                                    ? "border-2 shadow-md"
                                                    : "border-gray-200 bg-white hover:bg-[#FFFCF5] hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                                            }`}
                                        style={selectedVenue === v.key ? { borderColor: "var(--c-accent)", background: "var(--c-accent-light)" } : {}}
                                    >
                                        <h4 className="m-0 text-base font-bold" style={{ fontFamily: "var(--font-serif)" }}>{v.name}</h4>
                                        <span className="text-[0.8rem] text-gray-400 block mt-1">{v.sub}</span>
                                        <div className={`mt-2 text-[0.8rem] font-bold ${v.available ? "text-[#C5A065]" : "text-red-500"}`}>
                                            {v.available ? (
                                                <><i className="fa-solid fa-circle-check mr-1" /> 立即預訂</>
                                            ) : (
                                                <><i className="fa-solid fa-circle-xmark mr-1" /> 已滿房</>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ===== STEP 4: Plans ===== */}
                    {step >= 4 && selectedVenue && (
                        <div ref={step4Ref} className="border-t border-dashed border-gray-200 mt-8 pt-6 animate-fadeIn">
                            <div className="flex items-center justify-between mb-5 pl-4 border-l-4" style={{ borderColor: "var(--c-accent)", fontFamily: "var(--font-serif)", fontSize: "1.2rem" }}>
                                <span>04. 選擇方案</span>
                                <i className="fa-solid fa-bed" style={{ color: "var(--c-accent)" }} />
                            </div>
                            <div className="space-y-4">
                                {(ROOM_PLANS[selectedVenue] || []).map(plan => {
                                    const total = calc.weekdays * plan.priceWeekday + calc.weekends * plan.priceWeekend;
                                    const isSelected = selectedPlan?.title === plan.title;
                                    return (
                                        <button
                                            key={plan.title}
                                            onClick={() => handlePlanSelect(plan)}
                                            className={`w-full text-left p-5 rounded-lg border transition-all relative ${isSelected
                                                    ? "border-2 shadow-md"
                                                    : "border-gray-200 bg-white hover:border-[#C5A065] hover:bg-[#FFFCF5] cursor-pointer"
                                                }`}
                                            style={isSelected ? { borderColor: "var(--c-accent)", background: "var(--c-accent-light)" } : {}}
                                        >
                                            {isSelected && (
                                                <div className="absolute -top-2.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-[0.7rem]" style={{ backgroundColor: "var(--c-accent)" }}>
                                                    <i className="fa-solid fa-check" />
                                                </div>
                                            )}
                                            <span className="absolute top-4 right-4 bg-gray-100 py-0.5 px-2 rounded text-[0.75rem] text-gray-500 font-bold">{plan.capacity}</span>
                                            <div className="font-bold text-[1.1rem]" style={{ fontFamily: "var(--font-serif)" }}>{plan.title}</div>
                                            <div className="text-[0.85rem] text-gray-500 mt-2 pt-2 border-t border-gray-100">{plan.detail}</div>
                                            <div className="text-[1.1rem] font-bold mt-3 flex items-center gap-2" style={{ color: "var(--c-accent)" }}>
                                                ${total.toLocaleString()}
                                                <small className="text-[0.75rem] text-gray-400 font-normal">({calc.weekdays}平日+{calc.weekends}假日)</small>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="text-right text-[0.8rem] text-gray-400 mt-3">* 價格為系統依平假日預估，實際金額以管家最終報價為準</div>
                        </div>
                    )}

                    {/* ===== STEP 5: Customer Info ===== */}
                    {step >= 5 && selectedPlan && (
                        <div ref={step5Ref} className="border-t border-dashed border-gray-200 mt-8 pt-6 animate-fadeIn">
                            <div className="flex items-center justify-between mb-5 pl-4 border-l-4" style={{ borderColor: "var(--c-accent)", fontFamily: "var(--font-serif)", fontSize: "1.2rem" }}>
                                <span>05. 填寫聯絡資料</span>
                                <i className="fa-solid fa-pen-nib" style={{ color: "var(--c-accent)" }} />
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <div className="mb-5">
                                    <label className="block text-[0.85rem] text-gray-500 mb-2 font-semibold uppercase tracking-wider">您的稱呼 *</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="請輸入姓名"
                                        className="w-full p-3 text-base border border-gray-200 rounded bg-white focus:outline-none focus:border-[#C5A065] transition"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    />
                                </div>
                                <div className="mb-5">
                                    <label className="block text-[0.85rem] text-gray-500 mb-2 font-semibold uppercase tracking-wider">聯絡電話 *</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        placeholder="09xxxxxxxx"
                                        maxLength={10}
                                        className="w-full p-3 text-base border border-gray-200 rounded bg-white focus:outline-none focus:border-[#C5A065] transition"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    />
                                </div>
                                <div className="mb-5">
                                    <label className="block text-[0.85rem] text-gray-500 mb-2 font-semibold uppercase tracking-wider">Email（選填）</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="yourname@email.com"
                                        className="w-full p-3 text-base border border-gray-200 rounded bg-white focus:outline-none focus:border-[#C5A065] transition"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    />
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting || !name || !phone}
                                    className="w-full py-4 rounded-full text-base font-bold tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                    style={{ backgroundColor: "var(--c-primary)", color: "var(--c-accent)", border: "1px solid var(--c-primary)" }}
                                >
                                    {submitting ? (
                                        <><i className="fa-solid fa-circle-notch fa-spin" /> 提交中...</>
                                    ) : (
                                        <><i className="fa-solid fa-paper-plane" /> 送出詢價單</>
                                    )}
                                </button>
                                <p className="text-center text-[0.85rem] text-gray-400 mt-4">
                                    <i className="fa-solid fa-shield-halved mr-1" /> 您的資料僅用於訂房聯繫，不會用於其他用途
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease forwards; }
      `}</style>
        </div>
    );
}
