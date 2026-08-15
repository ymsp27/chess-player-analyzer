# Chess Player Analyzer Backend

## 1. Create and activate a virtual environment

PowerShell:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, you can run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

## 2. Install dependencies

```powershell
pip install -r requirements.txt
```

## 3. Configure Stockfish

The code has a Windows default path in `main.py`.

Better: set the environment variable:

```powershell
$env:STOCKFISH_PATH="F:\project_chess\stockfish-windows-x86-64-avx2\stockfish\stockfish.exe"
```

Verify:

```powershell
Test-Path $env:STOCKFISH_PATH
```

It should print:

```text
True
```

## 4. Start API

```powershell
python -m uvicorn main:app --reload
```

Open:

```text
http://127.0.0.1:8000
```

Swagger UI:

```text
http://127.0.0.1:8000/docs
```

## Endpoints

### GET /

Checks that the API is running.

### GET /health

Checks whether the configured Stockfish executable exists.

### POST /analyze-position

Form fields:

- `fen`
- `depth`

Example FEN:

```text
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
```

### POST /analyze

Accepts a PGN file or PGN form field.

### POST /analyze-image

Accepts PNG/JPG/JPEG.

Important: image recognition is an initial template-based implementation. Add the 12 piece templates described in `vision/piece_detector.py`.

## Development roadmap

1. Test Stockfish.
2. Test FEN endpoint.
3. Test PGN analysis.
4. Add board screenshots.
5. Add matching piece templates.
6. Improve board/piece detection for specific chess websites.
7. Add move history/game reconstruction.
8. Add richer player scoring.
