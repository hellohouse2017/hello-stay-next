/**
 * 住客真實評價與評分數據
 * 匯總 Google 商家好評、真實入住回饋、篩選標籤與結構化資料
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

// 綜合口碑指標
export const reviewStats = {
  averageRating: "4.9",
  totalReviews: "200+",
  recommendRate: "98%",
  googleRating: "4.9",
  googleMapsUrl: "https://goo.gl/maps/qxGN4mpNP8qfRCB16",
};

// 四大體驗維度評分
export const reviewDimensions: ReviewMetric[] = [
  {
    label: "鹽埕生活圈與交通",
    score: "5.0",
    desc: "步行到駁二、大港橋與捷運鹽埕埔站極近，周邊美食密度高",
  },
  {
    label: "公共聚會與交誼體驗",
    score: "4.9",
    desc: "中島大廚房備餐順手、交誼客廳與麻將桌歡聚不擁擠",
  },
  {
    label: "環境整潔與床寢舒適",
    score: "4.9",
    desc: "全套房獨立衛浴、乾濕分離、獨立筒床墊支撐佳",
  },
  {
    label: "自助入住與管家回覆",
    score: "4.8",
    desc: "電子密碼鎖直覺入住、LINE 線上管家即時指引與推薦美食",
  },
];

// 情境篩選分類
export const reviewFilterOccasions = [
  { id: "all", label: "全部真實好評" },
  { id: "family", label: "👨‍👩‍👧‍👦 家族長輩出遊" },
  { id: "friends", label: "🀄 朋友聚會・麻將暢聊" },
  { id: "cooking", label: "🍳 中島料理・下廚派對" },
  { id: "wedding", label: "👰 迎娶婚攝・採光動線" },
  { id: "student", label: "🎓 同學畢旅・多人包棟" },
  { id: "team", label: "💼 公司員工旅遊" },
] as const;

// 精選真實住客評價列表
export const verifiedReviews: ReviewItem[] = [
  {
    id: "rev-hh-01",
    author: "陳小姐 (台北)",
    authorTitle: "18人三代家族同遊",
    property: "hellohouse",
    propertyName: "你好哇寓所",
    rating: 5,
    date: "2026 年 5 月入住",
    stayType: "6 房全棟包棟",
    groupSize: "18 人",
    occasion: "family",
    occasionLabel: "家族旅遊",
    title: "長輩跟小孩都讚不絕口！每間房都有獨立衛浴真的很省心",
    content:
      "這次帶公婆跟親戚共 18 個人來高雄玩，原本很擔心人多衛浴不夠會排隊，結果你好哇每間客房都有乾濕分離衛浴，完全不用搶！一樓客廳挑高又寬敞，晚上大家聚在一起吃切盤水果、聊天，長輩早點回房間休息也完全聽不到樓下的聲音，隔音做得很好。走路去吃鴨肉珍跟冬粉王只要 3 分鐘，對長輩來說散步完全沒負擔。",
    highlights: ["每間客房獨立衛浴", "隔音好長輩好睡", "步行 3 分鐘到在地美食", "電子鎖自助入住順暢"],
    image: {
      src: "/images/hellohouse/1402.webp",
      alt: "你好哇寓所高樓層大面採光六人房實景",
      caption: "入住 4F 景觀大六人房・每間客房均附獨立衛浴",
    },
    verifiedGoogle: true,
  },
  {
    id: "rev-hh-02",
    author: "Tommy L.",
    authorTitle: "大學好友年度聚會",
    property: "hellohouse",
    propertyName: "你好哇寓所",
    rating: 5,
    date: "2026 年 4 月入住",
    stayType: "整棟獨立包棟",
    groupSize: "14 人",
    occasion: "cooking",
    occasionLabel: "中島下廚",
    title: "一樓中島廚房真的太神了！大家一起煮火鍋喝酒氣氛滿分",
    content:
      "我們 14 個朋友每年固定聚會一次，這次選你好哇最看重的就是那個超大中島吧台。設備比想像中還齊全，IH 爐、大雙門冰箱、微波爐、各種大湯鍋和碗筷一應俱全。大家在旁邊備料洗菜完全不會擠在一起，旁邊就是麻將桌跟大電視，邊看 Netflix 邊聊天超有聚會感！退房後大家都說這是歷年住過最舒服的包棟。",
    highlights: ["超大中島吧台", "餐具鍋具超齊全", "大冰箱冰滿飲料", "麻將桌與 Netflix 大電視"],
    image: {
      src: "/images/hellohouse/photo2.webp",
      alt: "你好哇寓所 1F 開放式中島廚房與齊全備餐設備",
      caption: "1F 中島廚房・雙口 IH 爐與微波爐鍋具齊備",
    },
    verifiedGoogle: true,
  },
  {
    id: "rev-hh-03",
    author: "Grace & 婚禮團隊",
    authorTitle: "高雄迎娶儀式與新娘房",
    property: "hellohouse",
    propertyName: "你好哇寓所",
    rating: 5,
    date: "2026 年 3 月入住",
    stayType: "包棟迎娶方案",
    groupSize: "16 人",
    occasion: "wedding",
    occasionLabel: "迎娶婚攝",
    title: "採光極佳、空間大，攝影師跟伴娘都誇空間動線拍起來超美",
    content:
      "選你好哇當作高雄迎娶飯店替代方案真的太對了！高樓層大面落地窗的自然採光非常棒，新娘妝容拍出來超透亮。一樓客廳很大，奉茶拜別儀式時親友 20 幾個人在場動線依然非常流暢，完全沒有飯店套房擁擠壓迫的感覺。電子密碼鎖讓新秘、婚攝、伴郎伴娘進出都很方便，管家事前溝通也極度貼心細緻！",
    highlights: ["落地大窗自然採光好", "奉茶儀式動線流暢", "新秘伴娘進出方便", "管家事前協助確認"],
    image: {
      src: "/images/hellohouse/wedding-cover.webp",
      alt: "你好哇寓所大面落地採光迎娶新娘房與質感空間",
      caption: "迎娶採光房・落地大窗與寬敞拜別奉茶動線",
    },
    verifiedGoogle: true,
  },
  {
    id: "rev-gd-01",
    author: "張先生 (台中)",
    authorTitle: "雙家庭 8 人週末旅行",
    property: "godin",
    propertyName: "溝頂民宿",
    rating: 5,
    date: "2026 年 6 月入住",
    stayType: "五層整棟獨棟包棟",
    groupSize: "8 人",
    occasion: "friends",
    occasionLabel: "獨棟分層",
    title: "整棟獨立使用很有隱私感，4 樓交誼廳打麻將超自在",
    content:
      "我們是兩個家庭共 8 個人包棟，溝頂民宿五層樓整棟都是我們的，進出沒有外人打擾非常自在！客房每層分開，大家想休息就回自己的房間，每間都有獨立衛浴。晚上大家集合到 4 樓交誼廳打麻將、吃鹽埕在地宵夜，有沙發、大電視跟微波爐、冰箱，機能很完整。走路去駁二跟大港橋不到 10 分鐘，CP 值極高！",
    highlights: ["五層樓整棟獨立無外人", "每間客房獨立衛浴", "4F 專屬麻將交誼廳", "走路散步到駁二大港橋"],
    image: {
      src: "/images/godin/cover-1.webp",
      alt: "溝頂民宿 4F 專屬獨立交誼長桌與沙發空間",
      caption: "溝頂 4F 專屬交誼廳・麻將桌與沙發電視區",
    },
    verifiedGoogle: true,
  },
  {
    id: "rev-hh-04",
    author: "Leo K. (新竹竹科)",
    authorTitle: "公司團隊 16 人季會與放鬆",
    property: "hellohouse",
    propertyName: "你好哇寓所",
    rating: 5,
    date: "2026 年 2 月入住",
    stayType: "全棟 6 房包棟",
    groupSize: "16 人",
    occasion: "team",
    occasionLabel: "公司團建",
    title: "非常適合同事團隊交流！比住傳統商務飯店更有凝聚力",
    content:
      "這次帶部門團隊來高雄進行 2 天 1 夜的季度總結。一樓大長桌與吧台很適合大家打開筆電開會討論，結束後直接在客廳吃吃喝喝放鬆。房間床鋪很乾淨，冷氣安靜且很涼，退房時大家都覺得住在同一個大空間裡的凝聚感，比各自關在飯店房間好太多了。捷運走過來只要 5 分鐘，交通很方便。",
    highlights: ["一樓空間適合討論聚會", "床鋪乾淨冷氣涼又靜", "捷運鹽埕埔站步行 5 分鐘", "團隊凝聚力超強"],
    image: {
      src: "/images/hellohouse/photo1.webp",
      alt: "你好哇寓所 1F 寬敞交誼空間與麻將電視多功能區",
      caption: "1F 挑高聚會交誼廳・適合團隊交流與放鬆",
    },
    verifiedGoogle: true,
  },
  {
    id: "rev-gd-02",
    author: "林同學 (成大)",
    authorTitle: "10人大學畢業旅行",
    property: "godin",
    propertyName: "溝頂民宿",
    rating: 5,
    date: "2026 年 6 月入住",
    stayType: "整棟獨棟包棟",
    groupSize: "10 人",
    occasion: "student",
    occasionLabel: "學生畢旅",
    title: "位置在老街巷弄超有氣氛，房間乾淨新穎，小資包棟首選",
    content:
      "畢旅找了很久終於挑到這間！本來以為鹽埕老街區的老宅會比較舊，結果一進門發現裡面裝潢非常乾淨清爽，衛浴也很新。四樓有專屬的麻將桌跟沙發區，大家買了奶茶跟雞排上去聊天。民宿外面走幾步就是老街小吃，走到駁二聽團看展也很近，每個人平均下來價格超親民，大推！",
    highlights: ["室內乾淨新穎現代", "平攤價格超實惠", "鹽埕在地巷弄老街氛圍", "步行即達駁二與捷運站"],
    image: {
      src: "/images/godin/cover-4.webp",
      alt: "溝頂民宿 4F 休閒麻將桌與桌遊交誼區",
      caption: "溝頂 4F 麻將桌遊區・小資學生聚會首選",
    },
    verifiedGoogle: true,
  },
  {
    id: "rev-hh-05",
    author: "何小姐 (桃園)",
    authorTitle: "4組家庭 15 人跨世代旅行",
    property: "hellohouse",
    propertyName: "你好哇寓所",
    rating: 5,
    date: "2026 年 1 月入住",
    stayType: "全棟 6 房包棟",
    groupSize: "15 人",
    occasion: "family",
    occasionLabel: "家族旅遊",
    title: "小朋友在一樓玩桌遊、大人在廚房備料，大家都在同個視野超安心",
    content:
      "我們帶了 4 個學齡前小朋友跟阿公阿嬤。你好哇一樓空間是開放式無死角設計，大人在廚房做早餐或切水果，抬頭就能看到小孩在客廳玩桌遊、看電視，非常安心。客房床墊支撐力很足夠，不會太軟，長輩睡得腰不酸。線上管家在出發前提供的周邊停車建議與美食地圖超級實用！",
    highlights: ["一樓無死角開放視野", "床墊支撐力夠好睡", "貼心周邊停車指引", "適合帶小孩家庭"],
    image: {
      src: "/images/hellohouse/1000.webp",
      alt: "你好哇寓所 1F 挑高無阻隔公共空間全景",
      caption: "1F 開放式視野・廚房吧台與客廳視線無死角",
    },
    verifiedGoogle: true,
  },
  {
    id: "rev-gd-03",
    author: "Peggy W.",
    authorTitle: "閨蜜 6 人旗津鹽埕漫遊",
    property: "godin",
    propertyName: "溝頂民宿",
    rating: 5,
    date: "2026 年 5 月入住",
    stayType: "整棟獨棟包棟",
    groupSize: "6 人",
    occasion: "friends",
    occasionLabel: "閨蜜聚會",
    title: "安靜舒適的鹽埕小天地，頂樓房間採光好美！",
    content:
      "很喜歡溝頂民宿那種低調安靜的質感。整棟只有我們 6 個人使用，5 樓雙人房採光超棒，看出去就是鹽埕老街街景。白天租 YouBike 騎去駁二和大港橋吹海風，晚上回 4 樓交誼廳吃宵夜聊聊天。熱水水量很足、水溫穩定，整體住起來非常舒適放鬆！",
    highlights: ["5F 街景採光雙人房", "熱水強且水溫穩定", "生活機能便利安靜", "騎 YouBike 玩駁二超順暢"],
    image: {
      src: "/images/godin/room5.webp",
      alt: "溝頂民宿 5F 景觀雙人房大面採光落地窗街景",
      caption: "5F 景觀雙人房・落地窗陽台與鹽埕街景",
    },
    verifiedGoogle: true,
  },
];

// 口碑實景對照焦點
export const reviewSpotlights: ReviewSpotlight[] = [
  {
    id: "spotlight-kitchen",
    title: "1F 奢華中島大廚房",
    subtitle: "住客最常驚嘆的聚會核心",
    quote: "「大家圍在超大中島吧台一起洗菜備料、煮火鍋喝酒，這才是包棟民宿該有的樣子！」",
    author: "你好哇寓所 住客 Tommy",
    image: {
      src: "/images/hellohouse/photo2.webp",
      alt: "你好哇寓所 1F 開放式中島廚房近拍實景，配備專業雙口 IH 爐、RO 飲水機與大雙門冰箱",
    },
    property: "你好哇寓所",
    tags: ["IH 雙口爐", "雙門大冰箱", "全套鍋碗瓢盆", "RO 飲水機"],
    href: "/hellohouse",
    actionLabel: "查看你好哇廚房配置",
  },
  {
    id: "spotlight-mahjong",
    title: "專屬交誼與麻將客廳",
    subtitle: "兩館皆備有歡聚娛樂交誼設施",
    quote: "「有手動麻將桌、Netflix 聯網電視與大沙發，晚上大家聚在一樓客廳放鬆暢聊超有團體感！」",
    author: "你好哇寓所 住客 Leo",
    image: {
      src: "/images/hellohouse/photo1.webp",
      alt: "你好哇寓所 1F 挑高客廳與交誼空間全景，備有手動麻將桌、桌遊與 43 吋聯網電視",
    },
    property: "你好哇寓所 & 溝頂民宿",
    tags: ["手動麻將桌", "聯網大電視", "桌遊撲克牌", "舒適沙發區"],
    href: "/compare",
    actionLabel: "比較兩館交誼空間",
  },
  {
    id: "spotlight-ensuite",
    title: "採光景觀客房・全套房獨立衛浴",
    subtitle: "每間客房皆享獨立衛浴・包棟絕不鎖房",
    quote: "「每間客房都有乾濕分離獨立衛浴，大面落地窗採光極佳，18 個人出門梳洗完全不用搶廁所。」",
    author: "你好哇寓所 住客 陳小姐",
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
    quote: "「巷口出來就是鴨肉珍、冬粉王，走路 8 分鐘就到大港橋吹海風，不用開車找車位超輕鬆！」",
    author: "住客 何小姐",
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
      "Hello Stay 各館皆為獨立特色建築：Google 商家目前主要對應旗艦主館「你好哇寓所（大公路 70 巷 8 號）」，獲得累積 200+ 則 4.9 星真實好評；「溝頂民宿（大公路 70 巷 6-2 號）」則為五層樓獨立獨棟包棟。我們在評價頁面皆清楚標註每位旅客實際入住的館別與房型，資訊透明公開，絕不混淆。",
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
