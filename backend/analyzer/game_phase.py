import chess


def classify_game_phase(board: chess.Board) -> str:
    """
    Lightweight phase classifier.

    It intentionally does not depend only on move number.
    """
    move_number = board.fullmove_number

    non_pawn_non_king = sum(
        1
        for piece in board.piece_map().values()
        if piece.piece_type not in {chess.PAWN, chess.KING}
    )

    queens = len(board.pieces(chess.QUEEN, chess.WHITE)) + len(
        board.pieces(chess.QUEEN, chess.BLACK)
    )

    rooks = len(board.pieces(chess.ROOK, chess.WHITE)) + len(
        board.pieces(chess.ROOK, chess.BLACK)
    )

    if move_number <= 12 and non_pawn_non_king >= 8:
        return "Opening"

    if non_pawn_non_king <= 4 or (
        queens == 0 and rooks <= 2
    ):
        return "Endgame"

    return "Middlegame"
