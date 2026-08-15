import chess
import chess.engine

STOCKFISH_PATH = r"C:\stockfish\stockfish.exe"

engine = chess.engine.SimpleEngine.popen_uci(
    STOCKFISH_PATH
)

board = chess.Board()

result = engine.analyse(
    board,
    chess.engine.Limit(depth=15)
)

print("Best move:", board.san(result["pv"][0]))
print("Evaluation:", result["score"])

engine.quit()