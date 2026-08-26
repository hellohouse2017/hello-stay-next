"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  CreditCard,
  Ban,
  Moon,
  ChevronDown,
  FileText,
  MessageSquare,
  PhoneCall,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Scale,
  RefreshCcw,
} from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const agreementFaqs: FaqItem[] = [
  {
    q: "付款後若臨時有突發狀況需要改期，該如何處理？",
    a: "依據本館定型化契約規範，凡於預定住宿日當日前聯繫告知，已支付之全額住宿費用皆可完整保留「一年內折抵使用」，旅客可於一年內彈性挑選新日期入住，新日期房價採多退少補，絕不沒收您的住宿費用。",
  },
  {
    q: "押金 NT$5,000 是什麼時候退還？",
    a: "押金由旅客於入住前或辦理入住時支付。退房當日上午 11:00 前完成自助退房後，管家會於當天進行房況與設備核對，確認無室內吸菸、無設備損壞且無違反重大住宿守則，押金將於當日全額無息匯款退還至您的指定帳戶。",
  },
  {
    q: "入住當天可以先寄放行李嗎？退房後可以寄放嗎？",
    a: "入住當天中午 12:00 起即可統一將行李先行寄放於一樓公共空間（請提前告知管家，放妥後即行離開以利房務清消）。為維護下一組包棟貴賓之全棟專屬隱私與清潔動線，退房後恕無法提供寄放服務，建議使用步行 5 分鐘之捷運鹽埕埔站或美麗島站付費置物櫃。",
  },
  {
    q: "可以開立公司抬頭與統一編號的報帳發票或收據嗎？",
    a: "Hello Stay 為高雄市政府核准合法登記民宿（你好哇寓所 131 號、溝頂民宿 163 號），依法開立蓋有合法民宿專用章、可填寫買受人抬頭與統一編號之合法免用統一發票收據，完全符合公司行號、政府機關與學校之報帳核銷規範。",
  },
  {
    q: "如果不小心造成床單染色或物品損壞，費用如何計算？",
    a: "若寢具沾染不可水洗之血漬、紅酒、嘔吐物等，依品項收取專業特殊清潔費 NT$500 ～ NT$2,000 / 件；若公共空間使用完畢未恢復原貌或過於髒亂，收取清潔費 NT$500 ～ NT$5,000；家具設備損壞則照原廠維修或重購市價賠償。",
  },
];

export default function AgreementExperience() {
  const [activeSection, setActiveSection] = useState<string>("legal");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveSection(hash);
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="luxury-agreement-page">
      {/* ═══ 1. HERO 頂部信任看板 ═══ */}
      <section className="mockup-agr-hero">
        <div className="mockup-container">
          <div className="mockup-agr-hero__inner">
            <div className="mockup-agr-hero__tag">
              <Scale size={15} aria-hidden="true" />
              <span>官方定型化住宿契約與生活公約</span>
            </div>
            <h1 className="mockup-agr-hero__title">
              Hello Stay 入住須知與定型化住宿守則
            </h1>
            <p className="mockup-agr-hero__subtitle">
              依據交通部觀光局定型化契約準則制定。堅持透明、公開與互信，完整揭示付款條件、改期保留、押金機制、進退房時間與住宿生活守則，保障雙方合法權益。
            </p>

            {/* 4 大核心規約速覽 */}
            <div className="mockup-agr-hero__metrics">
              <div className="mockup-agr-hero__metric-card">
                <div className="mockup-agr-hero__metric-icon">
                  <Clock size={20} />
                </div>
                <div className="mockup-agr-hero__metric-body">
                  <span className="mockup-agr-hero__metric-label">進退房時間</span>
                  <strong className="mockup-agr-hero__metric-val">16:00 入住 / 11:00 退房</strong>
                </div>
              </div>

              <div className="mockup-agr-hero__metric-card">
                <div className="mockup-agr-hero__metric-icon">
                  <CreditCard size={20} />
                </div>
                <div className="mockup-agr-hero__metric-body">
                  <span className="mockup-agr-hero__metric-label">入住押金制度</span>
                  <strong className="mockup-agr-hero__metric-val">NT$ 5,000（退房當日退還）</strong>
                </div>
              </div>

              <div className="mockup-agr-hero__metric-card">
                <div className="mockup-agr-hero__metric-icon">
                  <RefreshCcw size={20} />
                </div>
                <div className="mockup-agr-hero__metric-body">
                  <span className="mockup-agr-hero__metric-label">改期折抵保障</span>
                  <strong className="mockup-agr-hero__metric-val">全額保留一年內彈性折抵</strong>
                </div>
              </div>

              <div className="mockup-agr-hero__metric-card">
                <div className="mockup-agr-hero__metric-icon">
                  <Ban size={20} />
                </div>
                <div className="mockup-agr-hero__metric-body">
                  <span className="mockup-agr-hero__metric-label">無菸與安寧底線</span>
                  <strong className="mockup-agr-hero__metric-val">全館禁菸・23:00 夜間安寧</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. 核心條文主體與側欄導覽 ═══ */}
      <section className="mockup-agr-content">
        <div className="mockup-container mockup-agr-content__layout">
          {/* 側邊 / 手機頂部快速錨點導覽 */}
          <aside className="mockup-agr-nav" aria-label="條款目錄導覽">
            <div className="mockup-agr-nav__box">
              <div className="mockup-agr-nav__header">
                <FileText size={16} />
                <span>條款章節導覽</span>
              </div>
              <ul className="mockup-agr-nav__list">
                {[
                  { id: "legal", label: "1. 法定依據與簽約方式" },
                  { id: "payment", label: "2. 訂房付款與押金規範" },
                  { id: "cancellation", label: "3. 改期與退款處理辦法" },
                  { id: "checkin", label: "4. 進退房時間與行李寄放" },
                  { id: "prohibited", label: "5. 全館禁止事項與安全" },
                  { id: "quiet", label: "6. 住宅區安寧與清潔賠償" },
                  { id: "continuous-stay", label: "7. 連住優惠與房務服務" },
                  { id: "official-rights", label: "8. 權益保障與爭議處理" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`mockup-agr-nav__item ${
                        activeSection === item.id ? "is-active" : ""
                      }`}
                      onClick={() => scrollToSection(item.id)}
                    >
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mockup-agr-nav__cta">
                <p>有特殊包棟需求？</p>
                <a
                  href="https://lin.ee/atCiMQw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mockup-btn mockup-btn--line-sm"
                >
                  <MessageSquare size={14} />
                  LINE 專人即時諮詢
                </a>
              </div>
            </div>
          </aside>

          {/* 條款內容區塊 */}
          <div className="mockup-agr-articles">
            {/* ─── 章節 1: 法定依據與簽約方式 ─── */}
            <article className="mockup-agr-card" id="legal">
              <div className="mockup-agr-card__header">
                <div className="mockup-agr-card__num">01</div>
                <div>
                  <span className="mockup-agr-card__badge">LEGAL BASIS</span>
                  <h2 className="mockup-agr-card__title">法定依據與簽約方式</h2>
                </div>
              </div>
              <div className="mockup-agr-card__body">
                <p>
                  依據中華民國交通部觀光局《觀光旅館業與旅館業及民宿個別旅客直接訂房定型化契約應記載及不得記載事項》之法規準則，本民宿與旅客簽約方式固定適用<strong>「預收約定房價總金額」</strong>。
                </p>

                <div className="mockup-agr-info-grid">
                  <div className="mockup-agr-info-item">
                    <Building2 className="mockup-agr-info-icon" size={18} />
                    <div>
                      <strong>合法民宿登記證號</strong>
                      <p>你好哇寓所：高雄市民宿 131 號<br />溝頂民宿：高雄市民宿 163 號</p>
                    </div>
                  </div>
                  <div className="mockup-agr-info-item">
                    <ShieldCheck className="mockup-agr-info-icon" size={18} />
                    <div>
                      <strong>公共意外責任險</strong>
                      <p>兩館依法向富邦產物保險投保公共意外責任險，保障入住期間人身與空間安全。</p>
                    </div>
                  </div>
                  <div className="mockup-agr-info-item">
                    <FileText className="mockup-agr-info-icon" size={18} />
                    <div>
                      <strong>合法收據開立（報帳核銷）</strong>
                      <p>本館為免用統一發票商家，可提供開立蓋有合法民宿章、可填統編與抬頭之正式收據。</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* ─── 章節 2: 訂房付款與押金規範 ─── */}
            <article className="mockup-agr-card" id="payment">
              <div className="mockup-agr-card__header">
                <div className="mockup-agr-card__num">02</div>
                <div>
                  <span className="mockup-agr-card__badge">PAYMENT & DEPOSIT</span>
                  <h2 className="mockup-agr-card__title">訂房付款、押金與加人規定</h2>
                </div>
              </div>
              <div className="mockup-agr-card__body">
                <ul className="mockup-agr-list">
                  <li>
                    <strong>付款時限與檔期保留：</strong>
                    完成線上簽約後，住宿費用總額需於 <strong>12 小時內</strong> 完成匯款以確立訂單與保留檔期；逾時系統將自動釋出日期供其他貴賓預訂。
                  </li>
                  <li>
                    <strong>入住押金制度（NT$ 5,000）：</strong>
                    為維護空間設備完整性與保障雙方權益，辦理入住時需收取押金 <strong>新台幣 5,000 元整</strong>。於退房後經管家確認無任何設備損壞，且未違反入住須知（如室內吸菸、過於髒亂等）後，於<strong>退房當日全數無息匯款退還</strong>。
                  </li>
                  <li>
                    <strong>誠實申報入住人數：</strong>
                    請嚴格依實際訂房人數入住。如未事先告知而超出預定人數，現場查核將加收 <strong>每人每晚 NT$ 1,800</strong>。
                  </li>
                </ul>

                {/* 加人加床費用表 */}
                <div className="mockup-agr-table-wrap">
                  <h3 className="mockup-agr-table-title">加人 / 加床與幼兒計費標準表</h3>
                  <table className="mockup-agr-table">
                    <thead>
                      <tr>
                        <th>項目類別</th>
                        <th>申請規範</th>
                        <th>收費標準</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>事先加人（床）</strong></td>
                        <td>請於入住前一日提前告知，以利備品床位安排</td>
                        <td>
                          <span className="mockup-agr-highlight">平日每人 NT$ 1,000 / 晚</span><br />
                          <span className="mockup-agr-highlight">假日/連假每人 NT$ 1,500 / 晚</span>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>未申報超額入住</strong></td>
                        <td>未事先告知、現場超出訂房人數者</td>
                        <td>
                          <span className="mockup-agr-danger">每人每晚 NT$ 1,800</span>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>6 歲以下兒童（不佔床）</strong></td>
                        <td>不佔床位、不需額外寢具與備品，需出示年齡證件</td>
                        <td>
                          <span className="mockup-agr-free">免收住宿費用</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>

            {/* ─── 章節 3: 改期與退款處理辦法 ─── */}
            <article className="mockup-agr-card" id="cancellation">
              <div className="mockup-agr-card__header">
                <div className="mockup-agr-card__num">03</div>
                <div>
                  <span className="mockup-agr-card__badge">RESCHEDULING & REFUND</span>
                  <h2 className="mockup-agr-card__title">改期政策與退款處理辦法</h2>
                </div>
              </div>
              <div className="mockup-agr-card__body">
                <p>
                  由於包棟住宿為「全棟專屬獨享制」，一旦預訂即為您的團體封閉整棟檔期不再對外開放。本合約固定適用定型化契約之<strong>「一年內保留已付金額作為日後消費折抵使用」</strong>處理原則：
                </p>

                <div className="mockup-agr-alert mockup-agr-alert--gold">
                  <div className="mockup-agr-alert__icon">
                    <RefreshCcw size={20} />
                  </div>
                  <div>
                    <strong>一年內彈性改期承諾（不扣款折抵）</strong>
                    <p>
                      旅客解約通知於<strong>預定住宿日當日前（入住日前一日 23:59 前）</strong>到達者，已付金額全額保留，得於原入住日期起<strong>一年內</strong>挑選新日期再次入住折抵使用（新日期房價多退少補）。
                    </p>
                  </div>
                </div>

                <ul className="mockup-agr-list">
                  <li>
                    <strong>當日取消或未到（No-Show）：</strong>
                    旅客解約通知於預定住宿日當日到達或未為解約通知者，業者得不退還預收約定房價總金額。
                  </li>
                  <li>
                    <strong>天災不可抗力保障：</strong>
                    因不可抗力或其他不可歸責於雙方之事由（如中央氣象署發布高雄地區陸上颱風警報、宣布停班停課），致契約無法履行時，業者將<strong>全數無息退還旅客已支付之全部費用</strong>。
                  </li>
                </ul>
              </div>
            </article>

            {/* ─── 章節 4: 進退房時間與行李寄放 ─── */}
            <article className="mockup-agr-card" id="checkin">
              <div className="mockup-agr-card__header">
                <div className="mockup-agr-card__num">04</div>
                <div>
                  <span className="mockup-agr-card__badge">CHECK-IN & OUT</span>
                  <h2 className="mockup-agr-card__title">進退房時間與行李寄放規範</h2>
                </div>
              </div>
              <div className="mockup-agr-card__body">
                <div className="mockup-agr-time-grid">
                  <div className="mockup-agr-time-card">
                    <span className="mockup-agr-time-card__kicker">進房時間 CHECK-IN</span>
                    <strong className="mockup-agr-time-card__hour">16:00 以後</strong>
                    <p>房務整理完成後，密碼將透過 LINE 發送，最遲於 16:00 前送達，旅客即可自主密碼感應進門。</p>
                  </div>

                  <div className="mockup-agr-time-card">
                    <span className="mockup-agr-time-card__kicker">退房時間 CHECK-OUT</span>
                    <strong className="mockup-agr-time-card__hour">11:00 以前</strong>
                    <p>請於上午 11:00 前完成自助退房離開，關妥門窗冷氣，管家將進行全棟清潔與押金核退。</p>
                  </div>
                </div>

                <ul className="mockup-agr-list" style={{ marginTop: "18px" }}>
                  <li>
                    <strong>提早寄放行李：</strong>
                    入住當天中午 <strong>12:00 起</strong> 可統一先行寄放行李於一樓公共空間。需提前告知管家，放妥後請即行離開以利全棟深層清潔與紫外線消毒。
                  </li>
                  <li>
                    <strong>退房後無寄放服務：</strong>
                    為維護當日下一組包棟旅客之隱私權益與清消作業，退房後無法提供行李寄放服務，建議多加利用捷運鹽埕埔站之付費置物櫃。
                  </li>
                  <li>
                    <strong>延後退房計費：</strong>
                    需經業者事前同意，每小時加收 <strong>NT$ 1,800</strong>；超過 4 小時以續住一天計算（視當日房況安排）。
                  </li>
                  <li>
                    <strong>線上實名簽約與證件上傳：</strong>
                    為落實旅館業管理規則，入住前請配合完成線上實名簽約並上傳主要訂房人身分證件（身分證、居留證或護照；健保卡不可替代）。
                  </li>
                </ul>
              </div>
            </article>

            {/* ─── 章節 5: 全館禁止事項與安全守則 ─── */}
            <article className="mockup-agr-card" id="prohibited">
              <div className="mockup-agr-card__header">
                <div className="mockup-agr-card__num">05</div>
                <div>
                  <span className="mockup-agr-card__badge mockup-agr-card__badge--danger">STRICT RULES</span>
                  <h2 className="mockup-agr-card__title">全館禁止事項與安全守則</h2>
                </div>
              </div>
              <div className="mockup-agr-card__body">
                <div className="mockup-agr-alert mockup-agr-alert--danger">
                  <div className="mockup-agr-alert__icon">
                    <Ban size={22} />
                  </div>
                  <div>
                    <strong>全棟嚴禁室內吸菸（含電子菸與陽台）</strong>
                    <p>
                      本館全面禁菸！若經發現於室內任何區域吸菸，將<strong>直接扣除全額押金 NT$ 5,000</strong> 作為特殊無毒清消與除味費用。吸菸需求請一律移步至一樓戶外通風區。
                    </p>
                  </div>
                </div>

                <ul className="mockup-agr-list">
                  <li>
                    <strong>嚴禁不法與危險行為：</strong>
                    全棟嚴禁吸毒、賭博、嚼檳榔、燃放爆竹、攜帶危險物品、嚴禁室內外明火烤肉，及任何違反善良風俗之不法行為。經發現將<strong>直接報警處理並強制退房，不予退還任何費用</strong>。
                  </li>
                  <li>
                    <strong>寵物入住特別規範：</strong>
                    本館非寵物友善旅宿，原則禁止攜帶寵物。小型貓犬需事前詢問並取得書面同意（<strong>不接受入住當天臨時詢問</strong>），經同意後每隻酌收清潔費 <strong>NT$ 800</strong>，全程不可上床、不可上沙發，如造成損壞需照價賠償。
                  </li>
                  <li>
                    <strong>謝絕非當日住客進入：</strong>
                    為維護全體房客隱私與安全，除當日報備之入住房客外，<strong>恕不對外開放參觀，且嚴禁非當日住客進入館內</strong>。
                  </li>
                  <li>
                    <strong>屋主私人空間禁入宣告：</strong>
                    包棟開放區域為一樓公共廚房客廳與所開立之客房；其餘區域（包含頂樓露台及通往頂樓之樓梯間）為屋主私人空間，<strong>未經同意嚴禁人員進入，若經發現將依法刑法 306 條侵入住宅罪逕行報警處理</strong>。
                  </li>
                </ul>
              </div>
            </article>

            {/* ─── 章節 6: 住宅區安寧與清潔賠償 ─── */}
            <article className="mockup-agr-card" id="quiet">
              <div className="mockup-agr-card__header">
                <div className="mockup-agr-card__num">06</div>
                <div>
                  <span className="mockup-agr-card__badge">HOUSE RULES & CARE</span>
                  <h2 className="mockup-agr-card__title">住宅區安寧時間與清潔賠償標準</h2>
                </div>
              </div>
              <div className="mockup-agr-card__body">
                <div className="mockup-agr-alert mockup-agr-alert--gold">
                  <div className="mockup-agr-alert__icon">
                    <Moon size={20} />
                  </div>
                  <div>
                    <strong>夜間安寧時段（23:00 至翌日 08:00）</strong>
                    <p>
                      民宿位於歷史悠久的寧靜鹽埕住宅區，<strong>夜間 23:00 後請務必降低室內音量、關閉門窗</strong>，嚴禁大聲喧嘩或開吵鬧派對。若經鄰居投訴且屢勸無效者，得要求立即退房且不予退還房費。
                    </p>
                  </div>
                </div>

                <ul className="mockup-agr-list">
                  <li>
                    <strong>公共設備復原義務：</strong>
                    開放式中島廚房、手動麻將桌於入住期間免費提供使用。使用後請務必洗淨餐具碗盤、恢復原貌，並隨手關閉電源、冷氣與節約用水。
                  </li>
                  <li>
                    <strong>垃圾清運方式：</strong>
                    請將垃圾分類打包，於隔天出門時放置於一樓大門口並透過 LINE 通知管家，我們將安排專人收走清運。
                  </li>
                </ul>

                {/* 特殊清潔與損壞賠償價目 */}
                <div className="mockup-agr-table-wrap">
                  <h3 className="mockup-agr-table-title">特殊清潔費與損壞賠償標準</h3>
                  <table className="mockup-agr-table">
                    <thead>
                      <tr>
                        <th>違規或損壞情境</th>
                        <th>處理說明</th>
                        <th>收費標準</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>室內吸菸行為</strong></td>
                        <td>室內、浴廁、陽台吸菸（含電子菸）</td>
                        <td><span className="mockup-agr-danger">扣除全額押金 NT$ 5,000</span></td>
                      </tr>
                      <tr>
                        <td><strong>寢具沾染特殊髒污</strong></td>
                        <td>血漬、紅酒、嘔吐物、不可水洗污漬</td>
                        <td><span className="mockup-highlight">NT$ 500 ～ 2,000 / 件</span></td>
                      </tr>
                      <tr>
                        <td><strong>公共空間未復原/髒亂</strong></td>
                        <td>廚房油膩未洗、客廳混亂、滿地垃圾</td>
                        <td><span className="mockup-highlight">NT$ 500 ～ 5,000</span></td>
                      </tr>
                      <tr>
                        <td><strong>設備/家具/鑰匙損壞</strong></td>
                        <td>門鎖、電器、玻璃、桌椅家具損壞</td>
                        <td>照原廠維修或新品市價賠償</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>

            {/* ─── 章節 7: 連住優惠與房務服務 ─── */}
            <article className="mockup-agr-card" id="continuous-stay">
              <div className="mockup-agr-card__header">
                <div className="mockup-agr-card__num">07</div>
                <div>
                  <span className="mockup-agr-card__badge">EXTENDED STAY</span>
                  <h2 className="mockup-agr-card__title">連住優惠與房務服務條款</h2>
                </div>
              </div>
              <div className="mockup-agr-card__body">
                <p>
                  本條款適用所有連住訂單（連續入住 2 晚以上）。為給予房客最優惠的連住價格並落實綠色環保，<strong>連住優惠房價不包含（亦不另外主動提供）每日房務清掃與備品更換</strong>。連住期間旅客仍完整獨享所有客房與公共空間。
                </p>

                <div className="mockup-agr-table-wrap">
                  <h3 className="mockup-agr-table-title">連住期間加購房務服務價目表（需至少提前一日預約）</h3>
                  <table className="mockup-agr-table">
                    <thead>
                      <tr>
                        <th>加購服務項目</th>
                        <th>服務內容</th>
                        <th>自費標準</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>客房全套清掃</strong></td>
                        <td>客房地面清潔、衛浴打掃整理</td>
                        <td><strong>NT$ 600 / 次</strong></td>
                      </tr>
                      <tr>
                        <td><strong>寢具更換服務</strong></td>
                        <td>床單、被套及枕套全組更換</td>
                        <td><strong>NT$ 400 / 組</strong></td>
                      </tr>
                      <tr>
                        <td><strong>一般備品補充</strong></td>
                        <td>浴巾、毛巾更換與衛生紙補充</td>
                        <td><strong>NT$ 100 / 次</strong></td>
                      </tr>
                      <tr>
                        <td><strong>垃圾整理清運</strong></td>
                        <td>客房與公區垃圾集中收整清運</td>
                        <td><strong>NT$ 300 / 次</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>

            {/* ─── 章節 8: 雙方權益保障與爭議處理 ─── */}
            <article className="mockup-agr-card" id="official-rights">
              <div className="mockup-agr-card__header">
                <div className="mockup-agr-card__num">08</div>
                <div>
                  <span className="mockup-agr-card__badge">CONSUMER RIGHTS</span>
                  <h2 className="mockup-agr-card__title">雙方權益保障與爭議處理</h2>
                </div>
              </div>
              <div className="mockup-agr-card__body">
                <ul className="mockup-agr-list">
                  <li>
                    <strong>訂房內容變更：</strong>
                    旅客於訂房後要求變更住宿日期、住宿天數、房型或房間數量，經業者同意者，不需支付因變更所生之手續費用。
                  </li>
                  <li>
                    <strong>履約與設備故障處理：</strong>
                    業者應確保旅客入住期間客房合於使用狀態；非因旅客原因致設備故障時，旅客得請求業者立即妥適處理或更換房間。
                  </li>
                  <li>
                    <strong>個人資料保護承諾：</strong>
                    業者對旅客個人資料之蒐集、處理及利用，依法負保密義務；非經旅客同意，絕不於契約目的外利用或對外揭露。
                  </li>
                  <li>
                    <strong>爭議處理與準據法：</strong>
                    本契約以中華民國法律為準據法；爭議處理不得排除消費者保護法及民事訴訟法關於消費者管轄之規定。
                  </li>
                </ul>

                <div className="mockup-agr-contact-box">
                  <div>
                    <strong>Hello Stay 官方客服與緊急聯絡管道</strong>
                    <p>如在入住期間有任何即時需求、設備疑問或緊急狀況，請立即聯繫專人管家：</p>
                  </div>
                  <div className="mockup-agr-contact-actions">
                    <a href="tel:0932828922" className="mockup-btn mockup-btn--outline">
                      <PhoneCall size={15} /> 0932-828922
                    </a>
                    <a
                      href="https://lin.ee/atCiMQw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mockup-btn mockup-btn--line"
                    >
                      <MessageSquare size={15} /> LINE 官方客服
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* ═══ 3. 常見疑問 FAQ 手風琴 ═══ */}
            <section className="mockup-agr-faq">
              <div className="mockup-agr-faq__head">
                <span className="mockup-pill mockup-pill--gold">FAQ</span>
                <h2>旅客簽約前最常確認的 5 個核心問題</h2>
                <p>將最常被詢問的改期、押金與寄放細節整理於此，幫助您快速釐清。</p>
              </div>

              <div className="mockup-agr-faq__list">
                {agreementFaqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <details
                      key={faq.q}
                      className={`mockup-agr-faq__item ${isOpen ? "is-open" : ""}`}
                      open={isOpen}
                      onToggle={(e) => {
                        const details = e.currentTarget;
                        setOpenFaqIndex(details.open ? index : null);
                      }}
                    >
                      <summary className="mockup-agr-faq__summary">
                        <span>{faq.q}</span>
                        <span className="mockup-faq__chevron" aria-hidden="true">
                          <ChevronDown size={18} />
                        </span>
                      </summary>
                      <div className="mockup-agr-faq__answer">
                        <p>{faq.a}</p>
                      </div>
                    </details>
                  );
                })}
              </div>
            </section>

            {/* ═══ 4. 底部行動呼籲 ═══ */}
            <section className="mockup-agr-bottom-cta">
              <div className="mockup-agr-bottom-cta__inner">
                <div>
                  <h3 className="mockup-agr-bottom-cta__title">準備好預約您的鹽埕包棟假期了嗎？</h3>
                  <p className="mockup-agr-bottom-cta__desc">
                    透明規範、每間客房皆有獨立衛浴、整棟專屬獨享。立即前往官方系統查詢即時空房與透明報價。
                  </p>
                </div>
                <div className="mockup-agr-bottom-cta__actions">
                  <Link href="/book" className="mockup-btn mockup-btn--gold-solid">
                    查詢即時空房與報價 <ArrowRight size={16} />
                  </Link>
                  <a
                    href="https://www.ey.gov.tw/File/E9EE77286036F2D4?A=C"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mockup-btn mockup-btn--outline-light"
                  >
                    <FileText size={16} /> 行政院定型化契約範本 <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
