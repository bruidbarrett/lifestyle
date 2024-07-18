import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import colors from "../config/colors";
import DateSelector from "../components/DateSelector.js";
import HabitCards from "../components/HabitCards";
import { useStore } from "../config/store";

export const Home = ({ navigation }) => {
  const { selectedDate, setSelectedDate } = useStore();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <StatusBar barStyle="light-content" />

      {/* DATE SELECTOR */}
      <DateSelector />

      {/* HABIT CARDS */}
      <HabitCards />
    </SafeAreaView>
  );
};

export default Home;
