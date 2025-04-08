'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Animation effect on page load
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white p-6 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-pink-500 rounded-full opacity-10 blur-3xl"></div>
      </div>
      
      {/* Main content with entrance animation */}
      <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-2 text-blue-300">Welcome to</div>
        <h1 className="text-6xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Quantum Arcade
        </h1>
        <div className="text-lg mb-14 text-blue-200 max-w-md text-center">
          Experience gaming at the quantum frontier
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/chess">
            <div className="w-72 h-48 relative group transition-all duration-300 transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-purple-500/30 group-hover:shadow-xl"></div>
              <div className="absolute inset-0.5 bg-gray-900 rounded-2xl flex flex-col items-center justify-center p-6">
                <div className="text-4xl mb-3">♟</div>
                <div className="text-2xl font-semibold">Quantum Chess</div>
                <div className="text-sm text-purple-300 mt-2">Play Now</div>
              </div>
            </div>
          </Link>
          
          <Link href="/puzzle">
            <div className="w-72 h-48 relative group transition-all duration-300 transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-pink-500/30 group-hover:shadow-xl"></div>
              <div className="absolute inset-0.5 bg-gray-900 rounded-2xl flex flex-col items-center justify-center p-6">
                <div className="text-4xl mb-3">🧩</div>
                <div className="text-2xl font-semibold">Quantum Puzzle</div>
                <div className="text-sm text-pink-300 mt-2">Solve Now</div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="mt-12 text-sm text-blue-300 opacity-75">
          New games coming soon
        </div>
      </div>
    </div>
  );
}