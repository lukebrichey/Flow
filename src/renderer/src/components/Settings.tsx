import { IDailyFocusGoal } from '../lib/db';
import { useState } from 'react';

interface SettingsProps {
  focusGoal: number;
  setFocusGoal: React.Dispatch<React.SetStateAction<number>>;
  onSave: (updatedFocusGoal: number) => void;
}

export default function Settings({ focusGoal, setFocusGoal, onSave }: SettingsProps): JSX.Element {
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string | null }>({
    focusGoal: null
  });

  // Handle changes to the focus goal
  async function handleFocusGoalChange(): Promise<void> {
    onSave(focusGoal);
  }

  // Validate input for each field
  const validateInput = (value: number, key: keyof IDailyFocusGoal): boolean => {
    if (isNaN(value)) {
      setErrorMessages((prev) => ({ ...prev, [key]: 'Value should be a number' }));
      return false;
    } else if (value <= 0) {
      setErrorMessages((prev) => ({ ...prev, [key]: 'Value should be greater than 0' }));
      return false;
    } else {
      setErrorMessages((prev) => ({ ...prev, [key]: null }));
      return true;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <div className="flex flex-col items-center justify-center">
        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="focusGoal">
          Daily Focus Goal (minutes)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="focusGoal"
          type="number"
          value={focusGoal}
          onChange={(e): void => {
            const value = parseInt(e.target.value);
            validateInput(value, 'focusGoal') && setFocusGoal(value);
          }}
        />
        <span className="text-red-500">{errorMessages.focusGoal}</span>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        type="button"
        disabled={Object.values(errorMessages).some((msg) => msg)}
        onClick={handleFocusGoalChange}
      >
        Save
      </button>
    </div>
  );
}
