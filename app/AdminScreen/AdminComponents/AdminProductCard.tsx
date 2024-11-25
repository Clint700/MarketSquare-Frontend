import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/MainTabNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

type AdminOrderCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OrderDetails"
>;

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
  const navigation = useNavigation<AdminOrderCardNavigationProp>();

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.productCard}>
        <Image
          source={{
            uri: "https://www.tesco.com/groceries/en-GB/products/299876543",
          }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.productLabel}>Name:</Text>
            <Text style={styles.productText}>{product.item_name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.productLabel}>Category:</Text>
            <Text style={styles.productText}>{product.category}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.productLabel}>Price:</Text>
            <Text style={styles.productText}>${product.price}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.productLabel}>Description:</Text>
            <Text style={styles.productText}>{product.item_description}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.productLabel}>Added by User ID:</Text>
            <Text style={styles.productText}>{product.user_id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.productLabel}>Created At:</Text>
            <Text style={styles.productText}>
              {new Date(product.created_at).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AdminProductCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  productCard: {
    flexDirection: "row",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  productLabel: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
    width: 100,
  },
  productText: {
    fontSize: 14,
    color: "#555",
  },
});
