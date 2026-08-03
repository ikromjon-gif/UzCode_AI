import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely, resolving conflicting utility
 * classes (required by shadcn/ui components introduced in Sprint 3).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
