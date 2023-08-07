import Dexie from 'dexie';

class MyDatabase extends Dexie {
  // Add definite assignment assertion
  preferences!: Dexie.Table<IPreference, number>;

  constructor() {
    super('MyDatabase');

    this.version(1).stores({
      preferences: '++id, pomodoroLength, shortBreakLength, longBreakLength'
    });
  }
}

interface IPreference {
  id?: number;
  pomodoroLength: number;
  shortBreakLength: number;
  longBreakLength: number;
  // ... other fields
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
      longBreakLength: 15
    };
    await db.preferences.add(defaultPreferences);
    return defaultPreferences;
  } else {
    return allPreferences[0]; // Assuming there's only one set of preferences.
  }
};

// Use 'export type' for re-exporting types
export type { IPreference };
export { db };
