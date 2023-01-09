import { View, StyleSheet, Modal, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { authenticate } from "../api/networkRequests";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import { authActions } from "../store/auth-slice";

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const showModal = useSelector((state) => state.ui.isModalShown);
  const dispatch = useDispatch();

  const submitHandler = async (mode, formValues) => {
    try {
      setLoading(true);
      dispatch(uiActions.showModal());
      const { userId, token } = await authenticate(mode, formValues);
      if (userId && token) {
        setLoading(false);
        dispatch(uiActions.hideModal());
        dispatch(authActions.login({ token, userId }));
        navigation.replace("Products");
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: isLogin ? "Login" : "Sign Up" });
  }, [isLogin]);

  return (
    <View style={styles.container}>
      <Modal visible={showModal} transparent={true}>
        <Pressable
          onPress={() => dispatch(uiActions.hideModal())}
          style={styles.modalContainer}
        >
          <View style={styles.modalView}>
            {loading && <Text style={styles.modalText}>Please Wait...</Text>}
            {error && (
              <Text style={styles.modalText}>
                An error occured while login. Please try again later!
              </Text>
            )}
          </View>
        </Pressable>
      </Modal>

      {isLogin ? (
        <LoginForm setIsLogin={setIsLogin} onAuthenticate={submitHandler} />
      ) : (
        <SignUpForm setIsLogin={setIsLogin} onAuthenticate={submitHandler} />
      )}
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: "center",
  },
});
