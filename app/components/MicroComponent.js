import React, { useState } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import GamingText from "./GamingText";
import colors from "../config/colors";

const generateDeviceId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const MicroComponent = () => {
  const [quote, setQuote] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [habit, setHabit] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://172.19.0.59:5001/get_quote");
      const data = await response.json();
      setQuote(data.quote);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to fetch quote");
    }
    setLoading(false);
  };

  const getDeviceId = () => {
    if (!deviceId) {
      setDeviceId(generateDeviceId());
    }
  };

  const saveDeviceId = async () => {
    if (!deviceId) {
      console.error("No device ID to save");
      return;
    }

    try {
      const response = await fetch("http://172.19.0.59:5001/save_device_id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ device_id: deviceId }),
      });
      const data = await response.json();
      if (data.success) {
        console.log("Device ID saved successfully");
      } else {
        console.error("Failed to save device ID");
      }
    } catch (error) {
      console.error("Error saving device ID:", error);
    }
  };

  const fetchHabitRecommendation = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://172.19.0.59:5001/get_habit_recommendation"
      );
      const data = await response.json();
      setHabit(data.habit);
    } catch (error) {
      console.error("Error fetching habit recommendation:", error);
      setHabit("Failed to fetch habit recommendation");
    }
    setLoading(false);
  };

  const fetchCurrentTime = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://172.19.0.59:5001/get_current_time");
      const data = await response.json();
      setCurrentTime(data.current_time);
      setTimeZone(data.time_zone);
    } catch (error) {
      console.error("Error fetching current time:", error);
      setCurrentTime("Failed to fetch current time");
      setTimeZone("");
    }
    setLoading(false);
  };

  return (
    <View
      style={{
        alignItems: "center",
        alignContent: "center",
        alignSelf: "center",
        padding: 20,
      }}
    >
      <View style={{ top: -10, marginBottom: 30, alignItems: "center" }}>
        <GamingText
          style={{
            marginTop: 20,
            color: "#888",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          MICROSERVICE A
        </GamingText>
        <GamingText
          style={{
            paddingHorizontal: 10,
            paddingVertical: 20,
            marginTop: -2,
            color: colors.offWhite,
            fontSize: 12,
            marginRight: 8,
          }}
        >
          {loading ? "Loading..." : '"' + quote + '"'}
        </GamingText>

        <TouchableOpacity
          onPress={fetchQuote}
          disabled={loading}
          style={{
            paddingVertical: 8,
            backgroundColor: colors.greenBackground,
            paddingHorizontal: 15,
            borderRadius: 100,
            borderColor: colors.greenOutline,
            borderWidth: 2,
          }}
        >
          <GamingText
            style={{ color: colors.offWhite, fontWeight: "bold", fontSize: 18 }}
          >
            Get Quote
          </GamingText>
        </TouchableOpacity>
      </View>
      <View
        style={{
          top: -10,
          marginBottom: 30,
          alignItems: "center",
        }}
      >
        <GamingText
          style={{
            textAlign: "center",
            marginTop: 20,
            color: "#888",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          MICROSERVICE B
        </GamingText>
        <GamingText
          style={{
            marginTop: 20,
            marginBottom: 10,
            color: colors.offWhite,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Device ID: {"\n" + deviceId || "Not generated yet"}
        </GamingText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={getDeviceId}
            disabled={!!deviceId}
            style={{
              paddingVertical: 8,
              backgroundColor: colors.greenBackground,
              paddingHorizontal: 15,
              borderRadius: 100,
              borderColor: colors.greenOutline,
              borderWidth: 2,
              opacity: !!deviceId ? 0.5 : 1,
              marginRight: 5,
            }}
          >
            <GamingText
              style={{
                color: colors.offWhite,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              Get Device ID
            </GamingText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={saveDeviceId}
            disabled={!deviceId}
            style={{
              paddingVertical: 8,
              backgroundColor: colors.greenBackground,
              paddingHorizontal: 15,
              borderRadius: 100,
              borderColor: colors.greenOutline,
              borderWidth: 2,
              opacity: !deviceId ? 0.5 : 1,
              marginLeft: 5,
            }}
          >
            <GamingText
              style={{
                color: colors.offWhite,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              Save Device ID
            </GamingText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ top: -10, marginBottom: 30, alignItems: "center" }}>
        <GamingText
          style={{
            textAlign: "center",
            marginTop: 20,
            color: "#888",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          MICROSERVICE C
        </GamingText>
        <GamingText
          style={{
            paddingHorizontal: 10,
            paddingVertical: 20,
            marginTop: -2,
            color: colors.offWhite,
            fontSize: 18,
            marginRight: 8,
            textAlign: "center",
          }}
        >
          {loading ? "Loading..." : habit || "No habit recommendation yet"}
        </GamingText>

        <TouchableOpacity
          onPress={fetchHabitRecommendation}
          disabled={loading}
          style={{
            paddingVertical: 8,
            backgroundColor: colors.greenBackground,
            paddingHorizontal: 15,
            borderRadius: 100,
            borderColor: colors.greenOutline,
            borderWidth: 2,
          }}
        >
          <GamingText
            style={{ color: colors.offWhite, fontWeight: "bold", fontSize: 18 }}
          >
            Get Habit Recommendation
          </GamingText>
        </TouchableOpacity>
      </View>
      <View style={{ top: -10, marginBottom: 30, alignItems: "center" }}>
        <GamingText
          style={{
            textAlign: "center",
            marginTop: 20,
            color: "#888",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          MICROSERVICE D
        </GamingText>
        <GamingText
          style={{
            paddingHorizontal: 10,
            paddingVertical: 20,
            marginTop: -2,
            color: colors.offWhite,
            fontSize: 18,
            marginRight: 8,
            textAlign: "center",
          }}
        >
          {loading
            ? "Loading..."
            : currentTime
            ? `${currentTime}\n${timeZone}`
            : "No time fetched yet"}
        </GamingText>

        <TouchableOpacity
          onPress={fetchCurrentTime}
          disabled={loading}
          style={{
            paddingVertical: 8,
            backgroundColor: colors.greenBackground,
            paddingHorizontal: 15,
            borderRadius: 100,
            borderColor: colors.greenOutline,
            borderWidth: 2,
          }}
        >
          <GamingText
            style={{ color: colors.offWhite, fontWeight: "bold", fontSize: 18 }}
          >
            Get Current Time
          </GamingText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MicroComponent;
