import React from 'react';
import { Square, Box } from 'lucide-react';
import { AnswerChecker } from './AnswerChecker';

interface QuestionProps {
  question: {
    type: 'length' | 'area' | 'volume';
    dimensions: number[];
    answer: number;
    unit: string;
  };
  onAnswer: (correct: boolean) => void;
  onNewQuestion: () => void;
}

export function Question({ question, onAnswer, onNewQuestion }: QuestionProps) {
  const renderShape = () => {
    switch (question.type) {
      case 'length':
        return (
          <div className="flex items-center justify-center">
            <div className="w-64 h-2 bg-purple-500 relative">
              <span className="absolute -top-6 w-full text-center">
                {question.dimensions[0]} meters
              </span>
            </div>
          </div>
        );
      case 'area':
        return (
          <div className="relative">
            <div className="w-64 h-64 border-2 border-purple-500 relative">
              <span className="absolute -top-6 w-full text-center">
                {question.dimensions[0]} meters
              </span>
              <span className="absolute -left-16 top-1/2 -translate-y-1/2 transform -rotate-90">
                {question.dimensions[1]} meters
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <Square className="text-purple-300" size={24} />
              </div>
            </div>
          </div>
        );
      case 'volume':
        return (
          <div className="relative">
            <div className="w-48 h-48 border-2 border-purple-500 relative transform rotate-12">
              <div className="absolute inset-0 flex items-center justify-center">
                <Box className="text-purple-300" size={64} />
              </div>
              <span className="absolute -top-8 w-full text-center">
                {question.dimensions[0]} meters
              </span>
              <span className="absolute -right-24 top-1/2 -translate-y-1/2">
                {question.dimensions[1]} meters
              </span>
              <span className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2">
                {question.dimensions[2]} meters
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-xl text-purple-800 font-semibold">
        Calculate the {question.type}
      </h2>

      <div className="p-8">{renderShape()}</div>

      <AnswerChecker
        correctAnswer={question.answer}
        unit={question.unit}
        onAnswer={onAnswer}
        onNewQuestion={onNewQuestion}
      />
    </div>
  );
}