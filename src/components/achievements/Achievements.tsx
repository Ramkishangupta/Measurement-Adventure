import React from 'react';
import { X, Trophy, Target, Zap, Crown } from 'lucide-react';

interface AchievementsProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  streak: number;
}

const ACHIEVEMENTS = [
  {
    id: 'beginner',
    title: 'Geometry Novice',
    description: 'Score your first point',
    icon: Target,
    requirement: (score: number) => score >= 1,
    color: 'text-blue-500'
  },
  {
    id: 'streak',
    title: 'On Fire!',
    description: 'Get a streak of 3 correct answers',
    icon: Zap,
    requirement: (score: number, streak: number) => streak >= 3,
    color: 'text-orange-500'
  },
  {
    id: 'master',
    title: 'Geometry Master',
    description: 'Score 10 points',
    icon: Crown,
    requirement: (score: number) => score >= 10,
    color: 'text-yellow-500'
  }
];

export function Achievements({ isOpen, onClose, score, streak }: AchievementsProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Trophy className="text-purple-600" size={32} />
            <h2 className="text-2xl font-bold text-purple-800">Achievements</h2>
          </div>

          <div className="grid gap-4">
            {ACHIEVEMENTS.map(achievement => {
              const earned = achievement.requirement(score, streak);
              const Icon = achievement.icon;
              
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 ${
                    earned ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`${achievement.color} ${earned ? 'opacity-100' : 'opacity-50'}`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {earned && (
                      <span className="ml-auto text-green-500">✓</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}