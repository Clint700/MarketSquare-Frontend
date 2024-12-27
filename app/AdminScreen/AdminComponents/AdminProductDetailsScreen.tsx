import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { fetchProductById, deleteProduct } from "../../../services/adminProductService";

type Dimensions = {
  length: string;
  width: string;
  height: string;
};

type Product = {
  user_id: number;
  img_url: string;
  created_at: string;
  price: string;
  stock: number;
  category: string;
  item_name: string;
  item_description: string;
  dimensions: Dimensions;
  rating: number;
};

type AdminProductDetailsScreenRouteProp = RouteProp<
  { AdminProductDetails: { product_id: number; onProductDelete: (id: number) => void } },
  "AdminProductDetails"
>;

interface AdminProductDetailsScreenProps {
  route: AdminProductDetailsScreenRouteProp;
  navigation: any;
}

const AdminProductDetailsScreen: React.FC<AdminProductDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { product_id, onProductDelete } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await fetchProductById(product_id);
        setProduct(response.data);
      } catch (error) {
        Alert.alert("Error", "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [product_id]);

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              if (product) {
                await deleteProduct(product.user_id, product_id);
                onProductDelete(product_id);
                navigation.goBack();
              }
            } catch (error) {
              Alert.alert("Error", "Failed to delete product.");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4682B4" />
        <Text style={styles.loadingText}>Loading Product Details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Product not found.</Text>
      </View>
    );
  }

  const { dimensions } = product;

  return (
    <ScrollView style={styles.container}>
       <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBWAONkrIFA97BZfx83GoyCU9oYQI6eHdTeA&s",
        }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <Text style={styles.productName}>{product.item_name}</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.productCategory}>{product.category}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{product.item_description}</Text>

        <Text style={styles.label}>Price</Text>
        <Text style={styles.value}>£{product.price}</Text>

        <Text style={styles.label}>Stock</Text>
        <Text style={styles.value}>{product.stock}</Text>

        <Text style={styles.label}>Dimensions</Text>
        <Text style={styles.value}>
          L: {dimensions?.length} H: {dimensions?.height} W: {dimensions?.width}
        </Text>

        <Text style={styles.label}>Rating</Text>
        <Text style={styles.value}>{product.rating} / 5</Text>

        <Text style={styles.label}>Created At</Text>
        <Text style={styles.value}>
          {new Date(product.created_at).toLocaleString()}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("AdminProductEdit", { product_id })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AdminProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  productImage: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 15,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  productCategory: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#4682B4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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