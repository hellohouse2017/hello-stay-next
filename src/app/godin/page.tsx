import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "高雄包棟民宿 | 溝頂民宿 | 10-12人鹽埕精緻包棟",
    description: "高雄鹽埕區溝頂民宿，提供10-12人精緻包棟方案。合法民宿，近駁二藝術特區、捷運鹽埕埔站。3-4房溫馨空間，適合家庭旅遊。",
    keywords: ["溝頂民宿", "高雄包棟", "鹽埕區民宿", "10人包棟", "高雄家庭旅遊"],
    alternates: { canonical: "https://www.hello-stay.com/godin" },
};

const rooms = [
    { src: "/images/godin/room1.jpg", alt: "溝頂民宿一樓雙人房" },
    { src: "/images/godin/room2.jpg", alt: "溝頂民宿二樓四人房" },
    { src: "/images/godin/room3.jpg", alt: "溝頂民宿三樓四人房" },
    { src: "/images/godin/room4.jpg", alt: "溝頂民宿四樓客廳" },
];

const features = [
    { icon: "fa-solid fa-house-chimney", title: "獨棟包棟空間", desc: "整棟獨立使用，不與他人共享，享受完全的私密性。" },
    { icon: "fa-solid fa-couch", title: "溫馨公共空間", desc: "四樓大客廳，適合聚會聊天、桌遊或觀影活動。" },
    { icon: "fa-solid fa-map-pin", title: "巷弄靜謐位置", desc: "隱身鹽埕巷弄，遠離喧囂卻步行可達各大景點。" },
    { icon: "fa-solid fa-tag", title: "超值優惠價格", desc: "12人以下溝頂民宿價格更優惠，CP值超高。" },
];

export default function GodinPage() {
    return (
        <>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LodgingBusiness",
                        name: "溝頂民宿",
                        image: "https://www.hello-stay.com/images/godin/cover-1.jpg",
                        url: "https://www.hello-stay.com/godin",
                        telephone: "+886-932-828-922",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "鹽埕區",
                            addressRegion: "高雄市",
                            addressCountry: "TW",
                        },
                        priceRange: "$",
                        starRating: { "@type": "Rating", ratingValue: "5" },
                    }),
                }}
            />

            {/* Hero */}
            <header className="relative flex flex-col justify-center items-center text-center text-white overflow-hidden" style={{ height: "70vh", minHeight: "500px", backgroundColor: "var(--c-primary)" }}>
                <div className="absolute inset-0 z-[1]" style={{ backgroundImage: "url('/images/godin/cover-1.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.6, animation: "zoomSlow 20s infinite alternate" }} />
                <div className="relative z-[2] px-5">
                    <h1 className="text-[clamp(2.2rem,5vw,4rem)] mb-4" style={{ fontFamily: "var(--font-serif)", textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
                        高雄包棟民宿・溝頂民宿
                    </h1>
                    <p className="text-[1.2rem] font-light mb-10 opacity-90">高雄鹽埕區・精緻小包棟・溫馨舒適</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        {["10-12人包棟", "超值價格", "鹽埕巷弄秘境", "溫馨家庭風"].map(t => (
                            <span key={t} className="bg-white/15 backdrop-blur-sm border border-white/30 px-5 py-2 rounded-full text-[0.9rem]">{t}</span>
                        ))}
                    </div>
                </div>
            </header>

            {/* Story + Gallery */}
            <section className="section-padding relative z-[3] bg-white" style={{ marginTop: "-60px", borderRadius: "30px 30px 0 0", paddingTop: "80px", paddingBottom: "80px" }}>
                <div className="container">
                    <div className="max-w-[750px] mx-auto mb-16 text-center text-[1.15rem] leading-[2.2]" style={{ color: "var(--c-text-gray)" }}>
                        <span className="section-subtitle">WELCOME</span>
                        <p>
                            <strong className="text-[var(--c-primary)] font-bold">「溝頂民宿」</strong>是我們的二號館，坐落於鹽埕區靜謐巷弄中。<br />
                            提供 <strong className="text-[var(--c-primary)] font-bold">10~12 人</strong> 的精緻包棟空間，<br />
                            五層樓獨立使用，適合中小型家庭旅遊、朋友小聚。<br />
                            <strong className="text-[var(--c-primary)] font-bold">12人以下最優惠的選擇。</strong>
                        </p>
                    </div>

                    <div className="gallery-grid">
                        {rooms.map(img => (
                            <div key={img.src} className="gallery-img">
                                <Image src={img.src} alt={img.alt} width={600} height={450} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section-padding">
                <div className="container">
                    <h2 className="section-title">溝頂民宿的特色</h2>
                    <div className="features-grid">
                        {features.map(f => (
                            <div key={f.title} className="feature-item">
                                <div className="feature-icon"><i className={f.icon} /></div>
                                <h3 className="text-[1.2rem] mb-2.5">{f.title}</h3>
                                <p className="text-[0.95rem]" style={{ color: "var(--c-text-gray)" }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Room Configuration */}
            <section className="section-padding" style={{ backgroundColor: "var(--c-bg-light)" }}>
                <div className="container" style={{ maxWidth: "800px" }}>
                    <span className="section-subtitle">ROOMS</span>
                    <h2 className="section-title">樓層配置</h2>
                    <div className="space-y-4">
                        {[
                            { floor: "1F", desc: "雙人房（一張雙人床）", icon: "🛏️" },
                            { floor: "2F", desc: "四人房（兩張雙人床）", icon: "🛏️🛏️" },
                            { floor: "3F", desc: "四人房（兩張雙人床）", icon: "🛏️🛏️" },
                            { floor: "4F", desc: "客廳（公共空間、手動麻將桌）", icon: "🎴" },
                            { floor: "5F", desc: "雙人房（一張雙人床）", icon: "🛏️" },
                        ].map(r => (
                            <div key={r.floor} className="card flex items-center gap-6 p-6">
                                <div className="text-[1.5rem] font-bold min-w-[50px] text-center" style={{ color: "var(--c-accent)", fontFamily: "var(--font-serif)" }}>{r.floor}</div>
                                <div>
                                    <div className="font-bold">{r.desc}</div>
                                    <div className="text-[0.85rem] mt-1" style={{ color: "var(--c-text-gray)" }}>{r.icon}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding">
                <div className="container text-center">
                    <div className="cta-box">
                        <h3 className="text-[1.5rem] mb-4" style={{ fontFamily: "var(--font-serif)" }}>溝頂民宿・高CP值的包棟選擇</h3>
                        <p className="mb-8 opacity-70">12人以下最推薦的高雄包棟民宿，歡迎立即查詢空房！</p>
                        <Link href="/book" className="btn btn-gold">
                            <i className="fa-solid fa-calendar-check" /> 查詢空房與價格
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
