import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

const SignUpForm = ({ setIsLogin, onAuthenticate }) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    zipcode: "",
    address: "",
  });

  return (
    <ScrollView>
      <Input
        label="First Name"
        required
        value={formValues.firstName}
        onChange={(value) =>
          setFormValues((prevState) => ({
            ...prevState,
            firstName: value,
          }))
        }
      />
      <Input
        label="Last Name"
        value={formValues.lastName}
        onChange={(value) =>
          setFormValues((prevState) => ({
            ...prevState,
            lastName: value,
          }))
        }
      />
      <Input
        label="Email"
        required
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
        label="Password"
        required
        value={formValues.password}
        onChange={(value) =>
          setFormValues((prevState) => ({
            ...prevState,
            password: value,
          }))
        }
        secureTextEntry
      />
      <Input
        label="City"
        value={formValues.city}
        onChange={(value) =>
          setFormValues((prevState) => ({
            ...prevState,
            city: value,
          }))
        }
      />
      <Input
        label="Zip Code"
        value={formValues.zipcode}
        onChange={(value) =>
          setFormValues((prevState) => ({
            ...prevState,
            zipcode: value,
          }))
        }
        keyboardType="number-pad"
      />
      <Input
        label="Address"
        value={formValues.address}
        onChange={(value) =>
          setFormValues((prevState) => ({
            ...prevState,
            address: value,
          }))
        }
      />
      <Button
        style={{ backgroundColor: "#0d6efd" }}
        onPress={() =>
          onAuthenticate("signUp", formValues)
        }
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Button>
      <View style={{ alignItems: "center" }}>
        <Button
          style={styles.switchButton}
          onPress={() => setIsLogin((prevState) => !prevState)}
        >
          <Text style={[styles.buttonText, { fontSize: 14 }]}>
            Already have an Account?
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default SignUpForm;

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
  switchButton: {
    marginVertical: 8,
    backgroundColor: "#212529",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
});
