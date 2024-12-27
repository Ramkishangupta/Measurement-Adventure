import React from 'react';
import { Box } from 'lucide-react';
import { Rectangle } from './Rectangle';
import { Triangle } from './Triangle';
import { Circle } from './Circle';
import { Pentagon } from './Pentagon';
import { Question } from '../../types/shapes';

interface ShapeDisplayProps {
  question: Question;
}

export function ShapeDisplay({ question }: ShapeDisplayProps) {
  switch (question.type) {
    case 'length':
      return (
        <div className="flex items-center justify-center w-full">
          <div className="w-full max-w-[16rem] sm:w-64 h-2 bg-purple-500 relative">
            <span className="absolute -top-6 w-full text-center text-sm sm:text-base">
              {question.dimensions[0]} meters
            </span>
          </div>
        </div>
      );

    case 'area':
      if (!question.shape) return null;
      
      switch (question.shape) {
        case 'rectangle':
          return <Rectangle width={question.dimensions[0]} height={question.dimensions[1]} />;
        case 'triangle':
          return <Triangle base={question.dimensions[0]} height={question.dimensions[1]} />;
        case 'circle':
          return <Circle radius={question.dimensions[0]} />;
        case 'pentagon':
          return <Pentagon side={question.dimensions[0]} />;
        default:
          return null;
      }

    case 'volume':
      return (
        <div className="relative w-full flex justify-center">
          <div className="w-36 h-36 sm:w-48 sm:h-48 border-2 border-purple-500 relative transform rotate-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <Box className="text-purple-300" size={48} />
            </div>
            <span className="absolute -top-8 w-full text-center text-sm sm:text-base">
              {question.dimensions[0]} meters
            </span>
            <span className="absolute -right-20 sm:-right-24 top-1/2 -translate-y-1/2 text-sm sm:text-base">
              {question.dimensions[1]} meters
            </span>
            <span className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 text-sm sm:text-base">
              {question.dimensions[2]} meters
            </span>
          </div>
        </div>
      );
  }
}