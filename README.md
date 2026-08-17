<div align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
</div>

<h1 align="center">♟️ Chess Player Analyzer</h1>

<p align="center">
  <b>Elevate your game with deep, AI-powered analysis of your chess matches.</b><br>
  <i>A comprehensive tool for analyzing your opening, middlegame, and endgame performance.</i>
</p>

<br />

## ✨ Features

- **🎯 Opening Analysis**: Identify inaccuracies early and master your repertoire.
- **⚔️ Middlegame Tactics**: Find missed tactics, positional mistakes, and crucial turning points.
- **🏁 Endgame Precision**: Perfect your technique in the final stages of the game.
- **👁️ Computer Vision**: Parse over-the-board positions using OpenCV.
- **📈 Data Visualization**: Interactive charts of your game performance using Recharts.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Chess Logic**: [chess.js](https://github.com/jhlywa/chess.js) & [react-chessboard](https://github.com/marnixah/react-chessboard)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Engine**: [python-chess](https://python-chess.readthedocs.io/) & Stockfish
- **Vision**: [OpenCV](https://opencv.org/) + [NumPy](https://numpy.org/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.9+)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/chess-player-analyzer.git
cd chess-player-analyzer
```

**2. Setup Backend**
```bash
cd backend
python -m venv .venv
# On Windows
.venv\Scripts\activate
# On Unix or MacOS
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

**3. Setup Frontend**
```bash
cd ../frontend
npm install
npm run dev
```

## 📜 License
Distributed under the MIT License.

<br />
<p align="center">
  <i>Built with passion for chess enthusiasts.</i>
</p>
