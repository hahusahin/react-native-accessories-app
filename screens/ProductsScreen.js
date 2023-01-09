import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { getAllProducts } from "../api/networkRequests";
import ProductItem from "../components/ProductItem";

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

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
