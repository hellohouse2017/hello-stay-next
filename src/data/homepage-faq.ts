export const homepageLastReviewed = "2026-08-25";

export type FaqCategoryId = "all" | "rooms" | "checkin" | "amenities" | "booking" | "rules";

export interface FaqCategory {
  id: Exclude<FaqCategoryId, "all">;
  label: string;
  shortLabel: string;
  iconName: string;
}

export interface HomepageFaqItem {
  id: string;
  category: Exclude<FaqCategoryId, "all">;
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
  keywords?: string[];
}

export const faqCategories: FaqCategory[] = [
  { id: "rooms", label: "方案與房型", shortLabel: "房型方案", iconName: "House" },
  { id: "checkin", label: "入住與退房", shortLabel: "入退房", iconName: "KeyRound" },
  { id: "amenities", label: "設施與生活", shortLabel: "設施設備", iconName: "Utensils" },
  { id: "booking", label: "訂房與費用", shortLabel: "訂房付款", iconName: "CreditCard" },
  { id: "rules", label: "守則與保障", shortLabel: "住宿守則", iconName: "ShieldCheck" },
];

export const homepageFaqItems: HomepageFaqItem[] = [
  // ─── 1. 方案與房型 (rooms) ───
  {
    id: "rooms-options",
    category: "rooms",
    categoryLabel: "方案與房型",
    question: "Hello Stay 目前有哪些可訂方案？提供幾間客房？",
    answer:
      "目前提供三大包棟方案：溝頂民宿為 4 房包棟（4-12 人）、你好哇寓所為 6 房包棟（8-26 人），以及雙館合住 10 房包棟（27-36 人）。雙館通常適合 27-34 人，35-36 人須加床；大智若愚仍在規劃中，尚未開放訂房。",
    highlights: ["溝頂 4 房 (4-12人)", "你好哇 6 房 (8-26人)", "雙館 10 房 (27-36人)"],
    keywords: ["方案", "幾間房", "幾人", "大智若愚", "溝頂", "你好哇", "雙館", "人數"],
  },
  {
    id: "rooms-ensuite",
    category: "rooms",
    categoryLabel: "方案與房型",
    question: "客房皆有獨立衛浴嗎？包棟如果人數較少，開房規則是什麼？",
    answer:
      "你好哇寓所 6 間客房與溝頂民宿 4 間客房皆為獨立衛浴設計。Hello Stay 實行全棟獨立包棟制，入住期間整棟建築包含所有公共空間（中島廚房、交誼廳、麻將桌）皆由您的團體專屬獨享，絕無陌生人混住；客房則依您預訂的方案與人數開放對應房間數，未開放之房間會上鎖以確保房務維護與品質。",
    highlights: ["每房獨立衛浴", "整棟專屬獨享", "依預訂方案開房"],
    keywords: ["獨立衛浴", "開房規則", "專屬獨享", "隱私", "廁所", "公共空間"],
  },
  {
    id: "rooms-recommendation",
    category: "rooms",
    categoryLabel: "方案與房型",
    question: "4-8 人（如 3-4 對情侶或小家庭）應該選哪一館？",
    answer:
      "想要小團體整棟獨享、四間獨立客房與交誼空間，優先推薦溝頂民宿 4 房包棟；若同行需要完整大型中島廚房和更大公共活動空間，可選擇你好哇寓所 6 房包棟。",
    highlights: ["小團體首選溝頂 4 房", "大中島廚房選你好哇 6 房"],
    keywords: ["情侶", "小家庭", "推薦", "選館", "4人", "6人", "8人", "小團體"],
  },
  {
    id: "rooms-bed-types",
    category: "rooms",
    categoryLabel: "方案與房型",
    question: "有兩張單人床的房型嗎？雙人床多大？",
    answer:
      "目前房型皆為標準雙人床（150×200 公分），沒有兩張單人床房型。",
    highlights: ["標準雙人床 (150×200 cm)", "無單人雙床房型"],
    keywords: ["單人床", "雙人床", "床型", "尺寸", "兩張床", "加床"],
  },
  {
    id: "rooms-children",
    category: "rooms",
    categoryLabel: "方案與房型",
    question: "6 歲以下小孩怎麼計費？",
    answer:
      "6 歲以下且不佔床、不需寢具備品可不計入費用；仍需如實申報並出示年齡證件。需要床位或備品則列入一般人數計算。",
    highlights: ["6 歲以下不佔床不備品免費", "需如實申報出示證件"],
    keywords: ["小孩", "兒童", "嬰兒", "計費", "免費", "幼兒", "6歲"],
  },

  // ─── 2. 入住與退房 (checkin) ───
  {
    id: "checkin-time",
    category: "checkin",
    categoryLabel: "入住與退房",
    question: "入住和退房時間是幾點？",
    answer:
      "入住時間為下午 4 點（16:00）後，退房請於上午 11 點（11:00）前完成。可申請延後退房（每小時 NT$1,800，超過 4 小時以續住一天計算），需視當天房務狀況確認。",
    highlights: ["16:00 入住", "11:00 退房", "延後退房 NT$1,800/hr"],
    keywords: ["入住時間", "退房時間", "幾點入住", "幾點退房", "checkin", "checkout", "幾點"],
  },
  {
    id: "checkin-luggage",
    category: "checkin",
    categoryLabel: "入住與退房",
    question: "可以先放行李或退房後寄放行李嗎？",
    answer:
      "入住當天中午 12 點後可統一寄放行李，需提前告知且放完即離開。退房後無法寄放行李；建議使用鹽埕埔站或美麗島站付費置物櫃。",
    highlights: ["入住日 12:00 起可寄放行李", "退房後無寄放（推薦捷運置物櫃）"],
    keywords: ["行李", "寄放", "提早放行李", "置物櫃", "捷運置物櫃", "退房寄放"],
  },
  {
    id: "checkin-door-code",
    category: "checkin",
    categoryLabel: "入住與退房",
    question: "門鎖密碼什麼時候發送？",
    answer:
      "入住當天整理完成後透過 LINE 發送，最遲下午 4 點前發送。若尚未收到通常是清潔收尾中，請稍候。",
    highlights: ["LINE 自動發送密碼", "最遲入住日 16:00 前收到"],
    keywords: ["密碼", "門鎖", "電子鎖", "進門", "開門", "LINE", "發送"],
  },
  {
    id: "checkin-id-upload",
    category: "checkin",
    categoryLabel: "入住與退房",
    question: "入住需要帶證件嗎？",
    answer:
      "需完成線上簽約與證件上傳。身分證無法上傳時可改用駕照；健保卡不可替代。",
    highlights: ["線上簽約需上傳身分證/駕照", "健保卡不可替代"],
    keywords: ["證件", "身分證", "駕照", "健保卡", "簽約", "上傳證件", "實名"],
  },
  {
    id: "checkin-host-reception",
    category: "checkin",
    categoryLabel: "入住與退房",
    question: "到達民宿時會有人接待嗎？",
    answer:
      "一般為自助進入，密碼透過 LINE 發送。如有緊急狀況（無法進門、設備異常）可撥打緊急電話 0932-828922。",
    highlights: ["密碼自主入住", "緊急專線 0932-828-922"],
    keywords: ["接待", "管家", "自助入住", "有人在嗎", "緊急電話", "電話"],
  },
  {
    id: "checkin-early-late",
    category: "checkin",
    categoryLabel: "入住與退房",
    question: "可以提早入住或延後退房嗎？",
    answer:
      "可先登記提早入住需求，當天整理完成會主動通知但不保證提前；延後退房每小時 NT$1,800，超過 4 小時以續住一天計算。",
    highlights: ["提早入住視當日房況", "延退 NT$1,800/hr (逾4hr計續住)"],
    keywords: ["提早入住", "延後退房", "晚退", "早進", "加時", "延退"],
  },
  {
    id: "checkin-checkout-process",
    category: "checkin",
    categoryLabel: "入住與退房",
    question: "退房要等管家到場檢查嗎？",
    answer:
      "不用，自助退房上午 11 點前離開即可。押金由管家核對後匯款退還。",
    highlights: ["11:00 前自助退房無須等待", "押金當天核對匯退"],
    keywords: ["退房檢查", "等管家", "自助退房", "離開", "鑰匙"],
  },

  // ─── 3. 設施與生活 (amenities) ───
  {
    id: "amenities-cooking-mahjong",
    category: "amenities",
    categoryLabel: "設施與生活",
    question: "可以自己煮飯或打麻將嗎？",
    answer:
      "你好哇寓所有雙口 IH 爐、冰箱、烤箱、微波爐與完整餐具，也有手動麻將桌；溝頂民宿有流理台、冰箱、微波爐與手動麻將桌，適合簡單備餐。",
    highlights: ["你好哇雙口 IH 爐+烤箱+微波爐", "兩館皆備手動麻將桌組"],
    keywords: ["煮飯", "開伙", "廚房", "IH爐", "麻將", "微波爐", "烤箱", "餐具"],
  },
  {
    id: "amenities-ktv-mahjong",
    category: "amenities",
    categoryLabel: "設施與生活",
    question: "有 KTV、卡拉OK 或電動麻將桌嗎？",
    answer:
      "兩館均無 KTV、卡拉OK 或歌唱設備。提供手動麻將桌組（麻將不需自備），但沒有電動麻將桌。",
    highlights: ["兩館皆無 KTV/歌唱設備", "附手動麻將（無電動麻將桌）"],
    keywords: ["KTV", "唱歌", "卡拉OK", "電動麻將桌", "音響", "歡唱"],
  },
  {
    id: "amenities-water",
    category: "amenities",
    categoryLabel: "設施與生活",
    question: "RO 飲用水在哪裡？可以直接喝嗎？",
    answer:
      "流理台左邊是 RO 可生飲水，右邊是自來水。",
    highlights: ["流理台左側 RO 水可直接生飲", "右側為一般自來水"],
    keywords: ["水", "飲水機", "RO", "喝水", "生飲", "自來水", "流理台"],
  },
  {
    id: "amenities-kitchen-layout",
    category: "amenities",
    categoryLabel: "設施與生活",
    question: "溝頂民宿有廚房嗎？公共空間在哪裡？",
    answer:
      "溝頂四樓有流理台、冰箱、微波爐與簡易備餐區（不開放明火）。你好哇公共空間在一樓廚房與休息區；溝頂在四樓。",
    highlights: ["你好哇公區在一樓大中島廚房", "溝頂公區備餐在四樓"],
    keywords: ["溝頂廚房", "公共空間", "交誼廳", "四樓", "一樓", "備餐"],
  },
  {
    id: "amenities-breakfast",
    category: "amenities",
    categoryLabel: "設施與生活",
    question: "有附早餐嗎？附近有美食推薦嗎？",
    answer:
      "方案不附早餐，也無合作早餐店優惠。可自行使用廚房簡單備餐；附近美食推薦請參考官網美食指南。",
    highlights: ["不附早餐（可自行備餐）", "步行 3-5 分鐘即達鹽埕在地美食街"],
    keywords: ["早餐", "早點", "美食", "附近吃什麼", "小吃", "鹽埕美食"],
  },
  {
    id: "amenities-location-mrt",
    category: "amenities",
    categoryLabel: "設施與生活",
    question: "走路到捷運鹽埕埔站與駁二要多久？",
    answer:
      "兩館走到捷運鹽埕埔站約 5 分鐘，走到駁二藝術特區約 10 分鐘；實際時間會依出入口與步行速度略有差異。",
    highlights: ["捷運鹽埕埔站 步行 5 分鐘", "駁二藝術特區 步行 10 分鐘"],
    keywords: ["捷運", "鹽埕埔站", "駁二", "大港橋", "交通", "走路", "距離"],
  },

  // ─── 4. 訂房與費用 (booking) ───
  {
    id: "booking-availability-quote",
    category: "booking",
    categoryLabel: "訂房與費用",
    question: "如何查即時空房與實際價格？",
    answer:
      "在官網輸入入住日、退房日與人數或房間數，即可前往官方訂房站查看可選方案、空房與當次報價；官方直訂免收平台手續費。",
    highlights: ["官網直訂免手續費", "即時查空房與透明報價"],
    keywords: ["查空房", "房價", "價格", "報價", "直訂", "免手續費", "費用"],
  },
  {
    id: "booking-payment-deposit",
    category: "booking",
    categoryLabel: "訂房與費用",
    question: "怎麼付款？押金多少？",
    answer:
      "簽約後住宿費需於 12 小時內匯款完成預訂；另於入住前支付押金 NT$5,000，退房確認無違規當天全額無息退還。實際金額以報價卡為準。",
    highlights: ["簽約 12 小時內完成匯款", "押金 NT$5,000（退房當天無息退還）"],
    keywords: ["付款", "匯款", "押金", "保證金", "5000", "退還押金"],
  },
  {
    id: "booking-cancellation-reschedule",
    category: "booking",
    categoryLabel: "訂房與費用",
    question: "取消訂房可以退款嗎？",
    answer:
      "訂房後不提供退款；可在原入住日期起一年內申請改期，視新日期房況安排，價差多退少補。",
    highlights: ["不提供退款", "原入住日起一年內享彈性改期（多退少補）"],
    keywords: ["退款", "取消", "改期", "換日期", "退費", "取消訂房"],
  },
  {
    id: "booking-discounts-creditcard",
    category: "booking",
    categoryLabel: "訂房與費用",
    question: "有優惠嗎？可以刷卡嗎？",
    answer:
      "連住期間不更換備品系統自動產生優惠價格。目前付款方式為匯款，暫時無刷卡服務。",
    highlights: ["連住享自動折扣優惠", "目前僅支援銀行匯款（無刷卡）"],
    keywords: ["優惠", "折扣", "連住", "刷卡", "信用卡", "LINE Pay"],
  },
  {
    id: "booking-receipt-tax",
    category: "booking",
    categoryLabel: "訂房與費用",
    question: "有收據或發票嗎？",
    answer:
      "我們為免用統一發票商家，可提供合法收據並填寫抬頭與統編。如需收據請提早於入住前告知並提供相關資訊。",
    highlights: ["免用統一發票商家", "提供合法報帳收據（可填抬頭與統編）"],
    keywords: ["收據", "發票", "統編", "抬頭", "報帳", "公司報帳", "核銷"],
  },
  {
    id: "booking-hold-dates",
    category: "booking",
    categoryLabel: "訂房與費用",
    question: "可以先保留日期嗎？怎麼保留？",
    answer:
      "先完成線上簽約即可保留檔期；簽約後 12 小時內未完成匯款會自動釋出日期。",
    highlights: ["線上簽約即刻保留檔期", "12 小時內未匯款自動釋出"],
    keywords: ["保留", "保留日期", "鎖檔期", "保留幾天", "留房"],
  },
  {
    id: "booking-ota-agoda",
    category: "booking",
    categoryLabel: "訂房與費用",
    question: "Agoda 上可以訂你們嗎？",
    answer:
      "官方未授權 Agoda 平台上架訂房。所有預訂請透過官網或官方 LINE 帳號確認，以保障您的權益。",
    highlights: ["官方未授權 Agoda 上架", "請透過官網或官方 LINE 訂房"],
    keywords: ["Agoda", "Booking.com", "平台", "OTA", "防詐騙", "第三方"],
  },

  // ─── 5. 守則與保障 (rules) ───
  {
    id: "rules-pets",
    category: "rules",
    categoryLabel: "守則與保障",
    question: "可以攜帶寵物嗎？",
    answer:
      "原則上不接受寵物入住。小型貓犬須事前詢問並取得同意，經同意後每隻清潔費 NT$800；需自備睡墊或籠子，全程不可上床沙發。",
    highlights: ["原則不接受寵物", "小型貓犬須事前同意 清潔費 NT$800/隻", "不可上床沙發"],
    keywords: ["寵物", "狗", "貓", "毛小孩", "帶狗", "帶貓", "清潔費"],
  },
  {
    id: "rules-smoking-bbq",
    category: "rules",
    categoryLabel: "守則與保障",
    question: "可以烤肉嗎？可以吸菸嗎？",
    answer:
      "不可以烤肉，館內嚴禁明火。全面禁菸含室內、陽台、樓梯間與電子菸，違規罰款 NT$5,000。",
    highlights: ["館內嚴禁烤肉與明火", "全館全面禁菸（含電子菸）違規罰 NT$5,000"],
    keywords: ["烤肉", "抽菸", "吸菸", "煙", "電子煙", "明火", "罰款", "陽台"],
  },
  {
    id: "rules-quiet-hours-party",
    category: "rules",
    categoryLabel: "守則與保障",
    question: "晚上可以大聲聊天或開派對嗎？",
    answer:
      "晚上 23:00 至隔日早上 08:00 為安寧時間，請降低音量避免影響鄰居。23:00 後不適合舉辦吵鬧派對。",
    highlights: ["23:00 - 08:00 夜間安寧時間", "嚴禁喧嘩開吵鬧派對"],
    keywords: ["派對", "吵鬧", "音量", "安寧時間", "喝酒", "聊天", "鄰居", "大聲"],
  },
  {
    id: "rules-trash",
    category: "rules",
    categoryLabel: "守則與保障",
    question: "垃圾怎麼處理？住宿期間垃圾滿了怎麼辦？",
    answer:
      "隔天出門時將垃圾放置一樓門口並通知管家，會派人收走。",
    highlights: ["出門置於一樓門口並通知管家", "專人每日協助清運"],
    keywords: ["垃圾", "丟垃圾", "清運", "滿了", "廚餘", "一樓門口"],
  },
  {
    id: "rules-legal-license",
    category: "rules",
    categoryLabel: "守則與保障",
    question: "你好哇寓所與溝頂民宿都是合法登記民宿嗎？",
    answer:
      "是。你好哇寓所登記證號為高雄市民宿 131 號，溝頂民宿為高雄市民宿 163 號，兩館並依法投保公共意外責任險。",
    highlights: ["你好哇 高雄市民宿 131 號", "溝頂 高雄市民宿 163 號", "投保公共意外責任險"],
    keywords: ["合法", "證號", "登記證", "安全", "保險", "公共意外險", "合法民宿"],
  },
];
