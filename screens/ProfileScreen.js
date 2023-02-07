import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import { getUserDetails } from "../api/networkRequests";

const TableRow = ({ title, value }) => (
  <View style={styles.userField}>
    <View style={{ width: 120 }}>
      <Text style={styles.userInfoText}>{title}:</Text>
    </View>
    <View style={{ width: 180 }}>
      <Text style={styles.userInfoText}>{value}</Text>
    </View>
  </View>
);

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
          <TableRow title="First Name" value={user.firstName} />
          <TableRow
            title="Last Name"
            value={user.lastName ? user.lastName : "-"}
          />
          <TableRow title="Email" value={user.email ? user.email : "-"} />
          <TableRow title="City" value={user.city ? user.city : "-"} />
          <TableRow title="Zipcode" value={user.zipcode ? user.zipcode : "-"} />
          <TableRow title="Address" value={user.address ? user.address : "-"} />
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
