"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const generateEmptyBoard = () =>
  Array(9)
    .fill(null)
    .map(() => Array(9).fill(""));

const SudokuPage = () => {
  const [board, setBoard] = useState(generateEmptyBoard);
  const [solution, setSolution] = useState(generateEmptyBoard);
  const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    generatePuzzle();
  }, []);

  const generatePuzzle = () => {
    // A static example board (easy)
    const puzzle = [
      ["5", "3", "", "", "7", "", "", "", ""],
      ["6", "", "", "1", "9", "5", "", "", ""],
      ["", "9", "8", "", "", "", "", "6", ""],
      ["8", "", "", "", "6", "", "", "", "3"],
      ["4", "", "", "8", "", "3", "", "", "1"],
      ["7", "", "", "", "2", "", "", "", "6"],
      ["", "6", "", "", "", "", "2", "8", ""],
      ["", "", "", "4", "1", "9", "", "", "5"],
      ["", "", "", "", "8", "", "", "7", "9"],
    ];
    const solved = solveSudoku(puzzle.map((r) => [...r]));
    setBoard(puzzle);
    setSolution(solved);
    setIsComplete(false);
  };

  const solveSudoku = (grid: string[][]): string[][] => {
    const isValid = (r: number, c: number, val: string) => {
      for (let i = 0; i < 9; i++) {
        if (grid[r][i] === val || grid[i][c] === val) return false;
        const boxRow = 3 * Math.floor(r / 3) + Math.floor(i / 3);
        const boxCol = 3 * Math.floor(c / 3) + (i % 3);
        if (grid[boxRow][boxCol] === val) return false;
      }
      return true;
    };

    const solve = (): boolean => {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (!grid[r][c]) {
            for (let n = 1; n <= 9; n++) {
              const val = String(n);
              if (isValid(r, c, val)) {
                grid[r][c] = val;
                if (solve()) return true;
                grid[r][c] = "";
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    solve();
    return grid;
  };

  const handleCellChange = (value: string, row: number, col: number) => {
    if (/[1-9]/.test(value) || value === "") {
      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = value;
      setBoard(newBoard);
      checkComplete(newBoard);
    }
  };

  const checkComplete = (b: string[][]) => {
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++)
        if (b[i][j] !== solution[i][j]) return setIsComplete(false);
    setIsComplete(true);
  };

  const isInitial = (row: number, col: number) => solution[row][col] && board[row][col] === solution[row][col];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white p-6 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-64 h-64 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
      </div>
      <div className="relative z-10 mt-16">
        <Link href="/" className="absolute left-1 flex items-center text-blue-300 hover:text-blue-200 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Home
        </Link>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          Sudoku Challenge
        </h1>
        <div className="grid grid-cols-9 gap-[2px] bg-white p-[2px] rounded-lg mb-6">
          {board.map((row, r) =>
            row.map((val, c) => (
              <input
                key={`${r}-${c}`}
                type="text"
                maxLength={1}
                value={val}
                onChange={(e) => handleCellChange(e.target.value, r, c)}
                onFocus={() => setSelectedCell({ row: r, col: c })}
                className={`w-10 h-10 text-center text-black font-semibold rounded-sm text-lg ${
                  isInitial(r, c) ? "bg-gray-200 cursor-not-allowed" : "bg-white"
                } focus:outline-none border border-gray-300`}
                disabled={isInitial(r, c)}
              />
            ))
          )}
        </div>
        <div className="flex gap-4">
          <button
            onClick={generatePuzzle}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-pink-500/30"
          >
            New Puzzle
          </button>
        </div>
        {isComplete && (
          <div className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-lg animate-bounce shadow-lg">
            🎉 Sudoku Solved Perfectly! 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default SudokuPage;
