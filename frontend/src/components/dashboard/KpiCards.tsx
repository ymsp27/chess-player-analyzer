import React from 'react';
import { Trophy, Target, AlertTriangle, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const KpiCards: React.FC = () => {
  const { user } = useAuth();

  const kpis = [
    {
      title: 'Current Rating',
      value: user ? `${user.rating}` : '1850',
      change: '+24 ELO',
      isPositive: true,
      subtitle: 'Peak: 1850 (Diamond I)',
      icon: Trophy,
      iconBg: 'bg-gold-100/70 text-gold-700 border-gold-200',
      sparkline: 'M0 25 Q15 22, 30 18 T60 20 T90 12 T120 5',
      sparkColor: '#D4AF37',
    },
    {
      title: 'Avg. Accuracy',
      value: `${user ? user.accuracyAvg : 78.6}%`,
      change: '+6.3%',
      isPositive: true,
      subtitle: 'vs 72.1% peer average',
      icon: Target,
      iconBg: 'bg-emerald-100/70 text-emerald-700 border-emerald-200',
      sparkline: 'M0 28 Q20 20, 40 22 T80 14 T120 8',
      sparkColor: '#10B981',
    },
    {
      title: 'Blunder Rate',
      value: `${user ? user.blunderRate : 2.1}%`,
      change: '-0.7%',
      isPositive: true, // Lower blunder rate is positive
      subtitle: '2 blunders in last 96 moves',
      icon: AlertTriangle,
      iconBg: 'bg-amber-100/70 text-amber-700 border-amber-200',
      sparkline: 'M0 8 Q30 14, 60 12 T90 22 T120 28',
      sparkColor: '#F59E0B',
    },
    {
      title: 'Win Rate',
      value: `${user ? user.winRate : 56}%`,
      change: '+4.0%',
      isPositive: true,
      subtitle: '80 Wins / 32 Draws / 30 Losses',
      icon: Zap,
      iconBg: 'bg-forest-100 text-forest-800 border-forest-200',
      sparkline: 'M0 24 Q30 20, 60 15 T90 18 T120 10',
      sparkColor: '#1E3A2B',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-card transition-all duration-300 relative overflow-hidden group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {kpi.title}
                </p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1 font-mono tracking-tight">
                  {kpi.value}
                </h3>
              </div>

              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 ${kpi.iconBg}`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>

            {/* Sparkline & Subtitle */}
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-1 text-xs font-bold">
                  {kpi.isPositive ? (
                    <span className="text-emerald-600 flex items-center">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {kpi.change}
                    </span>
                  ) : (
                    <span className="text-rose-600 flex items-center">
                      <ArrowDownRight className="w-3.5 h-3.5" />
                      {kpi.change}
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 font-normal ml-1">last 30d</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{kpi.subtitle}</p>
              </div>

              {/* Mini SVG Sparkline */}
              <div className="w-16 h-8 opacity-80 group-hover:opacity-100 transition-opacity">
                <svg className="w-full h-full" viewBox="0 0 120 32" fill="none">
                  <path
                    d={kpi.sparkline}
                    stroke={kpi.sparkColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
