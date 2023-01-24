import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import Toast from "react-native-root-toast";

const ProductItem = ({ id, imageUrl, name, price }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addItem({ id, imageUrl, name, price }));
    Toast.show(`${name} is added to cart`, {
      duration: Toast.durations.SHORT,
      backgroundColor: "#FFFFFF",
      textColor: "#1f1e1e",
    });
  };

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={() => navigation.navigate("ProductDetail", { id })}
    >
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemPrice}>{"$ " + price}</Text>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={addToCartHandler}>
            <Text style={styles.buttonText}>Add To Cart</Text>
          </Button>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  item: {
    padding: 8,
    marginVertical: 12,
    marginHorizontal: 24,
    backgroundColor: "white",
    borderRadius: 12,
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
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "#dd5100",
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FF7000",
    width: 120,
    borderRadius: 6,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    marginVertical: 4,
  },
});
