import { create } from "zustand";
import { formatISO, parseISO, startOfToday } from "date-fns";

type Habit = {
  name: string;
  icon: string;
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
  showAddHabitModal: boolean;
  setShowAddHabitModal: (showAddHabitModal: boolean) => void;
};

export const useStore = create<Store>((set, get) => ({
  userData: {
    habits: [
      {
        name: "Meditate",
        icon: "Meditate",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Stretch",
        icon: "Yoga",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Draw",
        icon: "Pencil",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Write",
        icon: "Paper",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Lift",
        icon: "Dumbbell",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
    ],
    neutralHabits: [
      {
        name: "Check Email",
        icon: "https://example.com/icons/email.jpg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Social Media",
        icon: "https://example.com/icons/social_media.jpg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Watch TV",
        icon: "https://example.com/icons/tv.jpg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
    ],
    antiHabits: [
      {
        name: "Smoking",
        icon: "https://example.com/icons/smoking.jpg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Fast Food",
        icon: "https://example.com/icons/fast_food.jpg",
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
  showAddHabitModal: false,
  setShowAddHabitModal: (showAddHabitModal) => set({ showAddHabitModal }),
}));
