"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const emojiList = ["🍎", "🚀", "🌈", "🎲", "🐱", "🎧", "🧠", "🎮"];

const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

type CardType = {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
};

const MemoryPage = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const emojiPairs = shuffleArray([...emojiList, ...emojiList]);
    const newCards = emojiPairs.map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }));
    setCards(newCards);
    setFlippedIndices([]);
    setIsLocked(false);
    setMatches(0);
  };

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].flipped || cards[index].matched) return;

    const updatedCards = [...cards];
    updatedCards[index].flipped = true;
    const newFlipped = [...flippedIndices, index];

    setCards(updatedCards);
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      setIsLocked(true);
      if (cards[first].emoji === cards[second].emoji) {
        updatedCards[first].matched = true;
        updatedCards[second].matched = true;
        setCards(updatedCards);
        setMatches((prev) => prev + 1);
        setTimeout(() => {
          setFlippedIndices([]);
          setIsLocked(false);
        }, 800);
      } else {
        setTimeout(() => {
          updatedCards[first].flipped = false;
          updatedCards[second].flipped = false;
          setCards(updatedCards);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 800);
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white p-6 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-64 h-64 bg-pink-500 rounded-full opacity-10 blur-3xl"></div>
      </div>
      <div className="relative z-10 mt-16">
        <Link href="/" className="absolute left-1 flex items-center text-blue-300 hover:text-blue-200 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Home
        </Link>
        <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          Memory Match Game 🧠
        </h1>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-3xl sm:text-4xl md:text-5xl rounded-lg shadow-lg font-bold ${
                card.flipped || card.matched ? "bg-white text-black" : "bg-purple-800 hover:bg-purple-700"
              } transition-all duration-300`}
            >
              {card.flipped || card.matched ? card.emoji : "❓"}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-pink-500/30"
          >
            New Game
          </button>
        </div>
        {matches === emojiList.length && (
          <div className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-lg animate-bounce shadow-lg">
            🎉 You matched all pairs! Great memory! 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryPage;
