import * as React from "react";
import {
  Button,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons/";
import { FontAwesome5 } from "@expo/vector-icons/";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import * as LocalAuthentication from "expo-local-authentication";
import HomeFilled from "../assets/svgs/home_filled.svg";
import HomeOutline from "../assets/svgs/home_outline.svg";
import InsightsOutline from "../assets/svgs/insights_outline.svg";
import InsightsFilled from "../assets/svgs/insights_filled.svg";
import SettingsOutline from "../assets/svgs/settings_outline.svg";
import SettingsFilled from "../assets/svgs/settings_filled.svg";

// Screens
import HomeDashboard from "./HomeDashboard";
import Settings, { Tab1 } from "./Settings";
import Insights, { Tab2 } from "./Insights";
import colors from "../config/colors";

//Screen names
const homeName = "Home";
const insightsName = "Insights";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

export const MainContainer = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // async function authenticate () {
    //   const { success } = await LocalAuthentication.authenticateAsync();
    // }
    // authenticate();
    Font.loadAsync({
      "Glamour Absolute Extended": require("../assets/fonts/GlamourAbsolute_Extended.otf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, offblack, size }) => {
            let rn = route.name;

            if (rn === homeName) {
              return focused ? (
                <HomeFilled height={38} />
              ) : (
                <HomeOutline height={38} />
              );
            } else if (rn === insightsName) {
              return focused ? (
                <InsightsFilled height={44} />
              ) : (
                <InsightsOutline height={33} />
              );
            } else if (rn === settingsName) {
              return focused ? (
                <SettingsFilled height={38} />
              ) : (
                <SettingsOutline height={38} />
              );
            }
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopWidth: "2px",
            height: 84,
            borderTopColor: "#4A4641",
            elevation: 0,
            paddingHorizontal: 10,
          },
          tabBarIconStyle: { marginTop: 15 },
          headerShown: false,
        })}
      >
        <Tab.Screen name={insightsName} component={Insights} />
        <Tab.Screen name={homeName} component={HomeDashboard} />
        <Tab.Screen name={settingsName} component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
