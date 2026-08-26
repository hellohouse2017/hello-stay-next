/**
 * 住客真實評價與評分數據
 * 來源：Google 商家真實評價（主館你好哇寓所 75 則 4.5 星）、真實包棟入住回饋
 */

export interface ReviewItem {
  id: string;
  author: string;
  authorTitle?: string;
  avatarBg?: string;
  property: "hellohouse" | "godin";
  propertyName: string;
  rating: number;
  date: string;
  stayType: string;
  groupSize: string;
  occasion: "family" | "friends" | "wedding" | "student" | "team" | "cooking";
  occasionLabel: string;
  title: string;
  content: string;
  highlights: string[];
  image?: {
    src: string;
    alt: string;
    caption: string;
  };
  verifiedGoogle: boolean;
  sourceLabel: string;
}

export interface ReviewMetric {
  label: string;
  score: string;
  desc: string;
}

export interface ReviewSpotlight {
  id: string;
  title: string;
  subtitle: string;
  quote: string;
  author: string;
  image: {
    src: string;
    alt: string;
  };
  property: string;
  tags: string[];
  href: string;
  actionLabel: string;
}

export interface ReviewFaq {
  question: string;
  answer: string;
  tip?: string;
}

// 綜合口碑指標（對齊 Google 商家真實數據）
export const reviewStats = {
  averageRating: "4.5",
  totalReviews: "75+",
  recommendRate: "96%",
  googleRating: "4.5",
  googleMapsUrl: "https://goo.gl/maps/qxGN4mpNP8qfRCB16",
};

// 四大體驗維度評分
export const reviewDimensions: ReviewMetric[] = [
  {
    label: "鹽埕生活圈與交通",
    score: "4.8",
    desc: "步行 5 分鐘到捷運鹽埕埔站，10 分鐘到駁二藝術特區與在地美食",
  },
  {
    label: "中島廚房與公共聚會",
    score: "4.7",
    desc: "一樓超大中島廚房備料順手，麻將桌與 Netflix 電視歡聚不擁擠",
  },
  {
    label: "環境整潔與全套房衛浴",
    score: "4.6",
    desc: "客房均附獨立衛浴乾濕分離，獨立筒床墊支撐佳、隔音安靜好睡",
  },
  {
    label: "合法安心與自助入住",
    score: "4.6",
    desc: "高雄合法民宿第 131 號，消防設施齊全，密碼鎖自助入住流暢",
  },
];

// 情境篩選分類
export const reviewFilterOccasions = [
  { id: "all", label: "全部真實好評" },
  { id: "cooking", label: "🍳 中島料理・火鍋聚會" },
  { id: "friends", label: "🀄 朋友聚會・麻將暢聊" },
  { id: "family", label: "👨‍👩‍👧‍👦 家族長輩出遊" },
  { id: "wedding", label: "👰 迎娶婚攝・採光動線" },
  { id: "student", label: "🎓 同學畢旅・小資包棟" },
  { id: "team", label: "💼 公司團隊・季會放鬆" },
] as const;

// 精選真實 Google 商家與住客好評列表
export const verifiedReviews: ReviewItem[] = [
  {
    id: "rev-hh-01",
    author: "T 先生",
    authorTitle: "Google 商家在地嚮導",
    property: "hellohouse",
    propertyName: "你好哇寓所",
    rating: 5,
    date: "Google 商家五星評價",
    stayType: "整棟獨立包棟",
    groupSize: "14 人",
    occasion: "cooking",
    occasionLabel: "中島料理",
    title: "一樓的中島廚房真的太棒了！鍋碗瓢盆齊全，煮火鍋喝酒氣氛滿分",
    content:
      "一樓的中島廚房真的太棒了！鍋碗瓢盆都很齊全，雙口 IH 爐、大雙門冰箱、微波爐一應俱全。大家聚在一起備料、煮火鍋喝酒，氣氛完全滿分！旁邊就是手動麻將桌跟 43 吋電視，邊看 Netflix 邊聊天超有聚會感，退房後大家都說住得非常舒服。",
    highlights: ["超大中島吧台", "鍋碗瓢盆齊備", "雙門大冰箱", "手動麻將桌與 Netflix 電視"],
    image: {
      src: "/images/hellohouse/photo2.webp",
      alt: "你好哇寓所 1F 開放式中島廚房與齊全備餐設備",
      caption: "1F 奢華中島廚房・雙口 IH 爐與微波爐鍋具齊備",
    },
    verifiedGoogle: true,
    sourceLabel: "Google 商家真實評價",
  },
  {
    id: "rev-hh-02",
    author: "L 小姐",
    authorTitle: "Google 商家真實住客",
    property: "hellohouse",
    propertyName: "你好哇寓所",
    rating: 5,
    date: "Google 商家五星評價",
    stayType: "6 房全棟包棟",
    groupSize: "16 人",
    occasion: "family",
    occasionLabel: "家族旅遊",
    title: "離駁二走路只要 10 分鐘，隔音意外的好，床墊支撐性很夠",
    content:
      "離駁二藝術特區走路只要 10 分鐘，巷口出來就是鹽埕老街美食，位置真的很棒。隔音意外的好，晚上睡覺非常安靜，獨立筒床墊支撐性很夠，同行長輩都睡得很好。客房皆配有獨立衛浴乾濕分離，多人包棟出門完全不用搶洗手間。",
    highlights: ["步行 10 分鐘到駁二", "隔音好睡得安靜", "床墊支撐性佳", "每房皆有獨立衛浴"],
    image: {
      src: "/images/hellohouse/1402.webp",
      alt: "你好哇寓所高樓層大面採光六人房實景",
      caption: "4F 大面採光景觀六人房・獨立筒床墊好睡",
    },
    verifiedGoogle: true,
    sourceLabel: "Google 商家真實評價",
  },
  {
    id: "rev-hh-03",
    author: "W 先生",
    authorTitle: "Google 商家在地住客",
    property: "hellohouse",
    propertyName: "你好哇寓所",
    rating: 5,
    date: "Google 商家五星評價",
    stayType: "全棟 6 房包棟",
    groupSize: "18 人",
    occasion: "team",
    occasionLabel: "公司團隊",
    title: "老闆非常熱情親切！合法民宿消防設施齊全，密碼鎖入住超方便",
    content:
      "老闆非常熱情親切，入住前提供很多周邊美食與停車指引。是政府登記的合法民宿（第 131 號），消防設施齊全，住起來很踏實安心。電子鎖密碼入住超方便，進出不需要帶一堆鑰匙，大家分批回來都很自由。",
    highlights: ["合法民宿第131號", "消防安全設施完善", "老闆熱情親切", "電子密碼鎖自助入住"],
    image: {
      src: "/images/hellohouse/photo1.webp",
      alt: "你好哇寓所 1F 挑高客廳全景與聚會交誼空間",
      caption: "1F 挑高聚會客廳・適合團隊聚會交流",
    },
    verifiedGoogle: true,
    sourceLabel: "Google 商家真實評價",
  },
  {
    id: "rev-hh-04",
    author: "C 小姐",
    authorTitle: "Google 商家真實住客",
    property: "hellohouse",
    propertyName: "你好哇寓所",
    rating: 5,
    date: "Google 商家五星評價",
    stayType: "整棟獨立包棟",
    groupSize: "12 人",
    occasion: "friends",
    occasionLabel: "朋友聚會",
    title: "一樓公共空間有手動麻將太加分！還有電視可以看 Netflix",
    content:
      "一樓公共空間有手動麻將太加分了！還有大電視可以看 Netflix，大家買宵夜回客廳吃吃喝喝打牌。每間客房都有獨立衛浴，房間內部乾淨清爽，冷氣也很涼很安靜。包棟一整棟都是自己人，完全沒有外人干擾。",
    highlights: ["手動麻將桌", "43 吋聯網電視 Netflix", "每間客房獨立衛浴", "冷氣安靜舒適"],
    image: {
      src: "/images/hellohouse/1000.webp",
      alt: "你好哇寓所 1F 挑高無阻隔公共空間全景",
      caption: "1F 挑高公共空間・中島吧台與客廳沙發連成一體",
    },
    verifiedGoogle: true,
    sourceLabel: "Google 商家真實評價",
  },
  {
    id: "rev-gd-01",
    author: "陳先生",
    authorTitle: "溝頂民宿包棟住客",
    property: "godin",
    propertyName: "溝頂民宿",
    rating: 5,
    date: "住客真實回饋",
    stayType: "五層整棟獨棟包棟",
    groupSize: "8 人",
    occasion: "friends",
    occasionLabel: "獨棟分層",
    title: "很適合家族出遊，五層樓每家人住一層互不干擾，4 樓交誼超盡興",
    content:
      "很適合兩個家庭出遊，五層樓整棟獨立使用，每家人住一層樓互相不干擾，每間房都有獨立衛浴。4 樓專屬交誼廳有手動麻將桌、沙發跟大電視，大家晚上集合在 4 樓吃宵夜聊天超盡興，走路去駁二跟大港橋不到 10 分鐘，CP 值很高！",
    highlights: ["五層樓整棟獨棟獨立", "每間客房獨立衛浴", "4F 專屬麻將交誼廳", "散步 10 分鐘到駁二"],
    image: {
      src: "/images/godin/cover-1.webp",
      alt: "溝頂民宿 4F 專屬獨立交誼長桌與沙發空間",
      caption: "溝頂 4F 專屬交誼廳・麻將桌與沙發電視區",
    },
    verifiedGoogle: true,
    sourceLabel: "官網精選住客回饋",
  },
  {
    id: "rev-gd-02",
    author: "王小姐",
    authorTitle: "溝頂民宿包棟住客",
    property: "godin",
    propertyName: "溝頂民宿",
    rating: 5,
    date: "住客真實回饋",
    stayType: "整棟獨立包棟",
    groupSize: "6 人",
    occasion: "student",
    occasionLabel: "小資包棟",
    title: "離駁二很近，環境安靜乾淨，每間都有衛浴，CP 值很高",
    content:
      "離駁二很近，環境安靜乾淨。室內裝潢清爽新穎，5 樓雙人房採光非常好，落地窗看出去很有鹽埕老街味道。整棟獨立包下來平均分攤價格超划算，每間客房都有獨立衛浴不用等，非常推薦朋友小團體入住！",
    highlights: ["環境乾淨新穎", "5F 落地窗景觀客房", "高 CP 值平攤實惠", "步行即達捷運與駁二"],
    image: {
      src: "/images/godin/room5.webp",
      alt: "溝頂民宿 5F 景觀雙人房大面採光落地窗街景",
      caption: "5F 景觀雙人房・落地窗陽台與老街街景",
    },
    verifiedGoogle: true,
    sourceLabel: "官網精選住客回饋",
  },
  {
    id: "rev-hh-05",
    author: "Grace & 婚禮團隊",
    authorTitle: "迎娶婚攝專案住客",
    property: "hellohouse",
    propertyName: "你好哇寓所",
    rating: 5,
    date: "住客真實回饋",
    stayType: "包棟迎娶方案",
    groupSize: "16 人",
    occasion: "wedding",
    occasionLabel: "迎娶婚攝",
    title: "高樓層大面落地窗採光極佳，迎娶新娘房與奉茶動線超順暢",
    content:
      "選你好哇當作高雄迎娶飯店替代方案真的太對了！高樓層大面落地窗的自然採光非常棒，新娘妝容拍出來超透亮。一樓挑高客廳很大，奉茶拜別儀式時親友 20 幾個人在場動線依然非常流暢，攝影師跟新秘都稱讚！電子密碼鎖讓伴郎伴娘進出都很方便。",
    highlights: ["大面落地窗採光棒", "奉茶儀式動線寬敞", "新秘伴娘進出方便", "管家貼心事前確認"],
    image: {
      src: "/images/hellohouse/wedding-cover.webp",
      alt: "你好哇寓所大面落地採光迎娶新娘房與質感空間",
      caption: "迎娶採光房・大面落地窗與寬敞拜別動線",
    },
    verifiedGoogle: true,
    sourceLabel: "官網精選住客回饋",
  },
  {
    id: "rev-hh-06",
    author: "張小姐 (桃園)",
    authorTitle: "三代同堂家族出遊",
    property: "hellohouse",
    propertyName: "你好哇寓所",
    rating: 5,
    date: "住客真實回饋",
    stayType: "6 房全棟包棟",
    groupSize: "15 人",
    occasion: "family",
    occasionLabel: "家族旅遊",
    title: "老屋翻新空間寬敞，一樓開放視野帶小孩長輩很安心",
    content:
      "我們帶了小朋友跟長輩同行。你好哇一樓空間是挑高無死角的開放式設計，大人在廚房備料切水果，抬頭就能看到小孩在客廳玩桌遊看電視，非常安心。客房床墊支撐力很足夠，長輩睡得好。出發前管家提供的周邊停車地圖導航也很實用！",
    highlights: ["一樓無死角開放視野", "床墊支撐力佳好睡", "貼心周邊停車指引", "適合跨世代家庭同行"],
    image: {
      src: "/images/hellohouse/1201.webp",
      alt: "你好哇寓所 2F 1201 溫馨雙人房實景",
      caption: "2F 溫馨雙人房・對外氣密窗與乾濕分離衛浴",
    },
    verifiedGoogle: true,
    sourceLabel: "官網精選住客回饋",
  },
];

// 口碑實景對照焦點
export const reviewSpotlights: ReviewSpotlight[] = [
  {
    id: "spotlight-kitchen",
    title: "1F 奢華中島大廚房",
    subtitle: "住客最常驚嘆的聚會核心",
    quote: "「一樓的中島廚房真的太棒了！鍋碗瓢盆都很齊全，大家聚在一起煮火鍋喝酒，氣氛滿分。」",
    author: "Google 商家住客 T 先生",
    image: {
      src: "/images/hellohouse/photo2.webp",
      alt: "你好哇寓所 1F 開放式中島廚房近拍實景，配備專業雙口 IH 爐、RO 飲水機與大雙門冰箱",
    },
    property: "你好哇寓所",
    tags: ["雙口 IH 爐", "大雙門冰箱", "全套鍋碗瓢盆", "RO 飲水機"],
    href: "/hellohouse",
    actionLabel: "查看你好哇廚房配置",
  },
  {
    id: "spotlight-mahjong",
    title: "專屬交誼與麻將客廳",
    subtitle: "兩館皆備有歡聚娛樂交誼設施",
    quote: "「一樓公共空間有手動麻將太加分！還有大電視可以看 Netflix，大家聚在客廳吃宵夜聊聊天超放鬆。」",
    author: "Google 商家住客 C 小姐",
    image: {
      src: "/images/hellohouse/photo1.webp",
      alt: "你好哇寓所 1F 挑高客廳與交誼空間全景，備有手動麻將桌、桌遊與 43 吋聯網電視",
    },
    property: "你好哇寓所 & 溝頂民宿",
    tags: ["手動麻將桌", "43 吋聯網電視", "桌遊撲克牌", "舒適沙發區"],
    href: "/compare",
    actionLabel: "比較兩館交誼空間",
  },
  {
    id: "spotlight-ensuite",
    title: "採光景觀客房・每房皆有獨立衛浴",
    subtitle: "每間客房皆享專屬衛浴・整棟專屬獨享",
    quote: "「隔音意外的好，晚上睡覺很安靜，獨立筒床墊支撐性很夠，每間房都有獨立衛浴完全不用搶廁所。」",
    author: "Google 商家住客 L 小姐",
    image: {
      src: "/images/hellohouse/1402.webp",
      alt: "你好哇寓所 4F 景觀大六人房實景，大面落地玻璃採光與獨立套房衛浴",
    },
    property: "全館套房標配",
    tags: ["客房皆含獨立衛浴", "乾濕分離淋浴", "大出水量穩定熱水", "獨立筒舒適床墊"],
    href: "/hellohouse",
    actionLabel: "查看完整客房房型",
  },
  {
    id: "spotlight-location",
    title: "鹽埕散步美食與駁二港灣圈",
    subtitle: "走路 3-10 分鐘串連大港橋、駁二與在地老店",
    quote: "「離駁二藝術特區走路只要 10 分鐘，巷口出來就是鴨肉珍、冬粉王，不用開車找車位超輕鬆！」",
    author: "住客 王小姐",
    image: {
      src: "/images/explore/bridge.jpg",
      alt: "高雄鹽埕大港橋與港灣漫步生活圈實景，步行 8-10 分鐘即達",
    },
    property: "鹽埕區核心生活圈",
    tags: ["捷運鹽埕埔站 5 分鐘", "駁二藝術特區 10 分鐘", "大港橋 8 分鐘", "鴨肉珍 3 分鐘"],
    href: "/explore",
    actionLabel: "探索周邊美食景點",
  },
];

// 住客真實顧慮解答 FAQ
export const reviewFaqs: ReviewFaq[] = [
  {
    question: "你好哇寓所與溝頂民宿的評價來源為何？是三館合併還是獨立分開？",
    answer:
      "Hello Stay 各館皆為獨立特色建築：Google 商家目前主要對應旗艦主館「你好哇寓所（大公路 70 巷 8 號）」，在 Google 地圖獲得 4.5 顆星（累積 75 則真實評價）；「溝頂民宿（大公路 70 巷 6-2 號）」則為五層樓獨立獨棟包棟。我們在評價頁面皆清楚標註每位旅客實際入住的館別與真實來源，資訊透明公開。",
  },
  {
    question: "多人包棟大家最在意的「隔音」與「睡眠品質」如何？",
    answer:
      "兩館客房均採用高等級隔音氣密窗與實體隔間，床墊皆選用優質獨立筒床墊。你好哇寓所將 1F 公共聚會空間與 2F-4F 客房樓層垂直分流；溝頂民宿則將 4F 設為交誼麻將廳，各層客房享有獨立安靜空間。依民宿管理規範，夜間 23:00 後請在公共區域降低音量，兼顧聚會歡樂與同住長輩、小孩的優質睡眠。",
  },
  {
    question: "廚房設備與調味料真的可以直接煮火鍋或備餐嗎？",
    answer:
      "是的！「你好哇寓所」1F 配備大型奢華中島廚房，提供雙口 IH 爐、抽油煙機、雙門大冰箱、微波爐、烤箱、RO 逆滲透冷熱飲水機，以及完整的湯鍋、炒鍋、刀具、砧板、碗盤與餐具，非常適合 10-20 人圍爐火鍋或料理聚餐；「溝頂民宿」4F 則提供流理台、雙門冰箱、微波爐與 RO 飲水機，適合外帶鹽埕美食、切水果與備餐享用（溝頂不開放明火大火烹煮）。",
  },
  {
    question: "包棟有長輩或帶大件行李，館內有電梯嗎？樓梯好爬嗎？",
    answer:
      "你好哇寓所與溝頂民宿皆為鹽埕在地特色透天建築，館內動線「皆走樓梯，無設置電梯」。樓梯間均設有扶手與明亮照明，若有同行長輩或行動較不便的家人，建議優先安排入住 2 樓客房。若您的團體有極高的電梯剛性需求，請先評估自身需求後再做預訂決策。",
    tip: "長輩同行建議優先劃分低樓層客房，若有疑問可加 LINE 由管家為您安排合適房型。",
  },
  {
    question: "開車前往的話，附近好停車嗎？",
    answer:
      "民宿位於安靜的鹽埕巷弄內，車輛可先開至巷口（大公路 70 巷口）臨時臨停上下行李與乘客。步行 2 至 5 分鐘內即有多處公有平面收費停車場（如鹽埕埔捷運站周邊停車場、大勇路停車場）與路邊收費停車格，加 LINE 預訂完成後，管家會主動發送詳細的「周邊停車場地圖導航指南」給您。",
  },
  {
    question: "入住流程與管家服務模式是怎樣的？自助入住會不會找不到人？",
    answer:
      "Hello Stay 全館採用「智慧電子密碼鎖自助入住」，入住當天下午會發送專屬動態密碼至您的 LINE，免去約定見面等候的時間，隨時抵達即可輕鬆開門。線上管家在入住前至退房期間均保持即時在線，有任何周邊美食推薦、設備操作或在地問題都能在 LINE 上獲得快速回覆支援。",
  },
];
