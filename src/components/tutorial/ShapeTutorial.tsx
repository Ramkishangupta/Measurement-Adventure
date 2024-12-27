import React, { useState, useEffect } from 'react';
import { ShapeType } from '../../types/shapes';
import { useTutorialSteps } from '../../hooks/useTutorialSteps';

interface ShapeTutorialProps {
  shape: ShapeType;
  dimensions: number[];
}

export function ShapeTutorial({ shape, dimensions }: ShapeTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = useTutorialSteps(shape, dimensions);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentStep, steps.length]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-800 capitalize">
        How to calculate the area of a {shape}
      </h2>
      
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="text-center space-y-4">
          {steps[currentStep].visualization}
          <div className="text-2xl font-mono text-purple-700">{steps[currentStep].formula}</div>
          <p className="text-gray-600">{steps[currentStep].explanation}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <div className="text-sm text-purple-600">
          Step {currentStep + 1} of {steps.length}
        </div>
        <button
          onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}