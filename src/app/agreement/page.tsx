import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "入住須知與住宿契約 | 你好哇寓所 & 溝頂民宿",
    description: "你好哇寓所與溝頂民宿住宿契約書、入住須知、押金規定、取消退費政策及生活規範。入住時間16:00、退房11:00，押金退房確認後全額退還。訂房前請詳閱所有條款，確保愉快的住宿體驗。",
    openGraph: {
        title: "入住須知與住宿契約 | Hello Stay",
        description: "住宿契約、押金規定、取消退費政策。",
        url: "https://www.hello-stay.com/agreement",
        images: [{ url: "/images/cover-bg.webp", width: 1200, height: 630, alt: "Hello Stay 入住須知" }],
    },
};

export default function AgreementPage() {
    return (
        <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: "入住須知與住宿契約", description: "你好哇寓所與溝頂民宿的住宿契約書、押金規定、取消退費政策及生活規範。", author: { "@type": "Organization", name: "Hello Stay" }, publisher: { "@type": "Organization", name: "Hello Stay" } }} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>

                {/* Header */}
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "50px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "12px" }}>
                            House Rules & Agreement
                        </div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#2a2a2a" }}>
                            入住須知與住宿契約
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px auto" }} />
                        <p style={{ fontSize: "0.85rem", color: "#999", lineHeight: 1.9 }}>
                            適用於你好哇寓所 & 溝頂民宿・訂房前請詳閱
                        </p>
                    </div>
                </Reveal>

                {/* 政府定型化契約 */}
                <Reveal>
                    <section style={{ background: "#E8F0FE", borderRadius: "16px", padding: "24px", border: "1px solid #C8D8F0", marginBottom: "20px" }}>
                        <a href="https://www.ey.gov.tw/File/E9EE77286036F2D4?A=C" target="_blank" rel="noreferrer"
                            style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
                            <span style={{ fontSize: "1.4rem" }}>📋</span>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "#1565C0", marginBottom: "2px" }}>點擊閱讀行政院公告</div>
                                <div style={{ fontSize: "0.75rem", color: "#5B8DB8" }}>個別旅客直接訂房定型化契約</div>
                            </div>
                        </a>
                    </section>
                </Reveal>

                {/* 進退房時間 */}
                <Reveal>
                    <section style={cardStyle}>
                        <SectionLabel en="Check-in / Check-out" />
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                            <div style={timeBox}>
                                <div style={timeNum}>16:00</div>
                                <div style={timeSub}>入住時間（以後）</div>
                            </div>
                            <div style={timeBox}>
                                <div style={timeNum}>11:00</div>
                                <div style={timeSub}>退房時間（以前）</div>
                            </div>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.9 }}>
                            <p>• 若情況允許，可經民宿主人同意後提早入住。</p>
                            <p>• 入住時請出示身分證或護照辦理登記，並當場繳清餘款。</p>
                            <p>• 最晚請於入住當日 21:00 前完成入住手續。</p>
                            <p style={{ color: "#c44", fontWeight: 500, marginTop: "8px" }}>
                                ⚠ 未經同意延遲退房：每小時加收 $1,500，超過 5 小時以一日包棟定價計算。
                            </p>
                        </div>
                    </section>
                </Reveal>

                {/* 預收費用告知 */}
                <Reveal>
                    <section style={cardStyle}>
                        <SectionLabel en="Payment Notice" />
                        <h3 style={h3Style}>💰 預收費用告知</h3>
                        <p style={{ fontSize: "0.78rem", color: "#999", marginBottom: "16px", lineHeight: 1.8 }}>
                            依據觀光旅館業與旅館業及民宿個別旅客直接訂房定型化契約應記載及不得記載事項規定，業者應依下列方式之一與旅客約定是否收取定金：
                        </p>
                        <div style={{ display: "grid", gap: "10px" }}>
                            <RuleOption text="不收取定金。" muted />
                            <RuleOption text="收取定金新臺幣____元（不得逾約定房價總金額百分之三十，但預定住宿日為三日以上之連續假日期間，定金得提高至約定房價總金額百分之五十）。" muted />
                            <RuleOption text="✅ 預收約定房價總金額。" active />
                        </div>
                        <p style={{ fontSize: "0.75rem", color: "#888", marginTop: "14px", fontStyle: "italic" }}>
                            ※ 本民宿一天僅接待一組客，為保障雙方權益，合意適用「預收約定房價總金額」選項。
                        </p>
                    </section>
                </Reveal>

                {/* 取消政策 */}
                <Reveal>
                    <section style={cardStyle}>
                        <SectionLabel en="Cancellation & Refund Policy" />
                        <h3 style={h3Style}>📜 取消政策與退款處理方式</h3>
                        <p style={{ fontSize: "0.78rem", color: "#999", marginBottom: "10px", fontWeight: 500 }}>
                            預收約定房價總金額者，依下列方式處理：
                        </p>
                        <div style={{ ...ruleBox, marginBottom: "16px" }}>
                            <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#3D3830", marginBottom: "10px" }}>
                                ✅ 一年內保留已付金額作為日後消費折抵使用
                            </div>
                            <p style={clauseStyle}>（一）旅客解約通知於預定住宿日當日前到達者，得於一年內保留已付金額作為日後消費折抵使用。</p>
                            <p style={clauseStyle}>（二）旅客解約通知於預定住宿日當日到達或未為解約通知者，業者得不退還預收約定房價總金額。</p>
                        </div>
                        <details style={{ fontSize: "0.78rem", color: "#888" }}>
                            <summary style={{ cursor: "pointer", fontWeight: 500, marginBottom: "10px" }}>其他退款方式（僅供參考）</summary>
                            <div style={{ ...ruleBox, marginTop: "10px" }}>
                                <div style={{ fontWeight: 500, fontSize: "0.82rem", color: "#888", marginBottom: "10px" }}>比例退還預收約定房價總金額：</div>
                                <p style={clauseStyle}>（一）旅客解約通知於預定住宿日前第三日以前到達者，退還百分之百。</p>
                                <p style={clauseStyle}>（二）旅客解約通知於預定住宿日前第一日至第二日到達者，退還百分之五十。</p>
                                <p style={clauseStyle}>（三）旅客解約通知於預定住宿日當日到達或未為解約通知者，得不退還。</p>
                            </div>
                        </details>
                    </section>
                </Reveal>

                {/* 押金規定 */}
                <Reveal>
                    <section style={{ ...cardStyle, background: "#FFF8F8", border: "1px solid #F5DEDE" }}>
                        <SectionLabel en="Deposit Policy" />
                        <h3 style={{ ...h3Style, color: "#9B2C2C" }}>🔴 押金規定</h3>
                        <div style={{ fontSize: "0.85rem", color: "#666", lineHeight: 2 }}>
                            <p>• 入住時收取押金 <strong>$5,000</strong>。</p>
                            <p>• 退房後確認無任何設備損壞，且未違反入住須知（含過於髒亂）後<strong>全數匯款退還</strong>。</p>
                        </div>
                    </section>
                </Reveal>

                {/* 訂房與加人 */}
                <Reveal>
                    <section style={cardStyle}>
                        <SectionLabel en="Booking & Extra Guests" />
                        <h3 style={h3Style}>訂房與加人須知</h3>
                        <div style={{ fontSize: "0.85rem", color: "#666", lineHeight: 2 }}>
                            <p>• 請依實際訂房人數入住，<strong>超出預定人數加收每人 $1,800／日</strong>。</p>
                            <p>• 如需加人（床），請於入住前一日告知，加收每人 $1,000／日（假日或連續假期 $1,500／日）。</p>
                            <p>• 入住方式：電子密碼鎖自助入住，密碼於入住當日傳送。</p>
                        </div>
                    </section>
                </Reveal>

                {/* 嚴格禁止事項 */}
                <Reveal>
                    <section style={cardStyle}>
                        <SectionLabel en="Strictly Prohibited" />
                        <h3 style={{ ...h3Style, color: "#c44" }}>🚫 嚴格禁止事項</h3>
                        <div style={{ display: "grid", gap: "12px" }}>
                            <ProhibitedItem icon="🚭" text="全棟禁止「吸菸」（含電子菸）、「吸毒」、「賭博」、「嚼檳榔」、「燃放爆竹」及任何違反善良風俗之不法行為。如有抽菸需求請至一樓戶外區。違法行為直接報警處理。" />
                            <ProhibitedItem icon="🐾" text="非寵物友善旅宿，切勿攜帶寵物入住。事前詢問且經業主同意（不接受入住當天詢問）攜帶寵物入住者，酌收清潔費 $800／平日、$1,000／假日，損壞仍需照價賠償。" />
                            <ProhibitedItem icon="🚪" text="嚴禁非當日入住房客以外人士進入。包棟開放區域為一樓廚房與所開立之房間，其餘地方（含頂樓露台）為屋主私人空間，未經同意嚴禁進入，違者依法（刑法306條）處理。" />
                        </div>
                    </section>
                </Reveal>

                {/* 備品與維護 */}
                <Reveal>
                    <section style={cardStyle}>
                        <SectionLabel en="Amenities & Maintenance" />
                        <h3 style={h3Style}>備品與維護</h3>
                        <div style={{ fontSize: "0.85rem", color: "#666", lineHeight: 2 }}>
                            <p>• 不主動提供更換枕套、床單、浴巾等備品。連續入住提供每 3 日更換一次浴巾之免費服務。</p>
                            <p>• 開放式客廳設備入住期間免費使用，使用後請恢復原貌及妥善清潔，並請隨手關燈、冷氣及節約用水，未遵守者視情況扣除押金。</p>
                        </div>
                    </section>
                </Reveal>

                {/* 安全安寧與賠償 */}
                <Reveal>
                    <section style={cardStyle}>
                        <SectionLabel en="Safety, Noise & Compensation" />
                        <h3 style={h3Style}>安全、安寧與賠償</h3>
                        <div style={{ fontSize: "0.85rem", color: "#666", lineHeight: 2, marginBottom: "16px" }}>
                            <p>• <strong>安寧時間</strong>：位於住宅區，23:00 至隔日 08:00 請降低音量，勿大聲喧嘩。屢勸無效則要求立即退房，恕無退還房費。</p>
                        </div>
                        <h4 style={{ fontSize: "0.88rem", fontWeight: 600, color: "#3D3830", marginBottom: "12px" }}>賠償價目表</h4>
                        <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)" }}>
                            {[
                                { item: "室內吸菸", fee: "直接扣除全額押金 $5,000" },
                                { item: "寢具沾血漬、嘔吐物等", fee: "特殊清潔費 $500～$2,000" },
                                { item: "公共空間未妥善復原", fee: "額外清潔費 $500～$5,000" },
                            ].map((r, i) => (
                                <div key={i} style={{
                                    display: "flex", justifyContent: "space-between", padding: "13px 18px",
                                    background: i % 2 === 0 ? "var(--bg)" : "#fff", fontSize: "0.82rem",
                                }}>
                                    <span style={{ color: "#666" }}>{r.item}</span>
                                    <span style={{ color: "#c44", fontWeight: 500, textAlign: "right" }}>{r.fee}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </Reveal>

                {/* CTA */}
                <Reveal>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <p style={{ fontSize: "0.85rem", color: "#999", marginBottom: "20px" }}>
                            有任何疑問？隨時聯繫我們
                        </p>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/book" style={{
                                padding: "14px 32px", borderRadius: "10px", background: "#161618",
                                color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em",
                            }}>查詢空房</Link>
                            <a href="https://lin.ee/atCiMQw" target="_blank" rel="noreferrer" style={{
                                padding: "14px 32px", borderRadius: "10px", background: "#06C755",
                                color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em",
                            }}>LINE 聯繫管家</a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}

/* ── Shared Styles ── */
const cardStyle: React.CSSProperties = {
    background: "#fff", borderRadius: "16px", padding: "32px 28px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px",
};
const h3Style: React.CSSProperties = {
    fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#3D3830", marginBottom: "16px",
};
const timeBox: React.CSSProperties = {
    textAlign: "center", padding: "20px", background: "var(--bg)", borderRadius: "12px",
};
const timeNum: React.CSSProperties = {
    fontFamily: "var(--serif)", fontSize: "1.8rem", color: "#3D3830", marginBottom: "4px",
};
const timeSub: React.CSSProperties = { fontSize: "0.78rem", color: "#BEB5A8" };
const ruleBox: React.CSSProperties = {
    padding: "16px 18px", background: "var(--bg)", borderRadius: "10px",
};
const clauseStyle: React.CSSProperties = {
    fontSize: "0.78rem", color: "#666", lineHeight: 1.9, marginBottom: "4px", paddingLeft: "16px",
};

/* ── Sub-components ── */
function SectionLabel({ en }: { en: string }) {
    return (
        <div style={{
            fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#BEB5A8", marginBottom: "14px",
        }}>{en}</div>
    );
}

function RuleOption({ text, active, muted }: { text: string; active?: boolean; muted?: boolean }) {
    return (
        <div style={{
            padding: "14px 18px", borderRadius: "10px", fontSize: "0.82rem", lineHeight: 1.8,
            background: active ? "rgba(76,175,80,0.06)" : "var(--bg)",
            color: active ? "#2e7d32" : muted ? "#bbb" : "#666",
            border: active ? "1px solid rgba(76,175,80,0.2)" : "1px solid transparent",
            fontWeight: active ? 500 : 400,
            textDecoration: muted && !active ? "line-through" : "none",
        }}>{text}</div>
    );
}

function ProhibitedItem({ icon, text }: { icon: string; text: string }) {
    return (
        <div style={{
            display: "flex", gap: "12px", alignItems: "flex-start",
            padding: "14px 16px", background: "var(--bg)", borderRadius: "10px",
        }}>
            <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{icon}</span>
            <span style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.9 }}>{text}</span>
        </div>
    );
}
