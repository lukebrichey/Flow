import ProgressBar from './ProgressBar';
import { FireIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { getFocusStreak } from '../lib/db';

interface FocusGoalProps {
  focusTime: number;
  focusGoal: number;
}

export default function FocusGoal({ focusTime, focusGoal }: FocusGoalProps): JSX.Element {
  const [streak, setStreak] = useState<number>(0);

  // Fetch current streak from the database
  useEffect(() => {
    getFocusStreak().then((streak) => setStreak(streak));
  }, []);

  return (
    <div className="bg-white w-3/5 rounded-lg shadow-lg mx-auto py-4">
      <h3 className="text-center text-2xl font-medium">Daily Focus Goal: </h3>
      <ProgressBar value={focusTime} max={focusGoal} />
      <p className="text-center text-lg pb-2">
        {`${((focusTime / focusGoal) * 100).toFixed(0)}%`} Complete
      </p>
      <h3 className="text-center text-2xl font-medium pt-4">Current Streak: </h3>
      <div className="flex flex-row w-full justify-center items-center">
        <p className="text-2xl">{streak}</p>
        <FireIcon className="h-11 w-11 text-red-500" />
      </div>
    </div>
  );
}
