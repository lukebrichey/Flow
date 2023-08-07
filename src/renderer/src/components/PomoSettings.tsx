import { db, IPreference, getPreferences } from '../lib/db';
import { useState, useEffect } from 'react';

interface PomoSettingsProps {
  preferences: IPreference;
  onSave: () => void;
}

export function PomoSettings({ preferences, onSave }: PomoSettingsProps): JSX.Element {
  const [pomodoro, setPomodoro] = useState(30);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);

  useEffect(() => {
    async function getSettings(): Promise<void> {
      const defaultSettings = await getPreferences();
      setPomodoro(defaultSettings.pomodoroLength);
      setShortBreak(defaultSettings.shortBreakLength);
      setLongBreak(defaultSettings.longBreakLength);
    }

    getSettings();
  }, []);

  if (!preferences) {
    return <div>Loading...</div>;
  }

  async function handleSave(): Promise<void> {
    const updatedPreferences: IPreference = {
      id: 1,
      pomodoroLength: pomodoro,
      shortBreakLength: shortBreak,
      longBreakLength: longBreak
    };
    db.preferences.put(updatedPreferences);
    onSave();
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <div className="flex flex-col items-center justify-center">
        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="pomodoro">
          Pomodoro Length (minutes)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="pomodoro"
          type="number"
          value={pomodoro}
          onChange={(e): void => setPomodoro(parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="shortBreak">
          Short Break Length (minutes)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="shortBreak"
          type="number"
          value={shortBreak}
          onChange={(e): void => setShortBreak(parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="longBreak">
          Long Break Length (minutes)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="longBreak"
          type="number"
          value={longBreak}
          onChange={(e): void => setLongBreak(parseInt(e.target.value))}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        type="button"
        onClick={handleSave}
      >
        Save
      </button>
      <p className="text-gray-700 text-sm font-bold mb-2 mt-4">{status}</p>
    </div>
  );
}
