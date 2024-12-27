import React, { useState } from 'react';
import { Image, ChevronLeft, ChevronRight } from 'lucide-react';
import { imageQuizQuestions } from '../../data/imageQuizData';
import { QuizTimer } from '../quiz/QuizTimer';
import { ScoreDisplay } from '../quiz/ScoreDisplay';
import { useQuizTimer } from '../../hooks/useQuizTimer';
import { useConfetti } from '../../hooks/useConfetti';

const QUESTION_TIME = 20; // seconds
const TIME_BONUS_MULTIPLIER = 5;

export function ImageQuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { timeLeft, resetTimer } = useQuizTimer(QUESTION_TIME);
  const { triggerConfetti } = useConfetti();

  const question = imageQuizQuestions[currentQuestion];

  const calculateScore = (isCorrect: boolean) => {
    if (!isCorrect) return 0;
    const timeBonus = Math.floor(timeLeft * TIME_BONUS_MULTIPLIER);
    const streakBonus = Math.floor(streak * 10);
    return 100 + timeBonus + streakBonus;
  };

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;
    
    const isCorrect = answer === question.correctAnswer;
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (isCorrect) {
      const points = calculateScore(true);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      if (streak >= 2) triggerConfetti();
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion < imageQuizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      resetTimer();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      resetTimer();
    }
  };

  // Auto-submit on timer end
  React.useEffect(() => {
    if (timeLeft === 0 && !showFeedback) {
      setShowFeedback(true);
      setStreak(0);
    }
  }, [timeLeft]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          <Image size={24} />
          Guess The Shape
        </h2>
        <ScoreDisplay
          score={score}
          totalQuestions={imageQuizQuestions.length}
          currentStreak={streak}
        />
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-center text-gray-600">
            Question {currentQuestion + 1} of {imageQuizQuestions.length}
          </div>
          <QuizTimer timeLeft={timeLeft} totalTime={QUESTION_TIME} />
        </div>

        <div className="relative aspect-video rounded-lg overflow-hidden">
          <img
            src={question.imageUrl}
            alt="Geometry Quiz"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-xl font-medium text-center text-gray-800 my-4">
          {question.question}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback || timeLeft === 0}
              className={`
                p-4 rounded-lg text-lg font-medium transition-all
                ${selectedAnswer === option
                  ? option === question.correctAnswer
                    ? 'bg-green-100 text-green-700 border-2 border-green-500'
                    : 'bg-red-100 text-red-700 border-2 border-red-500'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }
                ${showFeedback && option === question.correctAnswer
                  ? 'bg-green-100 text-green-700 border-2 border-green-500'
                  : ''
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {showFeedback && selectedAnswer && (
          <div className="text-center animate-fade-in">
            {selectedAnswer === question.correctAnswer ? (
              <div className="text-green-600 font-medium">
                🎉 Correct! +{calculateScore(true)} points
                {streak > 1 && ` (${streak}x streak!)`}
              </div>
            ) : (
              <div className="text-red-600 font-medium">
                Try again! The correct answer was {question.correctAnswer}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg disabled:opacity-50"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={currentQuestion === imageQuizQuestions.length - 1 || !showFeedback}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg disabled:opacity-50"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}