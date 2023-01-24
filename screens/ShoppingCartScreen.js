import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import Button from "../ui/Button";
import { useState } from "react";
import OrderForm from "../components/OrderForm";

const ShoppingCartScreen = () => {
  const [showForm, setShowForm] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <ScrollView>
      {cartItems && cartItems.length > 0 ? (
        <View>
          <Text style={styles.title}>Your Shopping Cart</Text>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Text style={styles.title}>
            Total Price: {`$ ${totalPrice.toFixed(2)}`}
          </Text>
          {!showForm && (
            <View style={styles.buttonContainer}>
              <Button style={styles.cartBtn} onPress={() => setShowForm(true)}>
                <Text style={styles.cartBtnText}>Proceed To Checkout</Text>
              </Button>
            </View>
          )}
          {showForm && (
            <OrderForm
            // onConfirm={placeOrderHandler}
            // onCancel={closeFormHandler}
            />
          )}
        </View>
      ) : (
        <Text style={styles.title}>Your Shopping Cart Is Empty</Text>
      )}
    </ScrollView>
  );
};

export default ShoppingCartScreen;

const styles = StyleSheet.create({
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
