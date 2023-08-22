import { useState, useEffect } from 'react';
import PlayPauseButton from './PlayPauseButton';
import { TimerType } from '../types/types';
import { useFocusTime, useSetFocusTime } from '../pages/Root';
import { updateFocusTime } from '../lib/db';

interface TimerProps {
  type: TimerType;
  time?: number;
  activeButton?: string;
  onZero?: () => number; // Callback function to run when timer reaches 0
}

export default function Timer({ type, time, activeButton, onZero }: TimerProps): JSX.Element {
  const startTime = type === 'focus' ? 0 : time ?? 30 * 60; // Default to 30 minutes

  if (startTime < 0) {
    throw new Error('Invalid time allotted for timer');
  }

  const [passedTime, setPassedTime] = useState(startTime);
  const [isRunning, setIsRunning] = useState(false);

  const toggleIsRunning = (): void => setIsRunning((prevIsRunning) => !prevIsRunning);

  // Reset timer when pomodoro mode is changed
  useEffect(() => {
    setPassedTime(startTime);
    setIsRunning(false);
  }, [startTime, activeButton]);

  // Keep track of focused time
  const focusTime = useFocusTime();
  const setFocusTime = useSetFocusTime();

  useEffect(() => {
    if (
      isRunning &&
      (type === 'focus' || activeButton === 'Pomodoro') &&
      passedTime > 0 &&
      passedTime % 60 === 0
    ) {
      if (passedTime % 60 === 0) {
        setFocusTime(focusTime + 1);
        updateFocusTime(focusTime + 1);
      }
    }
  }, [passedTime]);

  // Determine whether to count up or down based on timer type
  useEffect(() => {
    if (isRunning && type === 'focus') {
      const interval = setInterval(() => {
        setPassedTime((passedTime) => passedTime + 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    } else if (isRunning && type === 'pomodoro') {
      const interval = setInterval(() => {
        setPassedTime((passedTime) => {
          if (passedTime === 0) {
            setIsRunning(false);
            return onZero?.() ?? 0;
          } else {
            return passedTime - 1;
          }
        });
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
    <div className="bg-gray-200 w-full rounded-lg shadow-xl p-10 mb-10 flex flex-col items-center justify-center">
      <p className="sm:text-3xl md:text-4xl lg:text-4xl xl:text-7xl font-mono mb-4">
        {formatPassedTime(passedTime)}
      </p>
      <PlayPauseButton isRunning={isRunning} toggleIsRunning={toggleIsRunning} />
    </div>
  );
}
