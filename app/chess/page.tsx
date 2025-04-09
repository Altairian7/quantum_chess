'use client';

import { useWindowSize } from 'react-use';
import { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Timer, Crown, Trophy, History, Atom, Sparkles } from 'lucide-react';

export default function chess() {
  const { width } = useWindowSize();
  const boardWidth = Math.min(580, width ? width - 32 : 468);

  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState('');
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});
  const [whiteTime, setWhiteTime] = useState(0);
  const [blackTime, setBlackTime] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [superpositionMode, setSuperpositionMode] = useState(false);
  const [capturedWhitePieces, setCapturedWhitePieces] = useState<string[]>([]);
  const [capturedBlackPieces, setCapturedBlackPieces] = useState<string[]>([]);
  const [quantumSquares, setQuantumSquares] = useState<string[]>([]);
  const [superpositionState, setSuperpositionState] = useState<{
    piece: any;
    squares: string[];
  } | null>(null);

  const leaderboard = [
    { name: "Quantum M.", rating: 3047 },
    { name: "Schrödinger", rating: 2988 },
    { name: "Heisenberg", rating: 2975 },
    { name: "Planck M.", rating: 2964 },
    { name: "Bohr N.", rating: 2953 }
  ];

  useEffect(() => {
    if (!isGameStarted || winner) return;

    const interval = setInterval(() => {
      if (game.turn() === 'w') {
        setWhiteTime(prev => prev + 1);
      } else {
        setBlackTime(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [game, isGameStarted, winner]);

  function getLegalMoves(square: string) {
    return game.moves({
      square,
      verbose: true
    });
  }

  function getMoveOptions(square: string) {
    if (superpositionMode) {
      const legalMoves = getLegalMoves(square);
      if (legalMoves.length < 2) {
        setSuperpositionMode(false);
        return;
      }

      // Pick two random legal moves
      const move1 = legalMoves[Math.floor(Math.random() * legalMoves.length)];
      let move2;
      do {
        move2 = legalMoves[Math.floor(Math.random() * legalMoves.length)];
      } while (move2.to === move1.to);

      const superpositionSquares = [move1.to, move2.to];
      setQuantumSquares(superpositionSquares);

      const newSquares: any = {};
      superpositionSquares.forEach(sq => {
        newSquares[sq] = {
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 85%, transparent 15%)',
          borderRadius: '50%'
        };
      });
      newSquares[square] = {
        background: 'rgba(147, 51, 234, 0.4)'
      };
      setOptionSquares(newSquares);
      return;
    }

    const moves = getLegalMoves(square);
    if (moves.length === 0) {
      return;
    }

    const newSquares: any = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) && game.get(move.to).color !== game.get(square).color
            ? 'radial-gradient(circle, rgba(255,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%'
      };
    });
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)'
    };
    setOptionSquares(newSquares);
  }

  function collapseQuantumState() {
    if (!superpositionState) return;

    const { piece, squares } = superpositionState;
    const chosenSquare = squares[Math.floor(Math.random() * squares.length)];
    
    const gameCopy = new Chess(game.fen());
    gameCopy.remove(moveFrom);
    gameCopy.put(piece, chosenSquare);
    
    if (gameCopy.isCheck()) {
      // If the collapse would result in check, try the other square
      const otherSquare = squares.find(sq => sq !== chosenSquare)!;
      gameCopy.remove(chosenSquare);
      gameCopy.put(piece, otherSquare);
      setGame(gameCopy);
      setMoveHistory(prev => [...prev, `${moveFrom}-${otherSquare} [Q→]`]);
    } else {
      setGame(gameCopy);
      setMoveHistory(prev => [...prev, `${moveFrom}-${chosenSquare} [Q→]`]);
    }

    setSuperpositionState(null);
    setQuantumSquares([]);
    setOptionSquares({});
  }

  function onSquareClick(square: string) {
    if (!isGameStarted || winner) return;

    setRightClickedSquares({});

    // Handle quantum state collapse on interaction
    if (superpositionState && !quantumSquares.includes(square)) {
      collapseQuantumState();
      return;
    }

    if (superpositionMode && moveFrom) {
      const piece = game.get(moveFrom);
      if (piece) {
        const legalMoves = getLegalMoves(moveFrom);
        const isLegalMove = legalMoves.some(move => move.to === square);

        if (!isLegalMove) {
          alert('Invalid quantum move - must be a legal chess move');
          return;
        }

        // Create quantum superposition
        setSuperpositionState({
          piece: piece,
          squares: quantumSquares
        });
        
        setMoveHistory(prev => [...prev, `${moveFrom}-${quantumSquares.join('/')} [Q]`]);
        setSuperpositionMode(false);
        setMoveFrom('');
        return;
      }
    }

    // from square
    if (!moveFrom) {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        getMoveOptions(square);
      }
      return;
    }

    // to square
    if (moveFrom) {
      const moves = getLegalMoves(moveFrom);
      const move = moves.find(
        (m) => m.from === moveFrom && m.to === square
      );

      if (move) {
        if (move.captured) {
          if (move.color === 'w') {
            setCapturedBlackPieces(prev => [...prev, move.captured]);
          } else {
            setCapturedWhitePieces(prev => [...prev, move.captured]);
          }
        }

        game.move(move);
        setGame(new Chess(game.fen()));
        setMoveHistory(prev => [...prev, `${moveFrom}-${square}`]);
        
        if (game.isGameOver()) {
          if (game.isCheckmate()) {
            setWinner(`${game.turn() === 'w' ? 'Black' : 'White'} wins by checkmate!`);
          } else if (game.isDraw()) {
            setWinner('Game drawn!');
          }
        }
      }
      setMoveFrom('');
      setOptionSquares({});
      return;
    }
  }

  function onSquareRightClick(square: string) {
    const colour = 'rgba(255, 0, 0, 0.4)';
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] &&
        rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour }
    });
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-3">
          <Atom className="text-purple-400 w-10 h-10 animate-pulse" />
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Quantum Chess Master
          </span>
        </h1>

        <div className="grid grid-cols-12 gap-6">
          {/* Move History */}
          <div className="col-span-3 bg-black/30 backdrop-blur-sm rounded-xl shadow-lg shadow-purple-500/20 p-4 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-4 border-b border-purple-500/20 pb-2">
              <History className="text-purple-400" />
              <h2 className="text-lg font-semibold text-purple-100">Move History</h2>
            </div>
            <div className="h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/20">
              {moveHistory.map((move, index) => (
                <div key={index} className="flex items-center py-1 border-b border-purple-500/10">
                  <span className="w-8 text-purple-400">{index + 1}.</span>
                  <span className="text-purple-200 font-mono">{move}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chess Board */}
          <div className="col-span-6">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl shadow-lg shadow-purple-500/20 p-6 border border-purple-500/20">
              {!isGameStarted && !winner && (
                <div className="text-center mb-6">
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
                    onClick={() => setIsGameStarted(true)}
                  >
                    Start Quantum Game
                  </button>
                </div>
              )}

              {winner && (
                <div className="text-center mb-6 text-xl font-bold text-purple-400 bg-purple-900/50 py-3 rounded-lg">
                  {winner}
                </div>
              )}

              <div className="flex justify-between mb-6">
                <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-lg border border-purple-500/20">
                  <Timer className="text-purple-400" />
                  <span className="font-mono text-xl text-purple-100">
                    Black: {formatTime(blackTime)}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-lg border border-purple-500/20">
                  <Timer className="text-purple-400" />
                  <span className="font-mono text-xl text-purple-100">
                    White: {formatTime(whiteTime)}
                  </span>
                </div>
              </div>

              <div className="relative">
                <Chessboard
                  id="QuantumBoard"
                  animationDuration={200}
                  arePiecesDraggable={isGameStarted && !winner}
                  position={game.fen()}
                  onSquareClick={onSquareClick}
                  onSquareRightClick={onSquareRightClick}
                  customBoardStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(147, 51, 234, 0.2)',
                  }}
                  customSquareStyles={{
                    ...moveSquares,
                    ...optionSquares,
                    ...rightClickedSquares,
                  }}
                  boardWidth={boardWidth}
                />
                {superpositionMode && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                    <div className="absolute inset-0 bg-purple-500/10 animate-pulse rounded-lg" />
                    <Sparkles className="absolute top-2 right-2 text-purple-400 animate-spin-slow" />
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <button
                  className={`px-6 py-2 rounded-lg font-bold transition-all transform hover:scale-105 ${
                    superpositionMode
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-purple-900/50 text-purple-300 border border-purple-500/20'
                  }`}
                  onClick={() => setSuperpositionMode(!superpositionMode)}
                >
                  <div className="flex items-center gap-2">
                    <Atom className="w-5 h-5" />
                    {superpositionMode ? 'Quantum Mode Active' : 'Enable Quantum Mode'}
                  </div>
                </button>
                <button
                  className="bg-red-500/80 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-all transform hover:scale-105"
                  onClick={() => {
                    setGame(new Chess());
                    setMoveFrom('');
                    setOptionSquares({});
                    setRightClickedSquares({});
                    setWhiteTime(0);
                    setBlackTime(0);
                    setIsGameStarted(false);
                    setWinner(null);
                    setMoveHistory([]);
                    setCapturedWhitePieces([]);
                    setCapturedBlackPieces([]);
                    setSuperpositionMode(false);
                    setSuperpositionState(null);
                    setQuantumSquares([]);
                  }}
                >
                  Reset Game
                </button>
              </div>

              {/* Captured Pieces */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-3 rounded-lg border border-purple-500/20">
                  <h3 className="text-purple-300 text-sm mb-2">Captured White Pieces</h3>
                  <div className="flex flex-wrap gap-1">
                    {capturedWhitePieces.map((piece, index) => (
                      <span key={index} className="text-white text-xl">
                        {piece === 'p' ? '♙' : piece === 'n' ? '♘' : piece === 'b' ? '♗' : piece === 'r' ? '♖' : piece === 'q' ? '♕' : '♔'}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-black/40 p-3 rounded-lg border border-purple-500/20">
                  <h3 className="text-purple-300 text-sm mb-2">Captured Black Pieces</h3>
                  <div className="flex flex-wrap gap-1">
                    {capturedBlackPieces.map((piece, index) => (
                      <span key={index} className="text-white text-xl">
                        {piece === 'p' ? '♟' : piece === 'n' ? '♞' : piece === 'b' ? '♝' : piece === 'r' ? '♜' : piece === 'q' ? '♛' : '♚'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="col-span-3 bg-black/30 backdrop-blur-sm rounded-xl shadow-lg shadow-purple-500/20 p-4 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-4 border-b border-purple-500/20 pb-2">
              <Trophy className="text-purple-400" />
              <h2 className="text-lg font-semibold text-purple-100">Quantum Masters</h2>
            </div>
            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <div key={index} className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <span className="font-medium text-purple-100">{player.name}</span>
                  </div>
                  <span className="font-mono text-purple-300">{player.rating}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}