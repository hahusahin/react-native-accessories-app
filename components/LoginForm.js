import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

const LoginForm = ({ setIsLogin, onAuthenticate }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  return (
    <View style={styles.formContainer}>
      <Input
        label="Your Email"
        value={formValues.email}
        keyboardType="email-address"
        onChange={(value) =>
          setFormValues((prevState) => ({
            ...prevState,
            email: value,
          }))
        }
      />
      <Input
        label="Your Password"
        value={formValues.password}
        onChange={(value) =>
          setFormValues((prevState) => ({
            ...prevState,
            password: value,
          }))
        }
        secureTextEntry
      />
      <Button
        style={{ backgroundColor: "#0d6efd" }}
        onPress={() =>
          onAuthenticate(
            "signInWithPassword",
            formValues.email,
            formValues.password
          )
        }
      >
        <Text style={styles.buttonText}>Login</Text>
      </Button>
      <View style={styles.horizontalLine} />
      <View style={{ alignItems: "center" }}>
        <Button
          style={styles.switchButton}
          onPress={() => setIsLogin((prevState) => !prevState)}
        >
          <Text style={[styles.buttonText, { fontSize: 14 }]}>
            Create New Account
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  horizontalLine: {
    marginHorizontal: 16,
    marginVertical: 8,
    height: 2,
    backgroundColor: "gray",
  },
  switchButton: {
    marginVertical: 8,
    backgroundColor: "#212529",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
});
