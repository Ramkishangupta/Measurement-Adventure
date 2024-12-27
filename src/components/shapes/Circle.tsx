import React from 'react';

interface CircleProps {
  radius: number;
}

export function Circle({ radius }: CircleProps) {
  return (
    <div className="relative w-64 h-64">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border-2 border-purple-500 relative">
          <div className="absolute top-1/2 left-1/2 w-24 h-[2px] bg-purple-300 origin-left" />
          <span className="absolute top-1/2 left-full ml-2 whitespace-nowrap">
            radius: {radius} meters
          </span>
        </div>
      </div>
    </div>
  );
}