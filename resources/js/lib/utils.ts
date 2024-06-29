import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
