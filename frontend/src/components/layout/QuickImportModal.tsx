import React, { useState } from 'react';
import { Upload, FileText, Code, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useGame } from '../../context/GameContext';
import { SAMPLE_PRESETS } from '../../lib/sample-games';
import { Badge } from '../ui/Badge';

export const QuickImportModal: React.FC = () => {
  const { isQuickImportOpen, closeQuickImport, loadPgn, loadFen, loadGame } = useGame();
  const [activeTab, setActiveTab] = useState<'pgn' | 'fen' | 'preset' | 'file'>('pgn');
  const [pgnInput, setPgnInput] = useState<string>('');
  const [fenInput, setFenInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleImportPgn = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (!pgnInput.trim()) {
      setErrorMessage('Please enter a PGN string.');
      return;
    }
    const success = loadPgn(pgnInput);
    if (success) {
      setSuccessMessage('PGN imported successfully! Analysis ready.');
      setTimeout(() => {
        closeQuickImport();
        setSuccessMessage(null);
        setPgnInput('');
      }, 1000);
    } else {
      setErrorMessage('Invalid PGN format. Please verify move syntax.');
    }
  };

  const handleImportFen = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (!fenInput.trim()) {
      setErrorMessage('Please enter a FEN string.');
      return;
    }
    const success = loadFen(fenInput);
    if (success) {
      setSuccessMessage('FEN position loaded into interactive board!');
      setTimeout(() => {
        closeQuickImport();
        setSuccessMessage(null);
        setFenInput('');
      }, 1000);
    } else {
      setErrorMessage('Invalid FEN position format.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setPgnInput(content);
          setActiveTab('pgn');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Modal
      isOpen={isQuickImportOpen}
      onClose={closeQuickImport}
      title="Import Game & Analysis"
      subtitle="Upload PGN files, paste PGN move notations, or enter FEN positions"
      maxWidth="lg"
    >
      {/* Import Type Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl mb-6">
        <button
          onClick={() => { setActiveTab('pgn'); setErrorMessage(null); }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'pgn' ? 'bg-white text-forest-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Paste PGN
        </button>

        <button
          onClick={() => { setActiveTab('fen'); setErrorMessage(null); }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'fen' ? 'bg-white text-forest-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          Paste FEN
        </button>

        <button
          onClick={() => { setActiveTab('preset'); setErrorMessage(null); }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'preset' ? 'bg-white text-forest-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          Presets
        </button>

        <button
          onClick={() => { setActiveTab('file'); setErrorMessage(null); }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'file' ? 'bg-white text-forest-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          Upload
        </button>
      </div>

      {/* Messages */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Tab Contents */}
      {activeTab === 'pgn' && (
        <div className="space-y-4">
          <label className="block text-xs font-semibold text-slate-700">Paste PGN Game String</label>
          <textarea
            value={pgnInput}
            onChange={(e) => setPgnInput(e.target.value)}
            placeholder='1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7...'
            className="w-full h-36 p-3 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800 resize-none bg-slate-50/50"
          />
          <button
            onClick={handleImportPgn}
            className="w-full py-2.5 bg-forest-900 hover:bg-forest-800 text-white rounded-xl font-semibold text-xs transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-gold-300" />
            Analyze PGN Game
          </button>
        </div>
      )}

      {activeTab === 'fen' && (
        <div className="space-y-4">
          <label className="block text-xs font-semibold text-slate-700">Paste FEN Position String</label>
          <input
            type="text"
            value={fenInput}
            onChange={(e) => setFenInput(e.target.value)}
            placeholder="r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3"
            className="w-full p-3 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800 bg-slate-50/50"
          />
          <button
            onClick={handleImportFen}
            className="w-full py-2.5 bg-forest-900 hover:bg-forest-800 text-white rounded-xl font-semibold text-xs transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Code className="w-4 h-4 text-gold-300" />
            Load Position on Board
          </button>
        </div>
      )}

      {activeTab === 'preset' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-500 mb-2">Select a grandmaster or tactical demo match:</p>
          {SAMPLE_PRESETS.map((preset, index) => (
            <div
              key={index}
              onClick={() => {
                loadPgn(preset.pgn);
                setSuccessMessage(`Loaded "${preset.name}"!`);
                setTimeout(() => {
                  closeQuickImport();
                  setSuccessMessage(null);
                }, 800);
              }}
              className="p-3 bg-slate-50 hover:bg-gold-50/50 border border-slate-200 hover:border-gold-300 rounded-xl cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-forest-900 group-hover:text-gold-700">
                  {preset.name}
                </h4>
                <Badge variant="gold">Preset</Badge>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{preset.description}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'file' && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-slate-300 hover:border-forest-800 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <Upload className="w-8 h-8 text-forest-800 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-700">Drag & drop your .PGN file here</p>
            <p className="text-[11px] text-slate-400 mt-1">or browse from your local computer</p>
            <input
              type="file"
              accept=".pgn,.txt"
              onChange={handleFileUpload}
              className="mt-4 text-xs mx-auto text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-forest-900 file:text-white hover:file:bg-forest-800"
            />
          </div>
        </div>
      )}
    </Modal>
  );
};
