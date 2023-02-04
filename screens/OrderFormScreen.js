import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import React from "react";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";
import { sendOrder } from "../api/networkRequests";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import { useEffect } from "react";
import { cartActions } from "../store/cart-slice";

const OrderFormScreen = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const showModal = useSelector((state) => state.ui.isModalShown);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      dispatch(uiActions.showModal());
      if (
        !formValues.firstName ||
        !formValues.lastName ||
        !formValues.email ||
        !formValues.address
      ) {
        setError("Please fill all fields!");
        return;
      }
      setLoading(true);
      setError("");
      const orderedItems = cartItems.map((item) => {
        return { id: item.id, name: item.name, quantity: item.quantity };
      });
      await sendOrder({ userInfo: formValues, orderedItems });
      setLoading(false);
      dispatch(cartActions.clearCart());
    } catch (error) {
      setLoading(false);
      setError("An error occured while giving order. Please try again later!");
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
      });
    };
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Modal visible={showModal} transparent={true}>
        <Pressable
          onPress={() => dispatch(uiActions.hideModal())}
          style={styles.modalContainer}
        >
          <View style={styles.modalView}>
            {loading && <Text style={styles.modalText}>Please Wait...</Text>}
            {error && <Text style={styles.modalText}>{error}</Text>}
            {!loading && !error && (
              <>
                <Text>We have taken your order successfully</Text>
                <View>
                  <Button
                    style={styles.modalBtn}
                    onPress={() => {
                      dispatch(uiActions.hideModal());
                      navigation.popToTop();
                      navigation.navigate("Products", { screen: "Products" });
                    }}
                  >
                    <Text style={styles.buttonText}>Close</Text>
                  </Button>
                </View>
              </>
            )}
          </View>
        </Pressable>
      </Modal>
      <Text style={styles.title}>Billing Info</Text>
      <Input
        label="First Name"
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
        label="Address"
        value={formValues.address}
        onChange={(value) =>
          setFormValues((prevState) => ({
            ...prevState,
            address: value,
          }))
        }
      />
      <View style={styles.btnContainer}>
        <Button
          style={{ backgroundColor: "#dc3545" }}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </Button>
        <Button style={{ backgroundColor: "#0d6efd" }} onPress={submitHandler}>
          <Text style={styles.buttonText}>Confirm</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default OrderFormScreen;

const styles = StyleSheet.create({
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
  modalBtn: {
    width: 120,
    backgroundColor: "#1F8A70",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginVertical: 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 12,
  },
});
