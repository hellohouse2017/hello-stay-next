import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer-d">
            <div className="gold-rule" />
            <div className="w">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "36px", marginBottom: "40px" }}>
                    <div>
                        <div style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#C8AD7F", letterSpacing: "0.1em", marginBottom: "14px" }}>Hello Stay</div>
                        <p style={{ fontSize: "0.78rem", lineHeight: 2, color: "rgba(255,255,255,0.6)" }}>高雄鹽埕區質感包棟民宿<br />專為團體旅客打造的獨立空間</p>
                    </div>
                    <div>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "16px" }}>Properties</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Link href="/hellohouse" style={{ fontSize: "0.82rem" }}>你好哇寓所</Link>
                            <Link href="/godin" style={{ fontSize: "0.82rem" }}>溝頂民宿</Link>
                            <Link href="/dazhi" style={{ fontSize: "0.82rem" }}>大智若愚</Link>
                            <Link href="/book" style={{ fontSize: "0.82rem" }}>查詢空房</Link>
                        </div>
                    </div>
                    <div>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "16px" }}>Info</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Link href="/agreement" style={{ fontSize: "0.82rem" }}>入住須知</Link>
                            <Link href="/traffic" style={{ fontSize: "0.82rem" }}>交通停車</Link>
                            <Link href="/explore" style={{ fontSize: "0.82rem" }}>周邊探索</Link>
                            <Link href="/packages" style={{ fontSize: "0.82rem" }}>包棟方案</Link>
                            <Link href="/blog" style={{ fontSize: "0.82rem" }}>旅宿攻略</Link>
                            <Link href="/reviews" style={{ fontSize: "0.82rem" }}>住客評價</Link>
                        </div>
                    </div>
                    <div>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8AD7F", marginBottom: "16px" }}>Contact</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.82rem" }}>
                            <span>0932-828-922</span>
                            <span>高雄市鹽埕區</span>
                        </div>
                    </div>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px", fontSize: "0.7rem", color: "rgba(255,255,255,0.55)", textAlign: "center" }}>
                    © {new Date().getFullYear()} Hello Stay. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
