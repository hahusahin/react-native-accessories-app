import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const ReviewItem = ({ name, rating, review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {[...Array(5)].map((_, index) =>
          index < rating ? (
            <Ionicons key={"star__filled_" + index} name="star" size={18} color="#F5EA5A" />
          ) : (
            <Ionicons key={"star__outline_" + index} name="star-outline" size={18} color="#F5EA5A" />
          )
        )}
      </View>
      <Text selectable style={styles.reviewText}>{review}</Text>
      <Text style={styles.reviewOwner}>{name}</Text>
    </View>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#FFFF",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  stars: {
    flexDirection: "row",
    paddingTop: 8,
    paddingHorizontal: 12
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 24,
    color: "#FFFF",
    padding: 12,
  },
  reviewOwner: {
    fontSize: 14,
    textAlign: "right",
    fontStyle: "italic",
    color: "#FFFF",
    paddingHorizontal: 18,
    paddingBottom: 12
  }
});
