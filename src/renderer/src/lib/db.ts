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
  focusStreak: number; // Current number of consecutive days the user has met their focus goal
}

/* Interface for daily focus goals and streaks
 We create a new entry for each day and update that accordingly, to allow for
 easy stat tracking and to allow the user to see their progress over time. It 
 also makes the streak calculation easier, as we can just check the latest entry
 */
interface IDailyFocusGoal {
  id?: number;
  date: Date;
  focusGoal: number; // Number of minutes the user wants to focus for each day
  focusTime: number; // Number of minutes the user has focused for today
}

const DEFAULT_PREFERENCES: IPreference = {
  pomodoroLength: 30,
  shortBreakLength: 5,
  longBreakLength: 15,
  pomodoroCount: 4
};

const todayAtMidnight = new Date();
todayAtMidnight.setHours(0, 0, 0, 0);

const DEFAULT_FOCUS_GOAL: IDailyFocusGoal = {
  date: todayAtMidnight,
  focusGoal: 120, // 2 hours
  focusTime: 0 // 0 minutes
};

// No need for default values for focus stats, as they are updated on the fly

/*
  Database tables are as follows:
  preferences: Stores the user's pomodoro preferences, single entry
  focusStats: Stores the user's focus stats, single entry
  dailyFocusGoals: Stores the user's daily focus goals and times, one entry per day
*/

class MyDatabase extends Dexie {
  // Add definite assignment assertion
  preferences: Dexie.Table<IPreference, number>;
  focusStats: Dexie.Table<IFocusStat, number>;
  dailyFocusGoals: Dexie.Table<IDailyFocusGoal, number>;

  constructor() {
    super('MyDatabase');

    this.version(1).stores({
      preferences: '++id, pomodoroLength, shortBreakLength, longBreakLength, pomodoroCount',
      focusStats: '++id, totalFocusTime, weeklyFocusTime, monthlyFocusTime, focusStreak',
      dailyFocusGoals: '++id, date, focusGoal, focusTime'
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

    // Populate the database with default focus goals if none are found
    this.dailyFocusGoals.count().then((count) => {
      if (count === 0) {
        this.dailyFocusGoals.add(DEFAULT_FOCUS_GOAL);
      }
    });
  }
}

const db = new MyDatabase();

// Function to get preferences from the database
export const getPreferences = async (): Promise<IPreference> => {
  const allPreferences = await db.preferences.toArray();
  return allPreferences[0]; // Assumes one set of preferences per user
};

// Function to get the latest focus time
export const getFocusTime = async (): Promise<number> => {
  const todaysGoal = await db.dailyFocusGoals.where('date').equals(todayAtMidnight).first();
  return todaysGoal?.focusTime || 0;
};

// Function to update the focus time
export const updateFocusTime = async (newFocusTime: number): Promise<void> => {
  const todaysGoal = await db.dailyFocusGoals.where('date').equals(todayAtMidnight).first();
  if (todaysGoal && todaysGoal.id) {
    await db.dailyFocusGoals.update(todaysGoal.id, { focusTime: newFocusTime });
  }
};

// Function to get the latest focus goal
export const getFocusGoal = async (): Promise<number> => {
  const todaysGoal = await db.dailyFocusGoals.where('date').equals(todayAtMidnight).first();
  return todaysGoal?.focusGoal || 0;
};

// Function to update the focus goal
export const updateFocusGoal = async (newFocusGoal: number): Promise<void> => {
  const todaysGoal = await db.dailyFocusGoals.where('date').equals(todayAtMidnight).first();
  if (todaysGoal && todaysGoal.id) {
    await db.dailyFocusGoals.update(todaysGoal.id, { focusGoal: newFocusGoal });
  }
};

// Function to get the latest focus streak
export const getFocusStreak = async (): Promise<number> => {
  const latestGoal = await db.focusStats.orderBy('id').reverse().first();
  return latestGoal?.focusStreak || 0;
};

// Fucntion that handles the focus streak logic, will be called at the beginning
// of each new day
export const updateFocusStreak = async (): Promise<void> => {
  const latestGoal = await db.dailyFocusGoals.orderBy('date').reverse().first();

  // Check if there are missing days
  if (latestGoal && latestGoal.date) {
    const lastDate = new Date(latestGoal.date);
    const daysDifference = (todayAtMidnight.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

    if (daysDifference > 1) {
      // Reset streak if there are missing days
      await db.focusStats.update(1, { focusStreak: 0 });
    } else if (latestGoal.focusTime >= latestGoal.focusGoal) {
      // Increment streak if goal met
      const focusStreak = await getFocusStreak();
      await db.focusStats.update(1, { focusStreak: focusStreak + 1 });
    }
  }
};

// Use 'export type' for re-exporting types
export type { IPreference, IFocusStat, IDailyFocusGoal };
export { db };
