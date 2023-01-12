import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { getAllProducts } from "../api/networkRequests";
import ProductItem from "../components/ProductItem";

const ProductsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {}
    };
    getProducts();
  }, []);

  useFocusEffect(() => {
    navigation.getParent().setOptions({ title: "Products" });
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <>
      {products && products.length > 0 && (
        <FlatList
          data={products}
          renderItem={(itemData) => <ProductItem {...itemData.item} />}
          keyExtractor={(item) => item.id}
          style={{ marginVertical: 18 }}
        />
      )}
    </>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
