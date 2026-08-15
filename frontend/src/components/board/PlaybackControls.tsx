import React, { useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const PlaybackControls: React.FC = () => {
  const {
    firstMove,
    prevMove,
    nextMove,
    lastMove,
    isPlaying,
    togglePlay,
    flipBoard,
    currentMoveIndex,
    totalMoves,
  } = useGame();

  // Keyboard shortcut listener for Left/Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        prevMove();
      } else if (e.key === 'ArrowRight') {
        nextMove();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevMove, nextMove, togglePlay]);

  return (
    <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-soft space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-slate-700">
          Move {currentMoveIndex} / {totalMoves}
        </span>
        <span className="text-[10px] text-slate-400 font-medium">Use ← → arrow keys to step</span>
      </div>

      {/* Transport Controls Bar */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        {/* First Move */}
        <button
          onClick={firstMove}
          title="Jump to Game Start (Home)"
          disabled={currentMoveIndex === 0}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl transition-colors"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Move */}
        <button
          onClick={prevMove}
          title="Previous Move (Left Arrow)"
          disabled={currentMoveIndex === 0}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Auto Play / Pause Toggle */}
        <button
          onClick={togglePlay}
          title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play (Space)'}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
            isPlaying
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-forest-900 hover:bg-forest-800 text-gold-300'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
        </button>

        {/* Next Move */}
        <button
          onClick={nextMove}
          title="Next Move (Right Arrow)"
          disabled={currentMoveIndex >= totalMoves}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Move */}
        <button
          onClick={lastMove}
          title="Jump to Game End (End)"
          disabled={currentMoveIndex >= totalMoves}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl transition-colors"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>

        {/* Flip Board */}
        <button
          onClick={flipBoard}
          title="Flip Board View"
          className="p-2.5 bg-slate-100 hover:bg-gold-100 text-slate-700 hover:text-gold-900 rounded-xl transition-colors ml-2"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
