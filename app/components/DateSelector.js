import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { subDays, addDays, isToday, format } from "date-fns";
import colors from "../config/colors";
import { useStore } from "../config/store";
import GamingText from "./GamingText";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const DateSelector = ({}) => {
  const { selectedDate, setSelectedDate } = useStore();
  const position = useRef(new Animated.Value(0)).current;
  const latestSelectedDate = useRef(selectedDate);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    latestSelectedDate.current = selectedDate;
  }, [selectedDate]);

  const handleSwipe = (direction) => {
    if (isAnimating) {
      console.log("Animation in progress, swipe ignored.");
      return;
    }
    console.log("Starting swipe animation.");
    setIsAnimating(true);

    const currentDate = latestSelectedDate.current;
    let nextDate = currentDate;
    if (direction === "left") {
      nextDate = addDays(currentDate, 1);
      if (isToday(currentDate)) {
        console.log("Already on today's date, cannot move to future date.");
        setIsAnimating(false);
        return; // Early return to prevent setting future date
      }
    } else {
      nextDate = subDays(currentDate, 1);
    }

    Animated.timing(position, {
      toValue: direction === "left" ? -SCREEN_WIDTH : SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      console.log(finished ? "Animation completed." : "Animation interrupted.");
      if (finished) {
        setSelectedDate(nextDate);
        position.setValue(0);
      }
      setIsAnimating(false);
    });
  };

  useEffect(() => {
    if (selectedDate !== latestSelectedDate.current) {
      console.log("selectedDate UPDATED TO", selectedDate.toString());
      setIsAnimating(false);
    }
  }, [selectedDate]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx, dy }) => {
        const isHorizontalSwipe =
          Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10;
        if (isToday(latestSelectedDate.current) && dx < 0) {
          // Prevent swiping to the right if the selected date is today
          return false;
        }
        return isHorizontalSwipe;
      },
      onPanResponderMove: Animated.event([null, { dx: position }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, { dx }) => {
        if (Math.abs(dx) >= SCREEN_WIDTH / 4) {
          const direction = dx > 0 ? "right" : "left";
          handleSwipe(direction);
        } else {
          Animated.spring(position, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const renderDate = (date, style) => (
    <View style={style}>
      <GamingText
        style={{
          fontWeight: "bold",
          color: colors.offwhite,
          letterSpacing: 1,
          fontSize: 24,
          marginBottom: 7,
        }}
      >
        {isToday(date) ? "Today" : format(date, "eeee")}
      </GamingText>
      <GamingText
        style={{
          fontFamily: "Aux Mono",
          letterSpacing: -1,
          color: colors.offwhite,
          fontSize: 14,
        }}
      >
        {format(date, "MMMM dd, yyyy")}
      </GamingText>
    </View>
  );

  return (
    <View
      style={{
        backgroundColor: colors.secondaryGray,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 130,
        marginTop: -60,
        paddingTop: 46,
        borderBottomWidth: "1.5px",
        borderBottomColor: colors.lineGray,
      }}
    >
      <TouchableOpacity
        onPress={() => handleSwipe("right")}
        style={{
          position: "absolute",
          left: 0,
          zIndex: 1,
          top: 40,
          paddingRight: 60,
          paddingLeft: 25,
          paddingVertical: 40,
        }}
      >
        <FontAwesome name="chevron-left" size={20} color={colors.offwhite} />
      </TouchableOpacity>
      <Animated.View
        style={{
          flexDirection: "row",
          width: SCREEN_WIDTH * 3,
          transform: [{ translateX: position }],
        }}
        {...panResponder.panHandlers}
      >
        {renderDate(subDays(selectedDate, 1), {
          width: SCREEN_WIDTH,
          alignItems: "center",
          justifyContent: "center",
        })}
        {renderDate(selectedDate, {
          width: SCREEN_WIDTH,
          alignItems: "center",
          justifyContent: "center",
        })}
        {renderDate(addDays(selectedDate, 1), {
          width: SCREEN_WIDTH,
          alignItems: "center",
          justifyContent: "center",
        })}
      </Animated.View>
      <TouchableOpacity
        onPress={() => handleSwipe("left")}
        disabled={isToday(selectedDate)}
        style={{
          position: "absolute",
          right: 0,
          top: 40,
          zIndex: 1,
          paddingLeft: 60,
          paddingRight: 25,
          paddingVertical: 40,
        }}
      >
        <FontAwesome
          name="chevron-right"
          size={20}
          color={isToday(selectedDate) ? colors.lineGray : colors.offwhite}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DateSelector;
