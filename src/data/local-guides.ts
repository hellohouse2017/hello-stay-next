export type LocalGuideItem = {
  name: string;
  meta: string;
  detail: string;
  mapQuery: string;
  articleSlug?: string;
};

export type LocalGuideSection = {
  kicker: string;
  title: string;
  intro: string;
  items: LocalGuideItem[];
};

const food = (name: string, meta: string, detail: string, mapQuery = `${name} 高雄鹽埕`) => ({
  name,
  meta,
  detail,
  mapQuery,
});

const spot = (name: string, meta: string, detail: string, mapQuery = `${name} 高雄`) => ({
  name,
  meta,
  detail,
  mapQuery,
});

export const foodGuideSections: LocalGuideSection[] = [
  {
    kicker: "BREAKFAST",
    title: "早餐",
    intro: "先從鹽埕在地早餐開始，店名與地圖位置都已整理好。",
    items: [
      { ...food("大ㄎㄡ胖碳烤三明治", "鹽埕早餐", "碳烤吐司與招牌三明治"), articleSlug: "yancheng-breakfast-guide" },
      { ...food("大溝頂虱目魚米粉湯", "大溝頂老店", "虱目魚與米粉湯"), articleSlug: "yancheng-breakfast-guide" },
      { ...food("米糕城 AMIGOCITY The Original", "鹽埕老店", "米糕、滷肉與台式小吃"), articleSlug: "yancheng-breakfast-guide" },
    ],
  },
  {
    kicker: "LOCAL MEALS",
    title: "正餐",
    intro: "牛肉麵、鴨肉飯、肉燥飯與切仔麵，都是可以直接導航的實際店家。",
    items: [
      { ...food("港園牛肉麵-鹽埕總店", "鹽埕老店", "牛肉麵與牛肉湯"), articleSlug: "yancheng-local-meals-guide" },
      { ...food("鴨肉珍 (總店)", "五福四路", "鴨肉飯與鴨肉切盤", "鴨肉珍 (總店) 五福四路258號 高雄"), articleSlug: "yancheng-local-meals-guide" },
      { ...food("鴨肉本", "鹽埕老店", "鴨肉飯與下水湯"), articleSlug: "yancheng-local-meals-guide" },
      { ...food("葉家肉燥飯", "鹽埕小吃", "肉燥飯與台式小菜"), articleSlug: "yancheng-local-meals-guide" },
      { ...food("阿進切仔麵", "鹽埕老店", "切仔麵與熱湯"), articleSlug: "yancheng-local-meals-guide" },
      { ...food("阿財雞絲麵", "鹽埕小吃", "雞絲麵與台式湯品"), articleSlug: "yancheng-local-meals-guide" },
    ],
  },
  {
    kicker: "SNACKS & DRINKS",
    title: "小吃與飲品",
    intro: "適合外帶回館，也可以直接開啟地圖查看目前店家資訊。",
    items: [
      { ...food("阿囉哈滷味", "鹽埕滷味", "自選滷味與外帶小吃"), articleSlug: "yancheng-snacks-guide" },
      { ...food("冬粉王", "鹽埕小吃", "冬粉與台式湯品"), articleSlug: "yancheng-snacks-guide" },
      { ...food("樺達奶茶-鹽埕總店", "鹽埕飲品", "招牌奶茶與手搖飲"), articleSlug: "yancheng-dessert-drinks-guide" },
      { ...food("高雄婆婆冰 (創始店)", "七賢三路", "古早味冰品", "高雄婆婆冰 (創始店) 七賢三路135號 高雄"), articleSlug: "yancheng-dessert-drinks-guide" },
    ],
  },
  {
    kicker: "COFFEE & SWEETS",
    title: "咖啡與甜點",
    intro: "安排在下午散步或回館前，店家名稱以 Google Maps 可查到的正式名稱為準。",
    items: [
      { ...food("小堤咖啡", "鹽埕咖啡", "老派咖啡館與甜點"), articleSlug: "yancheng-dessert-drinks-guide" },
      { ...food("新濱·駅前", "日式老屋", "老屋咖啡與茶點", "新濱·駅前 高雄鹽埕"), articleSlug: "yancheng-dessert-drinks-guide" },
      { ...food("阿綿 Shining 來自陽光的伴手禮", "鹽埕伴手禮", "手工麻糬與伴手禮", "阿綿 Shining 來自陽光的伴手禮 高雄"), articleSlug: "yancheng-dessert-drinks-guide" },
    ],
  },
  {
    kicker: "NIGHTLIFE",
    title: "酒吧",
    intro: "以下是已核對到 Google Maps 店家頁面的鹽埕與港區酒吧。",
    items: [
      { ...food("廢墟Ruins", "鹽埕酒吧", "巷弄酒吧", "廢墟Ruins 高雄鹽埕"), articleSlug: "yancheng-night-guide" },
      { ...food("The Lookout Bistro & Bar 眺吧餐酒館", "港區餐酒館", "港景餐酒與調酒", "The Lookout Bistro & Bar 眺吧餐酒館 高雄"), articleSlug: "yancheng-night-guide" },
      { ...food("BAR KAO泰式餐酒館", "鹽埕餐酒館", "泰式料理與餐酒", "BAR KAO泰式餐酒館 高雄鹽埕"), articleSlug: "yancheng-night-guide" },
      { ...food("小島茶酒 Bar Island", "鹽埕酒吧", "茶飲與調酒", "小島茶酒 Bar Island 高雄鹽埕"), articleSlug: "yancheng-night-guide" },
    ],
  },
  {
    kicker: "SHOPPING",
    title: "採買與補給",
    intro: "全聯、美廉社、便利商店與 7-ELEVEN，入住期間需要的日用品都能直接導航。",
    items: [
      { ...food("OK便利商店 鹽埕大義店", "便利商店", "飲料、零食與日用品"), articleSlug: "yancheng-shopping-laundry-guide" },
      { ...food("7-ELEVEN 駁藝門市", "便利商店", "24 小時補給與日用品", "7-ELEVEN 駁藝門市 高雄鹽埕"), articleSlug: "yancheng-shopping-laundry-guide" },
      { ...food("全聯福利中心 鹽埕七賢三店", "超市採買", "食材、飲品與日用品", "全聯福利中心 鹽埕七賢三店 七賢三路6號 高雄"), articleSlug: "yancheng-shopping-laundry-guide" },
      { ...food("全聯福利中心 鹽埕壽星", "超市採買", "食材、飲品與日用品", "全聯福利中心 鹽埕壽星 七賢三路243號 高雄"), articleSlug: "yancheng-shopping-laundry-guide" },
      { ...food("美廉社 鹽埕富野店", "超市採買", "日用品與簡單食材", "美廉社 鹽埕富野店 富野路22號 高雄"), articleSlug: "yancheng-shopping-laundry-guide" },
      { ...food("全家便利商店 高雄鹽埕埔店", "便利商店", "飲品、零食與日用品", "全家便利商店 高雄鹽埕埔店 七賢三路169號 高雄"), articleSlug: "yancheng-shopping-laundry-guide" },
      { ...food("全家便利商店 高雄大仁店", "便利商店", "飲品、零食與日用品", "全家便利商店 高雄大仁店 大仁路59號 高雄"), articleSlug: "yancheng-shopping-laundry-guide" },
    ],
  },
  {
    kicker: "LAUNDRY",
    title: "洗衣",
    intro: "列出 Google Maps 可核對的自助洗衣與烘洗店，營業狀態請以當日地圖資訊為準。",
    items: [
      { ...food("快易洗 24H自助洗衣", "七賢二路", "自助洗衣與烘乾", "快易洗 24H自助洗衣 七賢二路419號 高雄"), articleSlug: "yancheng-shopping-laundry-guide" },
      { ...food("波波自助式洗衣店-七賢店", "七賢二路", "自助洗衣與烘乾", "波波自助式洗衣店 七賢店 七賢二路425號 高雄"), articleSlug: "yancheng-shopping-laundry-guide" },
      { ...food("ODay日式自助洗衣鹽埕大仁店", "大仁路", "洗脫烘衣設備", "ODay日式自助洗衣鹽埕大仁店 大仁路193號 高雄"), articleSlug: "yancheng-shopping-laundry-guide" },
      { ...food("波波投幣式洗衣店", "七賢三路", "投幣式洗衣與烘乾", "波波投幣式洗衣店 七賢三路246號 高雄"), articleSlug: "yancheng-shopping-laundry-guide" },
      { ...food("衣潔投幣自助洗衣店鹽埕店", "新興街", "投幣式自助洗衣", "衣潔投幣自助洗衣店鹽埕店 新興街41-1號 高雄"), articleSlug: "yancheng-shopping-laundry-guide" },
      { ...food("屋里吉自助洗衣店", "七賢三路", "自助洗衣與烘乾", "屋里吉自助洗衣店 七賢三路14號 高雄"), articleSlug: "yancheng-shopping-laundry-guide" },
      { ...food("136烘洗衣店（大港開烘）", "必信街", "烘洗衣服務", "136烘洗衣店 大港開烘 必信街136號 高雄"), articleSlug: "yancheng-shopping-laundry-guide" },
    ],
  },
];

export const spotGuideSections: LocalGuideSection[] = [
  {
    kicker: "WALKABLE CORE",
    title: "步行景點",
    intro: "先從鹽埕與駁二的正式景點開始，每一項都能直接開啟導航。",
    items: [
      { ...spot("駁二藝術特區", "駁二港區", "倉庫群、展覽與文創店", "駁二藝術特區 高雄市鹽埕區大勇路1號"), articleSlug: "pier2-one-day-itinerary" },
      { ...spot("大港橋", "港區地標", "港區散步與旋轉橋景"), articleSlug: "dagangqiao-attraction-guide" },
      { ...spot("棧貳庫KW2", "港邊商場", "港邊商場與餐飲"), articleSlug: "dagangqiao-attraction-guide" },
      { ...spot("鹽埕示範公有零售市場", "鹽埕市場", "市場小吃與街區生活"), articleSlug: "yancheng-market-guide" },
    ],
  },
  {
    kicker: "ARTS & WATERFRONT",
    title: "港區與藝文",
    intro: "適合安排半日散步，從港史、音樂到鐵道景觀一路串起來。",
    items: [
      { ...spot("高雄港港史館", "港史建築", "高雄港發展與港區歷史"), articleSlug: "yancheng-port-arts-guide" },
      { ...spot("高雄流行音樂中心", "真愛路港區", "港灣建築與演出場地", "高雄流行音樂中心 真愛路1號 高雄"), articleSlug: "yancheng-port-arts-guide" },
      { ...spot("哈瑪星鐵道園區", "哈瑪星港區", "鐵道遺跡與港區街景"), articleSlug: "yancheng-port-arts-guide" },
      { ...spot("愛河灣", "港灣散步", "傍晚散步與夜景"), articleSlug: "yancheng-port-arts-guide" },
    ],
  },
  {
    kicker: "EXTENDED ROUTES",
    title: "延伸行程",
    intro: "想看海或拉長行程，再接捷運、輕軌與渡輪。",
    items: [
      { ...spot("打狗英國領事館文化園區(山上園區)", "西子灣山坡", "港景、古蹟與夕陽"), articleSlug: "yancheng-westbay-route-guide" },
      { ...spot("旗津老街", "渡輪延伸", "海鮮、老街與海岸線"), articleSlug: "yancheng-westbay-route-guide" },
      { ...spot("旗後燈塔", "旗津景點", "高處看港口與夕陽", "旗後燈塔 高雄旗津"), articleSlug: "yancheng-westbay-route-guide" },
      { ...spot("衛武營國家藝術文化中心", "捷運延伸", "室內展演與建築空間", "衛武營國家藝術文化中心 高雄市鳳山區三多一路1號"), articleSlug: "yancheng-port-arts-guide" },
    ],
  },
];
