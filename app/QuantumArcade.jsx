'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [quantumState, setQuantumState] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Quantum state oscillation effect
    const quantumInterval = setInterval(() => {
      setQuantumState(prev => (prev + 1) % 100);
    }, 50);
    
    return () => {
      clearTimeout(timer);
      clearInterval(quantumInterval);
    };
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#000120] via-[#001f5c] to-[#000833] text-white overflow-hidden px-6">
      {/* Quantum Entanglement Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-20 w-72 h-72 bg-purple-700 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-32 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl animate-ping" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-cyan-500 rounded-full opacity-10 blur-2xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        
        {/* Quantum Energy Lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] border-2 border-dashed border-blue-500/20 rounded-full animate-spin" style={{ animationDuration: '60s' }}></div>
          <div className="absolute w-[600px] h-[600px] border-2 border-dashed border-purple-500/20 rounded-full animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }}></div>
          <div className="absolute w-[400px] h-[400px] border-2 border-dashed border-cyan-500/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        </div>
        
        {/* Quantum Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50 animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-3/4 left-2/3 w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50 animate-ping" style={{ animationDuration: '2.5s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-pink-500 rounded-full shadow-lg shadow-pink-500/50 animate-ping" style={{ animationDuration: '3.5s' }}></div>
        <div className="absolute top-1/3 left-3/4 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-ping" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 animate-ping" style={{ animationDuration: '4.5s' }}></div>
      </div>

      {/* Foreground Content */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg text-cyan-400 animate-pulse">⚛️</span>
          <p className="text-lg text-indigo-300 tracking-widest">WELCOME TO</p>
          <span className="text-lg text-cyan-400 animate-pulse">⚛️</span>
        </div>
        
        <h1 className="text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-xl mb-4 text-center" 
            style={{ 
              textShadow: `0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)`,
              letterSpacing: '0.05em'
            }}>
          Quantum Arcade
        </h1>
        
        <p className="text-blue-200 text-center max-w-xl mb-12 text-lg md:text-xl">
          Dive into the multiverse of games where quantum logic meets fun.
        </p>



         {/* Game Cards */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Link href="/chess">
            <div className="w-72 h-52 relative bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-400/30 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-grid-purple opacity-20"></div>
              <div className="flex flex-col items-center justify-center h-full p-6 relative">
                <div className="text-5xl mb-2 animate-pulse" style={{ animationDuration: '2s' }}>♟</div>
                <h2 className="text-2xl font-semibold text-purple-200 mb-1">Quantum Chess</h2>
                <p className="text-sm text-purple-300 bg-purple-800/30 px-3 py-1 rounded-full border border-purple-500/30 group-hover:bg-purple-700/50 transition">Play Now</p>
              </div>
            </div>
          </Link>

          <Link href="/puzzle">
            <div className="w-72 h-52 relative bg-gradient-to-br from-pink-900/40 to-pink-800/20 border border-pink-400/30 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-pink-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-grid-pink opacity-20"></div>
              <div className="flex flex-col items-center justify-center h-full p-6 relative">
                <div className="text-5xl mb-2 animate-spin" style={{ animationDuration: '10s' }}>🧩</div>
                <h2 className="text-2xl font-semibold text-pink-200 mb-1">Quantum Puzzle</h2>
                <p className="text-sm text-pink-300 bg-pink-800/30 px-3 py-1 rounded-full border border-pink-500/30 group-hover:bg-pink-700/50 transition">Solve Now</p>
              </div>
            </div>
          </Link>

          <Link href="/tic-tac-toe">
            <div className="w-72 h-52 relative bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-400/30 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-grid-green opacity-20"></div>
              <div className="flex flex-col items-center justify-center h-full p-6 relative">
                <div className="text-5xl mb-2" style={{ 
                  animation: `${quantumState % 20 === 0 ? 'spin 1s ease-in-out' : 'none'}`
                }}>⭕</div>
                <h2 className="text-2xl font-semibold text-center text-green-200 mb-1">Quantum Tic Tac Toe</h2>
                <p className="text-sm text-green-300 bg-green-800/30 px-3 py-1 rounded-full border border-green-500/30 group-hover:bg-green-700/50 transition">Play Now</p>
              </div>
            </div>
          </Link>

          <Link href="/sudoku">
            <div className="w-72 h-52 relative bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 border border-yellow-400/30 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-yellow-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-grid-yellow opacity-20"></div>
              <div className="flex flex-col items-center justify-center h-full p-6 relative">
                <div className="text-5xl mb-2 animate-pulse" style={{ animationDuration: '3s' }}>🧠</div>
                <h2 className="text-2xl font-semibold text-yellow-200 mb-1">Quantum Sudoku</h2>
                <p className="text-sm text-yellow-300 bg-yellow-800/30 px-3 py-1 rounded-full border border-yellow-500/30 group-hover:bg-yellow-700/50 transition">Play Now</p>
              </div>
            </div>
          </Link>

          <Link href="/memory">
            <div className="w-72 h-52 relative bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 border border-cyan-400/30 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-grid-cyan opacity-20"></div>
              <div className="flex flex-col items-center justify-center h-full p-6 relative">
                <div className="text-5xl mb-2 animate-pulse" style={{ animationDuration: '2.5s' }}>🧬</div>
                <h2 className="text-2xl font-semibold text-cyan-200 mb-1">Quantum Memory</h2>
                <p className="text-sm text-cyan-300 bg-cyan-800/30 px-3 py-1 rounded-full border border-cyan-500/30 group-hover:bg-cyan-700/50 transition">Play Now</p>
              </div>
            </div>
          </Link>

          <Link href="/maze">
            <div className="w-72 h-52 relative bg-gradient-to-br from-red-900/40 to-red-800/20 border border-red-400/30 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-grid-red opacity-20"></div>
              <div className="flex flex-col items-center justify-center h-full p-6 relative">
                <div className="text-5xl mb-2" style={{ 
                  animation: `${quantumState % 25 === 0 ? 'pulse 1s ease-in-out' : 'none'}`
                }}>🌀</div>
                <h2 className="text-2xl font-semibold text-red-200 mb-1">Quantum Maze</h2>
                <p className="text-sm text-red-300 bg-red-800/30 px-3 py-1 rounded-full border border-red-500/30 group-hover:bg-red-700/50 transition">Explore Now</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-16 bg-blue-900/20 border border-blue-500/30 px-4 py-2 rounded-full">
          <p className="text-sm text-blue-300 italic flex items-center gap-2">
            <span className="animate-pulse">⚡</span> 
            More quantum games arriving from parallel dimensions soon...
            <span className="animate-pulse">⚡</span>
          </p>
        </div>


     </div>
    </main>
  );
}