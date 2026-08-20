import type { Locale } from "./config";

export interface HomeFaqItem {
    q: string;
    a: string;
}

// Visible FAQ + FAQPage schema data for locale home pages.
// Facts mirror src/data/public-stay-facts.ts and src/data/llms-faq.ts —
// keep numbers in sync when public facts change.
const jaHomeFaq: HomeFaqItem[] = [
    {
        q: "Hello Stayにはどんな貸切プランがありますか？",
        a: "現在予約できるのはハローハウス（8〜26名）とゴーディンハウス・溝頂民宿（4〜12名）です。2棟貸切は通常27〜34名向けで、35〜36名はエキストラベッドが必要です。大智若愚は計画中でまだ予約できません。",
    },
    {
        q: "20名前後のグループにおすすめの宿は？",
        a: "ハローハウスがおすすめです。8〜26名の柔軟なプランで、アイランドキッチンで鍋パーティーもできます。MRT塩埕埔駅から徒歩約5分です。",
    },
    {
        q: "エレベーターはありますか？",
        a: "溝頂民宿にはエレベーターがなく、館内は階段での移動になります。ハローハウスも階段の建物です。ご年配の方がいらっしゃる場合は低層階のお部屋をおすすめします。",
    },
    {
        q: "駁二芸術特区までどのくらいですか？",
        a: "ハローハウスと溝頂民宿から徒歩約10分です。MRT塩埕埔駅までは徒歩約5分、大港橋までは徒歩約8分です。",
    },
    {
        q: "合法民宿ですか？保険はありますか？",
        a: "はい。ハローハウス（高雄市民宿登録番号131）と溝頂民宿（同163）は合法登録済みの民宿で、公共賠償責任保険にも加入しています。",
    },
    {
        q: "実際の料金はどこで確認できますか？",
        a: "公式予約サイトで日付と人数を入力すると、選べるプラン・空室状況・見積もりを確認できます。料金は検索時の表示が基準です。",
    },
];

const koHomeFaq: HomeFaqItem[] = [
    {
        q: "Hello Stay에는 어떤 독채 플랜이 있나요?",
        a: "현재 예약 가능한 곳은 헬로하우스(8-26명)와 거우딩 민박(4-12명)입니다. 두 채 통째 대여는 보통 27-34명에 적합하며, 35-36명은 엑스트라 베드가 필요합니다. 다즈르위는 아직 계획 단계로 예약할 수 없습니다.",
    },
    {
        q: "20명 정도의 단체에게 추천하는 숙소는?",
        a: "헬로하우스를 추천합니다. 8-26명까지 유연하게 이용할 수 있고, 아일랜드 키친에서 다 함께 요리도 즐길 수 있습니다. MRT 옌청푸역에서 도보 약 5분입니다.",
    },
    {
        q: "엘리베이터가 있나요?",
        a: "거우딩 민박에는 엘리베이터가 없어 계단으로 이동해야 합니다. 헬로하우스도 계단 건물입니다. 어르신과 함께라면 저층 객실을 추천드립니다.",
    },
    {
        q: "피어-2 예술특구까지 얼마나 걸리나요?",
        a: "헬로하우스와 거우딩 민박에서 도보 약 10분입니다. MRT 옌청푸역까지는 도보 약 5분, 대강교까지는 도보 약 8분입니다.",
    },
    {
        q: "합법 등록 숙소인가요? 보험이 있나요?",
        a: "네. 헬로하우스(가오슝시 민박 등록번호 131)와 거우딩 민박(등록번호 163)은 합법 등록 민박이며, 공공 배상 책임보험에도 가입되어 있습니다.",
    },
    {
        q: "실제 요금은 어디에서 확인하나요?",
        a: "공식 예약 사이트에서 날짜와 인원을 입력하면 선택 가능한 플랜, 빈 방 여부, 견적을 확인할 수 있습니다. 요금은 조회 시점의 표시가 기준입니다.",
    },
];

const homeFaqByLocale: Partial<Record<Locale, HomeFaqItem[]>> = {
    ja: jaHomeFaq,
    ko: koHomeFaq,
};

const homeFaqHeadingByLocale: Partial<Record<Locale, { label: string; title: string }>> = {
    ja: { label: "FAQ", title: "よくあるご質問" },
    ko: { label: "FAQ", title: "자주 묻는 질문" },
};

export function getHomeFaq(locale: Locale): HomeFaqItem[] | undefined {
    return homeFaqByLocale[locale];
}

export function getHomeFaqHeading(locale: Locale): { label: string; title: string } | undefined {
    return homeFaqHeadingByLocale[locale];
}
