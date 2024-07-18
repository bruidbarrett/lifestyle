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
};

export const useStore = create<Store>((set, get) => ({
  userData: {
    habits: [
      {
        name: "Exercise",
        icon: "/app/assets/icons/workout-lift-gym-weight-weights-dumbell.svg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Stretch",
        icon: "app/assets/icons/stretch-yoga.svg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Meditate",
        icon: "app/assets/icons/meditation-meditate-yoga-breath-breathe-zen.svg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Write",
        icon: "app/assets/icons/paper-write-note-notebook-notes-type.svg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Draw",
        icon: "app/assets/icons/draw-write-pen-pencil.svg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Read",
        icon: "app/assets/icons/book-reading-read-library-learn-knowledge.svg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Study",
        icon: "app/assets/icons/study-learn-education-school-college-university.svg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Work",
        icon: "app/assets/icons/work-job-business-office-laptop-computer-desk.svg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Clean",
        icon: "app/assets/icons/clean-cleaning-broom-mop-vacuum-dust-dusting.svg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Cook",
        icon: "app/assets/icons/cook-cooking-kitchen-food-recipe-meal-prep-chef-hat.svg",
        completedDates: {},
        lastReset: "",
        dateAdded: formatISO(startOfToday(), { representation: "date" }), // Initialize with today's date
      },
      {
        name: "Water Plants",
        icon: "app/assets/icons/plant-flower-garden-nature-green-leaf-leafs.svg",
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
}));
