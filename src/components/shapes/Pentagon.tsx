import React from 'react';

interface PentagonProps {
  side: number;
}

export function Pentagon({ side }: PentagonProps) {
  return (
    <div className="relative w-64 h-64">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-48 h-48">
          <path
            d="M50 0 L97.55 34.55 L79.39 90.45 L20.61 90.45 L2.45 34.55 Z"
            fill="none"
            stroke="rgb(168 85 247)"
            strokeWidth="2"
          />
        </svg>
        <span className="absolute bottom-0 text-center">
          side: {side} meters
        </span>
      </div>
    </div>
  );
}