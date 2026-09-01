export const HELLO_STAY_TIME_ZONE = "Asia/Taipei";

const taipeiDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: HELLO_STAY_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const taipeiYearFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: HELLO_STAY_TIME_ZONE,
  year: "numeric",
});

const taipeiDateTimeFormatter = new Intl.DateTimeFormat("zh-TW", {
  timeZone: HELLO_STAY_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function datePart(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) {
  return parts.find((part) => part.type === type)?.value || "";
}

export function formatTaipeiYmd(value: Date | string | number = new Date()): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const parts = taipeiDateFormatter.formatToParts(date);
  return `${datePart(parts, "year")}-${datePart(parts, "month")}-${datePart(parts, "day")}`;
}

export function addTaipeiDaysToYmd(value: string, days: number): string {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function getTaipeiYear(value: Date | string | number = new Date()): number {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return NaN;
  return Number(taipeiYearFormatter.format(date));
}

export function formatTaipeiDateTime(value: Date | string | number): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return taipeiDateTimeFormatter.format(date);
}

export function formatTaipeiMonthLabel(value: Date | string | number = new Date()): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("zh-TW", {
    timeZone: HELLO_STAY_TIME_ZONE,
    year: "numeric",
    month: "long",
  }).format(date);
}
