import { create } from "zustand";
import { formatISO, parseISO, startOfToday } from "date-fns";

type Habit = {
  name: string;
  image: string;
  completedDates: { [date: string]: boolean };
  lastReset: string;
  dateAdded: string; // Added field to store when the habit was added
};

type UserData = {
  habits: Habit[];
  neutralHabits: Habit[];
  antiHabits: Habit[];
};

type Store = {
  userData: UserData;
  setUserData: (userData: UserData) => void;
  checkOffHabit: (habitName: string, date?: string) => void;
  resetHabit: (
    habitName: string,
    habitType: "neutralHabits" | "antiHabits"
  ) => void;
  selectedDate: Date;
  setSelectedDate: (selectedDate: Date) => void;
};

export const useStore = create<Store>((set, get) => ({
  userData: {
    habits: [
      {
        name: "Exercise",
        image: "/app/assets/icons/workout-lift-gym-weight-weights-dumbell.svg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Stretch",
        image: "app/assets/icons/stretch-yoga.svg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Meditate",
        image:
          "app/assets/icons/meditation-meditate-yoga-breath-breathe-zen.svg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Write",
        image: "app/assets/icons/paper-write-note-notebook-notes-type.svg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Draw",
        image: "app/assets/icons/draw-write-pen-pencil.svg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
    ],
    neutralHabits: [
      {
        name: "Check Email",
        image: "https://example.com/images/email.jpg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Social Media",
        image: "https://example.com/images/social_media.jpg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
    ],
    antiHabits: [
      {
        name: "Smoking",
        image: "https://example.com/images/smoking.jpg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Fast Food",
        image: "https://example.com/images/fast_food.jpg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
    ],
  },
  setUserData: (userData) => set({ userData }),
  checkOffHabit: (
    habitName,
    date = formatISO(startOfToday(), { representation: "date" })
  ) => {
    const { userData } = get();
    const habit = userData.habits.find((h) => h.name === habitName);
    if (habit && parseISO(date) >= parseISO(habit.dateAdded)) {
      const updatedHabits = userData.habits.map((habit) =>
        habit.name === habitName
          ? {
              ...habit,
              completedDates: { ...habit.completedDates, [date]: true },
            }
          : habit
      );
      set({ userData: { ...userData, habits: updatedHabits } });
    }
  },
  resetHabit: (habitName, habitType) => {
    const { userData } = get();
    const now = formatISO(new Date(), { representation: "date" });
    const updatedHabits = userData[habitType].map((habit) =>
      habit.name === habitName ? { ...habit, lastReset: now } : habit
    );
    set({ userData: { ...userData, [habitType]: updatedHabits } });
  },
  selectedDate: new Date(),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
}));
