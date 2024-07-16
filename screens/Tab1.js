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

export const Tab1 = () => {
  useEffect(() => {
    console.log("component mounted");
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundBlue,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "HelveticaNeue",
          fontWeight: "bold",
          color: colors.offwhite,
          fontSize: 22,
          marginVertical: 6,
        }}
      >
        Habit Center
      </Text>

      <View // MAIN CONTAINER
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 3,
        }}
      >
        <View // TOP 1/3 CONTAINER
          style={{
            width: "100%",
            flex: 1,
            paddingHorizontal: 5,
            borderRadius: 10,
            backgroundColor: colors.backgroundBlue,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <View
            style={{
              width: "100%",
              flex: 1,
              borderRadius: 10,
              backgroundColor: colors.backgroundBlue,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              
            }}
          >
            <View
              style={{
                width: 202,
                flex: 1,
                borderRadius: 10,
                backgroundColor: colors.terciaryBlue,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
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
                1
              </Text>
            </View>
            <View
              style={{
                width: 202,
                flex: 1,
                borderRadius: 10,
                backgroundColor: colors.terciaryBlue,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
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
                3
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              flex: 1,
              borderRadius: 10,
              backgroundColor: colors.backgroundBlue,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 202,
                flex: 1,
                borderRadius: 10,
                backgroundColor: colors.terciaryBlue,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
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
                2
              </Text>
            </View>
            <View
              style={{
                width: 202,
                flex: 1,
                borderRadius: 10,
                backgroundColor: colors.terciaryBlue,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
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
                4
              </Text>
            </View>
          </View>
        </View>
        <View // MIDDLE 2/3 CONTAINER
          style={{
            width: "100%",
            flex: 1,
            paddingHorizontal: 5,
            marginTop: 2,
            borderRadius: 10,
            backgroundColor: colors.backgroundBlue,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <View
            style={{
              width: "100%",
              flex: 1,
              borderRadius: 10,
              backgroundColor: colors.backgroundBlue,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              
            }}
          >
            <View
              style={{
                width: 202,
                flex: 1,
                borderRadius: 10,
                backgroundColor: colors.terciaryBlue,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
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
                Cold Exposure
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              flex: 1,
              borderRadius: 10,
              backgroundColor: colors.backgroundBlue,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 202,
                flex: 1,
                borderRadius: 10,
                backgroundColor: colors.terciaryBlue,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
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
                Sauna Exposure
              </Text>
            </View>
          </View>
        </View>
        <View // BOTTOM 2/3 CONTAINER
          style={{
            width: 410,
            flex: 1,
            borderRadius: 10,
            backgroundColor: colors.terciaryBlue,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            margin: 3,
          }}
        >
          <Text
            style={{
              fontFamily: "HelveticaNeue",
              fontWeight: "bold",
              marginTop: 8,
              color: colors.offwhite,
              fontSize: 20,
            }}
          >
            Reading Tracker
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Tab1;
