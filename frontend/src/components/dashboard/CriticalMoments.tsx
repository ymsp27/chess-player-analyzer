import React from 'react';
import { CRITICAL_MOMENTS_DATA } from '../../lib/sample-games';
import { Swords, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { Badge } from '../ui/Badge';
import { getAccuracyBadgeStyle } from '../../lib/utils';

export const CriticalMoments: React.FC = () => {
  const { loadFen, goToStep, activeGame } = useGame();

  const handleAnalyzeMoment = (fen: string) => {
    loadFen(fen);
    // Smooth scroll to board on mobile or desktop if needed
    const boardElement = document.getElementById('interactive-board-panel');
    if (boardElement) {
      boardElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
            <Swords className="w-4 h-4 text-rose-600" />
            Critical Game Moments & Evaluation Drops
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Key turning points identified by Stockfish 16 engine telemetry
          </p>
        </div>
        <Badge variant="gold">4 Key Moments</Badge>
      </div>

      <div className="space-y-3">
        {CRITICAL_MOMENTS_DATA.map((moment) => {
          const badgeStyle = getAccuracyBadgeStyle(moment.accuracy);
          return (
            <div
              key={moment.id}
              className="p-4 bg-slate-50 hover:bg-gold-50/30 border border-slate-200/80 hover:border-gold-300 rounded-xl transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-200/70 text-slate-700 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5">
                  #{moment.moveNumber}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold font-mono text-slate-900">
                      Move {moment.moveNumber}. {moment.moveSan}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                    >
                      {badgeStyle.icon} {badgeStyle.label}
                    </span>

                    <span className="text-[11px] font-mono font-bold text-rose-600">
                      Eval drop: {moment.evalDrop}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {moment.explanation}
                  </p>

                  <div className="text-[11px] text-slate-400 font-mono mt-1">
                    Best line: <span className="text-emerald-700 font-semibold">{moment.bestAlternative}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleAnalyzeMoment(moment.fen)}
                className="self-end sm:self-center px-3 py-2 bg-forest-900 hover:bg-forest-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm flex items-center gap-1.5 flex-shrink-0 group-hover:bg-gold-400 group-hover:text-forest-950"
              >
                <span>Analyze Position</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
