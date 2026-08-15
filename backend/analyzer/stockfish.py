import chess
import chess.engine


class StockfishAnalyzer:
    def __init__(self, stockfish_path: str):
        self.engine = chess.engine.SimpleEngine.popen_uci(stockfish_path)

    @staticmethod
    def score_to_pawns(score: chess.engine.PovScore) -> float:
        value = score.score(mate_score=10000)
        return round(value / 100.0, 2)

    def analyze_position(self, board: chess.Board, depth: int = 15):
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
        }

    def analyze_game(self, game: chess.pgn.Game, depth: int = 15):
        board = game.board()
        results = []

        for move_number, move in enumerate(game.mainline_moves(), start=1):
            before = self.engine.analyse(
                board,
                chess.engine.Limit(depth=depth),
            )

            best_move = before["pv"][0]
            best_move_san = board.san(best_move)
            played_move_san = board.san(move)

            before_score = before["score"].pov(board.turn)
            best_eval = self.score_to_pawns(before_score)

            player = "White" if board.turn == chess.WHITE else "Black"

            board.push(move)

            after = self.engine.analyse(
                board,
                chess.engine.Limit(depth=depth),
            )
            after_score = after["score"].pov(not board.turn)
            played_eval = self.score_to_pawns(after_score)

            # Difference from the player's perspective.
            centipawn_loss = max(
                0.0,
                round((best_eval - played_eval) * 100, 1),
            )

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
            })

        return results

    def close(self):
        if self.engine:
            self.engine.quit()
            self.engine = None
