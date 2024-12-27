import React from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import { ProgressBar } from '../progress/ProgressBar';

interface HeaderProps {
  score: number;
  streak: number;
}

export function Header({ score, streak }: HeaderProps) {
  return (
    <header className="text-center space-y-4">
      <div className="flex justify-center gap-2 items-center">
        <Sparkles className="text-yellow-500" size={32} />
        <h1 className="text-4xl font-bold text-purple-800">Geometry Adventure</h1>
        <Sparkles className="text-yellow-500" size={32} />
      </div>
      
      <div className="flex justify-center items-center gap-8">
        <div className="text-purple-600 flex items-center gap-2">
          <Trophy size={24} />
          <span className="text-xl">Score: {score}</span>
        </div>
        <ProgressBar streak={streak} />
      </div>
    </header>
  );
}