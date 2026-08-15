from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import chess
import chess.pgn
import chess.engine
import io
import os
import tempfile

from analyzer.stockfish import StockfishAnalyzer
from analyzer.game_phase import classify_game_phase
from analyzer.player_analysis import analyze_moves
from vision.board_detector import detect_board
from vision.piece_detector import image_to_fen

app = FastAPI(title="Chess Player Analyzer API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

STOCKFISH_PATH = os.getenv(
    "STOCKFISH_PATH",
    r"F:\project_chess\stockfish-windows-x86-64-avx2\stockfish\stockfish-windows-x86-64-avx2.exe",
)


@app.get("/")
def home():
    return {
        "message": "Chess Player Analysis API running",
        "endpoints": [
            "/health",
            "/analyze-position",
            "/analyze",
            "/analyze-image",
        ],
    }


@app.get("/health")
def health():
    return {
        "api": True,
        "stockfish_path": STOCKFISH_PATH,
        "stockfish_exists": os.path.exists(STOCKFISH_PATH),
    }


def get_analyzer():
    return StockfishAnalyzer(STOCKFISH_PATH)


@app.post("/analyze-position")
async def analyze_position(fen: str = Form(...), depth: int = Form(15)):
    try:
        board = chess.Board(fen)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid FEN")

    depth = max(8, min(depth, 22))
    analyzer = get_analyzer()

    try:
        result = analyzer.analyze_position(board, depth=depth)
    finally:
        analyzer.close()

    return {
        "success": True,
        "fen": fen,
        "game_phase": classify_game_phase(board),
        **result,
    }


@app.post("/analyze")
async def analyze_game(
    file: UploadFile = File(None),
    pgn: str = Form(None),
    depth: int = Form(15),
):
    if file:
        content = await file.read()
        try:
            pgn = content.decode("utf-8")
        except UnicodeDecodeError:
            raise HTTPException(status_code=400, detail="PGN must be UTF-8 text")

    if not pgn or not pgn.strip():
        raise HTTPException(status_code=400, detail="PGN is required")

    stream = io.StringIO(pgn)
    raw_games = []
    while True:
        try:
            g = chess.pgn.read_game(stream)
            if g is None:
                break
            raw_games.append(g)
        except Exception:
            break

    if not raw_games:
        raise HTTPException(status_code=400, detail="Could not read valid chess games from PGN")

    depth = max(8, min(depth, 22))
    analyzer = get_analyzer()

    analyzed_games = []

    try:
        for idx, game in enumerate(raw_games, start=1):
            moves = analyzer.analyze_game(game, depth=depth)
            summary = analyze_moves(moves)

            date = game.headers.get("Date", "")
            utc_date = game.headers.get("UTCDate", "")
            utc_time = game.headers.get("UTCTime", "")
            time_val = game.headers.get("Time", "")
            time_control = game.headers.get("TimeControl", "")

            # Formatted readable timestamp
            formatted_timestamp = f"{utc_date or date} {utc_time or time_val}".strip()
            if not formatted_timestamp or formatted_timestamp == "????.??.??":
                formatted_timestamp = date or "Unknown Date"

            analyzed_games.append({
                "game_index": idx,
                "white": game.headers.get("White", "White Player"),
                "black": game.headers.get("Black", "Black Player"),
                "white_elo": game.headers.get("WhiteElo", ""),
                "black_elo": game.headers.get("BlackElo", ""),
                "white_title": game.headers.get("WhiteTitle", ""),
                "black_title": game.headers.get("BlackTitle", ""),
                "result": game.headers.get("Result", "*"),
                "event": game.headers.get("Event", "Chess Game"),
                "site": game.headers.get("Site", "Online"),
                "date": date,
                "utc_date": utc_date,
                "utc_time": utc_time,
                "timestamp": formatted_timestamp,
                "time_control": time_control,
                "eco": game.headers.get("ECO", ""),
                "summary": summary,
                "moves": moves,
            })
    finally:
        analyzer.close()

    # Primary game is the first game
    primary = analyzed_games[0]

    return {
        "success": True,
        "total_games": len(analyzed_games),
        "games": analyzed_games,
        "primary_game": primary,
        # Backward compatibility fields for single game response
        "white": primary["white"],
        "black": primary["black"],
        "result": primary["result"],
        "timestamp": primary["timestamp"],
        "summary": primary["summary"],
        "moves": primary["moves"],
    }


@app.post("/analyze-image")
async def analyze_image(
    file: UploadFile = File(...),
    depth: int = Form(15),
):
    if file.content_type not in {"image/png", "image/jpeg", "image/jpg"}:
        raise HTTPException(
            status_code=400,
            detail="Only PNG and JPG/JPEG images are supported",
        )

    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Empty image")

    try:
        board_info = detect_board(image_bytes)
        fen, piece_map = image_to_fen(board_info["board_image"])
        board = chess.Board(fen)
    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=f"Could not detect chess position from image: {exc}",
        )

    depth = max(8, min(depth, 22))
    analyzer = get_analyzer()

    try:
        result = analyzer.analyze_position(board, depth=depth)
    finally:
        analyzer.close()

    return {
        "success": True,
        "filename": file.filename,
        "fen": fen,
        "pieces": piece_map,
        "game_phase": classify_game_phase(board),
        "note": (
            "Image mode currently detects the board and uses template-based "
            "piece recognition. It works best with the included piece templates."
        ),
        **result,
    }
