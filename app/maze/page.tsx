"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const mazeData = [
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "S", " ", " ", "#", " ", " ", "#"],
  ["#", "#", "#", " ", "#", " ", "#", "#"],
  ["#", " ", "#", " ", " ", " ", "#", "#"],
  ["#", " ", "#", "#", "#", " ", " ", "#"],
  ["#", " ", " ", " ", "#", "#", " ", "#"],
  ["#", "#", "#", " ", "#", "E", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
];

type Position = { row: number; col: number };

const MazePage = () => {
  const [playerPos, setPlayerPos] = useState<Position>({ row: 1, col: 1 });
  const [gameStatus, setGameStatus] = useState<"playing" | "won">("playing");

  const movePlayer = (dir: string) => {
    if (gameStatus === "won") return;

    const { row, col } = playerPos;
    let newRow = row;
    let newCol = col;

    if (dir === "ArrowUp") newRow--;
    else if (dir === "ArrowDown") newRow++;
    else if (dir === "ArrowLeft") newCol--;
    else if (dir === "ArrowRight") newCol++;

    if (
      mazeData[newRow] &&
      mazeData[newRow][newCol] !== "#" &&
      mazeData[newRow][newCol] !== undefined
    ) {
      setPlayerPos({ row: newRow, col: newCol });
      if (mazeData[newRow][newCol] === "E") {
        setGameStatus("won");
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => movePlayer(e.key);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPos, gameStatus]);

  const getCellStyle = (cell: string, row: number, col: number) => {
    const base = "rounded-md w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-all duration-300 shadow-inner";

    if (playerPos.row === row && playerPos.col === col)
      return `${base} bg-pink-500 animate-pulse border-4 border-white shadow-pink-400 shadow-lg`;

    if (cell === "#") return `${base} bg-gray-900 border border-gray-700 shadow-md`;
    if (cell === "S") return `${base} bg-blue-500 shadow-lg`;
    if (cell === "E") return `${base} bg-green-500 animate-bounce shadow-xl`;
    return `${base} bg-gradient-to-tr from-purple-800 to-indigo-800 hover:brightness-125`;
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-950 to-indigo-900 text-white px-4 py-8">
      {/* Glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-16 w-40 h-40 bg-pink-500 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-52 h-52 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Home Button */}
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center text-blue-300 hover:text-white transition z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Home
      </Link>

      <h1 className="text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-500 to-red-400 z-10">
        Quantum Maze 🌌
      </h1>

      {/* Maze Grid */}
      <div className="grid grid-cols-8 gap-1 z-10">
        {mazeData.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getCellStyle(cell, rowIndex, colIndex)}
            />
          ))
        )}
      </div>

      <p className="mt-6 text-sm text-white/70 z-10">Use ↑ ↓ ← → keys to guide your quantum particle 🚀</p>

      {gameStatus === "won" && (
        <div className="mt-6 px-6 py-3 bg-green-600/80 text-white rounded-xl shadow-lg text-lg animate-bounce z-20">
          🎉 You escaped the quantum maze!
        </div>
      )}
    </div>
  );
};

export default MazePage;
