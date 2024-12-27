import React from 'react';
import { Card as CardComponent } from './Card';
import { Card } from '../../types/cards';
import { RefreshCw } from 'lucide-react';

interface CardGridProps {
  cards: Card[];
  matchedPairs: number;
  totalPairs: number;
  onCardClick: (card: Card) => void;
  onReset: () => void;
}

export function CardGrid({
  cards,
  matchedPairs,
  totalPairs,
  onCardClick,
  onReset
}: CardGridProps) {
  const isGameComplete = matchedPairs === totalPairs;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-lg font-medium text-blue-600">
          Matches: {matchedPairs} / {totalPairs}
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <RefreshCw size={18} />
          Reset Game
        </button>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {cards.map(card => (
          <CardComponent
            key={card.id}
            card={card}
            onClick={onCardClick}
          />
        ))}
      </div>

      {isGameComplete && (
        <div className="text-center py-4">
          <div className="text-2xl font-bold text-green-500 mb-2">
            🎉 Congratulations! 🎉
          </div>
          <p className="text-gray-600">
            You've matched all the units! Click reset to play again.
          </p>
        </div>
      )}
    </div>
  );
}