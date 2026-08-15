import cv2
import numpy as np
from collections import OrderedDict

# This module intentionally uses template matching.
# Put 12 piece template images inside:
#
# backend/vision/templates/
#
# Names:
# white_pawn.png
# white_knight.png
# white_bishop.png
# white_rook.png
# white_queen.png
# white_king.png
# black_pawn.png
# black_knight.png
# black_bishop.png
# black_rook.png
# black_queen.png
# black_king.png
#
# The templates should be screenshots/crops from the SAME chess UI/theme
# as the screenshots you want to analyze.

PIECE_TO_FEN = {
    "white_pawn": "P",
    "white_knight": "N",
    "white_bishop": "B",
    "white_rook": "R",
    "white_queen": "Q",
    "white_king": "K",
    "black_pawn": "p",
    "black_knight": "n",
    "black_bishop": "b",
    "black_rook": "r",
    "black_queen": "q",
    "black_king": "k",
}


def load_templates(template_dir):
    templates = {}

    for name in PIECE_TO_FEN:
        path = template_dir / f"{name}.png"
        image = cv2.imread(str(path), cv2.IMREAD_GRAYSCALE)

        if image is not None:
            templates[name] = image

    return templates


def square_image(board_image, row, col):
    h, w = board_image.shape[:2]

    y1 = int(row * h / 8)
    y2 = int((row + 1) * h / 8)
    x1 = int(col * w / 8)
    x2 = int((col + 1) * w / 8)

    return board_image[y1:y2, x1:x2]


def classify_square(square, templates):
    """
    Returns (piece_name, confidence).

    If no templates exist, the square is considered empty.
    """
    if not templates:
        return None, 0.0

    gray = cv2.cvtColor(square, cv2.COLOR_BGR2GRAY)
    gray = cv2.resize(gray, (80, 80))

    best_name = None
    best_score = 0.0

    for name, template in templates.items():
        template = cv2.resize(template, (80, 80))

        # Normalize both images to reduce brightness differences.
        square_norm = cv2.normalize(gray, None, 0, 255, cv2.NORM_MINMAX)
        template_norm = cv2.normalize(
            template,
            None,
            0,
            255,
            cv2.NORM_MINMAX,
        )

        result = cv2.matchTemplate(
            square_norm,
            template_norm,
            cv2.TM_CCOEFF_NORMED,
        )

        score = float(result.max())

        if score > best_score:
            best_score = score
            best_name = name

    # Conservative threshold.
    if best_score < 0.55:
        return None, best_score

    return best_name, best_score


def image_to_fen(board_image):
    from pathlib import Path

    template_dir = Path(__file__).parent / "templates"
    templates = load_templates(template_dir)

    if not templates:
        raise ValueError(
            "No piece templates found. Add PNG templates to "
            "backend/vision/templates/"
        )

    rows = []
    piece_map = OrderedDict()

    files = "abcdefgh"
    ranks = "87654321"

    for row in range(8):
        empty_count = 0
        fen_row = ""

        for col in range(8):
            square = square_image(board_image, row, col)
            piece_name, confidence = classify_square(square, templates)

            square_name = f"{files[col]}{ranks[row]}"

            if piece_name is None:
                empty_count += 1
                continue

            if empty_count:
                fen_row += str(empty_count)
                empty_count = 0

            fen_row += PIECE_TO_FEN[piece_name]

            piece_map[square_name] = {
                "piece": piece_name,
                "fen": PIECE_TO_FEN[piece_name],
                "confidence": round(confidence, 3),
            }

        if empty_count:
            fen_row += str(empty_count)

        rows.append(fen_row)

    # A screenshot does not reliably tell us side-to-move or castling rights.
    # We therefore use a neutral default. These can be added later from UI data.
    fen = "/".join(rows) + " w - - 0 1"

    return fen, piece_map
