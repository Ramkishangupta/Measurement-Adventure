import React, { useState, useEffect } from 'react';
import { Box } from 'lucide-react';

interface Props {
  onScoreUpdate: (points: number) => void;
}

export default function VolumeGame({ onScoreUpdate }: Props) {
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    setLength(Math.floor(Math.random() * 10) + 1);
    setWidth(Math.floor(Math.random() * 10) + 1);
    setHeight(Math.floor(Math.random() * 10) + 1);
    setUserAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    const correctAnswer = length * width * height;
    
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
        <h2 className="text-xl font-semibold text-purple-800 mb-4">Calculate the Volume</h2>
        
        <div className="relative w-64 h-64 mx-auto">
          <div className="w-full h-full flex items-center justify-center">
            <Box className="w-32 h-32 text-purple-400" />
            <div className="absolute top-1/4 left-1/4 text-purple-600">
              Length: {length}m
            </div>
            <div className="absolute top-1/2 left-1/4 text-purple-600">
              Width: {width}m
            </div>
            <div className="absolute bottom-1/4 left-1/4 text-purple-600">
              Height: {height}m
            </div>
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
          <p className="text-purple-600 mt-2">cubic meters</p>
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