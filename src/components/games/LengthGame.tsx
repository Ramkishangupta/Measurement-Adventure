import React, { useState, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface Props {
  onScoreUpdate: (points: number) => void;
}

const UNITS = ['millimeters', 'centimeters', 'meters', 'kilometers'];
const CONVERSIONS = {
  'millimeters-centimeters': 0.1,
  'centimeters-meters': 0.01,
  'meters-kilometers': 0.001
};

export default function LengthGame({ onScoreUpdate }: Props) {
  const [value, setValue] = useState<number>(0);
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    const randomValue = Math.floor(Math.random() * 100) + 1;
    const randomFromIndex = Math.floor(Math.random() * (UNITS.length - 1));
    setValue(randomValue);
    setFromUnit(UNITS[randomFromIndex]);
    setToUnit(UNITS[randomFromIndex + 1]);
    setUserAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    const conversionKey = `${fromUnit}-${toUnit}`;
    const correctAnswer = value * CONVERSIONS[conversionKey as keyof typeof CONVERSIONS];
    
    if (Number(userAnswer) === correctAnswer) {
      setFeedback('Correct! 🎉');
      onScoreUpdate(10);
      setTimeout(generateNewQuestion, 1500);
    } else {
      setFeedback('Try again! 🤔');
      onScoreUpdate(-5);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-purple-800 mb-4">Length Conversion</h2>
        <div className="flex items-center gap-4 justify-center">
          <div className="text-center">
            <span className="text-2xl font-bold text-purple-700">{value}</span>
            <p className="text-purple-600">{fromUnit}</p>
          </div>
          <ArrowLeftRight className="text-purple-500" />
          <div className="text-center">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-24 text-2xl font-bold text-center border-2 border-purple-300 rounded-lg"
              placeholder="?"
            />
            <p className="text-purple-600">{toUnit}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={checkAnswer}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Check Answer
        </button>
        <button
          onClick={generateNewQuestion}
          className="px-6 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
        >
          New Question
        </button>
      </div>

      {feedback && (
        <p className="text-center text-lg font-semibold text-purple-600">
          {feedback}
        </p>
      )}
    </div>
  );
}