// Quantum Tic Tac Toe
"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const winner = calculateWinner(board);

    const handleClick = (index: number) => {
        if (board[index] || winner) return;
        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    function calculateWinner(squares: string[] | null[]) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white p-6 overflow-hidden">
            <Link href="/" className="absolute left-1 flex items-center text-blue-300 hover:text-blue-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Home
            </Link>
            <h1 className="text-4xl font-bold mt-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">Quantum Tic Tac Toe</h1>
            <p className="text-blue-200 mb-4">A game of classic strategy and logic</p>
            <div className="grid grid-cols-3 gap-2 bg-gray-800 p-4 rounded-xl mt-6">
                {board.map((val, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(index)}
                        className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg shadow-lg text-3xl font-bold hover:scale-105 transition-all"
                    >
                        {val}
                    </button>
                ))}
            </div>
            <div className="mt-6">
                {winner ? (
                    <div className="text-2xl text-green-400">🎉 {winner} Wins!</div>
                ) : board.every(Boolean) ? (
                    <div className="text-2xl text-yellow-400">It's a Draw!</div>
                ) : (
                    <div className="text-xl text-blue-300">Next Turn: {isXNext ? 'X' : 'O'}</div>
                )}
            </div>
            <button onClick={resetGame} className="mt-4 px-6 py-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full text-white shadow-lg hover:scale-105 transition">Reset</button>
        </div>
    );
};

export default TicTacToe;