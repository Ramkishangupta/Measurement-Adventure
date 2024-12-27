import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  totalQuestions: number;
  currentStreak: number;
}

export function ScoreDisplay({ score, totalQuestions, currentStreak }: ScoreDisplayProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
        <Trophy className="text-purple-600" size={20} />
        <span className="font-medium text-purple-700">{score}/{totalQuestions}</span>
      </div>
      {currentStreak > 1 && (
        <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full flex items-center gap-2">
          <span className="font-medium">🔥 {currentStreak}x Streak!</span>
        </div>
      )}
    </div>
  );
}