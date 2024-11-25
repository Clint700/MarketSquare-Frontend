import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  fetchProductById,
  updateProduct,
  deleteProduct,
} from "../../../services/adminProductService";
import { RootStackParamList } from "../../../navigation/MainTabNavigator";

type AdminProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "AdminProductDetails"
>;

interface AdminProductDetailsScreenProps {
  route: AdminProductDetailsScreenRouteProp;
}

const AdminProductDetailsScreen: React.FC<AdminProductDetailsScreenProps> = ({
  route,
}) => {
  const { product_id, onProductDelete } = route.params; // Get the product ID and delete callback from navigation params
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<any>({});
  const navigation = useNavigation();

  // Fetch product details
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const response = await fetchProductById(product_id);
        setProduct(response.data);
        setUpdatedProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        Alert.alert("Error", "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [product_id]);

  // Handle product update
  const handleUpdate = async () => {
    try {
      const item_id = product_id;
      const productData = updatedProduct;
      console.log(productData, item_id, "items")
      await updateProduct(item_id, productData);
      Alert.alert("Success", "Product updated successfully.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
      Alert.alert("Error", "Failed to update product.");
    }
  };

  // Handle product delete
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
              await deleteProduct(1, product_id); // Delete product via API
              Alert.alert("Success", "Product deleted successfully.");
              onProductDelete(product_id); // Notify parent screen
              navigation.goBack(); // Return to the previous screen
            } catch (error) {
              console.error("Error deleting product:", error);
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

  return (
    <View style={styles.container}>
      {!isEditing ? (
        <>
          <Text style={styles.label}>Product Name:</Text>
          <Text style={styles.value}>{product.item_name}</Text>

          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{product.item_description}</Text>

          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{product.category}</Text>

          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>${product.price}</Text>

          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={() => setIsEditing(true)} />
            <Button title="Delete" color="red" onPress={handleDelete} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.label}>Product Name:</Text>
          <TextInput
            style={styles.input}
            value={updatedProduct.item_name}
            onChangeText={(text) =>
              setUpdatedProduct({ ...updatedProduct, item_name: text })
            }
          />

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            value={updatedProduct.item_description}
            onChangeText={(text) =>
              setUpdatedProduct({ ...updatedProduct, item_description: text })
            }
          />

          <Text style={styles.label}>Category:</Text>
          <TextInput
            style={styles.input}
            value={updatedProduct.category}
            onChangeText={(text) =>
              setUpdatedProduct({ ...updatedProduct, category: text })
            }
          />

          <Text style={styles.label}>Price:</Text>
          <TextInput
            style={styles.input}
            value={updatedProduct.price}
            onChangeText={(text) =>
              setUpdatedProduct({ ...updatedProduct, price: text })
            }
            keyboardType="numeric"
          />

          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleUpdate} />
            <Button title="Cancel" color="red" onPress={() => setIsEditing(false)} />
          </View>
        </>
      )}
    </View>
  );
};

export default AdminProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
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