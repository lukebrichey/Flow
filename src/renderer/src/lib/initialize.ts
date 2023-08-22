// This file contains code to run before the app is started.
// This is where we can do things like calculate focus stats and update the focus streak.
// It also creates a new entry in the dailyFocusGoals table for the current day.
// In the future, will probably update corresponding charts here as well.
import { db, calculateFocusStats } from './db';

export const initializeDailyFocus = async (): Promise<void> => {
  // Get today's date at midnight
  const todayAtMidnight = new Date();
  todayAtMidnight.setHours(0, 0, 0, 0);

  // Check if there's a dailyFocusGoal for today
  const todayFocusGoal = await db.dailyFocusGoals.where('date').equals(todayAtMidnight).first();

  // If not, create one using the user's most recent focus goal
  if (!todayFocusGoal) {
    // Get the last focus goal
    const lastFocusGoal = await db.dailyFocusGoals.orderBy('date').reverse().first();

    // If a previous goal is found, use it to create today's goal
    if (lastFocusGoal) {
      await db.dailyFocusGoals.add({
        date: todayAtMidnight,
        focusGoal: lastFocusGoal.focusGoal,
        focusTime: 0 // Set focusTime to 0 for the new day
      });
    }
  }

  // Run the update stats function
  await calculateFocusStats();
};
