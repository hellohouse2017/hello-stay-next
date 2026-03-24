import Link from "next/link";

/**
 * PropertyLinksBlock — Blog 文章用的館別導覽區塊
 * 提供主要館別頁、人數落地頁、查房三類內鏈
 * 放在 RelatedArticles 之前，增加文章→交易頁的內鏈密度
 */
export default function PropertyLinksBlock() {
    return (
        <div style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
            <div style={{ fontFamily: "var(--sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--pri)", marginBottom: "16px" }}>
                Hello Stay 三館
            </div>
            <div style={{ display: "grid", gap: "10px", marginBottom: "20px" }}>
                <Link href="/hellohouse" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "10px", background: "var(--bg)", border: "1px solid #EDE8E3" }}>
                    <span style={{ fontSize: "1.3rem" }}>🏠</span>
                    <div>
                        <div style={{ fontSize: "0.85rem", color: "#3D3830", fontWeight: 500, marginBottom: "2px" }}>你好哇寓所</div>
                        <div style={{ fontSize: "0.72rem", color: "#999" }}>6–26人・中島廚房・麻將桌・鹽埕</div>
                    </div>
                </Link>
                <Link href="/godin" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "10px", background: "var(--bg)", border: "1px solid #EDE8E3" }}>
                    <span style={{ fontSize: "1.3rem" }}>🏡</span>
                    <div>
                        <div style={{ fontSize: "0.85rem", color: "#3D3830", fontWeight: 500, marginBottom: "2px" }}>溝頂民宿</div>
                        <div style={{ fontSize: "0.72rem", color: "#999" }}>6–12人・五層獨棟・頂樓露台・長輩友善</div>
                    </div>
                </Link>
                <Link href="/dazhi" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "10px", background: "var(--bg)", border: "1px solid #EDE8E3" }}>
                    <span style={{ fontSize: "1.3rem" }}>🏢</span>
                    <div>
                        <div style={{ fontSize: "0.85rem", color: "#3D3830", fontWeight: 500, marginBottom: "2px" }}>大智若愚</div>
                        <div style={{ fontSize: "0.72rem", color: "#999" }}>20–48人・全新電梯・近大港橋</div>
                    </div>
                </Link>
            </div>
            <div style={{ borderTop: "1px solid #F0EBE6", paddingTop: "16px" }}>
                <div style={{ fontSize: "0.72rem", color: "#999", marginBottom: "10px" }}>依人數查詢</div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {[
                        { href: "/capacity/10", label: "10人包棟" },
                        { href: "/capacity/20", label: "20人包棟" },
                        { href: "/capacity/30", label: "30人包棟" },
                        { href: "/capacity/40", label: "40人包棟" },
                    ].map(({ href, label }) => (
                        <Link key={href} href={href} style={{ fontSize: "0.78rem", padding: "6px 14px", borderRadius: "20px", border: "1px solid #D4CBC0", color: "#8A8279", textDecoration: "none" }}>
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
            <div style={{ marginTop: "16px" }}>
                <Link href="/book" style={{ display: "block", textAlign: "center", padding: "13px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.82rem", letterSpacing: "0.08em", textDecoration: "none" }}>
                    立即查詢空房
                </Link>
            </div>
        </div>
    );
}
