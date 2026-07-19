import { BOOKING_ORIGIN, BOOKING_PATH } from "@/lib/analytics-config";

export type BookingAttributionContext = {
  siteSessionId: string;
  landingPath: string;
  originPath: string;
  acquisitionSource: string;
  acquisitionMedium: string;
};

const STORAGE_KEY = "hello-stay-site-attribution-v1";
const AI_HOSTS = new Set([
  "chatgpt.com",
  "chat.openai.com",
  "perplexity.ai",
  "gemini.google.com",
  "bard.google.com",
  "claude.ai",
  "copilot.microsoft.com",
]);

const ORGANIC_HOSTS = new Map([
  ["google.com", "google"],
  ["google.com.tw", "google"],
  ["bing.com", "bing"],
  ["search.yahoo.com", "yahoo"],
  ["tw.search.yahoo.com", "yahoo"],
  ["duckduckgo.com", "duckduckgo"],
]);

function createSessionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `site-${crypto.randomUUID()}`;
  }
  return `site-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizedHostname(value: string) {
  return value.toLowerCase().replace(/^www\./, "");
}

function matchesHost(hostname: string, expected: string) {
  return hostname === expected || hostname.endsWith(`.${expected}`);
}

function classifyAcquisition(url: URL) {
  const utmSource = url.searchParams.get("utm_source")?.trim();
  const utmMedium = url.searchParams.get("utm_medium")?.trim();
  if (utmSource || utmMedium) {
    return {
      acquisitionSource: utmSource || "campaign",
      acquisitionMedium: utmMedium || "campaign",
    };
  }

  const referrer = document.referrer;
  if (!referrer) return { acquisitionSource: "direct", acquisitionMedium: "none" };

  try {
    const hostname = normalizedHostname(new URL(referrer).hostname);
    const aiHost = Array.from(AI_HOSTS).find((host) => matchesHost(hostname, host));
    if (aiHost) return { acquisitionSource: hostname, acquisitionMedium: "ai-assistant" };

    for (const [host, source] of ORGANIC_HOSTS) {
      if (matchesHost(hostname, host)) return { acquisitionSource: source, acquisitionMedium: "organic" };
    }

    if (matchesHost(hostname, "hello-stay.com")) {
      return { acquisitionSource: "hello-stay.com", acquisitionMedium: "internal" };
    }
    return { acquisitionSource: hostname, acquisitionMedium: "referral" };
  } catch {
    return { acquisitionSource: "unknown", acquisitionMedium: "referral" };
  }
}

export function getBookingAttributionContext(): BookingAttributionContext {
  const originPath = `${window.location.pathname}${window.location.search}`;
  const existing = window.sessionStorage.getItem(STORAGE_KEY);
  if (existing) {
    try {
      const parsed = JSON.parse(existing) as Omit<BookingAttributionContext, "originPath">;
      if (parsed.siteSessionId && parsed.landingPath) return { ...parsed, originPath };
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }

  const acquisition = classifyAcquisition(new URL(window.location.href));
  const context: BookingAttributionContext = {
    siteSessionId: createSessionId(),
    landingPath: originPath,
    originPath,
    ...acquisition,
  };
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(context));
  return context;
}

export function isBookingHref(href: string) {
  try {
    const url = new URL(href, window.location.origin);
    return url.origin === BOOKING_ORIGIN && url.pathname === BOOKING_PATH;
  } catch {
    return false;
  }
}

export function decorateBookingHref(href: string, context: BookingAttributionContext) {
  const url = new URL(href, window.location.origin);
  if (url.origin !== BOOKING_ORIGIN || url.pathname !== BOOKING_PATH) return href;

  url.searchParams.set("source", "official_website");
  url.searchParams.set("siteSessionId", context.siteSessionId);
  url.searchParams.set("landingPath", context.landingPath);
  url.searchParams.set("originPath", context.originPath);
  url.searchParams.set("acquisitionSource", context.acquisitionSource);
  url.searchParams.set("acquisitionMedium", context.acquisitionMedium);
  return url.toString();
}
