"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const PuzzlePage = () => {
    const [puzzle, setPuzzle] = useState([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, null],
    ]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [moves, setMoves] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        const solvedPuzzle = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, null],
        ];
        let solved = true;
        outer: for (let i = 0; i < puzzle.length; i++) {
            for (let j = 0; j < puzzle[i].length; j++) {
                if (puzzle[i][j] !== solvedPuzzle[i][j]) {
                    solved = false;
                    break outer;
                }
            }
        }
        setIsComplete(solved && moves > 0);
    }, [puzzle, moves]);

    const handleTileClick = (row: number, col: number) => {
        const empty = findEmptyTile();
        if (isAdjacent(row, col, empty.row, empty.col)) {
            const newPuzzle = puzzle.map(row => [...row]);
            newPuzzle[empty.row][empty.col] = newPuzzle[row][col];
            newPuzzle[row][col] = null;
            setPuzzle(newPuzzle);
            setMoves(prev => prev + 1);
        }
    };

    const findEmptyTile = () => {
        for (let i = 0; i < puzzle.length; i++) {
            for (let j = 0; j < puzzle[i].length; j++) {
                if (puzzle[i][j] === null) return { row: i, col: j };
            }
        }
        return { row: -1, col: -1 };
    };

    const isAdjacent = (r1: number, c1: number, r2: number, c2: number): boolean => (
        (r1 === r2 && Math.abs(c1 - c2) === 1) ||
        (c1 === c2 && Math.abs(r1 - r2) === 1)
    );

    const shufflePuzzle = () => {
        let current = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, null],
        ];
        for (let i = 0; i < 50; i++) {
            const empty = findEmptyTileIn(current);
            const options = [];
            if (empty.row > 0) options.push({ row: empty.row - 1, col: empty.col });
            if (empty.row < 2) options.push({ row: empty.row + 1, col: empty.col });
            if (empty.col > 0) options.push({ row: empty.row, col: empty.col - 1 });
            if (empty.col < 2) options.push({ row: empty.row, col: empty.col + 1 });
            const move = options[Math.floor(Math.random() * options.length)];
            const temp = current[move.row][move.col];
            current[move.row][move.col] = null;
            current[empty.row][empty.col] = temp;
        }
        setPuzzle(current);
        setMoves(0);
        setIsComplete(false);
    };

    const findEmptyTileIn = (grid: (number | null)[][]) => {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === null) return { row: i, col: j };
            }
        }
        return { row: -1, col: -1 };
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white p-6 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-pink-600 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute bottom-10 right-20 w-64 h-64 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
            </div>
            <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 mt-12 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <Link href="/" className="absolute left-1 flex items-center text-blue-300 hover:text-blue-200 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Home
                </Link>
                <div className="text-blue-300 text-sm mb-2">Quantum Arcade</div>
                <h1 className="text-4xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Quantum Puzzle</h1>
                <p className="text-blue-200 mb-8">Rearrange the quantum tiles to restore order</p>
                <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg blur ${isComplete ? 'animate-pulse' : ''}`}></div>
                    <div className="relative grid grid-cols-3 gap-2 p-2 bg-gray-900 rounded-lg">
                        {puzzle.map((row, rowIndex) =>
                            row.map((tile, colIndex) => {
                                const empty = findEmptyTile();
                                const movable = tile !== null && isAdjacent(rowIndex, colIndex, empty.row, empty.col);
                                return (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        onClick={() => handleTileClick(rowIndex, colIndex)}
                                        className={`w-24 h-24 flex justify-center items-center rounded-md transition-all duration-200 text-2xl font-bold
                                            ${tile === null ? 'bg-transparent' : 'bg-gradient-to-br from-pink-500/80 to-purple-600/80 shadow-lg'}
                                            ${movable ? 'cursor-pointer hover:scale-105 hover:shadow-pink-500/30' : 'cursor-default'}`}
                                    >
                                        {tile !== null && (
                                            <span className="flex items-center justify-center w-20 h-20 bg-gray-900 rounded-md text-white">
                                                {tile}
                                            </span>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
                <div className="flex gap-4 mb-6">
                    <div className="bg-gray-800 px-4 py-2 rounded-full text-blue-300">
                        Moves: <span className="text-white font-semibold">{moves}</span>
                    </div>
                    <button 
                        onClick={shufflePuzzle} 
                        className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-pink-500/30"
                    >
                        Shuffle
                    </button>
                </div>
                {isComplete && (
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-lg animate-bounce shadow-lg">
                        🎉 Puzzle Solved! 🎉
                    </div>
                )}
                <div className="mt-8 text-sm text-blue-300 opacity-75">
                    Move tiles next to the empty space to solve the puzzle
                </div>
            </div>
        </div>
    );
};

export default PuzzlePage;
