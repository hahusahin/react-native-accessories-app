import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../ui/Button";

const ProductItem = ({ imageUrl, name, price }) => {
  return (
    <Pressable style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <Text style={styles.itemName}>{name}</Text>
        <View style={styles.buttonContainer}>
          <Button style={styles.button}>
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
