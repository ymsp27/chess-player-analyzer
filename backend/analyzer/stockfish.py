import os
import shutil
import chess
import chess.engine

PIECE_VALUES = {
    chess.PAWN: 1.0,
    chess.KNIGHT: 3.0,
    chess.BISHOP: 3.2,
    chess.ROOK: 5.0,
    chess.QUEEN: 9.0,
    chess.KING: 0.0,
}


def evaluate_board_fallback(board: chess.Board) -> float:
    """Fallback material & mobility evaluation when Stockfish binary is unavailable."""
    if board.is_checkmate():
        return -99.0 if board.turn == chess.WHITE else 99.0
    if board.is_stalemate() or board.is_insufficient_material():
        return 0.0

    score = 0.0
    for square, piece in board.piece_map().items():
        val = PIECE_VALUES.get(piece.piece_type, 0.0)
        if piece.color == chess.WHITE:
            score += val
        else:
            score -= val

    # Add minor mobility weight
    legal_moves_count = len(list(board.legal_moves))
    score += (0.05 * legal_moves_count) if board.turn == chess.WHITE else (-0.05 * legal_moves_count)

    pov_score = score if board.turn == chess.WHITE else -score
    return round(pov_score, 2)


class StockfishAnalyzer:
    def __init__(self, stockfish_path: str = None):
        self.engine = None
        self.is_stockfish_active = False

        # Attempt to find valid Stockfish binary
        possible_paths = []
        if stockfish_path:
            possible_paths.append(stockfish_path)
        env_path = os.getenv("STOCKFISH_PATH")
        if env_path:
            possible_paths.append(env_path)
        system_path = shutil.which("stockfish") or shutil.which("stockfish.exe")
        if system_path:
            possible_paths.append(system_path)

        for path in possible_paths:
            if path and os.path.exists(path):
                try:
                    self.engine = chess.engine.SimpleEngine.popen_uci(path)
                    self.is_stockfish_active = True
                    break
                except Exception as err:
                    print(f"Warning: Could not start Stockfish at {path}: {err}")

    @staticmethod
    def score_to_pawns(score: chess.engine.PovScore) -> float:
        value = score.score(mate_score=10000)
        return round(value / 100.0, 2)

    def analyze_position(self, board: chess.Board, depth: int = 15):
        if self.is_stockfish_active and self.engine:
            result = self.engine.analyse(
                board,
                chess.engine.Limit(depth=depth),
            )
            best_move = result["pv"][0]
            best_move_san = board.san(best_move)
            score = result["score"].pov(board.turn)
            return {
                "best_move": best_move_san,
                "evaluation": self.score_to_pawns(score),
                "mate": score.mate(),
                "engine_type": "Stockfish 16",
            }
        else:
            # Fallback analysis
            legal_moves = list(board.legal_moves)
            best_move_san = board.san(legal_moves[0]) if legal_moves else "None"
            eval_score = evaluate_board_fallback(board)
            return {
                "best_move": best_move_san,
                "evaluation": eval_score,
                "mate": None,
                "engine_type": "Python Material Engine (Stockfish Standby)",
            }

    def analyze_game(self, game: chess.pgn.Game, depth: int = 15):
        board = game.board()
        results = []
        prev_clocks = {}

        for move_number, node in enumerate(game.mainline(), start=1):
            move = node.move
            player = "White" if board.turn == chess.WHITE else "Black"
            current_color = board.turn
            played_move_san = board.san(move)

            # Clock extraction
            clock_seconds = node.clock()
            clock_str = ""
            time_spent = None

            if clock_seconds is not None:
                mins = int(clock_seconds // 60)
                secs = int(clock_seconds % 60)
                clock_str = f"{mins}:{secs:02d}"

                if current_color in prev_clocks:
                    time_spent = round(max(0.0, prev_clocks[current_color] - clock_seconds), 1)
                prev_clocks[current_color] = clock_seconds

            if self.is_stockfish_active and self.engine:
                before = self.engine.analyse(board, chess.engine.Limit(depth=depth))
                best_move = before["pv"][0]
                best_move_san = board.san(best_move)
                before_score = before["score"].pov(board.turn)
                best_eval = self.score_to_pawns(before_score)

                board.push(move)

                after = self.engine.analyse(board, chess.engine.Limit(depth=depth))
                after_score = after["score"].pov(not board.turn)
                played_eval = self.score_to_pawns(after_score)

                centipawn_loss = max(0.0, round((best_eval - played_eval) * 100, 1))
            else:
                best_eval = evaluate_board_fallback(board)
                legal_moves = list(board.legal_moves)
                best_move_san = board.san(legal_moves[0]) if legal_moves else played_move_san

                board.push(move)

                played_eval = evaluate_board_fallback(board)
                centipawn_loss = max(0.0, round((best_eval - played_eval) * 100, 1))

            if centipawn_loss >= 200:
                classification = "Blunder"
            elif centipawn_loss >= 100:
                classification = "Mistake"
            elif centipawn_loss >= 50:
                classification = "Inaccuracy"
            elif centipawn_loss >= 20:
                classification = "Dubious"
            else:
                classification = "Good"

            results.append({
                "move_number": move_number,
                "player": player,
                "move": played_move_san,
                "best_move": best_move_san,
                "best_evaluation": best_eval,
                "played_evaluation": played_eval,
                "centipawn_loss": centipawn_loss,
                "classification": classification,
                "clock": clock_str,
                "clock_seconds": clock_seconds,
                "time_spent": time_spent,
            })

        return results

    def close(self):
        if self.engine:
            try:
                self.engine.quit()
            except Exception:
                pass
            self.engine = None
