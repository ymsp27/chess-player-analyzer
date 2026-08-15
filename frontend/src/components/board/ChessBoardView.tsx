import React from 'react';
import { Chessboard } from 'react-chessboard';
import { useGame } from '../../context/GameContext';
import { EngineBar } from './EngineBar';
import { Sparkles, Cpu } from 'lucide-react';
import { formatEvalScore } from '../../lib/utils';

export const ChessBoardView: React.FC = () => {
  const {
    fen,
    boardOrientation,
    makeMove,
    evalScore,
    engineRecommendation,
    engineFeedback,
    activeGame,
  } = useGame();

  const handleDrop = (sourceSquare: string, targetSquare: string): boolean => {
    return makeMove(sourceSquare, targetSquare);
  };

  return (
    <div className="space-y-3" id="interactive-board-panel">
      {/* Top Engine Feedback & Best Move Bar */}
      <div className="bg-forest-900 text-white p-3.5 rounded-2xl border border-forest-800 shadow-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gold-300 text-forest-950 flex items-center justify-center font-bold shadow">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Stockfish 16 Telemetry</span>
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                  evalScore >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {formatEvalScore(evalScore)}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">{engineFeedback}</p>
          </div>
        </div>

        {/* Engine Best Move Recommendation Badge */}
        <div className="flex items-center gap-1.5 bg-forest-950 px-3 py-1.5 rounded-xl border border-gold-300/40 flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-gold-300" />
          <span className="text-[10px] text-slate-300 font-medium hidden sm:inline">Best:</span>
          <span className="text-xs font-mono font-black text-gold-300">{engineRecommendation}</span>
        </div>
      </div>

      {/* Main Board Container + Engine Bar */}
      <div className="relative bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-xl flex items-stretch gap-3">
        {/* Vertical Evaluation Bar */}
        <EngineBar score={evalScore} />

        {/* Interactive Chessboard Container */}
        <div className="flex-1 aspect-square w-full max-w-[420px] mx-auto rounded-xl overflow-hidden shadow-2xl relative">
          <Chessboard
            options={{
              position: fen,
              onPieceDrop: ({ sourceSquare, targetSquare }) => {
                if (sourceSquare && targetSquare) {
                  return handleDrop(sourceSquare, targetSquare);
                }
                return false;
              },
              boardOrientation: boardOrientation,
              boardStyle: {
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              },
              darkSquareStyle: { backgroundColor: '#1E3A2B' }, // Forest Green
              lightSquareStyle: { backgroundColor: '#F3E8C8' }, // Warm Gold Light
              animationDurationInMs: 200,
            }}
          />
        </div>
      </div>

      {/* Players Header */}
      <div className="flex items-center justify-between text-xs px-1 text-slate-600 font-semibold">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-white border border-slate-300 inline-block shadow-sm" />
          <span>
            White: <strong className="text-slate-900">Ananya R. (1850)</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-900 inline-block shadow-sm" />
          <span>
            Black: <strong className="text-slate-900">{activeGame.opponent.name} ({activeGame.opponent.rating})</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
