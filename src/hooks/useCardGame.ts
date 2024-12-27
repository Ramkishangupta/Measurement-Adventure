import { useState, useEffect } from 'react';
import { Card, MatchPair } from '../types/cards';

export function useCardGame(matches: MatchPair[]) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const initializeCards = () => {
    const initialCards = matches.flatMap((match, index) => [
      {
        id: `unit-${index}`,
        type: 'unit' as const,
        content: match.unit,
        matched: false,
        flipped: false
      },
      {
        id: `value-${index}`,
        type: 'value' as const,
        content: match.value,
        matched: false,
        flipped: false
      }
    ]);

    // Shuffle cards
    return initialCards.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setCards(initializeCards());
  }, []);

  const handleCardClick = (clickedCard: Card) => {
    if (flippedCards.length === 2 || clickedCard.matched || clickedCard.flipped) {
      return;
    }

    const newCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, flipped: true } : card
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      const matchIndex = matches.findIndex(
        match => 
          (first.content === match.unit && second.content === match.value) ||
          (first.content === match.value && second.content === match.unit)
      );

      if (matchIndex !== -1) {
        setMatchedPairs(prev => prev + 1);
        setCards(cards =>
          cards.map(card =>
            card.id === first.id || card.id === second.id
              ? { ...card, matched: true, flipped: true }
              : card
          )
        );
      } else {
        setTimeout(() => {
          setCards(cards =>
            cards.map(card =>
              card.id === first.id || card.id === second.id
                ? { ...card, flipped: false }
                : card
            )
          );
        }, 1000);
      }

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  const resetGame = () => {
    setCards(initializeCards());
    setFlippedCards([]);
    setMatchedPairs(0);
  };

  return {
    cards,
    matchedPairs,
    totalPairs: matches.length,
    handleCardClick,
    resetGame
  };
}