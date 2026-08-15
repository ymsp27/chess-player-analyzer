import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { RATING_HISTORY_DATA, RESULTS_DONUT_DATA, ACCURACY_PHASE_DATA } from '../../lib/sample-games';
import { TrendingUp, PieChart as PieIcon, ShieldAlert } from 'lucide-react';
import { Progress } from '../ui/Progress';
import { Badge } from '../ui/Badge';

export const ChartsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Rating Progression Line / Area Chart (Takes 2 Columns) */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-forest-800" />
              Rating Progression (Last 30 Days)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              ELO trend over 142 rated games • Peak: <span className="font-mono font-bold text-slate-800">1850</span>
            </p>
          </div>
          <Badge variant="gold">Diamond Tier I</Badge>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={RATING_HISTORY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E3A2B" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#1E3A2B" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[1800, 1860]}
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <RechartsTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-forest-900 text-white p-3 rounded-xl shadow-xl border border-forest-800 text-xs font-sans">
                        <p className="font-bold text-gold-300">{label}</p>
                        <p className="font-mono text-sm mt-1">
                          Rating: <span className="text-white font-bold">{payload[0].value} ELO</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="rating"
                stroke="#1E3A2B"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#ratingGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Results Breakdown Donut Chart (1 Column) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-gold-600" />
            Game Results Breakdown
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">142 Total Matches Analyzed</p>
        </div>

        <div className="relative h-48 my-2 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={RESULTS_DONUT_DATA}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {RESULTS_DONUT_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <RechartsTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0];
                    return (
                      <div className="bg-slate-900 text-white p-2 rounded-lg text-xs font-bold shadow">
                        {data.name}: {data.value} matches
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Donut Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black font-mono text-slate-900">56%</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Win Rate</span>
          </div>
        </div>

        {/* Donut Legend Badges */}
        <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100">
          <div>
            <div className="text-[11px] font-bold text-emerald-600">80 Wins</div>
            <div className="text-[10px] text-slate-400">56.3%</div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-gold-600">32 Draws</div>
            <div className="text-[10px] text-slate-400">22.5%</div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-rose-600">30 Losses</div>
            <div className="text-[10px] text-slate-400">21.2%</div>
          </div>
        </div>
      </div>

      {/* 3. Accuracy by Game Phase (Full width / 3-column span) */}
      <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              Accuracy by Game Phase
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparison against 1850 ELO benchmark average
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-forest-900">Overall: 78.6%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {ACCURACY_PHASE_DATA.map((item, idx) => {
            const delta = (item.player - item.globalAvg).toFixed(1);
            const isPositive = Number(delta) >= 0;
            return (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">{item.phase}</span>
                  <span className="text-xs font-mono font-extrabold text-slate-900">{item.player}%</span>
                </div>

                <Progress
                  value={item.player}
                  barClassName={
                    item.phase === 'Opening'
                      ? 'bg-emerald-600'
                      : item.phase === 'Middlegame'
                      ? 'bg-forest-800'
                      : 'bg-amber-500'
                  }
                />

                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                  <span>Global Avg: {item.globalAvg}%</span>
                  <span className={isPositive ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                    {isPositive ? `+${delta}%` : `${delta}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
