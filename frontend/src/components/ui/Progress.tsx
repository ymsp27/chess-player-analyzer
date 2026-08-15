import React from 'react';
import { cn } from '../../lib/utils';

interface ProgressProps {
  value: number; // 0 to 100
  max?: number;
  className?: string;
  barClassName?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className,
  barClassName,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('w-full bg-slate-100 rounded-full h-2 overflow-hidden', className)}>
      <div
        className={cn('h-full bg-forest-800 transition-all duration-500 rounded-full', barClassName)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
