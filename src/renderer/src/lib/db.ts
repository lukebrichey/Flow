import Dexie from 'dexie';

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
  weeklyFocusTime?: number;
  monthlyFocusTime?: number;
}

// Interface for daily focus goals and streaks
interface IDailyFocusGoal {
  id?: number;
  date: Date;
  focusGoal: number;
  focusStreak: number;
}

const DEFAULT_PREFERENCES: IPreference = {
  pomodoroLength: 30,
  shortBreakLength: 5,
  longBreakLength: 15,
  pomodoroCount: 4
};

class MyDatabase extends Dexie {
  // Add definite assignment assertion
  preferences: Dexie.Table<IPreference, number>;
  focusStats: Dexie.Table<IFocusStat, number>;
  dailyFocusGoals: Dexie.Table<IDailyFocusGoal, number>;

  constructor() {
    super('MyDatabase');

    this.version(1).stores({
      preferences: '++id, pomodoroLength, shortBreakLength, longBreakLength, pomodoroCount',
      focusStats: '++id, totalFocusTime, weeklyFocusTime, monthlyFocusTime',
      dailyFocusGoals: '++id, date, focusGoal, focusStreak'
    });

    this.preferences = this.table('preferences');
    this.focusStats = this.table('focusStats');
    this.dailyFocusGoals = this.table('dailyFocusGoals');

    // Populate the database with default preferences if none are found
    this.preferences.count().then((count) => {
      if (count === 0) {
        this.preferences.add(DEFAULT_PREFERENCES);
      }
    });
  }
}

const db = new MyDatabase();

// Function to get preferences from the database, sets default preferences if none are found.
export const getPreferences = async (): Promise<IPreference> => {
  const allPreferences = await db.preferences.toArray();
  return allPreferences[0]; // Assumes one set of preferences per user
};

// Function to get the latest focus time
export const getFocusTime = async (): Promise<number> => {
  const latestStat = await db.focusStats.orderBy('id').reverse().first();
  return latestStat?.totalFocusTime || 0;
};

// Function to update the focus time
export const updateFocusTime = async (
  newFocusTime: number,
  newDailyFocusGoal?: number
): Promise<void> => {
  await db.focusStats.update(1, { totalFocusTime: newFocusTime });
  if (newDailyFocusGoal) {
    await db.dailyFocusGoals.update(1, { focusGoal: newDailyFocusGoal });
  }
};

// Use 'export type' for re-exporting types
export type { IPreference, IFocusStat };
export { db };
