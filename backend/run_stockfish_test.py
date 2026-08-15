import os
import chess
import chess.engine

STOCKFISH_PATH = os.getenv("STOCKFISH_PATH", r"C:\stockfish\stockfish.exe")

def main():
    if not os.path.exists(STOCKFISH_PATH):
        print(f"Stockfish executable not found at: {STOCKFISH_PATH}")
        print("Please configure STOCKFISH_PATH environment variable.")
        return

    print(f"Starting Stockfish from: {STOCKFISH_PATH}")
    try:
        engine = chess.engine.SimpleEngine.popen_uci(STOCKFISH_PATH)
        board = chess.Board()
        result = engine.analyse(board, chess.engine.Limit(depth=15))
        print("Best move:", board.san(result["pv"][0]))
        print("Evaluation:", result["score"])
        engine.quit()
    except Exception as e:
        print(f"Error testing Stockfish: {e}")

if __name__ == "__main__":
    main()