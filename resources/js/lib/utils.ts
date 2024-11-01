import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/* ---------------------------- Dates formattters --------------------------- */
export function formatDate(
  date: string | Date,
  { dateStyle }: { dateStyle: Intl.DateTimeFormatOptions["dateStyle"] } = {
    dateStyle: "medium",
  },
) {
  if (!date || date === "0000-00-00") return undefined;
  const dateToFormat = new Date(date);
  if (!dateToFormat) return undefined;
  return new Intl.DateTimeFormat("es", { dateStyle }).format(dateToFormat);
}

export function formatDateToString(date?: Date) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}
export function formatStringToDate(date?: string) {
  if (!date || date === "0000-00-00") return undefined;
  const dateToFormat = formatDate(date.replaceAll("-", "/"));
  if (!dateToFormat) return undefined;
  return new Date(dateToFormat);
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
