export type ParkingLot = {
  id?: string;
  name: string;
  addr: string;
  price: string;
  nav: string;
  typeLabel?: string;
  walkTime?: string;
  distance?: string;
  recommendTag?: string;
  features?: string[];
  note?: string;
};

export const parkingLots: ParkingLot[] = [
  {
    id: "lot-street",
    name: "路邊公有停車格",
    addr: "大公路、七賢三路、富野路周邊",
    price: "計時收費（公有費率）",
    nav: "https://www.google.com/maps/search/?api=1&query=%E9%AB%98%E9%9B%84%E5%B8%82%E9%B9%BD%E5%9F%95%E5%8D%80%E5%A4%A7%E5%85%AC%E8%B7%AF%E4%B8%83%E8%B3%A2%E4%B8%89%E8%B7%AF%E5%8F%A3%20%E8%B7%AF%E9%82%8A%E5%81%9C%E8%BB%8A%E6%A0%BC",
    typeLabel: "路邊車格",
    walkTime: "步行約 1-2 分鐘",
    distance: "約 50-150 公尺",
    recommendTag: "🌟 首選推薦",
    features: ["最靠近巷口", "公有收費", "隨停隨走"],
    note: "巷口周邊大公路與七賢三路皆有劃設公有車格，抵達時若有空位建議直接停放。",
  },
  {
    id: "lot-icck",
    name: "高雄國際會議中心地下停車場",
    addr: "高雄市鹽埕區中正四路 274 號（地下室）",
    price: "收費停車場（室內地下）",
    nav: "https://www.google.com/maps/search/?api=1&query=%E5%9C%8B%E9%9A%9B%E6%9C%83%E8%AD%B0%E4%B8%AD%E5%BF%83%E5%9C%B0%E4%B8%8B%E5%81%9C%E8%BB%8A%E5%A0%B4%20%E9%AB%98%E9%9B%84",
    typeLabel: "室內地下",
    walkTime: "步行約 3-4 分鐘",
    distance: "約 280 公尺",
    recommendTag: "🏢 室內首選",
    features: ["地下防曬防雨", "車位寬敞", "明亮安全"],
    note: "夏季炎熱或雨天最佳選擇，室內地下停車場不怕風吹日曬，步行至民宿僅需 3 分多鐘。",
  },
  {
    id: "lot-yancheng-tower",
    name: "鹽埕立體停車場（大仁路）",
    addr: "高雄市鹽埕區大仁路 10 號",
    price: "收費停車場（公有立體）",
    nav: "https://www.google.com/maps/search/?api=1&query=%E9%B9%BD%E5%9F%95%E7%AB%8B%E9%AB%94%E5%81%9C%E8%BB%8A%E5%A0%B4%20%E5%A4%A7%E4%BB%81%E8%B7%AF%20%E9%AB%98%E9%9B%84",
    typeLabel: "大型立體",
    walkTime: "步行約 4-5 分鐘",
    distance: "約 350 公尺",
    recommendTag: "🚗 車位最多",
    features: ["公有立體車塔", "車位數量多", "設有充電樁"],
    note: "鹽埕區公有大型立體停車場，車位多、不易客滿，亦設有電動車充電格。",
  },
  {
    id: "lot-fuye-1",
    name: "富野路平面停車場（第一場）",
    addr: "高雄市鹽埕區富野路周邊",
    price: "收費停車場（戶外平面）",
    nav: "https://www.google.com/maps/search/?api=1&query=%E5%AF%8C%E9%87%8E%E8%B7%AF%E5%81%9C%E8%BB%8A%E5%A0%B4%20%E9%AB%98%E9%9B%84%E9%B9%BD%E5%9F%95",
    typeLabel: "戶外平面",
    walkTime: "步行約 2-3 分鐘",
    distance: "約 200 公尺",
    recommendTag: "🅿️ 近距離平面",
    features: ["平面好停", "步行極近", "進出方便"],
    note: "鄰近富野路與大公路交界，平面車位好停好進出，停好後步行 2 分鐘進巷。",
  },
  {
    id: "lot-fuye-2",
    name: "富野路停車場（第二場）",
    addr: "高雄市鹽埕區富野路",
    price: "收費停車場（戶外平面）",
    nav: "https://www.google.com/maps/search/?api=1&query=%E5%AF%8C%E9%87%8E%E8%B7%AF%E5%81%9C%E8%BB%8A%E5%A0%B4%20%E4%BA%8C%20%E9%AB%98%E9%9B%84%E9%B9%BD%E5%9F%95",
    typeLabel: "戶外平面",
    walkTime: "步行約 3 分鐘",
    distance: "約 230 公尺",
    recommendTag: "🅿️ 戶外平面",
    features: ["平面車位", "鄰近商圈", "動線簡單"],
    note: "富野路上另一處平面收費停車場，距離同樣非常近。",
  },
  {
    id: "lot-wenwu",
    name: "文武聖殿停車場",
    addr: "高雄市鹽埕區富野路 170 號（文武聖殿周邊）",
    price: "收費停車場（戶外平面）",
    nav: "https://www.google.com/maps/search/?api=1&query=%E6%96%87%E6%AD%A6%E8%81%96%E6%AE%BF%E5%81%9C%E8%BB%8A%E5%A0%B4%20%E9%AB%98%E9%9B%84",
    typeLabel: "戶外平面",
    walkTime: "步行約 4-5 分鐘",
    distance: "約 350 公尺",
    recommendTag: "⛩️ 平面備用",
    features: ["廟宇周邊", "近輕軌站", "平面好停"],
    note: "鄰近文武聖殿與輕軌 C16 文武聖殿站，可作為假日熱門時段的優質備用選擇。",
  },
];
