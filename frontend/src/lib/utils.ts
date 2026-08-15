import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEvalScore(score: number): string {
  if (score === 0) return '0.00';
  const formatted = Math.abs(score).toFixed(2);
  return score > 0 ? `+${formatted}` : `-${formatted}`;
}
