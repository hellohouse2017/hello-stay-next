import Link from "next/link";

interface FooterProps {
    brand?: "hellohouse" | "godin" | "main";
}

export default function Footer({ brand = "main" }: FooterProps) {
    const isHello = brand === "hellohouse" || brand === "main";

    return (
        <footer
            style={{
                backgroundColor: "#1A202C",
                color: "#aaa",
                padding: "80px 0 40px",
                borderTop: "3px solid var(--c-accent)",
                width: "100%",
                marginTop: "auto",
            }}
        >
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1100px] mx-auto px-5">
                    {/* About */}
                    <div>
                        <h3 className="text-white text-[1.1rem] mb-6" style={{ fontFamily: "var(--font-serif)", letterSpacing: "1px" }}>
                            {isHello ? "關於 你好哇寓所" : "關於 溝頂民宿"}
                        </h3>
                        <div className="leading-[1.8] mb-5" style={{ color: "#CBD5E0" }}>
                            {isHello ? (
                                <p>
                                    「你好哇・寓所」位於<strong className="text-white">高雄鹽埕區</strong>，是一間保留了<strong className="text-white">老屋溫度</strong>且<strong className="text-white">合法</strong>的精緻獨棟民宿。鄰近<strong className="text-white">捷運鹽埕埔站</strong>，步行至<strong className="text-white">駁二藝術特區</strong>僅需10分鐘。提供 <strong className="text-white">6~38人</strong> 彈性包棟。
                                </p>
                            ) : (
                                <p>
                                    「溝頂民宿」同樣位於<strong className="text-white">高雄鹽埕區</strong>靜謐巷弄中，提供<strong className="text-white">10~12人</strong>包棟方案。適合中小型團體。
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white text-[1.1rem] mb-6" style={{ fontFamily: "var(--font-serif)", letterSpacing: "1px" }}>
                            聯絡資訊
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <i className="fa-solid fa-location-dot mt-1" style={{ color: "var(--c-accent)", width: "25px", textAlign: "center" }} />
                                <a href="https://goo.gl/maps/qxGN4mpNP8qfRCB16" target="_blank" rel="noreferrer">
                                    高雄市鹽埕區大公路70巷8號<br />(近捷運鹽埕埔站 O2)
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <i className="fa-solid fa-phone mt-1" style={{ color: "var(--c-accent)", width: "25px", textAlign: "center" }} />
                                <a href="tel:0932828922">0932-828-922</a>
                            </div>
                            <div className="flex items-start gap-3">
                                <i className="fa-brands fa-line mt-1" style={{ color: "var(--c-accent)", width: "25px", textAlign: "center" }} />
                                <a href="https://lin.ee/atCiMQw" target="_blank" rel="noreferrer">LINE 官方帳號聯繫</a>
                            </div>
                        </div>
                    </div>

                    {/* SEO Tags */}
                    <div>
                        <h3 className="text-white text-[1.1rem] mb-6" style={{ fontFamily: "var(--font-serif)", letterSpacing: "1px" }}>
                            熱門關鍵字
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {["高雄包棟推薦", "鹽埕區民宿", "駁二住宿", "麻將民宿", "中島廚房", "親子住宿", "合法民宿", "員工旅遊", "棧貳庫周邊"].map(tag => (
                                <span key={tag} className="text-[12px] border border-white/20 px-2.5 py-1 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center pt-8 mt-8 border-t border-white/10 text-[0.85rem]">
                    © {new Date().getFullYear()} 你好哇寓所 & 溝頂民宿 Hello Stay. All Rights Reserved.
                    <span className="mx-2">|</span>
                    <Link href="/book" className="hover:text-white" style={{ color: "var(--c-accent)" }}>
                        線上訂房
                    </Link>
                </div>
            </div>
        </footer>
    );
}
