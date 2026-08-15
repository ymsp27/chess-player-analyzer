import io
import os
import chess
import chess.pgn
from analyzer.stockfish import StockfishAnalyzer

STOCKFISH_PATH = os.getenv(
    "STOCKFISH_PATH",
    r"F:\project_chess\stockfish-windows-x86-64-avx2\stockfish\stockfish.exe",
)


def test_fallback_analyzer():
    # When initialized without path, it should fallback to Python Material Engine
    analyzer = StockfishAnalyzer()
    assert not analyzer.is_stockfish_active

    board = chess.Board()
    result = analyzer.analyze_position(board, depth=5)
    assert result["best_move"] is not None
    assert result["engine_type"] == "Python Material Engine (Stockfish Standby)"
    assert result["evaluation"] is not None
    analyzer.close()


def test_fallback_game_analysis():
    analyzer = StockfishAnalyzer()
    # Create a simple game: 1. e4 e5
    pgn_data = "1. e4 e5"
    game = chess.pgn.read_game(io.StringIO(pgn_data))
    assert game is not None

    results = analyzer.analyze_game(game, depth=5)
    assert len(results) == 2
    assert results[0]["move"] == "e4"
    assert results[1]["move"] == "e5"
    analyzer.close()


def test_stockfish_configured():
    # Only test if stockfish binary exists
    if not os.path.exists(STOCKFISH_PATH):
        return

    analyzer = StockfishAnalyzer(STOCKFISH_PATH)
    assert analyzer.is_stockfish_active

    board = chess.Board()
    result = analyzer.analyze_position(board, depth=5)
    assert result["engine_type"] == "Stockfish 16"
    assert result["best_move"] is not None
    analyzer.close()
