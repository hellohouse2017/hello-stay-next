import { NextRequest, NextResponse } from "next/server";

const HTML_LANGS: Record<string, string> = {
  en: "en",
  ja: "ja",
  ko: "ko",
  vi: "vi",
};

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin/social")) {
    const expectedUser = process.env.SOCIAL_ADMIN_USER || "admin";
    const expectedPassword = process.env.SOCIAL_ADMIN_PASSWORD || process.env.META_APP_SECRET || "";
    const authorization = request.headers.get("authorization") || "";
    let credentials = "";
    if (authorization.startsWith("Basic ")) {
      try {
        credentials = atob(authorization.slice(6));
      } catch {
        credentials = "";
      }
    }
    const authorized = !!expectedPassword && credentials === `${expectedUser}:${expectedPassword}`;
    if (!authorized && process.env.NODE_ENV === "production") {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Hello Stay Social Admin", charset="UTF-8"',
          "Cache-Control": "private, no-store, max-age=0",
          "X-Robots-Tag": "noindex, nofollow, noarchive",
        },
      });
    }
  }

  const locale = request.nextUrl.pathname.split("/")[1] || "zh";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-site-html-lang", HTML_LANGS[locale] || "zh-Hant-TW");
  requestHeaders.set("x-site-path", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
