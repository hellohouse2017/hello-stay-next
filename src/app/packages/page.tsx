import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PropertyShowcasePage from "@/components/PropertyShowcasePage";

export const metadata: Metadata = {
  title: "高雄包棟方案推薦｜企業、婚禮、家族與朋友聚會",
  description:
    "依活動情境挑高雄包棟：企業團建、婚禮迎娶、家族慢住、朋友聚會與 27–36 人雙館方案。每間客房皆有獨立衛浴・整棟專屬獨享，直接查即時空房與官方報價。",
  alternates: { canonical: "https://www.hello-stay.com/packages" },
  openGraph: {
    title: "高雄包棟方案推薦｜企業、婚禮、家族與朋友聚會 | Hello Stay",
    description: "依活動情境挑高雄包棟：企業團建、婚禮迎娶、家族慢住、朋友聚會與 27–36 人雙館方案。每間客房皆有獨立衛浴・整棟專屬獨享，直接查即時空房。",
    url: "https://www.hello-stay.com/packages",
    images: [
      {
        url: "https://www.hello-stay.com/images/hellohouse/party-cover.webp",
        width: 1200,
        height: 630,
        alt: "Hello Stay 高雄包棟方案",
      },
    ],
  },
};

const scenarios = [
  {
    id: "occasion-company-retreat",
    kicker: "企業團建・移地訓練",
    title: "企業包棟與移地訓練方案",
    summary: ["1F 挑高大客廳", "中島吧台討論", "晚上聚餐續聊"],
    image: {
      src: "/images/hellohouse/business-cover.webp",
      alt: "企業團建使用你好哇寓所公共空間與中島廚房",
    },
    description: [
      "白天需要投影或電視討論、圍著中島吧台腦力激盪；",
      "晚上想叫外送、買鹽埕宵夜或一起煮火鍋交流，",
      "寬敞無隔閡的 1F 公共空間是主要核心。",
    ],
    specs: [
      {
        label: "適合人數",
        value: (
          <span>
            10–26 人（
            <Link href="/hellohouse">你好哇寓所</Link>）／ 27–36 人（
            <Link href="/compare#compare-dual">雙館包棟</Link>）
          </span>
        ),
      },
      {
        label: "推薦館別",
        value: <Link href="/hellohouse">你好哇寓所</Link>,
      },
      {
        label: "核心設備",
        value: (
          <span>
            <Link href="/blog/kaohsiung-kitchen-bnb">中島廚房</Link>・
            <Link href="/blog/kaohsiung-mahjong-stay">手動麻將桌</Link>・43吋電視
          </span>
        ),
      },
      {
        label: "周邊機能",
        value: (
          <span>
            步行 10 分到 <Link href="/blog/pier2-accommodation">駁二</Link>、5 分到{" "}
            <Link href="/traffic#mrt">捷運鹽埕埔站</Link>
          </span>
        ),
      },
    ],
    groups: [
      {
        title: "空間優勢",
        items: [
          "1F 長桌與中島吧台，適合 15–20 人同時用餐或分組討論",
          "客房全套房皆有獨立衛浴，同事分房作息互不干擾",
          "提供電子密碼鎖，外出分批回館自由方便",
        ],
      },
      {
        title: "規劃建議",
        items: [
          "20 人以內優先選你好哇寓所（6 間客房）",
          "超過 26 人可改選雙館方案（10 間客房，兩館就在隔壁步行 5 秒）",
          <span key="retreat-article">
            深入閱讀：
            <Link href="/blog/kaohsiung-offsite-teambuilding">
              高雄企業包棟與移地訓練指南 →
            </Link>
          </span>,
        ],
      },
    ],
    action: { href: "/book?guestCount=20&property=你好哇寓所", label: "查 20 人團建空房", ctaType: "booking", ctaPosition: "scenario_company" },
  },
  {
    id: "occasion-wedding",
    kicker: "婚禮迎娶・親友前夜",
    title: "婚禮迎娶與親友包棟住宿",
    summary: ["落地窗採光佳", "一樓動線順暢", "全獨立衛浴好更衣"],
    image: {
      src: "/images/hellohouse/wedding-cover.webp",
      alt: "你好哇寓所婚禮迎娶與前夜準備空間",
    },
    description: [
      "迎娶當天新秘化妝、伴娘伴郎闖關與拜別父母，",
      "最需要大面自然採光與寬敞的一樓客廳動線。",
      "每間房都有獨立衛浴，親友換裝補妝不用排隊搶廁所。",
    ],
    specs: [
      {
        label: "適合人數",
        value: (
          <span>
            12–24 人（<Link href="/hellohouse">你好哇寓所</Link>）／ 27–36 人（
            <Link href="/compare#compare-dual">雙館包棟</Link>）
          </span>
        ),
      },
      {
        label: "推薦館別",
        value: <Link href="/hellohouse">你好哇寓所</Link>,
      },
      {
        label: "空間亮點",
        value: "挑高客廳・落地大採光・每房獨立衛浴",
      },
      {
        label: "停車資訊",
        value: (
          <span>
            禮車巷口好上下車，周邊有{" "}
            <Link href="/traffic#parking">特約與公有停車場</Link>
          </span>
        ),
      },
    ],
    groups: [
      {
        title: "迎娶細節確認",
        items: [
          "1F 挑高客廳適合擺設闖關關卡、婚攝拍照採光充足",
          "客房皆有獨立衛浴、大面鏡與吹風機，方便分批化妝換裝",
          "前夜親友聚在一起備料、貼喜字與準備流程",
        ],
      },
      {
        title: "長輩與親友安排",
        items: [
          "若雙方親友同時入住，可包雙館分開兩棟休息、互相不尷尬",
          "館內皆為樓梯動線，長輩建議安排在 2 樓房型",
          <span key="wedding-article">
            深入閱讀：
            <Link href="/blog/kaohsiung-wedding-venue">
              高雄婚禮迎娶包棟民宿推薦與動線安排 →
            </Link>
          </span>,
        ],
      },
    ],
    action: { href: "/book?guestCount=24&property=你好哇寓所", label: "查 24 人迎娶空房", ctaType: "booking", ctaPosition: "scenario_wedding" },
  },
  {
    id: "occasion-family",
    kicker: "家族旅遊・三代同堂",
    title: "家族旅遊與長輩親子慢住",
    summary: ["長輩分房好睡", "中島廚房煮火鍋", "全棟安靜不吵雜"],
    image: {
      src: "/images/hellohouse/family-cover.webp",
      alt: "家族旅遊與圍爐聚餐適合的 Hello Stay 包棟空間",
    },
    description: [
      "帶長輩與小孩出門，最怕作息互相干擾或半夜搶衛浴。",
      "小家庭 4–12 人推薦整棟五層的溝頂民宿；",
      "大家族 13–26 人選你好哇寓所，中島廚房能煮粥溫奶、圍爐吃火鍋。",
    ],
    specs: [
      {
        label: "4–12 人推薦",
        value: (
          <span>
            <Link href="/godin">溝頂民宿</Link>（4 間獨立衛浴套房）
          </span>
        ),
      },
      {
        label: "13–26 人推薦",
        value: (
          <span>
            <Link href="/hellohouse">你好哇寓所</Link>（6 間套房＋中島廚房）
          </span>
        ),
      },
      {
        label: "開伙需求",
        value: (
          <span>
            想煮火鍋選 <Link href="/blog/kaohsiung-kitchen-bnb">你好哇中島廚房</Link>
          </span>
        ),
      },
      {
        label: "每房衛浴",
        value: (
          <span>
            兩館所有客房皆為獨立衛浴，
            <Link href="/agreement">整棟專屬獨享</Link>
          </span>
        ),
      },
    ],
    groups: [
      {
        title: "家庭入住重點",
        items: [
          "長輩早睡、年輕人晚上在客廳聊天打牌，分層作息不吵人",
          "你好哇 1F 備有雙口 IH 爐、大冰箱與餐具，買在地食材回館煮火鍋超方便",
          "溝頂 4F 設有手動麻將與交誼沙發，適合小家庭泡茶聚會",
        ],
      },
      {
        title: "貼心提醒",
        items: [
          "兩館皆無電梯，如有行動不便長輩，入住前請先確認 2 樓房型分配",
          "巷弄安靜清幽，23:00 後請降低公共空間音量",
          <span key="family-article">
            深入閱讀：
            <Link href="/blog/kaohsiung-family-reunion">
              高雄家族旅遊包棟推薦：三代同堂選房指南 →
            </Link>
          </span>,
        ],
      },
    ],
    action: { href: "/book?guestCount=12&property=溝頂民宿", label: "查 12 人家族空房", ctaType: "booking", ctaPosition: "scenario_family" },
  },
  {
    id: "occasion-friends",
    kicker: "朋友聚會・麻將慶生",
    title: "好友聚會・慶生派對與麻將宵夜",
    summary: ["手動麻將桌", "Netflix 聯網電視", "鹽埕排隊宵夜圈"],
    image: {
      src: "/images/hellohouse/party-cover.webp",
      alt: "朋友聚會與慶生派對適合的 Hello Stay 公共空間",
    },
    description: [
      "一群朋友出遊，最精華的就是回民宿後的時光。",
      "1F 挑高客廳圍爐吃火鍋、手動麻將桌摸兩圈、大電視看 Netflix，",
      "步行 3 分鐘就能買到鴨肉珍、冬粉王跟鹽埕經典宵夜。",
    ],
    specs: [
      {
        label: "6–12 人推薦",
        value: (
          <span>
            <Link href="/godin">溝頂民宿</Link>（4F 專屬麻將交誼廳）
          </span>
        ),
      },
      {
        label: "14–26 人推薦",
        value: (
          <span>
            <Link href="/hellohouse">你好哇寓所</Link>（1F 挑高大客廳＋廚房）
          </span>
        ),
      },
      {
        label: "娛樂設施",
        value: (
          <span>
            <Link href="/blog/kaohsiung-mahjong-stay">手動麻將桌</Link>・桌遊・聯網電視
          </span>
        ),
      },
      {
        label: "宵夜散步",
        value: (
          <span>
            <Link href="/explore/food">鹽埕在地排隊美食</Link>、超商步行 2 分
          </span>
        ),
      },
    ],
    groups: [
      {
        title: "聚會必備亮點",
        items: [
          "手動麻將桌、撲克牌與桌遊隨時開打，不用自己帶道具",
          "雙門大冰箱隨時冰滿啤酒與手搖飲，煮宵夜熱炒火鍋超方便",
          "每間客房皆有獨立衛浴，玩累了隨時能回房間安靜洗澡睡覺",
        ],
      },
      {
        title: "聚會行程建議",
        items: [
          "下午逛駁二特區與大港橋，傍晚買齊鹽埕小吃回館聚餐",
          "慶生、過年過節聚會熱門檔期建議提早 1–2 個月預約",
          <span key="friends-article">
            深入閱讀：
            <Link href="/blog/kaohsiung-mahjong-stay">
              高雄麻將包棟民宿推薦與聚會攻略 →
            </Link>
          </span>,
        ],
      },
    ],
    action: { href: "/book?guestCount=16&property=你好哇寓所", label: "查 16 人聚會空房", ctaType: "booking", ctaPosition: "scenario_friends" },
  },
  {
    id: "occasion-dual-house",
    kicker: "超大團體・雙館聯訂",
    title: "27–36 人超大型雙館包棟方案",
    summary: ["兩館步行 5 秒", "合計 10 間獨立套房", "聚會集中、分棟休息"],
    image: {
      src: "/images/hellohouse/team-cover.webp",
      alt: "Hello Stay 多人團體使用你好哇寓所與溝頂民宿雙館方案",
    },
    description: [
      "人數超過 26 人時，不用被迫拆去住不同飯店或偏遠民宿。",
      "你好哇寓所（6 房）＋ 溝頂民宿（4 房）合計 10 間獨立套房，",
      "兩棟就在同條巷內步行約 5 秒，白天在你好哇大客廳聚會，晚上分棟安靜休息。",
    ],
    specs: [
      {
        label: "適合人數",
        value: (
          <span>
            標準 27–34 人（35–36 人需加床，詳見{" "}
            <Link href="/compare#compare-dual">雙館方案說明</Link>）
          </span>
        ),
      },
      {
        label: "總房數配置",
        value: "兩館合計 10 間客房（5間雙人房、3間四人房、2間六人房）",
      },
      {
        label: "衛浴配置",
        value: (
          <span>
            10 間客房皆有獨立衛浴，
            <Link href="/agreement">整棟專屬獨享</Link>
          </span>
        ),
      },
      {
        label: "兩館距離",
        value: "同巷相鄰，出門步行約 5 秒即達",
      },
    ],
    groups: [
      {
        title: "雙館動線優勢",
        items: [
          "吃飯、開會、煮火鍋與玩桌遊全部集中在你好哇 1F 挑高大客廳",
          "溝頂民宿作為安靜休息棟，適合長輩、幼童或早睡朋友先回房休息",
          "男女分棟或家庭分棟安排極為彈性，隱私感滿分",
        ],
      },
      {
        title: "預訂需知",
        items: [
          "雙館方案因需同時保留兩棟檔期，建議確認日期後儘早洽詢",
          "兩館皆無電梯，需走樓梯動線",
          <span key="dual-article">
            深入閱讀：
            <Link href="/blog/kaohsiung-30-person-stay">
              高雄 30 人雙館包棟全攻略與分房建議 →
            </Link>
          </span>,
        ],
      },
    ],
    action: { href: "/book?guestCount=30&property=雙館包棟", label: "查 30 人雙館空房", ctaType: "booking", ctaPosition: "scenario_dual_house" },
  },
];

const matrixData = {
  kicker: "方案對照矩陣",
  title: "3 秒決策：包棟方案快速對照表",
  intro: [
    "先依總人數挑選合適館別，再確認廚房與分房需求。",
    "所有方案皆享全棟獨立專屬使用，依預訂方案開放客房，每間開放客房皆有獨立衛浴。",
  ],
  rows: [
    {
      id: "matrix-godin",
      title: "小團體獨棟方案",
      capacity: (
        <span>
          <strong>4–12 人</strong>
          <br />
          <Link href="/blog/kaohsiung-6-person-stay">6人攻略</Link>｜
          <Link href="/blog/kaohsiung-10-person-stay">10人攻略</Link>
        </span>
      ),
      property: (
        <Link href="/godin">
          <strong>溝頂民宿</strong>
        </Link>
      ),
      rooms: (
        <span>
          <strong>4 間客房・4 間獨立衛浴</strong>
          <br />
          2 間雙人房＋2 間四人房
        </span>
      ),
      kitchen: "4F 備餐空間（微波爐/冰箱/流理台，不開火）",
      entertainment: (
        <span>
          4F <Link href="/blog/kaohsiung-mahjong-stay">手動麻將桌</Link>・桌遊・電視
        </span>
      ),
      bestFor: "家庭旅行、小團朋友聚會、注重每間房獨立衛浴",
      action: { href: "/godin", label: "看溝頂房型" },
    },
    {
      id: "matrix-hellohouse",
      title: "中大團體聚會方案",
      capacity: (
        <span>
          <strong>8–26 人</strong>
          <br />
          <Link href="/blog/kaohsiung-20-person-stay">20人攻略</Link>｜
          <Link href="/blog/kaohsiung-group-trip">團體攻略</Link>
        </span>
      ),
      property: (
        <Link href="/hellohouse">
          <strong>你好哇寓所</strong>
        </Link>
      ),
      rooms: (
        <span>
          <strong>6 間客房・6 間獨立衛浴</strong>
          <br />
          3 間雙人房＋1 間四人房＋2 間六人房
        </span>
      ),
      kitchen: (
        <Link href="/blog/kaohsiung-kitchen-bnb">
          1F 中島大廚房（IH爐/烤箱/微波爐/完整鍋具）
        </Link>
      ),
      entertainment: (
        <span>
          1F <Link href="/blog/kaohsiung-mahjong-stay">手動麻將桌</Link>・43吋聯網電視・大吧台
        </span>
      ),
      bestFor: "想開伙煮火鍋、企業移地訓練、婚禮迎娶闖關、朋友聚會",
      action: { href: "/hellohouse", label: "看你好哇房型" },
    },
    {
      id: "matrix-dual",
      title: "超大團體雙館方案",
      capacity: (
        <span>
          <strong>27–36 人</strong>
          <br />
          <Link href="/blog/kaohsiung-30-person-stay">30人雙館攻略</Link>
        </span>
      ),
      property: (
        <Link href="/compare#compare-dual">
          <strong>你好哇＋溝頂雙館</strong>
        </Link>
      ),
      rooms: (
        <span>
          <strong>10 間客房・10 間獨立衛浴</strong>
          <br />
          5 間雙人房＋3 間四人房＋2 間六人房
        </span>
      ),
      kitchen: "你好哇 1F 中島廚房 ＋ 溝頂 4F 備餐區",
      entertainment: "雙館皆備有手動麻將桌、桌遊、電視沙發",
      bestFor: "大家族親友圍爐、大型公司團建、迎娶雙方親友分棟入住",
      action: { href: "/book?guestCount=30", label: "查雙館空房" },
    },
  ],
};

const packageFacts = [
  {
    label: "4–12 人包棟",
    value: (
      <span>
        首選 <Link href="/godin">溝頂民宿</Link>（4 間獨立套房衛浴）
      </span>
    ),
  },
  {
    label: "8–26 人包棟",
    value: (
      <span>
        首選 <Link href="/hellohouse">你好哇寓所</Link>（6 間獨立套房＋中島廚房）
      </span>
    ),
  },
  {
    label: "27–36 人包棟",
    value: (
      <span>
        首選 <Link href="/compare#compare-dual">雙館包棟方案</Link>（10 間獨立套房）
      </span>
    ),
  },
  {
    label: "透明承諾",
    value: (
      <span>
        <Link href="/agreement">每間客房皆有獨立衛浴・整棟專屬獨享</Link>
      </span>
    ),
  },
];

const packageGuides = [
  <span key="guide-capacity">
    先確認總人數：4–12 人看 <Link href="/godin">溝頂</Link>、13–26 人看{" "}
    <Link href="/hellohouse">你好哇</Link>、27 人以上看{" "}
    <Link href="/compare#compare-dual">雙館</Link>。
  </span>,
  <span key="guide-kitchen">
    廚房開伙需求：想煮火鍋、聚餐備餐請選有{" "}
    <Link href="/blog/kaohsiung-kitchen-bnb">1F 中島廚房的你好哇寓所</Link>。
  </span>,
  <span key="guide-mahjong">
    休閒娛樂設備：兩館皆備有{" "}
    <Link href="/blog/kaohsiung-mahjong-stay">手動麻將桌、桌遊與聯網電視</Link>。
  </span>,
  <span key="guide-elevator">
    動線與樓梯：目前可訂館別皆為樓梯動線、無電梯，長輩同行可優先安排低樓層。
  </span>,
  <span key="guide-booking">
    即時房況與價格：平假日與活動檔期不同，請直接至{" "}
    <Link href="/book">官方訂房系統</Link> 查詢最準確。
  </span>,
];

const packageFit = [
  {
    label: "還在挑選館別",
    value: (
      <span>
        參考 <Link href="/compare">三館方案詳細比較</Link> 或{" "}
        <Link href="/kaohsiung-whole-house">高雄包棟主頁</Link>
      </span>
    ),
  },
  {
    label: "想了解周邊交通",
    value: (
      <span>
        查看 <Link href="/traffic">交通與停車指引</Link>（步行 5 分到捷運）
      </span>
    ),
  },
  {
    label: "想探索在地美食",
    value: (
      <span>
        參考 <Link href="/explore/food">鹽埕美食指南與散步地圖</Link>
      </span>
    ),
  },
  {
    label: "了解住宿規範",
    value: (
      <span>
        查看 <Link href="/agreement">住宿須知與退訂條款</Link>
      </span>
    ),
  },
];

const thematicLinksHub = {
  kicker: "主題攻略與關鍵字中樞",
  title: "依需求探索完整包棟攻略與在地指南",
  intro: [
    "整理造訪客人最常搜尋的主題入口，包含人數分房、設備特色、活動情境、周邊交通與訂房須知。",
  ],
  categories: [
    {
      title: "依入住人數挑選",
      icon: "👥",
      items: [
        { label: "6 人小團體包棟攻略", href: "/blog/kaohsiung-6-person-stay", badge: "溝頂" },
        { label: "10 人包棟民宿推薦", href: "/blog/kaohsiung-10-person-stay", badge: "溝頂" },
        { label: "20 人中大型包棟攻略", href: "/blog/kaohsiung-20-person-stay", badge: "你好哇" },
        { label: "30 人雙館包棟攻略", href: "/blog/kaohsiung-30-person-stay", badge: "雙館" },
        { label: "高雄包棟民宿總覽推薦", href: "/kaohsiung-whole-house", badge: "總覽" },
      ],
    },
    {
      title: "館別與房型介紹",
      icon: "🏠",
      items: [
        { label: "你好哇寓所（6房中島廚房）", href: "/hellohouse", badge: "8-26人" },
        { label: "溝頂民宿（4房獨立衛浴）", href: "/godin", badge: "4-12人" },
        { label: "三館方案詳細比較表", href: "/compare", badge: "比較" },
        { label: "大智老屋（規劃中館別）", href: "/dazhi", badge: "籌備中" },
      ],
    },
    {
      title: "核心設備與特色",
      icon: "🍳",
      items: [
        { label: "附中島廚房可開伙民宿", href: "/blog/kaohsiung-kitchen-bnb", badge: "可開伙" },
        { label: "手動麻將桌與桌遊娛樂", href: "/blog/kaohsiung-mahjong-stay", badge: "娛樂" },
        { label: "每房獨立衛浴・整棟專屬獨享", href: "/compare", badge: "隱私" },
        { label: "電子密碼鎖自助入住流程", href: "/guide", badge: "便利" },
      ],
    },
    {
      title: "活動情境專題",
      icon: "🎯",
      items: [
        { label: "企業包棟與移地訓練指南", href: "/blog/kaohsiung-offsite-teambuilding", badge: "團建" },
        { label: "婚禮迎娶與親友包棟推薦", href: "/blog/kaohsiung-wedding-venue", badge: "迎娶" },
        { label: "家族旅遊三代同堂慢住推薦", href: "/blog/kaohsiung-family-reunion", badge: "家族" },
        { label: "朋友聚會與團體出遊全攻略", href: "/blog/kaohsiung-group-trip", badge: "朋友" },
        { label: "跨年過年節慶包棟住宿推薦", href: "/blog/kaohsiung-nye-stay", badge: "節慶" },
        { label: "2027 新樂街過年市集攻略", href: "/blog/kaohsiung-cny-xinle-street-market", badge: "春節" },
        { label: "2026 大港開唱全攻略推薦", href: "/blog/megaport-festival-guide", badge: "音樂祭" },
        { label: "Taiwan PASS 交通省錢攻略", href: "/blog/taiwan-pass-kaohsiung-travel", badge: "交通" },
      ],
    },
    {
      title: "周邊景點與交通美食",
      icon: "🚶",
      items: [
        { label: "駁二藝術特區住宿推薦（步行10分）", href: "/blog/pier2-accommodation", badge: "景點" },
        { label: "交通位置與捷運鹽埕埔站指引", href: "/traffic#mrt", badge: "捷運" },
        { label: "周邊特約停車場與收費說明", href: "/traffic#parking", badge: "停車" },
        { label: "鹽埕在地排隊美食地圖", href: "/explore/food", badge: "美食" },
        { label: "大港橋與鹽埕景點散步指南", href: "/explore", badge: "散步" },
      ],
    },
    {
      title: "訂房保障與住客須知",
      icon: "📋",
      items: [
        { label: "官方線上即時查空房與報價", href: "/book", badge: "即時" },
        { label: "住客真實五星評價回饋", href: "/reviews", badge: "好評" },
        { label: "住宿規範與取消退訂政策", href: "/agreement", badge: "須知" },
        { label: "入住常見問題與行前須知", href: "/guide", badge: "FAQ" },
      ],
    },
  ],
};

const galleryImages = [
  {
    src: "/images/hellohouse/business-cover.webp",
    alt: "企業團建使用你好哇寓所中島廚房與挑高客廳",
    caption: "企業團建：長桌討論與中島吧台聚餐",
  },
  {
    src: "/images/hellohouse/wedding-cover.webp",
    alt: "婚禮迎娶與伴娘親友住宿空間",
    caption: "婚禮迎娶：落地大採光窗與寬敞闖關動線",
  },
  {
    src: "/images/hellohouse/family-cover.webp",
    alt: "家族旅遊三代同堂包棟住宿",
    caption: "家族慢住：長輩小孩分層好睡、中島圍爐吃火鍋",
  },
  {
    src: "/images/hellohouse/party-cover.webp",
    alt: "朋友聚會與麻將宵夜派對",
    caption: "朋友聚會：手動麻將、桌遊、Netflix 與鹽埕宵夜",
  },
];

const faqs = [
  {
    question: "還沒決定館別，該怎麼快速挑選？",
    answer: (
      <span>
        建議先看<strong>總人數</strong>：4–12 人先看{" "}
        <Link href="/godin">溝頂民宿（4房4衛）</Link>；13–26 人看{" "}
        <Link href="/hellohouse">你好哇寓所（6房6衛+中島廚房）</Link>；超過 27 人看{" "}
        <Link href="/compare#compare-dual">雙館包棟（10房10衛）</Link>。若想進一步對比各館房型細節，可參考{" "}
        <Link href="/compare">三館方案詳細比較表</Link>。
      </span>
    ),
    links: [
      { href: "/compare", label: "看三館比較" },
      { href: "/kaohsiung-whole-house", label: "看高雄包棟主頁" },
    ],
  },
  {
    question: "這裡可以直接查詢即時空房與房價嗎？",
    answer: (
      <span>
        可以。房價會依平假日、連假檔期與入住人數有所不同，請直接前往{" "}
        <Link href="/book">官方線上訂房系統</Link> 輸入日期查詢；如需特殊包棟需求或客製安排，也可直接透過{" "}
        <a href="https://lin.ee/atCiMQw" target="_blank" rel="noreferrer">
          官方 LINE 客服
        </a>{" "}
        專人詢價。
      </span>
    ),
    links: [
      { href: "/book", label: "查即時空房與報價" },
      { href: "https://lin.ee/atCiMQw", label: "加 LINE 專人諮詢", external: true },
    ],
  },
  {
    question: "想自己煮火鍋或開伙，哪一館有廚房？",
    answer: (
      <span>
        <Link href="/hellohouse">你好哇寓所</Link> 1F 設有{" "}
        <Link href="/blog/kaohsiung-kitchen-bnb">完整中島廚房</Link>
        ，配備雙口 IH 爐、雙門大冰箱、烤箱、微波爐、RO 逆滲透飲水機與完整鍋碗餐具，非常適合煮火鍋、熱炒或聚餐備料；
        <Link href="/godin">溝頂民宿</Link> 4F 則為簡易備餐區（微波爐、冰箱、流理台），不開放明火開伙。
      </span>
    ),
    links: [
      { href: "/blog/kaohsiung-kitchen-bnb", label: "看廚房設備詳情" },
      { href: "/hellohouse", label: "看你好哇寓所" },
    ],
  },
  {
    question: "包棟有麻將桌和娛樂設施嗎？",
    answer: (
      <span>
        有的！<Link href="/hellohouse">你好哇寓所</Link> 1F 客廳與{" "}
        <Link href="/godin">溝頂民宿</Link> 4F 交誼廳皆備有{" "}
        <Link href="/blog/kaohsiung-mahjong-stay">手動麻將桌、桌遊、撲克牌與聯網電視</Link>
        。為維護社區安寧，23:00 後請將音量轉小，並遵守館內住宿規範。
      </span>
    ),
    links: [
      { href: "/blog/kaohsiung-mahjong-stay", label: "看麻將包棟攻略" },
      { href: "/agreement", label: "查看住宿規範" },
    ],
  },
  {
    question: "27–36 人雙館包棟兩館距離多遠？動線如何安排？",
    answer: (
      <span>
        你好哇寓所與溝頂民宿位於同一條靜巷內，兩館出門<strong>步行僅約 5 秒</strong>！活動時可把討論、備餐與聚會全部集中在你好哇 1F 挑高大客廳，晚上再依家庭、男女或作息分棟回房休息，享受 10 間獨立套房的舒適與隱私。
      </span>
    ),
    links: [
      { href: "/compare#compare-dual", label: "看雙館方案說明" },
      { href: "/blog/kaohsiung-30-person-stay", label: "看 30 人雙館攻略" },
    ],
  },
];

export default function PackagesPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.hello-stay.com" },
              { "@type": "ListItem", position: 2, name: "團體住宿與包棟方案", item: "https://www.hello-stay.com/packages" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            provider: { "@type": "LodgingBusiness", name: "Hello Stay" },
            name: "高雄包棟民宿方案推薦",
            description: "依企業團建、婚禮迎娶、家族旅遊、朋友聚會與雙館大團體需求，提供高雄鹽埕區全套房獨立包棟住宿方案。",
            areaServed: { "@type": "Place", name: "高雄市鹽埕區" },
            serviceType: "包棟住宿",
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Hello Stay 官方包棟住宿方案",
            description: "依人數與活動情境挑選的高雄包棟方案清單",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "LodgingBusiness",
                  name: "溝頂民宿（4-12人包棟）",
                  url: "https://www.hello-stay.com/godin",
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "LodgingBusiness",
                  name: "你好哇寓所（8-26人包棟）",
                  url: "https://www.hello-stay.com/hellohouse",
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@type": "Service",
                  name: "你好哇＋溝頂雙館包棟（27-36人）",
                  url: "https://www.hello-stay.com/compare#compare-dual",
                },
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: typeof faq.answer === "string" ? faq.answer : faq.question,
              },
            })),
          },
        ]}
      />

      <PropertyShowcasePage
        hero={{
          status: "官方包棟方案・每房獨立衛浴・整棟專屬獨享",
          kicker: "團體住宿方案",
          title: "高雄包棟怎麼選？先看活動情境，再對人數與設備",
          lead: [
            "辦公室團建、婚禮迎娶、家族三代出遊或好友打麻將聚餐，適合的空間完全不同。",
            "溝頂民宿適合 4–12 人分層慢住；你好哇寓所適合 8–26 人開伙聚會；超過 27 人直接看步行 5 秒的雙館組合。",
            "所有包棟方案皆為整棟獨立專屬使用，依預訂方案開放客房，每間開放客房皆有獨立衛浴。",
          ],
          image: {
            src: "/images/hellohouse/party-cover.webp",
            alt: "Hello Stay 包棟方案與多人聚會主視覺",
          },
          navPills: [
            { label: "🏢 企業團建", href: "#occasion-company-retreat" },
            { label: "👰 婚禮迎娶", href: "#occasion-wedding" },
            { label: "👨‍👩‍👧‍👦 家族慢住", href: "#occasion-family" },
            { label: "🀄 好友聚會", href: "#occasion-friends" },
            { label: "🏘️ 27-36人雙館", href: "#occasion-dual-house" },
            { label: "📊 方案對照表", href: "#showcase-matrix" },
            { label: "📖 主題攻略庫", href: "#showcase-links-hub" },
            { label: "❓ 常見問題", href: "#showcase-faq" },
          ],
          stats: [
            {
              label: "4–12 人（小團體）",
              value: (
                <Link href="/godin" className="showcase-inline-link">
                  溝頂民宿（4房4衛）
                </Link>
              ),
            },
            {
              label: "8–26 人（中大團）",
              value: (
                <Link href="/hellohouse" className="showcase-inline-link">
                  你好哇寓所（6房6衛+廚房）
                </Link>
              ),
            },
            {
              label: "27–36 人（大型團）",
              value: (
                <Link href="/compare#compare-dual" className="showcase-inline-link">
                  雙館包棟（10房10衛）
                </Link>
              ),
            },
            {
              label: "官方透明承諾",
              value: (
                <Link href="/agreement" className="showcase-inline-link">
                  每房獨立衛浴・整棟專屬獨享
                </Link>
              ),
            },
          ],
          primaryAction: { href: "/book", label: "線上查即時空房" },
          secondaryAction: { href: "/compare", label: "看三館詳細比較" },
        }}
        overview={{
          kicker: "情境速覽",
          title: "依旅遊目的快速找到適合的包棟空間",
          intro: [
            "從公司移地訓練、婚禮迎娶闖關、三代同堂家庭慢住，到好友打麻將吃宵夜，",
            "點擊下方情境即可快速瀏覽專屬配置與房型建議。",
          ],
          columns: 5,
          cards: scenarios.map((scenario) => ({
            id: scenario.id,
            kicker: scenario.kicker,
            title: scenario.title,
            summary: scenario.summary,
            image: scenario.image,
            linkLabel: "查看方案細節",
          })),
        }}
        matrix={matrixData}
        details={{
          kicker: "方案細節",
          title: "5 大熱門情境方案深度介紹",
          intro: [
            "每一種出遊型態對公共空間、廚房、衛浴數量與分房隱私的要求都不同。",
            "下方為您整理各情境的真實入住配置與實用規劃重點。",
          ],
          cards: scenarios.map((scenario) => ({
            id: scenario.id,
            kicker: scenario.kicker,
            title: scenario.title,
            description: scenario.description,
            image: scenario.image,
            specs: scenario.specs,
            groups: scenario.groups,
            action: scenario.action,
          })),
          factsTitle: "快速對照基準",
          facts: packageFacts,
          guidesTitle: "挑選與入住叮嚀",
          guides: packageGuides,
          fitTitle: "下一步推薦",
          fit: packageFit,
        }}
        gallery={{
          kicker: "實景照片",
          title: "真實入住場景與聚會氛圍",
          columns: 4,
          images: galleryImages,
        }}
        linksHub={thematicLinksHub}
        faq={{
          kicker: "常見問題",
          title: "挑選包棟方案常見問題",
          items: faqs,
        }}
        final={{
          kicker: "開始安排您的旅程",
          title: "找到適合的包棟方案了嗎？直接查詢即時空房",
          body: [
            "Hello Stay 官方訂房免收平台抽成手續費，享有最即時的房況與透明價格。",
            "如有特殊需求或超大人數，也歡迎隨時加入官方 LINE 與管家聯繫。",
          ],
          navLabel: "查空房",
          primaryAction: { href: "/book", label: "線上查即時空房" },
          secondaryAction: {
            href: "https://lin.ee/atCiMQw",
            label: "LINE 專人詢價",
            external: true,
          },
        }}
      />
    </>
  );
}
