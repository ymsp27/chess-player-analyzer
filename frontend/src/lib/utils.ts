import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MoveAccuracy } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEvalScore(score: number): string {
  if (score === 0) return '0.00';
  const formatted = Math.abs(score).toFixed(2);
  return score > 0 ? `+${formatted}` : `-${formatted}`;
}

export function getAccuracyBadgeStyle(accuracy?: MoveAccuracy): {
  bg: string;
  text: string;
  border: string;
  label: string;
  icon: string;
} {
  switch (accuracy) {
    case 'brilliant':
      return { bg: 'bg-cyan-500/15', text: 'text-cyan-600', border: 'border-cyan-500/30', label: 'Brilliant', icon: '✨' };
    case 'great':
      return { bg: 'bg-emerald-500/15', text: 'text-emerald-700', border: 'border-emerald-500/30', label: 'Great Move', icon: '🎯' };
    case 'best':
      return { bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-500/20', label: 'Best', icon: '🟢' };
    case 'excellent':
      return { bg: 'bg-teal-500/10', text: 'text-teal-600', border: 'border-teal-500/20', label: 'Excellent', icon: '👍' };
    case 'good':
      return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', label: 'Good', icon: '✔️' };
    case 'inaccuracy':
      return { bg: 'bg-amber-500/15', text: 'text-amber-700', border: 'border-amber-500/30', label: 'Inaccuracy', icon: '!?' };
    case 'mistake':
      return { bg: 'bg-orange-500/15', text: 'text-orange-700', border: 'border-orange-500/30', label: 'Mistake', icon: '?' };
    case 'blunder':
      return { bg: 'bg-rose-500/15', text: 'text-rose-700', border: 'border-rose-500/30', label: 'Blunder', icon: '??' };
    default:
      return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', label: 'Book', icon: '📖' };
  }
}

export function calculatePasswordStrength(password: string): {
  score: number; // 0 to 4
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string;
} {
  let score = 0;
  if (!password) return { score: 0, label: 'Weak', color: 'bg-slate-200' };
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
  if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
  if (score === 3) return { score: 3, label: 'Good', color: 'bg-emerald-400' };
  return { score: 4, label: 'Strong', color: 'bg-emerald-600' };
}
