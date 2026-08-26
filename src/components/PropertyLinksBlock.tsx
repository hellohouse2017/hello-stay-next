import Link from "next/link";

/** Compact, editorial internal navigation used beneath long-form articles. */
export default function PropertyLinksBlock() {
    return (
        <aside className="article-property-links">
            <p className="article-kicker">HELLO STAY</p>
            <h2>先看館別，再查空房</h2>
            <p className="article-property-links__intro">
                依人數與空間需求選擇館別，再前往官方訂房站查看日期與價格。
            </p>
            <div className="article-property-links__top-actions">
                <Link href="/">回到首頁</Link>
                <Link href="/kaohsiung-whole-house">看包棟方案</Link>
            </div>
            <div className="article-property-links__properties">
                <Link href="/hellohouse">
                    <strong>你好哇寓所</strong>
                    <span>8–26 人　中島廚房與聚會空間</span>
                </Link>
                <Link href="/godin">
                    <strong>溝頂民宿</strong>
                    <span>4–12 人　五層獨棟與 4F 交誼廳</span>
                </Link>
                <Link href="/dazhi">
                    <strong>大智若愚</strong>
                    <span>規劃中　電梯大樓包層方案</span>
                </Link>
            </div>
            <div className="article-property-links__capacity">
                <span>依人數查看</span>
                <div>
                    {[
                        { href: "/blog/kaohsiung-6-person-stay", label: "6 人左右" },
                        { href: "/blog/kaohsiung-10-person-stay", label: "10 人左右" },
                        { href: "/blog/kaohsiung-15-person-stay", label: "15 人左右" },
                        { href: "/blog/kaohsiung-20-person-stay", label: "20 人左右" },
                        { href: "/blog/kaohsiung-30-person-stay", label: "30 人左右" },
                        { href: "/kaohsiung-whole-house", label: "40 人以上" },
                    ].map(({ href, label }) => (
                        <Link key={`${href}-${label}`} href={href}>
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="article-property-links__booking">
                <Link href="/book">查看空房與報價</Link>
            </div>
        </aside>
    );
}
