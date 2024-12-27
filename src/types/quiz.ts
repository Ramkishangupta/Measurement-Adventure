export interface QuizQuestion {
  id: number;
  imageUrl: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  totalQuestions: number;
}