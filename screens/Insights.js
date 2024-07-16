import React, { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Pressable,
  Vibration,
  SafeAreaView,
} from "react-native";
import { useStore } from "../config/store";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Haptics from "expo-haptics";
import colors from "../config/colors";

export const Insights = () => {
  useEffect(() => {
    console.log("component mounted");
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "HelveticaNeue",
          fontWeight: "bold",
          color: colors.offwhite,
          fontSize: 20,
        }}
      >
        Insights
      </Text>
    </SafeAreaView>
  );
};

export default Insights;
