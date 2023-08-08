import { db, IPreference, getPreferences } from '../lib/db';
import { useState, useEffect } from 'react';

interface PomoSettingsProps {
  preferences: IPreference;
  onSave: (updatedPreferences: IPreference) => void;
}

export function PomoSettings({ preferences, onSave }: PomoSettingsProps): JSX.Element {
  const [settings, setSettings] = useState<IPreference>({
    pomodoroLength: preferences.pomodoroLength,
    shortBreakLength: preferences.shortBreakLength,
    longBreakLength: preferences.longBreakLength
  });
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string | null }>({
    pomodoroLength: null,
    shortBreakLength: null,
    longBreakLength: null
  });

  useEffect(() => {
    async function getSettings(): Promise<void> {
      const currentSettings = await getPreferences();
      setSettings(currentSettings);
    }

    getSettings();
  }, []);

  const validateInput = (value: number, key: keyof IPreference): boolean => {
    if (value <= 0) {
      setErrorMessages((prev) => ({ ...prev, [key]: 'Value should be greater than 0' }));
      return false;
    } else {
      setErrorMessages((prev) => ({ ...prev, [key]: null }));
      return true;
    }
  };

  async function handleSave(): Promise<void> {
    const updatedPreferences: IPreference = {
      id: 1,
      pomodoroLength: settings.pomodoroLength,
      shortBreakLength: settings.shortBreakLength,
      longBreakLength: settings.longBreakLength
    };
    db.preferences.put(updatedPreferences);
    onSave(updatedPreferences);
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
          value={settings.pomodoroLength}
          onChange={(e): void => {
            const value = parseInt(e.target.value);
            validateInput(value, 'pomodoroLength') &&
              setSettings({ ...settings, pomodoroLength: value });
          }}
        />
        <span className="text-red-500">{errorMessages.pomodoroLength}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="shortBreak">
          Short Break Length (minutes)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="shortBreak"
          type="number"
          value={settings.shortBreakLength}
          onChange={(e): void => {
            const value = parseInt(e.target.value);
            validateInput(value, 'shortBreakLength') &&
              setSettings({ ...settings, shortBreakLength: value });
          }}
        />
        <span className="text-red-500">{errorMessages.shortBreakLength}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="longBreak">
          Long Break Length (minutes)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="longBreak"
          type="number"
          value={settings.longBreakLength}
          onChange={(e): void => {
            const value = parseInt(e.target.value);
            validateInput(value, 'longBreakLength') &&
              setSettings({ ...settings, longBreakLength: value });
          }}
        />
        <span className="text-red-500">{errorMessages.longBreakLength}</span>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        type="button"
        disabled={Object.values(errorMessages).some((msg) => msg)}
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}
