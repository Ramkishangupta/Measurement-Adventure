import React, { useState } from 'react';
import { Ruler, Box, Square, ArrowRight } from 'lucide-react';
import LengthGame from './games/LengthGame';
import AreaGame from './games/AreaGame';
import VolumeGame from './games/VolumeGame';

type GameType = 'length' | 'area' | 'volume';

export default function GameContainer() {
  const [currentGame, setCurrentGame] = useState<GameType>('length');
  const [score, setScore] = useState(0);

  const games = {
    length: <LengthGame onScoreUpdate={(points) => setScore(s => s + points)} />,
    area: <AreaGame onScoreUpdate={(points) => setScore(s => s + points)} />,
    volume: <VolumeGame onScoreUpdate={(points) => setScore(s => s + points)} />
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">
          Measurement Adventure
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentGame('length')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  currentGame === 'length' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-100 text-purple-600'
                }`}
              >
                <Ruler size={20} />
                Length
              </button>
              <button
                onClick={() => setCurrentGame('area')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  currentGame === 'area' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-100 text-purple-600'
                }`}
              >
                <Square size={20} />
                Area
              </button>
              <button
                onClick={() => setCurrentGame('volume')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  currentGame === 'volume' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-100 text-purple-600'
                }`}
              >
                <Box size={20} />
                Volume
              </button>
            </div>
            <div className="bg-purple-100 px-4 py-2 rounded-lg">
              <span className="font-bold text-purple-600">Score: {score}</span>
            </div>
          </div>
          
          {games[currentGame]}
        </div>
      </div>
    </div>
  );
}