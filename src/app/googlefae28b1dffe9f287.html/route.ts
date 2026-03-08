import { NextResponse } from "next/server";

export async function GET() {
    return new NextResponse("google-site-verification: googlefae28b1dffe9f287.html", {
        headers: { "Content-Type": "text/html" },
    });
}
