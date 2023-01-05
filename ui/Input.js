import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const Input = ({
  label,
  required,
  onChange,
  value,
  keyboardType,
  secureTextEntry,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}>{" * "}</Text>}
      </Text>
      <TextInput
        style={[styles.input]}
        onChangeText={onChange}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    // maxWidth: 300,
  },
  label: {
    color: "white",
    marginBottom: 8,
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
  },
  required: {
    color: "red",
  },
});
