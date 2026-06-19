export type ParkingLot = {
    name: string;
    addr: string;
    price: string;
    nav: string;
};

export const parkingLots: ParkingLot[] = [
    {
        name: "路邊停車格",
        addr: "大公路 七賢三路 富野路周邊",
        price: "先看這裡 有位就直接停",
        nav: "https://www.google.com/maps/search/?api=1&query=%E9%AB%98%E9%9B%84%E5%B8%82%E9%B9%BD%E5%9F%95%E5%8D%80%E5%A4%A7%E5%85%AC%E8%B7%AF%E4%B8%83%E8%B3%A2%E4%B8%89%E8%B7%AF%E5%8F%A3%20%E8%B7%AF%E9%82%8A%E5%81%9C%E8%BB%8A%E6%A0%BC",
    },
    {
        name: "國際會議中心地下室",
        addr: "高雄國際會議中心地下停車場",
        price: "收費停車場",
        nav: "https://www.google.com/maps/search/?api=1&query=%E5%9C%8B%E9%9A%9B%E6%9C%83%E8%AD%B0%E4%B8%AD%E5%BF%83%E5%9C%B0%E4%B8%8B%E5%81%9C%E8%BB%8A%E5%A0%B4%20%E9%AB%98%E9%9B%84",
    },
    {
        name: "鹽埕立體停車場（大仁路）",
        addr: "大仁路",
        price: "收費停車場",
        nav: "https://www.google.com/maps/search/?api=1&query=%E9%B9%BD%E5%9F%95%E7%AB%8B%E9%AB%94%E5%81%9C%E8%BB%8A%E5%A0%B4%20%E5%A4%A7%E4%BB%81%E8%B7%AF%20%E9%AB%98%E9%9B%84",
    },
    {
        name: "文武聖殿停車場",
        addr: "鹽埕區文武聖殿周邊",
        price: "收費停車場",
        nav: "https://www.google.com/maps/search/?api=1&query=%E6%96%87%E6%AD%A6%E8%81%96%E6%AE%BF%E5%81%9C%E8%BB%8A%E5%A0%B4%20%E9%AB%98%E9%9B%84",
    },
    {
        name: "富野路停車場（一）",
        addr: "富野路",
        price: "收費停車場",
        nav: "https://www.google.com/maps/search/?api=1&query=%E5%AF%8C%E9%87%8E%E8%B7%AF%E5%81%9C%E8%BB%8A%E5%A0%B4%20%E9%AB%98%E9%9B%84%E9%B9%BD%E5%9F%95",
    },
    {
        name: "富野路停車場（二）",
        addr: "富野路",
        price: "收費停車場",
        nav: "https://www.google.com/maps/search/?api=1&query=%E5%AF%8C%E9%87%8E%E8%B7%AF%E5%81%9C%E8%BB%8A%E5%A0%B4%20%E4%BA%8C%20%E9%AB%98%E9%9B%84%E9%B9%BD%E5%9F%95",
    },
];
