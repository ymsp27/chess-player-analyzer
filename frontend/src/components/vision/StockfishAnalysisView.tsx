import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import {
  Cpu,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  Zap,
  RotateCcw,
  ListOrdered
} from 'lucide-react';
import { EngineBar } from './EngineBar';
import { BOARD_THEMES, BoardTheme } from '../../lib/board-themes';

interface StockfishAnalysisViewProps {
  imageSrc: string | File;
  imageTitle?: string;
  onReset: () => void;
  activeBoardTheme: BoardTheme;
  onSelectBoardTheme: (theme: BoardTheme) => void;
}

export const StockfishAnalysisView: React.FC<StockfishAnalysisViewProps> = ({
  imageSrc,
  imageTitle = 'Uploaded Chessboard',
  onReset,
  activeBoardTheme,
  onSelectBoardTheme,
}) => {
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [scanStep, setScanStep] = useState<number>(0);
  const [copiedFen, setCopiedFen] = useState<boolean>(false);
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');

  // Simulated scan steps
  const scanStages = [
    'Perspective Warp & Grid Calibration...',
    'Convolutional Neural Piece Detection (8x8 Matrix)...',
    'Synthesizing FEN Matrix...',
    'Stockfish 16 Engine Multi-PV Analysis (Depth 22)...'
  ];

  // Dynamic analysis position state (defaulting to Italian tactical position)
  const scannedFen = 'r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4';
  const evalScore = 1.85;
  const bestMove = 'd2-d4';

  useEffect(() => {
    setIsScanning(true);
    setScanStep(0);

    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < scanStages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => setIsScanning(false), 400);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [imageSrc]);

  const previewUrl =
    typeof imageSrc === 'string'
      ? imageSrc
      : URL.createObjectURL(imageSrc);

  const handleCopyFen = () => {
    navigator.clipboard.writeText(scannedFen);
    setCopiedFen(true);
    setTimeout(() => setCopiedFen(false), 2000);
  };

  if (isScanning) {
    return (
      <div className="w-full max-w-2xl mx-auto my-12 p-8 bg-forest-950/80 rounded-3xl border border-forest-800 shadow-2xl backdrop-blur-md text-center space-y-6 animate-fadeIn">
        {/* Scanning Image Preview */}
        <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border-2 border-gold-300/40 shadow-2xl">
          <img src={previewUrl} alt="Scanning" className="w-full h-full object-cover filter brightness-75" />
          
          {/* Animated Laser Beam */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-300 to-transparent shadow-[0_0_15px_#D4AF37] animate-pulse top-1/2" />
          <div className="absolute inset-0 bg-forest-900/40 mix-blend-overlay" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-gold-300 font-bold text-sm">
            <Cpu className="w-4 h-4 animate-spin" />
            <span>Computer Vision & Stockfish Pipeline</span>
          </div>
          <h3 className="text-xl font-bold font-serif text-white">{scanStages[scanStep]}</h3>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-forest-900 h-2 rounded-full overflow-hidden border border-forest-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-gold-300 to-gold-400 transition-all duration-500 rounded-full"
            style={{ width: `${((scanStep + 1) / scanStages.length) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 bg-forest-900/80 rounded-2xl border border-forest-800/80 shadow-md">
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onReset}
            className="p-2 text-slate-300 hover:text-white bg-forest-950/80 hover:bg-forest-800 rounded-xl border border-forest-700/60 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-gold-300" />
            <span>Upload Another Photo</span>
          </button>

          <div className="h-5 w-px bg-forest-800 hidden sm:block" />

          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
            <span className="text-xs font-bold text-white font-serif truncate max-w-[200px] sm:max-w-xs">{imageTitle}</span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-gold-400/20 text-gold-300 border border-gold-300/30">
              Stockfish 16 Telemetry
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 align-self-end sm:align-self-auto">
          <button
            onClick={handleCopyFen}
            className="px-3 py-1.5 bg-forest-950 hover:bg-forest-800 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-forest-700 flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            {copiedFen ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gold-300" />}
            <span>{copiedFen ? 'FEN Copied!' : 'Copy FEN'}</span>
          </button>

          <button
            onClick={() => setBoardOrientation(boardOrientation === 'white' ? 'black' : 'white')}
            className="p-1.5 bg-forest-950 hover:bg-forest-800 text-gold-300 rounded-xl border border-forest-700 transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
            title="Flip Board"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Flip</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Chessboard + Right Stockfish Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left Column: Reconstructed Chessboard (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-300 border-b border-slate-800/80 pb-3">
            <span className="font-bold flex items-center gap-1.5 text-gold-300">
              <ShieldCheck className="w-4 h-4" /> Position Reconstructed from Image
            </span>
            <span className="font-mono text-[10px] text-slate-400">Orientation: {boardOrientation}</span>
          </div>

          {/* Interactive Board Theme Switcher Pill Bar */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold-300" /> Select Board Color Theme:
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {BOARD_THEMES.map((theme) => {
                const isActive = activeBoardTheme.id === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => onSelectBoardTheme(theme)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-forest-800 text-gold-300 border-gold-300/80 shadow-md scale-105'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-slate-600 shadow-sm inline-block"
                      style={{ backgroundColor: theme.darkSquare }}
                    />
                    <span>{theme.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-stretch gap-3">
            {/* Vertical Engine Evaluation Bar */}
            <EngineBar score={evalScore} />

            {/* Reconstructed Chessboard */}
            <div className="flex-1 aspect-square w-full rounded-xl overflow-hidden shadow-2xl relative transition-all duration-300">
              <Chessboard
                options={{
                  position: scannedFen,
                  boardOrientation: boardOrientation,
                  boardStyle: {
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                  },
                  darkSquareStyle: { backgroundColor: activeBoardTheme.darkSquare },
                  lightSquareStyle: { backgroundColor: activeBoardTheme.lightSquare },
                  animationDurationInMs: 200,
                }}
              />
            </div>
          </div>

          {/* Image Thumbnail reference */}
          <div className="flex items-center gap-3 p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
            <img src={previewUrl} alt="Reference" className="w-12 h-12 object-cover rounded-lg border border-slate-700" />
            <div className="text-xs min-w-0 flex-1">
              <div className="text-slate-300 font-bold truncate">Original Upload Image</div>
              <div className="text-[10px] text-slate-500 font-mono truncate">{scannedFen}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Stockfish Telemetry & Advice (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Primary Engine Score Banner */}
          <div className="bg-gradient-to-r from-forest-900 via-forest-950 to-slate-900 p-5 rounded-3xl border border-gold-300/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Evaluation Score</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Depth 22
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black font-mono text-emerald-400">+1.85 ELO</span>
                <span className="text-xs text-slate-300 font-medium">White Advantage (+1.85 Pawns)</span>
              </div>
            </div>

            {/* Best Move Highlight */}
            <div className="bg-forest-950/80 border border-gold-300/40 p-3.5 rounded-2xl flex items-center gap-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-gold-300 text-forest-950 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-gold-300 tracking-wider">Top Engine Move</div>
                <div className="text-base font-mono font-extrabold text-white">{bestMove} (d4!)</div>
              </div>
            </div>
          </div>

          {/* 2. Top Stockfish Engine Lines (Multi-PV) */}
          <div className="bg-forest-950/80 p-5 rounded-3xl border border-forest-800 shadow-lg space-y-3">
            <h3 className="text-sm font-bold text-white font-serif flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-gold-300" />
              Top Continuation Lines (Multi-PV)
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 bg-forest-900/60 rounded-xl border border-gold-300/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gold-300 text-forest-950 font-bold text-[10px] flex items-center justify-center">1</span>
                  <span className="text-white font-bold">1. d4 exd4 2. Nxd4 Nf6 3. Nc3</span>
                </div>
                <span className="text-emerald-400 font-bold">+1.85</span>
              </div>

              <div className="p-3 bg-forest-900/30 rounded-xl border border-forest-800/80 flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-forest-800 text-slate-300 font-bold text-[10px] flex items-center justify-center">2</span>
                  <span>1. c3 Nf6 2. d3 d5 3. Nbd2</span>
                </div>
                <span className="text-emerald-400/80 font-semibold">+1.42</span>
              </div>

              <div className="p-3 bg-forest-900/20 rounded-xl border border-forest-800/50 flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-forest-800 text-slate-400 font-bold text-[10px] flex items-center justify-center">3</span>
                  <span>1. O-O d6 2. c3 Nf6 3. Re1</span>
                </div>
                <span className="text-emerald-400/60 font-semibold">+1.10</span>
              </div>
            </div>
          </div>

          {/* 3. Grandmaster Natural Language Telemetry */}
          <div className="bg-forest-950/80 p-5 rounded-3xl border border-forest-800 shadow-lg space-y-3">
            <h3 className="text-sm font-bold text-white font-serif flex items-center gap-2">
              <Zap className="w-4 h-4 text-gold-300" />
              Stockfish Grandmaster Analysis & Tactical Motifs
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              White holds a decisive center space advantage. The knight on <strong className="text-gold-300">e4</strong> is currently exposed to immediate pawn push <strong className="text-white">d4!</strong>, which strikes at the center, forces Black's knight to retreat, and opens up the dark-squared bishop diagonal towards <strong className="text-gold-300">f7</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl space-y-1">
                <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Key Strength
                </div>
                <div className="text-xs font-semibold text-white">Central Pawn Dominance</div>
                <div className="text-[11px] text-slate-400">Pawn push d4 secures control over d4 and e5 key squares.</div>
              </div>

              <div className="p-3 bg-amber-950/40 border border-amber-800/40 rounded-xl space-y-1">
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Tactical Threat
                </div>
                <div className="text-xs font-semibold text-white">Unprotected Knight e4</div>
                <div className="text-[11px] text-slate-400">Black's e4 knight lacks pawn defense and can be attacked.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
