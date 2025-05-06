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