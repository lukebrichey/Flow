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

// Use 'export type' for re-exporting types
export type { IPreference };
export { db };
