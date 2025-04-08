'use client';

import { useWindowSize } from 'react-use';
import { useEffect, useState } from 'react';
import { Chess, PieceSymbol } from 'chess.js';
import { Chessboard } from 'react-chessboard';

export default function Home() {
  const { width } = useWindowSize();
  const boardWidth = Math.min(500, width - 200); // Responsive layout

  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [whiteTime, setWhiteTime] = useState(600); // 10 min in seconds
  const [blackTime, setBlackTime] = useState(600);
  const [turn, setTurn] = useState<'w' | 'b'>('w');
  const [started, setStarted] = useState(false);
  const [capturedWhite, setCapturedWhite] = useState<PieceSymbol[]>([]);
  const [capturedBlack, setCapturedBlack] = useState<PieceSymbol[]>([]);

  // Timer effect
  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      if (game.isGameOver()) {
        clearInterval(interval);
        return;
      }

      if (turn === 'w') {
        setWhiteTime((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        setBlackTime((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [turn, game, started]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
  };

  function safeGameMutate(modify: (game: Chess) => void) {
    const updatedGame = new Chess(game.fen());
    modify(updatedGame);
    setGame(updatedGame);
    setFen(updatedGame.fen());
    setTurn(updatedGame.turn());

    // Capture pieces logic
    const history = updatedGame.history({ verbose: true });
    const lastMove = history[history.length - 1];
    if (lastMove?.captured) {
      const captured = lastMove.captured;
      if (lastMove.color === 'w') {
        setCapturedBlack((prev) => [...prev, captured]);
      } else {
        setCapturedWhite((prev) => [...prev, captured]);
      }
    }

    setMoveHistory(
      history.map((move, i) =>
        `${i % 2 === 0 ? Math.floor(i / 2 + 1) + '.' : ''} ${move.from}-${move.to}`
      )
    );
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    if (!started) return false;
  
    if (superMode) {
      if (!selectedSquare) {
        setSelectedSquare(sourceSquare);
        return false;
      } else {
        if (sourceSquare !== selectedSquare) return false;
  
        // Save superposition
        const piece = game.get(sourceSquare);
        if (piece) {
          setSuperposedPieces((prev) => [
            ...prev,
            {
              piece: piece.type,
              color: piece.color,
              squares: [sourceSquare, targetSquare],
            },
          ]);
          // Remove from board visually
          safeGameMutate((g) => g.remove(sourceSquare));
          setSelectedSquare(null);
          return true;
        }
      }
      return false;
    }
  
    // Normal move
    let moveMade = false;
    safeGameMutate((game) => {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });
      if (move !== null) moveMade = true;
    });
  
    // Collapse any superpositions if interacted
    setSuperposedPieces((prev) =>
      prev.filter((sp) => !sp.squares.includes(sourceSquare))
    );
  
    return moveMade;
  }
  

  const renderCapturedPieces = (pieces: PieceSymbol[]) => {
    return pieces.map((p, i) => (
      <img
        key={i}
        src={`/pieces/${p.toLowerCase()}.png`}
        alt={p}
        className="w-5 inline-block mx-0.5"
      />
    ));
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      {/* Game Title */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4 text-center tracking-tight">♟ Quantum Chess</h1>

      {/* Timer Row */}
      <div className="w-full max-w-5xl flex justify-between mb-4">
        <div className="bg-white shadow-lg rounded-xl p-4 text-center w-1/3 font-semibold text-lg text-gray-700">
          ♟️ Black: <span className="font-bold text-red-500">{formatTime(blackTime)}</span>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-4 text-center w-1/3 font-semibold text-lg text-gray-700">
          ⚪ White: <span className="font-bold text-green-600">{formatTime(whiteTime)}</span>
        </div>
      </div>

      {/* Start Button */}
      {!started && (
        <button
          className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
          onClick={() => setStarted(true)}
        >
          Start Game
        </button>
      )}

      {/* Main Game Area */}
      <div className="flex gap-6 w-full max-w-5xl">
        {/* Move History */}
        <div className="w-48 bg-white rounded-2xl shadow-md p-4 overflow-y-auto max-h-[500px]">
          <h2 className="text-center font-bold text-gray-800 mb-2 text-sm">📜 Move History</h2>
          <ol className="text-xs list-decimal list-inside text-gray-700">
            {moveHistory.map((move, index) => (
              <li key={index}>{move}</li>
            ))}
          </ol>
        </div>

        {/* Chessboard */}
        <div className="flex flex-col items-center justify-center rounded-2xl shadow-xl bg-white p-2">
          <Chessboard
            position={fen}
            onPieceDrop={onDrop}
            boardWidth={boardWidth}
            boardOrientation="white"
            animationDuration={200}
          />

          {/* Captured Pieces */}
          <div className="mt-3 text-center">
            <div className="text-sm text-gray-600 mb-1">⚪ Captured by White</div>
            <div>{renderCapturedBlack(capturedBlack)}</div>
            <div className="text-sm text-gray-600 mt-2 mb-1">♟ Captured by Black</div>
            <div>{renderCapturedWhite(capturedWhite)}</div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="w-48 bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-center font-bold text-gray-800 mb-2 text-sm">🏆 Leaderboard</h2>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>1. Harsh - 2400</li>
            <li>2. Nishant - 2300</li>
            <li>3. Kraven - 2250</li>
            <li>4. Arya - 2200</li>
            <li>5. Luna - 2100</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Separate rendering helpers
function renderCapturedBlack(pieces: PieceSymbol[]) {
  return pieces.map((p, i) => (
    <img key={i} src={`/pieces/w${p.toUpperCase()}.png`} className="w-6 inline-block mx-0.5" />
  ));
}

function renderCapturedWhite(pieces: PieceSymbol[]) {
  return pieces.map((p, i) => (
    <img key={i} src={`/pieces/b${p.toUpperCase()}.png`} className="w-6 inline-block mx-0.5" />
  ));
}
