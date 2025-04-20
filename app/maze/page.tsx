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
    const handleKeyDown = (e: KeyboardEvent) => {
      movePlayer(e.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPos, gameStatus]);

  const getCellStyle = (cell: string, row: number, col: number) => {
    if (playerPos.row === row && playerPos.col === col)
      return "bg-pink-500 animate-pulse border-4 border-white";
    if (cell === "#") return "bg-gray-800";
    if (cell === "S") return "bg-blue-500";
    if (cell === "E") return "bg-green-500";
    return "bg-purple-800";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white p-6 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-16 w-40 h-40 bg-pink-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-52 h-52 bg-indigo-400 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <Link href="/" className="absolute top-4 left-4 flex items-center text-blue-300 hover:text-blue-100 transition z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Home
      </Link>

      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 z-10">
        Quantum Maze 🌌
      </h1>

      <div className="grid grid-cols-8 gap-1 z-10">
        {mazeData.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg shadow-inner ${getCellStyle(cell, rowIndex, colIndex)}`}
            />
          ))
        )}
      </div>

      <p className="mt-6 text-sm text-white/80 z-10">Use arrow keys to move your particle 🚀</p>

      {gameStatus === "won" && (
        <div className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg text-lg animate-bounce z-10">
          🎉 You escaped the quantum maze! 🎉
        </div>
      )}
    </div>
  );
};

export default MazePage;
