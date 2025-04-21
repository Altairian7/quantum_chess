"use client";
import React, { useState } from 'react';
import Link from 'next/link';

type Move = {
  id: number;
  player: 'X' | 'O';
  cells: number[];
};

const QuantumTicTacToe = () => {
  const [moves, setMoves] = useState<Move[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [isXNext, setIsXNext] = useState(true);
  const [moveId, setMoveId] = useState(1);

  const handleClick = (index: number) => {
    if (selected.includes(index)) return;

    // check if already used by another move
    if (moves.some(move => move.cells.includes(index))) return;

    const newSelection = [...selected, index];
    setSelected(newSelection);

    if (newSelection.length === 2) {
      const newMove: Move = {
        id: moveId,
        player: isXNext ? 'X' : 'O',
        cells: newSelection,
      };
      setMoves([...moves, newMove]);
      setSelected([]);
      setIsXNext(!isXNext);
      setMoveId(moveId + 1);
    }
  };

  const getCellText = (index: number) => {
    for (let move of moves) {
      if (move.cells.includes(index)) {
        return `${move.player}${move.id}`;
      }
    }
    if (selected.includes(index)) {
      return isXNext ? `X?` : `O?`;
    }
    return '';
  };

  const resetGame = () => {
    setMoves([]);
    setSelected([]);
    setIsXNext(true);
    setMoveId(1);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white p-6 overflow-hidden">
      <Link href="/" className="absolute left-1 flex items-center text-blue-300 hover:text-blue-200 transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} fill="none">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Home
      </Link>
      <h1 className="text-4xl font-bold mt-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
        Quantum Tic Tac Toe
      </h1>
      <p className="text-blue-200 mb-4">Two squares per move. Superposition. No collapse... yet 😏</p>

      <div className="grid grid-cols-3 gap-2 bg-gray-800 p-4 rounded-xl mt-6">
        {Array(9).fill(null).map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg shadow-lg text-2xl font-bold hover:scale-105 transition-all`}
          >
            {getCellText(index)}
          </button>
        ))}
      </div>

      <div className="mt-6 text-xl text-blue-300">
        Next Move: {isXNext ? 'X' : 'O'} {selected.length === 1 ? '(Choose 1 more square)' : ''}
      </div>

      <button
        onClick={resetGame}
        className="mt-4 px-6 py-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full text-white shadow-lg hover:scale-105 transition"
      >
        Reset
      </button>
    </div>
  );
};

export default QuantumTicTacToe;
