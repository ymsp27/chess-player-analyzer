import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'forest' | 'emerald' | 'rose' | 'amber' | 'slate' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'slate', className }) => {
  const variants = {
    gold: 'bg-gold-100/80 text-gold-800 border-gold-300 font-semibold',
    forest: 'bg-forest-900 text-gold-300 border-forest-700 font-semibold',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium',
    rose: 'bg-rose-50 text-rose-700 border-rose-200 font-medium',
    amber: 'bg-amber-50 text-amber-700 border-amber-200 font-medium',
    slate: 'bg-slate-100 text-slate-700 border-slate-200 font-medium',
    outline: 'bg-transparent text-slate-600 border-slate-300 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs border transition-colors',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
