import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { fetchProductById, updateProduct } from "../../../services/adminProductService";

type Dimensions = {
  length: string;
  width: string;
  height: string;
};

type Product = {
  item_id: number;
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

type AdminProductEditScreenRouteProp = RouteProp<
  { AdminProductEdit: { product_id: number } },
  "AdminProductEdit"
>;

interface AdminProductEditScreenProps {
  route: AdminProductEditScreenRouteProp;
  navigation: any;
}

const AdminProductEditScreen: React.FC<AdminProductEditScreenProps> = ({ route, navigation }) => {
  const { product_id } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Partial<Product>>({});

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await fetchProductById(product_id);
        setProduct(response.data);
        setUpdatedProduct(response.data);
      } catch (error) {
        Alert.alert("Error", "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [product_id]);

  const handleUpdate = async () => {
    if (!updatedProduct) {
      Alert.alert("Error", "No changes to update.");
      return;
    }

    setUpdating(true);
    try {
      const dataToSend = {
        ...updatedProduct,
        stock: parseInt(updatedProduct.stock?.toString() || "0", 10),
        price: parseFloat(updatedProduct.price || "0").toFixed(2),
        dimensions: updatedProduct.dimensions,
      };

      await updateProduct(product_id, dataToSend);
      Alert.alert("Success", "Product updated successfully.");
      navigation.goBack(); // Navigate back to the details screen
    } catch (error) {
      Alert.alert("Error", "Failed to update product.");
    } finally {
      setUpdating(false);
    }
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Product</Text>

      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        value={updatedProduct.item_name || ""}
        onChangeText={(text) => setUpdatedProduct({ ...updatedProduct, item_name: text })}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={updatedProduct.item_description || ""}
        onChangeText={(text) =>
          setUpdatedProduct({ ...updatedProduct, item_description: text })
        }
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={updatedProduct.category || ""}
        onChangeText={(text) => setUpdatedProduct({ ...updatedProduct, category: text })}
      />

      <Text style={styles.label}>Price (£)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={updatedProduct.price || ""}
        onChangeText={(text) => setUpdatedProduct({ ...updatedProduct, price: text })}
      />

      <Text style={styles.label}>Stock</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={updatedProduct.stock?.toString() || ""}
        onChangeText={(text) =>
          setUpdatedProduct({ ...updatedProduct, stock: parseInt(text, 10) })
        }
      />

      <Text style={styles.label}>Image URL</Text>
      <TextInput
        style={styles.input}
        value={updatedProduct.img_url || ""}
        onChangeText={(text) => setUpdatedProduct({ ...updatedProduct, img_url: text })}
      />

      <Text style={styles.label}>Dimensions</Text>
      <View style={styles.dimensionContainer}>
        <TextInput
          style={[styles.input, styles.dimensionInput]}
          placeholder="Length"
          keyboardType="numeric"
          value={updatedProduct.dimensions?.length || ""}
          onChangeText={(text) =>
            setUpdatedProduct({
              ...updatedProduct,
              dimensions: { ...updatedProduct.dimensions, length: text },
            })
          }
        />
        <TextInput
          style={[styles.input, styles.dimensionInput]}
          placeholder="Width"
          keyboardType="numeric"
          value={updatedProduct.dimensions?.width || ""}
          onChangeText={(text) =>
            setUpdatedProduct({
              ...updatedProduct,
              dimensions: { ...updatedProduct.dimensions, width: text },
            })
          }
        />
        <TextInput
          style={[styles.input, styles.dimensionInput]}
          placeholder="Height"
          keyboardType="numeric"
          value={updatedProduct.dimensions?.height || ""}
          onChangeText={(text) =>
            setUpdatedProduct({
              ...updatedProduct,
              dimensions: { ...updatedProduct.dimensions, height: text },
            })
          }
        />
      </View>

      <TouchableOpacity
        style={[styles.button, updating && styles.buttonDisabled]}
        onPress={handleUpdate}
        disabled={updating}
      >
        <Text style={styles.buttonText}>{updating ? "Updating..." : "Save Changes"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AdminProductEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  dimensionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  dimensionInput: {
    flex: 1,
    marginRight: 5,
  },
  button: {
    backgroundColor: "#4682B4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
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