import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ProductDetail from "../components/ProductDetail";
import { getProductDetails } from "../api/networkRequests";
import { useRoute } from "@react-navigation/native";
import Reviews from "../components/Reviews";

const ProductDetailsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    const productDetails = async () => {
      try {
        const data = await getProductDetails(id);
        setData(data);
        setLoading(false);
      } catch (error) {}
    };
    productDetails();
  }, []);

  useLayoutEffect(() => {
    navigation.getParent().setOptions({ title: "Product Details" });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <ScrollView>
      <ProductDetail data={data?.productInfo} />
      <Reviews
        reviews={data?.productReviews}
        productId={id}
        rating={data?.productInfo?.rating}
      />
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
