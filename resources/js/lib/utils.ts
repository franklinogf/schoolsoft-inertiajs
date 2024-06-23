import { Date_ } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date_) {
  const dateToFormat = new Date(date);
  return new Intl.DateTimeFormat("es", { dateStyle: "long" }).format(dateToFormat);
}
