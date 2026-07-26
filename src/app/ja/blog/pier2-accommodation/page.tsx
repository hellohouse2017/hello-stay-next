import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { DEFAULT_SEO_IMAGE } from "@/lib/seo-metadata";
import Breadcrumb from "@/components/Breadcrumb";

const CANONICAL_JA = "https://www.hello-stay.com/ja/blog/pier2-accommodation";
const CANONICAL_ZH = "https://www.hello-stay.com/blog/pier2-accommodation";
const CANONICAL_EN = "https://www.hello-stay.com/en/blog/pier2-accommodation";

export const metadata: Metadata = {
    title: "駁二芸術特区周辺の宿泊ガイド｜徒歩10分の塩埕エリアがおすすめ | Hello Stay",
    description:
        "高雄・駁二芸術特区（Pier-2）観光の宿はどこが便利？徒歩10分の塩埕区に泊まるメリット、周辺の見どころ、4〜36名向けの一棟貸し宿を日本語でご案内します。",
    alternates: {
        canonical: CANONICAL_JA,
        languages: { "zh-Hant": CANONICAL_ZH, en: CANONICAL_EN, ja: CANONICAL_JA, "x-default": CANONICAL_ZH },
    },
    openGraph: {
        title: "駁二芸術特区周辺の宿泊ガイド｜徒歩10分の塩埕エリア",
        description: "駁二まで徒歩10分、大港橋まで徒歩8分。高雄・塩埕区の一棟貸し宿から歩いて観光。",
        url: CANONICAL_JA,
        type: "article",
        locale: "ja_JP",
        images: [DEFAULT_SEO_IMAGE],
    },
};

const sections = [
    {
        id: "location",
        title: "なぜ駁二のすぐ隣ではなく塩埕区に泊まるのか",
        content: `駁二芸術特区は倉庫街をリノベーションしたエリアで、特区の中に宿はありません。周辺の宿泊エリアは次のように分かれます。

塩埕区（いちばんおすすめ ⭐）
• 駁二・大義倉庫群まで徒歩約10分
• 大港橋まで徒歩約8分
• 棧貳庫（KW2）まで徒歩約15分
• エリア自体がグルメの街
• MRT塩埕埔駅まで徒歩約5分

前鎮エリア（高雄流行音楽センター周辺）
• 宿の選択肢が少なく、ほぼホテルのみ
• 駁二の中心部からはやや遠い

旗津
• 駁二まで徒歩20分以上＋フェリー
• 夜は飲食店が少なく静か

結論：塩埕区に泊まれば、駁二・グルメ・MRTがすべて徒歩圏に収まります。`,
    },
    {
        id: "spots",
        title: "駁二周辺の見どころ（すべて徒歩圏）",
        content: `徒歩5分圏内
☑ 大溝頂の伝統市場 — 地元の生活感が残るレトロな商店街

徒歩10分圏内
☑ 駁二・大義倉庫群 — 壁画アート、個性派ショップ、VR体験
☑ 大港橋 — 台湾初の水平回転橋。毎時0分に回転

徒歩15分圏内
☑ 棧貳庫 KW2 — 白いメリーゴーランドと港沿いレストラン
☑ 哈瑪星鉄道文化園区 — ミニトレインと鉄道遺産

徒歩20分圏内
☑ 高雄流行音楽センター — 六角形の海をイメージした建築
☑ 愛河 — リバーサイド散歩、夜はゴンドラ遊覧

MRTで1駅
☑ 打狗英国領事館 — 夕日の名所
☑ 旗津フェリー — 海鮮、灯台、虹の教会`,
    },
    {
        id: "stay",
        title: "駁二まで歩ける一棟貸しの宿",
        content: `ハローハウス（Hello House）⭐ いちばん人気
📍 塩埕区大公路70巷8号（駁二まで徒歩約10分）
👥 8〜26名の貸切
🏷 アイランドキッチン、手動麻雀卓、ボードゲーム
💰 料金は日付と人数により変動（公式予約サイトで確認できます）

ゴーディンハウス（溝頂民宿）
📍 塩埕区大公路70巷6-2号（駁二まで徒歩約10分）
👥 4〜12名の一棟貸し
🏷 5階建て・4室すべてバスルーム付き
✨ 家族旅行・少人数グループに最適
⚠ エレベーターはありません（階段のみ）

2棟同時の貸切は通常27〜34名に対応し、35〜36名はエキストラベッドが必要です。大人数グループにおすすめです。`,
    },
    {
        id: "tips",
        title: "駁二観光のコツ",
        content: `ベストな時間帯
• 平日は人が少なく、写真も撮りやすい
• 週末はマーケットやポップアップイベントが開催
• 16:00〜18:00のゴールデンアワーが撮影ベスト

入場料
• 駁二の倉庫群エリアは入場無料
• 一部の展示とVR体験は別途チケット制
• 大港橋も無料（毎日毎時0分に回転）

食事のコツ
• 特区内のレストランはやや高め。塩埕区へ歩いて戻るとコスパの良い老舗が多い
• 宿のキッチンでみんなで自炊するのも安くて楽しい

アクセス
• MRTオレンジライン「塩埕埔駅」(O2) 2番出口
• ライトレール「駁二大義駅」「駁二蓬萊駅」`,
    },
];

export default function JaPier2Page() {
    return (
        <div className="legacy-article-page" style={{ paddingTop: "calc(var(--nav-h) + 40px)", background: "var(--bg)", minHeight: "100vh" }}>
            <JsonLd data={[
                {
                    "@context": "https://schema.org", "@type": "Article",
                    headline: "駁二芸術特区周辺の宿泊ガイド｜徒歩10分の塩埕エリアがおすすめ",
                    description: "駁二まで徒歩10分、大港橋まで徒歩8分。高雄・塩埕区の一棟貸し宿から歩いて観光。",
                    author: { "@type": "Organization", name: "Hello Stay", url: "https://www.hello-stay.com" },
                    publisher: { "@type": "Organization", name: "Hello Stay", url: "https://www.hello-stay.com" },
                    datePublished: "2026-07-27", dateModified: "2026-07-27",
                    inLanguage: "ja",
                    mainEntityOfPage: CANONICAL_JA,
                    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#location", "#stay"] },
                },
                {
                    "@context": "https://schema.org", "@type": "FAQPage",
                    inLanguage: "ja",
                    mainEntity: [
                        {
                            "@type": "Question",
                            name: "駁二芸術特区の近くでおすすめの宿はありますか？",
                            acceptedAnswer: { "@type": "Answer", text: "駁二まで徒歩約10分の塩埕区がおすすめです。ハローハウス（8〜26名の貸切）やゴーディンハウス（4〜12名の一棟貸し）があり、塩埕区自体がグルメの街なので、駁二のすぐ隣に泊まるより食事もアクセスも便利です。" },
                        },
                        {
                            "@type": "Question",
                            name: "駁二芸術特区に入場料はかかりますか？",
                            acceptedAnswer: { "@type": "Answer", text: "倉庫群エリアは入場無料です。大港橋も無料で、毎日毎時0分に回転します。一部の展示とVR体験のみ別途チケットが必要です。平日は空いていて、16:00〜18:00が写真撮影のベストタイムです。" },
                        },
                        {
                            "@type": "Question",
                            name: "日本語で予約や問い合わせはできますか？",
                            acceptedAnswer: { "@type": "Answer", text: "公式予約サイトで日付と人数を入力すると空室と料金を確認できます。ご質問はメール（hellohouse2017@gmail.com）またはLINE公式アカウントで受け付けています。" },
                        },
                    ],
                },
            ]} />
            <div className="w" style={{ maxWidth: "720px", padding: "0 28px 80px" }}>
                <Breadcrumb items={[{ name: "旅行ガイド", href: "/ja/guide" }, { name: "駁二周辺の宿泊", href: "/ja/blog/pier2-accommodation" }]} />
                <Reveal>
                    <div style={{ marginBottom: "40px" }}>
                        <div style={{ fontFamily: "var(--en)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--pri)", marginBottom: "12px" }}>2026-07-27</div>
                        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, letterSpacing: "0.04em", color: "#2a2a2a", lineHeight: 1.5 }}>
                            駁二芸術特区周辺の宿泊ガイド<br />徒歩10分の塩埕エリアがおすすめ
                        </h1>
                        <div style={{ width: "40px", height: "1px", background: "var(--pri)", margin: "20px 0" }} />
                    </div>
                </Reveal>
                {sections.map((s) => (
                    <Reveal key={s.id}>
                        <section id={s.id} style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "20px" }}>
                            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "#3D3830", marginBottom: "16px" }}>{s.title}</h2>
                            <div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 2.2, whiteSpace: "pre-line" }}>{s.content}</div>
                        </section>
                    </Reveal>
                ))}
                <Reveal>
                    <div style={{ textAlign: "center", marginTop: "20px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/ja/book" style={{ padding: "14px 32px", borderRadius: "10px", background: "#161618", color: "#fff", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>空室・料金を見る</Link>
                        <Link href="/ja/hellohouse" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>ハローハウスを見る</Link>
                        <Link href="/ja/guide" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #D4CBC0", color: "#8A8279", fontFamily: "var(--serif)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>旅行ガイドへ</Link>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
