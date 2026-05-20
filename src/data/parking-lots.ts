export type ParkingLot = {
    name: string;
    addr: string;
    price: string;
    nav: string;
};

export const parkingLots: ParkingLot[] = [
    { name: "大公路路邊停車", addr: "大公路與七賢三路周邊", price: "20:00-08:00 免費", nav: "https://www.google.com/maps/search/?api=1&query=高雄市鹽埕區大公路七賢三路口" },
    { name: "富野路停車場", addr: "富野路 78 號", price: "平日 $30/H・假日 $50/H", nav: "https://maps.google.com/?cid=1856535064860438519" },
    { name: "富野路停車場 (二)", addr: "富野路 27 號", price: "平日 $40/H・假日 $50/H", nav: "https://maps.google.com/?cid=18149634423983651854" },
    { name: "中正四路停車場", addr: "中正四路 274 號", price: "室內平面・免曬太陽", nav: "https://maps.google.com/?cid=2933515461281075928" },
    { name: "富野路停車場 (三)", addr: "富野路 170 號", price: "06:00-22:00（非24H）", nav: "https://maps.google.com/?cid=14869428468779387843" },
    { name: "大仁路停車場", addr: "大仁路 10 號", price: "室內多層停車場", nav: "https://maps.google.com/?cid=4456456276069017907" },
];
