import { StyleSheet, Pressable } from "react-native";
import React from "react";

const Button = ({ children, style, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [style, styles.button, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  pressed: {
    opacity: 0.7,
  },
});
