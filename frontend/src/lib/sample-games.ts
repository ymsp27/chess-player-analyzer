import { GameSummary, UserProfile, CriticalMoment } from '../types';

export const CURRENT_USER: UserProfile = {
  id: 'user_ananya_1850',
  name: 'Ananya R.',
  username: 'ananya_chess',
  email: 'ananya.r@chessanalytica.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
  rating: 1850,
  ratingChange30Days: 24,
  tier: 'Diamond I',
  winRate: 56.3,
  accuracyAvg: 78.6,
  blunderRate: 2.1,
  gamesPlayed: 142,
  wins: 80,
  draws: 32,
  losses: 30,
  openingAccuracy: 81.2,
  middlegameAccuracy: 76.4,
  endgameAccuracy: 67.1,
  biggestStrength: {
    title: 'Tactical Awareness',
    description: 'Found 94.2% of winning tactical forks & pins in middlegame positions over the last 30 games.',
    stat: '94.2% Precision'
  },
  topImprovementArea: {
    title: 'Endgame Conversion',
    description: 'Rook & Pawn endgame accuracy drops to 67.1%. Converting clean +2.0 winning endgames has a 14% blunder rate.',
    stat: '-14.1% below 1900 benchmark'
  }
};

export const RATING_HISTORY_DATA = [
  { date: 'Jul 15', rating: 1826, peak: 1830 },
  { date: 'Jul 18', rating: 1818, peak: 1830 },
  { date: 'Jul 21', rating: 1832, peak: 1832 },
  { date: 'Jul 24', rating: 1829, peak: 1832 },
  { date: 'Jul 27', rating: 1841, peak: 1841 },
  { date: 'Jul 30', rating: 1835, peak: 1841 },
  { date: 'Aug 02', rating: 1844, peak: 1844 },
  { date: 'Aug 05', rating: 1838, peak: 1844 },
  { date: 'Aug 08', rating: 1849, peak: 1849 },
  { date: 'Aug 11', rating: 1842, peak: 1849 },
  { date: 'Aug 13', rating: 1848, peak: 1849 },
  { date: 'Aug 15', rating: 1850, peak: 1850 },
];

export const RESULTS_DONUT_DATA = [
  { name: 'Won', value: 80, color: '#10B981' },
  { name: 'Drawn', value: 32, color: '#D4AF37' },
  { name: 'Lost', value: 30, color: '#F43F5E' },
];

export const ACCURACY_PHASE_DATA = [
  { phase: 'Opening', player: 81.2, globalAvg: 78.5 },
  { phase: 'Middlegame', player: 76.4, globalAvg: 72.1 },
  { phase: 'Endgame', player: 67.1, globalAvg: 74.8 },
];

export const MISTAKE_BREAKDOWN_DATA = [
  { label: 'Blunders (??)', count: 2, color: '#F43F5E', percentage: 14.2 },
  { label: 'Mistakes (?)', count: 5, color: '#F97316', percentage: 35.7 },
  { label: 'Inaccuracies (!?)', count: 7, color: '#EAB308', percentage: 50.1 },
];

export const CRITICAL_MOMENTS_DATA: CriticalMoment[] = [
  {
    id: 'cm-1',
    gameId: 'game-1',
    opponent: 'Grandmaster_Alex (1875)',
    moveNumber: 19,
    playerColor: 'black',
    moveSan: 'Qxd5??',
    accuracy: 'blunder',
    evalBefore: +0.45,
    evalAfter: -2.34,
    evalDrop: '-2.79',
    explanation: 'Overlooked the tactical pin along the d-file! 19... Rad8 was essential to maintain equal counterplay.',
    fen: 'r3r1k1/pp3ppp/8/3q4/3N2b1/P1P1P3/1P1Q2PP/4RRK1 b - - 0 19',
    bestAlternative: '19... Rad8'
  },
  {
    id: 'cm-2',
    gameId: 'game-1',
    opponent: 'Grandmaster_Alex (1875)',
    moveNumber: 27,
    playerColor: 'white',
    moveSan: 'Rxe7!',
    accuracy: 'great',
    evalBefore: +1.10,
    evalAfter: +3.85,
    evalDrop: '+2.75',
    explanation: 'Brilliant exchange sacrifice that collapses Black’s back-rank defense and forces a winning endgame.',
    fen: '4r1k1/4Rppp/1p6/8/8/1P3P2/P5PP/6K1 w - - 0 27',
    bestAlternative: '27. Rxe7'
  },
  {
    id: 'cm-3',
    gameId: 'game-3',
    opponent: 'Tactician_Zero (1840)',
    moveNumber: 14,
    playerColor: 'white',
    moveSan: 'Nxh7!!',
    accuracy: 'brilliant',
    evalBefore: +0.20,
    evalAfter: +4.15,
    evalDrop: '+3.95',
    explanation: 'Greek Gift sacrifice! Disables Black King’s safety cover and leads to forced checkmate in 6 moves.',
    fen: 'r1bq1rk1/pp1nbppp/4p3/2ppP3/3P4/2PB1N2/P1P2PPP/R1BQ1RK1 w - - 0 14',
    bestAlternative: '14. Bxh7+'
  },
  {
    id: 'cm-4',
    gameId: 'game-4',
    opponent: 'Endgame_Wizard (1890)',
    moveNumber: 34,
    playerColor: 'white',
    moveSan: 'Kd4?',
    accuracy: 'mistake',
    evalBefore: +1.80,
    evalAfter: +0.00,
    evalDrop: '-1.80',
    explanation: 'Premature King advance allows Black to seize the opposition with 34... Kd6, letting a won pawn endgame slip into a draw.',
    fen: '8/8/4k3/8/3K4/8/8/8 w - - 0 34',
    bestAlternative: '34. Ke4!'
  }
];

export const SAMPLE_GAMES: GameSummary[] = [
  {
    id: 'game-1',
    opponent: {
      name: 'Grandmaster_Alex',
      rating: 1875,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      title: 'CM'
    },
    playerColor: 'white',
    timeControl: '3+2 Blitz',
    type: 'blitz',
    date: 'Today, 14:20',
    result: 'win',
    resultReason: 'Resignation',
    playerAccuracy: 89.4,
    opponentAccuracy: 74.2,
    ratingChange: 12,
    pgn: `[Event "Live Chess Analytica Rated Match"]
[Site "ChessAnalytica.io"]
[Date "2026.08.15"]
[White "Ananya R."]
[Black "Grandmaster_Alex"]
[Result "1-0"]
[ECO "B07"]
[WhiteElo "1850"]
[BlackElo "1875"]

1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Be3 c6 5. Qd2 b5 6. f3 Nbd7 7. Nge2 Nb6 8. b3 Bg7 9. Bh6 Bxh6 10. Qxh6 b4 11. Nd1 c5 12. d5 e6 13. dxe6 Bxe6 14. Nf4 Qe7 15. Bb5+ Bd7 16. Bxd7+ Nbxd7 17. O-O Qe5 18. Nd3 Qd4+ 19. Ne3 Ne5 20. Rae1 Nxd3 21. cxd3 O-O-O 22. Kh1 Kb8 23. Nc4 Qxd3 24. Qf4 Nh5 25. Qxf7 Rhf8 26. Qe7 Rfe8 27. Qxh7 Rh8 28. Qxg6 Rdg8 29. Qxd6+ Qxd6 30. Nxd6 Ng3+ 31. Kg1 Nxf1 32. Rxf1 Rd8 33. e5 Rh5 34. f4 1-0`,
    fen: '3r4/p7/3N4/2p1P2r/1p3P2/1P6/P5PP/5RK1 b - - 0 34',
    moves: [
      { moveNumber: 1, white: { san: 'e4', fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1', eval: 0.25, accuracy: 'best' }, black: { san: 'd6', fen: 'rnbqkbnr/ppp1pppp/3p4/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2', eval: 0.30, accuracy: 'best' } },
      { moveNumber: 2, white: { san: 'd4', fen: 'rnbqkbnr/ppp1pppp/3p4/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2', eval: 0.35, accuracy: 'best' }, black: { san: 'Nf6', fen: 'rnbqkb1r/ppp1pppp/3p1n2/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 1 3', eval: 0.35, accuracy: 'best' } },
      { moveNumber: 3, white: { san: 'Nc3', fen: 'rnbqkb1r/ppp1pppp/3p1n2/8/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 2 3', eval: 0.40, accuracy: 'best' }, black: { san: 'g6', fen: 'rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4', eval: 0.45, accuracy: 'good' } },
      { moveNumber: 4, white: { san: 'Be3', fen: 'rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N1B3/PPP2PPP/R2QKBNR b KQkq - 1 4', eval: 0.45, accuracy: 'good' }, black: { san: 'c6', fen: 'rnbqkb1r/pp2pp1p/2pp1np1/8/3PP3/2N1B3/PPP2PPP/R2QKBNR w KQkq - 0 5', eval: 0.50, accuracy: 'good' } },
      { moveNumber: 5, white: { san: 'Qd2', fen: 'rnbqkb1r/pp2pp1p/2pp1np1/8/3PP3/2N1B3/PPPQ1PPP/R3KBNR b KQkq - 1 5', eval: 0.55, accuracy: 'excellent' }, black: { san: 'b5', fen: 'rnbqkb1r/p3pp1p/2pp1np1/1p6/3PP3/2N1B3/PPPQ1PPP/R3KBNR w KQkq b6 0 6', eval: 0.40, accuracy: 'good' } },
      { moveNumber: 6, white: { san: 'f3', fen: 'rnbqkb1r/p3pp1p/2pp1np1/1p6/3PP3/2N1BP2/PPPQ2PP/R3KBNR b KQkq - 0 6', eval: 0.50, accuracy: 'best' }, black: { san: 'Nbd7', fen: 'r2qkb1r/p2npp1p/2pp1np1/1p6/3PP3/2N1BP2/PPPQ2PP/R3KBNR w KQkq - 1 7', eval: 0.55, accuracy: 'good' } },
      { moveNumber: 7, white: { san: 'Nge2', fen: 'r2qkb1r/p2npp1p/2pp1np1/1p6/3PP3/2N1BP2/PPPQN1PP/R3KB1R b KQkq - 2 7', eval: 0.60, accuracy: 'best' }, black: { san: 'Nb6', fen: 'r2qkb1r/p3pp1p/1npp1np1/1p6/3PP3/2N1BP2/PPPQN1PP/R3KB1R w KQkq - 3 8', eval: 0.65, accuracy: 'excellent' } },
      { moveNumber: 8, white: { san: 'b3', fen: 'r2qkb1r/p3pp1p/1npp1np1/1p6/3PP3/1PN1BP2/P1PQN1PP/R3KB1R b KQkq - 0 8', eval: 0.70, accuracy: 'best' }, black: { san: 'Bg7', fen: 'r2qk2r/p3ppbp/1npp1np1/1p6/3PP3/1PN1BP2/P1PQN1PP/R3KB1R w KQkq - 1 9', eval: 0.70, accuracy: 'best' } },
      { moveNumber: 9, white: { san: 'Bh6', fen: 'r2qk2r/p3ppbp/1npp1npB/1p6/3PP3/1PN2P2/P1PQN1PP/R3KB1R b KQkq - 2 9', eval: 0.85, accuracy: 'great' }, black: { san: 'Bxh6', fen: 'r2qk2r/p3pp1p/1npp1npb/1p6/3PP3/1PN2P2/P1PQN1PP/R3KB1R w KQkq - 0 10', eval: 0.85, accuracy: 'good' } },
      { moveNumber: 10, white: { san: 'Qxh6', fen: 'r2qk2r/p3pp1p/1npp1npQ/1p6/3PP3/1PN2P2/P1P1N1PP/R3KB1R b KQkq - 0 10', eval: 1.10, accuracy: 'best' }, black: { san: 'b4', fen: 'r2qk2r/p3pp1p/1npp1npQ/8/1p1PP3/1PN2P2/P1P1N1PP/R3KB1R w KQkq - 0 11', eval: 1.00, accuracy: 'inaccuracy' } },
      { moveNumber: 11, white: { san: 'Nd1', fen: 'r2qk2r/p3pp1p/1npp1npQ/8/1p1PP3/1P3P2/P1P1N1PP/R2NKB1R b KQkq - 1 11', eval: 1.15, accuracy: 'best' }, black: { san: 'c5', fen: 'r2qk2r/p3pp1p/1n1p1npQ/2p5/1p1PP3/1P3P2/P1P1N1PP/R2NKB1R w KQkq - 0 12', eval: 1.25, accuracy: 'good' } },
      { moveNumber: 12, white: { san: 'd5', fen: 'r2qk2r/p3pp1p/1n1p1npQ/2pP4/1p2P3/1P3P2/P1P1N1PP/R2NKB1R b KQkq - 0 12', eval: 1.40, accuracy: 'great' }, black: { san: 'e6', fen: 'r2qk2r/p4p1p/1n1ppnpQ/2pP4/1p2P3/1P3P2/P1P1N1PP/R2NKB1R w KQkq - 0 13', eval: 1.45, accuracy: 'good' } },
      { moveNumber: 13, white: { san: 'dxe6', fen: 'r2qk2r/p4p1p/1n1pPnpQ/2p5/1p2P3/1P3P2/P1P1N1PP/R2NKB1R b KQkq - 0 13', eval: 1.60, accuracy: 'best' }, black: { san: 'Bxe6', fen: 'r2qk2r/p4p1p/1n1pbnpQ/2p5/1p2P3/1P3P2/P1P1N1PP/R2NKB1R w KQkq - 0 14', eval: 1.65, accuracy: 'good' } },
      { moveNumber: 14, white: { san: 'Nf4', fen: 'r2qk2r/p4p1p/1n1pbnpQ/2p5/1p2PN2/1P3P2/P1P3PP/R2NKB1R b KQkq - 1 14', eval: 1.80, accuracy: 'excellent' }, black: { san: 'Qe7', fen: 'r3k2r/p3qp1p/1n1pbnpQ/2p5/1p2PN2/1P3P2/P1P3PP/R2NKB1R w KQkq - 2 15', eval: 1.90, accuracy: 'good' } },
      { moveNumber: 15, white: { san: 'Bb5+', fen: 'r3k2r/p3qp1p/1n1pbnpQ/1Bp5/1p2PN2/1P3P2/P1P3PP/R2NKB1R b KQkq - 3 15', eval: 2.10, accuracy: 'great' }, black: { san: 'Bd7', fen: 'r3k2r/p2bqp1p/1n1p1npQ/1Bp5/1p2PN2/1P3P2/P1P3PP/R2NKB1R w KQkq - 4 16', eval: 2.15, accuracy: 'good' } },
      { moveNumber: 16, white: { san: 'Bxd7+', fen: 'r3k2r/p2Bqp1p/1n1p1npQ/2p5/1p2PN2/1P3P2/P1P3PP/R2NKB1R b KQkq - 0 16', eval: 2.20, accuracy: 'best' }, black: { san: 'Nbxd7', fen: 'r3k2r/p2nqp1p/1p1p1npQ/2p5/1p2PN2/1P3P2/P1P3PP/R2NKB1R w KQkq - 0 17', eval: 2.25, accuracy: 'good' } },
      { moveNumber: 17, white: { san: 'O-O', fen: 'r3k2r/p2nqp1p/1p1p1npQ/2p5/1p2PN2/1P3P2/P1P3PP/R2N1RK1 b kq - 1 17', eval: 2.40, accuracy: 'best' }, black: { san: 'Qe5', fen: 'r3k2r/p2n1p1p/1p1p1npQ/2p1q3/1p2PN2/1P3P2/P1P3PP/R2N1RK1 w kq - 2 18', eval: 2.30, accuracy: 'excellent' } },
      { moveNumber: 18, white: { san: 'Nd3', fen: 'r3k2r/p2n1p1p/1p1p1npQ/2p1q3/1p2P3/1P1N1P2/P1P3PP/R4RK1 b kq - 3 18', eval: 2.65, accuracy: 'great' }, black: { san: 'Qd4+', fen: 'r3k2r/p2n1p1p/1p1p1npQ/2p5/1p1qp3/1P1N1P2/P1P3PP/R4RK1 w kq - 4 19', eval: 2.50, accuracy: 'good' } },
      { moveNumber: 19, white: { san: 'Nd3', fen: 'r3k2r/p2n1p1p/1p1p1npQ/2p5/1p1qp3/1P1N1P2/P1P3PP/R4RK1 w kq - 4 19', eval: 2.70, accuracy: 'best' }, black: { san: 'Qxd5??', fen: 'r3r1k1/pp3ppp/8/3q4/3N2b1/P1P1P3/1P1Q2PP/4RRK1 b - - 0 19', eval: -2.34, accuracy: 'blunder' } },
      { moveNumber: 27, white: { san: 'Rxe7!', fen: '4r1k1/4Rppp/1p6/8/8/1P3P2/P5PP/6K1 w - - 0 27', eval: 3.85, accuracy: 'brilliant' }, black: { san: 'Rxe7', fen: '4r1k1/4rppp/1p6/8/8/1P3P2/P5PP/6K1 w - - 0 28', eval: 4.20, accuracy: 'best' } }
    ],
    criticalMomentsCount: { blunders: 0, mistakes: 1, inaccuracies: 2 }
  },
  {
    id: 'game-2',
    opponent: {
      name: 'Deep Blue (IBM 1997)',
      rating: 2850,
      avatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=150',
      title: 'ENGINE'
    },
    playerColor: 'black',
    timeControl: '90+30 Classical',
    type: 'classical',
    date: 'Yesterday, 18:00',
    result: 'loss',
    resultReason: 'Resignation',
    playerAccuracy: 64.8,
    opponentAccuracy: 98.1,
    ratingChange: -8,
    pgn: `[Event "IBM Man-Machine Soviet World Championship"]
[Site "New York, NY USA"]
[Date "1997.05.11"]
[White "Deep Blue"]
[Black "Kasparov Garry"]
[Result "1-0"]

1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nd7 5. Ng5 Ngf6 6. Bd3 e6 7. N1f3 h6 8. Nxe6 Qe7 9. O-O fxe6 10. Bg6+ Kd8 11. Bf4 b5 12. a4 Bb7 13. Re1 Nd5 14. Bg3 Kc8 15. axb5 cxb5 16. Qd3 Bc6 17. Bf5 exf5 18. Rxe7 Bxe7 19. c4 1-0`,
    fen: '2k4r/p3b1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - - 0 19',
    moves: [
      { moveNumber: 1, white: { san: 'e4', fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1', eval: 0.25 }, black: { san: 'c6', fen: 'rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2', eval: 0.30 } },
      { moveNumber: 2, white: { san: 'd4', fen: 'rnbqkbnr/pp1ppppp/2p5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2', eval: 0.35 }, black: { san: 'd5', fen: 'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3', eval: 0.35 } }
    ],
    criticalMomentsCount: { blunders: 2, mistakes: 3, inaccuracies: 4 }
  },
  {
    id: 'game-3',
    opponent: {
      name: 'Tactician_Zero',
      rating: 1840,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      title: 'FM'
    },
    playerColor: 'white',
    timeControl: '5+3 Blitz',
    type: 'blitz',
    date: '14 Aug 2026',
    result: 'win',
    resultReason: 'Checkmate',
    playerAccuracy: 84.1,
    opponentAccuracy: 71.0,
    ratingChange: 14,
    pgn: `[Event "Blitz Cup"]\n1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6 9. Bc4 Bd7 10. O-O-O Ne5 11. Bb3 Rc8 12. h4 h5 13. Bg5 Rc5 14. g4 hxg4 15. f4 Nc4 16. Qe2 b5 17. f5 gxf5 18. exf5 Re5 19. Qg2 Ne3 20. Bxe3 Rxe3 1-0`,
    fen: '2bq1rk1/p3ppb1/3p1n2/1p3P2/3N2pP/1BN1r3/PPP3Q1/2KR3R w - - 0 21',
    moves: [],
    criticalMomentsCount: { blunders: 0, mistakes: 1, inaccuracies: 1 }
  },
  {
    id: 'game-4',
    opponent: {
      name: 'Endgame_Wizard',
      rating: 1890,
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150'
    },
    playerColor: 'white',
    timeControl: '10+0 Rapid',
    type: 'rapid',
    date: '12 Aug 2026',
    result: 'draw',
    resultReason: 'Stalemate / Insufficient Material',
    playerAccuracy: 79.5,
    opponentAccuracy: 80.2,
    ratingChange: 0,
    pgn: `[Event "Rapid Arena"]\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 1/2-1/2`,
    fen: 'r1bq1rk1/2pnbppp/p2p1n2/1p2p3/3PP3/1BP2N1P/PP3PP1/RNBQR1K1 w - - 0 11',
    moves: [],
    criticalMomentsCount: { blunders: 0, mistakes: 2, inaccuracies: 3 }
  },
  {
    id: 'game-5',
    opponent: {
      name: 'Blitz_King99',
      rating: 1820,
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150'
    },
    playerColor: 'black',
    timeControl: '3+0 Blitz',
    type: 'blitz',
    date: '10 Aug 2026',
    result: 'loss',
    resultReason: 'Timeout',
    playerAccuracy: 71.2,
    opponentAccuracy: 78.4,
    ratingChange: -6,
    pgn: `[Event "Midnight Blitz"]\n1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Qc2 c6 0-1`,
    fen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p2B1/2PP4/2N1PN2/PPQ2PPP/R3KB1R w KQ - 0 8',
    moves: [],
    criticalMomentsCount: { blunders: 1, mistakes: 2, inaccuracies: 2 }
  }
];

export const SAMPLE_PRESETS = [
  {
    name: "Ananya R. vs Grandmaster_Alex (Scandinavian Defense)",
    description: "Recent 1850 Blitz win featuring brilliant tactical rook exchange.",
    pgn: SAMPLE_GAMES[0].pgn,
    fen: SAMPLE_GAMES[0].fen
  },
  {
    name: "Kasparov vs Deep Blue (Game 6, 1997)",
    description: "The historic match where Deep Blue sacrificed a knight on e6.",
    pgn: SAMPLE_GAMES[1].pgn,
    fen: SAMPLE_GAMES[1].fen
  },
  {
    name: "Tactical Greek Gift Sacrifice (Attacking Masterpiece)",
    description: "14. Nxh7!! double sacrifice crushing Black's kingside pawn castle.",
    pgn: `[Event "Attacking Demo"]\n1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. e5 Nfd7 5. Nf3 c5 6. dxc5 Nc6 7. Bf4 Bxc5 8. Bd3 f6 9. exf6 Nxf6 10. O-O O-O 11. Ne5 Bd7 12. Qe2 Qe7 13. Rae1 Rae8 14. Nxh7!!`,
    fen: 'r1bq1rk1/pp1nbppp/4p3/2ppP3/3P4/2PB1N2/P1P2PPP/R1BQ1RK1 w - - 0 14'
  }
];
