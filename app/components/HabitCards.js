// HabitCards.js
import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Text,
} from "react-native";
import colors from "../config/colors";
import { useStore } from "../config/store";
import {
  formatISO,
  addDays,
  subDays,
  parseISO,
  format,
  isToday,
} from "date-fns";
import GamingText from "./GamingText";

const HabitCards = ({}) => {
  const { userData, setUserData } = useStore();
  const { selectedDate, setSelectedDate } = useStore();

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
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 15,
      }}
    >
      {userData.habits
        .filter(
          (habit) =>
            parseISO(formatDate(selectedDate)) >=
            parseISO(formatDate(habit.dateAdded))
        ) // Filter habits to show only from their added date
        .map((habit, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: "47%",
              height: 130,
              margin: 5,
              borderRadius: 10,
              overflow: "hidden",
              justifyContent: "flex-end",
              backgroundColor: habit.completedDates[formatDate(selectedDate)]
                ? "rgba(0, 255, 0, 0.5)"
                : colors.secondaryGray,
              padding: 10,
            }}
            onPress={() => handleCheckOff(habit.name)}
          >
            <ImageBackground
              source={{ uri: habit.image }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <GamingText
                style={{
                  fontWeight: "bold",
                  alignSelf: "center",
                  color: colors.offwhite,
                  fontSize: 16,
                }}
              >
                {habit.name}
              </GamingText>
            </ImageBackground>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

export default HabitCards;
