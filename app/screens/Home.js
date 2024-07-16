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

export const Home = ({ navigation }) => {
  const { userData, setUserData } = useStore();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date) => {
    return formatISO(date, { representation: "date" });
  };

  const getDateInfo = (date) => {
    return {
      dayOfWeek: isToday(date) ? "Today" : format(date, "EEEE"),
      dateStr: format(date, "MMMM d, yyyy"), // Example: 'July 2, 2024'
    };
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
            [date]: !wasCompleted, // Toggle the completion status
          },
        };
      }
      return habit;
    });

    setUserData({ ...userData, habits: updatedHabits }); // Update the store
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const dateInfo = getDateInfo(selectedDate);

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
      <View
        style={{
          backgroundColor: colors.secondaryGray,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => setSelectedDate(subDays(selectedDate, 1))}
        >
          <FontAwesome name="chevron-left" size={24} color={colors.offwhite} />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "HelveticaNeue",
              fontWeight: "bold",
              color: colors.offwhite,
              fontSize: 22,
            }}
          >
            {dateInfo.dayOfWeek}
          </Text>
          <Text
            style={{
              fontFamily: "HelveticaNeue",
              fontWeight: "bold",
              color: colors.offwhite,
              fontSize: 14,
            }}
          >
            {dateInfo.dateStr}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            !isToday(selectedDate) && setSelectedDate(addDays(selectedDate, 1))
          }
          disabled={isToday(selectedDate)}
        >
          <FontAwesome
            name="chevron-right"
            size={24}
            color={isToday(selectedDate) ? colors.gray : colors.offwhite}
          />
        </TouchableOpacity>
      </View>

      {/* HABIT CARDS */}
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: 15,
        }}
      >
        {userData.habits.map((habit, index) => (
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
              <Text
                style={{
                  fontFamily: "HelveticaNeue",
                  fontWeight: "bold",
                  alignSelf: "center",
                  color: colors.offwhite,
                  fontSize: 16,
                }}
              >
                {habit.name}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
