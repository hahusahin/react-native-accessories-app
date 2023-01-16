import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Ionicons } from "@expo/vector-icons";
import { sendReviewAndUpdateRating } from "../api/networkRequests";

const ReviewForm = ({ productInfo, setLoading, reloadScreen }) => {
  const [name, setName] = useState();
  const [review, setReview] = useState();
  const [rating, setRating] = useState(0);
  const { productId, currentRating, numOfReviews } = productInfo;

  const submitHandler = async () => {
    try {
      setLoading(true);
      const selectedRating = rating === 0 ? 1 : rating;
      const reviewData = { name: name, rating: selectedRating, review: review };
      const newRating =
        (numOfReviews * currentRating + selectedRating) / (numOfReviews + 1);

      await sendReviewAndUpdateRating({
        productId,
        reviewData,
        rating: newRating,
      });
      reloadScreen();
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Your Review</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 16,
        }}
      >
        <Text style={styles.btnText}>Your Rating:</Text>
        {[...Array(5)].map((_, index) => (
          <Button
            key={index}
            // onClick={() => props.onRatingSelected(index + 1)}
            onPress={() => setRating(index + 1)}
          >
            {index < rating ? (
              <Ionicons
                key={"star__filled_" + index}
                name="star"
                size={24}
                color="#F5EA5A"
              />
            ) : (
              <Ionicons
                key={"star__outline_" + index}
                name="star-outline"
                size={24}
                color="#F5EA5A"
              />
            )}
          </Button>
        ))}
      </View>
      <Input
        placeholder="Your Name"
        value={name}
        onChange={(value) => setName(value)}
      />
      <Input
        placeholder="Your Review"
        multiline
        numberOfLines={4}
        value={review}
        onChange={(value) => setReview(value)}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.btn} onPress={submitHandler}>
          <Text style={styles.btnText}>Add Review</Text>
        </Button>
      </View>
    </View>
  );
};

export default ReviewForm;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: "#FADA9D",
    fontSize: 20,
    marginVertical: 8,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  btn: {
    backgroundColor: "#68B984",
    width: 150,
    borderRadius: 8,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
});
