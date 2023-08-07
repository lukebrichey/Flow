import { db } from '../lib/db';
import { useState } from 'react';

type PomoSettingsProps = {
  defPomo: number;
  defShort: number;
  defLong: number;
};

export function PomoSettings(
  { defPomo, defShort, defLong }: PomoSettingsProps = { defPomo: 30, defShort: 5, defLong: 15 }
): JSX.Element {
  const [pomodoro, setPomodoro] = useState(defPomo);
  const [shortBreak, setShortBreak] = useState(defShort);
  const [longBreak, setLongBreak] = useState(defLong);
  const [status, setStatus] = useState('');

  async function addSettings(): Promise<void> {
    try {
      // Add new preferences
      const id = await db.preferences.add({
        pomodoroLength: pomodoro,
        shortBreakLength: shortBreak,
        longBreakLength: longBreak
      });

      setStatus(`Added preferences with ID ${id}`);
      setPomodoro(defPomo);
      setShortBreak(defShort);
      setLongBreak(defLong);
    } catch (error) {
      setStatus(`Failed to add new preferences: ${error}`);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
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
        onClick={addSettings}
      >
        Save
      </button>
      <p className="text-gray-700 text-sm font-bold mb-2 mt-4">{status}</p>
    </div>
  );
}
