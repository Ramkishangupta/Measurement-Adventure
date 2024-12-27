import React from 'react';
import { CardGrid } from '../cards/CardGrid';
import { useCardGame } from '../../hooks/useCardGame';
import { unitMatches } from '../../data/unitMatches';

export function UnitMatchingGame() {
  const {
    cards,
    matchedPairs,
    totalPairs,
    handleCardClick,
    resetGame
  } = useCardGame(unitMatches);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Match Units Game
      </h2>
      <CardGrid
        cards={cards}
        matchedPairs={matchedPairs}
        totalPairs={totalPairs}
        onCardClick={handleCardClick}
        onReset={resetGame}
      />
    </div>
  );
}