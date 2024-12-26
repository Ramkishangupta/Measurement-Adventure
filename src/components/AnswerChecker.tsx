import React, { useState } from 'react';

interface AnswerCheckerProps {
  correctAnswer: number;
  unit: string;
  onAnswer: (correct: boolean) => void;
  onNewQuestion: () => void;
}

export function AnswerChecker({ correctAnswer, unit, onAnswer, onNewQuestion }: AnswerCheckerProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const checkAnswer = () => {
    if (!userAnswer.trim()) return; // Don't check empty answers
    
    const isCorrect = Number(userAnswer) === correctAnswer;
    setShowFeedback(true);
    onAnswer(isCorrect);
  };

  const handleNewQuestion = () => {
    setUserAnswer('');
    setShowFeedback(false);
    onNewQuestion();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-24 px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="?"
        />
        <span className="text-purple-600">{unit}</span>
      </div>

      <div className="flex gap-4">
        <button
          onClick={checkAnswer}
          disabled={!userAnswer.trim()}
          className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check Answer
        </button>
        <button
          onClick={handleNewQuestion}
          className="px-6 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        >
          New Question
        </button>
      </div>

      {showFeedback && (
        <div
          className={`text-lg font-semibold ${
            Number(userAnswer) === correctAnswer ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {Number(userAnswer) === correctAnswer
            ? '🎉 Correct! Well done!'
            : `Try again! The answer is ${correctAnswer}`}
        </div>
      )}
    </div>
  );
}