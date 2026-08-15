import React, { useState, useEffect } from 'react';
import { ImageUploader } from './components/vision/ImageUploader';
import { StockfishAnalysisView } from './components/vision/StockfishAnalysisView';
import { Cpu, Palette, Radio } from 'lucide-react';
import { BOARD_THEMES, BoardTheme } from './lib/board-themes';
import { checkBackendHealth } from './lib/api';

export function App() {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(null);
  const [imageTitle, setImageTitle] = useState<string>('Uploaded Chessboard');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeBoardTheme, setActiveBoardTheme] = useState<BoardTheme>(BOARD_THEMES[0]);
  const [isBackendOnline, setIsBackendOnline] = useState<boolean>(false);

  useEffect(() => {
    async function verifyBackend() {
      const res = await checkBackendHealth();
      if (res && res.api) {
        setIsBackendOnline(true);
      } else {
        setIsBackendOnline(false);
      }
    }
    verifyBackend();
    const interval = setInterval(verifyBackend, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleImageSelect = (image: File | string, title?: string) => {
    setSelectedImage(image);
    if (title) {
      setImageTitle(title);
    } else if (typeof image === 'string') {
      setImageTitle('Sample Position Analysis');
    } else {
      setImageTitle(image.name || 'Uploaded Photo Analysis');
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950 text-white font-sans flex flex-col selection:bg-gold-300 selection:text-forest-950 overflow-x-hidden">
      {/* Responsive Top Navigation Header */}
      <header className="sticky top-0 z-50 bg-forest-950/90 backdrop-blur-lg border-b border-forest-800/80 px-3 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        {/* Left Branding */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold-300 to-gold-500 flex items-center justify-center font-serif text-forest-950 font-black text-lg sm:text-xl shadow-lg gold-border-glow flex-shrink-0">
            ♟
          </div>
          <div>
            <h1 className="font-serif font-black tracking-wider text-sm sm:text-base lg:text-lg text-white flex items-center gap-1.5">
              CHESS <span className="text-gold-gradient">PGN ANALYZER</span>
            </h1>
            <p className="text-[9px] sm:text-[10px] text-forest-300 uppercase tracking-widest font-bold hidden xs:block">
              Stockfish 16 Move-by-Move Game Analysis
            </p>
          </div>
        </div>

        {/* Right Controls & Status Pills */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Header Board Theme Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-forest-900/90 px-2.5 py-1.5 rounded-xl border border-gold-300/40 text-xs font-semibold shadow-inner">
            <Palette className="w-3.5 h-3.5 text-gold-300" />
            <span className="hidden sm:inline text-slate-300">Theme:</span>
            <select
              value={activeBoardTheme.id}
              onChange={(e) => {
                const selected = BOARD_THEMES.find((t) => t.id === e.target.value);
                if (selected) setActiveBoardTheme(selected);
              }}
              className="bg-transparent text-gold-300 font-bold focus:outline-none cursor-pointer text-xs"
            >
              {BOARD_THEMES.map((theme) => (
                <option key={theme.id} value={theme.id} className="bg-forest-950 text-white font-sans">
                  {theme.name}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-forest-900/80 border border-forest-700/80 text-xs text-slate-300 font-semibold shadow-inner">
            <Cpu className="w-3.5 h-3.5 text-gold-300" />
            <span>Stockfish 16 Engine</span>
          </div>

          <span
            className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold border flex items-center gap-1.5 shadow-sm ${
              isBackendOnline
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-ping ${
                isBackendOnline ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <span>{isBackendOnline ? 'Python API Connected' : 'Engine Ready'}</span>
          </span>
        </div>
      </header>

      {/* Main Workspace Feed */}
      <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto flex flex-col items-center">
        {selectedImage === null ? (
          <ImageUploader
            onImageSelected={handleImageSelect}
            isProcessing={isProcessing}
            activeBoardTheme={activeBoardTheme}
            onSelectBoardTheme={setActiveBoardTheme}
          />
        ) : (
          <StockfishAnalysisView
            imageSrc={selectedImage}
            imageTitle={imageTitle}
            onReset={handleReset}
            activeBoardTheme={activeBoardTheme}
            onSelectBoardTheme={setActiveBoardTheme}
          />
        )}
      </main>

      {/* Footer Branding */}
      <footer className="py-3 px-4 text-center border-t border-forest-800/50 text-[11px] sm:text-xs text-slate-400 font-mono">
        Chess Vision AI • Powered by Python-Chess & Stockfish 16 Engine
      </footer>
    </div>
  );
}

export default App;
