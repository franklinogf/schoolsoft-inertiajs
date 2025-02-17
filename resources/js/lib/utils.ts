import i18n from "@/lib/i18n";
import { clsx, type ClassValue } from "clsx";
import { format, intlFormat, parse } from "date-fns";
import { twMerge } from "tailwind-merge";
const locale = i18n.language;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/* ---------------------------- Dates formattters --------------------------- */
export function formatDate(
  date: string | Date = new Date(),
  { dateStyle }: { dateStyle: Intl.DateTimeFormatOptions["dateStyle"] } = {
    dateStyle: "medium",
  },
) {
  if (!date || date === "0000-00-00") return undefined;
  return intlFormat(date, { dateStyle }, { locale });
}

export function formatDateToString(date = new Date()) {
  return format(date, "yyyy-MM-dd");
}

export function formatStringToDate(date = formatDateToString(new Date())) {
  if (!date || date === "0000-00-00") return undefined;
  return parse(date, "yyyy-MM-dd", new Date());
}

/* ----------------------------- Time formatters ---------------------------- */
export function formatTime(time: string) {
  if (!time || time === "00:00:00") return undefined;
  const [hours, minutes, seconds] = time.split(":");
  const timeToformat = new Date(
    0,
    0,
    0,
    Number(hours) || 0,
    Number(minutes) || 0,
    Number(seconds) || 0,
  );
  return new Intl.DateTimeFormat("es", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(timeToformat);
}

export function formatStringToTime(time?: string) {
  if (!time || time === "00:00:00") return undefined;
  const [hours, minutes, seconds] = time.split(":");
  const newTime = new Date(0, 0, 0, Number(hours) || 0, Number(minutes) || 0, Number(seconds) || 0);
  return newTime;
}

export function formatTimeToString(time?: Date) {
  if (!time) return "";
  return new Intl.DateTimeFormat("es", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(time));
}

export function ucwords(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
