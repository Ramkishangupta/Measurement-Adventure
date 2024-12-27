import { useState, useEffect } from 'react';

export function useTimer(initialTime: number = 30) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsRunning(true);
  };

  return { timeLeft, isRunning, resetTimer };
}