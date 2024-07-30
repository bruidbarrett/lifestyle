import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatISO, startOfToday } from "date-fns";
import colors from "../config/colors";
import { useStore } from "../config/store";
import GamingText from "../components/GamingText";

// Import SVG components
import Pencil from "../../app/assets/icons/draw-write-pen-pencil.svg";
import Meditate from "../../app/assets/icons/meditation-meditate-yoga-breath-breathe-zen.svg";
import Paper from "../../app/assets/icons/paper-write-note-notebook-notes-type.svg";
import Yoga from "../../app/assets/icons/stretch-yoga.svg";
import Dumbbell from "../../app/assets/icons/workout-lift-gym-weight-weights-dumbell.svg";

const icons = [
  { name: "Pencil", component: Pencil },
  { name: "Yoga", component: Yoga },
  { name: "Meditate", component: Meditate },
  { name: "Paper", component: Paper },
  { name: "Dumbbell", component: Dumbbell },
];

const defaultIcon = icons[0];
const { width } = Dimensions.get("window");
const iconSize = (width - 40) / 3 - 20;

export const AddHabit = ({ navigation }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Habit");
  const [selectedIcon, setSelectedIcon] = useState(defaultIcon);
  const [showIconModal, setShowIconModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const setShowAddHabitModal = useStore((state) => state.setShowAddHabitModal);
  const userData = useStore((state) => state.userData);
  const setUserData = useStore((state) => state.setUserData);

  const filteredIcons = icons.filter((icon) =>
    icon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderIcon = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={{
          width: iconSize,
          height: iconSize,
          justifyContent: "center",
          alignItems: "center",
          margin: 10,
          borderWidth: 1,
          borderColor: colors.lineGray,
          borderRadius: 8,
          backgroundColor: "#222",
        }}
        onPress={() => {
          setSelectedIcon(item);
          setShowIconModal(false);
        }}
      >
        <item.component width={iconSize * 0.6} height={iconSize * 0.6} />
        <GamingText
          style={{ color: colors.lightCream, fontSize: 12, marginTop: 5 }}
        >
          {item.name}
        </GamingText>
      </TouchableOpacity>
    ),
    []
  );

  const handleOpenIconModal = () => {
    setSearchQuery("");
    setShowIconModal(true);
  };

  const handleAddHabit = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a habit name.");
      return;
    }

    const newHabit = {
      name: name.trim(),
      icon: selectedIcon.name,
      completedDates: {},
      lastReset: "",
      dateAdded: formatISO(startOfToday(), { representation: "date" }),
    };

    let updatedUserData;
    switch (type) {
      case "Habit":
        updatedUserData = {
          ...userData,
          habits: [...userData.habits, newHabit],
        };
        break;
      case "Neutral":
        updatedUserData = {
          ...userData,
          neutralHabits: [...userData.neutralHabits, newHabit],
        };
        break;
      case "Antihabit":
        updatedUserData = {
          ...userData,
          antiHabits: [...userData.antiHabits, newHabit],
        };
        break;
      default:
        Alert.alert("Error", "Invalid habit type.");
        return;
    }

    setUserData(updatedUserData);
    setShowAddHabitModal(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: "100%",
        backgroundColor: colors.background,
      }}
    >
      <StatusBar barStyle="light-content" />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#333",
        }}
      >
        <TouchableOpacity onPress={() => setShowAddHabitModal(false)}>
          <Ionicons name="chevron-back" size={24} color={colors.lightCream} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="pencil"
            size={24}
            color={colors.lightCream}
            style={{ marginRight: 8 }}
          />
          <GamingText
            style={{
              color: colors.lightCream,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            ADD NEW (6 MAX)
          </GamingText>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <View style={{ padding: 16, height: "100%" }}>
        <GamingText
          style={{
            color: colors.lightCream,
            fontSize: 20,
            marginTop: 4,
            marginBottom: 8,
          }}
        >
          NAME
        </GamingText>
        <TextInput
          style={{
            backgroundColor: "#181818",
            color: colors.lightCream,
            padding: 12,
            borderRadius: 8,
            fontSize: 16,
            height: 50,
            borderWidth: 2,
            borderColor: colors.lineGray,
          }}
          fontFamily="RetroGaming"
          value={name}
          onChangeText={setName}
          placeholder="Meditation"
          placeholderTextColor="#555"
        />

        <GamingText
          style={{
            color: colors.lightCream,
            fontSize: 20,
            marginTop: 25,
            marginBottom: 8,
          }}
        >
          TYPE
        </GamingText>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {["Habit", "Neutral", "Antihabit"].map((item) => (
            <TouchableOpacity
              key={item}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 8,
                height: 50,
                alignContent: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor:
                  type === item
                    ? item === "Habit"
                      ? colors.greenOutline
                      : item === "Neutral"
                      ? colors.blueOutline
                      : colors.redOutline
                    : colors.lineGray,
                backgroundColor:
                  type === item
                    ? item === "Habit"
                      ? colors.greenBackground
                      : item === "Neutral"
                      ? colors.blueBackground
                      : colors.redBackground
                    : "#181818",
                alignItems: "center",
                marginHorizontal: 4,
              }}
              onPress={() => setType(item)}
            >
              <GamingText
                style={{
                  color: colors.lightCream,
                }}
              >
                {item}
              </GamingText>
            </TouchableOpacity>
          ))}
        </View>

        <GamingText
          style={{
            color: colors.lightCream,
            fontSize: 20,
            marginTop: 25,
            marginBottom: 8,
          }}
        >
          IMAGE
        </GamingText>
        <View
          style={{
            borderWidth: 2,
            borderColor: colors.lineGray,
            backgroundColor: colors.secondaryGray,
            borderRadius: 8,
            padding: 16,
            alignItems: "center",
          }}
        >
          {selectedIcon && <selectedIcon.component width={170} height={170} />}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.lineGray,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderWidth: 2,
              borderColor: colors.lineGray,
              borderRadius: 6,
              marginTop: 20,
            }}
            onPress={handleOpenIconModal}
          >
            <GamingText style={{ color: colors.lightCream }}>
              Change Icon
            </GamingText>
          </TouchableOpacity>
        </View>

        <Modal
          visible={showIconModal}
          animationType="slide"
          presentationStyle="fullScreen"
          onRequestClose={() => setShowIconModal(false)}
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ padding: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <GamingText style={{ color: colors.lightCream, fontSize: 20 }}>
                  Choose an Icon
                </GamingText>
                <TouchableOpacity onPress={() => setShowIconModal(false)}>
                  <Ionicons name="close" size={24} color={colors.lightCream} />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#222",
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  marginBottom: 16,
                }}
              >
                <Ionicons
                  name="search"
                  size={20}
                  color={colors.lightCream}
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  style={{
                    flex: 1,
                    color: colors.lightCream,
                    height: 40,
                    fontFamily: "RetroGaming",
                  }}
                  placeholder="Search icons"
                  placeholderTextColor="#555"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <FlatList
                data={filteredIcons}
                renderItem={renderIcon}
                keyExtractor={(item) => item.name}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: "space-between" }}
              />
            </View>
          </SafeAreaView>
        </Modal>

        <View
          style={{
            position: "absolute",
            bottom: 70,
            right: 0,
            left: 12,
            width: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.greenBackground,
              borderColor: colors.greenOutline,
              borderWidth: 2,
              height: 62,
              padding: 16,
              width: 210,
              borderRadius: 8,
            }}
            onPress={handleAddHabit}
          >
            <GamingText
              style={{
                marginTop: -2,
                color: colors.offWhite,
                fontSize: 24,
                fontWeight: "bold",
                marginRight: 8,
              }}
            >
              DONE
            </GamingText>
            <Ionicons
              name="checkmark-circle"
              size={25}
              color={colors.greenOutline}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddHabit;
