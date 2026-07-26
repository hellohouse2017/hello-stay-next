import Link from "next/link";
import Reveal from "@/components/Reveal";

// Localized house-rules content for /ja/agreement and /ko/agreement.
// Every number and rule mirrors src/app/agreement/page.tsx (zh source of truth):
// check-in 16:00 / checkout 11:00 / latest arrival 21:00 / late checkout NT$1,800 per hour,
// over 4 hours counts as one extra night / full prepayment / paid amount kept 1 year as credit /
// same-day cancel or no-show not refundable / over-capacity NT$1,800 per person per night /
// pre-arranged extra guest weekday NT$1,000, weekend NT$1,500 / no smoking incl. e-cigarettes /
// quiet hours 23:00-08:00 / no non-guest visitors / pets need prior written consent + NT$800 per pet.

export interface AgreementCopy {
    heroKicker: string;
    heroTitle: string;
    heroLead: string;
    facts: { label: string; value: string }[];
    sections: {
        id: string;
        title: string;
        lead: string;
        specs: { label: string; value: string }[];
        lists: { title: string; items: string[] }[];
    }[];
    faqTitle: string;
    faqs: { q: string; a: string }[];
    ctaTitle: string;
    ctaLead: string;
    ctaBook: string;
    ctaGuide: string;
}

export const agreementJa: AgreementCopy = {
    heroKicker: "ご宿泊規約",
    heroTitle: "ご利用案内・宿泊ルール",
    heroLead: "ご予約前に、チェックイン時間・お支払い・キャンセル・館内ルールをご確認ください。1棟につき1組限定の貸切宿のため、ルールを事前に共有しています。",
    facts: [
        { label: "チェックイン / アウト", value: "16:00以降 / 11:00まで" },
        { label: "お支払い", value: "全額前払い制" },
        { label: "キャンセル", value: "お支払い額は1年間、次回宿泊に充当可" },
        { label: "最重要ルール", value: "禁煙・静粛時間・部外者立入禁止" },
    ],
    sections: [
        {
            id: "time",
            title: "チェックイン・チェックアウト",
            lead: "当日の予定に直結するため、入退館時間を最初にご確認ください。",
            specs: [
                { label: "チェックイン", value: "16:00 以降" },
                { label: "チェックアウト", value: "11:00 まで" },
                { label: "最終チェックイン", value: "原則 21:00 まで" },
                { label: "レイトチェックアウト", value: "1時間ごとに NT$1,800" },
            ],
            lists: [
                {
                    title: "チェックインについて",
                    items: [
                        "身分証（パスポート）のご提示をお願いします",
                        "全額のお支払い完了をもって予約成立となります",
                        "早めのご到着を希望される場合は事前にご連絡ください",
                    ],
                },
                {
                    title: "延長時のルール",
                    items: [
                        "事前の同意がない延長は課金対象になります",
                        "4時間を超える場合は1泊分として計算します",
                        "チェックアウト時間に余裕を見た計画をおすすめします",
                    ],
                },
            ],
        },
        {
            id: "money",
            title: "お支払い・キャンセル・人数追加",
            lead: "1棟1組限定のため、お支払い・キャンセル・人数の追加は事前に明確にしています。",
            specs: [
                { label: "お支払い方法", value: "全額前払い制" },
                { label: "キャンセル", value: "お支払い額は1年間、次回宿泊の充当に" },
                { label: "予約人数の超過", value: "1名1泊 NT$1,800" },
                { label: "事前の人数追加", value: "平日 NT$1,000 / 週末 NT$1,500" },
            ],
            lists: [
                {
                    title: "お支払いについて",
                    items: [
                        "全額のお支払い完了をもって予約成立となります",
                        "お支払い済み金額は1年間、次回宿泊の割引として保留できます",
                        "当日キャンセル・不泊の場合は返金・保留ができません",
                    ],
                },
                {
                    title: "人数についてのお願い",
                    items: [
                        "宿泊人数が増える場合は必ず事前にご連絡ください",
                        "無断の人数超過は1名1泊 NT$1,800 を申し受けます",
                        "ベッド・寝具の追加が必要な場合も事前確認が必要です",
                    ],
                },
            ],
        },
        {
            id: "rules",
            title: "禁煙・訪問者・ペット・静粛時間",
            lead: "近隣の生活環境と次のお客様への配慮のため、以下のルールを明確に定めています。",
            specs: [
                { label: "全館禁煙", value: "電子タバコ含む・違反時は退館" },
                { label: "静粛時間", value: "23:00 - 08:00" },
                { label: "宿泊者以外の立入", value: "不可" },
                { label: "ペット清掃費", value: "事前の書面同意後・1匹 NT$800" },
            ],
            lists: [
                {
                    title: "禁止事項",
                    items: [
                        "喫煙・薬物・賭博・檳榔・爆竹類",
                        "事前同意のないペットの同伴",
                        "宿泊者以外の方の館内立入",
                        "深夜の大声・騒音などの近隣迷惑行為",
                    ],
                },
                {
                    title: "追加費用が発生しうる状況",
                    items: [
                        "室内での喫煙",
                        "寝具の血痕・嘔吐物などの特殊な汚れ",
                        "共用スペースが原状回復されていない場合",
                        "設備・家具の損壊",
                    ],
                },
            ],
        },
    ],
    faqTitle: "よくあるご質問",
    faqs: [
        {
            q: "アーリーチェックイン・レイトチェックアウトはできますか？",
            a: "客室と清掃の状況が許せば、アーリーチェックインは事前相談が可能です。レイトチェックアウトは事前同意の上、1時間ごとに NT$1,800、4時間を超える場合は1泊分として計算します。",
        },
        {
            q: "支払い後にキャンセルしたらどうなりますか？",
            a: "原則として、お支払い済みの金額は1年間、次回宿泊の割引として保留できます。当日のキャンセルまたは不泊の場合は、返金・保留ともにできません。",
        },
        {
            q: "どんな場合に追加費用が発生しますか？",
            a: "室内での喫煙、設備の損壊、寝具の特殊な汚れ、共用スペースの未復元、重要ルールへの違反などが該当します。",
        },
        {
            q: "領収書は発行できますか？",
            a: "宛名・統一番号（台湾の法人番号）を記入できる合法的な領収書を発行できます。台湾の統一發票（インボイス）の発行には対応していません。",
        },
    ],
    ctaTitle: "ルールを確認したら、空室をチェック",
    ctaLead: "日程と人数を入れると、選べるプランと見積もりを確認できます。",
    ctaBook: "空室・料金を見る",
    ctaGuide: "旅行ガイドを見る",
};

export const agreementKo: AgreementCopy = {
    heroKicker: "숙박 규정",
    heroTitle: "이용 안내 · 숙박 규정",
    heroLead: "예약 전에 체크인 시간, 결제, 취소, 숙소 규정을 확인해 주세요. 한 채에 한 팀만 받는 독채 숙소이므로 규정을 미리 안내드립니다.",
    facts: [
        { label: "체크인 / 아웃", value: "16:00 이후 / 11:00 이전" },
        { label: "결제", value: "전액 선결제" },
        { label: "취소", value: "결제 금액은 1년간 다음 숙박에 사용 가능" },
        { label: "핵심 규정", value: "금연 · 정숙 시간 · 외부인 출입 금지" },
    ],
    sections: [
        {
            id: "time",
            title: "체크인 · 체크아웃",
            lead: "당일 일정에 직접 영향을 주므로 입·퇴실 시간을 먼저 확인해 주세요.",
            specs: [
                { label: "체크인", value: "16:00 이후" },
                { label: "체크아웃", value: "11:00 이전" },
                { label: "최종 체크인", value: "원칙적으로 21:00까지" },
                { label: "레이트 체크아웃", value: "시간당 NT$1,800" },
            ],
            lists: [
                {
                    title: "체크인 안내",
                    items: [
                        "신분증(여권) 제시를 부탁드립니다",
                        "전액 결제가 완료되어야 예약이 확정됩니다",
                        "일찍 도착하실 경우 사전에 연락해 주세요",
                    ],
                },
                {
                    title: "연장 규정",
                    items: [
                        "사전 동의 없는 퇴실 지연은 요금이 부과됩니다",
                        "4시간을 초과하면 1박 요금으로 계산됩니다",
                        "체크아웃 시간에 여유를 두고 일정을 잡으시길 권장합니다",
                    ],
                },
            ],
        },
        {
            id: "money",
            title: "결제 · 취소 · 인원 추가",
            lead: "한 채에 한 팀만 받기 때문에 결제, 취소, 인원 추가 규정을 미리 명확히 안내드립니다.",
            specs: [
                { label: "결제 방식", value: "전액 선결제" },
                { label: "취소 처리", value: "결제 금액은 1년간 다음 숙박에 사용 가능" },
                { label: "예약 인원 초과", value: "1인 1박 NT$1,800" },
                { label: "사전 인원 추가", value: "평일 NT$1,000 / 주말 NT$1,500" },
            ],
            lists: [
                {
                    title: "결제 안내",
                    items: [
                        "전액 결제가 완료되어야 예약이 확정됩니다",
                        "결제 금액은 1년간 다음 숙박 할인용으로 보류할 수 있습니다",
                        "당일 취소 또는 노쇼는 환불·보류가 불가합니다",
                    ],
                },
                {
                    title: "인원 관련 안내",
                    items: [
                        "숙박 인원이 늘어나면 반드시 사전에 알려 주세요",
                        "무단 인원 초과는 1인 1박 NT$1,800이 부과됩니다",
                        "침구 추가가 필요한 경우도 사전 확인이 필요합니다",
                    ],
                },
            ],
        },
        {
            id: "rules",
            title: "금연 · 방문객 · 반려동물 · 정숙 시간",
            lead: "이웃과 다음 손님을 위해 아래 규정을 명확하게 정해 두었습니다.",
            specs: [
                { label: "전관 금연", value: "전자담배 포함 · 위반 시 퇴실" },
                { label: "정숙 시간", value: "23:00 - 08:00" },
                { label: "외부인 출입", value: "불가" },
                { label: "반려동물 청소비", value: "사전 서면 동의 후 · 1마리 NT$800" },
            ],
            lists: [
                {
                    title: "금지 사항",
                    items: [
                        "흡연 · 약물 · 도박 · 빈랑 · 폭죽류",
                        "사전 동의 없는 반려동물 동반",
                        "숙박객 이외의 외부인 출입",
                        "심야 소음 등 이웃에 피해를 주는 행위",
                    ],
                },
                {
                    title: "추가 비용이 발생할 수 있는 경우",
                    items: [
                        "실내 흡연",
                        "침구의 혈흔 · 구토물 등 특수 오염",
                        "공용 공간을 원상 복구하지 않은 경우",
                        "설비 · 가구 파손",
                    ],
                },
            ],
        },
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
        {
            q: "얼리 체크인이나 레이트 체크아웃이 가능한가요?",
            a: "객실과 청소 상황이 허락하면 얼리 체크인은 사전 문의가 가능합니다. 레이트 체크아웃은 사전 동의 후 시간당 NT$1,800이며, 4시간을 초과하면 1박 요금으로 계산됩니다.",
        },
        {
            q: "결제 후 취소하면 어떻게 되나요?",
            a: "원칙적으로 결제하신 금액은 1년간 다음 숙박 할인용으로 보류할 수 있습니다. 당일 취소 또는 노쇼의 경우 환불과 보류가 모두 불가합니다.",
        },
        {
            q: "어떤 경우에 추가 비용이 발생하나요?",
            a: "실내 흡연, 설비 파손, 침구의 특수 오염, 공용 공간 미복구, 핵심 규정 위반 등이 해당됩니다.",
        },
        {
            q: "영수증 발행이 가능한가요?",
            a: "수신인과 사업자 번호를 기재할 수 있는 합법 영수증을 발행해 드립니다. 대만의 통일영수증(統一發票) 발행에는 대응하지 않습니다.",
        },
    ],
    ctaTitle: "규정을 확인했다면, 빈 방을 확인해 보세요",
    ctaLead: "날짜와 인원을 입력하면 선택 가능한 플랜과 견적을 확인할 수 있습니다.",
    ctaBook: "빈 방 · 요금 보기",
    ctaGuide: "여행 가이드 보기",
};

export default function AgreementPageContent({ copy, prefix }: { copy: AgreementCopy; prefix: string }) {
    return (
        <div className="legacy-editorial-page" style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh", paddingBottom: "80px" }}>
            <div className="w" style={{ maxWidth: "860px", padding: "0 20px" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <div className="label-d" style={{ color: "var(--pri)" }}>{copy.heroKicker}</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.5rem, 4vw, 2.1rem)", letterSpacing: "0.06em", color: "#2a2a2a" }}>{copy.heroTitle}</h1>
                        <div className="gold-line" style={{ margin: "20px auto" }} />
                        <p style={{ fontSize: "0.9rem", color: "#8A8279", maxWidth: "560px", margin: "0 auto", lineHeight: 1.9 }}>{copy.heroLead}</p>
                    </div>
                </Reveal>

                <Reveal>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "48px" }}>
                        {copy.facts.map((fact) => (
                            <div key={fact.label} style={{ background: "#fff", borderRadius: "12px", padding: "18px 16px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", textAlign: "center" }}>
                                <div style={{ fontSize: "0.7rem", color: "#BEB5A8", marginBottom: "8px", letterSpacing: "0.08em" }}>{fact.label}</div>
                                <div style={{ fontSize: "0.88rem", color: "#3D3830", fontWeight: 600, lineHeight: 1.5 }}>{fact.value}</div>
                            </div>
                        ))}
                    </div>
                </Reveal>

                {copy.sections.map((section) => (
                    <Reveal key={section.id}>
                        <section id={section.id} style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", marginBottom: "24px" }}>
                            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", color: "#3D3830", marginBottom: "8px", letterSpacing: "0.04em" }}>{section.title}</h2>
                            <p style={{ fontSize: "0.86rem", color: "#8A8279", lineHeight: 1.8, marginBottom: "20px" }}>{section.lead}</p>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "10px", marginBottom: "20px" }}>
                                {section.specs.map((spec) => (
                                    <div key={spec.label} style={{ background: "var(--bg)", borderRadius: "10px", padding: "12px 14px" }}>
                                        <div style={{ fontSize: "0.68rem", color: "#BEB5A8", marginBottom: "6px" }}>{spec.label}</div>
                                        <div style={{ fontSize: "0.84rem", color: "#3D3830", fontWeight: 600, lineHeight: 1.5 }}>{spec.value}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
                                {section.lists.map((list) => (
                                    <div key={list.title}>
                                        <h3 style={{ fontSize: "0.88rem", color: "#3D3830", marginBottom: "10px" }}>{list.title}</h3>
                                        <ul style={{ margin: 0, paddingLeft: "18px", display: "grid", gap: "6px" }}>
                                            {list.items.map((item) => (
                                                <li key={item} style={{ fontSize: "0.84rem", color: "#8A8279", lineHeight: 1.7 }}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </Reveal>
                ))}

                <Reveal>
                    <section style={{ marginTop: "40px", marginBottom: "40px" }}>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", color: "#3D3830", textAlign: "center", marginBottom: "24px", letterSpacing: "0.04em" }}>{copy.faqTitle}</h2>
                        <div style={{ display: "grid", gap: "14px" }}>
                            {copy.faqs.map((faq) => (
                                <article key={faq.q} style={{ background: "#fff", borderRadius: "12px", padding: "20px 22px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                                    <h3 style={{ fontSize: "0.92rem", color: "#3D3830", marginBottom: "8px", letterSpacing: "0.02em" }}>{faq.q}</h3>
                                    <p style={{ fontSize: "0.85rem", color: "#8A8279", lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                </Reveal>

                <Reveal>
                    <div style={{ textAlign: "center", background: "#3D3830", borderRadius: "16px", padding: "36px 24px" }}>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", color: "#F6F1E8", marginBottom: "10px", letterSpacing: "0.04em" }}>{copy.ctaTitle}</h2>
                        <p style={{ fontSize: "0.85rem", color: "rgba(246,241,232,0.75)", marginBottom: "22px" }}>{copy.ctaLead}</p>
                        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href={`${prefix}/book`} className="btn-reserve">{copy.ctaBook}</Link>
                            <Link href={`${prefix}/guide`} style={{ display: "inline-flex", alignItems: "center", padding: "0 22px", minHeight: "44px", borderRadius: "999px", border: "1px solid rgba(246,241,232,0.4)", color: "#F6F1E8", fontSize: "0.85rem" }}>{copy.ctaGuide}</Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
