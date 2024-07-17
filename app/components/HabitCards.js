// HabitCards.js
import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Text,
} from "react-native";
import colors from "../config/colors";

const HabitCards = ({ habits, selectedDate, handleCheckOff, formatDate }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 15,
      }}
    >
      {habits.map((habit, index) => (
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
  );
};

export default HabitCards;
