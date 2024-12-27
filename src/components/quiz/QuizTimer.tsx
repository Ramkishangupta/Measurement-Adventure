import React from 'react';
import { Timer } from 'lucide-react';

interface QuizTimerProps {
  timeLeft: number;
  totalTime: number;
}

export function QuizTimer({ timeLeft, totalTime }: QuizTimerProps) {
  const percentage = (timeLeft / totalTime) * 100;
  
  return (
    <div className="flex items-center gap-2">
      <Timer size={20} className="text-purple-600" />
      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            timeLeft < 5 ? 'bg-red-500' : timeLeft < 10 ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`font-mono ${
        timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-purple-600'
      }`}>
        {timeLeft}s
      </span>
    </div>
  );
}