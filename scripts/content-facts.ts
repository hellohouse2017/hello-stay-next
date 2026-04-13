export interface SeoPriorityEntry {
  slug: string
  priority: number
  reason: string
  currentRank?: number
  previousRank?: number
  ctr?: number
  clicks?: number
  impressions?: number
  generatedAt?: string
}

export interface PropertyFacts {
  displayName: string
  capacity: string
  highlights: string[]
  weekdayPriceFrom?: string
  holidayPriceFrom?: string
}

export interface ContentFacts {
  businessName: string
  operatingYears: number
  guestGroupsServed: number
  location: string
  neighborhood: string
  baseFacts: string[]
  bookingTips: string[]
  transportUpdates: string[]
  nearbySpots: string[]
  foodHighlights: string[]
  parkingOptions: string[]
  properties: Record<string, PropertyFacts>
}

export const CONTENT_FACTS: ContentFacts = {
  businessName: 'Hello Stay',
  operatingYears: 8,
  guestGroupsServed: 5000,
  location: '高雄市鹽埕區',
  neighborhood: '鹽埕區 / 駁二 / 大港橋生活圈',
  baseFacts: [
    '高雄鹽埕區包棟民宿，主打 6-48 人團體住宿。',
    '步行可達駁二藝術特區、大港橋、鹽埕老街與捷運鹽埕埔站。',
    '住宿核心賣點是中島廚房、麻將、桌遊與整棟獨立空間。'
  ],
  bookingTips: [
    '週日到週四入住通常比假日便宜 20-30%，也比較容易避開景點人潮。',
    '20 人以上團體建議在出發前先分房、分工採買與交通安排。',
    '若晚餐要在民宿聚餐，自煮火鍋通常是最穩定也最好分工的選項。'
  ],
  transportUpdates: [
    '捷運鹽埕埔站步行可達，適合搭配步行與 YouBike 安排行程。',
    '駁二、大港橋、鹽埕老街可串成不需頻繁移車的步行動線。',
    '若自駕入住，建議先停好車再以步行與捷運移動，減少找車位時間。'
  ],
  nearbySpots: [
    '駁二藝術特區',
    '大港橋',
    '棧貳庫',
    '鹽埕老街',
    '旗津渡輪動線'
  ],
  foodHighlights: [
    '大摳胖碳烤三明治',
    '港園牛肉麵',
    '鴨肉珍',
    '阿囉哈滷味',
    '小堤咖啡'
  ],
  parkingOptions: [
    '路邊白線停車',
    'Times 停車場',
    '大勇路停車場',
    '捷運鹽埕埔站停車場'
  ],
  properties: {
    hellohouse: {
      displayName: '你好哇寓所',
      capacity: '6-26 人',
      highlights: ['中島廚房', '麻將桌', '多房型彈性分配'],
      weekdayPriceFrom: '$16,000',
      holidayPriceFrom: '$20,000'
    },
    godin: {
      displayName: '溝頂民宿',
      capacity: '6-12 人',
      highlights: ['五層獨棟', '家庭旅遊友善', '適合長輩同行'],
      weekdayPriceFrom: '$12,000',
      holidayPriceFrom: '$15,000'
    },
    combo: {
      displayName: '兩棟合訂方案',
      capacity: '27-38 人',
      highlights: ['兩棟距離近', '適合大家族或公司團體', '兼顧分層作息'],
      weekdayPriceFrom: '$28,000',
      holidayPriceFrom: '$35,000'
    }
  }
}

export function inferArticleCategory(slug: string): 'food' | 'group' | 'guide' | 'general' {
  if (slug.includes('food')) return 'food'
  if (slug.includes('family') || slug.includes('group') || slug.includes('graduation')) return 'group'
  if (slug.includes('guide') || slug.includes('recommendation')) return 'guide'
  return 'general'
}
