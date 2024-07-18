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
    if (isAnimating) return;
    setIsAnimating(true);

    const currentDate = latestSelectedDate.current;
    const nextDate =
      direction === "left" ? addDays(currentDate, 1) : subDays(currentDate, 1);

    console.log("NEXT DATE BEFORE", currentDate.toString());
    console.log("NEXT DATE AFTER", nextDate.toString());

    Animated.timing(position, {
      toValue: direction === "left" ? -SCREEN_WIDTH : SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      position.setValue(0);
      setSelectedDate(nextDate);
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
      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10,
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
      <Text
        style={{
          fontFamily: "HelveticaNeue",
          fontWeight: "bold",
          color: colors.offwhite,
          fontSize: 22,
          marginBottom: 5,
        }}
      >
        {isToday(date) ? "Today" : format(date, "eeee")}
      </Text>
      <Text
        style={{
          fontFamily: "HelveticaNeue",
          fontWeight: "bold",
          color: colors.offwhite,
          fontSize: 14,
        }}
      >
        {format(date, "MMMM dd, yyyy")}
      </Text>
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
        paddingTop: 50,
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
          color={isToday(selectedDate) ? colors.gray : colors.offwhite}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DateSelector;
