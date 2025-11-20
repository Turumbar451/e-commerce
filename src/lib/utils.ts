import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateSlug(text: string, length = 3) {
  if (!text) return '';
  return text
    .replace(/[^a-zA-Z0-9]/g, '') //quitar los caracteres raros
    .toUpperCase()
    .substring(0, length);
}