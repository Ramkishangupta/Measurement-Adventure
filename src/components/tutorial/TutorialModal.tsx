import React from 'react';
import { X } from 'lucide-react';
import { ShapeType } from '../../types/shapes';
import { ShapeTutorial } from './ShapeTutorial';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  shape: ShapeType;
  dimensions: number[];
}

export function TutorialModal({ isOpen, onClose, shape, dimensions }: TutorialModalProps) {
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
        <ShapeTutorial shape={shape} dimensions={dimensions} />
      </div>
    </div>
  );
}