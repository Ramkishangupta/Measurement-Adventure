import React from 'react';
import { Flame } from 'lucide-react';

interface ProgressBarProps {
  streak: number;
}

export function ProgressBar({ streak }: ProgressBarProps) {
  const progress = (streak % 3) / 3 * 100;
  
  return (
    <div className="flex items-center gap-2">
      <Flame className="text-orange-500" size={20} />
      <div className="w-32 h-2 bg-purple-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-orange-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-sm text-purple-600">
        {3 - (streak % 3)} to next streak
      </span>
    </div>
  );
}