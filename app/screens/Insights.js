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
import colors from "../../app/config/colors";
import GamingText from "../components/GamingText";

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
      <GamingText
        style={{
          fontWeight: "bold",
          color: colors.lightCream,
          fontSize: 20,
        }}
      >
        Insights
      </GamingText>
    </SafeAreaView>
  );
};

export default Insights;
