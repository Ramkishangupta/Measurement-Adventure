import { QuestionType } from '../types/shapes';

export function getUnitForType(type: QuestionType): string {
  switch (type) {
    case 'length':
      return 'meters';
    case 'area':
      return 'square meters';
    case 'volume':
      return 'cubic meters';
  }
}