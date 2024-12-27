import React, { useState } from 'react';
import { Question } from './types/shapes';
import { ShapeDisplay } from './components/shapes/ShapeDisplay';
import { AnswerChecker } from './components/answer/AnswerChecker';
import { TutorialModal } from './components/tutorial/TutorialModal';
import { BookOpen, Trophy, Sparkles, LayersIcon, Image } from 'lucide-react';
import { generateQuestion } from './utils/questionGenerator';
import { Achievements } from './components/achievements/Achievements';
import { ProgressBar } from './components/progress/ProgressBar';
import { useConfetti } from './hooks/useConfetti';
import { getUnitForType } from './utils/units';
import { Header } from './components/layout/Header';
import { QuestionCard } from './components/question/QuestionCard';
import { UnitMatchingGame } from './components/games/UnitMatchingGame';
import { ImageQuizGame } from './components/games/ImageQuizGame';

export default function App() {
  const [question, setQuestion] = useState<Question>(generateQuestion());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [gameMode, setGameMode] = useState<'geometry' | 'matching' | 'image'>('geometry');
  const { triggerConfetti } = useConfetti();

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      if (streak + 1 >= 3) {
        triggerConfetti();
      }
    } else {
      setStreak(0);
    }
  };

  const handleNewQuestion = () => {
    setQuestion(generateQuestion());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Header 
          score={score} 
          streak={streak}
        />

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setGameMode('geometry')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              gameMode === 'geometry'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-purple-500 hover:bg-purple-50'
            }`}
          >
            <Sparkles size={20} />
            Geometry Quiz
          </button>
          <button
            onClick={() => setGameMode('matching')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              gameMode === 'matching'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500 hover:bg-blue-50'
            }`}
          >
            <LayersIcon size={20} />
            Unit Matching
          </button>
          <button
            onClick={() => setGameMode('image')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              gameMode === 'image'
                ? 'bg-green-500 text-white'
                : 'bg-white text-green-500 hover:bg-green-50'
            }`}
          >
            <Image size={20} />
            Image Quiz
          </button>
        </div>

        {gameMode === 'geometry' ? (
          <QuestionCard
            question={question}
            streak={streak}
            onShowTutorial={() => setShowTutorial(true)}
            onShowAchievements={() => setShowAchievements(true)}
            onAnswer={handleAnswer}
            onNewQuestion={handleNewQuestion}
          />
        ) : gameMode === 'matching' ? (
          <UnitMatchingGame />
        ) : (
          <ImageQuizGame />
        )}
      </div>

      {question.type === 'area' && question.shape && (
        <TutorialModal
          isOpen={showTutorial}
          onClose={() => setShowTutorial(false)}
          shape={question.shape}
          dimensions={question.dimensions}
        />
      )}

      <Achievements
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
        score={score}
        streak={streak}
      />
    </div>
  );
}