import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getItemLocalStorage = (key: string) => {
  // check if local storgae is defined
  if (typeof localStorage === "undefined") {
    return null;
  }
  return localStorage.getItem(key);
};

export const setItemLocalStorage = (key: string, value: string) => {
  // check if local storgae is defined
  if (typeof localStorage === "undefined") {
    return null;
  }
  localStorage.setItem(key, value);
};