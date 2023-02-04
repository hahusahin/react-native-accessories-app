import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ProductDetail from "../components/ProductDetail";
import { getProductDetails } from "../api/networkRequests";
import { useRoute } from "@react-navigation/native";
import Reviews from "../components/Reviews";
import { Ionicons } from "@expo/vector-icons";

const ProductDetailsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const route = useRoute();
  const { id } = route.params;

  const getDetails = async () => {
    try {
      setLoading(true);
      const data = await getProductDetails(id);
      setData(data);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getDetails();
  }, []);

  useLayoutEffect(() => {
    navigation
      .getParent()
      .setOptions({
        title: "Product Details",
        headerLeft: ({ tintColor }) => (
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={tintColor}
            style={{ marginLeft: 12 }}
            onPress={() => navigation.goBack()}
          />
        ),
      });
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
      <ProductDetail data={{...data?.productInfo, id}} />
      <Reviews
        reviews={data?.productReviews}
        productId={id}
        rating={data?.productInfo?.rating}
        onReload={getDetails}
        setLoading={setLoading}
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
