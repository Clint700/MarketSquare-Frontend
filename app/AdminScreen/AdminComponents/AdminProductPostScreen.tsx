import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { createProduct } from "../../../services/adminProductService";

const AdminProductPostScreen: React.FC = () => {
  const [newProduct, setNewProduct] = useState({
    item_name: "",
    item_description: "",
    category: "",
    price: "",
    stock: "",
    img_url: "",
    dimensions: { length: "", width: "", height: "" },
    rating: "",
  });

  const handleCreateProduct = async () => {
    const { item_name, item_description, category, price, stock, img_url, dimensions, rating } =
      newProduct;

    if (!item_name || !item_description || !category || !price || !stock || !img_url) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      await createProduct({
        ...newProduct,
        stock: parseInt(stock),
        price: parseFloat(price),
        rating: parseFloat(rating),
      });
      Alert.alert("Success", "Product added successfully.");
      setNewProduct({
        item_name: "",
        item_description: "",
        category: "",
        price: "",
        stock: "",
        img_url: "",
        dimensions: { length: "", width: "", height: "" },
        rating: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Error", "Failed to add product.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Product</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          value={newProduct.item_name}
          onChangeText={(text) => setNewProduct({ ...newProduct, item_name: text })}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={newProduct.item_description}
          onChangeText={(text) =>
            setNewProduct({ ...newProduct, item_description: text })
          }
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={newProduct.category}
          onChangeText={(text) => setNewProduct({ ...newProduct, category: text })}
        />

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={newProduct.price}
          onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
        />

        <Text style={styles.label}>Stock</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={newProduct.stock}
          onChangeText={(text) => setNewProduct({ ...newProduct, stock: text })}
        />

        <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={newProduct.img_url}
          onChangeText={(text) => setNewProduct({ ...newProduct, img_url: text })}
        />

        <Text style={styles.label}>Dimensions (Length x Width x Height)</Text>
        <View style={styles.dimensionContainer}>
          <TextInput
            style={[styles.input, styles.dimensionInput]}
            placeholder="Length"
            keyboardType="numeric"
            value={newProduct.dimensions.length}
            onChangeText={(text) =>
              setNewProduct({
                ...newProduct,
                dimensions: { ...newProduct.dimensions, length: text },
              })
            }
          />
          <TextInput
            style={[styles.input, styles.dimensionInput]}
            placeholder="Width"
            keyboardType="numeric"
            value={newProduct.dimensions.width}
            onChangeText={(text) =>
              setNewProduct({
                ...newProduct,
                dimensions: { ...newProduct.dimensions, width: text },
              })
            }
          />
          <TextInput
            style={[styles.input, styles.dimensionInput]}
            placeholder="Height"
            keyboardType="numeric"
            value={newProduct.dimensions.height}
            onChangeText={(text) =>
              setNewProduct({
                ...newProduct,
                dimensions: { ...newProduct.dimensions, height: text },
              })
            }
          />
        </View>

        <Text style={styles.label}>Rating</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={newProduct.rating}
          onChangeText={(text) => setNewProduct({ ...newProduct, rating: text })}
        />

        <TouchableOpacity style={styles.button} onPress={handleCreateProduct}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AdminProductPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  inputContainer: {
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
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  dimensionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});