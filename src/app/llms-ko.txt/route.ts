import { NextResponse } from "next/server";
import { buildKoLlmsText } from "@/lib/llms";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET() {
    const content = await buildKoLlmsText({ articleLimit: 10 });

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
        },
    });
}
