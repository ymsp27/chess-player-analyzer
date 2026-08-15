from collections import Counter


def analyze_moves(moves):
    if not moves:
        return {
            "total_moves": 0,
            "accuracy": 0,
            "good_moves": 0,
            "dubious": 0,
            "inaccuracies": 0,
            "mistakes": 0,
            "blunders": 0,
        }

    counts = Counter(move["classification"] for move in moves)
    total_loss = sum(move["centipawn_loss"] for move in moves)

    # Simple first-version accuracy metric.
    accuracy = max(
        0,
        round(100 - (total_loss / len(moves)) / 10, 1),
    )

    return {
        "total_moves": len(moves),
        "accuracy": accuracy,
        "good_moves": counts["Good"],
        "dubious": counts["Dubious"],
        "inaccuracies": counts["Inaccuracy"],
        "mistakes": counts["Mistake"],
        "blunders": counts["Blunder"],
        "average_centipawn_loss": round(total_loss / len(moves), 1),
    }
