import { create } from "zustand";
import { formatISO, parseISO, startOfToday } from "date-fns";

type Habit = {
  name: string;
  image: string;
  completedDates: { [date: string]: boolean };
};

type TimestampHabit = {
  name: string;
  image: string;
  lastReset: string;
};

type UserData = {
  habits: Habit[];
  neutralHabits: TimestampHabit[];
  antiHabits: TimestampHabit[];
};

type Store = {
  userData: UserData;
  setUserData: (userData: UserData) => void;
  checkOffHabit: (habitName: string, date?: string) => void;
  resetHabit: (
    habitName: string,
    habitType: "neutralHabits" | "antiHabits"
  ) => void;
};

export const useStore = create<Store>((set, get) => ({
  userData: {
    habits: [
      {
        name: "Exercise",
        image: "https://example.com/images/exercise.jpg",
        completedDates: {},
      },
      {
        name: "Read",
        image: "https://example.com/images/read.jpg",
        completedDates: {},
      },
      {
        name: "Meditate",
        image: "https://example.com/images/meditate.jpg",
        completedDates: {},
      },
      {
        name: "Drink Water",
        image: "https://example.com/images/drink_water.jpg",
        completedDates: {},
      },
      {
        name: "Sleep 8 Hours",
        image: "https://example.com/images/sleep.jpg",
        completedDates: {},
      },
    ],
    neutralHabits: [
      {
        name: "Check Email",
        image: "https://example.com/images/email.jpg",
        lastReset: "",
      },
      {
        name: "Social Media",
        image: "https://example.com/images/social_media.jpg",
        lastReset: "",
      },
    ],
    antiHabits: [
      {
        name: "Smoking",
        image: "https://example.com/images/smoking.jpg",
        lastReset: "",
      },
      {
        name: "Fast Food",
        image: "https://example.com/images/fast_food.jpg",
        lastReset: "",
      },
    ],
  },
  setUserData: (userData) => set({ userData }),
  checkOffHabit: (
    habitName,
    date = formatISO(startOfToday(), { representation: "date" })
  ) => {
    const { userData } = get();
    const updatedHabits = userData.habits.map((habit) =>
      habit.name === habitName
        ? {
            ...habit,
            completedDates: { ...habit.completedDates, [date]: true },
          }
        : habit
    );
    set({ userData: { ...userData, habits: updatedHabits } });
  },
  resetHabit: (habitName, habitType) => {
    const { userData } = get();
    const now = new Date().toISOString();
    const updatedHabits = userData[habitType].map((habit) =>
      habit.name === habitName ? { ...habit, lastReset: now } : habit
    );
    set({ userData: { ...userData, [habitType]: updatedHabits } });
  },
}));
