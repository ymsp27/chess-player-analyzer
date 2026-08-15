import React from 'react';
import { MISTAKE_BREAKDOWN_DATA } from '../../lib/sample-games';
import { AlertTriangle, AlertOctagon, HelpCircle } from 'lucide-react';
import { Progress } from '../ui/Progress';

export const MistakeAnalysis: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Mistake Classification Breakdown
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Distribution across last 14 analyzed moves</p>
        </div>
        <span className="text-xs font-mono font-bold text-slate-600">Total: 14 Errors</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {MISTAKE_BREAKDOWN_DATA.map((item, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                {idx === 0 && <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />}
                {idx === 1 && <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />}
                {idx === 2 && <HelpCircle className="w-3.5 h-3.5 text-amber-500" />}
                {item.label}
              </span>
              <span className="text-sm font-mono font-extrabold text-slate-900">{item.count}</span>
            </div>

            <Progress
              value={item.percentage}
              barClassName={
                idx === 0 ? 'bg-rose-500' : idx === 1 ? 'bg-orange-500' : 'bg-amber-500'
              }
            />

            <p className="text-[11px] text-slate-500 mt-2">
              {item.percentage}% of overall move inaccuracies
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
