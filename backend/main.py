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
    if not os.path.exists(STOCKFISH_PATH):
        raise HTTPException(
            status_code=500,
            detail=f"Stockfish not found: {STOCKFISH_PATH}",
        )
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

    if not pgn:
        raise HTTPException(status_code=400, detail="PGN is required")

    try:
        game = chess.pgn.read_game(io.StringIO(pgn))
        if game is None:
            raise ValueError("Invalid PGN")
    except Exception:
        raise HTTPException(status_code=400, detail="Could not read chess game")

    depth = max(8, min(depth, 22))
    analyzer = get_analyzer()

    try:
        moves = analyzer.analyze_game(game, depth=depth)
    finally:
        analyzer.close()

    summary = analyze_moves(moves)

    return {
        "success": True,
        "white": game.headers.get("White"),
        "black": game.headers.get("Black"),
        "result": game.headers.get("Result"),
        "summary": summary,
        "moves": moves,
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
