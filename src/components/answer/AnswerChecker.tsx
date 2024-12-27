import React, { useState, useEffect } from 'react';
import { Send, RefreshCw } from 'lucide-react';

interface AnswerCheckerProps {
  correctAnswer: number;
  unit: string;
  onAnswer: (correct: boolean) => void;
  onNewQuestion: () => void;
  timeLeft: number;
}

export function AnswerChecker({ 
  correctAnswer, 
  unit, 
  onAnswer, 
  onNewQuestion,
  timeLeft 
}: AnswerCheckerProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (timeLeft === 0 && !showFeedback) {
      checkAnswer();
    }
  }, [timeLeft]);

  const checkAnswer = () => {
    if (!userAnswer.trim() && timeLeft > 0) return;
    
    const isCorrect = Math.abs(Number(userAnswer) - correctAnswer) < 0.01;
    setShowFeedback(true);
    
    // Calculate points based on time left
    const timeBonus = Math.floor(timeLeft / 5);
    const earnedPoints = isCorrect ? 10 + timeBonus : 0;
    setPoints(earnedPoints);
    
    onAnswer(isCorrect);
  };

  const handleNewQuestion = () => {
    setUserAnswer('');
    setShowFeedback(false);
    setPoints(0);
    onNewQuestion();
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
      <div className="flex items-center gap-2 w-full">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="flex-1 px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          placeholder="?"
          disabled={showFeedback || timeLeft === 0}
        />
        <span className="text-purple-600 min-w-20">{unit}</span>
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-2">
        <button
          onClick={checkAnswer}
          disabled={!userAnswer.trim() || showFeedback || timeLeft === 0}
          className="w-full px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Send size={18} />
          Check Answer
        </button>
        <button
          onClick={handleNewQuestion}
          className="w-full px-6 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw size={18} />
          New Question
        </button>
      </div>

      {(showFeedback || timeLeft === 0) && (
        <div className="text-center space-y-2">
          <div className={`text-lg font-semibold ${
            Math.abs(Number(userAnswer) - correctAnswer) < 0.01 ? 'text-green-500' : 'text-red-500'
          }`}>
            {Math.abs(Number(userAnswer) - correctAnswer) < 0.01
              ? '🎉 Correct! Well done!'
              : timeLeft === 0 
                ? '⏰ Time\'s up!'
                : `Try again! The answer is ${correctAnswer.toFixed(2)}`}
          </div>
          {points > 0 && (
            <div className="text-purple-600 font-semibold animate-bounce">
              +{points} points!
            </div>
          )}
        </div>
      )}
    </div>
  );
}