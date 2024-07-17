// Home.js
import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useStore } from "../config/store";
import { formatISO, addDays, subDays, format, isToday } from "date-fns";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Haptics from "expo-haptics";
import colors from "../config/colors";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import DateSelector from "../components/DateSelector.js";
import HabitCards from "../components/HabitCards";

export const Home = ({ navigation }) => {
  const { userData, setUserData } = useStore();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDateInfo = (date) => {
    return {
      dayOfWeek: isToday(date) ? "Today" : format(date, "EEEE"),
      dateStr: format(date, "MMMM d, yyyy"),
    };
  };

  const formatDate = (date) => {
    return formatISO(date, { representation: "date" });
  };

  const handleCheckOff = (habitName) => {
    const date = formatDate(selectedDate);
    const updatedHabits = userData.habits.map((habit) => {
      if (habit.name === habitName) {
        const wasCompleted = habit.completedDates[date];
        return {
          ...habit,
          completedDates: {
            ...habit.completedDates,
            [date]: !wasCompleted,
          },
        };
      }
      return habit;
    });

    setUserData({ ...userData, habits: updatedHabits });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <StatusBar barStyle="light-content" />

      {/* DATE SELECTOR */}
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        getDateInfo={getDateInfo}
      />

      {/* HABIT CARDS */}
      <HabitCards
        habits={userData.habits}
        selectedDate={selectedDate}
        handleCheckOff={handleCheckOff}
        formatDate={formatDate}
      />
    </SafeAreaView>
  );
};

export default Home;
