// app/page.tsx

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden px-6">
      {/* Glowing Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-20 w-72 h-72 bg-purple-700 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-32 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl animate-ping"></div>
        <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-pink-500 rounded-full opacity-10 blur-2xl animate-pulse"></div>
      </div>

      {/* Foreground Content */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-lg text-indigo-300 mb-2 tracking-wide">✨ Welcome to</p>
        <h1 className="text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 drop-shadow-xl mb-4 text-center">
          Quantum Arcade
        </h1>
        <p className="text-blue-200 text-center max-w-xl mb-12 text-lg md:text-xl">
          Dive into the multiverse of games where quantum logic meets fun.
        </p>

        {/* Game Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    <Link href="/chess">
      <div className="w-72 h-52 relative bg-white/10 border border-purple-400/20 backdrop-blur-xl rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 group cursor-pointer">
        <div className="flex flex-col items-center justify-center h-full p-6">
          <div className="text-5xl mb-2 animate-bounce">♟</div>
          <h2 className="text-2xl font-semibold text-purple-200 mb-1">Quantum Chess</h2>
          <p className="text-sm text-purple-300 group-hover:underline transition">Play Now</p>
        </div>
      </div>
    </Link>

    <Link href="/puzzle">
      <div className="w-72 h-52 relative bg-white/10 border border-pink-400/20 backdrop-blur-xl rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 group cursor-pointer">
        <div className="flex flex-col items-center justify-center h-full p-6">
          <div className="text-5xl mb-2 animate-spin-slow">🧩</div>
          <h2 className="text-2xl font-semibold text-pink-200 mb-1">Quantum Puzzle</h2>
          <p className="text-sm text-pink-300 group-hover:underline transition">Solve Now</p>
        </div>
      </div>
    </Link>

    <Link href="/tic-tac-toe">
      <div className="w-72 h-52 relative bg-white/10 border border-green-400/20 backdrop-blur-xl rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 group cursor-pointer">
        <div className="flex flex-col items-center justify-center h-full p-6">
          <div className="text-5xl mb-2">⭕</div>
          <h2 className="text-2xl font-semibold text-green-200 mb-1">Quantum Tic Tac Toe</h2>
          <p className="text-sm text-green-300 group-hover:underline transition">Play Now</p>
        </div>
      </div>
    </Link>

    <Link href="/sudoku">
      <div className="w-72 h-52 relative bg-white/10 border border-yellow-400/20 backdrop-blur-xl rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 group cursor-pointer">
        <div className="flex flex-col items-center justify-center h-full p-6">
          <div className="text-5xl mb-2">🧠</div>
          <h2 className="text-2xl font-semibold text-yellow-200 mb-1">Quantum Sudoku</h2>
          <p className="text-sm text-yellow-300 group-hover:underline transition">Play Now</p>
        </div>
      </div>
    </Link>

    <Link href="/memory">
      <div className="w-72 h-52 relative bg-white/10 border border-cyan-400/20 backdrop-blur-xl rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 group cursor-pointer">
        <div className="flex flex-col items-center justify-center h-full p-6">
          <div className="text-5xl mb-2">🧬</div>
          <h2 className="text-2xl font-semibold text-cyan-200 mb-1">Quantum Memory</h2>
          <p className="text-sm text-cyan-300 group-hover:underline transition">Play Now</p>
        </div>
      </div>
    </Link>

    <Link href="/maze">
      <div className="w-72 h-52 relative bg-white/10 border border-red-400/20 backdrop-blur-xl rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 group cursor-pointer">
        <div className="flex flex-col items-center justify-center h-full p-6">
          <div className="text-5xl mb-2">🌀</div>
          <h2 className="text-2xl font-semibold text-red-200 mb-1">Quantum Maze</h2>
          <p className="text-sm text-red-300 group-hover:underline transition">Explore Now</p>
        </div>
      </div>
    </Link>
  </div>


        <div className="mt-16 text-sm text-blue-400 italic opacity-75 animate-pulse">
          ⚡ More quantum games arriving soon...
        </div>
      </div>
    </main>
  );
}
