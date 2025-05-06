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
     </div>
    </main>
  );
}