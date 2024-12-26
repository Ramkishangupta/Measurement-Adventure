import React from 'react';
import { Ruler, Square, Box } from 'lucide-react';

interface GameCardProps {
  type: 'length' | 'area' | 'volume';
  isActive: boolean;
  onClick: () => void;
}

export function GameCard({ type, isActive, onClick }: GameCardProps) {
  const icons = {
    length: Ruler,
    area: Square,
    volume: Box,
  };

  const Icon = icons[type];

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
        isActive
          ? 'bg-purple-500 text-white'
          : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
      }`}
    >
      <Icon size={20} />
      <span className="capitalize">{type}</span>
    </button>
  );
}