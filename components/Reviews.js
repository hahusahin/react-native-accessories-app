import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import ReviewItem from "./ReviewItem";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import ReviewForm from "./ReviewForm";
import { useNavigation } from "@react-navigation/native";

const Reviews = ({ reviews, productId, rating }) => {
  const navigation = useNavigation();
  const [showForm, setShowForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const productInfo = {
    productId,
    currentRating: rating,
    numOfReviews: reviews.length,
  };

  const pressHandler = () => {
    if (isLoggedIn) {
      setShowForm(true);
    } else {
      setShowWarning(true);
    }
  };
  return (
    <>
      {reviews && reviews.length > 0 && (
        <>
          <Text style={styles.title}>Product Reviews</Text>
          {reviews.map((review, i) => (
            <ReviewItem key={"review__" + i} {...review} />
          ))}
          {!showForm && !showWarning && (
            <View style={styles.buttonContainer}>
              <Button style={styles.cartBtn} onPress={pressHandler}>
                <Text style={styles.cartBtnText}>Review Product</Text>
              </Button>
            </View>
          )}
          {showWarning && (
            <View style={[styles.buttonContainer, { marginTop: 12 }]}>
              <Text style={styles.cartBtnText}>
                You should be logged in to make a review.
              </Text>
              <Button
                style={[styles.cartBtn, { backgroundColor: "red" }]}
                onPress={() => navigation.navigate("Auth")}
              >
                <Text style={styles.cartBtnText}>Login</Text>
              </Button>
            </View>
          )}
          {showForm && <ReviewForm productInfo={productInfo} />}
        </>
      )}
    </>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FADA9D",
    textAlign: "center",
    marginBottom: 12,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  cartBtn: {
    backgroundColor: "#68B984",
    width: 150,
    borderRadius: 8,
  },
  cartBtnText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
});
