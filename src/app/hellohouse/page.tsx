import type { Metadata } from "next";
import type { Room } from "@/data/properties";
import PropertyShowcasePage from "@/components/PropertyShowcasePage";
import { hellohouse } from "@/data/properties";
import { getAlternateLanguageMap } from "@/i18n/config";
import { publicStayFacts } from "@/data/public-stay-facts";

const bookingHref = "https://booking.hello-stay.com/booking?property=%E4%BD%A0%E5%A5%BD%E5%93%87%E5%AF%93%E6%89%80";
const pier2WalkMinutes = hellohouse.nearbySpots.find((spot) => spot.name === "駁二藝術特區")?.walkMinutes ?? 10;
const dagangWalkMinutes = hellohouse.nearbySpots.find((spot) => spot.name.includes("大港橋"))?.walkMinutes ?? 12;
const mrtWalkMinutes = hellohouse.nearbySpots.find((spot) => spot.name.includes("鹽埕埔站"))?.walkMinutes ?? 5;

export const metadata: Metadata = {
  title: "你好哇寓所｜高雄 8-26 人包棟民宿・有廚房與麻將桌",
  description:
    "高雄 8-26 人包棟民宿「你好哇寓所」，位於鹽埕區，主打 1F 中島廚房、大型交誼空間與麻將桌。適合家族旅行、朋友聚會、迎娶、慶生與多人聚餐。",
  alternates: {
    canonical: "https://www.hello-stay.com/hellohouse",
    languages: getAlternateLanguageMap("/hellohouse"),
  },
  openGraph: {
    title: "你好哇寓所｜高雄 8-26 人包棟民宿・有廚房與麻將桌｜Hello Stay",
    description:
      "你好哇寓所提供高雄 8-26 人包棟，重點是中島廚房、吧台、大型交誼空間與麻將桌，適合多人聚會與家族旅遊。",
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
  { label: "入住人數", value: "8-26 人" },
  { label: "公共空間", value: "1F 中島廚房與大型交誼區" },
  { label: "步行圈", value: `駁二 ${pier2WalkMinutes} 分鐘 / 捷運 ${mrtWalkMinutes} 分鐘` },
  { label: "衛浴", value: "客房皆有獨立衛浴" },
];

const houseFacts = [
  { label: "客房配置", value: `雙人房 ${publicStayFacts.hellohouse.bedroomLayout.double} 間 四人房 ${publicStayFacts.hellohouse.bedroomLayout.quadruple} 間 六人房 ${publicStayFacts.hellohouse.bedroomLayout.sixPerson} 間` },
  { label: "公共空間", value: "1F 挑高交誼區 中島廚房 吧台" },
  { label: "開伙設備", value: "IH 爐 RO 飲水機 雙門冰箱 烤箱 微波爐 鍋碗餐具" },
  { label: "娛樂設備", value: "手動麻將 桌遊 撲克牌 43 吋聯網電視" },
  { label: "衛浴配置", value: "客房皆有獨立衛浴，公共空間另有衛浴配置" },
  { label: "入住配置", value: "電子密碼鎖 Wi-Fi 冷暖空調 室內拖鞋" },
];

const stayGuides = [
  "1F 是整團一起備餐、吃飯、聊天、打麻將的核心空間",
  "2F 有雙人房與四人房，3F 有雙人房與六人房，4F 有雙人房與六人房",
  "公共空間會直接影響這館的使用感受",
  "如需迎娶、補寢具或需要加床，請先透過 LINE 確認當次方案",
];

const fitGuides = [
  { label: "適合人數", value: "8-26 人（家族旅行 朋友聚會 迎娶團體）" },
  { label: "最有感優勢", value: "中島廚房與多人交誼空間" },
  { label: "常見用途", value: "慶生 聚餐 火鍋 宵夜 迎娶" },
  { label: "選館重點", value: "重視大家能不能聚在同一個空間" },
  { label: "不一定適合", value: "只想找小型整棟，或非常在意電梯與無樓梯動線" },
];

const actualGallery = [
  { src: "/images/hellohouse/cover.webp", alt: "你好哇寓所一樓中島廚房全景", caption: "中島廚房全景" },
  { src: "/images/hellohouse/1000.webp", alt: "你好哇寓所一樓中島廚房與備餐設備", caption: "廚房設備" },
  { src: "/images/hellohouse/1201.webp", alt: "你好哇寓所二樓 1201 雙人房", caption: "1201 雙人房" },
  { src: "/images/hellohouse/1202.webp", alt: "你好哇寓所二樓 1202 四人房", caption: "1202 四人房" },
  { src: "/images/hellohouse/1301.webp", alt: "你好哇寓所三樓 1301 雙人房", caption: "1301 雙人房" },
  { src: "/images/hellohouse/1302.webp", alt: "你好哇寓所三樓 1302 六人房", caption: "1302 六人房" },
  { src: "/images/hellohouse/1402.webp", alt: "你好哇寓所四樓 1402 六人房", caption: "1402 六人房" },
];

const faqItems = [
  {
    question: "你好哇寓所適合幾人入住？",
    answer: "這館適合 8-26 人包棟；如果是 13-26 人的家族旅遊、朋友聚會、迎娶或公司 outing，通常會先看這館。",
    links: [{ href: "/compare", label: "看三館比較" }],
  },
  {
    question: "可以自己下廚或煮火鍋嗎？",
    answer: "可以。1F 有雙口 IH 爐、RO 飲水機、雙門冰箱、烤箱、微波爐與完整鍋碗餐具，適合煮火鍋、宵夜或簡單聚餐。",
    links: [{ href: "/blog/kaohsiung-kitchen-bnb#kitchen", label: "看廚房設備" }],
  },
  {
    question: "可以打麻將嗎？",
    answer: "可以。1F 公共空間有手動麻將桌、桌遊與聯網電視，晚上回館後最常用到的就是這一區。",
    links: [{ href: "/blog/kaohsiung-mahjong-stay", label: "看麻將入住攻略" }],
  },
  {
    question: "走路到駁二、大港橋和捷運多久？",
    answer: `從館內走出去，步行約 ${pier2WalkMinutes} 分鐘到駁二藝術特區、約 ${dagangWalkMinutes} 分鐘到大港橋 / 棧貳庫、約 ${mrtWalkMinutes} 分鐘到捷運鹽埕埔站 O2。`,
    links: [{ href: "/traffic", label: "看交通與停車" }],
  },
  {
    question: "哪種團體最適合這館？",
    answer: "最適合會一起吃飯、聊天、備餐、打麻將或辦活動的團體。如果你更在意每層分開休息、只要小型整棟，先比較溝頂民宿會更快。",
    links: [
      { href: "/godin", label: "看溝頂民宿" },
      { href: "/book", label: "直接查日期與空房" },
    ],
  },
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
              email: "hellohouse2017@gmail.com",
              description:
                "高雄鹽埕區 8-26 人包棟民宿，主打 1F 中島廚房、交誼空間、麻將與多元房型，適合多人聚會與家族旅行。",
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
              sameAs: [
                "https://www.instagram.com/hellohouse2020/",
                "https://www.facebook.com/HelloHouse2020/",
                "https://lin.ee/atCiMQw",
                "https://www.google.com/maps/place/?q=place_id:ChIJs97gIJMFbjQRzlIsr4hlP-U",
              ],
              checkinTime: "16:00",
              checkoutTime: "11:00",
              numberOfRooms: 6,
              petsAllowed: false,
              smokingAllowed: false,
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "中島廚房", value: true },
                { "@type": "LocationFeatureSpecification", name: "麻將桌", value: true },
                { "@type": "LocationFeatureSpecification", name: "客房獨立衛浴", value: true },
                { "@type": "LocationFeatureSpecification", name: "免費 Wi-Fi", value: true },
                { "@type": "LocationFeatureSpecification", name: "43吋 Netflix 聯網電視", value: true },
                { "@type": "LocationFeatureSpecification", name: "RO 逆滲透飲水機", value: true },
                { "@type": "LocationFeatureSpecification", name: "自助密碼鎖入住", value: true },
                { "@type": "LocationFeatureSpecification", name: "電梯", value: false },
                { "@type": "LocationFeatureSpecification", name: "戶外烤肉區", value: false },
              ],
              containsPlace: [
                {
                  "@type": "Accommodation",
                  name: "你好哇 雙人房 (共 3 間：1201、1301、1401)",
                  occupancy: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2 },
                  bed: { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "Double" },
                },
                {
                  "@type": "Accommodation",
                  name: "你好哇 四人房 (共 1 間：1202)",
                  occupancy: { "@type": "QuantitativeValue", minValue: 1, maxValue: 4 },
                  bed: { "@type": "BedDetails", numberOfBeds: 2, typeOfBed: "Double" },
                },
                {
                  "@type": "Accommodation",
                  name: "你好哇 六人房 (共 2 間：1302、1402)",
                  occupancy: { "@type": "QuantitativeValue", minValue: 1, maxValue: 6 },
                  bed: { "@type": "BedDetails", numberOfBeds: 3, typeOfBed: "Double" },
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "首頁",
                  item: "https://www.hello-stay.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "你好哇寓所",
                  item: "https://www.hello-stay.com/hellohouse",
                },
              ],
            },
          ]),
        }}
      />

      <PropertyShowcasePage
        hero={{
          kicker: "主館導覽",
          title: "你好哇寓所",
          lead: `適合 8-26 人包棟。設有中島廚房與大型交誼空間，步行約 ${pier2WalkMinutes} 分鐘到駁二、${mrtWalkMinutes} 分鐘到捷運鹽埕埔站。`,
          image: {
            src: "/images/hellohouse/1000.webp",
            alt: "你好哇寓所 1F 中島廚房與交誼空間",
          },
          stats: heroStats,
          primaryAction: { href: bookingHref, label: "查詢空房與報價", external: true },
          secondaryAction: { href: hellohouse.lineUrl, label: "LINE 線上客服", external: true },
        }}
        overview={{
          kicker: "房型指南",
          title: "公共空間與各房型",
          intro: [
            "1F 的中島廚房與交誼空間，",
            "通常是大家最先在意的重點。",
            "再看各房床位與衛浴，",
            "會更快判斷適不適合。",
          ],
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
          kicker: "房型細節",
          title: "公共空間與各房型設備",
          intro: [
            "每層的入住人數、坪數、衛浴與設備，",
            "都整理在這裡。",
          ],
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
          kicker: "實景照片",
          title: "實景照片",
          intro: "館內與館外的實際畫面都整理在這裡。",
          columns: 3,
          images: actualGallery,
        }}
        faq={{
          kicker: "常見問題",
          title: "你訂這館前通常會先確認這幾件事",
          intro: "先把設備、步行圈與適合情境回答清楚，查空房時會快很多。",
          items: faqItems,
        }}
        location={{
          kicker: "周邊位置",
          title: "住在鹽埕哪一段",
          intro: [
            "從大公路巷內走出去，",
            "捷運、駁二與鹽埕小吃都在步行範圍。",
          ],
          cardTitle: "地址",
          address: hellohouse.address,
          description: [
            "如果這次行程會穿插駁二散步、鹽埕吃東西，",
            "晚上又要回民宿聚餐，",
            "這個位置會很順。",
          ],
          mapUrl: hellohouse.mapUrl,
          spots: nearbyHighlights.map((spot) => ({
            name: spot.name,
            detail: spot.walkMinutes > 0 ? `步行 ${spot.walkMinutes} 分鐘` : spot.description ?? "交通可達",
          })),
        }}
        final={{
          kicker: "訂房提醒",
          title: "確認日期與人數後再查空房",
          body: [
            "如果最在意的是一起吃飯、備餐和聊天，",
            "1F 公共空間與房型配置，",
            "通常會最影響決定。",
          ],
          primaryAction: { href: bookingHref, label: "查這館空房", external: true },
          secondaryAction: { href: hellohouse.lineUrl, label: "LINE 線上客服", external: true },
        }}
      />
    </>
  );
}
