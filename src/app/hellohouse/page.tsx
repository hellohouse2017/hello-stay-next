import type { Metadata } from "next";
import type { Room } from "@/data/properties";
import PropertyShowcasePage from "@/components/PropertyShowcasePage";
import { hellohouse } from "@/data/properties";

const bookingHref = "https://booking.hello-stay.com/booking?property=%E4%BD%A0%E5%A5%BD%E5%93%87%E5%AF%93%E6%89%80";

export const metadata: Metadata = {
  title: "高雄包棟民宿推薦｜你好哇寓所 6-26人中島廚房包棟・鹽埕｜Hello Stay",
  description:
    "高雄鹽埕包棟民宿「你好哇寓所」。6-26 人入住，主打 1F 中島廚房與大型交誼空間，適合家族旅行、朋友聚會、迎娶與多人聚餐。",
  alternates: { canonical: "https://www.hello-stay.com/hellohouse" },
  openGraph: {
    title: "高雄包棟民宿推薦｜你好哇寓所 6-26人中島廚房包棟・鹽埕｜Hello Stay",
    description:
      "你好哇寓所提供 6-26 人包棟，重點是 1F 中島廚房、吧台與大型交誼空間，再搭配雙人房、四人房與六人房。",
    url: "https://www.hello-stay.com/hellohouse",
    images: [
      {
        url: "https://www.hello-stay.com/images/hellohouse/1000.webp",
        width: 1200,
        height: 630,
        alt: "你好哇寓所 1F 中島廚房與交誼空間",
      },
    ],
  },
};

const heroStats = [
  { label: "入住人數", value: "6-26 人" },
  { label: "客房配置", value: "雙人房 2 間 四人房 1 間 六人房 2 間" },
  { label: "公共空間", value: "1F 中島廚房與大型交誼區" },
  { label: "衛浴", value: "客房皆有獨立衛浴" },
];

const houseFacts = [
  { label: "公共空間", value: "1F 挑高交誼區 中島廚房 吧台" },
  { label: "開伙設備", value: "IH 爐 RO 飲水機 雙門冰箱 烤箱 微波爐 鍋碗餐具" },
  { label: "娛樂設備", value: "手動麻將 桌遊 撲克牌 43 吋聯網電視" },
  { label: "衛浴配置", value: "客房皆有獨立衛浴，公共空間另有衛浴配置" },
  { label: "入住配置", value: "電子密碼鎖 Wi-Fi 冷暖空調 室內拖鞋" },
];

const stayGuides = [
  "1F 是整團一起備餐、吃飯、聊天、打麻將的核心空間",
  "2F 有雙人房與四人房，3F 與 4F 以多人房型為主",
  "公共空間會直接影響這館的使用感受",
  "如需迎娶、補寢具或彈性加人，建議直接用 LINE 確認當次方案",
];

const fitGuides = [
  { label: "適合人數", value: "13-26 人家族旅行 朋友聚會 迎娶團體" },
  { label: "最有感優勢", value: "中島廚房與多人交誼空間" },
  { label: "常見用途", value: "慶生 聚餐 火鍋 宵夜 迎娶" },
  { label: "選館重點", value: "重視大家能不能聚在同一個空間" },
];

const actualGallery = [
  { src: "/images/hellohouse/photo1.webp", alt: "你好哇寓所 1F 交誼空間全景", caption: "1F 交誼空間" },
  { src: "/images/hellohouse/photo2.webp", alt: "你好哇寓所中島廚房設備", caption: "中島廚房" },
  { src: "/images/hellohouse/photo3.webp", alt: "你好哇寓所客房實景", caption: "客房質感" },
  { src: "/images/hellohouse/bar-2.webp", alt: "你好哇寓所吧台與高腳椅", caption: "吧台角落" },
  { src: "/images/hellohouse/photo4.webp", alt: "你好哇寓所樓梯與空間細節", caption: "空間細節" },
  { src: "/images/hellohouse/photo5.webp", alt: "你好哇寓所館外巷弄外觀", caption: "館外外觀" },
];

const nearbyHighlights = hellohouse.nearbySpots.slice(0, 6);

const getRoomId = (room: Room) => `room-${room.id}`;

const getBathroomLabel = (room: Room) =>
  room.badges.find((badge) => badge.label.includes("衛浴"))?.label ?? (room.capacity > 0 ? "獨立衛浴" : "空間配置");

const getUseLabel = (room: Room) => (room.capacity > 0 ? `${room.capacity} 人入住` : "聚會與備餐");

const getHighlightLabel = (room: Room) =>
  room.highlight ?? room.badges.find((badge) => badge.gold)?.label ?? room.badges[0]?.label ?? "空間細節";

export default function HelloHousePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "@id": "https://www.hello-stay.com/hellohouse/#lodging",
              name: "你好哇寓所 Hello House",
              alternateName: ["Hello House", "你好哇", "Hello Stay 一館"],
              url: "https://www.hello-stay.com/hellohouse",
              telephone: "+886-932-828-922",
              description:
                "高雄鹽埕區 6-26 人包棟民宿，主打 1F 中島廚房、交誼空間、麻將與多元房型，適合多人聚會與家族旅行。",
              address: {
                "@type": "PostalAddress",
                streetAddress: "大公路70巷8號",
                addressLocality: "鹽埕區",
                addressRegion: "高雄市",
                postalCode: "803",
                addressCountry: "TW",
              },
              geo: { "@type": "GeoCoordinates", latitude: 22.62497, longitude: 120.28459 },
              hasMap: hellohouse.mapUrl,
              checkinTime: "16:00",
              checkoutTime: "11:00",
              numberOfRooms: 6,
              petsAllowed: false,
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "中島廚房", value: true },
                { "@type": "LocationFeatureSpecification", name: "麻將桌", value: true },
                { "@type": "LocationFeatureSpecification", name: "客房獨立衛浴", value: true },
                { "@type": "LocationFeatureSpecification", name: "免費 Wi-Fi", value: true },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.5",
                reviewCount: "75",
                bestRating: "5",
              },
            },
          ]),
        }}
      />

      <PropertyShowcasePage
        hero={{
          kicker: "HELLO HOUSE",
          title: "你好哇寓所",
          lead:
            "六間房搭配 1F 中島廚房與大型交誼空間，重點不是單純能睡幾個人，而是整團能不能一起吃飯、聊天、備餐與活動。",
          image: {
            src: "/images/hellohouse/1000.webp",
            alt: "你好哇寓所 1F 中島廚房與交誼空間",
          },
          stats: heroStats,
          primaryAction: { href: bookingHref, label: "查看空房與報價", external: true },
          secondaryAction: { href: hellohouse.lineUrl, label: "LINE 詢問方案", external: true },
        }}
        overview={{
          kicker: "ROOM GUIDE",
          title: "公共空間與各房型",
          intro: "1F 聚會與廚房是多數客人最先在意的重點 再搭配各房床位與衛浴會更容易判斷",
          columns: 3,
          cards: hellohouse.rooms.map((room) => ({
            id: getRoomId(room),
            kicker: room.floor,
            title: room.name,
            summary: `${getUseLabel(room)} · ${room.size} · ${getBathroomLabel(room)}`,
            image: {
              src: room.images[0]?.src ?? hellohouse.coverImage,
              alt: room.images[0]?.alt ?? room.name,
            },
          })),
        }}
        details={{
          kicker: "ROOM DETAILS",
          title: "公共空間與各房型設備",
          intro: "每層的入住人數 坪數 衛浴與設備都整理在這裡",
          cards: hellohouse.rooms.map((room) => ({
            id: getRoomId(room),
            kicker: room.floor,
            title: room.name,
            description: room.subtitle,
            image: {
              src: room.images[0]?.src ?? hellohouse.coverImage,
              alt: room.images[0]?.alt ?? room.name,
            },
            specs: [
              { label: "用途", value: getUseLabel(room) },
              { label: "空間", value: room.size },
              { label: "衛浴", value: getBathroomLabel(room) },
              { label: "亮點", value: getHighlightLabel(room) },
            ],
            groups: room.equipment.map((category) => ({
              title: category.category,
              items: category.items.map((item) => `${item.label}${item.detail ? ` ${item.detail}` : ""}`),
            })),
          })),
          factsTitle: "整棟設備",
          facts: houseFacts,
          guidesTitle: "入住重點",
          guides: stayGuides,
          fitTitle: "適合的入住方式",
          fit: fitGuides,
        }}
        gallery={{
          kicker: "GALLERY",
          title: "實景照片",
          intro: "館內與館外的實際畫面都整理在這裡",
          columns: 3,
          images: actualGallery,
        }}
        location={{
          kicker: "LOCATION",
          title: "住在鹽埕哪一段",
          intro: "從大公路巷內走出去，捷運、駁二與鹽埕小吃都在步行範圍。",
          cardTitle: "地址",
          address: hellohouse.address,
          description: "如果這次行程會穿插駁二散步、鹽埕吃東西，晚上又要回民宿聚餐，這個位置會很順。",
          mapUrl: hellohouse.mapUrl,
          spots: nearbyHighlights.map((spot) => ({
            name: spot.name,
            detail: spot.walkMinutes > 0 ? `步行 ${spot.walkMinutes} 分鐘` : spot.description ?? "交通可達",
          })),
        }}
        final={{
          kicker: "BOOKING",
          title: "確認日期與人數後再查空房",
          body: "如果最在意的是一起吃飯 備餐和聊天 1F 公共空間與房型配置通常會最影響決定",
          primaryAction: { href: bookingHref, label: "查這館空房", external: true },
          secondaryAction: { href: hellohouse.lineUrl, label: "LINE 詢問方案", external: true },
        }}
      />
    </>
  );
}
