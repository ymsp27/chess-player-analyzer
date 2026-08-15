import React from 'react';
import { useGame } from '../../context/GameContext';
import { getAccuracyBadgeStyle, formatEvalScore } from '../../lib/utils';
import { MoveAccuracy } from '../../types';

export const MoveHistory: React.FC = () => {
  const { activeGame, currentMoveIndex, goToStep } = useGame();

  const moves = activeGame.moves || [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden flex flex-col h-64">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
          Notation & Accuracy
        </h4>
        <span className="text-[11px] text-slate-400 font-mono">Stockfish 16</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {moves.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No detailed move telemetry available for this loaded position.
          </div>
        ) : (
          moves.map((record) => {
            const whiteStepIndex = (record.moveNumber - 1) * 2 + 1;
            const blackStepIndex = (record.moveNumber - 1) * 2 + 2;

            const isWhiteActive = currentMoveIndex === whiteStepIndex;
            const isBlackActive = currentMoveIndex === blackStepIndex;

            const whiteBadge = getAccuracyBadgeStyle(record.white.accuracy);
            const blackBadge = record.black ? getAccuracyBadgeStyle(record.black.accuracy) : null;

            return (
              <div
                key={record.moveNumber}
                className="grid grid-cols-12 gap-1 items-center text-xs p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {/* Move Number */}
                <div className="col-span-2 text-slate-400 font-mono text-[11px] font-bold">
                  {record.moveNumber}.
                </div>

                {/* White Move */}
                <button
                  onClick={() => goToStep(whiteStepIndex)}
                  className={`col-span-5 flex items-center justify-between px-2 py-1 rounded-md transition-all font-mono ${
                    isWhiteActive
                      ? 'bg-forest-900 text-gold-300 font-bold shadow-sm'
                      : 'text-slate-800 hover:bg-slate-200/60'
                  }`}
                >
                  <span className="font-bold">{record.white.san}</span>
                  <div className="flex items-center gap-1">
                    {record.white.accuracy && (
                      <span className={`text-[10px] ${whiteBadge.text}`}>
                        {whiteBadge.icon}
                      </span>
                    )}
                    <span className="text-[10px] opacity-70">
                      {formatEvalScore(record.white.eval)}
                    </span>
                  </div>
                </button>

                {/* Black Move */}
                {record.black ? (
                  <button
                    onClick={() => goToStep(blackStepIndex)}
                    className={`col-span-5 flex items-center justify-between px-2 py-1 rounded-md transition-all font-mono ${
                      isBlackActive
                        ? 'bg-forest-900 text-gold-300 font-bold shadow-sm'
                        : 'text-slate-800 hover:bg-slate-200/60'
                    }`}
                  >
                    <span className="font-bold">{record.black.san}</span>
                    <div className="flex items-center gap-1">
                      {record.black.accuracy && blackBadge && (
                        <span className={`text-[10px] ${blackBadge.text}`}>
                          {blackBadge.icon}
                        </span>
                      )}
                      <span className="text-[10px] opacity-70">
                        {formatEvalScore(record.black.eval)}
                      </span>
                    </div>
                  </button>
                ) : (
                  <div className="col-span-5" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
