import React from 'react';
import { ShieldCheck, TrendingDown, Sparkles, AlertCircle } from 'lucide-react';
import { CURRENT_USER } from '../../lib/sample-games';
import { Badge } from '../ui/Badge';

export const HighlightsSection: React.FC = () => {
  const { biggestStrength, topImprovementArea } = CURRENT_USER;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 1. Biggest Strength Card */}
      <div className="bg-gradient-to-br from-emerald-950 via-forest-900 to-forest-950 text-white p-5 rounded-2xl border border-emerald-800/40 shadow-soft relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles className="w-24 h-24 text-gold-300" />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
              Telemetry Highlight
            </span>
            <h4 className="text-sm font-bold font-serif text-white">{biggestStrength.title}</h4>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {biggestStrength.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-forest-800/80">
          <span className="text-xs text-slate-400 font-medium">Metric Score:</span>
          <Badge variant="gold">{biggestStrength.stat}</Badge>
        </div>
      </div>

      {/* 2. Top Improvement Area Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950 text-white p-5 rounded-2xl border border-rose-900/40 shadow-soft relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
          <AlertCircle className="w-24 h-24 text-rose-400" />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
              Recommended Focus
            </span>
            <h4 className="text-sm font-bold font-serif text-white">{topImprovementArea.title}</h4>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {topImprovementArea.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Variance:</span>
          <Badge variant="rose">{topImprovementArea.stat}</Badge>
        </div>
      </div>
    </div>
  );
};
