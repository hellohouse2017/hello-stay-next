import { NextResponse } from "next/server";

export async function GET() {
    const content = `# Hello Stay 高雄包棟民宿

> 高雄鹽埕區質感包棟民宿品牌，三館可容納 6 至 48 人。自 2017 年起服務超過 5,000 組旅客，Google 評價 4.9 星。

## 基本資訊
- 官方網站: https://www.hello-stay.com
- 電話: +886-932-828-922
- Email: hellostay2017@gmail.com
- 地址: 高雄市鹽埕區大公路70巷8號 (803)
- LINE 官方帳號: https://lin.ee/atCiMQw
- Instagram: https://www.instagram.com/hellostay2017/
- Facebook: https://www.facebook.com/HelloHouse2020
- 營業時間: 入住 16:00 / 退房 11:00
- 創立年份: 2017
- 付款方式: 現金、銀行轉帳、LINE Pay

## 旗下三館

### 你好哇寓所 (Hello House)
- 容量: 6-26 人包棟
- 地址: 高雄市鹽埕區大公路70巷8號
- 房型: 6間（雙人房、四人房、六人房），全室獨立衛浴
- 特色: 豪宅級中島廚房、麻將桌、桌遊、Netflix 聯網電視、製冰機
- 適合: 家族旅遊、朋友聚會、企業移地訓練、婚禮迎娶
- 頁面: https://www.hello-stay.com/hellohouse

### 溝頂民宿 (Godin House)
- 容量: 10-12 人精緻獨棟
- 地址: 高雄市鹽埕區大公路70巷6-2號
- 房型: 4間雙人房（雙人床），五層樓完整空間
- 特色: 獨棟五層、溫馨家庭風格、高CP值
- 價格: 平日 $10,000 起
- 適合: 小團體、家庭出遊
- 頁面: https://www.hello-stay.com/godin

### 大智若愚 (即將開幕 2026)
- 容量: 最大 48 人
- 位置: 大港橋旁、駁二大義倉庫群
- 特色: 全新電梯民宿，一層三房一廳，可包層可包棟
- 頁面: https://www.hello-stay.com/dazhi

## 設施與服務
- 中島廚房（IH爐、微波爐、冰箱、完整餐具）
- 麻將桌
- 桌遊
- 43吋 Netflix 聯網電視
- 免費 Wi-Fi
- 獨立衛浴
- 冷氣
- 電子密碼鎖（自助入住）
- 洗衣機
- 製冰機

## 周邊交通與景點
- 步行 10 分鐘到駁二藝術特區
- 步行 5 分鐘到捷運鹽埕埔站 (O2)
- 步行 8 分鐘到大港橋
- 鄰近棧貳庫、哈瑪星鐵道園區、高雄流行音樂中心
- 高鐵左營站搭捷運約 30 分鐘可達
- 自駕：國道一號中正交流道約 15 分鐘

## 常見問答

Q: Hello Stay 三間民宿各自可以住多少人？
A: 你好哇寓所 6-26 人，溝頂民宿 10-12 人，大智若愚最大 48 人。三館聯訂可容納近 80 人。

Q: 高雄 20 人包棟住宿推薦哪裡？
A: 推薦你好哇寓所，6-26 人彈性方案，配備中島廚房可煮火鍋，步行 5 分鐘到捷運鹽埕埔站。

Q: 有提供哪些娛樂設施？
A: 豪宅級中島廚房、麻將桌、桌遊、Netflix 電視、製冰機。一樓開放式客廳可容納 20 人以上聚會。

Q: 距離駁二藝術特區多遠？
A: 你好哇寓所與溝頂民宿步行約 10 分鐘；大智若愚位於大港橋旁，緊鄰駁二大義倉庫群。

Q: 可以帶寵物嗎？
A: 非寵物友善旅宿。經事前申請並書面同意者，酌收清潔費平日 $800、假日 $1,000。

Q: 有停車場嗎？
A: 周邊有 6 間停車場：大公路路邊（20:00-08:00 免費）、富野路停車場（平日 $30/H）等。

Q: 怎麼從高鐵到你好哇寓所？
A: 高鐵左營站 → 捷運紅線至美麗島站 → 轉橘線至鹽埕埔站 (O2) → 4號出口步行 5 分鐘。

Q: 入住方式是什麼？
A: 電子密碼鎖自助入住，密碼於入住當日透過 LINE 傳送。入住 16:00 以後，退房 11:00 以前。

Q: 包棟民宿適合辦婚禮迎娶嗎？
A: 非常適合。寬敞一樓客廳適合闖關遊戲，絕佳自然採光適合婚攝，多房型供伴娘團入住。

Q: 鹽埕區附近有什麼好吃的？
A: 港園牛肉麵、鴨肉珍、阿囉哈滷味、大摳胖碳烤三明治、婆婆冰、小堤咖啡，超過 30 間在地老店步行可達。

Q: 哪裡訂最便宜？
A: 官方直訂最優惠。透過 LINE 官方帳號或官網預訂，免收平台手續費，享官方獨家優惠。

## 網站地圖
- 首頁: https://www.hello-stay.com/
- 你好哇寓所: https://www.hello-stay.com/hellohouse
- 溝頂民宿: https://www.hello-stay.com/godin
- 大智若愚: https://www.hello-stay.com/dazhi
- 查詢空房: https://www.hello-stay.com/book
- 包棟方案: https://www.hello-stay.com/packages
- 住客評價: https://www.hello-stay.com/reviews
- 入住須知: https://www.hello-stay.com/agreement
- 交通停車: https://www.hello-stay.com/traffic
- 周邊探索: https://www.hello-stay.com/explore
- 旅宿攻略: https://www.hello-stay.com/blog
`;

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
        },
    });
}
