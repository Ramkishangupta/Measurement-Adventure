import { ShapeType } from '../types/shapes';

interface TutorialStep {
  formula: string;
  explanation: string;
  visualization?: React.ReactNode;
}

export function useTutorialSteps(shape: ShapeType, dimensions: number[]): TutorialStep[] {
  switch (shape) {
    case 'rectangle':
      return [
        {
          formula: `A = w × h`,
          explanation: 'The area of a rectangle is found by multiplying its width by its height',
          visualization: <div className="w-32 h-24 border-2 border-purple-500" />
        },
        {
          formula: `A = ${dimensions[0]} × ${dimensions[1]}`,
          explanation: 'Substitute the values into the formula',
        },
        {
          formula: `A = ${dimensions[0] * dimensions[1]}`,
          explanation: 'Multiply the numbers to get the final area',
        }
      ];

    case 'triangle':
      return [
        {
          formula: `A = (b × h) ÷ 2`,
          explanation: 'The area of a triangle is half the product of its base and height',
          visualization: <div className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[100px] border-transparent border-b-purple-500" />
        },
        {
          formula: `A = (${dimensions[0]} × ${dimensions[1]}) ÷ 2`,
          explanation: 'Substitute the values into the formula',
        },
        {
          formula: `A = ${(dimensions[0] * dimensions[1]) / 2}`,
          explanation: 'Calculate to get the final area',
        }
      ];

    case 'circle':
      return [
        {
          formula: `A = π × r²`,
          explanation: 'The area of a circle is pi times the radius squared',
          visualization: <div className="w-24 h-24 rounded-full border-2 border-purple-500" />
        },
        {
          formula: `A = 3.14 × ${dimensions[0]}²`,
          explanation: 'Substitute the radius and approximate π as 3.14',
        },
        {
          formula: `A = ${Math.PI * dimensions[0] * dimensions[0].toFixed(2)}`,
          explanation: 'Calculate to get the final area',
        }
      ];

    case 'pentagon':
      return [
        {
          formula: `A = (5 × s²) / (4 × tan(36°))`,
          explanation: 'The area of a regular pentagon uses the side length and tangent of 36°',
          visualization: <div className="w-24 h-24 border-2 border-purple-500 transform rotate-[18deg]" />
        },
        {
          formula: `A = (5 × ${dimensions[0]}²) / (4 × 0.7265)`,
          explanation: 'Substitute the side length and tan(36°) ≈ 0.7265',
        },
        {
          formula: `A = ${(5 * dimensions[0] * dimensions[0]) / (4 * Math.tan(Math.PI / 5)).toFixed(2)}`,
          explanation: 'Calculate to get the final area',
        }
      ];

    default:
      return [];
  }
}