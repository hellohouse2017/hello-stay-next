import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
    title: "溝頂民宿 | 高雄鹽埕精緻包棟 | 10-12人家庭出遊推薦",
    description: "高雄鹽埕區精緻獨棟包棟民宿。溝頂民宿提供10-12人入住，五層樓完整空間，溫馨家庭風格。近駁二藝術特區、大港橋。平日$10,000起。",
    alternates: { canonical: "https://www.hello-stay.com/godin" },
};

const rooms = [
    { src: "/images/godin/room1.jpg", alt: "溝頂民宿 2F 四人房" },
    { src: "/images/godin/room2.jpg", alt: "溝頂民宿 3F 四人房" },
    { src: "/images/godin/room3.jpg", alt: "溝頂民宿 4F 雙人房" },
    { src: "/images/godin/room4.jpg", alt: "溝頂民宿 5F 雙人房" },
];

const floors = [
    { num: "1F", label: "玄關 + 公共空間", desc: "電子鎖入口、鞋櫃、客廳區域" },
    { num: "2F", label: "四人房", desc: "寬敞空間，獨立衛浴" },
    { num: "3F", label: "四人房", desc: "明亮採光，獨立衛浴" },
    { num: "4F", label: "雙人房 + 客廳", desc: "溫馨小客廳，休憩空間" },
    { num: "5F", label: "雙人房", desc: "頂樓空間，充足採光" },
];

export default function GodinPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org", "@type": "LodgingBusiness",
                    name: "溝頂民宿", url: "https://www.hello-stay.com/godin",
                    telephone: "0932828922",
                    description: "高雄鹽埕精緻獨棟包棟，10-12人家庭出遊推薦。",
                    address: { "@type": "PostalAddress", addressLocality: "高雄市", addressRegion: "鹽埕區" },
                })
            }} />

            {/* ── Hero (B-style: clean photo, no overlay) ── */}
            <section className="hero-b">
                <Image src="/images/godin/cover-1.jpg" alt="溝頂民宿 共用空間" width={900} height={600} priority />
                <h1>溝頂民宿</h1>
                <div className="sub">Godin House · A Quiet Retreat</div>
                <p className="desc">
                    隱身鹽埕靜謐巷弄，五層樓獨棟空間。<br />
                    為 10 至 12 人的小團體，打造有溫度的包棟體驗。
                </p>
            </section>

            {/* ── Intro (asymmetric) ── */}
            <section className="sec-warm" style={{ paddingTop: "0" }}>
                <div className="w">
                    <Reveal>
                        <div className="grid-asym">
                            <div className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                <Image src="/images/godin/cover-2.jpg" alt="溝頂民宿 客廳" width={700} height={525} className="img-cover" />
                            </div>
                            <div>
                                <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#aaa", marginBottom: "12px" }}>About</div>
                                <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", marginBottom: "16px", letterSpacing: "0.06em", color: "#2a2a2a" }}>像回家一樣的旅行</h2>
                                <div style={{ width: "40px", height: "1px", background: "#ddd", marginBottom: "20px" }} />
                                <p style={{ fontSize: "0.92rem", color: "#999", lineHeight: 2.2 }}>
                                    溝頂民宿是你好哇系列的精緻二館。整棟五層樓獨立使用，沒有外人打擾。
                                    以溫馨家庭風格呈現，讓每一次入住都像回到自己的家。
                                    平日 $10,000 起，是小團體包棟的超值首選。
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── Room Gallery (B-style: zen cards) ── */}
            <section className="sec-warm" style={{ paddingTop: "0" }}>
                <div className="w" style={{ marginBottom: "30px" }}>
                    <Reveal>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#aaa", marginBottom: "12px" }}>Rooms</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", letterSpacing: "0.06em", color: "#2a2a2a" }}>房間一覽</h2>
                    </Reveal>
                </div>
                <div className="w">
                    <Reveal>
                        <div className="grid-2">
                            {rooms.map(r => (
                                <div key={r.src} className="zen-card">
                                    <div className="img-zoom" style={{ aspectRatio: "4/3" }}>
                                        <Image src={r.src} alt={r.alt} width={600} height={450} className="img-cover" />
                                    </div>
                                    <div style={{ padding: "16px 20px" }}>
                                        <div style={{ fontSize: "0.85rem", color: "#888" }}>{r.alt.replace("溝頂民宿 ", "")}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── Floor Plan (B-style: clean list) ── */}
            <section style={{ background: "#fff", padding: "clamp(60px, 10vw, 100px) 0" }}>
                <div className="w" style={{ maxWidth: "650px" }}>
                    <Reveal>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#aaa", marginBottom: "12px" }}>Floor Plan</div>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", letterSpacing: "0.06em", color: "#2a2a2a", marginBottom: "30px" }}>樓層配置</h2>
                    </Reveal>
                    {floors.map(f => (
                        <Reveal key={f.num}>
                            <div className="floor-item">
                                <div className="floor-num">{f.num}</div>
                                <div>
                                    <div className="floor-label">{f.label}</div>
                                    <div className="floor-desc">{f.desc}</div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── More photos ── */}
            <section className="sec-warm">
                <div className="w">
                    <Reveal>
                        <div className="grid-3">
                            {["/images/godin/cover-3.jpg", "/images/godin/cover-4.jpg", "/images/godin/cover-bg.jpg"].map(src => (
                                <div key={src} className="img-zoom img-rounded" style={{ aspectRatio: "4/3" }}>
                                    <Image src={src} alt="溝頂民宿" width={400} height={300} className="img-cover" />
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── CTA (B-style: soft) ── */}
            <section style={{ background: "#fff", padding: "80px 28px", textAlign: "center" }}>
                <Reveal>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", letterSpacing: "0.06em", color: "#2a2a2a", marginBottom: "12px" }}>
                        小團體的完美包棟體驗
                    </h3>
                    <p style={{ fontSize: "0.88rem", color: "#aaa", marginBottom: "30px" }}>
                        平日 $10,000 起 · 12 人以內
                    </p>
                    <Link href="/book" style={{
                        display: "inline-block", padding: "14px 44px",
                        border: "1px solid #2a2a2a", color: "#2a2a2a",
                        fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.12em",
                        transition: "all 0.4s",
                    }}>
                        查詢空房
                    </Link>
                </Reveal>
            </section>
        </>
    );
}
