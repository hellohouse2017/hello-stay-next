import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "找不到頁面 | Hello Stay 高雄包棟民宿",
    description: "您訪問的頁面不存在。前往首頁探索高雄鹽埕區包棟民宿。",
    robots: { index: false, follow: true },
};

export default function NotFound() {
    return (
        <div style={{
            minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
            background: "#FAF8F5", padding: "28px", textAlign: "center",
        }}>
            <div style={{ maxWidth: "480px" }}>
                <div style={{
                    fontFamily: "var(--en)", fontSize: "clamp(5rem, 15vw, 8rem)",
                    fontWeight: 200, color: "#E8E2D9", lineHeight: 1, marginBottom: "20px",
                }}>404</div>

                <h1 style={{
                    fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
                    fontWeight: 400, letterSpacing: "0.06em", color: "#3D3830", marginBottom: "12px",
                }}>
                    找不到這個頁面
                </h1>

                <p style={{ fontSize: "0.88rem", color: "#A09282", lineHeight: 1.9, marginBottom: "36px" }}>
                    您訪問的頁面可能已移除或地址有誤。<br />
                    讓我們幫您找到正確的方向。
                </p>

                <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/" style={{
                        padding: "14px 32px", borderRadius: "10px", background: "#161618",
                        color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em",
                    }}>
                        返回首頁
                    </Link>
                    <Link href="/book" style={{
                        padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0",
                        color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em",
                    }}>
                        查詢空房
                    </Link>
                </div>

                <div style={{ marginTop: "40px" }}>
                    <a href="https://lin.ee/atCiMQw" target="_blank" rel="noreferrer" style={{
                        fontSize: "0.8rem", color: "#C8AD7F", textDecoration: "none",
                    }}>
                        或透過 LINE 聯繫我們 →
                    </a>
                </div>
            </div>
        </div>
    );
}
