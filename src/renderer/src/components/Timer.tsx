import { useState, useEffect } from 'react';
import PlayPauseButton from './PlayPauseButton';

export default function Timer(): JSX.Element {
  const [passedTime, setPassedTime] = useState(0);
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
    <div className="bg-gray-200 rounded-lg shadow-md p-10 mb-6 flex flex-col items-center justify-center">
      <div className="text-center">
        <p className="text-6xl font-mono mb-4">{formatPassedTime(passedTime)}</p>
        <PlayPauseButton isRunning={isRunning} toggleIsRunning={toggleIsRunning} />
      </div>
    </div>
  );
}
