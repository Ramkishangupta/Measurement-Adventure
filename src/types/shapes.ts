export type ShapeType = 'rectangle' | 'triangle' | 'circle' | 'pentagon';

export type QuestionType = 'length' | 'area' | 'volume';

export interface Question {
  type: QuestionType;
  shape?: ShapeType;
  dimensions: number[];
  correctAnswer: number;
}