import React, { useState, useRef } from 'react';
import { Upload, Sparkles, ArrowRight, FileText, CheckCircle2, Palette } from 'lucide-react';
import { BOARD_THEMES, BoardTheme } from '../../lib/board-themes';

interface ImageUploaderProps {
  onImageSelected: (file: File | string, title?: string) => void;
  isProcessing: boolean;
  activeBoardTheme: BoardTheme;
  onSelectBoardTheme: (theme: BoardTheme) => void;
}

export const SAMPLE_PGNS = [
  {
    id: 'opera-game',
    title: 'Morphy’s Opera Game (1858)',
    description: 'Paul Morphy vs Duke of Brunswick • Queen Sacrifice Masterpiece',
    pgn: `[Event "Paris Opera"]
[Site "Paris FRA"]
[Date "1858.11.02"]
[EventDate "1858.11.02"]
[Round "?"]
[Result "1-0"]
[White "Paul Morphy"]
[Black "Duke Karl / Count Isouard"]
[ECO "C41"]

1. e4 e5 2. Nf3 d6 3. d4 Bg4 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6 7. Qb3 Qe7 8. Nc3 c6 9. Bg5 b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7 14. Rd1 Qe6 15. Bxd7+ Nxd7 16. Qb8+ Nxb8 17. Rd8# 1-0`,
    tags: ['Masterpiece', 'Queen Sac']
  },
  {
    id: 'kasparov-deepblue',
    title: 'Kasparov vs Deep Blue (1997)',
    description: 'Garry Kasparov vs IBM Deep Blue Game 1 • Sicilian Defense',
    pgn: `[Event "IBM Man-Machine Game 1"]
[Site "New York, NY USA"]
[Date "1997.05.03"]
[Round "1"]
[White "Garry Kasparov"]
[Black "Deep Blue"]
[Result "1-0"]

1. Nf3 d5 2. g3 Bg4 3. b3 Nd7 4. Bb2 e6 5. Bg2 Ngf6 6. O-O c6 7. d3 Bd6 8. Nbd2 O-O 9. h3 Bh5 10. e3 h6 11. Qe1 Qa5 12. a3 Bc7 13. Nh4 g5 14. Nhf3 e5 15. e4 Rfe8 16. Nh2 Rad8 17. Qc1 Qb6 18. Re1 Bd6 19. Nf1 dxe4 20. Nc4 Qc7 21. Nxd6 Qxd6 22. dxe4 Nc5 23. f3 Ne6 24. Ne3 Bg6 25. Nc4 Qc5+ 26. Qe3 Nd4 27. Rac1 b5 28. Nxe5 Qxe5 29. f4 gxf4 30. gxf4 Qc5 31. e5 Nh5 32. b4 Qb6 33. c4 bxc4 34. Rxc4 Nc2 35. Qxb6 axb6 36. Rc1 Nxf4 37. R1xc2 Rd1+ 38. Kh2 Bxc2 39. Rxc2 Nxg2 40. Rxg2+ Kf8 41. a4 Red8 42. Bc3 R8d3 43. Rc2 Rb1 44. a5 bxa5 45. bxa5 Rb3 46. Bd2 Rxh3+ 47. Kg2 Ra3 48. Rxc6 Rhd3 49. Bxh6+ Ke7 1-0`,
    tags: ['Man vs Machine', 'Grandmaster']
  },
  {
    id: 'immortal-game',
    title: 'The Immortal Game (1851)',
    description: 'Adolf Anderssen vs Lionel Kieseritzky • Double Rook Sacrifice',
    pgn: `[Event "London International"]
[Site "London ENG"]
[Date "1851.06.21"]
[Round "?"]
[Result "1-0"]
[White "Adolf Anderssen"]
[Black "Lionel Kieseritzky"]
[ECO "C33"]

1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 b5 5. Bxb5 Nf6 6. Nf3 Qh6 7. d3 Nh5 8. Nh4 Qg5 9. Nf5 c6 10. g4 Nf6 11. Rg1 cxb5 12. h4 Qg6 13. h5 Qg5 14. Qf3 Ng8 15. Bxf4 Qf6 16. Nc3 Bc5 17. Nd5 Qxb2 18. Bd6 Bxg1 19. e5 Qxa1+ 20. Ke2 Na6 21. Nxg7+ Kd8 22. Qf6+ Nxf6 23. Be7# 1-0`,
    tags: ['Immortal', 'Double Sac']
  }
];

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  isProcessing,
  activeBoardTheme,
  onSelectBoardTheme
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [pastedPgn, setPastedPgn] = useState<string>('');
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
      const file = e.dataTransfer.files[0];
      if (file.name.toLowerCase().endsWith('.pgn') || file.type === 'text/plain' || file.name.endsWith('.txt')) {
        onImageSelected(file);
      } else {
        alert('Please upload a valid .pgn file.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.toLowerCase().endsWith('.pgn') || file.type === 'text/plain' || file.name.endsWith('.txt')) {
        onImageSelected(file);
      } else {
        alert('Please upload a valid .pgn file.');
      }
    }
  };

  const handlePgnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedPgn.trim()) {
      alert('Please paste valid PGN text.');
      return;
    }
    onImageSelected(pastedPgn.trim(), 'Pasted PGN Game');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-300/30 text-gold-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stockfish 16 Engine • PGN File Analyzer</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif text-white tracking-tight leading-tight">
          Chess PGN <span className="text-gold-gradient">Game Analyzer</span>
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm lg:text-base max-w-2xl mx-auto leading-relaxed px-2">
          Upload any <strong className="text-gold-300">.pgn</strong> chess game file or paste PGN text below. Stockfish 16 will analyze every move, calculate accuracy, identify blunders, and deliver grandmaster insights.
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

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
            activeTab === 'upload'
              ? 'bg-gold-300 text-forest-950 border-gold-300 shadow-lg font-black'
              : 'bg-forest-900/60 text-slate-300 border-forest-800 hover:border-forest-700'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload .PGN File</span>
        </button>

        <button
          onClick={() => setActiveTab('paste')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
            activeTab === 'paste'
              ? 'bg-gold-300 text-forest-950 border-gold-300 shadow-lg font-black'
              : 'bg-forest-900/60 text-slate-300 border-forest-800 hover:border-forest-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Paste PGN Text</span>
        </button>
      </div>

      {/* Tab 1: Upload .PGN File */}
      {activeTab === 'upload' ? (
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
            accept=".pgn,text/plain"
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
                Drop your .PGN file here
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                or <span className="text-gold-300 underline font-semibold">browse .pgn file</span> from your computer
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-slate-400 pt-3 sm:pt-4 border-t border-forest-800/80">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" /> PGN Move Validation
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" /> Stockfish 16 Move-by-Move Evaluation
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" /> Blunder & Accuracy Report
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Tab 2: Paste PGN Text Area */
        <form onSubmit={handlePgnSubmit} className="bg-forest-950/80 p-5 rounded-2xl sm:rounded-3xl border border-forest-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-gold-300" />
              Paste PGN Notation:
            </label>
            <span className="text-[11px] text-slate-400 font-mono">Standard PGN Format</span>
          </div>

          <textarea
            value={pastedPgn}
            onChange={(e) => setPastedPgn(e.target.value)}
            placeholder={`1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7...`}
            rows={6}
            className="w-full bg-forest-900/90 border border-forest-700/80 rounded-xl p-3.5 text-xs text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-gold-300 transition-colors"
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-gold-300 to-gold-400 hover:from-gold-400 hover:to-gold-500 text-forest-950 font-black text-sm rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Analyze PGN Game</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Preset Demo PGN Games */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-gold-300" />
            Or test with sample PGN games
          </h3>
          <span className="text-[11px] text-slate-400 hidden xs:inline">Click to run analysis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {SAMPLE_PGNS.map((pos) => (
            <button
              key={pos.id}
              onClick={(e) => {
                e.stopPropagation();
                onImageSelected(pos.pgn, pos.title);
              }}
              className="bg-forest-900/60 hover:bg-forest-800 border border-forest-800 hover:border-gold-300/50 rounded-2xl p-4 text-left transition-all duration-200 group flex flex-col justify-between space-y-3 shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-gold-300 uppercase tracking-widest bg-forest-950 px-2 py-0.5 rounded border border-gold-300/30">
                  PGN Game
                </span>
                <div className="flex gap-1">
                  {pos.tags.map((t, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-forest-950/80 text-gold-300 border border-gold-300/30">
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
                <p className="text-[11px] sm:text-xs text-slate-400 mt-1 line-clamp-2">{pos.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
