import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { GameSummary, MoveRecord, MoveAccuracy } from '../types';
import { SAMPLE_GAMES } from '../lib/sample-games';

interface GameContextType {
  activeGame: GameSummary;
  chessInstance: Chess;
  fen: string;
  currentMoveIndex: number;
  totalMoves: number;
  isPlaying: boolean;
  boardOrientation: 'white' | 'black';
  evalScore: number; // e.g. +0.45
  engineRecommendation: string;
  engineFeedback: string;
  loadGame: (game: GameSummary) => void;
  loadPgn: (pgn: string) => boolean;
  loadFen: (fen: string) => boolean;
  goToStep: (stepIndex: number) => void;
  nextMove: () => void;
  prevMove: () => void;
  firstMove: () => void;
  lastMove: () => void;
  togglePlay: () => void;
  flipBoard: () => void;
  makeMove: (source: string, target: string) => boolean;
  isQuickImportOpen: boolean;
  openQuickImport: () => void;
  closeQuickImport: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeGame, setActiveGame] = useState<GameSummary>(SAMPLE_GAMES[0]);
  const [chessInstance] = useState<Chess>(new Chess());
  const [fen, setFen] = useState<string>(SAMPLE_GAMES[0].fen || chessInstance.fen());
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0);
  const [totalMoves, setTotalMoves] = useState<number>(SAMPLE_GAMES[0].moves.length * 2);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');
  const [evalScore, setEvalScore] = useState<number>(+0.45);
  const [engineRecommendation, setEngineRecommendation] = useState<string>('Rxe7!');
  const [engineFeedback, setEngineFeedback] = useState<string>(
    'White holds a solid spatial advantage in the center (+0.45). Best plan: prepare a rook exchange on e7.'
  );
  const [isQuickImportOpen, setIsQuickImportOpen] = useState<boolean>(false);

  const autoPlayTimerRef = useRef<number | null>(null);

  // Initialize with initial game
  useEffect(() => {
    loadGame(SAMPLE_GAMES[0]);
  }, []);

  const loadGame = (game: GameSummary) => {
    setActiveGame(game);
    try {
      chessInstance.reset();
      if (game.pgn) {
        chessInstance.loadPgn(game.pgn);
      } else if (game.fen) {
        chessInstance.load(game.fen);
      }
      const history = chessInstance.history({ verbose: true });
      setTotalMoves(history.length);
      
      // Reset to beginning or end
      setCurrentMoveIndex(history.length);
      setFen(chessInstance.fen());
      setBoardOrientation(game.playerColor);
      updateEvalData(history.length, game);
    } catch (e) {
      console.error('Error loading game:', e);
    }
  };

  const loadPgn = (pgnString: string): boolean => {
    try {
      const tempChess = new Chess();
      tempChess.loadPgn(pgnString);
      chessInstance.loadPgn(pgnString);
      
      const history = chessInstance.history({ verbose: true });
      const newGame: GameSummary = {
        id: `imported-${Date.now()}`,
        opponent: { name: 'Imported PGN Game', rating: 1800 },
        playerColor: 'white',
        timeControl: 'Custom',
        type: 'rapid',
        date: 'Just Now',
        result: 'win',
        resultReason: 'Imported',
        playerAccuracy: 82.5,
        opponentAccuracy: 78.0,
        ratingChange: 0,
        pgn: pgnString,
        fen: chessInstance.fen(),
        moves: [],
        criticalMomentsCount: { blunders: 0, mistakes: 1, inaccuracies: 2 }
      };

      setActiveGame(newGame);
      setTotalMoves(history.length);
      setCurrentMoveIndex(history.length);
      setFen(chessInstance.fen());
      updateEvalData(history.length, newGame);
      return true;
    } catch (err) {
      console.error('Failed to parse PGN:', err);
      return false;
    }
  };

  const loadFen = (fenString: string): boolean => {
    try {
      chessInstance.load(fenString);
      setFen(chessInstance.fen());
      setTotalMoves(0);
      setCurrentMoveIndex(0);
      setEvalScore(0.0);
      setEngineRecommendation('Analyze Position');
      setEngineFeedback('Custom FEN loaded successfully.');
      return true;
    } catch (err) {
      console.error('Failed to parse FEN:', err);
      return false;
    }
  };

  const goToStep = (stepIndex: number) => {
    const history = chessInstance.history({ verbose: true });
    const clampedIndex = Math.max(0, Math.min(stepIndex, history.length));
    
    // Rebuild position
    const tempChess = new Chess();
    for (let i = 0; i < clampedIndex; i++) {
      tempChess.move(history[i]);
    }
    
    setCurrentMoveIndex(clampedIndex);
    setFen(tempChess.fen());
    updateEvalData(clampedIndex, activeGame);
  };

  const nextMove = () => {
    const history = chessInstance.history({ verbose: true });
    if (currentMoveIndex < history.length) {
      goToStep(currentMoveIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const prevMove = () => {
    if (currentMoveIndex > 0) {
      goToStep(currentMoveIndex - 1);
    }
  };

  const firstMove = () => {
    goToStep(0);
  };

  const lastMove = () => {
    const history = chessInstance.history({ verbose: true });
    goToStep(history.length);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const flipBoard = () => {
    setBoardOrientation((prev) => (prev === 'white' ? 'black' : 'white'));
  };

  const makeMove = (source: string, target: string): boolean => {
    try {
      const move = chessInstance.move({
        from: source,
        to: target,
        promotion: 'q',
      });

      if (move) {
        setFen(chessInstance.fen());
        const history = chessInstance.history({ verbose: true });
        setTotalMoves(history.length);
        setCurrentMoveIndex(history.length);
        updateEvalData(history.length, activeGame);
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  };

  const updateEvalData = (stepIndex: number, game: GameSummary) => {
    // Dynamic simulated engine evaluation score based on move step
    if (stepIndex === 0) {
      setEvalScore(+0.20);
      setEngineRecommendation('e4 / d4');
      setEngineFeedback('Equal opening position. Control the center squares e4 & d4.');
      return;
    }

    const isNearEnd = stepIndex > totalMoves - 4;
    if (game.result === 'win' && isNearEnd) {
      setEvalScore(+3.85);
      setEngineRecommendation('Rxe7!');
      setEngineFeedback('White is winning (+3.85). Decisive tactical advantage with checkmate threat.');
    } else if (game.result === 'loss' && isNearEnd) {
      setEvalScore(-2.75);
      setEngineRecommendation('Bf5');
      setEngineFeedback('Black is under severe pressure (-2.75). Defense required against back-rank mate.');
    } else {
      const dynamicEval = +(Math.sin(stepIndex * 0.4) * 0.8 + 0.45).toFixed(2);
      setEvalScore(dynamicEval);
      setEngineRecommendation(dynamicEval > 0 ? 'Nf4' : 'Rad8');
      setEngineFeedback(`Engine evaluation: ${dynamicEval > 0 ? '+' : ''}${dynamicEval}. Solid positional control.`);
    }
  };

  // Auto-play timer loop
  useEffect(() => {
    if (isPlaying) {
      autoPlayTimerRef.current = window.setInterval(() => {
        nextMove();
      }, 1200);
    } else if (autoPlayTimerRef.current) {
      window.clearInterval(autoPlayTimerRef.current);
    }

    return () => {
      if (autoPlayTimerRef.current) window.clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, currentMoveIndex]);

  return (
    <GameContext.Provider
      value={{
        activeGame,
        chessInstance,
        fen,
        currentMoveIndex,
        totalMoves,
        isPlaying,
        boardOrientation,
        evalScore,
        engineRecommendation,
        engineFeedback,
        loadGame,
        loadPgn,
        loadFen,
        goToStep,
        nextMove,
        prevMove,
        firstMove,
        lastMove,
        togglePlay,
        flipBoard,
        makeMove,
        isQuickImportOpen,
        openQuickImport: () => setIsQuickImportOpen(true),
        closeQuickImport: () => setIsQuickImportOpen(false),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
