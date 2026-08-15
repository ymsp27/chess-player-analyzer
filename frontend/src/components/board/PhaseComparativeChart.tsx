import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';
import { ACCURACY_PHASE_DATA } from '../../lib/sample-games';
import { BarChart2 } from 'lucide-react';

export const PhaseComparativeChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-serif flex items-center gap-1.5">
          <BarChart2 className="w-3.5 h-3.5 text-forest-800" />
          Phase Accuracy (Player vs 1850+ Avg)
        </h4>
      </div>

      <div className="h-44 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ACCURACY_PHASE_DATA} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <XAxis dataKey="phase" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis domain={[50, 100]} stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
            <RechartsTooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-forest-950 text-white p-2.5 rounded-xl shadow-lg text-[11px] font-sans">
                      <p className="font-bold text-gold-300 mb-1">{label} Phase</p>
                      <p className="text-emerald-400">Ananya R.: {payload[0].value}%</p>
                      <p className="text-slate-300">Global Avg: {payload[1].value}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="player" name="Player" fill="#1E3A2B" radius={[4, 4, 0, 0]} />
            <Bar dataKey="globalAvg" name="1850+ Avg" fill="#D4AF37" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
