import os
import chess
from analyzer.stockfish import StockfishAnalyzer

STOCKFISH_PATH = os.getenv(
    "STOCKFISH_PATH",
    r"F:\project_chess\stockfish-windows-x86-64-avx2\stockfish\stockfish.exe",
)


def main():
    if not os.path.exists(STOCKFISH_PATH):
        print("Stockfish not found:")
        print(STOCKFISH_PATH)
        return

    board = chess.Board()
    analyzer = StockfishAnalyzer(STOCKFISH_PATH)

    try:
        result = analyzer.analyze_position(board, depth=15)
        print("Best move:", result["best_move"])
        print("Evaluation:", result["evaluation"])
        print("Mate:", result["mate"])
    finally:
        analyzer.close()


if __name__ == "__main__":
    main()
