import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { authenticate } from "../api/networkRequests";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  const authenticateHandler = async (mode, email, password) => {
    // setLoading(true);
    try {
      const token = await authenticate(mode, email, password);
      // authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Authentication failed!", "Please check your credentials");
      // setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLogin ? (
        <LoginForm
          setIsLogin={setIsLogin}
          onAuthenticate={authenticateHandler}
        />
      ) : (
        <SignUpForm
          setIsLogin={setIsLogin}
          onAuthenticate={authenticateHandler}
        />
      )}
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
