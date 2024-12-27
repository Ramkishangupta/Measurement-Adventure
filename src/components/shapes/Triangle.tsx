import React from 'react';

interface TriangleProps {
  base: number;
  height: number;
}

export function Triangle({ base, height }: TriangleProps) {
  return (
    <div className="relative w-64 h-64">
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div 
          className="w-0 h-0 border-l-[120px] border-r-[120px] border-b-[200px] border-l-transparent border-r-transparent border-b-purple-500"
          style={{ opacity: 0.2 }}
        />
        <div className="absolute bottom-0 w-full text-center -mb-6">
          base: {base} meters
        </div>
        <div className="absolute left-1/2 h-full -ml-16 flex items-center">
          <span className="transform -rotate-90 whitespace-nowrap">
            height: {height} meters
          </span>
        </div>
      </div>
    </div>
  );
}