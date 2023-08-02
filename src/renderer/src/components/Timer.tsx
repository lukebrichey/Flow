import { useState, useEffect } from 'react';
import PlayPauseButton from './PlayPauseButton';
import { TimerType } from '../types/types';

interface TimerProps {
  type: TimerType;
  time?: number;
}

export default function Timer({ type, time }: TimerProps): JSX.Element {
  const startTime = type === 'focus' ? 0 : time ?? 60;

  if (startTime < 0) {
    throw new Error('Invalid time allotted for timer');
  }

  const [passedTime, setPassedTime] = useState(startTime);
  const [isRunning, setIsRunning] = useState(true);

  const toggleIsRunning = (): void => setIsRunning(!isRunning);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setPassedTime((passedTime) => passedTime + 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }

    return;
  }, [isRunning]);

  const formatPassedTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${remainingSeconds}`;
  };

  return (
    <div className="bg-gray-200 w-full rounded-lg shadow-xl p-10 mb-6 flex flex-col items-center justify-center">
      <p className="text-8xl font-mono mb-4">{formatPassedTime(passedTime)}</p>
      <PlayPauseButton isRunning={isRunning} toggleIsRunning={toggleIsRunning} />
    </div>
  );
}
