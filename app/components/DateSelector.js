import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { subDays, addDays, isToday } from "date-fns";
import colors from "../config/colors";

const DateSelector = ({ selectedDate, setSelectedDate, getDateInfo }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: translateX }],
        { useNativeDriver: false } // Set to true if not using layout props or color changes in animations
      ),
      onPanResponderRelease: (_, { dx }) => {
        if (dx > 50) {
          // Swipe right
          Animated.spring(translateX, {
            toValue: 100,
            useNativeDriver: true,
          }).start(() => {
            setCurrentDate((prevDate) => subDays(prevDate, 1));
            setSelectedDate((prevDate) => subDays(prevDate, 1));
            translateX.setValue(-10); // Set translateX off-screen to the left
            Animated.spring(translateX, {
              toValue: 0, // Animate into view from left to center
              useNativeDriver: true,
            }).start();
          });
        } else if (dx < -50 && !isToday(currentDate)) {
          // Swipe left
          Animated.spring(translateX, {
            toValue: -100,
            useNativeDriver: true,
          }).start(() => {
            setCurrentDate((prevDate) => addDays(prevDate, 1));
            setSelectedDate((prevDate) => addDays(prevDate, 1));
            translateX.setValue(10); // Set translateX off-screen to the right
            Animated.spring(translateX, {
              toValue: 0, // Animate into view from right to center
              useNativeDriver: true,
            }).start();
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const dateInfo = getDateInfo(currentDate);

  return (
    <View
      style={{
        backgroundColor: colors.secondaryGray,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: "100%",
        height: 130,
        top: -60,
        marginBottom: -60,
        paddingHorizontal: 20,
        paddingBottom: 22,
      }}
    >
      <TouchableOpacity
        onPress={() => setSelectedDate(subDays(currentDate, 1))}
      >
        <FontAwesome name="chevron-left" size={24} color={colors.offwhite} />
      </TouchableOpacity>
      <Animated.View
        style={{ transform: [{ translateX }], alignItems: "center" }}
        {...panResponder.panHandlers}
      >
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
      </Animated.View>
      <TouchableOpacity
        onPress={() =>
          !isToday(currentDate) && setSelectedDate(addDays(currentDate, 1))
        }
        disabled={isToday(currentDate)}
      >
        <FontAwesome
          name="chevron-right"
          size={20}
          paddingBottom={10}
          color={isToday(currentDate) ? colors.gray : colors.offwhite}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DateSelector;
