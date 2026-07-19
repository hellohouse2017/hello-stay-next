export const publicStayFacts = {
  hellohouse: {
    name: "你好哇寓所",
    capacity: { min: 8, max: 26 },
    bedrooms: 6,
    bedroomLayout: { double: 3, quadruple: 1, sixPerson: 2 },
    kitchen: "1F 中島廚房，可使用 IH 爐、冰箱、烤箱、微波爐與鍋碗餐具",
    mahjong: "1F 手動麻將桌",
    quietHours: "23:00 後請降低音量",
    bookingStatus: "open",
  },
  godin: {
    name: "溝頂民宿",
    capacity: { min: 4, max: 12 },
    bedrooms: 4,
    bedroomLayout: { double: 2, quadruple: 2 },
    kitchen: "4F 備餐空間，提供冰箱、微波爐與流理台，不開放明火烹煮",
    mahjong: "4F 手動麻將桌",
    quietHours: "23:00 後請降低音量",
    bookingStatus: "open",
  },
  dual: {
    name: "雙館包棟",
    capacity: { min: 27, max: 36 },
    bedrooms: 10,
    bookingStatus: "open",
  },
  dazhi: {
    name: "大智若愚",
    bookingStatus: "planning",
  },
} as const;
