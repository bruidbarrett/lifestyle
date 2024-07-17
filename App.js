import { StyleSheet, Text, View } from "react-native";
import MainContainer from "./app/screens/MainContainer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView>
      <MainContainer />
    </GestureHandlerRootView>
  );
}
