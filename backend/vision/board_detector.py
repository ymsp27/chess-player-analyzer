import io
import cv2
import numpy as np


def detect_board(image_bytes: bytes):
    """
    First-version board detector.

    Strategy:
    1. Decode image.
    2. Find large quadrilateral contours.
    3. Perspective-correct the largest likely chessboard.
    4. If no board is confidently found, use the largest central square region.

    This is intentionally lightweight. It is not a trained vision model.
    """
    image = cv2.imdecode(
        np.frombuffer(image_bytes, dtype=np.uint8),
        cv2.IMREAD_COLOR,
    )

    if image is None:
        raise ValueError("Invalid image")

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blurred, 50, 150)

    contours, _ = cv2.findContours(
        edges,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE,
    )

    h, w = image.shape[:2]
    image_area = h * w

    candidates = []

    for contour in contours:
        area = cv2.contourArea(contour)

        if area < image_area * 0.10:
            continue

        perimeter = cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, 0.02 * perimeter, True)

        if len(approx) == 4:
            x, y, bw, bh = cv2.boundingRect(approx)
            ratio = bw / max(bh, 1)

            if 0.75 <= ratio <= 1.33:
                candidates.append((area, approx.reshape(4, 2)))

    if candidates:
        _, points = max(candidates, key=lambda x: x[0])
        board_image = four_point_transform(image, points)
    else:
        # Fallback: take a centered square.
        side = min(h, w)
        x = (w - side) // 2
        y = (h - side) // 2
        board_image = image[y:y + side, x:x + side]

    board_image = cv2.resize(board_image, (800, 800))

    return {
        "board_image": board_image,
        "width": board_image.shape[1],
        "height": board_image.shape[0],
    }


def order_points(points):
    points = np.array(points, dtype=np.float32)

    rect = np.zeros((4, 2), dtype=np.float32)

    sums = points.sum(axis=1)
    diffs = np.diff(points, axis=1).reshape(-1)

    rect[0] = points[np.argmin(sums)]   # top-left
    rect[2] = points[np.argmax(sums)]   # bottom-right
    rect[1] = points[np.argmin(diffs)]  # top-right
    rect[3] = points[np.argmax(diffs)]  # bottom-left

    return rect


def four_point_transform(image, points):
    rect = order_points(points)
    tl, tr, br, bl = rect

    width_a = np.linalg.norm(br - bl)
    width_b = np.linalg.norm(tr - tl)
    max_width = max(int(width_a), int(width_b))

    height_a = np.linalg.norm(tr - br)
    height_b = np.linalg.norm(tl - bl)
    max_height = max(int(height_a), int(height_b))

    destination = np.array(
        [
            [0, 0],
            [max_width - 1, 0],
            [max_width - 1, max_height - 1],
            [0, max_height - 1],
        ],
        dtype=np.float32,
    )

    matrix = cv2.getPerspectiveTransform(rect, destination)

    return cv2.warpPerspective(
        image,
        matrix,
        (max_width, max_height),
    )
