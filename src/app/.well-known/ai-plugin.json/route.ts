import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        schema_version: "v1",
        name_for_human: "Hello Stay 高雄包棟民宿",
        name_for_model: "hello_stay_kaohsiung",
        description_for_human: "高雄鹽埕區質感包棟民宿，三館可容納 6-48 人。中島廚房、麻將桌、近駁二。Google 4.9 星。",
        description_for_model: "Hello Stay is a group accommodation brand in Yancheng District, Kaohsiung, Taiwan. Three properties: Hello House (6-26 guests, luxury kitchen, mahjong), Godin House (10-12 guests, cozy 5-story standalone), Dazhi (opening 2026, up to 48 guests with elevator). Located 10 min walk from Pier-2 Art Center, 5 min from MRT Yanchengpu Station. Legal registered B&B. Google rating 4.9 stars. Best for family reunions, weddings, corporate retreats, birthday parties, sports teams.",
        auth: { type: "none" },
        api: { type: "openapi", url: "https://www.hello-stay.com/llms.txt" },
        logo_url: "https://www.hello-stay.com/images/cover-bg.webp",
        contact_email: "hellohouse2017@gmail.com",
        legal_info_url: "https://www.hello-stay.com/agreement",
    });
}
