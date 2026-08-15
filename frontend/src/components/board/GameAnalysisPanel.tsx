import React from 'react';
import { ChessBoardView } from './ChessBoardView';
import { PlaybackControls } from './PlaybackControls';
import { MoveHistory } from './MoveHistory';
import { PhaseComparativeChart } from './PhaseComparativeChart';
import { Swords, Share2, Download } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const GameAnalysisPanel: React.FC = () => {
  const { activeGame } = useGame();

  return (
    <div className="w-full lg:w-96 flex-shrink-0 space-y-4 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:overflow-y-auto pr-0 lg:pr-1 no-scrollbar">
      {/* Container Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Interactive Telemetry Panel
          </span>
          <h3 className="text-sm font-bold text-slate-900 truncate font-serif">
            {activeGame.opponent.name} Match
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => alert(`PGN copied to clipboard!\n\n${activeGame.pgn}`)}
            title="Share / Copy PGN"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 1. Interactive 2D Chessboard */}
      <ChessBoardView />

      {/* 2. Playback Transport Controls */}
      <PlaybackControls />

      {/* 3. Notation Move History */}
      <MoveHistory />

      {/* 4. Phase Performance Comparative Bar Chart */}
      <PhaseComparativeChart />
    </div>
  );
};
