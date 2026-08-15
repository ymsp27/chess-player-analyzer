export type MoveAccuracy = 'brilliant' | 'great' | 'best' | 'excellent' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';

export interface MoveRecord {
  moveNumber: number;
  white: {
    san: string;
    fen: string;
    eval: number; // e.g. +0.45
    accuracy?: MoveAccuracy;
    comment?: string;
  };
  black?: {
    san: string;
    fen: string;
    eval: number;
    accuracy?: MoveAccuracy;
    comment?: string;
  };
}

export interface CriticalMoment {
  id: string;
  gameId: string;
  opponent: string;
  moveNumber: number;
  playerColor: 'white' | 'black';
  moveSan: string;
  accuracy: MoveAccuracy;
  evalBefore: number;
  evalAfter: number;
  evalDrop: string; // e.g. "-2.34"
  explanation: string;
  fen: string;
  bestAlternative: string;
}

export interface GameSummary {
  id: string;
  opponent: {
    name: string;
    rating: number;
    avatar?: string;
    title?: string;
  };
  playerColor: 'white' | 'black';
  timeControl: string; // e.g. "3+2 Blitz" | "10+0 Rapid" | "5+3 Blitz"
  type: 'blitz' | 'rapid' | 'bullet' | 'classical';
  date: string;
  result: 'win' | 'loss' | 'draw';
  resultReason: string; // e.g. "Resignation", "Checkmate", "Timeout", "Repetition"
  playerAccuracy: number;
  opponentAccuracy: number;
  ratingChange: number; // e.g. +8, -12
  pgn: string;
  fen: string;
  moves: MoveRecord[];
  criticalMomentsCount: {
    blunders: number;
    mistakes: number;
    inaccuracies: number;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  rating: number;
  ratingChange30Days: number;
  tier: string; // e.g. "Diamond I"
  winRate: number;
  accuracyAvg: number;
  blunderRate: number;
  gamesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  openingAccuracy: number;
  middlegameAccuracy: number;
  endgameAccuracy: number;
  biggestStrength: {
    title: string;
    description: string;
    stat: string;
  };
  topImprovementArea: {
    title: string;
    description: string;
    stat: string;
  };
}

export type TimeFilter = '7d' | '30d' | '90d' | 'all';
export type ViewTab = 'overview' | 'board' | 'games' | 'performance';
