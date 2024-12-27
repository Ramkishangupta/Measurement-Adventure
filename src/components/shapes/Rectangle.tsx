import React from 'react';

interface RectangleProps {
  width: number;
  height: number;
}

export function Rectangle({ width, height }: RectangleProps) {
  return (
    <div className="relative">
      <div className="w-64 h-64 border-2 border-purple-500 relative">
        <span className="absolute -top-6 w-full text-center">
          {width} meters
        </span>
        <span className="absolute -left-16 top-1/2 -translate-y-1/2 transform -rotate-90">
          {height} meters
        </span>
      </div>
    </div>
  );
}