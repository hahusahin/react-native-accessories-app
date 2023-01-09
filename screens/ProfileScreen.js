import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import { getUserDetails } from "../api/networkRequests";

const ProfileScreen = () => {
  const [user, setUser] = useState();

  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  useEffect(() => {
    const getUser = async () => {
      const data = await getUserDetails(userId);
      setUser(data);
    };
    getUser();
  }, [userId]);

  return (
    <View style={styles.container}>
      {user && (
        <>
          <View style={styles.userField}>
            <View style={{ width: 120 }}>
              <Text style={styles.userInfoText}>First Name:</Text>
            </View>
            <View style={{ width: 120 }}>
              <Text style={styles.userInfoText}>{user.firstName}</Text>
            </View>
          </View>
          <View style={styles.userField}>
            <View style={{ width: 120 }}>
              <Text style={styles.userInfoText}>Last Name:</Text>
            </View>
            <View style={{ width: 120 }}>
              <Text style={styles.userInfoText}>
                {user.lastName ? user.lastName : "-"}
              </Text>
            </View>
          </View>
          <View style={styles.userField}>
            <View style={{ width: 120 }}>
              <Text style={styles.userInfoText}>City:</Text>
            </View>
            <View style={{ width: 120 }}>
              <Text style={styles.userInfoText}>
                {user.city ? user.city : "-"}
              </Text>
            </View>
          </View>
        </>
      )}
      <Button style={styles.button} onPress={logoutHandler}>
        <Text style={styles.buttonText}>Signout</Text>
      </Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  button: {
    backgroundColor: "#850000",
    width: 150,
    borderRadius: 6,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    marginVertical: 6,
  },
  userInfoText: {
    color: "white",
    fontSize: 16,
    marginVertical: 6,
  },
});
