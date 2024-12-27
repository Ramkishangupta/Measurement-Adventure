import React from 'react';
import { BookOpen, Trophy, Timer } from 'lucide-react';
import { Question } from '../../types/shapes';
import { ShapeDisplay } from '../shapes/ShapeDisplay';
import { AnswerChecker } from '../answer/AnswerChecker';
import { getUnitForType } from '../../utils/units';
import { useTimer } from '../../hooks/useTimer';

interface QuestionCardProps {
  question: Question;
  streak: number;
  onShowTutorial: () => void;
  onShowAchievements: () => void;
  onAnswer: (correct: boolean) => void;
  onNewQuestion: () => void;
}

export function QuestionCard({
  question,
  streak,
  onShowTutorial,
  onShowAchievements,
  onAnswer,
  onNewQuestion
}: QuestionCardProps) {
  const { timeLeft, resetTimer } = useTimer(45);

  const handleAnswer = (correct: boolean) => {
    onAnswer(correct);
    resetTimer();
  };

  const handleNewQuestion = () => {
    onNewQuestion();
    resetTimer();
  };

  const getBackgroundImage = () => {
    const images = {
      length: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=2400',
      area: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=2400',
      volume: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=2400'
    };
    return images[question.type];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${getBackgroundImage()})` }}
      />
      
      <div className="relative">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-purple-700 capitalize flex items-center gap-2">
            <span>Calculate the {question.type}</span>
            {streak >= 3 && (
              <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full animate-pulse">
                🔥 {streak} streak!
              </span>
            )}
          </h2>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
              <Timer className="text-purple-600" size={20} />
              <span className={`font-mono text-lg ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-purple-600'}`}>
                {timeLeft}s
              </span>
            </div>
            {question.type === 'area' && question.shape && (
              <button
                onClick={onShowTutorial}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
              >
                <BookOpen size={20} />
                <span>Tutorial</span>
              </button>
            )}
            <button
              onClick={onShowAchievements}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              <Trophy size={20} />
              <span>Achievements</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="flex items-center justify-center bg-purple-50 rounded-lg p-4 shadow-inner">
            <ShapeDisplay question={question} />
          </div>
          <div className="flex items-center justify-center">
            <AnswerChecker
              correctAnswer={question.correctAnswer}
              unit={getUnitForType(question.type)}
              onAnswer={handleAnswer}
              onNewQuestion={handleNewQuestion}
              timeLeft={timeLeft}
            />
          </div>
        </div>
      </div>
    </div>
  );
}