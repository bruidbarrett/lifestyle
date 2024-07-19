import React, { useState, useRef, useCallback } from "react";
import {
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Text,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import { useStore } from "../config/store";
import { formatISO } from "date-fns";
import GamingText from "./GamingText";
import colors from "../config/colors";
import Rive from "rive-react-native";

const HabitCards = () => {
  const { userData, setUserData, selectedDate } = useStore();
  const [index, setIndex] = useState(0);
  const swiperRef = useRef(null);

  const formatDate = (date) => formatISO(date, { representation: "date" });

  const handleCheckOff = (habitName, type) => {
    const date = formatDate(selectedDate);
    const updatedHabits = userData[type].map((habit) => {
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

    setUserData({ ...userData, [type]: updatedHabits });
  };

  const renderHabits = (habits, type) => (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        overflow: "visible",
        minHeight: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingTop: 4,
        paddingBottom: 50,
      }}
    >
      {habits.map((habit, i) => (
        <TouchableOpacity
          key={i}
          style={{
            width: "47%",
            height: 130,
            margin: 5,
            borderRadius: 10,
            overflow: "hidden",
            justifyContent: "flex-end",
            backgroundColor: habit.completedDates[formatDate(selectedDate)]
              ? "rgba(0, 255, 0, 0.5)"
              : colors.backgroundColor,
            padding: 10,
            borderWidth: 2, // Setting border width to 2px
            borderColor: habit.completedDates[formatDate(selectedDate)]
              ? "#8CE077"
              : "#4A4641",
          }}
          onPress={() => handleCheckOff(habit.name, type)}
        >
          <ImageBackground
            source={{ uri: habit.icon }}
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
                color: "#fff",
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

  const handleIndexChanged = useCallback((newIndex) => {
    setIndex(newIndex);
  }, []);

  function RiveDemo() {
    return (
      <Rive
        url="https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv"
        artboardName="Avatar 1"
        stateMachineName="avatar"
        style={{ width: 400, height: 400 }}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingVertical: 10,
        }}
      >
        {/* <RiveDemo />; */}
        {["Habits", "Neutral", "AntiHabits"].map((section, idx) => (
          <TouchableOpacity
            key={section}
            style={{
              padding: 10,
              borderBottomWidth: 3,
              borderBottomColor: index === idx ? "#8CE077" : "transparent",
            }}
            onPress={() => {
              swiperRef.current?.scrollTo(idx);
            }}
          >
            <GamingText
              style={{
                color: index === idx ? "#8CE077" : "#888",
              }}
            >
              {section}
            </GamingText>
          </TouchableOpacity>
        ))}
      </View>
      <Swiper
        ref={swiperRef}
        showsButtons={false}
        loop={false}
        index={index}
        onIndexChanged={handleIndexChanged}
        showsPagination={true}
        paginationStyle={{ position: "absolute", bottom: 15 }}
        dotStyle={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          width: 8,
          height: 8,
          borderRadius: 4,
        }}
        activeDotStyle={{
          backgroundColor: "#fff",
          width: 8,
          height: 8,
          borderRadius: 4,
        }}
      >
        <View>{renderHabits(userData.habits, "habits")}</View>
        <View>{renderHabits(userData.neutralHabits, "neutralHabits")}</View>
        <View>{renderHabits(userData.antiHabits, "antiHabits")}</View>
      </Swiper>
    </View>
  );
};

export default HabitCards;
