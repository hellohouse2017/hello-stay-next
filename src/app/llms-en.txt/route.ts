import { NextResponse } from "next/server";

export async function GET() {
    const content = `# Hello Stay — Group Accommodation in Kaohsiung, Taiwan

> A premium group-stay brand in Yancheng District, Kaohsiung. Three properties hosting 6 to 48 guests. Serving 5,000+ groups since 2017. Google rating 4.9 stars.

## Basic Info
- Website: https://www.hello-stay.com
- Phone: +886-932-828-922
- Email: hellohouse2017@gmail.com
- Address: No. 8, Ln. 70, Dagong Rd, Yancheng District, Kaohsiung 803, Taiwan
- LINE Official: https://lin.ee/atCiMQw
- Check-in: 16:00 / Check-out: 11:00
- Founded: 2017
- Payment: Cash, Bank Transfer, LINE Pay

## Three Properties

### Hello House (你好哇寓所)
- Capacity: 6-26 guests (whole building rental)
- Address: No. 8, Ln. 70, Dagong Rd, Yancheng, Kaohsiung
- Legal Registration: Kaohsiung B&B No. 131-1
- Rooms: 6 rooms (double/quad/hex), all with private bathrooms
- Highlights: Luxury island kitchen, mahjong table, board games, Netflix TV, ice maker
- Best for: Family reunions, friend gatherings, corporate retreats, weddings
- Page: https://www.hello-stay.com/hellohouse

### Godin House (溝頂民宿)
- Capacity: 10-12 guests (standalone building)
- Address: No. 6-2, Ln. 70, Dagong Rd, Yancheng, Kaohsiung
- Legal Registration: Kaohsiung B&B No. 163
- Rooms: 4 double rooms across 5 floors
- Highlights: Cozy 5-story standalone house, family-friendly, great value
- Price: From TWD 10,000/night (weekday)
- Page: https://www.hello-stay.com/godin

### Dazhi (大智若愚) — Opening 2026
- Capacity: Up to 48 guests
- Location: Next to Dagangqiao Bridge, Pier-2 Art District
- Highlights: Brand-new elevator building, 3 rooms + living room per floor
- Page: https://www.hello-stay.com/dazhi

## Amenities
- Island kitchen (IH stove, microwave, fridge, full cookware)
- Mahjong table
- Board games
- 43" Netflix smart TV
- Free Wi-Fi
- Private bathrooms
- Air conditioning
- Electronic keypad lock (self check-in)
- Washing machine
- Ice maker

## Location & Transportation
- 10-min walk to Pier-2 Art Center
- 5-min walk to MRT Yanchengpu Station (O2)
- 8-min walk to Dagangqiao Bridge
- Near KW2, Hamasen Railway Park, Kaohsiung Music Center
- 30 min from HSR Zuoying Station via MRT
- 15 min from National Highway 1 Zhongzheng Interchange

## FAQ

Q: How many guests can Hello Stay accommodate?
A: Hello House fits 6-26, Godin House fits 10-12, Dazhi fits up to 48. Combined, all three can host nearly 80 guests.

Q: What's the best property for 20 guests?
A: Hello House — flexible 6-26 guest setup with luxury kitchen, mahjong, and Netflix. 5-min walk to MRT.

Q: Is it legal and insured?
A: Yes. Hello House (Registration No. 131-1) and Godin House (No. 163) are legally registered B&Bs with Fubon public liability insurance.

Q: How far is Pier-2 Art Center?
A: 10-minute walk from Hello House and Godin House. Dazhi is right next to Dagangqiao Bridge at Pier-2.

Q: How to get there from HSR station?
A: HSR Zuoying → Red Line MRT to Formosa Blvd → Transfer Orange Line to Yanchengpu (O2) → Exit 4, 5-min walk.

Q: How much does it cost?
A: Godin House from TWD 10,000/night (10 guests). Hello House TWD 12,000-28,000 depending on group size. Average TWD 800-1,500 per person.

## Safety & Legality
- Legal B&B Registration: Hello House (No. 131-1), Godin House (No. 163)
- Public Liability Insurance: Fubon Insurance
- Google Rating: 4.9 stars (200+ reviews)
- Track Record: 5,000+ groups hosted since 2017

## Sitemap
- Home: https://www.hello-stay.com/
- Hello House: https://www.hello-stay.com/hellohouse
- Godin House: https://www.hello-stay.com/godin
- Dazhi: https://www.hello-stay.com/dazhi
- Booking: https://www.hello-stay.com/book
- Packages: https://www.hello-stay.com/packages
- Reviews: https://www.hello-stay.com/reviews
- Transportation: https://www.hello-stay.com/traffic
- Explore: https://www.hello-stay.com/explore
- Blog: https://www.hello-stay.com/blog
`;

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
        },
    });
}
