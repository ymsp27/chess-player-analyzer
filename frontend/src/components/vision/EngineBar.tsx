import React from 'react';
import { formatEvalScore } from '../../lib/utils';

interface EngineBarProps {
  score: number; // e.g. +0.45 or -2.34
}

export const EngineBar: React.FC<EngineBarProps> = ({ score }) => {
  // Convert score (-5 to +5 range) to height percentage (0 to 100%)
  // White at top, Black at bottom
  const clampedScore = Math.max(-5, Math.min(5, score));
  const whitePercentage = Math.round(((clampedScore + 5) / 10) * 100);

  return (
    <div className="flex flex-col items-center h-full w-4 bg-slate-900 rounded-lg overflow-hidden border border-slate-700 relative shadow-inner">
      {/* White advantage gauge (top) */}
      <div
        className="w-full bg-slate-100 transition-all duration-500"
        style={{ height: `${whitePercentage}%` }}
      />
      {/* Black advantage gauge (bottom) */}
      <div
        className="w-full bg-slate-900 transition-all duration-500 flex-1"
      />

      {/* Floating score text badge */}
      <div className="absolute inset-x-0 bottom-2 text-center">
        <span
          className={`px-1 py-0.5 rounded text-[9px] font-mono font-black ${
            score >= 0 ? 'bg-white text-slate-900 shadow' : 'bg-slate-800 text-gold-300'
          }`}
        >
          {formatEvalScore(score)}
        </span>
      </div>
    </div>
  );
};
