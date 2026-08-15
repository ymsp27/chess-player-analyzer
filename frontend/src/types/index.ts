export type MoveAccuracy = 'brilliant' | 'great' | 'best' | 'excellent' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';

export interface PositionAnalysis {
  fen: string;
  evalScore: number;
  bestMove: string;
  pvLines: string[];
  explanation: string;
}
