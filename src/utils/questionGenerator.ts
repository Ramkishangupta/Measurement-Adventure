import { Question, QuestionType, ShapeType } from '../types/shapes';

export function generateQuestion(): Question {
  const types: QuestionType[] = ['length', 'area', 'volume'];
  const shapes: ShapeType[] = ['rectangle', 'triangle', 'circle', 'pentagon'];
  
  const type = types[Math.floor(Math.random() * types.length)];
  const shape = type === 'area' ? shapes[Math.floor(Math.random() * shapes.length)] : undefined;
  
  let dimensions: number[];
  let correctAnswer: number;
  
  switch (type) {
    case 'length':
      dimensions = [Math.floor(Math.random() * 10) + 1];
      correctAnswer = dimensions[0];
      break;
      
    case 'area':
      if (shape === 'circle') {
        dimensions = [Math.floor(Math.random() * 5) + 1];
        correctAnswer = Math.PI * dimensions[0] * dimensions[0];
      } else {
        dimensions = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
        correctAnswer = shape === 'triangle' 
          ? (dimensions[0] * dimensions[1]) / 2
          : dimensions[0] * dimensions[1];
      }
      break;
      
    case 'volume':
      dimensions = [
        Math.floor(Math.random() * 5) + 1,
        Math.floor(Math.random() * 5) + 1,
        Math.floor(Math.random() * 5) + 1
      ];
      correctAnswer = dimensions[0] * dimensions[1] * dimensions[2];
      break;
  }
  
  return { type, shape, dimensions, correctAnswer };
}