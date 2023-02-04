import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import Toast from "react-native-root-toast";

const ProductDetail = ({ data }) => {
  const { imageUrl, about, name, price, rating } = data;
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addItem(data));
    Toast.show(`${name} is added to cart`, {
      duration: Toast.durations.SHORT,
      backgroundColor: "#FFFFFF",
      textColor: "#1f1e1e",
    });
  };

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, { width: width * 0.5, height: height * 0.3 }]}
        />
      </View>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.rating}>{`User Rating: ${rating.toFixed(
        2
      )} / 5`}</Text>
      <Text style={styles.price}>{"$ " + price}</Text>
      <View>
        {about?.split("'\n'")?.map((item, i) => (
          <Text style={styles.detail} key={"about__" + i}>
            {"\u2B24" + "   "}
            {item}
          </Text>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.cartBtn} onPress={addToCartHandler}>
          <Text style={styles.cartBtnText}>Add To Cart</Text>
        </Button>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    marginVertical: 18,
  },
  image: {
    resizeMode: "contain",
  },
  itemName: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "500",
    color: "#FFFF",
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  rating: {
    fontSize: 20,
    color: "#f8c11c",
    marginVertical: 8,
    paddingHorizontal: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: "500",
    color: "#37d8f9",
    marginVertical: 8,
    paddingHorizontal: 20,
  },
  detail: {
    fontSize: 16,
    lineHeight: 24,
    color: "#FFFF",
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  cartBtn: {
    backgroundColor: "#0081B4",
    width: 120,
    borderRadius: 6,
  },
  cartBtnText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    marginVertical: 4,
  },
});
