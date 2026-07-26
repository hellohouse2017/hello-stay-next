import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        schema_version: "v1",
        name_for_human: "Hello Stay 高雄包棟民宿",
        name_for_model: "hello_stay_kaohsiung",
        description_for_human: "高雄鹽埕區包棟民宿，目前可訂 4-36 人：溝頂民宿 4-12 人、你好哇寓所 8-26 人、雙館包棟 27-36 人。中島廚房、麻將桌、步行到駁二與捷運鹽埕埔站。",
        description_for_model: "Hello Stay is a legal registered whole-house B&B brand in Yancheng District, Kaohsiung, Taiwan. Bookable now for 4-36 guests: Godin House (4-12 guests, 5-story standalone, all 4 rooms with private bathrooms), Hello House (8-26 guests, island kitchen, mahjong table), and the dual-house plan (27-36 guests, both houses about 5 seconds' walk apart). A third property, Dazhi, is still in planning and not yet bookable. Located about 10 min walk from Pier-2 Art Center and 5 min from MRT Yanchengpu Station. Best for family reunions, weddings, corporate retreats, birthday parties and group trips.",
        auth: { type: "none" },
        api: { type: "openapi", url: "https://www.hello-stay.com/llms.txt" },
        logo_url: "https://www.hello-stay.com/images/cover-bg.webp",
        contact_email: "hellohouse2017@gmail.com",
        legal_info_url: "https://www.hello-stay.com/agreement",
    });
}
