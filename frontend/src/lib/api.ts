const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface HealthResponse {
  api: boolean;
  stockfish_path: string;
  stockfish_exists: boolean;
}

export interface PositionAnalysisResponse {
  success: boolean;
  fen: string;
  best_move: string;
  evaluation: number;
  mate?: number | null;
  game_phase?: string;
  filename?: string;
  note?: string;
}

export interface GameMoveAnalysis {
  move_number: number;
  player: string;
  move: string;
  best_move: string;
  best_evaluation: number;
  played_evaluation: number;
  centipawn_loss: number;
  classification: 'Good' | 'Dubious' | 'Inaccuracy' | 'Mistake' | 'Blunder';
  clock?: string;
  clock_seconds?: number | null;
  time_spent?: number | null;
}

export interface SingleGameAnalysis {
  game_index: number;
  white: string;
  black: string;
  white_elo?: string;
  black_elo?: string;
  white_title?: string;
  black_title?: string;
  result: string;
  event?: string;
  site?: string;
  date?: string;
  utc_date?: string;
  utc_time?: string;
  timestamp?: string;
  time_control?: string;
  eco?: string;
  summary: {
    total_moves: number;
    accuracy: number;
    good_moves: number;
    dubious: number;
    inaccuracies: number;
    mistakes: number;
    blunders: number;
    average_centipawn_loss: number;
    white_accuracy?: number;
    black_accuracy?: number;
    white_acl?: number;
    black_acl?: number;
  };
  moves: GameMoveAnalysis[];
}

export interface GameAnalysisResponse {
  success: boolean;
  total_games?: number;
  games?: SingleGameAnalysis[];
  primary_game?: SingleGameAnalysis;
  white?: string;
  black?: string;
  result?: string;
  timestamp?: string;
  summary: SingleGameAnalysis['summary'];
  moves: GameMoveAnalysis[];
}

export async function checkBackendHealth(): Promise<HealthResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function analyzeImageApi(file: File, depth = 15): Promise<PositionAnalysisResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('depth', depth.toString());

  const res = await fetch(`${API_BASE_URL}/analyze-image`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: 'Image analysis failed' }));
    throw new Error(errorData.detail || 'Failed to analyze chessboard image');
  }

  return await res.json();
}

export async function analyzePositionApi(fen: string, depth = 15): Promise<PositionAnalysisResponse> {
  const formData = new FormData();
  formData.append('fen', fen);
  formData.append('depth', depth.toString());

  const res = await fetch(`${API_BASE_URL}/analyze-position`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: 'Position analysis failed' }));
    throw new Error(errorData.detail || 'Invalid FEN or analysis failure');
  }

  return await res.json();
}

export async function analyzePgnApi(pgn: string, depth = 15): Promise<GameAnalysisResponse> {
  const formData = new FormData();
  formData.append('pgn', pgn);
  formData.append('depth', depth.toString());

  const res = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: 'PGN game analysis failed' }));
    throw new Error(errorData.detail || 'Could not analyze chess PGN game');
  }

  return await res.json();
}
