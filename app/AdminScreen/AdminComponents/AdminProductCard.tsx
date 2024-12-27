import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

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

interface AdminProductCardProps {
  product: Product;
  onPress: () => void;
}

const AdminProductCard: React.FC<AdminProductCardProps> = ({
  product,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBWAONkrIFA97BZfx83GoyCU9oYQI6eHdTeA&s",
        }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{product.item_name}</Text>
        <Text style={styles.productCategory}>{product.category}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {product.item_description}
        </Text>
        <Text style={styles.productPrice}>Price: £{product.price}</Text>
        <Text style={styles.productDate}>
          Added on {new Date(product.created_at).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AdminProductCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 110,
    height: 125,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 13,
    color: "#777",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4682B4",
  },
  productDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
});
