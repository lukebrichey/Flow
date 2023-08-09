import ProgressBar from './ProgressBar';

interface FocusGoalProps {
  focusTime: number;
  focusGoal: number;
}

export default function FocusGoal({ focusTime, focusGoal }: FocusGoalProps): JSX.Element {
  return (
    <div className="bg-white w-3/5 rounded-lg shadow-lg mx-auto">
      <h3 className="text-center text-2xl font-medium pt-4">Daily Focus Goal: </h3>
      <ProgressBar value={focusTime} max={focusGoal} />
      <p className="text-center text-lg pb-2">{`${focusTime}/${focusGoal}`} minutes</p>
    </div>
  );
}
