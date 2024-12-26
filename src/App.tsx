import React, { useState } from 'react';
import { GameCard } from './components/GameCard';
import { Question } from './components/Question';

type QuestionType = 'length' | 'area' | 'volume';

interface GeneratedQuestion {
  type: QuestionType;
  dimensions: number[];
  answer: number;
  unit: string;
}

function App() {
  const [activeType, setActiveType] = useState<QuestionType>('length');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<GeneratedQuestion>(() => 
    generateQuestion('length')
  );

  function generateQuestion(type: QuestionType): GeneratedQuestion {
    switch (type) {
      case 'length':
        const length = Math.floor(Math.random() * 10) + 1;
        return {
          type: 'length',
          dimensions: [length],
          answer: length,
          unit: 'meters',
        };
      case 'area':
        const width = Math.floor(Math.random() * 10) + 1;
        const height = Math.floor(Math.random() * 10) + 1;
        return {
          type: 'area',
          dimensions: [width, height],
          answer: width * height,
          unit: 'square meters',
        };
      case 'volume':
        const l = Math.floor(Math.random() * 5) + 1;
        const w = Math.floor(Math.random() * 5) + 1;
        const h = Math.floor(Math.random() * 5) + 1;
        return {
          type: 'volume',
          dimensions: [l, w, h],
          answer: l * w * h,
          unit: 'cubic meters',
        };
    }
  }

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNewQuestion = () => {
    setCurrentQuestion(generateQuestion(activeType));
  };

  const handleTypeChange = (type: QuestionType) => {
    setActiveType(type);
    setCurrentQuestion(generateQuestion(type));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">
          Measurement Adventure
        </h1>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <GameCard
                type="length"
                isActive={activeType === 'length'}
                onClick={() => handleTypeChange('length')}
              />
              <GameCard
                type="area"
                isActive={activeType === 'area'}
                onClick={() => handleTypeChange('area')}
              />
              <GameCard
                type="volume"
                isActive={activeType === 'volume'}
                onClick={() => handleTypeChange('volume')}
              />
            </div>
            <div className="bg-purple-100 px-4 py-2 rounded-lg">
              <span className="text-purple-700">Score: {score}</span>
            </div>
          </div>

          <Question 
            question={currentQuestion} 
            onAnswer={handleAnswer}
            onNewQuestion={handleNewQuestion}
          />
        </div>
      </div>
    </div>
  );
}

export default App;