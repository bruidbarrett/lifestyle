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

// Screens
import HomeDashboard from "./HomeDashboard";
import { Tab1 } from "./Tab1";
import { Tab2 } from "./Tab2";
import { Tab3 } from "./Tab3";
import { Tab4 } from "./Tab4";
import colors from "../config/colors";

//Screen names
const homeName = "Home";
const tab1Name = "Tab1";
const tab2Name = "Tab2";
const tab3Name = "Tab3";
const tab4Name = "Tab4";

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
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, offblack, size }) => {
            let rn = route.name;

            if (rn === homeName) {
              return (
                <Ionicons name={"fitness"} size={31} color={colors.offwhite} />
              );
            } else if (rn === tab1Name) {
              return (
                <FontAwesome5
                  name={"chart-bar"}
                  size={28}
                  color={colors.offwhite}
                />
              );
            } else if (rn === tab2Name) {
              return (
                <MaterialCommunityIcons
                  name={"pill"}
                  size={29}
                  color={colors.offwhite}
                />
              );
            } else if (rn === tab3Name) {
              return (
                <FontAwesome5
                  name={"brain"}
                  size={25}
                  color={colors.offwhite}
                  light
                />
              );
            } else if (rn === tab4Name) {
              return focused ? (
                <FontAwesome5
                  name={"moon"}
                  size={26}
                  color={colors.offwhite}
                  solid
                />
              ) : (
                <FontAwesome5 name={"moon"} size={26} color={colors.offwhite} />
              );
            }
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.secondaryBlue,
            borderTopWidth: 0,
          },
          tabBarIconStyle: { marginTop: 10 },
          headerShown: false,
        })}
      >
        <Tab.Screen name={tab1Name} component={Tab1} />
        <Tab.Screen name={tab2Name} component={Tab2} />
        <Tab.Screen name={homeName} component={HomeDashboard} />
        <Tab.Screen name={tab3Name} component={Tab3} />
        <Tab.Screen name={tab4Name} component={Tab4} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
