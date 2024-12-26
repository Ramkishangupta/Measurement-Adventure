import React, { useState, useEffect } from 'react';
import { Square } from 'lucide-react';

interface Props {
  onScoreUpdate: (points: number) => void;
}

export default function AreaGame({ onScoreUpdate }: Props) {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    setWidth(Math.floor(Math.random() * 12) + 1);
    setHeight(Math.floor(Math.random() * 12) + 1);
    setUserAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    const correctAnswer = width * height;
    
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
        <h2 className="text-xl font-semibold text-purple-800 mb-4">Calculate the Area</h2>
        
        <div className="relative w-64 h-64 mx-auto border-2 border-purple-400 rounded-lg">
          <div className="absolute -top-8 w-full text-center text-purple-600">
            {width} meters
          </div>
          <div className="absolute -left-8 h-full flex items-center justify-center transform -rotate-90 text-purple-600">
            {height} meters
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <Square className="w-12 h-12 text-purple-400" />
          </div>
        </div>

        <div className="mt-8 text-center">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-24 text-2xl font-bold text-center border-2 border-purple-300 rounded-lg"
            placeholder="?"
          />
          <p className="text-purple-600 mt-2">square meters</p>
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