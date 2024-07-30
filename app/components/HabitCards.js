import React, { useState, useRef, useCallback } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import { useStore } from "../config/store";
import { formatISO } from "date-fns";
import GamingText from "./GamingText";
import colors from "../config/colors";

// Import SVG components
import Pencil from "../../app/assets/icons/draw-write-pen-pencil.svg";
import Meditate from "../../app/assets/icons/meditation-meditate-yoga-breath-breathe-zen.svg";
import Paper from "../../app/assets/icons/paper-write-note-notebook-notes-type.svg";
import Yoga from "../../app/assets/icons/stretch-yoga.svg";
import Dumbbell from "../../app/assets/icons/workout-lift-gym-weight-weights-dumbell.svg";

// Create a mapping between icon names and SVG components
const iconMap = {
  Pencil: Pencil,
  Meditate: Meditate,
  Paper: Paper,
  Yoga: Yoga,
  Dumbbell: Dumbbell,
};

const HabitCards = () => {
  const { userData, setUserData, selectedDate } = useStore();
  const [index, setIndex] = useState(0);
  const swiperRef = useRef(null);

  const formatDate = (date) => formatISO(date, { representation: "date" });
  const setShowAddHabitModal = useStore((state) => state.setShowAddHabitModal);

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
        paddingBottom: 100,
      }}
    >
      {habits.map((habit, i) => {
        const IconComponent = iconMap[habit.icon] || Pencil; // Default to Pencil if icon not found
        const isCompleted = habit.completedDates[formatDate(selectedDate)];

        let backgroundColor, borderColor;
        switch (type) {
          case "neutralHabits":
            backgroundColor = isCompleted
              ? colors.blueBackground
              : colors.backgroundColor;
            borderColor = isCompleted ? colors.blueOutline : "#4A4641";
            break;
          case "antiHabits":
            backgroundColor = isCompleted
              ? colors.redBackground
              : colors.backgroundColor;
            borderColor = isCompleted ? colors.redOutline : "#4A4641";
            break;
          default: // 'habits'
            backgroundColor = isCompleted
              ? colors.greenBackground
              : colors.backgroundColor;
            borderColor = isCompleted ? colors.greenOutline : "#4A4641";
        }

        return (
          <TouchableOpacity
            key={i}
            style={{
              width: "47%",
              height: 130,
              margin: 5,
              borderRadius: 10,
              overflow: "hidden",
              justifyContent: "space-between",
              backgroundColor: backgroundColor,
              padding: 10,
              borderWidth: 2,
              borderColor: borderColor,
            }}
            onPress={() => handleCheckOff(habit.name, type)}
          >
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <IconComponent width={50} height={50} />
            </View>
            <GamingText
              style={{
                fontWeight: "bold",
                alignSelf: "center",
                color: "#fff",
                fontSize: 16,
                marginTop: 10,
              }}
            >
              {habit.name}
            </GamingText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const handleIndexChanged = useCallback((newIndex) => {
    setIndex(newIndex);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingVertical: 10,
        }}
      >
        {["Habits", "Neutral", "AntiHabits"].map((section, idx) => {
          let activeColor;
          switch (idx) {
            case 0: // Habits
              activeColor = colors.greenOutline;
              break;
            case 1: // Neutral
              activeColor = colors.blueOutline;
              break;
            case 2: // AntiHabits
              activeColor = colors.redOutline;
              break;
            default:
              activeColor = colors.greenOutline;
          }

          return (
            <TouchableOpacity
              key={section}
              style={{
                padding: 10,
                borderBottomWidth: 3,
                borderBottomColor: index === idx ? activeColor : "transparent",
              }}
              onPress={() => {
                swiperRef.current?.scrollTo(idx);
              }}
            >
              <GamingText
                style={{
                  color: index === idx ? activeColor : "#888",
                  fontSize: 16,
                  fontWeight: index === idx ? "bold" : "normal",
                }}
              >
                {section}
              </GamingText>
            </TouchableOpacity>
          );
        })}
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
      <View
        style={{
          position: "absolute",
          bottom: 45,
          left: 0,
          right: 5,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => setShowAddHabitModal(true)}
          style={{
            paddingVertical: 5,
            backgroundColor: colors.background,
            paddingHorizontal: 10,
            borderRadius: 100,
            borderColor: colors.lineGray,
            borderWidth: 2,
          }}
        >
          <GamingText
            style={{ color: "#888", fontWeight: "bold", fontSize: 15 }}
          >
            ADD +
          </GamingText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HabitCards;
