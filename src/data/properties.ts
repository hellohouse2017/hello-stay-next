/**
 * 民宿物件結構化資料
 * 所有頁面、元件、schema markup 共用此資料源
 */

export interface RoomImage {
    src: string;
    alt: string;
}

export interface Equipment {
    icon: string;
    label: string;
    detail?: string;
}

export interface EquipmentCategory {
    category: string;
    icon: string;
    items: Equipment[];
}

export interface Room {
    id: string;
    floor: string;
    name: string;
    subtitle: string;
    size: string;
    capacity: number;
    highlight?: string;
    images: RoomImage[];
    badges: { label: string; gold?: boolean }[];
    equipment: EquipmentCategory[];
}

export interface NearbySpot {
    icon: string;
    name: string;
    walkMinutes: number;
    category: 'attraction' | 'food' | 'transport' | 'convenience';
    description?: string;
}

export interface Property {
    slug: string;
    name: string;
    nameEn: string;
    tagline: string;
    description: string;
    capacity: { min: number; max: number };
    startPrice: number;
    priceUnit: string;
    rating: { value: string; count: string };
    address: string;
    addressFull: { street: string; district: string; city: string; zip: string };
    location: { lat: number; lng: number };
    mapUrl: string;
    phone: string;
    checkin: string;
    checkout: string;
    totalRooms: number;
    coverImage: string;
    galleryImages: RoomImage[];
    rooms: Room[];
    nearbySpots: NearbySpot[];
    highlights: { icon: string; title: string; desc: string }[];
    reviews: { text: string; author: string; rating: number }[];
    mediaAppearances?: { show: string; cast: string; url: string }[];
    lineUrl: string;
}

// ═══════════════════════════════════════════════
// 你好哇寓所 Hello House
// ═══════════════════════════════════════════════
export const hellohouse: Property = {
    slug: 'hellohouse',
    name: '你好哇寓所',
    nameEn: 'Hello House',
    tagline: 'Hello House · Est. 2017',
    description: '座落於高雄鹽埕區核心，專注於 6 至 26 人的獨立包棟空間。在這裡沒有外人的打擾，只有您與親朋好友在寬敞的中島廚房圍爐、在客廳歡笑的珍貴時刻。',
    capacity: { min: 6, max: 26 },
    startPrice: 10000,
    priceUnit: '平日起',
    rating: { value: '4.9', count: '87' },
    address: '高雄市鹽埕區大公路70巷8號',
    addressFull: { street: '大公路70巷8號', district: '鹽埕區', city: '高雄市', zip: '803' },
    location: { lat: 22.62497, lng: 120.28459 },
    mapUrl: 'https://goo.gl/maps/qxGN4mpNP8qfRCB16',
    phone: '+886-932-828-922',
    checkin: '16:00',
    checkout: '11:00',
    totalRooms: 6,
    coverImage: '/images/hellohouse/cover.webp',
    lineUrl: 'https://lin.ee/atCiMQw',
    galleryImages: [
        { src: '/images/hellohouse/photo1.webp', alt: '你好哇寓所 客廳空間' },
        { src: '/images/hellohouse/photo2.webp', alt: '你好哇寓所 廚房設備' },
        { src: '/images/hellohouse/photo3.webp', alt: '你好哇寓所 房間' },
        { src: '/images/hellohouse/photo4.webp', alt: '你好哇寓所 空間細節' },
        { src: '/images/hellohouse/photo5.webp', alt: '你好哇寓所 環境' },
        { src: '/images/hellohouse/bar-2.webp', alt: '你好哇寓所 吧台區' },
    ],
    rooms: [
        {
            id: 'hh-1f', floor: '1F', name: '公共空間', subtitle: '寬敞舒適的交誼核心，大家聚在一起最棒的空間。',
            size: '56 m²', capacity: 0, highlight: '豪華中島廚房',
            images: [
                { src: '/images/hellohouse/1000.webp', alt: '1F 公共空間 — 中島廚房與交誼區' },
                { src: '/images/hellohouse/photo1.webp', alt: '1F 客廳全景' },
                { src: '/images/hellohouse/photo2.webp', alt: '1F 廚房設備近拍' },
                { src: '/images/hellohouse/bar-2.webp', alt: '1F 吧台與酒水區' },
            ],
            badges: [
                { label: '56 m²' },
                { label: '豪華中島廚房', gold: true },
                { label: '獨立衛浴' },
            ],
            equipment: [
                { category: '廚房', icon: '🍳', items: [
                    { icon: '🍳', label: '雙口 IH 爐', detail: '抽油煙機' },
                    { icon: '🧊', label: 'RO 飲水機' },
                    { icon: '🧊', label: '雙門冰箱' },
                    { icon: '🍞', label: '烤箱 / 微波爐' },
                    { icon: '🍽️', label: '完整鍋碗瓢盆' },
                    { icon: '🧴', label: '調味料架' },
                ]},
                { category: '娛樂', icon: '🎮', items: [
                    { icon: '🀄', label: '手動麻將桌' },
                    { icon: '🃏', label: '桌遊 / 撲克牌' },
                    { icon: '📺', label: '43" 聯網電視', detail: 'Netflix / YouTube' },
                ]},
                { category: '便利設施', icon: '✨', items: [
                    { icon: '❄️', label: '一級冷暖空調' },
                    { icon: '🔑', label: '電子密碼鎖' },
                    { icon: '📶', label: '免費 Wi-Fi' },
                    { icon: '👟', label: '室內拖鞋' },
                ]},
            ],
        },
        {
            id: 'hh-1201', floor: '2F', name: '1201 雙人房', subtitle: '標準舒適空間，溫馨的休憩角落。',
            size: '24 m²', capacity: 2,
            images: [
                { src: '/images/hellohouse/1201.webp', alt: '2F-1201 雙人房' },
            ],
            badges: [
                { label: '24 m²' },
                { label: '對外氣密窗', gold: true },
                { label: '乾濕分離衛浴' },
            ],
            equipment: [
                { category: '睡眠', icon: '🛏️', items: [
                    { icon: '🛏️', label: '標準雙人床', detail: '150×200cm 獨立筒床墊' },
                ]},
                { category: '衛浴', icon: '🚿', items: [
                    { icon: '🚿', label: '乾濕分離淋浴' },
                    { icon: '💨', label: '吹風機' },
                    { icon: '🧴', label: '沐浴用品' },
                ]},
                { category: '便利設施', icon: '✨', items: [
                    { icon: '📺', label: '聯網電視' },
                    { icon: '💻', label: '書桌' },
                    { icon: '❄️', label: '冷暖空調' },
                ]},
            ],
        },
        {
            id: 'hh-1202', floor: '2F', name: '1202 四人房', subtitle: '極佳採光與網美設施，拍照打卡首選。',
            size: '40 m²', capacity: 4, highlight: '網美吊椅房',
            images: [
                { src: '/images/hellohouse/1202.webp', alt: '2F-1202 四人房 — 網美吊椅房' },
            ],
            badges: [
                { label: '40 m²' },
                { label: '落地玻璃採光', gold: true },
                { label: '✨ 網美吊椅', gold: true },
            ],
            equipment: [
                { category: '睡眠', icon: '🛏️', items: [
                    { icon: '🛏️', label: '標準雙人床 ×2', detail: '150×200cm 獨立筒床墊' },
                ]},
                { category: '衛浴', icon: '🚿', items: [
                    { icon: '🚿', label: '乾濕分離衛浴' },
                    { icon: '💨', label: '吹風機' },
                ]},
                { category: '便利設施', icon: '✨', items: [
                    { icon: '🪑', label: '沙發 / 茶几 / 吊椅' },
                    { icon: '📺', label: '聯網電視' },
                    { icon: '❄️', label: '冷暖空調' },
                ]},
            ],
        },
        {
            id: 'hh-1302', floor: '3F', name: '1302 六人房', subtitle: '寬敞團體空間，適合家庭或好朋友同住。',
            size: '48 m²', capacity: 6,
            images: [
                { src: '/images/hellohouse/1302.webp', alt: '3F-1302 六人房' },
            ],
            badges: [
                { label: '48 m²' },
                { label: '落地玻璃採光', gold: true },
                { label: '乾濕分離衛浴' },
            ],
            equipment: [
                { category: '睡眠', icon: '🛏️', items: [
                    { icon: '🛏️', label: '雙人床 ×3', detail: '150×200cm' },
                ]},
                { category: '衛浴', icon: '🚿', items: [
                    { icon: '🚿', label: '乾濕分離衛浴' },
                    { icon: '💨', label: '吹風機' },
                ]},
                { category: '便利設施', icon: '✨', items: [
                    { icon: '💻', label: '書桌' },
                    { icon: '📺', label: '聯網電視' },
                    { icon: '❄️', label: '冷暖空調' },
                ]},
            ],
        },
        {
            id: 'hh-1401', floor: '4F', name: '1401 雙人房', subtitle: '雅緻高樓層視野，享受安靜的私人時光。',
            size: '24 m²', capacity: 2,
            images: [
                { src: '/images/hellohouse/1401.webp', alt: '4F-1401 雙人房' },
            ],
            badges: [
                { label: '24 m²' },
                { label: '對外落地窗', gold: true },
                { label: '乾濕分離衛浴' },
            ],
            equipment: [
                { category: '睡眠', icon: '🛏️', items: [
                    { icon: '🛏️', label: '標準雙人床', detail: '獨立筒床墊' },
                ]},
                { category: '便利設施', icon: '✨', items: [
                    { icon: '🪑', label: '沙發 / 茶几' },
                    { icon: '❄️', label: '冷暖空調' },
                ]},
            ],
        },
        {
            id: 'hh-1402', floor: '4F', name: '1402 六人房', subtitle: '高樓層大空間，視野開闊，團體入住首選。',
            size: '45 m²', capacity: 6,
            images: [
                { src: '/images/hellohouse/1402.webp', alt: '4F-1402 六人房' },
            ],
            badges: [
                { label: '45 m²' },
                { label: '落地玻璃採光', gold: true },
                { label: '乾濕分離衛浴' },
            ],
            equipment: [
                { category: '睡眠', icon: '🛏️', items: [
                    { icon: '🛏️', label: '雙人床 ×3', detail: '150×200cm' },
                ]},
                { category: '便利設施', icon: '✨', items: [
                    { icon: '💻', label: '書桌' },
                    { icon: '📺', label: '聯網電視' },
                    { icon: '❄️', label: '冷暖空調' },
                ]},
            ],
        },
    ],
    nearbySpots: [
        { icon: '🎨', name: '駁二藝術特區', walkMinutes: 10, category: 'attraction', description: '高雄最大的藝文創意園區' },
        { icon: '🌉', name: '大港橋 / 棧貳庫', walkMinutes: 12, category: 'attraction', description: '全台首座旋轉橋' },
        { icon: '🚇', name: '捷運鹽埕埔站 O2', walkMinutes: 5, category: 'transport' },
        { icon: '🚈', name: '輕軌駁二大義站 C12', walkMinutes: 8, category: 'transport' },
        { icon: '🍗', name: '鴨肉珍', walkMinutes: 3, category: 'food', description: '在地 50 年排隊名店' },
        { icon: '🍜', name: '冬粉王', walkMinutes: 4, category: 'food' },
        { icon: '🍧', name: '婆婆冰', walkMinutes: 5, category: 'food', description: '鹽埕經典冰品' },
        { icon: '☕', name: '銀座聚場', walkMinutes: 6, category: 'food', description: '文青咖啡廳' },
        { icon: '🏪', name: '7-ELEVEN', walkMinutes: 2, category: 'convenience' },
        { icon: '🏪', name: '全聯超市', walkMinutes: 5, category: 'convenience' },
        { icon: '🌅', name: '西子灣 / 中山大學', walkMinutes: 0, category: 'attraction', description: '捷運 2 站即達' },
        { icon: '⛴️', name: '旗津渡輪', walkMinutes: 0, category: 'attraction', description: '捷運 + 渡輪 20 分鐘' },
    ],
    highlights: [
        { icon: '🍳', title: '豪宅級中島廚房', desc: '開放式空間，IH 爐、微波爐、完整餐具，聚餐煮火鍋首選。' },
        { icon: '🀄', title: '專屬娛樂設施', desc: '手動麻將桌、43" 聯網電視，讓派對時光絕無冷場。' },
        { icon: '🛏️', title: '多元舒適房型', desc: '雙人至六人房靈活配置，全室乾濕分離衛浴，更有網美吊椅房型。' },
    ],
    reviews: [
        { text: '一樓的中島廚房真的太棒了！鍋碗瓢盆都很齊全，大家聚在一起煮火鍋喝酒，氣氛滿分。', author: 'T 先生', rating: 5 },
        { text: '離駁二走路只要10分鐘。隔音意外的好，晚上睡覺很安靜，床墊支撐性也很夠。', author: 'L 小姐', rating: 5 },
        { text: '老闆非常熱情親切。合法的民宿，消防設施都有，住得很安心。電子鎖密碼入住超方便。', author: 'W 先生', rating: 5 },
        { text: '客廳有麻將太加分！還有電視可以看 Netflix。每間都有獨立衛浴。', author: 'C 小姐', rating: 5 },
    ],
    mediaAppearances: [
        { show: '我們回家吧 2', cast: '曾寶儀', url: 'http://www.youtube.com/watch?v=L09FRVlfPgU' },
        { show: '綜藝玩很大', cast: '吳宗憲、KID、坤達', url: 'https://youtu.be/ohgLr40pOrA?t=99' },
        { show: '我的明星村長', cast: '卜學亮、郭泓志、姚元浩', url: 'https://youtu.be/IveYmupy8XM?t=2657' },
    ],
};

// ═══════════════════════════════════════════════
// 溝頂民宿 Godin House
// ═══════════════════════════════════════════════
export const godin: Property = {
    slug: 'godin',
    name: '溝頂民宿',
    nameEn: 'Godin House',
    tagline: 'Godin House · A Quiet Retreat',
    description: '溝頂民宿是你好哇系列的精緻二館。整棟五層樓獨立使用，沒有外人打擾。以溫馨家庭風格呈現，讓每一次入住都像回到自己的家。',
    capacity: { min: 10, max: 12 },
    startPrice: 10000,
    priceUnit: '平日起',
    rating: { value: '4.8', count: '45' },
    address: '高雄市鹽埕區大公路70巷6-2號',
    addressFull: { street: '大公路70巷6-2號', district: '鹽埕區', city: '高雄市', zip: '803' },
    location: { lat: 22.6244, lng: 120.2822 },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=高雄市鹽埕區大公路70巷6-2號',
    phone: '+886-932-828-922',
    checkin: '16:00',
    checkout: '11:00',
    totalRooms: 4,
    coverImage: '/images/godin/cover-1.webp',
    lineUrl: 'https://lin.ee/atCiMQw',
    galleryImages: [
        { src: '/images/godin/cover-3.webp', alt: '溝頂民宿 客廳交誼空間' },
        { src: '/images/godin/cover-4.webp', alt: '溝頂民宿 溫馨房型實景' },
        { src: '/images/godin/cover-bg.webp', alt: '溝頂民宿 五層樓獨棟外觀' },
    ],
    rooms: [
        {
            id: 'gd-1f', floor: '1F', name: '經典雙人房', subtitle: '一樓獨立空間，舒適安靜的休憩角落。',
            size: '15 m²', capacity: 2,
            images: [{ src: '/images/godin/room1.webp', alt: '1F 經典雙人房' }],
            badges: [{ label: '15 m²' }, { label: '獨立衛浴', gold: true }, { label: '對外窗' }],
            equipment: [
                { category: '睡眠', icon: '🛏️', items: [{ icon: '🛏️', label: '標準雙人床 ×1' }]},
                { category: '便利設施', icon: '✨', items: [{ icon: '💻', label: '工作桌椅' }, { icon: '❄️', label: '冷暖空調' }, { icon: '🚿', label: '淋浴設備' }]},
            ],
        },
        {
            id: 'gd-2f', floor: '2F', name: '陽光四人房', subtitle: '寬敞明亮，大面採光玻璃，適合家庭入住。',
            size: '18 m²', capacity: 4,
            images: [{ src: '/images/godin/room2.webp', alt: '2F 陽光四人房' }],
            badges: [{ label: '18 m²' }, { label: '大面採光玻璃', gold: true }, { label: '獨立衛浴' }],
            equipment: [
                { category: '睡眠', icon: '🛏️', items: [{ icon: '🛏️', label: '標準雙人床 ×2' }]},
                { category: '便利設施', icon: '✨', items: [{ icon: '🧴', label: '衛浴備品齊全' }, { icon: '💨', label: '吹風機 / 空調' }, { icon: '☀️', label: '自然採光' }]},
            ],
        },
        {
            id: 'gd-3f', floor: '3F', name: '雅緻四人房', subtitle: '溫馨風格，獨立衛浴，安靜舒適。',
            size: '18 m²', capacity: 4,
            images: [{ src: '/images/godin/room3.webp', alt: '3F 雅緻四人房' }],
            badges: [{ label: '18 m²' }, { label: '大面採光玻璃', gold: true }, { label: '獨立衛浴' }],
            equipment: [
                { category: '睡眠', icon: '🛏️', items: [{ icon: '🛏️', label: '標準雙人床 ×2' }]},
                { category: '便利設施', icon: '✨', items: [{ icon: '🧴', label: '衛浴備品齊全' }, { icon: '💨', label: '吹風機 / 空調' }]},
            ],
        },
        {
            id: 'gd-4f', floor: '4F', name: '公共交誼廳', subtitle: '團聚歡樂空間，麻將、桌遊、沙發，最棒的交誼時光。',
            size: '24 m²', capacity: 0, highlight: '休閒麻將桌',
            images: [{ src: '/images/godin/room4.webp', alt: '4F 公共交誼廳' }],
            badges: [{ label: '24 m²' }, { label: '休閒麻將桌', gold: true }, { label: '獨立空調' }],
            equipment: [
                { category: '娛樂', icon: '🎮', items: [
                    { icon: '🀄', label: '麻將 / 桌遊' },
                    { icon: '📺', label: '聯網電視' },
                    { icon: '🛋️', label: '舒適沙發區' },
                ]},
                { category: '廚房', icon: '🍳', items: [
                    { icon: '🧊', label: 'RO 飲水機 / 雙門冰箱' },
                    { icon: '🍞', label: '微波爐' },
                    { icon: '🚰', label: '流理台' },
                ]},
            ],
        },
        {
            id: 'gd-5f', floor: '5F', name: '景觀雙人房', subtitle: '頂樓視野開闊，落地窗街景，充足採光。',
            size: '15 m²', capacity: 2,
            images: [{ src: '/images/godin/room5.webp', alt: '5F 景觀雙人房' }],
            badges: [{ label: '15 m²' }, { label: '落地窗', gold: true }, { label: '獨立衛浴' }],
            equipment: [
                { category: '睡眠', icon: '🛏️', items: [{ icon: '🛏️', label: '標準雙人床' }]},
                { category: '便利設施', icon: '✨', items: [{ icon: '📖', label: '閱讀區' }, { icon: '❄️', label: '冷暖空調' }, { icon: '🏙️', label: '街景視野' }]},
            ],
        },
    ],
    nearbySpots: [
        { icon: '🎨', name: '駁二藝術特區', walkMinutes: 10, category: 'attraction' },
        { icon: '🌉', name: '大港橋', walkMinutes: 8, category: 'attraction' },
        { icon: '🚇', name: '捷運鹽埕埔站 O2', walkMinutes: 5, category: 'transport' },
        { icon: '🚈', name: '輕軌駁二大義站', walkMinutes: 7, category: 'transport' },
        { icon: '🍗', name: '鴨肉珍', walkMinutes: 3, category: 'food' },
        { icon: '🏪', name: '7-ELEVEN', walkMinutes: 2, category: 'convenience' },
    ],
    highlights: [
        { icon: '🏠', title: '五層樓獨棟', desc: '整棟獨立使用，沒有外人打擾。' },
        { icon: '🀄', title: '專屬麻將桌', desc: '4F 交誼廳附麻將、桌遊、沙發。' },
        { icon: '💰', title: '超值包棟', desc: '平日 $8,000 起，10 人平均每人 $800。' },
    ],
    reviews: [
        { text: '很適合家族出遊，五層樓每家人住一層互不干擾，4 樓打麻將到天亮！', author: '陳先生', rating: 5 },
        { text: '離駁二很近，環境安靜乾淨，CP 值很高。', author: '王小姐', rating: 5 },
    ],
};

// ═══════════════════════════════════════════════
// 所有物件匯出
// ═══════════════════════════════════════════════
export const properties: Property[] = [hellohouse, godin];

export function getPropertyBySlug(slug: string): Property | undefined {
    return properties.find(p => p.slug === slug);
}
