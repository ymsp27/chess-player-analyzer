import React, { useState, useRef } from 'react';
import { Upload, Sparkles, ArrowRight, Zap, CheckCircle2, Palette } from 'lucide-react';
import { BOARD_THEMES, BoardTheme } from '../../lib/board-themes';

interface ImageUploaderProps {
  onImageSelected: (file: File | string, title?: string) => void;
  isProcessing: boolean;
  activeBoardTheme: BoardTheme;
  onSelectBoardTheme: (theme: BoardTheme) => void;
}

export const SAMPLE_POSITIONS = [
  {
    id: 'sample-1',
    title: 'Italian Game Tactics',
    description: 'White to move • Tactical pawn push opportunity',
    fen: 'r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    eval: 1.8,
    img: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=600&q=80',
    tags: ['Middlegame', 'Tactical']
  },
  {
    id: 'sample-2',
    title: 'Mate in 3 Sequence',
    description: 'Bxh7+ rook lift sacrifice sequence',
    fen: 'r1b2r1k/pp3p1p/2n1p3/q7/8/3B2R1/PPP2PPP/R2Q2K1 w - - 0 1',
    eval: 99.0, // Mate in 3
    img: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=600&q=80',
    tags: ['Forced Mate', 'Sacrifice']
  },
  {
    id: 'sample-3',
    title: 'Endgame Conversion',
    description: 'Passed pawn vs King technique',
    fen: '8/8/4k3/8/2P5/3K4/8/8 w - - 0 1',
    eval: 3.4,
    img: 'https://images.unsplash.com/photo-1560174038-da43ac74f01b?auto=format&fit=crop&w=600&q=80',
    tags: ['Endgame', 'Passed Pawn']
  }
];

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  isProcessing,
  activeBoardTheme,
  onSelectBoardTheme
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-300/30 text-gold-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stockfish 16 + Computer Vision</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif text-white tracking-tight leading-tight">
          Chess Board <span className="text-gold-gradient">Image Analyzer</span>
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm lg:text-base max-w-2xl mx-auto leading-relaxed px-2">
          Upload any photo of a chessboard, screenshot, or score sheet. Our AI vision pipeline reconstructs the position and delivers grandmaster Stockfish evaluation in seconds.
        </p>

        {/* Board Theme Picker on Home Page */}
        <div className="pt-2 flex flex-col items-center gap-2">
          <span className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-gold-300" />
            Select Board Color Theme:
          </span>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-xl px-2">
            {BOARD_THEMES.map((theme) => {
              const isActive = activeBoardTheme.id === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectBoardTheme(theme)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-bold border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-forest-800 text-gold-300 border-gold-300 shadow-md scale-105'
                      : 'bg-forest-950/80 text-slate-400 border-forest-800 hover:text-white hover:border-forest-700'
                  }`}
                >
                  <span
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-slate-500 shadow-sm inline-block"
                    style={{ backgroundColor: theme.darkSquare }}
                  />
                  <span>{theme.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-center border-2 border-dashed transition-all duration-300 backdrop-blur-md group overflow-hidden ${
          isDragging
            ? 'border-gold-300 bg-gold-300/10 scale-[1.01] shadow-2xl'
            : 'border-forest-700/80 bg-forest-950/60 hover:border-gold-300/60 hover:bg-forest-900/80 shadow-xl'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gold-300/5 via-transparent to-emerald-500/5 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center space-y-3 sm:space-y-4">
          <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-forest-900 border border-gold-300/40 flex items-center justify-center text-gold-300 shadow-lg group-hover:scale-110 group-hover:border-gold-300 transition-all">
            <Upload className="w-7 h-7 sm:w-9 sm:h-9" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
              Drop your Chessboard Photo here
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              or <span className="text-gold-300 underline font-semibold">browse files</span> from your computer (.PNG, .JPG, .WEBP)
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-slate-400 pt-3 sm:pt-4 border-t border-forest-800/80">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" /> Auto Piece Recognition
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" /> Stockfish 16 Depth 22
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" /> Instant FEN & PGN Export
            </span>
          </div>
        </div>
      </div>

      {/* Preset Demo Positions */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-gold-300" />
            Or test with sample positions
          </h3>
          <span className="text-[11px] text-slate-400 hidden xs:inline">Click to run analysis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {SAMPLE_POSITIONS.map((pos) => (
            <button
              key={pos.id}
              onClick={(e) => {
                e.stopPropagation();
                onImageSelected(pos.img, pos.title);
              }}
              className="bg-forest-900/60 hover:bg-forest-800 border border-forest-800 hover:border-gold-300/50 rounded-2xl p-3 sm:p-4 text-left transition-all duration-200 group flex flex-col justify-between space-y-2.5 shadow-md cursor-pointer"
            >
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-forest-700/50">
                <img
                  src={pos.img}
                  alt={pos.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-1.5 right-1.5 flex gap-1">
                  {pos.tags.map((t, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold bg-forest-950/80 text-gold-300 border border-gold-300/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-gold-300 transition-colors flex items-center justify-between">
                  <span>{pos.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold-300" />
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 line-clamp-1">{pos.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
