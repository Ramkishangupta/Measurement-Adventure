import React from 'react';
import { Card as CardType } from '../../types/cards';

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
}

export function Card({ card, onClick }: CardProps) {
  return (
    <div
      onClick={() => onClick(card)}
      className="relative w-24 h-32 cursor-pointer"
    >
      <div className="absolute inset-0 transition-all duration-300 transform-gpu preserve-3d">
        {/* Front of card */}
        <div className={`
          absolute inset-0 rounded-lg p-3
          bg-gradient-to-br from-blue-400 to-blue-600 
          text-white text-3xl font-bold
          flex items-center justify-center
          ${card.flipped ? 'rotate-y-180 invisible' : ''}
        `}>
          ?
        </div>

        {/* Back of card */}
        <div className={`
          absolute inset-0 rounded-lg p-3
          bg-white border-2 border-blue-400 text-blue-600
          flex items-center justify-center
          ${!card.flipped ? 'rotate-y-180 invisible' : ''}
        `}>
          <span className="text-center text-sm font-medium">
            {card.content}
          </span>
        </div>
      </div>
    </div>
  );
}