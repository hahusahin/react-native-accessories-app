import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";

const ShoppingCartScreen = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const navigation = useNavigation()
  return (
    <>
      {cartItems && cartItems.length > 0 ? (
        <ScrollView>
          <Text style={styles.title}>Your Shopping Cart</Text>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Text style={styles.title}>
            Total Price: {`$ ${totalPrice.toFixed(2)}`}
          </Text>
          <View style={styles.buttonContainer}>
            <Button style={styles.cartBtn} onPress={() => navigation.navigate("OrderForm")}>
              <Text style={styles.cartBtnText}>Proceed To Checkout</Text>
            </Button>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.fullheightContainer}>
          <Text style={styles.title}>Your Shopping Cart Is Empty</Text>
        </View>
      )}
    </>
  );
};
export default ShoppingCartScreen;

const styles = StyleSheet.create({
  fullheightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginVertical: 12,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  cartBtn: {
    backgroundColor: "#68B984",
    width: 200,
    borderRadius: 8,
  },
  cartBtnText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
});
