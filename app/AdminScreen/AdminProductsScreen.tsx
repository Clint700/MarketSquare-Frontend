import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { fetchAllProducts } from "../../services/adminService";

interface Product {
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

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchAllProducts();
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

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4682B4" />
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
        keyExtractor={(item) => item.item_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3fDm2v7X1b5dX2zL5jCchOgDjkgXbSCBuGNQzGahLNRpgqK7SabR8QZMjeTKqUrdGSpw&usqp=CAU" }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.productLabel}>Name:</Text>
                <Text style={styles.productText}>{item.item_name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.productLabel}>Category:</Text>
                <Text style={styles.productText}>{item.category}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.productLabel}>Price:</Text>
                <Text style={styles.productText}>${item.price}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.productLabel}>Description:</Text>
                <Text style={styles.productText}>{item.item_description}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.productLabel}>Added by User ID:</Text>
                <Text style={styles.productText}>{item.user_id}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.productLabel}>Created At:</Text>
                <Text style={styles.productText}>{new Date(item.created_at).toLocaleString()}</Text>
              </View>
            </View>
          </View>
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
    backgroundColor: "#f5f5f5",
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
  productCard: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 15,
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  productLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  productText: {
    fontSize: 15,
    color: "#444",
    flex: 2,
  },
});