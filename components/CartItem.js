import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const decrementItem = () => {
    dispatch(cartActions.removeItem(item.id));
  };

  const incrementItem = () => {
    dispatch(cartActions.addItem(item));
  };

  const deleteItem = () => {
    dispatch(
      cartActions.deleteFromCart({ id: item.id, quantity: item.quantity })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </View>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.cartBottom}>
        <View style={styles.incrementor}>
          <Pressable
            onPress={decrementItem}
            disabled={item.quantity <= 1}
            style={({ pressed }) =>
              pressed ? [styles.pressed, styles.button] : styles.button
            }
          >
            <Text style={styles.buttonText}>&#8722;</Text>
          </Pressable>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText}>{item.quantity}</Text>
          </View>
          <Pressable
            onPress={incrementItem}
            style={({ pressed }) =>
              pressed ? [styles.pressed, styles.button] : styles.button
            }
          >
            <Text style={styles.buttonText}>&#43;</Text>
          </Pressable>
        </View>
        <Text style={styles.priceText}>{`$ ${item.price.toFixed(2)}`}</Text>
        <Pressable
          onPress={deleteItem}
          style={({ pressed }) =>
            pressed ? [styles.pressed, { flex: 1 }] : { flex: 1 }
          }
        >
          <Ionicons
            style={{ flex: 1 }}
            name="trash-outline"
            size={24}
            color="#F5EA5A"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#FFFF",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 18,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  itemName: {
    fontSize: 16,
    lineHeight: 24,
    color: "#FFFF",
    padding: 12,
    textAlign: "center",
  },
  cartBottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  incrementor: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fc9a58",
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "800",
  },
  quantityContainer: {
    backgroundColor: "#FFFFFF",
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
  },
  priceText: {
    flex: 1,
    fontSize: 18,
    color: "orange",
    textAlign: "center",
    // marginHorizontal: 12,
  },
  pressed: {
    opacity: 0.75,
  },
});
