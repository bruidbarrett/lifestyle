import React from "react";
import { Text } from "react-native";

const GamingText = ({ style, children, ...props }) => {
  return (
    <Text style={[{ fontFamily: "RetroGaming" }, style]} {...props}>
      {children}
    </Text>
  );
};

export default GamingText;
