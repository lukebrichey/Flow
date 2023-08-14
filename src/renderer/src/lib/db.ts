import Dexie from 'dexie';

class MyDatabase extends Dexie {
  // Add definite assignment assertion
  preferences!: Dexie.Table<IPreference, number>;
  focusStats: Dexie.Table<IFocusStat, number>;

  constructor() {
    super('MyDatabase');

    this.version(1).stores({
      preferences: '++id, pomodoroLength, shortBreakLength, longBreakLength, pomodoroCount',
      focusStats: '++id, totalFocusTime'
    });

    this.focusStats = this.table('focusStats');
  }
}

// Interface for pomodoro preferences
interface IPreference {
  id?: number;
  pomodoroLength: number;
  shortBreakLength: number;
  longBreakLength: number;
  pomodoroCount: number;
}

// Interface for focus stats
interface IFocusStat {
  id?: number;
  totalFocusTime: number;
}

const db = new MyDatabase();

// Function to get preferences from the database, sets default preferences if none are found.
export const getPreferences = async (): Promise<IPreference> => {
  const allPreferences = await db.preferences.toArray();

  if (allPreferences.length === 0) {
    console.log('No preferences found. Creating default preferences.');
    const defaultPreferences: IPreference = {
      pomodoroLength: 30,
      shortBreakLength: 5,
      longBreakLength: 15,
      pomodoroCount: 4
    };
    await db.preferences.add(defaultPreferences);
    return defaultPreferences;
  } else {
    return allPreferences[0]; // Assuming there's only one set of preferences.
  }
};

// Function to get the latest focus time
export const getFocusTime = async (): Promise<number> => {
  const latestStat = await db.focusStats.orderBy('id').reverse().first();
  return latestStat?.totalFocusTime || 0;
};

// Function to update the focus time
export const updateFocusTime = async (newFocusTime: number): Promise<void> => {
  await db.focusStats.add({ totalFocusTime: newFocusTime });
};

// Use 'export type' for re-exporting types
export type { IPreference, IFocusStat };
export { db };
