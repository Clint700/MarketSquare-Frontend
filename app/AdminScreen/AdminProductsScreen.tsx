import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { fetchProducts } from "../../services/adminProductService";
import AdminProductCard from "./AdminComponents/AdminProductCard";
import { RootStackParamList } from "../../navigation/MainTabNavigator";

type AdminProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AdminProductDetails"
>;

interface Product {
  product_id: number;
  item_id: number;
  user_id: number;
  img_url: string;
  created_at: string;
  price: string;
  category: string;
  item_name: string;
  item_description: string;
}

const AdminProductsScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  //console.log(products)

  const navigation = useNavigation<AdminProductScreenNavigationProp>();

  const loadProducts = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const response = await fetchProducts(filters);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleNavigateToDetails = (item_id: number) => {
    navigation.navigate("AdminProductDetails", {
      product_id: item_id,
      onProductDelete: (deletedProductId) => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.item_id !== deletedProductId)
        );
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={50} color="#4682B4" />
        <Text style={styles.loadingText}>Loading Products...</Text>
      </View>
    );
  }

  if (!products.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Products Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(product) => product.item_id.toString()}
        renderItem={({ item }) => (
          <AdminProductCard
            product={item}
            onPress={() => handleNavigateToDetails(item.item_id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default AdminProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4f0",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    fontStyle: "italic",
  },
});